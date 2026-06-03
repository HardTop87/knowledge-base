---
slug: create-workflow
category: workflows-automation
status: published
lang: de
title: "How to Create a Workflow"
---

## Einen Workflow erstellen

1. Gehe zu **Menu → Workflows**
2. Klicke **+ New Workflow**
3. Gib dem Workflow einen **Namen** und optional eine **Beschreibung**
4. Klicke **Create**

Du bist nun im Workflow-Editor.

## Schritt 1: Trigger hinzufügen

Jeder Workflow beginnt mit einem Trigger. Klicke auf den Bereich **+ Trigger** und wähle den Trigger-Typ:

- **Job Event** — feuert, wenn ein Job erstellt/aktualisiert wird oder den Status wechselt
- **Device Metric** — feuert, wenn ein Gerät eine passende Metrik sendet (MQTT)
- **Schedule** — feuert nach einem Cron-Zeitplan
- **Webhook** — feuert, wenn ein externes System deine Webhook-URL aufruft. Siehe [How to Use Incoming Webhooks](#incoming-webhooks).
- **Edge App Event** — feuert, wenn eine Edge App auf einem Controller ein Event veröffentlicht. Siehe [What are Edge Apps?](#what-are-edge-apps).
- **Script** — programmgesteuert aus einem Script ausgelöst (z. B. ein anderer Workflow oder ein Tenant-Script)
- **Manual** — von einem Nutzer per Button-Klick in der Plattform ausgelöst

## Schritt 2: Nodes hinzufügen

Klicke **+** unter einem bestehenden Node, um den nächsten Schritt hinzuzufügen. Siehe die vollständige [Node Types Reference](#node-types-reference).

Für jeden Node:
1. Gib ihm einen klaren **Namen**
2. Konfiguriere die node-spezifischen Einstellungen
3. Verbinde ihn mit dem nächsten Node

## Schritt 3: Testen und aktivieren

1. Klicke **Test** — führt den Workflow mit einem Beispiel-Payload aus
2. Prüfe die Ausgabe im Tab **Executions**. Siehe [How to Monitor Workflow Executions](#monitor-executions).
3. Behebe etwaige Fehler
4. Wenn bereit, klicke **Activate**

## Brauchst du einen menschlichen Freigabeschritt?

Siehe [Human-in-the-Loop Workflows](#hitl-workflows), um einen Workflow anzuhalten, bis eine Person eine Task erledigt.
