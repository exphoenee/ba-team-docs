# 2. The AI Team

The BA Team consists of eight specialized AI agents and one Python conversion package. Agents are not called directly — they activate automatically at the right moment.

```mermaid
flowchart TD
    User["YOU (Leader)\n/ba · /discovery · /rca · /validate\n/self-dev · /self-improve"]
    Orchestrator["1. ba-orchestrator\ncoordinator"]
    Discovery["2. discovery-agent\nDiscovery phase"]
    SpecBuilder["3. extraction-agent\nspecification extractor\n(/extractor skill)"]
    RCA["4. rca-agent\nroot cause analysis"]
    Validation["5. validation-agent\nspec quality guard"]
    BADoc["6. ba-document-agent\ndocument generator"]
    ConvertPkg["convert_all\nPython package\n(0 AI tokens)"]
    MemoryAgent["7. memory-agent\n.claude/memory/ folder"]
    SelfCare["8. self-care-agent\nself-development"]

    User --> Orchestrator
    User -->|"/rca"| RCA
    User -->|"/validate"| Validation
    User -->|"/self-dev"| SelfCare
    User -->|"/self-improve"| SelfCare
    Orchestrator --> Discovery
    Orchestrator --> SpecBuilder
    Orchestrator --> RCA
    Orchestrator --> Validation
    Orchestrator --> BADoc
    Orchestrator --> ConvertPkg
    Discovery --> MemoryAgent
    SpecBuilder --> MemoryAgent
    BADoc --> MemoryAgent
    Orchestrator --> MemoryAgent
```

| # | Component | Type | Role |
|---|---|---|---|
| 1 | **ba-orchestrator** | AI agent | Coordinator: assesses state, decides next step; stores a DEC-XXX memory entry when validation returns BLOCK |
| 2 | **discovery-agent** | AI agent | Discovery specialist: BC.md + question list from early materials — never blocks generation |
| 3 | **extraction-agent** | AI agent | Specification extractor: structured spec from raw materials — extraction only, no quality check (called by `/extractor` skill) |
| 4 | **rca-agent** | AI agent | Root cause analysis: causal chains, self-sustaining loops, driver/symptom classification — runs automatically when enough RISK/INFERRED:HIGH items exist |
| 5 | **validation-agent** | AI agent | Spec quality guard: checks SPEC_OUTPUT.md across 8 dimensions (PASS / WARN / BLOCK) — does not generate documents |
| 6 | **ba-document-agent** | AI agent | Document generator: BRD, User Stories, process flows |
| – | **convert_all** | Python package | File conversion: Office/Outlook → Markdown (0 AI tokens) |
| 7 | **memory-agent** | AI agent | Memory manager: decisions, stakeholders, domain terms |
| 8 | **self-care-agent** | AI agent | Self-development: captures improvement requests, implements approved changes |
