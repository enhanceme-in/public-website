# 📘 Chapter 7: Real-World Automation Projects

---

## 🧠 Introduction

Now that you've learned the building blocks of Bash scripting, it’s time to apply them to real problems. In this chapter, we’ll build a series of **mini-projects** that automate common DevOps tasks. These are practical, time-saving tools that you can immediately use in your work.

---

## 🛠️ Project 1: Log Scanner and Error Reporter

### 🎯 Goal:

Scan a directory of `.log` files, extract lines with “ERROR” or “CRITICAL”, and write them to a report file with timestamps.

### 🔧 Script: `log_reporter.sh`

```bash
#!/bin/bash

log_dir="/var/log/myapp"
report="error_report_$(date +%Y-%m-%d).txt"
echo "Generating report..."

> "$report" # clear or create file

for logfile in "$log_dir"/*.log; do
  echo "Scanning: $logfile"
  grep -Ei "ERROR|CRITICAL" "$logfile" >> "$report"
done

echo "Report saved to: $report"
```

> 💡 Schedule it using `cron` to run daily.

---

## 📁 Project 2: Auto Backup Script

### 🎯 Goal:

Backup a project folder to another location and timestamp the backup.

### 🔧 Script: `backup.sh`

```bash
#!/bin/bash

source_dir="$HOME/myproject"
backup_dir="$HOME/backups"
timestamp=$(date +%Y-%m-%d-%H%M)
backup_name="backup_$timestamp.tar.gz"

mkdir -p "$backup_dir"
tar -czf "$backup_dir/$backup_name" "$source_dir"

echo "Backup created at $backup_dir/$backup_name"
```

---

## 🧪 Project 3: Disk Space Monitor

### 🎯 Goal:

Check available disk space. If usage exceeds 80%, send an alert.

### 🔧 Script: `disk_check.sh`

```bash
#!/bin/bash

threshold=80
used=$(df / | grep / | awk '{ print $5 }' | sed 's/%//')

if [ "$used" -ge "$threshold" ]; then
  echo "Disk usage is above $threshold%! Currently: $used%" | mail -s "Disk Alert" you@example.com
else
  echo "Disk usage is OK: $used%"
fi
```

> 📨 Replace `mail` command with any notifier you prefer: Slack, Telegram, or simple logging.

---

## 🔄 Project 4: Service Health Checker

### 🎯 Goal:

Check if a service is running; restart if not.

### 🔧 Script: `check_service.sh`

```bash
#!/bin/bash

service="nginx"
if systemctl is-active --quiet "$service"; then
  echo "$service is running"
else
  echo "$service is NOT running. Attempting to start..."
  systemctl start "$service"
fi
```

---

## 📌 Summary

- These projects combine all concepts learned so far: loops, conditionals, functions, file handling, and scheduling.
- Real-world scripts like log scanners, disk monitors, and backup automators are common DevOps tools.
- You can integrate these into larger monitoring systems or CI/CD pipelines.

---

## 🔁 What’s Next

In the next chapter, we’ll schedule your scripts using `cron` so they can run automatically without manual intervention.

---
