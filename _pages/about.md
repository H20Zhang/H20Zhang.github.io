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
    <p>Data infrastructure for LLM agents and AI-native workloads</p>
    <p><a href="mailto:zhanghao.ai@bytedance.com">zhanghao.ai@bytedance.com</a></p>

recent_publications: false
social: true

announcements:
  enabled: true
  scrollable: true
  limit: 5

latest_posts:
  enabled: false
---

I am a Research Scientist at ByteDance, working on data infrastructure for AI-native and agentic workloads. My recent work focuses on semantic query processing, multimodal retrieval and ETL, vector and graph data management, and accelerator-aware query execution.

A recurring theme in my research is how database systems should evolve when LLM-based agents and AI applications increasingly interact with heterogeneous data through retrieval, tools, and workflows.

## Highlights

- Authored and co-authored **20+ papers** in top-tier database venues including **SIGMOD, VLDB, ICDE, and TKDE**.
- Built database and Data+AI systems across distributed query processing, graph engines, vector search, semantic query processing, and tensor-native execution.
- Designed and architected systems such as **`Sema`, `GES`, `SeccoSQL`, `DISC`, and `Crystal`**, spanning research prototypes and production-oriented infrastructure.
- Achieved **LDBC SNB Interactive world-record results** in both the declarative track (2024) and the imperative track (2025), including a reported **3,000x improvement over the prior #2 result** in the declarative track.

## Research Thrusts

### Data systems for agents

I study how data systems can support LLM-based workflows over heterogeneous data, including semantic query processing, semantic ETL, multimodal querying, and evidence-oriented data processing.

Representative work: [Sema, arXiv'26](/publications/#Arxiv-26) — a high-performance system for LLM-based semantic query processing built around semantic operators and cost-aware execution.

### Retrieval and storage substrates

I work on systems for querying structured, vector, and graph data, with an emphasis on dynamic updates, high-throughput retrieval, and hybrid query processing for AI-native workloads.

Representative work: [VeloANN, arXiv'26](/publication/Arxiv-26-2) — SSD-resident graph ANN with storage-execution optimization; [SQLVec, ICDE'26](/publication/ICDE-26) — vector similarity search as a first-class SQL capability; [GES, SIGMOD'25](/publication/SIGMOD-25-1) — high-performance graph processing engine and service.

### Tensor-native execution

I explore how query engines can use tensor runtimes and modern accelerators to execute SQL, graph, and analytical operators efficiently.

Representative work: [TQEX(SQL), SIGMOD'26](/publication/SIGMOD-26-2) — tensor-based SQL execution bridging irregular relational workloads and tensor runtimes; [TenGraph, VLDB'24](/publication/VLDB-24) — tensor-based graph query execution; [TGraph, SIGMOD'25](/publication/SIGMOD-25-2) — tensor-centric graph processing.

### Distributed query processing

My earlier work studied distributed relational and graph query processing, especially communication-efficient execution and subgraph query processing.

Representative work: [Secco, SIGMOD'22](/publication/SIGMOD-22-1), [DISC, VLDB'20](/publication/VLDB-20), and [Crystal, VLDB'18](/publication/VLDB-18).

### Graph algorithms and AI4DB

I have also worked on graph algorithms, learned cardinality estimation, and learning-based support for query optimization.

Representative work: [ALSS, SIGMOD'21](/publication/SIGMOD-21), [NNGP-Card, SIGMOD'22](/publication/SIGMOD-22-2), [Learned Sketch for Subgraph Counting, VLDBJ'23](/publication/VLDBJ-23), [Time-Dependent Reachability, ICDE'24](/publication/ICDE-24-1), and [Streaming Embedding, ICDE'24](/publication/ICDE-24-2).

## Education

I received my **Ph.D.** from the Chinese University of Hong Kong in 2022 under the supervision of **[Prof. Jeffrey Xu Yu](https://www.se.cuhk.edu.hk/people/academic-staff/prof-yu-xu-jeffrey/)** and **[Prof. Hong Cheng](https://www.se.cuhk.edu.hk/people/academic-staff/prof-cheng-hong/)**. Before that, I earned my **B.S. in Computer Science** from the **[Hongyi Honor School](https://zh.wikipedia.org/zh-cn/%E6%AD%A6%E6%B1%89%E5%A4%A7%E5%AD%A6%E5%BC%98%E6%AF%85%E5%AD%A6%E5%A0%82)** at Wuhan University in 2017.

## Collaboration and Internships

- I welcome collaboration on technically ambitious systems challenges in database infrastructure, retrieval, vector search, graph systems, semantic data processing, and multimodal analytics.
- We are seeking strong interns in Shenzhen who are excited about research and development in Data+AI systems. If this fits your interests and background, please apply by [email](mailto:zhanghao.ai@bytedance.com) and prefix the subject line with `[Intern]`.
