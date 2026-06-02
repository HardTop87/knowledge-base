---
slug: tenant-config
category: platform-configuration
status: published
lang: en
title: "How to Manage Tenant Config"
---

## What is Tenant Config?

Tenant Config is a secure key-value store for settings and credentials that your platform needs at runtime.

| Type | Description | Visible in UI |
|---|---|---|
| **Config** | Non-sensitive settings, URLs, feature flags | Yes |
| **Secret** | API keys, passwords, tokens | No — hidden after saving |

## How to manage Tenant Config

1. Go to **Menu → Developer → Config**
2. Click **+ Add Entry**
3. Choose **Config** or **Secret**
4. Enter the **Key** (e.g. `SMTP_HOST`, `OPENAI_API_KEY`) and **Value**
5. Click **Save**

## Reading config values in Workflows

In a Script or Transform node:

```lua
local api_key = cococo.config.get("OPENAI_API_KEY")
```

## Best practices

- Use uppercase, descriptive key names: `SENDGRID_API_KEY` not `key1`
- Always use **Secret** type for credentials — values cannot be read back after saving
- Keep a shared team document describing what each key is used for