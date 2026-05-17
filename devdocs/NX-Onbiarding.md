# Termékfejlesztési és BAU működési modell – Onboarding útmutató

## I. Nagykép (Operating Model)

Egyedi szoftvermegoldásokat nyújtunk ügyfeleik belső folyamatainak támogatásához.
Jellemzően gyártástámogató és ehhez kapcsolódó rendszereket szállítunk. Multinacionális vállalatoknak és hazai KKV szektornak.

Működésünk két fő értékteremtő ágra bontható:

* **Egyedi szoftvertermék fejlesztés (Customer Product Development – CPD)**
* **Meglévő termékek továbbfejlesztése (BAU - Business As Usual) és üzemeltetése (Support)**

Kiemelt ügyfeleink:
- **TAB Sörmaufaktúra Kft.**
    -   söripari termékek gyártása
- **Köpler Malysia Kft.**
    - Elsősorban ipari gépberendezéseket (a gyártástól a csomagolásig),
    - de gyártanak már ipari csomagológépeket és logisztikai automatizálási rendszereket is.
    - Csúcstechnológiás gépgyártás és precíziós fémmegmunkálás.
- **Kanóso Kft.** (magyar tulajdonú nagy vállalat)
    - precíziós fémalkatrészek globális autóipari beszállítója
- **Pamerthon Kft.**
    - elektromos és optikai csatlakozók autóipari beszállító


? mi kellhet még ide?
- Érdemes bővíteni, vagy linkekkel kiegészíteni
- az alkalmazásaink száma, és azok felhasználóinak száma, ezek mind izgi számok


---

## II. Egyedi szoftvertermék fejlesztési folyamat (Customer Product Development)



Kulcsszereplők:
- Sales → kapcsolat, presales
- Project Manager (PM) → delivery ownership
- Business Analyst (BA) → üzleti igény strukturálás
- Solution Architect (SOLA) → technikai megoldás
- Developer Team (Dev Team) → implementáció

### 0. Pre-Sales Qualification & Discovery Preparation / Initiation

A fázis célja:
- az ügyfél és a NX közötti kapcsolat és együttműködési alapok kialakítása (megismerkedés)
- az ügyfél üzleti problémájának és céljainak magas szintű megértése
- a projekt megvalósítása szempontjából releváns kulcs érintettek (stakeholders) azonosítása és szerepük megértése
- az együttműködési kereteinek és feltételeinek         tisztázása
- NX működési modelljének és a folyamat bemutatása
- a megvalósítás szempontjából releváns kockázatok és bizonytalanságok elsődleges azonosítása
- a discovery szakasz előkészítése a PM és BA számára (handover readiness)

Folyamatkatalógus:

| Nr. | Főfolyamat | Alfolyamat | Felelős (R+A) | Résztvevő (C) |
|---|---|---|---|---|
| 1. | Első ügyfél találkozó | Találkozó megszervezése| Sales | Ügyfél |
| 1.1 |  | Találkozóra felkészülés | Sales | - |
| 1.2 |  | Presales anyag előkészítése | Sales | - |
| 1.3 |  | NDA (Titoktartási sz.) előkészítése | Sales | - |
| 2. | Ügyfél találkozó | Beszélgetés levezetése| Sales | - |
| 2.1 |  | Előkészített kérdésekre válaszok begyűjtése | Sales | - |
| 2.2 |  | NDA aláíratása ügyféllel | Sales | Ügyfél |
| 3. | Ügyfél találkozó feldolgozása | Presales anyag összeállítása | Sales | - |
| 3.1 |  | További kérdések ügyféllel tisztázása | Sales | Ügyfél |
| 3.2 |  | Handover elkészítése | Sales | - |
| 4. | Presales folyamat minősítése | Döntés a folytatásról | Sales | - |
| 4.1 |  | Checklista kitöltése | Sales | - |
| 5. | Presales anyag ügyfélnek kiküldése | Checklista kitöltése | Sales | - |
| 5.1 |  | Ügyfél nyomon követése | Sales | Ügyfél |
| 6. | Presales anyag ügyfélnek kiküldése | Checklista kitöltése | Sales | - |
| 7. | PM értesítése discovery folyamat előkészítésére | E-mail küldés PM-nek | Sales | - |
| 7.1 |  | Discovery 1. meeting időpont kitűzése | Sales | PM |
| 8. | NX belső meeting | Találkozó megszervezése   | Sales | PM, BA |
| 8.1 |  | Handover átadása  | Sales | PM, BA |




