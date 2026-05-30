# 18. Teljesítmény-referencia

**Mikor használd ezt a fejezetet:** Ha meg szeretnéd becsülni, mennyi ideig tart egy `/ba` futtatás és mennyi tokent fog felhasználni.

---

## Becslési irányelvek

| Projekt méret | Input fájlok | Becsült FR/NFR | Spec-builder | BA doc-generálás | Összes token (kb.) |
|---|---|---|---|---|---|
| **Kis projekt** | ≤ 5 fájl | ≤ 20 FR | ~1–2 perc | ~3–5 perc | ~30–60K |
| **Közepes projekt** | 10–20 fájl | 50–100 FR | ~3–5 perc | ~8–15 perc | ~80–150K |
| **Nagy projekt** | 20+ fájl | 100+ FR | ~5–10 perc | ~15–30 perc | ~150–250K+ |
| **V2 inkrementális** | 1–3 változott fájl | +5–15 új FR | ~1–2 perc | ~3–8 perc (szelektív) | ~20–60K |

> ⚠️ **Fontos:** Ezek becsült értékek. A valódi futási idő és token-felhasználás függ a modell terhelésétől, a bemeneti fájlok komplexitásától és az internet-sebességtől.

---

## Mért referencia — SZBKI projekt (2026-05-18)

| Futás | Fájlok | FR count | Futási idő | Token |
|---|---|---|---|---|
| V1 — teljes spec + BA doc | 7 fájl | 47 FR | ~34,9 perc | ~159K |
| V2 — inkrementális (+2 fájl) | 2 változott | +11 FR | ~12 perc | ~61K |

**Megfigyelések:**
- A spec-builder az inkrementális futásban a teljes újraszerkesztés ~35%-ának tokenjét használta.
- A ba-document-agent V1→V2 rebuild az összes dokumentumot újragenerálta (OB-26 impact-alapú regenerálás ezt ~40–60%-kal csökkentheti).
- Az image-alapú inputok (`.png`, `.jpg`) a szövegfájlokhoz képest ~3× több tokent igényelnek.

---

## Token-korlátok és teendők

| Becsült input | ba-orchestrator figyelmeztetése | Javasolt teendő |
|---|---|---|
| ≤ 60K token | Nincs figyelmeztetés | Normál futtatás |
| 60K – 100K token | ⚠️ Nagy input — bontás javasolt | Prioritizáld a legfontosabb fájlokat |
| > 100K token | ❌ Valószínű kontextuskorlát | Bontsd két futásra; legfontosabb 10–15 fájl elsőként |

### Hogyan csökkentsd a token-terhelést?

1. **Konvertált fájlok törlése nem-releváns részeiből** — ha egy 50 oldalas PDF-ből csak 3 oldal releváns, szerkeszd le a `_converted.md` fájlt.
2. **Prioritizálás** — a legfontosabb 5–10 fájl általában a releváns FR-ek 80%-át lefedi.
3. **Inkrementális futtatás** — az első `/ba` után csak az új fájlokat add hozzá; ne töröld a meglévőket.
4. **Kép fájlok** — ha az image-ből kinyerhető szöveg már rendelkezésre áll más formátumban, ne küld be a képet is.

---

## Teljesítmény-tippek

- **Stop hook** — a `workflow_state.py` Stop hook minimális overhead-del fut (< 1 másodperc); nem befolyásolja a futási időt.
- **Memory agent** — a memória-betöltés (~0,5–1 másodperc); a LOAD_CONVERSION_LOG a legnagyobb fájl, de ritkán szükséges teljes betöltése.
- **Inkrementális vs. teljes rebuild** — a spec-builder automatikusan detektálja: csak az új/változott fájlokat dolgozza fel. Teljes rebuild csak törölt fájl vagy első futás esetén.
- **OB-26 szelektív doc-regenerálás** — ha csak 1–2 FR változott, a ba-document-agent csak az érintett dokumentumokat írja újra. Ez 40–60% token-megtakarítást jelent közepes projekteknél.
