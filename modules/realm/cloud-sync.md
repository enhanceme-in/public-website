## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 21: Realm + Cloud Sync (MongoDB Atlas Overview)

---

### ## Introduction

Realm offers powerful **cloud sync capabilities** through **MongoDB Atlas App Services**. This enables your app to:

- Sync data across devices
- Enable collaboration and offline persistence
- Leverage MongoDB cloud tools

This chapter gives you a high-level view of how Realm Cloud Sync works and how to set it up step-by-step.

---

## ## Key Concepts

### 🔹 App Services (Backend)

- Managed by MongoDB Atlas
- Includes Realm Sync, Authentication, Rules, Functions

### 🔹 Device Sync

- Handles bi-directional sync between mobile clients and Atlas cloud DB
- Supports conflict resolution, partitions, and offline persistence

### 🔹 Partition Value

- Used to isolate data (e.g., per user, per group)

```ts
sync: { user, partitionValue: 'user=123' }
```

---

## ## Setup Overview

### ✅ Step 1: Create an Atlas Project

- Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
- Create a **Cluster** (M0 is free)

### ✅ Step 2: Create a Realm App (App Services)

- Enable **Sync**
- Define your schema and partition key
- Add Authentication provider (e.g., Email/Password)

### ✅ Step 3: Install Realm SDK in Your App

```bash
npm install realm
```

---

## ## Sample Client Code

```ts
import Realm from "realm";
import { App, Credentials } from "realm";

const app = new App({ id: "your-realm-app-id" });
const credentials = Credentials.emailPassword("test@example.com", "password");
const user = await app.logIn(credentials);

const realm = await Realm.open({
  schema: [NoteSchema],
  sync: {
    user,
    partitionValue: user.id,
  },
});
```

---

## ## Sync Behavior

- Automatically handles conflict resolution (last write wins)
- Syncs in the background
- Works offline and re-syncs on reconnection

---

## ## MongoDB Atlas Tools

- **Schema tab**: Inspect and update synced schema
- **Logs**: Monitor sync success/failure
- **Triggers**: Execute server-side logic on changes
- **Rules**: Control access to synced data

---

## ## Best Practices

- ✅ Use partition keys for data isolation
- ✅ Design schema before enabling sync
- ✅ Start with local mode, then layer sync when ready
- ✅ Use Realm App Services logs for troubleshooting

---

## ## Key Takeaways

- Realm Sync bridges mobile devices with the cloud using MongoDB Atlas
- Setup includes cluster, App Services, schema, and client SDK
- Partitioning is crucial for scalability and user-specific data
- Atlas gives full control and visibility into your backend

---
