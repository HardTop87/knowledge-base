---
slug: mcp-server
category: mcp-ai-integrations
status: published
lang: de
title: "What is the CoCoCo MCP Server?"
---

## Was ist MCP?

MCP — Model Context Protocol — ist ein offener Standard, mit dem KI-Assistenten sich mit
externen Tools und Datenquellen verbinden. Statt nur das aus seinen Trainingsdaten zu
kennen, kann ein KI-Assistent über MCP auf Live-Systeme zugreifen, echte Daten lesen und
in deinem Auftrag handeln.

MCP wird von Claude Desktop, Claude Code, Cursor und weiteren unterstützt.

## Was der CoCoCo-MCP-Server bereitstellt

- **Custom-App-Entwicklung** — der gesamte Lebenszyklus: Apps auflisten, Template/Script/
  Server-API lesen, Apps erstellen und aktualisieren, Versionen verwalten. Das ist der
  stärkste Anwendungsfall: ein Assistent baut, iteriert und deployt Custom Apps komplett
  per Konversation.
- **GraphQL-API** — Queries und Mutationen gegen Live-Daten ausführen, Operationen
  validieren und das Schema durchsuchen (Types, Queries, Mutationen, Felder), damit der
  Assistent korrekte Operationen schreibt.
- **Reporting / SQL** — MicroSQL gegen die Reporting-Tabellen ausführen und das
  Reporting-Schema durchsuchen (Tabellen und Spalten).
- **Lua-Entwicklung** — die Lua-API durchsuchen, die maßgeblichen Typdefinitionen holen
  und Scripts je Runtime-Rolle validieren.
- **Workflows** — Workflows auflisten und lesen, Node-Typen inspizieren, neue Versionen
  importieren und Ausführungsergebnisse lesen.
- **ML & Integrationen** — ML-Modelle trainieren und ausführen sowie
  Integrationsdefinitionen bauen, validieren und veröffentlichen (inkl. hochgeladener
  externer API-Schemas).

## Warum das wichtig ist — besonders für Custom Apps

Mit einem per MCP verbundenen KI-Assistenten ändert sich der Ablauf grundlegend:

**Ohne MCP:** Du öffnest den Custom-App-Editor, schreibst Vue-Templates, findest die
richtigen GraphQL-Queries, schreibst die Lua-Server-API, testest, behebst Fehler, wiederholst.

**Mit MCP:** Du beschreibst in normaler Sprache, was du willst. Der KI-Assistent liest die
bestehende App, schlägt die korrekten Schema-Typen und Queries nach, schreibt Template und
Script und aktualisiert die App — alles in einer Konversation. Was früher Stunden dauerte,
dauert Minuten.

## Technische Details

Der CoCoCo-MCP-Server nutzt Streamable-HTTP-Transport im JSON-Modus.

| Feld | Wert |
|---|---|
| **Endpoint** | `https://<your-domain>/mcp` |
| **Transport** | Streamable HTTP (JSON-Modus) |
| **Auth** | `Authorization: Bearer <your-api-token>` |

## Erste Schritte

Du brauchst vor dem Verbinden ein API-Token. Deine Verbindungsdaten findest du hier:

[How to Find Your MCP Connection Details](#mcp-connection-details)
