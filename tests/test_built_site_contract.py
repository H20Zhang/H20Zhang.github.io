from __future__ import annotations

from html.parser import HTMLParser
import json
from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "_site"

PERSON_ID = "https://h20zhang.github.io/#person"
IDENTITY_URLS = {
    "https://github.com/H20Zhang",
    "https://scholar.google.com/citations?user=PLwImrcAAAAJ",
    "https://www.linkedin.com/in/hao-zhang-ai",
}
TQEX_PAPERS = {
    "/publications/#SIGMOD-26-2",
    "/publications/#VLDB-24",
    "/publications/#SIGMOD-25-2",
    "/publications/#SIGMOD-26-1",
}
GES_RELATED_GRAPH_PAPERS = {
    "/publications/#ICDE-24-1",
    "/publications/#ICDE-24-2",
    "/publications/#DASFAA-25",
}
BLOG_POST_PATHS = (
    Path("blog/2026/next-gen-agent-en/index.html"),
    Path("blog/2026/next-gen-agent-zh/index.html"),
)


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.anchors: list[dict[str, str]] = []
        self.buttons: list[dict[str, str]] = []
        self.images: list[dict[str, str]] = []
        self.json_ld: list[str] = []
        self.metas: list[dict[str, str]] = []
        self.title_parts: list[str] = []
        self.selected_systems_text_parts: list[str] = []
        self.selected_systems_items = 0
        self._in_json_ld = False
        self._json_ld_parts: list[str] = []
        self._in_title = False
        self._selected_systems_depth = 0

    def handle_starttag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        attributes = {key: value or "" for key, value in attrs}

        if tag == "a":
            self.anchors.append(attributes)
        elif tag == "button":
            self.buttons.append(attributes)
        elif tag == "img":
            self.images.append(attributes)
        elif tag == "meta":
            self.metas.append(attributes)
        elif tag == "title":
            self._in_title = True
        elif tag == "script" and attributes.get("type") == "application/ld+json":
            self._in_json_ld = True
            self._json_ld_parts = []

        if tag == "section" and attributes.get("aria-labelledby") == "selected-systems":
            self._selected_systems_depth = 1
        elif tag == "section" and self._selected_systems_depth:
            self._selected_systems_depth += 1
        elif tag == "li" and self._selected_systems_depth:
            self.selected_systems_items += 1

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False
        elif tag == "script" and self._in_json_ld:
            self.json_ld.append("".join(self._json_ld_parts))
            self._in_json_ld = False
            self._json_ld_parts = []
        elif tag == "section" and self._selected_systems_depth:
            self._selected_systems_depth -= 1

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title_parts.append(data)
        if self._in_json_ld:
            self._json_ld_parts.append(data)
        if self._selected_systems_depth:
            self.selected_systems_text_parts.append(data)

    @property
    def title(self) -> str:
        return "".join(self.title_parts).strip()

    @property
    def selected_systems_text(self) -> str:
        return " ".join("".join(self.selected_systems_text_parts).split())


def parse_page(path: Path) -> PageParser:
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


def compiled_css_rule(css: str, selector: str) -> dict[str, str]:
    pattern = re.compile(
        rf"(?:^|\ufeff|(?<=[{{}},;]))\s*{re.escape(selector)}\{{([^{{}}]+)\}}"
    )
    match = pattern.search(css)
    if match is None:
        raise AssertionError(f"compiled CSS rule not found: {selector}")

    declarations: dict[str, str] = {}
    for declaration in match.group(1).split(";"):
        if ":" not in declaration:
            continue
        property_name, value = declaration.split(":", 1)
        declarations[property_name.strip()] = value.strip()
    return declarations


def compiled_css_cascade_rule(css: str, selector: str) -> dict[str, str]:
    pattern = re.compile(
        rf"(?:^|\ufeff|(?<=[{{}},;]))\s*{re.escape(selector)}\{{([^{{}}]+)\}}"
    )
    matches = pattern.findall(css)
    if not matches:
        raise AssertionError(f"compiled CSS rule not found: {selector}")

    declarations: dict[str, str] = {}
    for block in matches:
        for declaration in block.split(";"):
            if ":" not in declaration:
                continue
            property_name, value = declaration.split(":", 1)
            declarations[property_name.strip()] = value.strip()
    return declarations


