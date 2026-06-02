---
slug: glossary
category: getting-started
status: published
lang: en
title: "Glossary"
---

## A

**AI Adapter** — A configured connection to an AI model provider (OpenAI, Claude, Apple Native, XGBoost). Stores credentials so Workflows and AI Agents can call the model without embedding API keys in code. See [What are AI Adapters?](#ai-adapters).

**AI Agent** — A configured AI assistant combining an AI Adapter with a system prompt and optional tools. Invoked from Workflows. See [How to Set Up an AI Agent](#ai-agents).

**API Token** — A personal credential used to authenticate requests to the CoCoCo API. Tied to a user account and carries that user's permissions. See [How to Create and Manage API Tokens](#api-tokens).

## B

**Bot** — A user type for automated service accounts. Has no login — only API access via a Token.

## C

**Capability** — An attribute of a Work Center describing what it can do — job types it handles, media sizes it supports, etc. Used by planning tools to route jobs. See [How to Assign Capabilities to a Work Center](#assign-capabilities).

**Config** — A non-sensitive key-value entry in Tenant Config. The value remains visible in the UI after saving. See [How to Manage Tenant Config](#tenant-config).

**Controller** — A bridge between a physical device network and CoCoCo, managing protocol translation and message routing. See [How to Add a Controller](#add-controller).

**Custom Action** — A saved, reusable Lua function callable from Workflow Script nodes.

**Custom App** — A bespoke interface built on CoCoCo using Vue.js (Template), JavaScript (Script), and optional Lua (Server API). Appears as a Page, Dashboard tab, Kiosk, or Job View. See [What are Custom Apps?](#what-are-custom-apps).

**Custom Data Table** — A user-defined database table inside CoCoCo for structured data that doesn't fit the built-in data model. See [How to Create Custom Data Tables](#custom-data-tables).

## D

**Dashboard App** — A Custom App kind appearing as a tab on the CoCoCo Dashboards screen. See [Building a Dashboard Tab App](#dashboard-tab-app).

**DENY** — An IAM Statement effect that blocks an action. DENY always overrides ALLOW, regardless of other Policies. See [Understanding IAM](#understanding-iam).

**Device** — A physical machine, sensor, or system registered in CoCoCo that sends data via MQTT, HTTP, JMF, or SQL. See [How to Add a Device](#add-device).

**Device Token** — A credential tied to a specific Device (not a user) for authenticating device requests to CoCoCo. See [How to Create and Manage Device Tokens](#device-tokens).

## E

**Estimate** — A commercial quotation sent to a customer for approval before an Order is created. See [How to Create an Estimate](#create-estimate).

**Execution** — A single run of a Workflow, from trigger to completion or failure. See [How to Monitor Workflow Executions](#monitor-executions).

## H

**HITL** — Human-in-the-Loop. A Workflow pattern where automation pauses for a person to complete a Task before continuing. See [Human-in-the-Loop Workflows](#hitl-workflows).

**HTTP** — A device protocol for connecting systems via web requests. Supports inbound and outbound communication. See [Protocols Explained](#protocols-explained).

## I

**IAM** — Identity and Access Management. The system of Users, Policies, Statements, and Teams that controls who can do what in CoCoCo. See [Understanding IAM](#understanding-iam).

**Incoming Webhook** — A unique URL that external systems POST to in order to trigger a CoCoCo Workflow. See [How to Use Incoming Webhooks](#incoming-webhooks).

**Invoice** — A billing document. CoCoCo supports standard Invoices, Credit Notes, and Proformas. See [How to Create an Invoice](#create-invoice).

## J

**JDF** — Job Definition Format. An XML-based standard for passing job parameters to CIP4-compatible print machines. See [Protocols Explained](#protocols-explained).

**JMF** — Job Messaging Format. A real-time messaging protocol for JDF-compatible equipment. Outbound only. See [Protocols Explained](#protocols-explained).

**Job** — The central production unit in CoCoCo — a piece of work moving through the production floor.

**Job View App** — A Custom App embedded in the Job detail panel. See [Building a Job View App](#job-view-app).

## K

**Kiosk App** — A full-screen Custom App for shared shopfloor terminals. Accessible only to Kiosk users. See [Building a Kiosk App](#kiosk-app).

**Kiosk User** — A user type for shared shopfloor terminals with a simplified interface and access only to Kiosk Apps.

## L

**Lua** — The scripting language used for CoCoCo Scripts, Custom Actions, and Server API code. See [Lua Playground: Getting Started](#lua-playground).

## M

**MCP** — Model Context Protocol. An open standard for connecting AI assistants to external tools. CoCoCo exposes an MCP server at `/mcp`. See [What is the CoCoCo MCP Server?](#mcp-server).

**Metric** — A structured data point sent by a Device during production — machine state, speed, error codes, etc. See [Understanding Metrics](#understanding-metrics).

**ML Model** — A machine learning model trained inside CoCoCo using XGBoost. Supports Regression and Classification. See [How to Train an ML Model](#train-ml-model).

**MQTT** — A lightweight publish/subscribe protocol for real-time machine data. Supports inbound and outbound communication. See [Protocols Explained](#protocols-explained).

## N

**Network** — A logical container for connected Devices, providing their communication channel. See [How to Create a Network](#create-network).

**Node** — A single processing step in a Workflow — transformation, API call, condition, notification, etc. See [Node Types Reference](#node-types-reference).

**Notification Group** — A named list of recipients that Workflows can send messages to. See [How to Set Up Notification Groups](#notification-groups).

## O

**Order** — A confirmed production request that creates a Job on the floor. See [How to Create an Order](#create-order).

## P

**Page App** — A Custom App appearing in the left sidebar as a standalone page. See [Building a Sidebar Page App](#sidebar-page-app).

**Policy** — A set of IAM Statements (ALLOW/DENY rules) attached to users or teams to control permissions. See [Understanding IAM](#understanding-iam).

**Production Cell** — A named group of Work Centers representing a functional area of the floor (e.g. Digital Printing). See [How to Create a Production Cell](#create-production-cell).

**Purchase Order (PO)** — A document sent to a supplier to request goods or services. See [How to Manage Purchase Orders](#purchase-orders).

## S

**Script** — A saved, reusable Lua function. Roles: Script, JDF Template, JMF Template, ML Data Query. See [How to Use Scripts](#scripts).

**Secret** — A sensitive key-value entry in Tenant Config. Value is hidden after saving and cannot be read back. See [How to Manage Tenant Config](#tenant-config).

**Server API** — The Lua component of a Custom App that runs server-side, used for privileged data operations. See [Using the Server API (Lua) in Custom Apps](#server-api-lua).

**Shift Definition** — A schedule specifying when a Work Center is operational. See [How to Set Up Shift Definitions](#shift-definitions).

**SQL** — A protocol for connecting CoCoCo to external databases. Outbound only. See [Protocols Explained](#protocols-explained).

**Statement** — An IAM rule specifying an Effect (ALLOW or DENY), Actions, and Resources within a Policy.

## T

**Task** — A human action item created by a HITL Workflow. Appears in the assignee's My Tasks view. See [Human-in-the-Loop Workflows](#hitl-workflows).

**Team** — A named group of users who share Policies and permissions. See [How to Create a Team](#create-team).

**Template** — In Custom Apps: the Vue.js HTML fragment defining the UI. Also refers to JDF/JMF Template Scripts for generating machine job tickets. See [How to Create Templates](#templates).

**Tenant Config** — A secure key-value store for platform-wide settings (Config) and credentials (Secrets). See [How to Manage Tenant Config](#tenant-config).

**Trigger** — The starting event of a Workflow — Job Event, Device Metric, Schedule, Webhook, or Manual. See [How to Create a Workflow](#create-workflow).

## U

**User** — A person or service account with access to CoCoCo. Types: Human, Kiosk, Bot. See [Inviting Team Members](#inviting-team-members).

## W

**Work Center** — Any production resource — machine, person, tool, or location — that performs or supports work. See [How to Create a Work Center](#create-work-center).

**Workflow** — An automated process triggered by events, consisting of a Trigger and a sequence of Nodes. See [What is a Workflow?](#what-is-a-workflow).

## X

**XGBoost** — The machine learning algorithm powering CoCoCo's built-in ML Models. Supports regression and classification tasks.