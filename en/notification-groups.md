---
slug: notification-groups
category: platform-configuration
status: published
lang: en
title: "How to Set Up Notification Groups"
---

## What is a Notification Group?

A Notification Group is a named list of recipients that Workflows can send messages to. Instead of hardcoding email addresses, you reference a Group — making it easy to update recipients without editing Workflows.

## How to create a Notification Group

1. Go to **Menu → Business Hub → Notification Groups**
2. Click **+ Add Group**
3. Enter a **Name** (e.g. `Production Managers`, `On-call Team`)
4. Click **+ Add Recipient** and select users or enter email addresses
5. Each recipient is reached by **email** (the delivery channel for notification groups)
6. Click **Save**

## Using a Notification Group in a Workflow

Add a **Message** node:

1. Select the Notification Group
2. Enter the **Subject** and **Message** content
3. Include dynamic data using `{{variables}}`

## Managing recipients

Recipients can be added or removed at any time without editing any Workflows. The change takes effect on the next execution.