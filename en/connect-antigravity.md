---
slug: connect-antigravity
category: mcp-ai-integrations
status: published
lang: en
title: "How to Connect Antigravity (Google Gemini) to CoCoCo"
---

## Before you start

- **Antigravity** installed
- Your **Endpoint URL** and an active **API Token** from the MCP Connection page (see [How to Find Your MCP Connection Details](#mcp-connection-details))

## Step 1 — Open the MCP config

The reliable way is from the IDE (the file path differs between versions): open the **…** (Additional Options) menu in the Agent panel → **MCP Servers** → **Manage MCP Servers** → **View raw config**. This opens `mcp_config.json`.

## Step 2 — Add the CoCoCo server

```json
{
  "mcpServers": {
    "cococo": {
      "serverUrl": "https://<your-domain>/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_TOKEN" }
    }
  }
}
```

**Important:** Antigravity uses **`serverUrl`** (not `url`) for remote HTTP MCP servers — this differs from Cursor and Claude. Replace `YOUR_API_TOKEN` with your CoCoCo token.

## Step 3 — Reload and verify

Save the file, then close and reopen Antigravity (or click **Refresh** under Installed MCP Servers in Settings → Customizations). Ask the agent what CoCoCo tools it has access to, or check the MCP Servers list.

## Troubleshooting

- **Won't connect with `url`:** remote servers need **`serverUrl`** in Antigravity — using `url` silently fails.
- **Still not connecting:** re-check the URL and that the token hasn't been revoked, then reopen Antigravity.
- **Authentication errors:** confirm the token is active.
