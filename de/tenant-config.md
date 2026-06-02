---
slug: tenant-config
category: platform-configuration
status: published
lang: de
title: "How to Manage Tenant Config"
---

## Was ist Tenant Config?

Tenant Config ist ein sicherer Key-Value-Speicher für Einstellungen und Zugangsdaten, die Ihre Plattform zur Laufzeit braucht.

| Typ | Beschreibung | In der UI sichtbar |
|---|---|---|
| **Config** | Nicht-sensible Einstellungen, URLs, Feature Flags | Ja |
| **Secret** | API-Keys, Passwörter, Tokens | Nein. Nach dem Speichern ausgeblendet |

## Tenant Config verwalten

1. Wechseln Sie zu **Menu → Developer → Config**
2. Klicken Sie auf **+ Add Entry**
3. Wählen Sie **Config** oder **Secret**
4. Tragen Sie **Key** (z.B. `SMTP_HOST`, `OPENAI_API_KEY`) und **Value** ein
5. Klicken Sie auf **Save**

## Config-Werte in Workflows lesen

In einer Script oder Transform Node:

```lua
local api_key = cococo.config.get("OPENAI_API_KEY")
```

## Best Practices

- Großgeschriebene, aussagekräftige Key-Namen verwenden: `SENDGRID_API_KEY` statt `key1`
- Für Zugangsdaten immer den Typ **Secret** nutzen. Werte sind nach dem Speichern nicht mehr lesbar
- Eine gemeinsame Teamnotiz pflegen, die dokumentiert, wofür jeder Key verwendet wird