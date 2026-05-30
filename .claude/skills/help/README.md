# /help — BA Tool Súgó

> A BA Tool teljes súgórendszere: parancslista, projekt állapot, intelligens tanácsadás és dokumentumkeresés.

## Mire való?

A `/help` parancs segítségével átfogó segítséget kapsz a BA Tool használatához. Mutatja az összes elérhető parancsot, a projekt aktuális állapotát, és tanácsot ad a következő lépéshez. Kérdéseket is feltehetsz neki — a HANDBOOK-ból, a skill-ekből és az agent-ek dokumentációjából keres választ.

## Hogyan használd?

```
/help                  — Teljes súgó megjelenítése
/help <parancs>        — Részletes segítség egy adott parancshoz
/help <kérdés>         — Keresés a dokumentációban
```

**Példák:**

```
/help
/help ba
/help rca
/help hogyan adok hozzá új anyagokat
/help mi az a SPEC_OUTPUT
/help hogyan működik a discovery fázis
```

## Mit csinál pontosan?

1. **Argumentum detektálás** — ha parancsnevet kapsz, annak részletes leírását mutatja; ha kérdést, akkor a dokumentációban keres; ha üres, a teljes help-et
2. **Parancsok listázása** — felsorol minden elérhető parancsot rövid leírással
3. **Projekt állapot felmérése** — megnézi a workflow mappákat és meghatározza a fázist
4. **Tanácsadás** — a fázis alapján konkrét javaslatot ad a következő lépésre
5. **Keresés a dokumentációban** — ha kérdést írsz be, végignézi a HANDBOOK-ot, a skill-ek és agent-ek leírásait, és forráshivatkozással válaszol

## Mikor nem csinál semmit?

A `/help` mindig ad valamilyen választ. Ha nem talál releváns információt a keresett kérdésre, javaslatot ad más kulcsszavakra vagy a HANDBOOK megtekintésére.

## Kapcsolódó skill-ek

| Skill | Mikor használd helyette |
|---|---|
| `/check-state` | Ha csak a projekt állapotát szeretnéd gyorsan megnézni |
| `/session-loader` | Ha teljes munkamenetet szeretnél betölteni |
