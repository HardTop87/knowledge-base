---
slug: identity-topic-model
category: networks-devices
status: published
lang: de
title: "Identity and Topic Prefixes: Why Messages Go Missing"
---

## Warum das wichtig ist

Die häufigste Ursache für "die Verbindung steht, aber es kommt nichts an" ist ein Konflikt zwischen **zwei getrennten Identitäten** auf dem MQTT-Broker. Das folgende Modell erklärt fast jeden stillen Routing-Fehler — Nachrichten, die erfolgreich gesendet, aber nie zugestellt werden, oder Subscriptions, die nie auslösen.

Der Broker kennt zwei Arten von Identität, und sie müssen **nicht** übereinstimmen:

- **Transport-Identität** — das TLS-Client-Zertifikat, das beim Verbindungsaufbau vorgelegt wird (sein SPIFFE-SAN). Das ist, *wofür der Broker dich hält*.
- **Anwendungs-Identität** — der MQTT-Benutzername / das Token, mit dem du dich authentifizierst. Das ist, *wofür sich deine App hält*.

Wenn beide nicht übereinstimmen, vertraut der Broker immer dem **Zertifikat**. Diese Entscheidung bestimmt, wie jedes Topic umgeschrieben wird — in beide Richtungen.

## Die Regel: das Zertifikat gewinnt

Beim Verbindungsaufbau wählt der Broker **zuerst die Zertifikats-Identität** und nutzt sie als virtuellen Mandanten (Tenant). Jedes Topic, das du anfasst, wird dann mit dieser Zertifikats-Identität präfixiert — unabhängig davon, was dein Anwendungs-Token sagt.

### Senden (Publish)

Ein relatives Topic, das du sendest, wird umgeschrieben zu:

```
t/{cert-identity}/…
```

Wenn du also an `c/print` sendest, stellt der Broker es tatsächlich auf `t/{cert-identity}/c/print` zu.

### Abonnieren (Subscribe)

Subscriptions werden auf **dieselbe** Weise präfixiert, und zwar mit der Zertifikats-Identität des **Abonnenten selbst**. Eine relative Subscription auf `c/print` lauscht tatsächlich auf:

```
t/{cert-identity}/c/print
```

> **Wichtig:** Das Präfix gilt nur für **relative** Subscriptions. Absolute oder Wildcard-Subscriptions (ein Topic, das bereits mit `t/…` beginnt oder `#`/`+` nutzt) werden **nicht** umgeschrieben — sie empfangen genau das, wonach du gefragt hast. Per Probe bestätigt.

## Controller vs. Devices

Die im Zertifikat hinterlegte Identität bestimmt das Präfix, und ein Controller und ein Device erhalten **unterschiedliche** Präfixe:

| Zertifikatstyp | Topic-Präfix    |
|----------------|-----------------|
| Controller     | `t/ctl_…/`      |
| Device         | `t/dev_…/`      |

Das ist die Falle. Nutzt deine Edge-Verbindung ein **Controller**-Zertifikat, landet alles, was sie sendet, unter `t/ctl_…/`. Ein Trigger oder eine Subscription, die **device-bezogene** Topics (`t/dev_…/`) erwartet, wird **nie** passen — die Präfixe stimmen schlicht nicht überein, und die Nachricht wird stillschweigend verworfen.

### Wie du von einem Controller korrekt routest

Wenn die Transport-Identität ein Controller ist, du aber Device-artiges Routing brauchst, arbeite *mit* dem Präfix statt dagegen:

- **Uplink (Controller → Plattform):** nutze einen Trigger **ohne `deviceId`** und filtere den Payload selbst. Ein device-bezogener Trigger feuert bei controller-präfixierten Topics nie.
- **Downlink (Plattform → Controller):** adressiere direkt das **absolute Controller-Topic** (`t/ctl_…/…`), statt eines relativen Device-Topics, das unter dem falschen Präfix umgeschrieben würde.

## Der sichere Port verlangt mTLS

Eine Verbindung über `mqtts://<your-domain>:8883` verlangt **gegenseitiges TLS (mTLS)** mit einem von der Plattform ausgestellten Client-Zertifikat. Das ist die oben beschriebene SPIFFE-Identität.

Verbindest du dich ohne gültiges, von der Plattform ausgestelltes Client-Zertifikat, wird der TLS-Handshake abgewiesen, bevor die Authentifizierung überhaupt beginnt — du siehst dann:

```
SSL alert 40
```

Das ist ein Fehler auf Transportebene, nicht auf Anwendungsebene: kein Token hilft, denn der Broker kommt gar nicht so weit, es zu lesen. Stelle sicher, dass dein Client mit dem für deinen Controller oder dein Device ausgestellten Zertifikat konfiguriert ist.

## Schnelle Diagnose

| Symptom                                                | Wahrscheinliche Ursache                                                       |
|--------------------------------------------------------|-------------------------------------------------------------------------------|
| Senden klappt, es kommt nichts an                      | Abonnent und Sender lösen zu unterschiedlichen `t/{identity}/…`-Präfixen auf  |
| Device-bezogener Trigger feuert nie                    | Verbindung nutzt ein **Controller**-Zertifikat → Topics landen unter `t/ctl_…/` |
| Verbindung bricht mit `SSL alert 40` ab                | Fehlendes oder ungültiges Plattform-Client-Zertifikat auf `:8883` (mTLS)      |
| Wildcard-Subscription klappt, eine relative aber nicht | Relative Subscriptions werden präfixiert, absolute/Wildcard nicht             |
