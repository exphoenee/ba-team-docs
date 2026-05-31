# /help — BA Tool Help System

> Complete help system for the BA Tool: command listing, project state, intelligent advice, and documentation search.

## Purpose

Use `/help` to get comprehensive assistance with the BA Tool. It shows all available commands, the current project state, and provides advice on the next step. You can also ask questions — it searches the HANDBOOK, skills, and agent documentation for answers.

## Usage

```
/help                  — Show full help
/help <command>        — Detailed help for a specific command
/help <question>       — Search the documentation
```

**Examples:**

```
/help
/help ba
/help rca
/help how do I add new materials?
/help what is SPEC_OUTPUT?
/help how does the discovery phase work?
```

## What it does

1. **Argument detection** — if a command name is given, shows detailed help for that command; if a question, searches the documentation; if empty, shows full help
2. **Command listing** — lists every available command with a short description
3. **Project state inspection** — checks workflow folders and determines the phase
4. **Advice** — gives concrete recommendations based on the phase
5. **Documentation search** — if you type a question, it searches HANDBOOK.md, skill files, and agent descriptions, and answers with source citations

## When does it do nothing?

`/help` always returns something. If it cannot find relevant information for your question, it suggests alternative keywords or reviewing the HANDBOOK.

## Related skills

| Skill | When to use instead |
|---|---|
| `/check-state` | When you only want a quick project state overview |
| `/session-loader` | When you want to load a full session |
