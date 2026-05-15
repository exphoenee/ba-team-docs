# `/business-analyst` – BA Dokumentum-generáló

[English version](README.en.md)

## Mire való?

A `/business-analyst` skill az enterprise IT Business Analyst munkájának lényegét végzi el: a strukturált specifikációból és a megválaszolt kérdésekből **teljes, átadható, audit-kész BA dokumentációs csomagot** állít elő.

A skill senior enterprise BA tudással rendelkezik: érti az Agile, Scrum és SAFe keretrendszereket, a biztosítási és pénzügyi szektort, a szabályozói követelményeket (GDPR, PCI-DSS, AML/KYC), és minden dokumentumot úgy készít, hogy az közvetlenül felhasználható legyen projektmunka, fejlesztői átadás vagy audit során.

> **Megjegyzés:** A legtöbb esetben nem kell közvetlenül meghívni — a `/ba` skill automatikusan futtatja, amikor minden kérdés megválaszolt.

---

## Hogyan használd?

Győződj meg arról, hogy:
- `workflow/01_project_info/SPEC_OUTPUT.md` létezik (a `/spec-builder` elkészítette)
- `workflow/02_answers/` tartalmaz válasz fájlokat (minden Q-XXX kérdés megválaszolva)

Majd a Claude panelen írd be:

```
/business-analyst
```

---

## Mit állít elő?

Minden dokumentum a `workflow/03_ba_docs/` mappába kerül, külön fájlként.

### Kötelező dokumentumok

**`BRD.md` – Business Requirements Document**
Az összes üzleti és funkcionális követelmény egyedi azonosítókkal (BR-XXX, FR-XXX, NFR-XXX), tesztelhetően és nyomkövethetően megfogalmazva. Megkülönbözteti az üzleti, funkcionális, nem-funkcionális követelményeket és a technikai korlátokat.

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

**`Glossary.md` – Domain szószedet**
A projektben használt szakkifejezések, rövidítések és domain-specifikus fogalmak definíciói.

### Opcionális dokumentumok (ha elegendő adat áll rendelkezésre)

| Fájl | Tartalom |
|---|---|
| `Data_Dictionary.md` | Adatentitások, mezők, típusok, korlátok — ER diagrammal |
| `UAT_Test_Cases.md` | UAT tesztelési forgatókönyvek, követelményekhez kapcsolva |
| `Stakeholder_Map.md` | Érintetti térkép Mermaid diagrammal |
| `Regulatory_Checklist.md` | GDPR, PCI-DSS, SOX, AML/KYC, Solvency II hatáselemzés |

---

## Mermaid diagramok

A skill **minden folyamatleíráshoz kötelezően** Mermaid diagramot készít — nem elégszik meg szöveges leírással.

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

## Kapcsolódó skillek

| Skill | Kapcsolat |
|---|---|
| `/ba` | Automatikusan hívja, ha minden Q-XXX megválaszolt |
| `/spec-builder` | Előállítja azt a specifikációt, amiből ez dolgozik |
| `/mermaid-diagrams` | Ha önálló diagramra van szükség |
| `/memory-handler` | Az elkészített döntéseket és szakkifejezéseket ide menti |
