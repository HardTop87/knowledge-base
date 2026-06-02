---
slug: train-ml-model
category: ai-ml
status: published
lang: en
title: "How to Train an ML Model"
---

## What is an ML Model in CoCoCo?

CoCoCo includes a built-in machine learning runtime powered by XGBoost. You can train regression or classification models directly on your production data and use them in Workflows for prediction.

| Model type | Predicts |
|---|---|
| **Regression** | A continuous value — delivery time, cost, waste percentage |
| **Classification** | A category — pass/fail, machine type, priority level |

## How to train an ML Model

1. Go to **Menu → AI & ML → ML Models**
2. Click **+ New Model**
3. Enter a **Name** and select the **Type** (Regression or Classification)
4. Select the **Data Query Script** — a Script that returns the training data
5. Configure the **Features** (input columns) and **Target** (what to predict)
6. Click **Train**

Training runs in the background. You are notified when it completes.

## Using a trained model in a Workflow

Add an **ML Predict** node:

1. Select the trained model
2. Map Workflow data to the model's input features
3. The node output contains the prediction

## Retraining

Models can be retrained at any time with updated data. The previous version stays active until the new training succeeds.