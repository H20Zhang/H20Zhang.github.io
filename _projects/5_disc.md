---
layout: page
title: DISC
description: Distributed graph analytics system that decomposes subgraph counting into relational queries.
importance: 5
category: systems
github: H20Zhang/DISC
related_publications: false
---

DISC is a specialized graph system on Spark for subgraph query processing, especially subgraph counting expressed in a relational way.

## What it is

DISC decomposes subgraph counting into a sequence of relational queries. This lets the system reuse relational optimization and distributed execution techniques instead of relying only on graph-native operators.

## Key ideas

- Relational formulation of local subgraph counting.
- Distributed execution over Spark for large-scale graph workloads.
- General support for pattern graphs and orbits beyond narrow special cases.

## Links

- [Code](https://github.com/H20Zhang/DISC)
- [VLDB 2020 paper](/publications/#VLDB-20)
