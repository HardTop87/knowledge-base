---
slug: platform-overview
category: getting-started
status: published
lang: de
title: "Platform Overview"
---

## Was ist CoCoCo?

CoCoCo steht für Connect, Combine, Collaborate und ist eine offene Integrationsplattform für die Druckindustrie. Sie verbindet deine Maschinen, Mitarbeiter und Produktionsdaten an einem Ort und automatisiert die Abläufe, die deinen Betrieb am Laufen halten.

Im Kern bietet CoCoCo drei Dinge:

**Sichtbarkeit**: Du siehst in Echtzeit, was auf deiner Produktionsfläche passiert. Welche Maschinen laufen, welche Jobs in Arbeit sind, wo es hakt.

**Integration**: CoCoCo verbindet sich mit deinen bestehenden Maschinen und Systemen über Standardprotokolle (MQTT, HTTP, JMF, SQL). Ohne Austausch. Es funktioniert mit dem, was du bereits hast.

**Automatisierung**: Du definierst Abläufe, die automatisch auf Ereignisse reagieren. Ein Job kommt herein, wird geprüft, an die passende Maschine geleitet und bis zum Abschluss verfolgt, ohne manuelles Eingreifen.

## Für wen ist CoCoCo?

**Administratoren** richten die Plattform ein. Das umfasst das Einladen von Teammitgliedern, das Verwalten von Zugriffsrechten, das Anbinden von Maschinen und das Konfigurieren von Workflows. Siehe [Teammitglieder einladen](#inviting-team-members) und [IAM verstehen](#understanding-iam).

**Produktionsleiter** nutzen Dashboards und Werkzeuge, um Jobs zu überwachen, Ausnahmen zu behandeln und den Betrieb am Laufen zu halten.

**Shopfloor-Mitarbeiter** interagieren an Terminals mit der Plattform, um Fortschritte zu melden und Arbeitsanweisungen zu erhalten. Siehe [Eine Kiosk App bauen](#kiosk-app).

## Wie CoCoCo aufgebaut ist

**Users, Teams und Policies** bestimmen, wer Zugriff hat und was er tun darf. Siehe [IAM verstehen](#understanding-iam).

**Networks und Devices** regeln, wie deine Maschinen an die Plattform angebunden werden. Siehe [Protokolle erklärt](#protocols-explained).

**Work Centers und Production Cells** bilden deine physischen Produktionsressourcen in CoCoCo ab. Siehe [Ein Work Center erstellen](#create-work-center).

**Jobs und Orders** sind die Arbeit, die durch deinen Betrieb fließt. Siehe [Commercial-Übersicht](#commercial-overview).

**Workflows** enthalten die Automatisierungslogik, die auf Ereignisse reagiert. Siehe [Was ist ein Workflow?](#what-is-a-workflow).

## Die Bausteine auf einen Blick

| Begriff | Was es ist |
|---|---|
| **Job** | Ein Produktionsauftrag, der durch deinen Betrieb läuft |
| **Work Center** | Eine Maschine, ein Mensch, ein Werkzeug oder ein Ort, der Arbeit leistet |
| **Device** | Eine angebundene Maschine, die Daten an CoCoCo sendet |
| **Workflow** | Ein automatisierter Prozess, ausgelöst durch Ereignisse |
| **Policy** | Ein Satz von Zugriffsregeln, der einem User zugewiesen ist |
| **Custom App** | Eine individuelle Oberfläche, gebaut auf der Plattform |

Alle Plattformbegriffe finde im vollständigen [Glossar](#glossary).

## Neu bei CoCoCo?

Starte mit der [Setup-Checkliste](#setup-checklist), um deine Plattform einzurichten.