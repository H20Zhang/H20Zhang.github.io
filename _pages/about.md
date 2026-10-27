---
layout: about
title: About
seo_title: Hao Zhang — Research Scientist at ByteDance | Harness & Environment Evolution
permalink: /
subtitle: Research Scientist at ByteDance
description: Hao Zhang studies self-evolving agent harnesses and shared working environments, combining context infrastructure, memory, tools, skills, and experience-driven agent-team construction.
keywords: Hao Zhang, ByteDance, AI agents, harness evolution, environment evolution, shared agent environments, self-evolving harnesses, builder agents, experience-driven construction, Context IR, context infrastructure, agent memory, agent tools, agent skills, multi-agent collaboration, human-agent collaboration, vector search, semantic query processing, graph systems, hardware-accelerated data systems
last_modified_at: 2026-10-27
hero_title: Evolving agent harnesses and shared environments.
hero_intro: |
  I develop **AutoIA**, a system for **self-evolving agent harnesses and shared working environments**. Builder agent teams construct and improve **tools, skills, and execution strategies** alongside **context infrastructure** (organizing data from files, databases, and apps), **memory**, and **queryable data structures**. They also reuse successful projects and construction experience, so task feedback improves both what agents use and how these resources are built.

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

My research asks how agents can improve through the **co-evolution of their harnesses and shared environments**. I study a composable **Context IR** for heterogeneous data and derived context; **builder agent teams** that construct reusable tools, skills, memory, and context infrastructure; and **experience-driven evolution** that improves both these assets and the strategies used to build them.

The work connects [**agent memory and retrieval**](/publications/#memory-adaptation), [**test-time learning and serving**](/publications/#test-time-learning-serving), and [**semantic queries and vector search**](/publications/#retrieval-semantics). It builds on my earlier work in [hardware-efficient execution](/publications/#efficient-execution), [graph systems and learning](/publications/#graph-systems), and [query optimization and distributed analytics](/publications/#query-analytics).

My longer-term goal is **multi-agent and human–agent collaboration at scale** through trustworthy shared environments, so people and agents can build on one another's knowledge and work over time.

**Research perspective:** [Organizing the Shared Information World of Humans and AI Agents](/blog/2026/shared-information-world-ai-agents/) · [The Next Generation of Context Management](/blog/2026/next-gen-agent-en/)
</div>
</section>

<section class="about-section" aria-labelledby="selected-systems">
<h2 class="about-section-label" id="selected-systems">Selected Systems</h2>
<div class="about-section-content" markdown="1">

- [**AutoIA @ ByteDance**](/projects/1_autoia/) — a system for **co-evolving agent harnesses and shared environments**. Builder agent teams use a composable Context IR to construct context, memory, tools, and skills, then improve these assets—and their construction strategies—through task feedback.
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

I welcome collaboration on self-improving agents, **harness and shared-environment evolution**, experience-driven agent-team construction, context infrastructure, memory and retrieval, and graph/vector systems. I am also recruiting **research interns** at ByteDance in Shenzhen; email zhanghaowuda12 [at] gmail [dot] com with `[Intern]` in the subject.
</div>
</section>

<section class="about-section" aria-labelledby="recent-news">
<h2 class="about-section-label" id="recent-news">Recent News</h2>
<div class="about-section-content" markdown="1">

{% include news.liquid limit=true %}

[→ All news](/news/)
</div>
</section>
