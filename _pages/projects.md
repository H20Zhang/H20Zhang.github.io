---
layout: page
title: Research & Systems
permalink: /projects/
description: Independent research and academic collaborations across data systems and AI, alongside systems developed at ByteDance, Huawei, and CUHK.
nav: true
nav_order: 2
horizontal: true
project_groups:
  - id: independent
    label: Independent Research
  - id: bytedance
    label: ByteDance
  - id: huawei
    label: Huawei
  - id: cuhk
    label: CUHK
---

My work spans context infrastructure, retrieval, semantic query processing, graph systems, and hardware-efficient execution. **Independent research and academic collaborations** are presented separately from projects at ByteDance, Huawei, and CUHK.

Paper associations follow the affiliations in the original publications and the scope of each project, rather than publication dates or topic similarity alone.

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
