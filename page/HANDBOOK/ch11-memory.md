# 10. A hosszú távú memória

A BA Team egyik legfontosabb képessége az intelligens memóriakezelés. A `.claude/memory/` mappában tárolt fájlok biztosítják, hogy a projekt kontextusa munkamenetek között is megmaradjon.

## Mi kerül a memóriába?

**Projekt kontextus (`PROJECT_CONTEXT.md`):** Projekt neve, ügyfél, scope, rendszerek, fázis.

**Stakeholderek (`STAKEHOLDERS.md`):** Érintett személyek neve és szerepe.

**Döntések (`DECISIONS.md`):** Minden naplózott döntés DEC-XXX azonosítóval, indoklással.

**Megválaszolt kérdések (`RESOLVED_QUESTIONS.md`):** Az összes megválaszolt Q-XXX archívuma.

**Szakkifejezések (`DOMAIN_GLOSSARY.md`):** Projektspecifikus szókincs, rövidítések.

**Kockázatok (`RISKS.md`):** Azonosított kockázatok és feltételezések (A-XXX).

**Ügynök döntések (`AGENT_DECISIONS.md`):** Belső orchestrátor és spec-builder döntések auditnaplója.

## Mikor frissül automatikusan?

| Esemény | Mit ment |
|---|---|
| Spec elkészül | Projekt kontextus, stakeholderek, kockázatok |
| Q-XXX megválaszolva | Kérdés és válasz az archívumba |
| Döntés születik | Döntés és indoklás naplózva |
| BA doc elkészül | Domain szószedet, RAID Log kockázatai |

## Archívum mechanizmus

Minden memória tábla tartalmaz egy `Status` oszlopot:
- `active` – Az AI figyelembe veszi a betöltéskor
- `archived` – Rejtett, de nem törölt

**Automatikus archiválás:** A `RESOLVED_QUESTIONS.md` sorai automatikusan `archived` státuszba kerülnek a BA dokumentumok sikeres generálása után.

**Minden adat megmarad:** Az archivált bejegyzések nem törlődnek – `LOAD_ALL` protokollal bármikor lekérdezhetők.

## Fontos szabály: csak bővítés, soha törlés

A memória fájlok kizárólag bővülhetnek – az AI soha nem töröl belőlük. Ez biztosítja az audit-kész dokumentációt.
