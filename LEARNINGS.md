# LEARNINGS — CoCoCo Plattform & KB-Pflege

Festgehaltene, **gegen die Plattform verifizierte** Fakten und ein Playbook „wie
frage/prüfe ich was". Ziel: nicht zweimal dieselben Fehler machen. Jeder Eintrag
ist markiert: **[VERIFIZIERT test9]** = live gegen die Referenzumgebung geprüft ·
**[ALT cococo-de]** = nur gegen die ältere Version geprüft, vor Nutzung neu prüfen ·
**[OFFEN]** = noch nicht verifiziert.

Stand: bis einschließlich der Recherchephase (A-Sektion Lua + Kern-B-Sektion Schema).

---

## 0. Umgebungen & Versionen  [VERIFIZIERT test9]

- Es gibt **zwei API-Stufen** (erkennbar an MCP-Tool-Oberflächen + Live-Checks):
  - **Älter:** `cococo-de`, `CoCoCo`, `cococo-alex`
  - **Neuer (Referenz):** `cococo-test9`, `cococo-sql-durst`
- **Referenz für „aktuelle Plattform" = `cococo-test9`.** Die KB dokumentiert diese Version.
  (Entscheidung des Nutzers.) `cococo-de` läuft auf der älteren Version.
- Die KB-**App** liegt in `cococo-de`: `cap_01KP75ER4GF8BAXPA6F1TY3W4T`, handle `knowledge-base`.
  Pushes gehen dorthin, aber der **Inhalt beschreibt test9**.
- Zum Verifizieren immer die `cococo-test9:`-Tools verwenden.

## 1. Playbook — wie prüfe ich was

- **Lua-API-Oberfläche:** `search_lua_api(query, role)`. Trick: eine **absichtlich
  nicht passende** Query (z.B. `"tenant config settings get value"`) liefert die
  **vollständige Liste** der verfügbaren APIs für die Rolle. Rollen: `SCRIPT`,
  `CUSTOM_APP`, `INTEGRATION`, `EDGE_APP`.
- `get_lua_type_definitions` ist autoritativ, **timeoutet aber auf test9** → in der
  Praxis die search_lua_api-Fallbackliste nutzen.
- **GraphQL:** `validate_graphql_query` (führt nichts aus; nennt ungültige Felder und
  **schlägt korrekte vor**, z.B. updateJob→upsertJob). `execute_graphql_query` für
  read-only Live-Checks **und Introspektion** (`__type(name:…){ enumValues / fields }`).
  Introspektion funktioniert auf test9.
- **Typ-Benennung:** Entitätstypen heißen **`<X>State`** (z.B. `JobState`,
  `WorkCenterState`). Es gibt **keinen** Typ `Job`. Also `JobState` introspizieren.
- **Node-Typen:** `list_node_types`. **Mutationen** haben echte Seiteneffekte →
  niemals gegen Live-Tenants ausführen; nur `validate_graphql_query`.
- **MicroSQL (Reporting-Engine):** Spalten **voll qualifizieren** (`tabelle.spalte`);
  `ORDER BY` braucht explizit `ASC`/`DESC`; Queries einfach halten (Aliase/JOINs
  teils nicht unterstützt).
- **`read_custom_app`** liefert große Payloads → landet in
  `/mnt/user-data/tool_results`, mit Python parsen. Inhalt steckt im `script` als
  JS-Literale: `CATEGORIES` (Array), `ARTICLES_CONTENT` (EN, einfache Quotes),
  `ARTICLES_CONTENT_DE` (DE, Backtick-Templates), `I18N` (en/de). Literale **per Node
  auswerten** (string-bewusste Grenzfindung), nicht per Regex.
- **Disziplin:** Auf der Live-KB-App nur lesen; Pushes bewusst & gebündelt. Build über
  `build/build_to_app.py` (Round-Trip verifiziert: wertgleich + Nicht-Daten-Code
  byte-identisch).
- test9-MCP **timeoutet zeitweise** (`get_lua_type_definitions`, eine listIAMPolicies-
  Query) → ggf. erneut versuchen / Connector neu starten.

## 2. Lua-Runtime (neue Version)  [VERIFIZIERT test9]

- Custom-App-Servermodell = globale **`exports`-Tabelle (Engine v2)**.
  **`ctx.rpc` ist der v1-Seitenkanal (Alt)** — für v2 nicht dokumentieren.
- **CUSTOM_APP-APIs:** `ctx.graphql.query(query, vars)`,
  `ctx.dataContainer.get/put/delete` (nur Custom-App, persistent),
  `ctx.script.load(name)`, `ctx.sql.query(sql)`, `ctx.ml.predict/systemPredict`,
  `ctx.device.http/sql`, `ctx.edgeApp.invoke(handle, payload?)`,
  `ctx.notify.send({ group?|recipient?, subject?, body, metadata? })`,
  `ctx.cache.get/set/delete` (Tenant-Redis, **4KB**-Limit),
  `ctx.time.now()/nowIso()` (**`os.*` ist gesperrt**), `ctx.json.decode/encode`,
  `ctx.log.info/warn/error`.
