---
title: 'Efficient Local Clustering Coefficient Estimation in Massive Graphs'
collection: publications
permalink: /publication/DASFAA-17
excerpt: 'Hao Zhang, Yuanyuan Zhu, Lu Qin, Hong Cheng, Jeffrey Xu Yu'
date: 2017-10-01
venue: '22nd Database Systems for Advanced Applications (DASFAA)'
paperurl: 
citation:
---
Abstract: Graph is a powerful tool to model interactions in disparate applications, and how to assess the structure of a graph is an essential task across all the domains. As a classic measure to characterize the connectivity of graphs, clustering coefficient and its variants are of particular interest in graph structural analysis. However, the largest of today’s graphs may have nodes and edges in billion scale, which makes the simple task of computing clustering coefficients quite complicated and expensive. Thus, approximate solutions have attracted much attention from researchers recently. However, they only target global and binned degree-wise clustering coefficient estimation, and their techniques are not suitable for local clustering coefficient estimation that is of great importance for individual nodes. In this paper, we propose a new sampling scheme to estimate the local clustering coefficient with error bounded, where global and binned degree-wise clustering coefficients can be considered as special cases. Meanwhile, based on our sampling scheme, we propose a new framework to estimate all the three clustering coefficients in a unified way. To make it scalable on massive graphs, we further design an efficient MapReduce algorithm under this framework. Extensive experiments validate the efficiency and effectiveness of our algorithms, which significantly outperform state-of-the-art exact and approximate algorithms on many real graph datasets.