# 18. Performance Reference

**When to use this chapter:** When you want to estimate how long a `/ba` run will take and how many tokens it will consume.

---

## Estimation Guidelines

| Project size | Input files | Est. FR/NFR | Spec-builder | BA doc generation | Total tokens (approx.) |
|---|---|---|---|---|---|
| **Small project** | ≤ 5 files | ≤ 20 FR | ~1–2 min | ~3–5 min | ~30–60K |
| **Medium project** | 10–20 files | 50–100 FR | ~3–5 min | ~8–15 min | ~80–150K |
| **Large project** | 20+ files | 100+ FR | ~5–10 min | ~15–30 min | ~150–250K+ |
| **V2 incremental** | 1–3 changed files | +5–15 new FR | ~1–2 min | ~3–8 min (selective) | ~20–60K |

> ⚠️ **Important:** These are estimated values. Actual run time and token consumption depend on model load, input file complexity, and internet speed.

---

## Measured Reference — SZBKI Project (2026-05-18)

| Run | Files | FR count | Run time | Tokens |
|---|---|---|---|---|
| V1 — full spec + BA docs | 7 files | 47 FR | ~34.9 min | ~159K |
| V2 — incremental (+2 files) | 2 changed | +11 FR | ~12 min | ~61K |

**Observations:**
- The spec-builder used ~35% of the tokens of a full rebuild in the incremental run.
- The ba-document-agent V1→V2 rebuild regenerated all documents (OB-26 impact-based regeneration can reduce this by ~40–60%).
- Image-based inputs (`.png`, `.jpg`) require ~3× more tokens than text files.

---

## Token Limits and Actions

| Estimated input | ba-orchestrator warning | Recommended action |
|---|---|---|
| ≤ 60K tokens | No warning | Normal run |
| 60K – 100K tokens | ⚠️ Large input — splitting recommended | Prioritize the most important files |
| > 100K tokens | ❌ Context limit likely | Split into two runs; most important 10–15 files first |

### How to reduce token load?

1. **Remove irrelevant sections from converted files** — if only 3 pages of a 50-page PDF are relevant, trim the `_converted.md` file.
2. **Prioritization** — the top 5–10 files typically cover 80% of relevant FRs.
3. **Incremental runs** — after the first `/ba`, only add new files; don't delete existing ones.
4. **Image files** — if the text extractable from an image is already available in another format, don't submit the image too.

---

## Performance Tips

- **Stop hook** — the `workflow_state.py` Stop hook runs with minimal overhead (< 1 second); it doesn't affect run time.
- **Memory agent** — memory loading takes ~0.5–1 second; LOAD_CONVERSION_LOG is the largest file but rarely needs a full load.
- **Incremental vs. full rebuild** — the spec-builder detects this automatically: it only processes new/changed files. Full rebuild only happens on deleted files or first run.
- **OB-26 selective doc regeneration** — if only 1–2 FRs changed, ba-document-agent only rewrites the affected documents. This saves 40–60% tokens on medium projects.
