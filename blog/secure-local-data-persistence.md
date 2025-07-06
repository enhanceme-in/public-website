## Secure Local Data Persistence with Hardware-Backed AES and MMKV

Building truly secure mobile applications means not only encrypting data in transit but also safeguarding sensitive information at rest. In regulated environments—whether under FedRAMP’s federal cloud–security mandates or HIPAA’s patient-privacy rules—you must show that your on-device storage meets stringent cryptographic and key-management requirements. This chapter walks through a “book-style” deep dive into a robust mechanism:

1. **Generate** a true random 256-bit AES key on first launch
2. **Store** (wrap) it securely in hardware keystores (Android Keystore & iOS Keychain)
3. **Unwrap** it only at runtime via native APIs
4. **Use** it as the encryption key for high-performance MMKV storage
5. **Comply** with FedRAMP, HIPAA, and related regulations

---

### 8.1 The Threat Model and Compliance Goals

Before diving into code, clarify **who** and **what** you’re defending against:

- **Casual attackers** who gain temporary device access (lost/stolen phone).
- **Malicious apps** or compromised OS layers trying to read your data files.
- **Rooted or jail-broken devices**, where attackers could install kernel modules or use memory dumps.

Under **FedRAMP** (NIST SP 800-53 controls) and **HIPAA** (45 CFR § 164.312), you must demonstrate:

- **FIPS 140-2**–validated cryptographic algorithms and modules for encryption at rest.
- **Secure key generation** with at least 256-bit entropy.
- **Hardware-backed key storage** so that raw keys never appear on disk.
- **Access controls** (e.g., requiring device PIN/biometrics).
- **Key rotation** and **auditing** capabilities.

Our mechanism addresses each requirement head-on.

---

### 8.2 Generating a True Random AES Key

On **first launch**, before any sensitive data is written:

1. **Android**

   - Use `KeyGenerator` with `KeyGenParameterSpec` (API 23+).
   - Specify AES-GCM, 256-bit key length, and hardware-backed storage.
   - Optionally enforce user authentication (biometric/PIN) per NIST SP 800-63 guidelines.

   ```java
   KeyGenerator kg = KeyGenerator.getInstance(
       KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
   kg.init(new KeyGenParameterSpec.Builder(
           "mmkv_aes_key",
           KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
       .setKeySize(256)
       .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
       .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
       .setUserAuthenticationRequired(false)           // or true for HIPAA-level auth
       .setIsStrongBoxBacked(true)                     // if available for FIPS-level HSM
       .build());
   SecretKey aesKey = kg.generateKey();
   ```

2. **iOS**

   - Generate 32 random bytes via `SecRandomCopyBytes` (FIPS-approved RNG).
   - Store them as a keychain item with `kSecAttrAccessibleWhenUnlockedThisDeviceOnly` and `kSecAttrAccessControl` flags.

   ```objc
   uint8_t buffer[32];
   SecRandomCopyBytes(kSecRandomDefault, 32, buffer);
   NSDictionary *attrs = @{
     (__bridge id)kSecClass: (__bridge id)kSecClassKey,
     (__bridge id)kSecAttrKeyType: (__bridge id)kSecAttrKeyTypeAES,
     (__bridge id)kSecAttrApplicationTag: [@"com.app.mmkv_key" dataUsingEncoding:NSUTF8StringEncoding],
     (__bridge id)kSecValueData: [NSData dataWithBytes:buffer length:32],
     (__bridge id)kSecAttrAccessible: (__bridge id)kSecAttrAccessibleWhenUnlockedThisDeviceOnly,
     (__bridge id)kSecAttrAccessControl: (__bridge id)SecAccessControlCreateWithFlags(
         kCFAllocatorDefault,
         kSecAttrAccessibleWhenUnlockedThisDeviceOnly,
         kSecAccessControlUserPresence,  // e.g. Touch ID/Face ID
         NULL)
   };
   SecItemAdd((__bridge CFDictionaryRef)attrs, NULL);
   ```

> **Compliance Note**: By choosing hardware-backed StrongBox on Android and Secure Enclave on iOS, you leverage FIPS 140-2–validated modules, satisfying FedRAMP’s at-rest encryption and HIPAA’s encryption standards.

---

### 8.3 Wrapping and Unwrapping the Key

Rather than storing the raw AES key in JS or in plaintext files, we **wrap** it in a keystore-protected envelope:

1. **Android Unwrap**

   ```java
   KeyStore ks = KeyStore.getInstance("AndroidKeyStore");
   ks.load(null);
   SecretKey aesKey = (SecretKey) ks.getKey("mmkv_aes_key", null);
   byte[] rawKey = aesKey.getEncoded();  // only works if .getEncoded() is allowed; otherwise use Cipher wrap/unwrap
   return Base64.encodeToString(rawKey, Base64.NO_WRAP);
   ```

