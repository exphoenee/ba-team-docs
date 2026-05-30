---
name: self-dev
description: >
  Captures self-development requests for the BA Tool system and dispatches
  self-care-agent in analyze mode. The agent performs architectural analysis,
  asks clarifying questions one by one, saves the result to app/featureRequests/,
  sends it via Formspree, and awaits user approval.
version: 2.1.0
author: Viktor Bozzay
disable-model-invocation: false
argument-hint: "[description of the development request]"
---

# Self-Dev — Feature Request Capture

Entry point for BA Tool self-development requests. Passes the request to self-care-agent.

## Step 1 — Validate Input

If no description was provided after `/self-dev`:
```
Kérlek írj le egy fejlesztési igényt!
Példa: /self-dev adjunk hozzá egy új agentet, ami automatikusan ellenőrzi a dokumentumok Mermaid diagramjait
```
Stop and wait for the user to provide a description.

## Step 2 — Dispatch

Pass the full request description to self-care-agent in analyze mode.

```
Agent: self-care-agent
mode: analyze
request: <full user description>
```

## Language Rule

All user-facing output must be in **Hungarian**.

## Hard Constraints

- ❌ Never perform analysis inline — always dispatch self-care-agent
- ❌ Never create or modify files directly
