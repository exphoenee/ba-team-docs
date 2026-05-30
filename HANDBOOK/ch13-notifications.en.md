# 13. Automatic Notifications and Stop Hook

## What is the Stop hook?

The BA Tool automatically checks the project state after every Claude response and notifies you if something requires attention. This mechanism is called the **Stop hook** — a Python script runs in the background, inspects the workflow folders, and displays a message in the terminal when needed.

The Stop hook does not block your work — it only informs you.

---

## When does it show a notification?

| State | Notification content |
|---|---|
| Q-XXX questions unanswered | Lists open questions and reminds you to answer them |
| FORCED decision newer than spec | Warns that the spec needs to be rebuilt |
| BA documents incomplete | Indicates that document generation has not run yet |
| Everything OK | No notification |

---

## How it works technically

The Stop hook is configured in `app/.claude/settings.json`:

```json
{
  "hooks": {
    "Stop": [
      {
        "type": "command",
        "command": "python .claude/scripts/workflow_state.py --hook-check"
      }
    ]
  }
}
```

The `workflow_state.py` script:
1. Inspects the `workflow/` folder state
2. If action is needed → prints the notification to the terminal
3. If everything is fine → exits silently (return code 0)

---

## Workflow states

The Stop hook uses the same state detection as the `/ba` skill:

| State | Condition | Hook message |
|---|---|---|
| **Empty project** | `01_project_info/` is empty | Reminder to upload materials |
| **Q-XXX unanswered** | Spec exists but there are open questions | Lists the questions |
| **FORCED decision pending** | `04_decisions/` file newer than spec | Warns about rebuild need |
| **Complete** | All Q-XXX answered, BA docs generated | No message |

---

## The `/check-state` command

For a detailed status report at any time — not just the passive Stop hook notifications — use the `/check-state` command:

```
/check-state
```

This gives an immediate, structured report of all workflow folders, the current phase, and the recommended next step. Details: [Chapter 5 — Commands](ch05-commands.en.md).

---

## Disabling notifications

To disable the Stop hook, delete or comment out the Stop section in `settings.json`. This is not recommended — notifications help you avoid accidentally skipping a required step.
