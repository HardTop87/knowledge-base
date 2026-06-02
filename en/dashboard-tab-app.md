---
slug: dashboard-tab-app
category: custom-apps
status: published
lang: en
title: "Building a Dashboard Tab App"
---

## What is a Dashboard app?

A Dashboard app appears as a tab on the CoCoCo Dashboards screen. Multiple Dashboard apps
sit side by side as tabs — ideal for KPI boards, monitoring displays, and overview screens.

## Layout pattern

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

## Loading and refreshing data

Fetch the numbers through a server handler, then refresh on an interval.

Server API (`serverApi.lua`):

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

Script (client):

```javascript
const activeJobs = ref(0);

async function loadData() {
  const r = await window.rpc('getActiveJobCount');
  activeJobs.value = r.result;
}

let timer;
onMounted(() => {
  loadData();
  timer = setInterval(loadData, 30000); // refresh every 30s
});
onUnmounted(() => clearInterval(timer));

const setupReturn = { activeJobs };
```

Always clear the interval in `onUnmounted` so it stops when the tab closes.
