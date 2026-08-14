# Editorial Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the homepage's flat warm-editorial design system across CV, Systems, Publications, and Writing while reducing duplicated homepage metadata.

**Architecture:** Keep the existing Jekyll collections and data model. Make focused Liquid and Markdown changes for hierarchy/content, then centralize the visual treatment in the page-specific SCSS files. Protect the intended result with assertions against generated HTML and compiled CSS.

**Tech Stack:** Jekyll, Liquid, Markdown/YAML, SCSS, Python `unittest`

## Global Constraints

- Preserve the current homepage palette, typeface, full-bleed sections, and content architecture.
- Do not modify the user's dirty primary worktree.
- Do not publish or merge without explicit user authorization.
- Keep project detail content and publication data intact.
- Use build output and automated checks as the source of truth when local browser preview is unavailable.

---

### Task 1: Establish Baseline And Page Contracts

**Files:**
- Modify: `tests/test_built_site_contract.py`

- [x] Build the unmodified site from the isolated worktree.
- [x] Read the testing guidance and identify the existing contract-test helpers.
- [x] Add assertions for the approved CV, Systems, Writing, Publications, and homepage outcomes.
- [x] Run the new tests and confirm they fail for the expected pre-change reasons.

### Task 2: Flatten The CV

**Files:**
- Modify: `_layouts/cv.liquid`
- Modify: `_sass/_cv.scss`
- Modify: `_data/cv.yml`

- [x] Replace the two introductory cards with one compact `cv-intro` block.
- [x] Remove card classes from RenderCV section markup and expose semantic editorial section classes.
- [x] Restyle entries, dates, and separators without shadows, radii, or pin markers.
- [x] Remove only generic award descriptions.
- [x] Run CV contract tests.

### Task 3: Turn Systems Into An Index

**Files:**
- Modify: `_pages/projects.md`
- Modify: `_includes/projects_horizontal.liquid`
- Modify: `_sass/_components.scss`

- [x] Add Current, Huawei Systems, and Earlier Research group labels.
- [x] Keep GES and TQEX as separate entries.
- [x] Remove research-thread rendering from the overview include while leaving detail templates/data untouched.
- [x] Establish primary and archival visual emphasis through typography and spacing.
- [x] Run Systems contract tests.

### Task 4: Refine Writing And Publications

**Files:**
- Modify: `_config.yml`
- Modify: `_pages/blog.md`
- Modify: `_sass/_blog.scss`
- Modify: relevant `_posts/*.md`
- Modify: `_pages/publications.md`
- Modify: `_includes/bib.liquid`
- Modify: `_sass/_publications.scss`

- [x] Rename the blog index to Writing and flatten the post entry.
- [x] Remove index chips and replace legacy tags in post front matter.
- [x] Remove the redundant Publications heading.
- [x] Rename publication resource controls and improve their legibility.
- [x] Run Writing and Publications contract tests.

### Task 5: Apply Homepage Restraint

**Files:**
- Modify: `_pages/about.md`
- Modify: `_sass/_about.scss`

- [x] Keep only the email address beneath the profile image.
- [x] Reduce footer social icon size and contrast while preserving hover and keyboard affordances.
- [x] Run homepage contract tests.

### Task 6: Verify And Prepare Handoff

**Files:**
- Update: `docs/superpowers/plans/2026-08-14-editorial-consistency-implementation.md`

- [x] Run the complete production build.
- [x] Run the full page-contract test suite.
- [x] Run the internal-link checker.
- [x] Review the diff for scope, content preservation, and accidental generated-file changes.
- [x] Record any visual-QA limitation rather than claiming browser verification that did not occur.

Visual-QA note: the cloud browser rejected the local Jekyll preview URL, so this pass was verified through generated HTML/CSS, semantic contracts, and link checks. Screenshot comparison should be completed against the deployed URL only after explicit publication approval.
