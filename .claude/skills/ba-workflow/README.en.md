# `/ba-workflow` – BA Workflow Orchestrator (Legacy)

[Magyar változat](README.md)

## Attention

> This skill is the original workflow orchestrator. **It has been replaced by the `/ba` skill**, which features expanded functionality: memory management, subagent-based execution, and automatic state recognition.
>
> Use the `/ba` skill for new projects. This skill remains for backward compatibility.

---

## What is it for?

`/ba-workflow` connects the spec-builder and the business-analyst skill: it verifies that all Q-XXX questions are answered and only then runs BA document generation.

---

## How does it work?

### Step 1 – Load Spec
Reads the `workflow/01_project_info/SPEC_OUTPUT.md` file and extracts all Q-XXX identifiers with `UNANSWERED` status.

If the file does not exist, it stops and requests running `/spec-builder`.

### Step 2 – Verify Answers
Reads all files in `workflow/02_answers/`. For each Q-XXX identifier, it verifies:
- Is it included in the answer file?
- Is there meaningful text following it? ("TBD" and "N/A" do not count as answers.)

**If there is a missing answer → it stops** and lists them:
```
⛔ BA Workflow paused – answers missing

| ID    | Category | Question Summary               |
|-------|----------|--------------------------------|
| Q-002 | DATA     | Data retention period?         |
| Q-005 | INTEGRATION | External payment system?    |

Next step:
Complete workflow/02_answers/ files, then run again: /ba-workflow
```

**If all are answered → it continues** with BA document generation.

### Step 3 – Generate BA Documents
Based on `workflow/01_project_info/SPEC_OUTPUT.md`, all input files, and the answer files, it prepares the mandatory BA documents in the `workflow/03_ba_docs/` folder.

### Step 4 – Completion Report
```
✅ BA document generation complete.
Documents saved to workflow/03_ba_docs/
Requirements covered: FR-001 to FR-012
Questions resolved: Q-001 to Q-007 (7/7)
```

---

## Difference from `/ba` Skill

| Feature | `/ba-workflow` | `/ba` |
|---|---|---|
| Load Memory | ❌ | ✅ |
| Update Memory | ❌ | ✅ |
| Subagent Execution | ❌ | ✅ |
| Automatic Spec-builder | ❌ | ✅ |
| State Recognition | partial | ✅ full |

---

## Related Skills

| Skill | Relationship |
|---|---|
| `/ba` | Its successor — use this for new projects |
| `/spec-builder` | Prerequisite: SPEC_OUTPUT.md must be prepared before it |
| `/business-analyst` | Runs this in the document generation phase |
