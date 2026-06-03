---
slug: permission-errors
category: troubleshooting
status: published
lang: de
title: "Permission Errors: How to Diagnose"
---

## Den Fehler verstehen

Berechtigungsfehler kommen als `403 Forbidden` oder "Access denied"-Meldungen zurück. Sie bedeuten, dass die Policies des Users die angefragte Aktion nicht erlauben.

## Schritt 1: Betroffenen User ermitteln

Notiere, welcher User oder Service-Account den Fehler bekommt.

## Schritt 2: Seine Policies prüfen

1. Wechsle zu **Identity & Access → Users**
2. Suche den User und öffne **Edit → Policies**
3. Prüfe, welche Policies zugewiesen sind

## Schritt 3: Prüfen, was jede Policy erlaubt

1. Öffne jede Policy
2. Prüfe die Statements auf ALLOW- und DENY-Regeln
3. Suche den Resource-Typ, der zur fehlgeschlagenen Aktion passt (z. B. `Job`, `Workflow`)

## Schritt 4: Nach DENY-Regeln schauen

**DENY gewinnt immer.** Wenn ein Statement die Aktion verbietet, ist sie blockiert, auch wenn ein anderes Statement sie erlaubt.

## Schritt 5: Policy korrigieren

- **Option A**: ALLOW-Statement für die fehlende Aktion hinzufügen
- **Option B**: Das konflikthafte DENY-Statement entfernen
- **Option C**: Eine Policy zuweisen, die die nötigen Berechtigungen bereits enthält

## Bei Bot-Usern und API Tokens

1. Ermittle, welches API Token verwendet wird
2. Prüfe, dass es zu einem User mit den richtigen Policies gehört