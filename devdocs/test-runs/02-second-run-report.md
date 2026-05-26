# BASE

Usage: 5%-ról indulok

1. Presalse anyag

“A következő parancs futtatása előtt szeretnélek megkérni, hogy a felmerült kérdésekre a következők alapján próbálj válaszokat találni az újonnan bekerült anyagokból. Ezzel a fókusszal futtasd a /ba parancsot”

1. Belső megbeszélés és - Discovery 1. megbeszélés jegyzete [2025-10-15 - BASE Eng. #1 - indikatív ajánlatadási folyamat](https://nanoworx.atlassian.net/wiki/spaces/HRREN/pages/3017834497/2025-10-15%2B-%2BBASE%2BEng.%2B1%2B-%2Bindikat%2Bv%2Baj%2Bnlatad%2Bsi%2Bfolyamat) + FIGMA Bevezetés és FIGMA Probléma feltárás

→ Usage: 13% → 8% felhasználás

Válaszokat szeretne, de elindítom a következő iterációt.

1. Discovery 2. megbeszélés jegyzete [2025-10-29 - BASE Eng. #2 - indikatív ajánlatadási folyamat](https://nanoworx.atlassian.net/wiki/spaces/HRREN/pages/3029041178/2025-10-29%2B-%2BBASE%2BEng.%2B2%2B-%2Bindikat%2Bv%2Baj%2Bnlatad%2Bsi%2Bfolyamat) + FIGMA Gyökérok elemzés és FIGMA IR Diagram

→ Usage: 27% = Következő nap %4-ról indulok → 14% felhasználás

1. Discovery 3. megbeszélés jegyzete [2025-11-12 - BASE Eng. #3 - indikatív ajánlatadási folyamat](https://nanoworx.atlassian.net/wiki/spaces/HRREN/pages/3061252119/2025-11-12%2B-%2BBASE%2BEng.%2B3%2B-%2Bindikat%2Bv%2Baj%2Bnlatad%2Bsi%2Bfolyamat) + FIGMA Üzleti cél meghatározása + Termék scope meghatározása (Érintettek meghatározása + Folyamat katalógus + Folyamat katalógus2)

→ Usage: 28% (BA dokumentáció nélkül - megválaszolatlan kérdések vannak) = következő nap 0%-ról indulok → 24% felhasználás

1. Discovery 4. megbeszélés jegyzete [2026-02-04 - BASE Eng. #4 - indikatív ajánlatadási folyamat](https://nanoworx.atlassian.net/wiki/spaces/HRREN/pages/3109552131/2026-02-04%2B-%2BBASE%2BEng.%2B4%2B-%2Bindikat%2Bv%2Baj%2Bnlatad%2Bsi%2Bfolyamat) + FIGMA Elérendő képességek

→ Usage: 13% = 13% felhasználás

1. Discovery 5. megbeszélés jegyzete [2026-03-04 - BASE Eng. #5 - indikatív ajánlatadási folyamat](https://nanoworx.atlassian.net/wiki/spaces/HRREN/pages/3258122271/2026-03-04%2B-%2BBASE%2BEng.%2B5%2B-%2Bindikat%2Bv%2Baj%2Bnlatad%2Bsi%2Bfolyamat)

→ Usage: 22% = 9% felhasználás

A folyamat során egyszer sem forceoltam dokumentum kreálást, kíváncsi voltam, hogy hogyan fut végig, a folyamat a fenti kéréssel (ezt csak egyszer adtam meg): “A következő parancs futtatása előtt szeretnélek megkérni, hogy a felmerült kérdésekre a következők alapján próbálj válaszokat találni az újonnan bekerült anyagokból. Ezzel a fókusszal futtasd a /ba parancsot”

Eredmény:

**Még mindig UNANSWERED kérdések (3 db):**

|  |  |
| --- | --- |
| **ID** | **Kérdés** |
| **Q-003** | Hány év históriát kell megőrizni? |
| **Q-006** | Milyen eszközön használják a rendszert? Milyen dizájn/válaszidő elvárások? |
| **Q-007** | Milyen mélységig kell látni a munkavégzés adatait (szekció/feladat/alvállalkozói szint)? |

“force-olt futtatást tudok?

Beépített force flag nincs a /ba skillben. De van egy gyors megkerülő út:

**Én létrehozom az** answers.md **fájlt [INFERRED] jelölésű feltételezésekkel** — ez pontosan ugyanolyan hatású, mint egy force futtatás, csak nyomon követhetően.

Szeretném ezt megtenni helyetted? Vagy inkább módosítsuk a skillben a logikát, hogy elfogadjon egy /ba force argumentumot, ami kihagyja az UNANSWERED ellenőrzést?” → ez most csak egy példa, hogy lehetne fejleszteni magát a modellt is.

→ Usage: 41% = 19% felhasználás

“A workflow sikeresen lefutott. Összefoglalom:

**Elvégzett változtatások:**

1. workflow/02\_answers/answers.md — létrehozva [INFERRED] jelölésű feltételezés-alapú válaszokkal Q-003, Q-006, Q-007 kérdésekre
2. ba-orchestrator.md — frissítve: --force flag mostantól Check C-t (UNANSWERED ellenőrzés) is megkerüli
3. SKILL.md — dokumentálva a --force és --preview flagek; jövőben /ba --force indítható

**Generált BA dokumentumok** (workflow/03\_ba\_docs/):

|  |  |
| --- | --- |
| **Fájl** | **Tartalom** |
| BRD.md | Üzleti Követelmény Dokumentum |
| User\_Stories.md | 11 felhasználói történet (US-001–US-011) |
| Process\_Flows.md | 11 Mermaid diagram |
| Traceability\_Matrix.md | FR/NFR/BR teljes nyomkövetési mátrix |
| RAID\_Log.md | 10 kockázat, 17 feltételezés, 5 probléma, 6 függőség |
| Glossary.md | 23 szakkifejezés |
| Data\_Dictionary.md | ER diagram + entitás leírások |
| Stakeholder\_Map.md | Érintetti kapcsolati diagram |
| UAT\_Test\_Cases.md | 10 teszteset (TC-001–TC-010) |

**Fontos:** Q-003, Q-006, Q-007 [INFERRED] jelöléssel szerepelnek — a RAID log-ban RISK-002, RISK-003, RISK-004 kockázatokként rögzítve. Stakeholder megerősítés szükséges a Fázis 1 előtt.”

“Össze tudnád foglalni, hogy az első /ba parancstól mennyi creditet használtál fel, task típusokra bontva?
Az átfutási idők is érdekelnének, igazából minden statisztika, amit ebben a beszélgetésben lévő folyamatról ki tudsz állítani. Ezt egy teszt esetnek szánom és szeretnék ebből egy vezetői összefoglalót.”

## AI Vezetői Összefoglaló — BASE-BMS BA Workflow Tesztelés

**Tesztelés dátuma:** 2026-05-21–22
**Modell:** claude-sonnet-4-6
**Projekt:** BASE-Engineer Management System

### 1. Futtatások áttekintése

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| **#** | **Típus** | **Feldolgozott anyagok** | **Tokenek** | **Eszközhívások** | **Átfutási idő** |
| 1 | Spec-builder #2 | belső meeting (okt. 13.), ajánlatadás #1 (okt. 15.), 1 FIGMA kép | 72 133 | 33 | 9 perc 24 mp |
| 2 | Spec-builder #3 | ajánlatadás #2 (okt. 29.), 4 FIGMA kép | 98 028 | 52 | 14 perc 17 mp |
| 3 | Spec-builder #4 | ajánlatadás #3 (nov. 12.), 4 FIGMA Scope kép | 101 749 | 70 | **100 perc 22 mp** ⚠️ |
| 4 | Spec-builder #5 | ajánlatadás #4 (febr. 4.), Elérendő képességek FIGMA | 110 623 | 57 | 10 perc 28 mp |
| 5 | Spec-builder #6 | ajánlatadás #5 (márc. 4.) | 108 541 | 54 | 9 perc 45 mp |
| 6 | BA dokumentum-generálás | teljes spec → 9 BA dokumentum | 92 682 | 45 | 19 perc 34 mp |

### 2. Aggregált statisztikák

|  |  |
| --- | --- |
| **Mutató** | **Érték** |
| **Összes agent-futtatás** | 6 |
| **Összes token (agent-szintű)** | 583 756 |
| **Összes eszközhívás** | 311 |
| **Teljes átfutási idő** | 2 óra 43 perc 50 mp |
| **Átfutási idő az outlier nélkül** | 63 perc 28 mp |
| **Átlagos futtatási idő (outlier nélkül)** | 12 perc 42 mp |

### 3. Feladattípus-bontás

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| **Fázis** | **Futtatások** | **Tokenek** | **Eszközhívások** | **Idő** | **Arány** |
| **Spec-building** (5 run) | 5 | 491 074 | 266 | 144 perc 16 mp | 84% |
| **BA doc generálás** (1 run) | 1 | 92 682 | 45 | 19 perc 34 mp | 16% |

### 4. Credit becslés

**Megjegyzés:** A total\_tokens érték a bemeneti és kimeneti tokeneket együtt tartalmazza. Az Anthropic billing felületén pontosabb bontás érhető el.

Becslési alap — claude-sonnet-4-6 listaár ($3/MTok input, $15/MTok output):

|  |  |  |  |
| --- | --- | --- | --- |
| **Szcenárió** | **Input (70%)** | **Output (30%)** | **Becsült összeg** |
| Konzervatív | 408 629 tok → $1,23 | 175 127 tok → $2,63 | **~$3,86** |
| Optimista (80/20) | 467 005 tok → $1,40 | 116 751 tok → $1,75 | **~$3,15** |

**Reális becsült sáv: $3,15 – $3,86 USD** az agent-szintű feldolgozásra.

A főbeszélgetés (file olvasás, szerkesztés, user-interakció) tokenei nincsenek benne — ezek a teljes session-szintű számlán jelennek meg.

### 5. Feldolgozott forrásanyagok

|  |  |
| --- | --- |
| **Típus** | **Db** |
| .doc meetinganyag | 6 |
| .png FIGMA kép | 9 |
| **Összesen** | **15 forrásfájl** |

### 6. Kinyert specifikációs elemek

|  |  |
| --- | --- |
| **Elem** | **Darab** |
| Funkcionális követelmény (FR) | 21 |
| Nem-funkcionális követelmény (NFR) | 9 |
| Felhasználói történet (US) | 11 |
| Üzleti szabály (BR) | 6 |
| Nyitott kérdés (Q) | 7 |
| Feltételezés (A) | 14 |
| Korlátozás (C) | 6 |
| Stakeholder (S) | 5+ |
| **Összes azonosított elem** | **~79** |

### 7. Generált BA dokumentumok (9 db)

|  |  |
| --- | --- |
| **Fájl** | **Tartalom** |
| BRD.md | Üzleti Követelmény Dokumentum |
| User\_Stories.md | 11 user story |
| Process\_Flows.md | 11 Mermaid diagram |
| Traceability\_Matrix.md | FR/NFR/BR/Stakeholder nyomkövetési mátrix |
| RAID\_Log.md | 10 kockázat, 17 feltételezés, 5 probléma, 6 függőség |
| Glossary.md | 23 szakkifejezés |
| Data\_Dictionary.md | ER diagram + 8 entitás |
| Stakeholder\_Map.md | Érintetti kapcsolati diagram |
| UAT\_Test\_Cases.md | 10 teszteset |

### 8. Megfigyelések és tanulságok

**Pozitívum:**

* A rendszer önállóan detektálta és feldolgozta az összes forrást — user beavatkozás nélkül
* 5 kérdés (Q-001, Q-002, Q-004, Q-005) UNANSWERED → PARTIALLY\_ANSWERED státuszba mozdult forrásanyagból, emberi válasz nélkül
* A BA doc generálási fázis meglepően hatékony: 9 dokumentum 19 perc alatt

**Problémák / bottleneck-ek:**

|  |  |  |
| --- | --- | --- |
| **Probléma** | **Hatás** | **Javaslat** |
| FIGMA képfeldolgozás (Run 3) | 100 perces outlier — 5× lassabb az átlagnál | Képenként párhuzamos feldolgozás vagy előzetes OCR |
| --force flag hiánya | 5 extra /ba futtatás szükséges volt a blokkolt állapot megkerüléséhez | ✅ Beépítve a tesztelés során |
| PARTIALLY\_ANSWERED kérdések kezelése | A rendszer csak UNANSWERED-re blokkol, PARTIALLY\_ANSWERED kérdések "elvesznek" | Külön riport kategória ajánlott |

**Hatékonysági arány:**

* Emberi munkaidő: ~15–20 perc (fájlok feltöltése, 1 answers.md létrehozása)
* AI feldolgozási idő: ~164 perc (automatizált)
* Becsült hagyományos BA munkaidő ugyanerre: 3–5 munkanap
* **Megtakarítás: ~97–99%**

## Kiértékelés

* Manuális átnézés/összehasonlítás eredménye Teo doksijához képest:
  + BRD
    - az FR priok elcsúsztak, nem egyeznek - Fázis1/2 osztás felülvizsgálata szükséges
    - sokkal részletesebb és szebben struktúrált
  + Process\_flows (itt jól érezhetően keveredik, hogy csak discovery dokumentumok vannak, de a visszaadott fájlok analysis folyamathoz kapcsolódnak inkább)
    - Nincs összehasonlítási alap
    - Meglátás:
      * Jó alap, de pontosítást igényel. Lehet XML formátumot kérnék a mermaid mellé, hogy azt importálni tudjam draw.io-ba, ahol gyorsabban tudok szerkeszteni és ezt visszatenném VS-ba, hogy frissítse a dokumentációt ez alapján.
      * Nem szakmai lesz: Beteg, hogy mennyi idő alatt mennyi folyamatábrát össze tud tenni (~75%os pontossággal). Ha tudjuk az inputokat standardizálni, hogy jobban struktúrált legyen és a végén visszaadni olyan formátumot, ahol tudunk rugalmasan módosítani és visszatölteni, akkor ez zseniális ![(blue star)](data:image/png;base64...)
  + UAT\_Test\_Cases (itt jól érezhetően keveredik, hogy csak discovery dokumentumok vannak, de a visszaadott fájlok analysis folyamathoz kapcsolódnak inkább)
    - Sokkal részletesebb (nekem tetszik, nyilván a modell pozíciónálása (analysis szakasz) és az elkészített dokumentáció (discovery) különbsége érződik), Discoveryhez kellene fölé egy általános lista a Test Case megnevezésekből (--> Modell taníthatóság?)
  + User Story (itt jól érezhetően keveredik, hogy csak discovery dokumentumok vannak, de a visszaadott fájlok analysis folyamathoz kapcsolódnak inkább)
* AI összehasonlítás - Beadott dokumentumok: [BASE-Engineer Management System - BA tevékenység](https://nanoworx.atlassian.net/wiki/spaces/HRREN/pages/3017539587/BASE-Engineer%2BManagement%2BSystem%2B-%2BBA%2Btev%2Bkenys%2Bg) és [BASE-Engineer Management System – Ajánlati dokumentáció](https://nanoworx.atlassian.net/wiki/spaces/HRREN/pages/3337912331/BASE-Engineer%2BManagement%2BSystem%2BAj%2Bnlati%2Bdokument%2Bci)
  + Prompt: “Csak és kizárólag a dokumentumok .md átalakítását futtasd le a /ba parancsból és utána azt alapulvéve hasonlítsd össze az elkészült dokumentáció tartalmát (/03\_ba\_docs) a "BASE-Engineer+Management+System+-+BA+tevékenység" és a "BASE-Engineer+Management+System+–+Ajánlati+dokumentáció" tartalmával. Szeretném látni az eltéréseket.”
  + Eredmény:

## AI Tartalmi összehasonlítás — Eredmény

**Teljes fedettségi becslés: ~72%**

### Kritikus ellentmondás

**Ajánlatadási folyamat scope-besorolása** — a forrás szerint IN SCOPE, a BRD.md szerint OUT OF SCOPE. Ez a legégetőbb probléma, fejlesztési félreértést okozhat.

### Ami hiányzik a BA dokumentumokból

|  |  |
| --- | --- |
| **Fontosság** | **Hiányzó tartalom** |
| 🔴 Kritikus | Becslési táblázat (PM 60h, BA 100h, DEV 376h) és a 3 megvalósítási opció (PlanA/B/C) |
| 🔴 Kritikus | Ajánlat rögzítése/lezárása és szerződés-státusz nyugtázás mint önálló FR |
| 🟠 Magas | Munkaidő-logolás bizonytalan státusza — nincs RAID tételként rögzítve |
| 🟠 Magas | Partnernyilvántartás (megrendelők, alvállalkozók) önálló FR nélkül |
| 🟡 Közepes | Vezető tervező, Vezető szerkesztő, Tervezést ellenőrző szerepkör hiányzik a Stakeholder Map-ből |
| 🟡 Közepes | In-app értesítési rendszer nem kapott FR azonosítót |
| 🟡 Közepes | Dolgozói logok időszakos/projekt-szintű követése nincs önálló FR-ként |

### Inferred elemek kockázata

|  |  |
| --- | --- |
| **Elem** | **Kockázat** |
| 10 éves adatmegőrzés (A-015) | 🔴 Magas — semmilyen forrásból nem következik |
| Tablet/iPad kompatibilitás (A-016) | 🟠 Közepes — az új forrásokban nem szerepel |
| Bónusz algoritmizálhatósága (A-005) | 🟡 Közepes — jól jelölve, de megerősítetlen |

A BASE teszt során felmerült:

* Kérdés, amin szerintem érdemes elgondolkodni:
  + Egy beszélgetésen belül több projektet futtatni? - Tanulhatna a modell az interakciókból - pl most a force futás beépítése !DE! Validált modellt kell-e védeni a usertől, hogy ne vihesse el rossz irányba ?!
* A kérdéslista esetében, amit visszaad, a következő futtatásoknál figyelhetné, hogy születik-e válasz rá a jegyzetekben, ne kelljen manuálisan választ írni rá. - Tesztelve:
  + “A következő parancs futtatása előtt szeretnélek megkérni, hogy a felmerült kérdésekre a következők alapján próbálj válaszokat találni az újonnan bekerült anyagokból. Ezzel a fókusszal futtasd a /ba parancsot”
* FIGMA képeket nem szabad egyben beadni, mert feldarabolja valamilyen logika szerint. Törekedni kell a blokkosításra.
* Priok elcsúszása miatt kérdés: standardizálható-e valahogy a felmérés adott szakasza, hogy a modell egyértelműbben tudja meghatározni a priot.
  + Ötlet: Egy 4-órás pre-sales felmérés feldolgoztatása után egy 2 órás megbeszélés keretében a visszadobott kérdések és priok tisztázása lehetne egy kulcs pont. (Erre kifejezetten jó szakaszok vannak a mostani dokumentumokban is pl.: BRD, Process\_flows, RAID
* Megfontolandó AI javaslatok:

|  |  |  |
| --- | --- | --- |
| **Probléma** | **Hatás** | **Javaslat** |
| FIGMA képfeldolgozás (Run 3) | 100 perces outlier — 5× lassabb az átlagnál | Képenként párhuzamos feldolgozás vagy előzetes OCR |
| PARTIALLY\_ANSWERED kérdések kezelése | A rendszer csak UNANSWERED-re blokkol, PARTIALLY\_ANSWERED kérdések "elvesznek" | Külön riport kategória ajánlott |