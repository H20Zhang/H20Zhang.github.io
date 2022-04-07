---
permalink: /
title: "Hao Zhang"
excerpt:
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Hi, I am currently a fifth-year Ph.D. student at the Database Group in [The Chinese University of Hong Kong](https://www.cuhk.edu.hk/), where I am supervised by [Prof. Jeffrey Xu Yu](https://www.se.cuhk.edu.hk/people/academic-staff/prof-yu-xu-jeffrey/). Before that, I obtained my B.E. degree from HongYi Honor Class of Wuhan University in 2017.

I have a broad interest in query optimization/execution for large scale OLAP query in distributed environment. More specifically, I'm intereseted in 1) **query execution/optimization of complex OLAP query**, e.g., subgraph (counting) query, 2) **unify query execution/optimization of different kinds of queries (e.g., SQL query, subgraph query, graph analytic query) in a relational way**, 3) **machine learning based query optimization**,

I develop several distributed SQL/Graph systems based on Spark/Hadoop. 

**I am looking for position in industry. Please drop me an email if interested~**

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

* **Hao Zhang**, Jeffrey Xu Yu, Yikai Zhang, Kangfei Zhao. Parallel Query Processing: To Separate Communication from Computation. ACM SIGMOD/PODS International Conference on Managerment of Data (SIGMOD), 2022 (To appear)

* **Hao Zhang**, Qiyan, Li, Kangfei Zhao, Jeffrey Xu Yu, Yuanyuan Zhu. How Learning Can Help Complex Cyclic Join Decomposition (Demo). IEEE International Conference on Data Engineering (ICDE), 2022 (To appear)

* Kangfei Zhao, Jeffrey Xu Yu, Zongyan He, Rui Li, **Hao Zhang**. Lightweight and Accurate Cardinality Estimation by Neural Network Gaussian Process. ACM SIGMOD/PODS International Conference on Managerment of Data (SIGMOD), 2022 (To Appear)

* Kangfei Zhao, Jeffrey Xu Yu, **Hao Zhang**, Qiyan Li, Yu Rong, A Learned Sketch for Subgraph Counting. ACM SIGMOD/PODS International Conference on Managerment of Data (SIGMOD), 2021

* **Hao Zhang**, Miao Qiao, Jeffrey Xu Yu, Hong Cheng. Fast Distributed Complex Join Processing (Short). IEEE International Conference on Data Engineering (ICDE), 2021

* **Hao Zhang**, Jeffrey Xu Yu, Yikai Zhang, Kangfei Zhao, Hong Cheng. Distributed Subgraph Counting: A General Approach. (VLDB). 2020

* Kangfei Zhao, Jiao Su, Jeffrey Xu Yu, **Hao Zhang**. SQL-G: Efficient Graph Analytics by SQL. IEEE Transactions on Knowledge and Data Engineering (TKDE), 2019.

* Miao Qiao, **Hao Zhang**, Hong Cheng. Subgraph matching: on compression and computation. International Conference on Very Large Data Bases (VLDB), 2018.

* Yuanyuan Zhu, **Hao Zhang**, Lu Qin, Hong Cheng. Efficient MapReduce algorithms for triangle listing in billion-scale graphs. Distributed And Parallel Database (DPD), 2017.

* **Hao Zhang**, Yuanyuan Zhu, Lu Qin, Hong Cheng, Jeffrey Xu Yu. Efficient Local Clustering Coefficient Estimation in Massive Graphs. Database Systems for Advanced Applications (DASFAA), 2017

* **Hao Zhang**, Yuanyuan Zhu, Lu Qin, Hong Cheng, Jeffrey Xu Yu. Efficient triangle listing for billion-scale graphs. IEEE International Conference on Big Data (BigData), 2016


### Hornor & Awards

* Meritorious Winner, COMAP’s Mathematical Contest in Modeling, 2016
* Second-Class, Hongyi Scholarship, 2015
* Second-Class, HuaZhong Area Mathematical Modelling, 2015

### Professional Activities

* Reviewer: TKDD, PAKDD'21, PAKDD'22, KDD'20, CIKM'20, AAAI'21, CIKM'21
* External Reviewer: SIGMOD'21, SIGMOD'22, VLDB'19, VLDB'20, VLDB'21, VLDB'22, ICDE'19, ICDE'20, ICDE'21, ICDE'22



[updated on 2022/04/07]







