---
slug: connect-claude-desktop
category: mcp-ai-integrations
status: published
lang: de
title: "How to Connect Claude Desktop to CoCoCo"
---

# Claude Desktop mit CoCoCo verbinden

Es gibt zwei Wege, Claude Desktop mit CoCoCo zu verbinden. **Für fast alle ist Option A richtig** — eine einzige Datei, etwa eine Minute Aufwand, kein Terminal, keine Node.js-Installation und kein Bearbeiten von Konfigurationsdateien. Option B (der manuelle Proxy) bleibt nur für fortgeschrittene Nutzer, die volle Kontrolle brauchen.

---

## Option A — Die CoCoCo-Extension installieren (empfohlen)

> **Aktuelle Version:** 1.1.0 · veröffentlicht 2026-06-02
> **Download:** [cococo.mcpb](REPLACE_WITH_DOWNLOAD_URL)
> **SHA-256:** `dff0971438b5cb60f0740f292f4f5c18ed65a34c4780fd632e36c5318dd1653e`
> *(optionale Integritätsprüfung — auf macOS/Linux `shasum -a 256 cococo.mcpb` ausführen und mit dem Wert oben vergleichen)*

CoCoCo kommt als Claude-Desktop-Extension (eine `.mcpb`-Datei). Die Installation ist wie das Hinzufügen einer Browser-Erweiterung: eine Datei hineinziehen und zwei Werte einfügen.

### Bevor du startest
- **Claude Desktop** installiert — Download unter `claude.ai/download`
- Deine **Endpoint URL** und ein aktives **API Token** — beides auf der Seite **MCP Connection** in CoCoCo

Du brauchst **kein** Node.js und keine weitere Software — Claude Desktop bringt seine eigene Laufzeitumgebung mit.

### Schritt 1 — Endpoint URL und Token aus CoCoCo kopieren
1. Öffne in CoCoCo die **MCP Connection**-Einstellungen.
2. Klicke **Copy** neben der **Endpoint URL** (sie sieht aus wie `https://<your-domain>/mcp`).
3. Halte ein aktives **API Token** von derselben Seite bereit (es dient als Bearer-Credential).

### Schritt 2 — Extension installieren
1. Lade die Datei `cococo.mcpb` herunter.
2. Öffne in Claude Desktop das Menü (☰) oben links und gehe zu **File → Settings → Extensions**.
3. Ziehe `cococo.mcpb` auf die Extensions-Seite (oder nutze **Install Extension…** und wähle die Datei).
4. Möglicherweise erscheint ein Sicherheitshinweis, weil die Extension privat statt über das öffentliche Verzeichnis verteilt wird. Das ist erwartet — wähle **Install Anyway**.

### Schritt 3 — Deine Daten eingeben
Fülle die zwei Felder aus:
- **Endpoint URL** — die in Schritt 1 kopierte URL einfügen
- **API Key** — dein CoCoCo-API-Token einfügen

Die optionalen Felder darunter leer lassen (sie sind nur für die Verbindung mehrerer Umgebungen — siehe unten).

Dein Token wird verschlüsselt im sicheren Speicher deines Betriebssystems abgelegt (macOS Keychain / Windows Credential Manager), nicht in einer Klartextdatei.

### Schritt 4 — Prüfen
Öffne eine **neue** Unterhaltung, klicke auf das Tools-Symbol (Hammer) unten im Eingabefeld und bestätige, dass **CoCoCo** erscheint. Oder frag Claude direkt:

> „What CoCoCo tools do you have access to?"

### Mehrere Umgebungen verbinden
Wenn du mit mehreren CoCoCo-Umgebungen arbeitest, füge bei der Installation eine **zweite** (und optional **dritte**) Endpoint URL samt API-Token in die optionalen Felder ein. Du kannst jeder einen kurzen **Namen** geben (z. B. „Live", „Test"). Sind mehrere Umgebungen verbunden, werden die Tools jeder Umgebung mit diesem Namen als Präfix angezeigt (z. B. `Live__…`), damit sie sich nie überschneiden. Bei einer einzigen Umgebung gibt es kein Präfix — im Normalfall siehst du also keines.

### Aktualisieren
Privat verteilte Extensions aktualisieren sich nicht automatisch. Wenn eine neue Version von `cococo.mcpb` bereitgestellt wird, installiere die neue Datei auf demselben Weg — sie ersetzt die vorherige. Auf deinem Rechner ändert sich nichts, solange du kein Update installierst.

### Fehlerbehebung
- **CoCoCo erscheint nicht:** Stelle sicher, dass du nach der Installation eine *neue* Unterhaltung geöffnet hast und der Extension-Schalter unter Settings → Extensions aktiv ist.
- **Nach Neustart von Claude Desktop:** In einer **neuen** Unterhaltung weitermachen. Eine vor dem Neustart geöffnete Unterhaltung erreicht die Tools womöglich nicht mehr, auch wenn neue Unterhaltungen normal funktionieren.
- **Authentifizierungsfehler:** API-Token erneut prüfen (keine zusätzlichen Leerzeichen); sicherstellen, dass es nicht auf der Seite MCP / API Tokens widerrufen wurde.
- **Verbindungsfehler:** Prüfe, ob die Endpoint URL korrekt und von deinem Rechner erreichbar ist. Interne `.local`-Adressen sind nur im lokalen Netz erreichbar; von außen die in CoCoCo angezeigte öffentliche URL verwenden.
- **Logs:** Die Extension schreibt nach `~/cococo-bridge.log`. Eine Zeile, die mit `cococo-bridge … started; environments=[…]` beginnt, bestätigt die erkannten Umgebungen.

