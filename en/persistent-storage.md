---
slug: persistent-storage
category: custom-apps
status: published
lang: en
title: "Using Persistent Storage in Custom Apps"
---

## What is Persistent Storage?

Custom Apps can store data that persists between sessions using a server-side key-value
store, `ctx.dataContainer`. Unlike client-side JavaScript variables (which reset on
reload), values in the data container survive across page loads.

## How it works

Storage lives in the app's **server API** (Lua). The Vue client calls a server handler
with `window.rpc`; the handler reads or writes `ctx.dataContainer`.

Server API (`serverApi.lua`):

```lua
exports = {}

function exports.saveCount(input)
  ctx.dataContainer.put("counter", input.count)
  return { status = "ok" }
end

function exports.loadCount()
  return { status = "ok", result = ctx.dataContainer.get("counter") }
end
```

Client (Script):

```javascript
// save
await window.rpc('saveCount', { count: 5 });

// read
const r = await window.rpc('loadCount');
const count = r.result;   // nil/undefined if never set
```

## API (server-side, custom apps)

| Function | What it does |
|---|---|
| `ctx.dataContainer.put(key, value)` | Store a value (string, number, or table) |
| `ctx.dataContainer.get(key)` | Retrieve a value (`nil` if not set) |
| `ctx.dataContainer.delete(key)` | Remove a value |

`ctx.dataContainer` is **custom-app-only**. Tenant Scripts don't have it; integration
scripts use `ctx.integration.containers*` instead.

## Notes

- Store structured data as a table; use `ctx.json.encode` / `ctx.json.decode` if you need
  an explicit string form.
- Keep related data under one key and update it together to minimize round-trips.
- The data container is scoped to the app.
