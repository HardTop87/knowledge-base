---
slug: add-controller
category: networks-devices
status: published
lang: de
title: "How to Add a Controller"
---

## Was ist ein Controller?

Ein Controller ist die Brücke zwischen Ihrem physischen Netzwerk und CoCoCo. Er steuert die Kommunikation zwischen Devices und der Plattform. Dazu gehören Protokollübersetzung, Nachrichten-Routing und Verbindungsstatus.

Wenn Sie Devices in einem lokalen Netzwerk betreiben, das nicht direkt ins Internet kann, fungiert ein Controller als lokales Gateway.

## Einen Controller anlegen

1. Wechseln Sie zu **Menu → IOT → Controllers**
2. Klicken Sie auf **+ Add Controller**
3. Vergeben Sie einen **Name** (z.B. `Shopfloor Gateway`)
4. Wählen Sie das **Network**, zu dem der Controller gehört
5. Klicken Sie auf **Save**
6. Kopieren Sie die **Controller-Zugangsdaten**. Sie brauchen sie beim Einrichten der Controller-Software

## Wann brauchen Sie einen Controller?

Sie brauchen keinen Controller, wenn Ihre Devices direkt über das Internet mit CoCoCo kommunizieren. Controller sind besonders nützlich, wenn:

- Devices in einem isolierten lokalen Netzwerk stehen
- Sie lokale Pufferung bei Internetausfällen brauchen
- Protokollübersetzung am Edge nötig ist