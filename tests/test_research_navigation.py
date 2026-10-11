from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / '_site'


class NavigationParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.papers = []
        self.areas = []
        self.links = []
        self.rows = []
        self._link = None
        self._row = None

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if attrs.get('id'):
            self.ids.append(attrs['id'])
        if tag == 'li' and attrs.get('data-paper-id'):
            self.papers.append(attrs)
        if tag == 'section' and attrs.get('data-area'):
            self.areas.append(attrs['data-area'])
        if tag == 'a':
            self._link = [attrs.get('href', ''), []]
        if tag == 'tr':
            self._row = []

    def handle_data(self, text):
        if self._link is not None:
            self._link[1].append(text)
        if self._row is not None:
            self._row.append(text)

    def handle_endtag(self, tag):
        if tag == 'a' and self._link is not None:
            self.links.append((self._link[0], ' '.join(''.join(self._link[1]).split())))
            self._link = None
        if tag == 'tr' and self._row is not None:
            self.rows.append(' '.join(' '.join(self._row).split()))
            self._row = None


def parse(relative_path):
    parser = NavigationParser()
    parser.feed((SITE / relative_path).read_text())
    return parser


class ResearchNavigationTest(unittest.TestCase):
    def test_every_classified_paper_is_rendered_once_without_javascript(self):
        data = (ROOT / '_data/research_areas.yml').read_text()
        keys = re.findall(r'^    - (\S+)$', data, re.M)
        areas = re.findall(r'^- id: (\S+)$', data, re.M)
        page = parse('publications/index.html')
        self.assertEqual(page.areas, areas)
        self.assertEqual(len(areas), 6)
        self.assertEqual(len(keys), 36)
        self.assertNotIn('short_title:', data)
        template = (ROOT / '_pages/publications.md').read_text()
        self.assertIn('{{ area.title }}', template)
        self.assertNotIn('area.short_title', template)
        self.assertEqual(Counter(item['data-paper-id'] for item in page.papers), Counter(keys))
        self.assertEqual(len(keys), len(set(keys)))
        for key in keys:
            self.assertEqual(page.ids.count(key), 1, key)
        for paper in page.papers:
            self.assertRegex(paper['data-year'], r'^\d{4}$')
            self.assertIn(paper['data-area'], areas)

    def test_submission_and_authorship_information_is_retained(self):
        html = (SITE / 'publications/index.html').read_text()
        for paper in ('Submitted-26-IGMem', 'Submitted-26-GATOR', 'Submitted-26-SSW'):
            self.assertIn(f'id="{paper}"', html)
        self.assertIn('Submitted to ICLR 2027, September 2026', html)
        self.assertIn('Hao Zhang is a corresponding author.', html)
        self.assertIn('data-publication-view="year"', html)

    def test_iclr_submissions_hide_openreview_and_bibtex(self):
        html = (SITE / 'publications/index.html').read_text()
        for key in ('Submitted-26-IGMem', 'Submitted-26-GATOR', 'Submitted-26-SSW'):
            entry = re.search(
                rf'<li\b[^>]*data-paper-id="{re.escape(key)}"[^>]*>(.*?)</li>',
                html, re.DOTALL,
            )
            self.assertIsNotNone(entry, key)
            block = entry.group(1)
            self.assertIn('Submitted to ICLR 2027', block)
            self.assertNotIn('openreview.net', block)
            self.assertNotIn('OpenReview', block)
            self.assertNotIn('>BibTeX<', block)
            self.assertNotIn(f'{key}-bibtex', block)

    def test_resource_labels_match_destinations(self):
        for href, label in parse('publications/index.html').links:
            if href.startswith('https://openreview.net/'):
                self.assertEqual(label, 'OpenReview')
            if href.startswith('https://scholar.google.com/scholar?'):
                self.assertEqual(label, 'Scholar search')

    def test_homepage_and_archive_share_the_same_recent_news(self):
        home = parse('index.html')
        archive = parse('news/index.html')
        self.assertEqual(len(home.rows), 4)
        self.assertEqual(home.rows, archive.rows[:4])
        self.assertTrue(any('08/2026' in row and 'DocNavRAG' in row for row in archive.rows))
        self.assertTrue(any('07/2026' in row and 'AdaMM' in row for row in archive.rows))
        self.assertTrue(any('07/2026' in row and 'CoreSemDB' in row for row in archive.rows))
        self.assertTrue(any('12/2025' in row and 'imperative' in row for row in archive.rows))

    def test_calendar_filter_is_independent_of_host_timezone(self):
        script = '''
require 'jekyll'
require_relative '_plugins/research_presentation'
f = Object.new.extend(HaoPresentation::DateFilters)
ENV['TZ'] = 'UTC'
puts f.hao_date(Time.iso8601('2025-11-30T16:00:00Z'), '%Y-%m-%d')
puts f.hao_date(Time.iso8601('2025-12-31T16:00:00Z'), '%Y-%m-%d')
puts f.hao_date(Date.new(2026, 7, 1), '%B %Y')
'''
        result = subprocess.run(['bundle', 'exec', 'ruby', '-e', script], cwd=ROOT,
                                text=True, capture_output=True, check=True)
        self.assertEqual(result.stdout.splitlines(), ['2025-12-01', '2026-01-01', 'July 2026'])

    def test_homepage_uses_primary_navigation_only_and_404_does_not_redirect(self):
        home = (SITE / 'index.html').read_text()
        self.assertNotIn('class="about-hero-actions"', home)
        self.assertIn('id="navbar"', home)
        self.assertIn('class="about-hero-profile"', home)
        error = (SITE / '404.html').read_text().lower()
        self.assertNotIn('http-equiv="refresh"', error)
        self.assertNotIn('within 3 seconds', error)


if __name__ == '__main__':
    unittest.main()
