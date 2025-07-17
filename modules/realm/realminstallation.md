## 🧱 **Realm for Scalable Mobile App Development**

### 📘 Part 1: Introduction to Realm

## Chapter 3: Installing Realm in a React Native Project

---

### ## Introduction

Installing Realm in a React Native project requires a few extra steps compared to pure JavaScript libraries — especially if you're not using Expo. In this chapter, you’ll learn how to get started with Realm in both React Native CLI and Expo (via EAS).

We'll also walk through basic validation to ensure Realm is correctly linked and ready for use.

---

## ## Prerequisites

- Node.js v14 or higher
- React Native (0.68+ recommended)
- Xcode (for iOS) and/or Android Studio (for Android)
- macOS (for iOS development)

---

## ## Installation Steps (React Native CLI)

### 🔹 Step 1: Install Realm

```bash
npm install realm
```

### 🔹 Step 2: Rebuild Native Code

```bash
npx pod-install
npx react-native run-ios # or run-android
```

### 🔹 Step 3: Validate Installation

```ts
import Realm from "realm";

console.log("Realm path:", Realm.defaultPath);
```

---

## ## Installation with Expo (using EAS Build)

### ❗ Note: Realm does not work in plain Expo Go

You need to use [EAS Build](https://docs.expo.dev/eas/) to build the app with custom native modules.

### 🔹 Step 1: Prebuild

```bash
npx expo install realm
npx expo prebuild
```

### 🔹 Step 2: Configure EAS

```json
// eas.json
"build": {
  "development": {
    "developmentClient": true,
    "distribution": "internal"
  },
  "preview": {
    "distribution": "internal"
  },
  "production": {}
}
```

### 🔹 Step 3: Build

```bash
eas build -p android --profile preview
eas build -p ios --profile preview
```

---

## ## Common Errors & Fixes

- ❌ `TypeError: Cannot read property 'open' of undefined`

  - Make sure native code is linked and compiled (check `Podfile`)

- ❌ App crashes on start

  - Check Realm version compatibility with React Native version

- ❌ Realm not found in Expo Go

  - Use custom dev client via `eas build --profile development`

---

## ## Key Takeaways

- Use **React Native CLI** or **EAS Build** for Realm — Expo Go does not support native modules
- Always rebuild native code after installing Realm
- Realm works seamlessly after linking and validating schema setup
