# BA Team – Claude Code Project Instructions

## Purpose

This repository contains Claude AI skills and agents for supporting Business Analyst colleagues.
The single entry point is `/ba` — the system automatically decides what action to take next.

## Usage

```
1. Copy project materials into → workflow/01_project_info/
2. Run: /ba
3. If questions are generated → answer them, copy into → workflow/02_answers/
4. Run again: /ba
5. Finished documents → workflow/03_ba_docs/
```

## `/ba` Skill States

| State | Action |
|---|---|
| No input files | Reports that there is nothing to process |
| Input exists, no spec | Runs spec-builder, saves `SPEC_OUTPUT.md` |
| Spec exists, 02_answers/ empty | Lists unanswered questions, stops |
| Spec exists, partial answers | Reports exactly which Q-XXX questions are missing, stops |
| All questions answered | Automatically generates BA documents |

## Language Rule

**All AI-generated documents, files, and conversational messages must be written exclusively in Hungarian.**

This includes every message shown to the user in the CLI, terminal, or VS Code chat panel: questions, decisions, confirmations, status reports, warnings, and errors. The user must always be addressed in Hungarian.

| File type | Language |
|---|---|
| `SPEC_OUTPUT.md` | 🇭🇺 Hungarian |
| All files in `workflow/03_ba_docs/` | 🇭🇺 Hungarian |
| All files in `.claude/memory/` | 🇬🇧 English (strictly — no Hungarian content) |
| `README.md` files | 🇭🇺 Hungarian |
| `CLAUDE.md`, `AGENTS.md` | 🇬🇧 English (Claude instruction files) |
| `.claude/skills/*/SKILL.md` | 🇬🇧 English (Claude instruction files) |
| `.claude/scripts/` | 🇬🇧 English (technical scripts) |

---

## Behaviour Rules

- The `/ba` skill never asks the user what to do — it decides based on workflow state
- Do not modify input files in `workflow/01_project_info/` or `workflow/02_answers/`
- `SPEC_OUTPUT.md` is a system-generated file — do not edit it manually
- Every generated document must have unique IDs, traceability, and Mermaid diagrams where applicable
- BA documents may only be generated when all Q-XXX questions are answered

## Memory Access Rule

**Only `memory-agent` may read from or write to `.claude/memory/`.**
All other agents and skills must delegate memory operations to `memory-agent` via its protocol (LOAD, STORE, QUERY, BATCH, UPSERT, LOAD_CONVERSION_LOG).
No agent may use file tools directly on `.claude/memory/` files.
See `.claude/rules/memory-access.md` for the full protocol reference.

## Stop Hook

`.claude/settings.json` contains a Stop hook that checks workflow state after every Claude response
and notifies the user if action is required (e.g. answers are missing).

## Folder Structure

| Folder | Contents |
|---|---|
| `workflow/01_project_info/` | Raw input materials + `SPEC_OUTPUT.md` |
| `workflow/02_answers/` | Answers from stakeholders (Q-XXX format) |
| `workflow/03_ba_docs/` | Generated BA documents |
| `.claude/memory/` | Persistent project memory (decisions, Q-XXX archive, etc.) |
| `.claude/agents/` | Specialist agents (ba-orchestrator, spec-builder-agent, ba-document-agent, file-converter-agent, memory-agent) |
| `.claude/skills/` | User-facing entry points (slash commands — thin dispatchers) |
| `.claude/scripts/` | session-loader scripts (PowerShell + Bash) |
| `.claude/rules/` | Persistent Claude rules (language, behaviour) |
