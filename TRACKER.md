# TRACKER — Knowledge Base Korrekturen

Legende: ✅ erledigt (in App) · 🟡 verifizierte Korrektur, startklar · 🔵 erst klären · ⚪ offen/neu
Vorgehen: EN+DE **parallel**. Push gebündelt via build_to_app.py + CoCoCo-MCP.

## A — Code-/API-Fehler in Developer-Artikeln
| Artikel | Problem | EN | DE |
|---|---|---|---|
| scripts | `cococo.date.*` (Beispiel) | 🟡 | 🟡 |
| custom-app-editor | `rpc_…`→Modul; `rpc_get_jobs`/`jobs`/`cococo`→`M`/`listJobs`/`ctx`; `$rpc`→`window.rpc` | 🟡 | 🟡 |
| accessing-data | `jobs`→`listJobs`, `updateJob`→`upsertJob`, `IN_PRODUCTION` (ungültig), `workCenter`, `$graphql`/`$rpc`, `cococo`→`ctx` | 🟡 | 🟡 |
| server-api-lua | `$rpc`/`rpc_`, `cococo.graphql`→`ctx` | 🟡 | 🟡 |
| server-api-lua | `cococo.config`/`http`/`log` (API-Tabelle) | 🔵 | 🔵 |
| lua-playground | `cococo.graphql`→`ctx` | 🟡 | 🟡 |
| lua-playground | `cococo.config`/`http`/`log` (API-Tabelle) | 🔵 | 🔵 |
| custom-data-tables | `cococo.graphql`→`ctx` | 🟡 | 🟡 |
| job-view-app | `$graphql`→`window.rpc`/`ctx` | 🟡 | 🟡 |
| templates | `cococo.template.render` | 🔵 | 🔵 |
| tenant-config | `cococo.config.get` (Beispiel) | 🔵 | 🔵 |

## B — Inhaltliche Fehler/Lücken (gegen Schema verifiziert)
| Artikel | Problem | EN | DE |
|---|---|---|---|
| work-center-types | falsche Typen → real `ResourceType`: MACHINE/HUMAN/TOOL/LOCATION | 🟡 | 🟡 |
| node-types-reference | fehlend: File-I/O (5), `microsql`, `producibility_audit` | 🟡 | 🟡 |
| create-workflow | Trigger `SCRIPT` fehlt | 🟡 | 🟡 |
| mcp-server / mcp-connection-details | MCP-Funktionsumfang zu eng | 🟡 | 🟡 |

## C — Sonstiges
| Artikel | Aktion | EN | DE |
|---|---|---|---|
| connect-claude-desktop | neue Version einspielen | ⚪ | ⚪ (übersetzen) |
| (neu) microsql/reporting | optional neuer Artikel | ⚪ | ⚪ |

## 🔵 Offene Recherche
`ctx.*` listet kein `config`/`http.post`/`log`/`template.render`. An echtem
App-/Workflow-Code belegen, nur bei Beleg korrigieren, sonst falsche Zeile
entfernen. Separate Test-Custom-App dafür erlaubt; KB-App bleibt bis zum
bewussten Push unangetastet.

---

## Tier-1 Audit — Batch: Custom Apps (code) + neighbours  [holistic: API + instructional]

Verified against cococo-test9 (live schema/Lua). PASS = technically correct AND coherent as a how-to.

