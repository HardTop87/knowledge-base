---
slug: accessing-data
category: custom-apps
status: published
lang: en
title: "Accessing CoCoCo Data from a Custom App"
---

## Fetching data from CoCoCo

Custom Apps can query any platform data via GraphQL from the Script.

## Client-side queries

Use the built-in `$graphql` helper:

```javascript
const jobs = ref([]);

onMounted(async () => {
  const result = await $graphql(`
    query {
      jobs(first: 20, filter: { status: IN_PRODUCTION }) {
        edges {
          node { id name status workCenter { name } }
        }
      }
    }
  `);
  jobs.value = result.data.jobs.edges.map(e => e.node);
});
```

## Server-side queries (Server API)

For privileged queries, use the Server API:

```lua
function rpc_get_jobs(params)
  local result = cococo.graphql.query([[query { jobs { edges { node { id name } } } }]])
  return result.data.jobs.edges
end
```

Call from Script:
```javascript
const data = await $rpc('get_jobs', {});
```

## Mutations

```javascript
await $graphql(`
  mutation($id: ID!, $status: JobStatus!) {
    updateJob(id: $id, input: { status: $status }) { id status }
  }
`, { id: jobId, status: 'COMPLETED' });
```

Explore available queries in the [GraphQL Playground](#graphql-playground).