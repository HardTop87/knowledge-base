---
slug: tenant-config
category: platform-configuration
status: published
lang: en
title: "How to Manage Tenant Config"
---

## What is Tenant Config?

Tenant Config is a secure key-value store for settings and credentials that your
platform needs at runtime.

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

## Reading config values

Read the tenant configuration through the `getConfig` GraphQL query — for example from a
Workflow Script node:

```lua
local res = ctx.graphql.query([[
  query { getConfig { entries { name type value } } }
]])
-- res.data.getConfig.entries: each has name, type (Config or Secret), and value
```

To read a **single** entry, Scripts and Custom Apps have a shortcut — `ctx.config.get`
returns just that key's value (or `nil` if missing or redacted):

```lua
local smtpHost = ctx.config.get("SMTP_HOST")
```

(`ctx.config.get` is not available inside Integrations — they read install-time config
via `ctx.integration.getConfig` instead.)

**Secret values are redacted** by the API — they cannot be read back through `getConfig`
or any script. Only non-secret **Config** entries return their value. Secrets are used by
the platform where they are referenced; they are never handed back to client or script code.

## Best practices

- Use uppercase, descriptive key names: `SENDGRID_API_KEY` not `key1`
- Always use **Secret** type for credentials — their values cannot be read back after saving
- Keep a shared team document describing what each key is used for
