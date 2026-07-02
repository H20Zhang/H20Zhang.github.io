---
layout: about
title: About
seo_title: Hao Zhang — Agentic Data Management, Retrieval-Aware Knowledge Representation, and Graph/Vector Infrastructure
permalink: /
subtitle: Research Scientist at ByteDance
description: Research Scientist at ByteDance working on agentic data management, retrieval-aware knowledge representation, agentic data integration and knowledge extraction, semantic query processing, vector/graph retrieval systems, and accelerator-aware query execution.
keywords: Hao Zhang, ByteDance, agentic data management, agentic data integration, knowledge extraction, retrieval-aware knowledge representation, semantic query processing, vector search, graph database, AI-native data systems

profile:
  align: right
  image: bio-photo.jpeg
  image_alt: Hao Zhang portrait
  image_circular: false
  more_info: >
    <p>Research Scientist, ByteDance</p>
    <p>AI-native Data Systems</p>
    <p><a href="mailto:zhanghao.ai@bytedance.com">zhanghao.ai@bytedance.com</a></p>

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

I am a Research Scientist at ByteDance, building **data systems for AI-native and data-intensive workloads**. My current focus is **agentic data management** — the systems layer beneath LLM agents that turns scattered enterprise and multimodal data into structured, retrieval-optimized knowledge substrates. This includes **agentic data integration & knowledge extraction** and **graph/vector retrieval infrastructure**. Beyond this focus, I also work on accelerator-aware query execution, and distributed query processing.

