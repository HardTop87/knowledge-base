---
slug: train-ml-model
category: ai-ml
status: published
lang: de
title: "How to Train an ML Model"
---

## Was ist ein ML-Modell in CoCoCo?

CoCoCo hat eine eingebaute Machine-Learning-Runtime auf Basis von XGBoost. Sie können Regressions- oder Klassifikationsmodelle direkt auf Ihren Produktionsdaten trainieren und in Workflows für Vorhersagen nutzen.

| Modelltyp | Sagt voraus |
|---|---|
| **Regression** | Einen kontinuierlichen Wert: Lieferzeit, Kosten, Ausschuss in Prozent |
| **Classification** | Eine Kategorie: pass/fail, Maschinentyp, Prioritätsstufe |

## Ein ML-Modell trainieren

1. Wechseln Sie zu **Menu → AI & ML → ML Models**
2. Klicken Sie auf **+ New Model**
3. Vergeben Sie einen **Name** und wählen Sie den **Type** (Regression oder Classification)
4. Wählen Sie das **Data Query Script**: ein Script, das die Trainingsdaten liefert
5. Konfigurieren Sie die **Features** (Eingangsspalten) und das **Target** (was vorhergesagt wird)
6. Klicken Sie auf **Train**

Das Training läuft im Hintergrund. Sie werden benachrichtigt, wenn es fertig ist.

## Ein trainiertes Modell in einem Workflow nutzen

Fügen Sie eine **ML Predict** Node ein:

1. Wählen Sie das trainierte Modell
2. Mappen Sie Workflow-Daten auf die Features des Modells
3. Der Output der Node enthält die Vorhersage

## Erneut trainieren

Modelle können jederzeit mit neuen Daten nachtrainiert werden. Die vorherige Version bleibt aktiv, bis das neue Training erfolgreich abgeschlossen ist.