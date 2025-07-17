## 🧱 **Realm for Scalable Mobile App Development**

### 📘 Part 1: Introduction to Realm

## Chapter 4: Setting Up a Clean Project Structure for Realm

---

### ## Introduction

As your app grows, poor project structure can lead to bugs, confusion, and burnout. This chapter teaches you how to **organize your Realm codebase** cleanly from the start.

Instead of mixing schema definitions, database access, and business logic in a single file, we'll structure things into layers for **maintainability, reusability, and testability**.

---

### ## Recommended Folder Structure

Here’s a clean folder layout tailored for Realm in React Native apps:

```
/src
  /models         ← Realm schemas (e.g., UserSchema.ts)
  /database       ← Realm instance, helpers, migrations
  /services       ← Business logic (CRUD, sync handling)
  /hooks          ← Custom hooks for UI data access
  /screens        ← UI components using Realm data
```

---

### ## Step-by-Step Setup

#### 1. **Create a Schema**

`/src/models/UserSchema.ts`

```ts
export const UserSchema = {
  name: "User",
  primaryKey: "id",
  properties: {
    id: "int",
    name: "string",
    email: "string?",
  },
};
```

> ✅ Keep each schema in its own file. This improves clarity and modularity.

---

#### 2. **Create Realm Configuration**

`/src/database/index.ts`

```ts
import Realm from "realm";
import { UserSchema } from "../models/UserSchema";

const realm = new Realm({
  schema: [UserSchema],
  schemaVersion: 1,
  onMigration: (oldRealm, newRealm) => {
    // Optional migration logic
  },
});

export default realm;
```

> ✅ Centralize your Realm config. This makes future migrations or versioning easy.

---

#### 3. **Abstract Data Logic into Services**

`/src/services/UserService.ts`

```ts
import realm from "../database";

export const createUser = (user) => {
  realm.write(() => {
    realm.create("User", user);
  });
};

export const getUsers = () => {
  return realm.objects("User");
};

export const deleteUser = (id) => {
  realm.write(() => {
    const user = realm.objectForPrimaryKey("User", id);
    if (user) realm.delete(user);
  });
};
```

> ✅ Never use Realm directly in your UI layer. Wrap logic in service modules.

---

#### 4. **Create Hooks for UI Access**

`/src/hooks/useUsers.ts`

```ts
import { useEffect, useState } from "react";
import { getUsers } from "../services/UserService";

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const results = getUsers();
    setUsers([...results]);

    results.addListener(() => setUsers([...results]));

    return () => {
      results.removeAllListeners();
    };
  }, []);

  return users;
};
```

> ✅ Use hooks for reactive data access in React Native components.

---

### ## Best Practices

- ✅ **Keep business logic out of UI components**
- ✅ **Isolate Realm setup in one place**
- ✅ **Organize schemas in `/models`**
- ✅ **Use hooks to manage state + Realm listeners**
- 🔁 **Implement migrations proactively**
- 🧪 **Make services testable by mocking Realm**

---

### ## Common Pitfalls

- ❌ Accessing Realm directly in screens
- ❌ Not closing or reusing Realm instances
- ❌ Mixing models, UI, and logic in the same file
- ❌ Skipping schema versioning for later updates

---

### ## Key Takeaways

- Structure your Realm project using layers: models, database, services, hooks, and screens.
- Clean architecture improves maintainability and scales well as the app grows.
- Hooks + services make your app more testable and UI more reactive.
- Planning your structure early saves future tech debt and confusion.

---
