---
layout: about
title: About
seo_title: Hao Zhang — Data Systems for Agents and Self-Improving Context Infrastructure
permalink: /
subtitle: Research Scientist at ByteDance
description: Research Scientist at ByteDance building data systems for agents, with a focus on self-improving context infrastructure, agentic data integration, retrieval-aware knowledge representation, and graph/vector retrieval systems.
keywords: Hao Zhang, ByteDance, data systems for agents, agentic data management, agentic data integration, context infrastructure, self-improving systems, knowledge extraction, retrieval-aware knowledge representation, semantic query processing, vector search, graph database, AI-native data systems

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

I am a Research Scientist at ByteDance working on **data systems for agents**. My research studies how to turn heterogeneous enterprise and multimodal data into structured, queryable, and task-relevant context, enabling agents to access the information they need and execute tasks more reliably. I am particularly interested in **self-improving context infrastructure** that uses feedback from agent execution to continuously refine how information is integrated, organized, retrieved, and maintained. This work spans agentic data integration, context infrastructure, and graph/vector retrieval systems. Beyond this focus, I also work on accelerator-aware query execution and distributed data systems.

I received my **Ph.D.** from the Chinese University of Hong Kong in 2022, advised by **[Prof. Jeffrey Xu Yu](https://www.se.cuhk.edu.hk/people/academic-staff/prof-yu-xu-jeffrey/)** and **[Prof. Hong Cheng](https://www.se.cuhk.edu.hk/people/academic-staff/prof-cheng-hong/)**, and my **B.S. in Computer Science** from the **[Hongyi Honor School](https://zh.wikipedia.org/zh-cn/%E6%AD%A6%E6%B1%89%E5%A4%A7%E5%AD%A6%E5%BC%98%E6%AF%85%E5%AD%A6%E5%A0%82)** at Wuhan University in 2017.

## Collaboration & Internship

I welcome **collaboration** on agentic data management, self-improving context infrastructure, graph/vector retrieval systems, and accelerator-aware query execution.

At ByteDance, I am currently recruiting **research interns** in Shenzhen. To apply, please email zhanghaowuda12 [at] gmail [dot] com with [Intern] in the subject line.

## Highlights

- **25+ publications** across database systems, graph/vector retrieval, and Data+AI infrastructure, including papers in **SIGMOD, VLDB, ICDE, COLM, TKDE, and The VLDB Journal**.
- **LDBC SNB Interactive world-record results** in both the declarative track ([2024, **3,000× over #2**](https://ldbcouncil.org/benchmarks/snb/interactive/2024-09-16-graph-engine-service-sf300/)) and the imperative track ([2025](https://ldbcouncil.org/benchmarks/snb/interactive/2025-12-01-graph-engine-service-sf300/)).

## Current Focus: Agentic Data Management

My research asks how data systems can provide agents with the information they need to execute tasks reliably. This involves turning heterogeneous sources into structured, queryable information; organizing that information into task-relevant context; maintaining it as underlying data changes; and using feedback from agent execution to improve integration, representation, retrieval, and maintenance. A central question is **retrieval-aware knowledge representation**: how should information be structured so agents can retrieve task-relevant context accurately and efficiently, with clear attribution and freshness? The agenda is data-centric rather than model-centric: reliable agent execution depends not only on stronger models, but also on inspectable information substrates whose organization, access, and evolution are managed by data systems.

This focus spans two layers: **agentic data integration, context infrastructure & self-improving systems** (how information is integrated and organized into task-relevant context, and how execution feedback improves the system) and **retrieval & storage substrates** (the infrastructure that stores and serves that information efficiently).

### Agentic data integration, context infrastructure & self-improving systems

Agents need more than access to raw data: they need information organized into context that matches the task and supports reliable execution. Across heterogeneous sources — documents, tables, vector indexes, knowledge bases, memory, and multimodal content — the system must derive and maintain knowledge units, relations, provenance, temporal scopes, and materialized views according to downstream retrieval objectives and agent workloads. Unlike classical virtual integration that defers most work to query time, agentic integration must continuously extract, align, and maintain information between queries through schema and semantic alignment, entity/relation extraction, semantic joins, versioning, deduplication, conflict detection, and freshness management.

[**AutoIA**]({% link _projects/1_autoia.md %}) is the systems vehicle for this agenda: an internal system that connects context construction and retrieval with agent runtime execution, observability, and evaluation. It provides a concrete setting for studying how workloads, execution traces, and evaluation signals can improve how information is integrated, organized, retrieved, and maintained, as well as the tools, skills, and execution strategies agents use to act on that context. Product context: [Volcano Engine ContextSearch](https://www.volcengine.com/docs/6465/2096539).

Longer term, I am interested in **recursive self-improvement (RSI)** as a systems question: moving from feedback-driven improvement of context, retrieval, tools, and execution strategies toward systems that can also improve the mechanisms used to propose, evaluate, and select those improvements.

Representative work:

- [**DocNavRAG, arXiv'26**](https://arxiv.org/abs/2608.01565) — organizes document-native hierarchy and cross-region relations into a navigable graph for stateful, agentic evidence construction over complex document QA.
- [**AdaMM, arXiv'26**](https://arxiv.org/abs/2607.29440) — complements retrieval memory with queryable analytic memory over recurring multimodal observations.
- [**Sema, PVLDB'26**](/publications/#VLDB-26-2) — LLM-powered semantic operators inside DuckDB/SQL.
- [**CoreSemDB, COLM'26**](/publications/#COLM-26) — benchmark for hybrid semantic-relational query processing over text-rich databases.

Selected writing: [**The Next Generation of Context Management: Maintaining the Model's Perceivable World**](/blog/2026/next-gen-agent-en/) · [中文版](/blog/2026/next-gen-agent-zh/).

### Retrieval and storage substrates

The information and context systems above depend on storage, indexing, and retrieval substrates that can serve the right information under changing workloads. My work here targets dynamic graph stores, vector indexes, and hybrid query engines, where correctness under concurrent updates and retrieval throughput are the primary design constraints.

Representative work:

- [**VeloANN, arXiv'26**](/publications/#Arxiv-26-2) — SSD-resident graph indexing for high-throughput vector search.
- [**SQLVec, ICDE'26**](/publications/#ICDE-26) — SQL-native vector similarity search.
- [**GES, SIGMOD'25**](/publications/#SIGMOD-25-1) — a production graph database service for interactive graph workloads.
- [**RapidStore, VLDB'25**](/publications/#VLDB-25) — dynamic graph storage for concurrent read/write workloads.
- [**Dynamic Graph Storage Study, SIGMOD'25**](/publications/#SIGMOD-25-3) — a systematic study of in-memory dynamic graph storage designs.
- [**Aquila, VLDB'26**](/publications/#VLDB-26) — high-concurrency incremental graph query processing.

## Broader Systems Work

### Accelerator-aware query execution

I also work on accelerator-aware query execution: using tensor runtimes (PyTorch, TensorFlow) to execute SQL and graph operators on GPUs and heterogeneous hardware. The core problems are tensorizing irregular relational and graph operators, managing memory across XPU backends, and making query execution portable across accelerator stacks.

Representative work:

- [**TQEx(SQL), SIGMOD'26**](/publications/#SIGMOD-26-2) — tensor-based SQL execution over heterogeneous accelerators.
- [**TenGraph, VLDB'24**](/publications/#VLDB-24) — tensor-based graph query processing on PyTorch.
- [**TGraph, SIGMOD'25**](/publications/#SIGMOD-25-2) — tensor-centric graph processing across tensor runtimes and accelerators.

### Earlier foundations

My earlier work focused on distributed query processing, subgraph analytics, and learned query optimization. These techniques — efficient joins, cardinality estimation, communication–computation separation, and distributed graph execution — form the systems foundations for scalable retrieval and context infrastructure.

Representative work:

- [**Secco, SIGMOD'22**](/publications/#SIGMOD-22-1) — distributed query processing with communication separated from local computation.
- [**DISC, VLDB'20**](/publications/#VLDB-20) — distributed local subgraph counting via relational query processing.
- [**Crystal, VLDB'18**](/publications/#VLDB-18) — compressed subgraph matching without materializing all matches.
- [**ALSS, SIGMOD'21**](/publications/#SIGMOD-21) — a learned sketch for approximate subgraph counting.
- [**NNGP-Card, SIGMOD'22**](/publications/#SIGMOD-22-2) — uncertainty-aware learned cardinality estimation.

## News

- **08/2026** — **DocNavRAG** released on arXiv: document-structured graph RAG with stateful evidence construction for complex document QA.
- **07/2026** — **AdaMM** released on arXiv: analytic memory for multimodal agents.
- **07/2026** — Semantic query processing line: **Sema** accepted by PVLDB'26 and **CoreSemDB** accepted by COLM'26.
- **11/2025** — LDBC SNB Interactive imperative track world record (#1).

[→ All news](/news/)
