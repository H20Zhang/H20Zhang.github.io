---
title: 'Distributed Subgraph Counting: A General Approach'
collection: publications
permalink: /publication/VLDB-20
excerpt: 'Hao Zhang, Jeffrey Xu Yu, Yikai Zhang, Kangfei Zhao, Hong Cheng'
date: 2020-10-01
venue: 'PVLDB'
paperurl: 'http://www.vldb.org/pvldb/vol13/p2493-zhang.pdf'
citation: 'Hao Zhang, Jeffrey Xu Yu, Yikai Zhang, Kangfei Zhao, Hong Cheng. Distributed Subgraph Counting: A General Approach. PVLDB, 13(11): 2493-2507, 2020.'
---
Abstract: In this paper, we study local subgraph counting, which is to count the occurrences of a user-given pattern graph p around every node v in a data graph G, when v matches to a given orbit o in p, where the orbit serves as a center to count p. In general, the orbit can be a node, an edge, or a set of nodes in p. Local subgraph counting has played an important role in characterizing high-order local struc- tures that exhibit in a large graph, and has been widely used in denser and relevant communities mining, graphlet degree distribution, discriminative features selection for link prediction, relational classification and recommendation. In the literature, almost all the existing works support a k- node pattern graph, for k ≤ 5, with either 1 node orbit or 1 edge orbit. Their approaches are difficult to support larger k due to the fact that subgraph counting is to count by sub- graph isomorphism. In this work, we develop a new general approach to count any k pattern graphs with any orbits se- lected. The key idea behind is that we do local subgraph counting by homomorphism counting, which can be solved by relational algebra using joins, group-by and aggregation. By homomorphism counting, we do local subgraph count- ing by eliminating counts for those that are not subgraph isomorphism matchings from the total count for any pos- sible matchings. We have developed a distributed system named DISC on Spark. Our extensive experiments validate the efficiency of our approach by testing 114 local subgraph counting queries used in the existing work over real graphs, where no existing work can support all.

```
Reference (bib): 
@article{zhang2020distributed,
  title={Distributed subgraph counting: a general approach},
  author={Zhang, Hao and Yu, Jeffrey Xu and Zhang, Yikai and Zhao, Kangfei and Cheng, Hong},
  journal={Proceedings of the VLDB Endowment},
  volume={13},
  number={12},
  pages={2493--2507},
  year={2020},
  publisher={VLDB Endowment}
}
```









