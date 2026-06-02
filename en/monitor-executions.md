---
slug: monitor-executions
category: workflows-automation
status: published
lang: en
title: "How to Monitor Workflow Executions"
---

## How to view Workflow executions

1. Go to **Menu → Workflows**
2. Click on a Workflow to open it
3. Click the **Executions** tab

You will see a list of all recent executions with their status, trigger time, and duration.

## Execution statuses

| Status | Meaning |
|---|---|
| **Running** | Currently in progress |
| **Completed** | Finished successfully |
| **Failed** | Stopped due to an error |
| **Cancelled** | Manually stopped |

## Inspecting an execution

Click on any execution to open the execution detail view:

- **Timeline** — shows each node that ran, in order
- **Node output** — click any node to see its input and output data
- **Error details** — if the execution failed, the error is shown on the failing node

## Debugging failures

1. Click the failed execution
2. Find the node marked in red
3. Click the node to see the error message and the input it received
4. Fix the Workflow configuration
5. Re-test by clicking **Test** in the editor

:::tip
Turn on **Verbose logging** in the Workflow settings while debugging — this adds detailed output to each node's execution log.
:::