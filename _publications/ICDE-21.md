---
title: 'Fast Distributed Complex Join Processing'
collection: publications
permalink: /publication/ICDE-21
excerpt: 'Hao Zhang, Miao Qiao, Jeffrey Xu Yu, Hong Cheng'
date: 2021-10-01
venue: '37th IEEE International Conference on Data Engineering (ICDE) (Short)'
paperurl: 'https://arxiv.org/pdf/2102.13370.pdf'
citation: 
---
Abstract: Big data analytics often requires processing complex join queries in parallel in distributed systems such as Hadoop, Spark, Flink. The previous works consider that the main bottle- neck of processing complex join queries is the communication cost incurred by shuffling of intermediate results, and propose a way to cut down such shuffling cost to zero by a one-round multi- way join algorithm. The one-round multi-way join algorithm is built on a one-round communication optimal algorithm for data shuffling over servers and a worst-case optimal compu- tation algorithm for sequential join evaluation on each server. The previous works focus on optimizing the communication bottleneck, while neglecting the fact that the query could be computationally intensive. With the communication cost being well optimized, the computation cost may become a bottleneck. To reduce the computation bottleneck, a way is to trade computation with communication via pre-computing some partial results, but it can make communication or pre-computing becomes the bottleneck. With one of the three costs being considered at a time, the combined lowest cost may not be achieved. Thus the question left unanswered is how much should be traded such that the combined cost of computation, communication, and pre- computing is minimal.

In this work, we study the problem of co-optimize communi- cation, pre-computing, and computation cost in one-round multi- way join evaluation. We propose a multi-way join approach ADJ (Adaptive Distributed Join) for complex join which finds one optimal query plan to process by exploring cost-effective partial results in terms of the trade-off between pre-computing, communication, and computation.We analyze the input relations for a given join query and find one optimal over a set of query plans in some specific form, with high-quality cost estimation by sampling. Our extensive experiments confirm that ADJ outperforms the existing multi-way join methods by up to orders of magnitude.







