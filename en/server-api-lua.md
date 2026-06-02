---
slug: server-api-lua
category: custom-apps
status: published
lang: en
title: "Using the Server API (Lua) in Custom Apps"
---

## What is the Server API?

The Server API is Lua code running on the CoCoCo server, callable from your Custom
App's client Script. Use it for secure data access, privileged operations, or heavy
processing that shouldn't run in the browser.

## Defining handlers (the `exports` table)

In the Server API, attach handlers to the global `exports` table (engine v2):

```lua
exports = {}

function exports.getJobs(input)
  local res = ctx.graphql.query([[
    query($status: String!) {
      listJobs(first: 50, filter: { status: { eq: $status } }) {
        edges { node { id name status } }
      }
    }
  ]], { status = input.status })
  return { status = "ok", result = res.data.listJobs.edges }
end
```

## Calling it from the Script (client)

```javascript
const jobs = ref([]);

async function loadJobs(status) {
  const r = await window.rpc('getJobs', { status });
  jobs.value = r.result || [];
}
```

`window.rpc(handlerName, params)` resolves to whatever the handler returns.

## Available Lua APIs (server scripts)

| API | Description |
|---|---|
| `ctx.graphql.query(gql, vars)` | GraphQL queries and mutations |
| `ctx.dataContainer.get/put/delete(key, value?)` | Persistent per-app storage |
| `ctx.sql.query(sql)` | Read from the reporting tables |
| `ctx.cache.get/set/delete(key, value?)` | Tenant cache (Redis, 4 KB per value) |
| `ctx.device.http(idOrAlias, opts)` / `ctx.device.sql(idOrAlias, opts)` | Talk to a device via its Bridge |
| `ctx.notify.send({ ... })` | Send a notification |
| `ctx.ml.predict(...)` | Run an ML model |
| `ctx.time.now()` / `ctx.time.nowIso()` | Timestamps (`os.*` is sandboxed away) |
| `ctx.json.encode/decode(...)` | JSON |
| `ctx.log.info/warn/error(msg, attrs?)` | Structured logging (`print` is disabled) |

There is no generic config, secrets, outbound-HTTP, or templating API in Lua; outbound
HTTP is device-scoped via `ctx.device.http`.

## Legacy (v1)

Older apps used `rpc_`-prefixed functions, the client helper `$rpc`, and a `cococo.*`
namespace (`cococo.graphql`, `cococo.log`, …). That is the v1 runtime; new apps use
`exports` + `window.rpc` + `ctx.*`. You may still encounter the v1 style in older apps.
