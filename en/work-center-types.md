---
slug: work-center-types
category: production-structure
status: published
lang: en
title: "Work Center Types Explained"
---

## Overview

Every Work Center has a **resource type** (`resourceType`) that classifies what kind of
resource it represents. It's used for organizing, filtering, and scheduling — it doesn't
restrict what a Work Center can actually do.

## Types

| `resourceType` | Description |
|---|---|
| **MACHINE** | A piece of equipment — press, cutter, folder, laminator, etc. |
| **HUMAN** | A person or an operator/work station staffed by people |
| **TOOL** | A tool or instrument used during production |
| **LOCATION** | A place or area — storage, staging, a shop-floor zone |

## Choosing the right type

Pick the type that best matches the real resource. The type is metadata for grouping and
reporting; you can change it later.

> Note: `PREPRESS`, `PRESS`, and `POSTPRESS` are **job statuses** (stages a job moves
> through), not Work Center types — don't confuse the two.
