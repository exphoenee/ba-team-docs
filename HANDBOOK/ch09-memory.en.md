# 9. Long-term Memory

One of BA Team's most important capabilities is intelligent memory management. Files stored in `.claude/memory/` ensure project context is preserved across sessions.

## What Goes Into Memory?

- **Project context** (`PROJECT_CONTEXT.md`): project name, client, scope, systems, phase
- **Stakeholders** (`STAKEHOLDERS.md`): people and their roles
- **Decisions** (`DECISIONS.md`): every logged decision with DEC-XXX ID
- **Resolved questions** (`RESOLVED_QUESTIONS.md`): archive of answered Q-XXX
- **Domain glossary** (`DOMAIN_GLOSSARY.md`): project-specific vocabulary
- **Risks** (`RISKS.md`): identified risks and assumptions (A-XXX)
- **Agent decisions** (`AGENT_DECISIONS.md`): internal orchestrator audit log

## Auto-Update Events

| Event | What is saved |
|---|---|
| Spec completed | Project context, stakeholders, risks |
| Q-XXX answered | Question + answer to archive |
| Decision made | Decision + rationale logged |
| BA doc completed | Domain glossary, RAID Log risks |

## Archive Mechanism

Each memory table has a `Status` column:
- `active` — AI considers this on load
- `archived` — hidden but not deleted

**Rule: append only, never delete.** Memory files only grow — the AI never removes entries.
