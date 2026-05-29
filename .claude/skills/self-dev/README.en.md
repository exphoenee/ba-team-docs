# /self-dev – System Development Requests

## Purpose

Use `/self-dev` to submit development, improvement, or modification requests for the **BA Tool system itself** — adding new agents, modifying existing skills, fixing templates, or changing architecture.

The system **does not execute** the change — it captures the request and forwards it to the developer.

## Usage

```
/self-dev <description of the development request>
```

**Examples:**

```
/self-dev add a new agent that automatically validates Mermaid diagrams in generated documents

/self-dev the spec-builder generates too few FRs, extend the domain checklist

/self-dev the BRD template is missing the approval chain section, please add it
```

## What counts as a development request?

| Type | Example |
|---|---|
| **New agent** | "We need an agent that..." |
| **New skill** | "Let's create a /check command..." |
| **Modify existing** | "The spec-builder doesn't handle X correctly" |
| **Template fix** | "The BRD template is missing Y" |
| **Architecture change** | "We should restructure the workflow" |
| **Bug fix** | "The rca-agent crashes when..." |

## What is NOT a development request?

- Running BA projects (`/ba`, `/discovery`, `/rca`)
- Questions about how to use the system
- Help requests about the workflow

Use the appropriate BA commands for these.
