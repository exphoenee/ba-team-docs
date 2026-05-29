---
name: help
description: >
  Comprehensive help system for the BA Tool. Lists all available commands,
  checks the current project state (using the shared check_state_protocol.md),
  reads skill and agent documentation files, and advises the user on the
  best next step to take. Supports /help <command> for detailed help
  and /help <question> to search all documentation (app/HANDBOOK/, skills,
  agents, troubleshooting) for answers.
version: 1.0.0
author: Viktor Bozzay
disable-model-invocation: false
argument-hint: "[command-name / question]"
---

# Help — BA Tool Help System

Comprehensive help for the BA Tool. Provides command listing, project state inspection,
tailored advice, and documentation search.

## Step 1 — Detect Argument and Route

The argument from `argument-hint` can be one of three cases:

**A) `/help <command>` — argument matches an existing skill name (e.g. `/help ba`, `/help rca`)**

First check if `app/.claude/skills/<argument>/SKILL.md` exists. If yes, show command-specific help:

1. Read that skill's SKILL.md: `app/.claude/skills/<command>/SKILL.md`
2. Read that skill's README.md: `app/.claude/skills/<command>/README.md`
3. Display detailed help:
   - What the command does
   - What flags / arguments it accepts
   - When to use it
   - What it generates (output, where it goes)
4. Do NOT continue to Steps 2–5 — return to the user.

**B) `/help <question>` — argument is NOT a valid skill name, it is a free-text question (e.g. `/help how do I add an agent?`, `/help what is SPEC_OUTPUT?`)**

Perform **documentation search** across the following sources and compose an answer from the findings.

**Search sources (in priority order):**

| Priority | Source | Path | What to look for |
|---|---|---|---|
| 1 | **HANDBOOK/** | `app/HANDBOOK/` | Directory of chapter files — relevant chapters, keywords |
| 2 | **Skill SKILL.md files** | `app/.claude/skills/*/SKILL.md` | Every skill instruction file — frontmatter description + full content |
| 3 | **Agent .md files** | `app/.claude/agents/*.md` (excluding README) | Frontmatter description + first 50 lines (or full file if small) |
| 4 | **Skill README.md files** | `app/.claude/skills/*/README.md` | User-facing descriptions |
| 5 | **Troubleshooting / FAQ** | `app/.claude/references/troubleshoot*.md` (if exists) · `app/.claude/skills/troubleshoot/` (if exists) · `app/HANDBOOK/ch15-compliance.md` (FAQ) | Troubleshooting guides, common issues |

**Token management:**
- Read sources in priority order until the token budget is exhausted
- If the `app/HANDBOOK/` directory is too large: read only `index.md` (Table of Contents) + chapter files relevant to the question's keywords
- For skill SKILL.md files: frontmatter description + first paragraph + sections relevant to the question is enough
- For agent .md files: description + steps relevant to the question is enough

**Search logic:**
1. Extract keywords from the argument (remove Hungarian question words: hogyan, mi az, mit, miért, hol, ki, milyen, lehet-e, etc.)
2. For each source, look for keyword occurrences
3. Compose a coherent answer from the top 3–5 relevant findings
4. Add a source citation for every claim: `[Source: app/HANDBOOK/ch06-workflow.md / 6.2 Specifikáció készítése]` or `[Source: extraction-agent.md]`

**Output format:**

```
============================================================
  BA TOOL — /help <question>
