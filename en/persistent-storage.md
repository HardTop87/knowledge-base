---
slug: persistent-storage
category: custom-apps
status: published
lang: en
title: "Using Persistent Storage in Custom Apps"
---

## What is Persistent Storage?

Custom Apps have access to a simple key-value storage system that persists data between sessions. Unlike JavaScript variables (which reset on page refresh), stored values survive across page loads.

## Storage API

```javascript
// Save
await window.storage.set('my-key', JSON.stringify({ count: 5 }));

// Read
try {
  const result = await window.storage.get('my-key');
  const data = result ? JSON.parse(result.value) : null;
} catch (err) {
  // Key not found or error
}

// Delete
await window.storage.delete('my-key');

// List keys with prefix
const keys = await window.storage.list('config:');
```

## Personal vs. shared storage

| Mode | Visible to | Use case |
|---|---|---|
| Personal (default) | Current user only | Preferences, saved filters |
| Shared (`true` as 3rd arg) | All app users | Shared config, leaderboards |

```javascript
await window.storage.set('config', value, true); // shared
```

## Limitations

- Text/JSON only — no binary data
- Keys max 200 characters, no spaces or path separators
- Values max 5MB per key
- Always batch related data into a single key