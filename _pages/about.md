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

I focus on the data infrastructure beneath agents — not context-window optimization such as prompt compression or KV cache management, but the systems layer that manages the information agents depend on: documents, tables, vectors, graphs, multimodal content, and externalized memory. Retrieval, semantic transformation, storage, and query execution — making agent-facing data scalable, fresh, and trustworthy. I use **agentic data management** to describe this research agenda, and write technical notes on this direction in the [Blog](/blog/).

## Highlights

- **25 papers** in **SIGMOD, VLDB, ICDE, and TKDE**, spanning retrieval, graph engines, tensor-native execution, and agentic data management.
- Designed and architected systems including **Sema, GES, SeccoSQL, DISC, and Crystal** — from research prototypes to production infrastructure. [→ Projects](/projects/)
- **LDBC SNB Interactive world-record results** in both the declarative track (2024, **3,000× over #2**) and the imperative track (2025).

## Research Thrusts

### Agentic data management

My research asks how data systems should manage the information that LLM agents depend on — not just filling the context window, but maintaining the underlying information environment so that it stays clean, traceable, up-to-date, and worth being searched. Agents depend on an information environment — documents, indexes, metadata, memory, canonical views — that must be actively maintained: versioned, deduplicated, provenance-tracked, conflict-detected, and kept fresh. The goal is not just to retrieve well, but to make the data environment worth retrieving from.

Recent writing: [Context Management 的下一代：维护模型可感知的世界](/blog/2026/next-gen-agent-zh/) ([English](/blog/2026/next-gen-agent-en/)).

### Semantic data management

Semantic transformation is one key capability for maintaining this environment: LLM-based querying, ETL, and multimodal parsing turn raw heterogeneous data into canonical views that agents can reliably use.

Representative work:

- [**Sema, arXiv'26**](/publications/#Arxiv-26) — makes LLM semantic operators first-class DuckDB plan nodes via SemaSQL and adaptive execution (operator reordering, semantic fusion, prompt batching), optimizing token cost and latency; **2–10× speedup** on semantic queries.

### Retrieval and storage substrates

The information environment above is physically built on storage, indexing, and retrieval substrates. My work here targets the infrastructure layer — dynamic graph stores, vector indexes, and hybrid query engines — where correctness under concurrent updates and retrieval throughput are the primary design constraints.

Representative work:

- [**VeloANN, arXiv'26**](/publication/Arxiv-26-2) — SSD-resident graph ANN with affinity-aware layout to reduce page over-fetch, a record-level buffer pool to eliminate hot/cold page thrashing, and a coroutine async runtime that overlaps I/O with compute; reaches **0.92× in-memory throughput with 10% memory** and **5.8× higher throughput** than disk-based SOTA.
- [**SQLVec, ICDE'26**](/publication/ICDE-26) — elevates vector similarity search to a first-class SQL capability, letting nearest-neighbor retrieval compose natively with relational joins, filters, and aggregation.
- [**GES, SIGMOD'25**](/publication/SIGMOD-25-1) — Huawei production graph engine whose composable architecture and factorized executor enable high-concurrency query processing; LDBC SNB declarative #1, **3,000× throughput over #2**.
- [**RapidStore, VLDB'25**](/publication/VLDB-25) — decouples read/write paths and separates version metadata from graph topology to balance insert, search, and scan performance in read-intensive dynamic graphs.
- [**Graph Storage Benchmark, SIGMOD'25**](/publication/SIGMOD-25-3) — unified dynamic-graph storage abstraction and test framework, exposing **3.3–10.8×** memory overhead over CSR in existing methods and version-control contention on high-degree vertices.
- [**Aquila, VLDB'26**](/publication/VLDB-26) — incremental graph query system for highly concurrent mixed read/write workloads, using fast delta propagation to return query results immediately after updates.

### Accelerator-aware query execution

I explore how query engines can leverage tensor runtimes such as PyTorch and TensorFlow to execute SQL and graph operators on GPUs and heterogeneous hardware. This line began before the agent framing, but the execution problems — tensorizing irregular queries and porting across XPU backends — become increasingly relevant as agent workloads drive up retrieval and computation intensity.

Representative work:

- [**TQEX(SQL), SIGMOD'26**](/publication/SIGMOD-26-2) — first systematic analysis of the gap between irregular SQL workloads and uniform tensor operators; tensorizes variable-length data, joins, and aggregation; **9.6× over TQP**, **27.9× over HeavyDB** on TPC-H, and **12.2× over DuckDB** at SF100.
- [**TenGraph, VLDB'24**](/publication/VLDB-24) — encodes graph topology as tensors and executes graph-query operators in batches on PyTorch; **50–100× GPU speedup over CPU** and substantial gains over existing CPU/GPU graph systems.
- [**TGraph, SIGMOD'25**](/publication/SIGMOD-25-2) — tensor-centric graph processing framework with graph compression and out-of-XPU-memory computation, portable across PyTorch/TensorFlow and Nvidia/AMD/Apple hardware.

### Earlier foundations

My earlier work focused on distributed query processing, subgraph analytics, and learned query optimization. These techniques — efficient joins, cardinality estimation, communication–computation separation, and distributed graph execution — turn out to be recurring primitives in the agentic data systems I build today.

Representative work:

- [**Secco, SIGMOD'22**](/publication/SIGMOD-22-1) — introduces pair (⊗) and local-compute (`op'`) operators to make communication explicit in distributed relational algebra, reducing intermediate-result shuffle via partitioning push-down and computation push-up.
- [**DISC, VLDB'20**](/publication/VLDB-20) — reduces local subgraph counting for arbitrary k-node patterns to homomorphism counting expressed as distributed joins, breaking the **k ≤ 5** limit of prior methods.
- [**Crystal, VLDB'18**](/publication/VLDB-18) — computes subgraph matching results directly over compressed representations instead of enumerating all matches; compression up to **10^5×**.
- [**ALSS, SIGMOD'21**](/publication/SIGMOD-21) — builds a learned sketch with neural regression for subgraph-count estimation, with an active learner that adapts online to new query patterns; useful for optimizer planning over complex self-joins.
- [**NNGP-Card, SIGMOD'22**](/publication/SIGMOD-22-2) — cardinality estimation based on Neural Network Gaussian Processes, with training in seconds, built-in uncertainty quantification, and robustness to workload shift.

## News

- **11/2025** — LDBC SNB Interactive imperative track world record (#1).
- **10/2025** — **Accelerating Triangle-Connected Truss Community Search Across Heterogeneous Hardware** accepted by SIGMOD'26.
- **09/2025** — **Aquila**, a high-concurrency system for incremental graph query, accepted by VLDB'26.

[→ All news](/news/)

## Collaboration

**Open to collaboration** on technically ambitious problems in agentic data management, retrieval systems, and vector/graph engines. Internship openings in Shenzhen — [email](mailto:zhanghao.ai@bytedance.com) with `[Intern]` in the subject line.
