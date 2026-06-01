# `/add-decision` — Add FORCED Decision

Quickly create a FORCED decision file (SDEC-XXX) in `workflow/04_decisions/` with YAML frontmatter.

## Usage

```
/add-decision "FR-003 priority should be changed from High to Medium because the client reduced the budget."
```

If you don't provide text, the skill will ask interactive questions.

## What it does

1. Interprets the provided decision text
2. Automatically generates the next SDEC identifier (SDEC-XXX)
3. Checks if the target FR-XXX/NFR-XXX exists in the spec (if a spec exists)
4. Asks back if anything is missing (target, decision type, decision maker)
5. Creates the YAML frontmatter SDEC file in `workflow/04_decisions/`
6. Suggests running `/ba --force`

## Example

```
/add-decision "OVERRIDE: FR-005 priority should be set to Low because the client removed this feature from scope."
```

## Tip

The decision is incorporated into the spec after `/ba --force`. `/add-decision` **only creates** the file — it does not start the workflow.
