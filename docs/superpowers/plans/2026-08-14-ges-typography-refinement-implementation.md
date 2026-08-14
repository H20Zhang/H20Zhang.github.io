# GES Research Grouping and Typography Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add accurately scoped Huawei-era graph research to the GES detail page and make the site slightly larger and typographically consistent.

**Architecture:** Keep publication ownership in project front matter and render it through the existing `system_research_details.liquid` include. Implement typography as a small set of recurring rem values in the existing Sass partials, anchored by a 17px root size, rather than adding a new component system or changing layout markup.

**Tech Stack:** Jekyll, Liquid, Sass, Python `unittest`, built HTML contract tests.

## Global Constraints

- Preserve the existing font family, warm editorial palette, navigation, page structure, and content width.
- Keep TenGraph, TGraph, and tensorized k-TTC exclusively under TQEX.
- Present TDLCR, SANE, and the graph-classification attack as related Huawei-era graph research, not GES components.
- Use a 17px root size and the four roles: body `1rem`, secondary `0.94rem`, metadata `0.84rem`, label `0.75rem`.
- Do not reclassify the full publication list by employer affiliation.

---

### Task 1: Lock the research and typography contracts

**Files:**
- Modify: `tests/test_built_site_contract.py`

**Interfaces:**
- Consumes: generated pages under `_site/projects/3_ges/` and compiled `_site/assets/css/main.css`.
- Produces: regression tests for GES paper membership, TQEX exclusivity, and the shared typography roles.

- [ ] **Step 1: Add GES paper constants and a last-rule CSS helper**

Add:

```python
GES_RELATED_GRAPH_PAPERS = {
    "/publications/#ICDE-24-1",
    "/publications/#ICDE-24-2",
    "/publications/#DASFAA-25",
}


def compiled_css_last_rule(css: str, selector: str) -> dict[str, str]:
    pattern = re.compile(rf"(?<![\\w-]){re.escape(selector)}\\{{([^{{}}]+)\\}}")
    matches = pattern.findall(css)
    if not matches:
        raise AssertionError(f"compiled CSS rule not found: {selector}")

    declarations: dict[str, str] = {}
    for declaration in matches[-1].split(";"):
        if ":" not in declaration:
            continue
        property_name, value = declaration.split(":", 1)
        declarations[property_name.strip()] = value.strip()
    return declarations
```

- [ ] **Step 2: Add the failing GES grouping test**

Add a test that parses `projects/3_ges/index.html`, verifies all three related-paper anchors are present, verifies the visible label `Related Huawei-era graph research`, and verifies none of the four `TQEX_PAPERS` anchors appear on the GES page.

```python
def test_ges_page_separates_related_huawei_graph_research(self):
    ges_path = SITE / "projects" / "3_ges" / "index.html"
    ges_html = ges_path.read_text(encoding="utf-8")
    ges_page = parse_page(ges_path)
    hrefs = {anchor.get("href") for anchor in ges_page.anchors}

    self.assertIn("Related Huawei-era graph research", ges_html)
    self.assertTrue(GES_RELATED_GRAPH_PAPERS.issubset(hrefs))
    self.assertTrue(TQEX_PAPERS.isdisjoint(hrefs))
```

- [ ] **Step 3: Add the failing typography hierarchy test**

Assert the final compiled rules use the exact agreed sizes:

```python
def test_editorial_typography_uses_four_consistent_roles(self):
    expected = {
        "html": {"font-size": "17px"},
        ".post-description": {"font-size": ".94rem"},
        ".projects .systems-group-label": {"font-size": ".75rem"},
        ".projects .project-card-actions": {"font-size": ".84rem"},
        ".research-thread-label": {"font-size": ".75rem"},
        ".research-paper-venue": {"font-size": ".84rem"},
        ".research-paper-body": {"font-size": ".94rem"},
        ".cv-editorial .cv-section-title": {"font-size": ".75rem"},
        ".cv-editorial .cv-entry-date": {"font-size": ".84rem"},
        ".cv-editorial .cv-entry-highlights": {"font-size": ".94rem"},
        ".publications ol.bibliography li .links .btn": {"font-size": ".84rem"},
    }

    for selector, properties in expected.items():
        rule = compiled_css_last_rule(self.css, selector)
        with self.subTest(selector=selector):
            for property_name, value in properties.items():
                self.assertEqual(rule.get(property_name), value)
```

