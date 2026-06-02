---
slug: create-first-custom-app
category: custom-apps
status: published
lang: de
title: "How to Create Your First Custom App"
---

## Ihre erste Custom App in 5 Minuten

## Schritt 1: App anlegen

1. Wechseln Sie zu **Menu → Developer → Custom Apps**
2. Klicken Sie auf **+ New Custom App**
3. Vergeben Sie einen **Name**, wählen Sie **Kind: Page** und ein Icon
4. Klicken Sie auf **Create**

## Schritt 2: Template schreiben

```html
<div class="p-8 bg-base-100">
  <h1 class="text-2xl font-bold text-base-content mb-4">{{ message }}</h1>
  <button @click="greet" class="btn btn-primary">Sag Hallo</button>
</div>
```

## Schritt 3: Script schreiben

```javascript
const message = ref('Willkommen in meiner App!');

function greet() {
  message.value = 'Hallo von CoCoCo!';
}

const setupReturn = { message, greet };
```

## Schritt 4: Vorschau und Veröffentlichung

1. Klicken Sie auf **Preview**. Ein Live-Test-Panel öffnet sich
2. Klicken Sie auf den Button. Die Nachricht sollte sich ändern
3. Klicken Sie auf **Publish**, damit die App verfügbar wird
4. Finden Sie sie in der linken Seitenleiste