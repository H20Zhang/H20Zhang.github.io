# About, CV, and Systems Link Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine About and CV emphasis, add official CV advisor links, align Systems content links with About, and slightly reduce the About hero headline.

**Architecture:** Keep content changes in the existing Markdown/YAML sources. Centralize the established editorial underline declarations in a Sass mixin, then reuse it for Systems content links while preserving underline-free navigation headings. Protect the result at the generated-site boundary so tests exercise the HTML and CSS visitors receive.

**Tech Stack:** Jekyll, Liquid, Markdown, YAML, Sass, Python `unittest`.

## Global Constraints

- Bold only `declarative`, `imperative`, and `Hongyi Honor School`; surrounding dates and sentences remain regular weight.
- Link both advisor names to their official CUHK profile pages already used on About.
- Systems content links receive the About-style persistent underline; system title links remain underline-free.
- Reduce the About hero headline by roughly ten percent without changing weight, line height, or letter spacing.
- Publish directly to `master` only after the full build, test suite, link check, and visual review pass.

---

### Task 1: Generated content emphasis and advisor links

**Files:**
- Modify: `tests/test_built_site_contract.py`
- Modify: `_pages/about.md`
- Modify: `_data/cv.yml`

**Interfaces:**
- Consumes: Jekyll-generated `index.html` and `cv/index.html`.
- Produces: Visitor-facing emphasis markup and official CUHK advisor links.

- [ ] **Step 1: Write the failing generated-site test**

Add a test that reads the built About and CV HTML and asserts these literal outcomes:

```python
def test_about_and_cv_render_requested_emphasis_and_advisor_links(self):
    homepage_html = (SITE / "index.html").read_text(encoding="utf-8")
    cv_html = (SITE / "cv" / "index.html").read_text(encoding="utf-8")

    self.assertRegex(
        homepage_html,
        r'<a href="https://ldbcouncil.org/benchmarks/snb/interactive/2024-09-16-graph-engine-service-sf300/">'
        r'<strong>declarative</strong>, 2024</a>',
    )
    self.assertRegex(
        homepage_html,
        r'<a href="https://ldbcouncil.org/benchmarks/snb/interactive/2025-12-01-graph-engine-service-sf300/">'
        r'<strong>imperative</strong>, 2025</a>',
    )
    self.assertRegex(
        cv_html,
        r'<a href="https://zh.wikipedia.org/zh-cn/%E6%AD%A6%E6%B1%89%E5%A4%A7%E5%AD%A6%E5%BC%98%E6%AF%85%E5%AD%A6%E5%A0%82">'
        r'<strong>Hongyi Honor School</strong></a>',
    )
    self.assertIn(
        '<a href="https://www.se.cuhk.edu.hk/people/academic-staff/prof-yu-xu-jeffrey/">Prof. Jeffrey Xu Yu</a>',
        cv_html,
    )
    self.assertIn(
        '<a href="https://www.se.cuhk.edu.hk/people/academic-staff/prof-cheng-hong/">Prof. Hong Cheng</a>',
        cv_html,
    )
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
python3 -m unittest tests.test_built_site_contract.BuiltSiteContractTest.test_about_and_cv_render_requested_emphasis_and_advisor_links -v
```

Expected: FAIL because the generated HTML lacks the requested nested `<strong>` elements and CV advisor anchors.

- [ ] **Step 3: Implement the minimal content changes**

Use these Markdown/YAML forms:

```markdown
[**declarative**, 2024](https://ldbcouncil.org/benchmarks/snb/interactive/2024-09-16-graph-engine-service-sf300/)
[**imperative**, 2025](https://ldbcouncil.org/benchmarks/snb/interactive/2025-12-01-graph-engine-service-sf300/)
```

