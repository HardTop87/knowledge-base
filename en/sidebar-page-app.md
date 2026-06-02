---
slug: sidebar-page-app
category: custom-apps
status: published
lang: en
title: "Building a Sidebar Page App"
---

## What is a Page app?

A Page app appears in the left sidebar and opens as a full-height, full-width page. It's the most common app kind — suitable for tools, dashboards, and any interface your team uses regularly.

## Layout pattern

```html
<div class="flex h-screen bg-base-100">
  <!-- Optional sidebar -->
  <div class="w-64 bg-base-200 border-r border-base-300 p-4">
    <!-- Navigation -->
  </div>
  <!-- Main content -->
  <div class="flex-1 overflow-auto p-6">
    <!-- Content -->
  </div>
</div>
```

## Tips

- Use `h-screen` on the root element to fill available height
- The platform provides the top nav bar — don't recreate it
- Use `overflow-auto` on content areas to handle long content
- Load data in `onMounted` and use `ref()` for reactive state