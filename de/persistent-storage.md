---
slug: persistent-storage
category: custom-apps
status: published
lang: de
title: "Using Persistent Storage in Custom Apps"
---

## Was ist Persistent Storage?

Custom Apps haben Zugriff auf einen einfachen Key-Value-Speicher, der Daten zwischen Sitzungen hält. Anders als JavaScript-Variablen, die beim Seiten-Reload zurückgesetzt werden, überdauern gespeicherte Werte das Neuladen.

## Storage API

```javascript
// Speichern
await window.storage.set('my-key', JSON.stringify({ count: 5 }));

// Lesen
try {
  const result = await window.storage.get('my-key');
  const data = result ? JSON.parse(result.value) : null;
} catch (err) {
  // Key nicht gefunden oder Fehler
}

// Löschen
await window.storage.delete('my-key');

// Keys mit Präfix auflisten
const keys = await window.storage.list('config:');
```

## Persönlicher vs. geteilter Speicher

| Modus | Sichtbar für | Einsatz |
|---|---|---|
| Persönlich (Standard) | Nur aktueller User | Präferenzen, gespeicherte Filter |
| Geteilt (`true` als 3. Arg) | Alle App-Nutzer | Gemeinsame Config, Bestenlisten |

```javascript
await window.storage.set('config', value, true); // geteilt
```

## Grenzen

- Nur Text und JSON, keine Binärdaten
- Keys maximal 200 Zeichen, keine Leerzeichen oder Pfadtrenner
- Werte maximal 5MB pro Key
- Verwandte Daten immer in einem einzigen Key zusammenfassen