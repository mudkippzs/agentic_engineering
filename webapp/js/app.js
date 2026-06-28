import { PILLARS, PILLAR_BY_ID, GLOSSARY } from "./content.js";
import { INTERACTIVES } from "./interactives.js";

const root = document.getElementById("view");
const topnav = document.getElementById("topnav");

/* ---- progress (localStorage; "visited" on open, "done" on a correct knowledge check) ---- */
const PKEY = "ae-progress-v1";
function loadProg() { try { return JSON.parse(localStorage.getItem(PKEY)) || {}; } catch { return {}; } }
function saveProg(p) { try { localStorage.setItem(PKEY, JSON.stringify(p)); } catch { /* private mode */ } }
let progress = loadProg();
const keyFor = (pid, i) => `${pid}/${i}`;
function markState(pid, i, state) {
  const k = keyFor(pid, i);
  // never downgrade done -> visited
  if (progress[k] === "done" && state === "visited") return;
  if (progress[k] === state) return;
  progress[k] = state;
  saveProg(progress);
}
function pillarDone(pid) {
  const p = PILLAR_BY_ID[pid];
  return p.chapters.reduce((n, _c, i) => n + (progress[keyFor(pid, i)] === "done" ? 1 : 0), 0);
}

// Dotted brand voice for page-content surfaces (e.g. "COMPASS" -> "C.O.M.P.A.S.S",
// "IRON SIGHT" -> "I.R.O.N S.I.G.H.T"). Dense status surfaces stay compact/undotted.
const dotted = (name) => name.split(" ").map((w) => w.split("").join(".")).join(" ");

/* ---- top nav ---- */
PILLARS.forEach((p) => {
  const pill = document.createElement("button");
  pill.className = "nav-pill";
  pill.textContent = p.name;
  pill.style.setProperty("--accent", p.accent);
  pill.dataset.pillar = p.id;
  pill.setAttribute("data-tip", p.expansion);
  pill.onclick = () => (location.hash = `#/${p.id}/0`);
  topnav.appendChild(pill);
});
const brandEl = document.getElementById("brand");
brandEl.onclick = () => (location.hash = "#/hub");
brandEl.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); location.hash = "#/hub"; } };

function setActiveNav(pillarId) {
  [...topnav.children].forEach((c) => c.classList.toggle("active", c.dataset.pillar === pillarId));
}

// Current pillar/chapter context for keyboard navigation.
let current = null;

/* ---- hub ---- */
function renderHub() {
  current = null;
  setActiveNav(null);
  root.innerHTML = `
    <section class="hero">
      <div class="kicker">A methodology for building with AI agents</div>
      <h1>AGENTIC ENGINEERING</h1>
      <p>Three protocols, one discipline. Learn how to <strong>plan</strong>, <strong>build</strong>,
      and <strong>design</strong> systems that read like a command center \u2014 by exploring,
      not just reading. This academy is itself an IRON SIGHT surface.</p>
    </section>
    <div class="pillars" id="hub-pillars"></div>
    <p style="text-align:center;color:var(--hud-text-dim);font-family:var(--hud-font-mono);font-size:11px;margin-top:var(--hud-sp-6)">
      Pick a pillar \u00b7 each has ${PILLARS[0].chapters.length} chapters with live interactables</p>`;
  const wrap = root.querySelector("#hub-pillars");
  PILLARS.forEach((p) => {
    const card = document.createElement("div");
    card.className = "glass-panel hud-bracket pillar-card";
    card.style.setProperty("--accent", p.accent);
    const done = pillarDone(p.id);
    const total = p.chapters.length;
    const pct = Math.round((done / total) * 100);
    card.innerHTML = `
      <div class="panel-body">
        <h3><span class="glyph">${p.glyph}</span><span>${dotted(p.name)}</span></h3>
        <div class="expand">${p.expansion}</div>
        <p class="desc">${p.tagline}</p>
        <div class="card-progress" data-tip="Chapters with a passed knowledge check">
          <div class="meter"><span style="width:${pct}%"></span></div>
          <span class="pl">${done}/${total} mastered</span>
        </div>
        <div class="ch-count">${total} CHAPTERS \u00b7 ${total} INTERACTABLES \u203a</div>
      </div>`;
    card.setAttribute("role", "button");
    card.tabIndex = 0;
    card.setAttribute("data-tip", `${p.tagline} ${total} chapters, ${done} mastered \u2014 Enter to begin.`);
    const open = () => (location.hash = `#/${p.id}/0`);
    card.onclick = open;
    card.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } };
    wrap.appendChild(card);
  });
}

