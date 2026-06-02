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

---

## Tier-2 Audit — Batch: Networks & Devices  [holistic: API + instructional]  — ALL PASS

| Article | Verdict | Note |
|---|---|---|
| create-network | PASS | UI/conceptual; consistent "Menu → IOT →" navigation. |
| add-device | PASS | "Four protocols: MQTT, HTTP, JMF, SQL" verified against `OutboundProtocol`. |
| protocols-explained | PASS | Direction table EXACTLY matches schema: `OutboundProtocol`={HTTP,SQL,MQTT,JMF}, `InboundProtocol`={MQTT,HTTP} → MQTT/HTTP In+Out, JMF/SQL Out-only. (Suspected JMF "Out only vs receives responses" contradiction — schema confirms the table is right; JMF responses ride the outbound exchange, JMF is not an inbound protocol.) |
| device-tokens | PASS | Bearer header + MQTT password credential flow; plausible, consistent. |
| add-controller | PASS | Controller = Bridge/edge gateway — consistent with the Bridge controller / EDGE_APP model used elsewhere. |
| understanding-metrics | PASS | Device Metric trigger = `DEVICE_MQTT`; inbound metrics via MQTT/HTTP matches `InboundProtocol`. |

Verified enums: `OutboundProtocol` (HTTP, SQL, MQTT, JMF), `InboundProtocol` (MQTT, HTTP), `DatabaseAdapter` (MSSQL, MYSQL, POSTGRESQL, SQLITE). OPC-UA/Modbus live at the EDGE_APP/bridge layer, not as device protocols.

---

## Tier-2 Audit — Batch: Commercial  [holistic: API + instructional]

| Article | Verdict | Note |
|---|---|---|
| commercial-overview | PASS | Order + Estimate lifecycles match `OrderStatus`/`EstimateStatus`. |
| create-estimate | PASS | `EstimateStatus` = DRAFT, SENT, ACCEPTED, REJECTED, EXPIRED, REVISED — exact match. |
| create-order | PASS | `OrderStatus` = DRAFT, CONFIRMED, IN_PRODUCTION, PARTIALLY_SHIPPED, SHIPPED, DELIVERED, COMPLETED, CANCELLED — exact match. |
| create-invoice | PASS | `InvoiceKind` = INVOICE, CREDIT_NOTE, PROFORMA — exact match. |
| purchase-orders | **FIX** | `PurchaseOrderStatus` = DRAFT, SUBMITTED, ACKNOWLEDGED, PARTIALLY_RECEIVED, RECEIVED, CANCELLED, DISPUTED. Article had "Sent"/"Confirmed" (wrong) and was missing DISPUTED → corrected. |
| customers-suppliers | PASS | `CustomerState` / `SupplierID` exist; UI-level flow consistent. |

Also verified present: `InvoiceStatus`, `PaymentStatus`, `ShipmentStatus`, `OrderLifecyclePayload` (order/estimate/invoices/shipments/jobs) — useful for future deeper commercial articles.

## CONTENT GAP found: Edge Apps / Integrations NOT covered
The KB has zero coverage of **Edge Apps** (EDGE_APP runtime: `bridge.mqtt/opcua/state`, Modbus transport, `ctx.edgeApp.invoke`) and **Integrations** (integration drafts/bundles). These are real test9 features. Recommend adding at least an "Edge Apps" article (and possibly "Integrations"), pending scope decision.

---

## Tier-2 Audit — Batch: Account & Settings + Team & Access  [holistic: API + instructional]

