---
name: check-state
description: >
  Checks the current project state: what phase the project is in, what steps remain,
  which files are answered and which are missing. Provides a structured summary
  of the workflow state for the user or for internal use by /help.
version: 1.0.0
author: Viktor Bozzay
disable-model-invocation: false
argument-hint: ""
---

# Check State — Project State Inspector

Inspects the workflow folders and reports the current project phase, file status, and missing steps.

## Step 1 — Inspect Workflow Folders

Load reference:
`app/.claude/references/check_state_protocol.md`

Reference loading policy:
- Load this reference at Step 1 (state check protocol).

Follow the folder inspection rules defined in the reference file. For each folder, check:

1. `workflow/01_project_info/` — count all files, check for `_system/SPEC_OUTPUT.md` and `_system/SPEC_DIFF.md`
2. `workflow/02_discovery/` — check for `BC.md`, `Discovery_RAID.md`, `Discovery_Questions.md`
3. `workflow/03_answers/` — count answer files
4. `workflow/04_decisions/` — count SDEC-XXX files
5. `workflow/05_ba_docs/` — check for `BRD.md`, `User_Stories.md`, `Process_Flows.md`, `Traceability_Matrix.md`, `RAID_Log.md`, `Glossary.md`, `RCA_Analysis.md`

## Step 2 — Determine Project Phase

Use the phase determination logic from the reference file. Determine which phase the project is in:

| Phase | Condition |
|---|---|
| Empty project | `01_project_info/` is empty or has only unconvertible files |
| Discovery | `02_discovery/` has files, `_system/SPEC_OUTPUT.md` does NOT exist |
| Spec building | `_system/SPEC_OUTPUT.md` exists, `03_answers/` has no or partial answers |
| Answering | `_system/SPEC_OUTPUT.md` exists, Q-XXX questions exist, `03_answers/` is partial |
| Document generation | All Q-XXX answered, `05_ba_docs/` is empty or missing some docs |
| Complete | `05_ba_docs/` contains all mandatory documents |
| FORCED pending | `04_decisions/` has a file newer than `_system/SPEC_OUTPUT.md` |

## Step 3 — List Open Q-XXX Questions (if SPEC_OUTPUT.md exists)

If `_system/SPEC_OUTPUT.md` exists, read the Open Questions Summary table and list:

- All unanswered Q-XXX questions (ID + category + brief summary)
- The count of answered questions (if `03_answers/` has content)

## Step 4 — Display Structured Report

Use the output template from the reference file to display the project state:

```
============================================================
  PROJEKT ÁLLAPOT — /check-state
============================================================
  Fázis: [phase name]

  WORKFLOW ÁTTEKINTÉS
  [01] Bemeneti anyagok:  [N] fájl ([N] nem-markdown)
  [01] SPEC_OUTPUT.md:    ✅ / ⚠️ / ❌
  [01] SPEC_DIFF.md:      ✅ / ❌
  [02] Discovery:         ✅ / ❌ ([files])
  [03] Válaszok:          [N] fájl · [X] megválaszolt / [Y] összes Q-XXX
  [04] Döntések:          [N] db SDEC-XXX
  [05] BA dokumentumok:   ✅ / ⚠️ ([files])

  HIÁNYZÓ LÉPÉSEK
  • [1. missing step]
  • [2. missing step]

  JAVASOLT KÖVETKEZŐ LÉPÉS
  → [recommended command]
============================================================
```

## Language Rule

All user-facing output must be in **Hungarian**.

## Hard Constraints

- ❌ Never dispatch any agent — /check-state reads files directly and reports
- ❌ Never modify files in workflow folders
- ✅ Always show the full structured report
- ✅ Use the shared `check_state_protocol.md` reference for inspection rules and template
