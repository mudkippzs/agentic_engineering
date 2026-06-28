// Interactive widgets. Each builder receives its mount element and a context
// { accent } and populates it. Registered in INTERACTIVES by content id.

/* ---------- tiny helpers ---------- */
function h(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}
function toast(msg) {
  let t = document.querySelector(".copy-toast");
  if (!t) {
    t = h(`<div class="copy-toast"></div>`);
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 1400);
}

// Make a non-button node operable by mouse AND keyboard (a11y: every interactive
// element is focusable + Enter/Space activatable). Preserves any existing data-tip.
function clickable(el, fn, tip) {
  el.setAttribute("role", "button");
  el.tabIndex = 0;
  if (tip) el.setAttribute("data-tip", tip);
  el.addEventListener("click", fn);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); }
  });
  return el;
}

export const INTERACTIVES = {};

/* ============================================================ COMPASS 1 */
INTERACTIVES["compass-trigger"] = (mount) => {
  const attrs = [
    { k: "multi", label: "Multiple commits", trigger: true },
    { k: "subsystem", label: "New subsystem / service", trigger: true },
    { k: "cross", label: "Cross-service change", trigger: true },
    { k: "iface", label: "Touches a shared interface", trigger: true },
    { k: "ask", label: "Human asked to plan / design", trigger: true },
    { k: "single", label: "Single-file fix", trigger: false },
    { k: "config", label: "Config-only change", trigger: false },
    { k: "doc", label: "Doc-only edit", trigger: false },
  ];
  const state = new Set();
  mount.innerHTML = `
    <div class="lab-tag"><span class="status-dot"></span> DECISION \u00b7 should this work trigger COMPASS?</div>
    <p style="margin-top:0;color:var(--hud-text-muted)">Toggle the attributes of the work in front of you.</p>
    <div class="chips" id="ct-chips"></div>
    <div id="ct-verdict"></div>`;
  const chips = mount.querySelector("#ct-chips");
  attrs.forEach((a) => {
    const c = h(`<button class="chip" data-tip="${a.trigger ? "A trigger condition \u2014 favours running COMPASS" : "A trivial-work signal \u2014 favours skipping"}">${a.label}</button>`);
    c.onclick = () => {
      state.has(a.k) ? state.delete(a.k) : state.add(a.k);
      c.classList.toggle("on");
      render();
    };
    chips.appendChild(c);
  });
  const out = mount.querySelector("#ct-verdict");
  function render() {
    const anyTrigger = attrs.some((a) => a.trigger && state.has(a.k));
    const anySkip = attrs.some((a) => !a.trigger && state.has(a.k));
    if (state.size === 0) { out.innerHTML = ""; return; }
    if (anyTrigger) {
      out.innerHTML = `<div class="verdict go">\u25B6 RUN COMPASS \u2014 a trigger condition is present. Plan before code: RECON \u2192 FINAL.${anySkip ? " (Triggers win over trivial signals.)" : ""}</div>`;
    } else {
      out.innerHTML = `<div class="verdict skip">\u23ED SKIP COMPASS \u2014 trivial work. Go straight to the DOCTRINE build loop.</div>`;
    }
  }
};

/* ============================================================ COMPASS 2 */
INTERACTIVES["compass-phases"] = (mount) => {
  const phases = [
    { n: "RECON", t: "Reconnaissance & System Mapping", d: "Understand the terrain before defining the problem. Read the system map, check the tracker, scan planned work, identify every service the work could touch, review prior plans.", out: "System Context Brief (3\u20135 bullets)", gate: null },
    { n: "FRAME", t: "Problem Definition & Root-Cause", d: "Define what is wrong and why \u2014 not what to build. State the problem in one sentence, analyze root causes, map integration surfaces, identify constraints. Resist solutioning.", out: "Problem Statement", gate: "Human confirms the problem framing" },
    { n: "TARGET", t: "End-State Visioning", d: "Define where we want to end up, not how to get there. Propose 3\u20134 distinct end-states (outcomes, not solutions); score each on scalability, modularity, fit, effort, silo risk.", out: "End-State Matrix", gate: "Human selects / synthesizes the target" },
    { n: "APPROACH", t: "Solution Architecture", d: "Define how at the structural level. Propose 2\u20133 high-level approaches to the chosen end-state with tech choices, touch points, effort, and risk.", out: "Approach Comparison + recommendation", gate: "Human selects an approach" },
    { n: "DRAFT", t: "Design Document", d: "The full technical spec: architecture diagram, data models, API contracts, service interactions, UI references, naming, migration plan, file inventory, issue breakdown.", out: "Draft Design Doc (saved to plans/)", gate: null },
    { n: "STRESS", t: "Adversarial Review", d: "Break the design before building it \u2014 one pass, many lenses, applied to every major decision until exhausted. Fix what's fixable; flag what needs a human call.", out: "Annotated draft + decision log", gate: null },
    { n: "FINAL", t: "Proposal Document", d: "Incorporate refinements: clean architecture, issue hierarchy, implementation sequence, risk register, success criteria. The artifact that outlives the conversation.", out: "Final Design Doc \u2192 create epic, begin DOCTRINE", gate: null },
  ];
  let i = 0;
  mount.innerHTML = `
    <div class="lab-tag"><span class="status-dot"></span> STEPPER \u00b7 the seven phases</div>
    <div class="stepper-track" id="cp-track"></div>
    <div class="step-panel" id="cp-panel"></div>
    <div class="chapter-foot">
      <button class="btn ghost" id="cp-prev" data-tip="Step back \u2014 phases run RECON\u2192FINAL; earlier phases gate later ones">\u2039 Prev</button>
      <button class="btn" id="cp-next" data-tip="Step forward \u2014 each phase adds an output, some a human gate">Next \u203a</button>
    </div>`;
  const track = mount.querySelector("#cp-track");
  const panel = mount.querySelector("#cp-panel");
  phases.forEach((p, idx) => {
    const node = h(`<div class="node">${idx + 1}\u00b7${p.n}</div>`);
    clickable(node, () => { i = idx; render(); }, `${p.n} \u2014 output: ${p.out}`);
    track.appendChild(node);
  });
  function render() {
    [...track.children].forEach((n, idx) => {
      n.classList.toggle("active", idx === i);
      n.classList.toggle("done", idx < i);
    });
    const p = phases[i];
    panel.innerHTML = `
      <h3 style="color:var(--accent)">${p.n} \u2014 ${p.t}</h3>
      <p>${p.d}</p>
      <p><span class="tag output">OUTPUT</span>${p.out}</p>
      ${p.gate ? `<p><span class="tag gate">GATE</span>${p.gate} before proceeding.</p>` : `<p style="color:var(--hud-text-dim);font-family:var(--hud-font-mono);font-size:12px">No gate \u2014 produces an artifact and flows on.</p>`}`;
    mount.querySelector("#cp-prev").disabled = i === 0;
    mount.querySelector("#cp-next").disabled = i === phases.length - 1;
  }
  mount.querySelector("#cp-prev").onclick = () => { if (i > 0) { i--; render(); } };
  mount.querySelector("#cp-next").onclick = () => { if (i < phases.length - 1) { i++; render(); } };
  render();
};

