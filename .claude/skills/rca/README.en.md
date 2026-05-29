# `/rca` – Root Cause Analysis (RCA / Chain / IR)

[Magyar változat](README.md)

> Runs a full causal chain analysis, self-reinforcing loop identification, and driver/symptom classification from a structured root-cause list.

---

## What is it for?

The `/rca` skill is a **standalone analysis tool** in the BA workflow. It reveals where to actually
intervene (driver root causes) and where only symptoms are visible in a project's problems.

The skill implements the methodology from the [Copilot RCA/Chain/IR Handbook](../../devdocs/Copilot_RCA_Chain_IR_Prompt_Kézikönyv_BA_PM.pdf).

---

## How to use it?

**In most cases no preparation is needed** — if `/ba` or `/discovery` has already been run,
`/rca` works automatically from their output.

**Automatic trigger:** the `/ba` workflow automatically runs RCA when ≥3 `[INFERRED:HIGH]`
assumptions or ≥5 risks are identified in the specification.

**Manual run:**
```
/rca
/rca --quick      Faster: chains + loops only, no IR matrix
/rca --validate   QA check only on existing RCA_Analysis.md
```

**Optional supplemental input (extra root causes not in the spec):**
```
workflow/03_answers/rca_input.xlsx   ← optional Excel, automatically processed by convert_all
```

---

## What does it do exactly?

1. **Checks** for the input file (`rca_input*.xlsx`)
2. **Converts** the Excel file to Markdown (`convert_all`)
3. **Input validation** — root cause count, groups, excluded rows
4. **Root cause list cleaning** — display cleanup only, no content changes
5. **Direct causal links** — which cause directly triggers which
6. **Chain_Long** — unlimited-depth causal chains with Mermaid diagrams
7. **Loop_Summary** — self-reinforcing loops + breaking points
8. **IR_Mátrix** — N×N connection matrix (1 = direct, chain-verified; 0 = none)
9. **IR_Elemzés** — driver index + Driver / Symptom / Intermediary / Loop-amplifier classification
10. **QA report** — automatic verification of 7 invariants
11. **Executive summary** — top drivers + most critical loops + breaking point recommendation

---

## What does it produce?

**`workflow/05_ba_docs/RCA_Analysis.md`** — full analysis:

| Section | Content |
|---|---|
| Root cause list | Numbered, cleaned list |
| Direct links | Source → caused table |
| Chain_Long | Causal chain table + Mermaid diagrams |
| Loop_Summary | Loop table + feedback diagram |
| IR_Mátrix | N×N connection matrix |
| IR_Elemzés | Driver index + Suggested role per cause |
| QA Report | Results of 7 invariant checks |
| Executive summary | 3–5 sentence decision-support assessment |

---

## Relationship to the `/ba` workflow

`/rca` is a **standalone skill** — the full BA workflow does not need to be run. But if you do run both:

- The `RAID_Log.md` `Szerep` (Role) field is automatically filled from the IR_Elemzés output
- Driver root causes help prioritise FR items

---

## When does it do nothing?

- If neither `SPEC_OUTPUT.md`, `Discovery_RAID.md`, nor `03_answers/rca_input*` exists → error message + guidance
- If the merged list contains fewer than 3 items → continues with a warning

---

## Related Skills

| Skill | Relationship |
|---|---|
| `/ba` | Analysis phase — RCA analysis enriches the RAID_Log Role fields |
| `/discovery` | Discovery phase — the root cause summary becomes more precise after `/rca` |
| `/business-analyst` | BA documents — if RCA_Analysis.md exists, RAID_Log picks up roles automatically |
