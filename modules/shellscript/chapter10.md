# 📘 Chapter 10: Integrating Bash with DevOps Tools

---

## 🧠 Introduction

Bash doesn’t live in isolation. In real DevOps environments, Bash scripts often run **inside pipelines**, **trigger deployments**, or **configure infrastructure**.

In this chapter, you’ll learn how to:

- Run Bash in CI/CD tools
- Use Bash in Docker and Kubernetes
- Call APIs from Bash

---

## ⚙️ Bash in CI/CD

### 🔁 GitHub Actions

**.github/workflows/deploy.yml**

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Run script
        run: |
          chmod +x deploy.sh
          ./deploy.sh
```

---

## 🐳 Bash in Docker

### Dockerfile Example:

```Dockerfile
FROM alpine
COPY startup.sh /startup.sh
RUN chmod +x /startup.sh
ENTRYPOINT ["/startup.sh"]
```

---

## ☁️ Bash in Kubernetes

Use Bash in **init containers** or **startup scripts** inside pods.

```yaml
command: ["/bin/sh", "-c"]
args: ["./health-check.sh"]
```

---

## 🔌 Calling APIs from Bash

### Using `curl`

```bash
#!/bin/bash
curl -s https://api.github.com/users/octocat | grep name
```

### POST Request

```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"name":"Subrata"}' https://example.com/api/users
```

---

## 🧪 Hands-On Practice

### 1. 🧪 Use Bash in GitHub Workflow

Create `.github/workflows/backup.yml`

```yaml
name: Auto Backup

on:
  schedule:
    - cron: "0 0 * * *"

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Create backup
        run: |
          mkdir backup
          echo "Backup: $(date)" > backup/info.txt
```

### 2. 🧪 Call GitHub API from Bash

```bash
#!/bin/bash
echo "Fetching user..."
curl -s https://api.github.com/users/SubrataDas | grep "name"
```

---

## 📌 Summary

- Bash is powerful in automation pipelines.
- You can use it in GitHub Actions, Docker containers, and Kubernetes pods.
- `curl` makes it easy to integrate REST APIs.

---

## 🔁 What’s Next

In the final chapter, you’ll build a **capstone project** that combines everything you’ve learned.

---
