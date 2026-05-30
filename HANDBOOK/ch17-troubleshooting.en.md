# 17. Troubleshooting

**When to use this chapter:** If `/ba`, `/discovery`, or another command produces unexpected results, follow the decision trees below.

---

## 1. Nothing happens / empty output when running `/ba`

```
1. Are there files in the workflow/01_project_info/ folder?
   └─ NO → Copy files in, then re-run: /ba
   └─ YES ↓

2. Is only .gitkeep there?
   └─ YES → The system treats this folder as empty.
              Add project materials, then /ba
   └─ NO ↓

3. Does `workflow/01_project_info/_system/SPEC_OUTPUT.md` exist?
   └─ NO → spec-builder-agent will run.
             If it doesn't run: check point 4.
   └─ YES ↓

4. The agent started but returned nothing?
   └─ Possible causes:
      - Input file too large (context limit)
      - Memory agent unavailable
      → Try with fewer / smaller files
      → Re-run: /ba
```

---

## 2. Conversion failed (FAIL status)

```
1. Do you see a "not installed" error?
   └─ YES → Install the required Python package:
              pip install -r .claude/scripts/requirements.txt
   └─ NO ↓

2. Can the file be opened in its own application (Word, Excel, etc.)?
   └─ NO → File is corrupted. Request a fresh copy from the client.
   └─ YES ↓

3. Is the file password protected?
   └─ YES → Remove the password protection, then re-run.
   └─ NO ↓

4. Does the filename contain special characters (accents, spaces)?
   └─ Possible issue on Windows. Rename: e.g. meeting_2024.docx instead of meeting.docx
```

---

## 3. WARN status after conversion

```
1. Open the [filename]_converted.md file.
   └─ Empty or very short?
      └─ For PDFs: likely a SCANNED PDF.
         Not readable without OCR. Request a text-based PDF, or type it manually.
      └─ For Excel: check whether cells contain formulas
                    that were not evaluated.

2. Content contains garbled characters (□, ?, ▯)?
   └─ Encoding problem (e.g. Windows-1252 vs UTF-8).
      Ask the sender to save in UTF-8 encoding.
```

---

## 4. SPEC_OUTPUT.md generated but incomplete

```
1. Is there a `SPEC_DIFF.md` in the `workflow/01_project_info/_system/` folder?
   └─ YES → Check: how many items were found as new, modified, deleted?
   └─ NO → The spec-builder was an older version. Run: /ba

2. Are some files missing from the SPEC_OUTPUT?
   └─ Check CONVERSION_LOG.md (.claude/memory/):
      Are all input files listed? Do SHA-256 values match?
   └─ If not listed: run /convert, then /ba

3. Do source annotations show warnings?
   └─ ba-orchestrator reports if [Forrás: ...] reference is not found in the log.
      Follow the instructions provided there.
```

---

## 5. Q-XXX questions don't appear to be answered

```
1. Is there a file in the workflow/03_answers/ folder?
   └─ NO → Create an answers.md file in the following format:
             Q-001: [answer text]
             Q-002: [answer text]

2. Does the file contain the Q-XXX identifier explicitly?
   └─ NO → The system searches literally for the "Q-001:" pattern.
             Add: "Q-001: [answer]"

3. Is the answer "TBD" or "N/A"?
   └─ The system does NOT accept these as valid answers.
      Write a concrete, substantive answer.

4. Has the Office file (.docx, .xlsx) not been converted yet?
   └─ Run: /convert, then check the *_converted.md file.

5. Some questions have PARTIALLY_ANSWERED status?
   └─ This is NOT an error — the spec-builder extracted a partial answer from the
      source material but stakeholder confirmation is missing. /ba continues generation
      but displays a warning message.
   └─ If truly answered: add an explicit Q-XXX: [answer] line to answers.md.
   └─ If uncertain: you can leave it — it will be recorded as an assumption in RAID_Log.
```

---

## 6. BA documents not generated

