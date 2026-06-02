---
slug: build-edge-app
category: networks-devices
status: published
lang: de
title: "How to Build and Install an Edge App"
---

## Bevor du startest

- Mindestens ein **Controller** angelegt und online — siehe [How to Add a Controller](#add-controller)
- Vertrautheit mit der `bridge.*`-Runtime — siehe [What are Edge Apps?](#what-are-edge-apps)

## Schritt 1 — Edge App anlegen

Lege eine neue Edge App mit **Handle** und **Name** an. Sie startet als **Draft**, den du frei bearbeiten kannst.

## Schritt 2 — Verbindungen und Config deklarieren

Im Manifest der App deklarierst du:
- Die **MQTT-Broker** und/oder **OPC-UA-Server**, mit denen sie spricht — jeweils unter einem **Server-Alias**, den du im Code referenzierst
- Ein **Config-Schema** für installationsspezifische **Variablen** (z. B. eine Broker-URL oder eine Unit-ID) und **Secrets** (z. B. ein Passwort)

Broker-Felder können `${config:NAME}`-Templates nutzen, damit jede Installation ihren eigenen Wert liefert.

## Schritt 3 — Handler schreiben

Handler laufen in der `bridge.*`-Runtime (gopher-lua) — es gibt **kein `ctx`**. Ein häufiger Export ist `onMessage`. Beispiel:

```lua
function onMessage(msg)
  -- einen eingehenden Messwert an einen lokalen MQTT-Broker weiterleiten
  local ok, err = bridge.mqtt.publish("default", "factory/state", msg.payload, { qos = 1 })
  if not ok then
    bridge.log.warning("publish failed", { err = err })
  end

  -- den letzten Wert über Neustarts hinweg merken
  bridge.state.set("last", msg.payload)
  return { ok = true }
end
```

Für OPC-UA nutzt du `bridge.opcua.write(server, nodeId, value)` / `bridge.opcua.call(...)`, und `bridge.graphql`, um Daten in CoCoCo zu schreiben.

## Schritt 4 — Draft veröffentlichen

Wenn der Draft fertig ist, **veröffentliche** ihn. Das Veröffentlichen friert die Version ein und setzt sie auf **Published**; die zuvor veröffentlichte Version desselben Handles wird automatisch deprecated.

## Schritt 5 — Auf einem Controller installieren

Installiere die veröffentlichte App auf einem Controller:
1. **Controller** auswählen
2. Die im Config-Schema definierten **Variablen** und **Secrets** ausfüllen
3. Speichern

CoCoCo validiert die Variablen gegen das Config-Schema und pusht die Konfiguration an den Controller, der die App unter einer eigenen Bot-Identität startet.

## Schritt 6 — Prüfen

- Prüfe, ob der Controller die Installation als aktiv anzeigt
- Rufe einen Handler auf (den `onMessage`-Export der App), um sie End-to-End zu testen
- Sieh dir die `bridge.log`-Ausgabe auf Fehler an

## Installationen verwalten

- **Upgrade** einer Installation auf eine neuere veröffentlichte Version (der Controller startet mit dem neuen Inhalt neu)
- **Deprecate** einer veröffentlichten App, um sie außer Betrieb zu nehmen, ohne bestehende Installationen zu brechen
- **Deinstallieren** durch Löschen der Installation (pusht eine aktualisierte Config an den Controller)
- **Export / Import** einer App als YAML oder JSON, um sie zwischen Umgebungen zu verschieben
