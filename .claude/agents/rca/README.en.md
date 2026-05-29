# `rca-agent` — Root Cause Analysis Agent

[Magyar változat](README.md)

## Role

The `rca-agent` performs a full root cause analysis using the Chain/IR methodology from a
structured root-cause list. It only uses causes present in the input list — it never invents new ones.

## When is it called?

Dispatched by the `/rca` skill after the input Excel file has been converted to Markdown
by the `convert_all` Python package.

## What does it read?

| Source | Content |
|---|---|
| `workflow/01_project_info/rca_input*_converted.md` | Root-cause list, problem description, grouping |
| `workflow/01_project_info/_system/SPEC_OUTPUT.md` | Optional — project name enrichment only |

## What does it produce?

**`workflow/05_ba_docs/RCA_Analysis.md`** — full analysis:

| Section | Content |
|---|---|
| Root cause list | Numbered, cleaned list |
| Direct links | Source → caused table |
| Chain_Long | Causal chain table + Mermaid diagrams |
| Loop_Summary | Loop table + feedback diagram |
| IR_Mátrix | N×N connection matrix (1 = direct, chain-verified) |
| IR_Elemzés | Driver index + Suggested role (Driver / Symptom / Intermediary / Loop-amplifier) |
| QA Report | Results of 7 invariant checks |
| Executive summary | Top drivers + most critical loops + breaking point |

## Flags

| Flag | Effect |
|---|---|
| *(default)* | Full 9-step analysis |
| `--quick` | Chain_Long + Loop_Summary only; IR_Mátrix and IR_Elemzés skipped |
| `--validate` | QA check only on existing RCA_Analysis.md |

## Related Components

| Component | Relationship |
|---|---|
| `/rca` skill | Dispatches this agent |
| `convert_all` Python package | Input conversion — agent reads the `*_converted.md` file |
| `ba-document-agent` | Uses IR_Elemzés Role values to populate RAID_Log Szerep field |
