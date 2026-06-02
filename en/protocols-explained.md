---
slug: protocols-explained
category: networks-devices
status: published
lang: en
title: "Protocols Explained: MQTT, HTTP, JMF, SQL"
---

## MQTT

**Use case:** Real-time machine data, sensor readings, events

MQTT is a lightweight publish/subscribe messaging protocol designed for low-bandwidth, high-frequency communication. It is the best choice for machines that continuously stream status data — current job, speed, ink levels, error codes.

**Direction:** Inbound (device → CoCoCo) and outbound (CoCoCo → device)

## HTTP

**Use case:** Job ticketing, REST API integration, webhooks

HTTP connects systems that communicate via standard web requests. Use HTTP when integrating with MIS systems, order management tools, or any software that sends or receives REST API calls.

**Direction:** Inbound (system → CoCoCo) and outbound (CoCoCo → system)

## JMF

**Use case:** Print industry machine control and status

JMF (Job Messaging Format) is the industry-standard protocol for print production — used by presses, cutters, and finishing equipment that support CIP4/JDF. CoCoCo can send JMF commands to JDF-compatible machines and receive job status responses.

**Direction:** Outbound only (CoCoCo → machine)

## SQL

**Use case:** Reading from or writing to databases

SQL integration connects CoCoCo to external databases — ERP systems, legacy platforms, or any SQL-compatible data source. Use it in Workflows to query or update records in response to production events.

**Direction:** Outbound only (CoCoCo → database)

## Comparison

| Protocol | Direction | Best for |
|---|---|---|
| MQTT | In + Out | Real-time machine streaming |
| HTTP | In + Out | REST/webhook integrations |
| JMF | Out only | JDF print equipment |
| SQL | Out only | Database read/write |