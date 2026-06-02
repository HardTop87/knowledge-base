---
slug: create-iam-policy
category: team-access-rights
status: published
lang: de
title: "How to Create an IAM Policy"
---

## Eine IAM Policy anlegen

1. Wechseln Sie zu **Identity & Access → Policies**
2. Klicken Sie auf **+ Add Policy**
3. Vergeben Sie einen **Name** (z.B. `Produktionsleiter`) und optional eine **Description**
4. Klicken Sie auf **+ Add Statement**
5. Setzen Sie den **Effect**: `ALLOW` um Zugriff zu gewähren, `DENY` um ihn zu verbieten
6. Klicken Sie auf **+ Add Actions** und wählen Sie die Operationen
   - Suchen Sie nach Ressourcennamen (z.B. `Job`, `Device`, `Workflow`)
   - Haken Sie die konkreten Aktionen an (read, create, update, delete)
7. Klicken Sie auf **Save Statement**
8. Fügen Sie weitere Statements hinzu, falls nötig
9. Klicken Sie auf **Save Policy**

## Wichtige Regeln

- **DENY schlägt ALLOW immer**: Wenn ein Statement eine Aktion verbietet, ist sie blockiert, egal was andere Policies sagen
- **Eng anfangen**: Es ist einfacher, Berechtigungen nachträglich zu erweitern als zu entziehen
- **Eine Policy pro Rolle**: Das hält Vergabe und Audit übersichtlich

Sobald die Policy gespeichert ist, weisen Sie sie einem User zu:

[Eine Policy einem User zuweisen](#assign-policy)