---
title: 'A Learned Sketch for Subgraph Counting'
collection: publications
permalink: /publication/SIGMOD-21
excerpt: 'Kangfei Zhao, Jeffrey Xu Yu, Hao Zhang, Qiyan Li, Yu Rong'
date: 2021-10-01
venue: 'ACM SIGMOD/PODS International Conference on Managerment of Data (SIGMOD)'
paperurl:
citation:
---
Abstract: Subgraph counting, as a fundamental problem in network analysis, is to count the number of subgraphs in a data graph that match a given query graph by either homomorphism or subgraph isomorphism. The importance of subgraph counting drives from the fact that it provides insights of a large graph, in particular a labeled graph, when a collection of query graphs with different sizes and labels are issued. The problem of counting is challenging. On one hand, exact counting by enumerating subgraphs is NP-hard. On the other hand, approximate counting by subgraph isomorphism can only support 3/5-node query graphs over unlabeled graphs. Another way for subgraph counting is to specify it as an SQL query, and estimate the cardinality of the query in RDBMS. Existing approaches for cardinality estimation can only support subgraph counting by homomorphism up to some extent, as it is difficult to deal with sampling failure when a query graph becomes large. A question arisen is if subgraph counting can be supported by machine learning (ML) and deep learning (DL). The existing DL approach for subgraph isomorphism can only support small data graphs. The ML/DL approaches proposed in RDBMS context for approximate query processing and cardinality estimation cannot be used, as subgraph counting is to do complex self-joins over one relation, whereas existing approaches focus on multiple relations.
In this paper, we propose an Active Learned Sketch for Subgraph Counting (ALSS) with two main components: a sketch learned (LSS) and an active learner (AL). The sketch is learned by a neural network regression model, and the active learner is to perform model updates based on new arrival test query graphs. We conduct extensive experimental studies to confirm the effectiveness and efficiency of ALSS using large real labeled graphs. Moreover, we show that ALSS can assist query optimizer to find a better query plan for complex multi-way self-joins.







