# 📘 Chapter 3: Variables, Inputs, and Outputs

---

## 🧠 Introduction

Just like any programming language, Bash supports **variables** to store data, **user input** to interact, and **output** to display results.

In this chapter, we’ll learn how to:

- Declare and use variables
- Accept user input
- Display meaningful output

---

## 🧮 Declaring Variables

```bash
name="Subrata"
echo "Hello $name!"
```

> 🚫 No spaces around `=` when assigning values.

---

## 🔄 Using Variables

```bash
#!/bin/bash
greeting="Welcome"
user="DevOps Engineer"
echo "$greeting, $user!"
```

---

## 📝 Accepting User Input

```bash
#!/bin/bash
echo "Enter your name:"
read username
echo "Hello, $username!"
```

---

## 🗂 Script Arguments

You can pass arguments while running the script:

```bash
#!/bin/bash
echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
```

Run with:

```bash
./myscript.sh arg1 arg2
```

---

## 🧪 Hands-On Practice

### 1. 📄 Script: Welcome User

Create `welcome.sh`:

```bash
#!/bin/bash
echo "Enter your name:"
read name
echo "Hello, $name! Today is $(date)."
```

### 2. 🔢 Script: Sum Two Numbers

```bash
#!/bin/bash
echo "Enter first number:"
read a
echo "Enter second number:"
read b
sum=$((a + b))
echo "Sum is: $sum"
```

Make it executable:

```bash
chmod +x sum.sh
./sum.sh
```

---

## 📌 Summary

- Variables store values for reuse.
- `read` lets you take user input.
- Script arguments allow automation without prompting the user.

---

## 🔁 What’s Next

In the next chapter, we’ll explore **if-else conditions and loops** to add logic to your scripts.

---
