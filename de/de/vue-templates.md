---
slug: vue-templates
category: custom-apps
status: published
lang: de
title: "Using Vue in Custom App Templates"
---

## Vue in Custom App Templates

Custom App Templates sind Vue 3 HTML-Fragmente mit vollständiger Vue-Template-Syntax.

## Daten binden

```html
<p>{{ message }}</p>
<div :class="isActive ? 'bg-primary' : 'bg-base-200'"></div>
<input :value="query" :disabled="isLoading" />
```

## Bedingungen und Listen

```html
<div v-if="isLoading">Lade...</div>
<div v-else>{{ data }}</div>

<div v-for="item in items" :key="item.id">{{ item.name }}</div>
```

## Event-Handling

```html
<button @click="doSomething">Klick</button>
<button @click="() => remove(item.id)">Löschen</button>
<input v-model="query" @keydown.enter="search" />
```

## Dynamische Klassen

```html
<div :class="{
  'bg-success': status === 'COMPLETED',
  'bg-warning': status === 'RUNNING',
  'bg-error': status === 'FAILED'
}">
```

## Regeln

- Niemals `<form>` Tags verwenden. Stattdessen `@click` auf Buttons
- Nur Werte in `setupReturn` sind im Template zugänglich
- `class` für statische Klassen, `:class` für dynamisches Binding