---
id: "tin-hieu-he-thong.c2-1-principal-component-analysis"
doc_id: "tin-hieu-he-thong"
title: "'c2=.~1. Principal Component Analysis"
level: 2
heading_path: ["Sampling Methods", "'c2=.~1. Principal Component Analysis"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.exercises-12"
next_id: "tin-hieu-he-thong.12-1-1-mllximllm-variance-lormulation"
block_ids: ["b6130", "b6131", "b6132"]
---


Principal component analysis or PCA is a technique that is widely used for applications such as dimensionality reduction, lossy data compression, feature extraction, and data visualization (Jolliffe, 2002). It is also known as the Karhunen-Loève transform.

There are two commonly used definitions of PCA that give rise to the same algorithm. PCA can be defined as the orthogonal projection of the data onto a lower dimensional linear space, known as the principal subspace, such that the variance of the projected data is maximized (Hotelling, 1933). Equivalently, it can be defined as the linear projection that minimizes the average projection cost, defined as the mean squared distance between the data points and their projection (Pearson, 1901). The process of orthogonal projection is illustrated in Figure 12.2. We consider each of these definitions in turn.
