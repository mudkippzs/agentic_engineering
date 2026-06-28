---
name: skill-id-with-hyphens
description: One sentence on what this skill does. Use when <specific trigger phrase or intent>.
license: Proprietary
metadata:
  id: skill_id_with_underscores
  tier: atom
  category: general
  # codename: OPTIONAL   # add for Tier 2 personas; omit for plain atoms
---

<!--
=============================================================================
AUTHORING TEMPLATE — copy this folder to skills/<id>/ and replace everything.

- Frontmatter `name` uses hyphens (open Agent Skills standard).
- `metadata.id` = folder name = snake_case, the stable reference used in prompts.
- `description` is the discovery field — make the trigger obvious; ≤1024 chars.
- Keep this file under ~500 lines. Push long reference material into
  references/*.md and link to it from the body (progressive disclosure).
- Add a row to skills/INDEX.md when you add a skill.

Pick ONE of the two tiers below and delete the other.
=============================================================================
-->

## Tier 1 — Atom (tool wrapper)

For skills that expose one or a few tightly-related tools. Target: 30–80 lines.

# Skill: skill_id_with_underscores

## Goal
One sentence: what this skill accomplishes.

## When to use
- Trigger phrase or user intent
- Another trigger

## Tools

| Tool | Arguments / return |
|------|--------------------|
| `tool_name` | Key params; shape of the return value |

## Procedure
1. Numbered step with the specific tool + argument shape.
2. Next step.

## Failure modes
- **\<Error type\>** — what to say or do.

## Limits
- Any gating config or preconditions.

<!--
=============================================================================
## Tier 2 — Persona / Protocol (composite playbook)

For skills that orchestrate multiple tools across multi-step reasoning, carry a
named persona, or encode a full protocol. Target: 100–300 lines. Add
`codename:` to the frontmatter.

# Skill: skill_id_with_underscores — CODENAME

**\<Backronym expansion\>**

## Goal
What the persona accomplishes and the posture it adopts.

## Relationship to other skills
| Skill | Role |
|-------|------|
| `other_skill` | How it composes with this one |

## Protocol
1. Phase one — steps, tools, decision points.
2. Phase two — ...

## Failure modes
- **\<Error type\>** — handling.
=============================================================================
-->
