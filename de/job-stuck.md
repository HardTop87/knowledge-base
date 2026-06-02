---
slug: job-stuck
category: troubleshooting
status: published
lang: de
title: "Job Is Stuck in a Status"
---

## Job-Status prüfen

1. Wechseln Sie zu **Data → Production → Jobs**
2. Suchen Sie den Job und notieren Sie den aktuellen Status

## Häufige Hängen-Stati

| Status | Häufige Ursachen |
|---|---|
| **Pending** | Kein Workflow hat den Job aufgegriffen; Trigger-Bedingung greift nicht |
| **In Progress** | Ein Workflow ist pausiert, eine HITL-Task ist offen |
| **Waiting** | Eine manuelle Task ist zugewiesen, aber noch nicht erledigt |

## Für Jobs in Pending

1. Prüfen Sie, ob ein Workflow bei Job-Erstellung auslösen sollte
2. Prüfen Sie die Trigger-Bedingungen im Workflow
3. Prüfen Sie den Executions-Tab auf jüngste Fehler

[Workflow Is Not Triggering](#workflow-not-triggering)

## Für Jobs in In Progress

1. Öffnen Sie den Job
2. Prüfen Sie den **Tasks** Bereich auf offene, nicht zugewiesene Tasks
3. Task zuweisen und abschließen, damit der Workflow weiterläuft

## Job manuell weiterschalten

1. Öffnen Sie den Job
2. Setzen Sie über das **Status** Feld den passenden nächsten Status manuell
3. Dokumentieren Sie den Grund in den Job-Notizen

## Eskalation

Prüfen Sie die Workflow-Execution-Logs auf Fehlermeldungen um den Zeitpunkt, an dem der Job stehen blieb.