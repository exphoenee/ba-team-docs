# `/ba-workflow` – BA Workflow Orchestrátor (örökölt)

[English version](README.en.md)

## Figyelem

> Ez a skill az eredeti workflow orchestrátor. **Felváltotta a `/ba` skill**, amely kibővített funkcionalitással rendelkezik: memória kezelés, subagent alapú futtatás és automatikus állapotfelismerés.
>
> Új projektekhez használd a `/ba` skillt. Ez a skill visszafelé kompatibilitás miatt maradt meg.

---

## Mire való?

A `/ba-workflow` a spec-buildert és a business-analyst skillt kapcsolja össze: ellenőrzi, hogy minden Q-XXX kérdés megválaszolt-e, és csak akkor futtatja a BA dokumentum-generálást, ha igen.

---

## Hogyan működik?

### 1. lépés – Spec betöltése
Beolvassa a `workflow/01_project_info/SPEC_OUTPUT.md` fájlt és kinyeri az összes `UNANSWERED` státuszú Q-XXX azonosítót.

Ha a fájl nem létezik, megáll és kéri a `/spec-builder` futtatását.

### 2. lépés – Válaszok ellenőrzése
Beolvassa a `workflow/02_answers/` összes fájlját. Minden Q-XXX azonosítóhoz ellenőrzi:
- Szerepel-e a válasz fájlban?
- Van-e érdemi szöveg utána? (A "TBD" és "N/A" nem számít válasznak.)

**Ha hiányzó válasz van → megáll** és listázza:
```
⛔ BA Workflow paused – answers missing

| ID    | Kategória | Kérdés összefoglalója          |
|-------|-----------|-------------------------------|
| Q-002 | DATA      | Adatmegőrzési időszak?        |
| Q-005 | INTEGRATION | Külső fizetési rendszer?    |

Következő lépés:
Egészítsd ki workflow/02_answers/ fájlokat, majd futtasd újra: /ba-workflow
```

**Ha minden megválaszolt → folytatja** a BA dokumentumok generálásával.

### 3. lépés – BA dokumentumok generálása
A `workflow/01_project_info/SPEC_OUTPUT.md`, az összes bemeneti fájl és a válasz fájlok alapján elkészíti a kötelező BA dokumentumokat a `workflow/03_ba_docs/` mappába.

### 4. lépés – Befejezési jelentés
```
✅ BA document generation complete.
Documents saved to workflow/03_ba_docs/
Requirements covered: FR-001 to FR-012
Questions resolved: Q-001 to Q-007 (7/7)
```

---

## Különbség a `/ba` skillhez képest

| Funkció | `/ba-workflow` | `/ba` |
|---|---|---|
| Memória betöltése | ❌ | ✅ |
| Memória frissítése | ❌ | ✅ |
| Subagent futtatás | ❌ | ✅ |
| Automatikus spec-builder | ❌ | ✅ |
| Állapotfelismerés | részleges | ✅ teljes |

---

## Kapcsolódó skillek

| Skill | Kapcsolat |
|---|---|
| `/ba` | Az utódja — új projektekhez ezt használd |
| `/spec-builder` | Előfeltétel: SPEC_OUTPUT.md-t kell készíteni előtte |
| `/business-analyst` | Ezt futtatja a dokumentum-generálási fázisban |
