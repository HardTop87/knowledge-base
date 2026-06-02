---
slug: device-tokens
category: networks-devices
status: published
lang: en
title: "How to Create and Manage Device Tokens"
---

## What is a Device Token?

A Device Token is a credential that a physical machine or connected system uses to authenticate itself with CoCoCo. It is separate from user API Tokens — Device Tokens are tied to specific Devices, not to user accounts.

## How to create a Device Token

1. Go to **Menu → IOT → Devices**
2. Open the Device you want to configure
3. Go to the **Tokens** tab
4. Click **+ Add Token**
5. Enter a **Name** (e.g. `Main credential` or `Production token`)
6. Optionally set an **Expiration date**
7. Click **Create**
8. **Copy the token immediately** — it is not shown again after you leave the page

## Using the token on your device

Include the token in the `Authorization` header of every request the machine sends to CoCoCo:

```
Authorization: Bearer YOUR_DEVICE_TOKEN
```

For MQTT connections, use the token as the password field in your MQTT client configuration.

## How to revoke a token

1. Open the Device
2. Go to the **Tokens** tab
3. Click **Revoke** next to the token
4. Confirm

The token stops working immediately.