---
slug: identity-topic-model
category: networks-devices
status: published
lang: en
title: "Identity and Topic Prefixes: Why Messages Go Missing"
---

## Why this matters

The single most common cause of "my data connects but nothing arrives" is a mismatch between **two separate identities** on the MQTT broker. Understanding the model below explains almost every silent routing failure — messages that publish successfully but are never delivered, or subscriptions that never fire.

The broker recognises two kinds of identity, and they do **not** have to agree:

- **Transport identity** — the TLS client certificate presented during the connection handshake (its SPIFFE SAN). This is *who the broker thinks you are*.
- **Application identity** — the MQTT username / token you authenticate with. This is *who your app thinks it is*.

When the two disagree, the broker always trusts the **certificate**. That choice governs how every topic is rewritten, in both directions.

## The rule: the certificate wins

When you connect, the broker picks the **certificate identity first** and uses it as your virtual tenant. Every topic you touch is then prefixed with that certificate's identity — regardless of what your application token says.

### Publishing

A relative topic you publish is rewritten to:

```
t/{cert-identity}/…
```

So if you publish to `c/print`, the broker actually delivers it on `t/{cert-identity}/c/print`.

### Subscribing

Subscriptions are prefixed the **same way**, using the **subscriber's own** certificate identity. A relative subscription to `c/print` actually listens on:

```
t/{cert-identity}/c/print
```

> **Important:** the prefixing applies to **relative** subscriptions only. Absolute or wildcard subscriptions (a topic that already starts with `t/…`, or uses `#`/`+`) are **not** rewritten — they receive exactly what you asked for. This has been confirmed by probe.

## Controllers vs Devices

The identity baked into the certificate determines the prefix, and a Controller and a Device get **different** prefixes:

| Certificate type | Topic prefix    |
|------------------|-----------------|
| Controller       | `t/ctl_…/`      |
| Device           | `t/dev_…/`      |

This is the trap. If your edge connection uses a **controller** certificate, everything it publishes lands under `t/ctl_…/`. A trigger or subscription that expects **device-scoped** topics (`t/dev_…/`) will **never match** — the prefixes simply don't line up, so the message is silently dropped.

### How to route correctly from a controller

When the transport identity is a controller but you need device-style routing, work *with* the prefix instead of against it:

- **Uplink (controller → platform):** use a trigger that has **no `deviceId`**, and filter the payload yourself. A device-scoped trigger will never fire for controller-prefixed topics.
- **Downlink (platform → controller):** address the **absolute controller topic** (`t/ctl_…/…`) directly, rather than a relative device topic that would be rewritten under the wrong prefix.

## The secure port requires mTLS

Connecting on `mqtts://<your-domain>:8883` requires **mutual TLS (mTLS)** with a platform-issued client certificate. This is the SPIFFE identity described above.

If you connect without a valid platform-issued client certificate, the TLS handshake is rejected before authentication even begins — you will see:

```
SSL alert 40
```

That is a transport-layer failure, not an application one: no token will help, because the broker never gets far enough to read it. Make sure your client is configured with the certificate issued for your Controller or Device.

## Quick diagnosis

| Symptom                                              | Likely cause                                                                 |
|------------------------------------------------------|------------------------------------------------------------------------------|
| Publishes succeed, nothing is received               | Subscriber and publisher resolve to different `t/{identity}/…` prefixes      |
| Device-scoped trigger never fires                    | Connection uses a **controller** cert → topics land under `t/ctl_…/`         |
| Connection drops with `SSL alert 40`                 | Missing or invalid platform-issued client certificate on `:8883` (mTLS)      |
| Wildcard subscription works but a relative one doesn't | Relative subscriptions are prefixed; absolute/wildcard ones are not          |
