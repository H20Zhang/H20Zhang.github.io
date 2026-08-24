from __future__ import annotations

from html.parser import HTMLParser
import json
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "_site"

EN_PATH = Path("blog/2026/shared-information-world-ai-agents/index.html")
ZH_PATH = Path("blog/2026/shared-information-world-ai-agents-zh/index.html")
EN_URL = "https://h20zhang.github.io/blog/2026/shared-information-world-ai-agents/"
ZH_URL = "https://h20zhang.github.io/blog/2026/shared-information-world-ai-agents-zh/"
PERSON_ID = "https://h20zhang.github.io/#person"


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.html_lang = ""
        self.links: list[dict[str, str]] = []
        self.metas: list[dict[str, str]] = []
        self.json_ld: list[str] = []
        self.title_parts: list[str] = []
        self._in_json_ld = False
        self._json_ld_parts: list[str] = []
        self._in_title = False

    def handle_starttag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        attributes = {key: value or "" for key, value in attrs}
        if tag == "html":
            self.html_lang = attributes.get("lang", "")
        elif tag == "link":
            self.links.append(attributes)
        elif tag == "meta":
            self.metas.append(attributes)
        elif tag == "title":
            self._in_title = True
        elif tag == "script" and attributes.get("type") == "application/ld+json":
            self._in_json_ld = True
            self._json_ld_parts = []

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False
        elif tag == "script" and self._in_json_ld:
            self.json_ld.append("".join(self._json_ld_parts))
            self._in_json_ld = False
            self._json_ld_parts = []

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title_parts.append(data)
        if self._in_json_ld:
            self._json_ld_parts.append(data)

    @property
    def title(self) -> str:
        return "".join(self.title_parts).strip()


def parse_page(relative_path: Path) -> PageParser:
    path = SITE / relative_path
    if not path.exists():
        raise AssertionError(f"missing built page: {path}")
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


def meta_content(page: PageParser, attribute: str, key: str) -> str:
    return next(
        meta.get("content", "")
        for meta in page.metas
        if meta.get(attribute) == key
    )


def href_by_hreflang(page: PageParser) -> dict[str, str]:
    return {
        link.get("hreflang", ""): link.get("href", "")
        for link in page.links
        if link.get("rel") == "alternate" and link.get("hreflang")
    }


class BlogSeoContractTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        homepage = SITE / "index.html"
        if not homepage.exists():
            raise AssertionError("run the Jekyll build before blog SEO tests")
        cls.en = parse_page(EN_PATH)
        cls.zh = parse_page(ZH_PATH)

    def test_bilingual_pages_expose_language_and_hreflang(self):
        cases = (
            (self.en, "en"),
            (self.zh, "zh"),
        )
        expected_hreflang = {
            "en": EN_URL,
            "zh": ZH_URL,
            "x-default": EN_URL,
        }

        for page, language in cases:
            with self.subTest(language=language):
                self.assertEqual(page.html_lang, language)
                self.assertEqual(href_by_hreflang(page), expected_hreflang)

    def test_each_translation_is_self_canonical(self):
        for page, expected_url in ((self.en, EN_URL), (self.zh, ZH_URL)):
            canonical = next(
                link.get("href", "")
                for link in page.links
                if link.get("rel") == "canonical"
            )
            with self.subTest(url=expected_url):
                self.assertEqual(canonical, expected_url)

    def test_blogposting_schema_has_search_metadata(self):
        for page, language in ((self.en, "en"), (self.zh, "zh")):
            self.assertEqual(len(page.json_ld), 1)
            schema = json.loads(page.json_ld[0])
            topics = {
                item["name"]
                for item in schema.get("about", [])
                if item.get("@type") == "Thing"
            }

            with self.subTest(language=language):
                self.assertEqual(schema["@type"], "BlogPosting")
                self.assertEqual(schema["inLanguage"], language)
                self.assertTrue(schema["datePublished"].startswith("2026-08-24"))
                self.assertTrue(schema["dateModified"].startswith("2026-08-24"))
                self.assertTrue(schema["image"].startswith("https://"))
                self.assertIn("context infrastructure", schema["keywords"].lower())
                self.assertEqual(
                    topics,
                    {
                        "AI agents",
                        "Context infrastructure",
                        "Shared information state",
                        "Semantic data integration",
                        "Multi-agent systems",
                    },
                )
                self.assertEqual(schema["author"]["@id"], PERSON_ID)
                self.assertEqual(schema["author"]["name"], "Hao Zhang")

    def test_open_graph_exposes_article_dates_and_locale(self):
        for page, expected_locale in ((self.en, "en_US"), (self.zh, "zh_CN")):
            with self.subTest(locale=expected_locale):
                self.assertEqual(
                    meta_content(page, "property", "og:type"),
                    "article",
                )
                self.assertEqual(
                    meta_content(page, "property", "og:locale"),
                    expected_locale,
                )
                self.assertTrue(
                    meta_content(page, "property", "article:published_time").startswith(
                        "2026-08-24"
                    )
                )
                self.assertTrue(
                    meta_content(page, "property", "article:modified_time").startswith(
                        "2026-08-24"
                    )
                )

    def test_search_titles_are_explicit(self):
        self.assertEqual(
            self.en.title,
            "Shared Information World for Humans and AI Agents | Hao Zhang",
        )
        self.assertEqual(
            self.zh.title,
            "人类与 AI Agent 的共享信息世界 | Hao Zhang",
        )

    def test_homepage_and_writing_index_surface_the_primary_essay(self):
        homepage_html = (SITE / "index.html").read_text(encoding="utf-8")
        writing_html = (SITE / "blog" / "index.html").read_text(encoding="utf-8")

        self.assertIn("shared information world", homepage_html.lower())
        self.assertIn(
            'href="/blog/2026/shared-information-world-ai-agents/"',
            homepage_html,
        )
        self.assertIn(
            "When Intelligence Becomes Abundant: Organizing the Shared Information World of Humans and AI Agents",
            writing_html,
        )
        self.assertIn(
            'href="/blog/2026/shared-information-world-ai-agents-zh/"',
            writing_html,
        )


if __name__ == "__main__":
    unittest.main()
