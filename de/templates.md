---
slug: templates
category: developer-tools
status: published
lang: de
title: "How to Create Templates"
---

## Was sind Templates?

Templates sind gespeicherte Textdokumente, typischerweise in JDF- oder JMF-Format, die zur Laufzeit mit dynamischen Daten gerendert werden. Sie werden zur Erzeugung von Jobtickets an Druckmaschinen genutzt.

## Template-Typen

| Typ | Einsatz |
|---|---|
| **JDF Template** | Job Definition Format Tickets für CIP4-kompatible Maschinen |
| **JMF Template** | Job Messaging Format Nachrichten für die Maschinensteuerung |

## Ein Template anlegen

1. Wechseln Sie zu **Menu → Developer → Templates**
2. Klicken Sie auf **+ New Template**
3. Vergeben Sie einen **Name** und wählen Sie den **Type**
4. Schreiben Sie das Template. Nutzen Sie `{{variable}}` für dynamische Werte
5. Klicken Sie auf **Save**

## Ein Template in einem Workflow rendern

```lua
local ticket = cococo.template.render("HP Indigo JDF", {
  jobId = input.jobId,
  copies = input.quantity,
  substrate = input.paper_type
})
```