/* ============================================================ COMPASS 3 */
INTERACTIVES["compass-stress"] = (mount) => {
  const lenses = [
    { n: "So what?", q: "Why does this matter? What fails if we skip it?", c: "Gold-plating, unnecessary complexity" },
    { n: "And then?", q: "What are the downstream consequences? Second-order effects on other services?", c: "Cascade failures, hidden coupling" },
    { n: "Silo check", q: "Does this create isolated functionality? Could it share interfaces, data, or patterns?", c: "Fragmentation, duplicate work" },
    { n: "Scale", q: "What happens at 10\u00d7 load? 100\u00d7 data? Does it degrade gracefully?", c: "Bottlenecks, O(n\u00b2) traps" },
    { n: "Failure modes", q: "What breaks? How is failure detected? How does the system recover?", c: "Missing error handling, unmonitorable state" },
    { n: "API surface", q: "Is the interface minimal? Could other services use it? Is it transport-compatible?", c: "Over-exposure, under-exposure" },
    { n: "Design system", q: "Does every UI surface comply? Tokens, fonts, panels, tooltips, animation?", c: "Visual inconsistency (see IRON SIGHT)" },
    { n: "Naming", q: "Does every new entity have a codename? Is it registered in the inventory?", c: "Convention violations" },
    { n: "Security", q: "Does this expose new attack surface? Auth, validation, egress?", c: "Injection, privilege, data leakage" },
    { n: "Reversibility", q: "Can this be rolled back? What's the blast radius of a revert?", c: "Irreversible migrations, hard dependencies" },
  ];
  const seen = new Set();
  mount.innerHTML = `
    <div class="lab-tag"><span class="status-dot warn"></span> ADVERSARIAL \u00b7 apply each lens to the sample design</div>
    <div class="callout" style="margin-top:0">Sample design under review: <em>"Add a per-user rate limiter as a new in-memory service in front of the API."</em></div>
    <div class="chips" id="cs-chips" style="margin:var(--hud-sp-4) 0"></div>
    <div id="cs-detail" style="min-height:90px"></div>
    <div id="cs-progress" style="margin-top:var(--hud-sp-4)"></div>`;
  const chips = mount.querySelector("#cs-chips");
  const detail = mount.querySelector("#cs-detail");
  const prog = mount.querySelector("#cs-progress");
  lenses.forEach((l) => {
    const c = h(`<button class="chip" data-tip="${l.c}">${l.n}</button>`);
    c.onclick = () => {
      seen.add(l.n);
      c.classList.add("on");
      detail.innerHTML = `
        <h3 style="font-family:var(--hud-font-display);letter-spacing:1px;color:var(--accent);margin:.2em 0">${l.n}</h3>
        <p style="margin:.2em 0"><strong>Question:</strong> ${l.q}</p>
        <p style="margin:.2em 0;color:var(--hud-text-muted)"><strong>Catches:</strong> ${l.c}</p>`;
      renderProg();
    };
    chips.appendChild(c);
  });
  function renderProg() {
    const pct = Math.round((seen.size / lenses.length) * 100);
    prog.innerHTML = `
      <div style="font-family:var(--hud-font-mono);font-size:11px;color:var(--hud-text-dim);margin-bottom:6px">LENSES APPLIED ${seen.size}/${lenses.length}</div>
      <div class="meter"><span style="width:${pct}%"></span></div>
      ${seen.size === lenses.length ? `<div class="verdict go" style="margin-top:var(--hud-sp-3)">\u2713 Every lens applied. STRESS is exhaustive, not count-based \u2014 only now is the design ready for FINAL.</div>` : ""}`;
  }
  renderProg();
};

/* ============================================================ COMPASS 4 */
INTERACTIVES["compass-planfile"] = (mount) => {
  mount.innerHTML = `
    <div class="lab-tag"><span class="status-dot"></span> BUILDER \u00b7 assemble a plan-file front-matter</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--hud-sp-4)">
      <div style="display:flex;flex-direction:column;gap:10px">
        <label class="pf-l">name<input id="pf-name" type="text" value="Per-user rate limiter" data-tip="Human-readable plan name"></label>
        <label class="pf-l">overview<textarea id="pf-ov" rows="2" data-tip="One-paragraph summary">Throttle abusive clients without coupling the limiter to request handlers.</textarea></label>
        <label class="pf-l">compass_phase
          <select id="pf-phase" data-tip="Current COMPASS phase">
            <option>recon</option><option>frame</option><option>target</option>
            <option>approach</option><option selected>draft</option><option>stress</option><option>final</option>
          </select>
        </label>
        <label class="pf-l">add todo
          <span style="display:flex;gap:6px"><input id="pf-todo" type="text" placeholder="e.g. design token bucket" data-tip="A todo item; press Add">
          <button class="btn" id="pf-add" data-tip="Add this item to the plan's todo list">Add</button></span>
        </label>
        <ul id="pf-todos" style="font-size:13px;color:var(--hud-text-muted)"></ul>
      </div>
      <div>
        <div style="font-family:var(--hud-font-mono);font-size:10px;color:var(--hud-text-dim);letter-spacing:2px;margin-bottom:6px">plans/rate_limiter_a1f3.plan.md</div>
        <pre id="pf-out" class="mono" style="background:var(--hud-surface-0);border:1px solid var(--hud-glass-border);padding:14px;border-radius:3px;font-size:12px;color:var(--hud-cyan-matte);overflow:auto;white-space:pre-wrap;margin:0"></pre>
      </div>
    </div>`;
  mount.querySelectorAll(".pf-l").forEach((l) => {
    l.style.cssText = "display:flex;flex-direction:column;gap:4px;font-family:var(--hud-font-mono);font-size:11px;letter-spacing:1px;color:var(--hud-text-dim);text-transform:uppercase";
    const f = l.querySelector("input,textarea,select");
    if (f) f.style.cssText = "background:var(--hud-surface-1);border:1px solid var(--hud-border-solid);color:var(--hud-text-bright);font-family:var(--hud-font-ui);font-size:14px;padding:6px 8px;border-radius:2px;text-transform:none;letter-spacing:0;width:100%";
  });
  const todos = [{ c: "Design the token-bucket store", s: "pending" }];
  const ul = mount.querySelector("#pf-todos");
  const out = mount.querySelector("#pf-out");
  function render() {
    ul.innerHTML = todos.map((t, idx) => `<li>${t.c} <code>${t.s}</code> <button data-i="${idx}" class="pf-x" data-tip="Remove this todo from the plan" style="background:none;border:none;color:var(--hud-red);cursor:pointer">\u00d7</button></li>`).join("");
    ul.querySelectorAll(".pf-x").forEach((b) => (b.onclick = () => { todos.splice(+b.dataset.i, 1); render(); }));
    const todoYaml = todos.length
      ? todos.map((t, idx) => `  - id: t${idx + 1}\n    content: ${t.c}\n    status: ${t.s}`).join("\n")
      : "  []";
    out.textContent =
`---
name: ${mount.querySelector("#pf-name").value}
overview: ${mount.querySelector("#pf-ov").value}
compass_phase: ${mount.querySelector("#pf-phase").value}
todos:
${todoYaml}
isProject: false
---`;
  }
  mount.querySelector("#pf-add").onclick = () => {
    const v = mount.querySelector("#pf-todo").value.trim();
    if (v) { todos.push({ c: v, s: "pending" }); mount.querySelector("#pf-todo").value = ""; render(); }
  };
  ["#pf-name", "#pf-ov", "#pf-phase"].forEach((s) => mount.querySelector(s).addEventListener("input", render));
  render();
};

