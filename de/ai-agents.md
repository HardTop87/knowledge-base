---
slug: ai-agents
category: ai-ml
status: published
lang: de
title: "How to Set Up an AI Agent"
---

## Was ist ein AI Agent?

Ein AI Agent ist ein konfigurierter Assistent, der aus Workflows heraus aufgerufen werden kann. Er kombiniert einen AI Adapter (das zugrundeliegende Modell) mit einer Persona — **Role**, **Goal** und **Backstory** — und optionalen Tools.

## Einen AI Agent anlegen

1. Wechseln Sie zu **Menu → AI & ML → AI Agents**
2. Klicken Sie auf **+ New Agent**
3. Vergeben Sie einen **Name** (z.B. `Job Classifier`)
4. Wählen Sie den **AI Adapter** (das Modell)
5. Definieren Sie die Persona des Agents — **Role**, **Goal** und **Backstory** (sie prägen sein Verhalten)
6. Optional: **Tools** konfigurieren, die der Agent nutzen darf
7. Klicken Sie auf **Save**

> Die Persona (Role / Goal / Backstory) ist der normale Weg, einen Agent zu prägen. Für Spezialfälle können Sie zusätzlich ein optionales **System Prompt Template** angeben, das den generierten Prompt überschreibt, sowie Modellparameter wie Temperature und Max Tokens einstellen.

## Einen Agent in einem Workflow nutzen

1. Fügen Sie eine **Agent** Node in Ihren Workflow ein
2. Wählen Sie den AI Agent
3. Konfigurieren Sie den **Input**: die zu sendende Nachricht oder Daten
4. Der Output der Node enthält die Antwort des Agents

## Typische Einsatzfälle

- **Job-Klassifikation**: Job-Beschreibung empfangen und passendes Work Center zurückgeben
- **Fehlerdiagnose**: Device-Fehler empfangen und eine Lösung vorschlagen
- **Content-Generierung**: Kundennotiz oder Versandetikett entwerfen