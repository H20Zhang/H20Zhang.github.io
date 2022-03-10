---
title: 'How Learning Can Help Complex Cyclic Join Decomposition'
collection: publications
permalink: /publication/ICDE-22
excerpt: 'Hao Zhang, Qiyan, Li, Kangfei Zhao, Jeffrey Xu Yu, Yuanyuan Zhu'
date: 2022-10-01
venue: '38th IEEE International Conference on Data Engineering (ICDE) (Demo) (To appear)'
paperurl: 
citation:
---
Abstract: Recently, machine learning (ML) and deep learning (DL) techniques have been extensively studied in database sys- tems including cardinality/selectivity estimation for optimizing queries with selections and joins. However, the issue of how to support complex cyclic join queries by ML/DL has not yet been well studied. An important research issue in optimizing complex cyclic join queries is how to decompose complex cyclic joins into a join tree where a node in the join tree may represent a subquery with cyclic joins. The main application of complex cyclic join queries is to support subgraph matching queries, which find matches of a user-given pattern graph in a large node/edge- labeled graph by subgraph isomorphism, when a graph is stored in a relational database system. Here, when a graph is stored in an edge table, the joins will be mainly self-joins. In the existing work, such decomposition is done by estimation with AGM bound. In this work, we demonstrate how ML/DL can support such complex cyclic self-joins by providing a more accurate estimation. We build a prototyped system, LSSMatch, based on ML/DL techniques, with a GUI to provide insights to observe how ML/DL-based techniques contribute to query optimization for complex cyclic self-join queries.





