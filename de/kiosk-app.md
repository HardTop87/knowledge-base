---
slug: kiosk-app
category: custom-apps
status: published
lang: de
title: "Building a Kiosk App"
---

## Was ist eine Kiosk App?

Eine Kiosk App ist eine Vollbild-Oberfläche für gemeinsam genutzte Shopfloor-Terminals. Nur User mit dem Typ **Kiosk** haben Zugriff auf Kiosk Apps. Reguläre User nicht.

Kiosk Apps sind für Operatoren gebaut, die eine einfache, Touch-freundliche Oberfläche brauchen, um Fortschritt zu melden, Barcodes zu scannen oder Abschlüsse zu bestätigen.

## Designüberlegungen

- Große Touch-Ziele verwenden, Buttons mindestens 48px hoch
- Die Oberfläche einfach halten, eine Aufgabe pro Screen
- Mindestens 16px Schriftgröße für Lesbarkeit im Werkslicht
- Hoher Kontrast

## Layout-Muster

```html
<div class="flex flex-col items-center justify-center min-h-screen bg-base-100 p-8">
  <input v-model="jobId" class="input input-bordered input-lg w-full max-w-md mb-4"
    placeholder="Job ID scannen oder eingeben" @keydown.enter="loadJob" />

  <div v-if="currentJob" class="card bg-base-200 w-full max-w-md p-6 mb-6">
    <h2 class="text-2xl font-bold">{{ currentJob.name }}</h2>
    <p class="text-lg">{{ currentJob.quantity }} Bogen</p>
  </div>

  <button v-if="currentJob" @click="markComplete"
    class="btn btn-success btn-lg w-full max-w-md">
    Als abgeschlossen markieren
  </button>
</div>
```