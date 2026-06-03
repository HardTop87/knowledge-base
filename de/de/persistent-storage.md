---
slug: persistent-storage
category: custom-apps
status: published
lang: de
title: "Using Persistent Storage in Custom Apps"
---

## Was ist Persistent Storage?

Custom Apps können Daten sitzungsübergreifend speichern — über einen serverseitigen
Key-Value-Store, `ctx.dataContainer`. Anders als clientseitige JavaScript-Variablen (die
beim Neuladen zurückgesetzt werden) überdauern Werte im Data Container das Neuladen der Seite.

## Wie es funktioniert

Der Speicher liegt in der **Server-API** der App (Lua). Der Vue-Client ruft über
`window.rpc` einen Server-Handler auf; der Handler liest oder schreibt `ctx.dataContainer`.

Server-API (`serverApi.lua`):

```lua
exports = {}

function exports.saveCount(input)
  ctx.dataContainer.put("counter", input.count)
  return { status = "ok" }
end

function exports.loadCount()
  return { status = "ok", result = ctx.dataContainer.get("counter") }
end
```

Client (Script):

```javascript
// speichern
await window.rpc('saveCount', { count: 5 });

// lesen
const r = await window.rpc('loadCount');
const count = r.result;   // nil/undefined, falls nie gesetzt
```

## API (serverseitig, Custom Apps)

| Funktion | Wirkung |
|---|---|
| `ctx.dataContainer.put(key, value)` | Wert speichern (String, Number oder Table) |
| `ctx.dataContainer.get(key)` | Wert lesen (`nil`, falls nicht gesetzt) |
| `ctx.dataContainer.delete(key)` | Wert entfernen |

`ctx.dataContainer` gibt es **nur in Custom Apps**. Tenant-Scripts haben es nicht;
Integration-Scripts nutzen stattdessen `ctx.integration.containers*`.

## Hinweise

- Strukturierte Daten als Table speichern; bei Bedarf `ctx.json.encode` / `ctx.json.decode`
  für eine explizite String-Form.
- Zusammengehörige Daten unter einem Key halten und gemeinsam aktualisieren, um
  Roundtrips zu sparen.
- Der Data Container ist auf die App begrenzt.
