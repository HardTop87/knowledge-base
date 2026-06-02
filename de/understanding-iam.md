---
slug: understanding-iam
category: team-access-rights
status: published
lang: de
title: "Understanding IAM: Policies, Permissions and Roles"
---

## So funktioniert es

Jeder User in CoCoCo hat eine oder mehrere **Policies** zugewiesen. Eine Policy enthält ein oder mehrere **Statements**. Jedes Statement besagt:

- **Effect**: entweder `ALLOW` oder `DENY`
- **Actions**: welche Operationen erlaubt sind (z.B. Jobs lesen, Workflows anlegen)
- **Resources**: auf welche Daten oder Bereiche sich die Regel bezieht

Bei Konflikten zwischen Policies **gewinnt DENY immer**.

## Die drei eingebauten Policies

CoCoCo bringt drei Standard-Policies mit:

| Policy | Was sie leistet |
|---|---|
| **Full Access** | Gewährt alle Berechtigungen auf der gesamten Plattform |
| **Admin Policy** | Voller Admin-Zugriff, um User, Devices und Config zu verwalten |
| **Read-Only Policy** | Kann alles sehen, aber nichts anlegen, ändern oder löschen |

## Eine eigene Policy erstellen

1. Wechseln Sie zu **Identity & Access → Policies**
2. Klicken Sie auf **+ Add Policy**
3. Vergeben Sie **Name** und **Description**
4. Klicken Sie auf **+ Add Statement**
5. Setzen Sie den **Effect** auf `ALLOW` oder `DENY`
6. Suchen und wählen Sie die gewünschten **Actions**
7. Klicken Sie auf **Save**

Die vollständige Anleitung: [Eine IAM Policy anlegen](#create-iam-policy)

## Policy einem User zuweisen

Siehe: [Eine Policy einem User zuweisen](#assign-policy)

## Teams verwalten

Wenn mehrere User die gleichen Berechtigungen brauchen, nutzen Sie Teams statt jeden User einzeln zu berechtigen. Siehe: [Ein Team anlegen](#create-team)

## Praktische Beispiele

**Produktionsleiter**: Soll Jobs sehen und verwalten, aber nicht die Device-Konfiguration anfassen.
→ Policy mit ALLOW auf `Job`, `Order`, `Component`, `Operation`

**Shopfloor-Mitarbeiter**: Soll nur Fortschritt an Jobs melden.
→ Policy mit ALLOW nur auf Job-Leseaktionen

**Integration Developer**: Braucht vollen Zugriff auf Devices, Networks und Workflows.
→ Die eingebaute `Full Access` Policy zuweisen