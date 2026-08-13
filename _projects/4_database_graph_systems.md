---
layout: page
title: Database & Graph Research Systems @ CUHK
description: Earlier research systems spanning distributed SQL execution, graph analytics, and compressed subgraph processing.
importance: 3
category: systems
related_publications: false
---

These earlier research systems form the database and graph-systems foundation behind my later work on production data infrastructure and AI-native systems.

## SeccoSQL

**Distributed SQL execution with communication separated from computation.** SeccoSQL explores a distributed query-processing model that exposes communication and local computation as separate operators, enabling a larger optimization space for complex SQL and graph-style queries.

- [GitHub](https://github.com/H20Zhang/SeccoSQL)
- [SIGMOD 2022 paper](/publications/#SIGMOD-22-1)

## DISC

**Distributed graph analytics through relational query processing.** DISC decomposes local subgraph counting into relational queries so that distributed execution and relational optimization techniques can be reused for graph workloads.

- [GitHub](https://github.com/H20Zhang/DISC)
- [VLDB 2020 paper](/publications/#VLDB-20)

## Crystal

**Compressed execution for distributed subgraph matching.** Crystal computes compressed results directly to reduce intermediate and output materialization costs for very large graph-pattern workloads.

- [GitHub](https://github.com/H20Zhang/Crystal)
- [VLDB 2018 paper](/publications/#VLDB-18)
