---
name: spec-builder
description: >
  Transforms unstructured meeting notes, MoM documents, email threads, workshop summaries,
  and Slack/Teams excerpts into a structured, decision-grade software specification package.
  Dispatches the extraction-agent directly (formerly spec-builder-agent). Use when you want to run only the spec phase
  without the full /ba orchestration.
disable-model-invocation: true
version: 2.0.0
author: Viktor Bozzay
---

# Spec Builder – Direct Entry Point

## Step 1 — Convert input files

Before building the spec, run the conversion package directly for `workflow/01_project_info/`:

```bash
python ${CLAUDE_SKILL_DIR}/../../scripts/run_convert.py --scope inputs
```

Show the stdout output, then continue.

## Step 2 — Build the specification

Dispatch the **extraction-agent** to generate the structured specification.

```
Agent: extraction-agent
```

The agent will:
1. Read all files in `workflow/01_project_info/` (including freshly converted ones)
2. Compute SHA-256 fingerprints for all source files
3. Generate the structured specification (FR-XXX, NFR-XXX, US-XXX, Q-XXX) with source annotations
   — every element includes `[Forrás: filename · sha8]` pointing to the original input file
4. Save to `workflow/01_project_info/_system/SPEC_OUTPUT.md`
5. Store context in memory via memory-agent
6. Report back with the open questions list

Do not perform any spec-building logic yourself. The extraction-agent handles everything.

## When to use directly

Use `/spec-builder` when you want to regenerate or update the spec without running
the full workflow. For the normal flow, use `/ba` instead.

## Language Rule

All output from the dispatched agent must be in Hungarian.
