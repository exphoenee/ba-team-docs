# discovery-agent

> A Discovery fázis specialistája: korai, hiányos projektanyagokból strukturált Discovery dokumentumcsomagot állít elő — soha nem blokkolja a generálást megválaszolatlan kérdések miatt.

[English version](discovery-agent.en.md)

---

## Szerepe a workflow-ban

A `discovery-agent` az értékesítési handover és az első stakeholder meetingek közötti résre specializálódott. Akkor a leghasznosabb, amikor a projektanyagok még töredékesek — sales emailek, meeting jegyzetek, egyoldalas briefe-k. Nem várja meg, amíg minden kérdés megválaszolt: a strukturált kérdéslista maga is értékes kimenet.

## Mikor aktiválódik?

- A `ba-orchestrator` dispatchilja a `--discovery` flag hatására (a `/discovery` skill által küldött)
- Közvetlenül is meghívható a `/discovery` skill által

## Beépített draft mód

A `discovery-agent` **mindig** draft módban működik. Q-XXX kérdések soha nem blokkolják a dokumentumgenerálást — ha vannak nyitott kérdések, a `BC.md` VÁZLAT fejlécet kap.

## Mit állít elő?

| Fájl | Tartalom |
|---|---|
| `workflow/02_discovery/_system/DISCOVERY_OUTPUT.md` | Strukturált közbenső spec |
| `workflow/02_discovery/BC.md` | Business Concept — fő Discovery deliverable |
| `workflow/02_discovery/Discovery_RAID.md` | Korai RAID: kockázatok, feltételezések, nyitott problémák |
| `workflow/02_discovery/Discovery_Questions.md` | Meeting-ready kérdéslista kategóriák szerint |

## Lépések

1. **Memóriabetöltés** — `memory-agent` QUERY: PROJECT_CONTEXT, STAKEHOLDERS, RISKS
2. **Input beolvasás** — `workflow/01_project_info/` fájljai
3. **Válaszok beolvasása** — `workflow/03_answers/` (ha vannak — Discovery és Analysis válaszok is)
4. **DISCOVERY_OUTPUT.md generálás** — strukturált közbenső spec → `workflow/02_discovery/_system/`
5. **Három Discovery dokumentum generálása** — BC.md, Discovery_RAID.md, Discovery_Questions.md
6. **Memória mentés** — PROJECT_CONTEXT, STAKEHOLDERS, RISKS (`memory-agent` STORE)
7. **Visszajelzés** — `ba-orchestrator`-nak

## Q-XXX kategóriák Discovery módban

| Kategória | Mikor kap ilyen jelzést |
|---|---|
| `[SCOPE]` | Határ nem tiszta — mi van benne, mi nincs |
| `[MVP]` | MVP definíció hiányos, must-have lista nincs meghatározva |
| `[FEASIBILITY]` | Megvalósíthatóság kérdéses |
| `[STAKEHOLDER]` | Döntéshozó ismeretlen, jóváhagyó nincs azonosítva |
| `[TECHNICAL]` | Technikai feltétel ismeretlen — rendszer, integráció, API |

## Discovery → Analysis átmenet

Ha a `ba-orchestrator` Discovery után Analysis BA dokumentumokat generál, és `workflow/02_discovery/BC.md` létezik, a `ba-document-agent` Discovery mélységű dokumentumokat állít elő:
- **BRD:** scope és cél fókusz, kevesebb FR részlet
- **User Stories:** epikus szintű user journey-k, 2–3 acceptance criteria
- **UAT:** 5–8 általános forgatókönyv

## Kapcsolódó komponensek

| Komponens | Kapcsolat |
|---|---|
| `ba-orchestrator` | Dispatchilja `--discovery` flag hatására |
| `/discovery` skill | Közvetlenül is meghívhatja |
| `memory-agent` | QUERY a betöltéshez, STORE a mentéshez |
| `ba-document-agent` | A discovery kimenetét (`BC.md`) felhasználhatja context-ként |
