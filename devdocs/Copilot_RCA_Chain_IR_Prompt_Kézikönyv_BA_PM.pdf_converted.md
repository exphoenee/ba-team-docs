<!-- source-fingerprint: e361bc18decf92deb921f5209f91a17133a25063ec95e1e50b6bd4f90bd441fc -->

> **Forrás:** `Copilot_RCA_Chain_IR_Prompt_Kézikönyv_BA_PM.pdf`  
> **Méret:** 270 657 B  
> **Módosítva:** 2026-05-25 13:19:24  
> **SHA-256:** `e361bc18decf92deb921f5209f91a17133a25063ec95e1e50b6bd4f90bd441fc`

---

Copilot támogatott gyökérok-, lánc- és hurokelemzés
Prompt kézikönyv BA-k és PM-ek számára
SDLC Discovery standard módszertan – GPT 5.5 használattal

Copilot-nak átadni ezt a dokumentumot az alábbi paranccsal:

Tanuld meg és mentsd el a memóriádba a csatolt filet, hogy én amikor egy template alapján kitöltött excelt csatolok
egyetlen paranccsal meg tudjam hívni a teljes folyamatot és Te végigmenj ezeken a lépéseken. A parancs legyen: “Futtasd a
teljes RCA/Chain/IR folyamatot erre a fájlra.”

Cél
Egységes, másolható prompt-készlet és munkamenet biztosítása ahhoz, hogy bármely projekt Discovery szakaszában a BA/PM csapat
eljusson a gyökéroklistától a hosszú oksági láncokig, hurkokig, Interrelationship Mátrixig és vezetői döntéstámogató olvasatig.

Elvárt Excel output
Chain_Long • IR_Mátrix • IR_Elemzés • Loop_Summary

Tartalom
•
•
•
•
•
•
•
•

1. Módszertani alapvetés
2. Bemeneti Excel struktúra
3. BA/PM quick start folyamat
4. Prompt könyvtár
5. Output definíciók
6. Minőségbiztosítási checklist
7. Vezetői döntéstámogató értelmezés
8. Bevezetési javaslat a szervezetben

1. Módszertani alapvetés
A módszer célja, hogy a Discovery szakasz ne csak követelménygyűjtésként vagy tünetlistázásként működjön, hanem
szervezeti működésdiagnosztikai visszacsatolást is adjon. A BA/PM nem megoldást kér Copilottól, hanem strukturált oksági
gondolkodást vezet végig.

•  A gyökéroklista önmagában még nem elemzés; az érték az okok közötti irányított kapcsolatokban van.
•  A hosszú oksági láncok feltárják, hogyan jut el egy szervezeti, folyamati vagy módszertani ok egy üzleti fájdalompontig.
•  A hurkok megmutatják, hol termeli újra a szervezet ugyanazt a problémát.
•  Az Interrelationship Mátrix csak akkor készüljön el, amikor a láncok alapján már indokolható közvetlen kapcsolatok

állnak rendelkezésre.

Alapelv
A Copilot nem döntéshozó. A Copilot strukturál, alternatív oksági mintákat javasol és ellenőriz. A BA/PM felelős a validálásért, a
workshop-szintű egyeztetésért és a döntésre alkalmas outputért.

Copilot támogatott RCA / Chain / IR módszertan – belső BA/PM használatra

2. Bemeneti Excel struktúra
A módszer akkor másolható jól, ha minden projekt ugyanazzal az Excel input-struktúrával indul.

Elem
Cél

Probléma – szituáció
Probléma – hatás

Probléma – következmény
Gyökérok
Csoport

Súlyozás / ráhatás

Elvárt tartalom
Mit akarunk megtalálni vagy tisztázni?

Mi történik jelenleg?
Milyen működési, adatminőségi vagy
folyamatbeli problémát okoz?
Miért fáj üzletileg vagy szervezetileg?
Egy ok egy sorban.
Pl. Emberek, Folyamatok, Rendszerek,
Módszertanok.
0–2 vagy más skála.

Megjegyzés
Ne legyen megoldásorientált; a cél a
gyökérok feltárása.
Tényszerű megfogalmazás.
A jelenlegi fájdalom leírása.

Vezetői döntéshez szükséges értéknyelv.
Ne legyen benne megoldási javaslat.
A csoportosítás segíti a mintázatkeresést.

Az első oksági körben nem használjuk.

