# ba-orchestrator

> The main coordinator: assesses workflow state and delegates work to the appropriate specialist agent.

[Hungarian version](ba-orchestrator.md)

---

## Role in the workflow

The `ba-orchestrator` is the BA Team's "brain." It does not write specifications or generate documents — it only decides: it checks where the project stands and calls the appropriate agent. Every `/ba` run flows through this agent.

## When is it activated?

The `/ba` skill dispatches it every time the user runs the `/ba` command.

## Operating logic

The orchestrator recognises and handles five possible workflow states:

| State | Condition | Action |
|---|---|---|
| No input | `01_project_info/` is empty | Notifies user, stops |
| No spec | Input exists but no `SPEC_OUTPUT.md` | Runs `spec-builder-agent` |
| FORCED decision newer than spec | `04_decisions/` file mtime > spec mtime | Re-runs `spec-builder-agent` |
| Open Q-XXX questions | Spec exists but questions are unanswered | Lists questions, stops |
| All done | Spec exists, all Q-XXX answered | Runs `ba-document-agent` |

## Special flags

| Flag | Effect |
|---|---|
| `/ba --draft` | Generate BA documents with VÁZLAT header even with unanswered questions |
| `/ba --force` | Force BA document regeneration, bypasses up-to-date check |
| `/ba --discovery` | Run `discovery-agent` instead of `spec-builder`/`ba-document-agent` |

## Steps

1. **File conversion** — runs `convert_all` Python package if needed (0 AI tokens)
2. **Memory load** — `memory-agent` targeted QUERY: only relevant files
3. **Input estimation (OB-01)** — if 20+ files or >100K tokens expected: non-blocking warning
4. **State assessment** — inspects workflow folder contents and mtimes
5. **FR priority preview (OB-25)** — before BA doc generation, lists FRs in Phase 1/2 groups
6. **Delegation** — dispatches the appropriate agent based on state
7. **Reporting** — notifies the user of the result

## Input priority order (for spec-builder)

| Priority | Source | Effect |
|---|---|---|
| **1 (FORCED)** | `workflow/04_decisions/` (`forced: true`) | Overwrites targeted IDs; `[FORCED]` annotation |
| 2 | `workflow/02_discovery/BC.md` | Priority base: problem, goals, scope |
| 3 | `workflow/02_discovery/Discovery_RAID.md` | Early risks, assumptions |
| 4 | `workflow/01_project_info/` | Raw materials |
| 5 | `workflow/03_answers/` | Stakeholder answers |

## Related components

| Component | Relationship |
|---|---|
| `/ba` skill | Dispatches the orchestrator |
| `spec-builder-agent` | Orchestrator dispatches it when spec is missing or FORCED decision exists |
| `ba-document-agent` | Orchestrator dispatches it when all Q-XXX are answered |
| `discovery-agent` | Orchestrator dispatches it when `--discovery` flag is active |
| `memory-agent` | Orchestrator loads memory via QUERY at the start of every run |
| `convert_all` (Python) | Orchestrator triggers file conversion |