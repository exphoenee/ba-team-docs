# 20. AI Permissions and Security Risks

## 20.1 Overview

BA Tool is built on Claude Code, which uses a **permission management system** to control what files the AI can read, write, and what terminal commands it can execute. This system prevents accidental data loss and unwanted modifications, while still allowing the workflow to run smoothly with pre-approved operations.

Permissions are configured on two levels:

| Level | File | Version Controlled | Purpose |
|---|---|---|---|
| **Project-wide** | `.claude/settings.json` | ✅ Yes (tracked by git) | Base permissions required by the entire team |
| **Local override** | `.claude/settings.local.json` | ❌ No (git-ignored) | Machine-specific additions, personal overrides |

> ⚠️ **Important:** Never commit `.claude/settings.local.json` – the `.gitignore` automatically excludes it, but verify it hasn't accidentally ended up in the staging area.

---

## 20.2 Permission Types

### Read

Defines which files and directories the AI can read. Before every read operation, the system checks whether the path matches any of the allowed patterns.

**Examples:**
```json
"Read(workflow/01_project_info/**)",
"Read(workflow/05_ba_docs/**)",
"Read(.claude/agents/**)"
```

### Write

Defines where the AI can create or overwrite files in full. This should be configured more restrictively than Read – only grant write access to locations where the workflow actually produces files.

**Examples:**
```json
"Write(workflow/01_project_info/_system/**)",
"Write(workflow/05_ba_docs/**)",
"Write(workflow/03_answers/**)"
```

### Edit (targeted modification)

Defines which existing files the AI may modify using **targeted, partial replacement**. The `Edit` permission is **handled separately from `Write`** – if only `Write(...)` is allowed for a path, Edit-based modifications will still trigger a permission prompt.

> **Note:** Memory file updates typically use the Edit tool (the memory-agent writes targeted updates into existing files). This is why both `Write` and `Edit` permissions are needed for the `.claude/memory/` folder.

**Examples:**
```json
"Edit(.claude/memory/**)",
"Edit(workflow/05_ba_docs/**)"
```

### Bash (terminal commands)

Defines which shell commands the AI may execute. Patterns use glob matching against the full command string.

**Examples:**
```json
"Bash(python .claude/scripts/run_convert.py *)",
"Bash(sha256sum *)",
"Bash(du *)"
```

---

## 20.3 Pattern Matching – How It Works

The permission system uses **glob patterns**:

| Pattern | Matches | Example Match |
|---|---|---|
| `*` | Any characters (except `/` and newline) | `Bash(python *)` → `python script.py --flag` |
| `**` | Any characters including `/` | `Read(workflow/**)` → `workflow/01_project_info/file.md` |
| `**/*_converted.md` | At any depth, ending in `_converted.md` | `01_project_info/meeting.docx_converted.md` |

**Important rules:**
- Bash patterns match the **entire command string**, not just the program name
- Read/Write patterns match the **file path** relative to the project root
- Pattern order does not matter – if any pattern matches, the operation is permitted
- If an operation does not match any allowed pattern, Claude Code asks the user for permission

> **Important:** `settings.json` is loaded at **session startup**. Changes made during an active session only take effect when the next session starts – they have no impact on the currently running workflow.

---

## 20.4 Current Permissions

### Project-wide (`.claude/settings.json`)

**Read permissions:**
| Pattern | Purpose |
|---|---|
| `Read(workflow/01_project_info/**)` | Read input materials |
| `Read(workflow/02_discovery/**)` | Read discovery outputs |
| `Read(workflow/03_answers/**)` | Read answers |
| `Read(workflow/04_decisions/**)` | Read decisions |
| `Read(workflow/05_ba_docs/**)` | Read completed documents |
| `Read(workflow/REGULATION/**)` | Compliance domain files |
| `Read(.claude/memory/**)` | Project memory |
| `Read(.claude/agents/**)` | Agent definitions (for /help) |
| `Read(.claude/skills/**)` | Skill definitions (for /help) |
| `Read(.claude/references/**)` | Reference files (/check-state, /help) |
| `Read(HANDBOOK/**)` | Handbook chapters (/help) |
| `Read(app/HANDBOOK/**)` | Alternative handbook path |

**Write permissions:**
| Pattern | Purpose |
|---|---|
| `Write(workflow/01_project_info/**/*_converted.md)` | Create converted files (including in subdirectories) |
| `Write(workflow/01_project_info/_system/**)` | Spec outputs (_system folder) |
| `Write(workflow/02_discovery/**)` | Discovery outputs |
| `Write(workflow/03_answers/**)` | Converted answer files |
| `Write(workflow/04_decisions/_system/**)` | Decision log (_system folder) |
| `Write(workflow/05_ba_docs/**)` | BA documents |
| `Write(.claude/memory/**)` | Create new project memory files |

