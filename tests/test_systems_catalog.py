"""Validate system selection, links, attribution, and stable legacy URLs."""
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / '_site'


class CatalogParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.entries = []
        self.hrefs = []
        self.current = None
        self.in_title = False

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == 'article' and 'system-entry' in attrs.get('class', '').split():
            self.current = {'id': attrs.get('id'), 'title': [], 'links': []}
        if tag == 'h3' and self.current is not None:
            self.in_title = True
        if tag == 'a':
            self.hrefs.append(attrs.get('href', ''))
            if self.current is not None:
                self.current['links'].append(attrs.get('href', ''))

    def handle_endtag(self, tag):
        if tag == 'h3':
            self.in_title = False
        if tag == 'article' and self.current is not None:
            self.current['title'] = ' '.join(''.join(self.current['title']).split())
            self.entries.append(self.current)
            self.current = None

    def handle_data(self, text):
        if self.in_title and self.current is not None:
            self.current['title'].append(text)


def parse(path):
    result = CatalogParser()
    result.feed(path.read_text(encoding='utf-8'))
    return result


class SystemsCatalogTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Ruby is already required by the site build; avoid a new Python dependency.
        source = subprocess.check_output([
            'ruby', '-rjson', '-ryaml', '-e',
            'puts JSON.generate(YAML.safe_load_file(ARGV.fetch(0)))',
            str(ROOT / '_data/systems_catalog.yml'),
        ], text=True)
        cls.groups = json.loads(source)
        cls.systems = [system for group in cls.groups for system in group['systems']]
        cls.page = parse(SITE / 'projects/index.html')

    def test_each_catalog_system_is_rendered_once_in_order(self):
        expected = [system['id'] for system in self.systems]
        actual = [entry['id'] for entry in self.page.entries]
        self.assertEqual(actual, expected)
        self.assertTrue(all(count == 1 for count in Counter(actual).values()))
        for system, entry in zip(self.systems, self.page.entries):
            with self.subTest(system=system['id']):
                title = system['name']
                if system.get('affiliation'):
                    title += ' @ ' + system['affiliation']
                self.assertEqual(entry['title'], title)
                self.assertIn(system['url'], entry['links'])
                for link in system['links']:
                    self.assertIn(link['url'], entry['links'])

    def test_catalog_includes_systems_not_methods_or_benchmarks(self):
        names = {system['name'] for system in self.systems}
        self.assertTrue({
            'AutoIA', 'UBASE', 'SEMA', 'GES', 'TQEX',
            'TGraph', 'TenGraph', 'Vora', 'SeccoSQL', 'DISC', 'Crystal',
        }.issubset(names))
        self.assertEqual(len(names), 11)
        self.assertTrue({
            'Independent Research', 'CoreSemDB', 'GATOR', 'IGMem', 'SSW',
            'DocNavRAG', 'VeloANN', 'SQLVec', 'RW-TTT',
        }.isdisjoint(names))

    def test_affiliation_is_only_displayed_for_reviewed_systems(self):
        actual = {s['name']: s['affiliation'] for s in self.systems if s.get('affiliation')}
        self.assertEqual(actual, {
            'AutoIA': 'ByteDance', 'UBASE': 'ByteDance', 'GES': 'Huawei',
            'TQEX': 'Huawei', 'TGraph': 'Huawei', 'TenGraph': 'Huawei',
            'SeccoSQL': 'CUHK', 'DISC': 'CUHK', 'Crystal': 'CUHK',
        })

    def test_all_linked_papers_keep_their_existing_ids(self):
        html = (SITE / 'publications/index.html').read_text(encoding='utf-8')
        paper_ids = set(re.findall(r'data-paper-id="([^"]+)"', html))
        for href in self.page.hrefs:
            if href.startswith('/publications/#'):
                self.assertIn(href.split('#', 1)[1], paper_ids)
        for paper in ('COLM-26', 'Submitted-26-IGMem', 'Submitted-26-GATOR', 'Submitted-26-SSW'):
            self.assertIn(paper, paper_ids)

    def test_legacy_research_page_is_not_a_system_or_primary_entry(self):
        legacy = '/projects/5_independent_research/'
        self.assertTrue((SITE / legacy.strip('/') / 'index.html').exists())
        for path in ('index.html', 'projects/index.html', 'projects/1_autoia/index.html'):
            with self.subTest(path=path):
                self.assertNotIn(legacy, parse(SITE / path).hrefs)

    def test_homepage_system_links_target_real_catalog_entries(self):
        ids = {entry['id'] for entry in self.page.entries}
        for href in parse(SITE / 'index.html').hrefs:
            if href.startswith('/projects/#'):
                self.assertIn(href.split('#', 1)[1], ids)


if __name__ == '__main__':
    unittest.main()
