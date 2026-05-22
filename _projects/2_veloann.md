---
layout: page
title: VeloANN
description: SSD-resident graph ANN for high-throughput vector search with locality-aware storage and asynchronous execution.
importance: 2
category: systems
related_publications: false
---

VeloANN is an SSD-resident graph indexing system for high-throughput approximate nearest-neighbor search.

## Problem

Graph-based ANN indexes deliver strong search quality, but billion-scale vector datasets often exceed memory capacity. Moving the graph index to SSD reduces memory pressure, but naive SSD-resident traversal suffers from random I/O, page over-fetch, buffer-pool thrashing, and poor overlap between I/O and compute.

## Core idea

VeloANN treats storage layout, buffering, and execution as one co-designed system. It uses affinity-aware layout to reduce unnecessary page reads, a record-level buffer pool to avoid hot/cold page interference, and a coroutine-based asynchronous runtime to overlap SSD I/O with graph traversal computation.

## My role

Research contribution to the vector-search storage substrate line, focusing on the system-level design space for SSD-resident graph indexing and high-throughput retrieval.

## Evidence

- [ArXiv paper](/publication/Arxiv-26-2)
- SSD-resident graph ANN design with locality-aware layout, record-level buffering, and asynchronous execution.

## Impact

VeloANN reaches **0.92× in-memory throughput with 10% memory**, and reports **5.8× higher throughput** than disk-based prior systems, showing that SSD-resident ANN can narrow the gap to in-memory graph search while sharply reducing memory demand.
