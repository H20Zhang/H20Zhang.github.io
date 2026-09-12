---
layout: page
title: TQEX @ Huawei
description: Tensor-centric SQL, graph-query, and graph-processing systems across heterogeneous accelerators.
importance: 3
category: systems
project_group: huawei
external_url: https://doi.org/10.1145/3769835
external_label: TQEx(SQL), SIGMOD 2026
related_publications: false
research_support:
  - area: Tensor-based SQL execution
    papers:
      - name: TQEx(SQL)
        venue: SIGMOD 2026
        url: /publications/#SIGMOD-26-2
        summary: Bridges irregular relational workloads and uniform tensor operations through variable-length storage, tensorized joins and aggregates, and multi-XPU execution.
        role: Anchors the line with a portable SQL engine built over tensor computation runtimes.
  - area: Tensor-based graph queries
    papers:
      - name: TenGraph
        venue: VLDB 2024
        url: /publications/#VLDB-24
        summary: Represents graph topology with compact tensors and batches graph-query operations through PyTorch.
        role: Extends tensor-runtime execution to interactive graph queries.
  - area: Tensor-centric graph processing
    papers:
      - name: TGraph
        venue: SIGMOD 2025
        url: /publications/#SIGMOD-25-2
        summary: Provides tensor-based graph operators, compression, and out-of-memory execution across multiple tensor runtimes and accelerator backends.
        role: Generalizes the approach from graph queries to graph algorithms.

---

TQEX anchors a broader **tensor-centric execution line** that maps irregular SQL and graph workloads onto portable tensor runtimes and heterogeneous accelerators. The individual systems are related research threads, not components of a single codebase.

## Problem

Specialized accelerators offer substantial compute capacity, but hardware-specific database and graph systems are expensive to port and maintain. Tensor computation runtimes provide a common programming layer across accelerator backends, yet SQL and graph workloads are irregular: variable-length values, joins, sparse topology, dynamic frontiers, and graph indexes do not map directly to uniform tensor operations.

## Core idea

Use tensor computation runtimes as the portability layer, then bridge the workload–tensor gap with data-system techniques: compact representations, workload-specific tensor operators, batched execution, compression, and out-of-memory strategies.

This Huawei-affiliated research line spans three workloads:

- **TQEx(SQL)** bridges relational storage and operators with tensor execution, including variable-length data, joins, aggregates, and multi-XPU processing.
- **TenGraph** maps interactive graph queries to compact tensor representations and batched tensor computation.
- **TGraph** provides a tensor-centric programming and execution framework for graph algorithms across tensor runtimes and accelerator backends.

## My role

Research and system architecture across this Huawei-affiliated tensor-centric data-systems line, spanning query/runtime design and execution over heterogeneous accelerators.

## Evidence

- [TQEx(SQL), SIGMOD 2026](https://doi.org/10.1145/3769835)
- [TenGraph, PVLDB 2024](https://doi.org/10.14778/3704965.3704967)
- [TGraph, SIGMOD 2025](https://doi.org/10.1145/3709731)

## System boundary

**TQEx(SQL)** is the named tensor-based SQL engine. TenGraph and TGraph are adjacent systems that share the tensor-runtime thesis; they are not presented here as modules of TQEx(SQL).
