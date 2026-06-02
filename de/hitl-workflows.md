---
slug: hitl-workflows
category: workflows-automation
status: published
lang: de
title: "Human-in-the-Loop (HITL) Workflows"
---

## Was ist HITL?

Human-in-the-Loop (HITL) bedeutet, einen automatisierten Workflow anzuhalten und auf eine Handlung eines Menschen zu warten, bevor es weitergeht. Typische Fälle:

- Manager-Freigabe für Estimates ab einem bestimmten Wert
- Qualitätsfreigabe, bevor ein Job in die nächste Stufe geht
- Ausnahmebehandlung, wenn eine Maschine einen Fehler meldet
- Datenkorrektur bei unvollständigen eingehenden Daten

## So funktioniert es

Die **Task** Node erzeugt eine menschliche Aufgabe und pausiert den Workflow. Der Workflow läuft erst weiter, wenn die Task als erledigt markiert wird. Entweder von einer Person in der Plattform oder über ein externes Signal.

## Einen HITL-Schritt hinzufügen

1. Fügen Sie im Workflow-Editor an der gewünschten Stelle eine **Task** Node ein
2. Konfigurieren Sie die Task:
   - **Title**: was die Person tun soll (z.B. `Estimate vor Versand prüfen`)
   - **Description**: zusätzlicher Kontext
   - **Assignee**: ein konkreter User, oder leer lassen, damit jemand die Task übernehmen kann
   - **Due in**: optionale Frist
3. Verbinden Sie den Output der Node mit den Schritten, die nach der Freigabe laufen sollen

## Eine Task abschließen

Zugewiesene Tasks erscheinen im Bereich **My Tasks** in der CoCoCo-Seitenleiste. Der Bearbeiter öffnet die Task, prüft den Kontext und klickt auf **Complete**. Der Workflow läuft dann an der pausierten Stelle weiter.