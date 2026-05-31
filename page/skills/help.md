# /help — BA Tool Súgó

> A BA Tool teljes súgórendszere: parancslista, projekt állapot, intelligens tanácsadás és dokumentumkeresés.

## Mire való?

A `/help` parancs segítségével átfogó segítséget kapsz a BA Tool használatához. Mutatja az összes elérhető parancsot, a projekt aktuális állapotát, és tanácsot ad a következő lépéshez. Kérdéseket is feltehetsz neki — a HANDBOOK-ból, a skill-ekből és az agent-ek dokumentációjából keres választ, forráshivatkozással.

## Hogyan használd?

A `/help` parancsnak **három üzemmódja** van:

| Üzemmód | Használat | Mit csinál? |
|---|---|---|
| **Teljes súgó** | `/help` | Parancslista + projekt állapot + következő lépés javaslat |
| **Parancs specifikus** | `/help <parancs>` | Részletes leírás egy adott parancshoz (pl. `/help ba`, `/help rca`) |
| **Kérdés keresés** | `/help <kérdés>` | Keresés a HANDBOOK-ban, skill-ekben és agent-ekben, forráshivatkozással |

**Példák:**

```
/help                          — Teljes súgó
/help ba                       — Részletes segítség a /ba parancshoz
/help rca                      — Részletes segítség a /rca parancshoz
/help hogyan adok hozzá anyagokat — Keresés a dokumentációban
/help mi az a SPEC_OUTPUT      — Keresés a dokumentációban
/help hogyan működik a discovery — Keresés a dokumentációban
```

### Kérdés keresés részletesen

Ha nem parancsnevet, hanem szabad szöveges kérdést adsz meg, a `/help` a következő forrásokból keres:

| Prioritás | Forrás |
|---|---|
| 1 | `app/HANDBOOK/` — fejezetfájlok a kérdés kulcsszavai alapján |
| 2 | `app/.claude/skills/*/SKILL.md` — skill utasításfájlok |
| 3 | `app/.claude/agents/*.md` — agent fájlok |
| 4 | `app/.claude/skills/*/README.md` — felhasználói leírások |
| 5 | Hibaelhárítás / GYIK források |

Minden állítás **forráshivatkozással** jelenik meg, pl. `[Forrás: app/HANDBOOK/ch06-workflow.md]` vagy `[Forrás: extraction-agent.md]`.

## Mit csinál pontosan?

1. **Argumentum detektálás** — felismeri, hogy parancsnevet, kérdést vagy semmit adtál meg
2. **Parancsok listázása** — felsorol minden elérhető parancsot rövid leírással (csak `/help` módban)
3. **Projekt állapot felmérése** — megnézi a workflow mappákat és meghatározza a fázist (`check_state_protocol.md` alapján)
4. **Tanácsadás** — a fázis alapján konkrét javaslatot ad a következő lépésre
5. **Keresés a dokumentációban** — ha kérdést írsz be, prioritási sorrendben végignézi a HANDBOOK-ot, a skill-ek és agent-ek leírásait, és forráshivatkozással válaszol

## Fontos tudnivalók

- A `/help` **soha nem indít agent-eket** — csak fájlokat olvas és jelent
- A `/help` **soha nem módosít fájlokat** a workflow mappákban
- A `/help` **mindig ad választ** — ha nem talál releváns információt, javaslatot ad más kulcsszavakra vagy a HANDBOOK megtekintésére
- A `/help <kérdés>` funkció automatikusan kiszűri a magyar kérdőszavakat (hogyan, mi az, mit, miért, hol, ki, milyen, lehet-e)

## Kapcsolódó skill-ek

| Skill | Mikor használd helyette |
|---|---|
| `/check-state` | Ha csak a projekt állapotát szeretnéd gyorsan megnézni |
| `/session-loader` | Ha teljes munkamenetet szeretnél betölteni |
