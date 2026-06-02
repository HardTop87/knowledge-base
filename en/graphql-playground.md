---
slug: graphql-playground
category: developer-tools
status: published
lang: en
title: "GraphQL Playground: Getting Started"
---

## What is the GraphQL Playground?

The GraphQL Playground is an interactive query editor built into CoCoCo. It gives you direct access to the full API — useful for exploring the data model, testing queries, and debugging data issues.

## How to open it

Go to **Menu → Developer → GraphQL Playground**.

## Your first query

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

Press **Ctrl+Enter** to execute. Results appear on the right.

## Exploring the schema

Click the **Docs** panel to browse the full schema. Search any type, query, or mutation by name. The API surface is large — hundreds of queries, mutations, and types.

## Tips

- Use **Ctrl+Space** for autocomplete
- The Playground is read/write — mutations make real changes
- All queries run as your current user