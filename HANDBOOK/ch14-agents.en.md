# 14. Background Agents

## ba-orchestrator

The main coordinator. Assesses workflow state and directs other agents.

**Steps:**
1. **Pre-flight:** Estimates input file token load
2. Loads memory (necessary files only)
3. Examines workflow state (input, spec, answers, BA docs)
4. **FR priority preview:** Before doc generation, lists Phase 1/Phase 2 FR items
5. Dispatches the appropriate agent
6. Reports back to the user

## discovery-agent

Discovery phase specialist. Generates Business Concept documents and question lists from early materials.

**Key point:** Always operates in draft mode — Q-XXX never blocks generation.

## extraction-agent

Handles extraction only — no quality checking.

**Steps:**
1. Reads SPEC_LOG + FORCED decisions
2. Decides: incremental update or full regeneration
3. Extracts FR-XXX, NFR-XXX, BR-XXX, US-XXX, Q-XXX, A-XXX items
4. Saves `SPEC_OUTPUT.md` + `SPEC_DIFF.md`
5. Updates memory

## validation-agent

**Activates:** automatically on every `/ba` run, after extraction and RCA, before generation.

**Purpose:** Checks `SPEC_OUTPUT.md` quality — does not generate documents.

**Statuses:** ✅ PASS (continue) | ⚠️ WARN (continue with warnings) | ❌ BLOCK (stop)

## ba-document-agent

Generates all BA documents with Mermaid diagrams. Performs **selective regeneration** based on SPEC_DIFF.md.

## rca-agent

Root cause analysis specialist. Runs automatically if ≥3 `[INFERRED:HIGH]` or ≥5 RISK-XXX items exist.

**Non-blocking** — if it fails with an error, the workflow continues.

## convert_all Python Package

File conversion is done by the `.claude/scripts/convert_all` Python package. **Uses 0 LLM tokens.**

## memory-agent

The only agent that manages the `.claude/memory/` folder. Provides: `LOAD`, `LOAD_ALL`, `STORE`, `QUERY`, `BATCH`, `MEMORY_UPSERT` operations.
