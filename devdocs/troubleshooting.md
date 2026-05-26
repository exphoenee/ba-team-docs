# BA Team – Hibaelhárítási útmutató

**Mikor használd ezt a dokumentumot:** Ha a `/ba`, `/discovery` vagy egy másik parancs nem várt eredményt hoz, kövesd az alábbi döntési fát.

---

## 1. `/ba` futtatásakor semmi sem történik / üres kimenet

```
1. Van-e fájl a workflow/01_project_info/ mappában?
   └─ NEM → Másolj fájlokat, majd futtasd újra: /ba
   └─ IGEN ↓

2. Csak .gitkeep van ott?
   └─ IGEN → A mappát üresnek tekinti a rendszer.
              Tegyél be projektanyagot, majd /ba
   └─ NEM ↓

3. Van-e `workflow/01_project_info/_system/SPEC_OUTPUT.md` a mappában?
   └─ NEM → A spec-builder-agent fog futni.
             Ha nem fut: ellenőrizd a 4. pontot.
   └─ IGEN ↓

4. Az ügynök elindult, de nem adott vissza semmit?
   └─ Lehetséges okok:
      - A bemeneti fájl túl nagy (kontextuskorlát)
      - A memória-ügynök nem érhető el
      → Próbáld meg kevesebb / kisebb fájlokkal
      → Futtasd újra: /ba
```

---

## 2. Konverzió sikertelen (FAIL státusz)

```
1. Látod-e a "not installed" hibát?
   └─ IGEN → Telepítsd a szükséges Python csomagot:
              pip install -r .claude/scripts/requirements.txt
   └─ NEM ↓

2. A fájl megnyitható-e a saját alkalmazásában (Word, Excel stb.)?
   └─ NEM → A fájl sérült. Kérd az ügyféltől újból.
   └─ IGEN ↓

3. Jelszóval védett a fájl?
   └─ IGEN → Távolítsd el a jelszóvédelmet, majd futtasd újra.
   └─ NEM ↓

4. A fájl neve tartalmaz speciális karaktert (ékezet, szóköz)?
   └─ Lehetséges probléma Windowson. Nevezd át: pl. meeting.docx helyett meeting_2024.docx
```

---

## 3. WARN státusz a konverzió után

```
1. Nyisd meg a [filename]_converted.md fájlt.
   └─ Üres vagy nagyon rövid?
      └─ PDF esetén: valószínűleg SCANNED (beszkennelt) PDF.
         OCR nélkül nem olvasható. Kérd szöveges PDF-ben, vagy gépeld be kézzel.
      └─ Excel esetén: ellenőrizd, hogy a cellák képleteket tartalmaznak-e
                       amelyek nem lettek kiértékelve.

2. A tartalom torzított karaktereket tartalmaz (□, ?, ▯)?
   └─ Kódolási probléma (pl. Windows-1252 vs UTF-8).
      Kérd a feladót, hogy UTF-8 kódolásban mentse el.
```

---

## 4. SPEC_OUTPUT.md generálódott, de hiányos

```
1. Van-e `SPEC_DIFF.md` a `workflow/01_project_info/_system/` mappában?
   └─ IGEN → Ellenőrizd: hány elemet talált újnak, módosítottnak, töröltnek.
   └─ NEM → A spec-builder régebbi verzió volt. Futtasd: /ba

2. Hiányoznak egyes fájlok a SPEC_OUTPUT-ból?
   └─ Ellenőrizd a CONVERSION_LOG.md-t (.claude/memory/):
      Szerepel-e az összes bemeneti fájl? SHA-256 egyezik?
   └─ Ha nem szerepel: futtasd a /convert parancsot, majd /ba

3. A forrásannotációk figyelmeztetést mutatnak?
   └─ A ba-orchestrator jelzi, ha [Forrás: ...] hivatkozás nem található a logban.
      Kövesd az ott megadott utasításokat.
```

---

## 5. Q-XXX kérdések nem tűnnek megválaszoltnak

