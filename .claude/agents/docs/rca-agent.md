# rca-agent

> Gyökérok-elemzési specialist: strukturált gyökéroklista Excel inputból teljes Chain/IR elemzést állít elő oksági láncokkal, önfenntartó hurkokkal és driver/tünet besorolással.

[English version](rca-agent.en.md)

---

## Szerepe a workflow-ban

Az `rca-agent` a Root Cause Analysis (Gyökérok Elemzés) specialistája. Egyetlen feladat: az előkészített gyökéroklista Excel fájlból végrehajtja a Chain Analysis és Interrelationship Matrix (IR) módszertant, és átadható `RCA_Analysis.md` dokumentumot állít elő. **Soha nem talál ki új gyökérokokat** — kizárólag az inputlistával dolgozik.

## Mikor aktiválódik?

Kétféleképpen indul:
1. **Automatikusan** — a `ba-orchestrator` dispatchilja, ha a SPEC_OUTPUT.md ≥3 `[INFERRED:HIGH]` feltételezést vagy ≥5 RISK-XXX elemet tartalmaz, és RCA_Analysis.md még nincs (vagy elavult)
2. **Manuálisan** — a `/rca` skill dispatchilja

## Elérhető flag-ek

| Flag | Hatás |
|---|---|
| `/rca` | Teljes elemzés (1–9. lépés) |
| `/rca --quick` | Gyors mód: IR_Mátrix és IR_Elemzés kihagyva (1–5. + 8–9. lépés) |
| `/rca --validate` | Csak QA ellenőrzés a meglévő `RCA_Analysis.md`-n (1–7. lépés kihagyva) |

## Input források (prioritás sorrendben)

| Prioritás | Forrás | Tartalom | Kötelező? |
|---|---|---|---|
| 1 | `workflow/01_project_info/_system/SPEC_OUTPUT.md` | A-XXX (különösen `[INFERRED:HIGH]`), RISK-XXX | Nem |
| 2 | `workflow/02_discovery/Discovery_RAID.md` | RC-XXX, RISK-XXX, A-XXX | Nem |
| 3 | `workflow/03_answers/rca_input*_converted.md` | Opcionális kézi kiegészítő | Nem |

Ha egyetlen forrás sem elérhető → leállás, részletes hibaüzenet.

## Mit állít elő?

`workflow/05_ba_docs/RCA_Analysis.md` — az alábbi szekciókkal:

| Szekció | Tartalom |
|---|---|
| Vezetői összefoglaló | Top 2–3 driver, legsúlyosabb hurok, legjobb megszakítási pont |
| Gyökéroklista (tisztítva) | Számozott, megtisztított lista az inputból |
| Közvetlen oksági kapcsolatok | Táblázat: ki okoz kit közvetlenül |
| Chain_Long — Oksági láncok | Mélységi láncok táblázatban + Mermaid flowchart minden lánchoz |
| Loop_Summary — Önfenntartó hurkok | Hurkok azonosítása, üzleti értelmezés, megszakítási pont |
| IR_Mátrix | N×N mátrix: 1 = közvetlen kapcsolat (--quick esetén kihagyva) |
| IR_Elemzés | Driver/tünet besorolás pontszámokkal (--quick esetén kihagyva) |
| QA Riport | 7 invariáns ellenőrzése ✅/❌ |

## Elemzési lépések

1. **Input validálás** — gyökéroklista azonosítása, oszlopok, SHA-256 fingerprint
2. **Gyökéroklista tisztítás** — csak megjelenítési tisztítás, tartalomváltoztatás nélkül
3. **Közvetlen oksági kapcsolatok** — minden párra: közvetlen-e a kapcsolat?
4. **Chain_Long** — mélységi oksági láncok építése + Mermaid diagramok
5. **Loop_Summary** — önfenntartó hurkok azonosítása + Mermaid diagramok
6. **IR_Mátrix** — N×N mátrix (Chain_Long-ban igazolt közvetlen kapcsolatok)
7. **IR_Elemzés** — kimenő/bejövő pontszámok, driver/tünet besorolás
8. **QA Ellenőrzés** — 7 invariáns (soha nem hagyható ki)
9. **Executive Summary** — 3–5 mondatos vezetői összefoglaló

## Kemény korlátok

- Soha nem talál ki új gyökérokot, ami nincs az inputlistában
- Soha nem nevezi át, összevonja vagy osztja fel a gyökérokokat
- Az IR_Mátrixban `1` csak akkor, ha a Chain_Long-ban egymást követő lépéspár
- Kimenet kizárólag `workflow/05_ba_docs/RCA_Analysis.md`
- QA Ellenőrzés (8. lépés) minden futáson kötelező

## Kapcsolódó komponensek

| Komponens | Kapcsolat |
|---|---|
| `/rca` skill | Dispatchilja az agentet |
| `convert_all` (Python) | Az Excel input konvertálása — az rca-agent az így keletkező `_converted.md`-t olvassa |