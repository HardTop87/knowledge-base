---
slug: incoming-webhooks
category: platform-configuration
status: published
lang: de
title: "How to Use Incoming Webhooks"
---

## Was ist ein Incoming Webhook?

Ein Incoming Webhook ist eine eindeutige URL, an die externe Systeme einen POST-Request senden, um einen CoCoCo Workflow auszulösen. Es ist der einfachste Weg, CoCoCo mit jedem System zu verbinden, das einen HTTP-Request senden kann.

## Einen Incoming Webhook anlegen

1. Wechsle zu **Menu → Developer → Incoming Webhooks**
2. Klicke auf **+ Add Webhook**
3. Vergib einen **Name** (z. B. `Auftragsimport aus PrintOS`)
4. Wähle den **Workflow**, der ausgelöst werden soll
5. Klicke auf **Save**

CoCoCo erzeugt eine eindeutige URL:

```
https://<your-domain>/webhooks/{slug}
```

## Daten an einen Webhook senden

```bash
curl -X POST https://<your-domain>/webhooks/your-slug \
  -H "Content-Type: application/json" \
  -d '{"jobId": "12345", "customer": "Acme Corp"}'
```

Das gesendete JSON steht als Workflow-Trigger-Payload zur Verfügung.

## Sicherheit

Incoming Webhooks verlangen standardmäßig keine Authentifizierung. Um einen abzusichern, ergänze im Workflow eine Condition Node, die einen Geheim-Header-Wert prüft.