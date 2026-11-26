---
layout: page
title: TQEX @ Huawei
description: Hardware-portable database and graph acceleration through tensor runtimes across NVIDIA and AMD GPUs and Apple chips.
importance: 3
category: systems
project_group: huawei
external_url: https://doi.org/10.1145/3769835
external_label: TQEX, SIGMOD 2026
related_publications: false
highlights:
  - label: SQL Analytics Speedup
    value: 12.2× over DuckDB & 22.7× over HeavyDB (TPC-H SF100)
  - label: vs. Prior Tensor Engine
    value: Up to 41.9× faster than TQP
  - label: Accelerator Portability
    value: NVIDIA GPUs, AMD GPUs & Apple Silicon
research_support:
  - area: Tensor-based SQL execution
    papers:
      - name: TQEX
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

<h3 id="tqex-sql">TQEX — Relational SQL over Tensor Runtimes</h3>

Bridges irregular relational storage and query operators with uniform tensor execution, introducing compact variable-length string/data layouts, tensorized join and aggregation operators, and multi-XPU mapping strategies ([SIGMOD 2026](https://doi.org/10.1145/3769835)).

<h3 id="tengraph">TenGraph — Interactive Graph Queries on Tensors</h3>

Maps interactive multi-hop graph queries onto compact sparse-tensor representations of graph topology and executes batched graph-query operators on PyTorch ([PVLDB 2024](https://doi.org/10.14778/3704965.3704967)).

<h3 id="tgraph">TGraph — Tensor-Centric Graph Analytics Framework</h3>

Provides a general tensor-centric programming and execution framework with graph operators, compression, and out-of-memory execution across tensor runtimes and heterogeneous accelerator backends ([SIGMOD 2025](https://doi.org/10.1145/3709731)).

## My role

Research and system architecture across this Huawei-affiliated tensor-centric data-systems line, spanning query/runtime design and execution over heterogeneous accelerators.

## Impact

On supported TPC-H SF100 queries across **NVIDIA GPUs, AMD GPUs, and Apple silicon**, **TQEX** achieves **12.2× speedup over DuckDB**, **22.7× speedup over HeavyDB**, and **up to 41.9× speedup over the prior tensor query processor (TQP)**—demonstrating that a single portable tensor-runtime engine can outperform both CPU analytical engines and specialized GPU databases.

## Evidence

- [TQEX, SIGMOD 2026](https://doi.org/10.1145/3769835)
- [TenGraph, PVLDB 2024](https://doi.org/10.14778/3704965.3704967)
- [TGraph, SIGMOD 2025](https://doi.org/10.1145/3709731)

## System boundary

**TQEX** is the named tensor-based SQL engine. TenGraph and TGraph are adjacent systems that share the tensor-runtime thesis; they are not presented here as modules of TQEX.
