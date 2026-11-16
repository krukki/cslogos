# CS LOGOS v3 "Cápsula de Stickers" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Redesign the whole site in the approved sticker style (light/dark), improve mobile usability, add titles per team and 10 new teams.

**Architecture:** Same as v2: `js/teams.js` data + `js/common.js` helpers + page scripts render into static HTML shells. New `js/theme.js` runs in `<head>` (no flash) and owns the theme toggle. CSS fully rewritten around tokens on `:root` / `[data-theme="dark"]`.

**Tech Stack:** HTML, CSS, vanilla JS (no modules), Google Fonts (Bricolage Grotesque, Inter), Pillow, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-16-cslogos-stickers-design.md`

## Global Constraints
- pt-BR copy. No build step; works from `file://` and GitHub Pages `/cslogos/`.
- Base font 17px; every interactive element ≥ 48×48 px on mobile; AA contrast in both themes.
- Theme: `localStorage['cslogos.theme']` ∈ {'light','dark'}; absent → follow `prefers-color-scheme`. Storage wrapped in try/catch.
- Regions: `Europa`, `Leste Europeu`, `Brasil`, `Américas`, `Ásia`.
- `opinion` field removed from data and UI.
- `titles: {year:number, name:string, major?:boolean}[]`, newest first, 3–8 per team.
- `prefers-reduced-motion`: no tilt, no transforms on hover, no animated holo.

## Review Focus
- Theme toggled then page reloaded → keeps chosen theme, no flash of the other theme.
- Black logos (FURIA, MIBR wordmark…) inside sticker circles readable in both themes.
- Bottom nav never covers the last content (body padding-bottom ≥ nav height + safe area).
- Team with no titles → section hidden, no empty heading.
- Featured random logo on home always points to an existing team page and never shows a placeholder.

---

### Task 1: Theme + design tokens + shells
**Files:** Create `js/theme.js`; rewrite `css/style.css`; rewrite `index.html`, `team.html`, `quiz.html`, `404.html` (shared header + bottom nav markup).
**Produces:** `window.CSTheme = { get(): 'light'|'dark', set(t) }`; any `[data-theme-toggle]` button toggles; `<html data-theme>` always set before first paint.
- [ ] Tests (smoke.js): theme toggle flips `html[data-theme]`; reload keeps it; emulate `colorScheme:'dark'` with empty storage → dark; bottom nav visible at 390px and hidden ≥ 900px; all `a,button` in nav/chips/options ≥ 48px tall at 390px.
- [ ] Implement, run, commit.

### Task 2: Home (featured sticker, grid, search, filters)
**Files:** `js/home.js`.
- [ ] Tests: featured sticker link `team.html?t=<slug>` matches a TEAMS slug and its img loads; Ásia chip shows MongolZ; existing search/filter tests still pass.
- [ ] Implement `pickFeatured(teams) -> {team, logo}` (random retired logo with src; fallback current). Commit.

### Task 3: Team page (logos first, titles, comparator, colors, history)
**Files:** `js/team.js`, `js/teams.js` (drop `opinion`, add `titles`).
- [ ] Tests: section order = timeline, compare (if ≥2), titles (if any), colors, history; `.opinion` absent everywhere; titles count == data; team without titles has no `#h-titulos`.
- [ ] Implement, commit.

### Task 4: Quiz + 404 restyle
- [ ] Existing quiz tests pass with new markup; options ≥ 48px. Commit.

### Task 5: 10 new teams
- [ ] Fetch Liquipedia logos (Heroic, The_MongolZ, PaiN_Gaming, Legacy, Eternal_Fire, ENCE, BIG, 3DMAX, Complexity_Gaming, Team_SoloMid), convert, write data incl. titles. Smoke passes with 26 teams. Commit.

### Task 6: Review + publish
- [ ] Screenshots 390/1280 both themes; code review subagent; fix; push branch and fast-forward `main`.
