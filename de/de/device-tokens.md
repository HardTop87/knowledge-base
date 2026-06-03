---
slug: device-tokens
category: networks-devices
status: published
lang: de
title: "How to Create and Manage Device Tokens"
---

## Was ist ein Device Token?

Ein Device Token ist ein Schlüssel, mit dem sich eine Maschine oder ein angebundenes System gegenüber CoCoCo authentifiziert. Es unterscheidet sich von User API Tokens: Device Tokens sind an konkrete Devices gebunden, nicht an User-Konten.

## Ein Device Token anlegen

1. Wechsle zu **Menu → IOT → Devices**
2. Öffne das Device, das du konfigurierst möchten
3. Wechsle zum Tab **Tokens**
4. Klicke auf **+ Add Token**
5. Vergib einen **Name** (z. B. `Main credential` oder `Production token`)
6. Optional: **Expiration date** setzen
7. Klicke auf **Create**
8. **Kopiere das Token sofort**. Nach dem Verlassen der Seite ist es nicht mehr sichtbar

## Token auf dem Device verwenden

Sende das Token im `Authorization` Header bei jedem Request, den die Maschine an CoCoCo stellt:

```
Authorization: Bearer YOUR_DEVICE_TOKEN
```

Bei MQTT-Verbindungen trage das Token im Passwort-Feld deines MQTT-Clients ein.

## Ein Token widerrufen

1. Öffne das Device
2. Wechsle zum Tab **Tokens**
3. Klicke auf **Revoke** neben dem Token
4. Bestätige

Das Token ist sofort ungültig.