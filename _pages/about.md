---
layout: about
title: About
seo_title: Hao Zhang — Research Scientist at ByteDance | Context Infrastructure for Agents
permalink: /
subtitle: Research Scientist at ByteDance
description: Hao Zhang is a Research Scientist at ByteDance building self-improving context infrastructure for agents, retrieval systems, vector search, and graph systems.
keywords: Hao Zhang, ByteDance, data systems for agents, context infrastructure, context management, agent memory, context search, vector search, graph systems, semantic query processing, hardware-accelerated data systems, AI-native data systems
last_modified_at: 2026-08-21
hero_title: Context infrastructure for agents.
hero_intro: >
  I am a Research Scientist at ByteDance. I believe progress toward **AGI** will depend not only on stronger models, but on systems that can build and continuously improve an agent's **external information environment**, then turn it into the **right context for each task**. My current focus is **self-improving context infrastructure** across both layers.

profile:
  align: right
  image: homepage-cycling.jpeg
  image_alt: Hao Zhang cycling on the Tianfu Greenway
  image_circular: false
  more_info: >
    <p><a href="mailto:zhanghaowuda12@gmail.com">zhanghaowuda12@gmail.com</a></p>

recent_publications: false
social: true

announcements:
  enabled: false
  scrollable: true
  limit: 5

latest_posts:
  enabled: false
  scrollable: true
  limit: 3
---

<section class="about-section" aria-labelledby="current-focus">
<h2 class="about-section-label" id="current-focus">Current Focus</h2>
<div class="about-section-content" markdown="1">

Even a capable model depends on two things outside its weights: the information available in its **external environment**, and how that information is retrieved and assembled into **task-specific model context**. As model capabilities grow, I expect the systems connecting these two layers to become an increasingly important bottleneck on the path toward **AGI**.

My research focuses on **self-improving context infrastructure for agents**: jointly evolving the external information environment—through data integration, organization, indexing, and storage—and the pipelines that retrieve and assemble task-relevant context from it. Task-level feedback improves these pipelines, while persistent failures drive changes to the underlying environment itself.

[**AutoIA @ ByteDance**](/projects/1_autoia/) is the systems platform for this agenda. Its inner loop evolves environment-specific retrieval pipelines through task-level evaluation; its outer loop uses persistent failures to improve data integration and rebuild the environment itself.

Selected writing: [**The Next Generation of Context Management: Maintaining the Model's Perceivable World**](/blog/2026/next-gen-agent-en/) · [中文版](/blog/2026/next-gen-agent-zh/).
</div>
</section>

<section class="about-section" aria-labelledby="selected-systems">
<h2 class="about-section-label" id="selected-systems">Selected Systems</h2>
<div class="about-section-content" markdown="1">

- [**AutoIA @ ByteDance**](/projects/1_autoia/) — self-improving context infrastructure that evolves both external data environments and the retrieval pipelines built for them.
- [**GES @ Huawei**](/projects/3_ges/) — production graph database infrastructure.
- [**TQEX @ Huawei**](/projects/2_tqex/) — tensor-centric SQL and graph execution across heterogeneous accelerators.
- [**Database & Graph Research Systems @ CUHK**](/projects/4_database_graph_systems/) — distributed query processing and graph systems.

[**Systems**](/projects/) maps these systems to the research behind them. [**Publications**](/publications/) contains the full research record.
</div>
</section>

<section class="about-section" aria-labelledby="highlights">
<h2 class="about-section-label" id="highlights">Highlights</h2>
<div class="about-section-content" markdown="1">

- **25+ publications** in database systems and AI, including **SIGMOD, VLDB, ICDE, EMNLP Main, COLM, TKDE, and The VLDB Journal**.
- **#1 on both LDBC SNB Interactive tracks**: [**declarative**, 2024](https://ldbcouncil.org/benchmarks/snb/interactive/2024-09-16-graph-engine-service-sf300/) (**3,000× over #2**) and [**imperative**, 2025](https://ldbcouncil.org/benchmarks/snb/interactive/2025-12-01-graph-engine-service-sf300/).

I received my **Ph.D.** from the Chinese University of Hong Kong, advised by **[Prof. Jeffrey Xu Yu](https://www.se.cuhk.edu.hk/people/academic-staff/prof-yu-xu-jeffrey/)** and **[Prof. Hong Cheng](https://www.se.cuhk.edu.hk/people/academic-staff/prof-cheng-hong/)**, and my **B.S. in Computer Science** from Wuhan University.
</div>
</section>

<section class="about-section" aria-labelledby="collaboration-internship">
<h2 class="about-section-label" id="collaboration-internship">Collaboration &amp; Internship</h2>
<div class="about-section-content" markdown="1">

I welcome collaboration on context infrastructure, retrieval systems, graph/vector systems, and self-improving context infrastructure. I am also recruiting **research interns** at ByteDance in Shenzhen; email zhanghaowuda12 [at] gmail [dot] com with `[Intern]` in the subject.
</div>
</section>

<section class="about-section" aria-labelledby="recent-news">
<h2 class="about-section-label" id="recent-news">Recent News</h2>
<div class="about-section-content" markdown="1">

- **08/2026** — [**DocNavRAG**](/publications/#Arxiv-26-4) released on arXiv.
- **07/2026** — [**AdaMM**](/publications/#Arxiv-26-3) released on arXiv.
- **07/2026** — [**Sema**](/publications/#VLDB-26-2) accepted by PVLDB'26; [**CoreSemDB**](/publications/#COLM-26) accepted by COLM'26.

[→ All news](/news/)
</div>
</section>
