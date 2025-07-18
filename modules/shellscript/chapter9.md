# 📘 Chapter 9: Debugging and Best Practices

---

## 🧠 Introduction

Even simple Bash scripts can become tricky to debug as they grow. This chapter helps you **write cleaner, safer scripts** and teaches you how to **find and fix bugs** when things go wrong.

---

## 🐞 Debugging Techniques

### 1. 🔍 Use `set -x` for Tracing

Add this at the top of your script:

```bash
#!/bin/bash
set -x
```

It will print each command before executing it, like this:

```
+ echo "Hello"
Hello
```

---

### 2. 🛑 Stop on Errors: `set -e`

```bash
set -e
```

Your script will exit immediately if a command fails—useful for critical tasks.

### 3. 🧨 Combine All

```bash
#!/bin/bash
set -euo pipefail
```

Explanation:

- `-e`: Exit on error
- `-u`: Treat unset variables as an error
- `-o pipefail`: Fail if any command in a pipe fails

---

### 4. 🧾 Log Output

Instead of printing to terminal, write logs:

```bash
log_file="script.log"
echo "$(date): Starting backup" >> "$log_file"
```

---

## 🧹 Best Practices

| Best Practice                | Why It Matters                            |
| ---------------------------- | ----------------------------------------- |
| ✅ Use `#!/bin/bash`         | Ensures correct shell                     |
| ✅ Quote your variables      | Prevents word splitting or globbing       |
| ✅ Use functions             | Improves readability and reuse            |
| ✅ Name variables clearly    | Improves understanding                    |
| ✅ Log all actions           | Aids in debugging                         |
| ✅ Test before scheduling    | Avoids recurring failure loops            |
| ✅ Use relative paths wisely | Always prefer absolute paths in cron jobs |

---

## 💀 Common Mistakes

- ❌ Using variables without quotes

  ```bash
  rm $file  # risky!
  rm "$file"  # safe
  ```

- ❌ Forgetting file permissions
  Use `chmod +x script.sh` before execution

- ❌ Ignoring return codes
  Always check if your command succeeded

---

## 🧪 Hands-On Practice

### 1. 🧪 Create a Safe Script Template

```bash
#!/bin/bash
set -euo pipefail

log() {
  echo "$(date): $1" >> script.log
}

log "Starting job"

# Simulate a task
mkdir -p output
cp myfile.txt output/

log "Job finished"
```

### 2. 🧪 Debug a Broken Script

**bad.sh**

```bash
#!/bin/bash
echo "Starting"
mkdir data
cd data
cp important.txt copied.txt  # File might not exist
echo "Done"
```

Run with:

```bash
bash -x bad.sh
```

Fix using `set -e` and `if [ -f ... ]` guards.

---

## 📌 Summary

- Use `set -x` to trace, `set -euo pipefail` for safety.
- Logging and quoting variables are essential for robustness.
- A little structure goes a long way in making your scripts production-ready.

---

## 🔁 What’s Next

Let’s integrate your Bash knowledge with **DevOps tools and workflows** in the next chapter.

---
