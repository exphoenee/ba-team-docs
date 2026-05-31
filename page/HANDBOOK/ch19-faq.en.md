# 18. Frequently Asked Questions (FAQ)

## General

**Q: Why doesn't `/ba` generate documents?**

`/ba` stops if there are unanswered Q-XXX questions. Find the open questions in `workflow/01_project_info/_system/SPEC_OUTPUT.md` (status: `UNANSWERED`), write your answers in the `workflow/03_answers/` folder, then run `/ba` again. The `/check-state` command shows exactly which questions are missing.

---

**Q: My previous session content is gone — how do I reload it?**

Run the `/session-loader` command. This loads the `.claude/memory/` memory files and returns the current project context: stakeholders, decisions, answered questions, risks.

---

**Q: What's the difference between `/ba` and `/discovery`?**

| | `/discovery` | `/ba` |
|---|---|---|
| When to use | Early, incomplete materials | Detailed, structured materials |
| Blocks on Q-XXX? | No — always generates | Yes — stops on open questions |
| Output | BC.md, Discovery_RAID.md, Questions.md | BRD, User Stories, RAID Log etc. |

If you're not sure what you need yet — start with `/discovery`.

---

**Q: When should I run `/rca`?**

`/rca` is useful when:
- The specification contains many `[INFERRED:HIGH]` assumptions
- You want to map what lies behind the problems (causal chains)
- You need a driver/symptom analysis for a stakeholder presentation

`/rca` also runs automatically when `ba-orchestrator` finds enough `[INFERRED:HIGH]` elements.

---

## Files and Conversion

**Q: The system doesn't recognize my Word document — what should I do?**

1. Run `/convert` manually
2. Check the conversion log: `/memory-handler` → CONVERSION_LOG.md
3. If a WARN status appears (Output < 200 bytes), check whether the file is password-protected

---

**Q: Can I run multiple projects in the same session?**

Not recommended. The `workflow/` folder is dedicated to one project. For parallel work, open a new Claude Code session for each project.

---

**Q: Should I delete files from `workflow/01_project_info/` if the materials changed?**

No need to delete — just add the new files. The system detects changes via SHA-256 fingerprints and only processes new or modified files (incremental conversion and spec rebuild).

If you did delete a source, the next `/ba` run performs a full spec regeneration to remove any orphaned requirements.

---

## Specification and Questions

**Q: What is PARTIALLY_ANSWERED status?**

The `extraction-agent` found a partial answer in the source materials, but the Q-XXX question is not fully answered. This is non-blocking — the system continues but signals that stakeholder confirmation is recommended.

---

**Q: How do I write answers to Q-XXX questions?**

Create a `.md` file in the `workflow/03_answers/` folder. The format:

```
Q-001: The system serves a maximum of 500 concurrent users.
Q-002: The data retention period is 7 years per GDPR.
```

Include each Q-XXX on one line: `Q-XXX: [answer text]`. Then run: `/ba`.

---

**Q: How do I override a requirement derived from Q-XXX?**

Create an `SDEC-XXX_name.md` file in the `workflow/04_decisions/` folder. The FORCED decision overrides the value derived by extraction-agent and receives a `[FORCED]` annotation in the spec. Details: [Chapter 7 — Workflow](ch07-workflow.en.md).

---

## Troubleshooting

**Q: `/ba` always stops at the same point — what's wrong?**

1. Run `/check-state` — it shows exactly what is missing
2. If Q-XXX questions are blocking: add your answers to `workflow/03_answers/`
3. If the spec is stale (FORCED decision is newer): run `/ba` and it will rebuild automatically

---

**Q: How do I force BA documents to regenerate?**

```
/ba --force
```

This bypasses the "up-to-date" check and regenerates all documents even if nothing appears to have changed.

---

**Q: What if the Mermaid diagram throws a syntax error?**

`ba-document-agent` warns about Mermaid syntax errors with an OB-16 flag (non-blocking). If you see the error on the docs site, check the diagram in the [Mermaid Live Editor](https://mermaid.live). The `/mermaid-diagrams` skill helps you create valid diagrams.

---

**Q: How do I reset the project to its initial state?**

```
python .claude/scripts/reset_project.py
```

This clears memory files and restores them to empty templates. **Irreversible** — back up the `workflow/` folder first if you need to keep previous results.
