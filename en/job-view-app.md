---
slug: job-view-app
category: custom-apps
status: published
lang: en
title: "Building a Job View App"
---

## What is a Job View app?

A Job View app is embedded directly in the Job detail panel. When a user opens a Job,
the app appears as a section within that job's view — alongside the standard job
information.

Ideal for: custom quality checklists, machine-specific parameters, supplementary data
from external systems, or quick action buttons.

## Accessing the current Job

The current Job's ID is passed in as a prop. Fetch its data through a server handler
(client calls `window.rpc`, the handler queries with `ctx.graphql`):

Server API (`serverApi.lua`):

```lua
exports = {}

function exports.getJob(input)
  local res = ctx.graphql.query([[
    query($id: JobID!) {
      getJob(id: $id) { id name status quantity }
    }
  ]], { id = input.jobId })
  return { status = "ok", result = res.data.getJob }
end
```

Script (client):

```javascript
const props = defineProps({ jobId: String });
const job = ref(null);

onMounted(async () => {
  if (props.jobId) {
    const r = await window.rpc('getJob', { jobId: props.jobId });
    job.value = r.result;
  }
});

const setupReturn = { job };
```

The job node type is `JobState`; query its fields directly (it has no `workCenter`
field — job/resource links run through `operations`).

## Layout

Job View apps appear in a constrained panel. Design for approximately 600–800px wide.

```html
<div class="p-4 bg-base-100">
  <h3 class="font-bold text-base-content mb-3">Quality Checklist</h3>
  <div v-if="job"><!-- checklist content --></div>
</div>
```
