---
layout: page
title: GES @ Huawei Cloud
description: Production graph database service for high-throughput interactive graph workloads.
importance: 2
category: systems
external_url: https://support.huaweicloud.com/productdesc-ges/ges_04_0001.html
external_label: Huawei GES
secondary_links:
  - label: LDBC Declarative #1
    url: https://ldbcouncil.org/benchmarks/snb/interactive/2024-09-16-graph-engine-service-sf300/
  - label: LDBC Imperative #1
    url: https://ldbcouncil.org/benchmarks/snb/interactive/2025-12-01-graph-engine-service-sf300/
related_publications: false
research_support:
  - area: Service architecture & execution
    papers:
      - name: GES
        url: /publications/#SIGMOD-25-1
        role: presents the composable service architecture and factorized executor behind the production system
  - area: Dynamic storage
    papers:
      - name: RapidStore
        url: /publications/#VLDB-25
        role: develops read-write separation for scalable concurrent dynamic graph storage
      - name: DGS Study
        url: /publications/#SIGMOD-25-3
        role: identifies storage and concurrency bottlenecks that motivate this design space
  - area: Incremental graph queries
    papers:
      - name: Aquila
        url: /publications/#VLDB-26
        role: extends the research line toward high-concurrency incremental graph query processing
---

Huawei GES is a production graph database service for high-throughput interactive graph workloads.

## Problem

Interactive graph services need to serve complex graph queries with high concurrency, predictable latency, and production-grade manageability. Production systems must combine query throughput with maintainability, extensibility, and operational robustness rather than optimize only isolated benchmark kernels.

## Core idea

The newer GES line uses a composable service architecture and factorized execution to improve high-concurrency query processing while retaining a production-oriented system design.

## My role

Research and system architecture for graph database infrastructure and the GES line of work, including execution design and benchmark-facing system optimization.

## Evidence

- [Huawei Cloud Graph Engine Service](https://support.huaweicloud.com/productdesc-ges/ges_04_0001.html)
- [LDBC SNB Interactive declarative result, 2024](https://ldbcouncil.org/benchmarks/snb/interactive/2024-09-16-graph-engine-service-sf300/)
- [LDBC SNB Interactive imperative result, 2025](https://ldbcouncil.org/benchmarks/snb/interactive/2025-12-01-graph-engine-service-sf300/)

## Impact

GES reached **#1** on the LDBC SNB Interactive declarative track with reported throughput over **3,000×** the previous #2 result, and later reached **#1** on the imperative track with Graph Engine Service 3.1.0 at SF300.
