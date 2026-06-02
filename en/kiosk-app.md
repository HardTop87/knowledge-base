---
slug: kiosk-app
category: custom-apps
status: published
lang: en
title: "Building a Kiosk App"
---

## What is a Kiosk app?

A Kiosk app is a full-screen interface for shared shopfloor terminals. Only users with the **Kiosk** user type can access Kiosk apps — regular users cannot.

Kiosk apps are built for operators who need a simple, touch-friendly interface to report job progress, scan barcodes, or confirm completions.

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

  <div v-if="currentJob" class="card bg-base-200 w-full max-w-md p-6 mb-6">
    <h2 class="text-2xl font-bold">{{ currentJob.name }}</h2>
    <p class="text-lg">{{ currentJob.quantity }} sheets</p>
  </div>

  <button v-if="currentJob" @click="markComplete"
    class="btn btn-success btn-lg w-full max-w-md">
    Mark Complete
  </button>
</div>
```