---
name: session-loader
description: >
  Loads and presents the current BA workflow session state at the start of a work session.
  Runs the session-loader script, then loads memory via memory-agent, and shows a structured summary of
  where the project stands: what has been done, what is pending, and what the next action is.
  Use /session-loader (or /sl) to resume a previous session without having to manually check
  workflow folders and memory files.
disable-model-invocation: true
version: 1.0.0
author: Viktor Bozzay
---

# Session Loader – Munkamenet betöltése

Amikor ezt a skillt meghívják, hajtsd végre az alábbi lépéseket sorban.

---

## 1. Szkript futtatása

Futtasd a platform-független Python szkriptet:

```bash
python .claude/scripts/session_loader.py
```

Jelenítsd meg a teljes kimenetet a felhasználónak változtatás nélkül.

---

## 2. Memória betöltése

Dispatch the **memory-agent** and load memory via protocol:

```
LOAD
```

Never access `.claude/memory/` files directly from this skill.

Összegezd a memória tartalmát egy rövid bekezdésben:
- Mi a projekt neve és fázisa
- Hány döntés, stakeholder, megválaszolt kérdés van archívumban
- Legutóbbi döntés (ha van)

---

## 3. SPEC_OUTPUT összefoglaló (ha létezik)

Ha `workflow/01_project_info/_system/SPEC_OUTPUT.md` létezik:
- Olvasd be az Open Questions Summary táblát
- Listázd a megválaszolatlan Q-XXX kérdéseket (ha vannak)
- Olvasd be az első 3 funkcionális követelményt (FR-001–FR-003) kontextusként

---

## 4. Session összefoglaló megjelenítése

Jelenítsd meg az összefoglalót a következő template alapján:
`.claude/skills/session-loader/references/session_summary_template.md`

Reference loading policy:
- Load this template only at Step 4 (summary rendering).

---

## 5. Felkínált lehetőségek

A session összefoglaló után kérdezd meg a felhasználót:

`.claude/skills/session-loader/references/continuation_options_template.md`

Reference loading policy:
- Load this template only at Step 5 (user options prompt).

Várd meg a felhasználó válaszát, majd cselekedj ennek megfelelően.

---

## Hard Constraints

- ✅ Mindig futtasd a szkriptet — ne próbáld meg kézzel rekonstruálni az állapotot
- ✅ Mindig töltsd be a memória fájlokat a szkript után
- ✅ Kínáld fel a lehetőségeket, de ne cselekedj addig, amíg a felhasználó nem választott
- ❌ Ne indíts el automatikusan `/ba` futtatást a felhasználó jóváhagyása nélkül
