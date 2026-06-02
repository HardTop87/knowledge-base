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
| **Condition** | Branches on a JSONLogic true/false check |
| **Switch** | Selects one output branch from alternatives using JSONLogic predicates |
| **Split** | Fans a single input out to all outgoing edges in parallel |
| **Join** | Merges 2+ inputs into one; completes when all inputs are available |
| **For Each** | Iterates over an array, running a body node for each item |
| **Delay** | Pauses execution for a configurable duration, then passes input through |

## Data

| Node | What it does |
|---|---|
| **Transform** | Reshapes or maps data with field mapping |
| **Set Variable** | Stores workflow-level variables, readable later via `$.variables` |
| **JSON Parse** | Converts between JSON strings and structured data |
| **CSV Parse** | Converts between CSV strings and structured data |
| **YAML Parse** | Converts between YAML strings and structured data |
| **Regex** | Match, extract, replace, or split on strings |

## Integration / Network

| Node | What it does |
|---|---|
| **HTTP Request** | HTTP request to a device (via its Bridge controller) |
| **SQL Query** | Query a device-side database |
| **MQTT Publish** | Publish a message (optionally targeted at one device) |
| **GraphQL** | Run a query or mutation against the CoCoCo API |
| **Integration Action** | Run an action exported by an installed integration |
| **Message** | Send a templated notification to a group or recipient |

## File I/O

On-premise file operations via a BridgeApp controller.

| Node | What it does |
|---|---|
| **File Read** | Read file content from on-premise storage |
| **File Write** | Write content to a file on on-premise storage |
| **File Check** | Check whether a file or directory exists |
| **File List** | List directory contents |
| **File Delete** | Delete a file |

## Scripting / Logic

| Node | What it does |
|---|---|
| **Script** | Run a Lua script (`scriptId`, `scriptName`, or inline) |
| **Assert** | Validate a condition; fail or branch on the result |
| **Log** | Write a message to the execution log; passes input through |
| **Task** | Create a human task and wait for resolution before continuing |

## Other

| Node | What it does |
|---|---|
| **Custom Action** | Run a user-defined Custom Action backed by a Lua script |
| **ML Predict** | Run an ML model prediction with typed feature inputs |
| **MicroSQL** | Run a MicroSQL query against the reporting engine |
| **Agent** | Invoke an AI agent with a prompt for freeform LLM processing |
| **Agent Task** | Use an AI agent to resolve a task (optionally falling back to a human task) |
| **Producibility Audit** | Feasibility audit of a job's production DAG — returns severity, findings, at-risk items |