Output:
- presales anyag ügyfélnek
- Handover anyag PM/BA-nak (nincs még kidolgozva)

Döntési pont: Go/noGo/Holdon


Nincs még kidolgozva:
- template ami ezeket a célokat támogatja (ezek a célok egyelőre nincsenek tudatosan szem előtt tartva)
- nem vizsgáljuk az iparági kompetenciát
- minősítve a folyamat eredménye
- döntési kritériumok meghatározása
- checklist, amit ellenőriz a sales
- Handover anyag PM/BA-nak
- confluence-word-pdf forma / AI nehezen használja


### 1. Discovery - Igényfelmérés

A fázis célja:

az ügyfél üzleti igényének strukturált feltárása és validálása, valamint egy olyan megoldási koncepció és becsülhető scope kialakítása, amely megalapozza a műszakilag és üzletileg megalapozott ajánlatadást.

Ennek keretében:
1. az ügyfél igényének üzleti szempontú strukturált feltárása és konkretizálása
(probléma → gyökérok → üzleti cél → scope → MVP)
2. az ügyfél igényének technikai szempontú értelmezése és megoldási irányainak meghatározása
(solution concept, architektúra, főbb megoldási opciók)
3. a megvalósításhoz szükséges feltételek azonosítása
(kompetenciák, technológia, komplexitás, feltételezések, függőségek)
4. a megoldás megvalósíthatóságának (feasibility) értékelése és fő kockázatainak feltárása és csökkentése
5. egy becsülhető (estimable) állapot elérése, amely lehetővé teszi a ráfordítások meghatározását
(idő, költség, erőforrás)
6. a projekt magas szintű megvalósítási kereteinek kialakítása
(durva ütemezés, projekt megközelítés, csapatigény)
7. az ajánlat tartalmi és műszaki megalapozása
(scope + megoldás + feltételezések + kockázatok + becslés összehangolt rögzítése)
8. az ügyfél számára indikatív ajánlati dokumentáció összeállítása és kiadhatóságának biztosítása

Folyamatkatalógus:

| Nr. | Főfolyamat | Alfolyamat | Felelős (R+A) | Résztvevő (C) |
|---|---|---|---|---|
| 1. | Discovery szakasz 1. ügyfél találkozó előkészületek | Találkozó megszervezés | PM | Ügyfél, BA |
| 1.1 |  | Handover feldolgozása | PM, BA | Sales |
| 1.2 |  | PM board előkészítése | PM | BA |
| 1.3 |  | BC board előkészítése | BA | PM |
| 1.4 |  | Discovery szakasz betervezése, erőforrások allokálása | PM | BA |
| . | Business Concept összeállítása | --- | BA + PM | BA, Sola, DEV Team |
| . | Solution Concept összeállítása | --- | Sola + PM  | BA |
| . | Projekt Plan összeállítása | --- | PM | CEO, BA, DEV Team |
| . | Árazás | ---| CEO | PM |
| . | Ajánlat összeállítása | --- | ? | ?, BA, DEV Team |


Forrásai:

* Pre-Sales/Initiation*
* iparági standardok
* korábbi projekt tapasztalatok
* ügyféltől kapott anyagok
* jövőben: "Nanoworx Common Tools"
* BC, SC, PM és ajánlati templatek


Output:

