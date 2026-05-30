# `/ba` – Unified BA Workflow Orchestrator

[Magyar változat](README.md)

## What is it for?

This skill is the **single entry point** for the entire BA workflow. You don't need to remember where the project currently stands, which step comes next, or which command to issue — `/ba` automatically figures it all out and performs it.

In the background, it starts a dedicated AI subagent that runs in an isolated work environment. This means the main Claude conversation doesn't fill up with intermediate results — only the final summary appears.

---

## How to use it?

In the Claude panel, type:

```
/ba
```

That's it. The skill itself decides what the next step is.

---

## What does it do exactly?

The agent examines the project state in the following order:

### 1. Load Memory
Reads the project context stored in the `.claude/memory/` folder: previous decisions, stakeholders, archived answered questions, domain terminology.

### 2. State Recognition

| What it finds | What it does |
|---|---|
| `workflow/01_project_info/` is empty | Stops, asks to copy materials |
| Input exists, but no `SPEC_OUTPUT.md` | **Runs Spec-builder** → saves specification and question list |
| FORCED decision newer than spec | **Runs Spec-builder** → applies the decision to the spec |
| Spec exists, but `03_answers/` is empty | Lists questions, waits for answers |
| Spec and partial answers exist | Shows exactly which Q-XXX questions are still missing |
| Some Q-XXX questions are `PARTIALLY_ANSWERED` | **Does not block** — shows a warning and continues |
| All questions answered | **Generates BA documents** → saves to `05_ba_docs/` |

### 3. Memory Update
At the end of the work, it saves back what it learned: decisions, answered questions, domain terminology, risks.

### 4. Feedback
Provides clear, structured feedback on what happened and what the next step is.

---

## When does it stop?

`/ba` **never generates BA documents if any Q-XXX question is unanswered**. If it finds missing answers, it lists them precisely:

```
⛔ Workflow stopped – missing answers

| ID    | Category | Question Summary                   |
|-------|----------|------------------------------------|
| Q-002 | DATA     | What data retention period is needed? |
| Q-005 | INTEGRATION | Which external system handles payments? |

Complete the workflow/03_answers/ files, then run again: /ba
```

---

## Flags

Optional flags to customise `/ba` behaviour:

| Flag | Effect |
|---|---|
| `--preview` | Show what would happen without making any changes |
| `--draft` | Generate BA documents even if Q-XXX questions are unanswered — adds DRAFT header to every doc |
| `--force` | Skip the "docs up to date" check and the FORCED-decision spec rebuild; forces BA document regeneration |
| `--discovery` | Run in discovery mode — dispatches discovery-agent instead of the normal workflow |

### `--draft` mode in detail

Use `--draft` when you want preliminary BA documents for early review or stakeholder alignment — even if some Q-XXX questions are still open:

```
/ba --draft
```

In `--draft` mode:
- BA documents are generated even if Q-XXX questions are unanswered
- Every generated document receives a **DRAFT** header
- Question archiving in memory is skipped (questions stay active)
- The document is **not a final deliverable** — for early review and feedback only

### `--discovery` mode and automatic Discovery depth

The `--discovery` flag causes `/ba` to dispatch `discovery-agent` instead of the normal workflow.
This is identical to running `/discovery` directly — both are entry points for the Discovery phase.

**Automatic Discovery depth (DS-10):**

If your project started with `/discovery`, `/ba` automatically detects this and generates
**Discovery-depth BA documents**:

The orchestrator checks:
- `workflow/02_discovery/BC.md` exists **AND**
- `workflow/01_project_info/_system/SPEC_OUTPUT.md` exists

→ If both exist: `ba-document-agent` produces Discovery-depth documents
→ Every generated document gets a header: `📍 Generálás módja: DISCOVERY`

**Discovery vs. Analysis document depth:**

| Document | Discovery depth | Analysis depth |
|---|---|---|
| `BRD.md` | Scope and goal focus, fewer FR details | Complete FR/NFR list |
| `User_Stories.md` | Epic-level user journeys, 2–3 acceptance criteria | Detailed US-XXX with full Gherkin |
| `UAT_Test_Cases.md` | 5–8 general test scenarios | 10–20 detailed TC-XXX test cases |

To get Analysis-depth documents on a Discovery-based project, run: `/ba --force`

---

## What does it generate when everything is correct?

The following files are placed in the `workflow/05_ba_docs/` folder:

| File | Content |
|---|---|
| `BRD.md` | Business Requirements Document |
| `User_Stories.md` | User Stories with Gherkin acceptance criteria |
| `Process_Flows.md` | Flowcharts (Mermaid diagrams) |
| `Traceability_Matrix.md` | Traceability matrix (source file → requirement → user story) |
| `RAID_Log.md` | Risks, Assumptions, Issues, Dependencies |
| `Glossary.md` | Domain glossary |
| `_system/BA_DOCS_LOG.md` | Generation log (when, from what, in which mode) |
| `_system/BA_DOCS_DIFF.md` | Change report (what the last run modified) |

If enough data is available, these are also prepared:
- `Data_Dictionary.md` – data entities and fields
- `UAT_Test_Cases.md` – testing scenarios
- `Stakeholder_Map.md` – stakeholder map
- `Regulatory_Checklist.md` – GDPR, AML/KYC impact analysis

---

## Related Skills

| Skill | Relationship |
|---|---|
| `/extractor` | `/ba` runs this in the first phase |
| `/business-analyst` | `/ba` runs this in the document generation phase |
| `/memory-handler` | `/ba` uses this to read and write memory |
| `/session-loader` | To be run at the start of a session to load state |