```yaml
- "Advisors: [Prof. Jeffrey Xu Yu](https://www.se.cuhk.edu.hk/people/academic-staff/prof-yu-xu-jeffrey/) and [Prof. Hong Cheng](https://www.se.cuhk.edu.hk/people/academic-staff/prof-cheng-hong/)."
- "[**Hongyi Honor School**](https://zh.wikipedia.org/zh-cn/%E6%AD%A6%E6%B1%89%E5%A4%A7%E5%AD%A6%E5%BC%98%E6%AF%85%E5%AD%A6%E5%A0%82)."
```

- [ ] **Step 4: Rebuild and verify GREEN**

Run:

```bash
env PATH="/workspace/scratch/ecbaf0f6ddaf/.runtime/bin:/opt/codex/runtimes/codex-primary-runtime/dependencies/node/bin:/usr/local/bin:/usr/bin:/bin" BUNDLE_PATH="/workspace/scratch/ecbaf0f6ddaf/.bundle-runtime" bundle exec jekyll build
python3 -m unittest tests.test_built_site_contract.BuiltSiteContractTest.test_about_and_cv_render_requested_emphasis_and_advisor_links -v
```

Expected: build exits 0 and the test passes.

- [ ] **Step 5: Commit the content result**

```bash
git add tests/test_built_site_contract.py _pages/about.md _data/cv.yml
git commit -m "Refine About and CV link emphasis"
```

---

### Task 2: Shared Systems underline affordance and About hero scale

**Files:**
- Modify: `tests/test_built_site_contract.py`
- Modify: `_sass/_typography.scss`
- Modify: `_sass/_about.scss`

**Interfaces:**
- Consumes: Existing cobalt link color and editorial underline behavior.
- Produces: Persistent underlines for Systems content/action links and `clamp(2rem, 3.6vw, 2.35rem)` for the About tagline.

- [ ] **Step 1: Write the failing CSS contract tests**

Add tests for the visitor-facing compiled CSS:

```python
def test_systems_content_links_share_about_underline_affordance(self):
    expected = {
        "text-decoration-line": "underline",
        "text-decoration-thickness": "1px",
        "text-decoration-color": "color-mix(in srgb,currentColor 45%,transparent)",
        "text-underline-offset": ".16em",
        "text-decoration-skip-ink": "auto",
    }
    for selector in (
        ".post article .projects .system-entry-paper-links a",
        ".post .system-research .research-paper-actions a",
    ):
        rule = compiled_css_rule(self.css, selector)
        with self.subTest(selector=selector):
            for property_name, value in expected.items():
                self.assertEqual(
                    re.sub(r"\s+", "", rule.get(property_name, "")),
                    re.sub(r"\s+", "", value),
                )

    title_rule = compiled_css_cascade_rule(
        self.css, ".projects .system-entry-title-link"
    )
    self.assertEqual(title_rule.get("text-decoration"), "none")

def test_about_tagline_uses_refined_scale(self):
    tagline_rule = compiled_css_rule(self.css, ".about-tagline")
    self.assertEqual(
        re.sub(r"\s+", "", tagline_rule.get("font-size", "")),
        "clamp(2rem,3.6vw,2.35rem)",
    )
    self.assertEqual(tagline_rule.get("font-weight"), "400")
    self.assertEqual(tagline_rule.get("line-height"), "1.14")
    self.assertEqual(tagline_rule.get("letter-spacing"), "-.035em")
```

- [ ] **Step 2: Run the tests and verify RED**

Run:

```bash
python3 -m unittest \
  tests.test_built_site_contract.BuiltSiteContractTest.test_systems_content_links_share_about_underline_affordance \
  tests.test_built_site_contract.BuiltSiteContractTest.test_about_tagline_uses_refined_scale -v
```

Expected: FAIL because the Systems-specific compiled selectors do not exist and the About tagline still uses the larger scale.

- [ ] **Step 3: Implement shared underline styling and refined hero scale**

Extract the existing underline declarations into a Sass mixin in `_sass/_typography.scss`, include it in the existing prose-link rule, and include it in two standalone rules:

