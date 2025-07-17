## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 18: Testing Realm-Integrated Components

---

### ## Introduction

Testing Realm-integrated code ensures your data logic is reliable and your UI behaves as expected. This chapter focuses on:

- Unit testing Realm services
- Testing React components that use Realm
- Mocking Realm in Jest

---

## ## 1. Unit Testing Realm Logic

Focus on testing your **services** that contain database operations.

### 📁 `/services/noteService.test.ts`

```ts
import Realm from "realm";
import { NoteSchema } from "../schemas/NoteSchema";

describe("Note Service Tests", () => {
  let realm;

  beforeEach(async () => {
    realm = await Realm.open({ schema: [NoteSchema], inMemory: true });
    realm.write(() => {
      realm.create("Note", {
        id: 1,
        title: "Test",
        content: "...",
        createdAt: new Date(),
      });
    });
  });

  afterEach(() => {
    if (realm && !realm.isClosed) realm.close();
  });

  it("should find note by id", () => {
    const note = realm.objectForPrimaryKey("Note", 1);
    expect(note.title).toBe("Test");
  });
});
```

> 🧪 Use `inMemory: true` for fast, isolated test databases.

---

## ## 2. Mocking Realm for UI Tests

When testing React components, mock Realm to avoid initializing a real DB.

### 📁 `/__mocks__/realm.ts`

```ts
const mockRealm = jest.fn().mockImplementation(() => ({
  write: jest.fn((fn) => fn()),
  objects: jest.fn(() => []),
  create: jest.fn(),
  objectForPrimaryKey: jest.fn(() => null),
}));

export default mockRealm;
```

Then mock it in Jest:

```ts
jest.mock("realm", () => require("../__mocks__/realm"));
```

---

## ## 3. Testing Components with Hooks

Use mocks or `inMemory` Realm to simulate data in `useEffect()`-based hooks.

### 📁 `NoteList.test.tsx`

```tsx
import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import NoteList from "../components/NoteList";
import * as noteService from "../services/noteService";

jest.mock("../services/noteService");

it("shows list of notes", async () => {
  noteService.getAllNotes.mockResolvedValue([
    { id: 1, title: "Mock Note", content: "Mock Content" },
  ]);

  const { getByText } = render(<NoteList />);
  await waitFor(() => {
    expect(getByText("Mock Note")).toBeTruthy();
  });
});
```

---

## ## Best Practices

- ✅ Keep Realm logic in services — easier to test
- ✅ Use in-memory Realm for unit tests
- ✅ Mock Realm or services in UI/component tests
- ✅ Use `jest.clearAllMocks()` between tests

---

## ## Key Takeaways

- Test Realm services using in-memory mode
- Mock Realm when testing UI components
- Separate Realm logic from components to keep tests clean
- Reliable tests improve developer confidence and app stability

---
