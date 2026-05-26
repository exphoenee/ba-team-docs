# `/spec-builder` – Specification Builder

[Magyar változat](README.md)

## What is it for?

The `/spec-builder` skill creates a **structured specification package suitable for decision-making** from unstructured, raw human communication — meeting notes, emails, Slack/Teams messages, and coordination records.

The skill brings to the surface contradictions, assumptions, and gaps that would otherwise remain hidden in the raw materials. It identifies questions that still need to be asked of the client or stakeholders before the BA documentation can be prepared.

---

## Incremental Specification Update

`/spec-builder` intelligently handles project changes:
- **Reads only what's new**: If you add a new file to the project or modify an existing one, the system recognizes this and only "merges" the changes into the existing `_system/SPEC_OUTPUT.md`.
- **Preserves continuity**: During an incremental update, previously assigned requirement IDs (`FR-XXX`) and question IDs (`Q-XXX`) do not change, and new ones are given sequential numbers.
- **Token-saving**: The entire input material doesn't need to be reprocessed every time, which significantly reduces runtime and costs.

> **When does a full regeneration occur?** If you delete files from the project, the system rebuilds the entire specification for security reasons to avoid orphaned or invalid requirements.

> **Note:** In most cases, you don't need to call it directly — the `/ba` skill automatically runs it when necessary.

---

## How to use it?

1. Copy client materials (meeting notes, emails, etc.) into the `workflow/01_project_info/` folder.
2. In the Claude panel, type:

```
/spec-builder
```

---

## What does it take as input?

It accepts any raw text material:

- Meeting notes
- Email correspondences
- Slack / Teams exports
- Workshop summaries
- Client feedback
- Audio recording transcripts

In the case of multiple documents, it merges them into **a single cohesive model**, not treating them as separate specifications.

### Input Priority Order

When information comes from multiple sources, the spec-builder processes them in the following priority order:

| Priority | Source | Effect |
|---|---|---|
| **1 (FORCED)** | `workflow/04_decisions/` — SDEC-XXX files | Overrides targeted elements; `[FORCED]` annotation added |
| 2 | `workflow/02_discovery/BC.md` | Priority base: problem, goals, scope |
| 3 | `workflow/02_discovery/Discovery_RAID.md` | Early risks and assumptions |
| 4 | `workflow/01_project_info/` | Raw input materials |
| 5 | `workflow/03_answers/` | Stakeholder answers to Q-XXX questions |

### FORCED Decisions (`04_decisions/`)

`SDEC-XXX_name.md` files placed in `workflow/04_decisions/` allow stakeholders and the PM to override any requirement derived by spec-builder. Files use YAML frontmatter:

```yaml
---
id: SDEC-001
type: OVERRIDE          # OVERRIDE | ADDENDUM
targets: [FR-012]       # which requirement(s) this affects
forced: true
decided_by: Product Owner
date: 2024-03-15
rationale: Required due to regulatory change
---

The new requirement text goes here.
```

- `OVERRIDE` — replaces the content of the targeted ID(s)
- `ADDENDUM` — adds alongside the targeted ID(s) as a supplement
- `forced: true` — required field; without it the decision is ignored

Template file: `.claude/references/decision_template.md`

---

## What does it produce?

The result is saved in the `workflow/01_project_info/_system/SPEC_OUTPUT.md` file. This single file contains all the following parts:

### 1. Structured Specification
Normalized, implementation-ready requirements with unique identifiers:

| Identifier Type | Example | Meaning |
|---|---|---|
| `FR-001` | Functional requirement | What the system must be able to do |
| `NFR-001` | Non-functional requirement | Performance, security, scalability |
| `US-001` | User Story | User need |
| `A-001` | Assumption | What the spec is built on, but is not explicitly stated |

Every item is marked:
- `[EXPLICIT]` – appeared literally in the input material
- `[INFERRED]` – strongly follows from it, but is not explicitly stated

**Every element receives a source annotation** — showing which file and which version it came from:

```
| FR-001 | The system logs every login attempt | `meeting.docx · e3b0c442` |
```

```
Q-003 [DATA] What format should customer data be stored in?
`[Forrás: requirements.xlsx · fa3b1c9a]`
```

`e3b0c442` is the first 8 characters of the original file's SHA-256 fingerprint. This makes it traceable exactly which document version each element originated from. The full SHA-256 is stored in `SPEC_LOG`.

### 2. Contradictions and Conflicts
If there are contradictory statements in the materials, the skill indicates this and shows the conflict — it does not resolve it quietly.

### 3. Open Questions (Q-XXX List)
Every missing, unclear, or unanswered point receives a Q-XXX identifier and is categorized:

| Category | Meaning |
|---|---|
| `BUSINESS LOGIC` | Business logic is not defined |
| `DATA` | Data, fields, formats are missing |
| `UX/UI` | User interface is not specified |
| `INTEGRATION` | External system connection is unclear |
| `PRIORITY` | Order of importance is not determined |

At the end of the questions, a mandatory summary table appears — this is read programmatically by the `/ba` orchestrator:

```
| ID    | Category       | Status     |
|-------|----------------|------------|
| Q-001 | BUSINESS LOGIC | UNANSWERED |
| Q-002 | DATA           | UNANSWERED |
```

### 4. Assumptions
All statements on which the spec is built, but which the client did not explicitly state.

### 5. Traceability Map
Shows which requirement was born from which client statement.

---

## Rules it always follows

- It never invents a requirement that the client did not state or imply.
- It never quietly resolves contradictions.
- It never assigns priority if the client did not provide one.
- It displays all ambiguity in the list of open questions.

---

## Related Skills

| Skill | Relationship |
|---|---|
| `/ba` | Calls it automatically if no spec exists yet |
| `/ba` | Checks answers and generates BA documents based on the spec |
| `/business-analyst` | Generates BA documents based on the specification |
