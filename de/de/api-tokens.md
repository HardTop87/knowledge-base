---
slug: api-tokens
category: account-settings
status: published
lang: de
title: "How to Create and Manage API Tokens"
---

## Was ist ein API Token?

Ein API Token ist eine geheime Zeichenfolge, die deine Identität gegenüber der CoCoCo API belegt. Es funktioniert wie ein Passwort für den programmatischen Zugriff. Statt sich mit E-Mail und Passwort anzumelden, sende das Token im Request-Header und CoCoCo weiß, wer du bist und was du darfst.

API Tokens sind persönlich. Sie sind an dein User-Konto gebunden und tragen deine Berechtigungen.

Typische Einsatzgebiete:

- Zugriff auf die CoCoCo GraphQL API aus einem externen Skript oder einer Anwendung
- Anbindung eines KI-Assistenten wie Claude Desktop oder Cursor über den CoCoCo MCP Server
- Authentifizierung von CI/CD Pipelines, die mit der Plattform arbeiten

## API Tokens öffnen

Klicke oben rechts auf dein **Profilbild** und wähle **API Tokens** aus dem Dropdown. Oder rufe direkt `https://<your-domain>/#/api-tokens` auf.

## Einen API Token anlegen

1. Vergib einen **Token name**, der klar erkennen lässt, wofür das Token verwendet wird, z. B. `Claude Desktop` oder `CI Pipeline`
2. Optional: **Expiration date** setzen. Bleibt das Feld leer, bleibt das Token gültig, bis du es manuell widerrufst
3. Klicke auf **Create token**
4. **Kopiere das Token sofort**. Es wird nach dem Verlassen oder Neuladen der Seite nicht mehr angezeigt

## API Token verwenden

Sende das Token im `Authorization` Header bei jedem API-Request mit:

```
Authorization: Bearer YOUR_TOKEN
```

## Ein Token widerrufen

Wenn ein Token kompromittiert ist oder nicht mehr gebraucht wird:

1. Öffne **API Tokens**
2. Suche das Token in der Liste
3. Klicke auf **Revoke**
4. Bestätige

Das Token wird sofort ungültig.

## Best Practices

- **Ein Token pro Anwendungsfall**: Erstelle für jedes Tool und jede Integration ein eigenes Token
- **Aussagekräftige Namen**: `Claude Desktop - Armin` ist hilfreicher als `Token 1`
- **Ablaufdatum bei temporären Integrationen**
- **Sofort widerrufen, wenn nicht mehr benötigt**
- **Niemals teilen**: API Tokens tragen deine persönlichen Berechtigungen

## MCP Connection

Die API Tokens Seite zeigt außerdem die MCP Connection Details deiner Plattform. Alles was ein KI-Assistent braucht, um sich mit CoCoCo zu verbinden:

| Feld | Wert |
|---|---|
| **Endpoint URL** | `https://<your-domain>/mcp` |
| **Transport** | Streamable HTTP (JSON mode) |
| **Authentifizierung** | `Authorization: Bearer <your-token>` |