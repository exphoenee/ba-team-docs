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
| Van spec, de `02_answers/` üres | Listázza a kérdéseket, vár a válaszokra |
| Van spec és részleges válaszok | Pontosan megmutatja, melyik Q-XXX kérdés hiányzik még |
| Minden kérdés megválaszolva | **BA dokumentumokat generál** → elmenti `03_ba_docs/`-ba |

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

Egészítsd ki a workflow/02_answers/ fájlokat, majd futtasd újra: /ba
```

---

## Mit generál, ha minden rendben van?

A `workflow/03_ba_docs/` mappába az alábbi fájlok kerülnek:

| Fájl | Tartalom |
|---|---|
| `BRD.md` | Business Requirements Document |
| `User_Stories.md` | User Story-k Gherkin elfogadási kritériumokkal |
| `Process_Flows.md` | Folyamatábrák (Mermaid diagramok) |
| `Traceability_Matrix.md` | Követhetőségi mátrix |
| `RAID_Log.md` | Kockázatok, feltételezések, függőségek |
| `Glossary.md` | Domain szószedet |

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
