---
slug: mcp-connection-details
category: account-settings
status: published
lang: de
title: "How to Find Your MCP Connection Details"
---

## So findest du deine MCP-Verbindungsdaten

1. Klicke oben rechts auf deinen **Profil-Avatar**
2. Wähle **API Tokens** aus dem Dropdown
3. Scrolle zum Abschnitt **MCP Connection**
4. Oder navigiere direkt zu `https://<your-domain>/#/api-tokens`

## Was du dort findest

| Feld | Wert |
|---|---|
| **Endpoint URL** | `https://<your-domain>/mcp` |
| **Transport** | Streamable HTTP (JSON-Modus) |
| **Authentication** | `Authorization: Bearer <your-token>` |

Die **Endpoint URL** ist die MCP-Server-Adresse deiner Plattform. Klicke **Copy**, um sie
in die Zwischenablage zu kopieren.

Der **Transport** sagt dir, welches MCP-Transportprotokoll der Server nutzt — Streamable
HTTP im JSON-Modus. Die meisten modernen MCP-kompatiblen Tools unterstützen das direkt.

Das Feld **Authentication** zeigt das benötigte Header-Format. Nutze ein beliebiges
aktives API-Token deines Kontos als Credential.

## Was der MCP-Server bereitstellt

- **Custom Apps** — Custom Apps auflisten, lesen, erstellen, aktualisieren und versionieren (Template, Script, Server-API)
- **GraphQL-API** — Queries/Mutationen ausführen und validieren sowie das Schema durchsuchen
- **Reporting / SQL** — MicroSQL ausführen und das Reporting-Schema durchsuchen
- **Lua** — Lua-API durchsuchen, Typdefinitionen holen, Scripts validieren
- **Workflows** — Workflows auflisten/lesen, Node-Typen inspizieren, Versionen importieren, Ausführungen lesen
- **ML & Integrationen** — ML-Modelle trainieren/ausführen; Integrationsdefinitionen bauen und veröffentlichen

## Bevor du dich verbindest

Du brauchst ein aktives API-Token zur Authentifizierung. Sobald du eines hast, verbinde deinen KI-Assistenten:

- [How to Connect Claude Desktop to CoCoCo](#connect-claude-desktop)
- [How to Connect Claude Code to CoCoCo](#connect-claude-code)
