## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 9: Building a Note-Taking App with Realm

---

### ## Introduction

In this chapter, we’ll put everything you’ve learned so far into practice by building a basic **Note-Taking App** using Realm. This mini-project will cover:

- Creating schemas
- Performing CRUD operations
- Organizing your codebase
- Rendering data in a basic UI (if used with React Native components)

Whether you're a beginner or intermediate developer, this project will give you confidence to start using Realm in your own apps.

---

## ## Models

### 📁 `/schemas/NoteSchema.ts`

```ts
// This file defines the structure of a Note object in Realm
export const NoteSchema = {
  name: "Note",
  primaryKey: "id",
  properties: {
    id: "int", // Unique ID for the note
    title: "string", // Title of the note
    content: "string", // Body content of the note
    createdAt: "date", // Creation timestamp
    updatedAt: "date?", // Optional last-updated timestamp
  },
};
```

---

## ## Realm Initialization

### 📁 `/database/index.ts`

```ts
// Function to initialize and return a Realm instance with the Note schema
import Realm from "realm";
import { NoteSchema } from "../schemas/NoteSchema";

export const getRealm = async () => {
  return await Realm.open({
    schema: [NoteSchema],
    schemaVersion: 1,
  });
};
```

---

## ## Services

### 📁 `/services/noteService.ts`

```ts
// Service functions to add, update, delete, and get notes
import { getRealm } from "../database";

// Add a new note
export const addNote = async (note) => {
  const realm = await getRealm();
  realm.write(() => {
    realm.create("Note", note);
  });
};

// Update a note by ID
export const updateNote = async (id, updates) => {
  const realm = await getRealm();
  realm.write(() => {
    const note = realm.objectForPrimaryKey("Note", id);
    if (note) {
      Object.assign(note, updates, { updatedAt: new Date() });
    }
  });
};

// Delete a note by ID
export const deleteNote = async (id) => {
  const realm = await getRealm();
  realm.write(() => {
    const note = realm.objectForPrimaryKey("Note", id);
    if (note) realm.delete(note);
  });
};

// Get all notes, sorted by newest first
export const getAllNotes = async () => {
  const realm = await getRealm();
  return realm.objects("Note").sorted("createdAt", true);
};
```

---

## ## End-to-End Practice Example

### 📁 File: `/example/noteAppDemo.ts`

```ts
// Demo script to test all note functions: add, read, update, delete
import {
  addNote,
  getAllNotes,
  updateNote,
  deleteNote,
} from "../services/noteService";

(async () => {
  // Step 1: Add two new notes
  await addNote({
    id: 1,
    title: "First Note",
    content: "This is your first note using Realm.",
    createdAt: new Date(),
  });

  await addNote({
    id: 2,
    title: "Second Note",
    content: "Try editing or deleting this one.",
    createdAt: new Date(),
  });

  // Step 2: Read and display all notes
  const notes = await getAllNotes();
  console.log("🗒 All Notes:");
  notes.forEach((note) => {
    console.log(`- ${note.title}: ${note.content}`);
  });

  // Step 3: Update the title of the first note
  await updateNote(1, { title: "Updated First Note" });

  // Step 4: Delete the second note
  await deleteNote(2);

  // Step 5: Display final list of notes
  const updated = await getAllNotes();
  console.log("🗂 Notes after update/delete:");
  updated.forEach((note) => {
    console.log(`- ${note.title}`);
  });
})();
```

---

### ✅ What You Learned

- Creating a full-featured Note model
- Writing CRUD services around Realm
- Performing real-world operations: add, edit, delete, list
- Running an end-to-end script with isolated logic

---
