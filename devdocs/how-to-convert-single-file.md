# Egyszeri fájlkonverzió Markdown-ba

Ez az útmutató leírja, hogyan konvertálhatsz alkalmilag egyetlen fájlt Markdown formátumba — anélkül, hogy a teljes workflow-t futtatnád.

---

## Mikor érdemes ezt használni?

- Gyorsan meg akarod nézni, mit tartalmaz egy fájl Markdown formában
- Nem akarod a `workflow/` mappát módosítani
- Egyszeri, workflow-n kívüli konverzióra van szükséged

---

## Támogatott formátumok

| Kiterjesztés | Szükséges csomag |
|---|---|
| `.docx`, `.doc` | `pip install "markitdown[docx]"` |
| `.pdf` | `pip install "markitdown[pdf]"` |
| `.pptx`, `.ppt` | `pip install "markitdown[pptx]" python-pptx` |
| `.xlsx`, `.xls` | `pip install openpyxl` |
| `.msg` | `pip install extract-msg` |
| `.eml` | beépített (nincs külön telepítés) |
| `.png`, `.jpg`, `.jpeg`, `.bmp`, `.webp` | `pip install anthropic Pillow` + `ANTHROPIC_API_KEY` |

---

## Elsődleges módszer — `scripts/convert_file.py`

A projekt tartalmaz egy dedikált egyfájlos konverter szkriptet: [`scripts/convert_file.py`](../scripts/convert_file.py)

Ez ugyanazt a konverter-infrastruktúrát használja, mint a fő workflow (MarkItDown, xlsx, image), de:
- bármely forrás- és célmappával működik
- **nem írja bele** a `.claude/memory/CONVERSION_LOG.md` naplóba (a memory tiszta marad)
- a kimenet neve: `<fájlnév>_converted.md`

### Használat (a projekt gyökeréből)

```powershell
cd E:\Projects\ba-team\app

# Alap — output ugyanabba a mappába kerül, mint a forrás
python scripts/convert_file.py "devdocs/test-runs/BASE+4.+-+iterált+agent2.1+discovery.doc"

# Egyedi célmappa
python scripts/convert_file.py "devdocs/riport.pdf" --out devdocs/test-runs/

# Abszolút útvonallal is működik
python scripts/convert_file.py "E:\Valahol\specifikáció.docx" --out "E:\Valahol\kimenetek\"
```

### Kimenet

```
OK  devdocs\test-runs\BASE+4.+-+iterált+agent2.1+discovery.doc_converted.md
    forrás: 48 320 B  →  output: 12 145 B  |  sha256: e3b0c442
```

### Kimenet formátuma

Minden konvertált fájl elején metadata header jelenik meg:

```markdown
<!-- source-fingerprint: e3b0c44298fc1c14... -->

> **Forrás:** `riport.docx`
> **Méret:** 48 320 B
> **Módosítva:** 2026-05-29 14:22:05
> **SHA-256:** `e3b0c44298fc1c14...`

---

[konvertált tartalom]
```

### Képek konvertálása

A képfájlokhoz Claude vision API szükséges — az `ANTHROPIC_API_KEY` környezeti változót be kell állítani:

```powershell
$env:ANTHROPIC_API_KEY = "sk-ant-..."
python scripts/convert_file.py "devdocs/képernyőkép.png"
```

---

## Alternatíva — markitdown CLI (gyors, metadata header nélkül)

Office/PDF formátumokhoz közvetlenül is használható a `markitdown` parancssori eszköz:

```powershell
python -m markitdown "C:\Útvonal\fájl.docx" > kimenet.md
```

Nincs metadata header, nincs fingerprint — egyszerű, gyors szöveg-kimenet.

> Telepítés: `pip install "markitdown[docx,pdf]" python-pptx`

---

## Melyik módszert válasszam?

| Helyzet | Ajánlott |
|---|---|
| Általános egyszeri konverzió | `scripts/convert_file.py` |
| Kép (`.png`, `.jpg`, stb.) | `scripts/convert_file.py` |
| Excel, Outlook e-mail | `scripts/convert_file.py` |
| Gyors szöveg-kimenet, metadata nélkül | markitdown CLI |
| Workflow-ba akarod integrálni (naplóval) | `run_convert.py --scope inputs` |

---

## Visszaállítás

Ha a konvertált fájlt ki akarod törölni:

```powershell
Remove-Item "devdocs\test-runs\BASE+4.+-+iterált+agent2.1+discovery.doc_converted.md"
```

A teljes projekt-reset eszközéről lásd: [how-to-test-conversion.md](how-to-test-conversion.md) — *Reset* fejezet.
