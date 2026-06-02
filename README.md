# CoCoCo Knowledge Base — Quelle der Wahrheit

Kanonische, editierbare Quelle für die Custom App **Knowledge Base**
(`cap_01KP75ER4GF8BAXPA6F1TY3W4T`, handle `knowledge-base`) in der Umgebung
`cococo-de`. Stand: aus der App extrahiert (Bootstrap), Round-Trip verifiziert.

> **Regel:** Ab jetzt wird **nicht mehr in der CoCoCo-UI editiert**. Die App ist
> ein Build-Artefakt aus diesem Repo. Direkte UI-Änderungen würden beim nächsten
> Push überschrieben.

## Inhalt (extrahiert)

- **13 Kategorien**, **71 Artikel** — davon **68 published** (mit Text) und
  **3 `coming_soon`** ohne Body (`connect-antigravity`, `connect-codex`,
  `connect-cursor`).
- Zweisprachig **EN + DE**, deckungsgleich (je 71 Dateien).

## Struktur

```
.
├─ manifest.json            # Struktur-Index: CATEGORIES (Name, Icon, Beschreibung,
│                           # Artikel mit slug/title/order/tags/status) + I18N (en/de).
│                           # 1:1 aus der App, sprachneutrale Metadaten.
├─ en/<slug>.md             # je Artikel EN: YAML-Frontmatter + Body (verbatim)
├─ de/<slug>.md             # je Artikel DE
├─ app/
│  ├─ script.template.js    # Vue-Script der App; die 4 Datenblöcke sind durch
│  │                        # Marker ersetzt (/*__CATEGORIES__*/ usw.). Byte-genau
│  │                        # bewahrter Komponenten-Code.
│  ├─ template.html         # HTML-Template der App (unverändert)
│  ├─ serverApi.lua         # leer (App hat keine serverApi)
│  └─ app.config.json       # id, handle, kind, name, icon
├─ build/
│  ├─ build_to_app.py       # Repo -> app/script.rebuilt.js  (Build)
│  └─ extract_from_app.py   # Referenz: einmaliger Bootstrap (nicht im Normalbetrieb)
└─ README.md
```

## Artikel-Datei (Konvention)

```markdown
---
slug: accessing-data
category: developer-tools
status: published          # published | coming_soon
lang: en
title: "Accessing Platform Data"
---

<Body — exakt wie in der App>
```

- `slug` ist der stabile Schlüssel; `en/<slug>.md` und `de/<slug>.md` gehören
  zusammen und müssen beide existieren (Parität).
- Titel, Reihenfolge, Tags, Status und Kategorie-Texte sind **sprachneutral** und
  leben in `manifest.json` (nicht in jeder md-Datei doppelt). Das Frontmatter
  spiegelt sie nur zur Bequemlichkeit; maßgeblich ist `manifest.json`.
- `coming_soon`-Artikel haben einen leeren Body und werden vom Build automatisch
  aus den Inhalts-Maps ausgeschlossen (genau wie im Original).

## Workflow

1. **Bearbeiten:** `en/`/`de/`-Dateien lokal ändern, EN+DE parallel halten.
   Neue Artikel: in `manifest.json` unter der Kategorie registrieren **und** beide
   md-Dateien anlegen.
2. **Bauen:** `python3 build/build_to_app.py` → erzeugt `app/script.rebuilt.js`.
   Prüft Parität und ersetzt alle Marker.
3. **Pushen:** Das gebaute Script geht via CoCoCo-MCP (`update_custom_app`) zurück
   in die App. Dieser Schritt wird bewusst ausgelöst (nicht automatisch).
4. **Versionieren:** committen & nach GitHub pushen.

`app/script.rebuilt.js` ist ein Build-Artefakt und in `.gitignore`.

## Verifikations-Garantie (Bootstrap)

Der Build wurde gegen den Original-App-Stand geprüft:
- Werte aller vier Datenblöcke (CATEGORIES, ARTICLES_CONTENT,
  ARTICLES_CONTENT_DE, I18N) rekonstruieren **identisch**.
- Der gesamte Code **außerhalb** der Datenblöcke ist **byte-identisch**.
Quoting in den Datenblöcken wird auf JSON normalisiert (Werte unverändert),
daher ist die App funktional gleich, das Script minimal größer.
