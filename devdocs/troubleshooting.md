# BA Team – Hibaelhárítási útmutató

**Mikor használd ezt a dokumentumot:** Ha a `/ba` vagy egy másik parancs nem várt eredményt hoz, kövesd az alábbi döntési fát.

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
1. A workflow/02_answers/ mappában van fájl?
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
```

---

## 6. BA dokumentumok nem generálódnak

```
1. Megválaszolt minden Q-XXX kérdés? (ld. 5. pont)
   └─ NEM → Előbb válaszold meg a kérdéseket.

2. A workflow/03_ba_docs/ mappa teli van korábbi dokumentumokkal?
   └─ A rendszer rákérdez: "Újragenerálja?"
      Erősítsd meg a folytatást.

3. Az ügynök hibával állt le?
   └─ A DECISIONS.md-ben (`.claude/memory/`) keress ERR- bejegyzést.
      Ez tartalmaz timestamp-et és a hiba rövid leírását.
   └─ Futtasd újra: /ba
```

---

## 7. Stop hook nem jelez

```
1. Létezik a .claude/settings.json fájl?
   └─ NEM → Hozd létre: cp .claude/settings.json.example .claude/settings.json
   └─ IGEN ↓

2. Tartalmaz "hooks" szekciót?
   └─ NEM → Másold bele a .claude/settings.json.example tartalmát.

3. Telepített-e Node.js?
   └─ A hook egy node -e parancsot futtat.
      node --version → ha nem ismeri, telepítsd: https://nodejs.org
```

---

## 8. /session-loader nem ad értelmes kimenetet

```
1. Python telepített?
   └─ python --version → ha hibát ír, telepítsd: https://python.org/downloads
                         Fontos: jelöld be az "Add Python to PATH" jelölőnégyzetet!

2. A script megtalálható?
   └─ Ellenőrizd: .claude/scripts/session_loader.py létezik-e.
   └─ Ha nem: git pull (esetleg a fájl nem volt szinkronizálva)
```

---

## Gyors összefoglaló – leggyakoribb hibák

| Tünet | Megoldás |
|---|---|
| Semmi nem történik `/ba`-ra | Nézd meg: van-e fájl `workflow/01_project_info/`-ban? |
| FAIL státusz konverzióban | `pip install -r .claude/scripts/requirements.txt` |
| WARN státusz PDF-nél | Scanned PDF — OCR nélkül nem olvasható |
| Q-XXX még unanswered | Ellenőrizd: szerepel-e `Q-XXX:` prefix a válaszban? |
| Stop hook nem jelez | `cp .claude/settings.json.example .claude/settings.json` |
| Üres BA dokumentum | Ellenőrizd a `workflow/01_project_info/_system/SPEC_OUTPUT.md` tartalmát; hiányzik-e valamely forrás? |
