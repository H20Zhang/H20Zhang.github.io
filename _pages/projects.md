---
layout: page
title: Systems
permalink: /projects/
description: Agent harnesses, search platforms, and data-processing engines.
nav: true
nav_order: 2
---

[Papers by research area →](/publications/)

<div class="projects">
  <div class="systems-list">
    {% for group in site.data.systems_catalog %}
      <section class="systems-group" aria-labelledby="systems-{{ group.id }}">
        <h2 class="systems-group-label" id="systems-{{ group.id }}">{{ group.label }}</h2>
        {% for system in group.systems %}
          {% include systems_catalog_entry.liquid system=system %}
        {% endfor %}
      </section>
    {% endfor %}
  </div>
</div>