I received my **Ph.D.** from the Chinese University of Hong Kong in 2022, advised by **[Prof. Jeffrey Xu Yu](https://www.se.cuhk.edu.hk/people/academic-staff/prof-yu-xu-jeffrey/)** and **[Prof. Hong Cheng](https://www.se.cuhk.edu.hk/people/academic-staff/prof-cheng-hong/)**, and my **B.S. in Computer Science** from the **[Hongyi Honor School](https://zh.wikipedia.org/zh-cn/%E6%AD%A6%E6%B1%89%E5%A4%A7%E5%AD%A6%E5%BC%98%E6%AF%85%E5%AD%A6%E5%A0%82)** at Wuhan University in 2017.

## Highlights

- **25+ publications** across database systems, graph/vector retrieval, and Data+AI infrastructure, including papers in **SIGMOD, VLDB, ICDE, TKDE, and The VLDB Journal**.
- Designed and architected systems including **Sema, GES, SeccoSQL, DISC, and Crystal** — from research prototypes to production infrastructure. [→ Projects](/projects/)
- **LDBC SNB Interactive world-record results** in both the declarative track ([2024, **3,000× over #2**](https://ldbcouncil.org/benchmarks/snb/interactive/2024-09-16-graph-engine-service-sf300/)) and the imperative track ([2025](https://ldbcouncil.org/benchmarks/snb/interactive/2025-12-01-graph-engine-service-sf300/)).

## Current Focus: Agentic Data Management

My research asks how data systems should manage heterogeneous information for LLM agents: integrating scattered sources, extracting reliable knowledge, and maintaining it as queryable substrates. A central question is **retrieval-aware knowledge representation**: what form should extracted knowledge take so that downstream retrieval is accurate, efficient, attributable, and fresh? The agenda is data-centric rather than LLM-centric: agents should operate over curated knowledge substrates whose structure is explicit, queryable, and system-maintained.

This focus spans two layers: **agentic data integration & knowledge extraction** (what knowledge to extract and how to maintain it) and **retrieval & storage substrates** (the infrastructure that physically supports these substrates).

### Agentic data integration & knowledge extraction

Agents depend on integrated knowledge views over heterogeneous sources — documents, tables, vector indexes, knowledge bases, memory, and multimodal content. Rather than treating documents as opaque context or chunking by layout heuristics, the system derives knowledge units, relations, provenance, temporal scopes, and materialized views — driven by downstream retrieval objectives and agent workloads. Unlike classical virtual integration that defers everything to query time, agentic integration must extract, align, and maintain knowledge between queries: schema and semantic alignment, entity/relation extraction, semantic joins, versioning, deduplication, conflict detection, and freshness. The goal is to turn fragmented corpora into inspectable substrates that agents can query, join, and trust.

Representative work:

- [**Sema, PVLDB'26**](/publications/#VLDB-26-2) — LLM-powered semantic operators inside DuckDB/SQL.

Recent writing: [Context Management 的下一代：维护模型可感知的世界](/blog/2026/next-gen-agent-zh/) ([English](/blog/2026/next-gen-agent-en/)).

### Retrieval and storage substrates

The knowledge substrates above sit on storage, indexing, and retrieval infrastructure. My work here targets dynamic graph stores, vector indexes, and hybrid query engines, where correctness under concurrent updates and retrieval throughput are the primary design constraints.

Representative work:

- [**VeloANN, arXiv'26**](/publication/Arxiv-26-2) — SSD-resident graph indexing for high-throughput vector search.
- [**SQLVec, ICDE'26**](/publication/ICDE-26) — SQL-native vector similarity search.
- [**GES, SIGMOD'25**](/publication/SIGMOD-25-1) — a production graph database service for interactive graph workloads.
- [**RapidStore, VLDB'25**](/publication/VLDB-25) — dynamic graph storage for concurrent read/write workloads.
- [**Dynamic Graph Storage Study, SIGMOD'25**](/publication/SIGMOD-25-3) — a systematic study of in-memory dynamic graph storage designs.
- [**Aquila, VLDB'26**](/publication/VLDB-26) — high-concurrency incremental graph query processing.

## Broader Systems Work

### Accelerator-aware query execution

I also work on accelerator-aware query execution: using tensor runtimes (PyTorch, TensorFlow) to execute SQL and graph operators on GPUs and heterogeneous hardware. The core problems are tensorizing irregular relational and graph operators, managing memory across XPU backends, and making query execution portable across accelerator stacks.

Representative work:

- [**TQEx(SQL), SIGMOD'26**](/publication/SIGMOD-26-2) — tensor-based SQL execution over heterogeneous accelerators.
- [**TenGraph, VLDB'24**](/publication/VLDB-24) — tensor-based graph query processing on PyTorch.
- [**TGraph, SIGMOD'25**](/publication/SIGMOD-25-2) — tensor-centric graph processing across tensor runtimes and accelerators.

### Earlier foundations

My earlier work focused on distributed query processing, subgraph analytics, and learned query optimization. These techniques — efficient joins, cardinality estimation, communication–computation separation, and distributed graph execution — form a systems foundation that I continue to build on today.

Representative work:

- [**Secco, SIGMOD'22**](/publication/SIGMOD-22-1) — distributed query processing with communication separated from local computation.
- [**DISC, VLDB'20**](/publication/VLDB-20) — distributed local subgraph counting via relational query processing.
- [**Crystal, VLDB'18**](/publication/VLDB-18) — compressed subgraph matching without materializing all matches.
- [**ALSS, SIGMOD'21**](/publication/SIGMOD-21) — a learned sketch for approximate subgraph counting.
- [**NNGP-Card, SIGMOD'22**](/publication/SIGMOD-22-2) — uncertainty-aware learned cardinality estimation.

## News

- **11/2025** — LDBC SNB Interactive imperative track world record (#1).
- **10/2025** — **Accelerating Triangle-Connected Truss Community Search Across Heterogeneous Hardware**, accepted by SIGMOD'26.
- **09/2025** — **Aquila: a high-concurrency system for incremental graph query**, accepted by VLDB'26.

[→ All news](/news/)

## Collaboration

**Open to collaboration** on agentic data management, retrieval-aware knowledge representation, agentic data integration and knowledge extraction, and vector/graph engines. Internship openings in Shenzhen — [email](mailto:zhanghao.ai@bytedance.com) with `[Intern]` in the subject line.
