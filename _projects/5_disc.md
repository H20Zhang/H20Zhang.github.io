---
layout: page
title: DISC
description: Distributed graph analytics system that decomposes subgraph counting into relational queries.
importance: 5
category: systems
github: H20Zhang/DISC
related_publications: false
---

DISC is a specialized graph system on Spark for subgraph query processing, especially subgraph counting, expressed in a relational way.

Unlike graph systems that operate directly on graph-native operators, DISC decomposes subgraph counting into a sequence of relational queries, which lets the system reuse relational optimization and distributed execution techniques.

The project showed that relational execution can be a practical route for large-scale graph workloads when the decomposition strategy is designed carefully.

Links: [Code](https://github.com/H20Zhang/DISC) · [VLDB 2020 paper](/publications/#VLDB-20)
