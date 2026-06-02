---
slug: api-tokens
category: account-settings
status: published
lang: de
title: "How to Create and Manage API Tokens"
---

## Was ist ein API Token?

Ein API Token ist eine geheime Zeichenfolge, die Ihre Identität gegenüber der CoCoCo API belegt. Es funktioniert wie ein Passwort für den programmatischen Zugriff. Statt sich mit E-Mail und Passwort anzumelden, senden Sie das Token im Request-Header und CoCoCo weiß, wer Sie sind und was Sie dürfen.

API Tokens sind persönlich. Sie sind an Ihr User-Konto gebunden und tragen Ihre Berechtigungen.

Typische Einsatzgebiete:

- Zugriff auf die CoCoCo GraphQL API aus einem externen Skript oder einer Anwendung
- Anbindung eines KI-Assistenten wie Claude Desktop oder Cursor über den CoCoCo MCP Server
- Authentifizierung von CI/CD Pipelines, die mit der Plattform arbeiten

## API Tokens öffnen

Klicken Sie oben rechts auf Ihr **Profilbild** und wählen Sie **API Tokens** aus dem Dropdown. Oder rufen Sie direkt `https://<your-domain>/#/api-tokens` auf.

## Einen API Token anlegen

1. Vergeben Sie einen **Token name**, der klar erkennen lässt, wofür das Token verwendet wird, z.B. `Claude Desktop` oder `CI Pipeline`
2. Optional: **Expiration date** setzen. Bleibt das Feld leer, bleibt das Token gültig, bis Sie es manuell widerrufen
3. Klicken Sie auf **Create token**
4. **Kopieren Sie das Token sofort**. Es wird nach dem Verlassen oder Neuladen der Seite nicht mehr angezeigt

## API Token verwenden

Senden Sie das Token im `Authorization` Header bei jedem API-Request mit:

```
Authorization: Bearer YOUR_TOKEN
```

## Ein Token widerrufen

Wenn ein Token kompromittiert ist oder nicht mehr gebraucht wird:

1. Öffnen Sie **API Tokens**
2. Suchen Sie das Token in der Liste
3. Klicken Sie auf **Revoke**
4. Bestätigen Sie

Das Token wird sofort ungültig.

## Best Practices

- **Ein Token pro Anwendungsfall**: Erstellen Sie für jedes Tool und jede Integration ein eigenes Token
- **Aussagekräftige Namen**: `Claude Desktop - Armin` ist hilfreicher als `Token 1`
- **Ablaufdatum bei temporären Integrationen**
- **Sofort widerrufen, wenn nicht mehr benötigt**
- **Niemals teilen**: API Tokens tragen Ihre persönlichen Berechtigungen

## MCP Connection

Die API Tokens Seite zeigt außerdem die MCP Connection Details Ihrer Plattform. Alles was ein KI-Assistent braucht, um sich mit CoCoCo zu verbinden:

| Feld | Wert |
|---|---|
| **Endpoint URL** | `https://<your-domain>/mcp` |
| **Transport** | Streamable HTTP (JSON mode) |
| **Authentifizierung** | `Authorization: Bearer <your-token>` |