- **SCRIPT-APIs:** wie oben, **ohne** `ctx.dataContainer`. Ausdrücklich **nicht**
  verfügbar: `ctx.dataContainer` (nur Custom-App), `ctx.rpc` (v1), `ctx.integration.*`
  (nur Integrationen).
- **Existiert NICHT (keine Rolle):** `ctx.config`, generisches `ctx.http` (nur
  `ctx.device.http`), `ctx.template`/`ctx.template.render`. KB-Zeilen mit
  `cococo.config`/`http`/`template` haben **kein** ctx-Äquivalent → entfernen.
- **Logging:** `ctx.log.info/warn/error` (strukturiert; 2. Arg = attrs-Tabelle).
  **`print`/`warn` sind in v2 aus der Sandbox entfernt** → nie `print` verwenden.
- **`ctx.device.sql`**-Optionen: `{ sql, params }` (v2). (Alt cococo-de: `{ query, bindings }`.)
- **`ctx.device.http`**-Optionen: `{ method?, path?, headers?, body?, query?, timeoutMs? }`.

## 3. GraphQL-Fakten (neue Version)  [VERIFIZIERT test9]

- List-Query: **`listJobs(first, after, filter, sort)`** — es gibt **kein** `jobs`.
- Mutation: **`upsertJob(input: …)`** — es gibt **kein** `updateJob` (Validator schlägt
  upsertJob/deleteJob/updateConfig/updateWorkflow vor). Exakten Input-Typnamen beim
  Schreiben des Beispiels nochmal gegen test9 bestätigen.
- Job-Node-Typ = **`JobState`**; **kein** `workCenter`-Feld (Bezüge laufen über
  `operations`, `components`, `milestones`).
- **`JobStatus`** (test9): DRAFT, RFQ, CONFIRMED, PREPRESS, PRESS, POSTPRESS, PACKING,
  SHIPPED, COMPLETED, WAITING, CANCELLED, EXCEPTION. (Größer als alt cococo-de.)
- **`OrderStatus`**: DRAFT, CONFIRMED, IN_PRODUCTION, PARTIALLY_SHIPPED, SHIPPED,
  DELIVERED, COMPLETED, CANCELLED, ON_HOLD → **`IN_PRODUCTION` ist ein ORDER-Status**,
  kein Job-Status.
- Work-Center-Typ = `resourceType: ResourceType` = **MACHINE, HUMAN, TOOL, LOCATION**
  (nicht Prepress/Press/Finishing/…).

## 4. Workflow-Node-Typen (test9)  [VERIFIZIERT test9]

Vollständiges Set, u.a. **File I/O** (`file_read`/`file_write`/`file_check`/`file_list`/
`file_delete`), **`microsql`**, **`producibility_audit`**, `custom_action`, `ml_predict`,
`task`, `agent`, `agent_task`, `graphql`, `http_request`, `sql_query`, `mqtt_publish`,
`message`, `integration_action`; Flow-Control (`condition`/`split`/`join`/`delay`/
`switch`/`for_each`); Data (`transform`/`json_parse`/`csv_parse`/`yaml_parse`/
`set_variable`/`regex`); Scripting (`script`/`assert`/`log`/`task`).
→ KB-`node-types-reference` ist unvollständig, auf dieses Set bringen.

## 5. Noch offen / nicht auf test9 bestätigt

- **IAM-Standardpolicies** (Full Access / Admin / Read-Only): nur **[ALT cococo-de]**;
  test9-Query timeoutete. Re-verifizieren.  **[OFFEN test9]**
- **create-workflow Trigger-Typen** (inkl. `SCRIPT`-Trigger): gegen test9 prüfen
  (Trigger-Enum / `import_workflow`-Schema).  **[OFFEN]**
- **mcp-server / mcp-connection-details** Funktionsumfang: gegen test9 review.  **[OFFEN]**
- **connect-claude-desktop**: neue Version einspielen + DE übersetzen.  **[OFFEN]**

---

## 6. v2 Client/Server-Muster — empirisch bestätigt  [VERIFIZIERT test9]

Belegt an einer echten v2-App (`durst-label-connector`) + Schema-Introspektion:

- **Client (Vue-Script):** Datenzugriff über **`window.rpc('handlerName', params)`** →
  Rückgabe `{ status, result }`. Kein clientseitiges `$graphql`/`$rpc` (das ist v1).
- **Server (`serverApi.lua`):** `exports = {}` + `function exports.handlerName(input) … end`;
  Abfragen via `ctx.graphql.query(Q, vars)`; Persistenz `ctx.dataContainer.get/put/delete`;
  Konvention Rückgabe `{ status = "ok", result = … }`. `os.*` ist gesperrt → `ctx.time`.
- **`listJobs`-Filter:** Feld-Matcher, **kein** rohes Enum. `status` erwartet `StringFilter`,
  also `filter: { status: { eq: "PRESS" } }` (analog `workCenterId: { eq: … }`).
