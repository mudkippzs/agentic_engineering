# Agentic Engineering

A portable, project-agnostic methodology for building software with AI coding agents (and
humans) under discipline. Three protocols, each answering a different question:

| Protocol | Question it answers | Document |
|----------|---------------------|----------|
| **COMPASS** | *How do we plan?* | [`compass/COMPASS.md`](compass/COMPASS.md) |
| **DOCTRINE** | *How do we build?* | [`doctrine/DOCTRINE.md`](doctrine/DOCTRINE.md) |
| **IRON SIGHT** | *How should it look and behave?* | [`iron-sight/IRON-SIGHT.md`](iron-sight/IRON-SIGHT.md) |

They compose into a single pipeline:

```
                  COMPASS                DOCTRINE              IRON SIGHT
problem  ───▶  plan & design  ───▶  build, test, ship  ◀──▶  govern every UI surface
              (7 gated phases)      (atomic commit loop)     (design-system contract)
```

- **COMPASS** takes a non-trivial problem from reconnaissance to an approved, stress-tested
  design document — system-aware and integration-first, so features don't land as silos.
- **DOCTRINE** executes that design as a disciplined loop: issue-first, atomic commits,
  parallel testing, in-commit documentation, and ship-through-the-repo deploy hygiene.
- **IRON SIGHT** is the design bible any operator-facing surface must comply with — a
  living, data-driven, command-center interface philosophy with a verbatim token palette,
  motion language, component grammar, and anti-pattern catalog.

## Origin & Scope

These protocols were extracted from a private, product-specific engineering system and
generalized so they carry **no dependency** on any particular product, service roster,
issue tracker, test runner, or codebase. Each document explains how to substitute your own
tooling for the placeholder references it contains.

This repository is the **maintained, canonical home** of the project-agnostic editions.
Product-specific adaptations may live downstream in individual projects; this is where the
portable source of truth evolves.

## Learn it interactively

The repo ships an **educational, visual-first web app** — an academy that teaches all three
protocols *by exploring, not just reading*. Each protocol is a pillar with five chapters,
and every chapter pairs a live interactable (trigger classifiers, a phase stepper, a deploy
simulator, a three-axis report card, …) with key takeaways, a knowledge check, and
cross-links. The app is itself an IRON SIGHT surface — it eats its own dog food.

No build step, no dependencies — **just open `webapp/index.html`** in any browser (it runs
directly from `file://`). Or serve it if you prefer:

```bash
cd webapp
python3 -m http.server 8080
# open http://localhost:8080
```

## Adopting the Suite

1. **Read IRON SIGHT first** if you build any UI — it defines the values (colors, fonts,
   timing) you use verbatim and the names you replace with your own namespace.
2. **Wire DOCTRINE to your tooling** — map *the tracker*, *the test suite*, *the linter*,
   and *the deploy pipeline* onto your real tools. Adopt the disciplines as-is.
3. **Trigger COMPASS for non-trivial work** — anything multi-commit, cross-service, or
   architecturally significant. Skip it for trivial fixes.

## Layout

```
agentic_engineering/
├── README.md                  # this file
├── CLAUDE.md                  # unifying agent instructions — activates the suite
├── compass/
│   └── COMPASS.md             # structured planning protocol
├── doctrine/
│   └── DOCTRINE.md            # disciplined development workflow
├── iron-sight/
│   └── IRON-SIGHT.md          # command-center interface design bible
├── skills/
│   ├── INDEX.md               # catalog of bespoke, user-defined skills
│   └── _template/SKILL.md     # authoring template (atom + persona tiers)
└── webapp/                    # interactive academy that teaches the three protocols
    ├── index.html             # shell + module entry
    ├── css/                   # IRON SIGHT token source + components
    └── js/                    # curriculum data, interactive widgets, router
```

`CLAUDE.md` is the operating contract: it wires the three protocols together, defines the
naming convention, and links the skills library. Drop it (and the protocol folders) into
an adopting project, fill in the *Project Overview*, and the methodology is active.
