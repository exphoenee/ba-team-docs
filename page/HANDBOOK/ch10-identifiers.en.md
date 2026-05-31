# 9. Type Indicators and Identifiers

## Requirement and Document Identifiers

**Discovery phase identifiers:**

| Identifier | Type | Description |
|---|---|---|
| `PROB-XXX` | Business problem | Identified problem or pain point |
| `RC-XXX` | Root cause | Cause behind the problem (5 Whys method) |
| `GOAL-XXX` | Business goal | Measurable business outcome |
| `MVP-XXX` | MVP element | Must-have for first release |
| `ST-XXX` | Stakeholder | Person or role involved |
| `RISK-XXX` | Risk | Early risk or uncertainty |
| `A-XXX` | Assumption | What Discovery relies on but isn't confirmed |
| `Q-XXX` | Open question | Question to take to the next meeting |

**Analysis phase identifiers:**

| Identifier | Type | Description |
|---|---|---|
| `FR-XXX` | Functional requirement | What the system must do |
| `NFR-XXX` | Non-functional requirement | Performance, security, scalability |
| `US-XXX` | User Story | Agile format user need |
| `BR-XXX` | Business requirement | High-level business goals |
| `A-XXX` | Assumption | What the spec relies on |
| `Q-XXX` | Question | Missing information to clarify |
| `DEC-XXX` | Decision | Logged AI session decision |
| `SDEC-XXX` | Stakeholder decision | FORCED override |

## Source and Status Markers

| Marker | Meaning |
|---|---|
| `[EXPLICIT]` | Client explicitly stated in source |
| `[INFERRED]` | AI logically inferred |
| `[INFERRED:LOW]` | Easily inferable, common assumption |
| `[INFERRED:MED]` | Domain-typical assumption |
| `[INFERRED:HIGH]` | Cannot be inferred clearly → automatic RISK item |
| `[SCOPE:CONFLICT]` | Same element both IN and OUT OF SCOPE — decision needed |
