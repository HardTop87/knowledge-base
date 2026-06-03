---
slug: graphql-playground
category: developer-tools
status: published
lang: de
title: "GraphQL Playground: Getting Started"
---

## Was ist das GraphQL Playground?

Das GraphQL Playground ist ein interaktiver Query-Editor direkt in CoCoCo. Er gibt dir direkten Zugriff auf die komplette API. Praktisch zum Erkunden des Datenmodells, Testen von Queries und Debugging von Datenproblemen.

## Öffnen

Wechsle zu **Menu → Developer → GraphQL Playground**.

## deine erste Query

```graphql
query {
  listJobs(first: 10) {
    edges {
      node {
        id
        name
        status
        createdAt
      }
    }
  }
}
```

Mit **Ctrl+Enter** ausführen. Das Ergebnis erscheint rechts.

## Schema durchsuchen

Klicke auf das Panel **Docs**, um das vollständige Schema zu erkunden. Du kannst jeden Type, jede Query und jede Mutation namentlich suchen. Die API ist umfangreich — hunderte Queries, Mutationen und Typen.

## Tipps

- **Ctrl+Space** für Autovervollständigung
- Das Playground ist lesend und schreibend. Mutations nehmen echte Änderungen vor
- Alle Queries laufen unter deinem User