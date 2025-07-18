# 📘 Chapter 11: Capstone Project – Daily Server Health Checker

---

## 🧠 Introduction

Welcome to the final and most exciting part of the book—a **real-world, end-to-end automation script** that brings together everything you’ve learned:

- Variables, conditionals, loops
- File I/O and string parsing
- Logging, debugging, and best practices
- Scheduling and modular scripting

You’ll build a **Daily Server Health Checker** script that:

1. Checks disk space, CPU load, and memory
2. Logs system health status
3. Sends a daily summary via email or stores it for dashboard integration

---

## 🎯 Project Goals

| Feature          | Description                             |
| ---------------- | --------------------------------------- |
| ✅ Disk Check    | Alert if disk usage crosses a threshold |
| ✅ CPU Load      | Capture average load                    |
| ✅ Memory Status | Report free and used memory             |
| ✅ Log & Report  | Append a daily health report            |
| ✅ Scheduled     | Run daily using `cron`                  |

---

## 🧰 Folder Structure

```bash
server-health-check/
├── check_disk.sh
├── check_cpu.sh
├── check_memory.sh
├── report.sh
├── health_checker.sh
├── logs/
└── reports/
```

---

## 🧩 Step-by-Step Modules

---

### 📁 1. `check_disk.sh`

```bash
#!/bin/bash
threshold=80
usage=$(df / | awk 'END{print $5}' | sed 's/%//')

if [ "$usage" -ge "$threshold" ]; then
  echo "Disk usage is HIGH: $usage%"
else
  echo "Disk usage is OK: $usage%"
fi
```

---

### 🧠 2. `check_cpu.sh`

```bash
#!/bin/bash
load=$(uptime | awk -F 'load average: ' '{ print $2 }' | cut -d',' -f1)
echo "CPU Load: $load"
```

---

### 🧠 3. `check_memory.sh`

```bash
#!/bin/bash
free=$(free -m | awk '/Mem:/ { print $4 }')
total=$(free -m | awk '/Mem:/ { print $2 }')
echo "Memory: ${free}MB free of ${total}MB"
```

---

### 📝 4. `report.sh`

```bash
#!/bin/bash
timestamp=$(date +"%Y-%m-%d %H:%M:%S")
log_dir="./logs"
report_dir="./reports"
mkdir -p "$log_dir" "$report_dir"

report_file="$report_dir/health_$timestamp.txt"
echo "Health Report - $timestamp" > "$report_file"
echo "---------------------------" >> "$report_file"

./check_disk.sh >> "$report_file"
./check_cpu.sh >> "$report_file"
./check_memory.sh >> "$report_file"

echo "Report saved to $report_file"
```

---

### 🔁 5. `health_checker.sh`

```bash
#!/bin/bash
set -euo pipefail
log() {
  echo "$(date): $1" >> ./logs/health.log
}

log "Starting daily health check"
bash report.sh
log "Health check complete"
```

---

## 🧪 Final Testing

Make all scripts executable:

```bash
chmod +x *.sh
```

Run the main script:

```bash
./health_checker.sh
```

Check `reports/` folder for generated output.

---

## ⏰ Schedule with Cron

Edit crontab:

```bash
crontab -e
```

Add this to run daily at 7 AM:

```bash
0 7 * * * /path/to/health_checker.sh
```

---

## 🔄 Optional Enhancements

- 📧 Email the report using `mail` or `sendmail`
- 📤 Upload to Slack or dashboard with `curl`
- 📈 Store outputs to a CSV or InfluxDB for monitoring

---

## 📌 Summary

You’ve just built a fully automated **server health monitoring tool** using only Bash!

✅ It’s modular
✅ It’s scheduled
✅ It’s production-safe
✅ It’s immediately useful

---

## 🏁 What You’ve Achieved

Over the past chapters, you’ve:

✅ Gone from Bash basics to real-world scripts
✅ Written conditionals, loops, and reusable functions
✅ Built automation tools like log parsers and backups
✅ Debugged and productionized your scripts
✅ Integrated Bash with CI/CD and DevOps workflows
✅ Built a working, daily server monitor script!

---

# 🎓 Congratulations, You’re Bash Ready!

This is just the beginning. Bash scripting opens doors to:

- Automated infrastructure
- Smarter deployments
- Leaner DevOps practices
- Career growth in backend/infra roles

Keep experimenting. Keep scripting. 💻⚡

---

# 📎 Appendix

### ✅ Bash Cheat Sheet

| Task               | Command                      |
| ------------------ | ---------------------------- |
| Current directory  | `pwd`                        |
| List files         | `ls -al`                     |
| Create file        | `touch file.txt`             |
| Create directory   | `mkdir folder`               |
| Delete file/folder | `rm` / `rm -r`               |
| Variables          | `name="John"`                |
| If statement       | `if [ $x -gt 10 ]; then ...` |
| For loop           | `for i in {1..5}; do ...`    |
| While loop         | `while [ $x -lt 5 ]; do ...` |
| Functions          | `function_name() { ... }`    |
| Cron jobs          | `crontab -e`                 |
| Debugging          | `set -x`                     |
| Strict mode        | `set -euo pipefail`          |

---
