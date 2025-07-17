## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 11: Data Sync Considerations in Realm (Local vs Sync Mode)

---

### ## Introduction

Realm offers two primary ways to use its database:

- **Local Mode**: Data is stored only on the device.
- **Sync Mode**: Data syncs with MongoDB Atlas in the cloud.

In this chapter, we’ll compare these modes, explain when to use each, and cover setup tips and potential challenges.

---

## ## 1. Local Mode (Default)

### ✅ Features

- Data lives on the device only
- Fast and persistent across app restarts
- Ideal for offline-first apps

### 🛠 Example

No special config needed:

```ts
const realm = await Realm.open({ schema: [NoteSchema] });
```

### 📌 Use When:

- You don’t need data to sync across devices
- Your app should work 100% offline
- You want minimal setup with full control

---

## ## 2. Sync Mode (Cloud Sync with MongoDB Atlas)

### ✅ Features

- Data is synced across devices & users
- Built-in authentication via MongoDB Realm
- Automatically handles conflict resolution

### ⚠️ Requirements

- MongoDB Atlas account
- Setup of App Services → Sync → Authentication → Schema
- Realm SDK configured for Sync

### 🛠 Example Setup

```ts
import { App, Credentials } from "realm";

const app = new App({ id: "your-app-id" });
const credentials = Credentials.emailPassword("email", "password");
const user = await app.logIn(credentials);

const realm = await Realm.open({
  schema: [NoteSchema],
  sync: {
    user,
    partitionValue: "user=123",
  },
});
```

### 📌 Use When:

- You need real-time collaboration or multi-device sync
- You’re building shared user apps (e.g., chat, shared to-dos)
- Backend logic or analytics is required in MongoDB

---

## ## Key Differences

| Feature          | Local Mode    | Sync Mode                  |
| ---------------- | ------------- | -------------------------- |
| Offline Support  | ✅ Yes        | ✅ Yes                     |
| Sync to Cloud    | ❌ No         | ✅ Yes                     |
| Setup Complexity | 🟢 Low        | 🔴 High (requires backend) |
| Authentication   | ❌ Not needed | ✅ Required                |
| Ideal For        | Solo apps     | Collaborative apps         |

---

## ## Choosing the Right Mode

- **Start with Local**: Easier to prototype, debug, and test
- **Move to Sync** when:

  - You have a solid schema
  - Multi-user support is needed
  - You’re ready for cloud infrastructure

---

## ## Best Practices

- ✅ Design your schema with Sync in mind (add partition keys)
- ✅ Use email/password or JWT auth for secure logins
- ❌ Don’t attempt Sync without understanding Realm App Services
- ✅ Monitor sync conflicts using Realm's developer tools

---

## ## Key Takeaways

- Realm supports both offline-only and cloud-sync use cases
- Local mode is great for fast, offline-first apps
- Sync mode adds multi-device support and cloud persistence
- Choose based on your app’s architecture and user needs

---
