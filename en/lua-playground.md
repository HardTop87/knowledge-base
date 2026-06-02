---
slug: lua-playground
category: developer-tools
status: published
lang: en
title: "Lua Playground: Getting Started"
---

## What is the Lua Playground?

The Lua Playground is an interactive editor for testing Lua scripts against the live CoCoCo environment. Use it to develop Scripts and Custom Actions before deploying them.

## How to open it

Go to **Menu → Developer → Lua Playground**.

## Example script

```lua
-- Query recent jobs
local jobs = cococo.graphql.query([[
  query {
    jobs(first: 5) {
      edges { node { id name status } }
    }
  }
]])

for _, edge in ipairs(jobs.data.jobs.edges) do
  print(edge.node.name, edge.node.status)
end
```

Click **Run** to execute. Output appears in the console below.

## Available APIs

| API | What it does |
|---|---|
| `cococo.graphql.query(gql)` | Run a GraphQL query |
| `cococo.graphql.mutate(gql)` | Run a GraphQL mutation |
| `cococo.config.get(key)` | Read a Tenant Config value |
| `cococo.http.post(url, body)` | Outbound HTTP request |
| `cococo.log(message)` | Write to the console |