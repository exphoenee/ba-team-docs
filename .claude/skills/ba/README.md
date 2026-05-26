# `/ba` – Egységes BA munkafolyamat koordinátor

[English version](README.en.md)

## Mire való?

Ez a skill a teljes BA munkafolyamat **egyetlen belépési pontja**. Nem kell emlékezni arra, hogy éppen hol tart a projekt, melyik lépés következik, vagy melyik parancsot kell kiadni — a `/ba` mindezt automatikusan kideríti és elvégzi.

A háttérben egy önálló AI ügynököt (subagent) indít el, amely izolált munkakörnyezetben fut. Ez azt jelenti, hogy a fő Claude-párbeszéd nem telik meg közbenső eredményekkel — csak a végső összefoglaló jelenik meg.

---

## Hogyan használd?

A Claude panelen írd be:

```
/ba
```

Ennyi. A skill maga dönti el, mi a következő lépés.

---

## Mit csinál pontosan?

Az ügynök az alábbi sorrendben vizsgálja meg a projekt állapotát:

### 1. Memória betöltése
Beolvassa a `.claude/memory/` mappában tárolt projekt-kontextust: korábbi döntések, stakeholderek, megválaszolt kérdések archívuma, domain szakkifejezések.

### 2. Állapot felismerés

| Amit talál | Mit tesz |
|---|---|
| `workflow/01_project_info/` üres | Megáll, kéri az anyagok bemásolását |
| Van bemenet, de nincs `SPEC_OUTPUT.md` | **Spec-buildert futtat** → elmenti a specifikációt és a kérdéslistát |
| FORCED döntés újabb a spec-nél | **Spec-buildert futtat** → alkalmazza a döntést a spec-ben |
| Van spec, de `03_answers/` üres | Listázza a kérdéseket, vár a válaszokra |
| Van spec és részleges válaszok | Pontosan megmutatja, melyik Q-XXX kérdés hiányzik még |
| Egyes Q-XXX kérdések `PARTIALLY_ANSWERED` | **Nem blokkolja** a folyamatot — figyelmeztetést jelenít meg, továbblép |
| Minden kérdés megválaszolva | **BA dokumentumokat generál** → elmenti `05_ba_docs/`-ba |

### 3. Memória frissítése
Az elvégzett munka végén visszamenti a tanultakat: döntések, megválaszolt kérdések, domain szakkifejezések, kockázatok.

### 4. Visszajelzés
Egyértelmű, strukturált visszajelzést ad arról, mi történt és mi a következő teendő.

---

## Mikor áll meg?

A `/ba` **soha nem generál BA dokumentumokat, ha bármelyik Q-XXX kérdés megválaszolatlan**. Ha hiányzó válaszokat talál, pontosan felsorolja őket:

```
⛔ Munkafolyamat megállva – hiányzó válaszok

| ID    | Kategória | Kérdés összefoglalója              |
|-------|-----------|------------------------------------|
| Q-002 | DATA      | Milyen adatmegőrzési idő szükséges? |
| Q-005 | INTEGRATION | Melyik külső rendszer kezeli a fizetést? |

Egészítsd ki a workflow/03_answers/ fájlokat, majd futtasd újra: /ba
```

---

## Jelölők (flagek)

A `/ba` parancs opcionális jelölőkkel finomítható:

| Jelölő | Hatás |
|---|---|
| `--preview` | Megmutatja, mi történne — változtatás nélkül |
| `--draft` | BA dokumentumokat generál megválaszolatlan Q-XXX kérdések esetén is — minden dokumentum VÁZLAT fejlécet kap |
| `--force` | Kihagyja az „aktuális dokumentumok" ellenőrzést és a FORCED döntés miatti spec újragenerálást is; kényszeríti a BA dokumentumok újragenerálását |
| `--discovery` | Discovery módban fut — a discovery-agent-et dispatcheli az alap workflow helyett |

### `--draft` üzemmód részletesen

