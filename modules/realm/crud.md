## 🧱 **Realm for Scalable Mobile App Development**

### 📘 Part 1: Introduction to Realm

## Chapter 6: Creating, Reading, Updating, and Deleting Data (CRUD)

---

### ## Introduction

Realm makes data manipulation straightforward by allowing you to work directly with live JavaScript objects. In this chapter, you'll learn how to perform all four core CRUD operations with Realm in a React Native project.

We'll use a simple `Task` model as our base example and explore each operation step-by-step.

---

## ## Setup

Assume the following schema is already defined and registered:

```ts
export const TaskSchema = {
  name: "Task",
  primaryKey: "id",
  properties: {
    id: "int",
    title: "string",
    completed: { type: "bool", default: false },
  },
};
```

And Realm has been initialized like so:

```ts
import Realm from "realm";
import { TaskSchema } from "./models/TaskSchema";

const realm = await Realm.open({ schema: [TaskSchema] });
```

---

## ## 1. Creating Data

```ts
realm.write(() => {
  realm.create("Task", {
    id: 1,
    title: "Learn Realm CRUD",
    completed: false,
  });
});
```

> ✅ Always perform mutations inside `realm.write()`

---

## ## 2. Reading Data

### 🔹 Fetch All

```ts
const tasks = realm.objects("Task");
console.log([...tasks]);
```

### 🔹 Filtered Query

```ts
const completedTasks = realm.objects("Task").filtered("completed == true");
```

### 🔹 Primary Key Lookup

```ts
const task = realm.objectForPrimaryKey("Task", 1);
```

---

## ## 3. Updating Data

```ts
realm.write(() => {
  const task = realm.objectForPrimaryKey("Task", 1);
  if (task) {
    task.completed = true;
    task.title = "Updated title";
  }
});
```

> 🔁 Realm objects are **live**, so changes are reflected immediately.

---

## ## 4. Deleting Data

### 🔹 Delete One

```ts
realm.write(() => {
  const task = realm.objectForPrimaryKey("Task", 1);
  if (task) realm.delete(task);
});
```

### 🔹 Delete All

```ts
realm.write(() => {
  const allTasks = realm.objects("Task");
  realm.delete(allTasks);
});
```

---

## ## Best Practices

- ✅ Use `realm.write()` for every create/update/delete
- ✅ Use `primaryKey` to make lookup faster and updates easier
- ✅ Handle possible `null` results from `objectForPrimaryKey`
- ❌ Don’t mutate objects outside `realm.write()`
- ✅ Convert Realm objects to plain arrays before using them in React state (e.g., `Array.from(tasks)`)

---

## ## Key Takeaways

- Realm CRUD operations are fast, concise, and schema-based
- Queries return **live collections**, automatically updating your UI if listeners are set
- Always wrap mutations in `realm.write()` blocks
- Delete safely by checking if the object exists first

---
