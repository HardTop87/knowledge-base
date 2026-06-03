---
slug: templates
category: developer-tools
status: published
lang: de
title: "How to Create Templates"
---

## Was sind Templates?

Templates sind gespeicherte Textdokumente — typischerweise im JDF- oder JMF-Format —, die
zur Laufzeit mit dynamischen Daten gerendert werden. Sie dienen zum Erzeugen von
Job-Tickets, die an Druckmaschinen gesendet werden.

## Template-Typen

| Typ | Anwendungsfall |
|---|---|
| **JDF Template** | Job-Definition-Format-Tickets für CIP4-kompatible Maschinen |
| **JMF Template** | Job-Messaging-Format-Nachrichten für die Maschinensteuerung |

## Ein Template anlegen

1. Gehe zu **Menu → Developer → Templates**
2. Klicke **+ New Template**
3. Gib einen **Namen** ein und wähle den **Typ**
4. Schreibe das Template — `{{variable}}`-Syntax für dynamische Werte
5. Klicke **Save**

## Ein Template rendern

Ein Template renderst du mit der GraphQL-Mutation `renderTemplate` — über seinen
**handle** und einen JSON-`context`-String mit den Werten, die deine
`{{variable}}`-Platzhalter referenzieren. Aus einem Workflow-Script-Node:

```lua
local res = ctx.graphql.query([[
  mutation($tpl: RenderTemplateInput!) {
    renderTemplate(input: $tpl) { output }
  }
]], {
  tpl = {
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

`output` ist der gerenderte Text. Du kannst auch den **GraphQL**-Workflow-Node nutzen, um
`renderTemplate` ohne Lua aufzurufen.

### Abkürzung: `ctx.template.render`

Scripts und Custom Apps sparen sich den GraphQL-Umweg mit dem direkten Lua-Aufruf. Er
nimmt den Template-**handle** und einen JSON-codierten Context-String und liefert den
gerenderten Text zurück:

```lua
local ticket = ctx.template.render("hp-indigo-jdf", ctx.json.encode({
  jobId = input.jobId,
  copies = input.quantity,
  substrate = input.paper_type
}))
```
