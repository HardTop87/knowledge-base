---
slug: ai-agents
category: ai-ml
status: published
lang: en
title: "How to Set Up an AI Agent"
---

## What is an AI Agent?

An AI Agent is a configured assistant that can be invoked from Workflows. It combines an AI Adapter (the underlying model) with a system prompt and optional tools.

## How to create an AI Agent

1. Go to **Menu → AI & ML → AI Agents**
2. Click **+ New Agent**
3. Give it a **Name** (e.g. `Job Classifier`)
4. Select the **AI Adapter** (the model to use)
5. Write a **System Prompt** — defines the agent's behavior and context
6. Optionally configure **Tools** the agent can use
7. Click **Save**

## Using an Agent in a Workflow

1. Add an **Agent** node to your Workflow
2. Select the AI Agent
3. Configure the **Input** — the message or data to send
4. The node output contains the agent's response

## Example use cases

- **Job classification** — receive a job description and return the right work center
- **Error diagnosis** — receive a device error and suggest a resolution
- **Content generation** — draft a customer notification or shipping label