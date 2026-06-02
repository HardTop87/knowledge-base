---
slug: version-history
category: custom-apps
status: published
lang: de
title: "Version History and Rollback"
---

## So funktioniert Versionierung

Jedes Mal, wenn Sie eine Custom App veröffentlichen, speichert CoCoCo einen unveränderlichen Versionsstand mit Template, Script und Server API zu diesem Zeitpunkt.

## Versionshistorie ansehen

1. Öffnen Sie die Custom App im Editor
2. Klicken Sie oben auf **Versions**
3. Die Liste zeigt alle veröffentlichten Versionen mit Zeitstempel und Autor

## Zurückrollen

1. In der Versions-Liste die gewünschte Version finden
2. Auf **Restore** klicken
3. Die gewählte Version wird zur aktiven Arbeitsversion
4. **Publish** klicken, um sie live zu schalten

Rollback löscht keine neueren Versionen. Sie bleiben in der Historie.

## Arbeitsversion vs. veröffentlicht

Der Editor arbeitet immer auf der **Arbeitsversion**. Einem Entwurf, der für User nicht sichtbar ist, bis Sie veröffentlichen. Jede Veröffentlichung erzeugt einen neuen Versionsstand.