# 7. A generált dokumentumok

## Discovery dokumentumok (`workflow/02_discovery/`)

A `/discovery` parancs ezeket állítja elő:

| Fájl | Megnevezés | Tartalom |
|---|---|---|
| `BC.md` | Business Concept | Üzleti probléma, célok, scope, MVP elemek |
| `Discovery_RAID.md` | Korai RAID | Kockázatok (RISK-XXX), feltételezések (A-XXX), nyitott issues, RC-XXX gyökérokok |
| `Discovery_Questions.md` | Kérdéslista | Meeting-ready, kategóriák szerint rendezett checklist |
| `_system/DISCOVERY_OUTPUT.md` | Közbenső spec | Strukturált PROB/GOAL/MVP/RISK/Q elemek — a discovery-agent belső munkafájlja |

> **Megjegyzés:** A `Discovery_RAID.md` és a `RAID_Log.md` különböző dokumentumok — előbbi a korai Discovery fázis durva RAID-je, utóbbi az Analysis fázis részletes végleges RAID logja.

---

## Analysis dokumentumok (`workflow/05_ba_docs/`)

A `/ba` parancs ezeket állítja elő (ha minden Q-XXX megválaszolt):

### Kötelező dokumentumok

| Fájl | Megnevezés | Tartalom |
|---|---|---|
| `BRD.md` | Business Requirements Document | Üzleti követelmények BR-XXX, FR-XXX, NFR-XXX azonosítókkal |
| `User_Stories.md` | User Story lista | Agile formátumú felhasználói igények Gherkin elfogadási kritériumokkal |
| `Process_Flows.md` | Üzleti folyamatok | Szöveges leírások + kötelező Mermaid folyamatábrák |
| `Traceability_Matrix.md` | Követhetőségi mátrix | Forrásanyag → követelmény → user story kapcsolatrendszer |
| `RAID_Log.md` | RAID Log | Kockázatok, feltételezések, problémák, függőségek Szerep-taggel |
| `Glossary.md` | Szójegyzék | Domain-specifikus szakkifejezések |

**BRD.md fejezetek (Analysis mód):**

A BRD a következő fejezeteket tartalmazza: fejléc (BRD-001 azonosító, verzió, státusz) · Jelenlegi állapot AS-IS · Kívánt állapot TO-BE · Üzleti célok SMART táblázatban (KPI-val) · Üzleti követelmények (BR-XXX, metrikával) · Funkcionális követelmények (FR-XXX) · Nem-funkcionális követelmények (5 kategóriában, NFR-XXX) · Konfliktusok · Szabályozói hatások · Fázis-beosztás (Must/Should/Could Have) · Jóváhagyási sor.

**User Stories — mélységi elvárás:** Analysis módban minden US-hez minimum 3 Gherkin scenario.

**UAT Tesztesetek — kötelező struktúra:** Előfeltételek, tesztlépések, elvárt eredmény, MEGFELELT / NEM FELELT MEG.

### Opcionális dokumentumok

| Fájl | Tartalom |
|---|---|
| `Data_Dictionary.md` | Adatentitások, mezők, típusok – ER diagrammal |
| `UAT_Test_Cases.md` | Felhasználói elfogadási tesztesetek TC-XXX azonosítókkal |
| `Stakeholder_Map.md` | Érintetti térkép Mermaid diagrammal |
| `Regulatory_Checklist.md` | GDPR, AML/KYC, PCI-DSS hatáselemzés |

### Rendszer fájlok (`workflow/05_ba_docs/_system/`)

Minden BA dokumentum-generálás után automatikusan létrejönnek:

| Fájl | Tartalom |
|---|---|
| `_system/BA_DOCS_LOG.md` | Generálási napló: timestamp, spec SHA, üzemmód (normal / draft / force) |
| `_system/BA_DOCS_DIFF.md` | Változásnapló: mi módosult, mi maradt változatlan az utolsó futáshoz képest |