/* ============================================================ DOCTRINE 1 */
INTERACTIVES["doctrine-loop"] = (mount) => {
  const steps = [
    { n: "TRACK", d: "Issue-first. Find or create a tracked issue before writing code." },
    { n: "IMPLEMENT", d: "One logical change \u2014 the smallest revertable, coherent unit." },
    { n: "GATE", d: "Lint \u2192 full parallel tests \u2192 conflicts \u2192 design system \u2192 naming." },
    { n: "COMMIT", d: "type(scope): description (#id). One commit = one logical change." },
    { n: "PUSH", d: "Push to the working branch immediately \u2014 never accumulate local commits." },
    { n: "DOCUMENT", d: "Link the commit, comment what/files/tests, resolve or queue [NEXT]." },
    { n: "NEXT", d: "Pull the next logical unit. The loop is reflex, not a checklist." },
  ];
  mount.innerHTML = `
    <div class="lab-tag"><span class="status-dot"></span> CORE LOOP \u00b7 every change flows through this</div>
    <div class="loop" id="dl-loop"></div>
    <div id="dl-desc" style="min-height:48px;margin-top:var(--hud-sp-4);text-align:center;color:var(--hud-text-muted)"></div>
    <div style="text-align:center;margin-top:var(--hud-sp-3)"><button class="btn" id="dl-run" data-tip="Animate one pass of the loop">\u25B6 Run the loop</button></div>`;
  const loop = mount.querySelector("#dl-loop");
  const desc = mount.querySelector("#dl-desc");
  const nodes = [];
  steps.forEach((s, idx) => {
    const node = h(`<div class="node">${s.n}</div>`);
    clickable(node, () => focus(idx), s.d);
    nodes.push(node);
    loop.appendChild(node);
    if (idx < steps.length - 1) loop.appendChild(h(`<span class="arrow">\u2192</span>`));
  });
  function focus(idx) {
    nodes.forEach((n, j) => n.classList.toggle("fire", j === idx));
    desc.innerHTML = `<strong style="color:var(--accent)">${steps[idx].n}</strong> \u2014 ${steps[idx].d}`;
  }
  mount.querySelector("#dl-run").onclick = () => {
    let i = 0;
    const tick = () => { focus(i); i++; if (i < steps.length) setTimeout(tick, 700); };
    tick();
  };
  focus(0);
};

/* ============================================================ DOCTRINE 2 */
INTERACTIVES["doctrine-atomic"] = (mount) => {
  const items = [
    { t: "Fix off-by-one in the pagination cursor", atomic: true, why: "One bug, one revertable diff." },
    { t: "Refactor the auth module AND add OAuth login", atomic: false, why: "Refactor + feature \u2014 split into two commits." },
    { t: "Add tests for the new pagination endpoint", atomic: true, why: "Tests for the implementation they accompany." },
    { t: "Fix a render bug AND tidy unrelated imports", atomic: false, why: "Bug fix + unrelated cleanup \u2014 split them." },
    { t: "Rename a variable across one module", atomic: true, why: "Single coherent mechanical change." },
    { t: "Bump dep version AND migrate three call sites it broke", atomic: true, why: "The migration is the dependency of the bump \u2014 one unit." },
  ];
  mount.innerHTML = `
    <div class="lab-tag"><span class="status-dot"></span> CLASSIFY \u00b7 is each changeset one atomic commit?</div>
    <div class="cards" id="da-cards"></div>
    <div id="da-score" style="margin-top:var(--hud-sp-4)"></div>`;
  const wrap = mount.querySelector("#da-cards");
  let answered = 0, correct = 0;
  items.forEach((it) => {
    const card = h(`
      <div class="dcard">
        <div class="body"><div class="desc-t">${it.t}</div><div class="hint"></div></div>
        <button class="btn ghost" data-a="1" data-tip="One coherent, revertable diff">Atomic</button>
        <button class="btn ghost" data-a="0" data-tip="Two unrelated changes \u2014 split">Split</button>
      </div>`);
    const hint = card.querySelector(".hint");
    card.querySelectorAll("button").forEach((b) => {
      b.onclick = () => {
        const said = b.dataset.a === "1";
        const ok = said === it.atomic;
        card.classList.remove("correct", "wrong");
        card.classList.add(ok ? "correct" : "wrong");
        hint.style.color = ok ? "var(--hud-emerald)" : "var(--hud-red)";
        hint.textContent = `${ok ? "\u2713" : "\u2717"} ${it.why}`;
        if (!card.dataset.done) { answered++; if (ok) correct++; card.dataset.done = "1"; score(); }
      };
    });
    wrap.appendChild(card);
  });
  const sc = mount.querySelector("#da-score");
  function score() {
    if (answered < items.length) { sc.innerHTML = `<div style="font-family:var(--hud-font-mono);font-size:11px;color:var(--hud-text-dim)">CLASSIFIED ${answered}/${items.length}</div>`; return; }
    sc.innerHTML = `<div class="verdict ${correct === items.length ? "go" : "skip"}">${correct}/${items.length} correct. ${correct === items.length ? "You read diffs like a reviewer." : "Re-check: refactors, cleanups, and features never ride together."}</div>`;
  }
};

