# 5. Mappa- és fájlstruktúra

```
projekt-neve/
├── workflow/
│   ├── 01_project_info/     ← IDE másold be az ügyfél anyagait
│   ├── 02_discovery/        ← Discovery-agent kimenetei (BC.md, RAID)
│   ├── 03_answers/          ← IDE kerülnek a kérdésekre adott válaszok
│   ├── 04_decisions/        ← FORCED döntések (SDEC-XXX fájlok)
│   └── 05_ba_docs/          ← IDE kerülnek a kész BA dokumentumok
├── .claude/
│   ├── agents/              ← Specializált ügynökök (nem kell szerkeszteni)
│   ├── skills/              ← Parancsok (slash commands)
│   ├── memory/              ← Projekt memória (automatikusan kezelt)
│   ├── rules/               ← Viselkedési szabályok
│   └── scripts/             ← Session loader szkriptek
├── CLAUDE.md                ← Belső instrukciók (nem kell szerkeszteni)
├── AGENTS.md                ← Technikai referencia (nem kell szerkeszteni)
└── README.md                ← Leírás
```

## Az öt fő munkamappa

**`workflow/01_project_info/`** – Ide kerül minden ügyfél-anyag:
- Meetingjegyzetek (.md, .txt, .docx)
- E-mail-levelezések (.eml, .msg)
- Excel táblázatok (.xlsx)
- Word dokumentumok (.docx)
- PDF fájlok (natívan olvasható, nem kell konverzió)

**`workflow/02_discovery/`** – Discovery-agent kimenetei:
- `BC.md` – Business Concept (probléma, célok, scope, MVP)
- `Discovery_RAID.md` – korai kockázatok és feltételezések
- `Discovery_Questions.md` – meeting-ready kérdéslista (discovery fázisból)
- `_system/DISCOVERY_OUTPUT.md` – strukturált közbenső spec

**`workflow/03_answers/`** – Ide írod a válaszokat a rendszer kérdéseire:
- `answers.md` fájl (ajánlott)
- Bármilyen más szöveges fájl
- Office fájlok (automatikusan konvertálódnak)

**`workflow/04_decisions/`** – FORCED döntések helye:
- `SDEC-XXX_nev.md` fájlok (YAML frontmatter)
- Stakeholderek és PM itt írhatnak felül bármely specifikációs elemet
- A sablont lásd: `.claude/references/decision_template.md`

**`workflow/05_ba_docs/`** – A kész dokumentumok helye:
- Ide generálja a rendszer az összes BA dokumentumot
- Soha ne szerkeszd kézzel – a `/ba` újragenerálja

## A memória mappa

**`.claude/memory/`** – A hosszú távú projekt-memória:

| Fájl | Tartalom |
|---|---|
| `PROJECT_CONTEXT.md` | Projekt neve, ügyfél, scope, rendszerek, fázis |
| `STAKEHOLDERS.md` | Érintett személyek és szerepköreik |
| `DECISIONS.md` | Naplózott döntések (DEC-XXX azonosítóval) |
| `RESOLVED_QUESTIONS.md` | Megválaszolt kérdések archívuma |
| `DOMAIN_GLOSSARY.md` | Projektspecifikus szakkifejezések |
| `RISKS.md` | Kockázatok és feltételezések |
| `CONVERSION_LOG.md` | Konvertált fájlok nyilvántartása |
