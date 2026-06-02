---
slug: add-device
category: networks-devices
status: published
lang: de
title: "How to Add a Device"
---

## Was ist ein Device?

Ein Device repräsentiert eine physische Maschine, einen Sensor oder ein System, das an CoCoCo angebunden ist. Devices senden Daten an die Plattform (Metriken, Ereignisse, Statusupdates) und können Befehle empfangen.

CoCoCo unterstützt vier Protokolle für die Gerätekommunikation: MQTT, HTTP, JMF und SQL.

## Bevor Sie starten

Sie brauchen zuerst ein Network.

[Ein Network anlegen](#create-network)

## Ein Device anlegen

1. Wechseln Sie zu **Menu → IOT → Devices**
2. Klicken Sie auf **+ Add Device**
3. Füllen Sie die Felder aus:
   - **Name**: eine klare Bezeichnung der Maschine (z.B. `HP Indigo 12000`)
   - **Network**: das Network, zu dem das Device gehört
   - **Protocol**: wie das Device kommuniziert (MQTT, HTTP, JMF oder SQL)
4. Klicken Sie auf **Save**

## Authentifizierung

Die meisten Devices brauchen ein **Device Token** zur Authentifizierung. Nach dem Speichern des Devices:

1. Öffnen Sie das Device
2. Wechseln Sie zum Tab **Tokens**
3. Erzeugen Sie ein Token und tragen Sie es in Ihrer Geräte- oder Maschinensoftware ein

[Device Tokens anlegen und verwalten](#device-tokens)