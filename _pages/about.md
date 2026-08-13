---
layout: about
title: About
seo_title: Hao Zhang — Agentic Data Management, Context Infrastructure, and Graph/Vector Systems
permalink: /
subtitle: Research Scientist at ByteDance
description: Research Scientist at ByteDance working on agentic data management, agentic context infrastructure, self-evolving systems, retrieval-aware knowledge representation, semantic query processing, vector/graph retrieval systems, and accelerator-aware query execution.
keywords: Hao Zhang, ByteDance, agentic data management, agentic data integration, context search, agent infrastructure, self-evolving systems, knowledge extraction, retrieval-aware knowledge representation, semantic query processing, vector search, graph database, AI-native data systems

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

I am a Research Scientist at ByteDance, building **data systems for AI-native and data-intensive workloads**. My current focus is **agentic data management** — the systems layer beneath LLM agents that turns scattered enterprise and multimodal data into structured, retrieval-optimized context and improves how agents access it over time. This includes **agentic data integration, context infrastructure & self-evolving systems** and **graph/vector retrieval infrastructure**. Beyond this focus, I also work on accelerator-aware query execution and distributed query processing.

I received my **Ph.D.** from the Chinese University of Hong Kong in 2022, advised by **[Prof. Jeffrey Xu Yu](https://www.se.cuhk.edu.hk/people/academic-staff/prof-yu-xu-jeffrey/)** and **[Prof. Hong Cheng](https://www.se.cuhk.edu.hk/people/academic-staff/prof-cheng-hong/)**, and my **B.S. in Computer Science** from the **[Hongyi Honor School](https://zh.wikipedia.org/zh-cn/%E6%AD%A6%E6%B1%89%E5%A4%A7%E5%AD%A6%E5%BC%98%E6%AF%85%E5%AD%A6%E5%A0%82)** at Wuhan University in 2017.

## Collaboration & Internship

I welcome **collaboration** of all kinds on agentic data management, self-evolving agent infrastructure, vector/graph engines, and hardware-accelerated query processing.

At ByteDance, I am currently recruiting **research interns** in Shenzhen. To apply, please email zhanghaowuda12 [at] gmail [dot] com with [Intern] in the subject line.

## Highlights

- **25+ publications** across database systems, graph/vector retrieval, and Data+AI infrastructure, including papers in **SIGMOD, VLDB, ICDE, COLM, TKDE, and The VLDB Journal**.
- **LDBC SNB Interactive world-record results** in both the declarative track ([2024, **3,000× over #2**](https://ldbcouncil.org/benchmarks/snb/interactive/2024-09-16-graph-engine-service-sf300/)) and the imperative track ([2025](https://ldbcouncil.org/benchmarks/snb/interactive/2025-12-01-graph-engine-service-sf300/)).

## Current Focus: Agentic Data Management

My research asks how data systems should manage the information substrate for LLM agents: integrating heterogeneous sources, extracting reliable knowledge, maintaining it as queryable context, and improving access mechanisms from execution feedback. A central question is **retrieval-aware knowledge representation**: what form should extracted knowledge take so that downstream retrieval is accurate, efficient, attributable, and fresh? The agenda is data-centric rather than model-centric: agents should operate over inspectable substrates whose structure, retrieval interfaces, and evolution are system-managed.

This focus spans two layers: **agentic data integration, context infrastructure & self-evolving systems** (what knowledge and capabilities to construct, how agents access them, and how the system improves) and **retrieval & storage substrates** (the infrastructure that physically supports those capabilities).

### Agentic data integration, context infrastructure & self-evolving systems

Agents depend on integrated knowledge views over heterogeneous sources — documents, tables, vector indexes, knowledge bases, memory, and multimodal content. Rather than treating documents as opaque context or chunking by layout heuristics, the system derives knowledge units, relations, provenance, temporal scopes, and materialized views driven by downstream retrieval objectives and agent workloads. Unlike classical virtual integration that defers everything to query time, agentic integration must extract, align, and maintain knowledge between queries: schema and semantic alignment, entity/relation extraction, semantic joins, versioning, deduplication, conflict detection, and freshness.

[**AutoIA**]({% link _projects/1_autoia.md %}) is the systems vehicle for this agenda: an internal, next-generation infrastructure for agentic context search that connects retrieval/runtime execution with observability, evaluation, and continuous capability improvement. It provides a concrete setting for studying how retrieval pipelines, tools, skills, and execution strategies can improve from workloads and execution traces. Product context: [Volcano Engine ContextSearch](https://www.volcengine.com/docs/6465/2096539).

Longer term, I am interested in **recursive self-improvement (RSI)** as a systems question: moving beyond improving task-level retrieval, tools, or plans toward improving the mechanisms that generate, evaluate, and select those improvements themselves.

Representative work:

- [**DocNavRAG, arXiv'26**](https://arxiv.org/abs/2608.01565) — organizes document-native hierarchy and cross-region relations into a navigable graph for stateful, agentic evidence construction over complex document QA.
- [**AdaMM, arXiv'26**](https://arxiv.org/abs/2607.29440) — complements retrieval memory with queryable analytic memory over recurring multimodal observations.
- [**Sema, PVLDB'26**](/publications/#VLDB-26-2) — LLM-powered semantic operators inside DuckDB/SQL.
- [**CoreSemDB, COLM'26**](/publications/#COLM-26) — benchmark for hybrid semantic-relational query processing over text-rich databases.

Selected writing: [**The Next Generation of Context Management: Maintaining the Model's Perceivable World**](/blog/2026/next-gen-agent-en/) · [中文版](/blog/2026/next-gen-agent-zh/).

### Retrieval and storage substrates

The knowledge and context substrates above sit on storage, indexing, and retrieval infrastructure. My work here targets dynamic graph stores, vector indexes, and hybrid query engines, where correctness under concurrent updates and retrieval throughput are the primary design constraints.

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

My earlier work focused on distributed query processing, subgraph analytics, and learned query optimization. These techniques — efficient joins, cardinality estimation, communication–computation separation, and distributed graph execution — form a systems foundation that I continue to build on today.

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
