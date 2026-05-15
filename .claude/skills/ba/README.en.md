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
| Spec exists, but `02_answers/` is empty | Lists questions, waits for answers |
| Spec and partial answers exist | Shows exactly which Q-XXX questions are still missing |
| All questions answered | **Generates BA documents** → saves to `03_ba_docs/` |

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

Complete the workflow/02_answers/ files, then run again: /ba
```

---

## What does it generate when everything is correct?

The following files are placed in the `workflow/03_ba_docs/` folder:

| File | Content |
|---|---|
| `BRD.md` | Business Requirements Document |
| `User_Stories.md` | User Stories with Gherkin acceptance criteria |
| `Process_Flows.md` | Flowcharts (Mermaid diagrams) |
| `Traceability_Matrix.md` | Traceability matrix |
| `RAID_Log.md` | Risks, Assumptions, Issues, Dependencies |
| `Glossary.md` | Domain glossary |

If enough data is available, these are also prepared:
- `Data_Dictionary.md` – data entities and fields
- `UAT_Test_Cases.md` – testing scenarios
- `Stakeholder_Map.md` – stakeholder map
- `Regulatory_Checklist.md` – GDPR, AML/KYC impact analysis

---

## Related Skills

| Skill | Relationship |
|---|---|
| `/spec-builder` | `/ba` runs this in the first phase |
| `/business-analyst` | `/ba` runs this in the document generation phase |
| `/memory-handler` | `/ba` uses this to read and write memory |
| `/session-loader` | To be run at the start of a session to load state |
