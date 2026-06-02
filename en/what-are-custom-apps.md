---
slug: what-are-custom-apps
category: custom-apps
status: published
lang: en
title: "What are Custom Apps?"
---

## What are Custom Apps?

Custom Apps are bespoke interfaces that you build and run directly on the CoCoCo platform. They have full access to platform data and APIs, and appear inside the CoCoCo interface — in the sidebar, dashboards, job detail panels, or as dedicated shopfloor kiosks.

## The three components

**Template** — the user interface, written as a Vue.js HTML fragment. Uses Vue directives, Tailwind CSS, and DaisyUI components.

**Script** — client-side logic using Vue Composition API. Handles state, data fetching, interactivity, and reactivity. Expose values to the template via `const setupReturn = { ... }`.

**Server API** — optional Lua code running server-side, for privileged operations or heavy processing.

## App kinds

| Kind | Where it appears |
|---|---|
| **Page** | Left sidebar as a standalone page |
| **Dashboard** | As a tab on the Dashboards screen |
| **Kiosk** | Full-screen for shopfloor terminals — Kiosk users only |
| **Job View** | Embedded in the Job detail panel |

## Why build a Custom App?

Built-in screens cover standard workflows. Custom Apps fill the gaps — shopfloor check-in kiosks, custom dashboards, quality checklists, estimating tools.