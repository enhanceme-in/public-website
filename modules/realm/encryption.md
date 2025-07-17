## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 12: Data Encryption with Realm

---

### ## Introduction

Data encryption is crucial when your app handles sensitive information. Realm supports **on-disk encryption**, allowing you to store all data securely using a 512-bit encryption key.

In this chapter, you'll learn how to enable encryption in Realm, generate and manage keys safely, and understand best practices.

---

## ## How Realm Encryption Works

- Realm uses **AES-256** encryption under the hood
- Entire database file is encrypted
- You must provide a `encryptionKey` (64-byte `Uint8Array`)
- Realm automatically decrypts data at runtime using the key

---

## ## Generating a Secure Key

### 🛠 One-time key generation (Node/React Native)

```ts
import { randomBytes } from "react-native-get-random-values";

const generateKey = () => {
  const key = randomBytes(64);
  // Store this key securely (e.g., Keychain, Keystore, SecureStorage)
  return key;
};
```

> ⚠️ The key must be 64 bytes. If you lose it, the data becomes unreadable.

---

## ## Enabling Encryption in Realm

### 📁 `/database/index.ts`

```ts
import Realm from "realm";
import { NoteSchema } from "../schemas/NoteSchema";
import * as SecureStore from "expo-secure-store";

const getEncryptionKey = async () => {
  let key = await SecureStore.getItemAsync("realm-key");
  if (!key) {
    const randomKey = new Uint8Array(64);
    for (let i = 0; i < 64; i++) randomKey[i] = Math.floor(Math.random() * 256);
    await SecureStore.setItemAsync(
      "realm-key",
      JSON.stringify(Array.from(randomKey))
    );
    return randomKey;
  }
  return new Uint8Array(JSON.parse(key));
};

export const getRealm = async () => {
  const key = await getEncryptionKey();
  return await Realm.open({
    schema: [NoteSchema],
    encryptionKey: key,
  });
};
```

---

## ## Validating Encryption

If you try to open the encrypted Realm with the wrong key, it will throw an error:

```bash
Invalid database. Encryption key may be incorrect.
```

This ensures your data is safe from unauthorized access.

---

## ## Best Practices

- ✅ Store your key using platform-secure storage (Keychain, Keystore)
- ✅ Generate the key once and reuse
- ✅ Keep encryption logic in a central file
- ❌ Don’t hardcode encryption keys in your codebase
- ❌ Don’t log or expose keys in debug mode

---

## ## Key Takeaways

- Realm supports full-database AES encryption via a 512-bit key
- You must provide a `Uint8Array(64)` key when opening Realm
- If the key is lost or changed, the data becomes inaccessible
- Use secure storage APIs to manage encryption keys safely

---
