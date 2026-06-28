# COMPASS — A Structured Planning Protocol

**C**omprehensive **O**perational **M**apping, **P**lanning, **A**rchitecture
**S**ynthesis & **S**crutiny

A portable, project-agnostic planning protocol for non-trivial engineering work. COMPASS
ensures designs are **system-aware**, **integration-first**, and **stress-tested before
implementation begins**. Every phase considers the full state of the surrounding system
to prevent isolated silos of functionality.

> **How to adopt this document.** Wherever you see *"the system,"* *"the codebase,"* or
> *"the system map,"* substitute the concrete artifacts of your own project: your service
> inventory, your architecture docs, your issue tracker, your plans directory. COMPASS is
> a sequence of gates and outputs, not a dependency on any particular tooling.

---

## When to Use COMPASS

**Trigger COMPASS when:**

- Work involves multiple commits or architectural decisions
- New subsystems, services, or major features are introduced
- A change crosses service boundaries or touches shared interfaces
- The user explicitly requests planning, design, or brainstorming

**Skip COMPASS for:** single-file bug fixes, config changes, doc-only updates, trivial
edits. For these, go straight to the development workflow (see DOCTRINE).

The cost of COMPASS is front-loaded thinking; the payoff is avoided rework, avoided silos,
and a design record that outlives the conversation. Match the ceremony to the stakes — a
two-day feature does not need the same depth as a new subsystem, but it does need the same
*shape*.

---

## The Phases

COMPASS runs in seven phases. Each phase has a defined **output** and most have a **gate**
where the human confirms direction before the next phase begins. Do not solution before
the problem is framed; do not architect before the end-state is chosen.

```
RECON  ──▶  FRAME  ──▶  TARGET  ──▶  APPROACH  ──▶  DRAFT  ──▶  STRESS  ──▶  FINAL
 map        define       where        how           spec       break        ship
 terrain    problem      to land      to build       it        the spec     the plan
```

---

### Phase 1: RECON — Reconnaissance & System Mapping

Understand the terrain before defining the problem. **No design happens in a vacuum.**

1. Read the system map / service inventory for current state
2. Check the issue tracker for related open/in-progress work
3. Scan the planned-work backlog for overlapping efforts
4. Identify every service, library, and protocol the work could touch
5. Review recent plan files for prior art and established patterns
6. **Output:** *System Context Brief* — relevant system state, in-flight work, prior
   decisions (3–5 bullets)

**Why:** most planning failures start with incomplete context. You cannot avoid silos if
you do not know what already exists.

---

### Phase 2: FRAME — Problem Definition & Root-Cause Analysis

Define *what is wrong and why*, not what to build. Resist solutioning.

1. State the problem in one sentence
2. Analyze root causes: why does this problem exist? What gaps, bugs, or suboptimal
   patterns led here?
3. Map integration surfaces: which existing services, buses, APIs, or data stores touch
   this problem?
4. Identify constraints: design-system requirements, naming conventions, performance
   budgets, protected files
5. **Output:** *Problem Statement* — problem, causes, integration map, constraints
6. **Gate:** the human confirms the problem framing before proceeding

---

### Phase 3: TARGET — End-State Visioning

Define *where we want to end up*, not how to get there. Separate destination from route.

1. Propose 3–4 distinct end-state visions (outcomes, not solutions)
2. For each: a one-paragraph description, the key differentiator, and the integration
   depth (isolated → connected → deeply integrated)
3. Score each against: scalability, modularity, design-system fit, implementation effort,
   silo risk
4. **Output:** *End-State Matrix* — options with scores and trade-offs
5. **Gate:** the human selects or synthesizes the target end-state

---

### Phase 4: APPROACH — Solution Architecture

Define *how* at the structural level. Stay above implementation details.

1. Propose 2–3 high-level approaches to reach the selected end-state
2. For each: implementation strategy, technology choices, integration touch points, effort
   estimate, risk profile
3. Evaluate against: scalability, modularity, integrability, design-system compliance,
   naming-convention compliance
4. **Output:** *Approach Comparison* — trade-offs and a recommendation
5. **Gate:** the human selects an approach

---

### Phase 5: DRAFT — Design Document

The full technical specification. This is the artifact that outlives the conversation.

1. Write the complete design doc:
   - Architecture overview (a diagram showing where this sits in the system)
   - Data models, schemas, API contracts
   - Service interactions: messages, HTTP calls, shared state
   - UI surfaces (if any): design-system references, token usage, animation (see IRON SIGHT)
   - Naming: a codename for any new service/daemon/tool (see *Naming*, below)
   - Migration plan (if modifying existing behavior)
   - File inventory: every file to create or modify
   - Issue breakdown: a parent epic plus child tasks
