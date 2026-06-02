---
slug: custom-app-editor
category: custom-apps
status: published
lang: de
title: "The Custom App Editor: Template, Script, Server API"
---

## Die drei Dateien

**Template**: Vue.js HTML-Fragment. Nutzt Vue-Direktiven (`v-if`, `v-for`, `@click`), Tailwind-Klassen und DaisyUI-Komponenten. Kein äußerer `<template>` Wrapper nötig.

**Script**: JavaScript innerhalb von Vues `setup()`. Composition API verwenden: `ref()`, `computed()`, `watch()`, `onMounted()`. Werte über `const setupReturn = { ... }` freigeben.

**Server API**: Lua, das serverseitig läuft. Definieren Sie `rpc_functionName(params)` Funktionen, die aus dem Script aufrufbar sind.

## Template-Beispiel

```html
<div class="p-6 bg-base-100">
  <p class="text-base-content">{{ myValue }}</p>
  <button @click="doSomething" class="btn btn-primary">Klick</button>
</div>
```

## Script-Beispiel

```javascript
const myValue = ref('Hallo!');

function doSomething() {
  myValue.value = 'Geklickt!';
}

const setupReturn = { myValue, doSomething };
```

## Server-API-Beispiel

```lua
function rpc_get_jobs(params)
  local result = cococo.graphql.query([[
    query { jobs(first: 10) { edges { node { id name } } } }
  ]])
  return result.data.jobs.edges
end
```

Aufruf aus dem Script: `const data = await $rpc('get_jobs', {});`

## Wichtige Regeln

- Das Script muss immer `const setupReturn = { ... }` definieren
- Nur Werte in `setupReturn` sind im Template zugänglich
- DaisyUI-Semantikklassen für Theming verwenden, keine fest kodierten Farben