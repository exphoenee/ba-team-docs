# extraction-agent

> Specifikáció-kinyerő specialist: nyers forrásanyagokból strukturált SPEC_OUTPUT.md-t állít elő. (Korábbi neve: spec-builder-agent)

[English version](extraction-agent.en.md)

---

## Szerepe a workflow-ban

Az `extraction-agent` kizárólag kinyerést végez — minőségellenőrzés nélkül. Beolvassa a forrásanyagokat, azonosítja a követelményeket (FR, NFR, BR, US, Q, A), és összefüggő specifikációs dokumentumba rendezi őket. A minőségellenőrzés (WARN/BLOCK) a validation-agent feladata.

## Mikor aktiválódik?

- ba-orchestrator dispatchilja, ha SPEC_OUTPUT.md nincs vagy FORCED döntés újabb nála
- Közvetlenül a `/extractor` skill

## Mit állít elő?

- `workflow/01_project_info/_system/SPEC_OUTPUT.md` — strukturált spec (FR, NFR, BR, US, Q, A)
- `workflow/01_project_info/_system/SPEC_DIFF.md` — változáslista

## Főbb képességek

- Inkrementális és teljes build (SHA-256 alapú változásdetektálás)
- FORCED döntések (SDEC-XXX) alkalmazása
- Q-XXX automatikus cross-check (Strategy B-ben)
- SCOPE CONFLICT detekció (OB-20)
- INFERRED kockázati besorolás (OB-21)
- BR KPI-kinyerés + NFR taxonómia (OB-24b)
- **Compliance domain auto-generálás (OB-24c)** — `workflow/REGULATION/*.md` alapján automatikusan hozzáadja a szükséges RISK-XXX és ISSUE-XXX elemeket, ha az FR-ek megfelelőségi kulcsszavakat tartalmaznak

### Compliance auto-generálás (OB-24c)

Az `extraction-agent` betölti a `workflow/REGULATION/` mappában lévő domain fájlokat, és minden `block: true` domain esetén automatikusan hozzáadja a szükséges spec-elemeket (pl. RISK-XXX, ISSUE-XXX), ha az FR szövege domain-kulcsszót tartalmaz. Ez biztosítja, hogy a `validation-agent` Check 4 ne BLOCK-oljon feleslegesen.

Ha a `workflow/REGULATION/` mappa nem létezik, az `extraction-agent` csendes fallback-et alkalmaz — nem generál hibát.

## Kapcsolódó komponensek

| Komponens | Kapcsolat |
|---|---|
| `ba-orchestrator` | Dispatchilja Check B/B2-ben |
| `/extractor` skill | Közvetlen belépési pont |
| `validation-agent` | Utána fut — ellenőrzi a kinyert specet |
| `memory-agent` | SPEC_LOG UPSERT, STAKEHOLDERS, RISKS STORE |
