---
slug: daisy-ui-theming
category: custom-apps
status: published
lang: de
title: "How to Use DaisyUI for Theming"
---

## DaisyUI in Custom Apps

Die Custom-App-Runtime von CoCoCo beinhaltet DaisyUI. Eine Komponenten-Bibliothek auf Basis von Tailwind CSS. Die Semantikklassen von DaisyUI passen sich automatisch an das Light- und Dark-Theme der Plattform an.

## Die goldene Regel

Nutze für Farben und Hintergründe immer die Semantikklassen von DaisyUI. Nie fest kodierte Farbwerte für UI-Elemente.

```html
<!-- Richtig -->
<div class="bg-base-100 text-base-content border border-base-300">

<!-- Vermeiden -->
<div style="background: white; color: black;">
```

## Wichtige Semantikklassen

| Klasse | Bedeutung |
|---|---|
| `bg-base-100` | Seitenhintergrund |
| `bg-base-200` | Erhöhte Fläche (Karten, Panels) |
| `text-base-content` | Primäre Textfarbe |
| `border-base-300` | Standard-Border |
| `bg-primary` | Primäre Markenfarbe |
| `text-primary-content` | Text auf primärem Hintergrund |
| `bg-error` | Fehlerzustand |

## DaisyUI-Komponenten

```html
<button class="btn btn-primary">Speichern</button>
<div class="badge badge-success">Aktiv</div>
<div class="alert alert-warning">Prüfe diese Einstellung</div>
<input class="input input-bordered w-full" />
```

## Dark Mode

DaisyUI liest die `dark` Klasse am `html` Element des Iframes automatisch. Mit Semantikklassen funktioniert das Theming in beiden Modi ohne JavaScript.