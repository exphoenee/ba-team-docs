# memory-agent

> The memory manager: all other agents read from and write to `.claude/memory/` exclusively through this agent. It performs no analysis — only data management.

[Hungarian version](memory-agent.md)

---

## Role in the workflow

The `memory-agent` is the gatekeeper of the BA Team's persistent memory. No other agent may read or write directly to `.claude/memory/` — all memory operations flow through the `memory-agent`. This guarantees a consistent format and prevents accidental overwrites.

## When is it activated?

Every other agent calls it when a memory operation is needed:
- `ba-orchestrator` — to load memory at the start of every run
- `extraction-agent` — when saving specification results
- `ba-document-agent` — when archiving answered questions
- `discovery-agent` — when saving discovery output
- Also directly invocable via the `/memory-handler` skill

## Available operations

| Operation | Description |
|---|---|
| `LOAD` | Reads all BA memory files — `status: active` rows only (token-efficient) |
| `LOAD_ALL` | Reads all rows including archived entries — for audit/reset only |
| `LOAD_CONVERSION_LOG` | Returns the contents of the conversion log |
| `STORE` | Appends a new entry to the specified file (`status: active`) |
| `QUERY` | Targeted query from one or more memory files |
| `MEMORY_UPSERT` | Updates or adds a row; use `status: archived` to archive an entry |
| `BATCH` | Multiple STORE or UPSERT operations in one call (preferred for efficiency) |

## Memory files

| File | Contents |
|---|---|
| `PROJECT_CONTEXT.md` | Project name, client, scope, affected systems |
| `STAKEHOLDERS.md` | Stakeholder list with roles |
| `DECISIONS.md` | Decision log (DEC-XXX) |
| `RESOLVED_QUESTIONS.md` | Answered Q-XXX archive |
| `DOMAIN_GLOSSARY.md` | Domain terminology |
| `RISKS.md` | Risks and assumptions |
| `CONVERSION_LOG.md` | Converted files registry |
| `AGENT_DECISIONS.md` | Audit log of orchestrator and extraction-agent internal decisions |

## Archive mechanism

Every memory table contains a `Status` column (`active` / `archived`).
- **`LOAD`** — returns only `active` rows (fewer tokens on long projects)
- **`LOAD_ALL`** — returns all rows (for audit, reset purposes)
- **`RESOLVED_QUESTIONS.md`** rows are automatically set to `archived` after BA documents are generated

## Related components

| Component | Relationship |
|---|---|
| `ba-orchestrator` | Loads memory via QUERY at the start of every run |
| `extraction-agent` | Saves specification results via BATCH STORE |
| `ba-document-agent` | Archives answered questions via BATCH STORE |
| `discovery-agent` | Saves discovery output via STORE |
| `/memory-handler` skill | Direct user-facing memory management |
