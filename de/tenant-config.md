---
slug: tenant-config
category: platform-configuration
status: published
lang: de
title: "How to Manage Tenant Config"
---

## Was ist Tenant Config?

Tenant Config ist ein sicherer Key-Value-Speicher für Einstellungen und Zugangsdaten,
die deine Plattform zur Laufzeit braucht.

| Typ | Beschreibung | In der UI sichtbar |
|---|---|---|
| **Config** | Nicht sensible Einstellungen, URLs, Feature-Flags | Ja |
| **Secret** | API-Keys, Passwörter, Tokens | Nein — nach dem Speichern verborgen |

## Tenant Config verwalten

1. Gehe zu **Menu → Developer → Config**
2. Klicke **+ Add Entry**
3. Wähle **Config** oder **Secret**
4. Gib den **Key** (z. B. `SMTP_HOST`, `OPENAI_API_KEY`) und den **Value** ein
5. Klicke **Save**

## Config-Werte lesen

Die Tenant-Konfiguration liest du über die GraphQL-Query `getConfig` — z. B. aus einem
Workflow-Script-Node:

```lua
local res = ctx.graphql.query([[
  query { getConfig { entries { name type value } } }
]])
-- res.data.getConfig.entries: je Eintrag name, type (Config oder Secret) und value
```

**Secret-Werte werden von der API redacted** — sie lassen sich über `getConfig` oder ein
Script **nicht** zurücklesen. Nur nicht-geheime **Config**-Einträge liefern ihren Wert.
Secrets werden dort von der Plattform genutzt, wo sie referenziert sind; an Client- oder
Script-Code werden sie nie zurückgegeben.

## Best Practices

- Großschreibung und sprechende Keys: `SENDGRID_API_KEY` statt `key1`
- Für Zugangsdaten immer den Typ **Secret** — ihre Werte sind nach dem Speichern nicht zurücklesbar
- Ein gemeinsames Team-Dokument pflegen, das beschreibt, wofür jeder Key verwendet wird
