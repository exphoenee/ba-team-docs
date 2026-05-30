# self-care-agent

> Orchestrator for the BA Tool self-development lifecycle: capturing, analysing, implementing, and tracking feature requests.

[Magyar változat](self-care-agent.md)

---

## Role in the workflow

`self-care-agent` manages the BA Tool's own development process. It operates in two modes: **analyze** (requirement capture, architectural analysis, Q&A, saving, Formspree) and **implement** (executing the TODO checklist of an approved featureRequest, updating status). The `/self-dev` and `/self-improve` skills act as thin dispatchers.

## When it's activated

- `/self-dev <description>` → `mode: analyze` — capture a new feature request
- `/self-improve [filename]` → `mode: implement` — implement an approved request
- `mode: auto` — inspects `app/featureRequests/` and decides based on status

## What it produces

| Mode | Output |
|---|---|
| analyze | `app/featureRequests/YYYY-MM-DD_<name>.md` — full analysis + TODO checklist |
| implement | Created/modified files in the app; updated TODO checkboxes; final status |

## Related components

| Component | Relationship |
|---|---|
| `/self-dev` skill | Dispatches it in analyze mode |
| `/self-improve` skill | Dispatches it in implement mode |
| `app/featureRequests/` | Reads and writes (status, checkboxes) |
| Formspree script | Called at the end of analyze mode (developer notification) |
