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
    "https://www.linkedin.com/in/hao-zhang-ab18b413b",
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
    pattern = re.compile(rf"(?<![\w-]){re.escape(selector)}\{{([^{{}}]+)\}}")
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
    pattern = re.compile(rf"(?<![\w-]){re.escape(selector)}\{{([^{{}}]+)\}}")
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
            "Hao Zhang — Research Scientist at ByteDance | Data Systems for Agents",
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

    def test_light_theme_uses_silver_iris_palette(self):
        root_rule = compiled_css_rule(self.css, ":root")
        expected = {
            "--global-bg-color": "#f8f9fb",
            "--global-surface-color": "#f8f9fb",
            "--global-section-alt-color": "#eceff4",
            "--global-navbar-bg-color": "#f8f9fb",
            "--global-text-color": "#20252d",
            "--global-text-color-light": "#656b75",
            "--global-theme-color": "#445b8c",
            "--global-hover-color": "#293a5a",
            "--global-divider-color": "rgba(68, 91, 140, 0.22)",
        }

        for property_name, value in expected.items():
            with self.subTest(property_name=property_name):
                self.assertEqual(root_rule.get(property_name), value)

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
            "Huawei Cloud Database Innovation Lab",
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
