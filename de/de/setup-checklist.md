---
slug: setup-checklist
category: getting-started
status: published
lang: de
title: "Setup Checklist"
---

## Bevor du startest

Diese Checkliste führt dich Schritt für Schritt durch die Einrichtung von CoCoCo. Jeder Schritt baut auf dem vorherigen auf. Arbeite die Schritte der Reihe nach ab, damit alles reibungslos läuft.

## Schritt 1: Lade dein Team ein

Bevor du irgendetwas anderes tust, hole deine Leute auf die Plattform.

1. Wechsle zu **Identity & Access** in der linken Seitenleiste
2. Lege eine Policy an, die zur Rolle passt (z. B. Admin, Read-Only)
3. Lege einen User an und weise ihm die Policy zu
4. Wiederhole das für jedes Teammitglied

Siehe: [Einen User anlegen](#create-user) · [Eine IAM Policy anlegen](#create-iam-policy) · [Teammitglieder einladen](#inviting-team-members)

## Schritt 2: Network anlegen

Ein Network ist der Container für alle deine angebundenen Maschinen und Geräte.

1. Wechsle zu **Menu → Networks** und klicke auf **+ Add Network**
2. Vergib einen Namen (z. B. `Hauptproduktion`) und speichere

Siehe: [Ein Network anlegen](#create-network)

## Schritt 3: Devices anbinden

1. Wechsle zu **Menu → Devices** und klicke auf **+ Add Device**
2. Wähle das Network und das Protokoll (MQTT, HTTP, JMF oder SQL)
3. Erstelle ein Device Token zur Authentifizierung und speichere

Siehe: [Ein Device anbinden](#add-device) · [Protokolle erklärt](#protocols-explained) · [Device Tokens anlegen und verwalten](#device-tokens)

## Schritt 4: Produktionsstruktur einrichten

1. **Data → Production Cells** → lege eine Cell an (z. B. `Digitaldruck`)
2. **Data → Work Centers** → füge deine Maschinen, Mitarbeiter oder Werkzeuge hinzu
3. Weise jedes Work Center einer Production Cell zu
4. Ergänze Capabilities wo nötig

Siehe: [Eine Production Cell anlegen](#create-production-cell) · [Ein Work Center anlegen](#create-work-center) · [Capabilities zuweisen](#assign-capabilities)

## Schritt 5: Tenant-Einstellungen konfigurieren

1. Wechsle zu **Menu → Developer → Config**
2. Lege CONFIG-Einträge für Einstellungen und SECRET-Einträge für Zugangsdaten an

Siehe: [Tenant Config verwalten](#tenant-config)

## Schritt 6: Ersten Workflow bauen

1. Wechsle zu **Menu → Workflows** und klicke auf **+ New Workflow**
2. Definiere einen Trigger, füge Nodes hinzu und aktiviere den Workflow

Siehe: [Was ist ein Workflow?](#what-is-a-workflow) · [Einen Workflow anlegen](#create-workflow) · [Node Types Referenz](#node-types-reference)

## Schritt 7: Benachrichtigungen einrichten

1. Wechsle zu **Menu → Notification Groups** und lege eine Gruppe an
2. Füge Empfänger hinzu und verknüpfe die Gruppe mit relevanten Workflows

Siehe: [Notification Groups einrichten](#notification-groups)

## Fertig

Sobald alle sieben Schritte erledigt sind, läuft deine Plattform. Nutze die Referenzartikel, um zu einzelnen Themen tiefer einzusteigen.

Bist du dir bei einem Begriff unsicher? Siehe das [Glossar](#glossary).