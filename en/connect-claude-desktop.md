---
slug: connect-claude-desktop
category: mcp-ai-integrations
status: published
lang: en
title: "How to Connect Claude Desktop to CoCoCo"
---

There are two ways to connect Claude Desktop to CoCoCo. **Almost everyone should use Option A** — it's a single file, takes about a minute, and needs no terminal, no Node.js installation, and no editing of configuration files. Option B (the manual proxy) is kept only for advanced users who need full control.

---

## Option A — Install the CoCoCo extension (recommended)

> **Current version:** 1.1.0 · released 2026-06-02
> **Download:** [cococo.mcpb](REPLACE_WITH_DOWNLOAD_URL)
> **SHA-256:** `dff0971438b5cb60f0740f292f4f5c18ed65a34c4780fd632e36c5318dd1653e`
> *(optional integrity check — on macOS/Linux run `shasum -a 256 cococo.mcpb` and confirm it matches the value above)*

CoCoCo ships as a Claude Desktop extension (a `.mcpb` file). Installing it is similar to adding a browser extension: you drag in one file and paste two values.

### Before you start
- **Claude Desktop** installed — download from `claude.ai/download`
- Your **Endpoint URL** and an active **API Token** — both on the **MCP Connection** page in CoCoCo

You do **not** need Node.js or any other software — Claude Desktop brings its own runtime.

### Step 1 — Copy your Endpoint URL and token from CoCoCo
1. In CoCoCo, open the **MCP Connection** settings.
2. Click **Copy** next to the **Endpoint URL** (it looks like `https://<your-domain>/mcp`).
3. Have an active **API Token** ready from the same page (it's used as the bearer credential).

### Step 2 — Install the extension
1. Download the `cococo.mcpb` file.
2. In Claude Desktop, open the menu (☰) in the top-left and go to **File → Settings → Extensions**.
3. Drag `cococo.mcpb` onto the Extensions page (or use **Install Extension…** and pick the file).
4. A security note may appear because the extension is distributed privately rather than through the public directory. This is expected — choose **Install Anyway**.

### Step 3 — Enter your details
Fill in the two fields:
- **Endpoint URL** — paste the URL you copied in Step 1
- **API Key** — paste your CoCoCo API token

Leave the optional fields below empty (they're only for connecting more than one environment — see below).

Your token is stored encrypted in your operating system's secure store (macOS Keychain / Windows Credential Manager), not in any plain-text file.

### Step 4 — Verify
Open a **new** conversation, click the tools icon (hammer) at the bottom of the input field, and confirm that **CoCoCo** appears. Or ask Claude directly:

> "What CoCoCo tools do you have access to?"

### Connecting more than one environment
If you work with several CoCoCo environments, paste a **second** (and optionally **third**) Endpoint URL and its API token into the optional fields during installation. You can also give each one a short **name** (e.g. "Live", "Test"). When more than one environment is connected, each environment's tools are shown with that name as a prefix (for example `Live__…`) so they never clash. With a single environment, no prefix is added — you'll never see one in the common case.

### Updating
Privately distributed extensions don't update automatically. When a new version of `cococo.mcpb` is provided, install the new file the same way — it replaces the previous version. Nothing changes on your machine unless you install an update.

### Troubleshooting
- **CoCoCo doesn't appear:** make sure you opened a *new* conversation after installing, and that the extension toggle is on under Settings → Extensions.
- **After restarting Claude Desktop:** continue in a **new** conversation. A conversation that was open before the restart may no longer reach the tools, even though new conversations work normally.
- **Authentication errors:** re-check the API token (no extra spaces); confirm it hasn't been revoked on the MCP / API Tokens page.
- **Connection errors:** confirm the Endpoint URL is correct and your machine can reach it. Internal `.local` addresses are only reachable on the local network; from outside, use the public URL shown in CoCoCo.
- **Logs:** the extension writes to `~/cococo-bridge.log`. A line beginning `cococo-bridge … started; environments=[…]` confirms which environments were detected.

---

## Option B — Manual proxy setup (advanced / fallback)

Use this only if you specifically need to run the connection yourself rather than via the extension. It requires Node.js and editing a configuration file.

### Before you start
- Claude Desktop installed
- **Node.js** version 18 or higher
- An active **API Token** and your **Endpoint URL** (from the MCP Connection page)

### How it works
Claude Desktop talks to local MCP servers over stdio — it launches a local process and exchanges JSON messages with it. Because the CoCoCo MCP server is a remote HTTPS endpoint, a small local script bridges between the two: it reads stdio messages from Claude Desktop, forwards them to the CoCoCo endpoint, and returns the responses.

### Step 1 — Create the proxy script
Create a folder, e.g. `~/mcp-proxies/`, and inside it a file `cococo-proxy.mjs` with the hardened bridge script (provided separately). This version parses streamed responses incrementally, enforces an absolute per-request timeout, handles each request independently, and shuts down cleanly — avoiding the stalls that simpler proxy scripts can run into.

The script reads its settings from environment variables (set in the config below), so you do **not** paste your token into the script itself:
- `COCOCO_ENDPOINT` — your Endpoint URL (e.g. `https://<your-domain>/mcp`)
- `COCOCO_TOKEN` — your API token

### Step 2 — Find your Node.js path
Run `which node`. Note the output (e.g. `/usr/local/bin/node`, or an nvm path like `/Users/yourname/.nvm/versions/node/v18.20.8/bin/node`).

### Step 3 — Configure Claude Desktop
Open (or create) the config file:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

Add a `cococo` server block (inside `mcpServers`), using your Node path, the path to the script, and your details:

```json
{
  "mcpServers": {
    "cococo": {
      "command": "/usr/local/bin/node",
      "args": ["/Users/yourname/mcp-proxies/cococo-proxy.mjs"],
      "env": {
        "COCOCO_ENDPOINT": "https://<your-domain>/mcp",
        "COCOCO_TOKEN": "YOUR_API_TOKEN"
      }
    }
  }
}
```

### Step 4 — Restart Claude Desktop
Save the file, then fully quit (⌘Q) and reopen Claude Desktop — closing the window is not enough.

> Note: if you restart Claude Desktop while a conversation is open, continue in a **new** conversation afterwards. A conversation started before the restart may no longer reach the tools.

### Step 5 — Verify
Open a new conversation, click the tools icon, and confirm CoCoCo appears — or ask "What CoCoCo tools do you have access to?"

### Troubleshooting
- **CoCoCo doesn't appear:** confirm the JSON is valid (a missing comma or bracket stops the file from loading); confirm the file paths exist; make sure you fully quit and restarted.
- **Authentication errors:** check `COCOCO_TOKEN`; confirm the token is still active.
- **Node.js not found:** re-run `which node` and update the command path; with nvm, ensure the right version is active.
- **Connection errors:** confirm the Endpoint URL is reachable.

---

## What you can do once connected
- "List all my Custom Apps and tell me what each one does"
- "Build me a Custom App that shows a live overview of all active jobs"
- "What GraphQL query do I use to fetch jobs with status PRESS?"
- "Create a new KIOSK app for shopfloor job reporting"

The fastest use case is Custom App development — describe what you want, and Claude builds it directly on your platform.
