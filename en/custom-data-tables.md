---
slug: custom-data-tables
category: platform-configuration
status: published
lang: en
title: "How to Create Custom Data Tables"
---

## What are Custom Data Tables?

Custom Data Tables are user-defined database tables inside CoCoCo. Use them to store structured data that doesn't fit the built-in data model — material specs, pricing lookup tables, or customer-specific configuration.

## How to create a Custom Data Table

1. Go to **Menu → Developer → Custom Data Tables**
2. Click **+ New Table**
3. Enter a **Table name** (snake_case, e.g. `material_specs`)
4. Click **+ Add Column** for each field — enter name and select type (Text, Number, Boolean, Date)
5. Click **Save**

## Reading and writing data

Custom Data Tables are accessible via GraphQL.

**Query all rows:**
```graphql
query {
  customTableRows(table: "material_specs") {
    id
    data
  }
}
```

**Insert a row from a Workflow Script node:**
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