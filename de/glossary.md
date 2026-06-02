---
slug: glossary
category: getting-started
status: published
lang: de
title: "Glossary"
---

## A

**AI Adapter**: Eine konfigurierte Verbindung zu einem Anbieter für KI-Modelle (OpenAI, Claude, Apple Native, XGBoost). Speichert die Zugangsdaten, damit Workflows und AI Agents das Modell nutzen können, ohne API-Keys im Code zu haben. Siehe [Was sind AI Adapter?](#ai-adapters).

**AI Agent**: Ein konfigurierter KI-Assistent, der einen AI Adapter mit einem System-Prompt und optionalen Tools kombiniert. Wird aus Workflows heraus aufgerufen. Siehe [Einen AI Agent einrichten](#ai-agents).

**API Token**: Persönliche Zugangsdaten zur Authentifizierung gegenüber der CoCoCo API. Ist an ein User-Konto gebunden und erbt dessen Berechtigungen. Siehe [API Tokens anlegen und verwalten](#api-tokens).

## B

**Bot**: Ein User-Typ für automatisierte Service-Accounts. Kein Login, nur API-Zugriff über ein Token.

## C

**Capability**: Eine Eigenschaft eines Work Centers, die beschreibt, was dieses leisten kann. Etwa welche Jobtypen es bearbeitet, welche Medienformate es unterstützt. Wird von der Produktionsplanung zur Job-Zuweisung genutzt. Siehe [Capabilities zuweisen](#assign-capabilities).

**Config**: Ein nicht-sensibler Key-Value-Eintrag in der Tenant Config. Der Wert bleibt nach dem Speichern in der Oberfläche sichtbar. Siehe [Tenant Config verwalten](#tenant-config).

**Controller**: Eine Brücke zwischen einem physischen Device-Netz und CoCoCo, die Protokollübersetzung und Nachrichten-Routing übernimmt. Siehe [Einen Controller anlegen](#add-controller).

**Custom Action**: Eine gespeicherte, wiederverwendbare Lua-Funktion, aufrufbar aus Workflow Script Nodes.

**Custom App**: Eine individuelle Oberfläche, gebaut auf CoCoCo mit Vue.js (Template), JavaScript (Script) und optional Lua (Server API). Erscheint als Page, Dashboard-Tab, Kiosk oder Job View. Siehe [Was sind Custom Apps?](#what-are-custom-apps).

**Custom Data Table**: Eine selbst definierte Datenbanktabelle in CoCoCo für strukturierte Daten, die nicht ins Standardmodell passen. Siehe [Custom Data Tables anlegen](#custom-data-tables).

## D

**Dashboard App**: Ein Custom App Typ, der als Tab auf der Dashboards-Seite erscheint. Siehe [Eine Dashboard Tab App bauen](#dashboard-tab-app).

**DENY**: Ein IAM Statement Effect, der eine Aktion verbietet. DENY überschreibt ALLOW immer, unabhängig von anderen Policies. Siehe [IAM verstehen](#understanding-iam).

**Device**: Eine physische Maschine, ein Sensor oder ein System, das in CoCoCo registriert ist und Daten über MQTT, HTTP, JMF oder SQL sendet. Siehe [Ein Device anbinden](#add-device).

**Device Token**: Zugangsdaten, die an ein konkretes Device gebunden sind (nicht an einen User) und Requests des Devices an CoCoCo authentifizieren. Siehe [Device Tokens anlegen und verwalten](#device-tokens).

## E

**Estimate**: Ein kaufmännisches Angebot an den Kunden zur Freigabe, bevor daraus ein Order entsteht. Siehe [Ein Estimate anlegen](#create-estimate).

**Execution**: Ein einzelner Durchlauf eines Workflows, vom Trigger bis zum Abschluss oder zum Fehler. Siehe [Workflow Executions überwachen](#monitor-executions).

## H

**HITL**: Human-in-the-Loop. Ein Workflow-Muster, bei dem die Automatisierung für eine menschliche Entscheidung pausiert. Siehe [Human-in-the-Loop Workflows](#hitl-workflows).

**HTTP**: Ein Device-Protokoll für die Anbindung von Systemen über Web-Requests. Unterstützt ein- und ausgehende Kommunikation. Siehe [Protokolle erklärt](#protocols-explained).

## I

**IAM**: Identity and Access Management. Das System aus Users, Policies, Statements und Teams, das regelt, wer was in CoCoCo tun darf. Siehe [IAM verstehen](#understanding-iam).

**Incoming Webhook**: Eine eindeutige URL, an die externe Systeme POST-Requests senden, um einen CoCoCo Workflow auszulösen. Siehe [Incoming Webhooks nutzen](#incoming-webhooks).

**Invoice**: Eine Rechnung. CoCoCo unterstützt Standard-Invoices, Credit Notes und Proformas. Siehe [Ein Invoice anlegen](#create-invoice).

## J

**JDF**: Job Definition Format. Ein XML-basierter Standard zur Übergabe von Jobparametern an CIP4-kompatible Druckmaschinen. Siehe [Protokolle erklärt](#protocols-explained).

**JMF**: Job Messaging Format. Ein Echtzeit-Messaging-Protokoll für JDF-kompatible Geräte. Nur ausgehend. Siehe [Protokolle erklärt](#protocols-explained).

**Job**: Die zentrale Produktionseinheit in CoCoCo. Ein Stück Arbeit, das über die Produktionsfläche läuft.

**Job View App**: Eine Custom App, die im Job-Detailbereich eingebettet wird. Siehe [Eine Job View App bauen](#job-view-app).

## K

**Kiosk App**: Eine Custom App im Vollbildmodus für gemeinsam genutzte Shopfloor-Terminals. Nur Kiosk-User haben Zugriff. Siehe [Eine Kiosk App bauen](#kiosk-app).

**Kiosk User**: Ein User-Typ für gemeinsam genutzte Shopfloor-Terminals mit vereinfachter Oberfläche und Zugriff nur auf Kiosk Apps.

## L

**Lua**: Die Skriptsprache für CoCoCo Scripts, Custom Actions und Server-API-Code. Siehe [Lua Playground: Erste Schritte](#lua-playground).

## M

**MCP**: Model Context Protocol. Ein offener Standard zur Anbindung von KI-Assistenten an externe Tools. CoCoCo stellt einen MCP-Server unter `/mcp` bereit. Siehe [Was ist der CoCoCo MCP Server?](#mcp-server).

**Metrik**: Ein strukturierter Datenpunkt, den ein Device während der Produktion sendet. Zum Beispiel Maschinenstatus, Geschwindigkeit oder Fehlercodes. Siehe [Metriken verstehen](#understanding-metrics).

**ML-Modell**: Ein Machine-Learning-Modell, das in CoCoCo mit XGBoost trainiert wird. Unterstützt Regression und Klassifikation. Siehe [Ein ML-Modell trainieren](#train-ml-model).

**MQTT**: Ein leichtgewichtiges Publish/Subscribe-Protokoll für Maschinendaten in Echtzeit. Unterstützt ein- und ausgehende Kommunikation. Siehe [Protokolle erklärt](#protocols-explained).

## N

**Network**: Ein logischer Container für angebundene Devices, der ihren Kommunikationskanal bereitstellt. Siehe [Ein Network anlegen](#create-network).

**Node**: Ein einzelner Verarbeitungsschritt in einem Workflow. Zum Beispiel Transformation, API-Aufruf, Condition oder Benachrichtigung. Siehe [Node Types Referenz](#node-types-reference).

**Notification Group**: Eine benannte Empfängerliste, an die Workflows Nachrichten senden können. Siehe [Notification Groups einrichten](#notification-groups).

## O

**Order**: Ein bestätigter Produktionsauftrag, der einen Job auf der Produktionsfläche erzeugt. Siehe [Einen Order anlegen](#create-order).

## P

**Page App**: Eine Custom App, die als eigenständige Seite in der linken Seitenleiste erscheint. Siehe [Eine Sidebar Page App bauen](#sidebar-page-app).

**Policy**: Ein Satz von IAM Statements (ALLOW/DENY-Regeln), der Usern oder Teams zugewiesen ist und deren Berechtigungen steuert. Siehe [IAM verstehen](#understanding-iam).

**Production Cell**: Eine benannte Gruppe von Work Centers, die einen funktionalen Bereich der Produktionsfläche darstellt (z.B. Digitaldruck). Siehe [Eine Production Cell anlegen](#create-production-cell).

**Purchase Order (PO)**: Ein Dokument, das an einen Lieferanten gesendet wird, um Waren oder Leistungen zu bestellen. Siehe [Purchase Orders verwalten](#purchase-orders).

## S

**Script**: Eine gespeicherte, wiederverwendbare Lua-Funktion. Rollen: Script, JDF Template, JMF Template, ML Data Query. Siehe [Scripts nutzen](#scripts).

**Secret**: Ein sensibler Key-Value-Eintrag in der Tenant Config. Der Wert ist nach dem Speichern ausgeblendet und nicht mehr auslesbar. Siehe [Tenant Config verwalten](#tenant-config).

**Server API**: Der Lua-Teil einer Custom App, der serverseitig läuft und für sichere Datenzugriffe oder privilegierte Operationen genutzt wird. Siehe [Server API (Lua) in Custom Apps](#server-api-lua).

**Shift Definition**: Ein Zeitplan, der festlegt, wann ein Work Center in Betrieb ist. Siehe [Shift Definitions einrichten](#shift-definitions).

**SQL**: Ein Protokoll zur Anbindung von CoCoCo an externe Datenbanken. Nur ausgehend. Siehe [Protokolle erklärt](#protocols-explained).

**Statement**: Eine IAM-Regel mit Effect (ALLOW oder DENY), Actions und Resources innerhalb einer Policy.

## T

**Task**: Ein menschlicher Aufgaben-Eintrag, den ein HITL Workflow erzeugt. Erscheint im My-Tasks-Bereich des Zuständigen. Siehe [Human-in-the-Loop Workflows](#hitl-workflows).

**Team**: Eine benannte Gruppe von Usern, die sich Policies und Berechtigungen teilen. Siehe [Ein Team anlegen](#create-team).

**Template**: In Custom Apps das Vue.js HTML-Fragment, das die UI definiert. Bezeichnet auch JDF/JMF Template Scripts zur Erzeugung von Maschinentickets. Siehe [Templates anlegen](#templates).

**Tenant Config**: Ein sicherer Key-Value-Speicher für plattformweite Einstellungen (Config) und Zugangsdaten (Secrets). Siehe [Tenant Config verwalten](#tenant-config).

**Trigger**: Das Auslöseereignis eines Workflows. Job Event, Device Metric, Schedule, Webhook oder Manual. Siehe [Einen Workflow anlegen](#create-workflow).

## U

**User**: Eine Person oder ein Service-Account mit Zugriff auf CoCoCo. Typen: Human, Kiosk, Bot. Siehe [Teammitglieder einladen](#inviting-team-members).

## W

**Work Center**: Jede Produktionsressource, die Arbeit leistet oder unterstützt. Zum Beispiel Maschine, Mensch, Werkzeug oder Ort. Siehe [Ein Work Center anlegen](#create-work-center).

**Workflow**: Ein automatisierter Prozess, ausgelöst durch Ereignisse, der aus einem Trigger und einer Abfolge von Nodes besteht. Siehe [Was ist ein Workflow?](#what-is-a-workflow).

## X

**XGBoost**: Der Machine-Learning-Algorithmus hinter den ML-Modellen in CoCoCo. Unterstützt Regression und Klassifikation.