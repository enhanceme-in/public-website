## 🧱 **Realm for Scalable Mobile App Development**

### 📘 Part 1: Introduction to Realm

## Chapter 1: What is Realm and Why Use It?

---

### ## Introduction

Mobile apps today handle more data than ever — from user settings to entire offline product catalogs. Traditional options like `AsyncStorage` or `SQLite` often fall short when it comes to performance, reliability, and ease of use.

This is where **Realm** steps in — a modern mobile database designed specifically for **offline-first** and **real-time sync** experiences in mobile apps.

If you're building a React Native app and want robust, scalable local storage, **Realm is a game-changer.**

---

## ## Explanation

### ✅ What is Realm?

Realm is a **local object database** designed for mobile apps. Unlike traditional databases, Realm works by storing live objects directly on disk — no need to write SQL queries or manage schemas manually.

- Built for **performance** and **offline access**
- Offers **zero-copy reads** and high-speed write operations
- Can optionally sync with MongoDB Atlas

### 🆚 Realm vs SQLite vs AsyncStorage

| Feature       | Realm          | SQLite        | AsyncStorage      |
| ------------- | -------------- | ------------- | ----------------- |
| Type          | Object DB      | Relational DB | Key-Value Store   |
| Performance   | Fast           | Moderate      | Slow for big data |
| Schema        | Required       | Manual        | None              |
| Relationships | Native support | Complex joins | Not supported     |
| Offline-first | Yes            | Yes           | Yes               |
| Sync          | MongoDB Atlas  | Manual setup  | ❌                |

### 🔧 When Should You Use Realm?

- When your app needs to store structured, relational data
- When offline access is critical
- When you expect **large datasets** or frequent updates
- When you want a **smooth integration with cloud sync** (MongoDB Atlas)

---

## ## Real-World Use Cases

1. **Offline-First Productivity Apps** (e.g., Notes, Todo)
2. **E-Commerce Apps** with local product catalogs and cart
3. **Inventory/Field Apps** where network may be spotty
4. **Chat Applications** needing real-time local rendering before sync
5. **Health & Fitness Apps** tracking detailed metrics locally

---

## ## Code Examples

### 🔹 Basic Realm Setup

```ts
import Realm from "realm";

// 1. Define your schema
const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    title: "string",
    completed: { type: "bool", default: false },
  },
  primaryKey: "_id",
};

// 2. Open Realm
const realm = await Realm.open({ schema: [TaskSchema] });

// 3. Write data
realm.write(() => {
  realm.create("Task", { _id: 1, title: "Learn Realm", completed: false });
});

// 4. Query data
const tasks = realm.objects("Task");
console.log(tasks); // Live collection
```

### 🔹 Update a Task

```ts
realm.write(() => {
  const task = realm.objectForPrimaryKey("Task", 1);
  task.completed = true;
});
```

### 🔹 Delete a Task

```ts
realm.write(() => {
  const task = realm.objectForPrimaryKey("Task", 1);
  realm.delete(task);
});
```

---

## ## Best Practices

### ✅ Do This

- Always define a **primary key** for each model
- Use `realm.write()` for all mutations
- Group Realm logic in separate **data service files**
- Close realm instances when done (if not using a singleton)
- Use **listeners** for live data reactivity in UI

### ❌ Avoid This

- Mutating Realm objects outside of `write()` blocks
- Creating multiple Realm instances unnecessarily
- Forgetting to handle **schema versioning** and **migrations**

---

## ## Key Takeaways

- Realm is a powerful alternative to SQLite and AsyncStorage for structured local data
- Best suited for apps that need **offline support**, **fast performance**, and **data relations**
- Easy to get started with simple schemas and CRUD operations
- Avoid common mistakes like ignoring `write()` or schema migrations
- Great foundation for apps planning to use **MongoDB Atlas Device Sync**

---

## ## Advanced Insights (Optional)

### 🔁 Live Objects & Queries

Realm queries return **live objects** — so changes reflect automatically in the UI without re-fetching.

```ts
const tasks = realm.objects("Task");
// Add listener
tasks.addListener((collection, changes) => {
  console.log("Collection updated!", changes);
});
```

### 🔄 Schema Migrations

Once your schema changes (e.g., adding a field), you'll need to handle **migrations** properly:

```ts
const realm = await Realm.open({
  schema: [TaskSchema],
  schemaVersion: 2,
  onMigration: (oldRealm, newRealm) => {
    // migrate data if necessary
  },
});
```
