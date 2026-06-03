---
slug: job-stuck
category: troubleshooting
status: published
lang: de
title: "Job Is Stuck in a Status"
---

## Job-Status prüfen

1. Wechsle zu **Data → Production → Jobs**
2. Suche den Job und notiere den aktuellen Status (z. B. `PREPRESS`, `PRESS`, `WAITING`)

## Warum ein Job hängenbleibt

Ein Job kommt voran, indem seine **Operations** auf dem Shopfloor weitergeschaltet werden und **Workflows** auf seine Events reagieren. Er wirkt „hängengeblieben", wenn eines davon ausbleibt:

| Situation | Häufige Ursachen |
|---|---|
| Kommt über einen Produktionsstatus nicht hinaus (z. B. **Prepress**, **Press**) | Die aktuelle Operation wurde auf dem Shopfloor nicht auf **Completed** geschaltet |
| Steht in **Waiting** | Ein Workflow ist auf einer HITL-Task pausiert, die nicht abgeschlossen wurde, oder wartet auf eine Abhängigkeit |
| Eine Operation startet nie (**Pending** / **Available**) | Kein Work Center hat sie aufgegriffen, oder eine vorgelagerte Operation ist nicht fertig |

## Wenn ein Workflow ihn hätte weiterschalten sollen

1. Prüfe, ob ein Workflow auf die Events dieses Jobs auslösen sollte
2. Prüfe die Trigger-Bedingungen im Workflow
3. Öffne den Workflow → **Executions**-Tab und prüfe auf Fehler

[Workflow Is Not Triggering](#workflow-not-triggering)

## Wenn eine HITL-Task blockiert

1. Öffne den Job
2. Prüfe den **Tasks**-Bereich auf offene, nicht zugewiesene Tasks
3. Task zuweisen und abschließen, damit der Workflow weiterläuft

## Eine Operation manuell weiterschalten

1. Öffne den Job und geh zu seinen **Operations**
2. Schalte die aktuelle Operation in den nächsten Zustand (z. B. Running → Completed) — der Shopfloor-Fortschritt läuft über Operation-Transitions, nicht über das direkte Bearbeiten des Job-Status
3. Dokumentiere den Grund in den Job-Notizen

## Operation-Zustände (Referenz)

Eine Operation durchläuft diese Zustandsmaschine: **Pending → Available → Setup → Running → Cleanup → Completed**. Von dort kann sie auch **Stopped**, **Failed**, **Cancelled** oder zurück in **Restarting** gehen. „Complete" auf dem Shopfloor schaltet die aktuelle Operation auf **Completed**; aus jedem Zustand sind nur bestimmte Übergänge erlaubt.

> Job-Produktionsstatus (z. B. **Prepress**, **Press**, **Postpress**) werden durch die Branchen-**Vertical** Deiner Installation definiert — dein Tenant kann also mehr oder andere Status zeigen als eine andere Instanz. Die obigen Operation-Zustände sind über alle Verticals hinweg einheitlich.

## Eskalation

Prüfe die Workflow-Execution-Logs auf Fehlermeldungen um den Zeitpunkt, an dem der Job stehen blieb.