3. BA/PM quick start folyamat
1.  1. Input validálás: Azonosítsd a cél, probléma és gyökéroklista helyét.
2.  2. Gyökéroklista tisztítása: Csak formázási tisztítás; tartalmi átírás nélkül.
3.  3. Közvetlen oksági kapcsolatok: Forrás → közvetlen hatás kapcsolatok feltárása.
4.  4. Chain_Long: Korlátlan mélységű láncok, hurokpontokkal.
5.  5. Loop_Summary: Önfenntartó hurkok és megszakítási pontok.
6.  6. IR_Mátrix: Csak közvetlen, láncban igazolt kapcsolatok.
7.  7. IR_Elemzés: Driver, köztes csomópont, hurokerősítő, tünet.
8.  8. QA és vezetői összefoglaló: Ellenőrzés és döntéstámogató kommunikáció.

4. Prompt könyvtár
Használati javaslat
A promptokat lehet egymás után használni kontrollált munkamenetben, vagy a haladó one-shot prompttal egyben futtatni. Kritikus
projektekben a lépésenkénti verzió ajánlott.

4.1 Master prompt – feldolgozás indítása
Feladatod, hogy senior business analyst szemlélettel dolgozd fel a csatolt Excel fájlt.

A fájl tartalmazza:
- a gyökérokelemzés célját,
- a probléma megfogalmazását szituáció + hatás + következmény bontásban,
- egy gyökéroklistát,
- a gyökérokok csoportosítását,
- valamint egy projekt-ráhatás / súlyozás oszlopot.

A súlyozással ebben a körben még ne foglalkozz.

Kizárólag a gyökéroklistában szereplő elemeket használd. Ne találj ki új okot, új következményt, új
problémát vagy új megfogalmazást. Ha valamelyik kapcsolat bizonytalan, inkább ne vedd fel.

A cél:
1. Hosszú oksági láncok feltárása.
2. Öngerjesztő / önfenntartó hurkok azonosítása.
3. Interrelationship Mátrix készítése.
4. Elemző összefoglaló készítése arról, mely gyökérokok driver jellegűek, melyek köztes csomópontok, és
melyek inkább tünetek.

Elvárt Excel munkalapok:
- Chain_Long
- IR_Mátrix

Copilot támogatott RCA / Chain / IR módszertan – belső BA/PM használatra

- IR_Elemzés
- Loop_Summary

A gondolkodásod legyen oksági, irányított és üzleti döntést támogató.

4.2 Input validálás
Először validáld az Excel inputot.

Azonosítsd:
1. Hol található a cél.
2. Hol található a probléma megfogalmazása.
3. Hol kezdődik és hol végződik a gyökéroklista.
4. Melyik oszlop tartalmazza a gyökérokot.
5. Melyik oszlop tartalmazza a csoportosítást.
6. Melyik oszlop tartalmazza a súlyozást vagy projekt-ráhatást.

Kimenetként adj rövid ellenőrző összefoglalót:
- feldolgozott gyökérokok száma,
- észlelt csoportok,
- feldolgozásból kizárt sorok, ha vannak.

Ebben a lépésben még ne készíts láncokat, mátrixot vagy elemzést.

4.3 Gyökéroklista tisztítása
Készíts tisztított gyökéroklistát az Excel alapján.

Szabályok:
- Csak az eredeti gyökérok megnevezéseket használd.
- Ne javítsd át a megfogalmazásokat.
- Ne vonj össze gyökérokokat.
- Ne bonts szét gyökérokokat.
- Ha sortörés vagy technikai karakter szerepel a cellában, azt csak megjelenítés céljából tisztítsd, de a
jelentést ne változtasd meg.

Kimenet:
Egy ellenőrző lista az összes gyökérokból, sorszámmal ellátva.

4.4 Közvetlen oksági kapcsolatok feltárása
Vizsgáld meg egyesével az összes gyökérokot a többi gyökérokhoz képest.

Minden gyökérok esetén tedd fel ezt a kérdést:
„Ez a gyökérok közvetlenül kiválthatja, erősítheti vagy fenntarthatja-e valamelyik másik gyökérokot?”

Csak közvetlen oksági kapcsolatokat vegyél fel.

Kimeneti forma:
Forrás gyökérok → Közvetlenül kiváltott gyökérok

Szabályok:
- Csak a gyökéroklistában szereplő elemeket használd.
- Ne írj új magyarázó okokat a kapcsolatba.
- Ha a kapcsolat csak gyenge asszociáció, ne vedd fel.
- Ha nem tudod megindokolni okságként, ne vedd fel.

A cél nem az, hogy sok kapcsolat legyen, hanem hogy védhető kapcsolatok legyenek.

4.5 Chain_Long létrehozása
Az előző közvetlen oksági kapcsolatok alapján építs hosszú oksági láncokat.

Ne korlátozd a láncokat 4 szintre. Egy lánc addig folytatódjon, amíg:
- el nem ér egy természetes végpontot,

Copilot támogatott RCA / Chain / IR módszertan – belső BA/PM használatra

- vagy vissza nem tér egy korábbi gyökérokhoz,
- vagy már nincs védhető további oksági lépés.

