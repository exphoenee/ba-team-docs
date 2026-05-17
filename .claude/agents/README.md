# BA Team – Agentek

[English version](README.en.md)

Ez a mappa tartalmazza a BA workflow specializált ügynökeit. Az agentek nem közvetlenül a felhasználó által hívhatók — a skillek dispatchilik őket, és egymást is hívhatják.

---

## Az agentek és a skillek viszonya

```mermaid
%%{init: {'flowchart': { 'nodeSpacing': 100, 'rankSpacing': 150 } }}%%
flowchart LR
    U([Felhasználó]) -->|"/ba"| S1[ba skill]
    U -->|"/spec-builder"| S2[spec-builder skill]
    U -->|"/business-analyst"| S3[business-analyst skill]
    U -->|"/memory-handler"| S4[memory-handler skill]
    U -->|"/convert"| S5[convert skill]

    S1 --> A1[ba-orchestrator]
    S2 --> A2[spec-builder-agent]
    S3 --> A3[ba-document-agent]
    S4 --> A4[memory-agent]
    S5 -->|"python run_convert.py"| PY[convert_all csomag]

    A1 -->|"python run_convert.py"| PY
    A1 --> A4
    A1 --> A2
    A1 --> A3
    A2 --> A4
    A3 --> A4
```

> A fájlkonverzió **nem AI agent** — a `convert_all` Python csomag végzi, 0 LLM token felhasználással.

---

## `ba-orchestrator`

**Fájl:** [ba-orchestrator.md](ba-orchestrator.md)

**Szerepe:** A fő koordinátor. Felméri a workflow aktuális állapotát és delegálja a munkát a megfelelő specialist agentnek. Maga nem ír specifikációt és nem generál BA dokumentumokat.

**Lépései:**
1. Szükség esetén futtatja a `convert_all` Python csomagot (0 AI token)
2. Betölti a memóriát (`memory-agent` targeted QUERY — csak a releváns fájlok)
3. Megvizsgálja a workflow állapotát
4. Dispatchilja a `spec-builder-agent`-et VAGY a `ba-document-agent`-et
5. Visszajelent a felhasználónak

**Mikor hívódik:** A `/ba` skill dispatchilja.

**Mikor áll meg:**
- Ha nincs bemeneti fájl → jelzi a felhasználónak
- Ha Q-XXX kérdések megválaszolatlanok → listázza és megáll

---

## `spec-builder-agent`

**Fájl:** [spec-builder-agent.md](spec-builder-agent.md)

**Szerepe:** A specifikáció-készítő specialist. Beolvassa a `workflow/01_project_info/` nyers anyagait, egyetlen koherens modellbe olvasztja őket, és előállítja a strukturált specifikációt Q-XXX kérdéslistával.

**Lépései:**
1. Beolvassa a `SPEC_LOG`-ot a változások detektálásához
2. Kiszámolja az összes bemeneti fájl SHA-256 ujjlenyomatát (`sha_map`)
3. Eldönti a stratégiát: **Inkrementális** (csak az újakat olvassa) vagy **Teljes** újragenerálás
4. Generálja vagy frissíti a specifikációt (FR-XXX, NFR-XXX, US-XXX, Q-XXX) — minden elemhez `[Forrás: filename · sha8]` forrásjelzéssel
5. Menti: `workflow/01_project_info/SPEC_OUTPUT.md`
6. Frissíti a memóriát batch művelettel (`SPEC_LOG` UPSERT + többi STORE)
7. Visszajelent a `ba-orchestrator`-nak

**Mikor hívódik:** `ba-orchestrator` dispatchilja (ha nincs még SPEC_OUTPUT.md), vagy közvetlenül a `/spec-builder` skill.

**Memóriába ment:** PROJECT_CONTEXT · STAKEHOLDERS · RISKS

**Forrás-traceability:** minden generált elem tartalmaz `[Forrás: filename · sha8]` jelzést — az eredeti bemeneti fájl neve és SHA-256-jának első 8 karaktere. Visszakereshetővé teszi, melyik dokumentum-verzióból született egy adott követelmény.

---

## `ba-document-agent`

**Fájl:** [ba-document-agent.md](ba-document-agent.md)

**Szerepe:** A BA dokumentum-generáló specialist. A kész specifikációból, a megválaszolt kérdésekből és a memória kontextusából előállítja a teljes, átadható BA dokumentációs csomagot. Minden folyamathoz kötelező Mermaid diagramot készít.