| Article | Verdict | Note |
|---|---|---|
| persistent-storage | **FIX** | Hallucinated `window.storage` (that's the Claude Artifacts API) → rewritten to server `ctx.dataContainer` + client `window.rpc`. |
| custom-actions | PASS | `custom_action` node exists; Lua returns a table; `input.*` correct. |
| what-are-custom-apps | PASS | App kinds = PAGE/DASHBOARD/KIOSK/JOB_VIEW ✓; 3-component model ✓. |
| create-first-custom-app | PASS | Complete minimal end-to-end; self-consistent. |
| preview-publish | PASS | Matches the versions model (publish → immutable snapshot). |
| daisy-ui-theming | PASS | Frontend/CSS — not API-verifiable; internally consistent with all other articles. |
| version-history | PASS | Matches `create_version`/list_versions semantics. |
| sidebar-page-app | **FIX** | Layout-only; referenced data with no example → added verified `window.rpc`→`ctx.graphql listJobs`. |
| dashboard-tab-app | **FIX** | `loadData`/`activeJobs` were undefined → added verified `getActiveJobCount` (listJobs StringFilter) + `onUnmounted` cleanup. |
| kiosk-app | **FIX** | `loadJob`/`markComplete` undefined; corrected the model: shopfloor progress is per **operation** → `getJob{operations}` + `transitionOperation(status: COMPLETED)` (both validated). |

New verified facts this batch (also in LEARNINGS context): `JobState.operations: [OperationState!]!`; `OperationState{ id name status jobId sortOrder … }`; `OperationStatus` = PENDING, AVAILABLE, SETUP, RUNNING, CLEANUP, COMPLETED, FAILED, STOPPED; `transitionOperation(input: TransitionOperationInput{ id: OperationID!, status: OperationStatus! }) { operation { id status } }` ✓ validated. `ctx.dataContainer.get/put/delete` (custom-app only; no `.list`).

---

## Tier-1 Audit — Batch: Developer Tools  [holistic: API + instructional]

| Article | Verdict | Note |
|---|---|---|
| graphql-playground | PASS | `listJobs(first:10){…createdAt}` validated; `createdAt` exists on JobState. |
| scripts | PASS | Roles plausible; pure-Lua example; coherent end-to-end. |
| api-docs | PASS | Fabricated counts already removed; cross-refs valid. |
| lua-playground | **FIX** | `ctx.cache` signature wrong — corrected to `get(key)` / `set({key,value,ttl?})` / `delete(key)` (verified via SCRIPT-role Lua API). Rest of the API table confirmed (graphql/sql/device.http/device.sql/time/json/log all valid for SCRIPT role). |
| templates | **FIX** | Technically correct; renamed GraphQL var `$input`→`$tpl` so it no longer visually collides with the script's `input` (clarity). |

Key finding: `jobs(first:…)` is **invalid** on test9 — only `listJobs` exists. Notably, the platform's **own** Lua-API documentation example still uses the stale `jobs` query — confirming that example code (even first-party) must be validated, not trusted. SCRIPT-role base API confirmed: `ctx.graphql/.sql/.cache/.device.http/.device.sql/.time/.json/.log` + `ctx.script.load`; `ctx.time.now()` = ms since epoch.

---

## Tier-1 Audit — Batch: Workflows & Automation  [holistic: API + instructional]

| Article | Verdict | Note |
|---|---|---|
| what-is-a-workflow | PASS | Conceptual; building blocks + cross-refs valid. |
| create-workflow | PASS | All 6 TriggerType values covered (incl. Script). |
| node-types-reference | PASS | Full verified node set. |
| custom-actions | **FIX** | Internal contradiction: intro said "call from Workflow **Script** nodes" while the rest correctly uses the **Custom Action** node → intro corrected. (API was fine; holistic check caught it.) |
| monitor-executions | **FIX** | Status table listed only 4 of 6 `ExecutionStatus` values — added **Pending** and **Waiting** (WAITING is the state of a workflow paused on a human Task). Also converted unsupported `:::tip` admonition to a `>` blockquote to match the rest of the KB. |
| hitl-workflows | PASS | Task-node pause/resume model consistent with node-types + Task semantics. |

`ExecutionStatus` (verified): PENDING, RUNNING, WAITING, COMPLETED, FAILED, CANCELLED.

---

## Tier-1 Audit — Batch: Platform Configuration  [holistic: API + instructional]

| Article | Verdict | Note |
|---|---|---|
| tenant-config | PASS | `getConfig { entries { name type value } }` verified; secret redaction correct. |
| custom-data-tables | PASS | Data Schema + Data Record model; listDataRecords/upsertDataRecord validated. |
| notification-groups | **FIX** | Claimed channels "email, in-platform, or both" — but `DeliveryChannel` enum = **EMAIL** only (NotificationGroupState/NotificationRecipientState/DeliveryConfig verified). Corrected to email delivery. |
| incoming-webhooks | PASS | Consistent with WEBHOOK trigger. Webhook URL path and header-validation are HTTP/runtime claims, not GraphQL-verifiable — flagged, not changed. |

Verified entities: `NotificationGroupState{ id name description }`, `NotificationRecipientState{ groupId name deliveryConfig }`, `DeliveryConfig{ channel email }`, `DeliveryChannel` ENUM = EMAIL.

---

## Tier-1 Audit — Batch: Production Structure  [holistic: API + instructional]  — ALL PASS

| Article | Verdict | Note |
|---|---|---|
| create-production-cell | PASS | `WorkCenterState.productionCellId: ProductionCellID` confirms cells are real. |
| create-work-center | PASS | WorkCenterState verified (name, resourceType, productionCellId, jmfDeviceId/linkedUserId for device/user links). |
| work-center-types | PASS | `resourceType: ResourceType` = MACHINE/HUMAN/TOOL/LOCATION. |
| assign-capabilities | PASS | `CapabilityState{code,name,constraintSchema}`, `WorkCenterCapabilityState{workCenterId,capabilityId,constraints}`, `CapabilityCode` enum — matches the article. |
| shift-definitions | PASS | `ShiftDefinitionState{name,startTime,endTime,activeDays,isOvernight}` + `WorkCenterShiftProfileState{workCenterId,shiftDefinitionId,validFrom,validUntil}` — matches the steps. |

Cross-cutting UI item (not changed, needs human eye): menu paths vary across the KB ("Data → …" here vs "Menu → Developer → …" / "Menu → Business Hub → …" elsewhere). Not API-verifiable; should be reconciled against the live UI.

---

## Tier-1 Audit — Batch: AI & ML  [holistic: API + instructional]

| Article | Verdict | Note |
|---|---|---|
| ai-adapters | PASS | `AIAdapterType` = OPENAI, CLAUDE, APPLE_NATIVE, XGBOOST (XGBoost IS a valid adapter type — capabilities `{llm, ml}`). `OpenAIConfigurationInput{apiKey, defaultChatModel,…}` matches. (Audit also prevented a wrong "fix" here.) |
| ai-agents | **FIX** | Article said configure a "**System Prompt**" — but `AIAgentState` defines a persona via `role`, `goal`, `backstory` (+ `adapterId`, `model`); no systemPrompt field. Intro + step corrected to Role/Goal/Backstory. Tools confirmed (`AgentToolRef{type,config}`). |
| train-ml-model | **FIX** | Training data is `dataQuerySQL` (a SQL query) + `targetColumn` + `featureColumns` (`MLModelConfigOutput`/`UpsertMLModelConfigInput`), not a "Data Query Script." Step corrected to the real fields. ML Predict node + retraining/immutable versions (`MLModelConfigVersionOutput`) consistent. |

Note: `scripts` "ML Data Query" role re-confirmed valid — `ScriptRole` enum = SCRIPT, JDF_TEMPLATE, JMF_TEMPLATE, ML_DATA_QUERY. (So a script can also produce training data, but the model config itself stores `dataQuerySQL`.)

---

## Tier-1 Audit — Batch: MCP & AI Integrations  [holistic: API + instructional]

| Article | Verdict | Note |
|---|---|---|
| mcp-server | PASS | Scope broadened earlier this session; consistent. |
| mcp-connection-details | PASS | Endpoint/transport/auth consistent. |
| connect-claude-desktop | PASS | From the v2 source file; normalized. |
| connect-claude-code | PASS | `claude mcp add --transport http … --header "Authorization: Bearer …"` is the current Claude Code remote-MCP syntax; Node 20+. |
| connect-cursor | **NEW (written)** | Verified vs cursor.com/docs/mcp: `~/.cursor/mcp.json`, `url` + `headers` (Streamable HTTP). Published. |
| connect-codex | **NEW (written)** | Verified vs developers.openai.com/codex/mcp: `~/.codex/config.toml` `[mcp_servers.cococo]` `url` + `bearer_token_env_var`; CLI `codex mcp add`. Published. |
| connect-antigravity | **NEW (written)** | Verified vs antigravity.google/docs/mcp: `mcp_config.json`, **`serverUrl`** (not `url`) + `headers`. Published. |

The three formerly-`coming_soon` connect articles are now written, bilingual, and flipped to `published` in manifest.json. External-tool configs verified by web docs (their MCP setup is the variable part; the CoCoCo side is the same Streamable-HTTP `https://<your-domain>/mcp` + Bearer token).
