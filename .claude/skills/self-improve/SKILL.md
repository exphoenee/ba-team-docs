---
name: self-improve
description: >
  Implements an approved feature request from app/featureRequests/ by dispatching
  self-care-agent in implement mode. The agent executes the TODO checklist, creates
  and modifies files according to BA Tool conventions, updates checkboxes after each
  step, and sets the feature request status to "Kész" when complete.
version: 1.1.0
author: Viktor Bozzay
disable-model-invocation: false
argument-hint: "[featureRequests/<filename>.md]"
---

# Self-Improve — Feature Request Implementation

Entry point for implementing approved BA Tool feature requests. Passes the file to self-care-agent.

## Step 1 — Dispatch

Pass the filename argument (if any) to self-care-agent in implement mode.

```
Agent: self-care-agent
mode: implement
file: <argument if provided, else empty>
```

self-care-agent will handle file selection if no argument was given.

## Language Rule

All user-facing output must be in **Hungarian**.

## Hard Constraints

- ❌ Never implement inline — always dispatch self-care-agent
- ❌ Never process requests with status `Elemzés kész — jóváhagyásra vár`