**Lépései:**
1. Beolvassa a SPEC_OUTPUT.md-t, a válasz fájlokat és a memóriát (binárisokat kihagyva)
2. Generálja az összes kötelező dokumentumot Mermaid diagramokkal
3. Megőrzi a `[Forrás: filename · sha8]` forrásjelzéseket — a Traceability Matrix kap egy `Forrás fájl` oszlopot
4. Menti: `workflow/03_ba_docs/`
5. Elmenti a tanultakat a memóriába (`memory-agent` BATCH STORE)
6. Visszajelent a `ba-orchestrator`-nak

**Mikor hívódik:** `ba-orchestrator` dispatchilja (ha minden Q-XXX megválaszolt), vagy közvetlenül a `/business-analyst` skill.

**Kimenet:**

| Fájl | Tartalom |
|---|---|
| `BRD.md` | Business Requirements Document |
| `User_Stories.md` | User Story-k Gherkin elfogadási kritériumokkal |
| `Process_Flows.md` | Folyamatmodellek (kötelező Mermaid diagramok) |
| `Traceability_Matrix.md` | Követhetőségi mátrix |
| `RAID_Log.md` | Kockázatok, feltételezések, függőségek |
| `Glossary.md` | Domain szószedet |

**Memóriába ment:** RESOLVED_QUESTIONS · DECISIONS · DOMAIN_GLOSSARY · RISKS

---

## `memory-agent`

**Fájl:** [memory-agent.md](memory-agent.md)

**Szerepe:** A memória kezelő. Minden más agent ezen keresztül ír és olvas a `.claude/memory/` mappába. Nem végez elemzést, nem generál dokumentumot — kizárólag adatkezelést végez.

**Műveletek:**

| Művelet | Leírás |
|---|---|
| `BATCH` | Több STORE vagy UPSERT művelet végrehajtása egyetlen hívással (hatékonyabb) |
| `LOAD` | Beolvassa az összes BA memóriafájlt, hiányzókat létrehozza a sablonból |
| `STORE` | Új bejegyzést fűz hozzá a megadott fájlhoz (soha nem törli a régit) |
| `QUERY` | Célzott lekérdezés egy vagy több memóriafájlból |
| `LOAD_CONVERSION_LOG` | Visszaadja a konverziós napló tartalmát |
| `MEMORY_UPSERT` | Frissít vagy hozzáad egy sort a konverziós naplóban |

**Memória fájlok:**

| Fájl | Tartalom |
|---|---|
| `PROJECT_CONTEXT.md` | Projekt neve, ügyfél, scope, érintett rendszerek |
| `STAKEHOLDERS.md` | Stakeholder lista szerepekkel |
| `DECISIONS.md` | Döntések naplója (DEC-XXX) |
| `RESOLVED_QUESTIONS.md` | Megválaszolt Q-XXX archívum |
| `DOMAIN_GLOSSARY.md` | Domain szakkifejezések |
| `RISKS.md` | Kockázatok és feltételezések |
| `CONVERSION_LOG.md` | Konvertált fájlok nyilvántartása (9 oszlop, output SHA-256 ellenőrzéssel) |

**Mikor hívódik:** Minden más agent hívja — `ba-orchestrator`, `spec-builder-agent`, `ba-document-agent`. Közvetlenül a `/memory-handler` skill is dispatchilja.

**Fontos szabály:** Kizárólag a `memory-agent` írhat és olvashat a `.claude/memory/` mappában (kivétel: a `convert_all` Python csomag írja a `CONVERSION_LOG.md`-t közvetlenül).

---

## Felelősségek összefoglalója

| Komponens | Típus | Olvas | Ír | Hívja |
|---|---|---|---|---|
| `ba-orchestrator` | AI agent | workflow mappák állapota | – | `memory-agent`, `spec-builder-agent`, `ba-document-agent` |
| `convert_all` | Python csomag | workflow nyers fájlok | `*_converted.md`, `CONVERSION_LOG.md` | – |
| `spec-builder-agent` | AI agent | `01_project_info/` nyers fájlok | `SPEC_OUTPUT.md` | `memory-agent` |
| `ba-document-agent` | AI agent | `SPEC_OUTPUT.md`, `02_answers/` | `03_ba_docs/` | `memory-agent` |
| `memory-agent` | AI agent | `.claude/memory/` | `.claude/memory/` | – |
