---
layout: page
title: Database & Graph Research Systems @ CUHK
description: Earlier research systems spanning distributed SQL execution, graph analytics, and compressed subgraph processing.
importance: 3
category: systems
related_publications: false
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

These earlier research systems form the database and graph-systems foundation behind my later work on production data infrastructure and AI-native systems.

## SeccoSQL

**Distributed SQL execution with communication separated from computation.** SeccoSQL explores a distributed query-processing model that exposes communication and local computation as separate operators, enabling a larger optimization space for complex SQL and graph-style queries.

- [GitHub](https://github.com/H20Zhang/SeccoSQL)

## DISC

**Distributed graph analytics through relational query processing.** DISC decomposes local subgraph counting into relational queries so that distributed execution and relational optimization techniques can be reused for graph workloads.

- [GitHub](https://github.com/H20Zhang/DISC)

## Crystal

**Compressed execution for distributed subgraph matching.** Crystal computes compressed results directly to reduce intermediate and output materialization costs for very large graph-pattern workloads.

- [GitHub](https://github.com/H20Zhang/Crystal)
