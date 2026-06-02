---
slug: mcp-server
category: mcp-ai-integrations
status: published
lang: en
title: "What is the CoCoCo MCP Server?"
---

## What is MCP?

MCP — Model Context Protocol — is an open standard that allows AI assistants to connect to external tools and data sources. Instead of an AI assistant only knowing what's in its training data, MCP lets it reach into live systems, read real data, and take actions on your behalf.

MCP is supported by Claude Desktop, Claude Code, Cursor, and others.

## What the CoCoCo MCP server exposes

**Custom App Management** — The full lifecycle of Custom Apps. This is the most powerful use of the MCP connection: an AI assistant can build, iterate, and deploy Custom Apps entirely through conversation, without you ever opening the code editor manually.

**GraphQL Schema Discovery** — Semantic search across the full CoCoCo GraphQL schema. This lets an AI assistant understand the platform's data model and write accurate queries and mutations.

## Why this matters — especially for Custom Apps

With an AI assistant connected via MCP, the workflow changes dramatically:

**Without MCP:** You open the Custom App editor, write Vue templates, figure out the right GraphQL queries, write the Lua server API, test, fix errors, repeat.

**With MCP:** You describe what you want in plain language. The AI assistant reads the existing app, looks up the correct schema types and queries, writes the template and script, and updates the app — all in one conversation. What used to take hours takes minutes.

## Technical details

The CoCoCo MCP server uses Streamable HTTP transport in JSON mode.

| Field | Value |
|---|---|
| **Endpoint** | `https://your-domain.cococo.app/mcp` |
| **Transport** | Streamable HTTP (JSON mode) |
| **Auth** | `Authorization: Bearer <your-api-token>` |

## Getting started

You need an API Token before connecting. Find your connection details here:

[How to Find Your MCP Connection Details](#mcp-connection-details)