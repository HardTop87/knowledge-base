---
slug: what-are-integrations
category: developer-tools
status: published
lang: de
title: "What are Integrations?"
---

## Was ist eine Integration?

Eine **Integration** ist eine paketierte Erweiterung, die **serverseitig in CoCoCo** läuft, um externe Systeme und Geräte anzubinden. Sie bündelt eigene Handler (Timer, Event und RPC), installationseigenen Speicher und Konfiguration in einer versionierten Definition, die du baust, veröffentlichst und installierst.

Typische Einsätze: Abgleich mit einem ERP/MIS über HTTP, Transformation eingehender Webhooks, Aufruf des lokalen HTTP- oder SQL-Endpunkts eines Geräts oder geplante Jobs gegen die Plattform.

## Abgrenzung zu anderen Erweiterungen

| | Läuft wo | Gebaut mit |
|---|---|---|
| **Integration** | In der Cloud, an einen Install gebunden | `ctx.integration.*` + Basis-`ctx` |
| **Edge App** | Auf einem Controller (Edge) | `bridge.*` |
| **Custom App** | Im Browser | Vue + JS (+ optional Lua) |

## Die Integration-Runtime

Integration-Handler nutzen die install-gebundene `ctx.integration.*`-Oberfläche plus die tenant-weite Basis-API:

- `ctx.integration.containersGet/Set/Delete/List/Query(...)` — installationseigener strukturierter Speicher (im Manifest deklarierte Schemas)
- `ctx.integration.cacheGet/cacheSet/cacheDelete(...)` — installationseigener Redis-Cache
- `ctx.integration.getConfig/getBindings/getVersion(...)` — Install-Metadaten
- `ctx.device.http(alias, opts)` / `ctx.device.sql(alias, opts)` — ein gebundenes Gerät über seinen Bridge-Controller aufrufen
- `ctx.graphql`, `ctx.sql`, `ctx.cache`, `ctx.log` — die üblichen tenant-weiten Helfer

## Externe API-Schemas

Du kannst das **OpenAPI/Swagger-Schema** einer externen API in die Plattform hochladen und durchsuchen, damit eine Integration die Endpunkte und Modelle einer Drittanbieter-API präzise ansteuern kann.

## Lebenszyklus

**Draft** bauen (Manifest + Bundle) → **validieren** → zu einer aktiven Definition **veröffentlichen** → mit Config und Resource-Bindings **installieren**. Zum Bauen siehe [How to Build an Integration](#build-integration).
