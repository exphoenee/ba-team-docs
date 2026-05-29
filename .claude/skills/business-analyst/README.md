# `/business-analyst` – BA Dokumentum-generáló

[English version](README.en.md)

## Mire való?

A `/business-analyst` skill az enterprise IT Business Analyst munkájának lényegét végzi el: a strukturált specifikációból és a megválaszolt kérdésekből **teljes, átadható, audit-kész BA dokumentációs csomagot** állít elő.

A skill senior enterprise BA tudással rendelkezik: érti az Agile, Scrum és SAFe keretrendszereket, a biztosítási és pénzügyi szektort, a szabályozói követelményeket (GDPR, PCI-DSS, AML/KYC), és minden dokumentumot úgy készít, hogy az közvetlenül felhasználható legyen projektmunka, fejlesztői átadás vagy audit során.

> **Megjegyzés:** A legtöbb esetben nem kell közvetlenül meghívni — a `/ba` skill automatikusan futtatja, amikor minden kérdés megválaszolt.

---

## Hogyan használd?

Győződj meg arról, hogy:
- `workflow/01_project_info/_system/SPEC_OUTPUT.md` létezik (a `/extractor` elkészítette)
- `workflow/03_answers/` tartalmaz válasz fájlokat (minden Q-XXX kérdés megválaszolva)
- (opcionális) `workflow/01_project_info/_system/SPEC_VALIDATION.md` létezik — a `/validate` vagy a `/ba` automatikusan hozza létre

Ha vannak FORCED döntések (`workflow/04_decisions/` — SDEC-XXX fájlok), azok automatikusan beépülnek a dokumentumokba.

Majd a Claude panelen írd be:

```
/business-analyst
```

---

## Validációs figyelmeztetések a dokumentumokban

Ha a `/validate` (vagy a `/ba`) által létrehozott `SPEC_VALIDATION.md` WARN státuszú elemeket tartalmaz, azok megjelennek a generált dokumentumokban:

```
[⚠️ Validációs figyelmeztetés: BR-003 — hiányzó KPI, Q-XXX nyitott]
```

Ez nem blokkolja a generálást — de láthatóvá teszi a BA számára, hol szükséges még pontosítás.

Ha a `SPEC_VALIDATION.md` BLOCK státuszú, a `/ba` megáll a generálás előtt. Direktben (`/business-analyst`) futtatva a skill figyelmeztet, de folytatja.

---

## Mit állít elő?

Minden dokumentum a `workflow/05_ba_docs/` mappába kerül, külön fájlként.

### Kötelező dokumentumok

**`BRD.md` – Business Requirements Document**
Az összes üzleti és funkcionális követelmény egyedi azonosítókkal (BR-XXX, FR-XXX, NFR-XXX), tesztelhetően és nyomkövethetően megfogalmazva. Megkülönbözteti az üzleti, funkcionális, nem-funkcionális követelményeket és a technikai korlátokat.

> **Fázis-beosztás figyelmeztetés:** A BRD mindig tartalmaz egy automatikusan generált megjegyzést: `⚠️ Fázis-beosztás automatikusan generált — validálás javasolt.` Ez emlékeztet arra, hogy a Fázis 1 / Fázis 2 prioritásbeosztás AI-alapú — stakeholder visszajelzés ajánlott.

**`User_Stories.md` – User Story-k**
Agile formátumban megfogalmazott felhasználói igények:
```
As a [szerep]
I want [képesség]
So that [üzleti eredmény]
```
Minden story Gherkin szintaxisú elfogadási kritériumokkal:
```gherkin
Given ...
When ...
Then ...
```

**`Process_Flows.md` – Folyamatmodellek**
Minden üzleti folyamat vizuálisan ábrázolva Mermaid diagramokkal. Folyamatábrák, állapotgépek, döntési fák — amit a folyamat megkíván.

**`Traceability_Matrix.md` – Követhetőségi mátrix**
Megmutatja, hogy az ügyfél melyik igényéből melyik követelmény lett, és melyik dokumentumban szerepel.

