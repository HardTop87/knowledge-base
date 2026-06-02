---
slug: vue-templates
category: custom-apps
status: published
lang: en
title: "Using Vue in Custom App Templates"
---

## Vue in Custom App Templates

Custom App Templates are Vue 3 HTML fragments with full Vue template syntax.

## Data binding

```html
<p>{{ message }}</p>
<div :class="isActive ? 'bg-primary' : 'bg-base-200'"></div>
<input :value="query" :disabled="isLoading" />
```

## Conditionals and lists

```html
<div v-if="isLoading">Loading...</div>
<div v-else>{{ data }}</div>

<div v-for="item in items" :key="item.id">{{ item.name }}</div>
```

## Event handling

```html
<button @click="doSomething">Click</button>
<button @click="() => remove(item.id)">Delete</button>
<input v-model="query" @keydown.enter="search" />
```

## Dynamic classes

```html
<div :class="{
  'bg-success': status === 'COMPLETED',
  'bg-warning': status === 'RUNNING',
  'bg-error': status === 'FAILED'
}">
```

## Rules

- Never use `<form>` tags — use `@click` on buttons instead
- Only values in `setupReturn` are accessible from the template
- Use `class` for static classes, `:class` for dynamic binding