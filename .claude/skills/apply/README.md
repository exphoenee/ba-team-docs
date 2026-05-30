# /apply – Feature Request implementálása

> Végrehajt egy jóváhagyott fejlesztési igényt: létrehozza az új fájlokat, módosítja a meglévőket, frissíti a dokumentációt, és jelöli a haladást a feature request TODO listájában.

## Mire való?

A `/self-dev` paranccsal rögzített és jóváhagyott fejlesztési igényeket a `/apply` parancs valósítja meg. Beolvassa az `app/featureRequests/` mappában tárolt feature request dokumentumot, végigmegy a TODO checklistán, és elvégzi az összes szükséges módosítást — új skilleket, agenteket hoz létre, meglévő fájlokat frissít, dokumentációt szinkronizál.

Minden elvégzett lépés után frissíti a feature request TODO listáját (`[ ]` → `[x]`), és amikor minden elkészült, a státuszt `Kész ✅`-re állítja.

## Hogyan használd?

```
/apply
/apply app/featureRequests/2026-05-30_check-state-inline-skill.md
```

Argumentum nélkül megmutatja az összes implementálásra váró feature requestet és megkérdezi, melyiket kezdje el.

## Mit csinál pontosan?

1. Beolvassa a feature request fájlt és a TODO checklistát
2. Státuszt átírja: `Implementálás folyamatban`
3. Minden TODO elemhez elvégzi a változtatást (új fájl létrehozása vagy meglévő módosítása)
4. Minden elvégzett lépés után azonnal bejelöli a checkboxot (`[x]`)
5. Frissíti az app belső dokumentációját (HANDBOOK, AGENTS.md, docs routes, sidebar)
6. Ha minden `[x]`: státuszt átírja `Kész ✅`-re
7. Összefoglalja az elvégzett munkát

## Mikor nem csinál semmit?

- Ha a feature request státusza `Elemzés kész — jóváhagyásra vár` — jóváhagyás szükséges előbb
- Ha a feature request státusza már `Kész ✅` — már implementálva van
- Ha nincs unchecked TODO elem a fájlban

## Kapcsolódó skillek

| Skill | Mikor használd |
|---|---|
| `/self-dev` | Feature request rögzítése és elemzése — ezt kell előbb futtatni |
| `/help` | Ha kérdésed van a feature request folyamatával kapcsolatban |
