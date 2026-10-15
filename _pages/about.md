---
layout: about
title: About
seo_title: Hao Zhang — Research Scientist at ByteDance | Evolving Agent Environments
permalink: /
subtitle: Research Scientist at ByteDance
description: Hao Zhang studies how AI agents improve through evolving external working environments, combining agent harnesses, context infrastructure, memory, tools, and data systems.
keywords: Hao Zhang, ByteDance, AI agents, agent evolution, environment evolution, external working environments, self-evolving harnesses, agent teams, Context IR, context infrastructure, agent memory, multi-agent collaboration, human-agent collaboration, vector search, semantic query processing, graph systems, hardware-accelerated data systems
last_modified_at: 2026-10-15
hero_title: Helping AI agents improve by evolving their environments.
hero_intro: |
  I develop **AutoIA**, a self-evolving agent harness that enables agent teams to build and continuously improve the **external working environments** of AI agents—including context infrastructure, memory, and tools. My research asks how task feedback can turn one-off work into reusable capabilities that benefit future agents.

profile:
  align: right
  image: homepage-cycling.jpeg
  image_alt: Hao Zhang cycling on the Tianfu Greenway
  image_circular: false

recent_publications: false
social: true

announcements:
  enabled: false
  scrollable: false
  limit: 4

latest_posts:
  enabled: false
  scrollable: true
  limit: 3
---

<section class="about-section" aria-labelledby="current-focus">
<h2 class="about-section-label" id="current-focus">Research Directions</h2>
<div class="about-section-content" markdown="1">

My research asks three connected questions: **how to represent** heterogeneous data and derived knowledge through a composable Context IR, **how to construct** reusable memory and tools with agent teams, and **how to evolve** these resources using task feedback. This is my approach to **agent evolution through environment evolution**—improving what agents can access and do, not only what fits in a prompt.

The work connects [**agent memory and retrieval**](/publications/#memory-adaptation), [**test-time learning and serving**](/publications/#test-time-learning-serving), and [**semantic queries and vector search**](/publications/#retrieval-semantics). It builds on my earlier work in [hardware-efficient execution](/publications/#efficient-execution), [graph systems and learning](/publications/#graph-systems), and [query optimization and distributed analytics](/publications/#query-analytics).

My longer-term goal is **multi-agent and human–agent collaboration** through shared, evolving working environments, so people and agents can build on one another's knowledge and work over time.

**Research perspective:** [Organizing the Shared Information World of Humans and AI Agents](/blog/2026/shared-information-world-ai-agents/) · [The Next Generation of Context Management](/blog/2026/next-gen-agent-en/)
</div>
</section>

<section class="about-section" aria-labelledby="selected-systems">
<h2 class="about-section-label" id="selected-systems">Selected Systems</h2>
<div class="about-section-content" markdown="1">

- [**AutoIA @ ByteDance**](/projects/1_autoia/) — a self-evolving harness for constructing and improving **agents' external working environments**. Agent teams use a composable Context IR to organize knowledge, build memory and tools, and evolve these resources from task feedback.
- [**SEMA**](/projects/#sema) — makes LLM-powered semantic operators first-class SQL primitives, enabling query optimization and adaptive execution. Its evaluation reports 2–10× speedups over three baselines on semantic-query workloads.
- [**GES @ Huawei**](/projects/3_ges/) — a production graph database combining a composable service architecture with factorized execution. It achieved audited LDBC SNB Interactive #1 results on the declarative (2024) and imperative (2025) tracks.
- [**TQEX @ Huawei**](/projects/2_tqex/) — maps irregular SQL operators onto portable tensor runtimes across heterogeneous accelerators. Its evaluation reports 12.2× over DuckDB and 22.7× over HeavyDB on supported TPC-H SF100 queries.

[**Explore all systems**](/projects/) · [**Papers by research area**](/publications/)
</div>
</section>

<section class="about-section" aria-labelledby="highlights">
<h2 class="about-section-label" id="highlights">Highlights</h2>
<div class="about-section-content" markdown="1">

- **30+ publications** in database systems and AI, including **SIGMOD, VLDB, ICDE, COLM, EMNLP, ATC, TKDE, and The VLDB Journal**.
- **#1 on both tracks of [LDBC SNB Interactive](https://ldbcouncil.org/benchmarks/snb/interactive/), the leading audited benchmark for graph database systems:** [**Declarative**, 2024](https://ldbcouncil.org/benchmarks/snb/interactive/2024-09-16-graph-engine-service-sf300/) (**3,000× over #2**) and [**Imperative**, 2025](https://ldbcouncil.org/benchmarks/snb/interactive/2025-12-01-graph-engine-service-sf300/).

I received my **Ph.D.** from the Chinese University of Hong Kong, advised by **[Prof. Jeffrey Xu Yu](https://www.se.cuhk.edu.hk/people/academic-staff/prof-yu-xu-jeffrey/)** and **[Prof. Hong Cheng](https://www.se.cuhk.edu.hk/people/academic-staff/prof-cheng-hong/)**, and my **B.S. in Computer Science** from Wuhan University.
</div>
</section>

<section class="about-section" aria-labelledby="honors-awards">
<h2 class="about-section-label" id="honors-awards">Selected Honors &amp; Awards</h2>
<div class="about-section-content" markdown="1">

- **ByteDance Soaring Star Talent Program**
- **Huawei Gold Award for Individual Excellence** — Top 1%
- **Huawei TopMinds Talent Program — First Class (highest tier)**
</div>
</section>

<section class="about-section" aria-labelledby="collaboration-internship">
<h2 class="about-section-label" id="collaboration-internship">Collaboration &amp; Internship</h2>
<div class="about-section-content" markdown="1">

I welcome collaboration on self-improving agents, **environment and harness evolution**, context infrastructure, memory and retrieval, and graph/vector systems. I am also recruiting **research interns** at ByteDance in Shenzhen; email zhanghaowuda12 [at] gmail [dot] com with `[Intern]` in the subject.
</div>
</section>

<section class="about-section" aria-labelledby="recent-news">
<h2 class="about-section-label" id="recent-news">Recent News</h2>
<div class="about-section-content" markdown="1">

{% include news.liquid limit=true %}

[→ All news](/news/)
</div>
</section>
