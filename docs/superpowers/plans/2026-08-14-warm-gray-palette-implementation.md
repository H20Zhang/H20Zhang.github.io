# Warm-Gray Homepage Palette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the light theme's yellow cream cast with the approved neutral warm-gray palette while preserving the layout, content, dark theme, and behavior.

**Architecture:** Keep the existing Sass token wiring intact. Change only the six light-theme color values in `_sass/_variables.scss` and the light divider literal in `_sass/_themes.scss`; contract tests pin the new values and confirm the dark palette remains unchanged.

**Tech Stack:** Jekyll, Sass, Python `unittest`, existing internal-link checker.

## Global Constraints

- Light background and navigation: `#f7f5f2`.
- Alternate section surface: `#efeae4`.
- Brick accent and hover: `#984936` and `#733527`.
- Main and muted text: `#2b2623` and `#6f6661`.
- Light dividers: `rgba(83, 66, 56, 0.16)`.
- Preserve the current dark-theme palette unchanged.
- Do not change layout, copy, portrait, navigation, routes, or JavaScript behavior.
- Do not deploy or push to GitHub.

---

### Task 1: Pin and implement the approved light palette

**Files:**
- Create: `tests/test_homepage_design.py`
- Modify: `_sass/_variables.scss`
- Modify: `_sass/_themes.scss`

**Interfaces:**
- Consumes: existing Sass variables `$paper-cream-light`, `$paper-sand-light`, `$accent-color-light`, `$accent-hover-light`, `$ink-color-light`, and `$text-muted-light`.
- Produces: the same Sass variables with approved values, preserving all current consumers and compiled CSS variable names.

- [ ] **Step 1: Create the palette contract so it fails against the current cream palette**

Replace the `light_palette` tuple in `tests/test_homepage_design.py` with:

```python
light_palette = (
    "#f7f5f2",
    "#efeae4",
    "#984936",
    "#733527",
    "#2b2623",
    "#6f6661",
)
```

Add these assertions to `test_theme_exposes_warm_surface_tokens`:

```python
self.assertIn("rgba(83, 66, 56, 0.16)", themes)
self.assertNotIn("rgba(120, 51, 34, 0.18)", themes)
```

- [ ] **Step 2: Run the focused contract test and confirm the expected failure**

Run:

```bash
python3 -m unittest tests.test_homepage_design.HomepageDesignContractTest.test_selected_light_and_dark_palettes_are_declared -v
```

Expected: `FAIL` because `#f7f5f2` is not yet present in `_sass/_variables.scss`.

- [ ] **Step 3: Replace only the approved light-theme Sass values**

Change the light palette block in `_sass/_variables.scss` to:

```scss
$paper-cream-light: #f7f5f2 !default;
$paper-sand-light: #efeae4 !default;
$accent-color-light: #984936 !default;
$accent-hover-light: #733527 !default;
$ink-color-light: #2b2623 !default;
$text-muted-light: #6f6661 !default;
```

Change the light-theme divider in `_sass/_themes.scss` to:

```scss
--global-divider-color: rgba(83, 66, 56, 0.16);
```

Do not alter the `html[data-theme="dark"]` block.

- [ ] **Step 4: Run the homepage design contract tests**

Run:

```bash
python3 -m unittest tests.test_homepage_design -v
```

Expected: all four homepage design tests pass.

- [ ] **Step 5: Commit the palette contract and implementation together**

```bash
git add tests/test_homepage_design.py _sass/_variables.scss _sass/_themes.scss
git commit -m "Refine light theme with warm gray palette"
```

### Task 2: Verify the site output and document the visual evidence limit

**Files:**
- Modify: `design-qa.md`

**Interfaces:**
- Consumes: the Sass changes from Task 1 and the existing Jekyll build pipeline.
- Produces: a passing structural verification record and an explicit visual-QA status without claiming screenshot fidelity when no valid local capture is available.

- [ ] **Step 1: Run the complete local verification suite**

Run:

```bash
python3 -m unittest discover -s tests -v
bundle exec jekyll build
python3 scripts/check_internal_links.py _site
git diff --check
```

Expected: four homepage design tests pass, Jekyll builds successfully, 40 HTML files have valid internal links and anchors, and `git diff --check` reports no errors.

- [ ] **Step 2: Confirm the compiled light palette and unchanged dark palette**

Run:

```bash
rg -n '#f7f5f2|#efeae4|#984936|#733527|#2b2623|#6f6661|#241a16|#e58b6d' _site/assets/css/main.css
```

Expected: all approved light colors and the existing dark base/accent colors appear in the compiled stylesheet.

- [ ] **Step 3: Update the QA record without overstating visual verification**

Add the following status to `design-qa.md`:

```markdown
## Warm-gray palette refinement

- Approved visual direction: right-hand panel of `generated_images/exec-13bbbdd5-75d9-48f6-a6c4-5aadfa0a528f.png`.
- Structural verification: passed after unit tests, Jekyll build, and internal-link checks.
- Screenshot comparison: blocked until a valid rendered screenshot of the implementation is available.
- Publication status: not published.
```

- [ ] **Step 4: Commit the QA record**

```bash
git add design-qa.md
git commit -m "Document warm gray palette verification"
```
