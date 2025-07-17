## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 16: Optimizing Realm for Performance

---

### ## Introduction

While Realm is fast out-of-the-box, poorly written queries or structure can still hurt your app’s performance — especially as your data grows.

In this chapter, you'll learn how to:

- Write efficient queries
- Structure schemas for performance
- Use indexes and lazy loading
- Minimize write bottlenecks

---

## ## 1. Index Frequently Queried Fields

### 🔹 Example: Add index to `title`

```ts
const NoteSchema = {
  name: "Note",
  primaryKey: "id",
  properties: {
    id: "int",
    title: { type: "string", indexed: true },
    content: "string",
  },
};
```

> 🔍 Indexes speed up `.filtered()` queries on large datasets.

---

## ## 2. Use `objectForPrimaryKey` Instead of Filtering

```ts
// Fast
const note = realm.objectForPrimaryKey("Note", 1);

// Slower on large datasets
const note = realm.objects("Note").filtered("id == 1")[0];
```

> ✅ Prefer primary key lookups for direct access.

---

## ## 3. Avoid Unnecessary Writes

Realm writes are fast, but avoid unnecessary or repeated writes in a render cycle.

```ts
realm.write(() => {
  const note = realm.objectForPrimaryKey("Note", id);
  if (note && note.title !== newTitle) {
    note.title = newTitle;
  }
});
```

> 🔁 Check before updating to reduce churn and change notifications.

---

## ## 4. Paginate or Chunk Large Queries

If you display hundreds of records, don’t load all at once:

```ts
const paginatedNotes = realm.objects("Note").slice(0, 20);
```

> 🧠 This keeps the UI responsive and avoids unnecessary memory usage.

---

## ## 5. Use Lazy Rendering in UI

- Avoid mapping full live objects directly into FlatList or ScrollView
- Use Realm queries with `.slice()` or pre-transform into plain arrays

```ts
const displayData = useMemo(() => Array.from(notes).slice(0, 50), [notes]);
```

---

## ## 6. Minimize Realm Instance Openings

- Open Realm once and reuse across your app
- Avoid opening Realm inside frequently re-rendered components

```ts
// Better: central context/service layer that shares one realm instance
```

---

## ## Best Practices

- ✅ Use `.objectForPrimaryKey()` and `.indexed` for lookup fields
- ✅ Slice or paginate results for large lists
- ✅ Batch writes in one `realm.write()` block
- ✅ Avoid opening Realm multiple times in UI
- ❌ Don’t store large binary blobs or images inside Realm

---

## ## Key Takeaways

- Realm is fast, but query/write strategy impacts scalability
- Index wisely, paginate results, and avoid repeated writes
- A single Realm instance reused across services improves stability and speed

---
