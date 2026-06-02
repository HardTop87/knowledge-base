---
slug: permission-errors
category: troubleshooting
status: published
lang: en
title: "Permission Errors: How to Diagnose"
---

## Understanding the error

Permission errors appear as `403 Forbidden` responses or "Access denied" messages. They mean the user's Policies do not allow the requested action.

## Step 1: Identify the affected user

Note which user or service account is getting the error.

## Step 2: Check their Policies

1. Go to **Identity & Access → Users**
2. Find the user → **Edit** → **Policies** tab
3. Review which Policies are attached

## Step 3: Check what each Policy allows

1. Open each Policy
2. Review Statements — look for ALLOW and DENY rules
3. Find the resource type matching the failing action (e.g. `Job`, `Workflow`)

## Step 4: Look for DENY rules

**DENY always wins.** If any Statement has a DENY for the action, access is blocked even if another Statement allows it.

## Step 5: Fix the Policy

- **Option A** — Add an ALLOW Statement for the missing action
- **Option B** — Remove the conflicting DENY Statement
- **Option C** — Assign a Policy that already includes the needed permissions

## For Bot users and API Tokens

1. Identify which API Token is being used
2. Verify it belongs to a user with the correct Policies