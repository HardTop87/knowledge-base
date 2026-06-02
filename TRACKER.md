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
