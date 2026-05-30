# 10. Fájlkonverzió (/convert)

## Mire való?

A BA Tool kizárólag markdown (`.md`) fájlokat tud feldolgozni. Ha a bemeneti anyagok Word dokumentumok, Excel táblázatok, PDF-ek, Outlook üzenetek vagy PowerPoint prezentációk — konverzióra van szükség.

A `/convert` parancs (és az automatikus konverzió) ezt a lépést végzi el: az Office- és egyéb fájlokat `.md` formátumba alakítja, hogy az AI ügynökök feldolgozhassák őket.

---

## Támogatott fájlformátumok

| Fájltípus | Kiterjesztés | Módszer | Megjegyzés |
|---|---|---|---|
| Word dokumentum | `.docx`, `.doc` | Python markitdown[docx] | Teljes szöveg, táblázatok, listák |
| Excel táblázat | `.xlsx`, `.xls` | Python openpyxl | Minden munkalap, táblázatok |
| Outlook e-mail | `.msg` | Python extract-msg | Tárgy, feladó, törzs, mellékletek listája |
| E-mail | `.eml` | Python stdlib | Fejlécek + szöveges törzs |
| PDF | `.pdf` | Python markitdown[pdf] | Szöveges tartalom; scanned PDF-nél WARN |
| PowerPoint | `.pptx`, `.ppt` | Python markitdown + python-pptx | Diacímek, szöveges blokkok |
| Képek | `.png`, `.jpg`, `.jpeg`, `.bmp`, `.webp` | Claude API (vision) | AI értelmezi a vizuális tartalmat |
| Hangfájlok | `.mp3`, `.m4a`, `.wav`, `.ogg`, `.flac`, `.aac`, `.wma`, `.opus` | faster-whisper hangátirat | FFmpeg + faster-whisper szükséges |
| Videó | `.mp4`, `.mkv`, `.mov`, `.webm`, `.avi` | ffmpeg audio kinyerés + faster-whisper | Hang automatikusan kinyerve, videó törlődik |
| Markdown / szöveg | `.md`, `.txt` | — | Nem kell konvertálni — közvetlenül feldolgozható |

---

## Hogyan működik?

```
/convert
```

A rendszer egy **Python csomagot** futtat — nem AI agentet — így **egyetlen LLM tokent sem használ el** (kivétel: képfeldolgozás).

**A konverzió lépései:**

1. **Gyorsellenőrzés** — méret és módosítási dátum alapján kiszűri a már konvertált, változatlan fájlokat (stat-based fast-skip)
2. **SHA-256 ujjlenyomat** — hash-alapú változásdetekció: ha a tartalom megváltozott, újra konvertál
3. **Konverzió** — csak az új vagy megváltozott fájlokat dolgozza fel
4. **Kimenet** — `[fájlnév]_converted.md` fájl létrehozása ugyanabban a mappában
5. **Napló frissítése** — `CONVERSION_LOG.md` frissítése az eredménnyel (9 oszlopos tábla)

**Az eredeti fájlokat soha nem módosítja.**

---

## Automatikus konverzió

A legtöbb esetben nem kell manuálisan futtatni — a parancsok automatikusan konvertálnak:

| Parancs | Melyik mappát konvertálja? |
|---|---|
| `/ba` | `01_project_info/` és `03_answers/` |
| `/extractor` | csak `01_project_info/` |
| `/business-analyst` | csak `03_answers/` |
| `/discovery` | csak `01_project_info/` |
| `/rca` | `01_project_info/` és az Excel input (`03_answers/rca_input*`) |
| `/convert` | `01_project_info/` és `03_answers/` |

> **Mikor kell manuálisan futtatni?** Ha nagy fájlokat adtál hozzá és előbb szeretnéd ellenőrizni a konverzió eredményét, mielőtt az AI-t futtatod. Vagy ha a `/convert` folyamat WARN státuszt adott és meg akarod nézni a naplót.

---

## RCA Excel input konvertálása

Az `/rca` parancs opcionálisan fogad egy Excel gyökéroklistát:

