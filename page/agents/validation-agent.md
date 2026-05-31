# validation-agent

> A specifikáció minőségőre: 8 dimenzión ellenőrzi a SPEC_OUTPUT.md-t, és PASS/WARN/BLOCK eredményt ad a ba-orchestratornak — dokumentumot nem generál.

[English version](validation-agent.en.md)

---

## Szerepe a workflow-ban

A `validation-agent` a BA workflow minőségkapuja. Az extraction és az RCA agent után, a dokumentumgenerálás előtt fut. Egyetlen felelőssége: megvizsgálni, hogy a SPEC_OUTPUT.md teljesíti-e az összes kötelező minőségi feltételt, mielőtt a ba-document-agent elkezdi a dokumentumokat előállítani.

## Mikor aktiválódik?

Kétféleképpen:
1. **Automatikusan** — ba-orchestrator dispatchilja a Check Validation lépésben (minden /ba futásnál, ha a spec frissebb, mint a SPEC_VALIDATION.md)
2. **Manuálisan** — `/validate` skill dispatchilja

## Mit ellenőriz?

| Dimenzió | Szint |
|---|---|
| BR metrika-lefedettség | ⚠️ WARN |
| NFR taxonómia (5 kategória) | ⚠️ WARN |
| FR domain-lefedettség (OB-24b) | ⚠️ WARN |
| Compliance domain trigger (`workflow/REGULATION/*.md` alapján) | ❌ BLOCK vagy ⚠️ WARN (domain `block:` mezőjétől függően) |
| SCOPE CONFLICT nyitott kérdések | ⚠️ WARN |
| INFERRED:HIGH melletti RISK-XXX | ⚠️ WARN |
| Q-XXX arány > 50% | ⚠️ WARN |
| Duplikált ID | ❌ BLOCK |

### Check 4 — Compliance domain trigger

A `validation-agent` a `workflow/REGULATION/` mappában lévő domain fájlokból olvassa ki a kulcsszavakat és a szükséges elemeket — nincs égetett szólista az agent utasításban.

**Hogyan működik?**
1. Betölti a `workflow/REGULATION/*.md` fájlokat (kivéve `custom_domain_template.md`)
2. Minden FR szövegét összeveti a betöltött kulcsszavakkal
3. Ha egyezés van és a szükséges spec-elem (pl. RISK-XXX, ISSUE-XXX) hiányzik:
   - `block: true` domainben → **BLOCK** státusz (a forrás szabályfájl megnevezve)
   - `block: false` domainben → **WARN** státusz
4. Ha a `workflow/REGULATION/` mappa nem létezik → Check 4 kihagyva, WARN a riportban

**Saját compliance domain hozzáadása:** Másold a `custom_domain_template.md`-t, töltsd ki, és mentsd el a `workflow/REGULATION/` mappába tetszőleges névvel.

## Mit állít elő?

`workflow/01_project_info/_system/SPEC_VALIDATION.md`

Státusz: ✅ PASS | ⚠️ WARN | ❌ BLOCK

## Kapcsolódó komponensek

| Komponens | Kapcsolat |
|---|---|
| `ba-orchestrator` | Dispatchilja a Check Validation lépésben |
| `/validate` skill | Manuális belépési pont |
| `extraction-agent` | Előtte fut — a SPEC_OUTPUT.md-t ő állítja elő |
| `rca-agent` | Előtte fut — az RCA_Analysis.md-t opcionálisan felhasználja |
| `ba-document-agent` | Utána fut — beolvassa a SPEC_VALIDATION.md-t |
