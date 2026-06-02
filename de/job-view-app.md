---
slug: job-view-app
category: custom-apps
status: published
lang: de
title: "Building a Job View App"
---

## Was ist eine Job View App?

Eine Job View App ist direkt im Job-Detailbereich eingebettet. Öffnet ein User einen Job, erscheint die App als Abschnitt in dessen Ansicht, neben den Standard-Jobinformationen.

Ideal für: eigene Qualitätschecklisten, maschinenspezifische Parameter, ergänzende Daten aus externen Systemen oder Quick-Action-Buttons.

## Auf den aktuellen Job zugreifen

Die ID des aktuellen Jobs wird automatisch als Prop übergeben:

```javascript
const props = defineProps({ jobId: String });

const job = ref(null);

onMounted(async () => {
  if (props.jobId) {
    const result = await $graphql(`
      query($id: ID!) {
        job(id: $id) { id name status quantity workCenter { name } }
      }
    `, { id: props.jobId });
    job.value = result.data.job;
  }
});

const setupReturn = { job };
```

## Layout

Job View Apps erscheinen in einem begrenzten Panel. Rechnen Sie mit ca. 600 bis 800px Breite.

```html
<div class="p-4 bg-base-100">
  <h3 class="font-bold text-base-content mb-3">Qualitätscheckliste</h3>
  <div v-if="job"><!-- Checklisteninhalt --></div>
</div>
```