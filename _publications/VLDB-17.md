---
title: 'Subgraph matching: on compression and computation'
collection: publications
permalink: /publication/VLDB-17
excerpt: 'Miao Qiao, Hao Zhang, Hong Cheng'
date: 2017-10-01
venue: 'International Conference on Very Large Data Bases (VLDB)'
paperurl: 'http://www.vldb.org/pvldb/vol11/p176-qiao.pdf'
citation:
---
Abstract: Subgraph matching finds a set I of all occurrences of a pattern graph in a target graph. It has a wide range of applications while suffers an expensive computation. This eciency issue has been studied extensively. All existing approaches, however, turn a blind eye to the output crisis, that is, when the system has to materialize I as a prepro- cessing/intermediate/final result or an index, the cost of the export of I dominates the overall cost, which could be pro- hibitive even for a small pattern graph.

This paper studies subgraph matching via two problems. 1) Is there an ideal compression of I? 2) Will the compres- sion of I reversely boost the computation of I? For the problem 1), we propose a technique called VCBC to com- press I to code(I) which serves effectively the same as I. For problem 2), we propose a subgraph matching compu- tation framework CBF which computes code(I) instead of I to bring down the output cost. CBF further reduces the overall cost by reducing the intermediate results. Extensive experiments show that the compression ratio of VCBC can be up to 105 which also significantly lowers the output cost of CBF. Extensive experiments show the superior performance of CBF over existing approaches.