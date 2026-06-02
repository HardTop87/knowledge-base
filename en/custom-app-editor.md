---
slug: custom-app-editor
category: custom-apps
status: published
lang: en
title: "The Custom App Editor: Template, Script, Server API"
---

## The three files

**Template** — Vue.js HTML fragment. Use Vue directives (`v-if`, `v-for`, `@click`), Tailwind classes, and DaisyUI components. No outer `<template>` wrapper needed.

**Script** — JavaScript inside Vue's `setup()`. Use Vue Composition API: `ref()`, `computed()`, `watch()`, `onMounted()`. Expose values via `const setupReturn = { ... }`.

**Server API** — Lua running server-side. Define functions on a module table `M` and return it with `return M`. Functions are then callable from the Script.

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
function rpc_get_jobs(params)
  local result = cococo.graphql.query([[
    query { jobs(first: 10) { edges { node { id name } } } }
  ]])
  return result.data.jobs.edges
end
```

Call from Script: `const data = await $rpc('get_jobs', {});`

## Key rules

- Script must always define `const setupReturn = { ... }`
- Only values in `setupReturn` are accessible from the template
- Use DaisyUI semantic classes for theming — never hardcoded colors