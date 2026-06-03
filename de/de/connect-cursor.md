---
slug: connect-cursor
category: mcp-ai-integrations
status: published
lang: de
title: "How to Connect Cursor to CoCoCo"
---

## Bevor du startest

- **Cursor** installiert
- Deine **Endpoint URL** und ein aktives **API Token** von der MCP-Connection-Seite (siehe [How to Find Your MCP Connection Details](#mcp-connection-details))

Ein Remote-MCP-Server braucht kein Node.js — nur URL und Token.

## Schritt 1 — Cursors MCP-Config öffnen

Cursor liest MCP-Server aus einer `mcp.json`:
- **Global:** `~/.cursor/mcp.json`
- **Projekt:** `.cursor/mcp.json` (im Projektstamm; hat Vorrang vor global)

Lege die Datei an, falls sie nicht existiert, oder öffne sie über **Settings → MCP → Add new server**.

## Schritt 2 — Den CoCoCo-Server hinzufügen

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

Remote-Server nutzen `url` plus `headers` (Streamable HTTP). Ersetze `YOUR_API_TOKEN` durch dein CoCoCo-Token.

## Schritt 3 — Prüfen

Öffne **Settings → MCP**. CoCoCo sollte als verbunden (grün) mit seinen Tools erscheinen. Im Chat kann der Agent nun CoCoCo-Tools aufrufen — standardmäßig fragt er vor jedem Aufruf nach Bestätigung.

## Fehlerbehebung

- **Rot / nicht verbunden:** Klicke den Server an, um den Fehler zu sehen; URL prüfen und ob das Token noch gültig ist.
- **Tools erscheinen nicht:** JSON auf Gültigkeit prüfen und speichern, dann Cursor neu laden.
- **Konflikt:** Definieren Projekt- und globale Datei beide `cococo`, gewinnt die Projektdatei.
