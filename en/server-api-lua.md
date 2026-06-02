---
slug: server-api-lua
category: custom-apps
status: published
lang: en
title: "Using the Server API (Lua) in Custom Apps"
---

## What is the Server API?

The Server API is Lua code running on the CoCoCo server, callable from your Custom App's Script. Use it for secure data access, privileged operations, or heavy processing that shouldn't run in the browser.

## Defining RPC functions

In the Server API tab, define functions with the `rpc_` prefix:

```lua
function rpc_get_jobs(params)
  local result = cococo.graphql.query([[
    query($status: JobStatus) {
      jobs(filter: { status: $status }, first: 50) {
        edges { node { id name status workCenter { name } } }
      }
    }
  ]], { status = params.status })
  return result.data.jobs.edges
end
```

## Calling from the Script

```javascript
const jobs = ref([]);

async function loadJobs(status) {
  jobs.value = await $rpc('get_jobs', { status });
}
```

## Available Lua APIs

| API | Description |
|---|---|
| `cococo.graphql.query(gql, vars)` | GraphQL query |
| `cococo.graphql.mutate(gql, vars)` | GraphQL mutation |
| `cococo.config.get(key)` | Read Config or Secret value |
| `cococo.http.post(url, body, headers)` | Outbound HTTP request |
| `cococo.log(message)` | Server-side logging |