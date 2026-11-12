---
id: "tin-hieu-he-thong.10-4-1-variational-message-passing"
doc_id: "tin-hieu-he-thong"
title: "10.4.1 Variational message passing"
level: 2
heading_path: ["Approximate Inference", "10.4.1 Variational message passing"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-4-exponential-family-distributions"
next_id: "tin-hieu-he-thong.10-5-local-variational-methods"
block_ids: ["b5399", "b5400", "b5401", "b5402", "b5403", "b5404", "b5405", "b5406", "b5407", "b5408"]
---

## 10.4.1 Variational message passing

We have illustrated the application of variational methods by considering a specific model, the Bayesian mixture of Gaussians, in some detail. This model can be described by the directed graph shown in Figure 10.5. Here we consider more generally the use of variational methods for models described by directed graphs and derive a number of widely applicable results.

The joint distribution corresponding to a directed graph can be written using the decomposition

p (\mathbf {x}) = \prod_ {i} p (\mathbf {x} _ {i} | \mathrm{pa} _ {i})\tag{10.122}

where $\mathbf { x } _ { i }$ denotes the variable(s) associated with node $i ,$ and $\mathrm { p a } _ { i }$ denotes the parent set corresponding to node i. Note that $\mathbf { x } _ { i }$ may be a latent variable or it may belong to the set of observed variables. Now consider a variational approximation in which the distribution $q ( \mathbf { x } )$ is assumed to factorize with respect to the $\mathbf { x } _ { i }$ so that

q (\mathbf {x}) = \prod_ {i} q _ {i} (\mathbf {x} _ {i}).\tag{10.123}

Note that for observed nodes, there is no factor $q ( \mathbf { x } _ { i } )$ in the variational distribution. We now substitute (10.122) into our general result (10.9) to give

\ln q _ {j} ^ {\star} (\mathbf {x} _ {j}) = \mathbb {E} _ {i \neq j} \left[ \sum_ {i} \ln p (\mathbf {x} _ {i} | \mathrm{pa} _ {i}) \right] + \text { const. }\tag{10.124}

Any terms on the right-hand side that do not depend on $\mathbf { x } _ { j }$ can be absorbed into the additive constant. In fact, the only terms that do depend on $\mathbf { x } _ { j }$ are the conditional distribution for $\mathbf { x } _ { j }$ given by $p ( \mathbf { x } _ { j } | \mathrm { p a } _ { j } )$ together with any other conditional distributions that have $\mathbf { x } _ { j }$ in the conditioning set. By definition, these conditional distributions correspond to the children of node $j$ , and they therefore also depend on the co-parents of the child nodes, i.e., the other parents of the child nodes besides node $\mathbf { x } _ { j }$ itself. We see that the set of all nodes on which $q ^ { \star } ( \mathbf { x } _ { j } )$ depends corresponds to the Markov blanket of node $\mathbf { x } _ { j }$ , as illustrated in Figure 8.26. Thus the update of the factors in the variational posterior distribution represents a local calculation on the graph. This makes possible the construction of general purpose software for variational inference in which the form of the model does not need to be specified in advance (Bishop et al., 2003).

If we now specialize to the case of a model in which all of the conditional distributions have a conjugate-exponential structure, then the variational update procedure can be cast in terms of a local message passing algorithm (Winn and Bishop, 2005). In particular, the distribution associated with a particular node can be updated once that node has received messages from all of its parents and all of its children. This in turn requires that the children have already received messages from their coparents. The evaluation of the lower bound can also be simplified because many of the required quantities are already evaluated as part of the message passing scheme. This distributed message passing formulation has good scaling properties and is well suited to large networks.
