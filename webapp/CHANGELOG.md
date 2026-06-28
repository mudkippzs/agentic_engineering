# Academy Changelog

## Educational pass — 25 improvements per series

Each of the three series received the same 25-point upgrade. The shared learning
mechanics (takeaways, knowledge checks, cross-links, progress, glossary, a11y) were
implemented once and applied to every chapter; the *content* of each point — the new
capstone chapter, its interactive, the per-chapter questions, takeaways, cross-links,
and glossary terms — is bespoke to each series.

Implementation lives in `js/content.js` (curriculum + extras + glossary),
`js/interactives.js` (capstone widgets), `js/app.js` (rendering + progress + glossary),
and `css/app.css` (new component styles).

### COMPASS — "How we plan"

1–5. **Key Takeaways** card on chapters 1–5 (2–3 distilled points each).
6–10. **Knowledge Check** on chapters 1–5 — one question + explanation, marks mastery.
11–15. **Go Deeper** cross-links on chapters 1–5 (e.g. RECON → DOCTRINE loop, STRESS → the 12 Sins).
16. **New capstone chapter 5 — "COMPASS in Miniature"**: one feature run end to end.
17. **New interactive `compass-walkthrough`**: a 7-phase guided decision (RECON→FINAL) with right/wrong calls and live feedback.
18. **Sidebar mastery ticks** (`·` visited, `✓` mastered) for the COMPASS chapter list.
19. **Hub progress meter** on the COMPASS card ("n/5 mastered").
20. **Domain glossary terms** — RECON, FRAME, STRESS, plan file — with hover definitions.
21. **Glossary tooltips** woven into the first prose occurrence of each term.
22. **Persistent progress** across reloads (localStorage).
23. **Accessible check feedback** via `aria-live` status region.
24. **Keyboard operability** — checks, cross-links, and focus rings.
25. **Touch-target + reduced-motion compliance** for the new controls.

### DOCTRINE — "How we build"

1–5. **Key Takeaways** card on chapters 1–5.
6–10. **Knowledge Check** on chapters 1–5 (atomicity, gate-failure handling, push completeness, issue lifecycle, deploy hygiene).
11–15. **Go Deeper** cross-links on chapters 1–5 (e.g. Gates → IRON SIGHT color tokens).
16. **New capstone chapter 5 — "Conflicts & Deploy Hygiene"**: ship-through-the-repo.
17. **New interactive `doctrine-deploy`**: a hotfix ship-simulator (repo path vs. SSH hot-patch vs. rsync) with drift consequences.
18. **Sidebar mastery ticks** for the DOCTRINE chapter list.
19. **Hub progress meter** on the DOCTRINE card.
20. **Domain glossary terms** — atomic commit, issue-first, pre-commit gates — with hover definitions.
21. **Glossary tooltips** woven into prose.
22. **Persistent progress** across reloads.
23. **Accessible check feedback** via `aria-live`.
24. **Keyboard operability** + focus rings.
25. **Touch-target + reduced-motion compliance** for the new controls.

### IRON SIGHT — "How it looks and behaves"

1–5. **Key Takeaways** card on chapters 1–5.
6–10. **Knowledge Check** on chapters 1–5 (thumb-occlusion → Intentful, token source, static death, aposematic colour, three-axis verdict).
11–15. **Go Deeper** cross-links on chapters 1–5.
16. **New capstone chapter 5 — "The Report Card"**: the three-axis scoring model.
17. **New interactive `ironsight-report`**: Sci × Fi × Interfaces sliders → 0–12 score, band verdict (BLOCKBUSTER → DRECK), and the "zero-Interfaces still loses" rule.
18. **Sidebar mastery ticks** for the IRON SIGHT chapter list.
19. **Hub progress meter** on the IRON SIGHT card.
20. **Domain glossary terms** — fuidgetry, glass panel, dead glass, escalation, the Director, token — with hover definitions.
21. **Glossary tooltips** woven into prose.
22. **Persistent progress** across reloads.
23. **Accessible check feedback** via `aria-live`.
24. **Keyboard operability** + focus rings.
25. **Touch-target + reduced-motion compliance** for the new controls.
