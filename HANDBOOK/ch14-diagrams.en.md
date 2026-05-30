# 14. Diagram Creation (/mermaid-diagrams)

BA Team automatically creates Mermaid diagrams for every process description. You can also request standalone diagrams:

```
/mermaid-diagrams please draw the claims processing workflow
```

## Diagram Types

| Situation | Diagram type |
|---|---|
| Business process steps | `flowchart` |
| System communication | `sequenceDiagram` |
| State transitions | `stateDiagram-v2` |
| Data entities and relationships | `erDiagram` — ER diagram |
| Stakeholder connections | `graph LR` |
| Project timeline | `gantt` |

## Viewing Diagrams

1. Open an `.md` file in VS Code
2. Press `Ctrl+Shift+V` (Windows) / `Cmd+Shift+V` (Mac)
3. The Mermaid diagram renders visually

---

# 13. Automatic Notifications

The system automatically checks the workflow state after every Claude response.

## Activating the Stop Hook

Notifications work through a **Stop hook** configured in `.claude/settings.json`:

1. Open the project in VS Code
2. Copy the hook configuration:
   ```
   cp .claude/settings.json.example .claude/settings.json
   ```
3. Verify the `.claude/settings.json` contains a `"hooks"` section
