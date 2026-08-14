# CV, TQEX Systems Portfolio, and SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sharpen Hao Zhang's public CV, present Huawei-era tensor systems as a coherent but accurately bounded research line, and strengthen homepage identity signals for Google.

**Architecture:** Keep the existing Jekyll information hierarchy and visual system. Human-facing copy remains concise and is verified in rendered output; a built-site contract test protects the new Systems structure, followable identity links, and Schema.org graph. The homepage retains three Selected Systems bullets while the Systems index exposes four independent detail pages.

**Tech Stack:** Jekyll, Markdown/Liquid, YAML, BibTeX, Python `unittest`, Schema.org JSON-LD.

## Global Constraints

- Do not change the domain, canonical URL, robots policy, sitemap plugin, palette, layout, or JavaScript behavior.
- Do not publish, merge, or push this branch.
- Keep AutoIA public-safe: no internal metrics or confidential implementation claims.
- Use `GES @ Huawei`, not `GES @ Huawei Cloud`, as the system label; retain `Huawei Cloud Database Innovation Lab` as the CV employer and `Huawei Cloud Graph Engine Service` as an evidence label.
- Use `TQEX @ Huawei` as the portfolio title, but identify the paper as `TQEx(SQL): Tensor-based Query Engine Enhanced`; do not expand TQEX as `Tensor Query Engine`.
- Present TQEX as the anchor of a broader tensor-centric execution line; do not imply that TenGraph, TGraph, or tensorized k-TTC search are components of one codebase.
- Keep the homepage at three Selected Systems bullets by grouping GES and TQEX under one Huawei-era bullet.
- Do not add DBLP or ORCID to `sameAs` until the conflicting public identity metadata is resolved.
- Search Console verification and recrawl submission remain manual follow-up steps requiring the user's Google account or verification token.

---

### Task 1: Add a rendered-site contract before changing public behavior

**Files:**
- Create: `tests/test_built_site_contract.py`

**Interfaces:**
- Consumes: the generated `_site/index.html` and `_site/projects/2_tqex/index.html` files.
- Produces: regression coverage for homepage identity metadata, followable owned-profile links, the concise three-item Systems summary, and the four-paper TQEX research line.

- [x] **Step 1: Write the failing built-site tests**

Create a standard-library `unittest` module that parses rendered HTML with `html.parser.HTMLParser` and JSON with `json`. Assert these literal contracts:

```python
PERSON_ID = "https://h20zhang.github.io/#person"
IDENTITY_URLS = {
    "https://github.com/H20Zhang",
    "https://scholar.google.com/citations?user=PLwImrcAAAAJ",
    "https://www.linkedin.com/in/hao-zhang-ab18b413b",
}
TQEX_PAPERS = {
    "/publications/#SIGMOD-26-2",
    "/publications/#VLDB-24",
    "/publications/#SIGMOD-25-2",
    "/publications/#SIGMOD-26-1",
}
```

The homepage test must parse the single JSON-LD payload and require an `@graph` containing `WebSite`, `ProfilePage`, and `Person`. The `Person` must use `PERSON_ID`, include alternate names `张颢` and `H20Zhang`, identify ByteDance as `worksFor`, and expose exactly the three `IDENTITY_URLS` in `sameAs`. The rendered `<title>` must be `Hao Zhang — Research Scientist at ByteDance | Data Systems for Agents`, and `og:image` must begin with `https://`.

The link test must find each owned identity anchor and assert that its `rel` tokens do not contain `nofollow`.

The Systems tests must require `_site/projects/2_tqex/index.html`, find all four `TQEX_PAPERS` links there, and count exactly three `<li>` elements inside the homepage section whose heading target is `selected-systems`.

- [x] **Step 2: Run the focused tests against the baseline build and confirm expected failure**

Run:

```bash
python3 -m unittest tests.test_built_site_contract -v
```

Expected: failures because the baseline homepage has a single `WebSite` object, identity links contain `nofollow`, and `/projects/2_tqex/` does not exist.

- [x] **Step 3: Commit the red contract**

```bash
git add tests/test_built_site_contract.py
git commit -m "Add public site contract tests"
```

---

### Task 2: Tighten the public CV

**Files:**
- Modify: `_data/cv.yml`

**Interfaces:**
- Consumes: the existing RenderCV data structure rendered by `_layouts/cv.liquid`.
- Produces: a concise professional summary and two evidence-oriented bullets for each current/recent employer.

- [x] **Step 1: Replace the professional summary and ByteDance bullets**

Use this exact public-safe copy:

```yaml
summary: Research scientist building data systems for agents, with a current focus on self-improving context infrastructure and a broader research record in vector search, graph systems, semantic query processing, and hardware-accelerated data systems.
```

