# /check-state — Project State Inspector

> Quick overview of the current project phase, existing files, and missing steps.

## Purpose

Use `/check-state` to get a fast snapshot of where your BA project stands: what phase it is in, which files are ready, and what to do next. Unlike `/session-loader`, this command does not load a session or dispatch agents — it is a lightweight state inspection tool.

## Usage

```
/check-state
```

## What it does

1. **Inspects workflow folders** — checks `01_project_info/`, `02_discovery/`, `03_answers/`, `04_decisions/`, and `05_ba_docs/`
2. **Determines the project phase** — Empty / Discovery / Spec building / Answering / Document generation / Complete / FORCED pending
3. **Lists open Q-XXX questions** — if a spec exists, shows unanswered questions
4. **Displays a structured report** — based on the findings

## When does it do nothing?

The command always runs and always returns a result — even if the project is empty.

## Related skills

| Skill | When to use instead |
|---|---|
| `/session-loader` | When you want to load a full session (slower but more detailed) |
| `/help` | When you want the full command list and advice along with the project state |
