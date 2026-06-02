---
slug: understanding-iam
category: team-access-rights
status: published
lang: en
title: "Understanding IAM: Policies, Permissions and Roles"
---

## How it works

Every user in CoCoCo has one or more **Policies** attached to them. A Policy contains one or more **Statements**. Each Statement says:

- **Effect** — either `ALLOW` or `DENY`
- **Actions** — which operations are permitted (e.g. read jobs, create workflows)
- **Resources** — which data or areas the rule applies to

If Policies conflict, **DENY always wins**.

## The built-in Full Access Policy

CoCoCo ships with a single built-in Policy, **Full Access**, which grants all permissions across the entire platform. Assign it only to users who genuinely need unrestricted access.

Any other Policies — for example a read-only or role-specific Policy — you create yourself to match how your team works (see below).

## Creating a custom Policy

1. Go to **Identity & Access → Policies**
2. Click **+ Add Policy**
3. Give it a **Name** and **Description**
4. Click **+ Add Statement**
5. Set the **Effect** to `ALLOW` or `DENY`
6. Search for and select the **Actions** you want to include
7. Click **Save**

See the full how-to: [How to Create an IAM Policy](#create-iam-policy)

## Attaching a Policy to a user

See: [How to Assign a Policy to a User](#assign-policy)

## Managing teams

For groups of users with the same permissions, use Teams instead of assigning Policies to each user individually. See: [How to Create a Team](#create-team)

## Practical examples

**Production manager** — needs to see and manage jobs, but shouldn't touch device config:
→ Create a Policy with ALLOW on `Job`, `Order`, `Component`, `Operation`

**Shopfloor staff** — should only report progress on jobs:
→ Create a Policy with ALLOW on `Job` read actions only

**Integration developer** — needs full access to devices, networks, and workflows:
→ Assign the built-in `Full Access` Policy