---

## RCA dokumentumok (`workflow/05_ba_docs/`)

A `/rca` parancs egyetlen dokumentumot állít elő:

| Fájl | Megnevezés | Tartalom |
|---|---|---|
| `RCA_Analysis.md` | Gyökérok-elemzés | Teljes Chain/IR elemzés: oksági láncok, hurkok, driver/tünet besorolás |

### `RCA_Analysis.md` szerkezete

Az elemzés az alábbi szekciókból áll, ebben a sorrendben:

| Szekció | Tartalom | Jelen van |
|---|---|---|
| Fejléc | Projekt neve, generálás dátuma, feldolgozott gyökérokok száma | Mindig |
| **Vezetői összefoglaló** | Top 2–3 driver gyökérok, legsúlyosabb hurok, legjobb megszakítási pont | Mindig |
| **Gyökéroklista (tisztítva)** | Számozott, megtisztított lista — tartalomváltoztatás nélkül | Mindig |
| **Közvetlen oksági kapcsolatok** | Táblázat: mely gyökérok közvetlenül melyiket váltja ki | Mindig |
| **Chain_Long — Oksági láncok** | Mélységi oksági láncok CHAIN-XXX azonosítóval, szerepjelzőkkel, Mermaid diagrammal | Mindig |
| **Loop_Summary — Önfenntartó hurkok** | Hurkok azonosítása, üzleti értelmezés, konkrét megszakítási pont | Mindig |
| **IR_Mátrix** | N×N mátrix: 1 = közvetlen, Chain_Long-ban igazolt kapcsolat | `--quick` esetén kihagyva |
| **IR_Elemzés** | Driver/tünet besorolás kimenő–bejövő pontszámokkal | `--quick` esetén kihagyva |
| **QA Riport** | 7 invariáns ellenőrzése ✅/❌ | Mindig |

### RCA futtatási módok

| Parancs | Tartalom |
|---|---|
| `/rca` | Teljes elemzés (mind a 9 lépés) |
| `/rca --quick` | Gyors mód: IR_Mátrix és IR_Elemzés kihagyva |
| `/rca --validate` | Csak QA ellenőrzés a meglévő RCA_Analysis.md-n |

### RCA input források

Az `rca-agent` automatikusan összegyűjti a gyökérokokat az alábbi forrásokból (csökkenő prioritással):

| Forrás | Mit vesz ki belőle |
|---|---|
| `workflow/01_project_info/_system/SPEC_OUTPUT.md` | A-XXX feltételezések (különösen `[INFERRED:HIGH]`), RISK-XXX elemek |
| `workflow/02_discovery/Discovery_RAID.md` | RC-XXX gyökérokok, RISK-XXX, A-XXX elemek |
| `workflow/03_answers/rca_input*_converted.md` | Opcionális kézi gyökéroklista (Excel inputból konvertálva) |

---

## Belső specifikációs fájlok (`workflow/01_project_info/_system/`)

| Fájl | Megnevezés | Tartalom |
|---|---|---|
| `SPEC_OUTPUT.md` | Struktúrált specifikáció | FR-XXX, NFR-XXX, US-XXX, Q-XXX, A-XXX elemek forrásjelzéssel |
| `SPEC_DIFF.md` | Spec változásnapló | Mi változott az előző futáshoz képest — az impact-alapú dokumentum-újragenerálás alapja |
| `SPEC_VALIDATION.md` | Validációs riport | PASS/WARN/BLOCK státusz, 8 dimenzió ellenőrzése |

---

## User Story formátum

```
US-001: Felhasználói bejelentkezés

As a regisztrált felhasználó
I want to be able to log in with my email and password
So that I can access my personal dashboard

Acceptance Criteria:
  Given a registered user with valid credentials
  When they enter their email and password on the login page
  Then they should be redirected to the dashboard within 3 seconds
```
