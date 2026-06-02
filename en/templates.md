---
slug: templates
category: developer-tools
status: published
lang: en
title: "How to Create Templates"
---

## What are Templates?

Templates are saved text documents — typically JDF or JMF formatted — that can be
rendered with dynamic data at runtime. They are used for generating job tickets sent to
print equipment.

## Template types

| Type | Use case |
|---|---|
| **JDF Template** | Job Definition Format tickets for CIP4-compatible machines |
| **JMF Template** | Job Messaging Format messages for press control |

## How to create a Template

1. Go to **Menu → Developer → Templates**
2. Click **+ New Template**
3. Enter a **Name** and select the **Type**
4. Write the template — use `{{variable}}` syntax for dynamic values
5. Click **Save**

## Rendering a Template

Render a template with the `renderTemplate` GraphQL mutation — by its **handle**, passing
a JSON `context` string with the values your `{{variable}}` placeholders reference. From a
Workflow Script node:

```lua
local res = ctx.graphql.query([[
  mutation($input: RenderTemplateInput!) {
    renderTemplate(input: $input) { output }
  }
]], {
  input = {
    handle = "hp-indigo-jdf",
    context = ctx.json.encode({
      jobId = input.jobId,
      copies = input.quantity,
      substrate = input.paper_type
    })
  }
})

local ticket = res.data.renderTemplate.output
```

`output` is the rendered text. You can also use the **GraphQL** workflow node to call
`renderTemplate` without writing Lua.
