---
permalink: /
title: "Hao Zhang"
excerpt:
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Currently, I am leading the development/research of Data+AI system at Huawei Cloud Database Innovation Lab.

We are actively seeking talented individuals for full-time positions and internships who share our passion for systems research and development. If you are interested, please reach out with your details or resume!

### News
- 06/2025 One paper accepted by VLDB'25. Congrats to Chiyu Hao and Prof.Shixuan Sun!
- 02/2025 Awarded the Huawei Gold Award for Individual Excellence, awarded to top 0.5% of employees.
- 02/2025 One paper accepted by SIGMOD'25. Congrats to colleagues in Huawei and my collaborators!
- 11/2024 One paper accepted by SIGMOD'25. Congrats to Prof.Sun Shixuan!
- 11/2024 One paper accepted by SIGMOD'25. Congrats to Yongliang Zhang and Prof.Yuanyuan Zhu!
- 09/2024 Built the world's fastest Graph Database, reaching [Top-1](https://ldbcouncil.org/benchmarks/snb/LDBC_SNB_I_20240916_SF30-100-300_huawei.pdf) in [LDBC Benchmark](https://ldbcouncil.org/benchmarks/snb-interactive/), the most authoritative ranking in graph database, and outperforming the previous Top-1 by 3000X! A big congratulation to all my team members and collaborators at Huawei!
- 06/2024 One paper accepted by VLDB'24 Research Track. Congrats to Guanghua Li and my collaborators!
- 06/2024 Join Linked Data Benchmark Council (LDBC) as MPC member on behalf of Huawei Cloud!
- 10/2023 Two paper accepted by ICDE'24 Research Track!
- 05/2023 One paper accepted by The VLDB Journal!
- 10/2022 Join Huawei Cloud Database Innovation Lab!

### Biography
I am a Research Scientist at Huawei Cloud Database Innovation Lab, recruited through the prestigious TopMinds program. I obtained my Ph.D. from the Database Group at The Chinese University of Hong Kong in 2022, under the mentorship of Prof. Jeffrey Xu Yu. Prior to that, I obtained my B.E. degree from the HongYi Honor Class at Wuhan University in 2017.

### Research Interests

My current research focuses on building systems for the Data + AI/LLM, particularly in the following areas

1. Declarative Data + AI system for processing unstructured+structured data with semantic understanding.
2. GPU/NPU-accelerated data system for structured and unstructured data.
3. High performance graph database for knowledge management.


My previous research interest includes:
- Distributed query processing system that focous on solving complex relational/graph queries.
- Distributed algorithms for foundamental problems in graph, i.e., subgraph matching.

### Systems

* **DAIS (2024-Present)**: Declarative Data+AI System (DAIS) is a compound AI system with a focus on semantic understanding of unstructured and structured data.

