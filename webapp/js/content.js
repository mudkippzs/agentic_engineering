// Curriculum data for the Agentic Engineering academy.
// Each pillar -> chapters -> { prose HTML, interactive id mounted below the prose }.

export const PILLARS = [
  {
    id: "compass",
    name: "COMPASS",
    glyph: "\u25C8", // ◈
    accent: "var(--pillar-compass)",
    expansion: "Comprehensive Operational Mapping, Planning, Architecture Synthesis & Scrutiny",
    tagline: "How we plan \u2014 the gated path from problem to approved design.",
    chapters: [
      {
        title: "Why Plan First?",
        eyebrow: "Pillar I \u00b7 Chapter 1",
        interactive: "compass-trigger",
        html: `
          <p class="lede">COMPASS is the structured planning protocol for non-trivial work.
          It makes designs <strong>system-aware</strong>, <strong>integration-first</strong>,
          and <strong>stress-tested before a line of code is written</strong>.</p>
          <p>The cost is front-loaded thinking. The payoff is avoided rework, avoided silos,
          and a design record that outlives the conversation. The first skill is knowing
          <em>when</em> to spend that cost.</p>
          <h2>Trigger vs. Skip</h2>
          <ul>
            <li><strong>Trigger</strong> for new subsystems/features, cross-service changes,
            anything multi-commit, or any explicit request to plan or design.</li>
            <li><strong>Skip</strong> for single-file fixes, config changes, and doc-only edits
            \u2014 go straight to the build workflow (DOCTRINE).</li>
          </ul>
          <div class="callout">Match ceremony to stakes. A two-day feature doesn't need a
          subsystem's depth \u2014 but it needs the same <em>shape</em>: frame before you solution.</div>`,
      },
      {
        title: "The Seven Phases",
        eyebrow: "Pillar I \u00b7 Chapter 2",
        interactive: "compass-phases",
        html: `
          <p class="lede">COMPASS runs seven phases. Each has a defined <strong>output</strong>;
          most have a <strong>gate</strong> where the human confirms direction before the next.</p>
          <p>The cardinal rule: <strong>do not solution before the problem is framed; do not
          architect before the end-state is chosen.</strong> Step through the phases below \u2014
          each one tells you what it produces and where it stops for sign-off.</p>`,
      },
      {
        title: "Breaking the Design \u2014 STRESS",
        eyebrow: "Pillar I \u00b7 Chapter 3",
        interactive: "compass-stress",
        html: `
          <p class="lede">Phase 6 is adversarial review. You break the design <em>before</em>
          building it \u2014 one pass, many lenses, applied to every significant decision.</p>
          <p>It is not count-based: you continue until every lens has interrogated every major
          choice. Findings become an annotated appendix; fix what's fixable inline, flag what
          needs a human call. Explore the lenses below.</p>`,
      },
      {
        title: "The Plan File",
        eyebrow: "Pillar I \u00b7 Chapter 4",
        interactive: "compass-planfile",
        html: `
          <p class="lede">Plans are <strong>never ephemeral</strong>. Every COMPASS run persists
          a decision record to the plans directory \u2014 what was considered, decided, and deferred.</p>
          <p>A plan file carries YAML frontmatter (name, overview, current phase, todos) plus a
          body: architecture, rationale, scope boundaries, integration map, risks, and a decision
          log. Build one below and watch the frontmatter assemble.</p>`,
      },
      {
        title: "COMPASS in Miniature",
        eyebrow: "Pillar I \u00b7 Chapter 5",
        interactive: "compass-walkthrough",
        html: `
          <p class="lede">Theory lands when you run it once, end to end. Here is COMPASS
          compressed into a single worked decision \u2014 the same seven phases, one small feature.</p>
          <p>Follow the scenario below: at each phase you make the call the protocol asks for, and
          watch a real plan take shape from reconnaissance to a ready-to-build proposal.</p>`,
      },
    ],
  },
  {
    id: "doctrine",
    name: "DOCTRINE",
    glyph: "\u2B21", // ⬡ hexagon (geometric line-art; matches ◈ / ◉, no emoji presentation)
    accent: "var(--pillar-doctrine)",
    expansion: "Disciplined Operations, Commit Tracking, Redline Integration & Notated Engineering",
    tagline: "How we build \u2014 the atomic, tracked, tested commit loop.",
    chapters: [
      {
        title: "The Core Loop",
        eyebrow: "Pillar II \u00b7 Chapter 1",
        interactive: "doctrine-loop",
        html: `
          <p class="lede">Under DOCTRINE every change is <strong>atomic, tested, tracked, and
          pushed</strong> \u2014 automatically, without being asked.</p>
          <p>Every unit of work flows through one loop. Internalize it until it is reflex. No
          step is optional: a change implemented but not tracked, or committed but not pushed,
          is <strong>incomplete work</strong>. Run the loop below.</p>`,
      },
      {
        title: "Atomic Commits",
        eyebrow: "Pillar II \u00b7 Chapter 2",
        interactive: "doctrine-atomic",
        html: `
          <p class="lede"><strong>One commit = one logical change</strong> \u2014 the smallest unit
          that stands on its own, reverts independently, and reads as a single coherent diff.</p>
          <p>Never combine refactors with features, bug fixes with cleanups, or unrelated
          subsystems. Even if the human asks for several things at once, each logical unit gets
          its own commit\u2013push cycle. Classify the changes below.</p>`,
      },
      {
        title: "Pre-Commit Gates",
        eyebrow: "Pillar II \u00b7 Chapter 3",
        interactive: "doctrine-gates",
        html: `
          <p class="lede">Before <em>every</em> commit, gates run in order. A failing gate blocks
          the commit \u2014 no "fix later" commits.</p>
          <p>Lint \u2192 full parallel test suite \u2192 no merge conflicts \u2192 design-system
          compliance (if UI) \u2192 naming registered (if new entity). Fix within the same logical
          unit, then re-run. Try to commit below \u2014 and watch a gate catch you.</p>`,
      },
      {
        title: "Issue-First Tracking",
        eyebrow: "Pillar II \u00b7 Chapter 4",
        interactive: "doctrine-issues",
        html: `
          <p class="lede">Before code exists, the work is tracked. The tracker is the source of
          truth for <em>what is being worked on and why</em>.</p>
          <p>New work creates an issue first; multiple logical pieces become a parent epic with
          child tasks. Every issue carries an assignee, scope labels, and a priority. Walk an
          issue through its lifecycle below.</p>`,
      },
      {
        title: "Conflicts & Deploy Hygiene",
        eyebrow: "Pillar II \u00b7 Chapter 5",
        interactive: "doctrine-deploy",
        html: `
          <p class="lede">The loop ends at a deployed system \u2014 and that is where discipline is
          most often abandoned. One rule holds above all: <strong>every fix ships through the
          repository.</strong></p>
          <p>Never hot-patch a running server, never hand-copy a file, never edit source in place.
          The deployed environment must stay byte-for-byte reproducible from a clean checkout.
          Choose how to ship a hotfix below \u2014 and watch the consequences.</p>`,
      },
    ],
  },
  {
    id: "ironsight",
    name: "IRON SIGHT",
    glyph: "\u25C9", // ◉
    accent: "var(--pillar-ironsight)",
    expansion: "Interface Rules for Operational Navigation, Signal Integration, Goal-aware Heuristics & Telemetry",
    tagline: "How it looks and behaves \u2014 the living command-center design bible.",
    chapters: [
      {
        title: "The Five Pillars",
        eyebrow: "Pillar III \u00b7 Chapter 1",
        interactive: "ironsight-pillars",
        html: `
          <p class="lede">Five non-negotiable commitments govern every design decision. They are
          not aesthetics \u2014 they are operational contracts between operator, system, and surface.</p>
          <p>Each pillar ships with a <strong>violation test</strong>: a concrete way to prove a
          surface fails it. Select a pillar to read its contract and its test.</p>`,
      },
      {
        title: "The Color System",
        eyebrow: "Pillar III \u00b7 Chapter 2",
        interactive: "ironsight-palette",
        html: `
          <p class="lede">Dark-first, no light mode. Fourteen signal colors, each at three
          brightness tiers \u2014 <strong>glow</strong> (look at me), <strong>matte</strong>
          (everyday), <strong>dim</strong> (whisper).</p>
          <p>Colors are absolute: <code>#00f0ff</code> is correct, <code>#00e8ff</code> is wrong.
          They live in one token source and are never hardcoded inline. Click any tier to copy
          its hex.</p>`,
      },
      {
        title: "Living Animation",
        eyebrow: "Pillar III \u00b7 Chapter 3",
        interactive: "ironsight-animation",
        html: `
          <p class="lede"><strong>Static means dead.</strong> If a process is running and its
          indicator isn't moving, the surface is lying.</p>
          <p>Animation is <strong>data-bound</strong>: pulse tracks health, glow tracks load,
          shimmer tracks activity. The proof is the feed test \u2014 sever the data and a true
          instrument visibly changes. Cut the feed below and watch.</p>`,
      },
      {
        title: "The 12 Deadly Sins",
        eyebrow: "Pillar III \u00b7 Chapter 4",
        interactive: "ironsight-sins",
        html: `
          <p class="lede">Speculative interfaces fail for recurring reasons. The catalog names
          each failure mode, grounds it in film research, and prescribes a mitigation.</p>
          <p>Then run the <strong>Fuidgetry Detector</strong> on a real element: cover it, kill its
          feed, delete it. If the operator loses nothing, the pixels were decoration. Score a
          sample element below.</p>`,
      },
      {
        title: "The Report Card",
        eyebrow: "Pillar III \u00b7 Chapter 5",
        interactive: "ironsight-report",
        html: `
          <p class="lede">Every surface is scored on three independent axes \u2014 <strong>Sci</strong>
          (believability), <strong>Fi</strong> (narrative), and <strong>Interfaces</strong>
          (usability) \u2014 each 0\u20134, for twelve points total.</p>
          <p>The axes are not interchangeable: a 4 on Sci cannot redeem a 0 on Interfaces \u2014 the
          operator still loses. Score a surface below and find its band.</p>`,
      },
    ],
  },
];