```
1. A workflow/03_answers/ mappában van fájl?
   └─ NEM → Hozz létre answers.md fájlt az alábbi formátumban:
             Q-001: [válasz szövege]
             Q-002: [válasz szövege]

2. A fájlban szerepel a Q-XXX azonosító explicit módon?
   └─ NEM → A rendszer szó szerint keresi a "Q-001:" mintát.
             Adj hozzá: "Q-001: [válasz]"

3. A válasz "TBD" vagy "N/A"?
   └─ Ezeket a rendszer NEM fogadja el érvényes válaszként.
      Írj konkrét, tartalmas választ.

4. Az Office fájlt (.docx, .xlsx) még nem konvertálta?
   └─ Futtasd: /convert, majd ellenőrizd a *_converted.md fájlt.

5. Egyes kérdések PARTIALLY_ANSWERED státuszban vannak?
   └─ Ez NEM hiba — a spec-builder részleges választ talált a forrásanyagban,
      de stakeholder megerősítés nélkül. A /ba folytatja a generálást,
      de figyelmeztető üzenetet jelenít meg.
   └─ Ha valóban megválaszolt: adj explicit Q-XXX: [válasz] sort az answers.md-be.
   └─ Ha bizonytalan: hagyhatod úgy is — a RAID_Log-ba feltételezésként kerül.
```

---

## 6. BA dokumentumok nem generálódnak

```
1. Megválaszolt minden Q-XXX kérdés? (ld. 5. pont)
   └─ NEM → Előbb válaszold meg a kérdéseket.
             Ha mégis vázlatot szeretnél: /ba --draft

2. A workflow/05_ba_docs/ mappa teli van korábbi dokumentumokkal?
   └─ Az orchestrator determinisztikus: csak akkor regenerál, ha
      SPEC_DIFF.md vagy válaszfájl újabb a meglévő doksiknál.
   └─ Kényszerített újragenerálás: /ba --force

3. Az ügynök hibával állt le?
   └─ A DECISIONS.md-ben (`.claude/memory/`) keress ERR- bejegyzést.
      Ez tartalmaz timestamp-et és a hiba rövid leírását.
   └─ Futtasd újra: /ba

4. A dokumentumok tetején ez áll: "📍 Generálás módja: DISCOVERY"?
   └─ Ez nem hiba — az orchestrator észlelte, hogy workflow/02_discovery/BC.md
      létezik, és Discovery-mélységű dokumentumokat generált (kevesebb FR,
      epikus user story-k, 5–8 általános UAT teszt).
   └─ Ha teljes Analysis-mélységű dokumentumot szeretnél: /ba --force
      (ez felülírja a Discovery-mélységű detektálást)

5. A BA_DOCS_LOG.md vagy BA_DOCS_DIFF.md hiányzik a _system/ mappából?
   └─ Ezek minden sikeres BA doc generálás után automatikusan létrejönnek.
   └─ Ha hiányoznak: az ügynök valószínűleg a log írása előtt állt le.
      Futtasd újra: /ba --force
   └─ Ha BA_DOCS_DIFF.md azt írja, hogy minden dokumentum [Nincs változás]:
      Ez helyes — az orchestrator nem generálta újra, mert nem volt változás.
      Ha kényszeríteni akarod: /ba --force
```

---

## 7. SCOPE:CONFLICT figyelmeztetés a SPEC_OUTPUT.md-ben

```
Tünet: Egy FR-XXX elem [SCOPE:CONFLICT — Q-XXX döntés szükséges] jelzőt kapott.

Ok: A spec-builder ugyanazt az elemet megtalálta az IN SCOPE és az OUT OF SCOPE
    listán is egyszerre — az ügyfélanyagok ellentmondanak egymásnak.

Megoldás:
1. Nyisd meg a SPEC_OUTPUT.md-t, keresd a [SCOPE:CONFLICT] jelzőt
2. Nézd meg a két forrásanyagot (a [Forrás: ...] annotáció megmutatja)
3. Egyeztess az ügyféllel melyik a helyes scope
4. Rögzítsd a döntést a Q-XXX válaszmezőbe (workflow/03_answers/)
   VAGY hozz létre SDEC-XXX fájlt a workflow/04_decisions/ mappában
5. Futtasd újra: /ba
```

---

## 8. Stop hook nem jelez

