# 9. Típusjelzők és azonosítók rendszere

## Discovery fázis azonosítók

| Azonosító | Típus | Leírás |
|---|---|---|
| `PROB-XXX` | Üzleti probléma | Azonosított probléma vagy fájdalompont |
| `RC-XXX` | Gyökérok | A probléma mögötti ok (Discovery fázisban feltárt, 5 Miért módszer) |
| `GOAL-XXX` | Üzleti cél | Mérhető üzleti eredmény |
| `MVP-XXX` | MVP elem | Must-have elem az első kiadáshoz |
| `ST-XXX` | Stakeholder | Érintett személy vagy szerepkör |
| `RISK-XXX` | Kockázat | Korai kockázat vagy bizonytalanság |
| `A-XXX` | Feltételezés | Amire a Discovery épít, de nincs megerősítve |
| `Q-XXX` | Nyitott kérdés | Következő meetingre viendő kérdés |

---

## Analysis fázis azonosítók

| Azonosító | Típus | Leírás |
|---|---|---|
| `FR-XXX` | Funkcionális követelmény | Mit kell tudnia a rendszernek |
| `NFR-XXX` | Nem-funkcionális követelmény | Teljesítmény, biztonság, skálázhatóság |
| `US-XXX` | User Story | Agile formátumú felhasználói igény |
| `BR-XXX` | Üzleti követelmény | Magas szintű üzleti célok (BRD-ben) |
| `TC-XXX` | Teszteset | UAT teszteset (UAT_Test_Cases.md-ben) |
| `EP-XXX` | Epik | User Story-kat összefogó epikus témakör |
| `A-XXX` | Feltételezés | Amire a spec épít, de nincs kimondva |
| `Q-XXX` | Kérdés | Hiányzó, tisztázandó információ |
| `DEC-XXX` | Döntés | Naplózott AI-munkamenet döntés (`.claude/memory/DECISIONS.md`) |
| `SDEC-XXX` | Stakeholder döntés | FORCED felülírás (`workflow/04_decisions/`) |
| `ISSUE-XXX` | Probléma | Azonosított jogi, GDPR vagy megfelelőségi probléma |

---

## RCA elemzés azonosítók

A `/rca` parancs és az `rca-agent` által generált `RCA_Analysis.md`-ban:

| Azonosító | Típus | Leírás |
|---|---|---|
| `CHAIN-XXX` | Oksági lánc | Chain_Long elemzés egy teljes lánca (pl. `CHAIN-001`) |

> **Megjegyzés:** Az RCA gyökérokok nem kapnak saját `RC-XXX` azonosítót az elemzésben — sorszámozottak (1, 2, 3…) és az eredeti forrás azonosítóját hordozzák (`A-XXX`, `RISK-XXX` vagy `RC-XXX` a Discovery-ből).

---

## Forrás- és státuszjelzők

| Jelző | Jelentés |
|---|---|
| `[EXPLICIT]` | Az ügyfél szó szerint kimondta a forrásanyagban |
| `[INFERRED]` | Az AI logikusan következtette ki, de nem hangzott el szó szerint |
| `[INFERRED:LOW]` | Könnyen következtethető; hasonló projekteknél általános feltételezés |
| `[INFERRED:MED]` | Erre a domainre tipikus feltételezés; bizonyos fokú bizonytalanság |
| `[INFERRED:HIGH]` | Egyetlen forrásból sem következtethető egyértelműen → automatikus RISK tétel + RCA bemenet |
| `[FORCED]` | SDEC-XXX döntéssel felülírt elem |
| `UNANSWERED` | A Q-XXX kérdés még megválaszolatlan |
| `PARTIALLY_ANSWERED` | Részleges válasz kinyerve – stakeholder megerősítés ajánlott |
| `RESOLVED` | A Q-XXX kérdés megválaszolt és archivált |
| `[SCOPE:CONFLICT]` | Ugyanaz az elem IN SCOPE és OUT OF SCOPE is – döntés szükséges |

---

## RCA szerep- és állapotjelzők

Az oksági láncokban (`Chain_Long`) minden gyökérok kap egy szerepjelzőt:

| Jelző | Jelentés |
|---|---|
| `Indító ok` | A lánc első eleme — ez indítja el a következménysorozatot |
| `Köztes ok / továbbgyűrűzés` | Közbülső láncsz em — egyszerre okozat és okozó |
| `Végpont / tünet` | A lánc végső eleme — itt jelenik meg a látható probléma |
| `Hurokpont` | Visszatérő elem egy önfenntartó körben |
| `Végpont / hurokzárás` | Az a pont, ahol a hurok visszacsatol egy korábbi elemre |

Az `IR_Elemzés`-ben minden gyökérok kap egy összesített besorolást:

| Besorolás | Ismérv |
|---|---|
| `Driver` | Magas kimenő pontszám, alacsony bejövő — több láncot indít, ez a valódi gyökér |
| `Köztes csomópont` | Magas bejövő és kimenő — sok láncot továbbvisz |
| `Hurokerősítő` | Visszatérő pont — önfenntartó működést jelez |
| `Tünet / végpont` | Magas bejövő, kevés kimenő — itt látható a fájdalom, de nem ez az ok |
| `Validálandó` | Gyenge kapcsolódás — az ok szerepe nem elég erős, felülvizsgálandó |

---

## Kérdés kategóriák

**Analysis fázis (SPEC_OUTPUT.md-ben):**

| Kategória | Mikor kap ilyen jelzést |
|---|---|
| `BUSINESS_LOGIC` | Az üzleti logika hiányos vagy ellentmondásos |
| `DATA` | Adatok, mezők vagy formátumok meghatározása hiányzik |
| `UX_UI` | A felhasználói felület nincs specifikálva |
| `INTEGRATION` | Külső rendszer kapcsolat tisztázatlan |
| `PRIORITY` | Követelmények prioritása nem egyértelmű |
| `STAKEHOLDER` | Döntéshozó ismeretlen |
| `TECHNICAL` | Technikai feltétel ismeretlen |

**Discovery fázis:**

| Kategória | Mikor kap ilyen jelzést |
|---|---|
| `[SCOPE]` | Határ nem tiszta — mi van benne, mi nincs |
| `[MVP]` | MVP definíció hiányos, must-have lista nincs meghatározva |
| `[FEASIBILITY]` | Megvalósíthatóság kérdéses — technikai vagy üzleti akadály lehetséges |
| `[STAKEHOLDER]` | Döntéshozó ismeretlen, jóváhagyó személy nincs azonosítva |
| `[TECHNICAL]` | Technikai feltétel ismeretlen — rendszer, integráció, API |

---

## Forrás traceability jelölés

Minden generált elem tartalmaz forrásjelzést:

```
[Forrás: filename.ext · sha8]
```

- `filename.ext` — az eredeti bemeneti fájl neve
- `sha8` — az eredeti fájl SHA-256 ujjlenyomatának első 8 hexadecimális karaktere

**Példák:**
```
[Forrás: meeting_notes.docx · e3b0c442]
[Forrás: requirements.xlsx · fa3b1c9a, email_thread.eml · 7d3f9b21]
```

> A full SHA-256 a `SPEC_LOG.md` memóriafájlban és a `CONVERSION_LOG.md`-ben található. A 8 karakter minden reális projektméretben ütközésmentes.
