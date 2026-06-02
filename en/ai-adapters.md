---
slug: ai-adapters
category: ai-ml
status: published
lang: en
title: "What are AI Adapters?"
---

## What is an AI Adapter?

An AI Adapter is a configured connection to an AI model provider. It stores the credentials needed for CoCoCo to call that model — so Workflows and AI Agents can use it without embedding API keys in code.

## Supported adapter types

| Type | Connects to |
|---|---|
| **OpenAI** | GPT-4 and other OpenAI models |
| **Claude** | Anthropic Claude models |
| **Apple Native** | On-device models via Apple Intelligence |
| **XGBoost** | CoCoCo's built-in ML model runtime |

## How to create an AI Adapter

1. Go to **Menu → AI & ML → AI Adapters**
2. Click **+ New Adapter**
3. Select the **Type**
4. Give it a **Name** (e.g. `Claude Sonnet - Production`)
5. Enter the required credentials:
   - For **OpenAI** and **Claude**: API Key and model name
6. Click **Save**

## Using Adapters

Once created, an AI Adapter is referenced by:

- **AI Agents** — for conversational or reasoning tasks
- **Agent** Workflow nodes — sends a prompt and processes the response
- **ML Predict** nodes — for XGBoost model inference