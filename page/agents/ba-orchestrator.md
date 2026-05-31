# ba-orchestrator

> A fő koordinátor: felméri a workflow állapotát és delegálja a munkát a megfelelő specialist agentnek.

[English version](ba-orchestrator.en.md)

---

## Szerepe a workflow-ban

A `ba-orchestrator` a BA Team "agyközpontja". Nem ír specifikációt és nem generál dokumentumokat — kizárólag dönt: megnézi, hol tart a projekt, és a megfelelő agentet hívja meg. Minden `/ba` futás ezen keresztül zajlik.

## Mikor aktiválódik?

A `/ba` skill dispatchilja minden alkalommal, amikor a felhasználó a `/ba` parancsot futtatja.

## Működési logika

Az orchestrator öt lehetséges workflow-állapotot ismer fel és kezel:

| Állapot | Feltétel | Teendő |
|---|---|---|
| Nincs input | `01_project_info/` üres | Jelzi a felhasználónak, megáll |
| Nincs spec | Input létezik, de nincs `SPEC_OUTPUT.md` | Futtatja a `spec-builder-agent`-et |
| FORCED döntés újabb mint spec | `04_decisions/` fájl mtime > spec mtime | Újrafuttatja a `spec-builder-agent`-et |
| Nyitott Q-XXX kérdések | Spec van, de kérdések megválaszolatlanok | Listázza a kérdéseket, megáll |
| Minden kész | Spec van, minden Q-XXX megválaszolt | Futtatja a `ba-document-agent`-et |

## Speciális flag-ek

| Flag | Hatás |
|---|---|
| `/ba --draft` | BA dokumentumok generálása VÁZLAT fejléccel, még megválaszolatlan kérdésekkel is |
| `/ba --force` | BA dokumentum-regenerálás kényszerítése, naprakész-ellenőrzés kihagyásával |
| `/ba --discovery` | `discovery-agent` futtatása `spec-builder`/`ba-document-agent` helyett |

## Lépések

1. **Fájlkonverzió** — szükség esetén futtatja a `convert_all` Python csomagot (0 AI token)
2. **Memóriabetöltés** — `memory-agent` célzott QUERY: csak a releváns fájlok
3. **Input becslés (OB-01)** — ha 20+ fájl vagy >100K token várható: nem-blokkoló figyelmeztetés
4. **Állapotfelmérés** — megvizsgálja a workflow mappák tartalmát és mtime-jait
5. **FR prioritás előnézet (OB-25)** — BA doc-generálás előtt listázza az FR-eket Fázis 1/2 csoportokban
6. **Delegálás** — dispatchilja a megfelelő agentet az állapot alapján
7. **Visszajelzés** — eredményről tájékoztatja a felhasználót

## Input prioritási sorrend (spec-builder számára)

| Prioritás | Forrás | Hatás |
|---|---|---|
| **1 (FORCED)** | `workflow/04_decisions/` (`forced: true`) | Targetált ID-kat felülírja; `[FORCED]` annotáció |
| 2 | `workflow/02_discovery/BC.md` | Prioritásos alap: probléma, célok, scope |
| 3 | `workflow/02_discovery/Discovery_RAID.md` | Korai kockázatok, feltételezések |
| 4 | `workflow/01_project_info/` | Nyers anyagok |
| 5 | `workflow/03_answers/` | Stakeholder válaszok |

## Kapcsolódó komponensek

| Komponens | Kapcsolat |
|---|---|
| `/ba` skill | Meghívja az orchestratort |
| `spec-builder-agent` | Az orchestrator dispatchilja spec-hiány vagy FORCED döntés esetén |
| `ba-document-agent` | Az orchestrator dispatchilja, ha minden Q-XXX megválaszolt |
| `discovery-agent` | Az orchestrator dispatchilja `--discovery` flag hatására |
| `memory-agent` | Az orchestrator QUERY-vel tölti be a memóriát minden futás elején |
| `convert_all` (Python) | Az orchestrator indítja el a fájlkonverziót |