/* ---- learning section builders ---- */
function takeawaysHTML(ch) {
  if (!ch.takeaways || !ch.takeaways.length) return "";
  return `
    <section class="learn takeaways" aria-label="Key takeaways">
      <div class="learn-head"><span class="ico">\u25C9</span> KEY TAKEAWAYS</div>
      <ul>${ch.takeaways.map((t) => `<li>${t}</li>`).join("")}</ul>
    </section>`;
}
function relatedHTML(ch) {
  if (!ch.related || !ch.related.length) return "";
  return `
    <section class="learn related" aria-label="Related chapters">
      <div class="learn-head"><span class="ico">\u2192</span> GO DEEPER</div>
      <div class="rel-links">${ch.related.map((r) => `<a class="rel-chip" href="${r.hash}" data-tip="Jump to ${r.label}">${r.label}</a>`).join("")}</div>
    </section>`;
}

// Render an interactive single-question knowledge check into `host`.
function mountCheck(host, pillarId, idx, ch) {
  const c = ch.check;
  if (!c) return;
  const already = progress[keyFor(pillarId, idx)] === "done";
  host.innerHTML = `
    <section class="learn kcheck${already ? " passed" : ""}" aria-label="Knowledge check">
      <div class="learn-head"><span class="ico">?</span> KNOWLEDGE CHECK${already ? ' <span class="passed-tag">\u2713 PASSED</span>' : ""}</div>
      <p class="kq">${c.q}</p>
      <div class="kopts"></div>
      <div class="kfb" role="status" aria-live="polite"></div>
    </section>`;
  const opts = host.querySelector(".kopts");
  const fb = host.querySelector(".kfb");
  let answered = false;
  c.options.forEach((opt, oi) => {
    const b = document.createElement("button");
    b.className = "kopt";
    b.type = "button";
    b.textContent = opt;
    b.setAttribute("data-tip", "Select your answer");
    b.onclick = () => {
      if (answered) return;
      answered = true;
      const correct = oi === c.answer;
      [...opts.children].forEach((x, xi) => {
        x.disabled = true;
        if (xi === c.answer) x.classList.add("right");
        else if (xi === oi) x.classList.add("wrong");
      });
      fb.className = "kfb show " + (correct ? "ok" : "no");
      fb.textContent = `${correct ? "\u2713 Correct. " : "\u2717 Not quite. "}${c.explain}`;
      if (correct) {
        markState(pillarId, idx, "done");
        const tick = document.querySelector(`#ch-list [data-ch="${idx}"] .tick`);
        if (tick) { tick.textContent = "\u2713"; tick.className = "tick done"; }
        host.querySelector(".kcheck").classList.add("passed");
      }
    };
    opts.appendChild(b);
  });
}

// Wrap the first occurrence of each glossary term inside the prose with a hover definition.
function applyGlossary(scope) {
  const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
  const used = new Set();
  const skip = new Set(["CODE", "ABBR", "A", "BUTTON", "INPUT", "SCRIPT", "STYLE", "H1"]);
  for (const term of terms) {
    const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (used.has(term)) return NodeFilter.FILTER_REJECT;
        let el = node.parentElement;
        while (el && el !== scope) {
          if (skip.has(el.tagName)) return NodeFilter.FILTER_REJECT;
          if (el.id === "mount" || el.classList.contains("learn") || el.classList.contains("chapter-foot"))
            return NodeFilter.FILTER_REJECT;
          el = el.parentElement;
        }
        return re.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    });
    const node = walker.nextNode();
    if (!node) continue;
    const m = re.exec(node.nodeValue);
    const after = node.splitText(m.index);
    after.nodeValue = after.nodeValue.slice(term.length);
    const ab = document.createElement("abbr");
    ab.className = "gloss";
    ab.setAttribute("data-tip", GLOSSARY[term]);
    ab.textContent = m[0];
    after.parentNode.insertBefore(ab, after);
    used.add(term);
  }
}

