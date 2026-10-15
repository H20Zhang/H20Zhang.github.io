---
layout: page
title: Systems
permalink: /projects/
description: Systems for evolving agent working environments, semantic queries, graph databases, and accelerator-native execution.
nav: true
nav_order: 2
---

My systems research spans **external working environments for AI agents**, semantic query processing, graph databases, and accelerator-native execution. These are distinct systems and research lines, not components of one deployed stack.

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
