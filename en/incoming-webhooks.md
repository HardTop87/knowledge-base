---
slug: incoming-webhooks
category: platform-configuration
status: published
lang: en
title: "How to Use Incoming Webhooks"
---

## What is an Incoming Webhook?

An Incoming Webhook is a unique URL that external systems can POST to in order to trigger a CoCoCo Workflow. It's the simplest way to connect CoCoCo to any system that can send an HTTP request.

## How to create an Incoming Webhook

1. Go to **Menu → Developer → Incoming Webhooks**
2. Click **+ Add Webhook**
3. Enter a **Name** (e.g. `Order Import from PrintOS`)
4. Select the **Workflow** to trigger
5. Click **Save**

CoCoCo generates a unique URL:

```
https://your-domain.cococo.app/webhooks/{slug}
```

## Sending data to a Webhook

```bash
curl -X POST https://your-domain.cococo.app/webhooks/your-slug \
  -H "Content-Type: application/json" \
  -d '{"jobId": "12345", "customer": "Acme Corp"}'
```

The posted JSON is available as the Workflow trigger payload.

## Security

Incoming Webhooks do not require authentication by default. To secure one, add a Condition node in the Workflow that validates a secret header value.