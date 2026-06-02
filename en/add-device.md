---
slug: add-device
category: networks-devices
status: published
lang: en
title: "How to Add a Device"
---

## What is a Device?

A Device represents a physical machine, sensor, or system connected to CoCoCo. Devices send data to the platform (metrics, events, status updates) and can receive commands.

CoCoCo supports four protocols for device communication: MQTT, HTTP, JMF, and SQL.

## Before you start

You need a Network set up first.

[How to Create a Network](#create-network)

## How to add a Device

1. Go to **Menu → IOT → Devices**
2. Click **+ Add Device**
3. Fill in the details:
   - **Name** — a clear label for the machine (e.g. `HP Indigo 12000`)
   - **Network** — select the Network this device belongs to
   - **Protocol** — how the device communicates (MQTT, HTTP, JMF, or SQL)
4. Click **Save**

## Authentication

Most devices need a **Device Token** to authenticate with the platform. After saving the device:

1. Open the device
2. Go to the **Tokens** tab
3. Create a token and configure it in your device or machine software

[How to Create and Manage Device Tokens](#device-tokens)