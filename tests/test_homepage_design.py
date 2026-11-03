from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]


def read(relative_path: str) -> str:
    return (ROOT / relative_path).read_text(encoding="utf-8")


class HomepageDesignContractTest(unittest.TestCase):
    def test_palette_tokens_are_declared(self):
        # Verify theme inputs, not the particular hex colors chosen today.
        variables = read("_sass/_variables.scss")
        for token in (
            "paper-cream-light",
            "paper-sand-light",
            "accent-color-light",
            "paper-espresso-dark",
            "paper-sand-dark",
            "accent-color-dark",
        ):
            with self.subTest(token=token):
                self.assertIn(f"${token}:", variables)

    def test_theme_exposes_surface_tokens_in_both_modes(self):
        themes = read("_sass/_themes.scss")
        for token in (
            "--global-surface-color",
            "--global-section-alt-color",
            "--global-navbar-bg-color",
            "--global-section-accent-color",
        ):
            with self.subTest(token=token):
                self.assertGreaterEqual(themes.count(token + ":"), 2)

    def test_homepage_uses_selected_editorial_structure(self):
        layout = read("_layouts/about.liquid")
        page = read("_pages/about.md")

        for class_name in (
            "about-page", "about-hero", "about-hero-copy",
            "about-hero-profile", "about-sections", "about-footer-row",
        ):
            with self.subTest(class_name=class_name):
                self.assertIn(f'class="{class_name}"', layout)

        # Editorial copy is meant to change without breaking deployment.
        self.assertRegex(page, r"(?m)^hero_title:\s*\S.+$")
        self.assertIn("hero_intro: |", page)

        section_ids = (
            "research-directions",
            "current-focus",
            "selected-systems",
            "highlights",
            "honors-awards",
            "collaboration-internship",
            "recent-news",
        )
        actual_ids = re.findall(r'<section class="about-section" aria-labelledby="([^"]+)"', page)
        self.assertEqual(tuple(actual_ids), section_ids)
        for section_id in section_ids:
            with self.subTest(section_id=section_id):
                self.assertIn(f'id="{section_id}"', page)

        self.assertEqual(page.count('class="about-section"'), len(section_ids))
        self.assertEqual(page.count('class="about-section-label"'), len(section_ids))
        self.assertEqual(page.count('class="about-section-content"'), len(section_ids))

    def test_personal_intro_and_current_project_have_distinct_roles(self):
        page = read("_pages/about.md")
        intro = page.split("hero_intro: |\n", 1)[1].split("\n\nprofile:", 1)[0]
        self.assertGreater(len(intro.split()), 10)
        self.assertLessEqual(len(intro.split()), 65)
        self.assertNotIn("AutoIA", intro)

        directions = page.split('aria-labelledby="research-directions"', 1)[1].split("</section>", 1)[0]
        self.assertEqual(directions.count('class="about-research-area"'), 4)
        self.assertNotIn("AutoIA", directions)

        focus = page.split('aria-labelledby="current-focus"', 1)[1].split("</section>", 1)[0]
        self.assertIn("AutoIA", focus)
        self.assertIn("/projects/1_autoia/", focus)

    def test_homepage_styles_are_wired_and_responsive(self):
        main = read("assets/css/main.scss")
        about_path = ROOT / "_sass/_about.scss"

        self.assertIn('@use "about";', main)
        self.assertTrue(about_path.exists(), "homepage Sass partial must exist")

        styles = read("_sass/_about.scss")
        for selector in (".about-hero", ".about-tagline", ".about-section", ".about-research-grid"):
            with self.subTest(selector=selector):
                self.assertIn(selector, styles)

        self.assertRegex(styles, r"\.about-hero\s*\{[^}]*grid-template-columns")
        self.assertRegex(styles, r"\.about-research-grid\s*\{[^}]*grid-template-columns")
        self.assertRegex(styles, r"(?s)@media\s*\(max-width:\s*\d+px\).*?\.about-research-grid\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)")


if __name__ == "__main__":
    unittest.main()
