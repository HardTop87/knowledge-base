---
slug: workflow-not-triggering
category: troubleshooting
status: published
lang: de
title: "Workflow Is Not Triggering"
---

## Prüfen Sie, ob der Workflow aktiv ist

1. Wechseln Sie zu **Menu → Workflows**
2. Suchen Sie den Workflow und prüfen Sie den Status
3. Wenn **Inactive**, klicken Sie auf **Activate**

## Prüfen Sie die Trigger-Konfiguration

1. Öffnen Sie den Workflow und klicken Sie auf die Trigger-Node
2. Prüfen Sie Trigger-Typ und Bedingungen:
   - **Job Event**: passender Event-Typ? (Created, Updated, Status Changed)
   - **Device Metric**: passen Metrik-Name und Bedingung zu dem, was das Device sendet?
   - **Webhook**: wird die richtige Webhook-URL aufgerufen?
   - **Schedule**: ist der Cron-Ausdruck gültig?

## Jüngste Executions prüfen

1. Öffnen Sie den Workflow und wechseln Sie zum Tab **Executions**
2. Halten Sie Ausschau nach **Failed** Executions
3. Öffnen Sie eine fehlgeschlagene und analysieren Sie, welche Node an welcher Stelle abbricht

## Häufige Ursachen

| Symptom | Wahrscheinliche Ursache |
|---|---|
| Gar keine Executions | Workflow inaktiv oder Trigger-Bedingungen greifen nie |
| Executions scheitern sofort | Trigger-Datenformat passt nicht |
| Executions scheitern mittendrin | Eine nachgelagerte Node hat ein Konfigurations- oder Berechtigungsproblem |
| Webhook feuert nicht | Falsche URL oder das externe System sendet keinen Request |

## Verbose Logging aktivieren

In den Workflow-Einstellungen aktivieren Sie **Verbose logging**, um detaillierte Input/Output-Daten je Node zu sehen.