**`RAID_Log.md` – Kockázatok és függőségek**
Strukturált napló: Risks (kockázatok), Assumptions (feltételezések), Issues (problémák), Dependencies (függőségek).

> **Automatikus kockázatgenerálás:** Ha a specifikáció `[INFERRED:HIGH]` jelzőjű feltételezést tartalmaz, a skill automatikusan RISK tételt generál a RAID_Log-ba — emberi beavatkozás nélkül.

**`Glossary.md` – Domain szószedet**
A projektben használt szakkifejezések, rövidítések és domain-specifikus fogalmak definíciói.

### Opcionális dokumentumok (ha elegendő adat áll rendelkezésre)

| Fájl | Tartalom |
|---|---|
| `Data_Dictionary.md` | Adatentitások, mezők, típusok, korlátok — ER diagrammal |
| `UAT_Test_Cases.md` | UAT tesztelési forgatókönyvek, követelményekhez kapcsolva |
| `Stakeholder_Map.md` | Érintetti térkép Mermaid diagrammal |
| `Regulatory_Checklist.md` | GDPR, PCI-DSS, SOX, AML/KYC, Solvency II hatáselemzés |

### Rendszer fájlok (`_system/`)

| Fájl | Tartalom |
|---|---|
| `_system/BA_DOCS_LOG.md` | Generálási napló — timestamp, spec SHA, üzemmód |
| `_system/BA_DOCS_DIFF.md` | Változásnapló — mit módosított az utolsó futás, mi maradt változatlan |

---

## Mermaid diagramok

A skill **minden folyamatleíráshoz kötelezően** Mermaid diagramot készít — nem elégszik meg szöveges leírással.

> **Szintaxis-ellenőrzés:** Minden generált diagram után a skill automatikusan regex-alapú szintaxis-ellenőrzést végez. Ha hibás diagramot talál, WARN üzenetet jelenít meg — de ez **nem blokkolja** a dokumentum-generálást.

| Mit ábrázol | Diagram típus |
|---|---|
| Üzleti folyamat, workflow | `flowchart` |
| Rendszerek közötti kommunikáció | `sequenceDiagram` |
| Állapotátmenetek | `stateDiagram-v2` |
| Adatkapcsolatok | `erDiagram` |
| Érintetti kapcsolatok | `graph LR` |
| Mérföldkövek, ütemterv | `gantt` |

---

## Követelmény szabványok

Minden követelmény kötelező jellemzői:
- **Egyedi azonosító** (BR-001, FR-001, NFR-001, US-001...)
- **Tesztelhető** — eldönthető, hogy teljesül-e vagy sem
- **Nyomkövethető** — visszavezethető az ügyfél igényéhez
- **Atomi** — egyetlen dolgot ír le
- **Egyértelmű** — nem tartalmaz kétértelműséget

---

## Szabályozói tudatosság

A skill automatikusan értékeli a következő szabályozói területek hatásait, ha relevánsak:
GDPR · PCI-DSS · SOX · HIPAA · Solvency II · FCA · AML/KYC

---

## Discovery vs. Analysis mélységű generálás

Ha a projekt `/discovery`-val indult és a `ba-orchestrator` felismeri, hogy `workflow/02_discovery/BC.md` létezik
(Discovery→Analysis átmenet), a skill automatikusan **Discovery-mélységű dokumentumokat** állít elő.

Minden Discovery-mélységű dokumentum tetején ez a fejléc jelenik meg:
```
📍 Generálás módja: DISCOVERY
```

**Különbség a két módban:**

| Dokumentum | Discovery mélység | Analysis mélység |
|---|---|---|
| `BRD.md` | Scope és cél fókusz; must-have FR-ek | Teljes FR/NFR lista, részletes leírásokkal |
| `User_Stories.md` | Epikus szintű user journey-k, 2–3 acceptance criteria/story | Részletes US-XXX Gherkin elfogadási kritériumokkal |
| `UAT_Test_Cases.md` | 5–8 általános epikus teszt-forgatókönyv | 10–20 részletes TC-XXX tesztek lépésekkel |
| Többi dokumentum | SPEC_OUTPUT alapján, csökkentett részletesség | Teljes mélység |

