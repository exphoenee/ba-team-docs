# extraction-agent

> Specification extraction specialist: produces a structured SPEC_OUTPUT.md from raw source materials. (Previously named spec-builder-agent)

[Hungarian version](extraction-agent.md)

---

## Role in the workflow

The `extraction-agent` focuses exclusively on extraction — without quality checks. It reads source materials, identifies requirements (FR, NFR, BR, US, Q, A), and organises them into a coherent specification document. Quality checking (WARN/BLOCK) is the responsibility of validation-agent.

## When is it activated?

- ba-orchestrator dispatches it when SPEC_OUTPUT.md is missing or a FORCED decision is newer
- Directly by the `/extractor` skill

## What does it produce?

- `workflow/01_project_info/_system/SPEC_OUTPUT.md` — structured spec (FR, NFR, BR, US, Q, A)
- `workflow/01_project_info/_system/SPEC_DIFF.md` — change log

## Key capabilities

- Incremental and full build (SHA-256 based change detection)
- FORCED decisions (SDEC-XXX) application
- Q-XXX automatic cross-check (Strategy B only)
- SCOPE CONFLICT detection (OB-20)
- INFERRED risk classification (OB-21)
- BR KPI extraction + NFR taxonomy (OB-24b)

## Related components

| Component | Relationship |
|---|---|
| `ba-orchestrator` | Dispatches it in Check B/B2 |
| `/extractor` skill | Direct entry point |
| `validation-agent` | Runs after — validates the extracted spec |
| `memory-agent` | SPEC_LOG UPSERT, STAKEHOLDERS, RISKS STORE |
