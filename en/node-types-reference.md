---
slug: node-types-reference
category: workflows-automation
status: published
lang: en
title: "Node Types Reference"
---

## Flow Control

| Node | What it does |
|---|---|
| **Condition** | Splits execution into two paths based on a true/false check |
| **Switch** | Routes to one of several paths based on a value |
| **Split** | Splits an array and processes each item in parallel |
| **Join** | Waits for multiple parallel paths to complete before continuing |
| **For Each** | Iterates over an array, running downstream nodes for each item |
| **Delay** | Pauses execution for a set amount of time |

## Data

| Node | What it does |
|---|---|
| **Transform** | Reshapes or maps data using expressions |
| **Set Variable** | Stores a value for use later in the Workflow |
| **JSON Parse** | Parses a JSON string into a usable object |
| **CSV Parse** | Parses a CSV string into an array of objects |
| **YAML Parse** | Parses a YAML string into an object |
| **Regex** | Extracts values using a regular expression |

## Integration

| Node | What it does |
|---|---|
| **HTTP Request** | Makes an outbound HTTP call to any URL |
| **GraphQL** | Runs a GraphQL query or mutation against the CoCoCo API |
| **SQL Query** | Runs a SQL query against a connected database |
| **MQTT Publish** | Publishes a message to a device via MQTT |
| **Integration Action** | Runs an action from a connected Integration |
| **Message** | Sends a notification to a Notification Group |

## Scripting

| Node | What it does |
|---|---|
| **Script** | Runs a Lua script for custom logic |
| **Custom Action** | Runs a saved Custom Action |
| **Assert** | Fails the Workflow if a condition is not met |
| **Log** | Writes a value to the execution log |
| **Task** | Creates a human task that must be completed before continuing |

## AI & ML

| Node | What it does |
|---|---|
| **ML Predict** | Runs a prediction using a trained ML model |
| **Agent** | Sends a prompt to an AI Agent and waits for the response |
| **Agent Task** | Assigns a task to an AI Agent for async completion |