def compiled_css_optional_cascade_rule(css: str, selector: str) -> dict[str, str]:
    pattern = re.compile(
        rf"(?:^|\ufeff|(?<=[{{}},;]))\s*{re.escape(selector)}\{{([^{{}}]+)\}}"
    )
    declarations: dict[str, str] = {}
    for block in pattern.findall(css):
        for declaration in block.split(";"):
            if ":" not in declaration:
                continue
            property_name, value = declaration.split(":", 1)
            declarations[property_name.strip()] = value.strip()
    return declarations

class BuiltSiteContractTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        homepage = SITE / "index.html"
        if not homepage.exists():
            raise AssertionError("run the Jekyll build before built-site contract tests")
        cls.homepage = parse_page(homepage)
        cls.css = (SITE / "assets" / "css" / "main.css").read_text(
            encoding="utf-8"
        )

    def test_homepage_schema_identifies_hao_zhang(self):
        self.assertEqual(
            self.homepage.title,
            "Hao Zhang — Research Scientist at ByteDance | Context Infrastructure for Agents",
        )
        self.assertEqual(len(self.homepage.json_ld), 1)

        schema = json.loads(self.homepage.json_ld[0])
        graph = schema.get("@graph", [])
        nodes_by_type = {node.get("@type"): node for node in graph}
        self.assertEqual(
            set(nodes_by_type),
            {"WebSite", "ProfilePage", "Person"},
        )

        person = nodes_by_type["Person"]
        self.assertEqual(person["@id"], PERSON_ID)
        self.assertEqual(set(person["alternateName"]), {"张颢", "H20Zhang"})
        self.assertEqual(person["worksFor"]["name"], "ByteDance")
        self.assertEqual(set(person["sameAs"]), IDENTITY_URLS)

        og_image = next(
            meta.get("content", "")
            for meta in self.homepage.metas
            if meta.get("property") == "og:image"
        )
        self.assertTrue(og_image.startswith("https://"), og_image)

    def test_generated_main_stylesheet_uses_build_specific_cache_key(self):
        homepage_html = (SITE / "index.html").read_text(encoding="utf-8")
        stylesheet = re.search(
            r'href="/assets/css/main\.css\?v=([^"]+)"', homepage_html
        )

        self.assertIsNotNone(stylesheet)
        self.assertRegex(stylesheet.group(1), r"^\d{10}$")
        self.assertNotEqual(
            stylesheet.group(1), "d41d8cd98f00b204e9800998ecf8427e"
        )

    def test_light_theme_uses_cobalt_mandarin_palette(self):
        root_rule = compiled_css_rule(self.css, ":root")
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

        for property_name, value in expected.items():
            with self.subTest(property_name=property_name):
                actual = root_rule.get(property_name, "")
                self.assertEqual(
                    re.sub(r"\s+", "", actual),
                    re.sub(r"\s+", "", value),
                )

    def test_homepage_profile_contact_uses_primary_interaction_color(self):
        contact_rule = compiled_css_cascade_rule(
            self.css, ".profile .more-info a"
        )

        self.assertEqual(
            contact_rule.get("color"), "var(--global-theme-color)"
        )

    def test_bold_text_inside_links_inherits_link_color(self):
        linked_emphasis_rule = compiled_css_cascade_rule(self.css, "a strong")

        self.assertEqual(linked_emphasis_rule.get("color"), "inherit")

    def test_about_and_cv_render_requested_emphasis_and_advisor_links(self):
        homepage_html = (SITE / "index.html").read_text(encoding="utf-8")
        cv_html = (SITE / "cv" / "index.html").read_text(encoding="utf-8")

        self.assertRegex(
            homepage_html,
            r'<a href="https://ldbcouncil.org/benchmarks/snb/interactive/2024-09-16-graph-engine-service-sf300/"[^>]*>'
            r'<strong>declarative</strong>, 2024</a>',
        )
        self.assertRegex(
            homepage_html,
            r'<a href="https://ldbcouncil.org/benchmarks/snb/interactive/2025-12-01-graph-engine-service-sf300/"[^>]*>'
            r'<strong>imperative</strong>, 2025</a>',
        )
        self.assertRegex(
            cv_html,
            r'<a href="https://zh.wikipedia.org/zh-cn/%E6%AD%A6%E6%B1%89%E5%A4%A7%E5%AD%A6%E5%BC%98%E6%AF%85%E5%AD%A6%E5%A0%82"[^>]*>'
            r'<strong>Hongyi Honor School</strong></a>',
        )
        self.assertRegex(
            cv_html,
            r'<a href="https://www.se.cuhk.edu.hk/people/academic-staff/prof-yu-xu-jeffrey/"[^>]*>'
            r'<strong>Prof. Jeffrey Xu Yu</strong></a>',
        )
        self.assertRegex(
            cv_html,
            r'<a href="https://www.se.cuhk.edu.hk/people/academic-staff/prof-cheng-hong/"[^>]*>'
            r'<strong>Prof. Hong Cheng</strong></a>',
        )

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
            "clamp(1.85rem,3vw,2.15rem)",
        )
        self.assertEqual(tagline_rule.get("font-weight"), "400")
        self.assertEqual(tagline_rule.get("line-height"), "1.14")
        self.assertEqual(tagline_rule.get("letter-spacing"), "-0.035em")

    def test_site_body_uses_regular_weight(self):
        body_rule = compiled_css_cascade_rule(self.css, "body")

        self.assertEqual(body_rule.get("font-weight"), "400")

    def test_table_prose_uses_regular_weight(self):
        table_cell_rule = compiled_css_cascade_rule(self.css, "table td")

        self.assertEqual(table_cell_rule.get("font-weight"), "400")

    def test_system_index_titles_use_regular_weight(self):
        title_rule = compiled_css_cascade_rule(
            self.css, ".projects .system-entry-title"
        )

        self.assertEqual(title_rule.get("font-weight"), "400")

    def test_system_metadata_uses_about_editorial_hierarchy(self):
        meta_rule = compiled_css_rule(self.css, ".projects .system-entry-meta")
        self.assertEqual(meta_rule.get("font-size"), ".94rem")
        self.assertEqual(meta_rule.get("line-height"), "1.62")

        label_rule = compiled_css_rule(
            self.css, ".projects .system-entry-meta-label"
        )
        expected_label = {
            "color": "var(--global-section-accent-color)",
            "font-size": ".75rem",
            "font-weight": "600",
            "letter-spacing": ".015em",
            "line-height": "1.45",
            "text-transform": "uppercase",
        }
        for property_name, value in expected_label.items():
            with self.subTest(property_name=property_name):
                self.assertEqual(label_rule.get(property_name), value)

        core_idea_rule = compiled_css_rule(
            self.css,
            ".projects .system-entry-core-idea .system-entry-meta-content",
        )
        self.assertEqual(
            core_idea_rule.get("color"), "var(--global-text-color)"
        )

        research_link_rule = compiled_css_rule(
            self.css, ".projects .system-entry-paper-links a"
        )
        self.assertEqual(
            research_link_rule.get("color"), "var(--global-theme-color)"
        )
        self.assertEqual(research_link_rule.get("font-weight"), "500")

        separator_rule = compiled_css_rule(
            self.css, ".projects .system-entry-link-separator"
        )
        self.assertEqual(
            separator_rule.get("color"), "var(--global-text-color-light)"
        )

    def test_systems_and_writing_share_editorial_list_typography(self):
        expected_titles = {
            "font-size": "1.55rem",
            "font-weight": "400",
            "line-height": "1.3",
        }
        expected_narratives = {
            "font-size": "1rem",
            "font-weight": "400",
            "line-height": "1.68",
            "color": "var(--global-text-color)",
        }

        for selector in (
            ".projects .system-entry-title",
            ".blog-index .blog-post-title",
        ):
            rule = compiled_css_rule(self.css, selector)
            with self.subTest(selector=selector):
                for property_name, value in expected_titles.items():
                    self.assertEqual(rule.get(property_name), value)

                responsive_rule = compiled_css_cascade_rule(self.css, selector)
                self.assertEqual(responsive_rule.get("font-size"), "1.35rem")

        for selector in (
            ".projects .system-entry-narrative",
            ".blog-index .blog-post-description",
        ):
            rule = compiled_css_cascade_rule(self.css, selector)
            with self.subTest(selector=selector):
                for property_name, value in expected_narratives.items():
                    self.assertEqual(rule.get(property_name), value)

        forbidden_modifier_properties = {
            ".projects .system-entry--primary .system-entry-title": {"font-size"},
            ".projects .system-entry--earlier .system-entry-title": {"font-size"},
            ".projects .system-entry--primary .system-entry-narrative": {
                "color",
                "font-size",
            },
        }
        for selector, forbidden_properties in forbidden_modifier_properties.items():
            rule = compiled_css_optional_cascade_rule(self.css, selector)
            with self.subTest(selector=selector):
                self.assertTrue(forbidden_properties.isdisjoint(rule))

    def test_structural_labels_use_mandarin_accent(self):
        for selector in (
            ".projects .systems-group-label",
            ".blog-index .blog-section-label",
            ".publications h2.bibliography",
            ".cv-editorial .cv-section-title",
            ".research-thread-label",
            ".essay-page .essay-sidebar-label",
        ):
            rule = compiled_css_cascade_rule(self.css, selector)
            with self.subTest(selector=selector):
                self.assertEqual(
                    rule.get("color"),
                    "var(--global-section-accent-color)",
                )

    def test_publication_years_share_rows_with_their_lists(self):
        publications_html = (SITE / "publications" / "index.html").read_text(
            encoding="utf-8"
        )
        self.assertRegex(
            publications_html,
            r'<h2 class="bibliography">2026</h2>\s*'
            r'<ol class="bibliography">',
        )

        grid_rule = compiled_css_rule(self.css, ".publications")
        self.assertEqual(grid_rule.get("display"), "grid")
        self.assertEqual(
            re.sub(
                r"\s+",
                "",
                grid_rule.get("grid-template-columns", ""),
            ),
            "6remminmax(0,1fr)",
        )
        self.assertEqual(grid_rule.get("column-gap"), "2rem")

        year_rule = compiled_css_rule(
            self.css, ".publications h2.bibliography"
        )
        list_rule = compiled_css_rule(
            self.css, ".publications ol.bibliography"
        )
        self.assertEqual(year_rule.get("grid-column"), "1")
        self.assertEqual(list_rule.get("grid-column"), "2")
        self.assertEqual(year_rule.get("font-size"), ".75rem")
        self.assertEqual(year_rule.get("letter-spacing"), ".015em")
        self.assertEqual(year_rule.get("line-height"), "1.45")
        self.assertEqual(year_rule.get("margin"), "2.35rem 0 0")
        self.assertEqual(list_rule.get("margin"), year_rule.get("margin"))
        self.assertEqual(year_rule.get("padding"), ".8rem 0 0")
        self.assertEqual(list_rule.get("padding"), year_rule.get("padding"))
        self.assertEqual(
            list_rule.get("border-top"), year_rule.get("border-top")
        )
        self.assertEqual(list_rule.get("min-width"), "0")

        responsive_grid_rule = compiled_css_cascade_rule(
            self.css, ".publications"
        )
        self.assertEqual(
            re.sub(
                r"\s+",
                "",
                responsive_grid_rule.get("grid-template-columns", ""),
            ),
            "minmax(0,1fr)",
        )
        self.assertEqual(responsive_grid_rule.get("column-gap"), "0")

        responsive_year_rule = compiled_css_cascade_rule(
            self.css, ".publications h2.bibliography"
        )
        responsive_list_rule = compiled_css_cascade_rule(
            self.css, ".publications ol.bibliography"
        )
        self.assertEqual(responsive_year_rule.get("grid-column"), "1")
        self.assertEqual(responsive_year_rule.get("margin"), "2rem 0 0")
        self.assertEqual(responsive_list_rule.get("grid-column"), "1")
        self.assertEqual(responsive_list_rule.get("margin"), "0")
        self.assertEqual(responsive_list_rule.get("border-top"), "0")

    def test_theme_toggle_has_descriptive_accessible_name(self):
        theme_toggle = next(
            button
            for button in self.homepage.buttons
            if button.get("id") == "light-toggle"
        )

        self.assertEqual(
            theme_toggle.get("aria-label"), "Change color theme"
        )

    def test_homepage_profile_contact_uses_primary_interaction_color(self):
        contact_rule = compiled_css_cascade_rule(
            self.css, ".profile .more-info a"
        )

        self.assertEqual(
            contact_rule.get("color"), "var(--global-theme-color)"
        )

    def test_theme_toggle_has_descriptive_accessible_name(self):
        theme_toggle = next(
            button
            for button in self.homepage.buttons
            if button.get("id") == "light-toggle"
        )

        self.assertEqual(
            theme_toggle.get("aria-label"), "Change color theme"
        )

    def test_owned_identity_links_are_followable(self):
        anchors_by_href = {
            anchor.get("href"): anchor
            for anchor in self.homepage.anchors
            if anchor.get("href") in IDENTITY_URLS
        }
        self.assertEqual(set(anchors_by_href), IDENTITY_URLS)

        for href, anchor in anchors_by_href.items():
            with self.subTest(href=href):
                rel_tokens = anchor.get("rel", "").split()
                self.assertNotIn("nofollow", rel_tokens)

    def test_blog_posts_embed_an_identifiable_author(self):
        for relative_path in BLOG_POST_PATHS:
            page = parse_page(SITE / relative_path)
            self.assertEqual(len(page.json_ld), 1)
            schema = json.loads(page.json_ld[0])
            author = schema["author"]

            with self.subTest(path=relative_path):
                self.assertEqual(schema["@type"], "BlogPosting")
                self.assertEqual(author["@id"], PERSON_ID)
                self.assertEqual(author.get("@type"), "Person")
                self.assertEqual(author.get("name"), "Hao Zhang")
                self.assertEqual(author.get("url"), "https://h20zhang.github.io/")

    def test_archives_and_standard_pages_are_not_blog_posts(self):
        for relative_path in (
            Path("blog/2026/index.html"),
            Path("projects/index.html"),
        ):
            page = parse_page(SITE / relative_path)
            self.assertEqual(len(page.json_ld), 1)
            schema = json.loads(page.json_ld[0])
            og_type = next(
                meta.get("content")
                for meta in page.metas
                if meta.get("property") == "og:type"
            )

            with self.subTest(path=relative_path):
                self.assertEqual(schema["@type"], "WebPage")
                self.assertEqual(og_type, "website")

    def test_homepage_presents_huawei_systems_as_independent_items(self):
        self.assertEqual(self.homepage.selected_systems_items, 4)
        self.assertIn("GES @ Huawei", self.homepage.selected_systems_text)
        self.assertIn("TQEX @ Huawei", self.homepage.selected_systems_text)
        self.assertNotIn("Huawei-era systems", self.homepage.selected_systems_text)

    def test_homepage_uses_cycling_profile_photo(self):
        cycling_images = [
            image
            for image in self.homepage.images
            if image.get("src", "").split("?", 1)[0].endswith(
                "/assets/img/homepage-cycling.jpeg"
            )
        ]
        self.assertEqual(len(cycling_images), 1)
        self.assertEqual(
            cycling_images[0].get("alt"),
            "Hao Zhang cycling on the Tianfu Greenway",
        )

    def test_homepage_full_bleed_sections_do_not_use_scrollbar_width(self):
        rule = compiled_css_rule(self.css, ".about-section")

        self.assertEqual(
            rule.get("background-color"), "var(--about-section-background)"
        )
        self.assertEqual(rule.get("clip-path"), "inset(0 -100vmax)")
        self.assertEqual(
            rule.get("box-shadow"),
            "0 0 0 100vmax var(--about-section-background)",
        )
        self.assertNotIn(".about-section::before", self.css)

    def test_long_text_uses_regular_weight_readability_styles(self):
        expected = {
            ".about-intro": {
                "font-size": "1rem",
                "font-weight": "400",
                "line-height": "1.62",
            },
            ".about-section-content": {
                "font-size": ".94rem",
                "font-weight": "400",
                "line-height": "1.62",
            },
            ".publications ol.bibliography li .author": {
                "font-weight": "400",
            },
            ".publications ol.bibliography li .periodical": {
                "font-weight": "400",
            },
        }

        for selector, properties in expected.items():
            rule = compiled_css_rule(self.css, selector)
            with self.subTest(selector=selector):
                for property_name, value in properties.items():
                    self.assertEqual(rule.get(property_name), value)

    def test_tqex_page_links_all_four_research_threads(self):
        tqex_path = SITE / "projects" / "2_tqex" / "index.html"
        self.assertTrue(tqex_path.exists(), "TQEX system detail page must be generated")

        tqex_page = parse_page(tqex_path)
        hrefs = {anchor.get("href") for anchor in tqex_page.anchors}
        self.assertTrue(TQEX_PAPERS.issubset(hrefs), TQEX_PAPERS - hrefs)

    def test_ges_page_separates_related_huawei_graph_research(self):
        ges_path = SITE / "projects" / "3_ges" / "index.html"
        ges_html = ges_path.read_text(encoding="utf-8")
        ges_page = parse_page(ges_path)
        hrefs = {anchor.get("href") for anchor in ges_page.anchors}

        self.assertIn("Related Huawei-era graph research", ges_html)
        self.assertTrue(GES_RELATED_GRAPH_PAPERS.issubset(hrefs))
        self.assertTrue(TQEX_PAPERS.isdisjoint(hrefs))

    def test_product_context_links_point_to_product_homepages(self):
        autoia_page = parse_page(SITE / "projects" / "1_autoia" / "index.html")
        ges_page = parse_page(SITE / "projects" / "3_ges" / "index.html")
        autoia_hrefs = {anchor.get("href") for anchor in autoia_page.anchors}
        ges_hrefs = {anchor.get("href") for anchor in ges_page.anchors}

        self.assertIn("https://www.volcengine.com/product/es", autoia_hrefs)
        self.assertNotIn(
            "https://www.volcengine.com/docs/6465/2096539", autoia_hrefs
        )
        self.assertIn("https://www.huaweicloud.com/product/ges.html", ges_hrefs)
        self.assertNotIn(
            "https://support.huaweicloud.com/productdesc-ges/ges_04_0001.html",
            ges_hrefs,
        )

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
            ".publications ol.bibliography li .links .btn": {
                "font-size": ".84rem"
            },
        }

        for selector, properties in expected.items():
            rule = compiled_css_cascade_rule(self.css, selector)
            with self.subTest(selector=selector):
                for property_name, value in properties.items():
                    self.assertEqual(rule.get(property_name), value)

    def test_cv_renders_as_flat_editorial_document(self):
        cv_html = (SITE / "cv" / "index.html").read_text(encoding="utf-8")

        self.assertIn('class="cv-intro"', cv_html)
        self.assertIn('class="cv-section"', cv_html)
        self.assertNotIn("Contact Information", cv_html)
        self.assertNotIn("Professional Summary", cv_html)
        self.assertNotIn('class="card mt-3 p-3"', cv_html)
        self.assertNotIn('class="badge ', cv_html)
        self.assertIn('<h2 class="cv-section-title" id="experience">', cv_html)
        self.assertNotIn('<h3 class="cv-section-title"', cv_html)
        self.assertNotIn('<h4 class="cv-entry-title"', cv_html)
        for retained_content in (
            "ByteDance",
            "Huawei",
            "The Chinese University of Hong Kong",
            "LDBC SNB Interactive benchmark world record",
        ):
            self.assertIn(retained_content, cv_html)

        section_rule = compiled_css_rule(self.css, ".cv-editorial .cv-section")
        self.assertEqual(
            section_rule.get("border-bottom"),
            "1px solid var(--global-divider-color)",
        )

    def test_systems_page_is_a_hierarchical_index(self):
        systems_html = (SITE / "projects" / "index.html").read_text(
            encoding="utf-8"
        )

        for label in ("Current", "Huawei Systems", "Earlier Research"):
            self.assertIn(f">{label}<", systems_html)
        for system in (
            "AutoIA @ ByteDance",
            "GES @ Huawei",
            "TQEX @ Huawei",
            "Database &amp; Graph Research Systems @ CUHK",
        ):
            self.assertIn(system, systems_html)
        self.assertNotIn("Research threads", systems_html)
        self.assertNotIn("system-entry-research", systems_html)

        for detail_path in (
            "1_autoia",
            "2_tqex",
            "3_ges",
            "4_database_graph_systems",
        ):
            detail_html = (
                SITE / "projects" / detail_path / "index.html"
            ).read_text(encoding="utf-8")
            with self.subTest(detail_path=detail_path):
                self.assertIn("Research Threads", detail_html)

    def test_writing_index_uses_a_flat_editorial_entry(self):
        writing_html = (SITE / "blog" / "index.html").read_text(
            encoding="utf-8"
        )

        self.assertIn("<h1>Writing</h1>", writing_html)
        self.assertIn("<title>Writing | Hao Zhang</title>", writing_html)
        self.assertIn('<h2 class="blog-section-label">Essays</h2>', writing_html)
        self.assertIn('class="blog-translation-link"', writing_html)
        self.assertNotIn("blog-year-chip", writing_html)
        self.assertNotIn("blog-tag-chips", writing_html)
        self.assertNotIn("#RAG", writing_html)
        self.assertNotIn("#Information Architecture", writing_html)
        self.assertFalse((SITE / "blog" / "tag" / "rag" / "index.html").exists())
        self.assertFalse(
            (SITE / "blog" / "tag" / "information-architecture" / "index.html").exists()
        )
        self.assertTrue(
            (SITE / "blog" / "tag" / "agent-infrastructure" / "index.html").exists()
        )
        self.assertTrue(
            (SITE / "blog" / "tag" / "knowledge-organization" / "index.html").exists()
        )

        entry_rule = compiled_css_rule(self.css, ".blog-index .blog-post-entry")
        self.assertEqual(entry_rule.get("background"), "rgba(0,0,0,0)")
        self.assertEqual(entry_rule.get("border-radius"), "0")
        self.assertNotIn("box-shadow", entry_rule)

    def test_publication_controls_use_descriptive_labels(self):
        publications_html = (SITE / "publications" / "index.html").read_text(
            encoding="utf-8"
        )

        self.assertNotIn("Full List", publications_html)
        self.assertIn(">Abstract</button>", publications_html)
        self.assertIn(">BibTeX</button>", publications_html)
        self.assertIn('type="button" aria-expanded="false"', publications_html)
        self.assertIn('aria-controls="ICDE-26-abstract"', publications_html)
        self.assertIn('id="ICDE-26-abstract" hidden', publications_html)
        self.assertNotIn('<a class="abstract btn', publications_html)
        self.assertNotIn('<a class="bibtex btn', publications_html)
        self.assertIn('placeholder="Filter publications"', publications_html)

        button_rule = compiled_css_rule(
            self.css, ".publications ol.bibliography li .links .btn"
        )
        self.assertEqual(button_rule.get("font-size"), ".84rem")

    def test_homepage_profile_metadata_avoids_repeating_the_hero(self):
        homepage_html = (SITE / "index.html").read_text(encoding="utf-8")
        more_info = re.search(
            r'<div class="more-info">(.*?)</div>', homepage_html, re.DOTALL
        )
        self.assertIsNotNone(more_info)
        profile_metadata = more_info.group(1)

        self.assertIn("zhanghaowuda12@gmail.com", profile_metadata)
        self.assertNotIn("Research Scientist, ByteDance", profile_metadata)
        self.assertNotIn("Data systems for agents.", profile_metadata)

        social_rule = compiled_css_rule(
            self.css, ".about-footer-social .contact-icons"
        )
        self.assertEqual(social_rule.get("font-size"), "1.1rem")


if __name__ == "__main__":
    unittest.main()
