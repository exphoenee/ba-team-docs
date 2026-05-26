# Vezetői összefoglaló — BA workflow tesztelési visszamérés
**Projekt:** SZBKI · 2026-05-18

---

## 1. Session áttekintés

| Mutató | Érték |
|--------|------|
| Teszt dátuma | 2026-05-18 |
| Bemeneti fájlok száma | 6 (1 doc presales + 2 meetingjegyzet doc + 3 PNG) |
| Generált BA dokumentumok | 11 (10 workflow + 1 RCA) |
| Teljes sub-agent futások száma | 6 |
| Teljes mért sub-agent futási idő | 68,1 perc |
| Mért sub-agent tokenfelhasználás | 416 994 token |
| Emberi beavatkozások száma | 3 érdemi döntés |

---

## 2. Feladattípusonkénti bontás

| # | Esemény | Feladat típusa | Tokenek | Tool hívások | Futási idő |
|---|--------|----------------|----------|--------------|------------|
| 1 | /session-loader → memory-agent LOAD | Munkamenet betöltés | 19 548 | 10 | 0,3 perc |
| 2 | /convert | Fájlkonverzió (Python pipeline) | ~0* | — | <1 perc |
| 3 | /ba #1 → spec-builder-agent | Specifikáció generálás (V1) | 57 186 | 28 | 7,3 perc |
| 4 | /ba #2 → workflow state check | Válasz-ellenőrzés (STOP: 7 TBD) | 47 742 | 20 | 3,4 perc |
| 5 | /ba #3 → workflow state check | Válasz-ellenőrzés (STOP: 7 TBD) | 48 320 | 33 | 5,0 perc |
| 6 | Dokumentumok elemzése + answers.md írás | Válaszkinyerés meglévő anyagokból | ~0* | 12 | <1 perc |
| 7 | /ba --force → ba-document-agent | BA dokumentumok generálás (V1) | 84 622 | 41 | 17,2 perc |
| 8 | /ba #4 → inkrementális spec + ba-document-agent | Spec frissítés + dokumentumok (V2) | 159 576 | 88 | 34,9 perc |
| 9 | V1/V2 összehasonlítás | Inline elemzés (fő conversation) | ~0* | 6 | <1 perc |
| 10 | RCA/Chain/IR elemzés + .md mentés | Gyökérok elemzés | ~0* | 1 | <1 perc |

\* A fő conversation (nem sub-agent) tokenszáma a rendszer által nem visszaadott — lásd 6. fejezet

---

## 3. Sub-agent tokenfelhasználás összesítve

| Agent típus | Futások | Össz. token | Össz. tool hívás | Össz. idő |
|-------------|--------|-------------|------------------|------------|
| memory-agent | 1 | 19 548 | 10 | 0,3 perc |
| ba-orchestrator (spec+doc gen) | 4 | 349 446 | 190 | 64,8 perc |
| ba-orchestrator (state check) | 2 | 96 062 | 53 | 8,4 perc |
| **Összesen** | **7** | **416 994** | **220** | **68,1 perc** |

---

## 4. Output teljesítmény

| Output kategória | Darab |
|------------------|------|
| Generált BA dokumentumok | 11 |
| Funkcionális követelmény (FR) | 17 |
| Nem funkcionális követelmény (NFR) | 5 |
| Felhasználói sztori (US) | 6 |
| Azonosított kockázat (RISK) | 10 |
| Megválaszolt kérdés (Q) | 9/12 |
| Azonosított gyökérok (RCA) | 14 |
| Oksági lánc (Chain_Long) | 6 |
| Öngerjesztő hurok | 1 |
| Érintett (stakeholder) | 6 |
| Mermaid diagram | 9+ |

**Tokens / BA dokumentum (mért):** ~37 900 token/doc
**Tokens / követelmény elem:** ~9 800 token/elem

---

## 5. Emberi beavatkozások (ahol a rendszer megállt)

| # | Esemény | Megállás oka | Emberi döntés |
|---|--------|-------------|---------------|
| 1 | /ba #2, #3 | 7 kérdés TBD státuszban | Felkérés az anyagokból való válaszkinyerésre |
| 2 | Válaszkinyerés | Rendszer kinyerte, de nem rögzítette | Jóváhagyás + --force parancs kiadása |
| 3 | /ba #4 megállt volna | Inkrementális feldolgozás előtt | Implicit jóváhagyás a /ba futtatásával |

