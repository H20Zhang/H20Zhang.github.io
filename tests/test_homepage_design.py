from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


def read(relative_path: str) -> str:
    return (ROOT / relative_path).read_text(encoding="utf-8")


class HomepageDesignContractTest(unittest.TestCase):
    def test_selected_light_and_dark_palettes_are_declared(self):
        variables = read("_sass/_variables.scss").lower()

        light_palette = (
            "#fdfdfd",
            "#f7f7f7",
            "#3f5fcc",
            "#273f9f",
            "#1a1a1a",
            "#6b7280",
            "#cc4b00",
        )
        dark_palette = (
            "#241a16",
            "#2e211c",
            "#f4eadf",
            "#c2b2a7",
            "#e58b6d",
            "#f0a084",
        )

        for color in light_palette + dark_palette:
            with self.subTest(color=color):
                self.assertIn(color, variables)

    def test_theme_exposes_warm_surface_tokens(self):
        themes = read("_sass/_themes.scss")

        for token in (
            "--global-surface-color",
            "--global-section-alt-color",
            "--global-navbar-bg-color",
            "--global-section-accent-color",
        ):
            with self.subTest(token=token):
                self.assertGreaterEqual(themes.count(token), 2)

        self.assertIn("v.$accent-hover-light", themes)
        self.assertIn("v.$accent-hover-dark", themes)
        self.assertIn("rgba(229, 231, 235, 1)", themes)
        self.assertNotIn("rgba(120, 51, 34, 0.18)", themes)

    def test_homepage_uses_selected_editorial_structure(self):
        layout = read("_layouts/about.liquid")
        page = read("_pages/about.md")

        self.assertIn('class="about-page"', layout)
        self.assertIn('class="about-hero"', layout)
        self.assertIn('class="about-hero-copy"', layout)
        self.assertIn('class="about-hero-profile"', layout)
        self.assertIn('class="about-sections"', layout)
        self.assertIn('class="about-footer-row"', layout)
        self.assertIn("hero_title: Data systems for agents.", page)
        self.assertIn("hero_intro:", page)
        self.assertEqual(page.count('class="about-section"'), 5)
        self.assertEqual(page.count('class="about-section-label"'), 5)
        self.assertEqual(page.count('class="about-section-content"'), 5)

    def test_homepage_styles_are_wired_and_responsive(self):
        main = read("assets/css/main.scss")
        about_path = ROOT / "_sass/_about.scss"

        self.assertIn('@use "about";', main)
        self.assertTrue(about_path.exists(), "homepage Sass partial must exist")

        styles = read("_sass/_about.scss")
        self.assertIn("grid-template-columns: minmax(0, 2fr) minmax(230px, 0.9fr)", styles)
        self.assertIn("grid-template-columns: 176px minmax(0, 1fr)", styles)
        self.assertIn("var(--global-section-alt-color)", styles)
        self.assertIn("color: var(--global-section-accent-color)", styles)
        self.assertIn("@media (max-width: 767px)", styles)
        self.assertIn("@media (max-width: 575px)", styles)


if __name__ == "__main__":
    unittest.main()
