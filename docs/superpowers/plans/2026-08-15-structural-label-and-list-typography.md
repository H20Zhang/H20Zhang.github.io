# Structural Label and List Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify Systems and Writing list typography at the current AutoIA level and extend the About page's mandarin structural-label role across the site without coloring ordinary headings or metadata.

**Architecture:** Preserve the existing semantic components and theme token. CSS contracts in the built-site test suite define shared title, narrative, responsive, and accent behavior; existing Sass partials then implement those contracts with minimal selector changes. Writing receives one semantic `Essays` heading because it currently has no structural label before its list.

**Tech Stack:** Jekyll, Liquid, Sass, Python `unittest`, cloud-browser visual QA.

## Global Constraints

- Desktop list titles are `1.55rem`, weight `400`, line height `1.3`, graphite.
- Desktop list narratives are `1rem`, weight `400`, line height `1.68`, graphite.
- At `576px` and below, Systems and Writing titles are both `1.35rem`.
- Structural labels use `var(--global-section-accent-color)` and preserve existing `0.72–0.76rem` sizes.
- Dates, languages, venues, News dates, links, ordinary headings, and body emphasis do not become mandarin.
- Cobalt remains the interaction color.

---

### Task 1: Encode the typography and label contracts

**Files:**
- Modify: `tests/test_built_site_contract.py`
- Modify: `tests/test_systems_overview.py`

**Interfaces:**
- Consumes: `compiled_css_cascade_rule(css, selector)` and generated `_site/assets/css/main.css`.
- Produces: regression tests for shared list roles, responsive rules, structural accents, and the Writing `Essays` heading.

- [ ] **Step 1: Write failing built-CSS tests**

Add assertions that the final cascade resolves as follows:

```python
def test_systems_and_writing_share_editorial_list_typography(self):
    expected_titles = {"font-size": "1.55rem", "font-weight": "400", "line-height": "1.3"}
    expected_narratives = {"font-size": "1rem", "font-weight": "400", "line-height": "1.68", "color": "var(--global-text-color)"}

    for selector in (".projects .system-entry-title", ".blog-index .blog-post-title"):
        rule = compiled_css_cascade_rule(self.css, selector)
        for property_name, value in expected_titles.items():
            self.assertEqual(rule.get(property_name), value)

    for selector in (".projects .system-entry-narrative", ".blog-index .blog-post-description"):
        rule = compiled_css_cascade_rule(self.css, selector)
        for property_name, value in expected_narratives.items():
            self.assertEqual(rule.get(property_name), value)
```

Add a separate test for the semantic accent color on:

```python
(
    ".projects .systems-group-label",
    ".blog-index .blog-section-label",
    ".publications h2.bibliography",
    ".cv-editorial .cv-section-title",
    ".research-thread-label",
    ".essay-sidebar-label",
)
```

Add an HTML assertion that `/blog/index.html` contains `<h2 class="blog-section-label">Essays</h2>`.

- [ ] **Step 2: Run tests and verify RED**

Run:

```bash
python3 -m unittest tests.test_built_site_contract tests.test_systems_overview -v
```

Expected: FAIL because Systems modifiers, Writing typography, structural accent selectors, and the Essays label do not yet satisfy the contract.

- [ ] **Step 3: Commit the failing tests**

```bash
git add tests/test_built_site_contract.py tests/test_systems_overview.py
git commit -m "Test shared editorial list typography"
```

### Task 2: Unify Systems and Writing list roles

**Files:**
- Modify: `_sass/_components.scss`
- Modify: `_sass/_systems.scss`
- Modify: `_sass/_blog.scss`
- Modify: `_pages/blog.md`

**Interfaces:**
- Consumes: existing `.system-entry-*` and `.blog-post-*` markup.
- Produces: identical desktop and mobile title/narrative roles plus the Writing section label.

- [ ] **Step 1: Remove importance-based type scaling from Systems**

Set the base `.system-entry-title` to `1.55rem`; remove title-size overrides from `.system-entry--primary` and `.system-entry--earlier`. Set `.system-entry-narrative` to the graphite `1rem` role and remove the primary-only narrative override. Preserve group spacing, entry spacing, and maximum-width differences.

- [ ] **Step 2: Apply the same roles to Writing**

Set `.blog-post-title` to `1.55rem`, `400`, and `1.3`. Set `.blog-post-description` to `1rem`, `400`, `1.68`, and `var(--global-text-color)`. Set the mobile title to `1.35rem`.

- [ ] **Step 3: Add the Writing structural label**

Insert this immediately before `.blog-post-list` in `_pages/blog.md`:

```html
<h2 class="blog-section-label">Essays</h2>
```

- [ ] **Step 4: Build and verify GREEN for list contracts**

Run the production Jekyll build, then:

```bash
python3 -m unittest tests.test_built_site_contract tests.test_systems_overview -v
```

Expected: typography and Writing-label assertions pass; any remaining structural-accent assertions identify Task 3 work only.

### Task 3: Apply the mandarin structural-label role

**Files:**
- Modify: `_sass/_components.scss`
- Modify: `_sass/_blog.scss`
- Modify: `_sass/_publications.scss`
- Modify: `_sass/_cv.scss`
- Modify: `_sass/_essay.scss`

**Interfaces:**
- Consumes: `var(--global-section-accent-color)` from `_sass/_themes.scss`.
- Produces: one consistent semantic accent across existing structural labels.

- [ ] **Step 1: Change only structural-label colors**

Use `color: var(--global-section-accent-color)` for Systems group labels, research-thread labels, publication year dividers, CV section titles, essay sidebar labels, and the new Writing label. Do not change the selectors for metadata, body headings, links, or News dates.

- [ ] **Step 2: Run focused tests and verify GREEN**

Run:

```bash
python3 -m unittest tests.test_built_site_contract tests.test_systems_overview -v
```

Expected: all focused tests pass.

- [ ] **Step 3: Commit implementation**

```bash
git add _sass/_components.scss _sass/_systems.scss _sass/_blog.scss _sass/_publications.scss _sass/_cv.scss _sass/_essay.scss _pages/blog.md
git commit -m "Unify list typography and structural labels"
```

### Task 4: Production and visual verification

**Files:**
- Modify: `design-qa.md`

**Interfaces:**
- Consumes: production `_site` output and browser screenshots.
- Produces: verified desktop/mobile evidence and an updated QA record.

- [ ] **Step 1: Run the full production verification**

Run the production build, all unit tests, internal-link validation, JavaScript syntax check, workflow YAML parse, `git diff --check`, and `git status --short`.

- [ ] **Step 2: Inspect desktop pages**

Capture and inspect `/projects/`, `/blog/`, `/publications/`, `/cv/`, `/projects/3_ges/`, `/blog/2026/next-gen-agent-en/`, and `/blog/2026/next-gen-agent-zh/`. Confirm label color, title/narrative computed values, wrapping, spacing, link color, and horizontal overflow.

- [ ] **Step 3: Inspect mobile pages**

At a mobile viewport, inspect `/projects/` and `/blog/`. Confirm both title roles resolve to `1.35rem`, the CUHK and article titles wrap without clipping, and no horizontal overflow appears.

- [ ] **Step 4: Update the QA report and commit**

Record the route-level evidence, computed styles, remaining limits, and final result in `design-qa.md`, then commit with:

```bash
git add design-qa.md
git commit -m "Document structural label visual QA"
```
