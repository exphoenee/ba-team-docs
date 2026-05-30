# 12. Hangátirat (meeting-felvételek és videók)

> Automatikus szöveges átírás faster-whisper segítségével — a BA workflow részeként.

---

## Mi ez?

A BA Tool képes automatikusan szöveges Markdown-átiratot készíteni audio és videó fájlokból. Meeting-felvételeket (`.mp3`, `.m4a`, `.wav` stb.) vagy videókat (`.mp4`, `.mkv` stb.) elég bemásolni a projekt bemeneti mappájába, majd a `/convert` parancsot kiadni — az átirat automatikusan elkészül.

---

## Hogyan kell használni?

1. Másold a hang- vagy videófájlt a `workflow/01_project_info/` mappába
2. Írd be a Claude panelen: `/convert`
3. Az átirat automatikusan elkészül: `{fájlnév}_{modell}_converted.md`
4. Futtasd a `/ba` parancsot — az AI az átiraton is dolgozik

**Modell beállítása (opcionális):** az `app/config.json` fájlban:
```json
{
  "transcriber_options": {
    "model": "light",
    "mode": "auto"
  }
}
```

| Kulcs | Értékek | Alapértelmezett |
|---|---|---|
| `model` | `"tiny"`, `"base"`, `"small"`, `"medium"`, `"large-v3"`, `"light"` (= small) | `"light"` |
| `mode` | `"auto"`, `"cpu"`, `"cuda"` | `"auto"` |

---

## Videó támogatás

Videó fájlok esetén a rendszer automatikusan kinyeri az audiót (FFmpeg segítségével), majd azt transcribálja. A videó neve és az audio neve megegyezik (pl. `meeting.mp4` → `meeting.mp3`). Sikeres kinyerés után a videó törlésre kerül (BA módban alapértelmezett viselkedés).

---

## Párhuzamos munkavégzés

Az átírás háttérben zajlik — a konverzió alatt a számítógép szabadon használható, a Claude is elérhető. Kivétel: `medium (CPU)` modell esetén az RTF > 1, és a gép erősen terhelt lehet.

---

## Modell-összehasonlítás

Az alábbi táblázat 3 magyar nyelvű meeting-felvétel alapján készült (összesen ~57 perc), NVIDIA GeForce RTX 4050 Laptop GPU + Intel Core i7-13620H konfiguráción.

| Modell | Átl. sebesség | RTF | TQS | Jellemző hibák | Ajánlás |
|---|---|---|---|---|---|
| tiny (CUDA) | ~15,7× | 0,06 | ~65/100 | ~50+ hallucináció, kevert nyelv | Csak vázlathoz |
| tiny (CPU) | ~5,6–9,5× | 0,06–0,18 | ~65/100 | ~50+ hallucináció | Csak vázlathoz |
| **small (CUDA)** | **~6,6×** | **0,15** | **96/100** | **3 db értelmetlen szó** | **✔ Ajánlott** |
| small (CPU) | ~1,9–2,2× | 0,44–0,54 | ~96/100 | 3 db értelmetlen szó | CPU-s legjobb választás |
| medium (CUDA) | ~4,4× | 0,23 | ~88/100 | ~35–40 torzítás, nincs loop | Elfogadható |
| medium (CPU) | ~0,82× | 1,22 | ~80/100 | 1 kritikus 28× loop + ~30 db | ❌ Kerülendő |

**RTF** (Real-Time Factor): ha RTF < 1, a feldolgozás gyorsabb valós időnél (pl. RTF 0,15 → 6,6× sebesség). Ha RTF > 1, lassabb.
**TQS** (Transcription Quality Score): 100-ból mért minőségi pontszám tényleges fájlelemzés alapján.

---

## Részletes teljesítménytáblák

### Fájlonkénti mérések — 1. gép (RTX 4050 + i7-13620H)

**Kritikus_logikai_rések_a_Claude-alapú_BA-rendszerben.m4a (21 MB, 11:00)**

| Modell | Eszköz | Feldolg. idő | RTF | Sebesség |
|---|---|---|---|---|
| tiny | CPU | 126,7 mp | 0,19 | ~5,2× |
| tiny | CUDA | 36,2 mp | 0,05 | ~18,2× |
| small | CPU | 439,9 mp | 0,67 | ~1,5× |
| small | CUDA | 93,7 mp | 0,14 | ~7,0× |
| medium | CUDA | 128,5 mp | 0,19 | ~5,1× |
| medium | CPU | 814,9 mp | 1,23 | ~0,81× |

**Káoszból_profi_specifikáció_hét_AI_ügynökkel.m4a (54 MB, 27:55)**

| Modell | Eszköz | Feldolg. idő | RTF | Sebesség |
|---|---|---|---|---|
| tiny | CPU | 274,2 mp | 0,16 | ~6,1× |
| tiny | CUDA | 107,4 mp | 0,06 | ~15,6× |
| small | CPU | 857,2 mp | 0,51 | ~2,0× |
| small | CUDA | 320,7 mp | 0,19 | ~5,2× |
| medium | CUDA | 379,2 mp | 0,23 | ~4,4× |
| medium | CPU | 2033,8 mp | 1,21 | ~0,83× |

