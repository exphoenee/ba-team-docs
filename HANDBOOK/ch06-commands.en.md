# 6. Commands and Skills

| Command | Purpose |
|---|---|
| `/ba` | **Main command** – automatic next step execution |
| `/discovery` | Start Discovery phase – BC + question list from early materials |
| `/rca` | Root cause analysis – Chain/IR methodology |
| `/session-loader` | Load session, show project state |
| `/extractor` | Specification only (advanced use) |
| `/business-analyst` | BA documents only (advanced use) |
| `/convert` | Manual Office/Outlook file conversion |
| `/mermaid-diagrams` | Standalone diagram creation |
| `/memory-handler` | View project memory |
| `/self-dev` | **Development request capture** – send BA Tool change requests to the developer |
| `/check-state` | **Project state assessment** – examine workflow folders, determine phase, list missing steps |
| `/help [command]` | **Help system** – command list, project state, next step suggestion; `/help <command>` for detailed help |

> **In most cases, only `/ba` or `/discovery` is needed.** Other commands are for advanced users and special cases.

## `/ba` vs. `/discovery` — When to Use Which?

| | `/discovery` | `/ba` |
|---|---|---|
| Phase | Discovery — early, incomplete materials | Analysis — detailed, structured materials |
| Blocked by Q-XXX? | **No** — always generates | **Yes** — stops if Q-XXX open |
| Output depth | High-level: problem, goals, scope, MVP | Detailed: FR/NFR/US requirements |
| Documents | BC.md, Discovery_RAID.md, Discovery_Questions.md | BRD, User_Stories, Process_Flows, RAID_Log, Glossary, Traceability_Matrix |
