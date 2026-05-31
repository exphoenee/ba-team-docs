# rca-agent

> Root Cause Analysis specialist: produces a full Chain/IR analysis from a structured root-cause Excel input, with causal chains, self-reinforcing loops, and driver/symptom classification.

[Hungarian version](rca-agent.md)

---

## Role in the workflow

The `rca-agent` is the Root Cause Analysis specialist. Single responsibility: execute the Chain Analysis and Interrelationship Matrix (IR) methodology on a prepared root-cause Excel file and produce a deliverable `RCA_Analysis.md` document. **It never invents new root causes** — it works exclusively with the input list.

## When is it activated?

Two ways:
1. **Automatically** — `ba-orchestrator` dispatches it when SPEC_OUTPUT.md contains ≥3 `[INFERRED:HIGH]` assumptions or ≥5 RISK-XXX items, and RCA_Analysis.md is missing or stale
2. **Manually** — dispatched by the `/rca` skill

## Available flags

| Flag | Effect |
|---|---|
| `/rca` | Full analysis (steps 1–9) |
| `/rca --quick` | Fast mode: IR_Matrix and IR_Analysis skipped (steps 1–5 + 8–9) |
| `/rca --validate` | QA check only on existing `RCA_Analysis.md` (steps 1–7 skipped) |

## Input sources (priority order)

| Priority | Source | Contents | Required? |
|---|---|---|---|
| 1 | `workflow/01_project_info/_system/SPEC_OUTPUT.md` | A-XXX (especially `[INFERRED:HIGH]`), RISK-XXX | No |
| 2 | `workflow/02_discovery/Discovery_RAID.md` | RC-XXX, RISK-XXX, A-XXX | No |
| 3 | `workflow/03_answers/rca_input*_converted.md` | Optional user supplement | No |

If no source is available → stop with a detailed error message.

## What does it produce?

`workflow/05_ba_docs/RCA_Analysis.md` — with the following sections:

| Section | Contents |
|---|---|
| Executive summary | Top 2–3 drivers, most critical loop, best breaking point recommendation |
| Root cause list (cleaned) | Numbered, cleaned list from input |
| Direct causal links | Table: which cause directly triggers which |
| Chain_Long — Causal chains | Deep chains in table + Mermaid flowchart for each chain |
| Loop_Summary — Self-reinforcing loops | Loop identification, business interpretation, breaking point |
| IR_Matrix | N×N matrix: 1 = direct link (skipped in --quick mode) |
| IR_Analysis | Driver/symptom classification with scores (skipped in --quick mode) |
| QA Report | 7 invariant checks ✅/❌ |

## Analysis steps

1. **Input validation** — root cause list identification, columns, SHA-256 fingerprint
2. **Root cause list cleaning** — display cleaning only, no content changes
3. **Direct causal links** — for each pair: is the causal link direct?
4. **Chain_Long** — build deep causal chains + Mermaid diagrams
5. **Loop_Summary** — identify self-reinforcing loops + Mermaid diagrams
6. **IR_Matrix** — N×N matrix (direct links confirmed in Chain_Long)
7. **IR_Analysis** — outgoing/incoming scores, driver/symptom classification
8. **QA Check** — 7 invariants (cannot be skipped)
9. **Executive Summary** — 3–5 sentence management summary

## Hard constraints

- Never invent a root cause not in the input list
- Never rename, merge, or split root causes
- IR_Matrix `1` only if the pair are consecutive steps in Chain_Long
- Output exclusively to `workflow/05_ba_docs/RCA_Analysis.md`
- QA Check (step 8) is mandatory on every run regardless of flags

## Related components

| Component | Relationship |
|---|---|
| `/rca` skill | Dispatches the agent |
| `convert_all` (Python) | Converts the Excel input — rca-agent reads the resulting `_converted.md` |
