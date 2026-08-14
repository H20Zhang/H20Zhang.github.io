---
layout: page
title: Systems
permalink: /projects/
description: Selected systems spanning context infrastructure for agents, production graph systems, tensor-centric execution, and earlier database/graph research.
nav: true
nav_order: 2
horizontal: true
---

A selective systems portfolio: **AutoIA @ ByteDance** develops context infrastructure for agents; **GES @ Huawei** demonstrates production-scale graph-system impact; **TQEX @ Huawei** maps SQL and graph workloads onto heterogeneous accelerators; and **Database & Graph Research Systems @ CUHK** capture the systems foundation behind this trajectory.

<div class="projects">
{% assign sorted_projects = site.projects | sort: "importance" %}
{% if page.horizontal %}
  <div class="container px-0">
    <div class="row row-cols-1 systems-list">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
{% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
{% endif %}
</div>