// Per-chapter learning extras, merged onto chapters by index below.
// { takeaways: string[], check: { q, options[], answer, explain }, related: [{label, hash}] }
const EXTRAS = {
  compass: [
    {
      takeaways: [
        "COMPASS front-loads thinking to avoid rework and isolated silos.",
        "Trigger on multi-commit / cross-service / new-subsystem work; skip trivial fixes.",
        "Match planning depth to the stakes of the work.",
      ],
      check: { q: "Which task should SKIP COMPASS?", options: ["Tweaking a single config value", "Adding a new cross-service feature", "Designing a new subsystem"], answer: 0, explain: "Trivial single-file/config/doc changes go straight to DOCTRINE. The other two carry architectural weight." },
      related: [{ label: "DOCTRINE \u00b7 The Core Loop", hash: "#/doctrine/0" }],
    },
    {
      takeaways: [
        "Each phase has a defined output; most have a human gate.",
        "Never solution before FRAME; never architect before TARGET is chosen.",
      ],
      check: { q: "Which phase defines the problem without proposing a solution?", options: ["FRAME", "DRAFT", "APPROACH"], answer: 0, explain: "FRAME states what's wrong and why. Solutions belong to TARGET, APPROACH, and DRAFT." },
      related: [{ label: "COMPASS \u00b7 Breaking the Design", hash: "#/compass/2" }],
    },
    {
      takeaways: [
        "STRESS applies every lens to every major decision \u2014 not a fixed count.",
        "Fix what's fixable inline; flag what needs a human call.",
      ],
      check: { q: "STRESS review is complete when\u2026", options: ["Every lens has been applied to every major decision", "Exactly three findings are logged", "The first critical bug is found"], answer: 0, explain: "It is exhaustive, not count-based \u2014 you stop when the lenses are exhausted, not at a quota." },
      related: [{ label: "IRON SIGHT \u00b7 The 12 Deadly Sins", hash: "#/ironsight/3" }],
    },
    {
      takeaways: [
        "Plans persist as decision records \u2014 what was considered, decided, deferred.",
        "Frontmatter carries name, overview, phase, todos; the body carries rationale.",
      ],
      check: { q: "Why keep a plan file after the work ships?", options: ["It records what was considered, decided, and deferred", "Git requires it", "It stores deployment secrets"], answer: 0, explain: "Plans are durable decision records, not ephemeral scratch notes." },
      related: [{ label: "DOCTRINE \u00b7 Issue-First Tracking", hash: "#/doctrine/3" }],
    },
    {
      takeaways: [
        "The same seven phases scale down to a single small feature.",
        "A finished COMPASS run hands DOCTRINE an epic and an ordered task list.",
      ],
      check: { q: "After FINAL is approved, what happens next?", options: ["Create the tracker epic + child issues, then begin DOCTRINE", "Deploy immediately", "Delete the plan file"], answer: 0, explain: "FINAL feeds implementation: epic + children, then the DOCTRINE build loop." },
      related: [{ label: "DOCTRINE \u00b7 The Core Loop", hash: "#/doctrine/0" }],
    },
  ],
  doctrine: [
    {
      takeaways: [
        "track \u2192 implement \u2192 gate \u2192 commit \u2192 push \u2192 document \u2192 next. No step optional.",
        "Work that isn't tracked, pushed, and documented is incomplete.",
      ],
      check: { q: "A change is committed locally but not pushed. It is\u2026", options: ["Incomplete work", "Done", "Ready to close the issue"], answer: 0, explain: "The loop only closes after push + documentation. Local commits don't count." },
      related: [{ label: "COMPASS \u00b7 The Seven Phases", hash: "#/compass/1" }],
    },
    {
      takeaways: [
        "One commit = one logical, independently revertable change.",
        "Never mix refactors, features, and unrelated cleanups.",
      ],
      check: { q: "Which belongs in ONE commit?", options: ["A dependency bump + the call-site migrations it forces", "A bug fix + unrelated import cleanup", "A refactor + a new feature"], answer: 0, explain: "The migrations are the dependency of the bump \u2014 one coherent unit. The others mix concerns." },
      related: [{ label: "DOCTRINE \u00b7 Pre-Commit Gates", hash: "#/doctrine/2" }],
    },
    {
      takeaways: [
        "Gates run in a fixed order before every commit.",
        "A failing gate is fixed in the same logical unit \u2014 never deferred.",
      ],
      check: { q: "A gate fails mid-commit. The correct move is\u2026", options: ["Fix it in the same unit and re-run the gates", "Commit with a 'fix later' note", "Skip the gate this once"], answer: 0, explain: "No 'fix later' commits. Fix within scope, re-run the gates, then commit." },
      related: [{ label: "IRON SIGHT \u00b7 The Color System", hash: "#/ironsight/1" }],
    },
    {
      takeaways: [
        "Work is tracked before code exists; the tracker mirrors reality.",
        "Every issue carries an assignee, scope labels, and a priority.",
      ],
      check: { q: "When is an issue set to in_progress?", options: ["The moment work begins", "After the PR merges", "Only at session end"], answer: 0, explain: "Status tracks reality \u2014 flip to in_progress as you start." },
      related: [{ label: "DOCTRINE \u00b7 Conflicts & Deploy Hygiene", hash: "#/doctrine/4" }],
    },
    {
      takeaways: [
        "Every fix ships through the repo: edit \u2192 gate \u2192 commit \u2192 push \u2192 deploy.",
        "Out-of-band changes silently desync the environment from a clean checkout.",
      ],
      check: { q: "How do you fix a bug on a deployed server?", options: ["Edit in repo, gate, commit, push, deploy from pushed code", "SSH in and hot-patch the file", "rsync the corrected file over"], answer: 0, explain: "Hot-patching breaks reproducibility. Ship through the repository, always." },
      related: [{ label: "COMPASS \u00b7 The Plan File", hash: "#/compass/3" }],
    },
  ],
  ironsight: [
    {
      takeaways: [
        "Five contracts: Context-Aware, Intentful, Actionable, Data-Driven, Purposeful.",
        "Each ships with a concrete violation test.",
      ],
      check: { q: "The thumb-occlusion test enforces which pillar?", options: ["Intentful", "Purposeful", "Data-Driven"], answer: 0, explain: "Cover the element; if no decision-relevant info is lost, it's fuidgetry \u2014 an Intentful violation." },
      related: [{ label: "IRON SIGHT \u00b7 The 12 Deadly Sins", hash: "#/ironsight/3" }],
    },
    {
      takeaways: [
        "14 colors \u00d7 3 tiers (glow / matte / dim); values are absolute.",
        "Colors live in one token source, mirrored across runtimes \u2014 never inline.",
      ],
      check: { q: "Where do color values live?", options: ["One token source, referenced everywhere", "Inline, wherever convenient", "Duplicated per component"], answer: 0, explain: "Single source of truth. Inline hex is Token Drift (Sin #9)." },
      related: [{ label: "DOCTRINE \u00b7 Pre-Commit Gates", hash: "#/doctrine/2" }],
    },
    {
      takeaways: [
        "Animation is data-bound: pulse = health, glow = load, shimmer = activity.",
        "Sever the feed and a true instrument visibly freezes.",
      ],
      check: { q: "You cut the data feed and the UI looks identical. That is\u2026", options: ["Static Death \u2014 a lying instrument", "Correct, efficient behavior", "A rendering optimization"], answer: 0, explain: "If motion and urgency don't change when data stops, the surface is scenic art (Sins #5 / #10)." },
      related: [{ label: "IRON SIGHT \u00b7 The Five Pillars", hash: "#/ironsight/0" }],
    },
    {
      takeaways: [
        "Twelve recurring failure modes, each with a film-grounded mitigation.",
        "The Fuidgetry Detector condemns an element on a 'no' to Q1, Q5, or Q6.",
      ],
      check: { q: "Red and crimson are reserved for\u2026", options: ["Error, critical, and safety only", "Any accent that looks good", "Headings and chrome"], answer: 0, explain: "Routine danger-colors desensitize alarm response (Sin #11: Aposematic Confusion)." },
      related: [{ label: "IRON SIGHT \u00b7 The Report Card", hash: "#/ironsight/4" }],
    },
    {
      takeaways: [
        "Score Sci \u00d7 Fi \u00d7 Interfaces, each 0\u20134, for 12 total.",
        "A high Sci can't redeem a zero Interfaces \u2014 the operator still loses.",
      ],
      check: { q: "A surface scores Sci 4 / Interfaces 0. The verdict?", options: ["The operator still loses \u2014 restart from intent", "Ship it; Sci carries it", "Average to 2 \u2014 acceptable"], answer: 0, explain: "Usability is non-negotiable; believability cannot compensate for it." },
      related: [{ label: "COMPASS \u00b7 Why Plan First?", hash: "#/compass/0" }],
    },
  ],
};

