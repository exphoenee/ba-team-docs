# 6. The Complete Workflow

## Workflow Overview

The BA Team supports two main paths: the **Discovery phase** (`/discovery`) and the **Analysis phase** (`/ba`). Most projects start with the Discovery phase.

### 6.0 Discovery Phase (`/discovery`)

The Discovery phase starts at the very beginning of a project — when only sales handover, meeting notes, or client emails are available.

**What it's for:**
- Gather business problem, goals, scope, MVP from early materials
- Create a structured question list for the next client meeting
- Generate a Business Concept (BC.md) draft

**How to start:**
1. Copy materials into `workflow/01_project_info/`
2. Run: `/discovery`
3. The `discovery-agent` generates the Discovery package in `workflow/02_discovery/`

### 6.1 Starting a New Project

1. **Prepare source materials** — copy all client materials to `workflow/01_project_info/`
2. **First `/ba` run** — the system converts Office files, reads memory, creates the spec, and lists unanswered questions

### 6.2 Specification Building (/extractor)

The `extraction-agent` creates a structured specification containing:
- **Functional Requirements (FR-XXX)**
- **Non-functional Requirements (NFR-XXX)**
- **User Stories (US-XXX)**
- **Assumptions (A-XXX)**
- **Open Questions (Q-XXX)**

### 6.3 Answering Questions

`/ba` won't generate BA documents until all Q-XXX questions are answered. Create an `answers.md` file in `workflow/03_answers/`.

### 6.4 BA Document Generation

When all questions are answered, run:
```
/ba
```

### 6.5 Session Management (/session-loader)

At the **start of each workday**, run `/session-loader` to see the current project state and next steps.

### 6.6 Project State Check (/check-state)

Quick state check of the current workflow phase:
```
/check-state
```

### 6.7 Help System (/help)

```
/help              # Full help: commands + state + next step
/help <command>    # Detailed help for a specific command
/help <query>      # Search documentation (HANDBOOK, skills, agents)
```
