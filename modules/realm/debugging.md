## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 19: Debugging and Troubleshooting Realm Issues

---

### ## Introduction

Even though Realm is designed for stability, you may occasionally run into issues — especially when dealing with schema updates, native linking, or sync.

This chapter covers the most common problems, how to identify them, and actionable ways to fix or prevent them.

---

## ## 1. "Realm is not a constructor"

**Cause:** `realm` is not imported correctly or is mocked unintentionally.

### ✅ Fix:

- Double-check your import:

```ts
import Realm from "realm";
```

- If you're using mocks, make sure they're not leaking into production code

---

## ## 2. "Schema version mismatch" or "Missing property"

**Cause:** You changed your schema but forgot to bump `schemaVersion` or provide a migration.

### ✅ Fix:

```ts
Realm.open({
  schema: [NoteSchema],
  schemaVersion: 2, // increment version!
  onMigration: () => {},
});
```

> 💡 Always write a migration function if adding/removing fields.

---

## ## 3. "Invalid encryption key"

**Cause:** You opened an encrypted Realm with the wrong key (or no key).

### ✅ Fix:

- Ensure the same 64-byte key is consistently retrieved from secure storage
- Don’t switch between encrypted and non-encrypted modes without clearing data

---

## ## 4. App crashes silently (especially on iOS)

**Cause:** Native Realm build or linking issue

### ✅ Fix:

- Reinstall dependencies:

```bash
npx pod-install
npx react-native run-ios
```

- Ensure minimum iOS version in `Podfile` is set to 12.0+
- Clean your build folder

---

## ## 5. Realm not working in Expo Go

**Cause:** Expo Go doesn’t support custom native modules (like Realm)

### ✅ Fix:

- Use EAS Build to create a custom development client:

```bash
eas build --profile development --platform ios
```

---

## ## 6. Realm file corrupted or unusable

**Cause:** Incomplete writes or abrupt app shutdown during critical operations

### ✅ Fix:

- Use `inMemory` Realm for volatile tasks or testing
- Use transactions and avoid unnecessary nested writes

---

## ## 7. Debugging Sync Issues (Cloud)

**Symptoms:** Sync fails silently or doesn’t propagate data

### ✅ Fix:

- Check Realm App Services logs in MongoDB Atlas
- Ensure schema in backend matches the mobile schema
- Verify that user is authenticated before syncing
- Use `.syncSession.error` to handle errors programmatically

---

## ## Tools for Debugging

- **Realm Studio** — Desktop app for browsing local Realm files
- **MongoDB Atlas App Services Logs** — Inspect cloud sync issues
- **Console Logs** — Use `console.log` in services to trace flow

---

## ## Best Practices

- ✅ Keep schema and migrations in version control
- ✅ Use one consistent Realm instance
- ✅ Always test new schema versions with real data
- ❌ Don’t update production apps without testing migrations

---

## ## Key Takeaways

- Most Realm issues stem from schema mismatch, build problems, or unhandled sync
- Use Realm Studio and logs to inspect live issues
- Ensure consistent use of schemaVersion and encryption keys
- Expo Go does not support Realm — always use custom builds

---