/* ============================================================ DOCTRINE 3 */
INTERACTIVES["doctrine-gates"] = (mount) => {
  const base = [
    { n: "Lint (ruff/eslint)", key: "lint" },
    { n: "Full test suite (parallel)", key: "test" },
    { n: "No merge conflicts", key: "conflict" },
    { n: "Design-system compliance", key: "design" },
    { n: "Naming / codename registered", key: "name" },
  ];
  mount.innerHTML = `
    <div class="lab-tag"><span class="status-dot"></span> GATE RUNNER \u00b7 try to commit a UI change</div>
    <div class="gates" id="dg-gates"></div>
    <div style="display:flex;gap:10px"><button class="btn" id="dg-commit" data-tip="Run the pre-commit gates in order">$ git commit</button>
    <button class="btn ghost" id="dg-fix" disabled data-tip="Resolve the failing gate, then re-run">Fix &amp; re-run</button></div>
    <div id="dg-msg" style="margin-top:var(--hud-sp-3)"></div>`;
  const gwrap = mount.querySelector("#dg-gates");
  const rows = {};
  base.forEach((g) => {
    const r = h(`<div class="gate-row wait"><span class="status-dot idle"></span><span class="gname">${g.n}</span><span class="gstate">WAIT</span></div>`);
    rows[g.key] = r; gwrap.appendChild(r);
  });
  const msg = mount.querySelector("#dg-msg");
  let fixed = false;
  function set(r, cls, state) {
    r.className = `gate-row ${cls}`;
    r.querySelector(".gstate").textContent = state;
    const dot = r.querySelector(".status-dot");
    dot.className = "status-dot " + (cls === "fail" ? "crit" : cls === "run" ? "warn" : cls === "pass" ? "" : "idle");
    if (cls === "wait") dot.classList.add("idle");
  }
  function run() {
    base.forEach((g) => set(rows[g.key], "wait", "WAIT"));
    msg.innerHTML = "";
    mount.querySelector("#dg-commit").disabled = true;
    let i = 0;
    const step = () => {
      const g = base[i];
      set(rows[g.key], "run", "RUN");
      setTimeout(() => {
        // First pass: the design gate fails (hardcoded hex). After fix, all pass.
        if (g.key === "design" && !fixed) {
          set(rows[g.key], "fail", "FAIL");
          msg.innerHTML = `<div class="alert-banner"><div class="atitle">GATE FAILED \u00b7 DESIGN SYSTEM</div>
            <div style="font-family:var(--hud-font-mono);font-size:12px;margin-top:4px">Hardcoded <code>#00e8ff</code> found \u2014 IRON SIGHT requires <code>var(--hud-cyan)</code>. <strong>No "fix later" commits.</strong></div></div>`;
          mount.querySelector("#dg-fix").disabled = false;
          return;
        }
        set(rows[g.key], "pass", "PASS");
        i++;
        if (i < base.length) step();
        else {
          msg.innerHTML = `<div class="verdict go">\u2713 All gates green \u2014 commit created and pushed. <code>style(ui): tokenize accent (#412)</code></div>`;
          mount.querySelector("#dg-commit").disabled = false;
        }
      }, 520);
    };
    step();
  }
  mount.querySelector("#dg-commit").onclick = () => { fixed = false; run(); };
  mount.querySelector("#dg-fix").onclick = () => { fixed = true; mount.querySelector("#dg-fix").disabled = true; run(); };
};

/* ============================================================ DOCTRINE 4 */
INTERACTIVES["doctrine-issues"] = (mount) => {
  const flow = ["backlog", "todo", "in_progress", "review", "done_fixed"];
  let i = 0;
  mount.innerHTML = `
    <div class="lab-tag"><span class="status-dot"></span> LIFECYCLE \u00b7 walk an issue from intake to resolution</div>
    <div class="stepper-track" id="di-track"></div>
    <div class="glass-panel" style="margin-top:var(--hud-sp-3)"><div class="panel-body">
      <div style="font-family:var(--hud-font-mono);font-size:11px;color:var(--hud-text-dim);letter-spacing:1px">ISSUE #412</div>
      <div style="font-size:16px;color:var(--hud-text-bright);margin:4px 0">Tokenize the launcher accent color</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;font-family:var(--hud-font-mono);font-size:11px;margin-top:8px">
        <span class="tag" style="background:var(--hud-violet-dim);color:var(--hud-violet)">assignee: agent</span>
        <span class="tag" style="background:var(--hud-blue-dim);color:var(--hud-blue)">label: ui</span>
        <span class="tag" style="background:var(--hud-slate-dim);color:var(--hud-slate)">label: automated</span>
        <span class="tag" style="background:var(--hud-amber-dim);color:var(--hud-amber)">priority: medium</span>
      </div>
      <div id="di-note" style="margin-top:12px;color:var(--hud-text-muted);font-size:13px"></div>
    </div></div>
    <div style="text-align:center;margin-top:var(--hud-sp-3)"><button class="btn" id="di-adv" data-tip="Promote the issue to its next lifecycle status (in_progress \u2192 review \u2192 done)">Advance status \u203a</button></div>`;
  const track = mount.querySelector("#di-track");
  const notes = {
    backlog: "Captured, unprioritized. Required metadata present from creation: assignee, scope label, source label, priority.",
    todo: "Triaged and prioritized; ready to pick up.",
    in_progress: "Set to in_progress the moment work begins \u2014 the tracker reflects reality.",
    review: "Code committed, pushed, and documented. The commit is linked back to the issue.",
    done_fixed: "Resolved with a terminal status. Deferred work spawned a child issue or a [NEXT] comment.",
  };
  flow.forEach((s, idx) => {
    const n = h(`<div class="node">${s}</div>`);
    clickable(n, () => { i = idx; render(); }, notes[s]);
    track.appendChild(n);
  });
  function render() {
    [...track.children].forEach((n, idx) => { n.classList.toggle("active", idx === i); n.classList.toggle("done", idx < i); });
    mount.querySelector("#di-note").innerHTML = notes[flow[i]];
    mount.querySelector("#di-adv").disabled = i === flow.length - 1;
  }
  mount.querySelector("#di-adv").onclick = () => { if (i < flow.length - 1) { i++; render(); } };
  render();
};

