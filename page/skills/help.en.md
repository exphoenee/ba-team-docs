# /help — BA Tool Help System

> Complete help system for the BA Tool: command listing, project state, intelligent advice, and documentation search.

## Purpose

Use `/help` to get comprehensive assistance with the BA Tool. It shows all available commands, the current project state, and provides advice on the next step. You can also ask questions — it searches the HANDBOOK, skills, and agent documentation for answers, with source citations.

## Usage

`/help` has **three modes**:

| Mode | Usage | What it does |
|---|---|---|
| **Full help** | `/help` | Command listing + project state + next step advice |
| **Command-specific** | `/help <command>` | Detailed help for a specific command (e.g. `/help ba`, `/help rca`) |
| **Question search** | `/help <question>` | Search HANDBOOK, skills, and agents; returns answers with source citations |

**Examples:**

```
/help                          — Full help
/help ba                       — Detailed help for /ba
/help rca                      — Detailed help for /rca
/help how do I add materials?  — Search the documentation
/help what is SPEC_OUTPUT?     — Search the documentation
/help how does discovery work? — Search the documentation
```

### Question search in detail

When you provide a free-text question (not a command name), `/help` searches these sources in priority order:

| Priority | Source |
|---|---|
| 1 | `app/HANDBOOK/` — chapter files by keyword relevance |
| 2 | `app/.claude/skills/*/SKILL.md` — skill instruction files |
| 3 | `app/.claude/agents/*.md` — agent files |
| 4 | `app/.claude/skills/*/README.md` — user-facing descriptions |
| 5 | Troubleshooting / FAQ sources |

Every claim is presented with a **source citation**, e.g. `[Source: app/HANDBOOK/ch06-workflow.md]` or `[Source: extraction-agent.md]`.

## What it does

1. **Argument detection** — recognizes whether you typed a command name, a question, or nothing
2. **Command listing** — lists every available command with a short description (full help mode only)
3. **Project state inspection** — checks workflow folders and determines the phase (based on `check_state_protocol.md`)
4. **Advice** — gives concrete recommendations based on the phase
5. **Documentation search** — if you type a question, it searches HANDBOOK, skills, and agent descriptions in priority order, and answers with source citations

## Important notes

- `/help` **never dispatches agents** — it reads files and reports directly
- `/help` **never modifies files** in workflow folders
- `/help` **always returns something** — if it cannot find relevant information, it suggests alternative keywords or reviewing the HANDBOOK
- `/help <question>` automatically filters out English question words (how, what, why, where, who, which, can)

## Related skills

| Skill | When to use instead |
|---|---|
| `/check-state` | When you only want a quick project state overview |
| `/session-loader` | When you want to load a full session |
