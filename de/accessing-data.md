---
slug: accessing-data
category: custom-apps
status: published
lang: de
title: "Accessing CoCoCo Data from a Custom App"
---

## Daten aus CoCoCo abrufen

Custom Apps können über GraphQL auf alle Plattformdaten zugreifen, direkt aus dem Script.

## Clientseitige Queries

Nutzen Sie den eingebauten `$graphql` Helper:

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

## Serverseitige Queries (Server API)

Für privilegierte Queries nutzen Sie die Server API:

```lua
function rpc_get_jobs(params)
  local result = cococo.graphql.query([[query { jobs { edges { node { id name } } } }]])
  return result.data.jobs.edges
end
```

Aus dem Script:
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

Die verfügbaren Queries können Sie im [GraphQL Playground](#graphql-playground) erkunden.