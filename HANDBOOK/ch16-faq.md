# 16. Gyakori kérdések (GYIK)

## Általános

**K: Miért nem generál dokumentumot a `/ba`?**

A `/ba` megáll, ha megválaszolatlan Q-XXX kérdések vannak. Keresd meg a `workflow/01_project_info/_system/SPEC_OUTPUT.md`-ben a nyitott kérdéseket (státusz: `UNANSWERED`), írd meg a válaszokat a `workflow/03_answers/` mappába, majd futtasd újra a `/ba`-t. A `/check-state` parancs pontosan megmutatja, melyik kérdések hiányoznak.

---

**K: Elveszett a korábbi session tartalma — hogyan tudom visszatölteni?**

Futtasd a `/session-loader` parancsot. Ez betölti a `.claude/memory/` memóriafájlokat és visszaadja a projekt aktuális kontextusát: stakeholderek, döntések, megválaszolt kérdések, kockázatok.

---

**K: Mi a különbség a `/ba` és a `/discovery` között?**

| | `/discovery` | `/ba` |
|---|---|---|
| Mikor használd | Korai, hiányos anyagnál | Részletes, strukturált anyagnál |
| Blokkolás Q-XXX-en? | Nem — mindig generál | Igen — megáll nyitott kérdéseknél |
| Kimenet | BC.md, Discovery_RAID.md, Questions.md | BRD, User Stories, RAID Log stb. |

Ha még nem tudod pontosan, mi kell — kezdd a `/discovery`-vel.

---

**K: Mikor érdemes `/rca`-t futtatni?**

Az `/rca` akkor hasznos, ha:
- A specifikáció sok `[INFERRED:HIGH]` feltételezést tartalmaz
- Szeretnéd feltérképezni, mi áll a problémák mögött (oksági láncok)
- Stakeholder prezentációhoz kell egy driver/tünet elemzés

A `/rca` automatikusan is elindul, ha a `ba-orchestrator` elég `[INFERRED:HIGH]` elemet talál.

---

## Fájlok és konverzió

**K: A rendszer nem ismeri fel a Word dokumentumomat — mi a teendő?**

1. Futtasd a `/convert` parancsot manuálisan
2. Nézd meg a konverziós naplót: `/memory-handler` → CONVERSION_LOG.md
3. Ha WARN státusz jelenik meg (Output < 200 bájt), ellenőrizd, hogy nem jelszóval védett-e a fájl

---

**K: Futtathatom ugyanabban a sessionben több projektet?**

Nem ajánlott. A `workflow/` mappa egy projekthez van rendelve. Ha párhuzamosan dolgozol, nyiss új Claude Code sessiont minden projekthez.

---

**K: Töröljek-e fájlokat a `workflow/01_project_info/` mappából, ha megváltozott az anyag?**

Nem kell törölni — csak add hozzá az új fájlokat. A rendszer SHA-256 ujjlenyomat alapján detektálja a változást, és csak az újakat dolgozza fel (inkrementális konverzió és spec-újraépítés).

Ha viszont tényleg töröltél egy forrást, a következő `/ba` futtatás teljes spec-újragenerálást végez, hogy eltávolítsa az „árva" követelményeket.

---

## Specifikáció és kérdések

**K: Mi a PARTIALLY_ANSWERED státusz?**

Az `extraction-agent` megtalált egy részleges választ a forrásanyagban, de a Q-XXX kérdés nincs teljesen megválaszolva. Ez nem blokkoló — a rendszer folytatja, de jelzi, hogy stakeholder megerősítés ajánlott.

---

**K: Hogyan írok válaszokat a Q-XXX kérdésekre?**

Hozz létre egy `.md` fájlt a `workflow/03_answers/` mappában. A formátum:

```
Q-001: A rendszer egyszerre max. 500 felhasználót kiszolgál.
Q-002: Az adatmegőrzési időszak GDPR alapján 7 év.
```

Minden Q-XXX-et egy sorban szerepeltesd: `Q-XXX: [válasz szövege]`. Futtasd utána: `/ba`.

---

**K: Hogyan írhatok felül egy Q-XXX-ből levezetett követelményt?**

Hozz létre egy `SDEC-XXX_nev.md` fájlt a `workflow/04_decisions/` mappában. A FORCED döntés felülírja az extraction-agent által levezetett értéket, és `[FORCED]` annotációt kap a specban. Részletek: [6. fejezet — Munkafolyamat](ch06-workflow.md).

---

## Hibakeresés

**K: A `/ba` mindig ugyanott áll meg — mi a probléma?**

1. Futtasd a `/check-state` parancsot — megmutatja pontosan, mi hiányzik
2. Ha Q-XXX kérdések blokkolják: add meg a válaszokat a `workflow/03_answers/`-ban
3. Ha a spec túl régi (FORCED döntés újabb): futtasd `/ba` és az automatikusan rebuild-el

---

**K: Hogyan kényszeríthetem a BA dokumentumok újragenerálását?**

```
/ba --force
```

Ez megkerüli az „up-to-date" ellenőrzést és újra generálja az összes dokumentumot, még akkor is, ha látszólag nem változott semmi.

---

**K: Mi van, ha a Mermaid diagram szintaxishibát dob?**

A `ba-document-agent` OB-16 jelzéssel figyelmeztet Mermaid szintaxishibákra (nem blokkoló). Ha a docs site-on látod a hibát, ellenőrizd a diagramot a [Mermaid Live Editor](https://mermaid.live)-ban. A `/mermaid-diagrams` skill segít érvényes diagramokat készíteni.

---

**K: Hogyan állíthatom vissza a projektet az alapállapotba?**

```
python .claude/scripts/reset_project.py
```

Ez törli a memóriafájlokat és visszaállítja az üres template-ekre. **Visszafordíthatatlan** — előtte mentsd el a `workflow/` mappát, ha szükséged van a korábbi eredményekre.
