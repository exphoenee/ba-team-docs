# `/business-analyst` – BA Document Generator

[Magyar változat](README.md)

## What is it for?

The `/business-analyst` skill performs the core task of an enterprise IT Business Analyst: it produces a **complete, deliverable, audit-ready BA documentation package** from the structured specification and answered questions.

The skill possesses senior enterprise BA knowledge: it understands Agile, Scrum, and SAFe frameworks, the insurance and financial sectors, regulatory requirements (GDPR, PCI-DSS, AML/KYC), and creates every document so that it can be used directly for project work, developer handoff, or audits.

> **Note:** In most cases, you don't need to call it directly — the `/ba` skill automatically runs it when all questions are answered.

---

## How to use it?

Make sure that:
- `workflow/01_project_info/_system/SPEC_OUTPUT.md` exists (prepared by `/extractor`)
- `workflow/03_answers/` contains answer files (all Q-XXX questions answered)
- (optional) `workflow/01_project_info/_system/SPEC_VALIDATION.md` exists — created automatically by `/validate` or `/ba`

If there are FORCED decisions (`workflow/04_decisions/` — SDEC-XXX files), they are automatically incorporated into the documents.

Then, in the Claude panel, type:

```
/business-analyst
```

---

## Validation Warnings in Documents

If `SPEC_VALIDATION.md` (created by `/validate` or `/ba`) contains WARN-level items, they appear in the generated documents:

```
[⚠️ Validation warning: BR-003 — missing KPI, Q-XXX open]
```

This does not block generation — it makes visible where further clarification is needed.

If `SPEC_VALIDATION.md` has BLOCK status, `/ba` stops before generation. When run directly (`/business-analyst`), the skill shows a warning but continues.

---

## What does it produce?

Every document is placed in the `workflow/05_ba_docs/` folder as a separate file.

### Mandatory Documents

**`BRD.md` – Business Requirements Document**
All business and functional requirements with unique identifiers (BR-XXX, FR-XXX, NFR-XXX), formulated to be testable and traceable. Distinguishes between business, functional, non-functional requirements, and technical constraints.

> **Phase-assignment warning:** The BRD always includes an auto-generated note: `⚠️ Phase assignment auto-generated — validation recommended.` This is a reminder that Phase 1 / Phase 2 priority assignment is AI-based — stakeholder review is advised.

**`User_Stories.md` – User Stories**
User needs formulated in Agile format:
```
As a [role]
I want [capability]
So that [business result]
```
Each story includes Gherkin syntax acceptance criteria:
```gherkin
Given ...
When ...
Then ...
```

**`Process_Flows.md` – Process Models**
Every business process visually represented with Mermaid diagrams. Flowcharts, state machines, decision trees — whatever the process requires.

**`Traceability_Matrix.md` – Traceability Matrix**
Shows which customer need led to which requirement and which document it is in.

**`RAID_Log.md` – Risks and Dependencies**
Structured log: Risks, Assumptions, Issues, Dependencies.

> **Automatic risk generation:** If the specification contains an `[INFERRED:HIGH]` assumption, the skill automatically generates a RISK entry in the RAID_Log — without human intervention.

**`Glossary.md` – Domain Glossary**
Definitions of technical terms, abbreviations, and domain-specific concepts used in the project.

### Optional Documents (if enough data is available)

| File | Content |
|---|---|
| `Data_Dictionary.md` | Data entities, fields, types, constraints — with ER diagram |
| `UAT_Test_Cases.md` | UAT testing scenarios, linked to requirements |
| `Stakeholder_Map.md` | Stakeholder map with Mermaid diagram |
| `Regulatory_Checklist.md` | GDPR, PCI-DSS, SOX, AML/KYC, Solvency II impact analysis |

### System Files (`_system/`)

| File | Content |
|---|---|
| `_system/BA_DOCS_LOG.md` | Generation log — timestamp, spec SHA, mode |
| `_system/BA_DOCS_DIFF.md` | Change report — what the last run modified, what remained unchanged |

---

## Mermaid Diagrams

The skill **must create** a Mermaid diagram for every process description — it is not satisfied with text descriptions alone.

> **Syntax validation:** After every generated diagram, the skill automatically performs a regex-based syntax check. If a broken diagram is found, a WARN message is shown — but this **does not block** document generation.

