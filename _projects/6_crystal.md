---
layout: page
title: Crystal
description: Compressed execution approach for distributed subgraph matching on very large graphs.
importance: 6
category: systems
github: H20Zhang/Crystal
related_publications: false
---

Crystal is a method for distributed subgraph matching on very large graphs that computes compressed results directly instead of materializing large intermediate outputs.

## What it is

Crystal targets the output crisis in subgraph matching: for many graph pattern queries, materializing all matches or intermediate matches can dominate the overall cost. Crystal studies compressed representation and computation for such workloads.

## Key ideas

- Compress subgraph matching results to reduce output materialization cost.
- Compute compressed results directly instead of first materializing all matches.
- Reduce intermediate result overhead in distributed graph pattern queries.

## Links

- [Code](https://github.com/H20Zhang/Crystal)
- [VLDB 2018 paper](/publications/#VLDB-18)
