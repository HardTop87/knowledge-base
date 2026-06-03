---
slug: connect-claude-code
category: mcp-ai-integrations
status: published
lang: de
title: "How to Connect Claude Code to CoCoCo"
---

## Bevor du startest

Du brauchst:
- **Node.js 20 oder höher** installiert
- **Ein aktives API Token** aus deinem CoCoCo-Konto

## Schritt 1: Claude Code installieren

```bash
npm install -g @anthropic-ai/claude-code
```

Installation prüfen:

```bash
which claude
claude --version
```

Wenn `which claude` nichts zurückgibt, ist dein npm-Global-Bin-Verzeichnis vielleicht nicht im PATH. Bei nvm ergänze in `~/.zshrc`:

```bash
export PATH="$(npm config get prefix)/bin:$PATH"
```

## Schritt 2: CoCoCo MCP Server hinzufügen

Führe folgenden Befehl aus und ersetze `YOUR_TOKEN` durch dein echtes API Token:

```bash
claude mcp add --transport http cococo https://<your-domain>/mcp --header "Authorization: Bearer YOUR_TOKEN"
```

Schreibe den Befehl in **einer Zeile**. Zeilenumbrüche führen dazu, dass der Header falsch geparst wird.

## Schritt 3: Verbindung prüfen

```bash
claude mcp list
```

## Schritt 4: Verbindung testen

```bash
claude
```

Gib dann `/mcp` ein, um den Status aller konfigurierten MCP Server zu sehen. CoCoCo sollte als verbunden angezeigt werden.

## MCP Server verwalten

**Server entfernen:**
```bash
claude mcp remove cococo
```

**Token aktualisieren**: entfernen und mit neuem Token wieder hinzufügen:
```bash
claude mcp remove cococo
claude mcp add --transport http cococo https://<your-domain>/mcp --header "Authorization: Bearer YOUR_NEW_TOKEN"
```

## Fehlerbehebung

**`claude` nicht gefunden**: Prüfe deinen PATH. Siehe Schritt 1.

**Ungültiges Header-Format**: Der Befehl muss komplett in einer Zeile stehen.

**Authentifizierungsfehler**: Ist dein API Token korrekt und nicht widerrufen?