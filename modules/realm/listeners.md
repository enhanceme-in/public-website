## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 14: Realm Change Listeners and Reactive Updates

---

### ## Introduction

Realm provides a powerful feature called **change listeners**, allowing your app to react to database updates in real time.

In this chapter, you'll learn how to:

- Add listeners to Realm objects and collections
- Update UI components automatically
- Use change notifications safely with React Native

---

## ## Why Use Change Listeners?

- Keep UI in sync with database changes
- Avoid manual state updates after write operations
- Enable reactive programming patterns

---

## ## Adding Listeners to a Collection

```ts
import Realm from "realm";

const tasks = realm.objects("Task");

// Add listener
const listener = (collection, changes) => {
  console.log("🔄 Tasks updated!");
};
tasks.addListener(listener);

// Remove listener when no longer needed
tasks.removeListener(listener);
```

> 🧠 Collection listeners notify on insertions, deletions, and modifications.

---

## ## Adding Listeners in React Components

### 📁 `/hooks/useLiveTasks.ts`

```ts
import { useEffect, useState } from "react";
import Realm from "realm";
import { getRealm } from "../database";

export const useLiveTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let realm;
    let results;

    (async () => {
      realm = await getRealm();
      results = realm.objects("Task");
      setTasks([...results]);

      results.addListener(() => {
        setTasks([...results]);
      });
    })();

    return () => {
      results?.removeAllListeners();
      realm?.close();
    };
  }, []);

  return tasks;
};
```

---

## ## Listening to Single Object Changes

```ts
const task = realm.objectForPrimaryKey("Task", 1);

const objectListener = (obj, changes) => {
  console.log("📝 Task changed:", changes);
};

if (task) task.addListener(objectListener);
```

> ℹ️ Use object listeners for tracking updates to specific items

---

## ## Change Events

- `insertions[]`: Indexes of newly added items
- `modifications[]`: Indexes of changed items
- `deletions[]`: Indexes of deleted items

```ts
results.addListener((collection, changes) => {
  changes.insertions.forEach((index) => {
    console.log("➕ New item at index:", index);
  });
});
```

---

## ## Best Practices

- ✅ Remove listeners on component unmount
- ✅ Convert live Realm collections to arrays before using in UI
- ❌ Don’t modify Realm data inside a listener directly
- ✅ Use `useEffect` or Redux middleware for side effects

---

## ## Key Takeaways

- Realm change listeners keep your UI updated with no extra fetches
- Attach listeners to collections or individual objects
- Always clean up listeners to avoid memory leaks
- Perfect for chat apps, task lists, and dashboards

---
