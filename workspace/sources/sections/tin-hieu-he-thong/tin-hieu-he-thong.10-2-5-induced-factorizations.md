---
id: "tin-hieu-he-thong.10-2-5-induced-factorizations"
doc_id: "tin-hieu-he-thong"
title: "10.2.5 Induced factorizations"
level: 2
heading_path: ["Approximate Inference", "10.2.5 Induced factorizations"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-2-4-determining-the-number-of-components"
next_id: "tin-hieu-he-thong.10-3-variational-linear-regression"
block_ids: ["b5308", "b5309", "b5310", "b5311", "b5312", "b5313", "b5314", "b5315", "b5316", "b5317", "b5318"]
---

## 10.2.5 Induced factorizations

In deriving these variational update equations for the Gaussian mixture model, we assumed a particular factorization of the variational posterior distribution given by (10.42). However, the optimal solutions for the various factors exhibit additional factorizations. In particular, the solution for $q ^ { \star } ( \pmb { \mu } , \pmb { \Lambda } )$ is given by the product of an independent distribution $q ^ { \star } ( \pmb { \mu } _ { k } , \pmb { \Lambda } _ { k } )$ over each of the components k of the mixture, whereas the variational posterior distribution $q ^ { \star } ( \mathbf { Z } )$ over the latent variables, given by (10.48), factorizes into an independent distribution ${ { q } ^ { \star } } ( { \bf { z } } _ { n } )$ for each observation n (note that it does not further factorize with respect to k because, for each value of $n _ { \mathrm { : } }$ the $z _ { n k }$ are constrained to sum to one over k). These additional factorizations are a consequence of the interaction between the assumed factorization and the conditional independence properties of the true distribution, as characterized by the directed graph in Figure 10.5.

We shall refer to these additional factorizations as induced factorizations because they arise from an interaction between the factorization assumed in the variational posterior distribution and the conditional independence properties of the true joint distribution. In a numerical implementation of the variational approach it is important to take account of such additional factorizations. For instance, it would be very inefficient to maintain a full precision matrix for the Gaussian distribution over a set of variables if the optimal form for that distribution always had a diagonal precision matrix (corresponding to a factorization with respect to the individual variables described by that Gaussian).

Such induced factorizations can easily be detected using a simple graphical test based on d-separation as follows. We partition the latent variables into three disjoint groups A, B, C and then let us suppose that we are assuming a factorization between C and the remaining latent variables, so that

q (\mathbf {A}, \mathbf {B}, \mathbf {C}) = q (\mathbf {A}, \mathbf {B}) q (\mathbf {C}).\tag{10.84}

Using the general result (10.9), together with the product rule for probabilities, we see that the optimal solution for $q ( \mathbf { A } , \mathbf { B } )$ is given by

\begin{array}{r c l} \ln q ^ {\star} (\mathbf {A}, \mathbf {B}) & = & \mathbb {E} _ {\mathbf {C}} [ \ln p (\mathbf {X}, \mathbf {A}, \mathbf {B}, \mathbf {C}) ] + \mathrm{const} \\ & = & \mathbb {E} _ {\mathbf {C}} [ \ln p (\mathbf {A}, \mathbf {B} | \mathbf {X}, \mathbf {C}) ] + \mathrm{const}. \end{array}\tag{10.85}

We now ask whether this resulting solution will factorize between A and B, in other words whether $q ^ { \star } ( { \bf A } , { \bf B } ) = q ^ { \star } ( { \bf A } ) q ^ { \star } ( { \bf B } )$ . This will happen if, and only if, ln $p ( \mathbf { A } , \mathbf { B } | \mathbf { X } , \mathbf { C } ) = \ln p ( \mathbf { A } | \mathbf { X } , \mathbf { C } ) + \ln p ( \mathbf { B } | \mathbf { X } , \mathbf { C } )$ , that is, if the conditional independence relation

\mathbf {A} \perp \perp \mathbf {B} | \mathbf {X}, \mathbf {C}\tag{10.86}

is satisfied. We can test to see if this relation does hold, for any choice of A and B by making use of the d-separation criterion.

To illustrate this, consider again the Bayesian mixture of Gaussians represented by the directed graph in Figure 10.5, in which we are assuming a variational factorization given by (10.42). We can see immediately that the variational posterior distribution over the parameters must factorize between $\pi$ and the remaining parameters $\pmb { \mu }$ and Λ because all paths connecting $\pi$ to either $\pmb { \mu }$ or Λ must pass through one of the nodes $\mathbf { z } _ { n }$ all of which are in the conditioning set for our conditional independence test and all of which are head-to-tail with respect to such paths.
