---
slug: what-are-edge-apps
category: networks-devices
status: published
lang: de
title: "What are Edge Apps?"
---

## Was ist eine Edge App?

Eine **Edge App** ist ein kleines Programm, das **auf einem Controller** am Rand deines Netzwerks läuft — nicht in der CoCoCo-Cloud. Ihre Aufgabe: die Maschinen und Protokolle erreichen, die die Cloud nicht direkt ansprechen kann — einen lokalen **MQTT**-Broker, einen **OPC-UA**-Server an einer SPS oder ein **Modbus**-Gerät am Shopfloor. Sie übersetzt zwischen diesen und CoCoCo und kann Daten puffern, wenn die Internetverbindung ausfällt.

## Abgrenzung zu anderen „Apps"

| | Läuft wo | Gebaut mit | Zweck |
|---|---|---|---|
| **Edge App** | Auf einem Controller (Edge) | `bridge.*`-Runtime (kein `ctx`, kein UI) | Lokale Maschinen/Protokolle anbinden (MQTT, OPC-UA, Modbus) |
| **Integration** | In der Cloud | `ctx.integration.*` | Externe Systeme/APIs serverseitig verbinden |
| **Custom App** | Im Browser | Vue + JS (+ optional Lua) | Eine Benutzeroberfläche auf der Plattform |

## Die Bridge-Runtime

Edge-App-Handler nutzen kein `ctx`, sondern die `bridge.*`-API:

- `bridge.mqtt.publish(broker, topic, payload, opts?)` — an einen verbundenen Broker publizieren
- `bridge.opcua.write(server, nodeId, value)` / `bridge.opcua.call(server, methodNodeId, args)`
- `bridge.state.get/set/delete(key)` — bundle-eigener, persistenter Key-Value-Speicher (Strings)
- `bridge.config`, `bridge.graphql`, `bridge.publish`, `bridge.log`

## Versionen und Installation

Eine Edge App ist **versioniert**: Du baust einen **Draft** und **veröffentlichst** ihn. Eine veröffentlichte App wird **auf einen oder mehrere Controller installiert**, jeweils mit eigenen Variablen und Secrets. Die Installation pusht die Konfiguration an den Controller, der die App dann ausführt.

## Wann sinnvoll

- Eine Maschine spricht **OPC-UA** oder **Modbus** (keine direkten CoCoCo-Geräteprotokolle)
- Geräte liegen in einem isolierten lokalen Netz hinter einem Controller
- Du brauchst Protokollübersetzung oder lokale Pufferung am Edge

Zum Bauen siehe [How to Build and Install an Edge App](#build-edge-app). Edge Apps laufen auf Controllern — siehe [How to Add a Controller](#add-controller).