A láncokban kizárólag a gyökéroklistában szereplő elemek szerepelhetnek.

Kimenet és Excel munkalap neve: Chain_Long
Oszlopok:
- Lánc ID
- Lánc megnevezése
- Lépés
- Gyökérok
- Szerep a láncban
- Előző gyökérok
- Következő gyökérok
- Hurokpont? Y/N

A szerep lehet:
- Indító ok
- Köztes ok / továbbgyűrűzés
- Végpont / tünet
- Hurokpont
- Végpont / hurokzárás

4.6 Loop_Summary elkészítése
A Chain_Long munkalap alapján azonosítsd az önfenntartó hurkokat.

Huroknak tekints minden olyan láncot, ahol:
- egy gyökérok ismételten megjelenik ugyanabban a láncban,
- vagy egy későbbi gyökérok visszavezet egy korábbi működési állapothoz,
- vagy a lánc olyan működési kört ír le, amely önmagát újratermeli.

Kimenet és Excel munkalap neve: Loop_Summary
Oszlopok:
- Lánc ID
- Lánc megnevezése
- Lépésszám
- Tartalmaz hurkot? Y/N
- Hurokpont(ok)
- Rövid üzleti értelmezés
- Lehetséges megszakítási pont

A rövid üzleti értelmezés és a megszakítási pont lehet saját elemzés, de ne vezessen be új gyökérokot.

4.7 IR_Mátrix létrehozása
Készíts Interrelationship Mátrixot a gyökérokok között.

A mátrix sorai és oszlopai ugyanazok legyenek: az eredeti gyökéroklista elemei.

A cella értelmezése:
A sorban lévő gyökérok okozza-e vagy közvetlenül erősíti-e az oszlopban lévő gyökérokot?

Értékek:
0 = nincs felvett közvetlen oksági kapcsolat
1 = közvetlen, Chain_Long által igazolt oksági kapcsolat

A mátrix csak a Chain_Long láncok közvetlen egymást követő lépéseiből épüljön.

Példa:
Ha a Chain_Long-ban ez szerepel: A → B → C
akkor az IR_Mátrixban:
A sor, B oszlop = 1
B sor, C oszlop = 1
A sor, C oszlop = 0, mert az nem közvetlen kapcsolat.

Copilot támogatott RCA / Chain / IR módszertan – belső BA/PM használatra

4.8 IR_Elemzés elkészítése
Az IR_Mátrix alapján készíts elemző munkalapot IR_Elemzés néven.

Számold ki minden gyökérokra:
1. Kimenő pontszám: sorösszeg alapján az okozó erő.
2. Bejövő pontszám: oszlopösszeg alapján az okozottság / tünetiség.
3. Nettó driver index: kimenő pontszám mínusz bejövő pontszám.
4. Láncokban való előfordulás: hányszor jelenik meg az adott gyökérok a Chain_Long munkalapon.
5. Indítóként szerepel: hány láncban szerepel első elemként.
6. Végpontként vagy hurokzárásként szerepel: hány láncban szerepel végpontként.

Kimeneti oszlopok:
- Gyökérok
- Kimenő pontszám
- Bejövő pontszám
- Nettó driver index
- Láncokban való előfordulás
- Indítóként szerepel
- Végpontként / hurokzárásként szerepel
- Javasolt szerep

A javasolt szerep lehet:
- Driver
- Köztes csomópont
- Hurokerősítő
- Tünet / végpont
- Validálandó

4.9 QA ellenőrzés
Végezz minőségbiztosítási ellenőrzést az elkészült elemzésen.

Ellenőrizd:
1. A Chain_Long minden gyökérokeleme szerepel-e az eredeti gyökéroklistában.
2. Nem került-e be új, nem listázott ok vagy következmény.
3. Minden IR_Mátrixban szereplő 1-es kapcsolat megtalálható-e közvetlen egymást követő lépésként a
Chain_Long munkalapon.
4. Minden Chain_Long közvetlen kapcsolat megjelenik-e az IR_Mátrixban.
5. Minden hurokpont valóban ismétlődő vagy visszacsatoló pont-e.
6. Az IR_Elemzés pontszámai összhangban vannak-e az IR_Mátrixszal.
7. Van-e olyan gyökérok, amely kimaradt az elemzésből.

Kimenet:
Adj rövid QA riportot:
- rendben lévő elemek,
- észlelt hibák,
- javítandó pontok,
- validálandó feltételezések.

4.10 One-shot prompt haladó felhasználóknak
Dolgozd fel a csatolt Excel fájlt senior business analyst szemlélettel.

A fájl tartalmazza:
- a célt,
- a probléma megfogalmazását szituáció + hatás + következmény bontásban,
- a gyökéroklistát,
- a gyökérokok csoportosítását,
- és egy súlyozási / projekt-ráhatás oszlopot.

