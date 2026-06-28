# Agentic Engineering — Academy

An educational, visual-first, interactive single-page app that teaches the three protocols
of this repository: **COMPASS** (planning), **DOCTRINE** (building), and **IRON SIGHT**
(design). Each protocol is a *pillar* with five chapters, and every chapter pairs a live
interactable with **key takeaways**, a **knowledge check**, and **cross-links** to related
chapters. Passing a check marks the chapter *mastered* — tracked per chapter in the sidebar
and as a progress meter on each hub card (persisted in `localStorage`). Key domain terms in
the prose carry hover definitions from a shared glossary.

The app is itself an **IRON SIGHT surface** — it eats its own dog food: glass panels, the
14-color token palette, the three-font system, living data-bound animation, scanline
chrome, HUD corner brackets, and a tooltip on every interactive control.

## Run it

No build step, no dependencies. **Just open `webapp/index.html`** in any browser — it
works directly from the `file://` protocol (the scripts load as ordered classic scripts,
not ES modules, so there's no CORS restriction).

Prefer a local server? Any static server works too:

```bash
cd webapp
python3 -m http.server 8080
# open http://localhost:8080
```

## What's inside

| Pillar | Chapters (each with an interactable) |
|--------|--------------------------------------|
| **COMPASS** | Trigger decision \u00b7 7-phase stepper \u00b7 STRESS lens explorer \u00b7 plan-file builder \u00b7 **end-to-end walkthrough** |
| **DOCTRINE** | Animated core loop \u00b7 atomic-commit classifier \u00b7 pre-commit gate runner \u00b7 issue lifecycle \u00b7 **deploy/ship simulator** |
| **IRON SIGHT** | Five-pillars + violation tests \u00b7 live color palette \u00b7 feed-test (static-means-dead) \u00b7 12 sins + Fuidgetry Detector \u00b7 **three-axis report card** |

See [`CHANGELOG.md`](CHANGELOG.md) for the full 25-point-per-series improvement log.

## Layout

```
webapp/
├── index.html              # shell + Google Fonts + module entry
├── css/
│   ├── tokens.css          # IRON SIGHT token source of truth (verbatim values)
│   └── app.css             # components: glass, brackets, nav, tooltips, interactives
└── js/
    ├── content.js          # curriculum data (pillars → chapters → prose, takeaways, checks, links) + glossary
    ├── interactives.js      # the 15 interactive widget builders
    └── app.js              # hash router, hub, rendering, progress tracking, glossary wiring
```

## Extending

- **Add a chapter:** append to a pillar's `chapters[]` in `content.js`, give it an
  `interactive` id, register a builder of that id in `interactives.js`, and add a matching
  entry to that pillar's `EXTRAS[]` array (`takeaways`, `check`, `related`) by index.
- **Add a glossary term:** add it to `GLOSSARY` in `content.js`; the first prose occurrence
  is auto-linked with a hover definition (case-insensitive, skips code/links/interactives).
- **Add a token:** add it to `css/tokens.css` only — never hardcode a value in `app.css`
  or a widget (Anti-pattern #9: Token Drift).
