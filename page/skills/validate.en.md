# `/validate` – Specification Quality Gate

[Magyar változat](README.md)

> Checks the existing specification across 8 quality dimensions and returns PASS / WARN / BLOCK — does not generate documents.

---

## What is it for?

The `/validate` skill is the standalone quality check step of the `/ba` workflow. Run it:
- Before generating BA documents — preventive check
- When new materials have arrived but you don't want to regenerate documents yet
- When the workflow returned a BLOCK status and you want to see the details before fixing

> **Note:** `/ba` automatically runs validation before document generation —
> manual use of `/validate` is usually not needed.

---

## How to use it?

```
/validate
```

---

## What does it check?

| Dimension | Level |
|---|---|
| BR metric coverage (KPI) | ⚠️ WARN |
| NFR taxonomy (5 categories) | ⚠️ WARN |
| FR domain coverage (OB-24b) | ⚠️ WARN |
| GDPR trigger (personal data FR) | ❌ BLOCK if missing |
| SCOPE CONFLICT open questions | ⚠️ WARN |
| INFERRED:HIGH paired with RISK-XXX | ⚠️ WARN |
| Q-XXX ratio (> 50% unanswered) | ⚠️ WARN |
| ID consistency (duplicates) | ❌ BLOCK if duplicated |

---

## What does it produce?

`workflow/01_project_info/_system/SPEC_VALIDATION.md` — detailed validation report:
- Summary status: ✅ PASS / ⚠️ WARN / ❌ BLOCK
- An actionable fix suggestion for every problematic item

---

## When does it do nothing?

- If `SPEC_OUTPUT.md` does not exist → error message + guidance

---

## Related Skills

| Skill | Relationship |
|---|---|
| `/ba` | Full workflow — automatically includes validation |
| `/extractor` | Spec generation only, without validation |
| `/rca` | Root cause analysis — validation considers RCA results |
