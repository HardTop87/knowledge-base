---
slug: commercial-overview
category: commercial
status: published
lang: de
title: "Commercial Overview"
---

## Das Commercial-Modul

Das Commercial-Modul von CoCoCo deckt den kompletten kaufmännischen Lebenszyklus der Druckproduktion ab. Von der Kalkulation und Angebotserstellung über die Auftragsabwicklung bis zu Rechnung und Einkauf.

| Bereich | Beschreibung |
|---|---|
| **Customers & Suppliers** | Kontaktdatenbank für alle Geschäftsbeziehungen |
| **Estimates** | Angebote zur Freigabe durch den Kunden |
| **Orders** | Bestätigte Produktionsaufträge |
| **Invoices** | Rechnungsdokumente inklusive Gutschriften und Proformas |
| **Purchase Orders** | Bestellungen bei Lieferanten |

## Order-Lebenszyklus

**Draft → Confirmed → In Production → Partially Shipped → Shipped → Delivered → Completed**

Orders können jederzeit vor der Lieferung auch **Cancelled** werden.

## Estimate-Lebenszyklus

**Draft → Sent → Accepted** (oder Rejected, Expired, Revised)

Sobald akzeptiert, wird aus dem Estimate direkt ein Order.

## Versand-Lebenszyklus

Jede Sendung zu einem Order wird einzeln verfolgt:

**Draft → Ready for Pickup → Picked Up → In Transit → Out for Delivery → Delivered**

Eine Sendung kann auch in **Failed Delivery**, **Returned** oder **Cancelled** enden. Das steuert die oben genannten Order-Status **Partially Shipped** und **Shipped**.

## Verzahnung mit der Produktion

Wenn ein Order bestätigt wird, entsteht ein Job auf der Produktionsfläche. Den Fortschritt verfolge unter **Data → Production → Jobs**.

## Quick Links

- [Kunden und Lieferanten verwalten](#customers-suppliers)
- [Ein Estimate anlegen](#create-estimate)
- [Einen Order anlegen](#create-order)
- [Ein Invoice anlegen](#create-invoice)
- [Purchase Orders verwalten](#purchase-orders)