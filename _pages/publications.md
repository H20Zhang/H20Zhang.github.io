---
layout: page
permalink: /publications/
title: Publications
description: Papers grouped by research area, with a chronological view and search.
hide_description: true
nav: true
nav_order: 1
---

<div id="publication-explorer" class="publication-explorer">
  <div class="publication-toolbar">
    <div class="publication-search">
      {% include bib_search.liquid %}
      <button id="publication-reset" type="button" hidden aria-label="Clear search">Clear</button>
    </div>
    <div class="publication-toolbar-right">
      <div class="publication-meta-inline">
        <span id="publication-results" role="status" aria-live="polite" aria-atomic="true"></span>
        <span class="publication-meta-sep" aria-hidden="true">·</span>
        <span class="publication-author-note"><sup>^</sup> first / corresponding author</span>
      </div>
      <div class="publication-view-controls" role="group" aria-label="Group papers by" hidden>
        <button type="button" data-publication-view="area" aria-pressed="true">By topic</button>
        <button type="button" data-publication-view="year" aria-pressed="false">By year</button>
      </div>
    </div>
  </div>

  <nav class="research-area-nav" aria-label="Research areas">
    {% for area in site.data.research_areas %}
      <a href="#{{ area.id }}" data-research-area="{{ area.id }}">{{ area.title }} <span class="research-area-count">{{ area.papers.size }}</span></a>
    {% endfor %}
  </nav>

  <div id="publication-groups" class="publication-groups">
    {% research_bibliography %}
      {% bibliography --file icde27 --file papers --file adamm --file docnavrag --file rwttt --file bytex %}
    {% endresearch_bibliography %}
  </div>
  <p id="publication-empty" class="publication-empty" hidden>No papers match this search. Try a different term or clear the search.</p>
</div>
