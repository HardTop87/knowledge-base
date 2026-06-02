---
slug: dashboard-tab-app
category: custom-apps
status: published
lang: de
title: "Building a Dashboard Tab App"
---

## Was ist eine Dashboard App?

Eine Dashboard App erscheint als Tab auf der CoCoCo Dashboards Seite. Mehrere Dashboard Apps liegen nebeneinander als Tabs. Ideal für KPI-Boards, Monitoring-Anzeigen und Übersichtsbildschirme.

## Layout-Muster

```html
<div class="p-6 bg-base-100 min-h-full">
  <h1 class="text-xl font-bold mb-6 text-base-content">Produktion heute</h1>
  <div class="grid grid-cols-4 gap-4 mb-6">
    <div class="stat bg-base-200 rounded-xl">
      <div class="stat-title">Aktive Jobs</div>
      <div class="stat-value text-primary">{{ activeJobs }}</div>
    </div>
  </div>
</div>
```

## Auto-Refresh

Für Live-Dashboards:

```javascript
onMounted(() => {
  loadData();
  setInterval(loadData, 30000); // alle 30s aktualisieren
});
```