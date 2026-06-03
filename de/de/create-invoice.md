---
slug: create-invoice
category: commercial
status: published
lang: de
title: "How to Create an Invoice"
---

## Invoice-Typen

| Typ | Einsatz |
|---|---|
| **Invoice** | Standard-Rechnung |
| **Credit Note** | Korrigiert oder storniert eine vorherige Rechnung |
| **Proforma** | Vorläufige Rechnung für Zoll oder Vorauskasse |

## Ein Invoice anlegen

1. Wechsle zu **Data → Commercial → Invoices**
2. Klicke auf **+ New Invoice**
3. Wähle den **Customer** und optional den verknüpften **Order**
4. Füge **Line Items** mit Menge und Betrag ein
5. Setze **Due date** und **Payment terms**
6. Klicke auf **Save as Draft** und dann auf **Issue**, wenn alles passt

## Direkt aus einem Order erzeugen

1. Öffne den abgeschlossenen Order
2. Klicke auf **Create Invoice**
3. Die Line Items werden aus dem Order übernommen
4. Anpassen falls nötig und **Issue** klicken

## Credit Notes

1. Öffne die Original-Rechnung
2. Klicke auf **Create Credit Note**
3. Passe die Line Items an den zu gutschreibenden Betrag an
4. Credit Note ausstellen

## Rechnungs- und Zahlungsstatus

Ein Invoice trägt seinen eigenen Status vom Entwurf bis zum Ausgleich:

**Draft → Sent → Partially Paid → Paid** — und kann außerdem **Overdue**, **Void** (storniert) oder **Credited** (durch eine Credit Note ausgeglichen) sein.

Die Zahlung wird separat verfolgt, sodass der Zahlungsstand auf einen Blick sichtbar ist:

**Unpaid → Partially Paid → Paid** — sowie **Overdue**, **Refunded** oder **Written Off**.