A súlyozással most ne foglalkozz.

Kizárólag az eredeti gyökéroklistában szereplő gyökérokokat használd. Ne adj hozzá új okot, új
következményt vagy új megfogalmazást.

Készítsd el az alábbi munkalapokat:
1. Chain_Long – hosszú oksági láncok, korlátlan mélységgel.

Copilot támogatott RCA / Chain / IR módszertan – belső BA/PM használatra

2. IR_Mátrix – 0/1 értékekkel, kizárólag Chain_Long közvetlen kapcsolatokból.
3. IR_Elemzés – driver/tünet/hurokerősítő elemzéssel.
4. Loop_Summary – hurkokkal, üzleti értelmezéssel és lehetséges megszakítási pontokkal.

A végén végezz QA ellenőrzést:
- minden láncelem az eredeti gyökéroklistából származik-e,
- minden mátrixkapcsolat megtalálható-e közvetlen lánclépésként,
- minden lánclépés szerepel-e a mátrixban,
- nem maradt-e ki gyökérok.

5. Output definíciók

Chain_Long
•
Lánc ID
•
Lánc megnevezése
•
Lépés
•  Gyökérok
•
•
•
•  Hurokpont? Y/N

Szerep a láncban
Előző gyökérok
Következő gyökérok

IR_Mátrix
•
Sorok: eredeti gyökérokok
•  Oszlopok: eredeti gyökérokok
•
0 = nincs közvetlen kapcsolat
•
1 = Chain_Long által igazolt közvetlen kapcsolat

IR_Elemzés
•  Gyökérok
•
Kimenő pontszám
•  Bejövő pontszám
•  Nettó driver index
•
•
•  Végpontként / hurokzárásként szerepel
•

Láncokban való előfordulás
Indítóként szerepel

Javasolt szerep

Lánc ID
Lánc megnevezése
Lépésszám
Tartalmaz hurkot? Y/N

Loop_Summary
•
•
•
•
•  Hurokpont(ok)
•  Rövid üzleti értelmezés
•

Lehetséges megszakítási pont

Copilot támogatott RCA / Chain / IR módszertan – belső BA/PM használatra

6. Minőségbiztosítási checklist
•  Minden Chain_Long gyökérokelem megtalálható az eredeti gyökéroklistában.
•  Nem került be új ok, új következmény vagy új fogalmazás.
•  Minden IR_Mátrix 1-es kapcsolat közvetlen egymást követő lánclépésből származik.
•  Minden közvetlen Chain_Long kapcsolat szerepel az IR_Mátrixban.
•  Minden hurokpont valóban ismétlődő vagy visszacsatoló pont.
•  Az IR_Elemzés sor- és oszlopösszegei egyeznek a mátrix tartalmával.
•  Nincs kimaradt gyökérok; ha nincs kapcsolata, akkor is szerepeljen a mátrixban és elemzésben.
•  A vezetői összefoglaló nem javasol technológiai megoldást szervezeti/folyamati eredetű problémára validálás nélkül.

7. Vezetői döntéstámogató értelmezés
Szerep
Driver

Köztes csomópont
Hurokerősítő

Tünet / végpont

Döntési jelentés
Magas kimenő pontszám, alacsonyabb bejövő pontszám; több
láncot indít.
Magas bejövő és kimenő pontszám; sok láncot továbbvisz.
Visszatérő pont ugyanabban vagy több láncban; önfenntartó
működést jelez.
Magas bejövő pontszám, kevés kimenő kapcsolat; itt látható a
fájdalom, de nem feltétlenül itt kell kezdeni.
A kapcsolat vagy szerep nem elég erős; workshopon tisztázandó.

Validálandó
Szervezeti értéküzenet
A módszer nem egyszerű RCA. A cél az önfenntartó működési hurkok feltárása, amelyek megmutatják, hogy egy projektprobléma
mögött milyen szervezeti, folyamatbeli vagy felelősségi mintázatok termelik újra ugyanazokat a tüneteket.

8. Bevezetési javaslat a szervezetben
9.  Pilot: Válasszatok 1–2 aktív Discovery projektet, ahol már van gyökéroklista.
10.  BA/PM tréning: 30–45 perces módszertani walkthrough a promptokkal és outputokkal.
11.  Standard template: Közös Excel sablon és Word output sablon rögzítése.
12.  Review gate: Discovery végén kötelező Chain_Long + Loop_Summary review.
13.  Tanulságok visszacsatolása: A hurokpontokat ne csak projekt backlogba, hanem szervezetfejlesztési tanulságként is

rögzítsétek.

Copilot támogatott RCA / Chain / IR módszertan – belső BA/PM használatra

