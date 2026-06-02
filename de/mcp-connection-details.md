---
slug: mcp-connection-details
category: account-settings
status: published
lang: de
title: "How to Find Your MCP Connection Details"
---

## MCP Connection Details finden

1. Klicken Sie oben rechts auf Ihr **Profilbild**
2. Wählen Sie **API Tokens** aus dem Dropdown
3. Scrollen Sie nach unten zum Abschnitt **MCP Connection**
4. Oder rufen Sie direkt `https://your-domain.cococo.app/#/api-tokens` auf

## Was Sie dort finden

| Feld | Wert |
|---|---|
| **Endpoint URL** | `https://your-domain.cococo.app/mcp` |
| **Transport** | Streamable HTTP (JSON mode) |
| **Authentifizierung** | `Authorization: Bearer <your-token>` |

Die **Endpoint URL** ist die MCP-Server-Adresse Ihrer Plattform. Klicken Sie auf **Copy**, um sie in die Zwischenablage zu kopieren.

Das Feld **Transport** zeigt das Transportprotokoll des Servers: Streamable HTTP im JSON-Modus. Die meisten modernen MCP-kompatiblen Tools unterstützen das direkt.

Das Feld **Authentifizierung** zeigt das erforderliche Header-Format. Nutzen Sie ein beliebiges aktives API Token aus Ihrem Konto.

## Was der MCP Server bereitstellt

**Custom App Management**: Custom Apps lesen und schreiben. Vorhandene Apps auflisten, Template- und Skriptinhalte lesen, neue Apps anlegen und bestehende aktualisieren.

**GraphQL Schema Discovery**: Das vollständige GraphQL-Schema von CoCoCo durchsuchen. Types, Queries, Mutations und Felder finden.

## Bevor Sie verbinden

Sie brauchen ein aktives API Token zur Authentifizierung. Sobald Sie ein Token haben, können Sie Ihren KI-Assistenten verbinden:

- [Claude Desktop mit CoCoCo verbinden](#connect-claude-desktop)
- [Claude Code mit CoCoCo verbinden](#connect-claude-code)