/* ============================================================ IRON SIGHT 1 */
INTERACTIVES["ironsight-pillars"] = (mount) => {
  const pillars = [
    { n: "Context-Aware", d: "The interface knows where you are \u2014 mode, time, attention, posture \u2014 and reshapes itself accordingly.", test: "If an element shows the same content, density, and prominence regardless of mode, time, engagement, or attention, it is not context-aware \u2014 it's wallpaper with a stylesheet." },
    { n: "Intentful", d: "Every element earns its pixels; nothing exists to simulate competence. Animation binds to data.", test: "Cover the element with your thumb. If the operator loses no decision-relevant information, the pixels were fuidgetry." },
    { n: "Actionable", d: "Data without next steps is noise; displays exist to change behavior or confirm no action is required.", test: "Can the operator commit, defer, or reject a course of action from this view alone? If they must open three surfaces to interpret it, the display failed." },
    { n: "Data-Driven", d: "The system breathes with real telemetry; the HUD is an instrument, not a mural.", test: "Sever all data feeds. If motion, color urgency, and density stay unchanged, the surface is scenic art." },
    { n: "Purposeful", d: "A command center, not a screensaver; prominence is budgeted like power on a warship.", test: "Remove the most visually dominant element. If operator throughput improves, it served ego or brand, not mission." },
  ];
  let i = 0;
  mount.innerHTML = `
    <div class="lab-tag"><span class="status-dot violet"></span> CONTRACTS \u00b7 the five pillars and their violation tests</div>
    <div class="chips" id="ip-chips" style="margin-bottom:var(--hud-sp-4)"></div>
    <div id="ip-detail"></div>`;
  const chips = mount.querySelector("#ip-chips");
  const detail = mount.querySelector("#ip-detail");
  pillars.forEach((p, idx) => {
    const c = h(`<button class="chip" data-tip="${p.d}">${idx + 1}. ${p.n}</button>`);
    c.onclick = () => { i = idx; render(); };
    chips.appendChild(c);
  });
  function render() {
    [...chips.children].forEach((c, idx) => c.classList.toggle("on", idx === i));
    const p = pillars[i];
    detail.innerHTML = `
      <h3 style="font-family:var(--hud-font-display);letter-spacing:1px;color:var(--accent)">${p.n}</h3>
      <p>${p.d}</p>
      <div class="callout warn"><strong>Violation test:</strong> ${p.test}</div>`;
  }
  render();
};

/* ============================================================ IRON SIGHT 2 */
INTERACTIVES["ironsight-palette"] = (mount) => {
  const colors = [
    ["cyan", "Core intelligence, signal"], ["teal", "Engineering support, tooling"],
    ["green", "Success, healthy, build"], ["emerald", "Engineering, creation"],
    ["amber", "Warning, annotation, watch"], ["gold", "Infrastructure, stability"],
    ["red", "Error, critical, offline"], ["crimson", "Governance, hard limits"],
    ["magenta", "Urgent alerts, pipeline"], ["rose", "Aesthetic, presentation"],
    ["violet", "Autonomy, cognition, mind"], ["indigo", "Deep cognition, background"],
    ["blue", "Data, information, knowledge"], ["slate", "Neutral, infrastructure"],
  ];
  const cs = getComputedStyle(document.documentElement);
  const hex = (v) => cs.getPropertyValue(v).trim();
  mount.innerHTML = `
    <div class="lab-tag"><span class="status-dot violet"></span> PALETTE \u00b7 14 colors \u00d7 3 tiers \u2014 click a tier to copy its hex</div>
    <div class="swatch-grid" id="pal"></div>`;
  const grid = mount.querySelector("#pal");
  colors.forEach(([name, domain]) => {
    const glow = hex(`--hud-${name}`), matte = hex(`--hud-${name}-matte`), dim = hex(`--hud-${name}-dim`);
    const sw = h(`
      <div class="swatch">
        <div class="tiers">
          <div class="tier" data-hex="${glow}" style="background:${glow}" data-tip="glow \u00b7 ${glow} \u2014 active/firing states only"></div>
          <div class="tier" data-hex="${matte}" style="background:${matte}" data-tip="matte \u00b7 ${matte} \u2014 the everyday working tier"></div>
          <div class="tier" data-hex="${dim}" style="background:${dim}" data-tip="dim \u00b7 ${dim} \u2014 inactive / whisper"></div>
        </div>
        <div class="meta"><div class="name" style="color:${matte}">${name}</div><div class="domain">${domain}</div></div>
      </div>`);
    sw.querySelectorAll(".tier").forEach((t) => {
      clickable(t, () => { const v = t.dataset.hex; navigator.clipboard?.writeText(v); toast(`copied ${v}`); });
    });
    grid.appendChild(sw);
  });
};

