---
slug: node-types-reference
category: workflows-automation
status: published
lang: de
title: "Node Types Reference"
---

## Ablaufsteuerung

| Node | Was sie macht |
|---|---|
| **Condition** | Teilt die Ausführung in zwei Pfade anhand einer wahr/falsch-Prüfung |
| **Switch** | Leitet anhand eines Werts auf einen von mehreren Pfaden |
| **Split** | Splittet ein Array und verarbeitet jedes Element parallel |
| **Join** | Wartet, bis mehrere parallele Pfade fertig sind |
| **For Each** | Iteriert über ein Array und führt nachfolgende Nodes je Element aus |
| **Delay** | Pausiert die Ausführung für eine festgelegte Zeit |

## Daten

| Node | Was sie macht |
|---|---|
| **Transform** | Formt oder mappt Daten über Ausdrücke |
| **Set Variable** | Speichert einen Wert zur späteren Verwendung im Workflow |
| **JSON Parse** | Parst einen JSON-String in ein Objekt |
| **CSV Parse** | Parst einen CSV-String in ein Array von Objekten |
| **YAML Parse** | Parst einen YAML-String in ein Objekt |
| **Regex** | Extrahiert Werte per regulärem Ausdruck |

## Integration

| Node | Was sie macht |
|---|---|
| **HTTP Request** | Macht einen ausgehenden HTTP-Call auf eine beliebige URL |
| **GraphQL** | Führt eine GraphQL Query oder Mutation auf die CoCoCo API aus |
| **SQL Query** | Führt eine SQL-Query auf einer angebundenen Datenbank aus |
| **MQTT Publish** | Veröffentlicht eine Nachricht über MQTT an ein Device |
| **Integration Action** | Führt eine Action einer verbundenen Integration aus |
| **Message** | Sendet eine Benachrichtigung an eine Notification Group |

## Scripting

| Node | Was sie macht |
|---|---|
| **Script** | Führt ein Lua-Skript für eigene Logik aus |
| **Custom Action** | Führt eine gespeicherte Custom Action aus |
| **Assert** | Bricht den Workflow ab, wenn eine Bedingung nicht erfüllt ist |
| **Log** | Schreibt einen Wert ins Execution-Log |
| **Task** | Erzeugt eine menschliche Task, die vor dem Weiterlaufen erledigt sein muss |

## AI und ML

| Node | Was sie macht |
|---|---|
| **ML Predict** | Führt eine Vorhersage mit einem trainierten ML-Modell aus |
| **Agent** | Sendet einen Prompt an einen AI Agent und wartet auf die Antwort |
| **Agent Task** | Übergibt einem AI Agent eine Task zur asynchronen Erledigung |