# 📘 Chapter 4: Conditional Logic and Loops

---

## 🧠 Introduction

You now know how to get input and print output. But how do we **make decisions** or **repeat tasks**? That’s where **conditionals** and **loops** come in.

---

## ✅ If-Else Statements

```bash
#!/bin/bash
echo "Enter your age:"
read age

if [ "$age" -ge 18 ]; then
  echo "You're eligible to vote."
else
  echo "Sorry, not eligible yet."
fi
```

---

## 🔁 While Loop

```bash
#!/bin/bash
count=1
while [ $count -le 5 ]
do
  echo "Count: $count"
  ((count++))
done
```

---

## 🔂 For Loop

```bash
#!/bin/bash
for i in {1..5}
do
  echo "Number: $i"
done
```

---

## ⚠️ Case Statement

```bash
#!/bin/bash
echo "Enter a choice: start/stop/status"
read input

case "$input" in
  start)
    echo "Starting..."
    ;;
  stop)
    echo "Stopping..."
    ;;
  status)
    echo "Checking status..."
    ;;
  *)
    echo "Invalid input"
    ;;
esac
```

---

## 🧪 Hands-On Practice

### 1. 🔍 Even or Odd Checker

```bash
#!/bin/bash
echo "Enter a number:"
read num
if (( num % 2 == 0 )); then
  echo "Even"
else
  echo "Odd"
fi
```

### 2. 🔂 Countdown Timer

```bash
#!/bin/bash
for i in {5..1}
do
  echo "$i..."
  sleep 1
done
echo "Go!"
```

---

## 📌 Summary

- Conditionals add logic to your scripts.
- Loops let you repeat tasks.
- `case` is great for multiple-choice branching.

---

## 🔁 What’s Next

In the next chapter, we’ll learn how to **work with files, strings, and logs** using powerful Bash features.

---