```
1. Létezik a .claude/settings.json fájl?
   └─ NEM → Hozd létre: cp .claude/settings.json.example .claude/settings.json
   └─ IGEN ↓

2. Tartalmaz "hooks" szekciót?
   └─ NEM → Másold bele a .claude/settings.json.example tartalmát.

3. Telepített-e Python?
   └─ A hook a .claude/scripts/workflow_state.py --hook-check szkriptet futtatja.
      python --version → ha nem ismeri, telepítsd: https://python.org/downloads
      Fontos: jelöld be az "Add Python to PATH" jelölőnégyzetet!

4. A szkript megtalálható?
   └─ Ellenőrizd: .claude/scripts/workflow_state.py létezik-e.
   └─ Ha nem: git pull (esetleg a fájl nem volt szinkronizálva)
```

---

## 9. /session-loader nem ad értelmes kimenetet

```
1. Python telepített?
   └─ python --version → ha hibát ír, telepítsd: https://python.org/downloads
                         Fontos: jelöld be az "Add Python to PATH" jelölőnégyzetet!

2. A script megtalálható?
   └─ Ellenőrizd: .claude/scripts/session_loader.py létezik-e.
   └─ Ha nem: git pull (esetleg a fájl nem volt szinkronizálva)
```

---

## 10. Multi-projekt futtatás

**Probléma:** Egyszerre több projektet próbálsz futtatni ugyanabban a Claude Code munkamenetben.

**Tünet:** Kevertek a Q-XXX kérdések, hibás fájlokra hivatkozik az ügynök, vagy az egyik projekt adatai felülírják a másikat.

**Ok:** A BA Team tool projekt-izolált. Egy `workflow/` mappa = egy projekt. A rendszer egyszerre csak egyetlen projekttel képes helyesen dolgozni.

**Megoldás:**
```
1. Minden projekthez nyiss külön Claude Code munkamenetet (új ablak / új chat)
2. Minden munkamenet a saját workflow/ mappáját használja
3. Ha projekt váltás szükséges: zárd le az aktuális munkamenetet, nyiss újat
```

**Miért nem működik több projekt egyszerre?**
- A memória (`.claude/memory/`) projekt-specifikus bejegyzéseket tartalmaz
- Az ügynökök a `workflow/` mappában keresik a bemeneti fájlokat — nem tudják megkülönböztetni, melyik projektből való mit
- A Stop hook a teljes `workflow/` mappát figyeli, nem projekt-specifikus almappákat

---

## 11. FORCED döntés problémák (`04_decisions/`)

```
1. Az SDEC fájl nem épül be a spec-be?
   └─ Ellenőrizd a frontmatter-t:
      - Van-e `forced: true` mező?
      - Érvényes-e a YAML szintaxis? (kettőspont után szóköz, nincs tab behúzás)
      - Az `id:` mező SDEC-XXX formátumú?
   └─ Érvénytelen YAML esetén a rendszer WARNING-ot ír a
      workflow/04_decisions/_system/DECISIONS_LOG.md fájlba.

2. "Target not found" figyelmeztetés DECISIONS_LOG-ban?
   └─ A `targets:` mezőben megadott ID (pl. FR-012) nem létezik a SPEC_OUTPUT.md-ben.
   └─ Ellenőrizd a jelenlegi FR-XXX ID-kat a SPEC_OUTPUT.md-ben.
   └─ Frissítsd a targets mezőt a helyes ID-ra.

3. A spec nem generálódott újra az SDEC fájl után?
   └─ A ba-orchestrator az SDEC fájl módosítási ideje (mtime) alapján dönt.
      Ha az SDEC fájl régebbi mint a SPEC_OUTPUT.md, nem generál újra.
   └─ Megoldás: érintsd meg a fájlt (pl. mentés nélküli megnyitás és bezárás),
      vagy futtasd: /ba --force

4. Nem látszik a [FORCED] annotáció a SPEC_OUTPUT.md-ben?
   └─ Ellenőrizd a DECISIONS_LOG.md-t: APPLIED státuszú bejegyzés van-e?
   └─ Ha SKIPPED státuszt látsz: a target ID nem egyezett.
```

---

## 12. `/discovery` futásakor nincs kimenet / hiányos eredmény

