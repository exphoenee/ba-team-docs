# validation-agent

> Quality gate for the specification: checks SPEC_OUTPUT.md across 8 dimensions and returns PASS/WARN/BLOCK to ba-orchestrator — does not generate documents.

[Hungarian version](validation-agent.md)

---

## Role in the workflow

The `validation-agent` is the quality gate of the BA workflow. It runs after the extraction and RCA agents, before document generation. Its sole responsibility: verify that SPEC_OUTPUT.md meets all mandatory quality conditions before ba-document-agent begins producing documents.

## When is it activated?

Two ways:
1. **Automatically** — ba-orchestrator dispatches it in the Check Validation step (on every /ba run when the spec is newer than SPEC_VALIDATION.md)
2. **Manually** — dispatched by the `/validate` skill

## What does it check?

| Dimension | Level |
|---|---|
| BR metric coverage | ⚠️ WARN |
| NFR taxonomy (5 categories) | ⚠️ WARN |
| FR domain coverage (OB-24b) | ⚠️ WARN |
| GDPR trigger | ❌ BLOCK |
| SCOPE CONFLICT open questions | ⚠️ WARN |
| INFERRED:HIGH paired with RISK-XXX | ⚠️ WARN |
| Q-XXX ratio > 50% | ⚠️ WARN |
| Duplicate ID | ❌ BLOCK |

## What does it produce?

`workflow/01_project_info/_system/SPEC_VALIDATION.md`

Status: ✅ PASS | ⚠️ WARN | ❌ BLOCK

## Related components

| Component | Relationship |
|---|---|
| `ba-orchestrator` | Dispatches it in the Check Validation step |
| `/validate` skill | Manual entry point |
| `extraction-agent` | Runs before it — produces SPEC_OUTPUT.md |
| `rca-agent` | Runs before it — RCA_Analysis.md used optionally |
| `ba-document-agent` | Runs after it — reads SPEC_VALIDATION.md |
