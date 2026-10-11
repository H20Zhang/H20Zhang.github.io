---
layout: page
title: Research & Systems
permalink: /projects/
description: Current research on agents, context, and memory, alongside independent collaborations and earlier work in retrieval, graph systems, and efficient execution.
nav: true
nav_order: 2
horizontal: true
project_groups:
  - id: bytedance
    label: ByteDance
  - id: independent
    label: Independent Research
  - id: huawei
    label: Huawei
  - id: cuhk
    label: CUHK
---

My current work studies how agents build and improve context, memory, and tools. It draws on a broader research record in retrieval, semantic queries, graph systems, and hardware-efficient execution.

<nav class="research-area-nav" aria-label="Papers by research area">
  {% for area in site.data.research_areas %}
    <a href="{{ '/publications/' | relative_url }}#{{ area.id }}">{{ area.short_title }}</a>
  {% endfor %}
</nav>

Projects below retain their institutional or independent-research attribution. Paper associations follow the affiliations and scope of the original work, not topic similarity alone.

<div class="projects">
{% assign sorted_projects = site.projects | sort: "importance" %}
{% if page.horizontal %}
  <div class="systems-list">
    {% for group in page.project_groups %}
      {% assign group_projects = sorted_projects | where: "project_group", group.id %}
      {% if group_projects.size > 0 %}
        <section class="systems-group systems-group--{{ group.id }}" aria-labelledby="systems-{{ group.id }}">
          <h2 class="systems-group-label" id="systems-{{ group.id }}">{{ group.label }}</h2>
          {% for project in group_projects %}
            {% include projects_horizontal.liquid %}
          {% endfor %}
        </section>
      {% endif %}
    {% endfor %}
  </div>
{% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
{% endif %}
</div>
