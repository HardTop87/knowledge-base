---
slug: add-controller
category: networks-devices
status: published
lang: de
title: "How to Add a Controller"
---

## Was ist ein Controller?

Ein Controller ist die Brücke zwischen deinem physischen Netzwerk und CoCoCo. Er steuert die Kommunikation zwischen Devices und der Plattform. Dazu gehören Protokollübersetzung, Nachrichten-Routing und Verbindungsstatus.

Wenn du Devices in einem lokalen Netzwerk betreibst, das nicht direkt ins Internet kann, fungiert ein Controller als lokales Gateway.

## Einen Controller anlegen

1. Wechsle zu **Menu → IOT → Controllers**
2. Klicke auf **+ Add Controller**
3. Vergib einen **Name** (z. B. `Shopfloor Gateway`)
4. Wähle das **Network**, zu dem der Controller gehört
5. Klicke auf **Save**
6. Kopiere die **Controller-Zugangsdaten**. Du brauchst sie beim Einrichten der Controller-Software

## Wann brauchst du einen Controller?

Du brauchst keinen Controller, wenn deine Devices direkt über das Internet mit CoCoCo kommunizieren. Controller sind besonders nützlich, wenn:

- Devices in einem isolierten lokalen Netzwerk stehen
- du lokale Pufferung bei Internetausfällen brauchst
- Protokollübersetzung am Edge nötig ist