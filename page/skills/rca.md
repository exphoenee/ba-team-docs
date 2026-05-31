# `/rca` – Gyökérok-elemzés (RCA / Chain / IR)

[English version](README.en.md)

> Strukturált gyökéroklista alapján teljes oksági lánc elemzést, önfenntartó hurkok azonosítását és driver/tünet besorolást végez.

---

## Mire való?

Az `/rca` skill a BA munkafolyamat **önálló elemzési eszköze**. Segítségével megállapítható, hogy egy projekt problémái mögött valójában **hol érdemes beavatkozni** (driver gyökérokok) és hol csak a tünetek látszanak.

A skill a [Copilot RCA/Chain/IR Kézikönyv](../../devdocs/Copilot_RCA_Chain_IR_Prompt_Kézikönyv_BA_PM.pdf) módszertanát valósítja meg.

---

## Hogyan használd?

**A legtöbb esetben semmi előkészület nem szükséges** — ha már lefutott a `/ba` vagy `/discovery`,
az `/rca` automatikusan dolgozik azok kimenetéből.

**Automatikus trigger:** a `/ba` workflow automatikusan futtatja az RCA-t, ha ≥3 `[INFERRED:HIGH]`
feltételezés vagy ≥5 kockázat azonosítható a specifikációban.

**Manuális futtatás:**
```
/rca
/rca --quick      Gyorsabb: csak láncok + hurkok, IR mátrix nélkül
/rca --validate   Csak QA ellenőrzés meglévő RCA_Analysis.md-n
```

**Opcionális kiegészítő input (ha vannak extra gyökérokok a spec-en kívül):**
```
workflow/03_answers/rca_input.xlsx   ← opcionális Excel, convert_all automatikusan feldolgozza
```

---

## Mit csinál pontosan?

1. **Input gyűjtés** — `SPEC_OUTPUT.md` (A-XXX, RISK-XXX) + `Discovery_RAID.md` (RC-XXX) + opcionális Excel (`03_answers/rca_input*`)
2. **Összesítés és deduplikáció** — minden forrás elemei egyetlen listába kerülnek
4. **Gyökéroklista tisztítása** — csak megjelenítési javítás, tartalmi módosítás nélkül
5. **Közvetlen oksági kapcsolatok** — melyik ok váltja ki közvetlenül a másikat
6. **Chain_Long** — korlátlan mélységű oksági láncok Mermaid diagrammal
7. **Loop_Summary** — önfenntartó hurkok azonosítása + megszakítási pont
8. **IR_Mátrix** — N×N kapcsolatmátrix (1 = közvetlen, lánccal igazolt; 0 = nincs)
9. **IR_Elemzés** — driver index + Driver / Tünet / Köztes csomópont / Hurokerősítő besorolás
10. **QA riport** — 7 invariáns automatikus ellenőrzése
11. **Vezetői összefoglaló** — top driver okok + legkritikusabb hurkok + megszakítási pont

---

## Mit állít elő?

**`workflow/05_ba_docs/RCA_Analysis.md`** — teljes elemzés:

| Szekció | Tartalom |
|---|---|
| Gyökéroklista | Sorszámozott, tisztított lista |
| Közvetlen kapcsolatok | Forrás → okozott táblázat |
| Chain_Long | Oksági lánc táblázat + Mermaid diagramok |
| Loop_Summary | Hurok táblázat + visszacsatoló diagram |
| IR_Mátrix | N×N kapcsolatmátrix |
| IR_Elemzés | Driver index + Javasolt szerep minden okhoz |
| QA Riport | 7 invariáns ellenőrzési eredménye |
| Vezetői összefoglaló | 3–5 mondatos döntéstámogató értékelés |

---

## Kapcsolat a `/ba` workflow-val

Az `/rca` **önálló skill** — nem kell a teljes BA workflow-t futtatni. De ha futtatod, az eredmény beépül:

- A `RAID_Log.md` `Szerep` mezője automatikusan kitöltődik az IR_Elemzés alapján
- A driver gyökérokok segítenek prioritizálni a FR-eket

---

## Mikor nem csinál semmit?

- Ha sem `SPEC_OUTPUT.md`, sem `Discovery_RAID.md`, sem `03_answers/rca_input*` nincs meg → hibaüzenet + útmutató
- Ha a merged lista < 3 elem → folytatódik, de figyelmeztetéssel

---

## Kapcsolódó skillek

| Skill | Kapcsolat |
|---|---|
| `/ba` | Analysis fázis — az RCA elemzés a RAID_Log Szerep mezőit gazdagítja |
| `/discovery` | Discovery fázis — az `/rca` után a gyökérok összefoglaló pontosabbá válik |
| `/business-analyst` | BA dokumentumok — ha RCA_Analysis.md létezik, a RAID_Log automatikusan veszi át |