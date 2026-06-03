# CoCoCo Knowledge Base — Source of Truth

Canonical, editable source for the **Knowledge Base** custom app in the `cococo-de`
environment. The repo was bootstrapped from the original app
(`knowledge-base`, `cap_01KP75ER4GF8BAXPA6F1TY3W4T`) and round-trip verified. The article
content has since been **rewritten to match the current platform version** (the v2
runtime), with every technical claim verified against the `cococo-test9` reference
environment (see `LEARNINGS.md`). The rebuilt app is deployed as **`knowledge-base-v2`**
(`cap_01KT4GYBWWE9AS1FHX89CKPBW7`).

> **Rule:** do **not** edit in the CoCoCo UI. The app is a build artifact of this repo.
> Direct UI edits would be overwritten on the next push.

## Contents

- **13 categories**, **75 articles** — all **published** (each with a body); no
  `coming_soon` placeholders remain.
- Each article is **one logical entry, maintained in both EN and DE**. The real total is
  therefore **75 articles**, *not* 150: the repo holds 75 `en/` files **and** 75 `de/` files
  (150 markdown files in total), kept in strict parity — exactly one EN and one DE file per
  article.

## Structure

```
.
├─ manifest.json            # Structure index: CATEGORIES (name, icon, description,
│                           # articles with slug/title/order/tags/status) + I18N (en/de).
│                           # Taken 1:1 from the app; language-neutral metadata.
├─ en/<slug>.md             # per article EN: YAML frontmatter + body (verbatim)
├─ de/<slug>.md             # per article DE
├─ app/
│  ├─ script.template.js    # the app's Vue script; the 4 data blocks are replaced by
│  │                        # markers (/*__CATEGORIES__*/ etc.). Byte-preserved component code.
│  ├─ template.html         # the app's HTML template (unchanged)
│  ├─ serverApi.lua         # empty (the app has no serverApi)
│  └─ app.config.json       # id, handle, kind, name, icon
├─ build/
│  ├─ build_to_app.py       # repo -> app/script.rebuilt.js  (the build)
│  └─ extract_from_app.py   # reference: one-time bootstrap (not used in normal operation)
├─ LEARNINGS.md             # verified platform facts (the basis for the rewrites)
├─ TRACKER.md               # per-article correction status
└─ README.md
```

## Article file convention

```markdown
---
slug: accessing-data
category: developer-tools
status: published          # published | coming_soon
lang: en
title: "Accessing Platform Data"
---

<body — exactly as in the app>
```

- `slug` is the stable key; `en/<slug>.md` and `de/<slug>.md` belong together and both
  must exist (parity).
- Title, order, tags, status, and category texts are **language-neutral** and live in
  `manifest.json` (not duplicated in every md file). The frontmatter mirrors them for
  convenience; `manifest.json` is authoritative.
- `coming_soon` articles have an empty body and are automatically excluded from the
  content maps by the build (exactly as in the original).

## Workflow

1. **Edit:** change the `en/`/`de/` files locally, keeping EN+DE in parallel. For a new
   article: register it under its category in `manifest.json` **and** create both md files.
2. **Build:** `python3 build/build_to_app.py` → produces `app/script.rebuilt.js`. Checks
   EN/DE parity and replaces all markers.
3. **Deploy:** put the built script into the app — paste it into the app's `script` file
   in the CoCoCo editor, or push it via the CoCoCo MCP (`update_custom_app`). This step is
   triggered deliberately, never automatically. `template` and `serverApi` stay unchanged.
4. **Version:** commit and push to GitHub.

`app/script.rebuilt.js` is a build artifact and is in `.gitignore`.

## Build verification guarantee (bootstrap)

The build was checked against the original app state:

- The values of all four data blocks (CATEGORIES, ARTICLES_CONTENT, ARTICLES_CONTENT_DE,
  I18N) reconstruct **identically**.
- All code **outside** the data blocks is **byte-identical**.

Quoting inside the data blocks is normalized to JSON (values unchanged), so the app is
functionally identical and the script is marginally larger.

## Content accuracy

The article rewrites are grounded in the platform's **actual schema and runtime**, not in
assumptions:

- GraphQL operations were checked with live schema validation and introspection
  (exact query/mutation names, input/field names, enum values) against `cococo-test9`.
- Lua runtime APIs, workflow node types, and trigger/status/resource enums were confirmed
  from the live tooling.
- A repo-wide audit confirms **zero** known-wrong patterns remain (e.g. `customTableRows`,
  `cococo.graphql.mutate`, `cococo.config`/`.template`/`.date`, client `$graphql`,
  `IN_PROGRESS`, fabricated API counts).

See `LEARNINGS.md` for the verified facts and `TRACKER.md` for per-article status.
Caveat: verification reflects the `cococo-test9` version at the time of checking; UI/menu
wording and conceptual articles that had no flagged pattern were not independently
re-verified against a running instance.
