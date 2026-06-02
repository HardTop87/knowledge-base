---
slug: lua-playground
category: developer-tools
status: published
lang: en
title: "Lua Playground: Getting Started"
---

## What is the Lua Playground?

The Lua Playground is an interactive editor for testing Lua scripts against the live
CoCoCo environment. Use it to develop Scripts and Custom Actions before deploying them.

## How to open it

Go to **Menu → Developer → Lua Playground**.

## Example script

```lua
-- Query recent jobs
local res = ctx.graphql.query([[
  query {
    listJobs(first: 5) {
      edges { node { id name status } }
    }
  }
]])

for _, edge in ipairs(res.data.listJobs.edges) do
  ctx.log.info(edge.node.name, { status = edge.node.status })
end
```

Click **Run** to execute. Output appears in the console below.

## Available APIs (tenant Scripts)

| API | What it does |
|---|---|
| `ctx.graphql.query(gql, vars)` | Run a GraphQL query or mutation |
| `ctx.sql.query(sql)` | Read from the reporting tables |
| `ctx.cache.get(key)` / `ctx.cache.set({key, value, ttl?})` / `ctx.cache.delete(key)` | Tenant cache (Redis) |
| `ctx.device.http(idOrAlias, opts)` / `ctx.device.sql(idOrAlias, opts)` | Talk to a device via its Bridge |
| `ctx.time.now()` / `ctx.time.nowIso()` | Timestamps (`os.*` is sandboxed away) |
| `ctx.json.encode/decode(...)` | JSON |
| `ctx.log.info/warn/error(msg, attrs?)` | Write to the console (`print` is disabled) |

Tenant Scripts run with the base API only — `ctx.dataContainer` is custom-app-only, and
there is no generic config, HTTP, or templating API.
