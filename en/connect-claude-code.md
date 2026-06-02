---
slug: connect-claude-code
category: mcp-ai-integrations
status: published
lang: en
title: "How to Connect Claude Code to CoCoCo"
---

## Before you start

You need:
- **Node.js 20 or higher** installed
- **An active API Token** from your CoCoCo account

## Step 1: Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Verify installation:

```bash
which claude
claude --version
```

If `which claude` returns nothing, your npm global bin directory may not be in your PATH. If you use nvm, add this to `~/.zshrc`:

```bash
export PATH="$(npm config get prefix)/bin:$PATH"
```

## Step 2: Add the CoCoCo MCP server

Run the following command, replacing `YOUR_TOKEN` with your actual API Token:

```bash
claude mcp add --transport http cococo https://<your-domain>/mcp --header "Authorization: Bearer YOUR_TOKEN"
```

Write the full command on **one line** — line breaks cause the header to be parsed incorrectly.

## Step 3: Verify the connection

```bash
claude mcp list
```

## Step 4: Test the connection

```bash
claude
```

Then type `/mcp` to see the status of all configured MCP servers. CoCoCo should appear as connected.

## Managing the MCP server

**Remove the server:**
```bash
claude mcp remove cococo
```

**Update the token** — remove and re-add with the new token:
```bash
claude mcp remove cococo
claude mcp add --transport http cococo https://<your-domain>/mcp --header "Authorization: Bearer YOUR_NEW_TOKEN"
```

## Troubleshooting

**`claude` not found** — Check your PATH. See Step 1.

**Invalid header format** — Make sure the full command is on a single line.

**Authentication errors** — Check that your API Token is correct and not revoked.