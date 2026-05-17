# `/memory-handler` – Persistent Memory Manager

[Magyar változat](README.md)

## What is it for?

The `/memory-handler` skill manages the **long-term memory** of the BA workflow. It ensures that things learned in one session — decisions, stakeholder data, answered questions, domain terminology, risks — are available in the next session.

Memory exists in the form of files in the `.claude/memory/` folder. Other skills and agents do not write directly to these files — they always communicate through the memory-handler protocol.

> **Note:** Generally, you don't need to call it directly — the `/ba` skill automatically loads and updates the memory at the start and end of each session.

---

## Memory Files

| File | What it stores |
|---|---|
| `PROJECT_CONTEXT.md` | Project name, client, scope, involved systems, phase |
| `STAKEHOLDERS.md` | List of stakeholders with roles |
| `DECISIONS.md` | Log of decisions made (with DEC-XXX identifier) |
| `RESOLVED_QUESTIONS.md` | Archive of answered Q-XXX questions |
| `DOMAIN_GLOSSARY.md` | Project-specific technical terms |
| `RISKS.md` | Identified risks and assumptions |
| `SPEC_LOG.md` | SHA-256 fingerprints of input files and generated IDs (managed by spec-builder) |
| `CONVERSION_LOG.md` | Registry of converted files with SHA-256 (written by the convert_all Python package) |

---

## How do other agents populate it?

When another skill or agent wants to store data, it uses the following message format:

```
MEMORY_STORE:
  target: DECISIONS
  id: DEC-001
  content: "We will solve authentication with OAuth2, there will be no custom login page."
  source: ba-agent
  date: 2026-05-12
```

Or for batch saving:

```
MEMORY_BATCH:
  - OPERATION: STORE
    target: PROJECT_CONTEXT
    ...
  - OPERATION: STORE
    target: STAKEHOLDERS
    ...
```

The memory-handler processes the message and confirms:
```
✅ MEMORY_STORED: DECISIONS / DEC-001
```

---

## How can other agents query it?

To reduce token costs, it is recommended to request only the necessary files:

```
MEMORY_QUERY: target=PROJECT_CONTEXT,STAKEHOLDERS
MEMORY_QUERY: target=DECISIONS
MEMORY_QUERY: target=RESOLVED_QUESTIONS, filter=Q-003
MEMORY_QUERY: target=all
```

---

## When does automatic saving occur?

| Event | What it saves | Into which file |
|---|---|---|
| Spec complete | Project name, scope, systems | `PROJECT_CONTEXT.md` |
| Spec complete | Identified stakeholders | `STAKEHOLDERS.md` |
| Spec complete | Identified risks | `RISKS.md` |
| Q-XXX answered | Question and answer archive | `RESOLVED_QUESTIONS.md` |
| Decision made | Decision text and reasoning | `DECISIONS.md` |
| BA doc complete | Domain terminology | `DOMAIN_GLOSSARY.md` |
| BA doc complete | RAID Log risks | `RISKS.md` |

---

## Important Rules

- Memory files can only expand — existing content is never deleted.
- During the first `/ba` run, files are automatically created if they don't exist yet.
- Memory persists across different project phases and sessions.
- Temporary data pertaining only to the current session should not be saved here.

---

## Manual Usage

If you want to review or manually modify the memory content, open the files in the `.claude/memory/` folder with any text editor — they are simple Markdown tables.

---

## Related Skills

| Skill | Relationship |
|---|---|
| `/ba` | Loads and updates memory on every run |
| `/session-loader` | Summarizes memory content during loading |
| `/business-analyst` | Saves decisions and technical terms here |
| `/spec-builder` | Saves stakeholders, risks, and context here |
