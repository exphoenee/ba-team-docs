# 3. Teljesítmény-referencia

**Mikor használd ezt a fejezetet:** Ha meg szeretnéd becsülni, mennyi ideig tart egy `/ba` futtatás, mennyi tokent fogyaszt és mennyi emberi munkát spórolsz meg.

---

## 1. Becslési irányelvek

| Projekt méret | Input fájlok | Becsült FR/NFR | Spec-builder | BA doc-generálás | Összes token (kb.) |
|---|---|---|---|---|---|
| **Kis projekt** | ≤ 5 fájl | ≤ 20 FR | ~1–2 perc | ~3–5 perc | ~30–60K |
| **Közepes projekt** | 10–20 fájl | 50–100 FR | ~3–5 perc | ~8–15 perc | ~80–150K |
| **Nagy projekt** | 20+ fájl | 100+ FR | ~5–10 perc | ~15–30 perc | ~150–250K+ |
| **Inkrementális** | 1–3 változott fájl | +5–15 új FR | ~1–2 perc | ~3–8 perc (szelektív) | ~20–60K |

> ⚠️ **Fontos:** Ezek becsült értékek. A valódi futási idő és token-felhasználás függ a modell terhelésétől, a bemeneti fájlok komplexitásától és az internet-sebességtől.

---

## 2. Valós tesztek összesített statisztikája

Az alábbi adatok anonimizált, valós projekteken mért értékek.

| Teszt | Fázis | Generált doksik | Tokenek (össz.) | Tool hívások | Futásidő | Becsült compute-költség |
|:---|:---|---:|---:|---:|---:|---:|
| **A** | Teljes BA workflow (discovery → analysis) | 11 | 416 994 | 220 | 68 perc | ~$3,50 |
| **B** | BA dokumentum generálás (v1) | 9 | 583 756 | 311 | 164 perc\* | ~$3,15–$3,86 |
| **C** | BA dokumentum generálás (v2) | 9 | 263 256 | 167 | 35 perc | ~$1,73 |
| **D** | Discovery fázis (6 iteráció) | 3 | 701 401 | 258 | 74 perc | ~$4,21 |
| | **Mindösszesen** | **32** | **~1,96M** | **956** | **~5,6 óra** | **~$12,60–$13,30** |

\* Teszt B: 100 perces FIGMA képfeldolgozási outlier nélkül 63 perc tényleges feldolgozási idő.

---

## 3. Token-felhasználás részletesen

| Teszt | Feladat | Tokenek | Ebből produktív | Eredmény |
|:---|:---|---:|---:|:---|
| **A** | Spec-building (5 futás) | 320 972 | ✅ | Kérdéskinyerés + specifikáció |
| | BA doc generálás | 84 622 | ✅ | 11 BA dokumentum |
| | Állapot-ellenőrzés (felesleges) | 96 062 | ❌ | Stackelt várakozás |
| **B** | Spec-building (5 futás) | 491 074 | ✅ | 5 iterációban |
| | BA doc generálás (1 futás) | 92 682 | ✅ | 9 dokumentum egyben |
| **C** | Várakozás-riport (4 futás) | 167 687 | ❌ | 63,7% — felesleges ciklus |
| | Produktív generálás (1 futás) | 95 569 | ✅ | 9 doksi + 13 diagram |
| **D** | 6 inkrementális futás | 701 401 | ✅ | 3 discovery dokumentum |

### Tokenhatékonyság (dokumentumonként)

```
Teszt C ─████████████████████ 29 300 token/doc  ← legjobb
Teszt A ─███████████████████████████████████ 37 900
Teszt B ─████████████████████████████████████████████████████ 64 900
Teszt D ─███████████████████████████████████████████████████████████████████████████████████████ 233 800 ← discovery
```

---

## 4. Emberi idő vs. AI idő — Megtakarítás

| Teszt | AI futásidő | Emberi baseline (becsült) | Megtakarítás | Compute költség |
|:---|---:|---:|---:|---:|
| **A** — Teljes BA workflow | ~1,1 óra | 3–5 nap (24–40 óra) | **~96–97%** | ~$3,50 |
| **B** — BA generálás v1 | ~2,7 óra | 3–5 nap (24–40 óra) | **~89–93%** | ~$3,15–$3,86 |
| **C** — BA generálás v2 | ~0,6 óra | 1–2 nap (8–16 óra) | **~93–96%** | ~$1,73 |
| **D** — Discovery (6 iteráció) | ~1,2 óra | 3–5 nap (24–40 óra) | **~95–97%** | ~$4,21 |