* **GES (2022-Present)**: The Graph Engine Service (GES) is a high-performance, fully managed graph database service developed by Huawei to handle complex graph-based queries and large-scale graph computing tasks. We have developed the next generation of GES, employing advanced techniques to enhance performance by several orders of magnitude. The performance is validated at [LDBC-SNB-IC](https://ldbcouncil.org/benchmarks/snb-interactive/) a classcial benchmark for graph database, where we achieved #1 results with 3000X performance improvement over the #2.

* **TCRDS (2022-Present)**: TCRDS is a unified analytic engine for SQL queries, Subgraph queries, and Graph Analytic Queries, built upon Tensor Computation Runtime (TCR), such as PyTorch. Leveraging a highly optimized and cross-platform TCR backend, TCRDS achieves full-speed operation on all platforms (including Nvidia GPU, AMD GPU, Apple M series SoC, and Huawei Ascend), outperforming traditional purpose-built systems by orders of magnitude.

* **[SeccoSQL](https://github.com/H20Zhang/SeccoSQL) (2020-2022)**: SeccoSQL (Separate communication from computation) is an experimental distributed SQL engine on Spark designed for processing complex SQL/Graph queries. It explicitly decouples Relational Algebra (RA) operators into pure communication and computation operators. SeccoSQL can reorder operators at a finer granularity than existing SQL engines, enabling a greater search space of plans and further reducing communication costs.

* **[DISC](https://github.com/H20Zhang/DISC) (2018-2020)**: DISC is a specialized graph system on Spark for computing subgraph counts of arbitrary patterns and orbits in a relational manner. Unlike existing subgraph counting approaches that operate directly on graphs, DISC decomposes subgraph counting queries into a sequence of relational queries, enabling efficient execution.

* **[Crystal](https://github.com/H20Zhang/Crystal) (2016-2017)**: Crystal is a novel method for distributed subgraph matching on very large graphs. It differs from existing subgraph matching approaches by computing compressed results of subgraph matching directly, greatly reducing computation costs.


### Selected Publications
* Chiyu Hao, Jixian Su, Shixuan Sun, **Hao Zhang**, Sen Gao, Jianwen Zhao, Chenyi Zhang, et al, RapidStore: An Efficient Dynamic Graph Storage System for Concurrent Queries, 51th International Conference on Very Large Databases (VLDB), 2025, To Appear.

* Sen Gao, Jianwen Zhao, **Hao Zhang**, Shixuan Sun, Chen Liang, Gongye Chen, et al, GES: High-Performance Graph Processing Engine and Service in Huawei, SIGMOD International Conference on Management of Data (SIGMOD), 2025, To Appear.

* YongLiang Zhang, Yuanyuan Zhu, **Hao Zhang**, Congli Gao, Yuyang wang, et al, TGraph: A Tensor-centric Graph Processing Framework, SIGMOD International Conference on Management of Data (SIGMOD), 2025, To Appear.

* Jixian Su, Chiyu Hao, Shixuan Sun, **Hao Zhang**, Sen Gao, et al, Revisiting the Design of In-Memory Dynamic Graph Storage, SIGMOD International Conference on Management of Data (SIGMOD), 2025, To Appear.

* Guanghua Li, **Hao Zhang**, Xibo Sun, Qiong Luo, Yuanyuan Zhu. TenGraph: A Tensor-Based Graph Query Engine International Conference on Very Large Database (VLDB), 2024.
 
* Kangfei Zhao, Jeffrey Xu Yu,, Qiyan Li, **Hao Zhang**, Yu Rong. Learned sketch for subgraph counting: a holistic approach. The VLDB Journal 32 (5), 937-962, 2023

* **Hao Zhang**, Jeffrey Xu Yu, Yikai Zhang, Kangfei Zhao. Parallel Query Processing: To Separate Communication from Computation. ACM SIGMOD/PODS International Conference on Managerment of Data (SIGMOD), 2022.

* Kangfei Zhao, Jeffrey Xu Yu, **Hao Zhang**, Qiyan Li, Yu Rong, A Learned Sketch for Subgraph Counting. ACM SIGMOD/PODS International Conference on Managerment of Data (SIGMOD), 2021.

* **Hao Zhang**, Jeffrey Xu Yu, Yikai Zhang, Kangfei Zhao, Hong Cheng. Distributed Subgraph Counting: A General Approach.  International Conference on Very Large Data Bases (VLDB), 2020.

* Miao Qiao, **Hao Zhang**, Hong Cheng. Subgraph matching: on compression and computation. International Conference on Very Large Data Bases (VLDB), 2018.


### Full Publications

* Sen Gao, Jianwen Zhao, **Hao Zhang**, Shixuan Sun, Chen Liang, Gongye Chen, et al, GES: High-Performance Graph Processing Engine and Service in Huawei, SIGMOD International Conference on Management of Data (SIGMOD), 2025, To Appear.

* Yadong Wang, Zhiwei Zhang, Pengpeng Qiao, Ye Yuan, Hao Zhang, Guoren Wang, Breaking Free from Label Limitations: A Novel Unsupervised Attack Method for Graph Classification, The 30th International Conference on Database Systems for Advanced Applications (DASFAA), 2025, To Appear

* YongLiang Zhang, Yuanyuan Zhu, **Hao Zhang**, Congli Gao, Yuyang wang, et al, TGraph: A Tensor-centric Graph Processing Framework, SIGMOD International Conference on Management of Data (SIGMOD), 2025, To Appear.

* Jixian Su, Chiyu Hao, Shixuan Sun, **Hao Zhang**, Sen Gao, et al, Revisiting the Design of In-Memory Dynamic Graph Storage, SIGMOD International Conference on Management of Data (SIGMOD), 2025, To Appear.

* Guanghua Li, **Hao Zhang**, Xibo Sun, Qiong Luo, Yuanyuan Zhu. TenGraph: A Tensor-Based Graph Query Engine International Conference on Very Large Database (VLDB), 2024.

* Yishu Wang, Jinlong Chu, Ye Yuan, Yu Gu, Hangxu Ji, **Hao Zhang**. Label Constrained Reacability Queries on Time Dependent Graphs. IEEE International Conference on Data Engineering (ICDE), 2024.

* Anbiao Wu, Ye Yuan, Changsheng Li, Yuliang Ma, **Hao Zhang**, Attributed Network Embedding in Streaming Style . IEEE International Conference on Data Engineering (ICDE), 2024.

* Kangfei Zhao, Jeffrey Xu Yu,, Qiyan Li, **Hao Zhang**, Yu Rong. Learned sketch for subgraph counting: a holistic approach. The VLDB Journal 32 (5), 937-962, 2023

* **Hao Zhang**, Jeffrey Xu Yu, Yikai Zhang, Kangfei Zhao. Parallel Query Processing: To Separate Communication from Computation. ACM SIGMOD/PODS International Conference on Managerment of Data (SIGMOD), 2022.

* **Hao Zhang**, Qiyan, Li, Kangfei Zhao, Jeffrey Xu Yu, Yuanyuan Zhu. How Learning Can Help Complex Cyclic Join Decomposition. IEEE International Conference on Data Engineering (ICDE), 2022.

* Kangfei Zhao, Jeffrey Xu Yu, Zongyan He, Rui Li, **Hao Zhang**. Lightweight and Accurate Cardinality Estimation by Neural Network Gaussian Process. ACM SIGMOD/PODS International Conference on Managerment of Data (SIGMOD), 2022.

* Kangfei Zhao, Jeffrey Xu Yu, **Hao Zhang**, Qiyan Li, Yu Rong, A Learned Sketch for Subgraph Counting. ACM SIGMOD/PODS International Conference on Managerment of Data (SIGMOD), 2021.

* **Hao Zhang**, Miao Qiao, Jeffrey Xu Yu, Hong Cheng. Fast Distributed Complex Join Processing. IEEE International Conference on Data Engineering (ICDE), 2021.

* **Hao Zhang**, Jeffrey Xu Yu, Yikai Zhang, Kangfei Zhao, Hong Cheng. Distributed Subgraph Counting: A General Approach.  International Conference on Very Large Data Bases (VLDB), 2020.

* Kangfei Zhao, Jiao Su, Jeffrey Xu Yu, **Hao Zhang**. SQL-G: Efficient Graph Analytics by SQL. IEEE Transactions on Knowledge and Data Engineering (TKDE), 2019.

* Miao Qiao, **Hao Zhang**, Hong Cheng. Subgraph matching: on compression and computation. International Conference on Very Large Data Bases (VLDB), 2018.

* Yuanyuan Zhu, **Hao Zhang**, Lu Qin, Hong Cheng. Efficient MapReduce algorithms for triangle listing in billion-scale graphs. Distributed And Parallel Database (DPD), 2017.

* **Hao Zhang**, Yuanyuan Zhu, Lu Qin, Hong Cheng, Jeffrey Xu Yu. Efficient Local Clustering Coefficient Estimation in Massive Graphs. Database Systems for Advanced Applications (DASFAA), 2017

* **Hao Zhang**, Yuanyuan Zhu, Lu Qin, Hong Cheng, Jeffrey Xu Yu. Efficient triangle listing for billion-scale graphs. IEEE International Conference on Big Data (BigData), 2016



### Hornor & Awards

* Huawei Gold Award for Individual Excellence, 2025 (0.5%)
* LDBC-SNB-IC Benchmark Top-1 on Declarative System Leadboard， 2024 
* First Class, TopMinds Program in Huawei, 2022 
* Meritorious Winner, COMAP’s Mathematical Contest in Modeling, 2016 （6%）

### Professional Activities

* Reviewer: TKDD, PAKDD'21,22,23,24 , KDD'20, CIKM'20,21, AAAI'21
* External Reviewer: SIGMOD'21,22, VLDB'19,20,21,22, ICDE'19,20,21,22
* External Orgniazation: LDBC MPC



[updated on 2025/06/16]







