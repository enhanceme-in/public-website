## 🧱 **Realm for Scalable Mobile App Development**

### 📘 Part 1: Introduction to Realm

## Chapter 2: Realm vs SQLite vs AsyncStorage

---

### ## Introduction

When choosing local storage for your React Native app, you're likely to come across three popular options: **Realm**, **SQLite**, and **AsyncStorage**. Each of these tools serves a purpose, but they come with different capabilities, performance profiles, and complexities.

This chapter provides a side-by-side comparison to help you decide which tool fits your use case best.

---

## ## Quick Overview

| Feature           | Realm           | SQLite                        | AsyncStorage                                |
| ----------------- | --------------- | ----------------------------- | ------------------------------------------- |
| Type              | Object DB       | Relational DB                 | Key-Value Store                             |
| Performance       | 🔥 Fast         | ⚡ Medium                     | 🐢 Slow for large data                      |
| Queries           | JavaScript APIs | SQL queries                   | No queries (keys only)                      |
| Data Modeling     | Schema-based    | Table-based                   | No schema                                   |
| Relationships     | Native support  | Manual joins                  | ❌ Not supported                            |
| Sync Capabilities | MongoDB Atlas   | ❌ None                       | ❌ None                                     |
| Offline-first     | ✅ Yes          | ✅ Yes                        | ✅ Yes                                      |
| Setup Difficulty  | 🟡 Medium       | 🔴 High                       | 🟢 Very Low                                 |
| Popular Libraries | `realm`         | `react-native-sqlite-storage` | `@react-native-async-storage/async-storage` |

---

## ## Use Case Breakdown

### ✅ Realm — Best When:

- You need **relational, structured data** locally
- Your app is **offline-first** or sync-enabled
- You want **live updates** in the UI (Realm objects are reactive)

### ✅ SQLite — Best When:

- You need to **port legacy SQL systems** into mobile
- You want fine-grained control over **query logic**
- You are comfortable writing and optimizing SQL

### ✅ AsyncStorage — Best When:

- You only need to store **small key-value pairs** (tokens, flags, user settings)
- You want a **quick, simple** persistence layer
- Performance is not a priority

---

## ## Code Comparison

### 🔹 Realm

```ts
const realm = await Realm.open({ schema: [UserSchema] });
realm.write(() => {
  realm.create("User", { id: 1, name: "Alice" });
});
```

### 🔹 SQLite

```ts
const db = SQLite.openDatabase("mydb.db");
db.transaction((tx) => {
  tx.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT);");
  tx.executeSql("INSERT INTO users (id, name) VALUES (?, ?);", [1, "Alice"]);
});
```

### 🔹 AsyncStorage

```ts
await AsyncStorage.setItem("@username", "Alice");
const user = await AsyncStorage.getItem("@username");
```

---

## ## Best Practices

- Use **Realm** for complex data models with local relationships
- Use **SQLite** only if your app already uses SQL or needs full control over query logic
- Use **AsyncStorage** sparingly and never for large or structured data
- Avoid storing sensitive information unencrypted in AsyncStorage
- Always profile performance for your specific use case

---

## ## Key Takeaways

- **Realm** is ideal for apps needing reactive models, sync, and structure
- **SQLite** is powerful but comes with SQL complexity and maintenance
- **AsyncStorage** is only suitable for small-scale storage
- Choosing the right tool improves maintainability, scalability, and app performance
