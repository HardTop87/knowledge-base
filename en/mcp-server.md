---
slug: mcp-server
category: mcp-ai-integrations
status: published
lang: en
title: "What is the CoCoCo MCP Server?"
---

## What is MCP?

MCP — Model Context Protocol — is an open standard that allows AI assistants to connect
to external tools and data sources. Instead of an AI assistant only knowing what's in its
training data, MCP lets it reach into live systems, read real data, and take actions on
your behalf.

MCP is supported by Claude Desktop, Claude Code, Cursor, and others.

## What the CoCoCo MCP server exposes

- **Custom App development** — the full lifecycle: list apps, read template/script/server
  API, create and update apps, and manage versions. This is the most powerful use of the
  connection: an assistant can build, iterate, and deploy Custom Apps entirely through
  conversation.
- **GraphQL API** — run queries and mutations against live platform data, validate
  operations, and search the schema (types, queries, mutations, fields) so the assistant
  writes accurate operations.
- **Reporting / SQL** — run MicroSQL against the reporting tables and search the reporting
  schema (tables and columns).
- **Lua development** — search the Lua API, fetch the authoritative type definitions, and
  validate scripts for each runtime role.
- **Workflows** — list and read workflows, inspect node types, import new versions, and
  read execution results.
- **ML & integrations** — train and run ML models, and build, validate, and publish
  integration definitions (including uploaded external API schemas).

## Why this matters — especially for Custom Apps

With an AI assistant connected via MCP, the workflow changes dramatically:

**Without MCP:** You open the Custom App editor, write Vue templates, figure out the right
GraphQL queries, write the Lua server API, test, fix errors, repeat.

**With MCP:** You describe what you want in plain language. The AI assistant reads the
existing app, looks up the correct schema types and queries, writes the template and
script, and updates the app — all in one conversation. What used to take hours takes minutes.

## Technical details

The CoCoCo MCP server uses Streamable HTTP transport in JSON mode.

| Field | Value |
|---|---|
| **Endpoint** | `https://<your-domain>/mcp` |
| **Transport** | Streamable HTTP (JSON mode) |
| **Auth** | `Authorization: Bearer <your-api-token>` |

## Getting started

You need an API Token before connecting. Find your connection details here:

[How to Find Your MCP Connection Details](#mcp-connection-details)
