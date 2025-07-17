## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 23: Common Mistakes Developers Make with Realm

---

### ## Introduction

Even though Realm is easy to use, many developers fall into traps that can cause bugs, crashes, or performance bottlenecks.

This chapter highlights common mistakes and how to avoid them — saving you time and trouble in real projects.

---

## ## 1. Mutating Realm Objects Outside `write()`

```ts
// ❌ Incorrect
note.title = "New Title";

// ✅ Correct
realm.write(() => {
  note.title = "New Title";
});
```

> 🔐 Realm requires all changes to happen inside `realm.write()`.

---

## ## 2. Forgetting to Remove Listeners

```ts
// ❌ No cleanup
useEffect(() => {
  const tasks = realm.objects("Task");
  tasks.addListener(callback);
}, []);

// ✅ Proper cleanup
useEffect(() => {
  const tasks = realm.objects("Task");
  tasks.addListener(callback);
  return () => tasks.removeAllListeners();
}, []);
```

> 💥 This causes memory leaks and duplicated listeners.

---

## ## 3. Storing Realm Objects in React State

```ts
// ❌ Don't do this
const [note, setNote] = useState(realm.objectForPrimaryKey("Note", 1));

// ✅ Instead, clone the object or extract its fields
setNote({ ...realm.objectForPrimaryKey("Note", 1) });
```

> 🧠 Realm objects are live and mutable — not safe for direct state use.

---

## ## 4. Opening Realm Multiple Times

```ts
// ❌ Multiple opens in each component
const realm = await Realm.open({ schema: [...] });

// ✅ Singleton access
import { getRealm } from '../database';
const realm = await getRealm();
```

> 🔁 Reopening Realm wastes memory and causes instability.

---

## ## 5. Not Using Primary Keys

```ts
// ❌ Schema without primary key
{ name: 'Task', properties: { title: 'string' } }

// ✅ Use primaryKey for efficient updates
{ name: 'Task', primaryKey: 'id', properties: { id: 'int', title: 'string' } }
```

> ⚡ Primary keys improve lookup speed and avoid duplication.

---

## ## 6. Forgetting `schemaVersion` When Updating Models

```ts
// ❌ Adding fields without version change
schema: [UpdatedModel], schemaVersion: 1

// ✅ Bump version and add migration
schemaVersion: 2, onMigration: () => {}
```

> 🚨 Schema changes require versioning to avoid crashes.

---

## ## 7. Trying to Use Realm in Expo Go

```ts
// ❌ Realm doesn’t work in Expo Go
import Realm from "realm";

// ✅ Use custom dev client with EAS Build
```

> 🧱 Realm is a native module and needs native linking.

---

## ## Best Practices Summary

- ✅ Always use `realm.write()` for data updates
- ✅ Clean up listeners in `useEffect`
- ✅ Clone Realm objects before using them in UI state
- ✅ Use a shared Realm instance via context or helper
- ✅ Define and increment `schemaVersion` with every change

---

## ## Key Takeaways

- These common mistakes are easy to avoid once you’re aware of them
- Follow best practices to build stable, performant Realm apps
- Treat Realm as a database — not just another JS object store

---

Shall we wrap up with Chapter 24: Capstone Project — Offline Inventory Tracker App?
