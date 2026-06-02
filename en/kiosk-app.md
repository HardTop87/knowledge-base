---
slug: kiosk-app
category: custom-apps
status: published
lang: en
title: "Building a Kiosk App"
---

## What is a Kiosk app?

A Kiosk app is a full-screen interface for shared shopfloor terminals. Only users with the
**Kiosk** user type can access Kiosk apps — regular users cannot.

Kiosk apps are built for operators who need a simple, touch-friendly interface to report
job progress, scan barcodes, or confirm completions.

## Design considerations

- Use large touch targets — buttons at least 48px tall
- Keep the interface simple — one task per screen
- Minimum 16px font size for factory lighting readability
- High contrast colors

## Layout pattern

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

## Reporting progress

Shopfloor progress is tracked **per operation**, not by setting a job status directly —
"complete" transitions an operation to `COMPLETED`.

Server API (`serverApi.lua`):

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

Script (client):

```javascript
const jobId = ref('');
const currentJob = ref(null);

async function loadJob() {
  const r = await window.rpc('getJob', { jobId: jobId.value });
  currentJob.value = r.result;
}

async function markComplete(operationId) {
  await window.rpc('completeOperation', { operationId });
  await loadJob(); // refresh the operation list
}

const setupReturn = { jobId, currentJob, loadJob, markComplete };
```
