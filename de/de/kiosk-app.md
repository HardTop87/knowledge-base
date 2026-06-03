---
slug: kiosk-app
category: custom-apps
status: published
lang: de
title: "Building a Kiosk App"
---

## Was ist eine Kiosk-App?

Eine Kiosk-App ist eine Vollbild-Oberfläche für gemeinsam genutzte Shopfloor-Terminals.
Nur Nutzer vom Typ **Kiosk** können Kiosk-Apps öffnen — normale Nutzer nicht.

Kiosk-Apps sind für Bediener gedacht, die eine einfache, touch-freundliche Oberfläche
brauchen, um Job-Fortschritt zu melden, Barcodes zu scannen oder Fertigstellungen zu
bestätigen.

## Gestaltung

- Große Touch-Ziele — Buttons mindestens 48px hoch
- Oberfläche einfach halten — eine Aufgabe pro Bildschirm
- Mindestens 16px Schriftgröße für Lesbarkeit bei Fabrikbeleuchtung
- Kontraststarke Farben

## Layout-Muster

```html
<div class="flex flex-col items-center justify-center min-h-screen bg-base-100 p-8">
  <input v-model="jobId" class="input input-bordered input-lg w-full max-w-md mb-4"
    placeholder="Scan or enter Job ID" @keydown.enter="loadJob" />

  <div v-if="currentJob" class="card bg-base-200 w-full max-w-md p-6">
    <h2 class="text-2xl font-bold mb-1">{{ currentJob.name }}</h2>
    <p class="text-lg mb-4">{{ currentJob.quantity }} sheets</p>

    <div v-for="op in currentJob.operations" :key="op.id"
      class="flex items-center justify-between py-2 border-t border-base-300">
      <span class="text-lg">{{ op.name }} — {{ op.status }}</span>
      <button v-if="op.status !== 'COMPLETED'" @click="markComplete(op.id)"
        class="btn btn-success btn-lg">Complete</button>
    </div>
  </div>
</div>
```

## Fortschritt melden

Shopfloor-Fortschritt wird **pro Operation** geführt, nicht durch direktes Setzen eines
Job-Status — „Complete" überführt eine Operation nach `COMPLETED`.

Server-API (`serverApi.lua`):

```lua
exports = {}

function exports.getJob(input)
  local res = ctx.graphql.query([[
    query($id: JobID!) {
      getJob(id: $id) { id name quantity operations { id name status } }
    }
  ]], { id = input.jobId })
  return { status = "ok", result = res.data.getJob }
end

function exports.completeOperation(input)
  local res = ctx.graphql.query([[
    mutation($op: TransitionOperationInput!) {
      transitionOperation(input: $op) { operation { id status } }
    }
  ]], { op = { id = input.operationId, status = "COMPLETED" } })
  return { status = "ok", result = res.data.transitionOperation.operation }
end
```

Script (Client):

```javascript
const jobId = ref('');
const currentJob = ref(null);

async function loadJob() {
  const r = await window.rpc('getJob', { jobId: jobId.value });
  currentJob.value = r.result;
}

async function markComplete(operationId) {
  await window.rpc('completeOperation', { operationId });
  await loadJob(); // Operationsliste neu laden
}

const setupReturn = { jobId, currentJob, loadJob, markComplete };
```