Ha korai visszajelzéshez, előzetes egyeztetéshez szeretnél vázlatos BA dokumentumokat — még akkor is, ha Q-XXX kérdések megválaszolatlanok —, használd a `--draft` jelölőt:

```
/ba --draft
```

`--draft` módban:
- A BA dokumentumok akkor is legenerálódnak, ha Q-XXX kérdések még nyitottak
- Minden generált dokumentum tetejére **VÁZLAT** fejléc kerül
- A kérdések archiválása a memóriában kimarad (ezek maradnak aktívak)
- A dokumentum **nem végleges átadható** — csak előzetes áttekintésre, visszajelzésre alkalmas

### `--discovery` üzemmód és az automatikus Discovery-mélység

A `--discovery` jelölő hatására a `/ba` az alap workflow helyett a `discovery-agent`-et dispatchilja.
Ez ugyanaz, mint a `/discovery` parancs közvetlen futtatása — mindkettő a Discovery fázis belépési pontja.

**Automatikus Discovery-mélység (DS-10):**

Ha a projekted korábban `/discovery`-val indult, a `/ba` automatikusan felismeri ezt és
**Discovery-mélységű BA dokumentumokat** generál:

Az orchestrator ellenőrzi:
- `workflow/02_discovery/BC.md` létezik **ÉS**
- `workflow/01_project_info/_system/SPEC_OUTPUT.md` is létezik

→ Ha mindkettő megvan: a `ba-document-agent` Discovery-mélységű dokumentumokat állít elő
→ Minden generált dokumentum tetején megjelenik: `📍 Generálás módja: DISCOVERY`

**Discovery vs. Analysis dokumentummélység:**

| Dokumentum | Discovery mélység | Analysis mélység |
|---|---|---|
| `BRD.md` | Scope és cél fókusz, kevesebb FR részlet | Teljes FR/NFR lista |
| `User_Stories.md` | Epikus szintű user journey-k, 2–3 acceptance criteria | Részletes US-XXX Gherkinnel |
| `UAT_Test_Cases.md` | 5–8 általános forgatókönyv | 10–20 részletes TC-XXX teszt |

Ha Analysis-mélységű dokumentumokra van szükséged a Discovery-alapú projekten, futtasd: `/ba --force`

---

## Mit generál, ha minden rendben van?

A `workflow/05_ba_docs/` mappába az alábbi fájlok kerülnek:

| Fájl | Tartalom |
|---|---|
| `BRD.md` | Business Requirements Document |
| `User_Stories.md` | User Story-k Gherkin elfogadási kritériumokkal |
| `Process_Flows.md` | Folyamatábrák (Mermaid diagramok) |
| `Traceability_Matrix.md` | Követhetőségi mátrix (forrás fájl → követelmény → user story) |
| `RAID_Log.md` | Kockázatok, feltételezések, függőségek |
| `Glossary.md` | Domain szószedet |
| `_system/BA_DOCS_LOG.md` | Generálási napló (mikor, miből, milyen módban) |
| `_system/BA_DOCS_DIFF.md` | Változásnapló (mit módosított az utolsó futás) |

Ha elegendő adat áll rendelkezésre, ezek is elkészülnek:
- `Data_Dictionary.md` – adatentitások és mezők
- `UAT_Test_Cases.md` – tesztelési forgatókönyvek
- `Stakeholder_Map.md` – érintetti térkép
- `Regulatory_Checklist.md` – GDPR, AML/KYC hatáselemzés

---

## Kapcsolódó skillek

| Skill | Kapcsolat |
|---|---|
| `/spec-builder` | A `/ba` ezt futtatja az első fázisban |
| `/business-analyst` | A `/ba` ezt futtatja a dokumentum-generálási fázisban |
| `/memory-handler` | A `/ba` ezt használja a memória olvasásához és írásához |
| `/session-loader` | Session elején futtatandó az állapot betöltéséhez |
