---
slug: sidebar-page-app
category: custom-apps
status: published
lang: de
title: "Building a Sidebar Page App"
---

## Was ist eine Page-App?

Eine Page-App erscheint in der linken Seitenleiste und öffnet sich als Seite über die
volle Höhe und Breite. Sie ist die häufigste App-Art — geeignet für Werkzeuge, Dashboards
und jede Oberfläche, die dein Team regelmäßig nutzt.

## Layout-Muster

```html
<div class="flex h-screen bg-base-100">
  <!-- Optionale Seitenleiste -->
  <div class="w-64 bg-base-200 border-r border-base-300 p-4">
    <!-- Navigation -->
  </div>
  <!-- Hauptinhalt -->
  <div class="flex-1 overflow-auto p-6">
    <!-- Inhalt -->
  </div>
</div>
```

## Daten laden

Eine Page-App holt Plattformdaten über ihre **Server-API**: Der Client ruft per
`window.rpc` einen Handler auf, und der Handler führt `ctx.graphql` aus. (Details in
[Accessing Platform Data](#accessing-data).)

Server-API (`serverApi.lua`):

```lua
exports = {}

function exports.listRecentJobs()
  local res = ctx.graphql.query([[
    query { listJobs(first: 20) { edges { node { id name status } } } }
  ]])
  return { status = "ok", result = res.data.listJobs.edges }
end
```

Script (Client):

```javascript
const jobs = ref([]);

onMounted(async () => {
  const r = await window.rpc('listRecentJobs');
  jobs.value = r.result.map(e => e.node);
});

const setupReturn = { jobs };
```

## Tipps

- `h-screen` am Wurzelelement, um die verfügbare Höhe zu füllen
- Die Plattform stellt die obere Navigationsleiste bereit — nicht nachbauen
- `overflow-auto` an Inhaltsbereichen für lange Inhalte
- Daten in `onMounted` laden und reaktiven State in `ref()` halten
