# memory-agent

> A memóriakezelő: minden más agent ezen keresztül ír és olvas a `.claude/memory/` mappába. Nem végez elemzést — kizárólag adatkezelést.

[English version](memory-agent.en.md)

---

## Szerepe a workflow-ban

A `memory-agent` a BA Team perzisztens memóriájának kapuőre. Egyetlen agent sem olvasha vagy írhat közvetlenül a `.claude/memory/` mappába — minden memória-művelet a `memory-agent`-en keresztül zajlik. Ez garantálja a konzisztens formátumot és megakadályozza a véletlen felülírásokat.

## Mikor aktiválódik?

Minden más agent hívja, amikor memória-műveletre van szükség:
- `ba-orchestrator` — memóriabetöltéshez minden futás elején
- `spec-builder-agent` — specifikáció mentésekor
- `ba-document-agent` — kérdések archiválásakor
- `discovery-agent` — discovery kimenet mentésekor
- Közvetlenül a `/memory-handler` skill által is meghívható

## Elérhető műveletek

| Művelet | Leírás |
|---|---|
| `LOAD` | Beolvassa az összes BA memóriafájlt — csak `status: active` sorokat (token-hatékony) |
| `LOAD_ALL` | Beolvassa az összes sort, archivált bejegyzésekkel együtt — csak audit/reset esetén |
| `LOAD_CONVERSION_LOG` | Visszaadja a konverziós napló tartalmát |
| `STORE` | Új bejegyzést fűz hozzá a megadott fájlhoz (`status: active`) |
| `QUERY` | Célzott lekérdezés egy vagy több memóriafájlból |
| `MEMORY_UPSERT` | Frissít vagy hozzáad egy sort; `status: archived` értékkel archiválható |
| `BATCH` | Több STORE vagy UPSERT egy hívásban (hatékonyabb, előnyben részesítendő) |

## Memóriafájlok

| Fájl | Tartalom |
|---|---|
| `PROJECT_CONTEXT.md` | Projekt neve, ügyfél, scope, érintett rendszerek |
| `STAKEHOLDERS.md` | Stakeholder lista szerepekkel |
| `DECISIONS.md` | Döntések naplója (DEC-XXX) |
| `RESOLVED_QUESTIONS.md` | Megválaszolt Q-XXX archívum |
| `DOMAIN_GLOSSARY.md` | Domain szakkifejezések |
| `RISKS.md` | Kockázatok és feltételezések |
| `CONVERSION_LOG.md` | Konvertált fájlok nyilvántartása |
| `AGENT_DECISIONS.md` | Orchestrator és spec-builder belső döntéseinek audit-logja |

## Archívum mechanizmus

Minden memóriatábla tartalmaz egy `Status` oszlopot (`active` / `archived`).
- **`LOAD`** — csak `active` sorokat ad vissza (kevesebb token, hosszú projekteken)
- **`LOAD_ALL`** — összes sort visszaadja (audit, reset célra)
- **`RESOLVED_QUESTIONS.md`** sorai automatikusan `archived` státuszra váltanak, miután a BA dokumentumok legenerálódtak

## Kapcsolódó komponensek

| Komponens | Kapcsolat |
|---|---|
| `ba-orchestrator` | QUERY-vel tölti be a memóriát futás elején |
| `spec-builder-agent` | BATCH STORE-ral menti a specifikáció eredményét |
| `ba-document-agent` | BATCH STORE-ral archiválja a megválaszolt kérdéseket |
| `discovery-agent` | STORE-ral menti a discovery kimenetét |
| `/memory-handler` skill | Közvetlen felhasználói memória-kezelés |