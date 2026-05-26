# `/discovery` – Discovery Fázis Támogató

[English version](README.en.md)

## Mire való?

A `/discovery` skill a BA munkafolyamat **Discovery fázisának** belépési pontja. Korai, hiányos vagy
éppen csak összeálló projektanyagokból — Sales handover, első meeting jegyzetek, ügyfél email-ek —
**strutktúrált Discovery dokumentumcsomagot** állít elő, amellyel a BA azonnal munkába tud állni.

Ellentétben a `/ba` paranccsal, a `/discovery` **soha nem áll meg megválaszolatlan kérdések miatt** —
a jól strukturált kérdéslista épp annyira értékes output a Discovery fázisban, mint a válaszok.

---

## Hogyan használd?

Másold be az anyagokat a `workflow/01_project_info/` mappába, majd a Claude panelen írd be:

```
/discovery
```

Ennyi. A discovery-agent feldolgozza az anyagokat és előállítja a teljes Discovery csomagot.

---

## Mit generál?

A discovery-agent a `workflow/02_discovery/` mappába menti a kimeneteit:

| Fájl | Tartalom |
|---|---|
| `BC.md` | Business Concept — a Discovery fázis fő deliverable-je |
| `Discovery_RAID.md` | Korai RAID — kockázatok, feltételezések, nyitott problémák |
| `Discovery_Questions.md` | Meeting-ready kérdéslista kategóriák szerint |
| `_system/DISCOVERY_OUTPUT.md` | Strukturált közbenső spec (a fenti dokumentumok alapja) |

### Business Concept (BC.md) struktúra

```
1. Üzleti probléma és gyökérok     [Mermaid diagram kötelező]
2. Üzleti célok                    [Mérhető eredménnyel]
3. Megoldási scope                 [In scope / Out of scope, Mermaid diagram]
4. MVP definíció                   [Must-have elemek]
5. Feltételezések és kockázatok    [Korai RAID összefoglaló]
6. Nyitott kérdések                [Q-XXX lista kategória szerint]
7. Következő lépések
```

Ha megválaszolatlan kérdések vannak, a BC.md tetején megjelenik:
```
⚠️ VÁZLAT — N nyitott kérdés. Részleteket lásd: Discovery_Questions.md
```

### Discovery_Questions.md — Meeting-ready kérdéslista

A kérdések kategória szerint rendezve, javasolt tárgyalási sorrendben:

```
STAKEHOLDER kérdések → SCOPE kérdések → MVP kérdések → FEASIBILITY/Technikai kérdések
```

| Kategória | Mikor kap ilyen jelzést |
|---|---|
| `[SCOPE]` | Határ nem tiszta — mi van benne, mi nincs |
| `[MVP]` | MVP definíció hiányos, must-have lista nem meghatározott |
| `[FEASIBILITY]` | Megvalósíthatóság kérdéses — technikai vagy üzleti akadály lehetséges |
| `[STAKEHOLDER]` | Döntéshozó ismeretlen, jóváhagyó személy nincs azonosítva |
| `[TECHNICAL]` | Technikai feltétel ismeretlen — rendszer, integráció, API |

---

## Ajánlott inputok

A discovery-agent bármilyen szöveges anyagból dolgozik, de ezek a sablonok a leghatékonyabb kimenetet adják:

| Sablon | Helye | Mire való |
|---|---|---|
| Sales → PM/BA Handover | `.claude/references/templates/handover_template.md` | Strukturált Sales átadás |
| Discovery Meeting Notes | `.claude/references/templates/discovery_meeting_template.md` | Meeting lejegyzés |

A sablonokat kimásolhatod a fenti helyekről, kitöltöd, majd bemásolod a `workflow/01_project_info/` mappába.

---

## Discovery vs. `/ba` — mikor melyiket?

| | `/discovery` | `/ba` |
|---|---|---|
| Fázis | Discovery — korai, hiányos anyag | Analysis — részletes, strukturált anyag |
| Blokkolás Q-XXX-en? | **Nem** — mindig generál | **Igen** — megáll, ha Q-XXX nyitott |
| Kimenet mélysége | Magas szintű: probléma, célok, scope, MVP | Részletes: FR/NFR/US követelmények |
| Dokumentumok | BC.md, Discovery_RAID.md, Discovery_Questions.md | BRD, User_Stories, Process_Flows, RAID_Log, Glossary, Traceability_Matrix |

---

## Tipikus munkafolyamat

```
1. Sales handover anyag → workflow/01_project_info/
2. /discovery → BC.md V1 + Discovery_Questions.md
3. Meeting az ügyféllel → válaszok → workflow/03_answers/
4. /discovery → BC.md V2 (frissített, kevesebb nyitott kérdés)
5. Discovery lezárva → /ba → BRD + User Stories + ...
```

---

## Kapcsolódó skillek

| Skill | Kapcsolat |
|---|---|
| `/ba` | Az Analysis fázis belépési pontja — Discovery lezárása után ezt futtatd |
| `/convert` | Office/PDF fájlok konvertálása — `/discovery` automatikusan futtatja |
| `/session-loader` | Projekt állapot ellenőrzése — melyik fázisban vagy? |
| `/memory-handler` | Discovery során kinyert stakeholderek és kockázatok megtekintése |
