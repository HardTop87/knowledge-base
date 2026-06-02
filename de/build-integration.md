---
slug: build-integration
category: developer-tools
status: published
lang: de
title: "How to Build an Integration"
---

## Bevor du startest

- Vertrautheit mit der Integration-Runtime — siehe [What are Integrations?](#what-are-integrations)
- Wenn du eine Drittanbieter-API aufrufst, halte deren **OpenAPI/Swagger**-Schema bereit

## Schritt 1 — (Optional) Externes API-Schema hochladen

Wenn die Integration eine externe API aufruft, lade zuerst deren **OpenAPI/Swagger**-Schema hoch. Die Plattform indexiert Endpunkte, Modelle und Felder, sodass du sie beim Bauen präzise referenzieren kannst.

## Schritt 2 — Draft anlegen

Lege einen neuen Integrations-**Draft** an. Ein Draft hält Manifest und Bundle-Dateien und lässt sich vor dem Veröffentlichen frei bearbeiten und neu validieren.

## Schritt 3 — Manifest definieren

Das Manifest deklariert:
- **configSchema** — die Konfigurationswerte, die ein Installierender angeben muss
- **resources** — externe Ressourcen, an die die Integration bindet (z. B. ein Gerät, das sie über HTTP/SQL aufruft), im Code per **Alias** referenziert
- **permissions** — was die Integration darf
- **dataContainerSchemas** — die Strukturen für ihren installationseigenen Speicher

## Schritt 4 — Bundle (Handler) hinzufügen

Schreibe die Handler in Lua. Sie laufen als Timer-, Event- oder RPC-Handler und nutzen die Integration-Runtime:

```lua
-- Status von einem gebundenen Gerät holen und cachen
local resp = ctx.device.http("my-printer", { method = "GET", path = "/api/status" })
ctx.integration.cacheSet({ key = "status", value = resp.body, ttl = 60 })

-- einen Datensatz im installationseigenen Speicher ablegen
ctx.integration.containersSet("orders", "last", { id = 42, state = "done" })
ctx.log.info("synced", { code = resp.status })
```

In Integration-Skripten muss das erste Argument von `ctx.device.http` / `ctx.device.sql` ein **im Manifest deklarierter Resource-Alias** sein — der Dispatcher löst ihn zum gebundenen Gerät auf.

## Schritt 5 — Validieren

Validiere den Draft. Das prüft Manifest und Bundle auf Probleme, bevor du veröffentlichst.

## Schritt 6 — Veröffentlichen

Veröffentliche den Draft, um eine **aktive Integrationsdefinition** (versioniert) zu erstellen. Erst dann ist sie installierbar.

## Schritt 7 — Installieren und binden

Installiere die Definition, gib die **Config**-Werte aus dem configSchema an und **binde** jede deklarierte Ressource an ein echtes Ziel (z. B. den Alias `my-printer` auf ein echtes Gerät mappen). Die Integration läuft nun mit eigenem install-gebundenem Speicher, Cache und Config.

## Hinweise

- `ctx.integration.*` ist an den **Install (Instanz)** gebunden, nicht an den gesamten Tenant; tenant-weite `ctx.graphql`, `ctx.sql` und `ctx.cache` bleiben verfügbar.
- Für rohe API-Referenzen beim Coden siehe [API Docs Overview](#api-docs); für wiederverwendbares Lua siehe [How to Use Scripts](#scripts).
