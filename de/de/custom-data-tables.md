---
slug: custom-data-tables
category: platform-configuration
status: published
lang: de
title: "How to Create Custom Data Tables"
---

## Was sind Custom Data Tables?

Mit Custom Data Tables speicherst du strukturierte Daten in CoCoCo, die nicht ins
eingebaute Datenmodell passen — Materialspezifikationen, Preis-Lookup-Tabellen oder
kundenspezifische Konfiguration. Eine **Tabelle** ist ein **Data Schema** (es definiert
die Spalten); jede **Zeile** ist ein **Data Record** mit einem JSON-`data`-Objekt, das
diesem Schema entspricht.

## Eine Custom Data Table anlegen

1. Gehe zu **Menu → Developer → Custom Data Tables**
2. Klicke **+ New Table**
3. Gib einen **Tabellennamen** ein (z. B. `material_specs`)
4. Klicke **+ Add Column** für jedes Feld — Name eingeben und Typ wählen (Text, Number, Boolean, Date)
5. Klicke **Save**

## Daten lesen und schreiben

Tabellen werden über GraphQL angesprochen. Eine Tabelle wird über ihre **Data-Schema-ID**
(`schemaId`) identifiziert — deine Schemas listest du mit `listDataSchemas`.

**Zeilen einer Tabelle lesen:**

```graphql
query($schemaId: DataSchemaID!) {
  listDataRecords(filter: { schemaId: $schemaId }, first: 50) {
    edges { node { id name data } }
  }
}
```

**Zeile einfügen oder aktualisieren** aus einem Workflow-Script-Node (`ctx.graphql.query`
führt auch Mutationen aus; zum Aktualisieren `id` mitgeben):

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

`data` ist ein JSON-Objekt, dessen Schlüssel die Spalten der Tabelle sind.
