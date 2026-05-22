---
layout: about
title: About
permalink: /
subtitle: Research Scientist at ByteDance

profile:
  align: right
  image: bio-photo.jpeg
  image_circular: false
  more_info: >
    <p>Research Scientist, ByteDance</p>
    <p>Data Systems for Agents</p>
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

I am a Research Scientist at ByteDance, working on **data systems for LLM agents**. I received my **Ph.D.** from the Chinese University of Hong Kong in 2022, advised by **[Prof. Jeffrey Xu Yu](https://www.se.cuhk.edu.hk/people/academic-staff/prof-yu-xu-jeffrey/)** and **[Prof. Hong Cheng](https://www.se.cuhk.edu.hk/people/academic-staff/prof-cheng-hong/)**, and my **B.S. in Computer Science** from the **[Hongyi Honor School](https://zh.wikipedia.org/zh-cn/%E6%AD%A6%E6%B1%89%E5%A4%A7%E5%AD%A6%E5%BC%98%E6%AF%85%E5%AD%A6%E5%A0%82)** at Wuhan University in 2017.

I focus on the data infrastructure beneath agents — not context-window optimization such as prompt compression or KV cache management, but the systems layer that manages the information agents depend on: documents, tables, vectors, graphs, multimodal content, and externalized memory. Storage, indexing, retrieval, semantic transformation, environment maintenance, and query execution — making agent-facing data scalable, fresh, trustworthy, and useful. I use **agentic data management** to describe this research agenda, and write technical notes on this direction in the [Blog](/blog/).

## Highlights

- **25 papers** in **SIGMOD, VLDB, ICDE, and TKDE**, spanning retrieval, graph engines, tensor-native execution, and agentic data management.
- Designed and architected systems including **Sema, GES, SeccoSQL, DISC, and Crystal** — from research prototypes to production infrastructure. [→ Projects](/projects/)
- **LDBC SNB Interactive world-record results** in both the declarative track (2024, **3,000× over #2**) and the imperative track (2025).

## Research Thrusts

### Agentic data management

My research asks how data systems should manage the information that LLM agents depend on — not just filling the context window, but maintaining the underlying information environment so that it stays clean, traceable, up-to-date, and worth being searched. This agenda spans three thrusts below.

Recent writing: [Context Management 的下一代：维护模型可感知的世界](/blog/2026/next-gen-agent-zh/) ([English](/blog/2026/next-gen-agent-en/)).

### Context data management

Agents depend on an information environment — documents, indexes, metadata, memory, canonical views — that must be actively maintained: versioned, deduplicated, provenance-tracked, conflict-detected, and kept fresh. The goal is not just to retrieve well, but to make the data environment worth retrieving from. Semantic transformation, including LLM-based querying, ETL, and multimodal parsing, is one key capability; but the broader problem is maintaining a living data landscape that agents can draw from across tasks and sessions.

Representative work: [Sema, arXiv'26](/publications/#Arxiv-26) — a DuckDB-based system for LLM-based semantic query processing with semantic operators and adaptive execution.

### Retrieval and storage substrates

I work on systems for storing, indexing, and querying structured, vector, and graph data, with emphasis on dynamic updates, high-throughput retrieval, and hybrid query processing. These substrates are the infrastructure that the information environment above is physically built on.

Representative work: [VeloANN, arXiv'26](/publication/Arxiv-26-2), [SQLVec, ICDE'26](/publication/ICDE-26), [GES, SIGMOD'25](/publication/SIGMOD-25-1), [RapidStore, VLDB'25](/publication/VLDB-25), [Graph Storage Benchmark, SIGMOD'25](/publication/SIGMOD-25-3), and [Aquila, VLDB'26](/publication/VLDB-26).

### Accelerator-aware query execution

I explore how query engines can leverage tensor runtimes such as PyTorch and TensorFlow to execute SQL and graph operators on GPUs and heterogeneous hardware. This line of work is not agent-specific in origin, but provides the execution substrate that agentic data management can build on as agent workloads grow in retrieval and computation intensity.

Representative work: [TQEX(SQL), SIGMOD'26](/publication/SIGMOD-26-2) — 9.6× over TQP and 27.9× over HeavyDB on TPC-H; [TenGraph, VLDB'24](/publication/VLDB-24); [TGraph, SIGMOD'25](/publication/SIGMOD-25-2).

### Earlier foundations

My earlier work on distributed query processing, including [Secco](/publication/SIGMOD-22-1), [DISC](/publication/VLDB-20), and [Crystal](/publication/VLDB-18), and learned query optimization, including [ALSS](/publication/SIGMOD-21) and [NNGP-Card](/publication/SIGMOD-22-2), addressed problems that remain recurring primitives in agentic data management: efficient joins, cardinality estimation, communication-computation separation, and large-scale graph execution.

## News

- **11/2025** — LDBC SNB Interactive imperative track world record (#1).
- **10/2025** — **Accelerating Triangle-Connected Truss Community Search Across Heterogeneous Hardware** accepted by SIGMOD'26.
- **09/2025** — **Aquila**, a high-concurrency system for incremental graph query, accepted by VLDB'26.

[→ All news](/news/)

## Collaboration

**Open to collaboration** on technically ambitious problems in agentic data management, retrieval systems, and vector/graph engines. Internship openings in Shenzhen — [email](mailto:zhanghao.ai@bytedance.com) with `[Intern]` in the subject line.
