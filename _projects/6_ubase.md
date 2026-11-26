---
layout: page
title: UBASE @ ByteDance
permalink: /projects/ubase/
description: Production AI search engine unifying trillion-scale vector retrieval, lexical matching, and predicate filtering across 7,000+ clusters and 300+ PB of indexed data.
importance: 2
category: systems
project_group: bytedance
related_publications: false
highlights:
  - label: Production Footprint
    value: 7,000+ clusters · 300+ PB · ~1T vectors
  - label: Core Mechanisms
    value: SymRaBitQ quantization & hybrid memory/SSD storage
  - label: Benchmark Gains
    value: Up to 3× throughput · 80% less memory · 99.4% lower $/QPS
figure:
  path: /assets/img/publication_preview/ubase.webp
  alt: UBASE architecture showing the control plane, coordinate service, hybrid query engine, adaptive storage engine, ML services, and quantization-aware vector kernel.
  caption: "UBASE system architecture: unified lexical, vector, and filtered query processing over quantization-aware graph indexes and adaptive memory/SSD storage (ATC 2026)."
research_support:
  - area: Trillion-scale AI search engine
    papers:
      - name: UBASE
        venue: ATC 2026
        url: /publications/#ATC-26
        summary: Presents ByteDance's unified AI search engine with SymRaBitQ quantization-aware graph-index construction and hybrid memory/SSD storage across 7,000+ production clusters.
        role: Defines the production search architecture, quantization-aware vector kernel, and hybrid storage engine.
  - area: SSD-resident vector graph indexing
    papers:
      - name: SSD-Resident Graph Indexing
        venue: arXiv 2026
        url: /publications/#Arxiv-26-2
        summary: Optimizes disk-resident proximity-graph layout, caching, and asynchronous I/O scheduling for high-throughput vector search on NVMe SSDs.
        role: Deepens the storage and I/O execution layer for large-scale SSD-backed vector retrieval.
---

Since 2016, **UBASE** has served as core search infrastructure at ByteDance, scaling to **more than 7,000 clusters and 300+ PB of indexed data**. Driven by AI retrieval workloads, UBASE evolved from a text search engine into a unified AI search platform supporting vector similarity search, lexical matching, and structured predicate filtering—with its largest deployment indexing **nearly one trillion high-dimensional vectors**.

## Problem

Operating vector search at trillion-vector scale under sustained real-time ingestion exposes two fundamental bottlenecks:
- **Memory-intensive index construction:** Building and merging proximity-graph indexes under continuous writes ordinarily requires retaining full-precision vectors in memory alongside graph structures.
- **Prohibitive serving cost:** Keeping hundreds of terabytes or petabytes of vector indexes entirely in DRAM is economically unsustainable, while naive SSD offloading degrades tail latency and throughput.

## Core idea

UBASE addresses both bottlenecks within an OpenSearch-compatible distributed search engine:

- **Quantization-aware vector kernel (`SymRaBitQ`):** Introduces a symmetric quantization scheme with theoretical error bounds that enables proximity-graph construction and segment merging directly in the quantized space, eliminating the need to retain full-precision vectors in memory during indexing.
- **Adaptive hybrid storage engine:** Supports memory-resident, hybrid, and NVMe SSD-resident deployments under one storage abstraction, using fine-grained record-level caching and asynchronous I/O to trade memory for latency under operational control.
- **Unified hybrid query engine:** Executes vector search, filtered search, radial search, and Apache Lucene lexical retrieval in a coordinated pipeline.

## My role

Research Scientist and **corresponding author** on the UBASE research paper (ATC 2026), contributing to the system formulation, quantization-aware vector indexing, and hybrid memory/SSD retrieval architecture.

## Impact

UBASE powers retrieval across major ByteDance workloads—including conversational assistants, RAG, agentic workflows, recommendation, and semantic analysis—managing **300+ PB** across **7,000+ clusters**. On large-scale benchmarks, UBASE delivers **up to 3× higher query throughput**, reduces peak indexing memory by **80%**, and lowers serving cost (`$/QPS`) by **up to 99.4%** compared with prior systems.

## Evidence

- [UBASE: An AI Search Engine for Trillion-Scale Vector Data Management at ByteDance (ATC 2026)](https://doi.org/10.1145/3828523.3857093)
- [Optimizing SSD-Resident Graph Indexing for High-Throughput Vector Search (arXiv 2026)](https://arxiv.org/abs/2602.22805)
