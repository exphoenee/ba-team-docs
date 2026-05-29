---
name: business-analyst
description: >
  Enterprise-grade Business Analyst skill. Dispatches the ba-document-agent to generate
  the full BA document set from spec, answers, and memory. Use when you want to run only
  the document generation phase without the full /ba orchestration.
disable-model-invocation: true
version: 2.0.0
author: Viktor Bozzay
---

# Business Analyst – Direct Entry Point

## Step 1 — Convert answer files

Before generating documents, run the conversion package directly for `workflow/03_answers/`:

```bash
python ${CLAUDE_SKILL_DIR}/../../scripts/run_convert.py --scope answers
```

Show the stdout output, then continue.

## Step 2 — Generate BA documents

Dispatch the **ba-document-agent** to generate the full BA document set.

```
Agent: ba-document-agent
```

The agent will:
1. Read `workflow/01_project_info/_system/SPEC_OUTPUT.md`, all answer files (including freshly converted ones), and memory context
2. Generate all mandatory BA documents with Mermaid diagrams
3. In `RAID_Log.md`: assign a `Szerep` (role) field to every RISK entry — Driver / Köztes csomópont / Hurokerősítő / Tünet / Validálandó — based on RCA_Analysis.md if available, otherwise estimated from the spec
4. For `[INFERRED:HIGH]` assumptions: optionally append a downstream annotation if causal links are clearly identifiable in the spec
5. Save to `workflow/05_ba_docs/`
6. Store decisions, glossary, and resolved questions in memory via memory-agent
7. Report back with a completion summary

Do not perform any document generation yourself. The ba-document-agent handles everything.

## Prerequisite

`workflow/01_project_info/_system/SPEC_OUTPUT.md` must exist and all Q-XXX questions must be answered
in `workflow/03_answers/` before dispatching. If unsure, use `/ba` instead — it checks automatically.

## When to use directly

Use `/business-analyst` when you want to regenerate BA documents after updating answers,
without re-running the full workflow. For the normal flow, use `/ba` instead.

## Language Rule

All output from the dispatched agent must be in Hungarian.
