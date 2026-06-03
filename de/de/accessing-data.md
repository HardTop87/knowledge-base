---
slug: accessing-data
category: custom-apps
status: published
lang: de
title: "Accessing CoCoCo Data from a Custom App"
---

## Daten aus CoCoCo abfragen

Custom Apps lesen und schreiben Plattformdaten über die GraphQL-API. In **Engine v2**
ist das empfohlene Muster ein schlanker Client, der einen **Server-Handler** aufruft;
der Handler führt die Abfrage mit erweiterten Rechten aus:

- **Client (Vue-Script):** Handler per `window.rpc('handlerName', params)` aufrufen.
- **Server (`serverApi.lua`):** Handler an der globalen `exports`-Tabelle definieren
  und mit `ctx.graphql.query(...)` abfragen.

## Daten lesen (Server-Handler)

```lua
exports = {}

function exports.getJobs(input)
  local res = ctx.graphql.query([[
    query { listJobs(first: 20) { edges { node { id name status } } } }
  ]])
  return { status = "ok", result = res.data.listJobs.edges }
end
```

Die List-Query heißt `listJobs` (es gibt keine `jobs`-Query). Der Job-Node-Typ ist `JobState`.

## Aufruf vom Client

```javascript
const { ref, onMounted } = Vue;
const jobs = ref([]);

onMounted(async () => {
  const r = await window.rpc('getJobs', {});
  jobs.value = (r.result || []).map(e => e.node);
});
```

`window.rpc` liefert `{ status, result }` — vor der Nutzung von `result` den `status` prüfen.

## Filtern mit Variablen

Job-Filter nutzen Feld-Matcher, keine reinen Enums — `status` erwartet einen `StringFilter`:

```lua
function exports.getJobsByStatus(input)
  local res = ctx.graphql.query([[
    query($status: String!) {
      listJobs(first: 20, filter: { status: { eq: $status } }) {
        edges { node { id name status } }
      }
    }
  ]], { status = input.status })   -- z. B. "PRESS"
  return { status = "ok", result = res.data.listJobs.edges }
end
```

Gültige `JobStatus`-Werte: `DRAFT`, `RFQ`, `CONFIRMED`, `PREPRESS`, `PRESS`,
`POSTPRESS`, `PACKING`, `SHIPPED`, `COMPLETED`, `WAITING`, `CANCELLED`, `EXCEPTION`.
Hinweis: `IN_PRODUCTION` ist ein **Order**-Status, kein Job-Status. `JobState` hat kein
`workCenter`-Feld — Job-/Ressourcen-Bezüge laufen über `operations`.

## Daten schreiben (Mutationen)

Jobs werden mit `upsertJob` geschrieben (ein `updateJob` gibt es nicht). Es nimmt einen
`UpsertJobInput` — `name` und `quantity` sind Pflicht; für ein Update `id` mitgeben —
und liefert ein `UpsertJobPayload { job, errors }`:

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

Ältere Apps nutzten clientseitig `$graphql` / `$rpc` und serverseitig `cococo.graphql` /
`ctx.rpc`. Das gehört zur **v1**-Runtime. Neue Apps sollten `window.rpc` + `exports` +
`ctx.graphql` verwenden; in älteren Apps können die v1-Helfer noch auftauchen.

Abfragen und Mutationen lassen sich im [GraphQL Playground](#graphql-playground) erkunden.