/* ============================================================ IRON SIGHT 3 */
INTERACTIVES["ironsight-animation"] = (mount) => {
  let live = true;
  mount.innerHTML = `
    <div class="lab-tag"><span class="status-dot violet"></span> FEED TEST \u00b7 static means dead \u2014 sever the data and watch</div>
    <div class="living" id="anim-stage">
      <div class="arc-wrap">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="48" fill="none" stroke="var(--hud-surface-3)" stroke-width="8"/>
          <circle class="arc-ring" cx="60" cy="60" r="48" fill="none" stroke="var(--hud-cyan)" stroke-width="8"
            stroke-linecap="round" stroke-dasharray="226" stroke-dashoffset="70"
            style="transform-origin:center;animation:hud-ring-rotate 4s linear infinite;filter:drop-shadow(0 0 6px var(--hud-cyan))"/>
          <text x="60" y="66" text-anchor="middle" fill="var(--hud-text-bright)" font-family="var(--hud-font-mono)" font-size="18">69%</text>
        </svg>
        <div style="font-family:var(--hud-font-mono);font-size:10px;color:var(--hud-text-dim)">CORE LOAD</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px">
        <div style="display:flex;align-items:center;gap:10px"><span class="status-dot"></span><span class="mono" style="font-size:12px">CURATOR \u00b7 healthy \u00b7 3s pulse</span></div>
        <div style="display:flex;align-items:center;gap:10px"><span class="status-dot warn"></span><span class="mono" style="font-size:12px">HERALD \u00b7 warning \u00b7 2s pulse</span></div>
        <div style="display:flex;align-items:center;gap:10px"><span class="status-dot crit"></span><span class="mono" style="font-size:12px">INSTALLER \u00b7 critical \u00b7 1s pulse</span></div>
        <div class="alert-banner" style="max-width:320px"><div class="atitle" style="font-size:13px">\u26A0 INSTALLER OFFLINE</div><div class="mono" style="font-size:11px;margin-top:2px">Action: restart unit \u00b7 TTL 0:42</div></div>
      </div>
    </div>
    <div style="margin-top:var(--hud-sp-4);display:flex;align-items:center;gap:14px">
      <button class="btn" id="anim-toggle" data-tip="Cut or restore the data feed \u2014 a true instrument freezes and says so when data stops (Sin #5: Static Death)">Sever data feed</button>
      <span class="feed-state" id="anim-state" style="color:var(--hud-emerald)">\u25CF FEED: LIVE</span>
    </div>
    <p style="color:var(--hud-text-muted);font-size:13px;margin-top:var(--hud-sp-3)">Pulse rate is bound to health; ring rotation to activity; the alert breathes by severity. With the feed severed, a true instrument <em>freezes and says so</em> \u2014 it never keeps faking liveness (that's Sin #5, Static Death, and Sin #8, the Placebo Interface).</p>`;
  const stage = mount.querySelector("#anim-stage");
  const state = mount.querySelector("#anim-state");
  mount.querySelector("#anim-toggle").onclick = (e) => {
    live = !live;
    stage.classList.toggle("feed-off", !live);
    stage.style.opacity = live ? "1" : "0.45";
    state.textContent = live ? "\u25CF FEED: LIVE" : "\u25CB FEED LOST \u2014 motion frozen, state stale";
    state.style.color = live ? "var(--hud-emerald)" : "var(--hud-red)";
    e.target.textContent = live ? "Sever data feed" : "Restore feed";
  };
};

/* ============================================================ IRON SIGHT 4 */
INTERACTIVES["ironsight-sins"] = (mount) => {
  const sins = [
    ["Fuidgetry", "Meaningless animated elements that consume attention without information.", "Shimmer that never modulates with load, health, or mode.", "Pillar 2 thumb test."],
    ["The Stoic Guru", "Systems that wait to be asked instead of proactively informing.", "A dashboard showing nominal numbers while failure probability rises.", "Surface what matters before the operator asks."],
    ["Unlabeled Controls", "The most violated principle across 70+ surveyed films.", "Icon-only actions with no persistent meaning layer.", "Mandatory tooltip on every interactive element."],
    ["The Feedback Void", "Controls separated from their effects.", "Settings that require reload with no inline confirmation.", "Close the loop."],
    ["Static Death", "Indicators that do not pulse, breathe, or show aliveness.", "Status pills labeled healthy without a living pulse.", "Static means dead \u2014 animation encodes liveness."],
    ["Information Firehose", "Everything at once without hierarchy or density management.", "Review mode expanding every metric to full prominence.", "Density caps and progressive disclosure."],
    ["Decorative Emergency", "Crisis UIs that add ornament when they should strip to signal.", "Alert banners that bury the recommended action in elaboration.", "Crisis protocol \u2014 three colors, one font, strip the rest."],
    ["The Placebo Interface", "Displays that look functional but change no decisions.", "Panels showing telemetry that never gates a decision.", "If removing it changes nothing in a month, remove it."],
    ["Token Drift", "Multiple sources of truth diverging silently.", "An inline #c0c0d8 while the token file says #b8b8d0.", "Single-source import; parity is a build-time contract."],
    ["Orphan Animation", "Motion without mapped data.", "Core pulse at a fixed period regardless of health.", "Parameterize from live data."],
    ["Aposematic Confusion", "Danger colors for non-danger purposes.", "Routine crimson accents in non-critical chrome.", "Red/crimson reserved for error, critical, and safety."],
    ["Galaxy Brain Display", "3D where 2D would be faster and clearer.", "3D topology when a flat dependency graph says the same.", "Dimensionality serves function, not spectacle."],
  ];
  const sinHtml = sins.map((s, idx) => `
    <details class="sin">
      <summary><span class="num">${String(idx + 1).padStart(2, "0")}</span> ${s[0]} <span class="arrow">\u203a</span></summary>
      <div class="sin-body"><p style="margin:.3em 0">${s[1]}</p>
      <p style="margin:.3em 0"><strong>Risk:</strong> ${s[2]}</p>
      <p style="margin:.3em 0" class="mit"><strong>Mitigation:</strong> ${s[3]}</p></div>
    </details>`).join("");

  const checks = [
    { q: "Thumb occlusion: cover it \u2014 does the operator lose actionable info?", crit: true },
    { q: "Data disconnect: kill the feed \u2014 does it look the same?", crit: false, invert: true },
    { q: "Removal test: delete it \u2014 does the workflow improve?", crit: false, invert: true },
    { q: "Binding: is the animation tied to live data (not CSS constants)?", crit: false },
    { q: "Decision: can you name the specific decision it helps make?", crit: true },
    { q: "Mode: does it respond to at least two modes?", crit: true },
  ];
  mount.innerHTML = `
    <div class="lab-tag"><span class="status-dot violet"></span> CATALOG \u00b7 the 12 deadly sins</div>
    ${sinHtml}
    <h3 style="color:var(--accent);margin-top:var(--hud-sp-5)">Fuidgetry Detector</h3>
    <p style="color:var(--hud-text-muted);font-size:13px;margin-top:0">Run it on a sample element. Answer honestly \u2014 a "no" on questions 1, 5, or 6 condemns it.</p>
    <div class="cards" id="fd-cards"></div>
    <div id="fd-verdict" style="margin-top:var(--hud-sp-4)"></div>`;
  const wrap = mount.querySelector("#fd-cards");
  const ans = {};
  checks.forEach((c, idx) => {
    const row = h(`
      <div class="dcard"><div class="body"><div class="desc-t" style="font-size:13px">${c.q}</div></div>
      <button class="btn ghost" data-v="1" data-tip="Yes \u2014 this check holds for the element under review">Yes</button>
      <button class="btn ghost" data-v="0" data-tip="No \u2014 this check fails; a no on Q1, Q5, or Q6 condemns it as fuidgetry">No</button></div>`);
    row.querySelectorAll("button").forEach((b) => {
      b.onclick = () => {
        ans[idx] = b.dataset.v === "1";
        row.querySelectorAll("button").forEach((x) => x.classList.remove("active"));
        b.style.background = "var(--accent)"; b.style.color = "var(--hud-surface-0)";
        row.querySelectorAll("button").forEach((x) => { if (x !== b) { x.style.background = ""; x.style.color = ""; } });
        verdict();
      };
    });
    wrap.appendChild(row);
  });
  const out = mount.querySelector("#fd-verdict");
  function verdict() {
    if (Object.keys(ans).length < checks.length) { out.innerHTML = `<div style="font-family:var(--hud-font-mono);font-size:11px;color:var(--hud-text-dim)">ANSWERED ${Object.keys(ans).length}/${checks.length}</div>`; return; }
    // Fuidgetry if any of Q1/Q5/Q6 (indices 0,4,5) is "no".
    const condemned = [0, 4, 5].some((i) => ans[i] === false);
    // also flag the "same when feed killed" / "improves when removed" tells
    const tells = (ans[1] === true) || (ans[2] === true);
    out.innerHTML = condemned
      ? `<div class="verdict fail">\u2717 FUIDGETRY \u2014 a critical question failed. Redesign to bind data and intent, or remove it.</div>`
      : `<div class="verdict go">\u2713 PASSES \u2014 the element earns its pixels.${tells ? " (But note: looking identical with no feed, or improving the workflow when removed, are warning tells.)" : ""}</div>`;
  }
};

