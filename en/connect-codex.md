---
slug: connect-codex
category: mcp-ai-integrations
status: published
lang: en
title: "How to Connect ChatGPT Codex to CoCoCo"
---

## Before you start

- **Codex CLI** installed (the IDE extension shares the same config)
- Your **Endpoint URL** and an active **API Token** from the MCP Connection page (see [How to Find Your MCP Connection Details](#mcp-connection-details))

## Step 1 — Put your token in an environment variable

Codex sends the token from an environment variable rather than storing it in the config file:

```bash
export COCOCO_TOKEN="your-api-token"
```

Set it in the shell (or shell profile) where you launch Codex.

## Step 2 — Add the CoCoCo server to config.toml

Codex stores MCP servers in `~/.codex/config.toml` (global) or `.codex/config.toml` (trusted project). Add:

```toml
[mcp_servers.cococo]
url = "https://<your-domain>/mcp"
bearer_token_env_var = "COCOCO_TOKEN"
```

`bearer_token_env_var` tells Codex to send `Authorization: Bearer <token>` using the variable from Step 1.

Or add it from the CLI:

```bash
codex mcp add cococo --url https://<your-domain>/mcp --bearer-token-env-var COCOCO_TOKEN
```

## Step 3 — Verify

Run `codex`, then type `/mcp` to see the configured servers. CoCoCo should appear as connected with its tools.

## Troubleshooting

- **Server missing or empty:** make sure `COCOCO_TOKEN` is exported in the same shell that launches Codex.
- **Remote server not picked up:** some Codex versions need the streamable-HTTP client enabled — add `experimental_use_rmcp_client = true` to `config.toml`.
- **Authentication errors:** confirm the token is active and not revoked.
- The CLI and the IDE extension share `config.toml`, so you only configure this once.