```scss
@mixin editorial-inline-link {
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-decoration-color: color-mix(in srgb, currentColor 45%, transparent);
  text-underline-offset: 0.16em;
  text-decoration-skip-ink: auto;

  &:hover,
  &:focus-visible {
    text-decoration-color: currentColor;
    text-decoration-thickness: 1.5px;
  }
}

.post article .projects .system-entry-paper-links a {
  @include editorial-inline-link;
}

.post .system-research .research-paper-actions a {
  @include editorial-inline-link;
}
```

Set the About rule to:

```scss
.about-tagline {
  font-size: clamp(2rem, 3.6vw, 2.35rem);
}
```

- [ ] **Step 4: Rebuild and verify GREEN**

Run:

```bash
env PATH="/workspace/scratch/ecbaf0f6ddaf/.runtime/bin:/opt/codex/runtimes/codex-primary-runtime/dependencies/node/bin:/usr/local/bin:/usr/bin:/bin" BUNDLE_PATH="/workspace/scratch/ecbaf0f6ddaf/.bundle-runtime" bundle exec jekyll build
python3 -m unittest \
  tests.test_built_site_contract.BuiltSiteContractTest.test_systems_content_links_share_about_underline_affordance \
  tests.test_built_site_contract.BuiltSiteContractTest.test_about_tagline_uses_refined_scale -v
```

Expected: build exits 0 and both tests pass.

- [ ] **Step 5: Commit the style result**

```bash
git add tests/test_built_site_contract.py _sass/_typography.scss _sass/_about.scss
git commit -m "Align Systems links with About styling"
```

---

### Task 3: Full verification, visual review, and direct publication

**Files:**
- Modify after review only if a verified defect is found.
- Verify: generated `_site/` output, all tests, internal links, and GitHub Actions deployment.

**Interfaces:**
- Consumes: Tasks 1 and 2 commits.
- Produces: A verified `master` release and successful deployment workflow.

- [ ] **Step 1: Run the complete local verification suite**

```bash
env PATH="/workspace/scratch/ecbaf0f6ddaf/.runtime/bin:/opt/codex/runtimes/codex-primary-runtime/dependencies/node/bin:/usr/local/bin:/usr/bin:/bin" BUNDLE_PATH="/workspace/scratch/ecbaf0f6ddaf/.bundle-runtime" bundle exec jekyll build
python3 -m unittest discover -s tests -p 'test_*.py' -v
python3 scripts/check_internal_links.py _site
git diff --check
```

Expected: every command exits 0, all tests pass, and the link checker reports no broken internal links or anchors.

- [ ] **Step 2: Review the rendered pages in the cloud browser**

Inspect these routes with a cache-busting query:

```text
/
/cv/
/projects/
/projects/1_autoia/
/projects/2_tqex/
/projects/3_ges/
/projects/4_database_graph_systems/
```

Verify the About headline remains dominant but less oversized; the three requested phrases are bold without bolding their dates; both advisor links are visible and correct; Systems research/action links have persistent underlines; and system title links remain clean.

- [ ] **Step 3: Commit any QA documentation and confirm a clean release tree**

```bash
git status --short
git log --oneline --decorate -5
```

Expected: no uncommitted release files and the branch contains the design, plan, content, and style commits.

- [ ] **Step 4: Publish the verified tree to `master`**

Create a GitHub commit whose parent is the current remote `master`, whose tree contains the verified local branch, and update `refs/heads/master` with `force: false`. Do not overwrite a moved remote head; if `master` changed, rebase the verified tree and rerun Step 1.

- [ ] **Step 5: Confirm deployment**

Fetch the GitHub Actions workflow run for the published commit and wait for the build and deploy jobs to complete successfully. Then reload the public About, CV, Systems overview, and all four system detail routes and confirm the published CSS and markup match the verified local output.
