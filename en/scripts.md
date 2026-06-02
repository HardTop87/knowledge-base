---
slug: scripts
category: developer-tools
status: published
lang: en
title: "How to Use Scripts"
---

## What are Scripts?

Scripts are reusable Lua functions callable from Workflows, Custom Actions, and Custom Apps. They encapsulate logic you want to share across multiple Workflows.

## Script roles

| Role | Use case |
|---|---|
| **Script** | General-purpose Lua, called from Workflow Script nodes |
| **JDF Template** | Generates JDF job tickets for press equipment |
| **JMF Template** | Generates JMF messages for machine communication |
| **ML Data Query** | Returns training data for ML model training |

## How to create a Script

1. Go to **Menu → Developer → Scripts**
2. Click **+ New Script**
3. Enter a **Name** and select the **Role**
4. Write the Lua code in the editor
5. Click **Save**

## Calling a Script from a Workflow

Add a **Script** node, select the saved Script, and map input variables from the Workflow context. The return value is the node output.

## Example

```lua
-- Calculates a priority score from values passed into the script
local remaining_days = input.remaining_days or 0
local weight = input.tier == "premium" and 2 or 1
return math.max(0, (10 - remaining_days) * weight)
```