**Edit permissions:**
| Pattern | Purpose |
|---|---|
| `Edit(.claude/memory/**)` | Targeted updates to existing memory file entries |

**Bash permissions:**
| Pattern | Purpose |
|---|---|
| `Bash(python .claude/scripts/workflow_state.py *)` | Stop hook state check |
| `Bash(python .claude/scripts/session_loader.py *)` | Session loader |
| `Bash(python .claude/scripts/run_convert.py *)` | File conversion |
| `Bash(python .claude/scripts/reset_project.py *)` | Project reset |
| `Bash(python -m convert_all *)` | Alternative conversion |
| `Bash(cd * && python -c *)` | Inline Python hash computation with directory change (source annotations) |

### Local override (`.claude/settings.local.json`)

**Bash permissions:**
| Pattern | Purpose |
|---|---|
| `Bash(sha256sum *)` | File fingerprint computation |
| `Bash(du *)` | Size estimation |
| `Bash(awk *)` | Pipe processing |
| `Bash(for * sha256sum *)` | SHA-256 in for loops |
| `Bash(ls *)` | File listing |
| `Bash(echo *)` | Output |
| `Bash(python .claude/scripts/fingerprint.py compute *)` | Fingerprint calculation |
| `Bash(python .claude/skills/convert/scripts/find_pending_images.py *)` | Image detection for conversion |

---

## 20.5 Security Risks and Recommendations

### Risk Levels

| Risk | Description | Example |
|---|---|---|
| 🔴 **High** | Operations that can cause data loss, data leakage, or irreversible changes | `Bash(rm *)` – file deletion; `Bash(git push *)` – code upload |
| 🟠 **Medium** | Operations that can cause unwanted changes but are reversible | `Write(workflow/01_project_info/**)` – overwriting input files |
| 🟢 **Low** | Read-only operations that do not modify anything | `Read(workflow/01_project_info/**)` |

### Security Principles

1. **Principle of Least Privilege:** Configure every permission as narrowly as possible. Only allow what the workflow actually needs.

2. **Write vs. Read:** Write permissions should always be narrower than read permissions. For input material folders (`01_project_info/`), only grant write access for creating converted files, not for the entire folder.

3. **Restrict Bash commands:** Bash permissions are the most dangerous because they can allow arbitrary shell commands. Only allow specific, known commands – never use catch-all patterns like `Bash(*)`.

4. **Regular review:** Periodically check `settings.json` and `settings.local.json` and remove permissions that are no longer needed.

### What NOT to do

| Prohibited pattern | Why it's dangerous |
|---|---|
| `Bash(*)` | Allows any shell command – the AI could delete files, install packages, push code |
| `Write(workflow/**)` | Allows overwriting any workflow file, including input materials |
| `Read(//**/**(/)**)` | Allows reading the entire filesystem, including passwords and secret keys |

---

## 20.6 Managing Local Settings

### Creating a Local Override

If you need a permission that is not in the project-wide `settings.json`:

1. Create the `.claude/settings.local.json` file (if it doesn't already exist)
2. Add the desired patterns to the `allow` array
3. The file is automatically excluded from git via `.gitignore`

**Example:**
```json
{
  "permissions": {
    "allow": [
      "Bash(kubectl *)",
      "Read(secrets/**)"
    ]
  }
}
```

### Testing Permissions

If an operation requests permission, take note of which command or file triggered the prompt, and add the appropriate pattern to `settings.local.json`. The Codebuff CLI shows the exact command or file path that was blocked.

---

## 20.7 `settings.json` vs `settings.local.json` – When to Use Which

| Situation | settings.json | settings.local.json |
|---|---|---|
| Required by all team members | ✅ Yes | ❌ No |
| Commands specific to your machine | ❌ No | ✅ Yes |
| IDE plugin and tool access | ✅ Yes | ❌ No |
| Experimental or temporary permissions | ❌ No | ✅ Yes |
| Security-sensitive permissions | ❌ No | ✅ Yes |

---

## 20.8 Summary

- BA Tool uses a two-tier permission system: project-wide (`settings.json`) and local (`settings.local.json`)
- Four permission types exist: **Read**, **Write** (full file create/overwrite), **Edit** (targeted modification), and **Bash** (terminal commands)
- `Edit` and `Write` are handled separately – both must be configured for folders where the workflow both creates and modifies files (e.g. `.claude/memory/`)
- Patterns use glob matching – `*` matches any characters, `**` matches any path depth
- `settings.json` is loaded at session startup – changes during a run only take effect in the next session
- Bash permissions are the most dangerous – always use the narrowest possible pattern
- The local override file (`settings.local.json`) should never be committed to git
- Follow the Least Privilege principle: only allow what is actually needed
