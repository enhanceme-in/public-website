## 🧱 **Realm for Scalable Mobile App Development**

### 📘 Part 1: Introduction to Realm

## Chapter 5: Understanding Realm Schema — Models and Types

---

### ## Introduction

A **Realm schema** is the blueprint that defines the structure of the data stored in your app. In this chapter, you’ll learn how to define models, use various data types, and build structured, relational data models using Realm in React Native.

This knowledge forms the foundation for everything you’ll do with Realm — from querying to syncing and migrating data.

---

## ## What is a Schema in Realm?

A schema is a plain JavaScript object that describes the fields, data types, and optional behaviors of a Realm model.

Each schema includes:

- A `name` (model name)
- A `properties` object (field definitions)
- An optional `primaryKey` and default values

---

## ## Basic Schema Example

```ts
export const TaskSchema = {
  name: "Task",
  primaryKey: "id",
  properties: {
    id: "int",
    title: "string",
    completed: { type: "bool", default: false },
    dueDate: "date?", // optional field
  },
};
```

---

## ## Supported Property Types

Realm supports a range of scalar and object types:

| Type   | Description                      |
| ------ | -------------------------------- |
| string | Text                             |
| int    | Integer                          |
| float  | Floating point                   |
| double | Double precision                 |
| bool   | Boolean (true/false)             |
| date   | JavaScript `Date` object         |
| object | Nested object or linked model    |
| list   | Array of another model or scalar |

---

## ## Optional vs Required Fields

- Add `?` to make a field optional:

```ts
email: "string?"; // optional
```

- Default is required:

```ts
name: "string"; // required
```

---

## ## Object Relationships

Realm supports direct object references:

### 🔹 One-to-One

```ts
user: "User";
```

### 🔹 One-to-Many

```ts
comments: "Comment[]";
```

You must register both models in your schema array:

```ts
const realm = new Realm({ schema: [UserSchema, CommentSchema] });
```

---

## ## Embedded Objects (Advanced)

Realm also supports embedded objects that don’t exist independently:

```ts
address: { type: 'Address', objectType: 'embedded' }
```

Used for sub-documents like `Address`, `GeoLocation`, etc.

---

## ## Best Practices

- ✅ Always use a `primaryKey` for easy lookups and updates
- ✅ Use `?` for optional fields to avoid null errors
- ✅ Separate each schema into its own file
- ✅ Favor `list` and object references for structured data
- ❌ Avoid deeply nested unstructured models — keep data flat when possible

---

## ## Key Takeaways

- Realm schemas define your model structure using `name` and `properties`
- Support for rich data types and relationships simplifies modeling
- One-to-one and one-to-many are easy to define with object and list types
- Use embedded objects when sub-data shouldn't be independently queried
