# 📘 Chapter 2: Getting Started with Bash and the Terminal

---

## 🧠 Introduction

Before we dive into scripting, it’s important to get comfortable with the **command-line interface (CLI)**. The terminal is your playground in Bash. In this chapter, you’ll learn how to navigate, manage files, and run basic commands confidently.

Whether you're on Linux, macOS, or Windows (via WSL or Git Bash), the terminal behaves similarly with Bash installed.

---

## 🧭 Terminal Basics

### 🖥 Opening the Terminal

- **Linux/macOS**: Look for “Terminal” in your applications.
- **Windows**: Use [Git Bash](https://gitforwindows.org/), [WSL](https://learn.microsoft.com/en-us/windows/wsl/), or [Windows Terminal](https://aka.ms/terminal).

---

## 📂 Navigating the Filesystem

| Command         | Description                     |
| --------------- | ------------------------------- |
| `pwd`           | Print current working directory |
| `ls`            | List contents of the directory  |
| `cd foldername` | Move into a folder              |
| `cd ..`         | Go one level up                 |
| `cd ~`          | Go to the home directory        |

```bash
pwd
cd ~
cd Desktop
ls
```

---

## 📄 Creating and Managing Files

| Command            | Description                 |
| ------------------ | --------------------------- |
| `touch filename`   | Create a new file           |
| `mkdir foldername` | Create a new folder         |
| `rm filename`      | Delete a file               |
| `rm -r foldername` | Delete a folder recursively |
| `cp file1 file2`   | Copy file                   |
| `mv file1 file2`   | Rename or move file         |

```bash
mkdir myfolder
cd myfolder
touch sample.txt
cp sample.txt backup.txt
mv sample.txt renamed.txt
rm renamed.txt
```

---

## ✏️ Editing Files

- Use `nano`, `vim`, or `code` (VSCode CLI) to open and edit files.

```bash
nano myscript.sh
```

Press `Ctrl+O` to save and `Ctrl+X` to exit.

---

## 💬 Reading File Content

```bash
cat myscript.sh
less myscript.sh
head -n 5 myscript.sh
tail -n 10 myscript.sh
```

---

## 🧪 Hands-On Practice

### 1. 🛠 Create and Navigate

```bash
mkdir chapter2_practice
cd chapter2_practice
```

### 2. 📁 Create a File

```bash
touch first_script.sh
echo "echo Hello from Bash" > first_script.sh
chmod +x first_script.sh
./first_script.sh
```

Expected Output:

```
Hello from Bash
```

### 3. ✂️ Modify Using Nano

```bash
nano first_script.sh
```

Add:

```bash
echo "Today is: $(date)"
```

Save and run again:

```bash
./first_script.sh
```

---

## 📌 Summary

- You’ve learned how to navigate the terminal, create and modify files, and execute your first script.
- These skills form the foundation of everything you’ll do in Bash scripting.
- Don’t be afraid of the terminal—it’s your most powerful tool.

---

## 🔁 What’s Next

Now that you're comfortable in the terminal, let’s move on to **variables, user inputs, and outputs** in Bash scripts.

---