```
1. Are all Q-XXX questions answered? (see point 5)
   └─ NO → Answer the questions first.
             If you still want a draft: /ba --draft

2. Is the workflow/05_ba_docs/ folder full of earlier documents?
   └─ The orchestrator is deterministic: it only regenerates if
      SPEC_DIFF.md or an answer file is newer than existing documents.
   └─ Force regeneration: /ba --force

3. Did the agent stop with an error?
   └─ Search for ERR- entries in DECISIONS.md (`.claude/memory/`).
      It contains a timestamp and a brief error description.
   └─ Re-run: /ba

4. Does the document header say "📍 Generálás módja: DISCOVERY"?
   └─ This is not an error — the orchestrator detected that workflow/02_discovery/BC.md
      exists and generated Discovery-depth documents (fewer FRs,
      epic user stories, 5–8 general UAT tests).
   └─ For full Analysis-depth documents: /ba --force
      (this overrides Discovery-depth detection)

5. Is BA_DOCS_LOG.md or BA_DOCS_DIFF.md missing from the _system/ folder?
   └─ These are created automatically after every successful BA doc generation.
   └─ If missing: the agent likely stopped before writing the log.
      Re-run: /ba --force
   └─ If BA_DOCS_DIFF.md says all documents [No change]:
      This is correct — the orchestrator didn't regenerate because nothing changed.
      To force it: /ba --force
```

---

## 7. SCOPE:CONFLICT warning in SPEC_OUTPUT.md

```
Symptom: An FR-XXX item received the [SCOPE:CONFLICT — Q-XXX decision needed] flag.

Cause: The spec-builder found the same item on both the IN SCOPE and OUT OF SCOPE
       lists simultaneously — the client materials contradict each other.

Solution:
1. Open SPEC_OUTPUT.md, search for the [SCOPE:CONFLICT] flag
2. Check the two source materials (the [Forrás: ...] annotation shows which ones)
3. Discuss with the client which scope is correct
4. Record the decision in the Q-XXX answer field (workflow/03_answers/)
   OR create an SDEC-XXX file in workflow/04_decisions/
5. Re-run: /ba
```

---

## 8. Stop hook not signaling

```
1. Does the .claude/settings.json file exist?
   └─ NO → Create it: cp .claude/settings.json.example .claude/settings.json
   └─ YES ↓

2. Does it contain a "hooks" section?
   └─ NO → Copy the contents of .claude/settings.json.example into it.

3. Is Python installed?
   └─ The hook runs the .claude/scripts/workflow_state.py --hook-check script.
      python --version → if unrecognized, install: https://python.org/downloads
      Important: check "Add Python to PATH"!

4. Is the script available?
   └─ Check: does .claude/scripts/workflow_state.py exist?
   └─ If not: git pull (the file may not have been synced)
```

---

## 9. /session-loader gives no meaningful output

```
1. Is Python installed?
   └─ python --version → if it errors, install: https://python.org/downloads
                         Important: check "Add Python to PATH"!

2. Is the script available?
   └─ Check: does .claude/scripts/session_loader.py exist?
   └─ If not: git pull (the file may not have been synced)
```

---

## 10. Multi-project execution

**Problem:** You are trying to run multiple projects in the same Claude Code session.

**Symptom:** Q-XXX questions are mixed up, the agent references wrong files, or one project's data overwrites another's.

**Cause:** BA Team tool is project-isolated. One `workflow/` folder = one project. The system can only work correctly with a single project at a time.

**Solution:**
```
1. Open a separate Claude Code session for each project (new window / new chat)
2. Each session uses its own workflow/ folder
3. If switching projects: close the current session, open a new one
```

**Why doesn't multi-project work?**
- Memory (`.claude/memory/`) contains project-specific entries
- Agents look for input files in the `workflow/` folder — they can't distinguish which project each file belongs to
- The Stop hook monitors the entire `workflow/` folder, not project-specific subfolders

---

## 11. FORCED decision problems (`04_decisions/`)

