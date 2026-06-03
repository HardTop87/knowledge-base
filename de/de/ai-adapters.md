---
slug: ai-adapters
category: ai-ml
status: published
lang: de
title: "What are AI Adapters?"
---

## Was ist ein AI Adapter?

Ein AI Adapter ist eine konfigurierte Verbindung zu einem Anbieter für KI-Modelle. Er speichert die Zugangsdaten, die CoCoCo braucht, um das Modell aufzurufen. So können Workflows und AI Agents das Modell nutzen, ohne API-Keys im Code zu haben.

## Unterstützte Adapter-Typen

| Typ | Verbindet mit |
|---|---|
| **OpenAI** | GPT-4 und weitere OpenAI-Modelle |
| **Claude** | Anthropic Claude Modelle |
| **Apple Native** | On-device Modelle über Apple Intelligence |
| **XGBoost** | Die eingebaute ML-Runtime von CoCoCo |

## Einen AI Adapter anlegen

1. Wechsle zu **Menu → AI & ML → AI Adapters**
2. Klicke auf **+ New Adapter**
3. Wähle den **Type**
4. Vergib einen **Name** (z. B. `Claude Sonnet - Production`)
5. Trage die nötigen Zugangsdaten ein:
   - Für **OpenAI** und **Claude**: API-Key und Modellname
6. Klicke auf **Save**

## Adapter nutzen

Ein AI Adapter wird nach dem Anlegen referenziert von:

- **AI Agents**: für Konversations- oder Reasoning-Aufgaben
- **Agent** Workflow Nodes: sendet einen Prompt und verarbeitet die Antwort
- **ML Predict** Nodes: für Inferenz mit XGBoost-Modellen