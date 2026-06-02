---
slug: setup-checklist
category: getting-started
status: published
lang: en
title: "Setup Checklist"
---

## Before you start

This checklist walks you through setting up CoCoCo from scratch. Each step builds on the previous one — work through them in order for the smoothest experience.

## Step 1: Invite your team

Before anything else, get your people into the platform.

1. Go to **Identity & Access** in the left sidebar
2. Create a Policy that fits the role (e.g. Admin, Read-Only)
3. Create a User and assign the Policy
4. Repeat for each team member

See: [How to Create a User](#create-user) · [How to Create an IAM Policy](#create-iam-policy) · [Inviting Team Members](#inviting-team-members)

## Step 2: Create a Network

A Network is the container for all your connected machines and devices.

1. Go to **Menu → Networks** and click **+ Add Network**
2. Give it a name (e.g. `Main Production Floor`) and save

See: [How to Create a Network](#create-network)

## Step 3: Connect your Devices

1. Go to **Menu → Devices** and click **+ Add Device**
2. Select the Network, set the protocol (MQTT, HTTP, JMF, or SQL)
3. Create a Device Token for authentication and save

See: [How to Add a Device](#add-device) · [Protocols Explained](#protocols-explained) · [How to Create and Manage Device Tokens](#device-tokens)

## Step 4: Set up your Production Structure

1. **Data → Production Cells** → create a cell (e.g. `Digital Printing`)
2. **Data → Work Centers** → add your machines, people, or tools
3. Assign each Work Center to a Production Cell
4. Add Capabilities where needed

See: [How to Create a Production Cell](#create-production-cell) · [How to Create a Work Center](#create-work-center) · [How to Assign Capabilities](#assign-capabilities)

## Step 5: Configure Tenant Settings

1. Go to **Menu → Developer → Config**
2. Add CONFIG entries for settings and SECRET entries for credentials

See: [How to Manage Tenant Config](#tenant-config)

## Step 6: Build your first Workflow

1. Go to **Menu → Workflows** and click **+ New Workflow**
2. Define a trigger, add nodes, and activate

See: [What is a Workflow?](#what-is-a-workflow) · [How to Create a Workflow](#create-workflow) · [Node Types Reference](#node-types-reference)

## Step 7: Set up Notifications

1. Go to **Menu → Notification Groups** and create a group
2. Add recipients and link to relevant Workflows

See: [How to Set Up Notification Groups](#notification-groups)

## You're ready

Once all seven steps are done, your platform is live. Use the reference articles to go deeper on any topic.

Not sure about a term? See the [Glossary](#glossary).