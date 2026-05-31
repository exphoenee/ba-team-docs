# 2. The AI Team

The BA Team consists of seven specialized AI agents and one Python conversion package. Agents are not called directly — they activate automatically at the right moment.

```mermaid
flowchart TD
    User["YOU (Leader)\n/ba · /discovery · /rca · /validate"]
    Orchestrator["1. ba-orchestrator\ncoordinator"]
    Discovery["2. discovery-agent\nDiscovery phase"]
    SpecBuilder["3. extraction-agent\nspecification extractor\n(/extractor skill)"]
    RCA["4. rca-agent\nroot cause analysis"]
    Validation["5. validation-agent\nspec quality guard"]
    BADoc["6. ba-document-agent\ndocument generator"]
    ConvertPkg["convert_all\nPython package\n(0 AI tokens)"]
    MemoryAgent["7. memory-agent\n.claude/memory/ folder"]

    User --> Orchestrator
    User -->|"/rca"| RCA
    User -->|"/validate"| Validation
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
| 1 | **ba-orchestrator** | AI agent | Coordinator: assesses state, decides next step |
| 2 | **discovery-agent** | AI agent | Discovery specialist: BC.md + question list from early materials |
| 3 | **extraction-agent** | AI agent | Specification extractor: structured spec from raw materials |
| 4 | **rca-agent** | AI agent | Root cause analysis: causal chains, loops, driver/symptom classification |
| 5 | **validation-agent** | AI agent | Spec quality guard: 8-dimension check (PASS/WARN/BLOCK) |
| 6 | **ba-document-agent** | AI agent | Document generator: BRD, User Stories, process flows |
| – | **convert_all** | Python package | File conversion: Office/Outlook → Markdown (0 AI tokens) |
| 7 | **memory-agent** | AI agent | Memory manager: decisions, stakeholders, domain terms |
