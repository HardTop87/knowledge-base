---
slug: accessing-data
category: custom-apps
status: published
lang: en
title: "Accessing CoCoCo Data from a Custom App"
---

## Fetching data from CoCoCo

Custom Apps read and write platform data through the GraphQL API. In **engine v2**
the recommended pattern is a thin client that calls a **server handler**, which runs
the query with elevated access:

- **Client (Vue script):** call a handler with `window.rpc('handlerName', params)`.
- **Server (`serverApi.lua`):** define the handler on the global `exports` table and
  query with `ctx.graphql.query(...)`.

## Reading data (server handler)

```lua
exports = {}

function exports.getJobs(input)
  local res = ctx.graphql.query([[
    query { listJobs(first: 20) { edges { node { id name status } } } }
  ]])
  return { status = "ok", result = res.data.listJobs.edges }
end
```

The list query is `listJobs` (there is no `jobs` query). The job node type is `JobState`.

## Calling it from the client

```javascript
const { ref, onMounted } = Vue;
const jobs = ref([]);

onMounted(async () => {
  const r = await window.rpc('getJobs', {});
  jobs.value = (r.result || []).map(e => e.node);
});
```

`window.rpc` resolves to `{ status, result }` — check `status` before using `result`.

## Filtering with variables

Job filters use field matchers, not bare enums — `status` takes a `StringFilter`:

```lua
function exports.getJobsByStatus(input)
  local res = ctx.graphql.query([[
    query($status: String!) {
      listJobs(first: 20, filter: { status: { eq: $status } }) {
        edges { node { id name status } }
      }
    }
  ]], { status = input.status })   -- e.g. "PRESS"
  return { status = "ok", result = res.data.listJobs.edges }
end
```

Valid `JobStatus` values: `DRAFT`, `RFQ`, `CONFIRMED`, `PREPRESS`, `PRESS`,
`POSTPRESS`, `PACKING`, `SHIPPED`, `COMPLETED`, `WAITING`, `CANCELLED`, `EXCEPTION`.
Note: `IN_PRODUCTION` is an **Order** status, not a job status. `JobState` has no
`workCenter` field — job/resource links run through `operations`.

## Writing data (mutations)

Jobs are written with `upsertJob` (there is no `updateJob`). It takes an
`UpsertJobInput` — `name` and `quantity` are required; pass `id` to update an
existing job — and returns an `UpsertJobPayload { job, errors }`:

```lua
function exports.completeJob(input)
  local res = ctx.graphql.query([[
    mutation($input: UpsertJobInput!) {
      upsertJob(input: $input) { job { id name status } }
    }
  ]], { input = { id = input.id, name = input.name,
                  quantity = input.quantity, status = "COMPLETED" } })
  return { status = "ok", result = res.data.upsertJob.job }
end
```

## Legacy (v1)

Older apps used client-side `$graphql` / `$rpc` and server-side `cococo.graphql` /
`ctx.rpc`. These belong to the **v1** runtime. New apps should use
`window.rpc` + `exports` + `ctx.graphql`; the v1 helpers may still appear in older apps.

Explore queries and mutations in the [GraphQL Playground](#graphql-playground).