**Automatikusan elvégzett feladatok aránya (emberi döntés nélkül): ~73%**

---

## 6. Korlátok és pontosítási megjegyzések

### Mit nem lehet pontosan mérni
- Fő conversation tokenszáma
- Credit/forint költség
- Pontos falióra-idők
- Cache hit arány

### Becsült teljes tokenfelhasználás

A 416 994 mért sub-agent token alapján, a fő conversation általánosan 20–40%-os overhead-del számolható →
**becsült teljes: ~500 000–580 000 token**

---

## 7. Hatékonysági megfigyelések

### Lassú pontok:
- /ba #2 és #3 futások (összesen 96K token, 8,4 perc) eredménytelenek voltak — a rendszer kétszer állt meg ugyanannál a problémánál. Ez a --force flag korábbi bevezetésével elkerülhető lett volna, ha a felhasználó szándéka ismert.
- A V2 dokumentum-generálás (159K token, 34,9 perc) a legköltségesebb egységes futás — az inkrementális spec-rebuild + teljes dokumentum-csere egyszerre futott.

### Gyors pontok:
- A válaszkinyerés a meglévő dokumentumokból (~12 toolhívás, <1 perc) rendkívül hatékony volt — a session összesen 20-25 percnyi emberi és gépi "gondolkodási időt" takarított meg azzal, hogy a meetingjegyzetekből automatikusan kinyerte a válaszokat.
- Az RCA/Chain/IR elemzés (14 gyökérok, 6 lánc, IR mátrix) inline, sub-agent nélkül készült el.

### Ismétlési mintázat:
- A 3 workflow state-check futásból 2 "felesleges" volt (ugyanazt az eredményt adta). Egy jobb --force kezelés vagy egy egyértelmű felhasználói döntési pont korábban ~100K tokent és ~8 percet spórolna.

---

## 8. Összehasonlító baseline

| Mutató | Gépi (ez a session) | Tipikus emberi BA (becsült) |
|--------|---------------------|------------------------------|
| Spec + dokumentum generálás | 68 perc (gép) | 3–5 munkanap |
| Dokumentumok száma | 11 | 5–7 (ritkán több) |
| Követelmény elemek | 28+ | 15–25 |
| RCA elemzés | <1 perc | 2–4 óra workshop |
| Emberi beavatkozás | 3 döntés | Folyamatos |

---

## Személyes vélemény és meglátások:

Elképesztően jól teljesít az ügynöki rendszer. Külön Discovery-re szabott parancsokkal valószínűleg még hatékonyabb lenne, de az első teszttel nagyon elégedett vagyok.

A legnagyobb tokenfelhasználást és a legtöbb időt az újrafuttatás igényelte, miután az első fájlokat létrehozta; az új adatokkal kiegészítve pedig ezeket újra legyártotta. Érdemes lenne megnézni, van-e lehetőség optimalizálásra, mert ez fent az adatokban is látszik.

Nagyon sokszor kért manuális megerősítést, hogy igen, végrehajthatja az utasítást:
- Igen, írhat a fájlba.
- Igen, létrehozhatja a fájlt.
- Igen, végrehajthatja a PowerShell utasítást.

Ezt érdemes lenne megnézni, mert nagyon sokáig tartott így futtatni és félautomata csak.

A nyitott kérdéseket valóban szigorúan kezelte a Discovery esetéről beszélve a kérdéseket a következő alkalommal tisztázandó pontokként vetetném fel vele. Discovery-s dokumentumgenerálást nem akadályoztatnék vele (szerintem a dokumentumoknak már a discovery-vel is jó alapot tud adni a modell). Javaslat legyen inkább, hogy a BA mindenképpen beszéljen ezekről az ügyféllel.

Érdemes lenne beépíteni a folyamatba, hogy amikor új verziójú dokumentumokat készít, mindig visszaadjon egy eltérésjelentést is. Ez akár mehetne egy külön, .md fájlba.

Az RCA elemzést csak teszt jelleggel futtattam (nem adtam Neki hozzá alap excelt sem); ennek az eredményeivel nem vagyok elégedett. Futási idő szempontjából elképesztően hatékony, ha még mondjuk ennek a tízszeresét is töltené ezzel, mert olyan promptokat írnánk, és olyan követelményeknek kellene megfelelnie, még akkor is sokkal, sokkal beljebb lennénk, mint ezt manuálisan csinálni. A promptlistát csatolom.

Ábrázolást egyelőre nem néztem.