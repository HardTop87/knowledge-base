---
slug: custom-actions
category: workflows-automation
status: published
lang: en
title: "How to Use Custom Actions"
---

## What is a Custom Action?

A Custom Action is a saved, reusable Lua function that you can call from Workflow Script nodes. They let you encapsulate business logic once and reuse it across multiple Workflows — calculations, validations, data transformations, external API calls.

## Custom Actions vs. Scripts

| | Custom Action | Script |
|---|---|---|
| Where defined | Workflows menu → Custom Actions | Developer → Scripts |
| Where callable | Workflow **Custom Action** node | Workflow **Script** node |
| Use case | Shared business logic across Workflows | General-purpose Lua, templates, ML queries |

## How to create a Custom Action

1. Go to **Menu → Workflows → Custom Actions**
2. Click **+ New Custom Action**
3. Enter a **Name** (e.g. `Calculate Rush Fee`) and optionally a **Description**
4. Define **Input parameters** — what data the action needs
5. Define **Output fields** — what the action returns
6. Write the Lua code in the editor
7. Click **Save**

## Example

```lua
-- Rush fee calculator
-- Inputs: order_total (number), is_rush (boolean)
-- Output: fee (number)

if input.is_rush then
  return { fee = input.order_total * 0.15 }
else
  return { fee = 0 }
end
```

## Using a Custom Action in a Workflow

1. In the Workflow editor, add a **Custom Action** node
2. Select the Custom Action from the dropdown
3. Map Workflow data to the action's input parameters
4. The node output contains the action's return value

See also: [How to Use Scripts](#scripts) for general-purpose Lua that runs directly in Script nodes.