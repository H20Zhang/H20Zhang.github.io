---
layout: about
title: About
seo_title: Hao Zhang — Data Systems for Agents
permalink: /
subtitle: Research Scientist at ByteDance
description: Research Scientist at ByteDance working on data systems for agents, including agentic data management, context infrastructure, self-evolving systems, vector/graph retrieval, and accelerator-aware data systems.
keywords: Hao Zhang, ByteDance, data systems for agents, agentic data management, context infrastructure, self-evolving systems, context search, vector search, graph database, semantic query processing, AI-native data systems

profile:
  align: right
  image: bio-photo.jpeg
  image_alt: Hao Zhang portrait
  image_circular: false
  more_info: >
    <p>Research Scientist, ByteDance</p>
    <p>Data systems for agents.</p>
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

I am a Research Scientist at ByteDance, building **data systems for agents**. My current focus is **agentic data management**: systems that turn heterogeneous enterprise and multimodal data into structured, retrieval-optimized context, expose it through efficient semantic and retrieval interfaces, and improve those mechanisms from workloads and execution feedback. I also work on graph/vector retrieval infrastructure and accelerator-aware data systems.

I received my **Ph.D.** from the Chinese University of Hong Kong in 2022, advised by **[Prof. Jeffrey Xu Yu](https://www.se.cuhk.edu.hk/people/academic-staff/prof-yu-xu-jeffrey/)** and **[Prof. Hong Cheng](https://www.se.cuhk.edu.hk/people/academic-staff/prof-cheng-hong/)**, and my **B.S. in Computer Science** from the **[Hongyi Honor School](https://zh.wikipedia.org/zh-cn/%E6%AD%A6%E6%B1%89%E5%A4%A7%E5%AD%A6%E5%BC%98%E6%AF%85%E5%AD%A6%E5%A0%82)** at Wuhan University in 2017.

## Highlights

- **25+ publications** across database systems, graph/vector retrieval, and Data+AI infrastructure, including **SIGMOD, VLDB, ICDE, COLM, TKDE, and The VLDB Journal**.
- **LDBC SNB Interactive #1 results** in both the declarative track ([2024, **3,000× over #2**](https://ldbcouncil.org/benchmarks/snb/interactive/2024-09-16-graph-engine-service-sf300/)) and the imperative track ([2025](https://ldbcouncil.org/benchmarks/snb/interactive/2025-12-01-graph-engine-service-sf300/)).

## Current Research

My research asks how data systems should manage the **information substrate beneath LLM agents**: what context to construct from heterogeneous sources, how to represent it so downstream access is accurate and inspectable, and how the system should improve from workloads, traces, and evaluation signals. A central theme is **retrieval-aware knowledge representation** — organizing information around how agents will later retrieve, analyze, and act on it.

[**AutoIA @ ByteDance**](/projects/1_autoia/) is the current systems vehicle for this agenda, connecting agentic context search and runtime execution with observability, evaluation, and continuous capability improvement. [**Systems**](/projects/) shows how research on document navigation, multimodal memory, semantic query processing, and graph/vector infrastructure supports this broader systems direction.

Longer term, I am interested in **recursive self-improvement (RSI)** as a systems problem: improving not only task-level retrieval, tools, or plans, but also the mechanisms that generate, evaluate, and select system improvements.

Selected writing: [**The Next Generation of Context Management: Maintaining the Model's Perceivable World**](/blog/2026/next-gen-agent-en/) · [中文版](/blog/2026/next-gen-agent-zh/).

## Selected Systems

- [**AutoIA @ ByteDance**](/projects/1_autoia/) — agentic context search, observability, evaluation, and self-evolving infrastructure.
- [**GES @ Huawei Cloud**](/projects/3_ges/) — production graph database infrastructure for high-throughput interactive workloads.
- [**Database & Graph Research Systems @ CUHK**](/projects/4_database_graph_systems/) — earlier work on distributed query execution, graph analytics, and compressed graph processing.

My broader work also includes vector retrieval, dynamic graph storage, tensor-based query execution, and distributed query processing; see [**Publications**](/publications/) for the full research record.

## Collaboration & Internship

I welcome collaboration on agentic data management, self-evolving agent infrastructure, vector/graph engines, and hardware-accelerated data systems. At ByteDance, I am currently recruiting **research interns** in Shenzhen; please email zhanghaowuda12 [at] gmail [dot] com with [Intern] in the subject line.

## Recent News

- **08/2026** — **DocNavRAG** released on arXiv: document-structured graph RAG with stateful evidence construction for complex document QA.
- **07/2026** — **AdaMM** released on arXiv: analytic memory for multimodal agents.
- **07/2026** — **Sema** accepted by PVLDB'26 and **CoreSemDB** accepted by COLM'26.

[→ All news](/news/)
