---
slug: workflow-not-triggering
category: troubleshooting
status: published
lang: de
title: "Workflow Is Not Triggering"
---

## prüfe, ob der Workflow aktiv ist

1. Wechsle zu **Menu → Workflows**
2. Suche den Workflow und prüfe den Status
3. Wenn **Inactive**, klicke auf **Activate**

## prüfe die Trigger-Konfiguration

1. Öffne den Workflow und klicke auf die Trigger-Node
2. Prüfe Trigger-Typ und Bedingungen:
   - **Job Event**: passender Event-Typ? (Created, Updated, Status Changed)
   - **Device Metric**: passen Metrik-Name und Bedingung zu dem, was das Device sendet?
   - **Webhook**: wird die richtige Webhook-URL aufgerufen?
   - **Schedule**: ist der Cron-Ausdruck gültig?

## Jüngste Executions prüfen

1. Öffne den Workflow und wechsle zum Tab **Executions**
2. Halte Ausschau nach **Failed** Executions
3. Öffne eine fehlgeschlagene und analysiere, welche Node an welcher Stelle abbricht

## Häufige Ursachen

| Symptom | Wahrscheinliche Ursache |
|---|---|
| Gar keine Executions | Workflow inaktiv oder Trigger-Bedingungen greifen nie |
| Executions scheitern sofort | Trigger-Datenformat passt nicht |
| Executions scheitern mittendrin | Eine nachgelagerte Node hat ein Konfigurations- oder Berechtigungsproblem |
| Webhook feuert nicht | Falsche URL oder das externe System sendet keinen Request |

## Verbose Logging aktivieren

In den Workflow-Einstellungen aktiviere **Verbose logging**, um detaillierte Input/Output-Daten je Node zu sehen.