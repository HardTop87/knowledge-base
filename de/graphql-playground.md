---
slug: graphql-playground
category: developer-tools
status: published
lang: de
title: "GraphQL Playground: Getting Started"
---

## Was ist das GraphQL Playground?

Das GraphQL Playground ist ein interaktiver Query-Editor direkt in CoCoCo. Er gibt Ihnen direkten Zugriff auf die komplette API. Praktisch zum Erkunden des Datenmodells, Testen von Queries und Debugging von Datenproblemen.

## Öffnen

Wechseln Sie zu **Menu → Developer → GraphQL Playground**.

## Ihre erste Query

```graphql
query {
  jobs(first: 10) {
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

Klicken Sie auf das Panel **Docs**, um das vollständige Schema zu erkunden. Sie können jeden Type, jede Query und jede Mutation namentlich suchen. Die API umfasst 275 Queries, 281 Mutations und 658 Types.

## Tipps

- **Ctrl+Space** für Autovervollständigung
- Das Playground ist lesend und schreibend. Mutations nehmen echte Änderungen vor
- Alle Queries laufen unter Ihrem User