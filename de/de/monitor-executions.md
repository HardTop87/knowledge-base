---
slug: monitor-executions
category: workflows-automation
status: published
lang: de
title: "How to Monitor Workflow Executions"
---

## Workflow Executions anzeigen

1. Wechsle zu **Menu → Workflows**
2. Klicke auf einen Workflow, um ihn zu öffnen
3. Wechsle zum Tab **Executions**

Du siehst eine Liste aller jüngsten Executions mit Status, Startzeit und Dauer.

## Execution Status

| Status | Bedeutung |
|---|---|
| **Pending** | In der Warteschlange, noch nicht gestartet |
| **Running** | Läuft gerade |
| **Waiting** | Pausiert — wartet auf eine menschliche Task oder ein externes Signal |
| **Completed** | Erfolgreich beendet |
| **Failed** | Durch einen Fehler gestoppt |
| **Cancelled** | Manuell gestoppt |

## Eine Execution im Detail prüfen

Klicke auf eine Execution, um die Detailansicht zu öffnen:

- **Timeline**: zeigt die Reihenfolge der ausgeführten Nodes
- **Node Output**: Klick auf eine Node zeigt deren Input- und Output-Daten
- **Fehlerdetails**: Bei einer fehlgeschlagenen Execution wird der Fehler an der entsprechenden Node angezeigt

## Fehler analysieren

1. Öffne die fehlgeschlagene Execution
2. Suche die rot markierte Node
3. Klicke auf die Node, um Fehlermeldung und Input zu sehen
4. Behebe die Workflow-Konfiguration
5. Teste erneut mit **Test** im Editor

> **Tipp:** Aktiviere beim Debugging **Verbose logging** in den Workflow-Einstellungen. So bekommt jede Node eine ausführliche Log-Ausgabe.