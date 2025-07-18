# 📘 Chapter 8: Scheduling Tasks with Cron

---

## 🧠 Introduction

Running a script once is helpful—but **automating it to run at scheduled intervals** is what makes it truly powerful. That’s where `cron` comes in.

---

## ⏰ What is `cron`?

- A time-based job scheduler in Unix-like systems.
- Lets you run scripts periodically (e.g., hourly, daily, monthly).

---

## 🔧 Crontab Format

```bash
* * * * * /path/to/script.sh
| | | | |
| | | | +----- Day of the week (0-6 or Sun-Sat)
| | | +------- Month (1-12)
| | +--------- Day of the month (1-31)
| +----------- Hour (0-23)
+------------- Minute (0-59)
```

---

## 🔄 Editing Your Crontab

```bash
crontab -e
```

Add:

```bash
0 8 * * * /home/user/scripts/backup.sh
```

> Runs `backup.sh` every day at 8:00 AM.

---

## ✅ Check and Remove Cron Jobs

```bash
crontab -l   # List
crontab -r   # Remove
```

---

## 🧪 Hands-On Practice

### 1. Schedule a Log Reporter Script

```bash
crontab -e
```

Add:

```bash
0 */6 * * * /home/user/scripts/log_reporter.sh
```

> Runs every 6 hours.

### 2. Monitor Disk Space Every Night

```bash
30 23 * * * /home/user/scripts/disk_check.sh
```

---

## 📌 Summary

- `cron` lets you automate Bash scripts with simple time rules.
- Scheduled tasks reduce manual work and enforce reliability.
- Most monitoring scripts live or die by proper scheduling.

---

## 🔁 What’s Next

In the next chapter, you'll learn how to debug, structure, and productionize your scripts.

---
