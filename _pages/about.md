---
permalink: /
title: "Hao Zhang"
excerpt:
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I am a Research Scientist at ByteDance. I received my Ph.D. from the Database Group at The Chinese University of Hong Kong, under the mentorship of Prof. Jeffrey Xu Yu. I obtained my bachelor’s degree in Computer Science from the Hongyi Honor School (弘毅学堂) at Wuhan University.

<!--
full employee: https://job.toutiao.com/s/ZedHSl3KTZo
intern:
-->

- We are looking for strong interns (internship locations: Shenzhen, Beijing, Shanghai) who are passionate about Data+AI systems research and development. If you are interested, please send your resume to zhanghao.ai [at] bytednace [dot] com
- We also welcome collaboration across a broad range of Data+AI research topics, remote collaboration is also welcome!.

### News
- 12/2025 Set a new world record for graph database workload again, this time on a [Chinese-made chip](https://e.huawei.com/ma/industries/grid/power-grid/power-data-center/high-performance-computing) (during my time at Huawei), achieving [Ranked #1](https://ldbcouncil.org/benchmarks/snb/interactive/2025-12-01-graph-engine-service-sf300/) in [LDBC Benchmark SNB - Imperative Track](https://ldbcouncil.org/benchmarks/snb-interactive/), the most authoritative ranking in graph database. Congrats to all my former team members and collaborators at Huawei and SJTU!
- 11/2025 One paper accepted by SIGMOD'26. Congrats to Junchao Ma and Prof.Yuanyuan Zhu!
- 10/2025 One paper accepted by VLDB'26. Congrats to Ziqi Zhou and Prof.Zhiwei Zhang!
- 08/2025 One paper accepted by SIGMOD'26. Congrats to Haitao Zhang and Prof.Yuanyuan Zhu!
- 06/2025 One paper accepted by VLDB'25. Congrats to Chiyu Hao and Prof.Shixuan Sun!
- 02/2025 Awarded the Huawei Gold Award for Individual Excellence, awarded to top 1% of employees.
- 02/2025 One paper accepted by SIGMOD'25. Congrats to colleagues in Huawei and my collaborators!
- 11/2024 One paper accepted by SIGMOD'25. Congrats to Prof.Sun Shixuan!
- 11/2024 One paper accepted by SIGMOD'25. Congrats to Yongliang Zhang and Prof.Yuanyuan Zhu!
- 09/2024 Set a new world record for graph database workload with a 3,000X improvement, achieving [Ranked #1](https://ldbcouncil.org/benchmarks/snb/LDBC_SNB_I_20240916_SF30-100-300_huawei.pdf) in [LDBC Benchmark SNB - Declarative Track](https://ldbcouncil.org/benchmarks/snb-interactive/), the most authoritative ranking in graph database. Congrats to all my team members and collaborators at Huawei!

<!--
  - 06/2024 One paper accepted by VLDB'24 Research Track. Congrats to Guanghua Li and my collaborators!
  - 06/2024 Join Linked Data Benchmark Council (LDBC) as MPC member on behalf of Huawei Cloud!
  - 10/2023 Two paper accepted by ICDE'24 Research Track!
  - 05/2023 One paper accepted by The VLDB Journal!
  - 10/2022 Join Huawei Cloud Database Innovation Lab!
-->

### Research Interests

My current research focuses on building systems for the AI/LLM + Data, particularly in the following areas:

1. Agentic/Multimodal Data System [Actively Exploring]

2. Vector Database [Actively Exploring]
  
3. Tensor-Centric (GPU accelerated) Data System for Structured and Unstructured Data [\[TQEx, SIGMOD'26\]](), [\[TenGraph, VLDB'24\]](https://www.vldb.org/pvldb/vol17/p4571-li.pdf), [\[TGraph, SIGMOD'25\]](https://dl.acm.org/doi/10.1145/3709731)


<!--
  - LLM+Data
    - Multimodal Analytic
    - Data Pipeline for LLM
    - NLI (Natual Language Interface)
-->

My past research interest:
1. Distributed Query Processing [\[Secco, SIGMOD'22\]](https://dl.acm.org/doi/abs/10.1145/3514221.3526164), [\[DISC, VLDB'20\]](https://www.vldb.org/pvldb/vol13/p2493-zhang.pdf), [\[Crystal, VLDB'18\]](http://www.vldb.org/pvldb/vol11/p176-qiao.pdf)
2. Graph Algorithm and GNN [\[DASFAA'25, ICDE'24, BigData'16, DPD'16, DASFAA'16\]]()
3. AI4DB [\[ALSS, SIGMOD'21, VLDBJ'23\]]() [\[NNGP-Card, SIGMOD'22\]]() [\[Leanred Multiway Join, ICDE'21\]]()
4. Graph Database [\[RapidStore, VLDB'25\]](https://arxiv.org/abs/2507.00839) [\[GES, SIGMOD'25\]](https://dl.acm.org/doi/10.1145/3722212.3724439) [\[Graph Storage Benchmark, SIGMOD'25\]](https://dl.acm.org/doi/10.1145/3709720) [\[Aquila, VLDB'26\]]()


### Selected Architected Systems

* **SEMA(Semantic Query Engine) (2024–Present)**: SEMA is a multimodal AI system designed to unify semantic understanding across both structured and unstructured data. Powered by large language models, it enables data systems to interpret complex semantics that traditional systems cannot handle. DAIS functions as the query engine for next-generation multimodal data processing, supporting (1) multimodal/semantic ETL for LLM pipelines, (2) semantic ad-hoc querying for user requests, and (3) comprehensive analytics over diverse data types—including text, images, videos, and structured datasets.
 
* **TDB(Tensor-Centric DB) (2022-Present)**: TDB is a unified GPU/NPU-based query engine for SQL queries, Subgraph queries, and Graph Analytic Queries, built upon Tensor Computation Runtime (TCR), such as PyTorch. Leveraging a highly optimized and cross-platform TCR backend, TDB achieves full-speed operation on all platforms (including Nvidia GPU, AMD GPU, Apple M series Soc), outperforming traditional purpose-built systems by orders of magnitude.
    
* **GES(Graph Engine Service) (2022-2025)**: The Graph Engine Service (GES) is a high-performance, fully managed graph database service developed by Huawei to handle complex graph-based queries and large-scale graph computing tasks. We have developed the next generation of GES, employing advanced techniques (i.e., factorization) to enhance performance by several orders of magnitude. The performance is validated at [LDBC-SNB-IC](https://ldbcouncil.org/benchmarks/snb-interactive/) a classcial benchmark for graph database, where we achieved #1 results with 3000X performance improvement over the #2.
  
* **[SeccoSQL](https://github.com/H20Zhang/SeccoSQL) (2020-2022)**: SeccoSQL (Separate communication from computation) is an experimental distributed SQL engine on Spark designed for processing complex SQL/Graph queries. It explicitly decouples Relational Algebra (RA) operators into pure communication and computation operators. SeccoSQL can reorder operators at a finer granularity than existing SQL engines, enabling a greater search space of plans and further reducing communication costs.

* **[DISC](https://github.com/H20Zhang/DISC) (2018-2020)**: DISC is a specialized graph system on Spark for subgraph query (especially, subgraph counting query) in a relational manner. Unlike existing subgraph counting system that operate directly on graphs, DISC decomposes subgraph counting queries into a sequence of relational queries, enabling efficient execution.

* **[Crystal](https://github.com/H20Zhang/Crystal) (2016-2017)**: Crystal is a novel method for distributed subgraph matching on very large graphs. It differs from existing subgraph matching approaches by computing compressed results of subgraph matching directly, greatly reducing computation costs.

### Publications

^ indicates first author or corresponding author

1. Junchao Ma, Xin Yan, Yuanyuan Zhu, Guojing Li, **Hao Zhang**, Jeffrey Xu Yu, Accelerating Triangle-Connected Truss Community Search Across Heterogeneous Hardware.  ACM SIGMOD/PODS
International Conference on Management of Data (SIGMOD), 2026 (To Appear).

1. Ziqi Zou, **Hao Zhang^**, Jiaxin Yao, Kangfei Zhao, Zhiwei Zhang, Sen Gao, Jingpeng Hao, Yeyuan, Guoren Wang, Aquila: A High-Concurrency System for Incremental Graph Query, 52th International Conference on Very Large Databases (VLDB), 2026 (To Appear)

1. Haitao Zhang, Ran Pang, Yuanyuan Zhu, **Hao Zhang^**, Congli Gao, Ming Zhong, Jiawei Jiang, Tieyun
Qian, Jeffrey Xu Yu, TQEx: Tensor-based Query Engine Enhanced by Bridging the Gap. ACM SIGMOD/PODS
International Conference on Management of Data (SIGMOD), 2026 (To Appear).

1.  Chiyu Hao, Jixian Su, Shixuan Sun, **Hao Zhang**, Sen Gao, Jianwen Zhao, Chenyi Zhang, et al, RapidStore: An Efficient Dynamic Graph Storage System for Concurrent Queries, 51th International Conference on Very Large Databases (VLDB), 2025.

2.  Sen Gao, Jianwen Zhao, **Hao Zhang^**, Shixuan Sun, Chen Liang, Gongye Chen, et al, GES: High-Performance Graph Processing Engine and Service in Huawei, SIGMOD International Conference on Management of Data (SIGMOD), 2025.

3.  YongLiang Zhang, Yuanyuan Zhu, **Hao Zhang^**, Congli Gao, Yuyang wang, et al, TGraph: A Tensor-centric Graph Processing Framework, SIGMOD International Conference on Management of Data (SIGMOD), 2025.

4.  Jixian Su, Chiyu Hao, Shixuan Sun, **Hao Zhang**, Sen Gao, et al, Revisiting the Design of In-Memory Dynamic Graph Storage, SIGMOD International Conference on Management of Data (SIGMOD), 2025.

5.  Yadong Wang, Zhiwei Zhang, Pengpeng Qiao, Ye Yuan, **Hao Zhang**, Guoren Wang, Breaking Free from Label Limitations: A Novel Unsupervised Attack Method for Graph Classification, The 30th International Conference on Database Systems for Advanced Applications (DASFAA), 2025.

6.  Guanghua Li, **Hao Zhang**, Xibo Sun, Qiong Luo, Yuanyuan Zhu. TenGraph: A Tensor-Based Graph Query Engine International Conference on Very Large Database (VLDB), 2024.

7. Yishu Wang, Jinlong Chu, Ye Yuan, Yu Gu, Hangxu Ji, **Hao Zhang**. Label Constrained Reacability Queries on Time Dependent Graphs. IEEE International Conference on Data Engineering (ICDE), 2024.

8. Anbiao Wu, Ye Yuan, Changsheng Li, Yuliang Ma, **Hao Zhang**, Attributed Network Embedding in Streaming Style . IEEE International Conference on Data Engineering (ICDE), 2024.

9. Kangfei Zhao, Jeffrey Xu Yu,, Qiyan Li, **Hao Zhang**, Yu Rong. Learned sketch for subgraph counting: a holistic approach. The VLDB Journal 32 (5), 937-962, 2023

10. **Hao Zhang^**, Jeffrey Xu Yu, Yikai Zhang, Kangfei Zhao. Parallel Query Processing: To Separate Communication from Computation. ACM SIGMOD/PODS International Conference on Managerment of Data (SIGMOD), 2022.

11. Kangfei Zhao, Jeffrey Xu Yu, Zongyan He, Rui Li, **Hao Zhang**. Lightweight and Accurate Cardinality Estimation by Neural Network Gaussian Process. ACM SIGMOD/PODS International Conference on Managerment of Data (SIGMOD), 2022.

12. **Hao Zhang^**, Qiyan, Li, Kangfei Zhao, Jeffrey Xu Yu, Yuanyuan Zhu. How Learning Can Help Complex Cyclic Join Decomposition. IEEE International Conference on Data Engineering (ICDE), 2022.

13. Kangfei Zhao, Jeffrey Xu Yu, **Hao Zhang**, Qiyan Li, Yu Rong, A Learned Sketch for Subgraph Counting. ACM SIGMOD/PODS International Conference on Managerment of Data (SIGMOD), 2021.

14. **Hao Zhang^**, Miao Qiao, Jeffrey Xu Yu, Hong Cheng. Fast Distributed Complex Join Processing. IEEE International Conference on Data Engineering (ICDE), 2021.

15. **Hao Zhang^**, Jeffrey Xu Yu, Yikai Zhang, Kangfei Zhao, Hong Cheng. Distributed Subgraph Counting: A General Approach.  International Conference on Very Large Data Bases (VLDB), 2020.

16. Kangfei Zhao, Jiao Su, Jeffrey Xu Yu, **Hao Zhang**. SQL-G: Efficient Graph Analytics by SQL. IEEE Transactions on Knowledge and Data Engineering (TKDE), 2019.

17. Miao Qiao, **Hao Zhang**, Hong Cheng. Subgraph matching: on compression and computation. International Conference on Very Large Data Bases (VLDB), 2018.

18. Yuanyuan Zhu, **Hao Zhang**, Lu Qin, Hong Cheng. Efficient MapReduce algorithms for triangle listing in billion-scale graphs. Distributed And Parallel Database (DPD), 2017.

19. **Hao Zhang^**, Yuanyuan Zhu, Lu Qin, Hong Cheng, Jeffrey Xu Yu. Efficient Local Clustering Coefficient Estimation in Massive Graphs. Database Systems for Advanced Applications (DASFAA), 2017

20.  **Hao Zhang^**, Yuanyuan Zhu, Lu Qin, Hong Cheng, Jeffrey Xu Yu. Efficient triangle listing for billion-scale graphs. IEEE International Conference on Big Data (BigData), 2016


### Selected Hornor & Awards

*	New World Record on [LDBC-SNB-IC Benchmark](https://ldbcouncil.org/benchmarks/snb-interactive/) – Ranked Top-1 on the Imperative Systems Leaderboard (one of the most authoritative graph database benchmarks), 2025
* ByteDance Soaring Star Talent Program - ByteDance's most prestigious talent program, 2025
*	Huawei Gold Award for Individual Excellence (Top 1%) - Huawei's most prestigious award for individual, 2025
*	New World Record on [LDBC-SNB-IC Benchmark](https://ldbcouncil.org/benchmarks/snb-interactive/) – Ranked Top-1 on the Declarative Systems Leaderboard (one of the most authoritative graph database benchmarks), 2024
*	TopMinds Talent Program (First Class) – Huawei’s most prestigious talent program, 2022
*	Meritorious Winner (Top 6%), International Mathematical Contest in Modeling (MCM/ICM), 2016

### Professional Activities

* Reviewer: TKDD, PAKDD'21,22,23,24 , KDD'20, CIKM'20,21, AAAI'21
* External Reviewer: SIGMOD'21,22, VLDB'19,20,21,22, ICDE'19,20,21,22
* External Orgniazation: LDBC MPC



[updated on 2025/12]







