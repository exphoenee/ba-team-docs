# `/discovery` – Discovery Phase Support

[Magyar változat](README.md)

## What is it for?

The `/discovery` skill is the entry point for the **Discovery phase** of the BA workflow.
From early, incomplete, or just-assembled project materials — Sales handovers, first meeting notes,
client emails — it produces a **structured Discovery document set** the BA can work with immediately.

Unlike `/ba`, the `/discovery` skill **never stops due to unanswered questions** — a well-structured
question list is as valuable an output in the Discovery phase as the answers themselves.

---

## How to use it?

Copy materials into the `workflow/01_project_info/` folder, then in the Claude panel type:

```
/discovery
```

That's it. The discovery-agent processes the materials and produces the full Discovery package.

---

## What does it generate?

The discovery-agent saves its outputs to `workflow/02_discovery/`:

| File | Contents |
|---|---|
| `BC.md` | Business Concept — the main Discovery deliverable |
| `Discovery_RAID.md` | Early RAID — risks, assumptions, open issues |
| `Discovery_Questions.md` | Meeting-ready question checklist by category |
| `_system/DISCOVERY_OUTPUT.md` | Structured intermediate spec (basis for the above) |

### Business Concept (BC.md) structure

```
1. Business problem and root causes  [Mandatory Mermaid diagram]
2. Business goals                    [With measurable outcomes]
3. Solution scope                    [In scope / Out of scope, Mermaid diagram]
4. MVP definition                    [Must-have elements]
5. Assumptions and risks             [Early RAID summary]
6. Open questions                    [Q-XXX list by category]
7. Next steps
```

If there are unanswered questions, BC.md is prepended with:
```
⚠️ DRAFT — N open questions. See Discovery_Questions.md for details.
```

### Discovery_Questions.md — Meeting-ready question list

Questions are organized by category in the suggested discussion order:

```
STAKEHOLDER questions → SCOPE questions → MVP questions → FEASIBILITY/Technical questions
```

| Category | When it is assigned |
|---|---|
| `[SCOPE]` | Boundary unclear — what's in and what's out |
| `[MVP]` | MVP definition incomplete, must-have list undetermined |
| `[FEASIBILITY]` | Feasibility questionable — possible technical or business obstacle |
| `[STAKEHOLDER]` | Decision-maker unknown, approver not identified |
| `[TECHNICAL]` | Technical requirement unknown — system, integration, API |

---

## Recommended inputs

The discovery-agent works from any text material, but these templates produce the most efficient output:

| Template | Location | Purpose |
|---|---|---|
| Sales → PM/BA Handover | `.claude/references/templates/handover_template.md` | Structured sales handover |
| Discovery Meeting Notes | `.claude/references/templates/discovery_meeting_template.md` | Meeting note capture |

Copy the templates from the above locations, fill them in, and place them in `workflow/01_project_info/`.

---

## Discovery vs. `/ba` — when to use which?

| | `/discovery` | `/ba` |
|---|---|---|
| Phase | Discovery — early, incomplete materials | Analysis — detailed, structured materials |
| Blocks on Q-XXX? | **No** — always generates | **Yes** — stops if any Q-XXX unanswered |
| Output depth | High-level: problem, goals, scope, MVP | Detailed: FR/NFR/US requirements |
| Documents | BC.md, Discovery_RAID.md, Discovery_Questions.md | BRD, User_Stories, Process_Flows, RAID_Log, Glossary, Traceability_Matrix |

---

## Typical workflow

```
1. Sales handover material → workflow/01_project_info/
2. /discovery → BC.md V1 + Discovery_Questions.md
3. Client meeting → answers → workflow/03_answers/
4. /discovery → BC.md V2 (updated, fewer open questions)
5. Discovery complete → /ba → BRD + User Stories + ...
```

---

## Related Skills

| Skill | Relationship |
|---|---|
| `/ba` | Analysis phase entry point — run this after Discovery is complete |
| `/convert` | Converts Office/PDF files — `/discovery` runs it automatically |
| `/session-loader` | Check project state — which phase are you in? |
| `/memory-handler` | View stakeholders and risks captured during Discovery |
