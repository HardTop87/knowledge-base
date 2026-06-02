---
slug: create-workflow
category: workflows-automation
status: published
lang: de
title: "How to Create a Workflow"
---

## Einen Workflow anlegen

1. Wechseln Sie zu **Menu → Workflows**
2. Klicken Sie auf **+ New Workflow**
3. Vergeben Sie einen **Name** und optional eine **Description**
4. Klicken Sie auf **Create**

Sie sind nun im Workflow-Editor.

## Schritt 1: Trigger hinzufügen

Jeder Workflow beginnt mit einem Trigger. Klicken Sie auf **+ Trigger** und wählen Sie den Trigger-Typ:

- **Job Event**: feuert, wenn ein Job angelegt, aktualisiert wird oder den Status ändert
- **Device Metric**: feuert, wenn ein Device eine passende Metrik sendet
- **Schedule**: feuert nach einem Cron-Plan
- **Webhook**: feuert, wenn ein externes System Ihre Webhook-URL aufruft. Siehe [Incoming Webhooks nutzen](#incoming-webhooks).
- **Manual**: wird von einem User durch einen Button-Klick in der Plattform ausgelöst

## Schritt 2: Nodes hinzufügen

Klicken Sie auf **+** unter einer bestehenden Node, um den nächsten Schritt einzufügen. Die vollständige Übersicht: [Node Types Referenz](#node-types-reference).

Für jede Node:
1. Vergeben Sie einen klaren **Name**
2. Konfigurieren Sie die nodespezifischen Einstellungen
3. Verbinden Sie sie mit der nächsten Node

## Schritt 3: Testen und aktivieren

1. Klicken Sie auf **Test**. Der Workflow läuft mit einem Beispiel-Payload
2. Prüfen Sie das Ergebnis im Tab **Executions**. Siehe [Workflow Executions überwachen](#monitor-executions).
3. Beheben Sie Fehler
4. Wenn alles passt, klicken Sie auf **Activate**

## Sie brauchen eine menschliche Freigabe?

Siehe [Human-in-the-Loop Workflows](#hitl-workflows), um den Workflow zu pausieren, bis jemand eine Task abschließt.