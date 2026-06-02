---
slug: understanding-metrics
category: networks-devices
status: published
lang: en
title: "Understanding Metrics"
---

## What are Metrics?

Metrics are structured data points that devices send to CoCoCo during production. They capture the live state of your machines — what job is running, how fast, how many sheets printed, what errors occurred.

CoCoCo stores and processes Metrics so they can be used in Workflows, displayed in dashboards, and queried via GraphQL.

## How Metrics work

1. A Device sends a Metric payload to CoCoCo via its configured protocol (MQTT, HTTP, etc.)
2. CoCoCo receives and stores the Metric, associating it with the Device and the current Job if one is active
3. Workflow triggers can react to new Metrics — for example, flagging a job when error count exceeds a threshold

## Viewing Metrics

1. Go to **Menu → IOT → Metrics**
2. Select a Device from the list
3. Browse recent Metric values in the table

## Using Metrics in Workflows

Metrics can trigger Workflow executions. Use a **Device Metric** trigger node and configure the conditions — for example:

- `sheets_printed > 1000` — trigger a quality check task
- `status == "error"` — notify the production manager
- `job_id changed` — start tracking a new job