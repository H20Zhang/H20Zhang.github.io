---
layout: page
title: GES
description: Benchmark-leading graph database service architecture for high-throughput interactive workloads.
importance: 3
category: systems
related_publications: false
---

GES is a production graph database service architecture developed at Huawei for high-throughput interactive graph workloads.

## Problem

Interactive graph services need to serve complex graph queries with high concurrency, predictable latency, and production-grade manageability. Traditional graph engines often optimize for either offline graph analytics or isolated benchmark kernels, but production services must combine query throughput, maintainability, and extensibility.

## Core idea

The newer GES line uses a composable service architecture and factorized execution to improve high-concurrency query processing. The goal is to make graph query execution fast without turning the system into a benchmark-only prototype.

## My role

Research and system architecture for graph database infrastructure and the GES line of work, including execution design and benchmark-facing system optimization.

## Evidence

- [SIGMOD 2025 paper](/publications/#SIGMOD-25-1)
- [LDBC SNB Interactive declarative result, 2024](https://ldbcouncil.org/benchmarks/snb/interactive/2024-09-16-graph-engine-service-sf300/)
- [LDBC SNB Interactive imperative result, 2025](https://ldbcouncil.org/benchmarks/snb/interactive/2025-12-01-graph-engine-service-sf300/)

## Impact

GES reached **#1** on the LDBC SNB Interactive declarative track with reported throughput over **3,000×** the previous #2 result, and later reached **#1** on the imperative track with Graph Engine Service 3.1.0 at SF300.
