---
slug: what-is-a-workflow
category: workflows-automation
status: published
lang: en
title: "What is a Workflow?"
---

## What is a Workflow?

A Workflow is an automated process that runs inside CoCoCo. It responds to events — a job is created, a device sends data, a human completes a task — and takes action: sending messages, transforming data, calling external systems, updating records.

Workflows eliminate manual handoffs and keep your production moving without anyone having to watch a screen.

## The building blocks

**Trigger** — the event that starts the Workflow. Every Workflow has exactly one trigger. See [How to Create a Workflow](#create-workflow) for trigger types.

**Nodes** — the processing steps. Each node does one thing. See the full [Node Types Reference](#node-types-reference).

**Connections** — the lines between nodes defining the order of execution.

## When to use a Workflow

- **Job routing** — When a new job arrives, assign it to the right machine
- **Notifications** — When a device reports an error, notify the operator
- **Data sync** — When a job is completed, push data to your MIS or ERP
- **Approvals** — Pause for a manager to sign off before continuing. See [Human-in-the-Loop Workflows](#hitl-workflows).
- **Automation** — React to any event, at any time, without manual intervention

## Workflow vs. Custom App

Workflows run automatically in the background. Custom Apps are interactive interfaces people use manually. They complement each other: a Workflow might create a [Task](#hitl-workflows) that a [Custom App](#what-are-custom-apps) displays for a shopfloor worker to complete.

## Next steps

- [How to Create a Workflow](#create-workflow)
- [Node Types Reference](#node-types-reference)
- [How to Monitor Workflow Executions](#monitor-executions)