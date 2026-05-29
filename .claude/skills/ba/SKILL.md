---
name: ba
description: >
  Unified BA workflow entry point. Dispatches the ba-orchestrator agent which autonomously
  detects workflow state, delegates to spec-builder-agent or ba-document-agent as needed,
  coordinates memory via memory-agent, and reports back. Use /ba as the single trigger
  for the entire workflow.
argument-hint: "[--preview] [--draft] [--force] [--discovery]"
version: 2.2.0
author: Viktor Bozzay
---

# BA – Workflow Entry Point

Dispatch the **ba-orchestrator** agent to run the full workflow.

```
Agent: ba-orchestrator
```

The agent will:
1. Load memory context (via memory-agent)
2. Check flags passed by the user (--preview, --draft, --force, --discovery)
3. Detect the current workflow state
4. Delegate to spec-builder-agent OR ba-document-agent as appropriate
5. Store findings in memory (via memory-agent)
6. Report back with results and next steps

Do not perform any workflow logic yourself. The ba-orchestrator handles everything.

## Flags

| Flag | Effect |
|---|---|
| `--preview` | Show what would happen without making any changes |
| `--draft` | Generate BA documents even if Q-XXX questions are unanswered — adds VÁZLAT header to every doc |
| `--force` | Skip the "docs up to date" check and force BA document regeneration. Also bypasses FORCED-decision spec rebuild. |
| `--discovery` | Run in discovery mode — dispatches discovery-agent instead of the normal workflow |

## Language Rule

All user-facing output from dispatched agents must be in Hungarian.
