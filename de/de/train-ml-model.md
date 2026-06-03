---
slug: train-ml-model
category: ai-ml
status: published
lang: de
title: "How to Train an ML Model"
---

## Was ist ein ML-Modell in CoCoCo?

CoCoCo hat eine eingebaute Machine-Learning-Runtime auf Basis von XGBoost. Du kannst Regressions- oder Klassifikationsmodelle direkt auf deinen Produktionsdaten trainieren und in Workflows für Vorhersagen nutzen.

| Modelltyp | Sagt voraus |
|---|---|
| **Regression** | Einen kontinuierlichen Wert: Lieferzeit, Kosten, Ausschuss in Prozent |
| **Classification** | Eine Kategorie: pass/fail, Maschinentyp, Prioritätsstufe |

## Ein ML-Modell trainieren

1. Wechsle zu **Menu → AI & ML → ML Models**
2. Klicke auf **+ New Model**
3. Vergib einen **Name** und wähle den **Type** (Regression oder Classification)
4. Definiere die **Trainingsdaten-Query** — eine SQL-Query, die die Trainingszeilen liefert (`dataQuerySQL`)
5. Wähle die **Target**-Spalte (`targetColumn`) und die **Feature**-Spalten (`featureColumns`)
6. Klicke auf **Train**

Das Training läuft im Hintergrund. Du wirst benachrichtigt, wenn es fertig ist.

## Ein trainiertes Modell in einem Workflow nutzen

Füge eine **ML Predict** Node ein:

1. Wähle das trainierte Modell
2. Mappe Workflow-Daten auf die Features des Modells
3. Der Output der Node enthält die Vorhersage

## Erneut trainieren

Modelle können jederzeit mit neuen Daten nachtrainiert werden. Die vorherige Version bleibt aktiv, bis das neue Training erfolgreich abgeschlossen ist.