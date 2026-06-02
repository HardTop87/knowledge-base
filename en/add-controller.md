---
slug: add-controller
category: networks-devices
status: published
lang: en
title: "How to Add a Controller"
---

## What is a Controller?

A Controller is the bridge between your physical network and CoCoCo. It manages communication between devices and the platform — handling protocol translation, message routing, and connection state.

If you are running devices on a local network that cannot directly reach the internet, a Controller can act as a local gateway.

## How to add a Controller

1. Go to **Menu → IOT → Controllers**
2. Click **+ Add Controller**
3. Enter a **Name** (e.g. `Production Floor Gateway`)
4. Select the **Network** this Controller belongs to
5. Click **Save**
6. Copy the **Controller credentials** — you will need them when configuring the controller software

## When do you need a Controller?

You may not need a Controller if your devices connect directly to CoCoCo via the internet. Controllers are most useful when:

- Devices are on an isolated local network
- You need local buffering during internet outages
- Protocol translation is required at the edge