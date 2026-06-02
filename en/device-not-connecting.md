---
slug: device-not-connecting
category: troubleshooting
status: published
lang: en
title: "Device Is Not Connecting"
---

## Verify the Device Token

1. Go to **Menu → IOT → Devices** and open the Device
2. Go to the **Tokens** tab
3. Confirm a valid, non-expired token exists
4. If in doubt, create a new token and reconfigure the device

## Check protocol and endpoint

| Protocol | Connection endpoint |
|---|---|
| MQTT | `mqtt://your-domain.cococo.app:1883` |
| MQTT (TLS) | `mqtts://your-domain.cococo.app:8883` |
| HTTP | `https://your-domain.cococo.app/api/device/{deviceId}` |

## Check authentication

- **MQTT** — use the token as the MQTT password field
- **HTTP** — include `Authorization: Bearer YOUR_TOKEN` header

## Confirm the Network assignment

1. Open the Device and verify the correct Network is assigned
2. If the Network has IP restrictions, confirm the device's IP is allowed

## Check recent activity

1. Open the Device → **Events** or **Metrics** tab
2. If recent events show, the device IS connecting — the issue may be downstream

## Firewall

Confirm the device's network allows outbound connections to CoCoCo's domain on the required port.