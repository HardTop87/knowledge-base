---
slug: setup-checklist
category: getting-started
status: published
lang: de
title: "Setup Checklist"
---

## Bevor Sie starten

Diese Checkliste führt Sie Schritt für Schritt durch die Einrichtung von CoCoCo. Jeder Schritt baut auf dem vorherigen auf. Arbeiten Sie die Schritte der Reihe nach ab, damit alles reibungslos läuft.

## Schritt 1: Laden Sie Ihr Team ein

Bevor Sie irgendetwas anderes tun, holen Sie Ihre Leute auf die Plattform.

1. Wechseln Sie zu **Identity & Access** in der linken Seitenleiste
2. Legen Sie eine Policy an, die zur Rolle passt (z.B. Admin, Read-Only)
3. Legen Sie einen User an und weisen Sie ihm die Policy zu
4. Wiederholen Sie das für jedes Teammitglied

Siehe: [Einen User anlegen](#create-user) · [Eine IAM Policy anlegen](#create-iam-policy) · [Teammitglieder einladen](#inviting-team-members)

## Schritt 2: Network anlegen

Ein Network ist der Container für alle Ihre angebundenen Maschinen und Geräte.

1. Wechseln Sie zu **Menu → Networks** und klicken Sie auf **+ Add Network**
2. Vergeben Sie einen Namen (z.B. `Hauptproduktion`) und speichern Sie

Siehe: [Ein Network anlegen](#create-network)

## Schritt 3: Devices anbinden

1. Wechseln Sie zu **Menu → Devices** und klicken Sie auf **+ Add Device**
2. Wählen Sie das Network und das Protokoll (MQTT, HTTP, JMF oder SQL)
3. Erstellen Sie ein Device Token zur Authentifizierung und speichern Sie

Siehe: [Ein Device anbinden](#add-device) · [Protokolle erklärt](#protocols-explained) · [Device Tokens anlegen und verwalten](#device-tokens)

## Schritt 4: Produktionsstruktur einrichten

1. **Data → Production Cells** → legen Sie eine Cell an (z.B. `Digitaldruck`)
2. **Data → Work Centers** → fügen Sie Ihre Maschinen, Mitarbeiter oder Werkzeuge hinzu
3. Weisen Sie jedes Work Center einer Production Cell zu
4. Ergänzen Sie Capabilities wo nötig

Siehe: [Eine Production Cell anlegen](#create-production-cell) · [Ein Work Center anlegen](#create-work-center) · [Capabilities zuweisen](#assign-capabilities)

## Schritt 5: Tenant-Einstellungen konfigurieren

1. Wechseln Sie zu **Menu → Developer → Config**
2. Legen Sie CONFIG-Einträge für Einstellungen und SECRET-Einträge für Zugangsdaten an

Siehe: [Tenant Config verwalten](#tenant-config)

## Schritt 6: Ersten Workflow bauen

1. Wechseln Sie zu **Menu → Workflows** und klicken Sie auf **+ New Workflow**
2. Definieren Sie einen Trigger, fügen Sie Nodes hinzu und aktivieren Sie den Workflow

Siehe: [Was ist ein Workflow?](#what-is-a-workflow) · [Einen Workflow anlegen](#create-workflow) · [Node Types Referenz](#node-types-reference)

## Schritt 7: Benachrichtigungen einrichten

1. Wechseln Sie zu **Menu → Notification Groups** und legen Sie eine Gruppe an
2. Fügen Sie Empfänger hinzu und verknüpfen Sie die Gruppe mit relevanten Workflows

Siehe: [Notification Groups einrichten](#notification-groups)

## Fertig

Sobald alle sieben Schritte erledigt sind, läuft Ihre Plattform. Nutzen Sie die Referenzartikel, um zu einzelnen Themen tiefer einzusteigen.

Sie sind sich bei einem Begriff unsicher? Siehe das [Glossar](#glossary).