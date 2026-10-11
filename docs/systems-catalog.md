# Systems catalog

The navigation label is **Systems**; its stable URL remains `/projects/`.

`_data/systems_catalog.yml` is the source for the active Systems index. Each entry names a concrete platform, engine, or implemented research framework, gives a brief purpose, and links to its existing overview, paper, or code. Groups organize system functions, not employers. Add an affiliation only when the system attribution has been reviewed; do not infer it from publication date, current employment, or topic similarity.

Benchmarks and method-only work remain in Publications. Specifically, DocNavRAG, VeloANN, and SQLVec are not standalone entries in Systems; their papers remain in Publications. TGraph and TenGraph are separate graph systems, not components of TQEX. The research-area bibliography, paper IDs, publication status, and authorship are unchanged.

The older project detail pages retain their URLs and reviewed paper associations. The Independent Research page is kept for legacy links, but is no longer an item in Systems or the homepage's selected systems. The older `systems_overview.yml` data and generic project template remain for compatibility; they do not drive the active Systems index.

After changing the catalog, build the site and run the Python contract tests and internal-link check. Verify desktop/mobile layout, homepage system anchors, paper deep links, and the old detail URLs. New catalog anchors use a scroll margin so the fixed navbar does not cover system titles.
