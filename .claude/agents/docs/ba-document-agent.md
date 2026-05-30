# ba-document-agent

> A BA dokumentum-generáló specialist: kész specifikációból és megválaszolt kérdésekből előállítja a teljes, átadható BA dokumentációs csomagot.

[English version](ba-document-agent.en.md)

---

## Szerepe a workflow-ban

A `ba-document-agent` az utolsó lépés a BA workflow-ban. Akkor fut, amikor minden Q-XXX kérdés megválaszolt — veszi a specifikációt, a stakeholder válaszokat és a FORCED döntéseket, és belőlük előállítja az összes kötelező BA dokumentumot. Minden folyamathoz Mermaid diagramot is generál.

## Mikor aktiválódik?

- A `ba-orchestrator` dispatchilja, ha minden Q-XXX megválaszolt
- `--draft` módban: akkor is fut, ha Q-XXX kérdések még nyitottak (VÁZLAT fejléccel)
- Közvetlenül is meghívható a `/business-analyst` skill által

## Mit állít elő?

| Fájl | Tartalom |
|---|---|
| `BRD.md` | Business Requirements Document (prioritás fejléccel) |
| `User_Stories.md` | User Story-k Gherkin elfogadási kritériumokkal |
| `Process_Flows.md` | Folyamatmodellek (kötelező Mermaid diagramok) |
| `Traceability_Matrix.md` | Követhetőségi mátrix (`Forrás fájl` oszloppal) |
| `RAID_Log.md` | Kockázatok, feltételezések, függőségek |
| `Glossary.md` | Domain szószedet |
| `_system/BA_DOCS_LOG.md` | Generálási napló (mikor, miből, milyen módban) |
| `_system/BA_DOCS_DIFF.md` | Változásjelentés (mit módosított az utolsó futás) |

## Lépések

1. **Inputok beolvasása** — `SPEC_OUTPUT.md`, `03_answers/`, `04_decisions/`, memória (binárisokat kihagyva)
2. **Impact-alapú szelekció (OB-26)** — `SPEC_DIFF.md` beolvasása: csak az érintett dokumentumokat regenerálja; a változatlanokhoz `[Nincs változás]` fejléc
3. **Dokumentumok generálása** — kötelező Mermaid diagramokkal minden folyamathoz
4. **INFERRED:HIGH → RISK (OB-21)** — a HIGH kockázatú feltételezések automatikus RISK bejegyzésként kerülnek a RAID_Log-ba
5. **Mermaid szintaxis validálás (OB-16)** — minden diagram után WARN riport (nem blokkoló)
6. **Forrásjelzések megőrzése** — `[Forrás: filename · sha8]` annotációk átvétele; Traceability Matrix kap `Forrás fájl` oszlopot
7. **Mentés** — `workflow/05_ba_docs/`
8. **Generálási napló (OB-14)** — `BA_DOCS_LOG.md`: időpont, spec SHA, mód
9. **Memória frissítés** — `memory-agent` BATCH STORE: RESOLVED_QUESTIONS `status: archived`
10. **Változásjelentés (OB-27)** — `BA_DOCS_DIFF.md` generálása
11. **Visszajelzés** — `ba-orchestrator`-nak

## Kapcsolódó komponensek

| Komponens | Kapcsolat |
|---|---|
| `ba-orchestrator` | Dispatchilja, ha minden Q-XXX megválaszolt |
| `/business-analyst` skill | Közvetlenül is meghívhatja |
| `spec-builder-agent` | A ba-document-agent a spec-builder `SPEC_OUTPUT.md`-jét dolgozza fel |
| `memory-agent` | RESOLVED_QUESTIONS archiválás (BATCH STORE) |
