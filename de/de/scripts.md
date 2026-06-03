---
slug: scripts
category: developer-tools
status: published
lang: de
title: "How to Use Scripts"
---

## Was sind Scripts?

Scripts sind wiederverwendbare Lua-Funktionen, die aus Workflows, Custom Actions und
Custom Apps aufgerufen werden können. Sie kapseln Logik, die du über mehrere Workflows
hinweg teilen möchtest.

## Script-Rollen

| Rolle | Anwendungsfall |
|---|---|
| **Script** | Allzweck-Lua, aufgerufen aus Workflow-Script-Nodes |
| **JDF Template** | Erzeugt JDF-Job-Tickets für Druckmaschinen |
| **JMF Template** | Erzeugt JMF-Nachrichten für die Maschinenkommunikation |
| **ML Data Query** | Liefert Trainingsdaten für das ML-Modelltraining |

## Ein Script anlegen

1. Gehe zu **Menu → Developer → Scripts**
2. Klicke **+ New Script**
3. Gib einen **Namen** ein und wähle die **Rolle**
4. Schreibe den Lua-Code im Editor
5. Klicke **Save**

## Ein Script aus einem Workflow aufrufen

Füge einen **Script**-Node hinzu, wähle das gespeicherte Script und mappe die
Eingabevariablen aus dem Workflow-Kontext. Der Rückgabewert ist die Node-Ausgabe.

## Beispiel

```lua
-- Berechnet einen Prioritätswert aus den ans Script übergebenen Werten
local remaining_days = input.remaining_days or 0
local weight = input.tier == "premium" and 2 or 1
return math.max(0, (10 - remaining_days) * weight)
```
