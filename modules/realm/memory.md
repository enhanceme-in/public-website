## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 17: Memory Management and Large Data Handling

---

### ## Introduction

While Realm is highly optimized for mobile, managing memory becomes important when dealing with **large datasets**, **real-time listeners**, or **embedded lists**.

This chapter will help you:

- Avoid memory leaks
- Manage large object collections
- Keep your app smooth even under heavy data loads

---

## ## 1. Use Slicing and Pagination

Avoid loading entire datasets into memory:

```ts
const pagedResults = realm.objects("Product").slice(0, 50);
```

### 🔁 Paginate on scroll

```ts
const [page, setPage] = useState(1);
const products = useMemo(() => {
  return Array.from(realm.objects("Product")).slice(0, page * 50);
}, [page]);
```

---

## ## 2. Always Remove Listeners

Listeners are powerful but can create memory leaks if not removed:

```ts
useEffect(() => {
  const tasks = realm.objects("Task");
  tasks.addListener(() => setTasks([...tasks]));
  return () => tasks.removeAllListeners();
}, []);
```

---

## ## 3. Use `close()` When Done

Always close the Realm instance when leaving screens or when the app is backgrounded.

```ts
useEffect(() => {
  let realmInstance;
  (async () => {
    realmInstance = await getRealm();
    // do stuff
  })();

  return () => realmInstance?.close();
}, []);
```

---

## ## 4. Avoid Holding Realm Objects in State

Realm objects are live and reactive, but they shouldn’t be stored directly in React state:

```ts
// ❌ Avoid this
const [note, setNote] = useState(realm.objectForPrimaryKey("Note", 1));

// ✅ Do this
const [note, setNote] = useState(null);
useEffect(() => {
  const obj = realm.objectForPrimaryKey("Note", 1);
  setNote(obj ? { ...obj } : null);
}, []);
```

---

## ## 5. Watch for Deeply Nested Structures

Embedded objects and deeply nested arrays can cause large memory spikes.

- Keep schemas shallow where possible
- Avoid embedding large lists of images, videos, or blobs

---

## ## Best Practices

- ✅ Always remove listeners in `useEffect` cleanup
- ✅ Use `slice()` and pagination for large datasets
- ✅ Avoid storing Realm live objects in UI state
- ✅ Close Realm when it’s no longer needed
- ❌ Don’t hold unnecessary references to huge query results

---

## ## Key Takeaways

- Realm is efficient, but proper memory management prevents lags and crashes
- Clean up listeners and Realm instances after use
- Use slicing and pagination to keep memory usage under control
- Avoid unnecessary deep nesting or large embedded objects

---
