---
slug: inviting-team-members
category: team-access-rights
status: published
lang: de
title: "Inviting Team Members"
---

## Bevor du startest

Stelle sicher, dass mindestens eine Policy angelegt ist, bevor du User einlädst. Eine Policy legt fest, was ein User sehen und tun darf. Falls du noch keine hast, starte hier:

[Eine IAM Policy anlegen](#create-iam-policy)

## Einen User anlegen

1. Wechsle zu **Identity & Access** in der linken Seitenleiste
2. Klicke auf **+ Create User** in der Users-Karte
3. Gib die **E-Mail-Adresse** der Person ein
4. Gib den **vollständigen Namen** ein (optional, aber empfohlen)
5. Wähle den **User Type**:
   - **Human**: Ein reguläres Teammitglied mit eigenem Login
   - **Kiosk**: Ein gemeinsam genutzter Terminal-Account mit eigener Kiosk-Oberfläche
   - **Bot**: Ein Service-Account für automatisierte Prozesse
6. Klicke auf **Save**

Die Person erhält eine E-Mail-Einladung zum Setzen ihres Passworts.

## Policy zuweisen

Nach dem Anlegen des Users weise eine Policy zu, um die Berechtigungen zu steuern:

1. Öffne den User über **Edit**
2. Scrolle zum Abschnitt **Policies**
3. Klicke auf **+ Add Policy** und wähle die passende Policy
4. Speichern

## User Types im Überblick

| Typ | Einsatz |
|---|---|
| Human | Reguläres Teammitglied mit vollem Login und eigenen Zugangsdaten |
| Kiosk | Shopfloor-Terminal, vereinfachte Oberfläche, gemeinsam genutzt |
| Bot | Automatisierter Service-Account, kein Login, nur API-Zugriff |