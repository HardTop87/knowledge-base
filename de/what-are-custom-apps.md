---
slug: what-are-custom-apps
category: custom-apps
status: published
lang: de
title: "What are Custom Apps?"
---

## Was sind Custom Apps?

Custom Apps sind individuelle Oberflächen, die Sie direkt auf der CoCoCo-Plattform bauen und betreiben. Sie haben vollen Zugriff auf Plattformdaten und APIs und erscheinen in der CoCoCo-Oberfläche: in der Seitenleiste, in Dashboards, im Job-Detailbereich oder als dedizierte Shopfloor-Kioske.

## Die drei Bausteine

**Template**: die Benutzeroberfläche, geschrieben als Vue.js HTML-Fragment. Nutzt Vue-Direktiven, Tailwind CSS und DaisyUI-Komponenten. Siehe [Vue in Custom App Templates](#vue-templates).

**Script**: clientseitige Logik mit Vue Composition API. Verantwortlich für State, Datenabfragen und Reaktivität. Werte werden über `const setupReturn = { ... }` freigegeben. Siehe [Der Custom App Editor](#custom-app-editor).

**Server API**: optionaler Lua-Code, der serverseitig läuft, für privilegierte Operationen. Siehe [Server API (Lua) nutzen](#server-api-lua).

## App-Typen

| Typ | Wo sie erscheint |
|---|---|
| **Page** | Linke Seitenleiste. Siehe [Eine Sidebar Page App bauen](#sidebar-page-app) |
| **Dashboard** | Als Tab in den Dashboards. Siehe [Eine Dashboard Tab App bauen](#dashboard-tab-app) |
| **Kiosk** | Vollbild für Shopfloor-Terminals. Siehe [Eine Kiosk App bauen](#kiosk-app) |
| **Job View** | Eingebettet im Job-Detailbereich. Siehe [Eine Job View App bauen](#job-view-app) |

## Warum eine Custom App bauen?

Die Standardscreens decken übliche Workflows ab. Custom Apps schließen die Lücken: Shopfloor-Check-in-Kioske, maßgeschneiderte Dashboards, Qualitätschecklisten, Kalkulationswerkzeuge.

## Loslegen

- [Ihre erste Custom App bauen](#create-first-custom-app)
- [Eine Custom App vorschauen und veröffentlichen](#preview-publish)
- [DaisyUI für Theming nutzen](#daisy-ui-theming)