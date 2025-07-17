## 🧱 **Realm for Scalable Mobile App Development**

## Chapter 24: Capstone Project — Offline Inventory Tracker App

---

### ## Introduction

Welcome to your final project — the **Offline Inventory Tracker App**. This full-featured capstone combines everything you've learned about Realm, including:

- Schema modeling
- CRUD operations
- Relationships
- Sync-ready structure
- UI state management with hooks or context

By the end, you'll have a solid offline-first mobile app that feels professional and scalable.

---

## ## App Features

- 🗃 Add, edit, and delete items
- 🔄 Update stock quantities
- 📦 Group items under categories
- 🔍 Search and sort inventory
- 📶 Work 100% offline, optionally sync later

---

## ## Data Models

### 📁 `/schemas/CategorySchema.ts`

```ts
export const CategorySchema = {
  name: "Category",
  primaryKey: "id",
  properties: {
    id: "int",
    name: "string",
    items: "InventoryItem[]",
  },
};
```

### 📁 `/schemas/InventoryItemSchema.ts`

```ts
export const InventoryItemSchema = {
  name: "InventoryItem",
  primaryKey: "id",
  properties: {
    id: "int",
    name: "string",
    quantity: "int",
    unit: "string",
    lastUpdated: "date",
  },
};
```

---

## ## Realm Initialization

### 📁 `/database/index.ts`

```ts
import Realm from "realm";
import { CategorySchema } from "../schemas/CategorySchema";
import { InventoryItemSchema } from "../schemas/InventoryItemSchema";

export const getRealm = async () => {
  return await Realm.open({
    schema: [CategorySchema, InventoryItemSchema],
    schemaVersion: 1,
  });
};
```

---

## ## Services

### 📁 `/services/inventoryService.ts`

```ts
import { getRealm } from "../database";

export const addItem = async (item, categoryId) => {
  const realm = await getRealm();
  realm.write(() => {
    const category = realm.objectForPrimaryKey("Category", categoryId);
    const newItem = realm.create("InventoryItem", {
      ...item,
      lastUpdated: new Date(),
    });
    category.items.push(newItem);
  });
};

export const updateItemQty = async (id, newQty) => {
  const realm = await getRealm();
  realm.write(() => {
    const item = realm.objectForPrimaryKey("InventoryItem", id);
    if (item) {
      item.quantity = newQty;
      item.lastUpdated = new Date();
    }
  });
};

export const deleteItem = async (id) => {
  const realm = await getRealm();
  realm.write(() => {
    const item = realm.objectForPrimaryKey("InventoryItem", id);
    if (item) realm.delete(item);
  });
};

export const getAllCategories = async () => {
  const realm = await getRealm();
  return realm.objects("Category");
};

export const getItemsByCategory = async (categoryId) => {
  const realm = await getRealm();
  const category = realm.objectForPrimaryKey("Category", categoryId);
  return category?.items ?? [];
};
```

---

## ## Sample UI Integration

Use these in a real React Native screen:

```ts
const loadItems = async () => {
  const items = await getItemsByCategory(1);
  setInventory(Array.from(items));
};

const handleAdd = async () => {
  await addItem({ id: 3, name: "Paper Rolls", quantity: 50, unit: "pcs" }, 1);
  loadItems();
};
```

---

## ## Extra Enhancements (Optional)

- 🧮 Track stock history using an `InventoryLog` model
- 🌐 Add optional MongoDB sync via partition keys
- 🔒 Secure the app using Realm + App Services auth
- 📊 Display analytics (e.g. most updated items, low stock)

---

## ## Best Practices

- Use primary keys and indexing for performance
- Keep Realm and UI state decoupled
- Update stock with write transactions
- Use listener-based hooks for live inventory updates

---

## ✅ What You’ve Demonstrated

- Full CRUD and relational design
- Clean schema structure
- Real-world business logic
- Scalable architecture with offline support

---
