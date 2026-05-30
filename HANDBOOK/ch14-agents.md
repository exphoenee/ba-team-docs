# 14. Háttérben futó ügynökök

## ba-orchestrator

A fő koordinátor. Felméri a workflow állapotát és irányítja a többi ügynököt.

**Lépései:**
1. **Pre-flight:** Becsli a bemeneti fájlok token-terhelését
2. Betölti a memóriát (csak a szükséges fájlokat)
3. Megvizsgálja a workflow állapotát
4. **FR prioritás előnézet:** BA doc-generálás előtt listázza a Fázis 1 / Fázis 2 FR elemeket
5. Dispatchilja a megfelelő ügynököt
6. Visszajelent a felhasználónak

**Mikor áll meg:**
- Ha nincs bemeneti fájl → kéri az anyagok bemásolását
- Ha Q-XXX kérdések megválaszolatlanok → listázza és megáll

## discovery-agent

A Discovery fázis specialistája. Korai anyagokból Business Concept dokumentumot és kérdéslistát generál.

**Lépései:**
1. Beolvassa az anyagokat a `workflow/01_project_info/` mappából
2. Beolvassa a válaszokat a `workflow/03_answers/` mappából
3. Generálja a `DISCOVERY_OUTPUT.md` közbenső specet
4. Generálja a három Discovery dokumentumot: `BC.md`, `Discovery_RAID.md`, `Discovery_Questions.md`
5. Frissíti a memóriát

**Fontos:** A discovery-agent **mindig** draft módban működik – Q-XXX soha nem blokkolja.

## extraction-agent

Kizárólag kinyeréssel foglalkozik – minőségellenőrzést nem végez.

**Lépései:**
1. Beolvassa a SPEC_LOG-ot + FORCED döntéseket
2. Eldönti: inkrementális frissítés vagy teljes újragenerálás
3. Kinyeri a FR-XXX, NFR-XXX, BR-XXX, US-XXX, Q-XXX, A-XXX elemeket
4. Menti a `SPEC_OUTPUT.md` + `SPEC_DIFF.md` fájlokat
5. Frissíti a memóriát

## validation-agent

**Aktiválódik:** minden `/ba` futásnál automatikusan, az extraction és az RCA után, a generálás előtt.

**Feladata:** a `SPEC_OUTPUT.md` minőségét ellenőrzi – nem generál dokumentumot.

**Mit ellenőriz:**
- BR metrika-lefedettség (KPI)
- NFR taxonómia (5 kötelező kategória)
- FR domain-lefedettség
- GDPR trigger (**BLOCKER**)
- SCOPE CONFLICT nyitott kérdések
- Duplikált ID (**BLOCKER**)

**Státuszok:** ✅ PASS → automatikus folytatás | ⚠️ WARN → folytatódik, figyelmeztetéssel | ❌ BLOCK → megáll

## ba-document-agent

**Lépései:**
1. Beolvassa a SPEC_OUTPUT.md-t, SPEC_DIFF.md-t, válaszfájlokat, FORCED döntéseket
2. **Szelektív újragenerálás** (SPEC_DIFF.md alapján)
3. Generálja a dokumentumokat Mermaid diagramokkal
4. Menti a `workflow/05_ba_docs/` mappába
5. Írja a generálási naplót és változásnaplót
6. Frissíti a memóriát

## rca-agent

A gyökérok-elemzés specialistája. Automatikusan fut, ha ≥3 `[INFERRED:HIGH]` vagy ≥5 RISK-XXX elem van.

**Lépései:**
1. Input gyűjtés és deduplikáció
2. Gyökéroklista tisztítása
3. Közvetlen oksági kapcsolatok feltárása
4. Chain_Long – korlátlan mélységű oksági láncok
5. Loop_Summary – önfenntartó hurkok
6. IR_Mátrix – N×N kapcsolatmátrix
7. IR_Elemzés – driver index + besorolás
8. QA riport – 7 invariáns ellenőrzése
9. Vezetői összefoglaló

**Nem blokkoló** – ha hibával áll le, a workflow folytatódik.

## convert_all Python csomag

A fájlkonverziót **nem AI agent**, hanem a `.claude/scripts/convert_all` Python csomag végzi. **0 LLM tokent** használ el.

## memory-agent

Az egyetlen ügynök, amely a `.claude/memory/` mappát kezeli.

| Művelet | Leírás |
|---|---|
| `LOAD` | Összes aktív memória betöltése |
| `LOAD_ALL` | Összes sor, archivált is |
| `STORE` | Új bejegyzés hozzáfűzése |
| `QUERY` | Célzott lekérdezés |
| `BATCH` | Több művelet egy hívással |
| `MEMORY_UPSERT` | Sor frissítése vagy hozzáadása |
