---
slug: mcp-server
category: mcp-ai-integrations
status: published
lang: de
title: "What is the CoCoCo MCP Server?"
---

## Was ist MCP?

MCP (Model Context Protocol) ist ein offener Standard, der KI-Assistenten mit externen Tools und Datenquellen verbindet. Statt nur das zu wissen, was in seinen Trainingsdaten steht, kann ein KI-Assistent damit in Live-Systeme greifen, echte Daten lesen und in Ihrem Namen Aktionen ausführen.

MCP wird von Claude Desktop, Claude Code, Cursor und anderen unterstützt.

## Was der CoCoCo MCP Server bereitstellt

**Custom App Management**: Den vollständigen Lebenszyklus von Custom Apps. Das ist die stärkste Nutzung der MCP-Anbindung: ein KI-Assistent kann Custom Apps komplett im Gespräch bauen, iterieren und deployen, ohne dass Sie jemals den Code-Editor manuell öffnen.

**GraphQL Schema Discovery**: Semantische Suche im vollständigen GraphQL-Schema von CoCoCo. Damit versteht der KI-Assistent das Datenmodell und schreibt korrekte Queries und Mutations.

## Warum das wichtig ist, besonders für Custom Apps

Mit einem über MCP angebundenen KI-Assistenten ändert sich der Arbeitsablauf deutlich:

**Ohne MCP:** Sie öffnen den Custom App Editor, schreiben Vue-Templates, suchen die passenden GraphQL Queries, schreiben die Lua Server API, testen, beheben Fehler und so weiter.

**Mit MCP:** Sie beschreiben in normaler Sprache, was Sie möchten. Der KI-Assistent liest die bestehende App, sucht die richtigen Schema-Types und Queries, schreibt Template und Script und aktualisiert die App. Alles in einem Gespräch. Was früher Stunden gedauert hat, dauert Minuten.

## Technische Details

Der CoCoCo MCP Server nutzt Streamable HTTP Transport im JSON-Modus.

| Feld | Wert |
|---|---|
| **Endpoint** | `https://your-domain.cococo.app/mcp` |
| **Transport** | Streamable HTTP (JSON mode) |
| **Auth** | `Authorization: Bearer <your-api-token>` |

## Loslegen

Sie brauchen ein API Token, bevor Sie verbinden. Die Connection Details finden Sie hier:

[MCP Connection Details finden](#mcp-connection-details)