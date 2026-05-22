---
layout: page
title: SeccoSQL
description: Experimental distributed SQL engine that separates communication from computation.
importance: 4
category: systems
github: H20Zhang/SeccoSQL
related_publications: false
---

SeccoSQL is an experimental distributed SQL engine on Spark designed for complex SQL and graph-style queries.

## What it is

SeccoSQL explores a distributed query execution model that explicitly separates communication from computation. This exposes a larger optimization space than conventional distributed SQL engines, where data movement and local execution are usually coupled inside each operator.

## Key ideas

- Explicit communication and computation operators for relational algebra.
- Finer-grained operator reordering to reduce distributed communication cost.
- Spark-based implementation for complex SQL and graph-style query workloads.

## Links

- [Code](https://github.com/H20Zhang/SeccoSQL)
- [SIGMOD 2022 paper](/publications/#SIGMOD-22-1)
