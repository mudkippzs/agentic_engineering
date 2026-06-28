# Agent Instructions — Agentic Engineering

This file is the unifying entry point for the **Agentic Engineering** methodology. It
activates three protocols and a skills library, and tells any coding agent (Claude Code,
Cursor, or otherwise) how to operate in this project.

> **Adopting this in your own project.** This `CLAUDE.md` is product-agnostic. Fill in the
> *Project Overview* below, map the placeholder tooling references in DOCTRINE onto your
> real tools (tracker, test runner, linter, deploy), pick a namespace for IRON SIGHT
> tokens, and you have a working operating contract. The protocols are designed to be
> copied verbatim; only the *Project Overview* and tooling bindings are project-specific.

## Project Overview

<!-- Replace this block in your adopting project. -->
This repository is the maintained, canonical home of the project-agnostic editions of
COMPASS, DOCTRINE, and IRON SIGHT. Work here is itself governed by these same protocols.

---

## The Three Protocols

All work routes through three protocols. Read the linked document before applying it.

| Protocol | Question | Document | When it governs |
|----------|----------|----------|-----------------|
| **COMPASS** | *How do we plan?* | [`compass/COMPASS.md`](compass/COMPASS.md) | Non-trivial, multi-commit, or cross-cutting work — before any code |
| **DOCTRINE** | *How do we build?* | [`doctrine/DOCTRINE.md`](doctrine/DOCTRINE.md) | Every change, always — the commit loop |
| **IRON SIGHT** | *How should it look/behave?* | [`iron-sight/IRON-SIGHT.md`](iron-sight/IRON-SIGHT.md) | Every operator-facing UI surface |

```
                  COMPASS                DOCTRINE              IRON SIGHT
problem  ───▶  plan & design  ───▶  build, test, ship  ◀──▶  govern every UI surface
              (7 gated phases)      (atomic commit loop)     (design-system contract)
```

### COMPASS — Planning (binding)

Trigger COMPASS for new subsystems/features, cross-service changes, anything multi-commit,
or any explicit request to plan/design. Skip it for single-file fixes, config changes, and
doc-only edits. COMPASS runs seven gated phases (RECON → FRAME → TARGET → APPROACH → DRAFT
→ STRESS → FINAL) and persists a decision record to the plans directory. **Do not solution
before the problem is framed; do not architect before the end-state is chosen.** See
[`compass/COMPASS.md`](compass/COMPASS.md).

### DOCTRINE — Development workflow (automatic)

Every change is **atomic, tested, tracked, and pushed** — without being asked. The core
loop is non-negotiable:

```
track issue ─▶ implement one logical change ─▶ gate ─▶ commit ─▶ push ─▶ document ─▶ next
```

Pre-commit gates (in order): **lint → full parallel test suite → no merge conflicts →
IRON SIGHT compliance (if UI) → naming/codename registered (if new entity)**. One commit =
one logical change. Ship every fix through the repository — never hot-patch a deployed
environment. See [`doctrine/DOCTRINE.md`](doctrine/DOCTRINE.md).

### IRON SIGHT — Design bible (mandatory for UI)

All UI work follows [`iron-sight/IRON-SIGHT.md`](iron-sight/IRON-SIGHT.md). Non-negotiable.
Quick reference:

- **Tokens, never hardcode** — colors, fonts, and timing come from one token source,
  mirrored across every runtime (CSS + code constants in parity).
- **Three fonts only** — one display face (drama), one UI face (flow), one mono face
  (data/truth). No fourth family.
- **Glass panels**, not opaque walls. **Static means dead** — animation encodes liveness
  and binds to live data. **Tooltip on every interactive element** — define meaning, risk,
  and scope, not mechanics.
- Gate every new surface on the **Fuidgetry Detector** and the **Three-Axis
  Self-Assessment** before merge.

---

## Naming Convention — Codenames

Every service, daemon, tool, and subsystem gets a codename that is simultaneously a real
word and a forced backronym:

1. **Pick a word first** — mythological, military, scientific, or literary. It must sound
   like it belongs on a command-center display.