- [ ] **Step 4: Build and prove the new contracts fail**

Run:

```bash
bundle exec jekyll build
python3 -m unittest tests.test_built_site_contract -v
```

Expected: the existing tests pass; the two new tests fail because the GES anchors and typography values are not implemented.

- [ ] **Step 5: Commit the tests**

```bash
git add tests/test_built_site_contract.py
git commit -m "Test GES grouping and typography scale"
```

---

### Task 2: Add the related Huawei-era graph research thread

**Files:**
- Modify: `_projects/3_ges.md`

**Interfaces:**
- Consumes: the existing `research_support` schema rendered by `_includes/system_research_details.liquid`.
- Produces: one separate related-research thread with publication deep links and bounded claims.

- [ ] **Step 1: Add the three-paper research thread**

Append this entry to `research_support`, after `Incremental graph queries`:

```yaml
  - area: Related Huawei-era graph research
    papers:
      - name: Time-dependent label-constrained reachability
        venue: ICDE 2024
        url: /publications/#ICDE-24-1
        summary: Studies reachability under ordered label and time-dependent constraints, with indexing strategies that balance construction cost and query efficiency.
        role: Extends the Huawei-era graph research portfolio toward indexed graph reachability queries.
      - name: SANE
        venue: ICDE 2024
        url: /publications/#ICDE-24-2
        summary: Updates attributed-network embeddings in a streaming style while retaining information from previously observed attributes.
        role: Represents adjacent work on evolving attributed graphs rather than a component of GES.
      - name: Unsupervised graph-classification attack
        venue: DASFAA 2025
        url: /publications/#DASFAA-25
        summary: Develops a label-free adversarial attack for graph classification using contrastive representations and learned edge perturbations.
        role: Represents adjacent graph-learning research and is not presented as part of the GES implementation.
```

- [ ] **Step 2: Run the focused grouping test**

Run:

```bash
bundle exec jekyll build
python3 -m unittest tests.test_built_site_contract.BuiltSiteContractTest.test_ges_page_separates_related_huawei_graph_research -v
```

Expected: PASS.

- [ ] **Step 3: Commit the GES content**

```bash
git add _projects/3_ges.md
git commit -m "Group related Huawei graph research under GES"
```

---

### Task 3: Normalize the site typography hierarchy

**Files:**
- Modify: `_sass/_layout.scss`
- Modify: `_sass/_about.scss`
- Modify: `_sass/_blog.scss`
- Modify: `_sass/_components.scss`
- Modify: `_sass/_cv.scss`
- Modify: `_sass/_publications.scss`
- Modify: `tests/test_built_site_contract.py`

**Interfaces:**
- Consumes: the existing Sass import order in `assets/css/main.scss`.
- Produces: compiled CSS using the agreed body, secondary, metadata, and label roles.

- [ ] **Step 1: Set the global root scale**

Add to `_sass/_layout.scss` before `body`:

```scss
html {
  font-size: 17px;
}
```

- [ ] **Step 2: Normalize homepage and general page microtype**

In `_sass/_about.scss`, set `.about-hero-profile .more-info` and `.about-updated` to `0.84rem`, `.about-section-label` to `0.75rem`, and `.about-section-content` to `0.94rem`.

In `_sass/_blog.scss`, set `.post-description` and `.blog-post-description` to `0.94rem`; set post metadata, tags, language badges, and translation links to `0.84rem`. Keep display headings unchanged.

- [ ] **Step 3: Normalize Systems and research-thread typography**

