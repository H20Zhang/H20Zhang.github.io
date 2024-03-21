---
permalink: /
title: "Hao Zhang"
excerpt:
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I am a research scientist at Huawei Cloud Database Innovation Lab, recruited through the TopMinds program. I obtained my graduate degree from the Database Group at [The Chinese University of Hong Kong](https://www.cuhk.edu.hk/) in 2022 under the guidance of [Prof. Jeffrey Xu Yu](https://www.se.cuhk.edu.hk/people/academic-staff/prof-yu-xu-jeffrey/), following my B.E. degree from the HongYi Honor Class of Wuhan University in 2017.

My research interests lie in query optimization and execution for large-scale OLAP queries, with a focus on two main areas:

1. Exploiting AI for Data Systems:
   - Leveraging Tensor Computation Runtime (TCR) as a backend to support various data analytic tasks, including relational algebra queries, subgraph graph queries, graph analytic queries, and ANNs.
   - Implementing machine learning-based query optimization (AI4DB) to improve the efficiency and effectiveness of query processing.
   - Pursuing unified execution and optimization of cross-domain queries, integrating SQL, graph, and AI technologies.

2. Building High-Performance Composable Graph Databases:
   - Developing high-performance graph-native storage and caching mechanisms.
   - Creating high-performance primitives to support graph database operations.
   - Optimizing complex graph queries, such as subgraph counting queries, to tackle challenges posed by intricate data structures and analytical requirements.

Currently, I am leading the development of the next-generation unified data processing engine at Huawei.

**We are actively seeking talented individuals for full-time positions and internships who share our passion for system research and development. If you're interested, please reach out to me with your details or resume!**


### Systems

* **TCRDS (2022-)**: TCRDS is a unified analytic engine for SQL queries, Subgraph queries, and Graph Analytic Queries, built upon Tensor Computation Runtime (TCR), such as PyTorch. Leveraging a highly optimized and cross-platform TCR backend, TCRDS achieves full-speed operation on all platforms (including Nvidia GPU, AMD GPU, Apple M series SoC, and Huawei Ascend), outperforming traditional purpose-built systems by orders of magnitude.

* **[SeccoSQL](https://github.com/H20Zhang/SeccoSQL) (2020-2022)**: SeccoSQL (Separate communication from computation) is an experimental distributed SQL engine on Spark designed for processing complex SQL/Graph queries. It explicitly decouples Relational Algebra (RA) operators into pure communication and computation operators. SeccoSQL can reorder operators at a finer granularity than existing SQL engines, enabling a greater search space of plans and further reducing communication costs.

* **[DISC](https://github.com/H20Zhang/DISC) (2018-2020)**: DISC is a specialized graph system on Spark for computing subgraph counts of arbitrary patterns and orbits in a relational manner. Unlike existing subgraph counting approaches that operate directly on graphs, DISC decomposes subgraph counting queries into a sequence of relational queries, enabling efficient execution.

* **[Crystal](https://github.com/H20Zhang/Crystal) (2016-2017)**: Crystal is a novel method for distributed subgraph matching on very large graphs. It differs from existing subgraph matching approaches by computing compressed results of subgraph matching directly, greatly reducing computation costs.


### Publications

* Yishu Wang, Jinlong Chu, Ye Yuan, Yu Gu, Hangxu Ji, **Hao Zhang**. Label Constrained Reacability Queries on Time Dependent Graphs. IEEE International Conference on Data Engineering (ICDE), 2024.

* Anbiao Wu, Ye Yuan, Changsheng Li, Yuliang Ma, **Hao Zhang**, Attributed Network Embedding in Streaming Style . IEEE International Conference on Data Engineering (ICDE), 2024.

* Kangfei Zhao, Jeffrey Xu Yu,, Qiyan Li, **Hao Zhang**, Yu Rong. Learned sketch for subgraph counting: a holistic approach. The VLDB Journal 32 (5), 937-962, 2023

* **Hao Zhang**, Jeffrey Xu Yu, Yikai Zhang, Kangfei Zhao. Parallel Query Processing: To Separate Communication from Computation. ACM SIGMOD/PODS International Conference on Managerment of Data (SIGMOD), 2022.

* **Hao Zhang**, Qiyan, Li, Kangfei Zhao, Jeffrey Xu Yu, Yuanyuan Zhu. How Learning Can Help Complex Cyclic Join Decomposition (Demo). IEEE International Conference on Data Engineering (ICDE), 2022.

* Kangfei Zhao, Jeffrey Xu Yu, Zongyan He, Rui Li, **Hao Zhang**. Lightweight and Accurate Cardinality Estimation by Neural Network Gaussian Process. ACM SIGMOD/PODS International Conference on Managerment of Data (SIGMOD), 2022.

* Kangfei Zhao, Jeffrey Xu Yu, **Hao Zhang**, Qiyan Li, Yu Rong, A Learned Sketch for Subgraph Counting. ACM SIGMOD/PODS International Conference on Managerment of Data (SIGMOD), 2021.

* **Hao Zhang**, Miao Qiao, Jeffrey Xu Yu, Hong Cheng. Fast Distributed Complex Join Processing (Short). IEEE International Conference on Data Engineering (ICDE), 2021.

* **Hao Zhang**, Jeffrey Xu Yu, Yikai Zhang, Kangfei Zhao, Hong Cheng. Distributed Subgraph Counting: A General Approach.  International Conference on Very Large Data Bases (VLDB), 2020.

* Kangfei Zhao, Jiao Su, Jeffrey Xu Yu, **Hao Zhang**. SQL-G: Efficient Graph Analytics by SQL. IEEE Transactions on Knowledge and Data Engineering (TKDE), 2019.

* Miao Qiao, **Hao Zhang**, Hong Cheng. Subgraph matching: on compression and computation. International Conference on Very Large Data Bases (VLDB), 2018.

* Yuanyuan Zhu, **Hao Zhang**, Lu Qin, Hong Cheng. Efficient MapReduce algorithms for triangle listing in billion-scale graphs. Distributed And Parallel Database (DPD), 2017.

* **Hao Zhang**, Yuanyuan Zhu, Lu Qin, Hong Cheng, Jeffrey Xu Yu. Efficient Local Clustering Coefficient Estimation in Massive Graphs. Database Systems for Advanced Applications (DASFAA), 2017

* **Hao Zhang**, Yuanyuan Zhu, Lu Qin, Hong Cheng, Jeffrey Xu Yu. Efficient triangle listing for billion-scale graphs. IEEE International Conference on Big Data (BigData), 2016


### Hornor & Awards

* First Class, TopMinds Program in Huawei, 2022
* Meritorious Winner, COMAP’s Mathematical Contest in Modeling, 2016
* Second Class, Hongyi Scholarship, 2015
* Second Class, HuaZhong Area Mathematical Modelling, 2015

### Professional Activities

* Reviewer: TKDD, PAKDD'21,22,23,24 , KDD'20, CIKM'20,21, AAAI'21
* External Reviewer: SIGMOD'21,22, VLDB'19,20,21,22, ICDE'19,20,21,22



[updated on 2024/03/21]







