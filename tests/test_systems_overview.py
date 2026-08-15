from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


def read(relative_path: str) -> str:
    return (ROOT / relative_path).read_text(encoding="utf-8")


class SystemsOverviewContractTest(unittest.TestCase):
    def test_overview_data_covers_all_system_groups(self):
        overview = read("_data/systems_overview.yml")

        for title in (
            "AutoIA @ ByteDance",
            "GES @ Huawei",
            "TQEX @ Huawei",
            "Database & Graph Research Systems @ CUHK",
        ):
            with self.subTest(title=title):
                self.assertIn(f'"{title}":', overview)

        self.assertIn("external information environment", overview)
        self.assertIn("3,000×", overview)
        self.assertIn("tensor runtimes", overview)
        self.assertIn("SeccoSQL", overview)

    def test_overview_template_exposes_narrative_and_detail_cta(self):
        template = read("_includes/projects_horizontal.liquid")

        self.assertIn("site.data.systems_overview[project.title]", template)
        self.assertIn('class="system-entry-narrative"', template)
        self.assertIn('class="system-entry-meta-label">Core idea', template)
        self.assertIn('class="system-entry-meta-label">Research', template)
        self.assertIn('class="system-entry-explore"', template)
        self.assertIn("Explore system", template)
        self.assertNotIn("system-entry-research", template)

    def test_systems_styles_are_wired_without_replacing_editorial_list(self):
        main = read("assets/css/main.scss")
        styles = read("_sass/_systems.scss")

        self.assertIn('@use "systems";', main)
        self.assertIn(".system-entry-narrative", styles)
        self.assertIn(".system-entry-core-idea", styles)
        self.assertIn(".system-entry-paper-links", styles)
        self.assertIn(".system-entry-explore", styles)
        self.assertNotIn("border-radius", styles)
        self.assertNotIn("box-shadow", styles)


if __name__ == "__main__":
    unittest.main()
