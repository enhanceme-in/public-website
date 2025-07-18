# 📘 Chapter 5: Working with Files, Logs, and Strings

---

## 🧠 Introduction

Bash is at its best when dealing with files, logs, and text. Whether you're parsing server logs or modifying configuration files, mastering these skills will unlock a new level of automation.

In this chapter, you'll learn how to:

- Read from and write to files
- Search and filter logs
- Manipulate strings and extract data

---

## 📂 Reading and Writing Files

### 📖 Read a File Line by Line

```bash
#!/bin/bash
filename="sample.txt"
while read line; do
  echo "Line: $line"
done < "$filename"
```

### ✍️ Write Output to a File

```bash
#!/bin/bash
echo "Server status as of $(date)" > status.txt
uptime >> status.txt
```

- `>` creates or overwrites a file
- `>>` appends to a file

---

## 🔍 Searching Inside Files

### 🔎 `grep` – Search for a Pattern

```bash
grep "ERROR" server.log
```

### 🧪 Combine with Pipe

```bash
cat server.log | grep "503"
```

### 📌 Use with Regex

```bash
grep -E "ERROR|WARNING" server.log
```

---

## 🔄 Replace Text in Files

### Using `sed`

```bash
sed 's/oldtext/newtext/g' file.txt
```

- Replace “oldtext” with “newtext” globally (`g`) in a file.

---

## 📊 Count and Summarize Data

### Count Lines

```bash
wc -l server.log
```

### Count Occurrences of a Word

```bash
grep -o "ERROR" server.log | wc -l
```

---

## 🧩 String Manipulation in Bash

### Extract File Extension

```bash
filename="report.csv"
extension="${filename##*.}"
echo "$extension"  # Output: csv
```

### Convert to Uppercase

```bash
text="hello"
echo "${text^^}"  # Output: HELLO
```

### Substring Extraction

```bash
text="error at line 42"
echo "${text:11:4}"  # Output: line
```

---

## 🧪 Hands-On Practice

### 1. 📄 Read and Summarize a Log File

```bash
#!/bin/bash
echo "Reading error log..."
grep "ERROR" app.log > errors_only.txt
count=$(wc -l < errors_only.txt)
echo "Total errors found: $count"
```

### 2. 🧼 Clean Log File by Removing Empty Lines

```bash
#!/bin/bash
grep -v '^$' app.log > cleaned_log.txt
```

### 3. 🪄 Replace “ERROR” with “ALERT”

```bash
#!/bin/bash
sed 's/ERROR/ALERT/g' app.log > alert.log
```

---

## 📌 Summary

- You’ve learned how to read, write, and manipulate files using Bash.
- Powerful tools like `grep`, `sed`, and `wc` help analyze and transform data.
- String manipulation makes your scripts more dynamic and flexible.

---

## 🔁 What’s Next

Next, we’ll learn how to organize your scripts into **functions and modules** for reusability and maintainability.

---
