---
layout: page
title: Systems
permalink: /projects/
description: Selected systems spanning context infrastructure for agents, production graph systems, tensor-centric execution, and earlier database/graph research.
nav: true
nav_order: 2
horizontal: true
---

These systems trace a line from distributed query and graph execution, through production graph services and accelerator-aware execution, to **self-improving context infrastructure for agents**. Each entry summarizes the problem and core system thesis; the detail pages connect that thesis to architecture, research threads, evidence, and system boundaries.

<div class="projects">
{% assign sorted_projects = site.projects | sort: "importance" %}
{% if page.horizontal %}
  <div class="systems-list">
    {% for project in sorted_projects %}
      {% if project.importance == 1 %}
        <section class="systems-group systems-group--current" aria-labelledby="systems-current">
          <h2 class="systems-group-label" id="systems-current">Current</h2>
      {% elsif project.importance == 2 %}
        </section>
        <section class="systems-group systems-group--huawei" aria-labelledby="systems-huawei">
          <h2 class="systems-group-label" id="systems-huawei">Huawei Systems</h2>
      {% elsif project.importance == 4 %}
        </section>
        <section class="systems-group systems-group--earlier" aria-labelledby="systems-earlier">
          <h2 class="systems-group-label" id="systems-earlier">Earlier Research</h2>
      {% endif %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </section>
  </div>
{% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
{% endif %}
</div>
