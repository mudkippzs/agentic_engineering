# IRON SIGHT — A Command-Center Interface Philosophy

**I**nterface **R**ules for **O**perational **N**avigation, **S**ignal **I**ntegration,
**G**oal-aware **H**euristics & **T**elemetry

A portable, general-purpose UI/UX specification for building **living, data-driven,
command-center interfaces** — HUDs, operational dashboards, monitoring consoles, and
agentive control surfaces. This is the generalized edition: it carries the philosophy,
palette, typography, motion language, and component grammar with no dependency on any
particular product, service roster, or codebase.

> **How to adopt this document.** Wherever you see the `--hud-*` CSS prefix or the
> `HUD_*` constant prefix, substitute your own project namespace. Wherever you see
> *"the Director"* or *"the system,"* substitute the name of your own adaptation
> engine or product. The values (colors, fonts, timing) are meant to be used verbatim;
> the names are meant to be replaced.

---

## Token Source of Truth

Maintain **one** machine-readable source for every design value, mirrored into each
runtime you target:

- **CSS / web**: a single `tokens.css` (or equivalent) imported by every surface.
- **Application code / TUI**: a single constants module that mirrors the CSS values
  one-for-one.
- **Live mockup**: an interactive reference page that renders every token, component,
  and animation in one place.

If a value exists in the token files, use it. **Never hardcode colors, fonts, or timing
values** inline. Token parity across runtimes is a build-time contract, not a
convention — divergence between two "sources of truth" is the single most common way a
design system rots (see *Token Drift*, Part VI).

---

## Codename & Dotted-Name Discipline (optional)

If your system names its services, daemons, or subsystems with codenames (recommended —
see *Naming Convention*, Part V), adopt a consistent rendering rule so the brand voice
stays coherent:

Render codenames in **dotted form** (`N.E.X.U.S`, `S.E.N.T.R.Y`) on every
**page-content** surface — documentation bodies, diagram text labels, narrative copy,
inventory tables, landing copy, and glossary definitions. Dotted form is what a reader
sees when they are *absorbing*, not *navigating*.

Render codenames in **compact undotted form** on dense status surfaces and in code:

- Top-bar status chips and live indicators
- Navigation pills and menu labels
- Code identifiers, module names, file paths, service unit names
- `aria-label` pronunciations (screen readers want spoken names)
- Glossary keys and other lowercase semantic IDs
- `<code>` / `<pre>` block contents (literal code, not branded prose)

The principle: **dotted form is the brand voice of the documentation layer; undotted
form is the operational shorthand of dense status surfaces and code.** When in doubt,
ask whether the reader is *reading* or *scanning a status indicator* — dotted for
reading, undotted for scanning.

---

## Part I: Philosophy

The philosophical foundation that governs every design decision. Nothing ships without
alignment to these constraints: context before chrome, telemetry before theater, triage
before overload.

---

### The Five Pillars

Five non-negotiable commitments. They are not aesthetic preferences. They are
operational contracts between operator, system, and surface.

---

#### 1. CONTEXT-AWARE

**The interface knows where you are — mode, time, attention, and operational
posture — and reshapes itself accordingly.**

- Surfaces adapt to the operator's current **mode**: focus, review, planning, idle.
  Layout, density, and primary affordances track the active mode; static chrome that
  ignores mode is a fault.
- Information density scales with **engagement** signals. Low engagement: spare,
  legible, low-motion. High engagement: richer stacks, faster refresh, tighter coupling
  to live state — never the reverse.
- Time-of-day and ambient adaptation route through a single **ambient channel**:
  brightness, color warmth, and motion budget track circadian and environmental context
  so the interface does not fight the human nervous system.
- Peripheral telemetry expands and contracts with **attention routing**. What sits at
  the edge is not decoration; it is a reserve channel that grows when the system infers
  spare capacity or threat.
- Modal and non-modal states respect operational context. A panel that hijacks focus
  during high-attentive work without escalation justification violates posture.

**Violation test:** If an element shows the same content, density, and prominence
regardless of mode, time of day, engagement, or attention routing, it is not
context-aware — it is wallpaper with a stylesheet.

---

#### 2. INTENTFUL

**Every element earns its pixels; nothing exists to simulate competence.**

- **Fuidgetry is banned** (per scifiinterfaces.com): decorative controls, fake metrics,
  and motion that mimics instrumentation without binding to signal are excluded.
- Animation is **data-bound**. Pulse frequency tracks health or heartbeat; glow intensity
  tracks load or severity; shimmer tempo tracks activity or churn. Constants in CSS where
  a variable from telemetry belongs are a design defect.
- Semantics of motion: if it moves, it carries state change or rate; if it glows, it is
  active or asserted; if it dims, it is deprioritized or dormant; if it is static when the
  underlying process is not, the surface is lying.
- Typography enforces hierarchy without ambiguity: a **display** family for dramatic
  anchors and primary calls; a **UI** family for scanning and narrative flow; a **mono**
  family for ground truth, identifiers, and measured values. No fourth family. No
  substitutions.

**Violation test:** Cover the element with your thumb. If the operator loses no
decision-relevant information, the pixels were fuidgetry.

---

#### 3. ACTIONABLE

**Data without next steps is noise; displays exist to change behavior or confirm
that no action is required.**

- Every data presentation must **imply or enable** an action: acknowledge, drill,
  throttle, reroute, defer, or escalate. Pure mirrors are for diagnostics consoles,
  not command surfaces.
- Status indicators ship with **threshold context**: nominal band, warning band, hard
  limit, and what crossing each band means for the system.
- Alerts bundle **recommended actions** with state. An alert that only names failure
  without proposing containment or verification is incomplete.
- **Goal-aware** panels answer what to do next, not only what exists. Current state is
  the substrate; the operator needs the delta toward objective.
- Tooltips define **meaning, risk, and scope** — never mechanics. Forbidden: "Click to
  open." Required: what this is, why it matters now, and what changes if ignored.

**Violation test:** Can the operator commit, defer, or reject a course of action from
this view alone? If they must open three other surfaces to interpret salience, the
display failed.

---

#### 4. DATA-DRIVEN

**The system breathes with real telemetry; the HUD is an instrument, not a mural.**

- Animations are **parameterized** by live streams — rates, errors, queues, latencies —
  not by fixed keyframe loops divorced from signal.
- Color escalation uses **continuous mappings** where possible. Binary flips are for
  tests and alarms, not for gradual degradation.
- Prefer **sparklines, rolling windows, and rates** over isolated point-in-time numbers.
  A single scalar without trajectory is a snapshot without physics.
- **Confidence** is visually distinct from **observation**. Model output, inference, and
  measured fact must not share the same visual register by default.
