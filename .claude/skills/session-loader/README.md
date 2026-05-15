# `/session-loader` – Munkamenet Betöltő

[English version](README.en.md)

## Mire való?

A `/session-loader` skill minden munkamenet elején megmutatja, **hol tart pontosan a projekt** — anélkül, hogy a mappákat kézzel kellene végignézni vagy emlékezni kellene arra, hol hagytad abba a munkát.

Beolvassa a workflow mappák aktuális állapotát és a projekt memóriáját, majd egy strukturált összefoglalóban megjeleníti a legfontosabb információkat és a javasolt következő lépést.

---

## Hogyan használd?

Minden munkanap elején, amikor megnyitod a projektet VS Code-ban, írd be a Claude panelen:

```
/session-loader
```

---

## Mit mutat?

### Projekt információ
A `.claude/memory/PROJECT_CONTEXT.md` alapján megjeleníti a projekt nevét, az ügyfelet és az aktuális fázist.

### Memória összefoglaló
Megmutatja, mennyi adat gyűlt össze a memóriában:
- Hány döntés van naplózva
- Hány Q-XXX kérdés van megválaszolva az archívumban
- Hány stakeholder van azonosítva
- Hány domain szakkifejezés van definiálva

### Workflow állapot
Pontosan megmutatja, mi van az egyes mappákban:

```
============================================================
  BA WORKFLOW – SESSION LOADER
  2026-05-12 09:15
============================================================

  PROJEKT
  Név:    Biztosítási Portál Fejlesztés
  Ügyfél: XY Biztosító Zrt.
  Fázis:  Requirements

  MEMÓRIA ÖSSZEFOGLALÓ
  Döntések:                5
  Megválaszolt kérdések:  12
  Stakeholderek:           4
  Domain szakkifejezés:    8

  WORKFLOW ÁLLAPOT
  [01] Bemeneti anyagok:  3 fájl
       • meeting_2026_05_10.md
       • email_thread.md
       • workshop_notes.md
  [01] SPEC_OUTPUT.md:    ✅ Elkészült
       Megválaszolatlan kérdések: 2 db
         ❓ Q-003
         ❓ Q-007
  [02] Válaszok:          1 fájl
       • answers_round1.md
  [03] BA dokumentumok:   ÜRES

  JAVASOLT KÖVETKEZŐ LÉPÉS
  ⛔ Részleges válaszok — 2 kérdés még megválaszolatlan.
     → Egészítsd ki a workflow/02_answers/ fájlokat
     → Majd futtasd: /ba
============================================================
```

### Javasolt következő lépés
A session-loader mindig pontosan megmondja, mi a következő teendő.

---

## Mit ajánl fel a betöltés után?

A Claude az összefoglaló után megkérdezi, hogyan szeretnéd folytatni:

```
Hogyan szeretnéd folytatni?
  [A] /ba – automatikus következő lépés futtatása
  [B] Kérdés megválaszolása / anyag hozzáadása
  [C] Egy adott dokumentum megtekintése / szerkesztése
  [D] Memória megtekintése részletesen
```

Válaszolj, és a Claude ennek megfelelően folytatja a munkát.

---

## A háttérben futó szkript

A session-loader egy PowerShell (Windows) vagy Bash (macOS/Linux) szkriptet futtat a háttérben:
- Windows: `.claude/scripts/session-loader.ps1`
- macOS/Linux: `.claude/scripts/session-loader.sh`

A szkript a workflow mappák fájljait vizsgálja és a memória fájlokból olvassa ki a projekt adatokat. Nem módosít semmit — kizárólag olvas.

---

## Kapcsolódó skillek

| Skill | Kapcsolat |
|---|---|
| `/ba` | A session-loader által javasolt következő lépés legtöbbször ez |
| `/memory-handler` | A memória adatokat innen olvassa be |
