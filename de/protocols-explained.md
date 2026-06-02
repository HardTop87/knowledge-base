---
slug: protocols-explained
category: networks-devices
status: published
lang: de
title: "Protocols Explained: MQTT, HTTP, JMF, SQL"
---

## MQTT

**Einsatzbereich:** Maschinendaten in Echtzeit, Sensorwerte, Ereignisse

MQTT ist ein leichtgewichtiges Publish/Subscribe-Protokoll für bandbreitenarme, hochfrequente Kommunikation. Es ist die beste Wahl für Maschinen, die laufend Statusdaten senden: aktueller Job, Geschwindigkeit, Farbstände, Fehlercodes.

**Richtung:** Eingehend (Device → CoCoCo) und ausgehend (CoCoCo → Device)

## HTTP

**Einsatzbereich:** Job-Tickets, REST-API-Integration, Webhooks

HTTP verbindet Systeme, die über Standard-Web-Requests kommunizieren. Nutzen Sie HTTP für die Anbindung von MIS, Auftragsmanagement oder jeder Software, die REST-Calls sendet oder empfängt.

**Richtung:** Eingehend (System → CoCoCo) und ausgehend (CoCoCo → System)

## JMF

**Einsatzbereich:** Maschinensteuerung und Statusmeldungen in der Druckindustrie

JMF (Job Messaging Format) ist der Industriestandard für die Druckproduktion. Genutzt von Druckmaschinen, Schneidemaschinen und Weiterverarbeitung mit CIP4/JDF-Unterstützung. CoCoCo kann JMF-Kommandos an JDF-fähige Maschinen senden und deren Statusantworten empfangen.

**Richtung:** Nur ausgehend (CoCoCo → Maschine)

## SQL

**Einsatzbereich:** Lesen aus oder Schreiben in Datenbanken

Die SQL-Integration verbindet CoCoCo mit externen Datenbanken: ERP-Systeme, Legacy-Plattformen oder jede SQL-kompatible Datenquelle. Nutzen Sie sie in Workflows, um als Reaktion auf Produktionsereignisse Datensätze abzufragen oder zu aktualisieren.

**Richtung:** Nur ausgehend (CoCoCo → Datenbank)

## Vergleich

| Protokoll | Richtung | Am besten für |
|---|---|---|
| MQTT | ein + aus | Maschinen-Streaming in Echtzeit |
| HTTP | ein + aus | REST/Webhook-Integrationen |
| JMF | nur aus | JDF-fähige Druckmaschinen |
| SQL | nur aus | Datenbank Lesen/Schreiben |

> **OPC-UA und Modbus** sind keine direkten Geräteprotokolle — sie werden am Edge von einer Edge App auf einem Controller überbrückt. Siehe [What are Edge Apps?](#what-are-edge-apps).
