# DOCTRINE — A Disciplined Development Workflow

**D**isciplined **O**perations, **C**ommit **T**racking, **R**edline **I**ntegration &
**N**otated **E**ngineering

A portable, project-agnostic development workflow for agentic and human engineering alike.
Under DOCTRINE every change is **atomic**, **tested**, **tracked**, and **pushed**. These
behaviors are **automatic** — the agent executes them without being asked.

> **How to adopt this document.** *Redline* is the name of the reference issue tracker;
> substitute your own (Linear, Jira, GitHub Issues, Plane, etc.) wherever you see
> *"the tracker."* Substitute your own test runner wherever you see *"the test suite,"*
> your own linter wherever you see *"the linter,"* and your own deploy mechanism wherever
> you see *"the deploy pipeline."* The disciplines are the point; the tools are swappable.

---

## The Core Loop

Every unit of work flows through the same loop. Internalize it until it is reflex:

```
track  ──▶  implement  ──▶  gate  ──▶  commit  ──▶  push  ──▶  document  ──▶  next
issue       one logical    lint +     atomic      to the     update the    pull the
first       change         test       diff        branch     tracker       next unit
```

No step is optional. A change that is implemented but not tracked, gated but not
documented, or committed but not pushed is **incomplete work**.

---

## Session Lifecycle

**On session start:**

1. Check the tracker for relevant open / in-progress issues.
2. If the request maps to an existing issue, reference it. If not, create one before
   writing code.

**On session end:**

1. Every issue touched is in the correct status (`review` or a terminal `done` state).
2. Any deferred work becomes a new issue or a `[NEXT]` comment on the parent.
3. Summarize to the human: what was done, what remains, and any scaling/optimization notes.

---

## Issue-First Development

Before writing code, ensure the work is tracked. Pick the right project, then:

- **Existing issue?** → set status to `in_progress`, begin work.
- **New work?** → create an issue first, then begin work.
- **Multiple logical pieces?** → create a parent epic with one child issue per logical unit.

**Required metadata on every issue:**

- **assignee** — who owns it
- **labels** — at least one scope tag (subsystem name) plus a source tag (e.g.
  `manual` / `automated`)
- **priority** — `low` | `medium` | `high` | `critical`

**Issue types:** `bug`, `task`, `feature`, `refactor`, `cleanup`, `epic`.

**Statuses (active):** `backlog`, `todo`, `in_progress`, `review`.
**Statuses (terminal):** `done_fixed`, `done_wai` (working as intended), `done_duplicate`,
`done_infeasible`, `done_norepro`, `done_obsolete`.

The tracker is the source of truth for *what is being worked on and why*. Code without a
tracked reason is undocumented intent.

---

## Atomic Commit Protocol

**One commit = one logical change.** A logical change is the smallest unit that:

- Makes sense on its own (no broken intermediate states)
- Could be reverted independently without breaking unrelated code
- A reviewer would approve as a single coherent diff

**Never combine in one commit:**

- Refactors + feature additions
- Bug fixes + unrelated cleanups
- Test changes + implementation changes (unless the test exists solely for that
  implementation)
- Changes to different subsystems that do not depend on each other

Even if the human requests several things in one message, each logical unit gets its own
commit-push cycle. Work in sequence: **implement → gate → commit → push → document → next**.

---

## Pre-Commit Gates

Run before **every** commit, in order. Do not commit with a failing gate.

1. **Lint** — run the linter; introduce no new errors against the established baseline.
2. **Test** — run the full suite **in parallel** (see *Testing*, below); introduce no new
   failures.
3. **Conflicts** — `git status`; no unresolved merge markers.
4. **Design system** (if the commit touches UI/CSS/frontend) — comply with IRON SIGHT:
   no hardcoded values (use tokens), the three-font system, glass panels, a tooltip on
   every interactive element, no static indicators, and token parity across runtimes.
5. **Naming** (if the commit introduces a new service/daemon/tool/subsystem) — it has a
   codename per the naming convention and is registered in the system inventory.

**If a gate fails:**

- Fix it within the same logical unit, then re-run the gates.
- Do **not** commit with failing gates. No "fix later" commits.
- If the fix is non-trivial and out of scope, file a separate issue for it.

---

## Testing — Parallel by Default

**Always run the test suite in parallel.** Serial runs on a large suite are slow enough
that they tempt agents to sample a subset or to use fail-fast flags in ways that mask
downstream failures. Use the cores you have.

- **Full-suite baseline run** — use for pre-commit, CI parity, and coverage verification.
  Distribute across workers, tolerate worker restarts, and quarantine hangs with a
  per-test timeout.
- **Targeted iterative run** — while editing one module, run that module's tests with
  `term-missing` coverage for a fast feedback loop. But **verify cross-cutting changes
  against the full suite**, never against a single file.

