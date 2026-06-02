---
slug: custom-data-tables
category: platform-configuration
status: published
lang: en
title: "How to Create Custom Data Tables"
---

## What are Custom Data Tables?

Custom Data Tables let you store structured data inside CoCoCo that doesn't fit the
built-in data model — material specs, pricing lookup tables, or customer-specific
configuration. A **table** is a **Data Schema** (it defines the columns); each **row**
is a **Data Record** that holds a JSON `data` object conforming to that schema.

## How to create a Custom Data Table

1. Go to **Menu → Developer → Custom Data Tables**
2. Click **+ New Table**
3. Enter a **Table name** (e.g. `material_specs`)
4. Click **+ Add Column** for each field — enter name and select type (Text, Number, Boolean, Date)
5. Click **Save**

## Reading and writing data

Tables are accessed via GraphQL. A table is identified by its **Data Schema ID**
(`schemaId`) — list your schemas with `listDataSchemas` to find it.

**Read rows of a table:**

```graphql
query($schemaId: DataSchemaID!) {
  listDataRecords(filter: { schemaId: $schemaId }, first: 50) {
    edges { node { id name data } }
  }
}
```

**Insert or update a row** from a Workflow Script node (`ctx.graphql.query` runs
mutations too; pass `id` to update an existing record):

```lua
ctx.graphql.query([[
  mutation($input: UpsertDataRecordInput!) {
    upsertDataRecord(input: $input) { dataRecord { id } }
  }
]], {
  input = {
    schemaId = "<your-schema-id>",
    data = { name = "Glossy 135g", weight = 135 }
  }
})
```

`data` is a JSON object whose keys are the table's columns.
