---
slug: lua-playground
category: developer-tools
status: published
lang: de
title: "Lua Playground: Getting Started"
---

## Was ist das Lua Playground?

Das Lua Playground ist ein interaktiver Editor zum Testen von Lua-Skripten gegen die Live-Umgebung von CoCoCo. Nutzen Sie es zur Entwicklung von Scripts und Custom Actions, bevor Sie sie deployen.

## Öffnen

Wechseln Sie zu **Menu → Developer → Lua Playground**.

## Beispielskript

```lua
-- Jüngste Jobs abfragen
local jobs = cococo.graphql.query([[
  query {
    jobs(first: 5) {
      edges { node { id name status } }
    }
  }
]])

for _, edge in ipairs(jobs.data.jobs.edges) do
  print(edge.node.name, edge.node.status)
end
```

Klicken Sie auf **Run**. Die Ausgabe erscheint in der Konsole darunter.

## Verfügbare APIs

| API | Was sie macht |
|---|---|
| `cococo.graphql.query(gql)` | Führt eine GraphQL Query aus |
| `cococo.graphql.mutate(gql)` | Führt eine GraphQL Mutation aus |
| `cococo.config.get(key)` | Liest einen Tenant-Config-Wert |
| `cococo.http.post(url, body)` | Sendet einen ausgehenden HTTP-Request |
| `cococo.log(message)` | Schreibt in die Konsole |