| Article | Verdict | Note |
|---|---|---|
| user-settings | PASS | UI (avatar → User Settings; language; password). Name/email managed in Identity & Access — consistent. |
| api-tokens | PASS | Bearer-header usage + MCP connection table consistent with mcp-connection-details; mentions Claude Desktop/Cursor (matches new connect articles). |
| inviting-team-members | PASS | User creation + policy assignment; User Types match `UserKind`. |
| understanding-iam | **FIX** | IAM model verified: `Effect`=ALLOW/DENY, `IAMStatement`{effect,actions,resources}, `IAMDocument`{version,statements}, actions grouped by resource (`IAMActionGroup`). BUT "three built-in Policies (Full Access, Admin Policy, Read-Only Policy)" was FALSE — live `listIAMPolicies` returns only ONE: **Full Access**. Corrected to a single built-in Full Access policy; others are user-created. |
| create-user | PASS | `UserKind` = HUMAN, BOT, KIOSK — exact match. |
| create-iam-policy | PASS | Statement builder (Effect → Actions by resource) matches `IAMStatementInput` + `listIAMActions`/`IAMActionGroup`. |
| create-team | PASS | Teams group users; assign policies to team — consistent with `listUserPolicies` model. |
| assign-policy | **FIX** | Content correct; converted the `:::info` admonition to a `>` blockquote (consistent with the monitor-executions fix — custom-app markdown renderer shows `:::` literally). |

Verified IAM: `Effect`(ALLOW,DENY), `UserKind`(HUMAN,BOT,KIOSK), `IAMDocument`/`IAMStatement`/`IAMActionGroup`/`IAMActionInfo`, queries `listIAMPolicies`/`listIAMActions`/`listUserPolicies`/`getIAMPolicy`. Live built-in policy set = {Full Access} only.

### Tier-2 status: Networks & Devices ✓, Commercial ✓, Account & Settings ✓, Team & Access ✓ — **Tier 2 complete.**

---

## [DEFERRED — to do next] Edge Apps & Integrations coverage
KB has zero coverage. **Before creating any new category**, FIRST evaluate whether this content fits into EXISTING categories/articles (per user's explicit instruction). Candidates to weigh:
- **Edge Apps** (EDGE_APP runtime: `bridge.mqtt/opcua/state`, Modbus via `EdgeAppModbusTransport`, `ctx.edgeApp.invoke`, `ControllerPolicyState` default-deny IO/exec allowlists, config.update push to controllers) → could fit **Networks & Devices** (bridge/controller-adjacent) or **Custom Apps** (it's an app type) or **Developer Tools**.
- **Integrations** (integration drafts/bundles, publish, external schemas, `ctx.integration.*`) → could fit **Developer Tools** or **Platform Configuration**.
Decision (existing vs new category) pending. Research EDGE_APP + INTEGRATION runtimes against test9, then write EN+DE.

---

## Tier-3 Audit — Batch: Getting Started + Troubleshooting  [scan for schema errors + consistency]

| Article | Verdict | Note |
|---|---|---|
| platform-overview | PASS | Conceptual; building blocks (Job/Work Center/Device/Workflow/Policy/Custom App) all consistent with schema. |
| setup-checklist | PASS* | Steps accurate. *Menu paths "Menu → Networks/Devices" omit "IOT" vs the Networks category — left for the deferred UI-path reconciliation, not a schema error. |
| glossary | **FIX** | (1) "AI Agent … with a system prompt" → role/goal/backstory (same fix as ai-agents). (2) "Custom Action … callable from Workflow Script nodes" → "from a Workflow Custom Action node" (consistent with custom-actions fix). Everything else verified: Script roles (SCRIPT/JDF_TEMPLATE/JMF_TEMPLATE/ML_DATA_QUERY), ResourceType, InvoiceKind, protocol directions, UserKind, Custom App kinds — all correct. |
| workflow-not-triggering | PASS | Trigger types + executions model consistent. |
| device-not-connecting | PASS | "Menu → IOT → Devices" consistent; MQTT 1883/8883 + token-as-password plausible (endpoint paths not API-verifiable, left as-is). |
| permission-errors | PASS | 403 / Policies / DENY-wins / resource model consistent with IAM. |
| job-stuck | **FIX** | Listed "Pending" and "In Progress" as JobStatus values — they are NOT in `JobStatus` (only `WAITING` is; `PENDING`/`AVAILABLE`/`RUNNING` are `OperationStatus`). Rewrote around the real model: jobs advance via Operation transitions on the shopfloor; corrected the stuck-status table and the manual-advance step accordingly. |

### FULL AUDIT COMPLETE — Tiers 1, 2, 3 all done. 71/71 articles audited (EN+DE).

Remaining work: (1) Edge Apps & Integrations coverage (evaluate fit into existing categories/articles FIRST), (2) final redeploy of `script` into the test9 app.