```yaml
highlights:
  - Leading the research and system architecture of AutoIA, which uses task-level evaluation to optimize retrieval pipelines and, when failures persist, improve data integration, representation, indexing, and storage.
  - Building vector-search and semantic-query infrastructure for large-scale heterogeneous and multimodal data.
```

- [x] **Step 2: Replace the Huawei keyword list with two system lines**

Use:

```yaml
highlights:
  - Researched and designed graph database infrastructure for GES, spanning high-concurrency query execution, dynamic graph storage, and benchmark-driven system optimization.
  - Developed tensor-centric SQL, graph-query, graph-processing, and graph-search systems across heterogeneous accelerators, including TQEx(SQL), TenGraph, TGraph, and tensorized k-TTC search.
```

- [x] **Step 3: Build and inspect the rendered CV**

Run the configured Jekyll build, then inspect `_site/cv/index.html`. Confirm the summary and four employer bullets render once, list indentation remains correct, and no internal-only metrics appear.

- [x] **Step 4: Commit the CV change**

```bash
git add _data/cv.yml
git commit -m "Refine ByteDance and Huawei CV experience"
```

---

### Task 3: Add TQEX and reorganize the Systems portfolio

**Files:**
- Create: `_projects/2_tqex.md`
- Modify: `_projects/3_ges.md`
- Modify: `_projects/4_database_graph_systems.md`
- Modify: `_pages/about.md`
- Modify: `_pages/projects.md`
- Modify: `_bibliography/papers.bib`
- Modify: `_publications/SIGMOD-26-1.md`

**Interfaces:**
- Consumes: `site.projects` sorting by `importance`, the `research_support` structure rendered by `_includes/projects_horizontal.liquid`, and bibliography anchors rendered at `/publications/#<key>`.
- Produces: four Systems detail pages in the order AutoIA, GES, TQEX, CUHK, while preserving a three-bullet homepage summary.

- [x] **Step 1: Create the TQEX system page**

Use front matter with `title: TQEX @ Huawei`, `importance: 3`, and this description:

```yaml
description: Tensor-centric SQL, graph-query, and graph-processing systems across heterogeneous accelerators.
```

Add four `research_support` areas and paper links:

```yaml
- TQEx(SQL) -> /publications/#SIGMOD-26-2
- TenGraph -> /publications/#VLDB-24
- TGraph -> /publications/#SIGMOD-25-2
- Tensorized k-TTC search -> /publications/#SIGMOD-26-1
```

The lead sentence must say that TQEX anchors a broader tensor-centric execution line. The body must distinguish SQL execution, graph queries, graph processing, and graph search, state the heterogeneous-accelerator portability goal, describe Hao's research/system-architecture role conservatively, and link each work to its primary DOI or PVLDB page.

- [x] **Step 2: Rename GES and preserve the chronological order**

Change the GES title to `GES @ Huawei`. Change the CUHK project's `importance` from `3` to `4` so the four cards remain AutoIA, GES, TQEX, CUHK.

- [x] **Step 3: Keep the homepage concise and update the Systems index**

Replace the standalone GES bullet with one Huawei-era bullet containing both links:

```markdown
- **Huawei-era systems** — [**GES @ Huawei**](/projects/3_ges/) for production graph database infrastructure, and [**TQEX @ Huawei**](/projects/2_tqex/) for tensor-centric SQL and graph execution across heterogeneous accelerators.
```

Update the Systems page description and intro so AutoIA, GES, TQEX, and the CUHK systems are named once, without turning the intro into a technical abstract.

- [x] **Step 4: Correct the fourth tensor-paper evidence**

In `SIGMOD-26-1`, use DOI `10.1145/3786620` and summarize the public contribution as a tensor-based framework for index construction, online k-TTC search, and maintenance across NVIDIA and AMD GPUs. Set its research theme to `Tensor-Centric Data Systems` in the legacy publication record. Do not claim institutional ownership because the ACM and SIGMOD affiliation metadata conflict.

- [x] **Step 5: Build and move the Systems contract from red to green**

Run the configured Jekyll build, followed by:

```bash
python3 -m unittest tests.test_built_site_contract -v
python3 scripts/check_internal_links.py _site
```

Expected at this checkpoint: TQEX and the three-item homepage tests pass; Schema.org and owned-link tests remain red until Task 4. All internal links and publication anchors pass.

- [x] **Step 6: Commit the Systems change**

```bash
git add _projects/2_tqex.md _projects/3_ges.md _projects/4_database_graph_systems.md _pages/about.md _pages/projects.md _bibliography/papers.bib _publications/SIGMOD-26-1.md
git commit -m "Add Huawei tensor systems portfolio"
```

---

### Task 4: Strengthen homepage identity and structured metadata

**Files:**
- Modify: `_pages/about.md`
- Modify: `_includes/metadata.liquid`
- Modify: `_config.yml`

