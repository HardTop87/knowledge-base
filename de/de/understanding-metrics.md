---
slug: understanding-metrics
category: networks-devices
status: published
lang: de
title: "Understanding Metrics"
---

## Was sind Metriken?

Metriken sind strukturierte Datenpunkte, die Devices während der Produktion an CoCoCo senden. Du gibst den aktuellen Zustand deiner Maschinen wieder: welcher Job läuft, wie schnell, wie viele Bogen gedruckt sind, welche Fehler aufgetreten sind.

CoCoCo speichert und verarbeitet Metriken, damit du sie in Workflows nutzen, in Dashboards anzeigen und über GraphQL abfragen kannst.

## So funktionieren Metriken

1. Ein Device sendet eine Metrik über sein konfiguriertes Protokoll (MQTT, HTTP etc.) an CoCoCo
2. CoCoCo nimmt die Metrik entgegen und speichert sie, zugeordnet zum Device und zum aktiven Job
3. Workflow-Trigger können auf neue Metriken reagieren, etwa einen Job markieren, wenn die Fehleranzahl einen Schwellwert überschreitet

## Metriken anzeigen

1. Wechsle zu **Menu → IOT → Metrics**
2. Wähle ein Device aus der Liste
3. Schau sich die jüngsten Metrik-Werte in der Tabelle an

## Metriken in Workflows nutzen

Metriken können Workflow Executions auslösen. Nutze einen **Device Metric** Trigger Node und konfiguriere die Bedingungen, zum Beispiel:

- `sheets_printed > 1000` löst einen Qualitätscheck aus
- `status == "error"` benachrichtigt den Produktionsleiter
- `job_id changed` startet das Tracking eines neuen Jobs