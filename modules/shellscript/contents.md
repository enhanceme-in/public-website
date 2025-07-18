**Bash Scripting for DevOps: From Basics to Automation**

✍️ **Author**: Subrata Das

---

## 🎯 **Goal **:

Learn to write powerful, real-world Bash scripts that automate tasks, parse logs, manage servers, and improve DevOps workflows—from zero to expert level.

---

## 📄 **Introduction**

If you're a DevOps engineer, system admin, or developer tired of manually running the same commands over and over again—this book is for you.

Bash scripting is one of the most underrated yet essential skills in tech. It's fast, flexible, and available on every Unix-like system. Whether you're parsing server logs, automating deployment, or cleaning up disk space, a good Bash script can save hours of your time.

In this book, we'll start from the ground up. You don’t need prior experience in Bash—just curiosity and basic command-line familiarity. Every chapter builds on the previous one with real-world examples, culminating in a capstone automation project at the end.

---

## 🧱 **Table of Contents**

1. **Chapter 1: Why Learn Bash?**
2. **Chapter 2: Getting Started with Bash and the Terminal**
3. **Chapter 3: Variables, Inputs, and Outputs**
4. **Chapter 4: Conditional Logic and Loops**
5. **Chapter 5: Working with Files, Logs, and Strings**
6. **Chapter 6: Writing Reusable Functions and Modular Scripts**
7. **Chapter 7: Real-World Automation Projects**
8. **Chapter 8: Scheduling Tasks with Cron**
9. **Chapter 9: Debugging and Best Practices**
10. **Chapter 10: Integrating Bash with DevOps Tools**
11. **Chapter 11: Capstone Project – Daily Server Health Checker**
12. **Appendix: Bash Cheat Sheet + Resources**

---

# “Why Every React Native Dev Should Learn Bash”

At first glance, **Bash scripting** may seem unrelated to **React Native development**, but in reality, it can significantly enhance your workflow, automation capabilities, and DevOps readiness as a mobile developer.

Here’s how Bash scripting is important for a **React Native developer**:

---

## 🔧 1. **Automating Repetitive Tasks**

React Native projects often involve tasks like:

- Cleaning the build cache
- Resetting Metro bundler
- Rebuilding apps
- Pushing APKs/IPAs to testing platforms

With Bash, you can automate all of this:

```bash
#!/bin/bash
watchman watch-del-all
rm -rf node_modules
npm install
cd ios && pod install && cd ..
npx react-native start --reset-cache
```

> ✅ Save time and avoid human error

---

## 📱 2. **Build & Release Automation**

Instead of running long CLI commands repeatedly:

```bash
#!/bin/bash
# build-and-release.sh
cd android
./gradlew assembleRelease
adb install app/build/outputs/apk/release/app-release.apk
```

> ✅ Speed up internal testing, CI/CD, or Play Store uploads.

---

## 🔁 3. **Streamline CI/CD Pipelines**

If you're using **GitHub Actions**, **Bitrise**, or **Jenkins**, you'll often need Bash for:

- Setting up environment variables
- Running custom shell steps
- Deploying builds conditionally

```bash
if [ "$ENV" == "production" ]; then
  echo "Building production version"
  npx react-native run-android --variant=release
fi
```

---

## 📂 4. **File System Tasks in DevOps**

Sometimes you may need to:

- Create backup scripts for `.keystore` or `.env` files
- Handle certificates or provisioning profiles
- Parse logs from your build process

All easily handled with Bash.

---

## 🚀 5. **Fast Local Tools & Developer Utilities**

Build your own command-line tools to:

- Bootstrap new components
- Generate common folder structures
- Lint or format code

```bash
#!/bin/bash
echo "Creating new component: $1"
mkdir "$1"
touch "$1/$1.js"
touch "$1/$1.styles.js"
```

---

## 🧠 6. **Better Understanding of Native Toolchains**

React Native apps rely on:

- Android SDK (Gradle)
- Xcode (CLI tools)
- Node/NPM/Yarn CLI

Most of these tools expose Bash-friendly interfaces. Knowing Bash helps you debug better, script smarter, and integrate native behaviors more effectively.

---

## 🛡️ 7. **System-Level Debugging**

If you ever encounter:

- Metro bundler not starting
- Gradle daemon issues
- Permissions problems
- iOS provisioning mismatches

…you’ll often solve them in the terminal using Bash one-liners or scripted checks.

---

## 💡 Conclusion

Even though Bash isn’t a core React Native language, it acts like a **superpower for serious developers**.

It helps you:

- Work faster 🏃
- Deliver more reliably ✅
- Debug smarter 🧠
- Contribute to DevOps workflows 🤝

---
