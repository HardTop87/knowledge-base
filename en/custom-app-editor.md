---
slug: custom-app-editor
category: custom-apps
status: published
lang: en
title: "The Custom App Editor: Template, Script, Server API"
---

## The three files

**Template** — Vue.js HTML fragment. Use Vue directives (`v-if`, `v-for`, `@click`),
Tailwind classes, and DaisyUI components. No outer `<template>` wrapper needed.

**Script** — JavaScript inside Vue's `setup()`. Use the Composition API: `ref()`,
`computed()`, `watch()`, `onMounted()`. Expose values via `const setupReturn = { ... }`.

**Server API** — Lua running server-side. Attach handlers to the global `exports` table;
call them from the Script with `window.rpc('handlerName', params)`.

## Template example

```html
<div class="p-6 bg-base-100">
  <p class="text-base-content">{{ myValue }}</p>
  <button @click="doSomething" class="btn btn-primary">Click</button>
</div>
```

## Script example

```javascript
const myValue = ref('Hello!');

function doSomething() {
  myValue.value = 'Clicked!';
}

const setupReturn = { myValue, doSomething };
```

## Server API example

```lua
exports = {}

function exports.getJobs(input)
  local res = ctx.graphql.query([[
    query { listJobs(first: 10) { edges { node { id name } } } }
  ]])
  return { status = "ok", result = res.data.listJobs.edges }
end
```

Call from Script: `const r = await window.rpc('getJobs', {});`

## Key rules

- Script must always define `const setupReturn = { ... }`
- Only values in `setupReturn` are accessible from the template
- Server handlers live on the `exports` table; call them with `window.rpc('handlerName', params)`
- Use DaisyUI semantic classes for theming — never hardcoded colors

## Legacy (v1)

Older apps defined server functions with an `rpc_` prefix (or a module table `M` returned
with `return M`) and called them with `$rpc`. That is the v1 runtime; new apps use the
`exports` table with `window.rpc`.
