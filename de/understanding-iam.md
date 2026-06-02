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

## Die eingebaute Full-Access-Policy

CoCoCo bringt eine einzige eingebaute Policy mit: **Full Access** — sie gewährt alle Berechtigungen auf der gesamten Plattform und sollte nur Usern zugewiesen werden, die wirklich uneingeschränkten Zugriff benötigen.

Alle weiteren Policies — etwa eine Nur-Lese- oder rollenspezifische Policy — werden selbst angelegt, passend zur Arbeitsweise des Teams (siehe unten).

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