**Mérnöki_fegyelem_az_üzleti_elemzésben.m4a (34 MB, 17:42)**

| Modell | Eszköz | Feldolg. idő | RTF | Sebesség |
|---|---|---|---|---|
| tiny | CPU | 203,4 mp | 0,19 | ~5,2× |
| tiny | CUDA | 73,4 mp | 0,07 | ~14,5× |
| small | CPU | 539,6 mp | 0,51 | ~2,0× |
| small | CUDA | 100,9 mp | 0,09 | ~10,5× |
| medium | CUDA | 275,2 mp | 0,26 | ~3,9× |
| medium | CPU | 1292,6 mp | 1,22 | ~0,82× |

**Összesített (3 fájl, ~57 perc)**

| Modell | Eszköz | Össz. idő | Átl. RTF | Átl. sebesség |
|---|---|---|---|---|
| tiny | CPU | 604,3 mp | 0,18 | ~5,6× |
| tiny | CUDA | 217,0 mp | 0,06 | ~15,7× |
| small | CPU | 1836,7 mp | 0,54 | ~1,9× |
| small | CUDA | 515,3 mp | 0,15 | ~6,6× |
| medium | CUDA | 782,9 mp | 0,23 | ~4,4× |
| medium | CPU | 4141,3 mp | 1,22 | ~0,82× |

### 2. gép összehasonlítás (i7-6820HQ, CPU-only)

| Modell | Össz. idő | Átl. RTF | Átl. sebesség |
|---|---|---|---|
| tiny (CPU) | 358,0 mp | 0,11 | ~9,5× |
| small (CPU) | 1520,5 mp | 0,45 | ~2,2× |

---

## Tévesztett szavak részletesen

### small (CUDA) — TQS: 96/100

| Szó | Előfordulás | Fájl |
|---|---|---|
| `qttxx` | 1× | Káoszból… |
| `shdxx` | 1× | Mérnöki… |
| `kryptogr` | 1× | Mérnöki… |

**Összesen: 3 db értelmetlen szó ~57 perc alatt.**

### medium (CUDA) — TQS: ~88/100

Névtévesztések: „Clodeir-ra" (→ Claude-ra), „CSEK 4" (→ Check 4), „BI Docks" (→ BA Docs)
Garbled frázisok: „tudadazogatab.ms kifájlokat", „kivan tolt fe", „BAP-arancsot"
Lexikális hibák: „nyerk is", „codesort", „anyens logokkal"

**Összesen: ~35–40 torzítás ~57 perc alatt. Nincs ismétlési loop.**

### medium (CPU) — TQS: ~80/100

**Kritikus:** 28× ismétlési hurok a Káoszból-fájlban [1313,6s → 1340,5s] — ~27 mp tartalom elveszett.
Egyéb torzítások: ~30 db, hasonló a medium CUDA-hoz, de gyengébb minőség.

### tiny (CUDA/CPU) — TQS: ~65/100

~50+ hallucinált/torzított szó. Kevert nyelvű hallucinációk (`jönlárikik of meeting`), értelmetlen szóösszetételek (`mekképposztrásítottátok`), kódnév-félreismerések. **Csak vázlatos feladatokhoz alkalmas.**

---

## Rövid szegmensek összehasonlítása

| Modell | <2 mp szegmensek | Értelmezés |
|---|---|---|
| tiny | 92 db | Instabilitás, zajos felismerés |
| small | 3 db | Stabil, normális |
| medium (CPU) | ~62 db | Részben a 28× loop következménye |

---

## Hardver-ajánlások

**GPU-val (CUDA):**
- **small (CUDA)** — legjobb sebesség/minőség arány. TQS 96/100, ~6,6× real-time. ✔ Alapértelmezett ajánlás.
- **medium (CUDA)** — precíziósabb feladatokhoz. TQS ~88/100, ~4,4× real-time (~52%-kal lassabb a small-nál).

**CPU-n (GPU nélkül):**
- **small (CPU)** — ha a minőség fontos. TQS ~96/100, ~1,9–2,2× real-time (~30 perc alatt végez 57 perc hanggal).
- **tiny (CPU)** — ha a sebesség számít. TQS ~65/100, ~5,6–9,5× real-time.
- **medium (CPU) kerülendő** — RTF > 1 (lassabb valós időnél), loop-hallucináció kockázat, ~69 perc 57 perc hanghoz.

---

## Modell letöltési méretek

Az első futtatáskor a modell automatikusan letöltődik (internet szükséges). Utána offline is működik.

| Modell | Letöltési méret |
|---|---|
| tiny | ~74 MB |
| base | ~141 MB |
| small | ~244 MB |
| medium | ~769 MB |
| large-v3 | ~3 GB |

---

## Telepítési szükségletek

Lásd: [4. Telepítési útmutató → 3.4 Hangátirat-függőségek](ch04-installation.md#34-hangátirat-függőségek-opcionális)

---

*Adatok forrása: `whisr/whisr/performance.md` és `whisr/whisr/quality_report.md` — batch futtatás 3 magyar nyelvű m4a fájlon, 2026. május 30.*
