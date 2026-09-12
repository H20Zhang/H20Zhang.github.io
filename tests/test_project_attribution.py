"""Keep independent work separate from company project paper associations."""
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
INDEPENDENT_URL = "/projects/5_independent_research/"
INDEPENDENT_PAPERS = {"Arxiv-26-4", "VLDB-26-2", "SIGMOD-26-1"}
PROJECTS = {
    "1_autoia": ("AutoIA @ ByteDance", "bytedance", {"Arxiv-26-3"}),
    "2_tqex": ("TQEX @ Huawei", "huawei", {"SIGMOD-26-2", "VLDB-24", "SIGMOD-25-2"}),
    "3_ges": ("GES @ Huawei", "huawei", {
        "SIGMOD-25-1", "VLDB-25", "SIGMOD-25-3", "VLDB-26",
        "ICDE-24-1", "ICDE-24-2", "DASFAA-25",
    }),
    "4_database_graph_systems": (
        "Database & Graph Research Systems @ CUHK", "cuhk",
        {"SIGMOD-22-1", "VLDB-20", "VLDB-18"},
    ),
    "5_independent_research": ("Independent Research", "independent", INDEPENDENT_PAPERS),
}


def read(path):
    return (ROOT / path).read_text(encoding="utf-8")


def paper_ids(text):
    return set(re.findall(r"/publications/#([A-Za-z0-9-]+)", text))


class ProjectAttributionContractTest(unittest.TestCase):
    def test_homepage_connects_context_to_collaboration(self):
        page = read("_pages/about.md")
        self.assertIn("multi-agent and human–agent collaboration", page)
        self.assertIn("build on one another's work over time", page)
        self.assertIn("Selected Projects", page)
        self.assertIn(INDEPENDENT_URL, page)
        self.assertNotIn("is the platform for this work", page)

    def test_groups_are_explicit_not_inferred_from_sort_order(self):
        page = read("_pages/projects.md")
        self.assertIn("title: Research & Systems", page)
        self.assertIn('where: "project_group", group.id', page)
        self.assertNotIn("project.importance ==", page)
        for group in ("independent", "bytedance", "huawei", "cuhk"):
            self.assertIn(f"- id: {group}", page)

    def test_paper_associations_match_reviewed_project_boundaries(self):
        overview = read("_data/systems_overview.yml")
        for slug, (title, group, expected) in PROJECTS.items():
            with self.subTest(project=slug):
                path = ROOT / "_projects" / f"{slug}.md"
                self.assertTrue(path.exists())
                page = path.read_text(encoding="utf-8")
                self.assertIn(f"project_group: {group}", page)
                self.assertEqual(paper_ids(page), expected)
                block = re.search(
                    rf'^"{re.escape(title)}":\n(.*?)(?=^"|\Z)',
                    overview, re.MULTILINE | re.DOTALL,
                )
                self.assertIsNotNone(block, title)
                self.assertTrue(paper_ids(block.group(1)).issubset(expected))
                self.assertNotIn("Huawei-era", page)
        self.assertNotIn("/publications/#COLM-26", overview)

    def test_independent_research_spans_multiple_directions(self):
        path = ROOT / "_projects/5_independent_research.md"
        self.assertTrue(path.exists())
        page = path.read_text(encoding="utf-8")
        for topic in ("Semantic query processing", "Document retrieval", "Hardware-efficient graph algorithms"):
            self.assertIn(topic, page)
        self.assertIn("academic collaborations", page)
        self.assertIn("Longer-term exploration", page)
        self.assertIn("multi-agent and human–agent collaboration", page)


if __name__ == "__main__":
    unittest.main()
