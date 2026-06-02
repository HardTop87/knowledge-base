---
slug: version-history
category: custom-apps
status: published
lang: en
title: "Version History and Rollback"
---

## How versioning works

Every time you publish a Custom App, CoCoCo saves an immutable version snapshot containing the Template, Script, and Server API at that moment.

## Viewing version history

1. Open the Custom App in the editor
2. Click **Versions** in the top toolbar
3. The list shows all published versions with timestamp and author

## Rolling back

1. In the Versions list, find the version to restore
2. Click **Restore**
3. The selected version becomes the active working copy
4. Click **Publish** to make it live

Rolling back does not delete newer versions — they remain in the history.

## Working copy vs. published

The editor always works on the **working copy** — a draft invisible to users until published. Publishing creates a new version snapshot.