/* ---- pillar + chapter ---- */
function renderPillar(pillarId, chapterIdx) {
  const pillar = PILLAR_BY_ID[pillarId];
  if (!pillar) return renderHub();
  const idx = Math.max(0, Math.min(chapterIdx, pillar.chapters.length - 1));
  const ch = pillar.chapters[idx];
  current = { pillarId, idx, len: pillar.chapters.length };
  setActiveNav(pillarId);
  document.documentElement.style.setProperty("--accent", pillar.accent);

  root.innerHTML = `
    <div class="layout" style="--accent:${pillar.accent}">
      <aside class="sidebar glass-panel hud-bracket">
        <div class="chrome-bar"><span class="bar"></span><span class="codename">${pillar.name}</span>
          <span class="status"><span class="status-dot"></span>ACTIVE</span></div>
        <ul class="chapter-list" id="ch-list"></ul>
      </aside>
      <main class="glass-panel hud-bracket">
        <div class="chrome-bar"><span class="bar"></span><span class="codename">${pillar.name}</span>
          <span class="title">// ${ch.title}</span>
          <span class="status"><span class="status-dot"></span>CH ${idx + 1}/${pillar.chapters.length}</span></div>
        <div class="panel-body content">
          <div class="eyebrow">${ch.eyebrow}</div>
          <h1>${ch.title}</h1>
          ${ch.html}
          <div class="interactive" id="mount"></div>
          ${takeawaysHTML(ch)}
          <div id="kcheck"></div>
          ${relatedHTML(ch)}
          <div class="chapter-foot">
            <button class="btn ghost" id="ch-prev" data-tip="${idx > 0 ? "Go to: " + pillar.chapters[idx - 1].title : "Return to the pillar hub"} \u00b7 shortcut \u2190">\u2039 ${idx > 0 ? pillar.chapters[idx - 1].title : "Hub"}</button>
            <button class="btn" id="ch-next" data-tip="${idx < pillar.chapters.length - 1 ? "Go to: " + pillar.chapters[idx + 1].title : "Return to the pillar hub"} \u00b7 shortcut \u2192">${idx < pillar.chapters.length - 1 ? pillar.chapters[idx + 1].title : "Back to hub"} \u203a</button>
          </div>
        </div>
      </main>
    </div>`;

  markState(pillarId, idx, "visited");

  const list = root.querySelector("#ch-list");
  pillar.chapters.forEach((c, j) => {
    const b = document.createElement("button");
    b.className = j === idx ? "active" : "";
    b.dataset.ch = j;
    b.style.setProperty("--accent", pillar.accent);
    const st = progress[keyFor(pillarId, j)];
    const tickCls = st === "done" ? "tick done" : st === "visited" ? "tick seen" : "tick";
    const tickGlyph = st === "done" ? "\u2713" : st === "visited" ? "\u00b7" : "";
    b.innerHTML = `<span class="idx">${String(j + 1).padStart(2, "0")}</span> ${c.title}<span class="${tickCls}">${tickGlyph}</span>`;
    const stLabel = st === "done" ? " (mastered)" : st === "visited" ? " (visited)" : "";
    b.setAttribute("data-tip", `${c.eyebrow} \u2014 ${c.title}${stLabel}`);
    b.onclick = () => (location.hash = `#/${pillarId}/${j}`);
    list.appendChild(b);
  });

  root.querySelector("#ch-prev").onclick = () =>
    (location.hash = idx > 0 ? `#/${pillarId}/${idx - 1}` : "#/hub");
  root.querySelector("#ch-next").onclick = () =>
    (location.hash = idx < pillar.chapters.length - 1 ? `#/${pillarId}/${idx + 1}` : "#/hub");

  const mount = root.querySelector("#mount");
  const builder = INTERACTIVES[ch.interactive];
  if (builder) {
    try { builder(mount, { accent: pillar.accent }); }
    catch (e) { mount.innerHTML = `<div class="verdict skip">interactive failed to load: ${e.message}</div>`; console.error(e); }
  } else {
    mount.innerHTML = `<div class="lab-tag">interactive "${ch.interactive}" not found</div>`;
  }

  mountCheck(root.querySelector("#kcheck"), pillarId, idx, ch);
  applyGlossary(root.querySelector(".content"));

  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/* ---- router ---- */
function route() {
  const parts = (location.hash || "#/hub").replace(/^#\//, "").split("/");
  if (parts[0] === "hub" || !parts[0]) return renderHub();
  renderPillar(parts[0], parseInt(parts[1] || "0", 10));
}
window.addEventListener("hashchange", route);

// Keyboard chapter navigation (\u2190 / \u2192), ignored while typing in a field.
window.addEventListener("keydown", (e) => {
  if (!current) return;
  const tag = (e.target.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return;
  if (e.key === "ArrowRight") location.hash = current.idx < current.len - 1 ? `#/${current.pillarId}/${current.idx + 1}` : "#/hub";
  else if (e.key === "ArrowLeft") location.hash = current.idx > 0 ? `#/${current.pillarId}/${current.idx - 1}` : "#/hub";
});

route();
