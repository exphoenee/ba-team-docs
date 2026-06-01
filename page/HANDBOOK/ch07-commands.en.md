# 6. Commands and Skills

| Command | Purpose |
|---|---|
| `/ba` | **Main command** – automatic next step execution |
| `/discovery` | Start Discovery phase – BC + question list from early materials |
| `/rca` | Root cause analysis – Chain/IR methodology |
| `/session-loader` | Load session, show project state |
| `/extractor` | Specification only (advanced use) |
| `/business-analyst` | BA documents only (advanced use) |
| `/self-improve` | Implement an approved feature request – executes the TODO checklist, creates/modifies files |
| `/validate` | **Spec quality gate** – checks SPEC_OUTPUT.md across 8 quality dimensions (PASS/WARN/BLOCK status) |
| `/convert` | File conversion – Office, PDF, email, image, audio and video files to Markdown |
| `/mermaid-diagrams` | Standalone diagram creation |
| `/memory-handler` | View project memory |
| `/self-dev` | **Development request capture** – send BA Tool change requests to the developer |
| `/check-state` | **Project state assessment** – examine workflow folders, determine phase, list missing steps |
| `/help [command / question]` | **Help system** – command list, project state, next step suggestion; `/help <command>` for detailed help; `/help <question>` searches documentation (HANDBOOK, skills, agents) |

> **In most cases, only `/ba` or `/discovery` is needed.** Other commands are for advanced users and special cases.

## `/ba` vs. `/discovery` — When to Use Which?

| | `/discovery` | `/ba` |
|---|---|---|
| Phase | Discovery — early, incomplete materials | Analysis — detailed, structured materials |
| Blocked by Q-XXX? | **No** — always generates | **Yes** — stops if Q-XXX open |
| Output depth | High-level: problem, goals, scope, MVP | Detailed: FR/NFR/US requirements |
| Documents | BC.md, Discovery_RAID.md, Discovery_Questions.md | BRD, User_Stories, Process_Flows, RAID_Log, Glossary, Traceability_Matrix |
