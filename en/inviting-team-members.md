---
slug: inviting-team-members
category: team-access-rights
status: published
lang: en
title: "Inviting Team Members"
---

## Before you start

Make sure you have at least one Policy set up before inviting users. A Policy defines what a user can see and do in the platform. If you haven't created one yet, start here:

[How to Create an IAM Policy](#create-iam-policy)

## How to create a user

1. Go to **Identity & Access** in the left sidebar
2. Click **+ Create User** in the Users card
3. Enter the person's **Email address**
4. Enter their **Full name** (optional but recommended)
5. Select the **User Type:**
   - **Human** — a regular team member who logs in with their own account
   - **Kiosk** — a shared terminal account with a dedicated kiosk interface
   - **Bot** — a service account for automated processes
6. Click **Save**

The person will receive an email invitation to set their password and log in.

## Assigning a Policy

After creating the user, assign a Policy to control their permissions:

1. Open the user by clicking **Edit**
2. Scroll to the **Policies** section
3. Click **+ Add Policy** and select the appropriate one
4. Save

## User Types explained

| Type | Use case |
|---|---|
| Human | Regular staff member — full login with personal credentials |
| Kiosk | Shopfloor terminal — simplified interface, shared device |
| Bot | Automated service account — no login, API access only |