1. Helyezd el az Excel fájlt: `workflow/03_answers/rca_input_[név].xlsx`
2. Futtasd: `/rca` (a konverzió automatikus)
3. Az `rca-agent` az így keletkező `rca_input_[név]_converted.md`-t olvassa be

**Az Excel elvárása:** az első oszlopban legyenek a gyökérok-szövegek. A többi oszlop opcionálisan csoportokat, forrásokat vagy megjegyzéseket tartalmazhat.

---

## Hangfájlok és videók

A BA Tool képes automatikusan szövegessé alakítani meeting-felvételeket (`.mp3`, `.m4a`, `.wav` stb.) és videókat (`.mp4`, `.mkv` stb.). A `/convert` parancs futtatásakor:

1. **Audio fájlok** esetén a rendszer közvetlenül transcribál faster-whisper segítségével
2. **Videó fájlok** esetén a rendszer először kinyeri az audiót (ffmpeg), majd azt transcribálja — a videó törlésre kerül sikeres kinyerés után
3. Az output fájl neve: `{fájlnév}_{modell}_converted.md` (pl. `meeting_small_converted.md`)

Részletes modell-összehasonlítás, teljesítményadatok és telepítési útmutató: [19. fejezet – Hangátirat](ch19-audio-transcription.md)

---

## Képfeldolgozás (PNG, JPG, JPEG, BMP, WEBP)

A képfájlok feldolgozása **AI-alapú** — a rendszer értelmezi a kép vizuális tartalmát és szöveges Markdown leírást készít.

| Feltétel | Módszer |
|---|---|
| `ANTHROPIC_API_KEY` be van állítva | Python ImageConverter – Claude API vision hívással |
| Nincs API kulcs | `/convert` skill agent-módban, Claude Read eszközével |

**Mire jó?** Képernyőképek, folyamatábra-fotók, kézzel rajzolt vázlatok, szkennelt dokumentumok esetén.

---

## WARN státuszok — mikor figyelj oda?

| Feltétel | Lehetséges ok | Teendő |
|---|---|---|
| Output < 200 bájt | Üres fájl, jelszóval védett dokumentum, sérült forrás | Ellenőrizd az eredeti fájlt |
| Output < input 5%-a | Scanned PDF (nincs szöveges réteg), jelszóval védett PDF | Töltsd fel szöveg-alapú verziót, vagy fotózd le és töltsd fel képként |
| Képfeldolgozás sikertelen | Nincs API kulcs, hálózati hiba | Ellenőrizd az `ANTHROPIC_API_KEY` beállítást |

---

## A konverziós napló megtekintése

A konverzió eredményeit az `/memory-handler` paranccsal tudod lekérdezni:

```
/memory-handler
```

A rendszer visszaadja a `CONVERSION_LOG.md` tartalmát — ebben szerepel minden konvertált fájl:

| Oszlop | Tartalom |
|---|---|
| `File` | Eredeti fájl neve |
| `SHA-256` | Eredeti fájl teljes ujjlenyomata |
| `Size` | Eredeti fájl mérete |
| `Modified` | Utolsó módosítás dátuma |
| `Relative path` | Elérési út a workflow mappán belül |
| `Output` | A generált `_converted.md` fájl neve |
| `Output size` | Konvertált fájl mérete |
| `Output SHA-256` | Konvertált fájl ujjlenyomata |
| `Converted at` | Konverzió időpontja |

---

## Változásdetekció és inkrementális konverzió

A rendszer **nem konvertál újra** egy fájlt, ha:
- A fájl mérete és módosítási dátuma nem változott (gyors ellenőrzés), ÉS
- A SHA-256 ujjlenyomat megegyezik a naplóban tárolttal (biztonságos ellenőrzés)

Ez azt jelenti, hogy nagy projekteknél sem lassul le a konverzió — csak a ténylegesen új vagy módosított fájlokat dolgozza fel.

**Ha egy fájlt töröltél:** a már konvertált `_converted.md` fájl megmarad. Ha újra futtatod `/ba`-t, a spec-készítés a már meglévő konvertált fájlból dolgozik. A törölt fájl hiánya teljes spec-újragenerálást vált ki.
