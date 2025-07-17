## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 7: Working with Queries and Filtering Data

---

### ## Introduction

One of Realm’s greatest strengths is its powerful yet simple query engine. You can filter and sort data using familiar syntax, similar to querying arrays or SQL — but with live, auto-updating results.

This chapter will guide you through the basics and advanced techniques of querying data in Realm.

---

## ## Basic Querying

### 🔹 Get All Records

```ts
const tasks = realm.objects("Task");
```

> This returns a **live collection** that updates in real time.

### 🔹 Convert to Array (for rendering)

```ts
const taskList = Array.from(tasks);
```

---

## ## Filtering Data

### 🔹 Filter with String Condition

```ts
const completedTasks = realm.objects("Task").filtered("completed == true");
```

### 🔹 Filter with Parameters (Recommended)

```ts
const tasksByTitle = realm
  .objects("Task")
  .filtered("title == $0", "Learn Realm");
```

> ✅ This avoids string injection and improves safety.

### 🔹 Using Compound Conditions

```ts
const tasks = realm
  .objects("Task")
  .filtered('completed == false AND title CONTAINS[c] "realm"');
```

- `CONTAINS[c]` = case-insensitive contains
- Use `AND`, `OR`, `NOT` like in SQL

---

## ## Sorting

### 🔹 Sort by One Field

```ts
const sortedTasks = realm.objects("Task").sorted("title");
```

### 🔹 Sort by Multiple Fields

```ts
const sorted = realm.objects("Task").sorted([
  ["completed", true], // descending
  ["title", false], // ascending
]);
```

---

## ## Chaining Queries

```ts
const activeSorted = realm
  .objects("Task")
  .filtered("completed == false")
  .sorted("title");
```

> ✅ All queries return a Realm.Results object that can be chained.

---

## ## Searching Text Fields

### 🔹 Case-Insensitive Partial Match

```ts
const searchResults = realm
  .objects("Task")
  .filtered("title CONTAINS[c] $0", "search");
```

---

## ## Listening to Query Results

```ts
useEffect(() => {
  const tasks = realm.objects("Task");
  tasks.addListener((collection, changes) => {
    console.log("Tasks changed:", changes);
  });

  return () => tasks.removeAllListeners();
}, []);
```

> 🧠 Use listeners to auto-update UI on data changes.

---

## ## Best Practices

- ✅ Use parameterized queries (`$0`) for dynamic values
- ✅ Chain `filtered()` and `sorted()` for clean logic
- ❌ Don’t modify query results directly — use write transactions
- ✅ Use `addListener` with care to avoid memory leaks

---

## ## Key Takeaways

- Realm supports a powerful and expressive filtering syntax
- Use chaining and parameterization to write safe, readable queries
- Queries return live results — no need to manually re-fetch
- Sorting and text searching are built-in and SQL-like

---

## 🛠️ Full Practice Example: Querying Tasks in Realm

### 📁 File: `/schemas/TaskSchema.ts`

```ts
export const TaskSchema = {
  name: "Task",
  primaryKey: "id",
  properties: {
    id: "int",
    title: "string",
    completed: "bool",
    priority: "int",
  },
};
```

---

### 📁 File: `/example/queryDemo.ts`

```ts
import Realm from "realm";
import { TaskSchema } from "../schemas/TaskSchema";

(async () => {
  const realm = await Realm.open({ schema: [TaskSchema] });

  // Insert sample data
  realm.write(() => {
    realm.deleteAll(); // Clean previous data
    realm.create("Task", {
      id: 1,
      title: "Buy groceries",
      completed: false,
      priority: 2,
    });
    realm.create("Task", {
      id: 2,
      title: "Study Realm queries",
      completed: false,
      priority: 1,
    });
    realm.create("Task", {
      id: 3,
      title: "Go for a run",
      completed: true,
      priority: 3,
    });
    realm.create("Task", {
      id: 4,
      title: "Fix bugs",
      completed: false,
      priority: 1,
    });
  });

  // Query: Incomplete tasks sorted by priority
  const results = realm
    .objects("Task")
    .filtered("completed == false")
    .sorted("priority");

  // Print tasks
  console.log("Incomplete tasks sorted by priority:");
  results.forEach((task) => {
    console.log(`🔹 ${task.title} (Priority: ${task.priority})`);
  });

  realm.close();
})();
```

---

### 🧪 What This Demonstrates

- Creating a Realm database with a `Task` schema
- Adding multiple records
- Querying with filters and sort
- Outputting and inspecting results

---

### ✅ How to Practice

- Change the `filtered` condition to search by keyword
- Add a listener and see how live updates work
- Wrap the query logic inside a React Native hook (`useEffect`) for UI integration

---
