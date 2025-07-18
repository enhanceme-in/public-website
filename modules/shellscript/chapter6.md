# 📘 Chapter 6: Writing Reusable Functions and Modular Scripts

---

## 🧠 Introduction

As your scripts grow, you’ll want to make them:

- Reusable
- Easier to maintain
- Cleaner to read

Functions in Bash allow you to **encapsulate logic**, avoid repetition, and make your scripts modular.

---

## 📦 Defining a Function

```bash
greet() {
  echo "Hello, $1!"
}
```

Use it like:

```bash
greet "Subrata"
```

---

## ♻️ Reusing Code

```bash
log_message() {
  echo "$(date): $1" >> app.log
}
log_message "Server started"
```

---

## 🪪 Returning Values

```bash
add() {
  sum=$(( $1 + $2 ))
  echo $sum
}

result=$(add 5 7)
echo "Sum is $result"
```

> ⚠️ Bash functions don’t support traditional `return`—use `echo` and capture output.

---

## 🧳 Modular Scripts

Split functionality into separate files:

**utils.sh**

```bash
log() {
  echo "$(date): $1"
}
```

**main.sh**

```bash
#!/bin/bash
source utils.sh
log "Script started"
```

---

## 🧪 Hands-On Practice

### 1. 📦 Create and Use a Logging Function

```bash
log_event() {
  echo "$(date): $1" >> system.log
}
log_event "Health check started"
```

### 2. 📂 Organize Code into `functions.sh` and `main.sh`

**functions.sh**

```bash
greet_user() {
  echo "Welcome, $1!"
}
```

**main.sh**

```bash
#!/bin/bash
source functions.sh
greet_user "DevOps Ninja"
```

---

## 📌 Summary

- Functions make scripts cleaner and reusable.
- Use `source` to import functions from other files.
- Capture function output using `$(...)`.

---

## 🔁 What’s Next

In the next chapter, we’ll build **real-world automation scripts** using all the tools you've learned so far.

---
