# 11. Special Cases

## Political and Diplomatic Decisions

When a stakeholder expresses a firm position, the system:

1. **Records as explicit data** — with `[EXPLICIT]` marker
2. **Flags as conflict** — if it contradicts a previous requirement
3. **Generates Q-XXX** — marking the point needing clarification
4. **Doesn't decide for you** — AI won't guess the solution

The decision goes into `DECISIONS.md` with a DEC-XXX ID.

## Project Re-direction

**Automatic:** If you delete files from `01_project_info/`, the spec-builder does a full regeneration, removing orphaned requirements.

**Manual (memory):**
1. Open `.claude/memory/`
2. Edit the relevant `.md` files
3. Delete outdated entries
4. Run `/session-loader` to verify

## When You Don't Have an Answer

Three options:
1. **Assumption (A-XXX):** Write a logical assumption — the system proceeds but notes uncertainty
2. **Flag as risk:** Goes into the RAID Log
3. **Never write TBD or N/A** — the system checks and rejects these
