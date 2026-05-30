# 3. Performance Reference

**When to use this chapter:** When you want to estimate how long a `/ba` run will take, how many tokens it will consume, and how much human effort it saves.

---

## 1. Estimation Guidelines

| Project size | Input files | Est. FR/NFR | Spec-builder | BA doc generation | Total tokens (approx.) |
|---|---|---|---|---|---|
| **Small project** | ≤ 5 files | ≤ 20 FR | ~1–2 min | ~3–5 min | ~30–60K |
| **Medium project** | 10–20 files | 50–100 FR | ~3–5 min | ~8–15 min | ~80–150K |
| **Large project** | 20+ files | 100+ FR | ~5–10 min | ~15–30 min | ~150–250K+ |
| **Incremental** | 1–3 changed files | +5–15 new FR | ~1–2 min | ~3–8 min (selective) | ~20–60K |

> ⚠️ **Important:** These are estimated values. Actual run time and token consumption depend on model load, input file complexity, and internet speed.

---

## 2. Measured Test Results (Anonymized)

Real-world measurements from actual projects — anonymized for client presentation.

| Test | Phase | Generated docs | Tokens (total) | Tool calls | Run time | Est. compute cost |
|:---|:---|---:|---:|---:|---:|---:|
| **A** | Full BA workflow (discovery → analysis) | 11 | 416,994 | 220 | 68 min | ~$3.50 |
| **B** | BA document generation (v1) | 9 | 583,756 | 311 | 164 min\* | ~$3.15–$3.86 |
| **C** | BA document generation (v2) | 9 | 263,256 | 167 | 35 min | ~$1.73 |
| **D** | Discovery phase (6 iterations) | 3 | 701,401 | 258 | 74 min | ~$4.21 |
| | **Grand total** | **32** | **~1.96M** | **956** | **~5.6 hrs** | **~$12.60–$13.30** |

\* Test B: without a 100-minute FIGMA image processing outlier, actual processing time was 63 min.

---

## 3. Detailed Token Usage

| Test | Task | Tokens | Productive? | Result |
|:---|:---|---:|---:|:---|
| **A** | Spec-building (5 runs) | 320,972 | ✅ | Question extraction + specification |
| | BA doc generation | 84,622 | ✅ | 11 BA documents |
| | State check (wasted) | 96,062 | ❌ | Stalled waiting |
| **B** | Spec-building (5 runs) | 491,074 | ✅ | 5 iterations |
| | BA doc generation (1 run) | 92,682 | ✅ | 9 documents at once |
| **C** | Waiting reports (4 runs) | 167,687 | ❌ | 63.7% — wasted cycles |
| | Productive generation (1 run) | 95,569 | ✅ | 9 docs + 13 diagrams |
| **D** | 6 incremental runs | 701,401 | ✅ | 3 discovery documents |

### Token Efficiency (per document)

```
Test C ─████████████████████ 29,300 token/doc  ← best
Test A ─████████████████████████████████████ 37,900
Test B ─█████████████████████████████████████████████████████ 64,900
Test D ─████████████████████████████████████████████████████████████████████████████████████████ 233,800 ← discovery
```

---

## 4. Human Time vs. AI Time — Savings

| Test | AI run time | Human baseline (est.) | Savings | Compute cost |
|:---|---:|---:|---:|---:|
| **A** — Full BA workflow | ~1.1 hrs | 3–5 days (24–40 hrs) | **~96–97%** | ~$3.50 |
| **B** — BA generation v1 | ~2.7 hrs | 3–5 days (24–40 hrs) | **~89–93%** | ~$3.15–$3.86 |
| **C** — BA generation v2 | ~0.6 hrs | 1–2 days (8–16 hrs) | **~93–96%** | ~$1.73 |
| **D** — Discovery (6 iterations) | ~1.2 hrs | 3–5 days (24–40 hrs) | **~95–97%** | ~$4.21 |

**Conclusion:** A complete BA document package (9–11 documents) can be produced in **~35 minutes at ~$1.70–$3.50** compute cost, replacing **1–3 days of senior BA work** — a **89–97% time savings**.

---

## 5. Output Quality — Generated Elements

| Output type | Test A | Test B | Test C | Test D |
|:---|---:|---:|---:|---:|
| BA documents | 11 | 9 | 9 | — |
| Discovery documents | — | — | — | 3 |
| Mermaid diagrams | 9+ | 11 | 13 | — |
| Functional requirements (FR) | 17 | 21 | 22 | — |
| Non-functional requirements (NFR) | 5 | 9 | 10 | — |
| User Stories (US) | 6 | 11 | 14 | — |
| UAT test cases (TC) | — | 10 | 12 | — |
| Business requirements (BR) | — | 6 | 7 | — |
| Identified risks (RISK) | 10 | 10 | 10 | 17 |
| Open questions (Q) | 9/12 | 7 | 10/10 | 16 |
| Stakeholders | 6 | 5+ | — | 8 |
| Assumptions (A) | — | 14 | — | 16 |
| Glossary terms | — | 23 | 35 | — |
| Business problems (PROB) | — | — | — | 19 |
| Business goals (GOAL) | — | — | — | 19 |
| MVP items | — | — | — | 16 |

---

## 6. Cost/Performance Summary

| Metric | Value |
|:---|---:|
| Lowest cost / document package | **~$1.73** |
| Fastest full workflow | **35 minutes** |
| Best token efficiency | **~29,300 token / doc** |
| Human time savings | **89–97%** |
| Average compute cost / document | **~$0.19–$0.39** |
| Average cost / requirement item | **~$0.04–$0.06** |

---

## 7. Token Limits and Actions

| Estimated input | Warning | Recommended action |
|---|---|---|
| ≤ 60K tokens | None | Normal run |
| 60K – 100K tokens | ⚠️ Large input — splitting recommended | Prioritize the most important files |
| > 100K tokens | ❌ Context limit likely | Split into two runs; 10–15 most important files first |

### How to reduce token load?

1. **Remove irrelevant sections** from converted files — if only 3 pages of a 50-page PDF are relevant, trim the `_converted.md` file.
2. **Prioritization** — the top 5–10 files typically cover 80% of relevant FRs.
3. **Incremental runs** — after the first `/ba`, only add new files; don't delete existing ones.
4. **Image files** — if text extractable from an image is already available in another format, don't submit the image too.

---

## 8. Performance Tips

- **Stop hook** — the `workflow_state.py` Stop hook runs with minimal overhead (< 1 second).
- **Memory agent** — memory loading takes ~0.5–1 second, negligible.
- **Incremental vs. full rebuild** — automatically detected: only new/changed files are processed. Full rebuild only on deleted files or first run.
- **Selective doc regeneration** — if only 1–2 FRs changed, only affected documents are rewritten. This saves 40–60% tokens on medium projects.

---

*Note: Compute costs are estimated at API list prices (input $3/MTok, output $15/MTok) with a 70/30 input/output ratio. Actual costs depend on the pricing model applied. The human baseline is based on senior BA expert estimates.*