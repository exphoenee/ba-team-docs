# `/memory-handler` – Perzisztens Memória Kezelő

[English version](README.en.md)

## Mire való?

A `/memory-handler` skill a BA workflow **hosszú távú memóriáját** kezeli. Gondoskodik arról, hogy az egyik munkamenetben megtanult dolgok — döntések, stakeholder adatok, megválaszolt kérdések, domain szakkifejezések, kockázatok — a következő munkamenetben is elérhetők legyenek.

A memória fájlok formájában él a `.claude/memory/` mappában. Más skillek és ügynökök nem írnak közvetlenül ezekbe a fájlokba — mindig a memory-handler protokollján keresztül kommunikálnak.

> **Megjegyzés:** Általában nem kell közvetlenül meghívni — a `/ba` skill automatikusan betölti és frissíti a memóriát minden munkamenet elején és végén.

---

## A memória fájlok

| Fájl | Mit tárol |
|---|---|
| `PROJECT_CONTEXT.md` | Projekt neve, ügyfél, scope, érintett rendszerek, fázis |
| `STAKEHOLDERS.md` | Érintett személyek listája szerepekkel |
| `DECISIONS.md` | Meghozott döntések naplója (DEC-XXX azonosítóval) |
| `RESOLVED_QUESTIONS.md` | Megválaszolt Q-XXX kérdések archívuma |
| `DOMAIN_GLOSSARY.md` | Projektspecifikus szakkifejezések |
| `RISKS.md` | Azonosított kockázatok és feltételezések |
| `SPEC_LOG.md` | Bemeneti fájlok SHA-256 ujjlenyomata és generált ID-k (spec-builder kezeli) |
| `CONVERSION_LOG.md` | Konvertált fájlok nyilvántartása SHA-256-tal (convert_all Python csomag írja) |

---

## Hogyan töltik fel más ügynökök?

Amikor egy másik skill vagy ügynök adatot akar tárolni, az alábbi üzenetformátumot használja:

```
MEMORY_STORE:
  target: DECISIONS
  id: DEC-001
  content: "Az autentikációt OAuth2-vel oldjuk meg, saját login oldal nem lesz."
  source: ba-agent
  date: 2026-05-12
```

Vagy kötegelt mentéshez:

```
MEMORY_BATCH:
  - OPERATION: STORE
    target: PROJECT_CONTEXT
    ...
  - OPERATION: STORE
    target: STAKEHOLDERS
    ...
```

A memory-handler feldolgozza az üzenetet és visszaigazolja:
```
✅ MEMORY_STORED: DECISIONS / DEC-001
```

---

## Hogyan kérdezhetik le más ügynökök?

A tokenköltségek csökkentése érdekében javasolt csak a szükséges fájlok lekérése:

```
MEMORY_QUERY: target=PROJECT_CONTEXT,STAKEHOLDERS
MEMORY_QUERY: target=DECISIONS
MEMORY_QUERY: target=RESOLVED_QUESTIONS, filter=Q-003
MEMORY_QUERY: target=all
```

---

## Mikor történik automatikus mentés?

| Esemény | Mit ment | Melyik fájlba |
|---|---|---|
| Spec elkészül | Projekt neve, scope, rendszerek | `PROJECT_CONTEXT.md` |
| Spec elkészül | Azonosított stakeholderek | `STAKEHOLDERS.md` |
| Spec elkészül | Azonosított kockázatok | `RISKS.md` |
| Q-XXX megválaszolva | Kérdés és válasz archívuma | `RESOLVED_QUESTIONS.md` |
| Döntés születik | Döntés szövege és indoklása | `DECISIONS.md` |
| BA doc elkészül | Domain szakkifejezések | `DOMAIN_GLOSSARY.md` |
| BA doc elkészül | RAID Log kockázatai | `RISKS.md` |

---

## Fontos szabályok

- A memória fájlok csak bővülhetnek — meglévő tartalom soha nem törlődik
- Az első `/ba` futtatáskor a fájlok automatikusan létrejönnek, ha még nem léteznek
- A memória különböző projektfázisokon és munkameneteken át megmarad
- Ideiglenes, csak az aktuális munkamenetre vonatkozó adatokat nem kell ide menteni

---

## Manuális használat

Ha szeretnéd átnézni vagy kézzel módosítani a memória tartalmát, nyisd meg a `.claude/memory/` mappában lévő fájlokat bármelyik szövegszerkesztővel — ezek egyszerű Markdown táblázatok.

---

## Kapcsolódó skillek

| Skill | Kapcsolat |
|---|---|
| `/ba` | Minden futásnál betölti és frissíti a memóriát |
| `/session-loader` | A betöltés során összegzi a memória tartalmát |
| `/business-analyst` | Döntéseket és szakkifejezéseket ment ide |
| `/spec-builder` | Stakeholdereket, kockázatokat és kontextust ment ide |
