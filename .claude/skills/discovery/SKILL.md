---
name: discovery
description: >
  Discovery phase entry point. Dispatches the ba-orchestrator with --discovery flag,
  which routes to the discovery-agent. Produces BC.md, Discovery_RAID.md, and
  Discovery_Questions.md in workflow/02_discovery/. Always runs in built-in draft mode —
  never blocks on unanswered Q-XXX questions. Use before /ba for early-stage projects.
argument-hint: ""
version: 1.0.0
author: Viktor Bozzay
---

# Discovery – Workflow Entry Point

Dispatch the **ba-orchestrator** agent with the `--discovery` flag.

```
Agent: ba-orchestrator
Flags: --discovery
```

The orchestrator will:
1. Run file conversion if needed (convert_all Python package — 0 AI tokens)
2. Load memory context (via memory-agent)
3. Detect DISCOVERY_MODE from the `--discovery` flag
4. Dispatch **discovery-agent** directly (skips spec-builder and ba-document-agent)
5. Report back with the Discovery document set

Do not perform any discovery logic yourself. The ba-orchestrator handles routing;
the discovery-agent handles all extraction and document generation.

## What gets generated

| File | Contents |
|---|---|
| `workflow/02_discovery/BC.md` | Business Concept — main Discovery deliverable |
| `workflow/02_discovery/Discovery_RAID.md` | Early RAID — risks, assumptions, open issues; optionally includes a root-cause summary (RC-XXX) and self-reinforcing loops (ISSUE-XXX) if enough causal structure is identifiable in the sources |
| `workflow/02_discovery/Discovery_Questions.md` | Meeting-ready question checklist |
| `workflow/02_discovery/_system/DISCOVERY_OUTPUT.md` | Structured intermediate spec |

## When to use

- At the start of a project, before enough information exists for a full `/ba` Analysis run
- After a Sales → PM/BA handover, to extract problem/goals/scope/MVP from raw materials
- When a client meeting is coming up and you need a structured question list
- When you want to iterate: `/discovery` → meeting → answer questions → `/discovery` again → `/ba`

## Discovery vs. Analysis

| | `/discovery` | `/ba` |
|---|---|---|
| Output | BC.md, Discovery_RAID.md, Discovery_Questions.md | BRD, User_Stories, Process_Flows, RAID_Log, Glossary, Traceability_Matrix |
| Blocks on open questions? | **No** — always generates | **Yes** — stops if any Q-XXX unanswered |
| Depth | High-level: problem, goals, scope, MVP | Detailed: FR/NFR/US requirements |
| When to use | Early stage, incomplete information | Analysis stage, all Q-XXX answered |

## Language Rule

All output from the dispatched agent must be in Hungarian.
