---
slug: connect-claude-desktop
category: mcp-ai-integrations
status: published
lang: de
title: "How to Connect Claude Desktop to CoCoCo"
---

## Bevor Sie starten

Sie brauchen:
- **Claude Desktop** installiert. Download unter [claude.ai/download](https://claude.ai/download)
- **Node.js** installiert, Version 18 oder höher
- **Ein aktives API Token** aus Ihrem CoCoCo-Konto

[API Tokens anlegen und verwalten](#api-tokens)

## So funktioniert es

Claude Desktop kommuniziert mit MCP Servern über stdio. Da der CoCoCo MCP Server ein Remote-HTTP-Endpunkt ist, brauchen Sie ein kleines Proxy-Skript, das zwischen stdio und HTTP vermittelt.

## Schritt 1: Proxy-Skript anlegen

Legen Sie einen Ordner an (z.B. `~/mcp-proxies/`) und speichern Sie Folgendes als `cococo-proxy.mjs`:

```javascript
import https from 'https';
import { createInterface } from 'readline';

// Durch Ihr CoCoCo API Token ersetzen
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

Ersetzen Sie `YOUR_API_TOKEN` durch Ihr echtes Token und `your-domain.cococo.app` durch Ihre tatsächliche Domain.

## Schritt 2: Node.js-Pfad finden

```bash
which node
```

## Schritt 3: Claude Desktop konfigurieren

Öffnen Sie `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) und ergänzen Sie:

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

Ersetzen Sie die Pfade durch Ihre tatsächlichen Pfade für Node.js und das Proxy-Skript.

## Schritt 4: Claude Desktop neu starten

Claude Desktop vollständig beenden und neu öffnen. Klicken Sie im Chat-Input auf das Tools-Symbol. CoCoCo sollte erscheinen.

## Fehlerbehebung

**CoCoCo nicht in der Tools-Liste**: Prüfen Sie, ob die JSON gültig ist und ob die Dateipfade stimmen. Claude Desktop vollständig neu starten.

**Authentifizierungsfehler**: API Token prüfen. Ist es korrekt und nicht widerrufen?

**Node.js nicht gefunden**: `which node` erneut ausführen, um den exakten Pfad zu erhalten.