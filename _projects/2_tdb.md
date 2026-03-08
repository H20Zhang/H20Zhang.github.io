---
layout: page
title: TDB
description: Tensor-centric execution for SQL, subgraph, and graph analytics over GPU and heterogeneous runtimes.
importance: 2
category: systems
related_publications: false
---

TDB is a unified GPU- and NPU-oriented query engine direction for SQL queries, subgraph queries, and graph analytic workloads built on top of tensor-computation runtimes such as PyTorch.

By relying on a highly optimized, cross-platform tensor runtime backend, it aims to make database-style workloads run naturally on heterogeneous hardware rather than treating accelerators as an afterthought.

The broader research question is how to close the gap between traditional database operators and accelerator-native execution so the same system can support relational processing, vector operations, and graph workloads without building separate engines for each.
