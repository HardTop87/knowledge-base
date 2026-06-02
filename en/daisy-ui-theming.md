---
slug: daisy-ui-theming
category: custom-apps
status: published
lang: en
title: "How to Use DaisyUI for Theming"
---

## DaisyUI in Custom Apps

CoCoCo's Custom App runtime includes DaisyUI — a component library on Tailwind CSS. DaisyUI's semantic classes automatically adapt to the platform's light and dark theme.

## The golden rule

Always use DaisyUI semantic classes for colors and backgrounds. Never hardcode color values for UI chrome.

```html
<!-- Correct -->
<div class="bg-base-100 text-base-content border border-base-300">

<!-- Avoid -->
<div style="background: white; color: black;">
```

## Key semantic classes

| Class | Maps to |
|---|---|
| `bg-base-100` | Page background |
| `bg-base-200` | Elevated surface (cards, panels) |
| `text-base-content` | Primary text color |
| `border-base-300` | Standard border |
| `bg-primary` | Brand primary color |
| `text-primary-content` | Text on primary background |
| `bg-error` | Error state |

## DaisyUI components

```html
<button class="btn btn-primary">Save</button>
<div class="badge badge-success">Active</div>
<div class="alert alert-warning">Check this setting</div>
<input class="input input-bordered w-full" />
```

## Dark mode

DaisyUI reads the `dark` class on the iframe's `html` element automatically. Use semantic classes and theming works in both modes — no JavaScript needed.