```
1. SDEC file not incorporated into the spec?
   └─ Check the frontmatter:
      - Is `forced: true` present?
      - Is YAML syntax valid? (colon followed by space, no tab indentation)
      - Is the `id:` field in SDEC-XXX format?
   └─ For invalid YAML, the system writes a WARNING to
      workflow/04_decisions/_system/DECISIONS_LOG.md.

2. "Target not found" warning in DECISIONS_LOG?
   └─ The ID specified in the `targets:` field (e.g. FR-012) doesn't exist in SPEC_OUTPUT.md.
   └─ Check the current FR-XXX IDs in SPEC_OUTPUT.md.
   └─ Update the targets field with the correct ID.

3. Spec not regenerated after the SDEC file?
   └─ ba-orchestrator decides based on the SDEC file's modification time (mtime).
      If the SDEC file is older than SPEC_OUTPUT.md, it won't regenerate.
   └─ Solution: touch the file (e.g. open and close without saving),
      or run: /ba --force

4. [FORCED] annotation not visible in SPEC_OUTPUT.md?
   └─ Check DECISIONS_LOG.md: is there an APPLIED status entry?
   └─ If you see SKIPPED status: the target ID didn't match.
```

---

## 12. No output / incomplete result when running `/discovery`

```
1. Are there files in the workflow/01_project_info/ folder?
   └─ NO → Copy in project materials (handover, meeting notes, etc.), then /discovery

2. Is only .gitkeep there?
   └─ YES → The system treats this as empty. Add a real file.

3. DISCOVERY_OUTPUT.md not generated (workflow/02_discovery/_system/)?
   └─ The agent may have stopped with an error. Re-run: /discovery
   └─ If the output folder wasn't created either: check that the workflow/02_discovery/
      folder exists (git pull, or create it manually).

4. BC.md generated but empty / very short?
   └─ The input material likely doesn't contain enough structured text.
      Check the _converted.md files (see points 2-3).
   └─ Try with one of the templates:
        .claude/references/templates/handover_template.md
        .claude/references/templates/discovery_meeting_template.md

5. BC.md has no DRAFT header, but there are still open questions?
   └─ This is NOT an error — discovery-agent only adds a DRAFT header
      if Q-XXX questions are found in DISCOVERY_OUTPUT.md.
   └─ If all questions are answered in workflow/03_answers/: correct behaviour.

6. Running /ba after /discovery produces Discovery-depth documents?
   └─ This is intentional: the orchestrator detects BC.md and performs
      Discovery-depth generation. See: point 6 / question 4.
```

---

## Quick Reference – Most Common Issues

| Symptom | Solution |
|---|---|
| Nothing happens on `/ba` | Check: are there files in `workflow/01_project_info/`? |
| Nothing happens on `/discovery` | Check: are there files in `workflow/01_project_info/`? See point 12. |
| FAIL status in conversion | `pip install -r .claude/scripts/requirements.txt` |
| WARN status for PDF | Scanned PDF — not readable without OCR |
| Q-XXX still unanswered | Check: is `Q-XXX:` prefix present in `workflow/03_answers/`? |
| Q-XXX PARTIALLY_ANSWERED | Not an error — spec-builder extracted partial answer; stakeholder confirmation recommended. See point 5. |
| `[SCOPE:CONFLICT]` flag in SPEC_OUTPUT | Contradictory scope in client materials — discussion needed. See point 7. |
| Stop hook not signaling | Is Python installed? `python .claude/scripts/workflow_state.py --hook-check` |
| Empty BA document | Check `workflow/01_project_info/_system/SPEC_OUTPUT.md` content; is any source missing? |
| `📍 Generálás módja: DISCOVERY` header on BA docs | Not an error — Discovery→Analysis transition. For full depth: `/ba --force` |
| BA_DOCS_LOG.md or BA_DOCS_DIFF.md missing | Generation didn't complete. Run: `/ba --force`. See point 6. |
| `[No change]` header on BA doc | Not an error — selective regeneration, doc unchanged. To force: `/ba --force` |
| BC.md empty or very short | Input material has little text — try template input, see point 12. |
| Projects mixing / unexpected file references | Only one project per session — open a new Claude Code session for the other project |
| FORCED decision not incorporated | Is `forced: true` in frontmatter? Valid YAML syntax? See point 11. |
