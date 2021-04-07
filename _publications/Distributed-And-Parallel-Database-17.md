---
title: 'Efficient MapReduce algorithms for triangle listing in billion-scale graphs'
collection: publications
permalink: /publication/Distributed-And-Parallel-Database-17
excerpt: 'Yuanyuan Zhu, Hao Zhang, Lu Qin, Hong Cheng'
date: 2017-10-01
venue: 'Distributed And Parallel Database'
paperurl: 
citation:
---
Abstract: This paper addresses the classical triangle listing problem, which aims at enumerating all the tuples of three vertices connected with each other by edges. This problem has been intensively studied in internal and external memory, but it is still an urgent challenge in distributed environment where multiple machines across the network can be utilized to achieve good performance and scalability. As one of the de facto computing methodologies in distributed environment, MapReduce has been used in some of existing triangle listing algorithms. However, these algorithms usually need to shuffle a huge amount of intermediate data, which seriously hinders their scalability on large scale graphs. In this paper, we propose a new triangle listing algorithm in MapReduce, FTL, which utilizes a light weight data structure to substantially reduce the intermediate data transferred during the shuffle stage, and also is equipped with multiple-round techniques to ease the burden on memory and network bandwidth when dealing with graphs at billion scale. We prove that the size of the intermediate data can be well bounded near to the number of triangles in the graph. To further reduce the shuffle size and memory cost, we also propose improved algorithms based on a compact data structure, and present several optimization techniques to accelerate the computation and reduce the memory consumption. The extensive experimental results show that our algorithms outperform existing competitors by several times on both synthetic graphs and real world graphs.