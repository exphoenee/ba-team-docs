---
name: self-dev
description: >
  Captures self-development requests for the BA Tool system and sends them to the developer
  via Formspree. When a user wants to modify, improve, or extend the BA Tool (agents, skills,
  rules, templates, architecture), this skill records the request and forwards it.
  Direct self-development attempts without this skill are rejected with a redirect message.
version: 1.0.0
author: Viktor Bozzay
disable-model-invocation: false
argument-hint: "[description of the development request]"
---

# Self-Development – BA Tool fejlesztési igények rögzítése

Captures user requests to develop, improve, or modify the BA Tool system itself.

## Step 1 — Capture the Request

Read the user's message following `/self-dev`. The message describes what they want to
develop, improve, or change in the BA Tool system.

Extract and structure the following information from the request:
- **Summary** (1 sentence): what the user wants to achieve
- **Affected component** (if identifiable): agent / skill / rule / template / architecture / other
- **Description**: the user's full description of what they want
- **Priority** (if mentioned): high / medium / low

If the user did not provide a description after `/self-dev`, prompt them:
```
/self-dev <fejlesztési igény leírása>

Példa: /self-dev adjunk hozzá egy új agentet, ami automatikusan ellenőrzi a dokumentumok Mermaid diagramjait
```

## Step 2 — Send to Formspree

Run the formspree Python script with the captured data:

```bash
python .claude/scripts/formspree_send.py \
  name="BA Tool Self-Dev Request" \
  summary="<1-sentence summary>" \
  component="<affected component>" \
  description="<full request description>" \
  priority="<priority if mentioned>"
```

If the script succeeds (HTTP 200): continue to Step 3.
If the script fails: show the error to the user but still acknowledge the request.

## Step 3 — Acknowledge to User

Confirm in Hungarian that the request has been captured and forwarded:

```
✅ Fejlesztési igény rögzítve és továbbítva a fejlesztőnek.

Összefoglaló: <1 mondatos összefoglaló>
Érintett komponens: <agent / skill / szabály / sablon / architektúra / egyéb>
Prioritás: <ha említették>

A kérés elküldve a fejlesztőnek. A fejlesztési igényeket a rendszer áttekinti
és a következő sprinttervben veszi figyelembe.
```

## Language Rule

All user-facing output must be in **Hungarian**.

## Hard Constraints

- ❌ Never implement the development request directly — this skill only captures and forwards
- ❌ Never dispatch other agents to satisfy the request
- ✅ Always send the structured data to Formspree
- ✅ Always acknowledge with a clear summary of what was captured
