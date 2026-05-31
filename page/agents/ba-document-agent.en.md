# ba-document-agent

> The BA document generation specialist: produces the complete, deliverable BA documentation package from a finished specification and answered questions.

[Hungarian version](ba-document-agent.md)

---

## Role in the workflow

The `ba-document-agent` is the final step in the BA workflow. It runs when all Q-XXX questions have been answered — it takes the specification, stakeholder answers, and FORCED decisions and produces all required BA documents from them. It also generates Mermaid diagrams for every process.

## When is it activated?

- The `ba-orchestrator` dispatches it when all Q-XXX questions are answered
- In `--draft` mode: also runs when Q-XXX questions are still open (with VÁZLAT header)
- Can also be invoked directly by the `/business-analyst` skill

## What does it produce?

| File | Contents |
|---|---|
| `BRD.md` | Business Requirements Document (with priority header) |
| `User_Stories.md` | User Stories with Gherkin acceptance criteria |
| `Process_Flows.md` | Process models (mandatory Mermaid diagrams) |
| `Traceability_Matrix.md` | Traceability matrix (with `Source file` column) |
| `RAID_Log.md` | Risks, assumptions, dependencies |
| `Glossary.md` | Domain glossary |
| `_system/BA_DOCS_LOG.md` | Generation log (when, from what, in what mode) |
| `_system/BA_DOCS_DIFF.md` | Change report (what the last run modified) |

## Steps

1. **Read inputs** — `SPEC_OUTPUT.md`, `03_answers/`, `04_decisions/`, memory (skipping binaries)
2. **Impact-based selection (OB-26)** — reads `SPEC_DIFF.md`: only regenerates affected documents; unchanged ones get `[Nincs változás]` header
3. **Generate documents** — with mandatory Mermaid diagrams for every process
4. **INFERRED:HIGH → RISK (OB-21)** — high-risk assumptions automatically become RISK entries in RAID_Log
5. **Mermaid syntax validation (OB-16)** — WARN report after each diagram (non-blocking)
6. **Preserve source annotations** — `[Forrás: filename · sha8]` annotations carried through; Traceability Matrix gets `Source file` column
7. **Save** — to `workflow/05_ba_docs/`
8. **Generation log (OB-14)** — `BA_DOCS_LOG.md`: timestamp, spec SHA, mode
9. **Memory update** — `memory-agent` BATCH STORE: RESOLVED_QUESTIONS `status: archived`
10. **Change report (OB-27)** — generates `BA_DOCS_DIFF.md`
11. **Report** — back to `ba-orchestrator`

## Related components

| Component | Relationship |
|---|---|
| `ba-orchestrator` | Dispatches it when all Q-XXX are answered |
| `/business-analyst` skill | Can also invoke it directly |
| `spec-builder-agent` | ba-document-agent processes spec-builder's `SPEC_OUTPUT.md` |
| `memory-agent` | Archives RESOLVED_QUESTIONS (BATCH STORE) |
