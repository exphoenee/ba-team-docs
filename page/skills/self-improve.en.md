# /self-improve – Feature Request Implementation

> Executes an approved feature request: creates new files, modifies existing ones, updates documentation, and tracks progress in the feature request's TODO checklist.

## What is it for?

Feature requests recorded and approved via `/self-dev` are implemented by the `/self-improve` command. It reads the feature request document stored in `app/featureRequests/`, works through its TODO checklist, and performs all required changes — creating new skills and agents, updating existing files, syncing documentation.

After each completed step it updates the TODO checklist (`[ ]` → `[x]`), and when everything is done, it sets the status to `Kész ✅`.

## How to use it

```
/self-improve
/self-improve app/featureRequests/2026-05-30_check-state-inline-skill.md
```

Without an argument it lists all pending feature requests and asks which one to implement.

## What it does exactly

1. Reads the feature request file and its TODO checklist
2. Sets status to: `Implementálás folyamatban`
3. For each TODO item: performs the change (creates new file or modifies existing)
4. Immediately marks each completed checkbox `[x]`
5. Updates app-internal documentation (HANDBOOK, AGENTS.md, docs routes, sidebar)
6. When all items are `[x]`: sets status to `Kész ✅`
7. Reports a summary of completed work

## When it does nothing

- If the feature request status is `Elemzés kész — jóváhagyásra vár` — approval is required first
- If the feature request status is already `Kész ✅` — already implemented
- If there are no unchecked TODO items in the file

## Related skills

| Skill | When to use |
|---|---|
| `/self-dev` | Record and analyse a feature request — run this first |
| `/help` | If you have questions about the feature request process |