/* ============================================================ COMPASS 5 (capstone) */
INTERACTIVES["compass-walkthrough"] = (mount) => {
  const scenario = "Feature request: \u201cusers keep hammering the export endpoint and knocking the API over.\u201d";
  const phases = [
    { n: "RECON", prompt: "First move?", opts: [
      { t: "Read the system map + check the tracker for related work", ok: true, fb: "Right \u2014 map the terrain before defining anything. Found: an existing rate-limit util in the gateway." },
      { t: "Start coding a limiter", ok: false, fb: "Solutioning in RECON. You don't yet know what already exists \u2014 you'd duplicate the gateway util." },
    ] },
    { n: "FRAME", prompt: "State the problem.", opts: [
      { t: "\u201cExport has no per-user throttle, so one client can exhaust capacity.\u201d", ok: true, fb: "A problem, not a solution. Root cause named; integration surface = the API gateway." },
      { t: "\u201cWe need a Redis token-bucket service.\u201d", ok: false, fb: "That's a solution. FRAME defines what's wrong and why, not what to build." },
    ] },
    { n: "TARGET", prompt: "Pick the end-state.", opts: [
      { t: "Abusive clients are throttled; honest traffic is unaffected", ok: true, fb: "An outcome, not an implementation. Deeply integrated with the existing gateway." },
      { t: "A new microservice on port 9300", ok: false, fb: "That's route, not destination \u2014 and it smells of a silo. TARGET describes the outcome." },
    ] },
    { n: "APPROACH", prompt: "Choose the architecture.", opts: [
      { t: "Extend the gateway's existing limiter util with a per-user bucket", ok: true, fb: "Reuses proven code; lowest silo risk and effort. Recommended." },
      { t: "Stand up a brand-new distributed limiter", ok: false, fb: "Higher effort + silo risk for the same outcome. The Silo-check lens rejects it." },
    ] },
    { n: "DRAFT", prompt: "What does the design doc need?", opts: [
      { t: "Data model, API contract, file inventory, issue breakdown \u2014 saved to plans/", ok: true, fb: "The full spec, persisted as a decision record." },
      { t: "A one-line Slack message", ok: false, fb: "Not durable, not reviewable. DRAFT is the artifact that outlives the conversation." },
    ] },
    { n: "STRESS", prompt: "Apply a lens.", opts: [
      { t: "Scale + Failure modes: what at 100\u00d7? how is a stuck bucket detected?", ok: true, fb: "Adversarial review surfaces the monitoring gap \u2014 fixed inline before build." },
      { t: "Skip it; the design looks fine", ok: false, fb: "Skipping STRESS is how silent failures ship. Break it before you build it." },
    ] },
    { n: "FINAL", prompt: "Ready to build?", opts: [
      { t: "Epic + ordered child issues, then hand off to DOCTRINE", ok: true, fb: "FINAL feeds implementation. The plan is now a build queue." },
      { t: "Merge straight to main", ok: false, fb: "No implementation has happened yet \u2014 FINAL produces the plan, not the code." },
    ] },
  ];
  let i = 0, correct = 0;
  mount.innerHTML = `
    <div class="lab-tag"><span class="status-dot"></span> WALKTHROUGH \u00b7 run COMPASS end to end</div>
    <div class="callout" style="margin-top:0">${scenario}</div>
    <div class="stepper-track" id="cw-track"></div>
    <div id="cw-body" style="min-height:150px"></div>`;
  const track = mount.querySelector("#cw-track");
  phases.forEach((p, idx) => track.appendChild(h(`<div class="node">${idx + 1}\u00b7${p.n}</div>`)));
  const body = mount.querySelector("#cw-body");
  function render() {
    [...track.children].forEach((n, idx) => { n.classList.toggle("active", idx === i); n.classList.toggle("done", idx < i); });
    if (i >= phases.length) {
      body.innerHTML = `<div class="verdict go">\u2713 Plan complete \u2014 ${correct}/${phases.length} phase calls correct. RECON\u2192FINAL produced a reviewed, integration-first design ready for DOCTRINE.</div>`;
      return;
    }
    const p = phases[i];
    body.innerHTML = `<h3 style="font-family:var(--hud-font-display);letter-spacing:1px;color:var(--accent)">${p.n}</h3>
      <p>${p.prompt}</p><div class="cards" id="cw-opts"></div><div class="hint" id="cw-fb" style="min-height:1.4em;margin-top:8px"></div>`;
    const opts = body.querySelector("#cw-opts");
    p.opts.forEach((o) => {
      const card = h(`<button class="dcard" style="text-align:left;cursor:pointer;width:100%"><span class="desc-t" style="font-size:14px">${o.t}</span></button>`);
      card.setAttribute("data-tip", `Make this call for ${p.n} \u2014 the protocol will react`);
      card.onclick = () => {
        const fb = body.querySelector("#cw-fb");
        fb.style.color = o.ok ? "var(--hud-emerald)" : "var(--hud-red)";
        fb.textContent = `${o.ok ? "\u2713" : "\u2717"} ${o.fb}`;
        if (o.ok) { correct++; setTimeout(() => { i++; render(); }, 900); }
      };
      opts.appendChild(card);
    });
  }
  render();
};

