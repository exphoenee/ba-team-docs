# 6. Parancsok és skillek

| Parancs | Mire való |
|---|---|
| `/self-improve` | Jóváhagyott feature request implementálása – TODO lista alapján létrehozza/módosítja a fájlokat |
| `/ba` | **Fő parancs** – automatikus következő lépés végrehajtása |
| `/discovery` | Discovery fázis indítása – korai anyagokból BC + kérdéslista generálása |
| `/rca` | Gyökérok-elemzés – Chain/IR módszertan alapján |
| `/session-loader` | Munkamenet betöltése, projekt állapot mutatása |
| `/extractor` | Csak a specifikáció készítése (haladó használat) |
| `/business-analyst` | Csak a BA dokumentumok generálása (haladó használat) |
| `/convert` | Fájlkonverzió – Office, PDF, e-mail, kép, hang- és videófájlok Markdown formátumba |
| `/mermaid-diagrams` | Önálló diagram készítése |
| `/memory-handler` | Projekt memória megtekintése |
| `/self-dev` | **Fejlesztési igény rögzítése** – BA Tool módosítási/fejlesztési kérések elküldése a fejlesztőnek |
| `/validate` | Specifikáció minőségőr – SPEC_OUTPUT.md ellenőrzése 8 dimenzión (PASS/WARN/BLOCK státusz) |
| `/check-state` | **Projekt állapotfelmérés** – a workflow mappák vizsgálata, fázis meghatározása, hiányzó lépések listázása |
| `/help [parancs / kérdés]` | **Súgó megjelenítése** – parancslista, projekt állapot, következő lépés javaslat; `/help <parancs>` részletes segítség; `/help <kérdés>` dokumentáció-keresés (HANDBOOK, skillek, agentek) |
| `/add-answer "Q-XXX: ..."` | **Válasz hozzáadása** – stakeholder válasz mentése a `workflow/03_answers/` mappába; intelligens visszakérdezés hiányzó Q-XXX ID-ra, konfliktusra; nincs előfeltétel-ellenőrzés |
| `/add-decision "szöveg"` | **FORCED döntés hozzáadása** – SDEC-XXX fájl létrehozása a `workflow/04_decisions/` mappában YAML frontmatter-rel; automatikus SDEC ID generálás; intelligens visszakérdezés hiányzó targetre, típusra |

> **A legtöbb esetben csak a `/ba` vagy `/discovery` parancsra van szükséged.** A többi parancs haladó felhasználóknak és speciális esetekre való. A `/self-dev` parancsot akkor használd, ha magát a BA Tool rendszert szeretnéd fejleszteni (új agent, skill, szabály hozzáadása).

## `/ba` vs. `/discovery` -- mikor melyiket?

| | `/discovery` | `/ba` |
|---|---|---|
| Fázis | Discovery -- korai, hiányos anyag | Analysis -- részletes, strukturált anyag |
| Blokkolás Q-XXX-en? | **Nem** -- mindig generál | **Igen** -- megáll, ha Q-XXX nyitott |
| Kimenet mélysége | Magas szintű: probléma, célok, scope, MVP | Részletes: FR/NFR/US követelmények |
| Dokumentumok | BC.md, Discovery_RAID.md, Discovery_Questions.md | BRD, User_Stories, Process_Flows, RAID_Log, Glossary, Traceability_Matrix |
