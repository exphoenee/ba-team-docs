# 11. Speciális esetek kezelése

## Politikai és diplomáciai döntések

Ha egy stakeholder határozott álláspontot fejez ki, a rendszer:

1. **Explicit adatként rögzíti** – `[EXPLICIT]` jelzővel
2. **Ellentmondásként jelzi** – ha ütközik egy korábbi követelménnyel
3. **Q-XXX kérdést generál** – a tisztázásra váró pont megjelölésével
4. **Nem dönt helyetted** – az AI nem próbálja meg kitalálni a megoldást

A döntés a `DECISIONS.md` fájlba kerül DEC-XXX azonosítóval.

## Projekt irányváltás

**Automatikus:** Ha fájlokat törölsz a `01_project_info/` mappából, a spec-builder teljes újragenerálást végez.

**Manuális (memória):**
1. Nyisd meg a `.claude/memory/` mappát
2. Szerkeszd a megfelelő `.md` fájlokat
3. Töröld az elavult sorokat
4. Futtasd a `/session-loader` parancsot

**Irányváltás dokumentálása (ajánlott):**
Rögzítsd a döntést a `DECISIONS.md` fájlban.

## Ha nincs válaszod egy kérdésre

Három lehetőséged van:

1. **Feltételezés (A-XXX):** Írj logikus feltételezést, a rendszer továbblép, de jelöli a bizonytalanságot
2. **Kockázatként jelöld meg:** A RAID Log-ba kerül
3. **Soha ne írj TBD-t vagy N/A-t** – a rendszer gépileg ellenőrzi és visszautasítja
