---
slug: connect-antigravity
category: mcp-ai-integrations
status: published
lang: de
title: "How to Connect Antigravity (Google Gemini) to CoCoCo"
---

## Bevor du startest

- **Antigravity** installiert
- Deine **Endpoint URL** und ein aktives **API Token** von der MCP-Connection-Seite (siehe [How to Find Your MCP Connection Details](#mcp-connection-details))

## Schritt 1 — MCP-Config öffnen

Am zuverlässigsten aus der IDE (der Dateipfad unterscheidet sich je nach Version): Öffne im Agent-Panel das **…**-Menü (Additional Options) → **MCP Servers** → **Manage MCP Servers** → **View raw config**. Das öffnet `mcp_config.json`.

## Schritt 2 — Den CoCoCo-Server hinzufügen

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

**Wichtig:** Antigravity nutzt **`serverUrl`** (nicht `url`) für Remote-HTTP-MCP-Server — anders als Cursor und Claude. Ersetze `YOUR_API_TOKEN` durch dein CoCoCo-Token.

## Schritt 3 — Neu laden und prüfen

Speichere die Datei, dann Antigravity schließen und neu öffnen (oder unter Settings → Customizations bei Installed MCP Servers auf **Refresh** klicken). Frag den Agenten, welche CoCoCo-Tools er hat, oder prüfe die MCP-Server-Liste.

## Fehlerbehebung

- **Verbindet nicht mit `url`:** Remote-Server brauchen in Antigravity **`serverUrl`** — `url` schlägt stillschweigend fehl.
- **Verbindet weiterhin nicht:** URL prüfen und ob das Token noch gültig ist, dann Antigravity neu öffnen.
- **Authentifizierungsfehler:** Prüfe, ob das Token aktiv ist.
