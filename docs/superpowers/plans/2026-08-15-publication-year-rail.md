# Publications Year Rail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make publication years read as compact About-style section labels beside their paper lists, and align the Systems index metadata labels and links with the same editorial hierarchy.

**Architecture:** Keep the existing Jekyll Scholar HTML and Liquid system cards intact. Use a direct-child CSS grid on `.publications` so each generated `h2.bibliography` and following `ol.bibliography` share a row on desktop, then collapse them to one column below `767px`. Refine only the existing Systems metadata selectors so `Core idea` and `Research` inherit About's structural-label role without changing card markup.

**Tech Stack:** Jekyll, Liquid, Sass, Python `unittest`, cloud-browser visual QA.

## Global Constraints

- Work only in the isolated `codex/publication-year-rail` worktree.
- Preserve generated publication semantics and DOM order.
- Preserve existing publication content, venue badges, buttons, filtering, and anchors.
- Keep changes limited to `_sass/_publications.scss`, `_sass/_systems.scss`, contract tests, design documents, and QA notes.
- Use mandarin only for structure, cobalt for interactive links, and graphite for explanatory content.

---

## Task 1: Add failing publication layout contracts

**Files:**
- Modify: `tests/test_built_site_contract.py`

- [ ] Add `test_publication_years_share_rows_with_their_lists`.
- [ ] Assert the generated HTML keeps each year heading immediately before its ordered list, using a literal `2026` sequence as the observable semantic contract.
- [ ] Assert the compiled desktop CSS uses `display: grid`, `6rem minmax(0,1fr)`, and a `2rem` column gap.
- [ ] Assert year headings occupy column 1 while bibliography lists occupy column 2, with matching top margin, padding, and divider treatment.
- [ ] Assert the responsive cascade returns the container and both children to one column and removes the list's duplicate divider.
- [ ] Rebuild and run only the new test; confirm it fails because the grid behavior does not yet exist.

Run:

```bash
bundle exec jekyll build
python3 -m unittest tests.test_built_site_contract.BuiltSiteContractTest.test_publication_years_share_rows_with_their_lists -v
```

Expected: FAIL on the missing `.publications` grid declarations.

## Task 2: Implement the responsive publication year rail

**Files:**
- Modify: `_sass/_publications.scss`

- [ ] Turn `.publications` into the two-column grid defined by the design spec.
- [ ] Align each year heading and publication list with matching top spacing and divider segments.
- [ ] Add `min-width: 0` to the publication column to prevent long titles from forcing overflow.
- [ ] At `max-width: 767px`, stack year and list on the same left edge, retain one divider above the year, and tighten the vertical gap.
- [ ] Rebuild and run the focused test; confirm GREEN.

Run:

```bash
bundle exec jekyll build
python3 -m unittest tests.test_built_site_contract.BuiltSiteContractTest.test_publication_years_share_rows_with_their_lists -v
```

Expected: PASS.

## Task 3: Add failing Systems metadata hierarchy contracts

**Files:**
- Modify: `tests/test_built_site_contract.py`

- [ ] Add `test_system_metadata_uses_about_editorial_hierarchy`.
- [ ] Assert `.system-entry-meta-label` uses mandarin, `0.75rem`, weight `600`, About's restrained `0.015em` letter spacing, and `1.45` line height.
- [ ] Assert metadata content uses `0.94rem` and graphite.
- [ ] Assert research links use cobalt while separators remain the light text color.
- [ ] Rebuild and run only the new test; confirm it fails on the current gray label and link styling.

Run:

```bash
bundle exec jekyll build
python3 -m unittest tests.test_built_site_contract.BuiltSiteContractTest.test_system_metadata_uses_about_editorial_hierarchy -v
```

Expected: FAIL on the current Systems metadata label and research-link values.

## Task 4: Implement Systems metadata hierarchy

**Files:**
- Modify: `_sass/_systems.scss`

- [ ] Match the About structural-label role on `Core idea` and `Research`.
- [ ] Raise metadata copy to the shared `0.94rem` editorial body role while preserving graphite for non-links.
- [ ] Use cobalt for paper links and the existing hover color for hover/focus.
- [ ] Keep mobile labels stacked above content and verify long system metadata wraps without overlap.
- [ ] Rebuild and run both focused tests; confirm GREEN.

Run:

```bash
bundle exec jekyll build
python3 -m unittest \
  tests.test_built_site_contract.BuiltSiteContractTest.test_publication_years_share_rows_with_their_lists \
  tests.test_built_site_contract.BuiltSiteContractTest.test_system_metadata_uses_about_editorial_hierarchy -v
```

Expected: PASS.

## Task 5: Verify, publish, and inspect production

**Files:**
- Modify if needed: `design-qa.md`

- [ ] Run the full production build, complete test suite, internal-link/anchor checker, and `git diff --check`.
- [ ] Review the diff against the design spec and confirm no unrelated files changed.
- [ ] Commit the implementation on `codex/publication-year-rail`.
- [ ] Fast-forward the verified result to `master` and monitor the deploy workflow to completion.
- [ ] Inspect published `/publications/` and `/projects/` at desktop width; verify alignment, wrapping, colors, dividers, and no horizontal overflow.
- [ ] Verify responsive one-column declarations through the built CSS contract and published computed styles.
- [ ] Record final measurements and any visual follow-up in `design-qa.md` before reporting completion.

Run:

```bash
bundle exec jekyll build
python3 -m unittest discover -s tests -p 'test_*.py' -v
python3 scripts/check_internal_links.py _site
git diff --check
git status --short
```

Expected: production build exits `0`, all tests pass, all generated HTML links and anchors are valid, and the worktree contains only the planned files.