**Coverage targets** (tune to your project's risk profile):

- Whole codebase: a high floor (e.g. **≥ 90%**)
- Any individual file: a hard minimum (e.g. **≥ 80%**, no exceptions)
- Safety-critical / recovery-critical modules: near-total (e.g. **≥ 98%**)

**Anti-patterns — do not do these:**

- Serial fail-fast (`-x` with no parallelism) — hides downstream issues on the first flake.
- Running one test file as "verification" of a cross-cutting change — always run the full
  suite for verification.
- Marking flaky tests skipped/xfail to make CI green — fix the underlying race, or sideline
  it only with a tracked issue.
- Changing tests to pass broken code — fix the production code (TDD); if the fix is
  cross-system, defer to a tracked consolidation issue.

Each distinct language/runtime surface (e.g. a backend suite and a separate frontend
suite) is gated independently. A change that touches both runs both.

---

## Subagent Policy

Use subagents **liberally** for complex work that spans multiple subsystems or code areas.
Do not try to hold an entire multi-file, cross-subsystem change in a single context.

**When to spawn subagents:**

- Work spans 3+ files across different subsystems
- Exploration is needed before implementation (use read-only explore agents)
- Independent research tasks can run in parallel (e.g. "how does X work?" +
  "find all uses of Y")
- Isolated experiments or alternative approaches

**How to use them effectively:**

- Give each subagent a tightly scoped, self-contained task with full context — file paths,
  function names, and constraints. Subagents cannot see the prior conversation.
- Run independent subagents in parallel (multiple calls in one message).
- Use explore agents for investigation, general-purpose agents for multi-step
  implementation.

**Do not** use subagents for trivial single-file edits or when you already know exactly
what to change. The overhead is not worth it for a five-line fix.

---

## Branch Model

- **`main`** (or `master`) — stable / production. Updated only via a release process,
  never by direct commit.
- **`dev`** — the default working branch. All DOCTRINE commits land here.
- **Feature branches** (`feat/*`, `fix/*`, `exp/*`) — branch from `dev`, merge back to
  `dev`.

Push to the working branch immediately after each commit. Do not accumulate local commits.
Never push directly to the production branch; release through the defined process.

---

## Commit + Push

```bash
# Commit format: type(scope): description (#issue-id)
git add <files>
git commit -m "feat(engine): streaming token renderer (#407)"
git push
```

**Types:** `fix`, `feat`, `refactor`, `docs`, `style`, `test`, `chore`.
**Scope:** the subsystem name (e.g. `engine`, `ui`, `api`).

---

## Post-Commit Documentation

After each successful commit + push, update the tracker:

1. **Link the commit** to the issue (hash, branch, first line of the message).
2. **Add a commit comment** to the issue summarizing *what* changed, *which files*, and
   *test results*.
3. **Resolve the issue** with the appropriate terminal status when the work is complete.
4. **Scaling/optimization notes** — if the change has known performance implications, add a
   `[SCALING]` comment.
5. **Next steps** — if follow-up work exists, create a child issue (linked to the current
   one) or add a `[NEXT]` comment.

---

## Documentation Maintenance

Changes that alter architecture, add subsystems, or modify public interfaces must update
the relevant docs **in the same commit** — not as a follow-up:

| Change type | Update required |
|-------------|-----------------|
| New service/daemon/tool | System inventory: table entry + architecture diagram |
| New UI component | Verify against IRON SIGHT and the live mockup |
| New design token | Every runtime's token source (CSS + code constants must stay in parity) |
| Architecture change | The architecture document |
| New codename | The system inventory |
| New design doc | The docs index — keep the catalog current |

The docs are the source of *intent*; code is the *current state*. When uncertain how a
subsystem was designed, read the doc first rather than reverse-engineering from code.

---

## Merge Conflict Resolution

1. `git pull --rebase origin dev` to surface conflicts.
2. Resolve each file, preserving the intent of the current branch.
3. Run the full gate suite (lint + tests) after resolution.
4. Commit: `fix: resolve merge conflicts (#id)`.
5. Push immediately.

---

## Deploy Discipline

If your project deploys to a managed environment, hold one rule above all:

**Every fix ships through the repository.** The loop is: edit in the repo → gate → commit →
push → deploy *from the pushed code*. Never mutate a deployed environment out of band — no
hand-copying files, no hot-patching, no editing source in place on a server. The deployed
environment must stay byte-for-byte reproducible from a clean checkout. If a change is not
committed, pushed, and pulled down by the deploy mechanism, **it did not happen**.

Where multiple deploy surfaces exist (e.g. a local install and a container fleet), never
conflate them: each has its own checkout and its own update path. Out-of-band drift in any
one of them silently desynchronizes it from the real, reproducible state.

---

## Protected Files

Maintain an explicit list of files the workflow must **not** modify without deliberate
human sign-off — typically environment files, secret stores, and committed configuration
that production depends on (e.g. `.env`, `config.yaml`, `settings.*`, lockfiles). Treat
edits to these as out-of-scope unless the task is specifically about them.

---

## Relationship to the Other Protocols

| Protocol | Role |
|----------|------|
| **COMPASS** | *How to plan* — produces the approved design that DOCTRINE implements |
| **DOCTRINE** (this doc) | *How to build* — the disciplined, tracked, tested commit loop |
| **IRON SIGHT** | *How it should look and behave* — the design-system gate inside DOCTRINE's pre-commit checks |

DOCTRINE is where the plan becomes code. It consumes COMPASS plans and enforces IRON SIGHT
on every UI-touching commit.

---

*DOCTRINE — portable edition. Generalized from a private engineering methodology into a
product-agnostic workflow. The disciplines (issue-first, atomic commits, parallel testing,
in-commit doc maintenance, ship-through-the-repo) are meant to be used as-is; the tracker,
test runner, linter, and deploy references are placeholders for your own tooling.*