============================================================
  Question: [the user's question]

  ANSWER:
  [summary of findings with source citations]

  SOURCES:
  • `app/HANDBOOK/` — [chapter title]
  • [skill name] / SKILL.md
  • [agent name] / agent.md
  
  NOT WHAT YOU WERE LOOKING FOR?
  • Try different keywords: /help <different terms>
  • See full help: /help
  • See `app/HANDBOOK/` directory
============================================================
```

Do NOT continue to Steps 2–5 — return to the user.

**C) No argument (empty)**

Continue to Step 2 (full help report).

## Step 2 — List Commands and Agents

Read:

1. All available skill README.md files: `app/.claude/skills/*/README.md`
2. All agent .md file first 20 lines: `app/.claude/agents/*.md` (excluding README files) — use the frontmatter `description` field

List every available command with a short description and mention the background agents:

```
Elérhető parancsok:
  /ba                     — Fő parancs: automatikus következő lépés
  /discovery              — Discovery fázis indítása
  /check-state            — Projekt állapotfelmérés
  /help [parancs]         — Súgó megjelenítése
  /session-loader         — Munkamenet betöltése
  /rca [--quick] [--validate] — Gyökérok-elemzés
  ...

Háttérben dolgozó ügynökök:
  ba-orchestrator   — Koordinátor
  spec-builder-agent — Specifikáció-készítő
  ...
```

## Step 3 — Inspect Project State

Load reference:
`app/.claude/references/check_state_protocol.md`

Reference loading policy:
- Load this reference at Step 3 (state check protocol).

Perform the same state check logic as described in the reference file (folder inspection + phase determination).

## Step 4 — Provide Advice

Based on the project phase, give concrete, actionable advice:

| Phase | Advice |
|---|---|
| **Empty project** | "Másolj be anyagokat a `workflow/01_project_info/` mappába, majd futtasd: `/ba`" |
| **Discovery** | "Futtasd: `/discovery` a korai anyagok feldolgozásához" |
| **Spec building** | "A spec elkészült. Válaszold meg a Q-XXX kérdéseket a `workflow/03_answers/` mappában." |
| **Answering** | "Még [N] kérdés van megválaszolatlanul. Add meg a válaszokat, majd futtasd újra: `/ba`" |
| **Document generation** | "Minden kérdés megválaszolva! Futtasd: `/ba` a dokumentumok generálásához" |
| **Complete** | "A projekt dokumentációja kész. A dokumentumok a `workflow/05_ba_docs/` mappában találhatók." |
| **FORCED pending** | "FORCED döntés van függőben. Futtasd: `/ba` a spec újragenerálásához" |

If the phase is **Answering** or **Spec building**, list all unanswered Q-XXX questions.

If `workflow/05_ba_docs/RCA_Analysis.md` does **NOT** exist, but there are enough `[INFERRED:HIGH]` or `RISK-XXX` items, suggest: `/rca`

## Step 5 — Display Full Help Report

Use the following template for the full output:

```
============================================================
  BA TOOL — /help
============================================================
  Verzió: 1.0
  Projekt: [project name / if none: —]

  ELÉRHETŐ PARANCSOK
  [list from Step 2]

  HÁTTÉRBEN DOLGOZÓ ÜGYNÖKÖK
  [list from Step 2]

  AKTUÁLIS PROJEKT ÁLLAPOT
  Fázis: [phase]
  [detailed state — see check state protocol template]

  JAVASOLT KÖVETKEZŐ LÉPÉS
  [concrete advice from Step 4]

  HASZNOS TIPPEK
  • A legtöbb esetben csak a /ba parancsra van szükséged
  • Az összes dokumentum a workflow/05_ba_docs/ mappában érhető el
  • A /session-loader mutatja a teljes projekt állapotot minden indításkor
  • Részletes segítség egy parancshoz: /help <parancs>
  • Keresés a dokumentációban (app/HANDBOOK/, skillek, agentek, GYIK): /help <kérdés>
  • Kérdés esetén lásd a `app/HANDBOOK/` könyvtárat
============================================================
```

## Language Rule

All user-facing output must be in **Hungarian**.

## Hard Constraints

- ❌ Never dispatch any agent — /help reads files directly and reports
- ❌ Never modify files in workflow folders
- ❌ Never start automatically — only when the user calls /help
- ✅ Use the shared `check_state_protocol.md` reference for state inspection
- ✅ For `/help <command>`: read that skill's SKILL.md and README.md
- ✅ For `/help <question>` (not a valid skill name): search `app/HANDBOOK/`, skills, agents, and troubleshooting docs
- ✅ Add source citations for every claim in `/help <question>` output
