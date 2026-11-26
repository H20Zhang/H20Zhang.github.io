---
layout: page
title: GES @ Huawei
description: Production graph database supporting hundreds of billions of edges and high-performance real-time queries, with audited LDBC benchmark-leading results.
importance: 2
category: systems
project_group: huawei
external_url: https://www.huaweicloud.com/product/ges.html
external_label: Huawei GES
secondary_links:
  - label: "LDBC Declarative #1"
    url: https://ldbcouncil.org/benchmarks/snb/interactive/2024-09-16-graph-engine-service-sf300/
  - label: "LDBC Imperative #1"
    url: https://ldbcouncil.org/benchmarks/snb/interactive/2025-12-01-graph-engine-service-sf300/
related_publications: false
highlights:
  - label: "LDBC Declarative #1"
    value: "40,347 throughput at SF300 (>3,000× previous #2)"
  - label: "LDBC Imperative #1"
    value: 139,411 throughput at SF300 (GES 3.1.0)
  - label: Production Scale
    value: Graphs with hundreds of billions of edges
research_support:
  - area: Service architecture & execution
    papers:
      - name: GES
        venue: SIGMOD 2025
        url: /publications/#SIGMOD-25-1
        summary: Introduces a production graph service architecture with composable components and factorized execution for high-concurrency interactive workloads.
        role: Provides the core service architecture and factorized executor behind the production system.
  - area: Dynamic storage
    papers:
      - name: RapidStore
        venue: VLDB 2025
        url: /publications/#VLDB-25
        summary: Separates reads and writes and decouples version data to support concurrent queries and updates on dynamic graphs.
        role: Provides scalable concurrent storage for dynamic graph workloads.
      - name: DGS Study
        venue: SIGMOD 2025
        url: /publications/#SIGMOD-25-3
        summary: Compares in-memory dynamic graph storage designs and identifies key storage and concurrency bottlenecks.
        role: Motivates the storage and concurrency choices in this design space.
  - area: Incremental graph queries
    papers:
      - name: Aquila
        venue: VLDB 2026
        url: /publications/#VLDB-26
        summary: Develops high-concurrency incremental graph query processing for evolving graph data.
        role: Extends the system line toward incremental processing under concurrent updates.
  - area: Related Huawei graph research
    papers:
      - name: Time-dependent label-constrained reachability
        venue: ICDE 2024
        url: /publications/#ICDE-24-1
        summary: Studies reachability under ordered label and time-dependent constraints, with indexing strategies that balance construction cost and query efficiency.
        role: Extends the Huawei-affiliated graph research portfolio toward indexed graph reachability queries.
      - name: SANE
        venue: ICDE 2024
        url: /publications/#ICDE-24-2
        summary: Updates attributed-network embeddings in a streaming style while retaining information from previously observed attributes.
        role: Represents adjacent work on evolving attributed graphs rather than a component of GES.
      - name: Unsupervised graph-classification attack
        venue: DASFAA 2025
        url: /publications/#DASFAA-25
        summary: Develops a label-free adversarial attack for graph classification using contrastive representations and learned edge perturbations.
        role: Represents adjacent graph-learning research and is not presented as part of the GES implementation.
---

Huawei GES is a production graph database service supporting **graphs with hundreds of billions of edges** and high-performance, real-time graph queries. It earned audited **#1 LDBC SNB Interactive results** on the declarative (2024) and imperative (2025) tracks.

## Problem

Interactive graph services need to serve complex graph queries with high concurrency, predictable latency, and production-grade manageability. Production systems must combine query throughput with maintainability, extensibility, and operational robustness rather than optimize only isolated benchmark kernels.

## Core idea

The GES research and system line combines three connected pillars to sustain high concurrency on evolving graphs:

- **Composable service architecture & factorized execution (`GES`, SIGMOD 2025):** Decouples cloud service components while using compact factorized intermediate representations (`f-Block` / `f-Tree`) in the query executor to eliminate multi-hop Cartesian blowups under high concurrency.
- **Read/write-decoupled dynamic graph storage (`RapidStore`, VLDB 2025; `DGS Study`, SIGMOD 2025):** Separates read-optimized topology access from concurrent versioned updates so heavy update streams do not stall interactive queries.
- **High-concurrency incremental graph queries (`Aquila`, VLDB 2026):** Maintains incremental query results efficiently under concurrent graph updates.

## My role

Architect & Research Scientist — led the team from exploratory R&D through production deployment across the GES graph database infrastructure line, spanning storage/execution architecture and benchmark-facing system engineering.

## Evidence

- [Huawei Cloud Graph Engine Service](https://www.huaweicloud.com/product/ges.html)
- [LDBC SNB Interactive declarative result, 2024](https://ldbcouncil.org/benchmarks/snb/interactive/2024-09-16-graph-engine-service-sf300/)
- [LDBC SNB Interactive imperative result, 2025](https://ldbcouncil.org/benchmarks/snb/interactive/2025-12-01-graph-engine-service-sf300/)

## Impact

GES reached **#1** on the LDBC SNB Interactive declarative track (SF300, 2024) with audited **40,347.04 throughput**—exceeding the previous #2 result by **over 3,000×**—and subsequently reached **#1** on the imperative track (SF300, 2025) with **139,411.14 throughput** on Graph Engine Service 3.1.0.

## System boundary

`GES`, `RapidStore`, `DGS Study`, and `Aquila` address the core service, dynamic storage, and incremental execution design space; the Huawei-affiliated papers on indexed reachability (`ICDE 2024`), streaming attributed network embedding (`SANE`, `ICDE 2024`), and graph learning (`DASFAA 2025`) represent adjacent graph research rather than modules of the deployed GES kernel.
