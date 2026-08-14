# Cobalt Mandarin Palette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the selected Cobalt Mandarin light palette while preserving the existing site structure and dark appearance.

**Architecture:** Continue using the Sass variables in `_sass/_variables.scss` as palette sources and `_sass/_themes.scss` as the semantic CSS-variable layer. Add one section-accent semantic token consumed only by homepage section labels, then verify the compiled CSS rather than merely searching source text.

**Tech Stack:** Jekyll, Sass, Python `unittest`, HTML parser-based built-site contract tests.

## Global Constraints

- Use the exact selected values: `#fdfdfd`, `#f7f7f7`, `#1a1a1a`, `#6b7280`, `#3f5fcc`, `#273f9f`, `#cc4b00`, and `#e5e7eb`.
- Preserve layout, typography, copy, images, responsive behavior, and interactions.
- Preserve the dark palette; only expose a new dark semantic alias for the existing dark accent.
- Do not publish or update `master` in this task.

---

### Task 1: Apply and verify the semantic palette

**Files:**
- Modify: `tests/test_built_site_contract.py`
- Modify: `tests/test_homepage_design.py`
- Modify: `_sass/_variables.scss`
- Modify: `_sass/_themes.scss`
- Modify: `_sass/_about.scss`
- Modify: `design-qa.md`

**Interfaces:**
- Consumes: existing Sass variables and CSS custom properties used across the site.
- Produces: `--global-section-accent-color`, mapped to `#cc4b00` in light mode and the existing dark accent in dark mode.

- [ ] **Step 1: Write failing source and compiled-output tests**

Update `test_selected_light_and_dark_palettes_are_declared` so its light tuple is:

```python
light_palette = (
    "#fdfdfd",
    "#f7f7f7",
    "#3f5fcc",
    "#273f9f",
    "#1a1a1a",
    "#6b7280",
    "#cc4b00",
)
```

Update the theme contract to require `--global-section-accent-color` twice and the neutral divider `rgba(229, 231, 235, 1)`. Rename the built-site test to `test_light_theme_uses_cobalt_mandarin_palette` and assert:

```python
expected = {
    "--global-bg-color": "#fdfdfd",
    "--global-surface-color": "#fdfdfd",
    "--global-section-alt-color": "#f7f7f7",
    "--global-navbar-bg-color": "#fdfdfd",
    "--global-text-color": "#1a1a1a",
    "--global-text-color-light": "#6b7280",
    "--global-theme-color": "#3f5fcc",
    "--global-hover-color": "#273f9f",
    "--global-section-accent-color": "#cc4b00",
    "--global-divider-color": "rgba(229, 231, 235, 1)",
}
```

Also assert `_sass/_about.scss` maps `.about-section-label` to `var(--global-section-accent-color)`.

- [ ] **Step 2: Run the focused tests and confirm the expected RED state**

Run:

```bash
python3 -m unittest tests.test_homepage_design -v
python3 -m unittest tests.test_built_site_contract.BuiltSiteContractTest.test_light_theme_uses_cobalt_mandarin_palette -v
```

Expected: failures report the old Silver Iris values and the missing section-accent token.

- [ ] **Step 3: Implement the minimal Sass changes**

In `_sass/_variables.scss`, set the light palette variables to the selected values and add:

```scss
$section-accent-light: #cc4b00 !default;
```

In `_sass/_themes.scss`, expose the new token in both theme blocks:

```scss
--global-section-accent-color: #{v.$section-accent-light};
```

```scss
--global-section-accent-color: #{v.$accent-color-dark};
```

Use `rgba(229, 231, 235, 1)` for the light divider. In `_sass/_about.scss`, change only `.about-section-label` to use `var(--global-section-accent-color)`.

- [ ] **Step 4: Rebuild and confirm GREEN**

Run:

```bash
PATH="/workspace/scratch/ecbaf0f6ddaf/.runtime/bin:$PATH" \
BUNDLE_PATH="/workspace/scratch/ecbaf0f6ddaf/.bundle-runtime" \
BUNDLE_GEMFILE="/workspace/scratch/ecbaf0f6ddaf/site/.worktrees/editorial-consistency/Gemfile" \
bundle exec jekyll build
python3 -m unittest tests.test_homepage_design tests.test_built_site_contract -v
python3 scripts/check_internal_links.py _site
node --check assets/js/common.js
git diff --check
```

Expected: the build succeeds, all tests pass, all internal links and anchors are valid, JavaScript syntax is valid, and the diff has no whitespace errors.

- [ ] **Step 5: Run Product Design visual QA**

Use the selected `1514 × 1039` reference and the same light-theme homepage viewport. If the cloud browser captures the local preview, compare both images and fix P0–P2 discrepancies. If browser capture remains blocked, update root `design-qa.md` with `final result: blocked` and the exact browser error; do not claim visual fidelity.

- [ ] **Step 6: Commit the implementation**

```bash
git add _sass/_variables.scss _sass/_themes.scss _sass/_about.scss \
  tests/test_homepage_design.py tests/test_built_site_contract.py design-qa.md
git commit -m "Apply Cobalt Mandarin site palette"
```