/* ============================================================ DOCTRINE 5 (capstone) */
INTERACTIVES["doctrine-deploy"] = (mount) => {
  mount.innerHTML = `
    <div class="lab-tag"><span class="status-dot"></span> SHIP SIM \u00b7 a hotfix is needed in production</div>
    <p style="margin-top:0;color:var(--hud-text-muted)">The export endpoint is 500ing in prod. How do you ship the fix?</p>
    <div class="cards" id="dd-opts">
      <button class="dcard" data-path="repo" data-tip="Ship the fix through version control" style="cursor:pointer;text-align:left"><span class="desc-t">Edit in the repo \u2192 gate \u2192 commit \u2192 push \u2192 deploy from pushed code</span></button>
      <button class="dcard" data-path="ssh" data-tip="Patch the live server directly \u2014 see what it costs" style="cursor:pointer;text-align:left"><span class="desc-t">SSH into prod and hot-patch the file in place</span></button>
      <button class="dcard" data-path="rsync" data-tip="Copy the file straight to prod \u2014 see what it costs" style="cursor:pointer;text-align:left"><span class="desc-t">rsync the corrected file straight onto the server</span></button>
    </div>
    <div id="dd-out" style="margin-top:var(--hud-sp-4)"></div>`;
  const out = mount.querySelector("#dd-out");
  const results = {
    repo: { ok: true, steps: ["edit in repo", "lint + tests pass", "commit (atomic)", "push to dev", "deploy pulls pushed code"], msg: "Reproducible. The deployed tree still matches a clean checkout \u2014 and the next engineer (or container) gets the same fix automatically." },
    ssh: { ok: false, drift: "prod is now 1 file ahead of the repo", msg: "Drift. The fix exists nowhere in git; the next deploy silently reverts it, and no other environment has it. This is the precise desync DOCTRINE refuses to carry." },
    rsync: { ok: false, drift: "prod binary differs from origin/main", msg: "Same trap as hot-patching \u2014 out-of-band mutation. If it isn't committed, pushed, and pulled by the deploy mechanism, it didn't happen." },
  };
  mount.querySelectorAll("#dd-opts .dcard").forEach((b) => {
    b.onclick = () => {
      mount.querySelectorAll("#dd-opts .dcard").forEach((x) => x.classList.remove("correct", "wrong"));
      const r = results[b.dataset.path];
      b.classList.add(r.ok ? "correct" : "wrong");
      out.innerHTML = r.ok
        ? `<div class="verdict go">\u2713 SHIPPED THROUGH THE REPO<div style="margin-top:6px;font-size:12px">${r.steps.map((s) => `<span class="tag output" style="margin-bottom:4px">${s}</span>`).join("")}</div><p style="margin:.4em 0 0;color:var(--hud-text-muted)">${r.msg}</p></div>`
        : `<div class="alert-banner"><div class="atitle">\u26A0 OUT-OF-BAND CHANGE \u2014 ${r.drift}</div><p style="margin:.3em 0 0;font-size:13px;color:var(--hud-text-muted)">${r.msg}</p></div>`;
    };
  });
};

/* ============================================================ IRON SIGHT 5 (capstone) */
INTERACTIVES["ironsight-report"] = (mount) => {
  const axes = [
    { k: "sci", label: "Sci \u00b7 Believability", tip: "Does it feel like a command center? 0 = looks like a blog, 4 = every element feels engineered." },
    { k: "fi", label: "Fi \u00b7 Narrative", tip: "Does it tell the system's story? 0 = anonymous dashboard, 4 = personality + capability visible." },
    { k: "if", label: "Interfaces \u00b7 Usability", tip: "Does it equip the operator? 0 = data without context, 4 = every display enables a decision." },
  ];
  const val = { sci: 2, fi: 2, if: 2 };
  mount.innerHTML = `
    <div class="lab-tag"><span class="status-dot violet"></span> REPORT CARD \u00b7 three-axis self-assessment</div>
    <div id="rc-axes" style="display:flex;flex-direction:column;gap:var(--hud-sp-4)"></div>
    <div id="rc-out" style="margin-top:var(--hud-sp-5)"></div>`;
  const wrap = mount.querySelector("#rc-axes");
  axes.forEach((a) => {
    const row = h(`
      <div>
        <div style="display:flex;justify-content:space-between;font-family:var(--hud-font-mono);font-size:12px;color:var(--hud-text-muted)">
          <span data-tip="${a.tip}" style="cursor:help;border-bottom:1px dotted var(--hud-text-dim)">${a.label}</span>
          <span id="rc-${a.k}-v" style="color:var(--accent)">2</span>
        </div>
        <input type="range" min="0" max="4" step="1" value="2" id="rc-${a.k}" aria-label="${a.label}, 0 to 4" style="width:100%;accent-color:var(--hud-violet)" data-tip="${a.tip}">
      </div>`);
    row.querySelector("input").addEventListener("input", (e) => {
      val[a.k] = +e.target.value;
      mount.querySelector(`#rc-${a.k}-v`).textContent = e.target.value;
      render();
    });
    wrap.appendChild(row);
  });
  const out = mount.querySelector("#rc-out");
  function render() {
    const total = val.sci + val.fi + val.if;
    const pct = Math.round((total / 12) * 100);
    let band, cls;
    if (total >= 10) { band = "BLOCKBUSTER \u2014 ship it"; cls = "go"; }
    else if (total >= 7) { band = "MUST-SEE \u2014 strong; close gaps on the weakest axis"; cls = "go"; }
    else if (total >= 4) { band = "MATINEE \u2014 functional but uninspired; redesign pass needed"; cls = "skip"; }
    else { band = "DRECK \u2014 restart from intent, not CSS"; cls = "fail"; }
    const zeroIf = val.if === 0 && (val.sci > 0 || val.fi > 0);
    out.innerHTML = `
      <div style="font-family:var(--hud-font-mono);font-size:11px;color:var(--hud-text-dim);margin-bottom:6px">TOTAL ${total}/12</div>
      <div class="meter"><span style="width:${pct}%"></span></div>
      <div class="verdict ${cls}" style="margin-top:var(--hud-sp-4)">${band}</div>
      ${zeroIf ? `<div class="callout warn">A zero on Interfaces can't be redeemed by Sci or Fi \u2014 the operator still loses. Usability is non-negotiable.</div>` : ""}`;
  }
  render();
};

