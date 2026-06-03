---
slug: device-not-connecting
category: troubleshooting
status: published
lang: de
title: "Device Is Not Connecting"
---

## Device Token prüfen

1. Wechsle zu **Menu → IOT → Devices** und öffne das Device
2. Wechsle zum Tab **Tokens**
3. Prüfe, dass ein gültiges, nicht abgelaufenes Token existiert
4. Im Zweifel ein neues Token erzeugen und das Device neu konfigurieren

## Protokoll und Endpoint prüfen

| Protokoll | Verbindungs-Endpoint |
|---|---|
| MQTT | `mqtt://<your-domain>:1883` |
| MQTT (TLS) | `mqtts://<your-domain>:8883` |
| HTTP | `https://<your-domain>/api/device/{deviceId}` |

## Authentifizierung prüfen

- **MQTT**: Token als Passwort-Feld im MQTT-Client
- **HTTP**: Header `Authorization: Bearer YOUR_TOKEN`

## Network-Zuordnung prüfen

1. Öffne das Device und prüfe, dass das richtige Network zugewiesen ist
2. Falls das Network IP-Einschränkungen hat, prüfe, ob die IP des Devices zulässig ist

## Jüngste Aktivitäten prüfen

1. Öffne das Device und wechsle zum Tab **Events** oder **Metrics**
2. Wenn aktuelle Ereignisse zu sehen sind, kommt das Device durch. Das Problem liegt dann weiter hinten

## Firewall

Prüfe, dass das Netzwerk des Devices ausgehende Verbindungen zur CoCoCo-Domain auf dem benötigten Port zulässt.