## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 22: Realm with TypeScript and Clean Code Patterns

---

### ## Introduction

Using **TypeScript** with Realm helps catch type errors early and improves code maintainability. In this chapter, you’ll learn how to:

- Define Realm models using TypeScript
- Improve your services and schemas with type safety
- Apply clean code principles with Realm

---

## ## 1. Define Typed Realm Models

### ✅ Define a TypeScript interface

```ts
export interface INote {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}
```

### ✅ Then declare the Realm schema

```ts
export const NoteSchema: Realm.ObjectSchema = {
  name: "Note",
  primaryKey: "id",
  properties: {
    id: "int",
    title: "string",
    content: "string",
    createdAt: "date",
    updatedAt: "date?",
  },
};
```

---

## ## 2. Strongly Typed Access in Services

```ts
const realm = await getRealm();
const note = realm.objectForPrimaryKey<INote>("Note", 1);
```

> 🧠 This provides full autocompletion and type-checking.

---

## ## 3. Group Services for Readability

### 📁 `/services/noteService.ts`

```ts
import { INote } from '../types/Note';

export const NoteService = {
  add: async (note: INote) => { ... },
  update: async (id: number, updates: Partial<INote>) => { ... },
  remove: async (id: number) => { ... },
  getAll: async (): Promise<INote[]> => { ... },
};
```

> 🧼 This improves discoverability and testing.

---

## ## 4. Use Factories for Schema Reuse

```ts
export const createNoteSchema = (name = "Note"): Realm.ObjectSchema => ({
  name,
  primaryKey: "id",
  properties: {
    id: "int",
    title: "string",
    content: "string",
    createdAt: "date",
    updatedAt: "date?",
  },
});
```

> 📦 Useful in testing and versioning environments

---

## ## 5. Use Type Guards and Helpers

```ts
function isNote(obj: any): obj is INote {
  return obj && typeof obj.id === "number" && typeof obj.title === "string";
}
```

---

## ## Best Practices

- ✅ Use `interface` for data shape definitions
- ✅ Keep schema and types in sync manually or via codegen
- ✅ Use partial types for update functions
- ✅ Keep services modular and self-contained
- ❌ Don’t pass Realm objects directly between layers

---

## ## Key Takeaways

- TypeScript makes Realm safer, cleaner, and easier to maintain
- Define both interfaces and schemas to match data structures
- Modularize services, use helpers, and rely on IDE autocomplete
- Strong typing reduces bugs and improves readability

---
