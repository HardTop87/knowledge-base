---
slug: inviting-team-members
category: team-access-rights
status: published
lang: de
title: "Inviting Team Members"
---

## Bevor Sie starten

Stellen Sie sicher, dass mindestens eine Policy angelegt ist, bevor Sie User einladen. Eine Policy legt fest, was ein User sehen und tun darf. Falls Sie noch keine haben, starten Sie hier:

[Eine IAM Policy anlegen](#create-iam-policy)

## Einen User anlegen

1. Wechseln Sie zu **Identity & Access** in der linken Seitenleiste
2. Klicken Sie auf **+ Create User** in der Users-Karte
3. Geben Sie die **E-Mail-Adresse** der Person ein
4. Geben Sie den **vollständigen Namen** ein (optional, aber empfohlen)
5. Wählen Sie den **User Type**:
   - **Human**: Ein reguläres Teammitglied mit eigenem Login
   - **Kiosk**: Ein gemeinsam genutzter Terminal-Account mit eigener Kiosk-Oberfläche
   - **Bot**: Ein Service-Account für automatisierte Prozesse
6. Klicken Sie auf **Save**

Die Person erhält eine E-Mail-Einladung zum Setzen ihres Passworts.

## Policy zuweisen

Nach dem Anlegen des Users weisen Sie eine Policy zu, um die Berechtigungen zu steuern:

1. Öffnen Sie den User über **Edit**
2. Scrollen Sie zum Abschnitt **Policies**
3. Klicken Sie auf **+ Add Policy** und wählen Sie die passende Policy
4. Speichern

## User Types im Überblick

| Typ | Einsatz |
|---|---|
| Human | Reguläres Teammitglied mit vollem Login und eigenen Zugangsdaten |
| Kiosk | Shopfloor-Terminal, vereinfachte Oberfläche, gemeinsam genutzt |
| Bot | Automatisierter Service-Account, kein Login, nur API-Zugriff |