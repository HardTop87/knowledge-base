---
slug: create-first-custom-app
category: custom-apps
status: published
lang: en
title: "How to Create Your First Custom App"
---

## Your first Custom App in 5 minutes

## Step 1: Create the app

1. Go to **Menu → Developer → Custom Apps**
2. Click **+ New Custom App**
3. Enter a **Name**, select **Kind: Page**, pick an icon
4. Click **Create**

## Step 2: Write the Template

```html
<div class="p-8 bg-base-100">
  <h1 class="text-2xl font-bold text-base-content mb-4">{{ message }}</h1>
  <button @click="greet" class="btn btn-primary">Say Hello</button>
</div>
```

## Step 3: Write the Script

```javascript
const message = ref('Welcome to my app!');

function greet() {
  message.value = 'Hello from CoCoCo!';
}

const setupReturn = { message, greet };
```

## Step 4: Preview and publish

1. Click **Preview** to open a live test panel
2. Click the button — the message should change
3. Click **Publish** to make the app available
4. Find it in the left sidebar