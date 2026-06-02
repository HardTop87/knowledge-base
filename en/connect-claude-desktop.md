---
slug: connect-claude-desktop
category: mcp-ai-integrations
status: published
lang: en
title: "How to Connect Claude Desktop to CoCoCo"
---

## Before you start

You need:
- **Claude Desktop** installed — download from [claude.ai/download](https://claude.ai/download)
- **Node.js** installed — version 18 or higher
- **An active API Token** from your CoCoCo account

[How to Create and Manage API Tokens](#api-tokens)

## How it works

Claude Desktop communicates with MCP servers via stdio. Since the CoCoCo MCP server is a remote HTTP endpoint, you need a small proxy script that bridges stdio and HTTP.

## Step 1: Create the proxy script

Create a folder (e.g. `~/mcp-proxies/`) and save the following as `cococo-proxy.mjs`:

```javascript
import https from 'https';
import { createInterface } from 'readline';

// Replace with your CoCoCo API Token
const TOKEN = 'YOUR_API_TOKEN';

let sessionId = null;

function post(body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Length': Buffer.byteLength(data),
    };
    if (sessionId) headers['Mcp-Session-Id'] = sessionId;
    const req = https.request({
      hostname: 'your-domain.cococo.app',
      path: '/mcp',
      method: 'POST',
      headers
    }, (res) => {
      if (res.headers['mcp-session-id']) sessionId = res.headers['mcp-session-id'];
      let chunks = '';
      res.on('data', d => { chunks += d; });
      res.on('end', () => {
        if (!chunks.trim()) { resolve(null); return; }
        const ct = res.headers['content-type'] || '';
        if (ct.includes('text/event-stream')) {
          for (const line of chunks.split('\n')) {
            if (line.startsWith('data: ')) {
              const json = line.slice(6).trim();
              if (json && json !== '[DONE]') {
                try { resolve(JSON.parse(json)); return; } catch(e) {}
              }
            }
          }
          resolve(null);
        } else {
          try { resolve(JSON.parse(chunks)); }
          catch(e) { resolve(null); }
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const rl = createInterface({ input: process.stdin });
rl.on('line', async (line) => {
  if (!line.trim()) return;
  try {
    const msg = JSON.parse(line);
    const resp = await post(msg);
    if (resp) process.stdout.write(JSON.stringify(resp) + '\n');
  } catch(e) {
    process.stderr.write('Error: ' + e.message + '\n');
  }
});
```

Replace `YOUR_API_TOKEN` with your actual token and `your-domain.cococo.app` with your actual domain.

## Step 2: Find your Node.js path

```bash
which node
```

## Step 3: Configure Claude Desktop

Open `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) and add:

```json
{
  "mcpServers": {
    "cococo": {
      "command": "/path/to/node",
      "args": ["/path/to/cococo-proxy.mjs"]
    }
  }
}
```

Replace the paths with your actual Node.js path and proxy file location.

## Step 4: Restart Claude Desktop

Fully quit and reopen Claude Desktop. Click the tools icon in the chat input — CoCoCo should appear.

## Troubleshooting

**CoCoCo not in tools list** — Check that the JSON is valid and the file paths are correct. Fully restart Claude Desktop.

**Authentication errors** — Verify your API Token is correct and not revoked.

**Node.js not found** — Run `which node` again to get the exact path.