- History rides alongside present state. **Never show only "now"** without a recoverable
  trail — operator memory is not a persistence layer.

**Violation test:** Sever all data feeds. If the UI's motion, color urgency, and
density remain unchanged, the surface is scenic art, not instrumentation.

---

#### 5. PURPOSEFUL

**This is a command center, not a screensaver; prominence is budgeted like power
on a warship.**

- Every surface exists to **compress decision latency** under uncertainty.
  Entertainment value is not a success metric.
- Peripheral channels must **inform without capturing** foveal focus unless escalation
  warrants it.
- **Emergency and crisis protocols** strip to essentials: survival metrics, containment
  actions, and irreversible controls clearly bounded.
- Information hierarchy follows **decision priority**, not data availability. The
  noisiest feed does not win the center stack by default.
- The interface serves the operator. Workflows that exist to showcase the system —
  onboarding theater, vanity dashboards — are culled.

**Violation test:** Remove the most visually dominant element. If operator throughput
improves, that element served ego or brand, not mission.

---

### The JARVIS Principle

Christopher Noessel's thesis at scifiinterfaces.com is structural: **the Iron Man
is not Tony Stark; the Iron Man is JARVIS.** Stark is the strategic commander; the
suit's intelligence handles targeting, navigation, fusion of sensor streams, and
threat assessment under time pressure. The fiction encodes a division of labor
humans actually need in complex systems: the operator sets intent; the machine
stabilizes execution.

The Iron Man films also document a deliberate interface risk: the HUD behaves as
a **placebo interface** — elements reposition without explicit user request; many
persist under two seconds. It reads as omniscient assistance because motion implies
cognition. That works in cinema. In a real system, placebo adaptation is unacceptable
unless it maps to **real** state and **real** operator benefit.

Your adaptation engine — referred to throughout this document as **the Director** —
is your JARVIS: the component that computes mode, attention routing, ambient
parameters, and layout hints from live signals and operator context. Unlike cinematic
placebo, the Director's adaptations must be **genuine**: every reposition, every
density shift, every escalation maps to a real change in state. There is no feigned
magic, only contracted agency.

Every surface should behave as an **agentive display**: density, focal emphasis,
peripheral payloads, and motion budgets track the Director's outputs. The operator
states goals and constraints; the Director manages the instrument panel so cognitive
load tracks mission phase rather than widget count.

This is **Centaur Computing**: human head for strategy, ethics, and final authority;
machine body for fusion, pacing, and parallel verification. The HUD is the coupling
interface between those two halves. If the Director is silent, the system still runs —
but the operator carries load the machine should carry. That is not strength; it is
leakage.

---

### The Four Awarenesses

The Iron Man HUD stacks layers of situational cognition. Map those layers onto your
system deliberately. Higher layers are exponentially more valuable — and exponentially
harder to implement without lying.

#### Level 1 — Sensor Display

**Persistent peripheral gauges: raw health, rate, and boundary conditions.**

Health dots, status strips, notification trays. Default footprint stays small and
low-contrast when healthy; **expands** and **sharpens** when signals cross escalation
thresholds or when attention routing allocates edge budget. Level 1 is table stakes.
Most products stop here.

#### Level 2 — Location Awareness

**Spatial and topological context: where you are in the system graph.**

Topology maps, service dependency graphs, navigation. The operator always knows which
surface is active, which subsystems are in the critical path, and what failure domains
surround the current task.

#### Level 3 — Context Awareness

**Object recognition with adjunct intelligence: what this artifact means right now.**

Document intelligence, attention-routed surfaces, probe cards and explainers tied to the
focused object. Knowledge is **just-in-time** — not a library dump, but an adjunct layer
aligned to the operator's fixation and task.

#### Level 4 — Goal Awareness

**Task-specific visualization: the interface reshapes to the mission.**

A mission panel, mode-driven layout templates, diagnostic probes aligned to hypotheses.
The HUD is not a fixed dashboard; it is a **mission shell** that selects widgets,
thresholds, and escalation paths from objective state.

**Requirement:** a true command surface operates through Level 4 under nominal design.
Level 1 alone is insufficient for command posture. Level 4 is where adaptation stops
imitating cinema and starts reducing time-to-decision.

---

### Attention Management Doctrine

Attention is the scarcest resource on the bridge. Noessel's line stands: **attention
management is crisis management.** If the system treats all signals as equally loud,
the human becomes the scheduler of chaos.

The Director tracks `attention.surface` and `attention.confidence`. When confidence is
low or attention is routed away from a degrading subsystem, the responsible indicator
must **not** politely wait in place. It must **earn** its way back into perception
through graduated escalation consistent with threat and recovery options.

Escalation is **graded**, not binary. Canonical ladder:

1. **Dim** — acknowledged, stable, backgrounded.
2. **Matte** — present but sub-threshold; no motion tax.
3. **Glow** — active concern; peripheral motion permitted.
4. **Expand** — larger footprint; additional fields exposed.
5. **Overlay** — interrupts peripheral channels; still avoids full capture unless necessary.
6. **Crisis** — minimal set, maximum contrast, irreversible controls clearly bounded.

The operator does not triage a hundred equal-weight tiles. **The system triages** using
the Director's signals, service SLO reality, and escalation policy. Information competes;
the system resolves competition before it reaches the fovea.

