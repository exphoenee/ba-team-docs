# BA Team – Claude Code Project Instructions

## Purpose

This repository contains Claude AI skills and agents for supporting Business Analyst colleagues.
The single entry point is `/ba` — the system automatically decides what action to take next.

## Usage

```
1. Copy project materials into → workflow/01_project_info/
2. Run: /ba
3. If questions are generated → answer them, copy into → workflow/03_answers/
4. Run again: /ba
5. Finished documents → workflow/05_ba_docs/
```

> **One project per session.** Run only one project per Claude Code session.
> For multiple projects, open a new Claude Code session for each one.
> Running multiple projects in a single session causes unpredictable behaviour
> because the `workflow/` folder is project-isolated (one folder = one project).

## `/ba` Skill States

| State | Action |
|---|---|
| No input files | Reports that there is nothing to process |
| Input exists, no spec | Runs spec-builder, saves `_system/SPEC_OUTPUT.md` |
| FORCED decision newer than spec | Runs spec-builder to rebuild with applied decisions |
| Spec exists, 03_answers/ empty | Lists unanswered questions, stops |
| Spec exists, partial answers | Reports exactly which Q-XXX questions are missing, stops |
| All questions answered | Automatically generates BA documents |
| `/ba --draft` | Generates draft BA documents into `workflow/05_ba_docs/_draft/` with VÁZLAT header even if Q-XXX are open |
| `/ba --force` | Forces BA document regeneration, bypasses up-to-date check |
| `/ba --discovery` | Runs discovery-agent instead of spec-builder/ba-document-agent |
| `/rca` | Runs the full RCA/Chain/IR analysis on a root-cause Excel input |
| `/rca --quick` | Chain_Long + Loop_Summary only (no IR_Mátrix) |
| `/rca --validate` | QA check only on existing RCA_Analysis.md |
| `/check-state` | Show current project phase, folder status, missing steps |
| `/help` | Full help: commands list, project state, next-step advice |
| `/help <command>` | Detailed help for a specific command (e.g. `/help ba`) |
| `/help <query>` | Search documentation (HANDBOOK, skills, agents) for a topic |

## Language Rule

**All AI-generated documents, files, and conversational messages must be written exclusively in Hungarian.**

This includes every message shown to the user in the CLI, terminal, or VS Code chat panel: questions, decisions, confirmations, status reports, warnings, and errors. The user must always be addressed in Hungarian.

| File type | Language |
|---|---|
| `workflow/01_project_info/_system/SPEC_OUTPUT.md` | 🇭🇺 Hungarian |
| All files in `workflow/05_ba_docs/` | 🇭🇺 Hungarian |
| All files in `.claude/memory/` | 🇬🇧 English (strictly — no Hungarian content) |
| `README.md` files | 🇭🇺 Hungarian |
| `CLAUDE.md`, `AGENTS.md` | 🇬🇧 English (Claude instruction files) |
| `.claude/skills/*/SKILL.md` | 🇬🇧 English (Claude instruction files) |
| `.claude/scripts/` | 🇬🇧 English (technical scripts) |

---

## Setup

After cloning, create your local config by copying the example:

```
cp .claude/settings.local.json.example .claude/settings.local.json
```

The `.claude/settings.local.json` file is git-ignored. Use it to override permissions or add
machine-specific settings. Never commit it — it may contain absolute paths or local tool permissions.

---

## Behaviour Rules

- The `/ba` skill never asks the user what to do — it decides based on workflow state
- Do not modify input files in `workflow/01_project_info/` or `workflow/03_answers/`
- `workflow/01_project_info/_system/SPEC_OUTPUT.md` is a system-generated file — do not edit it manually
- Every generated document must have unique IDs, traceability, and Mermaid diagrams where applicable
- BA documents may only be generated when all Q-XXX questions are answered
- Every element in `workflow/01_project_info/_system/SPEC_OUTPUT.md` with a unique ID must carry a `[Forrás: filename · sha8]` source annotation (first 8 chars of the original file's SHA-256). See `.claude/rules/traceability.md`.

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
| `workflow/01_project_info/` | Raw input materials + `_system/` generated spec outputs |
| `workflow/02_discovery/` | Discovery-agent outputs — `BC.md`, `Discovery_RAID.md`, `Discovery_Questions.md` |
| `workflow/03_answers/` | Answers from stakeholders (Q-XXX format — discovery + analysis) |
| `workflow/04_decisions/` | FORCED stakeholder decisions (`SDEC-XXX` files with YAML frontmatter) |
| `workflow/05_ba_docs/` | Generated BA documents |
| `.claude/memory/` | Persistent project memory (decisions, Q-XXX archive, etc.) |
| `.claude/agents/` | Specialist agents (ba-orchestrator, spec-builder-agent, ba-document-agent, discovery-agent, rca-agent, memory-agent) |
| `.claude/skills/` | User-facing entry points (slash commands — thin dispatchers) |
| `.claude/scripts/` | **Shared** scripts and packages used by multiple skills or agents |
| `.claude/references/` | **Shared** reference files (templates, formats) used by multiple skills or agents |
| `.claude/references/memory/` | Empty-state templates for all `.claude/memory/` files — source of truth for `reset_project.py` and `memory-agent` |
| `.claude/references/decision_template.md` | Template for `04_decisions/` SDEC-XXX decision files |
| `.claude/rules/` | Persistent Claude rules (language, behaviour) |

### FORCED Decisions (`workflow/04_decisions/`)

Stakeholders and the PM can override any spec-builder-derived requirement by placing a
`SDEC-XXX_name.md` file in `workflow/04_decisions/`. Files use YAML frontmatter — see
`.claude/references/decision_template.md` for the template and field reference.

For full documentation of the decision file format, frontmatter fields, and annotation behaviour,
see `HANDBOOK.md` — section "FORCED döntések (`04_decisions/`)".

### Skill-level resource folders

Each skill may contain its own `scripts/` and `references/` subfolders for resources
that belong exclusively to that skill:

| Path pattern | Contents |
|---|---|
| `.claude/skills/<skill>/scripts/` | Scripts used only by this skill |
| `.claude/skills/<skill>/references/` | Templates and reference files used only by this skill |

**Rule:** if a script or reference file is used by more than one skill or agent,
it must live in `.claude/scripts/` or `.claude/references/` respectively — not inside a skill folder.
