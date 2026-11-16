# CS LOGOS Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Move the site to a single data file + JS templates, fix every audit issue, add search/filter, color swatches, before/after comparator, prev/next, quiz, 404 and 8 new teams.

**Architecture:** `js/teams.js` defines `window.TEAMS`; `js/common.js` renders shared chrome and helpers; page scripts (`home.js`, `team.js`, `quiz.js`) render into static HTML shells. No build step; works on GitHub Pages and from `file://`.

**Tech Stack:** HTML, CSS, vanilla JS (ES2017, no modules so `file://` works), Pillow for image conversion, Playwright for smoke tests.

**Spec:** `docs/superpowers/specs/2026-11-16-cslogos-redesign-design.md`

## Global Constraints
- Site language: pt-BR. Keep existing visual identity (tokens in `css/style.css :root`).
- All asset paths in `teams.js` are relative to the site root (e.g. `assets/navi-2009.webp`); all pages live at the root.
- Logos: WebP, longest side ≤ 640 px.
- Every `<img>` has a non-empty `alt`, `width`, `height`, `loading="lazy"` (except above-the-fold hero).
- Text contrast ≥ 4.5:1 against `--bg` / `--bg-panel`.
- Personal remarks go in `logo.opinion`, rendered under the label "Opinião do autor".
- `localStorage` access always wrapped in try/catch.

## Review Focus
- Unknown or missing `?t=` slug → "Time não encontrado" message + link home, no JS error.
- Team with a single logo → no comparator rendered, no error.
- Search with accents/case ("fúria", "NAVI", "vp") → matches by normalized name, fullName and aliases; no results → empty-state message.
- Quiz when fewer than 4 teams match a filter / images fail → still 4 distinct options; broken image shows alt text without breaking flow.
- Old URLs `pages/<slug>.html` → land on `team.html?t=<slug>`.

---

### Task 1: Data + shared chrome + team page
**Files:** Create `js/teams.js`, `js/common.js`, `team.html`, `js/team.js`; replace `pages/*.html` with redirects; Test `tests/smoke.js`.
**Interfaces (Produces):**
- `window.TEAMS: Team[]` with `{slug, name, fullName, aliases?:string[], founded:number, country, region:'Europa'|'CEI'|'Brasil'|'América do Norte', colors:{name,hex}[], history, logoDesign, logos:{years, src, w, h, alt, caption, opinion?, invert?:boolean}[]}`; logos ordered oldest → newest.
- `CS.renderChrome(active: 'home'|'teams'|'quiz'|null)`, `CS.esc(str)`, `CS.corners()` → corner spans HTML, `CS.logoImg(logo, cls?)` → `<img>` HTML, `CS.findTeam(slug)`, `CS.norm(str)` (lowercase, strip accents).
- [ ] Write `tests/smoke.js` (Playwright): for every slug, open `team.html?t=slug`, assert h1 == team.fullName or name, no console errors, every img `naturalWidth > 0`, `document.title` contains team name; `team.html?t=xyz` shows "Time não encontrado"; each `pages/<slug>.html` ends at `team.html?t=<slug>`.
- [ ] Run → FAIL. Implement. Run → PASS. Commit.

### Task 2: CSS cleanup + home grid with search/filter
**Files:** Modify `index.html`, `css/style.css`; Create `js/home.js`; extend `tests/smoke.js`.
- [ ] Tests: home renders `TEAMS.length` cards; typing "navi" leaves 1 card; "zzz" shows `.empty-state`; chip "Brasil" shows only Brasil teams; favicon resolves.
- [ ] Implement (fix favicon, stray `</a>`, OG/meta, `.logo--invert`, hover border `--gold-dim`, corners/underline, hero sweep span, `--text-faint` → contrast-safe, mobile timeline). PASS. Commit.

### Task 3: Images
- [ ] Script (scratchpad) converts `assets/*` → `<slug>-<year>.webp` ≤ 640 px; delete originals except `cs2.png` (favicon, resized to 192 px PNG). Smoke tests still PASS. Commit with before/after size.

### Task 4: Team-page features
- [ ] Tests: swatches count == colors.length and click copies hex (mock clipboard); comparator present iff logos ≥ 2, range input changes clip width; prev/next links wrap around.
- [ ] Implement. PASS. Commit.

### Task 5: Quiz + 404
**Files:** `quiz.html`, `js/quiz.js`, `404.html`.
- [ ] Tests: 4 distinct options per round, exactly one correct; after 10 answers shows score `/10` and "Jogar de novo".
- [ ] Implement. PASS. Commit.

### Task 6: Content — corrections + 8 new teams
- [ ] Research facts (SK, MIBR, Fnatic, NAVI dates; new teams). Fetch logos (needs network approval) or use placeholder `assets/placeholder.svg` with `placeholder: true`. Smoke PASS. Commit.

### Task 7: README, review, push
- [ ] README; screenshots desktop/mobile review; `superpowers:requesting-code-review`; push branch.