2. Save the doc to your plans directory (see *Plan File Format*, below)
3. **Output:** *Draft Design Doc*

---

### Phase 6: STRESS — Adversarial Review

Break the design before building it. One pass, multiple lenses. This is **not**
count-based — continue until every lens has been applied to every significant decision.

**Review lenses** (apply each to every major design decision):

| Lens | Question | What it catches |
|------|----------|-----------------|
| **"So what?"** | Why does this matter? What fails if we skip it? | Gold-plating, unnecessary complexity |
| **"And then?"** | What are the downstream consequences? Second-order effects on other services? | Cascade failures, hidden coupling |
| **Silo check** | Does this create isolated functionality? Could it share interfaces, data, or patterns with existing services? | Fragmentation, duplicate work |
| **Scale** | What happens at 10× load? 100× data? Does the design degrade gracefully? | Bottlenecks, O(n²) traps |
| **Failure modes** | What breaks? How is the failure detected? How does the system recover? | Missing error handling, unmonitorable state |
| **API surface** | Is the interface minimal? Could other services use it? Is it transport-compatible? | Over-exposure, under-exposure |
| **Design system** | Does every UI surface comply? Tokens, fonts, panels, tooltips, animation? | Visual inconsistency (see IRON SIGHT) |
| **Naming** | Does every new entity have a proper codename? Is it registered in the inventory? | Convention violations |
| **Security** | Does this expose new attack surface? Auth, validation, egress? | Injection, privilege, data leakage |
| **Reversibility** | Can this be rolled back? What is the blast radius of a revert? | Irreversible migrations, hard dependencies |

Document findings as an annotated appendix on the draft. Fix what is fixable inline; flag
what needs a human decision.

**Output:** annotated draft with a decision log and open questions.

---

### Phase 7: FINAL — Proposal Document

Incorporate all refinements into the final design doc:

1. Clean architecture with a system-position diagram
2. Complete issue hierarchy (epic → tasks)
3. Implementation sequence with dependency ordering
4. Risk register with mitigations
5. Success criteria: how do we know this worked?
6. Update the plan file with the final content
7. **Output:** *Final Design Doc* ready for implementation

When the final doc is approved, create the tracker epic and child issues, then begin the
development workflow (see DOCTRINE) for implementation.

---

## Plan File Format

All plans persist to a plans directory as decision records. They are **never ephemeral** —
they document what was considered, decided, and deferred.

**Filename:** `plans/{slug}_{hash}.plan.md`

**Required YAML frontmatter:**

```yaml
---
name: Human-readable plan name
overview: One-paragraph summary
compass_phase: recon | frame | target | approach | draft | stress | final
todos:
  - id: unique-slug
    content: Description of implementation task
    status: pending | in_progress | completed
isProject: false
---
```

**Required sections in the body:**

- Architecture overview with system position
- Design rationale — why this approach over the alternatives
- Scope boundaries — what is explicitly out of scope
- Integration map — which services are touched and how
- Risks and trade-offs — known concerns, performance implications
- Decision log — choices made during STRESS, each with rationale

Plans are updated as work progresses through the development workflow. The plan stays in
the repository as a decision record even after implementation is complete.

---

## Naming — Codenames

COMPASS designs name their new entities with **codenames** following a consistent
convention, so the system reads as a coherent whole. The convention (shared with IRON
SIGHT's naming section):

1. **Pick a word first** — mythological, military, scientific, or literary. It should
   sound like it belongs on a command-center display.
2. **Reverse-engineer the acronym** — force the letters to describe the technical function.
3. **The word hints at the role** — `LAZARUS` = recovery, `FORGE` = building,
   `SENTRY` = watching.

**Acceptable themes:** mythology, military operations, science, Shakespeare, architecture,
navigation.

**Unacceptable:** trademarked fictional AI (no JARVIS/FRIDAY), cute names (no
BUDDY/HELPER), generic Java-style suffixes (no MANAGER/HANDLER), acronym-first
construction, unpronounceable strings.

Every new service/daemon/tool gets a codename, registered in the system inventory as part
of the DRAFT phase.

---

## Relationship to the Other Protocols

| Protocol | Role |
|----------|------|
| **COMPASS** (this doc) | *How to plan* — the structured path from problem to approved design |
| **DOCTRINE** | *How to build* — the disciplined development workflow that implements an approved plan |
| **IRON SIGHT** | *How it should look and behave* — the design system any UI surface in the plan must comply with |

COMPASS produces the plan; DOCTRINE executes it commit by commit; IRON SIGHT governs any
operator-facing surface the plan introduces.

---

*COMPASS — portable edition. Generalized from a private engineering methodology into a
product-agnostic planning protocol. The phases, gates, and outputs are meant to be used
as-is; the tracker, inventory, and plans-directory references are placeholders for your
own tooling.*
