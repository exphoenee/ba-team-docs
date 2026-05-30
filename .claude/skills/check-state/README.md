# /check-state — Projekt állapotfelmérés

> Gyors áttekintés a projekt aktuális fázisáról, a meglévő fájlokról és a hiányzó lépésekről.

## Mire való?

A `/check-state` parancs segítségével bármikor gyorsan megnézheted, hogy a BA projekt melyik fázisban jár, milyen fájlok készültek el eddig, és mi a következő teendő. A `/session-loader`-rel ellentétben ez a parancs nem tölt be munkamenetet és nem dispatchel agenteket — csak gyors állapotellenőrzésre szolgál.

## Hogyan használd?

```
/check-state
```

## Mit csinál pontosan?

1. **Megvizsgálja a workflow mappákat** — megnézi, mi van a `01_project_info/`, `02_discovery/`, `03_answers/`, `04_decisions/` és `05_ba_docs/` mappákban
2. **Meghatározza a projekt fázisát** — Üres / Discovery / Spec-készítés / Válaszadás / Dokumentum-generálás / Kész / FORCED függőben
3. **Listázza a nyitott Q-XXX kérdéseket** — ha van spec, megmutatja a megválaszolatlan kérdéseket
4. **Strukturált riportot jelenít meg** — a megtalált állapot alapján

## Mikor nem csinál semmit?

A parancs mindig fut és mindig ad valamilyen választ — akkor is, ha a projekt üres.

## Kapcsolódó skill-ek

| Skill | Mikor használd helyette |
|---|---|
| `/session-loader` | Ha teljes munkamenetet szeretnél betölteni (lassabb, de részletesebb) |
| `/help` | Ha a projekt állapota mellett a teljes parancslistát és tanácsot is szeretnél |
