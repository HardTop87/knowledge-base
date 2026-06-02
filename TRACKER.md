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
