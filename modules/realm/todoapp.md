## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 10: Building an Offline-First Todo App

---

### ## Introduction

In this chapter, we'll build a complete **Offline-First Todo App** using Realm. This app demonstrates how to:

- Model tasks with checkboxes
- Store them locally using Realm
- Update and delete todos
- Handle app restarts with data persistence

This is perfect for developers who want a lightweight, fast local database that doesn't rely on internet connectivity.

---

## ## Step 1: Define the Todo Schema

### 📁 `/schemas/TodoSchema.ts`

```ts
export const TodoSchema = {
  name: "Todo",
  primaryKey: "id",
  properties: {
    id: "int",
    text: "string",
    completed: { type: "bool", default: false },
    createdAt: "date",
  },
};
```

---

## ## Step 2: Initialize Realm

### 📁 `/database/index.ts`

```ts
import Realm from "realm";
import { TodoSchema } from "../schemas/TodoSchema";

export const getRealm = async () => {
  return await Realm.open({
    schema: [TodoSchema],
    schemaVersion: 1,
  });
};
```

---

## ## Step 3: CRUD Services

### 📁 `/services/todoService.ts`

```ts
import { getRealm } from "../database";

export const addTodo = async (todo) => {
  const realm = await getRealm();
  realm.write(() => {
    realm.create("Todo", todo);
  });
};

export const toggleTodo = async (id) => {
  const realm = await getRealm();
  realm.write(() => {
    const todo = realm.objectForPrimaryKey("Todo", id);
    if (todo) todo.completed = !todo.completed;
  });
};

export const deleteTodo = async (id) => {
  const realm = await getRealm();
  realm.write(() => {
    const todo = realm.objectForPrimaryKey("Todo", id);
    if (todo) realm.delete(todo);
  });
};

export const getAllTodos = async () => {
  const realm = await getRealm();
  return realm.objects("Todo").sorted("createdAt", true);
};
```

---

## ## Step 4: End-to-End Practice Example

### 📁 `/example/todoAppDemo.ts`

```ts
import {
  addTodo,
  getAllTodos,
  toggleTodo,
  deleteTodo,
} from "../services/todoService";

(async () => {
  // Step 1: Add Todos
  await addTodo({
    id: 1,
    text: "Build Realm Todo App",
    createdAt: new Date(),
  });

  await addTodo({
    id: 2,
    text: "Test offline persistence",
    createdAt: new Date(),
  });

  // Step 2: List Todos
  const todos = await getAllTodos();
  console.log("✅ Current Todos:");
  todos.forEach((todo) => {
    console.log(`- ${todo.text} [${todo.completed ? "✓" : "✗"}]`);
  });

  // Step 3: Toggle status
  await toggleTodo(1);

  // Step 4: Delete a todo
  await deleteTodo(2);

  // Step 5: Final list
  const updated = await getAllTodos();
  console.log("📝 Updated Todos:");
  updated.forEach((todo) => {
    console.log(`- ${todo.text} [${todo.completed ? "✓" : "✗"}]`);
  });
})();
```

---

### ✅ What You Practiced

- Full offline CRUD support
- Toggling task status
- Sorting by creation time
- Code organization: schema + service + example

---
