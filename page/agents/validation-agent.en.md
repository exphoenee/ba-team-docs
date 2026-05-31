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
| Compliance domain trigger (from `workflow/REGULATION/*.md`) | ❌ BLOCK or ⚠️ WARN (per domain `block:` flag) |
| SCOPE CONFLICT open questions | ⚠️ WARN |
| INFERRED:HIGH paired with RISK-XXX | ⚠️ WARN |
| Q-XXX ratio > 50% | ⚠️ WARN |
| Duplicate ID | ❌ BLOCK |

### Check 4 — Compliance domain trigger

The `validation-agent` reads keywords and required elements from domain files in `workflow/REGULATION/` — no hardcoded keyword list exists in the agent instruction.

**How it works:**
1. Loads all `workflow/REGULATION/*.md` files (excluding `custom_domain_template.md`)
2. Matches every FR text against the loaded keywords
3. If a match is found and a required spec element (e.g. RISK-XXX, ISSUE-XXX) is missing:
   - `block: true` domain → **BLOCK** status (source rule file named in the report)
   - `block: false` domain → **WARN** status
4. If `workflow/REGULATION/` does not exist → Check 4 skipped, WARN in report

**Adding a custom compliance domain:** Copy `custom_domain_template.md`, fill it in, and save it in `workflow/REGULATION/` under any filename.

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
