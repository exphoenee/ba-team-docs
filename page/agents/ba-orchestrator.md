# ba-orchestrator

> A fő koordinátor: felméri a workflow állapotát és delegálja a munkát a megfelelő specialist agentnek.

[English version](ba-orchestrator.en.md)

---

## Szerepe a workflow-ban

A `ba-orchestrator` a BA Team "agyközpontja". Nem ír specifikációt és nem generál dokumentumokat — kizárólag dönt: megnézi, hol tart a projekt, és a megfelelő agentet hívja meg. Minden `/ba` futás ezen keresztül zajlik.

## Mikor aktiválódik?

A `/ba` skill dispatchilja minden alkalommal, amikor a felhasználó a `/ba` parancsot futtatja.

## Működési logika

Az orchestrator az alábbi sorrendben ellenőrzi a workflow-állapotot:

| Állapot | Feltétel | Teendő |
|---|---|---|
| Nincs input | `01_project_info/` üres | Jelzi a felhasználónak, megáll |
| Nincs spec | Input létezik, de nincs `SPEC_OUTPUT.md` | Futtatja az `extraction-agent`-et |
| FORCED döntés újabb mint spec | `04_decisions/` fájl mtime > spec mtime | Újrafuttatja az `extraction-agent`-et |
| Nyitott Q-XXX kérdések | Spec van, de kérdések megválaszolatlanok | Listázza a kérdéseket, megáll |
| RCA szükséges | ≥3 INFERRED:HIGH vagy ≥5 RISK-XXX; nincs/elavult RCA | Futtatja az `rca-agent`-et (nem blokkoló) |
| Spec validáció | Spec frissebb, mint `SPEC_VALIDATION.md` | Futtatja a `validation-agent`-et (PASS/WARN/BLOCK) |
| Minden kész | Spec van, minden Q-XXX megválaszolt, validáció PASS/WARN | Futtatja a `ba-document-agent`-et |

## Speciális flag-ek

| Flag | Hatás |
|---|---|
| `/ba --draft` | BA dokumentumok generálása VÁZLAT fejléccel, még megválaszolatlan kérdésekkel is |
| `/ba --force` | BA dokumentum-regenerálás kényszerítése, naprakész-ellenőrzés kihagyásával |
| `/ba --discovery` | `discovery-agent` futtatása `extraction-agent`/`ba-document-agent` helyett |
| `/ba --preview` | Elemzi az állapotot és jelzi, mi következne — semmit sem módosít |
| `/ba --validate-only` | Csak a `validation-agent`-et futtatja, dokumentumot nem generál |

## Lépések

1. **Fájlkonverzió** — szükség esetén futtatja a `convert_all` Python csomagot (0 AI token)
2. **Memóriabetöltés** — `memory-agent` célzott QUERY: csak a releváns fájlok
3. **Input becslés (OB-01)** — ha 20+ fájl vagy >100K token várható: nem-blokkoló figyelmeztetés
4. **Állapotfelmérés** — megvizsgálja a workflow mappák tartalmát és mtime-jait
5. **FR prioritás előnézet (OB-25)** — BA doc-generálás előtt listázza az FR-eket Fázis 1/2 csoportokban
6. **Delegálás** — dispatchilja a megfelelő agentet az állapot alapján
7. **Visszajelzés** — eredményről tájékoztatja a felhasználót

## BLOCK viselkedés — memóriamentés

Ha a validáció BLOCK státusszal tér vissza **és** a `--force` flag nincs megadva (sem friss futásnál, sem cached `SPEC_VALIDATION.md` olvasásakor), az orchestrator **a megállás előtt** `memory-agent`-en keresztül ment egy `DEC-XXX` bejegyzést a `DECISIONS.md`-be. A bejegyzés tartalmazza a blokkolás okát (angol, max 2 mondat, a `SPEC_VALIDATION.md`-ből kinyerve), a dátumot és a `ba-orchestrator` forrásjelzést.

`--force` + BLOCK esetén **nem** tárolódik memóriabejegyzés — a `--force` felülírás, nem döntés.

## Input prioritási sorrend (extraction-agent számára)

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
| `extraction-agent` | Az orchestrator dispatchilja spec-hiány vagy FORCED döntés esetén |
| `rca-agent` | Az orchestrator dispatchilja, ha elegendő RISK/INFERRED:HIGH elem van |
| `validation-agent` | Az orchestrator dispatchilja spec validálásra |
| `ba-document-agent` | Az orchestrator dispatchilja, ha minden Q-XXX megválaszolt |
| `discovery-agent` | Az orchestrator dispatchilja `--discovery` flag hatására |
| `memory-agent` | Az orchestrator QUERY-vel tölti be a memóriát minden futás elején |
| `convert_all` (Python) | Az orchestrator indítja el a fájlkonverziót |