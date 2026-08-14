# AutoIA Homepage Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace ambiguous AutoIA terminology with concise, industry-readable homepage and Systems-card copy.

**Architecture:** This is a content-only change. `_pages/about.md` owns homepage positioning and `_projects/1_autoia.md` owns the Systems-card description. Existing structural tests protect the layout; the rendered Jekyll output is inspected for the approved public copy because exact human prose should not be frozen in a source-text regression test.

**Tech Stack:** Jekyll, Markdown/Liquid, Python `unittest`.

## Global Constraints

- Do not use `information architecture` or `information topology` on the edited public surfaces.
- Do not use `RAG` as an AutoIA positioning term; describe the broader context-retrieval problem directly.
- Keep the homepage structure and section count unchanged.
- Use `database systems and AI`, not `database systems and Data+AI`.
- Use `self-improving context infrastructure` as the umbrella term and make the two coupled optimization objects explicit: external data-environment construction and environment-specific retrieval pipelines.
- Treat agent skills as a downstream packaging layer rather than a primary optimization object in the homepage positioning.
- Do not publish the result.

---

### Task 1: Synchronize AutoIA Homepage And Systems-Card Positioning

**Files:**
- Modify: `_pages/about.md`
- Modify: `_projects/1_autoia.md`
- Modify: `docs/superpowers/specs/2026-08-14-autoia-homepage-positioning-design.md`

**Interfaces:**
- Consumes: the existing About-page sections and the `description` front-matter field rendered by `_includes/projects.liquid` and `_includes/projects_horizontal.liquid`.
- Produces: concise public AutoIA positioning on the homepage and Systems card, plus a detail-page explanation of the nested optimization loop.

- [x] **Step 1: Confirm the validation boundary**

Do not add an exact-copy unit test. The production change is human-facing prose, so a source-text assertion would be a brittle change detector rather than a behavioral test. Use the existing homepage structure tests plus rendered-output inspection instead.

- [x] **Step 2: Apply the approved copy**

Replace the two Current Research paragraphs, the AutoIA Selected Systems bullet, the collaboration phrase, and the AutoIA front-matter description with the exact copy from the design specification. Update the AutoIA detail-page introduction, problem statement, core idea, and research role to distinguish inner-loop pipeline evolution from outer-loop environment reconstruction.

- [x] **Step 3: Run the existing structural tests**

Run: `python3 -m unittest discover -s tests -v`

Expected: four tests pass with zero failures.

- [x] **Step 4: Build, inspect rendered copy, and check links**

Run the repository's configured Jekyll build. Inspect the rendered homepage and Systems page for the approved positioning and confirm that `Data+AI`, `information architecture`, and `information topology` do not appear on those two rendered surfaces. Then run `python3 scripts/check_internal_links.py _site` and `git diff --check`.

Expected: the build succeeds, all generated HTML files pass the link check, and the diff has no whitespace errors.

- [x] **Step 5: Commit the scoped change**

Stage only the two content files, this corrected plan, and the synchronized design specification. Commit with `Clarify AutoIA environment evolution`.
