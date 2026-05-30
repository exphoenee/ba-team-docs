# 4. Folder and File Structure

```
your-project/
├── workflow/
│   ├── 01_project_info/     ← Copy client materials here
│   ├── 02_discovery/        ← Discovery agent outputs (BC.md, RAID)
│   ├── 03_answers/          ← Your answers to questions go here
│   ├── 04_decisions/        ← FORCED decisions (SDEC-XXX files)
│   └── 05_ba_docs/          ← Generated BA documents
├── .claude/
│   ├── agents/              ← Specialized agents (don't edit)
│   ├── skills/              ← Commands (slash commands)
│   ├── memory/              ← Project memory (auto-managed)
│   ├── rules/               ← Behavior rules
│   └── scripts/             ← Session loader scripts
├── CLAUDE.md                ← Internal instructions
├── AGENTS.md                ← Technical reference
└── README.md                ← Description
```

## The Five Work Folders

**`workflow/01_project_info/`** — All client materials go here:
- Meeting notes (.md, .txt, .docx)
- Email correspondence (.eml, .msg)
- Excel spreadsheets (.xlsx)
- Word documents (.docx)
- PDF files (natively readable)

**`workflow/02_discovery/`** — Discovery agent outputs:
- `BC.md` — Business Concept
- `Discovery_RAID.md` — Early risks and assumptions
- `Discovery_Questions.md` — Meeting-ready question list
- `_system/DISCOVERY_OUTPUT.md` — Structured intermediate spec

**`workflow/03_answers/`** — Your answers to system questions:
- `answers.md` (recommended)
- Any other text files or Office files (auto-converted)

**`workflow/04_decisions/`** — FORCED decisions:
- `SDEC-XXX_name.md` files (YAML frontmatter)
- Stakeholders can override any specification element

**`workflow/05_ba_docs/`** — Final BA documents:
- All BA documents generated here
- Never edit manually — `/ba` regenerates

## Memory Folder

**`.claude/memory/`** — Long-term project memory:
- `PROJECT_CONTEXT.md`, `STAKEHOLDERS.md`, `DECISIONS.md`, `RESOLVED_QUESTIONS.md`, `DOMAIN_GLOSSARY.md`, `RISKS.md`, `CONVERSION_LOG.md`
