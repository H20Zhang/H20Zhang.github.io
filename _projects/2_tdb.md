---
layout: page
title: TDB
description: Tensor-centric execution for SQL, subgraph, and graph analytics over GPU and heterogeneous runtimes.
importance: 4
category: systems
related_publications: false
---

TDB is a tensor-centric query execution direction for SQL, subgraph queries, and graph analytic workloads over GPU and heterogeneous accelerator runtimes.

## Problem

Database workloads contain irregular operators — joins, aggregation, variable-length data processing, graph traversal, and subgraph matching — that do not map directly to the uniform tensor operators used by modern accelerator runtimes. This creates a gap between database execution and accelerator-native computation.

## Core idea

TDB explores how to encode relational and graph workloads as tensor programs over runtimes such as PyTorch and TensorFlow, while preserving database-style execution semantics. The goal is to reuse optimized accelerator stacks without building a separate engine for each hardware backend.

## My role

Research and system design across tensor-centric SQL and graph execution, including operator tensorization, graph topology encoding, compression, and out-of-XPU-memory execution.

## Evidence

- [TQEX(SQL), SIGMOD 2026](/publication/SIGMOD-26-2)
- [TenGraph, VLDB 2024](/publication/VLDB-24)
- [TGraph, SIGMOD 2025](/publication/SIGMOD-25-2)

## Impact

The TDB line shows that database and graph workloads can benefit from tensor runtimes and heterogeneous hardware. Reported results include **9.6× over TQP**, **27.9× over HeavyDB**, **12.2× over DuckDB** on SQL workloads, and **50–100× GPU speedups** for graph-query operators.