In `_sass/_components.scss`, use:

```scss
.projects .systems-group-label { font-size: 0.75rem; }
.projects .system-entry--earlier .system-entry-description { font-size: 0.94rem; }
.projects .project-card-actions { font-size: 0.84rem; }
.research-thread-label { font-size: 0.75rem; }
.research-paper-venue { font-size: 0.84rem; }
.research-paper-body { font-size: 0.94rem; }
```

- [ ] **Step 4: Normalize CV typography without changing its grid**

In the `.cv-editorial` block of `_sass/_cv.scss`, use `0.84rem` for intro metadata and dates, `0.75rem` for section labels, `0.94rem` for subtitles, summaries, highlights, simple lists, and labelled details, and `1rem` for the intro summary. Do not change `.cv-entry-grid` or responsive breakpoints.

- [ ] **Step 5: Normalize publication controls and update their assertion**

Set `.publications ol.bibliography li .links .btn` to `0.84rem` in `_sass/_publications.scss`, and update the older publication-button test assertion from `.8rem` to `.84rem`.

- [ ] **Step 6: Build and run the typography contracts**

Run:

```bash
bundle exec jekyll build
python3 -m unittest tests.test_built_site_contract.BuiltSiteContractTest.test_editorial_typography_uses_four_consistent_roles -v
python3 -m unittest tests.test_built_site_contract.BuiltSiteContractTest.test_long_text_uses_regular_weight_readability_styles -v
```

Expected: PASS. If the long-text test fails because `.about-section-content` now intentionally uses `.94rem`, update its expected value from `.96rem` to `.94rem` and rerun.

- [ ] **Step 7: Commit the typography refinement**

```bash
git add _sass/_layout.scss _sass/_about.scss _sass/_blog.scss _sass/_components.scss _sass/_cv.scss _sass/_publications.scss tests/test_built_site_contract.py
git commit -m "Refine site typography hierarchy"
```

---

### Task 4: Full verification, visual QA, and publication

**Files:**
- Verify: `_site/`
- Verify: all files changed by Tasks 1–3

**Interfaces:**
- Consumes: the complete implementation tree.
- Produces: a tested `master` deployment with visually verified desktop and responsive pages.

- [ ] **Step 1: Run the complete automated verification suite**

Run:

```bash
bundle exec jekyll build
python3 -m unittest tests.test_built_site_contract -v
python3 scripts/check_internal_links.py _site
node --check assets/js/common.js
git diff --check origin/master...HEAD
```

Expected: Jekyll succeeds; every unit test passes; every generated HTML file has valid internal links; JavaScript syntax and Git whitespace checks pass.

- [ ] **Step 2: Inspect the local build visually**

Open the built homepage, Systems index, GES detail, CV, Writing, and Publications pages in the cloud browser. Check hierarchy, long-title wrapping, navigation, research-paper expansion, publication controls, and mobile-width overflow. Compare the same pages against the pre-change screenshots captured during design review.

- [ ] **Step 3: Correct only observed typography or overflow regressions**

Limit any corrections to the agreed selectors and values. Do not change layout, font family, palette, or page copy beyond the GES research thread. Re-run Step 1 after any correction.

- [ ] **Step 4: Commit verification-only corrections if needed**

```bash
git add <only-the-corrected-files>
git commit -m "Polish typography after visual QA"
```

Skip this commit when no corrections are required.

- [ ] **Step 5: Publish the verified tree to `master` without force**

Fetch the latest remote `master`, confirm it is still the expected deployment base, and fast-forward or create an equivalent commit through the connected GitHub integration. Never force-push. Confirm the remote tree exactly matches the locally verified tree.

- [ ] **Step 6: Verify the live deployment**

Open `https://h20zhang.github.io/projects/3_ges/`, `https://h20zhang.github.io/cv/`, and `https://h20zhang.github.io/projects/` in the cloud browser. Confirm the new related-research thread and typography are live before reporting completion.
