---
slug: custom-data-tables
category: platform-configuration
status: published
lang: de
title: "How to Create Custom Data Tables"
---

## Was sind Custom Data Tables?

Custom Data Tables sind selbst definierte Datenbanktabellen in CoCoCo. Nutzen Sie sie für strukturierte Daten, die nicht ins Standardmodell passen: Materialspezifikationen, Preislisten oder kundenspezifische Konfiguration.

## Eine Custom Data Table anlegen

1. Wechseln Sie zu **Menu → Developer → Custom Data Tables**
2. Klicken Sie auf **+ New Table**
3. Vergeben Sie einen **Table name** (snake_case, z.B. `material_specs`)
4. Klicken Sie auf **+ Add Column** für jedes Feld und wählen Sie Name und Typ (Text, Number, Boolean, Date)
5. Klicken Sie auf **Save**

## Daten lesen und schreiben

Custom Data Tables sind über GraphQL verfügbar.

**Alle Zeilen abfragen:**
```graphql
query {
  customTableRows(table: "material_specs") {
    id
    data
  }
}
```

**Eine Zeile aus einer Workflow Script Node einfügen:**
```lua
cococo.graphql.mutate([[
  mutation {
    createCustomTableRow(table: "material_specs", data: {
      name: "Glossy 135g",
      weight: 135
    }) { id }
  }
]])
```