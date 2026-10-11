---
layout: page
title: Systems
permalink: /projects/
description: Selected systems and research frameworks, from agent harnesses and vector search to query engines and distributed graph analytics.
nav: true
nav_order: 2
---

I build systems that turn research ideas into reusable capabilities. The selection below includes production platforms and research systems; [Publications](/publications/) contains the full research record, organized by area.

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