2. **iOS Unwrap**

   ```objc
   NSDictionary *query = @{ ... same query as storage, plus kSecReturnData: @YES };
   CFDataRef keyData = nil;
   SecItemCopyMatching((__bridge CFDictionaryRef)query, (CFTypeRef *)&keyData);
   NSData *rawKey = (__bridge_transfer NSData *)keyData;
   return [rawKey base64EncodedStringWithOptions:0];
   ```

In both cases, your native module exposes a single JS bridge:

```js
import { NativeModules } from "react-native";
const { EncryptionUtils } = NativeModules;

// Returns base64-encoded 256-bit AES key:
const wrappedKey = await EncryptionUtils.getWrappedAesKey();
const rawKey = Buffer.from(wrappedKey, "base64").toString("hex");

// Initialize MMKV
import { MMKV } from "react-native-mmkv";
export const storage = new MMKV({ encryptionKey: rawKey });
```

> **Compliance Note**: Since the raw key is held only in **volatile memory** and loaded via protected OS APIs, it is never written to disk in cleartext, fulfilling NIST SP 800-57 key-management controls.

---

### 8.4 Integrating with MMKV for High-Performance Persistence

With your AES key securely unwrapped, configure MMKV:

```js
import { MMKV } from "react-native-mmkv";

export function initSecureStorage(base64Key) {
  const rawHexKey = Buffer.from(base64Key, "base64").toString("hex");
  return new MMKV({
    id: "secureStorage",
    encryptionKey: rawHexKey,
    alias: "com.app.secure", // optional identifier
  });
}

// Usage elsewhere:
const storage = initSecureStorage(await EncryptionUtils.getWrappedAesKey());
storage.set("patientRecord", JSON.stringify(sensitiveObject));
const record = JSON.parse(storage.getString("patientRecord"));
```

- **Performance**: MMKV is orders of magnitude faster than AsyncStorage.
- **Unlimited Capacity**: Only bounded by device free space.
- **Atomic Writes**: Protects against data corruption, a key requirement for regulated logging.

---

### 8.5 Key Rotation and Revocation

Regulations often mandate periodic key rotation (e.g., annually) and immediate revocation upon compromise:

1. **Rotation Strategy**

   - Generate a **new** AES alias (e.g., `mmkv_aes_key_v2`).
   - Re-encrypt existing MMKV data under the new key.
   - Atomically switch pointers so clients migrate seamlessly.

2. **Revocation on Device-Unlink**

   - Call `KeyStore.deleteEntry("mmkv_aes_key")` (Android) or `SecItemDelete(...)` (iOS) to erase the key.
   - Ensure that data is wiped (e.g., call `storage.clearAll()`).

> **Compliance Note**: Maintain an **audit log** (encrypted) of key-generation and rotation events. Under FedRAMP’s AU-03 control and HIPAA’s audit requirements, you must prove when keys were generated, rotated, or revoked.

---

### 8.6 Protecting Against Root/Jailbreak

While hardware keystores dramatically raise the bar, a fully compromised device can still leak secrets from memory:

- **Runtime Protections**:

  - Use Android’s SafetyNet Attestation or Apple’s DeviceCheck to detect compromise.
  - Refuse to unwrap keys on untrusted devices.

- **Memory Hygiene**:

  - Zero out key buffers immediately after use.
  - Avoid keeping long-lived JS references to the raw key.

> **Compliance Note**: HIPAA requires that you implement “mechanisms to authenticate ePHI integrity” (164.312(c)). Refusing operations on jail-broken devices helps preserve integrity and confidentiality.

---

### 8.7 Summary of Compliance Mapping

| Requirement                         | Mechanism                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------ |
| **FIPS 140-2 at-rest encryption**   | Hardware keystore AES-GCM, StrongBox/Secure Enclave                            |
| **Key-management (NIST 800-57)**    | True random 256-bit key, hardware-wrapped, secure unwrapping                   |
| **Access control / authentication** | Keystore flags: `setUserAuthenticationRequired(true)` / Keychain accessControl |
| **Audit & key rotation**            | Native deletion/regen + encrypted audit logs in MMKV                           |
| **Data integrity**                  | AES-GCM authentication tag, atomic MMKV writes                                 |
| **Breach detection**                | Device attestation, jailbreak/root checks                                      |

By following this layered approach, you build a secure, compliant on-device persistence layer that withstands both regulatory scrutiny and real-world attacks—without sacrificing performance or developer ergonomics.
