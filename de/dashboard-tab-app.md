---
slug: dashboard-tab-app
category: custom-apps
status: published
lang: de
title: "Building a Dashboard Tab App"
---

## Was ist eine Dashboard-App?

Eine Dashboard-App erscheint als Tab auf dem CoCoCo-Dashboards-Bildschirm. Mehrere
Dashboard-Apps liegen als Tabs nebeneinander — ideal für KPI-Boards, Monitoring-Anzeigen
und Übersichtsbildschirme.

## Layout-Muster

```html
<div class="p-6 bg-base-100 min-h-full">
  <h1 class="text-xl font-bold mb-6 text-base-content">Production Today</h1>
  <div class="grid grid-cols-4 gap-4 mb-6">
    <div class="stat bg-base-200 rounded-xl">
      <div class="stat-title">Jobs Active</div>
      <div class="stat-value text-primary">{{ activeJobs }}</div>
    </div>
  </div>
</div>
```

## Daten laden und aktualisieren

Hole die Kennzahlen über einen Server-Handler und aktualisiere sie per Intervall.

Server-API (`serverApi.lua`):

```lua
exports = {}

function exports.getActiveJobCount()
  local res = ctx.graphql.query([[
    query { listJobs(filter: { status: { eq: "PRESS" } }, first: 100) {
      edges { node { id } }
    } }
  ]])
  return { status = "ok", result = #res.data.listJobs.edges }
end
```

Script (Client):

```javascript
const activeJobs = ref(0);

async function loadData() {
  const r = await window.rpc('getActiveJobCount');
  activeJobs.value = r.result;
}

let timer;
onMounted(() => {
  loadData();
  timer = setInterval(loadData, 30000); // alle 30s aktualisieren
});
onUnmounted(() => clearInterval(timer));

const setupReturn = { activeJobs };
```

Das Intervall immer in `onUnmounted` aufräumen, damit es beim Schließen des Tabs stoppt.
