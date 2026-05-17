# Fájlkonverzió tesztelése

Ez az útmutató leírja, hogyan teszteld a `convert_all` Python csomag működését a beépített tesztfájlokon, majd hogyan állítsd vissza a projektet sablon-állapotba.

---

## Előfeltételek

**Python** (3.10+) telepítve legyen és elérhető a parancssorból:

```powershell
python --version
```

**Python könyvtárak** (Office/PDF/email teszteléshez):

```powershell
pip install "markitdown[docx,pdf]" openpyxl extract-msg python-pptx
```

**Képkonverzióhoz** (opcionális — csak `.png`, `.jpg`, `.bmp`, `.webp` fájlokhoz):

```powershell
pip install anthropic Pillow
```

Az `ANTHROPIC_API_KEY` környezeti változót is be kell állítani — lásd a következő bekezdést.

> Ha valamely csomag hiányzik, a konverzió `FAIL` státusszal jelzi — ez nem hiba a tesztben, hanem a hiányzó feltétel jelzése.

---

## Tesztfájlok

A tesztdokumentumok az `assets/test_docs/` mappában találhatók:

| Fájl | Formátum | Konvertálható? | Szükséges csomag |
|---|---|---|---|
| `test_docx.docx` | Word | Igen | `markitdown[docx]` |
| `test_xlsx.xlsx` | Excel | Igen | `openpyxl` |
| `test_email.msg` | Outlook e-mail | Igen | `extract-msg` |
| `test_pdf.pdf` | PDF | Igen | `markitdown[pdf]` |
| `test_pptx.pptx` | PowerPoint | Igen | `python-pptx` |
| `test_png.png` | Kép | Igen — Claude vision API | `anthropic` + `ANTHROPIC_API_KEY` |
| `test_json.json` | JSON | Nem — nem támogatott formátum | – |
| `test_csv.csv` | CSV | Nem — nem támogatott formátum | – |
| `test_xml.xml` | XML | Nem — nem támogatott formátum | – |

A nem támogatott formátumokat (JSON, CSV, XML) a scanner kiszűri — nem jutnak el a konverterig.

> **Képek (PNG, JPG, BMP, WEBP):** az `ANTHROPIC_API_KEY` környezeti változó és az `anthropic` Python csomag szükséges.
> Ha ezek hiányoznak, a konverzió `FAIL` státusszal jelzi — ez nem hiba, hanem a hiányzó feltétel jelzése.

---

## Az ANTHROPIC_API_KEY beállítása (képkonverzióhoz)

Az API kulcsot a `ANTHROPIC_API_KEY` környezeti változóban kell elérhetővé tenni.
A konverter a futás idején olvassa ki — a kódba soha ne írd bele.

**Csak az aktuális terminál-munkamenetre (nem marad meg újraindítás után):**

```powershell
$env:ANTHROPIC_API_KEY = "sk-ant-..."
```

**Tartósan, a felhasználói profilba (PowerShell):**

```powershell
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-...", "User")
```

**Tartósan, `.env` fájlból (ha a projekt `.env`-t használ):**

```
ANTHROPIC_API_KEY=sk-ant-...
```

