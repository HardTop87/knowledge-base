---
slug: notification-groups
category: platform-configuration
status: published
lang: de
title: "How to Set Up Notification Groups"
---

## Was ist eine Notification Group?

Eine Notification Group ist eine benannte Empfängerliste, an die Workflows Nachrichten senden können. Statt E-Mail-Adressen hart zu verdrahten, referenzieren Sie eine Group. So lassen sich Empfänger ändern, ohne Workflows anzupassen.

## Eine Notification Group anlegen

1. Wechseln Sie zu **Menu → Business Hub → Notification Groups**
2. Klicken Sie auf **+ Add Group**
3. Vergeben Sie einen **Name** (z.B. `Produktionsleiter`, `On-Call Team`)
4. Klicken Sie auf **+ Add Recipient** und wählen Sie User aus oder tragen Sie E-Mail-Adressen ein
5. Jeder Empfänger wird per **E-Mail** erreicht (der Zustellkanal für Notification Groups)
6. Klicken Sie auf **Save**

## Eine Notification Group im Workflow nutzen

Fügen Sie eine **Message** Node ein:

1. Wählen Sie die Notification Group
2. Tragen Sie **Subject** und **Message** ein
3. Binden Sie dynamische Daten mit `{{variables}}` ein

## Empfänger verwalten

Empfänger können jederzeit hinzugefügt oder entfernt werden, ohne dass Sie Workflows anpassen müssen. Die Änderung greift bei der nächsten Execution.