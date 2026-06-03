---
slug: server-api-lua
category: custom-apps
status: published
lang: de
title: "Using the Server API (Lua) in Custom Apps"
---

## Was ist die Server-API?

Die Server-API ist Lua-Code, der auf dem CoCoCo-Server läuft und aus dem Client-Script
deiner Custom App aufgerufen wird. Nutze sie für sicheren Datenzugriff, privilegierte
Operationen oder schwere Verarbeitung, die nicht im Browser laufen soll.

## Handler definieren (die `exports`-Tabelle)

In der Server-API hängst du Handler an die globale `exports`-Tabelle (Engine v2):

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

## Aufruf aus dem Script (Client)

```javascript
const jobs = ref([]);

async function loadJobs(status) {
  const r = await window.rpc('getJobs', { status });
  jobs.value = r.result || [];
}
```

`window.rpc(handlerName, params)` liefert das zurück, was der Handler zurückgibt.

## Verfügbare Lua-APIs (Server-Scripts)

| API | Beschreibung |
|---|---|
| `ctx.graphql.query(gql, vars)` | GraphQL-Queries und -Mutationen |
| `ctx.dataContainer.get/put/delete(key, value?)` | Persistenter Speicher pro App |
| `ctx.sql.query(sql)` | Lesen aus den Reporting-Tabellen |
| `ctx.cache.get/set/delete(key, value?)` | Tenant-Cache (Redis, 4 KB pro Wert) |
| `ctx.device.http(idOrAlias, opts)` / `ctx.device.sql(idOrAlias, opts)` | Mit einem Gerät über dessen Bridge kommunizieren |
| `ctx.notify.send({ ... })` | Benachrichtigung senden |
| `ctx.ml.predict(...)` | ML-Modell ausführen |
| `ctx.config.get(key)` | Einen Tenant-Config-Wert per Key lesen (Secret-Werte kommen redacted zurück) |
| `ctx.template.render(handle, contextJSON)` | Ein gespeichertes JDF/JMF-Template per handle mit JSON-Context rendern |
| `ctx.time.now()` / `ctx.time.nowIso()` | Zeitstempel (`os.*` ist gesperrt) |
| `ctx.json.encode/decode(...)` | JSON |
| `ctx.log.info/warn/error(msg, attrs?)` | Strukturiertes Logging (`print` ist deaktiviert) |

Es gibt **keine** _generische_ Outbound-HTTP-API — ausgehendes HTTP läuft gerätebezogen
über `ctx.device.http`. `ctx.config.get` liest nicht-geheime Config-Einträge; **Secret**-Werte
sind immer redacted und nie zurücklesbar.

## Legacy (v1)

Ältere Apps nutzten `rpc_`-präfixierte Funktionen, den Client-Helfer `$rpc` und einen
`cococo.*`-Namespace (`cococo.graphql`, `cococo.log`, …). Das ist die v1-Runtime; neue
Apps nutzen `exports` + `window.rpc` + `ctx.*`. In älteren Apps kann der v1-Stil noch auftauchen.
