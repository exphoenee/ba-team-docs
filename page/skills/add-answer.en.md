# `/add-answer` — Add Answer

Quickly save stakeholder answers to the `workflow/03_answers/` folder.

## Usage

```
/add-answer "Q-003: The system should support three roles: Admin, Operator, Viewer."
```

If you don't provide text, the skill will ask interactive questions.

## What it does

1. Interprets the provided text
2. Checks if the Q-XXX ID exists in the spec (if a spec exists)
3. Asks back if it finds contradictions or missing data
4. Saves the file to `workflow/03_answers/`
5. Suggests running `/ba`

## Examples

```
/add-answer "Q-001: Yes, the system must support browser access."
/add-answer "Q-003: Admin, Operator and Viewer roles"
```

## Tip

`/add-answer` **only saves** — it does not start the workflow. Run `/ba` after saving to incorporate the answer.
