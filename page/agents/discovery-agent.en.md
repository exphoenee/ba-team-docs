# discovery-agent

> The Discovery phase specialist: produces a structured Discovery document package from early, incomplete project materials — never blocks generation on unanswered questions.

[Hungarian version](discovery-agent.md)

---

## Role in the workflow

The `discovery-agent` specialises in the gap between the sales handover and the first stakeholder meetings. It is most useful when project materials are still fragmentary — sales emails, meeting notes, one-page briefs. It does not wait for all questions to be answered: a structured question list is itself a valuable output.

## When is it activated?

- The `ba-orchestrator` dispatches it on the `--discovery` flag (sent by the `/discovery` skill)
- Can also be invoked directly by the `/discovery` skill

## Built-in draft mode

The `discovery-agent` **always** runs in draft mode. Q-XXX questions never block document generation — if open questions exist, `BC.md` receives a VÁZLAT (draft) header.

## Tone calibration rule

The discovery-agent mirrors the tone and register of source materials. If the source uses professional, solution-oriented language, the output reflects that — it does not escalate to "crisis vocabulary". If the BC.md's negative-content ratio exceeds the source's negative-content ratio by more than 15%, the phrasing must be revised toward the source register.

## What does it produce?

| File | Contents |
|---|---|
| `workflow/02_discovery/_system/DISCOVERY_OUTPUT.md` | Structured intermediate spec |
| `workflow/02_discovery/BC.md` | Business Concept — main Discovery deliverable |
| `workflow/02_discovery/Discovery_RAID.md` | Early RAID: risks, assumptions, open issues |
| `workflow/02_discovery/Discovery_Questions.md` | Meeting-ready question list by category |

## Extended extraction targets

In addition to the base extraction targets (problem, goals, scope, MVP, risks, stakeholders, questions), the agent also extracts:

| Element | Condition | Where it appears |
|---|---|---|
| Verbatim client request | If the source contains an explicit client statement | DISCOVERY_OUTPUT.md + BC.md section 0 |
| Source terminology | If the source contains an explicit glossary/definitional section | BC.md section 1b |
| Process catalog summary | If the source contains a process catalog | DISCOVERY_OUTPUT.md + BC.md section 3b |
| Discovery-level NFRs | Platform/UI/access constraints stated explicitly (NFR-XXX [Discovery forrás]) | DISCOVERY_OUTPUT.md NFR section |

## Steps

1. **Memory load** — `memory-agent` QUERY: PROJECT_CONTEXT, STAKEHOLDERS, RISKS
2. **Read inputs** — files in `workflow/01_project_info/`
3. **Read answers** — `workflow/03_answers/` (if any — Discovery and Analysis answers both)
4. **Generate DISCOVERY_OUTPUT.md** — structured intermediate spec (+ optional sections: client request, process catalog, Discovery-level NFRs) → `workflow/02_discovery/_system/`
5. **Generate three Discovery documents** — BC.md, Discovery_RAID.md, Discovery_Questions.md
6. **Save to memory** — PROJECT_CONTEXT, STAKEHOLDERS, RISKS (`memory-agent` STORE)
7. **Report** — back to `ba-orchestrator`

## Q-XXX categories in Discovery mode

| Category | When assigned |
|---|---|
| `[SCOPE]` | Boundary is unclear — what's in, what's out |
| `[MVP]` | MVP definition incomplete, must-have list not defined |
| `[FEASIBILITY]` | Feasibility is questionable |
| `[STAKEHOLDER]` | Decision-maker unknown, approver not identified |
| `[TECHNICAL]` | Technical prerequisite unknown — system, integration, API |

## Discovery → Analysis transition

If `ba-orchestrator` generates Analysis BA documents after Discovery, and `workflow/02_discovery/BC.md` exists, `ba-document-agent` produces Discovery-depth documents:
- **BRD:** scope and goal focus, fewer FR details
- **User Stories:** epic-level user journeys, 2–3 acceptance criteria
- **UAT:** 5–8 general scenarios

## Related components

| Component | Relationship |
|---|---|
| `ba-orchestrator` | Dispatches it on `--discovery` flag |
| `/discovery` skill | Can also invoke it directly |
| `memory-agent` | QUERY for loading, STORE for saving |
| `ba-document-agent` | Can use discovery output (`BC.md`) as context |