Peripheral vision is not dead space. UX research (e.g. UXmatters, "Designing for
Peripheral Vision") frames screen edges as an **active perceptual zone**: color
temperature, micro-motion, and edge load shape emotional tone and perceived risk without
requiring central fixation. Use the periphery as a **pre-attentive buffer** — quiet when
healthy, truthful when not.

**Doctrine pairing:**

- The **Four Awarenesses** decide **what** deserves representation at each cognitive layer.
- The **Escalation Protocol** decides **how much prominence** each representation receives
  as attention, confidence, and service health shift.

When those two frameworks disagree, **telemetry wins**, then **operator safety**, then
**clarity**. Everything else waits.

---

## Part II: Behavioral Contracts

The mandatory behavioral requirements that every surface must implement. These are
not suggestions — they are the interface contract between the Director and every frontend.

---

### Adaptive Directive Consumption Requirements

Every surface that receives live traffic from the Director must parse the current
**directive object** and apply **all** fields. Partial application (e.g., honoring
`mode.current` but ignoring `ambient.motion_budget`) is non-compliant. Unknown fields
must be preserved for forward compatibility but may be ignored until the surface's
schema version supports them.

| Directive Field | Type | Required Surface Response |
|---|---|---|
| `mode.current` | `focus` \| `review` \| `planning` \| `idle` | Layout density, panel visibility tiers, animation speed class, information depth |
| `ambient.brightness` | `0.0`–`1.0` | Glass opacity, surface tint, scanline visibility, glow intensity |
| `ambient.warmth` | `0.0`–`1.0` | Color temperature shift (cool cyan at 0.0, warm amber tint at 1.0) |
| `ambient.motion_budget` | `0.0`–`1.0` | Maximum animation intensity, simultaneous animated layer count |
| `attention.surface` | `string` | Visual escalation on the named surface (border glow, header pulse) |
| `attention.confidence` | `0.0`–`1.0` | Escalation intensity scaling (glow radius, pulse speed) |
| `alerts[]` | `array` | Alert banner materialization with priority animation |
| `layout.density` | `high` \| `normal` \| `low` | Element count caps, font size, spacing, tooltip verbosity |
| `palette_overrides{}` | `object` | Live CSS custom property injection via `style.setProperty()` |

**Consumption ordering:** Apply `palette_overrides` and ambient scalars first (global
paint), then `layout.density`, then `mode.current`, then attention and alerts (local
emphasis), subject to escalation caps.

> If your system has no central adaptation engine yet, treat this table as the **target
> schema**. Even a static `mode` toggle and an `ambient.brightness` slider wired to these
> responses moves a surface from "dead glass" toward Context-Aware.

---

### Mode-Driven Layout Contracts

`mode.current` selects the default layout posture. Escalation levels may temporarily
override visibility and motion; after de-escalation, mode defaults reassert.

| Mode | Intent | Layout | Telemetry | Animation |
|---|---|---|---|---|
| **Focus** | Maximum signal-to-noise | Strip peripherals; center primary task | Status strip: icons only | Suppress ambient; only crisis breaks through |
| **Review** | Situational awareness | Full peripheral telemetry | Status strip: labels + metrics; anomalies surfaced | Density: high; full design-system motion |
| **Planning** | Future state orientation | Goal trees, timelines prominent | Current-state minimized; forward-looking priority | Density: normal |
| **Idle** | Presence without demand | Dashboard aesthetic; dim telemetry | Status strip readable, de-emphasized | Gentle shimmer; density: low |

---

### Escalation Protocol

Visual prominence is governed by a five-level ladder. Levels define maximum allowed
attention cost, animation aggressiveness, and spatial intrusion.

```
Level 0: PERIPHERAL
  Dim tier colors, slow pulse (3s), matte borders
  Position: edges, corners, status strips
  Attention cost: zero — peripheral vision only

Level 1: AMBIENT
  Glow tier colors, standard pulse (2s), subtle border highlight
  Position: within existing panel boundaries
  Attention cost: minimal — noticed on scan

Level 2: FOCAL
  Element expands, overlay text appears, faster pulse (1s), expanded glow
  Position: grows in place, may displace adjacent elements
  Attention cost: moderate — demands a glance

Level 3: COMMANDING
  Full-width overlay or modal, audio cue if available
  Non-critical animations freeze; priority color (magenta/red) replaces accent
  Position: viewport center overlay
  Attention cost: high — interrupts current task

Level 4: CRISIS
  Strip to essentials: the problem, the data, the action
  Red dominant, maximum contrast, minimal animation
  Non-crisis elements dim to surface-0 opacity; the Director overrides all directives
  Position: full surface takeover
  Attention cost: total — all other work halts
```

**Transition rules:**

| Rule | Specification |
|---|---|
| **Ascending** | Must advance one level at a time: 0→1→2→3→4. No skipping. |
| **Descending** | May skip levels (4→1, 3→0) to avoid prolonging high-friction states. |
| **Authority** | Only the Director may initiate Level 3+. Surfaces self-escalate to Level 2 max. |
| **Level 4 gate** | Requires both a Director crisis directive AND a critical entry in `alerts[]`. |
| **Motion coupling** | Entering Level 3+ freezes non-critical animations; exit restores prior state. |

---

### Crisis Interface Protocol

Level 4 is a contracted emergency presentation. It overrides all decorative and
multimodal richness until the Director and `alerts[]` clear the crisis condition.

| Requirement | Rule |
|---|---|
| **Chrome** | Remove decorative layers: grids, non-essential icons, secondary nav |
| **Contrast** | Text: `--hud-text-bright`; backgrounds: `--hud-surface-0` |
| **Typography** | Mono family only for crisis content |
| **Palette** | Three colors: red (problem), white (data), cyan (action) |
| **Motion** | All animation stops except slow breathing glow on crisis element |
| **Banner** | Source name, problem statement, recommended action, TTL countdown |
| **Interactivity** | Other regions dim but remain interactive — never trap the operator |
| **Restoration** | De-escalation restores from cached pre-crisis state + latest directive |

---

### Surface Registration Protocol

Each surface that participates in adaptive behavior should complete registration on
connect to the Director's channel:

1. Send a surface identifier immediately after connect
2. Receive the initial directive snapshot from the Director
3. Apply all directive fields per the consumption table
4. Subscribe to directive change events and diff-apply updates
5. Implement every mandatory response from the directive table
6. Report rendering capability back to the Director (animations, audio, density modes)

**Non-compliance:** Surfaces that connect but do not respond to directives are classified
as **dead glass** — static chrome without system context. Dead glass violates Pillar 1
(Context-Aware) and must not ship as production UI.

---

## Part III: Visual Language

The visual implementation of the philosophy. Same palette, same information hierarchy,
adapted to each medium's constraints.

---

### Design DNA

Minimalism meets cyberpunk engineering. Tony Stark's workshop crossed with Star Trek
LCARS and retro terminal aesthetics. Transparent, holographic, data-driven. Every pixel
serves a purpose — if it's not data, it's structure; if it's neither, it's gone.

**Core principles:**

1. **Show, don't tell** — visualize data rather than describe it
2. **Contextual awareness** — UIs respond to time, date, system state, user state (Pillar 1)
3. **Living interfaces** — subtle animation signals health and activity; static means dead (Pillar 2)
4. **Logical composition** — layout follows data hierarchy, not decoration (Pillar 5)
5. **Unified ecosystem** — every surface feels like a different room in the same ship
6. **Transparency** — panels are glass, not walls; you see through to the system beneath
7. **Peripheral telemetry** — data at the edges drives decisions without demanding focus (Pillar 3)
8. **Functional density** — compact, data-rich; this is a command center, not a blog (Pillar 5)

---

### Color System

Dark-first. No light mode. Surfaces use transparent glass depth layering.
14 colors, each at three brightness levels: glow, matte, dim.

#### Surface Depths

| Token | Hex | Usage |
|---|---|---|
| `--hud-surface-0` | `#030306` | Void / body background |
| `--hud-surface-1` | `#0a0a0f` | Base panels |
| `--hud-surface-2` | `#0d0d14` | Elevated panels, chrome bars |
| `--hud-surface-3` | `#14141f` | Hover states |
| `--hud-surface-4` | `#1a1a2e` | Active/selected states |

#### Three Brightness Tiers

Every color exists at three levels. Use the right one for the job:

- **Glow** — full neon. Status indicators that are actively firing, focused/selected
  elements, `text-shadow` and `box-shadow` effects. The "look at me" register. Sparingly.
- **Matte** — working color. Text labels, border accents, chart lines, pills, stream
  markers, message role colors. Readable in bulk without eye strain. The everyday register.
- **Dim** — whisper. Inactive borders, background tints, disabled states, subtle depth
  accents. Visible if you look for it, invisible if you don't.

The bare token (e.g. `--hud-cyan`) is the glow tier for backward compatibility.
When adding new UI, prefer matte for most elements and reserve glow for active states.

##### Border-tier rules (TUI + web)

Borders are chrome, not surface. They live at the **matte** tier by default and **dim**
tier on inactive / passive panels. Putting a border at a *surface* hex value (e.g. setting
`BORDER` equal to `SURFACE_4`) collapses the brightness hierarchy and makes the border
disappear in 256-color terminals — this is a violation, not a stylistic choice.

The default border alias resolves to `SLATE_MATTE` (`#64748b`). The TUI and the
non-glass web surfaces must use this value (`--hud-border-solid` / `BORDER` /
`BORDER_MATTE`). Glass-system web panels keep the cyan-tinted alpha border
(`--hud-border`, `--hud-border-bright`) because `backdrop-filter` blends them with
the underlying surface — that combination cannot be reproduced in the terminal.

Cognition-heavy surfaces may use the `BORDER_BRIGHT` alias, which resolves to
`VIOLET_MATTE`. Other accent tints belong in the accent registry, not in `BORDER_*`.

#### Signal Palette — 14 Colors

| Color | Glow (neon) | Matte (working) | Dim (whisper) | Suggested Domain |
|---|---|---|---|---|
| Cyan | `#00f0ff` | `#0a8f9e` | `#0d4f58` | Core intelligence, signal |
| Teal | `#00d4aa` | `#0a8a72` | `#064d40` | Engineering support, tooling |
| Green | `#39ff14` | `#2da44e` | `#16532a` | Success, healthy, build |
| Emerald | `#00e676` | `#0d9058` | `#065535` | Engineering, creation |
| Amber | `#ffb627` | `#b8860b` | `#5c4306` | Warning, annotation, watch |
| Gold | `#ffd700` | `#a89000` | `#544800` | Infrastructure, stability |
| Red | `#ff4444` | `#b83232` | `#5c1a1a` | Error, critical, offline |
| Crimson | `#dc2626` | `#991b1b` | `#4c0e0e` | Governance, hard limits |
| Magenta | `#ff2d6a` | `#b82050` | `#5c1028` | Urgent alerts, pipeline |
| Rose | `#f472b6` | `#a8507e` | `#542a40` | Aesthetic, presentation |
| Violet | `#8957e5` | `#6940a8` | `#38235c` | Autonomy, cognition, mind |
| Indigo | `#6366f1` | `#4b4db5` | `#2a2b62` | Deep cognition, background |
| Blue | `#388bfd` | `#2a68b8` | `#183a65` | Data, information, knowledge |
| Slate | `#94a3b8` | `#64748b` | `#334155` | Neutral, infrastructure |

These are absolute. Do not approximate. `#00e8ff` is wrong. `#00f0ff` is correct.

#### Glass System

Panels are translucent, not opaque. Use `backdrop-filter` for the frosted glass effect:

```css
background: rgba(10,10,20,0.55);          /* --hud-glass */
backdrop-filter: blur(20px) saturate(1.4); /* --hud-glass-frost */
border: 1px solid rgba(0,240,255,0.08);    /* --hud-glass-border */
```

#### Text Hierarchy

| Token | Hex | Usage |
|---|---|---|
| `--hud-text` | `#b8b8d0` | Body text |
| `--hud-text-bright` | `#e8e8f8` | Headings, emphasis |
| `--hud-text-dim` | `#6a6a8a` | Labels, separators (WCAG AA compliant) |
| `--hud-text-muted` | `#7a7a9a` | Secondary info, timestamps (WCAG AA compliant) |

#### Glow Effects

Glow-tier colors get `box-shadow` and `text-shadow`. Each color has a `--hud-glow-{name}` token:

```css
box-shadow: var(--hud-glow-cyan);
/* expands to: 0 0 20px rgba(0,240,255,0.25), 0 0 60px rgba(0,240,255,0.08) */
```

Reserve glow for active/focused states. Most UI elements use matte colors without glow.

---

### Typography

Three font families, three roles. Never mix them. The reference stack uses Google Fonts;
substitute equivalents only if you keep the role separation (one geometric display face,
one condensed humanist UI face, one monospace data face).

| Token | Family | Role |
|---|---|---|
| `--hud-font-display` | Orbitron | Drama: system names, alert titles, heroes |
| `--hud-font-ui` | Rajdhani | Flow: body text, navigation, headings |
| `--hud-font-mono` | Share Tech Mono | Truth: data, timestamps, code, metrics |

Size scale: 8px (micro-labels) → 10px (pills) → 11px (mono data) → 13px (body)
→ 15px (UI) → 18-28px (display).

---

### Animation Language

Static means dead. Every animation serves a purpose — **Pillar 2 (Intentful)** demands
that animation parameters bind to live data where possible. A status pulse at a constant
3s cycle regardless of service health is an **Orphan Animation** (Sin #10).

| Animation | Duration | Purpose | Data Binding Target |
|---|---|---|---|
| `hud-status-pulse` | 3s (default) | Alive indicator on status dots | Bind cycle to health check interval |
| `hud-holo-sweep` | 8s | Holographic shimmer on glass panels | Bind opacity to `ambient.motion_budget` |
| `hud-ring-out` | 2s | Expanding ring for live indicators | Trigger on state change events |
| `hud-core-pulse` | 3s (default) | Core / reactor breathing | Bind rate to system health percentage |
| `hud-alert-breathe` | 3s | Alert banner glow pulse | Bind intensity to alert severity |
| `hud-scan-bar` | 2s | Scanning line on alert banners | Bind speed to `attention.confidence` |
| `hud-holo-text` | 4s | Holographic text color shift | Bind to `ambient.warmth` |

**Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` for most transitions (fast-out, slow-in).
`cubic-bezier(0.34, 1.56, 0.64, 1)` for spring/bounce effects (modal entrances).

**Durations**: micro=100ms (hover), short=200ms (state changes), medium=400ms (modals),
drift=1000ms (ghost-float), pulse=3s (ambient).

---

## Part IV: Component Patterns (Atoms & Molecules)

Every component pattern implements the Five Pillars. Components are not just visual
recipes — they carry behavioral contracts that determine how they respond to directives
and escalation levels. Build them as composable atoms (dot, pill, bracket) and molecules
(panel, alert banner, probe card) so surfaces stay consistent across the system.

---

### Glass Panel

Every container uses the glass panel pattern. Provide a single `.glass-panel` class:

- Translucent background with `backdrop-filter: blur(20px) saturate(1.4)`
- `1px solid rgba(0,240,255,0.08)` border
- Holographic gradient overlay (`--hud-holo-gradient`) at 40% opacity
- Holographic shimmer sweep animation (`hud-holo-sweep`, 8s linear infinite)

**Director response:** Glass opacity scales with `ambient.brightness`. Shimmer intensity
scales with `ambient.motion_budget`. In Focus mode, shimmer suppresses to zero.

### HUD Corner Brackets

Primary data containers get targeting-reticle corner brackets. A `.hud-bracket` class
adds 12px cyan bracket lines at top-left and bottom-right corners.

**Escalation behavior:** At Level 2+, bracket color shifts to match escalation accent
(magenta at Level 3, red at Level 4). Bracket lines pulse at escalation frequency.

### Panel Chrome Bar

Every panel has an LCARS-inspired chrome header:

```
[colored bar] CODENAME // TITLE                    [status dot] STATUS
```

- Colored bar: 32px × 3px, color matches the service accent
- Codename: `--hud-font-mono`, 9px, uppercase, 2px letter-spacing, dim
- Title: `--hud-font-mono`, 10px, muted
- Status dot: 6px circle with `hud-status-pulse` animation

**Director response:** In Focus mode, chrome bars compress to minimal height. In Idle mode,
codename expands to show full backronym on hover.

### Ghost-Float Modals

When content pops out (annotations, tooltips, contextual panels):

1. Materialize at source position with 0 opacity
2. Fade in while drifting radially toward nearest screen edge
3. Ghost-lines (thin, dashed, amber) connect back to source anchor
4. On cursor approach within 100px: modal slides further away (repulsion physics)
5. On dismiss: reverse animation back to source

**Director response:** Ghost-float animation speed scales with `ambient.motion_budget`.
In Focus mode, ghost-floats appear immediately without drift animation.

### Alert Banner

Cross-system urgent notifications use a `.hud-alert` molecule:

- Magenta border with pulsing glow (`hud-alert-breathe`)
- Scanning top-bar (`hud-scan-bar`)
- Display font for title
- Source name, one-line summary, TTL countdown
- **Recommended action** (Pillar 3: Actionable — never alert without action)

**Escalation behavior:** Alert banners are Level 3 minimum. Crisis alerts (Level 4)
trigger the Crisis Interface Protocol. Banner scan speed tracks `attention.confidence`.

### Status Indicators

- **Dot** (`.hud-status-dot`): 6px circle, color by state, pulsing animation
  - Healthy: green, 3s pulse (bind to health check interval)
  - Warning: amber, 2s pulse
  - Critical: red, 1s pulse
  - Unknown: hollow circle (○), no pulse
- **Pulse ring** (`.hud-pulse-ring`): expanding ring animation for live/active states
- **Arc reactor**: SVG ring gauge for percentage values (system health, budget, etc.)
  - Bind fill percentage to live data (Pillar 4)
  - Bind pulse rate to data freshness

### Sparkline & Mini-Chart Standards

Sparklines are compact time-series visualizations (Pillar 4: Data-Driven).

1. **Line weight ≥ 2px** — thinner lines disappear on dark backgrounds
2. **Gradient fill** — area under the line gets a gradient from `color + 30` at top
   to `color + 05` at bottom
3. **Min/max labels** — 10px mono, with "min:"/"max:" prefixes
4. **Violation markers** — red dots (3.5px radius) with 6px halo ring at 0.4 opacity
5. **Height scales with data** — ≥30 points → 56px height; fewer → 40px
6. **Single data point** — centered value with "(1 sample)" label, not empty chart
7. **No data** — show "no data" in `var(--hud-text-dim)` at 9px
8. Colors from the design token system via `getComputedStyle()`, never hardcoded

### Probe Cards

Probe cards display real-time telemetry for individual monitoring probes.

**Required elements:**

1. Status dot — animated pulse (Pillar 2: data-bound frequency)
2. Probe ID — monospace, colored by domain
3. Label — human-readable name from catalog
4. Stats row — Calls, Violations, Last Output, Last Seen
5. Sparkline — time-series of recent outputs
6. Collapsible explainer — reference card with what/why/healthy/unhealthy

**Data freshness:** "AWAITING DATA" badge for probes never observed. Displayed at 55%
opacity with hollow status dot. Never-seen ≠ broken.

### Disclosure & Accordion Patterns

1. **Click to open, click to close** — single-click toggles. No auto-close on blur.
2. **State survives re-renders** — snapshot before innerHTML replacement, restore after.
3. **Expand All / Collapse All** — every group includes toggle bar.
4. **Visual feedback** — toggle arrow rotates or changes on state change.
5. **No orphan `<summary>`** — every summary inside a `<details>`.

### Documentation Surface Taxonomy

A documentation site for a command-center system is not a blog. It's an **operator
atlas** — every surface answers "what is this, what does it integrate with, how does it
fail, what do I do next" in scannable, command-center chrome. Four surface families,
each with a contract:

1. **Manuals** — one per service. Contract:
   - Codename hero, backronym, mono subtitle, service-accent color.
   - A summary card directly under the hero — three rows: PURPOSE, INTEGRATES WITH,
     FAIL MODE. No prose required to answer the basics.
   - Auto-injected navigation sidebar (generated from a manifest, never hand-maintained
     per file).
   - A consistent section spine: hero, summary card, ingress/egress, dataflow diagram,
     metrics, fail modes, peers, deep dives (`<details>`), related footer.

2. **Explainers** — concept pages. Contract:
   - Summary card upfront (≤30s scan).
   - At least one interactive element (canvas/svg/sliders) — concepts taught by
     manipulation, not paragraphs.
   - Cross-links to the relevant lab sim, manual, and narrative chapter in a related footer.
   - Long-form deep dives go inside `<details>`.

3. **Lab** — interactive simulations. Contract:
   - Consistent app-container chrome.
   - Slider+number combo controls (sliders for visual scrubbing, number for keyboard
     precision); never raw `<input type="number">` alone.
   - Real sparkline charts (not text-only "charts"); units annotated on every series.
   - Save run / Compare runs in `localStorage`; deep-linkable parameters.
   - Toast on errors (no silent failure).

4. **Story** — canonical onboarding narrative. Contract:
   - Short chapters, each ≤300 words narrative + a short interactive scene tied to a
     subsystem.
   - Cross-links footer per chapter: Manual ▸ / Lab sim ▸ / Briefing ▸.
   - The hub landing surfaces this as the primary start-here call-to-action.

**Common to all four:**

- Command-center chrome (scanlines / skin class) on the body.
- Spacing from spacing tokens, not magic numbers.
- Touch targets ≥ 44px on `pointer: coarse` and ≤ 767px viewports.
- A back-to-hub affordance in every navigation footer.
- No `max-width: 900px` constraint on non-prose surfaces (lab, hub, story index) — that's
  the blog tell, and it's banned outside actual long-form text.

---

## Part V: System Integration

No system, service, subsystem, or named component should exist without full ecosystem
integration. A surface that does not register, theme, document, and name itself
consistently fragments the experience.

---

### Tooltip Philosophy

Every interactive element gets a tooltip. Tooltips are micro-documentation, not labels.

**Rules:**

1. **Define, don't describe** — "Review priority — critical and high items surface in
   Review mode" not "Click to set priority"
2. **Include the 'so what'** — why does this data point matter for decisions?
3. **Reference the system** — name the service, config key, or workflow it connects to
4. **Include thresholds** — "green <2m, amber <5m, red >5m"
5. **One sentence minimum** — no single-word tooltips
6. **Keyboard shortcut** — always include if one exists

### Service Accent Registry

Maintain an authoritative color assignment for every named service in your system.
Group services into **hue families** by function so the palette reads as a map: a glance
at color tells the operator which domain a surface belongs to. First-class services use
the **glow** tier; sub-services inherit at **matte** or **dim** brightness.

**Token convention**: `--hud-svc-{name}` in CSS, `SVC_{NAME}` in your constants module.

**Suggested hue-family mapping** (adapt to your domains):

| Family | Hue | Typical domain |
|---|---|---|
| Core identity | Cyan | The primary intelligence / signal |
| Autonomy & scheduling | Violet / Indigo | Background cognition, orchestration |
| Engineering & build | Emerald / Green | Code, creation, CI |
| Monitoring & recovery | Amber / Gold | Health, trends, liveness |
| UX & perception | Rose | Adaptation, presentation |
| Knowledge & data | Blue | Documents, archives, search |
| Issue tracking | Magenta | Pipelines, urgent work |
| Visualization | Indigo | Rendering, simulation |
| Safety & destruction | Crimson | Hard limits, irreversible ops |
| Notifications | Amber (urgency-adaptive) | Event relay, dispatch |

**Illustrative registry entry** (replace with your own services):

| Service | Backronym | Hex | CSS Token | Constant | Tier |
|---|---|---|---|---|---|
| **N.E.X.U.S** | Never-EXhausted Unified Scheduler | `#8957e5` | `--hud-svc-nexus` | `SVC_NEXUS` | Glow |
| **S.E.N.T.R.Y** | Systematic Event Notification & TRouble Yielding | `#4b4db5` | `--hud-svc-sentry` | `SVC_SENTRY` | Matte |

**Urgency-adaptive accents.** A notification/dispatch service may shift its accent by
severity rather than holding one hue:

| Urgency | Hex |
|---|---|
| Info | `#5c4306` |
| Warning | `#b8860b` |
| Alert | `#ffb627` |
| Critical | `#ff4444` |
| Emergency | `#ff2d6a` |

### Service Reference Standard — Dotted Uppercase with Annotations

All references to named services should use **dotted uppercase** format in prose:

```markdown
**N.E.X.U.S** — _Never-EXhausted Unified Scheduler_ — Scheduling daemon
```

In HTML:

```html
<a href="#nexus" class="svc-ref" data-service="nexus"
   title="N.E.X.U.S — Never-EXhausted Unified Scheduler — Scheduling daemon">
  N.E.X.U.S
</a>
```

Service references are styled in the service's accent color using `--hud-svc-{name}`
and rendered in `--hud-font-mono` with `letter-spacing: 2px`.

### Message Role Glyphs

For conversational / agentive surfaces, give each speaker a glyph and color:

| Role | Glyph | Color | Constant |
|---|---|---|---|
| User | `›` | Blue | `ROLE_USER` |
| Assistant | `◆` | Green | `ROLE_ASSISTANT` |
| System | `⚙` | Amber | `ROLE_SYSTEM` |
| Monologue / inner thought | `◇` | Violet | `ROLE_MONOLOGUE` |

### Engagement Heat Scale

| Range | Color | Token | Meaning |
|---|---|---|---|
| >= 70 | Red matte | `HEAT_HIGH` | High |
| 50 - 69 | Amber matte | `HEAT_ELEVATED` | Elevated |
| 30 - 49 | Blue matte | `HEAT_BASELINE` | Baseline |
| < 30 | Slate matte | `HEAT_LOW` | Low |

---

### Naming Convention — Backronyms

Every service, tool, subsystem, and daemon gets a codename that is simultaneously a
real word and a forced backronym.

**The Formula:**

1. **Pick a word first** — mythological, military, scientific, literary. It must sound
   like something on a HUD.
2. **Reverse-engineer the acronym** — force the letters to spell a description.
3. **The name does double duty** — the word hints at the role (LAZARUS = recovery,
   FORGE = building) and the backronym spells the technical function.

**Acceptable themes:** Mythology, military ops, science, Shakespeare, architecture, navigation.

**Unacceptable:** Trademarked fictional AI (no JARVIS/FRIDAY), cute names (no
BUDDY/HELPER), generic Java-style (no MANAGER/HANDLER), acronym-first construction,
unpronounceable strings.

---

### Surface Adaptation

Same tokens, different constraints per medium.

#### Web Surfaces

- Full glass panels with `backdrop-filter`
- Holographic shimmer animations
- HUD brackets, scanline overlay
- All three font families
- Import `tokens.css`
- **Must implement directive consumption** (Part II)

#### TUI (terminal UIs)

- Same color values via the constants module
- No glass/blur — solid surface colors instead
- No display font — the default terminal font covers the display role
- Generate terminal CSS from a single theme builder, not hardcoded values
- Role glyphs: `›` user, `◆` assistant, `⚙` system, `◇` monologue

#### Standalone Visualizations

- Import `tokens.css` or replicate the `:root` block
- Same three web fonts
- Glass panels, HUD brackets, scanlines
- No ad-hoc color palettes

---

### Integration Requirements

Every named system should ship these deliverables:

| # | Deliverable |
|---|---|
| 1 | Inventory entry in the service manifest |
| 2 | Architecture-tree placement in the service manifest |
| 3 | Service Accent Registry entry (this document) |
| 4 | CSS service token in `tokens.css` |
| 5 | Constant in the application token module |
| 6 | Technical manual in the docs surface |
| 7 | Dataflow integration on the system diagram |
| 8 | Backronym (this document, § Naming Convention) |

A system without a manual is undocumented. An undocumented system does not exist.

### Accessibility Contrast Minimums

- **Body text** (`--hud-text`): minimum 4.5:1 against `--hud-surface-0` (WCAG AA)
- **Dim text** (`--hud-text-dim`): minimum 4.5:1 — value `#6a6a8a`
- **Muted text** (`--hud-text-muted`): minimum 4.5:1 — value `#7a7a9a`
- **Large text** (≥18px or ≥14px bold): minimum 3:1
- All interactive elements must have `:focus-visible` outline (`2px solid --hud-cyan`)

---

## Part VI: Anti-Patterns and Evaluation

### The 12 Deadly Sins of Sci-Fi Interfaces

Speculative interfaces fail for recurring reasons. The catalog names each failure mode,
grounds it in documented film research, states how it could corrupt your surfaces, and
prescribes the mitigation.

**1. Fuidgetry**
Meaningless animated elements that consume attention without delivering information.
*Film:* The Wild Robot — blinking hexagonal grids that carry no state.
*Risk:* Holographic shimmer that never modulates with load, health, or mode.
*Mitigation:* Pillar 2 thumb test.

**2. The Stoic Guru**
Systems that wait to be asked instead of proactively informing.
*Film:* Starship Troopers — "COURSE OPTIMAL" sits placid while the vessel enters an asteroid field.
*Risk:* A health dashboard showing nominal numbers while failure probability rises.
*Mitigation:* Active-academy model — surface what matters before the operator asks.

**3. Unlabeled Controls**
The most violated principle across 70+ surveyed films.
*Film:* Logan's Run dispatch panels; Barbarella cockpit; WALL-E's orange button.
*Risk:* Icon-only actions with no persistent meaning layer.
*Mitigation:* Mandatory tooltip on every interactive element.

**4. The Feedback Void**
Controls separated from their effects so cause and effect decouple.
*Film:* Forbidden Planet — controls where the operator cannot see the viewplate.
*Risk:* Settings that require reload with no inline confirmation.
*Mitigation:* Pillar 1 — close the loop.

**5. Static Death**
Indicators that do not pulse, breathe, or show aliveness.
*Film:* Dashboards with frozen status dots across the survey.
*Risk:* Status pills labeled healthy without a living pulse.
*Mitigation:* "Static means dead" — animation encodes liveness.

**6. Information Firehose**
Everything at once without hierarchy or density management.
*Film:* Iron Man HUD with 29+ competing elements.
*Risk:* Review mode expanding every metric to full prominence.
*Mitigation:* `layout.density` caps and progressive disclosure.

**7. Decorative Emergency**
Crisis UIs that add ornament when they should strip to signal.
*Film:* Starship Troopers collision alarm — 90% of the frame is motion noise.
*Risk:* Alert banners that bury the recommended action in visual elaboration.
*Mitigation:* Crisis Interface Protocol — three colors, one font, strip everything else.

**8. The Placebo Interface**
Displays that look functional but change no decisions.
*Film:* Iron Man HUD elements that reposition without user intent.
*Risk:* Panels showing "interesting" telemetry that never gates a decision.
*Mitigation:* Pillar 3 violation test — if removing it changes nothing in a month, remove it.

**9. Token Drift**
Multiple sources of truth diverging silently.
*Risk:* An inline `#c0c0d8` somewhere while the token file says `#b8b8d0`; hardcoded hex
bypassing the token system.
*Mitigation:* Single-source import enforcement; parity is a build-time contract.

**10. Orphan Animation**
Motion without mapped data — glow that encodes no state.
*Film:* Prometheus floating pixel fields with no legend.
*Risk:* Core pulse at fixed period regardless of system health.
*Mitigation:* Pillar 4 — parameterize from live data.

**11. Aposematic Confusion**
Danger colors for non-danger purposes, desensitizing alarm response.
*Film:* Red-on-black as decorative style across many sci-fi skins.
*Risk:* Routine use of crimson accents in non-critical chrome.
*Mitigation:* Red/crimson reserved for error, critical, and safety services only.

**12. Galaxy Brain Display**
3D rendering where 2D would be faster and clearer.
*Film:* Disclosure's 3D file corridor — search would have finished the task.
*Risk:* 3D topology when a flat dependency graph communicates the same edges.
*Mitigation:* Dimensionality serves function, not spectacle.

---

### Three-Axis Self-Assessment

Every surface should be evaluated on three independent axes:

| Axis | Question | Score 0 | Score 4 |
|---|---|---|---|
| **Sci (Believability)** | Does this feel like a command center? | Looks like a blog | Every element feels engineered |
| **Fi (Narrative)** | Does this tell the system's story? | Anonymous dashboard | Personality and capability are visible |
| **Interfaces (Usability)** | Does this equip the operator? | Data without context | Every display enables a decision |

Each axis: 0-4. Total: 12 points.

| Band | Score | Meaning |
|---|---|---|
| BLOCKBUSTER | 10-12 | Ship it |
| MUST-SEE | 7-9 | Strong; close gaps on weakest axis |
| MATINEE | 4-6 | Functional but uninspired; redesign pass needed |
| DRECK | 0-3 | Restart from intent, not CSS |

A 4 on Sci cannot redeem a 0 on Interfaces; the operator still loses.

---

### Fuidgetry Detector Checklist

Run on any new UI element before merge:

1. **Thumb occlusion:** Cover it. Does the operator lose actionable information?
2. **Data disconnect:** Kill feeds. Does the element look the same?
3. **Removal test:** Delete it. Does the workflow improve?
4. **Binding test:** Is animation tied to live data, or only CSS constants?
5. **Decision test:** Name the specific decision this element helps make.
6. **Mode test:** Does it respond to at least two modes?

**Rule:** If any answer is "no" for questions 1, 5, or 6 — classify as fuidgetry.
Redesign to bind data and intent, or remove.

---

## Part VII: Spatial Workspaces & Launcher Microapps

This section extends IRON SIGHT to **spatial cockpits** — tiled/floating workspaces,
windowed frame organisms, and launcher microapps that run tools or visualize a domain.
It is operational law alongside tokens and motion: a tool surface that *looks* like Iron
Man but *behaves* like a cron wrapper violates **INTENTFUL** and **CONTEXT-AWARE** the
same way a pulsing dot with no signal does.

### Constellation layout

- **One spine:** events flow launcher → stream → shared bus → lens views; viewers spawn
  as **normal** tiles bound to the launcher — not default-maximised fullscreen stacks.
- **Workspace binding:** a workspace's context IDs must match the lens views' instance
  IDs and the tool's binding. Templates seed both; launchers must not assume context is
  already set.
- **Inter-surface wiring:** use a shared content/selection bus — **not** global
  `window` CustomEvents between microapps in the same workspace.

### Tool launcher UX (the Tony Stark bar)

During execution, the operator sees **live instrumentation**:

| Required | Banned |
|---|---|
| Stdout/stderr or structured stream rows | Static `"scanning"` pill only |
| Phase, progress, cancel, run ID | Blocking CLI with no observability |
| Parallel run list (multiple jobs) | Single global `running` flag |
| Write feedback (count / errors) | Claiming downstream emission with no actual bus write |

Animation on launchers must track **run state** (pulse on active runs) — not a decorative
amber shimmer with no bound data (Pillar 4; Fuidgetry Detector §binding test).

### Frame chrome interaction

- **One click** activates unfocused surfaces: raise/focus must not steal the subsequent
  click from buttons, inputs, or selectable document regions.
- Title bar is the drag handle; content fields remain selectable.

### Analytical constellations (instrumentation decks)

Not every constellation runs a tool. **Analytical / instrumentation decks** are
read-only **lenses** over one backend domain that share **selection** and a **control
axis** (time / parameters) — a pick or scrub in one lens propagates to all the others.
Obligations specific to this archetype:

- **Honesty over fullness.** A lens shows its provenance — `LIVE` / `EMPTY` / `loading` /
  `error` — and its coverage/quality, never a populated-looking view over empty or demo
  data. A sampled deck says so. Faking fullness is a Placebo Interface, the same as a
  `"scanning"` pill with no stream.
- **Interpretability mandate ("so what?").** Every visual channel maps to a real datum
  and is legend-explained; spatial/temporal references are labelled and bounded. A field
  of nodes the operator can poke but not *read* is fuidgetry — reject it.
- **Living state is bound to data.** Reachability drives a pulse, in-flight fetch drives a
  shimmer, severity drives animation — not a decorative shimmer (Pillar 4).
- **One semantic palette per domain**, tokens only. **Tooltip on every control** (meaning
  + threshold + shortcut).
- **Interoperability is visible.** Selecting in one lens visibly echoes in the others; the
  shared control axis is operator-drivable.

---

## Appendix: Research Reference

### Source Bibliography

1. Christopher Noessel, *Make It So: Interaction Design Lessons from Sci-Fi* (Rosenfeld Media, 2012)
2. scifiinterfaces.com — 400+ articles analyzing speculative interfaces across 70+ films (2012-present)
3. Iron Man HUD analysis series (7 posts) — scifiinterfaces.com (2015)
4. "Untold AI" meta-study — 120+ AI films/shows analyzed for strategic imperatives (2018)
5. "Gendered AI" study — 327 AI characters surveyed for design bias patterns (2019)
6. UXmatters, "Designing for Peripheral Vision"
7. Google NAI (Natively Adaptive Interfaces) framework
8. Fritz Awards — annual sci-fi interface evaluation

### Principle Index

| # | Principle | Source |
|---|---|---|
| P1 | Close the feedback loop | scifiinterfaces.com (Forbidden Planet, Prometheus) |
| P2 | Label everything | scifiinterfaces.com (70+ films — most violated principle) |
| P3 | Physical affordance communicates function | scifiinterfaces.com (Prometheus alien controls) |
| P4 | Light equals power and state | Universal across surveyed films |
| P5 | Transition by importance | scifiinterfaces.com (Prometheus VP dismissal) |
| P6 | Fuidgetry wastes cognitive resources | scifiinterfaces.com (coined term; 50+ reviews) |
| P7 | Active Academy over Stoic Guru | scifiinterfaces.com (Starship Troopers COURSE OPTIMAL) |
| P8 | Four levels of AR awareness | Make It So (Ch. 8: sensor, location, context, goal) |
| P9 | The JARVIS Principle | scifiinterfaces.com (Iron Man HUD 7-post series) |
| P10 | Attention management is crisis management | scifiinterfaces.com (Iron Man peripheral gauges) |
| P11 | Every interface tells a story about its society | scifiinterfaces.com (meta-theme) |
| P12 | Three-axis evaluation: Sci x Fi x Interfaces | scifiinterfaces.com (report card methodology) |
| P13 | Design for panic | scifiinterfaces.com (Prometheus MedPod) |
| P14 | Fail states must be safe states | scifiinterfaces.com (Logan's Run Aesculaptor) |
| P15 | Anticipate needs (agentive design) | scifiinterfaces.com (Barbarella's Alphy, Robbie) |
| P16 | Progressive status over binary | scifiinterfaces.com (Jurassic Park velociraptor lock) |
| P17 | Wearable criteria: sartorial, social, accessible, safe, apposite | Make It So (combadge) |
| P18 | Evil uses aposematic signaling | scifiinterfaces.com (Design of Evil essay) |
| P19 | Centaur computing: human head, machine body | scifiinterfaces.com (Star Trek TNG bridge) |
| P20 | Making fiction real inverts the design process | scifiinterfaces.com (Aldean Instrument) |

### Films Ranked by Interface Quality

| Rank | Film | Grade | Score |
|---|---|---|---|
| 1 | The Fifth Element (1997) | A | 12/12 |
| 2 | Children of Men (2006) | A | 12/12 |
| 3 | Ghost in the Shell (1995) | A- | 11/12 |
| 4 | WALL-E (2008) | A- | 10/12 |
| 5 | Black Panther (2018) | A- | 10/12 |
| 6 | Oblivion (2013) | B+ | 10/12 |
| 7 | BSG Miniseries (2003) | B+ | 10/12 |
| 8 | The Day the Earth Stood Still (1951) | B+ | 10/12 |
| 9 | Metropolis (1927) | B+ | 9/12 |
| 10 | Doctor Strange (2016) | B- | 9/12 |

---

## Adopting IRON SIGHT — Quick Checklist

1. Create one `tokens.css` and one constants module; copy the palette, surfaces, text,
   and font tokens verbatim. Pick your own namespace prefix (replace `--hud-`).
2. Build an interactive mockup page that renders every token and component once.
3. Implement the atoms (status dot, pill, HUD bracket) and molecules (glass panel, alert
   banner, probe card) against the tokens — never inline hex.
4. Stand up a directive schema (Part II) — even a minimal `mode` + `ambient.brightness`
   wiring moves you off "dead glass."
5. Name new components with backronyms; register their accent color and write a manual.
6. Gate every new surface on the Fuidgetry Detector and the Three-Axis Self-Assessment.

---

*IRON SIGHT — generalized edition. Adapted from a private command-center design system
into a portable, product-agnostic specification. The values (colors, fonts, timing) are
meant to be used as-is; the names, prefixes, and service rosters are placeholders for
your own.*
