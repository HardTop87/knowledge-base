---
slug: build-edge-app
category: networks-devices
status: published
lang: en
title: "How to Build and Install an Edge App"
---

## Before you start

- At least one **Controller** added and online — see [How to Add a Controller](#add-controller)
- Familiarity with the `bridge.*` runtime — see [What are Edge Apps?](#what-are-edge-apps)

## Step 1 — Create the Edge App

Create a new Edge App with a **handle** and **name**. It starts as a **Draft** you can edit freely.

## Step 2 — Declare connections and config

In the app's manifest, declare:
- The **MQTT brokers** and/or **OPC-UA servers** it talks to, each under a **server alias** you'll reference in code
- A **config schema** for any per-installation **variables** (e.g. a broker URL or a unit ID) and **secrets** (e.g. a password)

Broker fields can use `${config:NAME}` templates so each installation can supply its own value.

## Step 3 — Write the handlers

Handlers run in the `bridge.*` runtime (gopher-lua) — there is **no `ctx`**. A common export is `onMessage`. Example:

```lua
function onMessage(msg)
  -- forward an incoming reading to a local MQTT broker
  local ok, err = bridge.mqtt.publish("default", "factory/state", msg.payload, { qos = 1 })
  if not ok then
    bridge.log.warning("publish failed", { err = err })
  end

  -- remember the last value across restarts
  bridge.state.set("last", msg.payload)
  return { ok = true }
end
```

Use `bridge.opcua.write(server, nodeId, value)` / `bridge.opcua.call(...)` for OPC-UA, and `bridge.graphql` to push data into CoCoCo.

## Step 4 — Publish the Draft

When the Draft is ready, **Publish** it. Publishing freezes the version and flips it to **Published**; the previously published version for the same handle is automatically deprecated.

## Step 5 — Install it on a Controller

Install the published app onto a Controller:
1. Select the **Controller**
2. Fill in the **variables** and **secrets** defined by the config schema
3. Save

CoCoCo validates the variables against the config schema and pushes the configuration to the Controller, which starts running the app under a dedicated bot identity.

## Step 6 — Verify

- Check the Controller shows the installation as active
- Invoke a handler (the app's `onMessage` export) to test it end to end
- Inspect `bridge.log` output for errors

## Managing installations

- **Upgrade** an installation to a newer published version (the Controller restarts with the new content)
- **Deprecate** a published app to retire it without breaking existing installations
- **Uninstall** by deleting the installation (pushes an updated config to the Controller)
- **Export / Import** an app as YAML or JSON to move it between environments
