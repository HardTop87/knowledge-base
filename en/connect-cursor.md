---
slug: connect-cursor
category: mcp-ai-integrations
status: published
lang: en
title: "How to Connect Cursor to CoCoCo"
---

## Before you start

- **Cursor** installed
- Your **Endpoint URL** and an active **API Token** from the MCP Connection page (see [How to Find Your MCP Connection Details](#mcp-connection-details))

A remote MCP server needs no Node.js — just the URL and token.

## Step 1 — Open Cursor's MCP config

Cursor reads MCP servers from an `mcp.json` file:
- **Global:** `~/.cursor/mcp.json`
- **Project:** `.cursor/mcp.json` (in the project root; takes precedence over global)

Create the file if it doesn't exist, or open it from **Settings → MCP → Add new server**.

## Step 2 — Add the CoCoCo server

```json
{
  "mcpServers": {
    "cococo": {
      "url": "https://<your-domain>/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_TOKEN" }
    }
  }
}
```

Remote servers use `url` plus `headers` (Streamable HTTP). Replace `YOUR_API_TOKEN` with your CoCoCo token.

## Step 3 — Verify

Open **Settings → MCP**. CoCoCo should show a connected (green) status with its tools listed. In a chat, the agent can now call CoCoCo tools — by default it asks for approval before each call.

## Troubleshooting

- **Red / disconnected:** click the server to see the error; re-check the URL and that the token hasn't been revoked.
- **Tools don't appear:** make sure the JSON is valid and saved, then reload Cursor.
- **Conflicting config:** if both the project and global file define `cococo`, the project file wins.
