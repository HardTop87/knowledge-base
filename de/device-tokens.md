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

1. Wechseln Sie zu **Menu → IOT → Devices**
2. Öffnen Sie das Device, das Sie konfigurieren möchten
3. Wechseln Sie zum Tab **Tokens**
4. Klicken Sie auf **+ Add Token**
5. Vergeben Sie einen **Name** (z.B. `Main credential` oder `Production token`)
6. Optional: **Expiration date** setzen
7. Klicken Sie auf **Create**
8. **Kopieren Sie das Token sofort**. Nach dem Verlassen der Seite ist es nicht mehr sichtbar

## Token auf dem Device verwenden

Senden Sie das Token im `Authorization` Header bei jedem Request, den die Maschine an CoCoCo stellt:

```
Authorization: Bearer YOUR_DEVICE_TOKEN
```

Bei MQTT-Verbindungen tragen Sie das Token im Passwort-Feld Ihres MQTT-Clients ein.

## Ein Token widerrufen

1. Öffnen Sie das Device
2. Wechseln Sie zum Tab **Tokens**
3. Klicken Sie auf **Revoke** neben dem Token
4. Bestätigen Sie

Das Token ist sofort ungültig.