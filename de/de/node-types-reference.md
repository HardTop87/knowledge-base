---
slug: node-types-reference
category: workflows-automation
status: published
lang: de
title: "Node Types Reference"
---

## Flow Control

| Node | Funktion |
|---|---|
| **Condition** | Verzweigt anhand einer JSONLogic-Wahr/Falsch-Prüfung |
| **Switch** | Wählt einen von mehreren Ausgängen über JSONLogic-Prädikate |
| **Split** | Fächert einen Eingang parallel auf alle ausgehenden Kanten auf |
| **Join** | Führt 2+ Eingänge zusammen; fertig, wenn alle Eingänge vorliegen |
| **For Each** | Iteriert über ein Array und führt je Element einen Body-Node aus |
| **Delay** | Pausiert für eine konfigurierbare Dauer, reicht den Eingang dann durch |

## Data

| Node | Funktion |
|---|---|
| **Transform** | Formt/mappt Daten per Field-Mapping um |
| **Set Variable** | Speichert Workflow-Variablen, später lesbar über `$.variables` |
| **JSON Parse** | Wandelt zwischen JSON-Strings und strukturierten Daten |
| **CSV Parse** | Wandelt zwischen CSV-Strings und strukturierten Daten |
| **YAML Parse** | Wandelt zwischen YAML-Strings und strukturierten Daten |
| **Regex** | Match, Extraktion, Ersetzung oder Split auf Strings |

## Integration / Network

| Node | Funktion |
|---|---|
| **HTTP Request** | HTTP-Anfrage an ein Gerät (über dessen Bridge-Controller) |
| **SQL Query** | Abfrage einer geräteseitigen Datenbank |
| **MQTT Publish** | Nachricht veröffentlichen (optional an ein bestimmtes Gerät) |
| **GraphQL** | Query oder Mutation gegen die CoCoCo-API ausführen |
| **Integration Action** | Eine von einer installierten Integration exportierte Aktion ausführen |
| **Message** | Getemplatete Benachrichtigung an Gruppe oder Empfänger senden |

## File I/O

On-Premise-Dateioperationen über einen BridgeApp-Controller.

| Node | Funktion |
|---|---|
| **File Read** | Dateiinhalt aus On-Premise-Speicher lesen |
| **File Write** | Inhalt in eine Datei im On-Premise-Speicher schreiben |
| **File Check** | Prüfen, ob eine Datei/ein Verzeichnis existiert |
| **File List** | Verzeichnisinhalt auflisten |
| **File Delete** | Eine Datei löschen |

## Scripting / Logic

| Node | Funktion |
|---|---|
| **Script** | Lua-Script ausführen (`scriptId`, `scriptName` oder inline) |
| **Assert** | Bedingung prüfen; je nach Ergebnis fehlschlagen oder verzweigen |
| **Log** | Nachricht ins Ausführungslog schreiben; reicht den Eingang durch |
| **Task** | Menschliche Aufgabe erstellen und auf Erledigung warten |

## Other

| Node | Funktion |
|---|---|
| **Custom Action** | Eine benutzerdefinierte Custom Action (Lua-basiert) ausführen |
| **ML Predict** | ML-Modell-Prognose mit typisierten Feature-Inputs |
| **MicroSQL** | Eine MicroSQL-Abfrage gegen die Reporting-Engine ausführen |
| **Agent** | Einen KI-Agenten mit einem Prompt für freie LLM-Verarbeitung aufrufen |
| **Agent Task** | Eine Aufgabe per KI-Agent lösen (optional Fallback auf menschliche Aufgabe) |
| **Producibility Audit** | Machbarkeits-Audit des Produktions-DAG eines Jobs — Schweregrad, Findings, Risiko-Items |
