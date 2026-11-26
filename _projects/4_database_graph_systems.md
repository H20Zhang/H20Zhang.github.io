---
layout: page
title: Database & Graph Research Systems @ CUHK
description: Earlier research systems spanning distributed SQL execution, graph analytics, and compressed subgraph processing.
importance: 4
category: systems
project_group: cuhk
related_publications: false
highlights:
  - label: SeccoSQL · SIGMOD 2022
    value: Communication decoupled from local computation
  - label: DISC · VLDB 2020
    value: Subgraph counting via relational query processing
  - label: Crystal · VLDB 2018
    value: Direct execution over compressed subgraph matches
research_support:
  - area: Distributed query execution
    papers:
      - name: Secco
        venue: SIGMOD 2022
        url: /publications/#SIGMOD-22-1
        code: https://github.com/H20Zhang/SeccoSQL
        summary: Separates communication from local computation in distributed query plans to expose a larger optimization space.
        role: Provides the distributed query-execution foundation for this systems line.
  - area: Distributed graph analytics
    papers:
      - name: DISC
        venue: VLDB 2020
        url: /publications/#VLDB-20
        code: https://github.com/H20Zhang/DISC
        summary: Expresses local subgraph counting as relational queries so distributed query-processing techniques can be reused.
        role: Connects graph analytics to relational execution in this systems line.
  - area: Compressed graph processing
    papers:
      - name: Crystal
        venue: VLDB 2018
        url: /publications/#VLDB-18
        code: https://github.com/H20Zhang/Crystal
        summary: Computes compressed subgraph-matching results directly to avoid large intermediate and output materialization.
        role: Introduces compressed execution to control intermediate and output explosion.
---

These earlier research systems, built during my Ph.D. at the Chinese University of Hong Kong, form the distributed database and graph-systems foundation behind my later work on production data infrastructure and AI-native systems.

## Core idea

Reformulate distributed SQL and large-scale graph workloads at the algebraic and execution-operator level—exposing communication as an explicit operator, recasting subgraph counting as relational algebra, and computing directly over compressed intermediate structures to avoid combinatorial blowup.

## My role

Lead Ph.D. researcher and first/corresponding author across all three systems at CUHK, advised by Prof. Jeffrey Xu Yu and Prof. Hong Cheng.

## SeccoSQL

**Distributed SQL execution with communication separated from computation (`SIGMOD 2022`).** SeccoSQL introduces a distributed query-processing model that treats data shuffling and local computation as independent operators, unlocking multi-way and cyclic join plans unreachable by conventional coupled engines.

- [Publication (SIGMOD 2022) →](/publications/#SIGMOD-22-1) · [Code on GitHub ↗](https://github.com/H20Zhang/SeccoSQL)

## DISC

**Distributed graph analytics through relational query processing (`VLDB 2020`).** DISC reduces general $k$-node orbit-aware local subgraph counting to homomorphism counting expressed in relational joins, group-by, and aggregation on Spark—supporting 114 pattern queries beyond prior 5-node limits.

- [Publication (VLDB 2020) →](/publications/#VLDB-20) · [Code on GitHub ↗](https://github.com/H20Zhang/DISC)

## Crystal

**Compressed execution for distributed subgraph matching (`VLDB 2018`).** Crystal decomposes patterns into core cliques and computes compressed match representations directly, dramatically cutting intermediate communication and output materialization on massive graphs.

- [Publication (VLDB 2018) →](/publications/#VLDB-18) · [Code on GitHub ↗](https://github.com/H20Zhang/Crystal)
