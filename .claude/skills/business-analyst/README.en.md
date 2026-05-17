# `/business-analyst` – BA Document Generator

[Magyar változat](README.md)

## What is it for?

The `/business-analyst` skill performs the core task of an enterprise IT Business Analyst: it produces a **complete, deliverable, audit-ready BA documentation package** from the structured specification and answered questions.

The skill possesses senior enterprise BA knowledge: it understands Agile, Scrum, and SAFe frameworks, the insurance and financial sectors, regulatory requirements (GDPR, PCI-DSS, AML/KYC), and creates every document so that it can be used directly for project work, developer handoff, or audits.

> **Note:** In most cases, you don't need to call it directly — the `/ba` skill automatically runs it when all questions are answered.

---

## How to use it?

Make sure that:
- `workflow/01_project_info/_system/SPEC_OUTPUT.md` exists (prepared by `/spec-builder`)
- `workflow/02_answers/` contains answer files (all Q-XXX questions answered)

Then, in the Claude panel, type:

```
/business-analyst
```

---

## What does it produce?

Every document is placed in the `workflow/03_ba_docs/` folder as a separate file.

### Mandatory Documents

**`BRD.md` – Business Requirements Document**
All business and functional requirements with unique identifiers (BR-XXX, FR-XXX, NFR-XXX), formulated to be testable and traceable. Distinguishes between business, functional, non-functional requirements, and technical constraints.

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

**`Glossary.md` – Domain Glossary**
Definitions of technical terms, abbreviations, and domain-specific concepts used in the project.

### Optional Documents (if enough data is available)

| File | Content |
|---|---|
| `Data_Dictionary.md` | Data entities, fields, types, constraints — with ER diagram |
| `UAT_Test_Cases.md` | UAT testing scenarios, linked to requirements |
| `Stakeholder_Map.md` | Stakeholder map with Mermaid diagram |
| `Regulatory_Checklist.md` | GDPR, PCI-DSS, SOX, AML/KYC, Solvency II impact analysis |

---

## Mermaid Diagrams

The skill **must create** a Mermaid diagram for every process description — it is not satisfied with text descriptions alone.

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

## Related Skills

| Skill | Relationship |
|---|---|
| `/ba` | Calls it automatically when all Q-XXX are answered |
| `/spec-builder` | Produces the specification that this works from |
| `/mermaid-diagrams` | If a standalone diagram is needed |
| `/memory-handler` | Saves prepared decisions and technical terms here |
