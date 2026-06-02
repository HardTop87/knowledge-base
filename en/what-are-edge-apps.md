---
slug: what-are-edge-apps
category: networks-devices
status: published
lang: en
title: "What are Edge Apps?"
---

## What is an Edge App?

An **Edge App** is a small program that runs **on a Controller** at the edge of your network — not in the CoCoCo cloud. Its job is to reach the machines and protocols the cloud can't talk to directly: a local **MQTT** broker, an **OPC-UA** server on a PLC, or a **Modbus** device on the shopfloor. It translates between those and CoCoCo, and can buffer data when the internet link is down.

## How it differs from other "apps"

| | Runs where | Built with | Purpose |
|---|---|---|---|
| **Edge App** | On a Controller (edge) | `bridge.*` runtime (no `ctx`, no UI) | Bridge local machines/protocols (MQTT, OPC-UA, Modbus) |
| **Integration** | In the cloud | `ctx.integration.*` | Connect external systems/APIs server-side |
| **Custom App** | In the browser | Vue + JS (+ optional Lua) | A user interface on the platform |

## The bridge runtime

Edge App handlers don't use `ctx`. They use the `bridge.*` API:

- `bridge.mqtt.publish(broker, topic, payload, opts?)` — publish to a connected broker
- `bridge.opcua.write(server, nodeId, value)` / `bridge.opcua.call(server, methodNodeId, args)`
- `bridge.state.get/set/delete(key)` — bundle-scoped persistent key-value (strings)
- `bridge.config`, `bridge.graphql`, `bridge.publish`, `bridge.log`

## Versions and installation

An Edge App is **versioned**: you build a **Draft**, then **Publish** it. A published app is **installed onto one or more Controllers**, each with its own variables and secrets. Installing pushes the configuration to the Controller, which then runs the app.

## When to use one

- A machine speaks **OPC-UA** or **Modbus** (which aren't direct CoCoCo device protocols)
- Devices sit on an isolated local network behind a Controller
- You need protocol translation or local buffering at the edge

To build one, see [How to Build and Install an Edge App](#build-edge-app). Edge Apps run on Controllers — see [How to Add a Controller](#add-controller).
