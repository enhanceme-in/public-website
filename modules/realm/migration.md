## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 15: Handling Schema Migration in Production

---

### ## Introduction

As your app evolves, so will your data models. Adding new fields, changing types, or renaming models requires **schema migration**.

In this chapter, you'll learn how Realm handles migrations, how to implement them safely, and avoid breaking your users' data in production.

---

## ## When Do You Need a Migration?

You need a migration whenever:

- You change the schema definition
- Add, remove, or rename a field
- Modify the type of a property
- Add a new model

---

## ## Basic Migration Setup

Realm uses a `schemaVersion` and an optional `onMigration` function.

### 🔹 Before Change

```ts
const realm = await Realm.open({
  schema: [NoteSchema],
  schemaVersion: 1,
});
```

### 🔹 After Adding a New Field

```ts
const NoteSchema = {
  name: "Note",
  primaryKey: "id",
  properties: {
    id: "int",
    title: "string",
    content: "string",
    updatedAt: "date?", // new field added
  },
};

const realm = await Realm.open({
  schema: [NoteSchema],
  schemaVersion: 2,
  onMigration: (oldRealm, newRealm) => {
    const oldNotes = oldRealm.objects("Note");
    const newNotes = newRealm.objects("Note");

    for (let i = 0; i < oldNotes.length; i++) {
      newNotes[i].updatedAt = null; // default value for new field
    }
  },
});
```

---

## ## Tips for Writing Migration Logic

- Use `oldRealm` to access previous data
- Use `newRealm` to update or reshape the new data
- Always test migrations on test data
- Increment the `schemaVersion` every time

---

## ## Safe Default Values

If you don’t provide a migration function, Realm tries to auto-fill new fields:

- Numbers default to `0`
- Strings to `""`
- Objects to `null`

> But it’s best to write an `onMigration` to ensure control and avoid unexpected results.

---

## ## Best Practices

- ✅ Always bump `schemaVersion` when changing models
- ✅ Include `onMigration` for every version jump
- ✅ Test migrations before releasing to users
- ✅ Keep schema logic centralized and version-controlled
- ❌ Don’t delete or rename models without a clear migration plan

---

## ## Key Takeaways

- Realm uses `schemaVersion` and `onMigration` to handle model changes
- Migrations must update data in-place without losing user info
- Always test migrations before deploying app updates
- A solid migration strategy prevents crashes and corrupted data

---
