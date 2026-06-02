---
slug: understanding-metrics
category: networks-devices
status: published
lang: de
title: "Understanding Metrics"
---

## Was sind Metriken?

Metriken sind strukturierte Datenpunkte, die Devices während der Produktion an CoCoCo senden. Sie geben den aktuellen Zustand Ihrer Maschinen wieder: welcher Job läuft, wie schnell, wie viele Bogen gedruckt sind, welche Fehler aufgetreten sind.

CoCoCo speichert und verarbeitet Metriken, damit Sie sie in Workflows nutzen, in Dashboards anzeigen und über GraphQL abfragen können.

## So funktionieren Metriken

1. Ein Device sendet eine Metrik über sein konfiguriertes Protokoll (MQTT, HTTP etc.) an CoCoCo
2. CoCoCo nimmt die Metrik entgegen und speichert sie, zugeordnet zum Device und zum aktiven Job
3. Workflow-Trigger können auf neue Metriken reagieren, etwa einen Job markieren, wenn die Fehleranzahl einen Schwellwert überschreitet

## Metriken anzeigen

1. Wechseln Sie zu **Menu → IOT → Metrics**
2. Wählen Sie ein Device aus der Liste
3. Schauen Sie sich die jüngsten Metrik-Werte in der Tabelle an

## Metriken in Workflows nutzen

Metriken können Workflow Executions auslösen. Nutzen Sie einen **Device Metric** Trigger Node und konfigurieren Sie die Bedingungen, zum Beispiel:

- `sheets_printed > 1000` löst einen Qualitätscheck aus
- `status == "error"` benachrichtigt den Produktionsleiter
- `job_id changed` startet das Tracking eines neuen Jobs