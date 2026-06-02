---
slug: create-workflow
category: workflows-automation
status: published
lang: en
title: "How to Create a Workflow"
---

## How to create a Workflow

1. Go to **Menu → Workflows**
2. Click **+ New Workflow**
3. Give the Workflow a **Name** and optionally a **Description**
4. Click **Create**

You are now in the Workflow editor.

## Step 1: Add a trigger

Every Workflow starts with a trigger. Click the **+ Trigger** area and select the trigger type:

- **Job Event** — fires when a job is created, updated, or changes status
- **Device Metric** — fires when a device sends a matching metric (MQTT)
- **Schedule** — fires on a cron schedule
- **Webhook** — fires when an external system calls your webhook URL. See [How to Use Incoming Webhooks](#incoming-webhooks).
- **Script** — fired programmatically from a Script (e.g. another workflow or tenant Script)
- **Manual** — fired by a user clicking a button in the platform

## Step 2: Add nodes

Click **+** below any existing node to add the next step. See the full [Node Types Reference](#node-types-reference).

For each node:
1. Give it a clear **Name**
2. Configure the node-specific settings
3. Connect it to the next node

## Step 3: Test and activate

1. Click **Test** — runs the Workflow with a sample payload
2. Check the execution output in the **Executions** tab. See [How to Monitor Workflow Executions](#monitor-executions).
3. Fix any errors
4. When ready, click **Activate**

## Need a human approval step?

See [Human-in-the-Loop Workflows](#hitl-workflows) to pause a Workflow until a person completes a Task.
