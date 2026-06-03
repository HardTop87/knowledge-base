---
slug: create-iam-policy
category: team-access-rights
status: published
lang: de
title: "How to Create an IAM Policy"
---

## Eine IAM Policy anlegen

1. Wechsle zu **Identity & Access → Policies**
2. Klicke auf **+ Add Policy**
3. Vergib einen **Name** (z. B. `Produktionsleiter`) und optional eine **Description**
4. Klicke auf **+ Add Statement**
5. Setze den **Effect**: `ALLOW` um Zugriff zu gewähren, `DENY` um ihn zu verbieten
6. Klicke auf **+ Add Actions** und wähle die Operationen
   - Suche nach Ressourcennamen (z. B. `Job`, `Device`, `Workflow`)
   - Hake die konkreten Aktionen an (read, create, update, delete)
7. Klicke auf **Save Statement**
8. Füge weitere Statements hinzu, falls nötig
9. Klicke auf **Save Policy**

## Wichtige Regeln

- **DENY schlägt ALLOW immer**: Wenn ein Statement eine Aktion verbietet, ist sie blockiert, egal was andere Policies sagen
- **Eng anfangen**: Es ist einfacher, Berechtigungen nachträglich zu erweitern als zu entziehen
- **Eine Policy pro Rolle**: Das hält Vergabe und Audit übersichtlich

Sobald die Policy gespeichert ist, weise sie einem User zu:

[Eine Policy einem User zuweisen](#assign-policy)