**Konklúzió:** Egy komplett BA dokumentumcsomag (9–11 dokumentum) **~35 perc alatt, ~$1,70–$3,50** compute-költséggel előállítható. Ez **1–3 munkanapnyi szenior BA munkát** vált ki, **89–97%-os időmegtakarítással**.

---

## 5. Output minőség — Generált elemek

| Kimenet típusa | Teszt A | Teszt B | Teszt C | Teszt D |
|:---|---:|---:|---:|---:|
| BA dokumentum | 11 | 9 | 9 | — |
| Discovery dokumentum | — | — | — | 3 |
| Mermaid diagram | 9+ | 11 | 13 | — |
| Funkcionális követelmény (FR) | 17 | 21 | 22 | — |
| Nem-funkcionális követelmény (NFR) | 5 | 9 | 10 | — |
| User Story (US) | 6 | 11 | 14 | — |
| UAT teszteset (TC) | — | 10 | 12 | — |
| Üzleti követelmény (BR) | — | 6 | 7 | — |
| Azonosított kockázat (RISK) | 10 | 10 | 10 | 17 |
| Nyitott kérdés (Q) | 9/12 | 7 | 10/10 | 16 |
| Stakeholder | 6 | 5+ | — | 8 |
| Feltételezés (A) | — | 14 | — | 16 |
| Glossary szakkifejezés | — | 23 | 35 | — |
| Üzleti probléma (PROB) | — | — | — | 19 |
| Üzleti cél (GOAL) | — | — | — | 19 |
| MVP elem | — | — | — | 16 |

---

## 6. Költség/teljesítmény összefoglaló

| Mutató | Érték |
|:---|---:|
| Legalacsonyabb költség / dokumentumcsomag | **~$1,73** |
| Leggyorsabb teljes workflow | **35 perc** |
| Legjobb tokenhatékonyság | **~29 300 token / doc** |
| Emberi időmegtakarítás | **89–97%** |
| Átlagos compute költség / dokumentum | **~$0,19–$0,39** |
| Átlagos költség / követelményelem | **~$0,04–$0,06** |

---

## 7. Token-korlátok és teendők

| Becsült input | Figyelmeztetés | Javasolt teendő |
|---|---|---|
| ≤ 60K token | Nincs | Normál futtatás |
| 60K – 100K token | ⚠️ Nagy input — bontás javasolt | Prioritizáld a legfontosabb fájlokat |
| > 100K token | ❌ Valószínű kontextuskorlát | Bontsd két futásra; legfontosabb 10–15 fájl elsőként |

### Hogyan csökkentsd a token-terhelést?

1. **Konvertált fájlok törlése nem-releváns részeiből** — ha egy 50 oldalas PDF-ből csak 3 oldal releváns, szerkeszd le a `_converted.md` fájlt.
2. **Prioritizálás** — a legfontosabb 5–10 fájl általában a releváns FR-ek 80%-át lefedi.
3. **Inkrementális futtatás** — az első `/ba` után csak az új fájlokat add hozzá; ne töröld a meglévőket.
4. **Kép fájlok** — ha az image-ből kinyerhető szöveg már rendelkezésre áll más formátumban, ne küld be a képet is.

---

## 8. Teljesítmény-tippek

- **Stop hook** — a `workflow_state.py` Stop hook minimális overhead-del fut (< 1 másodperc); nem befolyásolja a futási időt.
- **Memory agent** — a memória-betöltés (~0,5–1 másodperc) elhanyagolható.
- **Inkrementális vs. teljes rebuild** — a spec-builder automatikusan detektálja: csak az új/változott fájlokat dolgozza fel. Teljes rebuild csak törölt fájl vagy első futás esetén.
- **Szelektív doc-regenerálás** — ha csak 1–2 FR változott, a ba-document-agent csak az érintett dokumentumokat írja újra. Ez 40–60% token-megtakarítást jelent közepes projekteknél.

---

*Megjegyzés: A compute-költségek API listaáron (input $3/MTok, output $15/MTok) becsült értékek, 70/30 input/output aránnyal számolva. A tényleges költség az alkalmazott árazási modelltől függ. Az emberi baseline szenior BA szakértői becslésen alapul.*