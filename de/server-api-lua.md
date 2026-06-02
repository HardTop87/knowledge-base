---
slug: server-api-lua
category: custom-apps
status: published
lang: de
title: "Using the Server API (Lua) in Custom Apps"
---

## Was ist die Server API?

Die Server API ist Lua-Code, der auf dem CoCoCo-Server läuft und aus dem Script Ihrer Custom App aufrufbar ist. Nutzen Sie sie für sichere Datenzugriffe, privilegierte Operationen oder rechenintensive Verarbeitung, die nicht im Browser laufen soll.

## RPC-Funktionen definieren

Im Server-API-Tab definieren Sie Funktionen mit dem Präfix `rpc_`:

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

## Aus dem Script aufrufen

```javascript
const jobs = ref([]);

async function loadJobs(status) {
  jobs.value = await $rpc('get_jobs', { status });
}
```

## Verfügbare Lua-APIs

| API | Beschreibung |
|---|---|
| `cococo.graphql.query(gql, vars)` | GraphQL Query |
| `cococo.graphql.mutate(gql, vars)` | GraphQL Mutation |
| `cococo.config.get(key)` | Config- oder Secret-Wert lesen |
| `cococo.http.post(url, body, headers)` | Ausgehender HTTP-Request |
| `cococo.log(message)` | Serverseitiges Logging |