Ha Analysis-mélységű dokumentumokra van szükséged (Discovery-alapú projekten), futtasd: `/ba --force`

> **Fontos:** Discovery-mélységű dokumentumok csak az **első** Analysis futásnál keletkeznek automatikusan (amikor `workflow/05_ba_docs/` még üres). Minden további futásnál és `--force` esetén mindig Analysis mélység az alapértelmezett.

---

## Generált dokumentumok minősége

### User Stories

Analysis módban minden US-hez minimum 3 Gherkin elfogadási kritérium (Given/When/Then) kerül:
- **Scenario 1 — Happy path:** normál sikeres eset
- **Scenario 2 — Edge case:** határeset
- **Scenario 3 — Error case:** hibakezelés

Minden US-hez specifikus szerepkör szükséges (pl. "Projektvezető", "Junior tervező" — nem csak "Felhasználó").

Discovery módban 1–2 egyszerűsített elfogadási kritérium elegendő.

### UAT Tesztesetek

Minden teszteset kötelező struktúrája Analysis módban:
- **Előfeltételek** (rendszerállapot a teszt előtt)
- **Tesztlépések** (számozva)
- **Elvárt eredmény**
- **Elfogadási kritérium** (**MEGFELELT** / **NEM FELELT MEG** feltétel)

Discovery módban általános, TC-XXX azonosító nélküli szcenáriók elegendők.

### Feltételezések és kockázatok

Az `[INFERRED:HIGH]` annotációjú feltételezések egyszerre jelennek meg:
- az **A-XXX feltételezések listájában** (megmarad)
- a **RAID Log RISK szekciójában** (addicionális bejegyzés)

A két bejegyzés egymást kiegészíti, nem helyettesíti. Az A-XXX sor hivatkozik a RISK-XXX-re, és fordítva.

Ha a feltételezés és más A-XXX / RISK bejegyzések között egyértelmű oksági összefüggés azonosítható, az A-XXX sor opcionálisan tartalmaz egy downstream hivatkozást is:
```
→ Downstream hatás: A-003 (csúszó döntések), RISK-004 (scope kúszás)
```

### RAID Log — kockázatok prioritizálása

Minden RISK bejegyzés tartalmaz egy `Szerep` mezőt, amely az RCA módszertan alapján mutatja meg a kockázat funkcióját a kauzális láncban:

| Szerep | Mit jelent | Teendő |
|---|---|---|
| **Driver** | Sok downstream hatással — ez okozza a többit | **Prioritás 1 — itt beavatkozni** |
| **Köztes csomópont** | Okozza ÉS okozzák — kritikus közvetítő | Figyelni |
| **Hurokerősítő** | Önfenntartó körben szerepel | Hurkot megszakítani |
| **Tünet / végpont** | Sok upstream ok — itt látszik a fájdalom | Nem itt kezdeni a megoldást |
| **Validálandó** | Nem volt elegendő adat az osztályozáshoz | Workshopon tisztázni |

Ha a `/rca` skill is lefutott, a Szerep mezők automatikusan az IR_Elemzés kimenetéből töltődnek ki.

---

## Kapcsolódó skillek

| Skill | Kapcsolat |
|---|---|
| `/ba` | Automatikusan hívja, ha minden Q-XXX megválaszolt |
| `/discovery` | Discovery fázis belépési pontja — a discovery-agent kimenetéből dolgozik ez a skill |
| `/extractor` | Előállítja azt a specifikációt, amiből ez dolgozik |
| `/mermaid-diagrams` | Ha önálló diagramra van szükség |
| `/memory-handler` | Az elkészített döntéseket és szakkifejezéseket ide menti |
