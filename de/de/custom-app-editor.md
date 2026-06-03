---
slug: custom-app-editor
category: custom-apps
status: published
lang: de
title: "The Custom App Editor: Template, Script, Server API"
---

## Die drei Dateien

**Template** — Vue.js-HTML-Fragment. Nutze Vue-Direktiven (`v-if`, `v-for`, `@click`),
Tailwind-Klassen und DaisyUI-Komponenten. Kein äußerer `<template>`-Wrapper nötig.

**Script** — JavaScript innerhalb von Vues `setup()`. Nutze die Composition API: `ref()`,
`computed()`, `watch()`, `onMounted()`. Werte über `const setupReturn = { ... }` bereitstellen.

**Server-API** — serverseitiges Lua. Handler an die globale `exports`-Tabelle hängen und
aus dem Script mit `window.rpc('handlerName', params)` aufrufen.

## Template-Beispiel

```html
<div class="p-6 bg-base-100">
  <p class="text-base-content">{{ myValue }}</p>
  <button @click="doSomething" class="btn btn-primary">Click</button>
</div>
```

## Script-Beispiel

```javascript
const myValue = ref('Hello!');

function doSomething() {
  myValue.value = 'Clicked!';
}

const setupReturn = { myValue, doSomething };
```

## Server-API-Beispiel

```lua
exports = {}

function exports.getJobs(input)
  local res = ctx.graphql.query([[
    query { listJobs(first: 10) { edges { node { id name } } } }
  ]])
  return { status = "ok", result = res.data.listJobs.edges }
end
```

Aufruf aus dem Script: `const r = await window.rpc('getJobs', {});`

## Wichtige Regeln

- Das Script muss immer `const setupReturn = { ... }` definieren
- Nur Werte in `setupReturn` sind aus dem Template erreichbar
- Server-Handler liegen an der `exports`-Tabelle; Aufruf mit `window.rpc('handlerName', params)`
- DaisyUI-Semantik-Klassen fürs Theming nutzen — niemals fest kodierte Farben

## Legacy (v1)

Ältere Apps definierten Server-Funktionen mit `rpc_`-Präfix (oder einer Modul-Tabelle `M`,
zurückgegeben via `return M`) und riefen sie mit `$rpc` auf. Das ist die v1-Runtime; neue
Apps nutzen die `exports`-Tabelle mit `window.rpc`.
