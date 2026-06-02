---
slug: create-iam-policy
category: team-access-rights
status: published
lang: en
title: "How to Create an IAM Policy"
---

## How to create an IAM Policy

1. Go to **Identity & Access → Policies**
2. Click **+ Add Policy**
3. Enter a **Name** (e.g. `Production Manager`) and optionally a **Description**
4. Click **+ Add Statement**
5. Set the **Effect** — `ALLOW` to grant access, `DENY` to block it
6. Click **+ Add Actions** and select the operations to include
   - Search by resource name (e.g. `Job`, `Device`, `Workflow`)
   - Check the specific actions (read, create, update, delete)
7. Click **Save Statement**
8. Add more Statements if needed
9. Click **Save Policy**

## Key rules

- **DENY always beats ALLOW** — if any Statement denies an action, it is blocked regardless of other policies
- **Start narrow** — it is easier to grant more permissions later than to revoke over-granted ones
- **One policy per role** — keeps things easy to assign and audit

Once the Policy is saved, attach it to a user:

[How to Assign a Policy to a User](#assign-policy)