# /self-dev – System Development Request Analysis and Capture

## Purpose

Use `/self-dev` to submit development, improvement, or modification requests for the **BA Tool system itself**. The skill doesn't just record the request — it performs a full architectural analysis: examines how the requested feature fits into the current skill/agent ecosystem, what inter-component communication it requires, whether new templates or Python scripts are needed, then asks clarifying questions if anything is unclear.

The analysis and answers are saved as a markdown file (`app/featureRequests/`) and forwarded to the developer.

## Usage

```
/self-dev <description of the development request>
```

**Examples:**

```
/self-dev add a new agent that automatically validates Mermaid diagrams in generated documents

/self-dev the extraction-agent generates too few FRs, extend the domain checklist

/self-dev we need a /check-contract skill that extracts contract terms from uploaded PDFs
```

## What it does exactly

1. **Captures the request** — summarises what is being requested
2. **Performs architectural analysis** — reads the current skill and agent system, determines:
   - Where in the BA workflow it fits
   - Which skills and agents it connects to
   - What inter-component communication is needed (e.g. memory-agent STORE at the end)
   - Whether a new template is needed (global or skill-specific)
   - Whether a Python script is needed for token-efficient implementation
   - Which memory or workflow files need to be read / written
3. **Asks clarifying questions** — if anything is unclear, generates specific questions and waits for answers
4. **Saves the result** — to `app/featureRequests/YYYY-MM-DD_<short-name>.md`
5. **Asks for approval** — asks you to read the saved plan and confirm it
6. **Forwards to the developer** — via Formspree, and confirms receipt

## When it does nothing

If no description is provided after `/self-dev` — it asks you to describe the request.

## What counts as a development request?

| Type | Example |
|---|---|
| **New agent** | "We need an agent that automatically..." |
| **New skill** | "Let's create a `/check-contract` command..." |
| **Modify existing** | "The self-dev skill should also analyse the architecture" |
| **Template fix** | "The BRD template is missing the approval chain" |
| **Architecture change** | "We should restructure the workflow" |
| **Bug fix** | "The rca-agent crashes when SPEC_OUTPUT.md is missing" |

## What is NOT a development request?

- Running BA projects (`/ba`, `/discovery`, `/rca`)
- Questions about how to use the system
- Help requests about the workflow

Use the appropriate BA commands, or the `/help` command for these.

## Related skills

| Skill | When to use instead |
|---|---|
| `/help` | When you just have a question about how to use the system |
