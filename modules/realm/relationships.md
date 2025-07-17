## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 8: Working with Relationships — One-to-One and One-to-Many

---

### ## Introduction

Real-world data is often relational. For example, a user may have multiple tasks, or a blog post may have many comments. Realm makes it easy to model these relationships directly in your schema using **object references**.

This chapter explains how to model and query **one-to-one** and **one-to-many** relationships using Realm in React Native.

---

## ## One-to-One Relationships

In Realm, a one-to-one relationship is represented by linking one object to another using the type name.

### 🧾 Example

#### 📁 `/models/ProfileSchema.ts`

```ts
export const ProfileSchema = {
  name: "Profile",
  primaryKey: "id",
  properties: {
    id: "int",
    bio: "string",
  },
};
```

#### 📁 `/models/UserSchema.ts`

```ts
export const UserSchema = {
  name: "User",
  primaryKey: "id",
  properties: {
    id: "int",
    name: "string",
    profile: "Profile", // One-to-one link
  },
};
```

### 💡 Usage

```ts
realm.write(() => {
  const profile = realm.create("Profile", { id: 1, bio: "React Native dev" });
  realm.create("User", { id: 1, name: "Alice", profile });
});

const user = realm.objectForPrimaryKey("User", 1);
console.log(user.profile.bio); // "React Native dev"
```

---

## ## One-to-Many Relationships

To represent a one-to-many relationship, use the array type `[]` in the schema.

### 🧾 Example

#### 📁 `/models/TaskSchema.ts`

```ts
export const TaskSchema = {
  name: "Task",
  primaryKey: "id",
  properties: {
    id: "int",
    title: "string",
    done: "bool",
  },
};
```

#### 📁 `/models/UserSchema.ts` (continued)

```ts
export const UserSchema = {
  name: "User",
  primaryKey: "id",
  properties: {
    id: "int",
    name: "string",
    tasks: "Task[]", // One-to-many link
  },
};
```

### 💡 Usage

```ts
realm.write(() => {
  const task1 = realm.create("Task", {
    id: 1,
    title: "Install Realm",
    done: true,
  });
  const task2 = realm.create("Task", {
    id: 2,
    title: "Model relationships",
    done: false,
  });
  realm.create("User", { id: 1, name: "Bob", tasks: [task1, task2] });
});

const user = realm.objectForPrimaryKey("User", 1);
console.log(user.tasks.length); // 2
```

---

## ## Querying Relationships

### 🔹 Get a user's tasks

```ts
const user = realm.objectForPrimaryKey("User", 1);
user.tasks.forEach((task) => console.log(task.title));
```

### 🔹 Query users who have at least one task

```ts
const usersWithTasks = realm.objects("User").filtered("tasks.@count > 0");
```

---

## ## Best Practices

- ✅ Always define `primaryKey` for both parent and child objects
- ✅ Create related objects first, then assign them to the parent
- ✅ Use lists (`[]`) for collections, and plain types for single references
- ❌ Avoid circular relationships unless absolutely necessary

---

## ## Key Takeaways

- Use object references to build powerful, relational models in Realm
- One-to-one = single object link, one-to-many = object array (`[]`)
- Query across relationships using dot-notation and aggregate operators
- Realm relationships are lightweight and reactive — ideal for mobile apps

---

## 🛠️ Full Practice Example: One-to-Many User–Task Relationship

### 📁 File: `/schemas/UserSchema.ts`

```ts
export const UserSchema = {
  name: "User",
  primaryKey: "id",
  properties: {
    id: "int",
    name: "string",
    tasks: "Task[]", // One-to-many
  },
};
```

### 📁 File: `/schemas/TaskSchema.ts`

```ts
export const TaskSchema = {
  name: "Task",
  primaryKey: "id",
  properties: {
    id: "int",
    title: "string",
    completed: "bool",
  },
};
```

### 📁 File: `/example/relationshipDemo.ts`

```ts
import Realm from "realm";
import { UserSchema } from "../schemas/UserSchema";
import { TaskSchema } from "../schemas/TaskSchema";

(async () => {
  const realm = await Realm.open({
    schema: [UserSchema, TaskSchema],
  });

  // Step 1: Write data
  realm.write(() => {
    realm.deleteAll(); // Reset DB

    const task1 = realm.create("Task", {
      id: 101,
      title: "Write docs",
      completed: false,
    });

    const task2 = realm.create("Task", {
      id: 102,
      title: "Test relationships",
      completed: true,
    });

    realm.create("User", {
      id: 1,
      name: "Subrata",
      tasks: [task1, task2],
    });
  });

  // Step 2: Read and print
  const user = realm.objectForPrimaryKey("User", 1);
  console.log(`👤 ${user.name} has ${user.tasks.length} tasks:`);

  user.tasks.forEach((task) => {
    console.log(`- ${task.title} [${task.completed ? "✓" : "✗"}]`);
  });

  realm.close();
})();
```

---

### 🔍 What You’ll Learn

- How to model a **one-to-many** relationship with Realm
- How to **write nested data** into Realm
- How to **query and traverse** related records
- How to safely clear and reinitialize data during testing

---
