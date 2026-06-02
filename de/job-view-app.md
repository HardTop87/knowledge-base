---
slug: job-view-app
category: custom-apps
status: published
lang: de
title: "Building a Job View App"
---

## Was ist eine Job-View-App?

Eine Job-View-App ist direkt im Job-Detailbereich eingebettet. Öffnet ein Nutzer einen
Job, erscheint die App als Abschnitt innerhalb dieser Job-Ansicht — neben den
Standard-Job-Informationen.

Ideal für: eigene Qualitäts-Checklisten, maschinenspezifische Parameter, ergänzende
Daten aus externen Systemen oder schnelle Aktions-Buttons.

## Zugriff auf den aktuellen Job

Die ID des aktuellen Jobs wird als Prop übergeben. Hole die Daten über einen
Server-Handler (Client ruft `window.rpc`, der Handler fragt mit `ctx.graphql` ab):

Server-API (`serverApi.lua`):

```lua
exports = {}

function exports.getJob(input)
  local res = ctx.graphql.query([[
    query($id: JobID!) {
      getJob(id: $id) { id name status quantity }
    }
  ]], { id = input.jobId })
  return { status = "ok", result = res.data.getJob }
end
```

Script (Client):

```javascript
const props = defineProps({ jobId: String });
const job = ref(null);

onMounted(async () => {
  if (props.jobId) {
    const r = await window.rpc('getJob', { jobId: props.jobId });
    job.value = r.result;
  }
});

const setupReturn = { job };
```

Der Job-Node-Typ ist `JobState`; seine Felder direkt abfragen (es gibt kein
`workCenter`-Feld — Job-/Ressourcen-Bezüge laufen über `operations`).

## Layout

Job-View-Apps erscheinen in einem schmalen Panel. Auf ca. 600–800px Breite auslegen.

```html
<div class="p-4 bg-base-100">
  <h3 class="font-bold text-base-content mb-3">Quality Checklist</h3>
  <div v-if="job"><!-- checklist content --></div>
</div>
```