**Interfaces:**
- Consumes: `page.seo_title`, `page.description`, `site.url`, `site.baseurl`, `site.og_image`, `_data/socials.yml`, and `page.profile.image`.
- Produces: absolute social-card images, a homepage `@graph`, stable Person references from blog posts, and followable owned-profile links.

- [x] **Step 1: Update the homepage search title**

Set:

```yaml
seo_title: Hao Zhang — Research Scientist at ByteDance | Data Systems for Agents
```

- [x] **Step 2: Emit absolute social-card image URLs**

Assign the selected Open Graph image through Liquid's `absolute_url` filter and reuse it for both `og:image` and `twitter:image`.

- [x] **Step 3: Replace the generic Schema.org object with page-specific JSON-LD**

Use Liquid's `jsonify` filter for every generated string. On `/`, emit an `@graph` with:

```json
[
  {"@type": "WebSite", "@id": "https://h20zhang.github.io/#website"},
  {"@type": "ProfilePage", "@id": "https://h20zhang.github.io/#profile"},
  {
    "@type": "Person",
    "@id": "https://h20zhang.github.io/#person",
    "name": "Hao Zhang",
    "alternateName": ["张颢", "H20Zhang"],
    "jobTitle": "Research Scientist",
    "worksFor": {"@type": "Organization", "name": "ByteDance"},
    "alumniOf": [
      {"@type": "CollegeOrUniversity", "name": "The Chinese University of Hong Kong"},
      {"@type": "CollegeOrUniversity", "name": "Wuhan University"}
    ],
    "sameAs": [
      "https://github.com/H20Zhang",
      "https://scholar.google.com/citations?user=PLwImrcAAAAJ",
      "https://www.linkedin.com/in/hao-zhang-ab18b413b"
    ]
  }
]
```

On documents whose Jekyll collection is `posts`, emit `BlogPosting` with an author object containing `@type: Person`, the stable `@id`, `name: Hao Zhang`, and the canonical homepage `url`. Emit `WebPage` for year/tag/category archives and other pages rather than classifying content by URL shape.

- [x] **Step 4: Remove `nofollow` only from owned identity links**

Convert `external_links.rel` to the plugin's section form, keep the default value `external nofollow noopener`, and exclude the exact GitHub, Scholar, and LinkedIn URLs from rel mutation. Keep `_blank` targeting unchanged for external links.

- [x] **Step 5: Rebuild and move the complete contract to green**

Run the configured Jekyll build, then:

```bash
python3 -m unittest discover -s tests -v
python3 scripts/check_internal_links.py _site
git diff --check
```

Expected: all tests pass; the build produces 41 HTML files; all internal links and anchors are valid; the JSON-LD payload parses; only the three owned identity links are free of `nofollow`; and the diff has no whitespace errors.

- [x] **Step 6: Commit the SEO change and plan**

```bash
git add _pages/about.md _includes/metadata.liquid _config.yml docs/superpowers/plans/2026-08-14-cv-tqex-seo-implementation.md
git commit -m "Strengthen homepage identity metadata"
```

---

### Task 5: Final requirements and branch verification

**Files:**
- Modify: `_includes/metadata.liquid`
- Modify: `tests/test_built_site_contract.py`
- Modify: `docs/superpowers/plans/2026-08-14-cv-tqex-seo-implementation.md`

**Interfaces:**
- Consumes: all committed changes and the original approved scope.
- Produces: a verified, unmerged, unpublished feature branch ready for user review.

- [x] **Step 1: Run the full verification sequence from a clean generated site**

Delete only the generated worktree-local `_site` directory through Jekyll's own clean command, rebuild, run all Python tests, run the internal-link checker, and run `git diff --check`.

- [x] **Step 2: Inspect rendered public surfaces**

Check `/`, `/cv/`, `/projects/`, `/projects/2_tqex/`, `/projects/3_ges/`, and `/publications/` for copy hierarchy, card order, research-thread links, title metadata, JSON-LD parsing, and absence of `GES @ Huawei Cloud` as a public system label.

- [x] **Step 3: Resolve independent structured-data review findings**

Add a failing built-site test proving that `/blog/2026/` is a `WebPage` with `og:type=website`, while the two source posts remain `BlogPosting`. Add a second failing author-contract assertion requiring `@type`, stable `@id`, `name`, and `url` in each post's author object. Replace URL-shape post detection with `page.collection == 'posts'`, embed the complete author identity, rebuild, and confirm both focused tests pass.

- [x] **Step 4: Review branch scope**

Run `git status --short`, `git log --oneline master..HEAD`, and `git diff --stat master...HEAD`. Confirm the earlier homepage-photo branch and the dirty main checkout were not modified or merged.