```
1. Van-e fájl a workflow/01_project_info/ mappában?
   └─ NEM → Másolj be projektanyagot (handover, meeting notes stb.), majd /discovery

2. Csak .gitkeep van ott?
   └─ IGEN → A mappát üresnek tekinti. Tegyél be valódi fájlt.

3. Nem generálódott DISCOVERY_OUTPUT.md (workflow/02_discovery/_system/)?
   └─ Az ügynök talán hibával állt le. Futtasd újra: /discovery
   └─ Ha az output mappa sem jött létre: ellenőrizd, hogy a workflow/02_discovery/
      mappa létezik-e (git pull, vagy hozd létre kézzel).

4. BC.md generálódott, de üres / nagyon rövid?
   └─ A bemeneti anyag valószínűleg nem tartalmaz elég strukturált szöveget.
      Ellenőrizd a _converted.md fájlokat (ld. 2-3. pont).
   └─ Próbáld meg a sablonok egyikével:
        .claude/references/templates/handover_template.md
        .claude/references/templates/discovery_meeting_template.md

5. BC.md-ben nincs VÁZLAT fejléc, de még vannak nyitott kérdések?
   └─ Ez NEM hiba — a discovery-agent csak akkor tesz VÁZLAT fejlécet,
      ha Q-XXX kérdések találhatók a DISCOVERY_OUTPUT.md-ben.
   └─ Ha minden kérdés megválaszolt a workflow/03_answers/-ban: helyes viselkedés.

6. /discovery után /ba-t futtatva Discovery-mélységű dokumentumok jönnek?
   └─ Ez szándékos: az orchestrator észleli a BC.md meglétét és Discovery-mélységű
      generálást végez. Lásd: 6. pont / 4. kérdés.
```

---

## Gyors összefoglaló – leggyakoribb hibák

| Tünet | Megoldás |
|---|---|
| Semmi nem történik `/ba`-ra | Nézd meg: van-e fájl `workflow/01_project_info/`-ban? |
| Semmi nem történik `/discovery`-ra | Nézd meg: van-e fájl `workflow/01_project_info/`-ban? Lásd 12. pont. |
| FAIL státusz konverzióban | `pip install -r .claude/scripts/requirements.txt` |
| WARN státusz PDF-nél | Scanned PDF — OCR nélkül nem olvasható |
| Q-XXX még unanswered | Ellenőrizd: szerepel-e `Q-XXX:` prefix a `workflow/03_answers/`-ban? |
| Q-XXX PARTIALLY_ANSWERED | Nem hiba — spec-builder részleges választ kinyert; stakeholder megerősítés ajánlott. Lásd 5. pont. |
| `[SCOPE:CONFLICT]` jelző a SPEC_OUTPUT-ban | Ellentmondásos scope az ügyfélanyagokban — egyeztetés szükséges. Lásd 7. pont. |
| Stop hook nem jelez | Python telepítve van? `python .claude/scripts/workflow_state.py --hook-check` |
| Üres BA dokumentum | Ellenőrizd a `workflow/01_project_info/_system/SPEC_OUTPUT.md` tartalmát; hiányzik-e valamely forrás? |
| `📍 Generálás módja: DISCOVERY` fejléc a BA doksiknál | Nem hiba — Discovery→Analysis átmenet. Teljes mélységhez: `/ba --force` |
| BA_DOCS_LOG.md vagy BA_DOCS_DIFF.md hiányzik | Generálás nem fejeződött be teljesen. Futtasd: `/ba --force`. Lásd 6. pont. |
| `[Nincs változás]` fejléc a BA doksin | Nem hiba — szelektív regenerálás, a doki nem változott. Kényszerítéshez: `/ba --force` |
| BC.md üres vagy nagyon rövid | A bemeneti anyag kevés szöveget tartalmaz — próbálj sablon inputot, lásd 12. pont. |
| Keverednek projektek / váratlan fájlhivatkozások | Egy munkamenetben csak egy projekt futhat — nyiss új Claude Code munkamenetet a másik projekthez |
| FORCED döntés nem épül be | `forced: true` van-e a frontmatter-ben? Érvényes YAML szintaxis? Lásd 11. pont. |
