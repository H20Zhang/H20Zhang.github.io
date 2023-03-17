---
permalink: /
title: "Hao Zhang"
excerpt:
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Hi, I join Huawei Cloud Database Innovation Lab through TopMinds program as a research scientist. Before that I graduate from the Database Group in [The Chinese University of Hong Kong](https://www.cuhk.edu.hk/), where I am supervised by [Prof. Jeffrey Xu Yu](https://www.se.cuhk.edu.hk/people/academic-staff/prof-yu-xu-jeffrey/) in 2022. I obtained my B.E. degree from HongYi Honor Class of Wuhan University in 2017.

I have a broad interest in query optimization/execution for large scale OLAP query in distributed environment. More specifically, I'm intereseted in (1) **unified execution/optimization of cross-domain queries (e.g., SQL + Graph + AI)**, (2) **machine learning based query optimization, which is also known as AI4DB**,(3) **query execution/optimization of complex OLAP query**, e.g., subgraph (counting) query.

I develop several distributed SQL/Graph systems based on Spark/Hadoop. 

In huawei, I'm working on building the next generation unified data processing engine. 

**I am hiring for full-time and interns who are interested in the system research and building, please drop me a link if interested~**

------

### Systems

* **SeccoSQL** (ongoing): SeccoSQL (Separate communication from computation) is an experimental distributed SQL engine on Spark for processing complex SQL/Graph queries. It explicitly decouples RA operators into pure communication and computation operators, and can reorder operators at a finer granularity than existing SQL engine (i.e., reordering communications and computations versus reorder- ing RA operators), which enables greater search space of plan and can further reduce communication cost.

* **[DISC](https://github.com/H20Zhang/DISC)**: DISC is a specialized graph system on Spark for computing subgraph counting of arbitrary patterns and orbits in a relational way. Unlike existing subgraph counting approaches, which perform subgraph counting directly on graph, it decomposes the subgraph counting query into a sequence of relational queries, which can be efficiently executed.

* **[Crystal](https://github.com/H20Zhang/Crystal)**: Crystal is a novel method for distributed subgraph matching on very large graphs. It differs from existing subgraph matching approaches in that it can compute an compressed results of subgraph matching directly, which also greatly reduce the computation cost.


### Research Interests

* Big Data Management
* Query Optimization
* Query Processing
* Graph Database
* In-Database Machine Learning





### Publications

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

* Reviewer: TKDD, PAKDD'21,22,23 , KDD'20, CIKM'20,21, AAAI'21
* External Reviewer: SIGMOD'21,22, VLDB'19,20,21,22, ICDE'19,20,21,22



[updated on 2023/01/10]