---

## Option B — Manuelles Proxy-Setup (fortgeschritten / Fallback)

Nur nutzen, wenn du die Verbindung bewusst selbst betreiben willst statt über die Extension. Erfordert Node.js und das Bearbeiten einer Konfigurationsdatei.

### Bevor du startest
- Claude Desktop installiert
- **Node.js** Version 18 oder höher
- Ein aktives **API Token** und deine **Endpoint URL** (von der MCP-Connection-Seite)

### Wie es funktioniert
Claude Desktop spricht mit lokalen MCP-Servern über stdio — es startet einen lokalen Prozess und tauscht JSON-Nachrichten mit ihm aus. Da der CoCoCo-MCP-Server ein entfernter HTTPS-Endpoint ist, überbrückt ein kleines lokales Script die beiden: Es liest stdio-Nachrichten von Claude Desktop, leitet sie an den CoCoCo-Endpoint weiter und gibt die Antworten zurück.

### Schritt 1 — Proxy-Script anlegen
Lege einen Ordner an, z. B. `~/mcp-proxies/`, und darin eine Datei `cococo-proxy.mjs` mit dem gehärteten Bridge-Script (wird separat bereitgestellt). Diese Version parst gestreamte Antworten inkrementell, erzwingt ein absolutes Zeitlimit pro Anfrage, behandelt jede Anfrage unabhängig und fährt sauber herunter — und vermeidet so die Hänger, die einfachere Proxy-Scripts treffen können.

Das Script liest seine Einstellungen aus Umgebungsvariablen (in der Konfiguration unten gesetzt), du musst dein Token also **nicht** ins Script selbst schreiben:
- `COCOCO_ENDPOINT` — deine Endpoint URL (z. B. `https://<your-domain>/mcp`)
- `COCOCO_TOKEN` — dein API-Token

### Schritt 2 — Node.js-Pfad finden
Führe `which node` aus. Notiere die Ausgabe (z. B. `/usr/local/bin/node` oder einen nvm-Pfad wie `/Users/yourname/.nvm/versions/node/v18.20.8/bin/node`).

### Schritt 3 — Claude Desktop konfigurieren
Öffne (oder erstelle) die Konfigurationsdatei:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

Füge einen `cococo`-Server-Block (innerhalb von `mcpServers`) hinzu, mit deinem Node-Pfad, dem Pfad zum Script und deinen Daten:

```json
{
  "mcpServers": {
    "cococo": {
      "command": "/usr/local/bin/node",
      "args": ["/Users/yourname/mcp-proxies/cococo-proxy.mjs"],
      "env": {
        "COCOCO_ENDPOINT": "https://<your-domain>/mcp",
        "COCOCO_TOKEN": "YOUR_API_TOKEN"
      }
    }
  }
}
```

### Schritt 4 — Claude Desktop neu starten
Datei speichern, dann Claude Desktop vollständig beenden (⌘Q) und neu öffnen — das Fenster zu schließen reicht nicht.

> Hinweis: Wenn du Claude Desktop neu startest, während eine Unterhaltung offen ist, danach in einer **neuen** Unterhaltung weitermachen. Eine vor dem Neustart begonnene Unterhaltung erreicht die Tools womöglich nicht mehr.

### Schritt 5 — Prüfen
Neue Unterhaltung öffnen, Tools-Symbol anklicken und bestätigen, dass CoCoCo erscheint — oder „What CoCoCo tools do you have access to?" fragen.

### Fehlerbehebung
- **CoCoCo erscheint nicht:** Prüfe, ob das JSON gültig ist (ein fehlendes Komma oder eine fehlende Klammer verhindert das Laden der Datei); prüfe, ob die Dateipfade existieren; stelle sicher, dass du vollständig beendet und neu gestartet hast.
- **Authentifizierungsfehler:** `COCOCO_TOKEN` prüfen; sicherstellen, dass das Token noch aktiv ist.
- **Node.js nicht gefunden:** `which node` erneut ausführen und den Command-Pfad aktualisieren; bei nvm die richtige Version aktivieren.
- **Verbindungsfehler:** Prüfen, ob die Endpoint URL erreichbar ist.

---

## Was du nach der Verbindung tun kannst
- „List all my Custom Apps and tell me what each one does"
- „Build me a Custom App that shows a live overview of all active jobs"
- „What GraphQL query do I use to fetch jobs with status PRESS?"
- „Create a new KIOSK app for shopfloor job reporting"

Der schnellste Anwendungsfall ist die Custom-App-Entwicklung — beschreibe, was du willst, und Claude baut es direkt auf deiner Plattform.
