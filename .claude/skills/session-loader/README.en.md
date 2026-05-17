# `/session-loader` – Session Loader

[Magyar változat](README.md)

## What is it for?

The `/session-loader` skill shows you exactly **where the project stands** at the beginning of each session — without having to manually check folders or remember where you left off.

It reads the current state of the workflow folders and the project memory, then displays the most important information and the suggested next step in a structured summary.

---

## How to use it?

At the start of every workday when you open the project in VS Code, type in the Claude panel:

```
/session-loader
```

---

## What does it show?

### Project Information
Based on `.claude/memory/PROJECT_CONTEXT.md`, it displays the project name, the client, and the current phase.

### Memory Summary
Shows how much data has been gathered in memory:
- How many decisions are logged
- How many Q-XXX questions are answered in the archive
- How many stakeholders are identified
- How many domain technical terms are defined

### Workflow State
Shows exactly what is in each folder:

```
============================================================
  BA WORKFLOW – SESSION LOADER
  2026-05-12 09:15
============================================================

  PROJECT
  Name:    Insurance Portal Development
  Client:  XY Insurance Ltd.
  Phase:   Requirements

  MEMORY SUMMARY
  Decisions:                5
  Answered questions:      12
  Stakeholders:             4
  Domain terms:             8

  WORKFLOW STATE
  [01] Input materials:    3 files
       • meeting_2026_05_10.md
       • email_thread.md
       • workshop_notes.md
  [01] SPEC_OUTPUT.md:     ✅ Complete
       Unanswered questions: 2
         ❓ Q-003
         ❓ Q-007
  [02] Answers:            1 file
       • answers_round1.md
  [03] BA documents:       EMPTY

  SUGGESTED NEXT STEP
  ⛔ Partial answers — 2 questions still unanswered.
     → Complete the workflow/02_answers/ files
     → Then run: /ba
============================================================
```

### Suggested Next Step
The session-loader always tells you exactly what to do next.

---

## What does it offer after loading?

After the summary, Claude asks how you would like to continue:

```
How would you like to continue?
  [A] /ba – run automatic next step
  [B] Answer a question / add material
  [C] View / edit a specific document
  [D] View memory in detail
```

Respond, and Claude will continue the work accordingly.

---

## The Background Script

The session-loader runs the platform-independent Python script:

```bash
python .claude/scripts/session_loader.py
```

The script examines the files in the workflow folders and reads project data from the memory files. It modifies nothing — it only reads.

---

## Related Skills

| Skill | Relationship |
|---|---|
| `/ba` | The next step suggested by session-loader is usually this |
| `/memory-handler` | Reads memory data from here |
