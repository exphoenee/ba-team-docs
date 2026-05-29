---
name: validate
description: >
  Standalone spec quality gate. Dispatches validation-agent on the existing SPEC_OUTPUT.md
  and writes SPEC_VALIDATION.md with PASS/WARN/BLOCK status across 8 quality dimensions.
  Does not generate BA documents — use /ba for the full workflow.
version: 1.0.0
author: Viktor Bozzay
disable-model-invocation: true
argument-hint: ""
---

# Validate – Specification Quality Gate

Run quality checks on the current spec without generating BA documents.

## Step 1 — Check Prerequisites

Verify that `workflow/01_project_info/_system/SPEC_OUTPUT.md` exists.

→ If NOT found: stop and report:
```
❌ Nincs SPEC_OUTPUT.md — nincs mit validálni.
Futtasd előbb: /ba (spec generáláshoz), majd: /validate
```

→ If found: continue to Step 2.

## Step 2 — Dispatch validation-agent

Dispatch the **validation-agent** to check the spec quality.

Agent: validation-agent

## Step 3 — Report Results

Display the validation-agent's full report to the user.

If status is BLOCK:
```
❌ BLOCK státusz — a dokumentumgenerálás megállna.
Ha mindenképpen folytatni akarod a /ba workflow-t: /ba --force
```

If status is WARN:
```
⚠️ WARN — a /ba dokumentumokat generálna, de figyelmeztetésekkel.
```

If status is PASS:
```
✅ PASS — a spec minden minőségi dimenzión átment. Futtasd: /ba
```

## Language Rule

All user-facing output must be in **Hungarian**.

## Hard Constraints

- ❌ Never dispatch ba-document-agent — /validate is read-only
- ✅ Always show the full SPEC_VALIDATION.md content in the report