2. **Reverse-engineer the acronym** — force the letters to describe the technical function.
3. **The word hints at the role** — `LAZARUS` = recovery, `FORGE` = building,
   `SENTRY` = watching.

**Acceptable:** mythology, military ops, science, Shakespeare, architecture, navigation.
**Unacceptable:** trademarked fictional AI (no JARVIS/FRIDAY), cute names (no
BUDDY/HELPER), generic Java-style suffixes (no MANAGER/HANDLER), acronym-first
construction, unpronounceable strings.

Register every new codename in your system inventory as part of COMPASS's DRAFT phase. The
full naming guide lives in IRON SIGHT (§ Naming Convention) and COMPASS (§ Naming).

---

## Skills

Bespoke, user-defined skills live in [`skills/`](skills/) — markdown playbooks that extend
what the agent knows how to do in this project. Each skill is a self-contained folder with
a `SKILL.md` and optional `references/`.

- **Catalog:** [`skills/INDEX.md`](skills/INDEX.md) — the list of available skills and
  their triggers. Consult it when a task might match an existing skill.
- **Authoring template:** [`skills/_template/SKILL.md`](skills/_template/SKILL.md) — copy
  it to start a new skill.
- **Authoring guide:** see *Authoring Skills*, below.

**How skills are used:** when a task matches a skill's `description` / trigger, read that
skill's `SKILL.md` first and follow it. Skills are progressive-disclosure — keep `SKILL.md`
lean and push long reference material into `references/*.md`, loaded on demand.

### Authoring Skills

Skills follow the open [Agent Skills](https://agentskills.io) format: a markdown body with
YAML frontmatter. The frontmatter is the discovery surface (how the agent decides a skill
is relevant); the body is the playbook.

**Frontmatter (required):**

```yaml
---
name: skill-id-with-hyphens         # open-standard id; the folder stays snake_case
description: What this skill does. Use when <trigger>.   # ≤1024 chars; the discovery field
license: <your license or "Proprietary">
metadata:
  id: skill_id                      # canonical repo id (snake_case = folder name)
  tier: atom | persona              # Tier 1 (tool wrapper) vs Tier 2 (composite playbook)
  category: memory | engineering | ...   # optional filter tag
  codename: OPTIONAL                # optional persona codename; omit for plain atoms
---
```

**Rules:**

- **Skill id = folder name = `metadata.id`** = the stable reference used in prompts. Use
  lowercase `snake_case`. The frontmatter `name` uses hyphens per the open standard
  (`memory_search` → `memory-search`).
- **Progressive disclosure** — keep `SKILL.md` under ~500 lines. Move long reference
  material into `skills/<id>/references/*.md` and link from the body.
- **Index** — add an entry to [`skills/INDEX.md`](skills/INDEX.md) when you add a skill.

**Tier 1 — Atom** (one or a few tightly-related tools; target 30–80 lines): goal, when to
use, tools table, numbered procedure, failure modes, limits.

**Tier 2 — Persona / Protocol** (multi-tool orchestration, a named persona, or a full
protocol; target 100–300 lines): codename + backronym expansion, goal, relationship to
other skills, then the protocol body.

See [`skills/_template/SKILL.md`](skills/_template/SKILL.md) for the full template with
both tiers.

### Adding a skill — checklist

1. Choose the tier (atom vs persona/protocol).
2. Copy `skills/_template/` to `skills/<id>/` and write `SKILL.md` with frontmatter + body.
3. For large playbooks, add `references/` and link from `SKILL.md`.
4. Add a row to `skills/INDEX.md`.
5. Verify the `description` makes the trigger obvious, and that `read_file skills/<id>/SKILL.md` returns the file.

---

## Documentation Maintenance

Per DOCTRINE, changes that alter architecture or public interfaces update the relevant docs
**in the same commit**. For this repository specifically:

| Change | Update |
|--------|--------|
| New/changed protocol content | The protocol doc + any cross-references in the others |
| New skill | `skills/INDEX.md` |
| New design token guidance | IRON SIGHT (and keep CSS + code-constant guidance in parity) |
| Structural change | `README.md` layout section + this file |
