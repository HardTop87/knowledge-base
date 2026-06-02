---
slug: api-tokens
category: account-settings
status: published
lang: en
title: "How to Create and Manage API Tokens"
---

## What is an API Token?

An API Token is a secret string that represents your identity when making requests to the CoCoCo API. It works like a password for programmatic access — instead of logging in with your email and password, you include the token in the request header and CoCoCo knows who you are and what you're allowed to do.

API Tokens are personal — they are tied to your user account and carry your permissions.

Common uses:

- Accessing the CoCoCo GraphQL API from an external script or application
- Connecting an AI assistant like Claude Desktop or Cursor via the CoCoCo MCP server
- Authenticating CI/CD pipelines that interact with the platform

## How to open API Tokens

Click your **profile avatar** in the top right corner, then select **API Tokens** from the dropdown. Or navigate directly to `https://your-domain.cococo.app/#/api-tokens`.

## How to create an API Token

1. Enter a **Token name** — something that makes it clear what this token is used for, e.g. `Claude Desktop`, `CI Pipeline`
2. Optionally set an **Expiration date** — if left empty, the token stays valid until you revoke it manually
3. Click **Create token**
4. **Copy the token immediately** — it will not be shown again after you leave or refresh the page

## Using an API Token

Include the token in the `Authorization` header of every API request:

```
Authorization: Bearer YOUR_TOKEN
```

## How to revoke a token

If a token is compromised or no longer needed:

1. Go to **API Tokens**
2. Find the token in the list
3. Click **Revoke**
4. Confirm

The token stops working immediately.

## Best practices

- **One token per use case** — create a separate token for each tool or integration
- **Use descriptive names** — `Claude Desktop - Armin` is more useful than `Token 1`
- **Set expiry dates for temporary integrations**
- **Revoke immediately when no longer needed**
- **Never share tokens** — API Tokens carry your personal permissions

## The MCP Connection

The API Tokens page also shows your platform's MCP connection details — everything an AI assistant needs to connect to CoCoCo:

| Field | Value |
|---|---|
| **Endpoint URL** | `https://your-domain.cococo.app/mcp` |
| **Transport** | Streamable HTTP (JSON mode) |
| **Authentication** | `Authorization: Bearer <your-token>` |