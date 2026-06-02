---
slug: scripts
category: developer-tools
status: published
lang: de
title: "How to Use Scripts"
---

## Was sind Scripts?

Scripts sind wiederverwendbare Lua-Funktionen, die aus Workflows, Custom Actions und Custom Apps heraus aufrufbar sind. Sie kapseln Logik, die Sie in mehreren Workflows nutzen möchten.

## Script-Rollen

| Rolle | Einsatz |
|---|---|
| **Script** | Allgemeines Lua, aufgerufen aus Workflow Script Nodes |
| **JDF Template** | Erzeugt JDF-Jobtickets für Druckmaschinen |
| **JMF Template** | Erzeugt JMF-Nachrichten für Maschinenkommunikation |
| **ML Data Query** | Liefert Trainingsdaten für ML-Modelle |

## Ein Script anlegen

1. Wechseln Sie zu **Menu → Developer → Scripts**
2. Klicken Sie auf **+ New Script**
3. Vergeben Sie einen **Name** und wählen Sie die **Role**
4. Schreiben Sie den Lua-Code im Editor
5. Klicken Sie auf **Save**

## Ein Script aus einem Workflow aufrufen

Fügen Sie eine **Script** Node ein, wählen Sie das gespeicherte Script und mappen Sie Input-Variablen aus dem Workflow-Kontext. Der Rückgabewert ist der Node-Output.

## Beispiel

```lua
-- Berechnet einen Priority Score für einen Job
local days = cococo.date.diff(input.due_date, cococo.date.now(), "days")
local weight = input.tier == "premium" and 2 or 1
return math.max(0, (10 - days) * weight)
```