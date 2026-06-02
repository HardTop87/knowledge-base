---
slug: build-integration
category: developer-tools
status: published
lang: en
title: "How to Build an Integration"
---

## Before you start

- Familiarity with the integration runtime — see [What are Integrations?](#what-are-integrations)
- If you'll call a third-party API, have its **OpenAPI/Swagger** schema handy

## Step 1 — (Optional) Upload the external API schema

If the Integration calls an external API, upload its **OpenAPI/Swagger** schema first. The platform indexes its endpoints, models, and fields so you can reference them precisely while building.

## Step 2 — Create a Draft

Create a new integration **Draft**. A draft holds the manifest and the bundle files, and can be edited and re-validated freely before publishing.

## Step 3 — Define the manifest

The manifest declares:
- **configSchema** — the configuration values an installer must provide
- **resources** — external resources the Integration binds to (e.g. a device it calls over HTTP/SQL), referenced in code by **alias**
- **permissions** — what the Integration is allowed to do
- **dataContainerSchemas** — the structures for its per-install storage

## Step 4 — Add the bundle (handlers)

Write the handlers in Lua. They run as timer, event, or RPC handlers and use the integration runtime:

```lua
-- fetch status from a bound device and cache it
local resp = ctx.device.http("my-printer", { method = "GET", path = "/api/status" })
ctx.integration.cacheSet({ key = "status", value = resp.body, ttl = 60 })

-- persist a record in per-install storage
ctx.integration.containersSet("orders", "last", { id = 42, state = "done" })
ctx.log.info("synced", { code = resp.status })
```

In integration scripts, the first argument to `ctx.device.http` / `ctx.device.sql` must be a **manifest-declared resource alias** — the dispatcher resolves it to the bound device.

## Step 5 — Validate

Validate the draft. This checks the manifest and the bundle for problems before you publish.

## Step 6 — Publish

Publish the draft to create an **active integration definition** (versioned). Publishing makes it installable.

## Step 7 — Install and bind

Install the definition, provide the **config** values from the configSchema, and **bind** each declared resource to a real target (for example, map the `my-printer` alias to an actual Device). The Integration now runs with its own install-scoped storage, cache, and config.

## Notes

- `ctx.integration.*` is scoped to the **install (instance)**, not the whole tenant; tenant-scoped `ctx.graphql`, `ctx.sql`, and `ctx.cache` remain available.
- For raw API references while coding, see [API Docs Overview](#api-docs); for reusable Lua, see [How to Use Scripts](#scripts).