| Depicts | Diagram Type |
|---|---|
| Business process, workflow | `flowchart` |
| Inter-system communication | `sequenceDiagram` |
| State transitions | `stateDiagram-v2` |
| Data relationships | `erDiagram` |
| Stakeholder relationships | `graph LR` |
| Milestones, roadmap | `gantt` |

---

## Requirement Standards

Mandatory characteristics of every requirement:
- **Unique identifier** (BR-001, FR-001, NFR-001, US-001...)
- **Testable** — it can be determined whether it is met or not
- **Traceable** — can be traced back to a customer need
- **Atomic** — describes a single thing
- **Unambiguous** — contains no ambiguity

---

## Regulatory Awareness

The skill automatically evaluates the impacts of the following regulatory areas, if relevant:
GDPR · PCI-DSS · SOX · HIPAA · Solvency II · FCA · AML/KYC

---

## Discovery vs. Analysis Depth Generation

If the project started with `/discovery` and `ba-orchestrator` detects that `workflow/02_discovery/BC.md` exists
(Discovery→Analysis transition), the skill automatically produces **Discovery-depth documents**.

Every Discovery-depth document gets this header:
```
📍 Generálás módja: DISCOVERY
```

**Difference between the two modes:**

| Document | Discovery depth | Analysis depth |
|---|---|---|
| `BRD.md` | Scope and goal focus; must-have FRs only | Complete FR/NFR list with full detail |
| `User_Stories.md` | Epic-level user journeys, 2–3 acceptance criteria per story | Detailed US-XXX with full Gherkin |
| `UAT_Test_Cases.md` | 5–8 general epic-level test scenarios | 10–20 detailed TC-XXX test cases with steps |
| Other docs | From SPEC_OUTPUT, reduced detail | Full depth |

To get Analysis-depth documents on a Discovery-based project, run: `/ba --force`

> **Important:** Discovery-depth documents are only generated automatically on the **first** Analysis run (when `workflow/05_ba_docs/` is still empty). Every subsequent run and every `--force` run defaults to Analysis depth.

---

## Document Quality

### User Stories

In Analysis mode, every US receives a minimum of 3 Gherkin acceptance criteria (Given/When/Then):
- **Scenario 1 — Happy path:** normal successful case
- **Scenario 2 — Edge case:** boundary condition
- **Scenario 3 — Error case:** error handling

Every US must specify a concrete role (e.g., "Project Manager", "Junior Designer" — not just "User").

In Discovery mode, 1–2 simplified acceptance criteria are sufficient.

### UAT Test Cases

Mandatory structure for every test case in Analysis mode:
- **Preconditions** (system state before the test)
- **Test steps** (numbered)
- **Expected result**
- **Acceptance criterion** (**PASSED** / **FAILED** condition)

In Discovery mode, general epic-level scenarios without TC-XXX identifiers are sufficient.

### Assumptions and Risks

Assumptions annotated `[INFERRED:HIGH]` appear in both:
- the **A-XXX assumptions list** (preserved)
- the **RAID Log RISK section** (additive entry)

The two entries complement each other — they are not mutually exclusive. The A-XXX row references the RISK-XXX, and vice versa.

If a clear causal link between the assumption and other A-XXX / RISK entries is identifiable, the A-XXX entry optionally includes a downstream reference:
```
→ Downstream hatás: A-003 (delayed decisions), RISK-004 (scope creep)
```

### RAID Log — risk prioritisation

Every RISK entry includes a `Szerep` (Role) field showing its position in the causal chain:

| Role | Meaning | Action |
|---|---|---|
| **Driver** | Many downstream effects — this causes the others | **Priority 1 — intervene here** |
| **Köztes csomópont** | Caused by AND causes others — critical intermediary | Monitor |
| **Hurokerősítő** | Part of a self-reinforcing loop | Break the loop |
| **Tünet / végpont** | Many upstream causes — pain is visible here | Do not start solution here |
| **Validálandó** | Insufficient data to classify | Clarify in workshop |

If the `/rca` skill has also been run, the Role fields are populated automatically from the IR_Elemzés output.

---

## Related Skills

| Skill | Relationship |
|---|---|
| `/ba` | Calls it automatically when all Q-XXX are answered |
| `/discovery` | Discovery phase entry point — this skill works from the discovery-agent's output |
| `/extractor` | Produces the specification that this works from |
| `/mermaid-diagrams` | If a standalone diagram is needed |
| `/memory-handler` | Saves prepared decisions and technical terms here |
