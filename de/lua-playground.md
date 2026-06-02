---
slug: lua-playground
category: developer-tools
status: published
lang: de
title: "Lua Playground: Getting Started"
---

## Was ist die Lua Playground?

Die Lua Playground ist ein interaktiver Editor zum Testen von Lua-Scripts gegen die
laufende CoCoCo-Umgebung. Nutze sie, um Scripts und Custom Actions zu entwickeln, bevor
du sie ausrollst.

## Öffnen

Gehe zu **Menu → Developer → Lua Playground**.

## Beispiel-Script

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

Klicke **Run** zum Ausführen. Die Ausgabe erscheint in der Konsole darunter.

## Verfügbare APIs (Tenant-Scripts)

| API | Funktion |
|---|---|
| `ctx.graphql.query(gql, vars)` | GraphQL-Query oder -Mutation ausführen |
| `ctx.sql.query(sql)` | Aus den Reporting-Tabellen lesen |
| `ctx.cache.get/set/delete(key, value?)` | Tenant-Cache (Redis) |
| `ctx.device.http(idOrAlias, opts)` / `ctx.device.sql(idOrAlias, opts)` | Mit einem Gerät über dessen Bridge kommunizieren |
| `ctx.time.now()` / `ctx.time.nowIso()` | Zeitstempel (`os.*` ist gesperrt) |
| `ctx.json.encode/decode(...)` | JSON |
| `ctx.log.info/warn/error(msg, attrs?)` | In die Konsole schreiben (`print` ist deaktiviert) |

Tenant-Scripts laufen nur mit der Basis-API — `ctx.dataContainer` gibt es nur in
Custom Apps, und es existiert keine generische Config-, HTTP- oder Templating-API.