> Az API kulcs az [Anthropic Console](https://console.anthropic.com/settings/keys) oldalon generálható.
> Soha ne commitold a kulcsot a repositoryba — add hozzá a `.gitignore`-hoz ha `.env` fájlt használsz.

---

## A teszt futtatása

### 1. lépés — Tesztfájlok másolása és konverzió egyszerre

```powershell
python .claude/scripts/test_convert.py
```

Ez a szkript:
1. Bemásolja a támogatott fájlokat az `assets/test_docs/`-ból a `workflow/01_project_info/`-ba
2. Futtatja a `convert_all` csomagot `--scope inputs` beállítással
3. Megjeleníti az eredményt

### Alternatíva — Csak másolás, kézi konverzióval

```powershell
python .claude/scripts/test_convert.py --copy-only
python .claude/scripts/run_convert.py --scope inputs
```

---

## Várható kimenet

Minden függőség telepítve esetén:

```
============================================================
  TEST CONVERT  –  fájlkonverzió tesztelése
============================================================

Forrás:  assets/test_docs/
Cél:     workflow/01_project_info/

  SKIP    test_csv.csv  (nem támogatott: .csv)
  COPY    test_docx.docx
  COPY    test_email.msg
  SKIP    test_json.json  (nem támogatott: .json)
  COPY    test_pdf.pdf
  SKIP    test_png.png  (nem támogatott: .png)
  COPY    test_pptx.pptx
  COPY    test_xlsx.xlsx
  SKIP    test_xml.xml  (nem támogatott: .xml)

  5 fájl bemásolva, 4 kihagyva (nem támogatott formátum)

============================================================
  CONVERT_ALL futtatása (--scope inputs)
============================================================

CONVERT_ALL done   success=5  skip=0  fail=0

results:
  SUCCESS   workflow/01_project_info/test_docx.docx    ->  test_docx_converted.md
  SUCCESS   workflow/01_project_info/test_email.msg    ->  test_email_converted.md
  SUCCESS   workflow/01_project_info/test_pdf.pdf      ->  test_pdf_converted.md
  SUCCESS   workflow/01_project_info/test_pptx.pptx    ->  test_pptx_converted.md
  SUCCESS   workflow/01_project_info/test_xlsx.xlsx    ->  test_xlsx_converted.md
```

---

## Mit ellenőrizz a kimenetben

### Státusz értékek

| Státusz | Jelentés |
|---|---|
| `SUCCESS` | Konverzió sikeres, `_converted.md` fájl létrehozva |
| `SKIP` | A forrás fájl nem változott az utolsó futás óta — kihagyva |
| `MODIFIED` | A `_converted.md` fájlt valaki kézzel szerkesztette — napló frissítve, tartalom megőrizve |
| `FAIL` | Konverzió sikertelen (hiányzó függőség vagy sérült fájl) |

### Keletkező fájlok

A `workflow/01_project_info/` mappában minden sikeres konverzió után megjelenik egy `[fájlnév]_converted.md` fájl. Például:

```
workflow/01_project_info/
  test_docx.docx
  test_docx_converted.md      ← ez keletkezett
  test_xlsx.xlsx
  test_xlsx_converted.md      ← ez keletkezett
  ...
```

### Metadata header

Minden `_converted.md` fájl elején megjelenik egy metaadat blokk:

```markdown
<!-- source-fingerprint: e3b0c44298fc1c14... -->

> **Forrás:** `test_docx.docx`
> **Méret:** 12 345 B
> **Módosítva:** 2026-05-16 18:53:17
> **SHA-256:** `e3b0c44298fc1c14...`

---
```

### Konverziós napló

A `.claude/memory/CONVERSION_LOG.md` fájlban minden sikeres konverzió rögzítve van (9 oszlop, output SHA-256-tal):

```
| File | SHA-256 | Size | Modified | Relative path | Output | Output size | Output SHA-256 | Converted at |
```

---

## Második futás — skip logika ellenőrzése

Ha a konverziót változatlan fájlokon újra futtatod, minden fájl `SKIP` státuszt kap:

```powershell
python .claude/scripts/run_convert.py --scope inputs
```

```
CONVERT_ALL done   success=0  skip=5  fail=0

results:
  SKIP      workflow/01_project_info/test_docx.docx   (fingerprint match)
  SKIP      workflow/01_project_info/test_xlsx.xlsx   (fingerprint match)
  ...
```

---

## MODIFIED státusz tesztelése

1. Futtasd a konverziót (sikeres `SUCCESS` kell hozzá)
2. Szerkeszd meg kézzel az egyik `_converted.md` fájlt (pl. adj hozzá egy sort)
3. Futtasd újra a konverziót

```
CONVERT_ALL done   success=0  skip=4  fail=0  modified=1

results:
  SKIP      ...
  MODIFIED  workflow/01_project_info/test_xlsx.docx  ->  test_xlsx_converted.md  (output was manually edited; log updated)
```

A kézi szerkesztés megmarad, a napló frissül az új SHA-256-ra.

---

## Törölt output tesztelése

1. Futtasd a konverziót (sikeres `SUCCESS` kell hozzá)
2. Töröld kézzel az egyik `_converted.md` fájlt
3. Futtasd újra a konverziót

Az érintett fájl `SUCCESS` státuszt kap és újra konvertálódik, holott a forrás nem változott.

---

## Reset — visszaállítás sablon-állapotba

```powershell
python .claude/scripts/reset_project.py
```

Megerősítés nélkül (pl. CI vagy szkriptből):

```powershell
python .claude/scripts/reset_project.py --yes
```

A reset elvégzi:
- `workflow/01_project_info/` — minden fájl törlése (`.gitkeep` megmarad)
- `workflow/02_answers/` — minden fájl törlése
- `workflow/03_ba_docs/` — minden fájl törlése
- `.claude/memory/CONVERSION_LOG.md` — üres 9-oszlopos táblára reset
- `.claude/memory/` többi fájl (DECISIONS, STAKEHOLDERS, stb.) — törlés (memory-agent hozza létre újra az első futáskor)

Az `assets/test_docs/` mappát **nem érinti**.

---

## Teljes tesztelési ciklus

```powershell
# 1. Teszt futtatása
python .claude/scripts/test_convert.py

# 2. Eredmények ellenőrzése
#    - workflow/01_project_info/ mappában _converted.md fájlok
#    - .claude/memory/CONVERSION_LOG.md naplóbejegyzések

# 3. Skip logika ellenőrzése
python .claude/scripts/run_convert.py --scope inputs

# 4. Visszaállítás
python .claude/scripts/reset_project.py --yes
```
