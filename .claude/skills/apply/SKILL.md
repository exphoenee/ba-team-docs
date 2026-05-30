---
name: apply
description: >
  Implements a feature request from app/featureRequests/ by executing every item in its
  TODO checklist — creating new files and modifying existing ones according to BA Tool
  conventions. Updates the TODO checkboxes after each completed item and sets the feature
  request status to "Kész" when all items are done. Handles app-internal documentation
  updates (HANDBOOK, AGENTS.md, docs routes, sidebar) automatically.
version: 1.0.0
author: Viktor Bozzay
disable-model-invocation: false
argument-hint: "[featureRequests/<filename>.md]"
---

# Apply — Feature Request Implementation

Reads a feature request file and implements every item in its TODO checklist.

---

## Step 1 — Find and Read the Feature Request

**If an argument is provided:** read that file directly.

**If no argument is provided:**
- List all files in `app/featureRequests/`
- Show the list with their Státusz field
- Ask the user which one to implement:
  ```
  Melyik feature requestet szeretnéd implementálni?
  [1] 2026-05-30_check-state-inline-skill.md — Jóváhagyva — implementálásra vár
  [2] 2026-06-01_rca-excel-import.md — Elemzés kész — jóváhagyásra vár
  ```
- Wait for selection. Only proceed with files that have status `Jóváhagyva — implementálásra vár`.
- If the selected file has status `Elemzés kész — jóváhagyásra vár`: stop and tell the user it needs approval first (`/self-dev`-en keresztül jóváhagyás szükséges).
- If already `Kész ✅`: report that it is already implemented.

Read the full featureRequest file. Extract:
- The `## TODO` section with all checkboxes
- The `## Építészeti elemzés` section (for context)
- The `## Összefoglalás` section

---

## Step 2 — Set Status to In Progress

Update the `**Státusz:**` line in the featureRequest file:

```
**Státusz:** `Implementálás folyamatban`
```

---

## Step 3 — TODO Tracking Rule

After **every** file you successfully create or modify, immediately edit the featureRequest file:
- Find the matching `- [ ]` line in the `## TODO` section
- Change it to `- [x]`

Do this after each individual item — not in bulk at the end.

---

## Step 4 — Execute the TODO Checklist

Work through **every unchecked item** in the `### Létrehozandó fájlok` and `### Módosítandó fájlok` sections, in order.

For each item, read the featureRequest's architectural analysis to understand what exactly needs to be done — the TODO checkbox describes *what*, the analysis describes *how*.

### Creating new skill files

For each new skill (`app/.claude/skills/<name>/`), create three files:

**SKILL.md** — English, exact frontmatter:
```yaml
---
name: <name>
description: >
  <2-3 sentence description — in English>
version: 1.0.0
author: Viktor Bozzay
disable-model-invocation: true
argument-hint: "<accepted flags and arguments>"
---
```

Body: numbered `## Step N — Title` sections. If it dispatches an agent: `Agent: <agent-name>`. Close with `## Language Rule` (Hungarian output) and `## Hard Constraints`.

**README.md** — Hungarian user guide:
```markdown
# /<name>

> <Egy mondatos leírás.>

## Mire való?
## Hogyan használd?
## Mit csinál pontosan?
## Mikor nem csinál semmit?
## Kapcsolódó skillek
```

**README.en.md** — English translation of README.md.

### Creating new agent files

For each new agent (`app/.claude/agents/<name>.md`):

Frontmatter — ONLY `name` and `description`, no other fields:
```yaml
---
name: <name>
description: >
  <2-3 sentence description — in English>
---
```

Body: role description, numbered steps, memory access via `Agent: memory-agent` only. Close with `## Language Rule` and `## Hard Constraints`.

Also create:
- `app/.claude/agents/docs/<name>.md` — Hungarian user guide
- `app/.claude/agents/docs/<name>.en.md` — English user guide

### Modifying existing files

Read each file before editing. Apply only the change described in the TODO item. Do not touch surrounding content.

**Key modification targets and conventions:**

| File | What to add |
|---|---|
| `app/HANDBOOK/ch05-commands.md` | New row in the commands table |
| `app/AGENTS.md` | New agent section or new row in skills table |
| `app/.claude/agents/docs/README.md` | New row in agent table |
| `app/.claude/agents/docs/README.en.md` | Same, in English |
| `app/.claude/agents/ba-orchestrator.md` | New dispatch branch or state condition |
| `app/.claude/rules/ba-tool-internals.md` | New agent row, update count in heading |
| `docs/scripts/app.js` | New `'skill-<name>'` or `'agent-<name>'` route in the `routes` object |
| `docs/index.html` | New `<li>` in `#skillsSubmenu` or `#agentsSubmenu` |

**docs/scripts/app.js route format:**
```js
'skill-<name>': './.claude/skills/<name>/README.md',
'skill-<name>-en': './.claude/skills/<name>/README.en.md',
```

**docs/index.html skill entry format:**
```html
<li><a href="#skill-<name>">/<name> <span class="lang-tag">HU</span></a><a href="#skill-<name>-en" class="lang-alt">EN</a></li>
```

**docs/index.html agent entry format:**
```html
<li class="nav-item-with-lang"><a href="#agent-<name>"><name> <span class="lang-tag">HU</span></a><a href="#agent-<name>-en" class="lang-alt">EN</a></li>
```

### Running copy_readmes.py

When the TODO list contains `python scripts/copy_readmes.py futtatása`:

```bash
python app/scripts/copy_readmes.py
```

Mark this item `[x]` after the script completes successfully.

---

## Step 5 — Conventions Checklist

After all files are created/modified, verify:

**Frontmatter:**
- [ ] Skill `name` matches folder name exactly
- [ ] Agent frontmatter has ONLY `name` and `description` — no `version`, `author`, etc.
- [ ] Skill has all 6 frontmatter fields

**Language:**
- [ ] SKILL.md and agent .md body: English
- [ ] README.md: Hungarian (contains Hungarian-accented characters)
- [ ] README.en.md: English

**Memory access:**
- [ ] No agent reads/writes `.claude/memory/` directly — all via `Agent: memory-agent`

---

## Step 6 — Set Status to Done

When **all** TODO checkboxes are `[x]`, update the `**Státusz:**` line in the featureRequest file:

```
**Státusz:** `Kész ✅`
```

---

## Step 7 — Report to User

Tell the user in Hungarian what was implemented:

```
✅ Feature request implementálva: `app/featureRequests/<filename>.md`

Elkészült:
  • [lista a létrehozott fájlokról]

Módosítva:
  • [lista a módosított fájlokról]

Státusz: Kész ✅
```

---

## Language Rule

All user-facing output must be in **Hungarian**.
All created SKILL.md and agent .md files must be in **English**.
All created README.md files must be in **Hungarian**.
All created README.en.md files must be in **English**.

---

## Hard Constraints

- ✅ Always read the featureRequest file fully before starting
- ✅ Always update status to `Implementálás folyamatban` before the first file change
- ✅ Always mark TODO items `[x]` immediately after each file is successfully written
- ✅ Always set status to `Kész ✅` when all checkboxes are `[x]`
- ✅ Always read a file before editing it — never overwrite without reading
- ❌ Never skip a TODO item — implement everything in the list
- ❌ Never implement a featureRequest with status `Elemzés kész — jóváhagyásra vár` — approval required first
- ❌ Never write agent frontmatter with fields other than `name` and `description`
- ❌ Never access `.claude/memory/` directly from a new agent — always via `Agent: memory-agent`
