---
slug: workflow-not-triggering
category: troubleshooting
status: published
lang: en
title: "Workflow Is Not Triggering"
---

## Check the Workflow is active

1. Go to **Menu → Workflows**
2. Find the Workflow and check its status
3. If **Inactive**, click **Activate**

## Check the trigger configuration

1. Open the Workflow and click the trigger node
2. Verify the trigger type and conditions match what you expect:
   - **Job Event** — correct event type? (Created, Updated, Status Changed)
   - **Device Metric** — metric name and condition match what the device sends?
   - **Webhook** — is the correct webhook URL being called?
   - **Schedule** — is the cron expression valid?

## Check recent executions

1. Open the Workflow → **Executions** tab
2. Look for **Failed** executions
3. Click a failed one and inspect which node failed and why

## Common causes

| Symptom | Likely cause |
|---|---|
| No executions at all | Workflow inactive, or trigger conditions never match |
| Executions fail immediately | Trigger data format mismatch |
| Executions fail midway | A downstream node has a configuration or permission error |
| Webhook not firing | Wrong URL, or external system isn't sending a request |

## Enable verbose logging

In Workflow settings, turn on **Verbose logging** to see detailed input/output at each node.