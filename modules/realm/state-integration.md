## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 13: Using Realm with Redux or Context API

---

### ## Introduction

Realm handles data persistence, but your app still needs a way to manage **UI state** and **app-level logic**. This is where **Redux** and **React Context API** come in.

In this chapter, you'll learn how to integrate Realm with both Redux and Context — enabling clean separation between your persistent data and global state management.

---

## ## Option 1: Using Realm with Context API

### 🧱 When to use:

- For small to medium apps
- When Redux is overkill

### 📁 `/context/NoteContext.tsx`

```tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllNotes, addNote, deleteNote } from "../services/noteService";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    const result = await getAllNotes();
    setNotes([...result]);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, loadNotes, addNote, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);
```

### ✅ Benefits:

- Easy to set up
- Tightly coupled with your UI components
- Works well with Realm listeners too

---

## ## Option 2: Using Realm with Redux

### 🧱 When to use:

- For larger apps with complex state needs
- When you already use Redux for UI state, auth, etc.

### 📁 `/redux/actions/noteActions.ts`

```ts
import { getAllNotes } from "../../services/noteService";

export const loadNotes = () => async (dispatch) => {
  const notes = await getAllNotes();
  dispatch({ type: "LOAD_NOTES", payload: [...notes] });
};
```

### 📁 `/redux/reducers/noteReducer.ts`

```ts
const initialState = {
  notes: [],
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_NOTES":
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};
```

### 📁 `/redux/store.ts`

```ts
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { noteReducer } from "./reducers/noteReducer";

const rootReducer = combineReducers({
  noteState: noteReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
```

### ✅ Benefits:

- Familiar Redux pattern
- Works well with middleware like Thunk or Saga
- Keeps persistent Realm data in sync with UI state

---

## ## Best Practices

- ✅ Keep Realm logic inside services — not in reducers or components
- ✅ Use `Realm.addListener()` in Context or Redux `useEffect`
- ❌ Don’t directly mutate Realm objects inside reducers
- ✅ Keep Realm and Redux/Context state **decoupled but connected**

---

## ## Key Takeaways

- Use Context API for simpler apps and lightweight global state
- Use Redux for more scalable, complex state management
- Realm handles data; Context or Redux handles **view-layer state**
- Keep Realm operations in services and update your app state accordingly

---
