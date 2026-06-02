---
slug: what-are-integrations
category: developer-tools
status: published
lang: en
title: "What are Integrations?"
---

## What is an Integration?

An **Integration** is a packaged extension that runs **server-side inside CoCoCo** to connect external systems and devices. It bundles its own handlers (timer, event, and RPC), per-install storage, and configuration into a versioned definition you build, publish, and install.

Typical uses: syncing with an ERP/MIS over HTTP, transforming inbound webhooks, calling a device's local HTTP or SQL endpoint, or running scheduled jobs against the platform.

## How it differs from other extensions

| | Runs where | Built with |
|---|---|---|
| **Integration** | In the cloud, scoped to an install | `ctx.integration.*` + base `ctx` |
| **Edge App** | On a Controller (edge) | `bridge.*` |
| **Custom App** | In the browser | Vue + JS (+ optional Lua) |

## The integration runtime

Integration handlers use the install-scoped `ctx.integration.*` surface, plus the tenant-scoped base API:

- `ctx.integration.containersGet/Set/Delete/List/Query(...)` — per-install structured storage (manifest-declared schemas)
- `ctx.integration.cacheGet/cacheSet/cacheDelete(...)` — per-install Redis cache
- `ctx.integration.getConfig/getBindings/getVersion(...)` — install metadata
- `ctx.device.http(alias, opts)` / `ctx.device.sql(alias, opts)` — call a bound device through its Bridge controller
- `ctx.graphql`, `ctx.sql`, `ctx.cache`, `ctx.log` — the usual tenant-scoped helpers

## External API schemas

You can upload an external API's **OpenAPI/Swagger schema** to the platform and search it, so an Integration can target a third-party API's endpoints and models accurately.

## Lifecycle

Build a **Draft** (manifest + bundle) → **validate** → **publish** to an active definition → **install** with config and resource bindings. To build one, see [How to Build an Integration](#build-integration).
