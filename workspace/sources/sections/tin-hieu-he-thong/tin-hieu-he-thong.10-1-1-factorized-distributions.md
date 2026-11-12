---
id: "tin-hieu-he-thong.10-1-1-factorized-distributions"
doc_id: "tin-hieu-he-thong"
title: "10.1.1 Factorized distributions"
level: 2
heading_path: ["Approximate Inference", "10.1.1 Factorized distributions"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-1-variational-inference"
next_id: "tin-hieu-he-thong.leonhard-euler-1707-1783"
block_ids: ["b5070", "b5071", "b5072", "b5073", "b5074", "b5075", "b5076", "b5077", "b5078", "b5079", "b5080", "b5081"]
---

## 10.1.1 Factorized distributions

Here we consider an alternative way in which to restrict the family of distributions $q ( \mathbf { Z } )$ . Suppose we partition the elements of $\mathbf { Z }$ into disjoint groups that we denote by $\mathbf { Z } _ { i }$ where $i = 1 , \dots , M$ . We then assume that the $q$ distribution factorizes with respect to these groups, so that

q (\mathbf {Z}) = \prod_ {i = 1} ^ {M} q _ {i} (\mathbf {Z} _ {i}).\tag{10.5}

It should be emphasized that we are making no further assumptions about the distribution. In particular, we place no restriction on the functional forms of the individual factors $q _ { i } ( \mathbf { Z } _ { i } )$ . This factorized form of variational inference corresponds to an approximation framework developed in physics called mean field theory (Parisi, 1988).

Amongst all distributions $q ( \mathbf { Z } )$ having the form (10.5), we now seek that distribution for which the lower bound $\mathcal { L } ( q )$ is largest. We therefore wish to make a free form (variational) optimization of $\mathcal { L } ( q )$ with respect to all of the distributions $q _ { i } ( \mathbf { Z } _ { i } )$ which we do by optimizing with respect to each of the factors in turn. To achieve this, we first substitute (10.5) into (10.3) and then dissect out the dependence on one of the factors $q _ { j } ( \mathbf { Z } _ { j } )$ . Denoting $q _ { j } ( \mathbf { Z } _ { j } )$ by simply $q _ { j }$ to keep the notation uncluttered, we then obtain

\begin{array}{r c l} \mathcal {L} (q) & = & \int \prod_ {i} q _ {i} \left\{\ln p (\mathbf {X}, \mathbf {Z}) - \sum_ {i} \ln q _ {i} \right\} \mathrm{d} \mathbf {Z} \\ & = & \int q _ {j} \left\{\int \ln p (\mathbf {X}, \mathbf {Z}) \prod_ {i \neq j} q _ {i} \mathrm{d} \mathbf {Z} _ {i} \right\} \mathrm{d} \mathbf {Z} _ {j} - \int q _ {j} \ln q _ {j} \mathrm{d} \mathbf {Z} _ {j} + \text { const } \\ & = & \int q _ {j} \ln \widetilde {p} (\mathbf {X}, \mathbf {Z} _ {j})   \mathrm{d} \mathbf {Z} _ {j} - \int q _ {j} \ln q _ {j}   \mathrm{d} \mathbf {Z} _ {j} + \text { const } \end{array} \tag {10}\tag{10.6}

where we have defined a new distribution $\widetilde { p } ( \mathbf { X } , \mathbf { Z } _ { j } )$ by the relation

\ln \widetilde {p} (\mathbf {X}, \mathbf {Z} _ {j}) = \mathbb {E} _ {i \neq j} [ \ln p (\mathbf {X}, \mathbf {Z}) ] + \text { const }.\tag{10.7}

Here the notation $\mathbb { E } _ { i \neq j } [ \cdot \cdot \cdot ]$ denotes an expectation with respect to the q distributions over all variables $\mathbf { z } _ { i }$ for $i \neq j$ , so that

\mathbb {E} _ {i \neq j} [ \ln p (\mathbf {X}, \mathbf {Z}) ] = \int \ln p (\mathbf {X}, \mathbf {Z}) \prod_ {i \neq j} q _ {i} \mathrm{d} \mathbf {Z} _ {i}.\tag{10.8}

Now suppose we keep the $\{ q _ { i \neq j } \}$ fixed and maximize $\mathcal { L } ( q )$ in (10.6) with respect to all possible forms for the distribution $q _ { j } ( \mathbf { Z } _ { j } )$ . This is easily done by recognizing that (10.6) is a negative Kullback-Leibler divergence between $q _ { j } ( \mathbf { Z } _ { j } )$ and $\widetilde { p } ( \mathbf { X } , \mathbf { Z } _ { j } )$ . Thus maximizing (10.6) is equivalent to minimizing the Kullback-Leibler

![image](images/part-003--6661e37faed7df94490a443c3cad320714f45f5568d975ed4e9c2d39daf7aa38.jpg)