* megalapozott, becsülhető és árazható megoldási javaslat, indikatív ajánlati dokumentum formában:
    * Business Concept - üzleti koncepció (BC)
    * Solution Consept - megoldási koncepció (SC)
    * Project plan - projekt terv (PP)

Döntési pont: akarunk-e ajánlatot adni és ha igen, milyet

Nincs még kidolgozva:
- iparági tapaszalat szükségességének és a kompetenciák azonosításának tudatossága
- az ajánlat tartalmi és műszaki megalapozása (az ajánlatot nem írjuk, alátámasztjuk, tartalmát összehangoljuk)
- BS + SC összehangolt az üzleti célra és problémára irányul?
- feltételezések és kockázatok figyelembe vétele
- scope + megoldás + feltételezések + kockázatok és a becslés konzisztenciája
- nem tudatosan használjuk fel a korábbi projekt tapasztalatokat

---

### 2. Analysis

A fázis célja:


Discovery során meghatározott üzleti igény és megoldási koncepció olyan részletezettségú és konzisztens specifikációvá és strukturált backloggá alakítása, amely biztosítja a fejlesztés kontrollált elindítását, a becslések pontosságát és az **üzleti céloknak megfelelő értékszállítást** .

Ennek keretében:

1. Üzlet igények megértése
    - a meghatározott üzleti scope elemek részletes feltárása,
    - a jelenlegi működés (as-is folyamatok) megértése és modellezése
    - a jövőbeli elvárt működés (to-be állapot) meghatározásaa meghatározott üzleti scope elemek részletes feltárása
2. Követelmények és működés definiálása
    - use case-ek azonosítása
    - üzleti logika, szabályok és kivételkezelés meghatározása
    - UX igények azonosítása
    - nem funkcionális követelmények azonosítása
    - az elvárt működést biztosító funkcionalitások meghatározása
3. Bizonytalanság és optimalizáció kezelése
    - kérdéses pontok és feltételezések azonosítása
    - működésbeli fejlesztési potenciálok azonosítása
    - change request-ek (CR) azonosítása és priorizálása
4. User story előkészítés
    - megvalósításhoz szükséges feladatok strukturálása (epic → user story)
    - a backlog elemek fejlesztésre kész (Definition of Ready) állapotba hozása
    - fejlesztési ráfordítás és erőforrásigény meghatározása (estimation)



Forrásai:
- ügyféltől kapott anyagok
-

Output:
- BRS (Business Requirement Specification)
(üzleti és funkcionális követelmények strukturált dokumentációja)
- Jira feladatok
(backlog elemek (epic / story / task) strukturáltan)
- Story Point és/vagy Original Estimate meghatározva
(fejlesztési ráfordítás becslése)


Nincs még kidolgozva:
- story template
- backlog rendszerezés
- ez az egész folyamat tudatos kezelése
- CR tudatos kezelése
- ügyfelek hatékony facilitálása
- scope menedzsment tudatossága

Források, minták:
-

---


## III. Meglévő termékek továbbfejlesztése (BAU)

A BAU működés célja a stabil működés és folyamatos javítás.

### 1. Hibakezelés (Incident & Bugfix flow)

Folyamat:

* incident bejelentés
* triage (prioritás meghatározás)
* javítás
* release

SLA-k (Service Level Agreement) határozzák meg a reakcióidőt.

---

### 2. Fejlesztések (?)

Jellemzők:

* alacsony - magas komplexitású témák
* gyors - közepes sebességű szállítási idő (lead time)

Backlog-ba kerülnek és meghatározott határidőre, vagy release ablakba kerülnek megvalósításra.
Ügyfelenként eltérő működésmódban.

---

### 3. Refactoring, Technical Debt (Refaktorálás és Technikia adósság kezelése)

Kockázat, ha nem csináljuk:

* csökkenő fejlesztési sebesség
* növekvő hibaarány

Kezelés:

* dedikált kapacitás



## IV. Artefaktumok és eszközök


