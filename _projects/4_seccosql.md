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

Its defining idea is to explicitly decouple relational operators into pure communication and pure computation operators, which exposes a much larger plan space than conventional distributed SQL engines.

That separation makes it possible to reorder operators at a finer granularity and reduce communication cost more aggressively on distributed workloads.

Links: [Code](https://github.com/H20Zhang/SeccoSQL) · [SIGMOD 2022 paper](/publications/#SIGMOD-22-1)
