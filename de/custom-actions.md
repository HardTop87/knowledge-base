---
slug: custom-actions
category: workflows-automation
status: published
lang: de
title: "How to Use Custom Actions"
---

## Was ist eine Custom Action?

Eine Custom Action ist eine gespeicherte, wiederverwendbare Lua-Funktion, die Sie aus einem Workflow-**Custom-Action**-Node heraus aufrufen können. Damit kapseln Sie Geschäftslogik einmal und nutzen sie in mehreren Workflows. Typische Fälle: Berechnungen, Validierungen, Datentransformationen, externe API-Calls.

## Custom Actions vs. Scripts

| | Custom Action | Script |
|---|---|---|
| Wo definiert | Workflows Menü → Custom Actions | Developer → Scripts |
| Wo aufrufbar | Workflow **Custom Action** Node | Workflow **Script** Node |
| Einsatz | Geteilte Geschäftslogik über Workflows hinweg | Allgemeiner Lua-Code, Templates, ML Queries |

## Eine Custom Action anlegen

1. Wechseln Sie zu **Menu → Workflows → Custom Actions**
2. Klicken Sie auf **+ New Custom Action**
3. Vergeben Sie einen **Name** (z.B. `Rush Fee berechnen`) und optional eine **Description**
4. Definieren Sie die **Input-Parameter**: welche Daten die Action braucht
5. Definieren Sie die **Output-Felder**: was die Action zurückgibt
6. Schreiben Sie den Lua-Code
7. Klicken Sie auf **Save**

## Beispiel

```lua
-- Eilzuschlag berechnen
-- Inputs: order_total (number), is_rush (boolean)
-- Output: fee (number)

if input.is_rush then
  return { fee = input.order_total * 0.15 }
else
  return { fee = 0 }
end
```

## Eine Custom Action im Workflow nutzen

1. Fügen Sie im Workflow-Editor eine **Custom Action** Node hinzu
2. Wählen Sie die Custom Action im Dropdown
3. Mappen Sie Workflow-Daten auf die Input-Parameter
4. Der Output der Node enthält den Rückgabewert

Siehe auch: [Scripts nutzen](#scripts) für allgemeinen Lua-Code, der direkt in Script Nodes läuft.