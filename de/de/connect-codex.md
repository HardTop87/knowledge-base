---
slug: connect-codex
category: mcp-ai-integrations
status: published
lang: de
title: "How to Connect ChatGPT Codex to CoCoCo"
---

## Bevor du startest

- **Codex CLI** installiert (die IDE-Extension teilt sich dieselbe Config)
- Deine **Endpoint URL** und ein aktives **API Token** von der MCP-Connection-Seite (siehe [How to Find Your MCP Connection Details](#mcp-connection-details))

## Schritt 1 — Token in eine Umgebungsvariable legen

Codex sendet das Token aus einer Umgebungsvariable, statt es in der Config-Datei zu speichern:

```bash
export COCOCO_TOKEN="your-api-token"
```

Setze sie in der Shell (oder im Shell-Profil), in der du Codex startest.

## Schritt 2 — Den CoCoCo-Server in config.toml eintragen

Codex speichert MCP-Server in `~/.codex/config.toml` (global) oder `.codex/config.toml` (vertrautes Projekt). Ergänze:

```toml
[mcp_servers.cococo]
url = "https://<your-domain>/mcp"
bearer_token_env_var = "COCOCO_TOKEN"
```

`bearer_token_env_var` weist Codex an, `Authorization: Bearer <token>` mit der Variable aus Schritt 1 zu senden.

Oder per CLI:

```bash
codex mcp add cococo --url https://<your-domain>/mcp --bearer-token-env-var COCOCO_TOKEN
```

## Schritt 3 — Prüfen

Starte `codex` und tippe `/mcp`, um die konfigurierten Server zu sehen. CoCoCo sollte verbunden mit seinen Tools erscheinen.

## Fehlerbehebung

- **Server fehlt oder leer:** Stelle sicher, dass `COCOCO_TOKEN` in derselben Shell exportiert ist, die Codex startet.
- **Remote-Server wird nicht erkannt:** Manche Codex-Versionen brauchen den Streamable-HTTP-Client — füge `experimental_use_rmcp_client = true` in `config.toml` ein.
- **Authentifizierungsfehler:** Prüfe, ob das Token aktiv und nicht widerrufen ist.
- CLI und IDE-Extension teilen sich `config.toml` — du konfigurierst das also nur einmal.