- **`upsertJob`** (es gibt kein `updateJob`): Argument `input: UpsertJobInput!`,
  `id` ist Typ **`JobID`** (nicht `ID!`). **Pflichtfelder: `name: String!`, `quantity: Int!`**;
  optional u.a. `id`, `status` (JobStatus-Enum), `priority`, `dueAt`, `tags`.
  Ergebnis: **`UpsertJobPayload { job: JobState, errors }`** → `job { … }` selektieren,
  nicht direkt `id`/`status` am Payload.
- ID-Skalare sind typisiert (`JobID`, `WorkCenterID`, `CustomerID`, `MetricID`, …) — bei
  Variablen den passenden Skalar verwenden, nicht generisch `ID!`.

---

## 7. URL-/Domain-Konvention in der Doku  [Konvention]

- In allen Beispielen den generischen Platzhalter **`<your-domain>`** für die
  Instanz-Adresse verwenden, z. B. `https://<your-domain>/mcp`,
  `mqtts://<your-domain>:8883`.
- **Nie** eine konkrete (potenziell echte) Kundendomain zeigen; das Sandbox-Suffix
  `*.cococo.app` nicht hartkodieren.
- Wo sinnvoll (am Anfang verbindungsnaher Artikel) ein generisches Beispiel zeigen.
- Echte Shared-Infra-Hosts (z. B. `registry.tripleclabs.de`) dürfen bleiben.

---

## §8 Verified facts — session 3 (custom data, config, templates, triggers)

All validated/introspected against `cococo-test9`.

**Custom Data Tables = Data Schemas (columns) + Data Records (rows).**
- Read rows: `listDataRecords(filter: DataRecordFilterInput!, first, after, sort): DataRecordConnection!`
  - `DataRecordFilterInput` requires `schemaId: DataSchemaID!` (optional `name: StringFilter`).
  - `query($s: DataSchemaID!){ listDataRecords(filter: { schemaId: $s }, first: 50){ edges { node { id name data } } } }` ✅ valid
- Write row: `upsertDataRecord(input: UpsertDataRecordInput!){ dataRecord { id name data } }` ✅ valid
  - `UpsertDataRecordInput`: `data: JSON!`, `schemaId: DataSchemaID!`, `id?` (DataRecordID, for update), `name?`, `taggableId?`.
  - `data` is a JSON object (pass a Lua table, NOT a json-encoded string).
- `DataRecordState`: id, schemaId, data(JSON), name, taggableType, taggableValue, createdAt, updatedAt.
- Find a table's schemaId via `listDataSchemas` / `dataSchemas`.
- Related (custom-app per-app stores): `upsertCustomDataContainer`, `listCustomDataContainersByApp/ByTaggable`, `getCustomDataContainer` — distinct from Data Records.
- WRONG (old article): `customTableRows` query, `createCustomTableRow` mutation, `cococo.graphql.mutate` — none exist.

**Tenant Config read = `getConfig` (GraphQL), NOT `cococo.config`.**
- `getConfig: TenantConfigOutput` — `{ version: Int!, entries: [TenantConfigEntryOutput!]!, description, createdAt, createdById }`.
- `TenantConfigEntryOutput` fields: `name: String!`, `type: TenantConfigEntryType` (Config/Secret), `value: JSONString` (nullable).
  - NOTE: fields are `name`/`type`/`value` — NOT `key`/`isSecret` (those fail validation).
- **SECRET values are redacted** (value null) — secrets cannot be read back via API or any script. Only non-secret Config entries return a value.
- Read in Lua via `ctx.graphql.query([[ query { getConfig { entries { name type value } } } ]])`.
- Also: `getConfigVersion(version: Int!)`, `listConfigVersions()`; manage via `updateConfig` mutation.

**Templates render = `renderTemplate` mutation, NOT `cococo.template.render`.**
- `renderTemplate(input: RenderTemplateInput!): RenderTemplatePayload!`
  - `RenderTemplateInput`: `handle: String!`, `context: String!` (a JSON string → use `ctx.json.encode`).
  - `RenderTemplatePayload`: `output: String`, `errors`.
- Call from a Script via `ctx.graphql.query`, or via the GraphQL workflow node.
- Related: `instantiateProductTemplate`, `renderImpositionSVG`.

**Workflow `TriggerType` enum (how a workflow is triggered):** MANUAL, SCHEDULED, EVENT, DEVICE_MQTT, WEBHOOK, **SCRIPT**.
- Old create-workflow article listed Job Event / Device Metric / Schedule / Webhook / Manual but MISSED the **Script** trigger.

**Work Center type = `resourceType: ResourceType`** = MACHINE, HUMAN, TOOL, LOCATION (old article invented Prepress/Press/Finishing/Shipping/Storage/Quality/Generic — those conflate job stages with resource types).

**Node types (full set via list_node_types)** — old node-types-reference MISSED: File I/O group (`file_read/write/check/list/delete`, via BridgeApp controller), `microsql`, `producibility_audit`. `http_request`/`sql_query` are device-oriented (Bridge), not generic.
