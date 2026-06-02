---
slug: mcp-connection-details
category: account-settings
status: published
lang: en
title: "How to Find Your MCP Connection Details"
---

## How to find your MCP connection details

1. Click your **profile avatar** in the top right corner
2. Select **API Tokens** from the dropdown
3. Scroll down to the **MCP Connection** section
4. Or navigate directly to `https://your-domain.cococo.app/#/api-tokens`

## What you'll find there

| Field | Value |
|---|---|
| **Endpoint URL** | `https://your-domain.cococo.app/mcp` |
| **Transport** | Streamable HTTP (JSON mode) |
| **Authentication** | `Authorization: Bearer <your-token>` |

The **Endpoint URL** is your platform's MCP server address. Click **Copy** to copy it to your clipboard.

The **Transport** tells you which MCP transport protocol the server uses — Streamable HTTP in JSON mode. Most modern MCP-compatible tools support this out of the box.

The **Authentication** field shows the header format required. Use any active API Token from your account as the credential.

## What the MCP server exposes

**Custom App Management** — Read and write Custom Apps — list existing apps, read their template and script content, create new apps, and update existing ones.

**GraphQL Schema Discovery** — Explore the full CoCoCo GraphQL schema — search types, queries, mutations, and fields.

## Before you connect

You need an active API Token to authenticate. Once you have a token, connect your AI assistant:

- [How to Connect Claude Desktop to CoCoCo](#connect-claude-desktop)
- [How to Connect Claude Code to CoCoCo](#connect-claude-code)