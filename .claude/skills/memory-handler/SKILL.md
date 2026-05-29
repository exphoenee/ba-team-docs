---
name: memory-handler
description: >
  Persistent memory manager for the BA workflow. Dispatches the memory-agent to load,
  store, or query project memory in .claude/memory/. Other skills and agents use this
  protocol to persist context across sessions. Can also be invoked directly to inspect
  or manually update memory.
disable-model-invocation: true
argument-hint: "[LOAD|LOAD_CONVERSION_LOG|MEMORY_STORE|MEMORY_UPSERT|MEMORY_QUERY]"
version: 2.0.0
author: Viktor Bozzay
---

# Memory Handler – Direct Entry Point

Dispatch the **memory-agent** to perform memory operations.

```
Agent: memory-agent
```

## Supported operations

### Load all BA memory
```
LOAD
```

### Load conversion log
```
LOAD_CONVERSION_LOG
```

### Store a new entry (BA memory files)
```
MEMORY_STORE:
  target: DECISIONS | RESOLVED_QUESTIONS | STAKEHOLDERS | PROJECT_CONTEXT | DOMAIN_GLOSSARY | RISKS
  id: DEC-001
  content: [English text]
  source: [caller name]
  date: YYYY-MM-DD
```

### Upsert a conversion log row
```
MEMORY_UPSERT:
  target: CONVERSION_LOG
  file_path: workflow/01_project_info/filename.xlsx
  sha256: <64-char hex>
  output: filename_converted.md
  date: YYYY-MM-DD
```

### Query specific memory
```
MEMORY_QUERY: target=DECISIONS
MEMORY_QUERY: target=RESOLVED_QUESTIONS, filter=Q-003
```

## Memory files

| File | Contents |
|---|---|
| `.claude/memory/PROJECT_CONTEXT.md` | Project name, client, scope |
| `.claude/memory/STAKEHOLDERS.md` | Stakeholder list with roles |
| `.claude/memory/DECISIONS.md` | Decision log (DEC-XXX) |
| `.claude/memory/RESOLVED_QUESTIONS.md` | Answered Q-XXX archive |
| `.claude/memory/DOMAIN_GLOSSARY.md` | Domain terminology |
| `.claude/memory/RISKS.md` | Risks and assumptions |
| `.claude/memory/CONVERSION_LOG.md` | Converted file SHA-256 fingerprints |

## Access rule

Only the **memory-agent** may read or write `.claude/memory/`.
All agents must delegate memory operations here — never access the folder directly.

## Language Rule

All content written to memory files must follow memory-agent rules (English content).
