---
name: rca
description: >
  Root Cause Analysis skill using the Chain Analysis / Interrelationship Matrix methodology.
  Checks for a root-cause Excel input in workflow/01_project_info/, converts it via convert_all,
  and dispatches rca-agent to run the full 8-step causal analysis. Produces RCA_Analysis.md
  in workflow/05_ba_docs/ with causal chains, loops, IR matrix, and driver classification.
version: 1.0.0
author: Viktor Bozzay
disable-model-invocation: true
argument-hint: "[--quick] [--validate]"
---

# RCA – Root Cause Analysis

Run the full Chain/IR methodology on a structured root-cause list.

## Step 1 — Detect Available Input Sources

If `--validate` flag is active: skip Steps 1–2, go directly to Step 3.

Check which data sources are available (in priority order):

| Source | Path | Status |
|---|---|---|
| A | `workflow/01_project_info/_system/SPEC_OUTPUT.md` | Check if exists |
| B | `workflow/02_discovery/Discovery_RAID.md` | Check if exists |
| C | `workflow/03_answers/rca_input*.xlsx` or `rca_input*.csv` | Check if exists |

If NONE of A, B, or C exist: stop immediately and report:
```
❌ Nincs RCA-hoz szükséges adat.

A /rca az alábbi forrásokat keresi (csökkenő prioritással):
  1. workflow/01_project_info/_system/SPEC_OUTPUT.md  ← /ba futtatás után keletkezik
  2. workflow/02_discovery/Discovery_RAID.md           ← /discovery futtatás után keletkezik
  3. workflow/03_answers/rca_input.xlsx               ← opcionális, kézi gyökéroklista

Javasolt: futtasd előbb /ba vagy /discovery, majd újra /rca
```

If C exists (user-provided Excel): continue to Step 2.
If only A or B exists: skip Step 2, go directly to Step 3.

## Step 2 — Convert Optional Excel Input

Only runs if `workflow/03_answers/rca_input*` was found in Step 1.

```bash
python .claude/scripts/run_convert.py --scope answers
```

Show the stdout output. If conversion fails: show a warning but continue — rca-agent will
use sources A and B instead.

## Step 3 — Dispatch rca-agent

Dispatch the **rca-agent** agent, passing the active flags:
- `--quick` if the user invoked `/rca --quick`
- `--validate` if the user invoked `/rca --validate`

Agent: rca-agent

## Flags

| Flag | Behaviour |
|---|---|
| `/rca` | Full analysis — all steps + QA + executive summary |
| `/rca --quick` | Chain_Long + Loop_Summary only — IR_Mátrix and IR_Elemzés are skipped |
| `/rca --validate` | QA check only on the existing `workflow/05_ba_docs/RCA_Analysis.md` — no new analysis |

## Language Rule

All user-facing output must be in **Hungarian**.

## Hard Constraints

- ❌ Never dispatch rca-agent if no data source (A, B, or C) exists — except `--validate`
- ✅ Sources A and B (workflow data) take priority over C (user Excel)
- ✅ If only the Excel conversion fails, continue with workflow data sources
- ✅ If `--validate` is active: skip Steps 1–2, dispatch directly
