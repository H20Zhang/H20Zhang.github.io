# Research navigation

`_bibliography/*.bib` remains the source of bibliographic facts. `_data/research_areas.yml` assigns each paper one primary research area; this is not a statement of project affiliation. Project attribution remains in `_projects/`.

The `research_bibliography` Liquid block organizes the existing Jekyll-Scholar HTML during the build. Missing, duplicate, and unknown paper assignments fail the build with an actionable message. Every paper appears once, with its original ID, authorship, status, resource links, and BibTeX.

The browser can move those same entries into a year view, search them, and resolve both `#paper-id` and `?paper=paper-id`. Research-area links also work without JavaScript. No duplicate bibliography is maintained.

To add a paper, update its BibTeX source and add its key to exactly one primary area. Rebuild and run `python3 -m unittest discover -s tests -p 'test_*.py'` plus the internal-link check. Check research-area links, year view, search/no results/reset, paper deep links, and disclosure controls on desktop and mobile.

Homepage news and the archive both render `_includes/news.liquid` from `_news/`. The `hao_date` filter displays timestamps in UTC+8 independent of the build host timezone. Month-only announcements use `date_precision: month`; their first-of-month timestamp is an ordering key, not an asserted day of announcement.