// Domain glossary \u2014 first occurrence of each term in chapter prose gets a hover definition.
export const GLOSSARY = {
  "RECON": "COMPASS Phase 1 \u2014 reconnaissance: map the system terrain before defining the problem.",
  "FRAME": "COMPASS Phase 2 \u2014 define what's wrong and why, without proposing a solution.",
  "STRESS": "COMPASS Phase 6 \u2014 adversarial review applying every lens to every major decision.",
  "plan file": "A durable decision record (frontmatter + body) persisted to the plans directory.",
  "atomic commit": "One logical, independently revertable change \u2014 the smallest coherent diff.",
  "issue-first": "Track the work in the tracker before writing any code.",
  "pre-commit gates": "Ordered checks (lint, test, conflicts, design, naming) run before every commit.",
  "fuidgetry": "Decorative motion or controls that consume attention without carrying information.",
  "glass panel": "A translucent container using backdrop blur + saturate \u2014 never opaque.",
  "dead glass": "A surface that renders but ignores system context/directives \u2014 a Pillar 1 violation.",
  "escalation": "The graded ladder (peripheral \u2192 crisis) governing how much prominence a signal earns.",
  "the Director": "The adaptation engine computing mode, attention, and ambient parameters from live state.",
  "token": "A named design value (color/font/timing) in the single source of truth; never hardcoded.",
  "Centaur Computing": "Human head for strategy + machine body for fusion and pacing, coupled by the HUD.",
};

// Merge extras onto each chapter by index.
PILLARS.forEach((p) => p.chapters.forEach((ch, i) => Object.assign(ch, (EXTRAS[p.id] || [])[i] || {})));

export const PILLAR_BY_ID = Object.fromEntries(PILLARS.map((p) => [p.id, p]));
