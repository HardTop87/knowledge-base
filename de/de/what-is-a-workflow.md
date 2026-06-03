---
slug: what-is-a-workflow
category: workflows-automation
status: published
lang: de
title: "What is a Workflow?"
---

## Was ist ein Workflow?

Ein Workflow ist ein automatisierter Prozess, der innerhalb von CoCoCo läuft. Er reagiert auf Ereignisse (ein Job wird angelegt, ein Device sendet Daten, ein Mensch schließt eine Task ab) und handelt: sendet Nachrichten, transformiert Daten, ruft externe Systeme auf, aktualisiert Datensätze.

Workflows ersparen manuelle Übergaben und halten die Produktion am Laufen, ohne dass jemand einen Bildschirm beobachten muss.

## Die Bausteine

**Trigger**: Das Ereignis, das den Workflow startet. Jeder Workflow hat genau einen Trigger. Die Trigger-Typen finde unter [Einen Workflow anlegen](#create-workflow).

**Nodes**: Die Verarbeitungsschritte. Jede Node macht genau eine Sache. Die vollständige Übersicht: [Node Types Referenz](#node-types-reference).

**Connections**: Die Linien zwischen Nodes, die die Ausführungsreihenfolge bestimmen.

## Wann ein Workflow sinnvoll ist

- **Job-Routing**: Ein neuer Job kommt herein und wird automatisch der passenden Maschine zugewiesen
- **Benachrichtigungen**: Ein Device meldet einen Fehler und der Operator wird informiert
- **Datenabgleich**: Ein Job ist fertig und die Daten werden an MIS oder ERP übergeben
- **Freigaben**: Der Ablauf pausiert für eine Manager-Freigabe. Siehe [Human-in-the-Loop Workflows](#hitl-workflows).
- **Automatisierung**: Auf jedes Ereignis reagieren, jederzeit, ohne manuelles Eingreifen

## Workflow vs. Custom App

Workflows laufen automatisch im Hintergrund. Custom Apps sind interaktive Oberflächen, die Menschen manuell nutzen. Beide ergänzen sich: Ein Workflow kann eine [Task](#hitl-workflows) erzeugen, die eine [Custom App](#what-are-custom-apps) dann einem Shopfloor-Mitarbeiter zum Abschluss anzeigt.

## Nächste Schritte

- [Einen Workflow anlegen](#create-workflow)
- [Node Types Referenz](#node-types-reference)
- [Workflow Executions überwachen](#monitor-executions)