---
layout: page
permalink: /publications/
title: Publications
description: Papers grouped by research area, with a chronological view and search.
nav: true
nav_order: 1
---

<div id="publication-explorer" class="publication-explorer">
  <nav class="research-area-nav" aria-label="Research areas">
    {% for area in site.data.research_areas %}
      <a href="#{{ area.id }}" data-research-area="{{ area.id }}">{{ area.title }} <span class="research-area-count">{{ area.papers.size }}</span></a>
    {% endfor %}
  </nav>
  <div class="publication-tools">
    <div class="publication-search">
      {% include bib_search.liquid %}
      <p class="publication-search-hint">Search by title, author, venue, or year.</p>
    </div>
    <div class="publication-view-controls" role="group" aria-label="Group papers by" hidden>
      <button type="button" data-publication-view="area" aria-pressed="true">By research area</button>
      <button type="button" data-publication-view="year" aria-pressed="false">By year</button>
    </div>
  </div>
  <div class="publication-status-row">
    <p class="publication-author-note"><sup>^</sup> marks papers where Hao Zhang is a first author or corresponding author.</p>
    <p id="publication-results" role="status" aria-live="polite" aria-atomic="true"></p>
    <button id="publication-reset" type="button" hidden>Clear search</button>
  </div>
  <div id="publication-groups" class="publication-groups">
    {% research_bibliography %}
      {% bibliography --file icde27 --file papers --file adamm --file docnavrag --file rwttt --file bytex %}
    {% endresearch_bibliography %}
  </div>
  <p id="publication-empty" class="publication-empty" hidden>No papers match this search. Try a different term or clear the search.</p>
</div>
