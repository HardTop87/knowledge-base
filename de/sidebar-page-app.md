---
slug: sidebar-page-app
category: custom-apps
status: published
lang: de
title: "Building a Sidebar Page App"
---

## Was ist eine Page App?

Eine Page App erscheint in der linken Seitenleiste und öffnet sich als Seite in voller Höhe und Breite. Sie ist der häufigste App-Typ und passt zu Werkzeugen, Dashboards und jeder Oberfläche, die Ihr Team regelmäßig nutzt.

## Layout-Muster

```html
<div class="flex h-screen bg-base-100">
  <!-- Optionale Seitenleiste -->
  <div class="w-64 bg-base-200 border-r border-base-300 p-4">
    <!-- Navigation -->
  </div>
  <!-- Hauptinhalt -->
  <div class="flex-1 overflow-auto p-6">
    <!-- Inhalt -->
  </div>
</div>
```

## Tipps

- Nutzen Sie `h-screen` am Root-Element, um die verfügbare Höhe zu füllen
- Die Plattform stellt die obere Navigation bereit. Bauen Sie sie nicht nach
- `overflow-auto` auf Inhaltsbereichen, um langen Inhalten Raum zu geben
- Daten in `onMounted` laden und `ref()` für reaktiven State verwenden