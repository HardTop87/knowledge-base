---
slug: notification-groups
category: platform-configuration
status: published
lang: de
title: "How to Set Up Notification Groups"
---

## Was ist eine Notification Group?

Eine Notification Group ist eine benannte Empfängerliste, an die Workflows Nachrichten senden können. Statt E-Mail-Adressen hart zu verdrahten, referenziere eine Group. So lassen sich Empfänger ändern, ohne Workflows anzupassen.

## Eine Notification Group anlegen

1. Wechsle zu **Menu → Business Hub → Notification Groups**
2. Klicke auf **+ Add Group**
3. Vergib einen **Name** (z. B. `Produktionsleiter`, `On-Call Team`)
4. Klicke auf **+ Add Recipient** und wähle User aus oder trage E-Mail-Adressen ein
5. Jeder Empfänger wird per **E-Mail** erreicht (der Zustellkanal für Notification Groups)
6. Klicke auf **Save**

## Eine Notification Group im Workflow nutzen

Füge eine **Message** Node ein:

1. Wähle die Notification Group
2. Trage **Subject** und **Message** ein
3. Binde dynamische Daten mit `{{variables}}` ein

## Empfänger verwalten

Empfänger können jederzeit hinzugefügt oder entfernt werden, ohne dass du Workflows anpassen musst. Die Änderung greift bei der nächsten Execution.