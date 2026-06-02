---
slug: platform-overview
category: getting-started
status: published
lang: de
title: "Platform Overview"
---

## Was ist CoCoCo?

CoCoCo steht für Connect, Combine, Collaborate und ist eine offene Integrationsplattform für die Druckindustrie. Sie verbindet Ihre Maschinen, Mitarbeiter und Produktionsdaten an einem Ort und automatisiert die Abläufe, die Ihren Betrieb am Laufen halten.

Im Kern bietet CoCoCo drei Dinge:

**Sichtbarkeit**: Sie sehen in Echtzeit, was auf Ihrer Produktionsfläche passiert. Welche Maschinen laufen, welche Jobs in Arbeit sind, wo es hakt.

**Integration**: CoCoCo verbindet sich mit Ihren bestehenden Maschinen und Systemen über Standardprotokolle (MQTT, HTTP, JMF, SQL). Ohne Austausch. Es funktioniert mit dem, was Sie bereits haben.

**Automatisierung**: Sie definieren Abläufe, die automatisch auf Ereignisse reagieren. Ein Job kommt herein, wird geprüft, an die passende Maschine geleitet und bis zum Abschluss verfolgt, ohne manuelles Eingreifen.

## Für wen ist CoCoCo?

**Administratoren** richten die Plattform ein. Das umfasst das Einladen von Teammitgliedern, das Verwalten von Zugriffsrechten, das Anbinden von Maschinen und das Konfigurieren von Workflows. Siehe [Teammitglieder einladen](#inviting-team-members) und [IAM verstehen](#understanding-iam).

**Produktionsleiter** nutzen Dashboards und Werkzeuge, um Jobs zu überwachen, Ausnahmen zu behandeln und den Betrieb am Laufen zu halten.

**Shopfloor-Mitarbeiter** interagieren an Terminals mit der Plattform, um Fortschritte zu melden und Arbeitsanweisungen zu erhalten. Siehe [Eine Kiosk App bauen](#kiosk-app).

## Wie CoCoCo aufgebaut ist

**Users, Teams und Policies** bestimmen, wer Zugriff hat und was er tun darf. Siehe [IAM verstehen](#understanding-iam).

**Networks und Devices** regeln, wie Ihre Maschinen an die Plattform angebunden werden. Siehe [Protokolle erklärt](#protocols-explained).

**Work Centers und Production Cells** bilden Ihre physischen Produktionsressourcen in CoCoCo ab. Siehe [Ein Work Center erstellen](#create-work-center).

**Jobs und Orders** sind die Arbeit, die durch Ihren Betrieb fließt. Siehe [Commercial-Übersicht](#commercial-overview).

**Workflows** enthalten die Automatisierungslogik, die auf Ereignisse reagiert. Siehe [Was ist ein Workflow?](#what-is-a-workflow).

## Die Bausteine auf einen Blick

| Begriff | Was es ist |
|---|---|
| **Job** | Ein Produktionsauftrag, der durch Ihren Betrieb läuft |
| **Work Center** | Eine Maschine, ein Mensch, ein Werkzeug oder ein Ort, der Arbeit leistet |
| **Device** | Eine angebundene Maschine, die Daten an CoCoCo sendet |
| **Workflow** | Ein automatisierter Prozess, ausgelöst durch Ereignisse |
| **Policy** | Ein Satz von Zugriffsregeln, der einem User zugewiesen ist |
| **Custom App** | Eine individuelle Oberfläche, gebaut auf der Plattform |

Alle Plattformbegriffe finden Sie im vollständigen [Glossar](#glossary).

## Neu bei CoCoCo?

Starten Sie mit der [Setup-Checkliste](#setup-checklist), um Ihre Plattform einzurichten.