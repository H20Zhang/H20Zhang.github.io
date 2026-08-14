# Homepage Typography Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve long-form text readability and remove homepage horizontal overflow while preserving the current warm editorial design.

**Architecture:** Keep the existing Jekyll/Sass structure and make narrowly scoped changes in the homepage and publications partials. Extend the built-site contract test to inspect compiled CSS, then confirm real layout behavior in the cloud browser.

**Tech Stack:** Jekyll, Sass, Python `unittest`, cloud browser

---

### Task 1: Lock in the visual contracts

**Files:**
- Modify: `tests/test_built_site_contract.py`

- [x] Add a compiled-CSS rule parser for the two affected Sass partials' emitted selectors.
- [x] Add a regression test for the full-bleed implementation that excludes the scrollbar-sensitive `100vw` pseudo-element.
- [x] Add a regression test for the approved long-text and publication metadata typography.
- [x] Build the current site and confirm the new tests fail for the intended reasons.

### Task 2: Refine the Sass

**Files:**
- Modify: `_sass/_about.scss`
- Modify: `_sass/_publications.scss`

- [x] Replace the homepage full-bleed pseudo-element with a clipped `100vmax` paint technique.
- [x] Apply the approved regular-weight typography to homepage long text.
- [x] Apply the approved regular-weight typography to publication authors and periodicals.
- [x] Rebuild and confirm the regression tests pass.

### Task 3: Verify and publish

**Files:**
- Modify: `docs/superpowers/plans/2026-08-14-typography-polish-implementation.md`

- [x] Run the full Jekyll build, built-site contract suite, and internal-link checker.
- [ ] Inspect homepage and publications in the same cloud browser and confirm computed styles and overflow metrics.
- [ ] Review desktop and mobile screenshots for hierarchy, line breaks, band coverage, and clipping.
- [ ] Commit, merge to `master`, publish, and verify the deployed pages.
