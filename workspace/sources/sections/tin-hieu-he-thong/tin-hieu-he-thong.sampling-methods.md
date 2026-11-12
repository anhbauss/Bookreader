---
id: "tin-hieu-he-thong.sampling-methods"
doc_id: "tin-hieu-he-thong"
title: "Sampling Methods"
level: 1
heading_path: ["Sampling Methods"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11"
next_id: "tin-hieu-he-thong.11-1-basic-sampling-algorithms"
block_ids: ["b5778", "b5779", "b5780", "b5781", "b5782", "b5783", "b5784", "b5785", "b5786", "b5787", "b5788", "b5789", "b5790", "b5791", "b5792", "b5793", "b5794", "b5795", "b5796", "b5797", "b5798", "b5799", "b5800", "b5801"]
---

# Sampling Methods

![image](images/part-003--fb7eab15fe92dc6c124d411de3568c9b0c402dcc47eac69ffe1ac6f7fd4d8627.jpg)

For most probabilistic models of practical interest, exact inference is intractable, and so we have to resort to some form of approximation. In Chapter 10, we discussed inference algorithms based on deterministic approximations, which include methods such as variational Bayes and expectation propagation. Here we consider approximate inference methods based on numerical sampling, also known as Monte Carlo techniques.

Although for some applications the posterior distribution over unobserved variables will be of direct interest in itself, for most situations the posterior distribution is required primarily for the purpose of evaluating expectations, for example in order to make predictions. The fundamental problem that we therefore wish to address in this chapter involves finding the expectation of some function f(z) with respect to a probability distribution $p ( \mathbf { z } )$ . Here, the components of z might comprise discrete or continuous variables or some combination of the two. Thus in the case of continuous

Figure 11.1 Schematic illustration of a function $f ( z )$ whose expectation is to be evaluated with respect to a distribution $p ( z )$

![image](images/part-003--77626a0914ec748b7255d3e09957c40b347af937efbd691104c3b4913840d037.jpg)

variables, we wish to evaluate the expectation

\mathbb {E} [ f ] = \int f (\mathbf {z}) p (\mathbf {z}) \mathrm{d} \mathbf {z}\tag{11.1}

where the integral is replaced by summation in the case of discrete variables. This is illustrated schematically for a single continuous variable in Figure 11.1. We shall suppose that such expectations are too complex to be evaluated exactly using analytical techniques.

The general idea behind sampling methods is to obtain a set of samples $\mathbf { z } ^ { ( l ) }$ (where $l \stackrel { \cdot } { = } 1 , \ldots , L )$ drawn independently from the distribution $p ( \mathbf { z } )$ . This allows the expectation (11.1) to be approximated by a finite sum

\widehat {f} = \frac {1}{L} \sum_ {l = 1} ^ {L} f (\mathbf {z} ^ {(l)}).\tag{11.2}

As long as the samples $\mathbf { z } ^ { ( l ) }$ are drawn from the distribution $p ( \mathbf { z } )$ , then $\mathbb { E } [ \widehat { f } ] = \mathbb { E } [ f ]$ and so the estimator $\widehat { \boldsymbol { f } }$ has the correct mean. The variance of the estimator is given by

\operatorname{var} [ \widehat {f} ] = \frac {1}{L} \mathbb {E} \left[ (f - \mathbb {E} [ f ]) ^ {2} \right]\tag{11.3}

is the variance of the function $f ( \mathbf { z } )$ under the distribution $p ( \mathbf { z } )$ . It is worth emphasizing that the accuracy of the estimator therefore does not depend on the dimensionality of $\mathbf { z } ,$ and that, in principle, high accuracy may be achievable with a relatively small number of samples $\mathbf { z } ^ { ( l ) }$ . In practice, ten or twenty independent samples may suffice to estimate an expectation to sufficient accuracy.

The problem, however, is that the samples $\{ \mathbf { z } ^ { ( l ) } \}$ might not be independent, and so the effective sample size might be much smaller than the apparent sample size. Also, referring back to Figure 11.1, we note that if $f ( \mathbf { z } )$ is small in regions where $p ( \mathbf { z } )$ is large, and vice versa, then the expectation may be dominated by regions of small probability, implying that relatively large sample sizes will be required to achieve sufficient accuracy.

For many models, the joint distribution $p ( \mathbf { z } )$ is conveniently specified in terms of a graphical model. In the case of a directed graph with no observed variables, it is straightforward to sample from the joint distribution (assuming that it is possible to sample from the conditional distributions at each node) using the following ancestral sampling approach, discussed briefly in Section 8.1.2. The joint distribution is specified by

p (\mathbf {z}) = \prod_ {i = 1} ^ {M} p (\mathbf {z} _ {i} | \mathrm{pa} _ {i})\tag{11.4}

where $\mathbf { z } _ { i }$ are the set of variables associated with node $i ,$ and $\mathrm { p a } _ { i }$ denotes the set of variables associated with the parents of node i. To obtain a sample from the joint distribution, we make one pass through the set of variables in the order $\mathbf { z } _ { 1 } , \ldots , \mathbf { z } _ { M }$ sampling from the conditional distributions $p ( \mathbf { z } _ { i } | \mathrm { p a } _ { i } )$ . This is always possible because at each step all of the parent values will have been instantiated. After one pass through the graph, we will have obtained a sample from the joint distribution.

Now consider the case of a directed graph in which some of the nodes are instantiated with observed values. We can in principle extend the above procedure, at least in the case of nodes representing discrete variables, to give the following logic sampling approach (Henrion, 1988), which can be seen as a special case of importance sampling discussed in Section 11.1.4. At each step, when a sampled value is obtained for a variable $\mathbf { z } _ { i }$ whose value is observed, the sampled value is compared to the observed value, and if they agree then the sample value is retained and the algorithm proceeds to the next variable in turn. However, if the sampled value and the observed value disagree, then the whole sample so far is discarded and the algorithm starts again with the first node in the graph. This algorithm samples correctly from the posterior distribution because it corresponds simply to drawing samples from the joint distribution of hidden variables and data variables and then discarding those samples that disagree with the observed data (with the slight saving of not continuing with the sampling from the joint distribution as soon as one contradictory value is observed). However, the overall probability of accepting a sample from the posterior decreases rapidly as the number of observed variables increases and as the number of states that those variables can take increases, and so this approach is rarely used in practice.

In the case of probability distributions defined by an undirected graph, there is no one-pass sampling strategy that will sample even from the prior distribution with no observed variables. Instead, computationally more expensive techniques must be employed, such as Gibbs sampling, which is discussed in Section 11.3.

As well as sampling from conditional distributions, we may also require samples from a marginal distribution. If we already have a strategy for sampling from a joint distribution $p ( \mathbf { u } , \mathbf { v } )$ , then it is straightforward to obtain samples from the marginal distribution $p ( \mathbf { u } )$ simply by ignoring the values for v in each sample.

There are numerous texts dealing with Monte Carlo methods. Those of particular interest from the statistical inference perspective include Chen et al. (2001), Gamerman (1997), Gilks et al. (1996), Liu (2001), Neal (1996), and Robert and Casella (1999). Also there are review articles by Besag et al. (1995), Brooks (1998), Diaconis and Saloff-Coste (1998), Jerrum and Sinclair (1996), Neal (1993), Tierney (1994), and Andrieu et al. (2003) that provide additional information on sampling

methods for statistical inference.

Diagnostic tests for convergence of Markov chain Monte Carlo algorithms are summarized in Robert and Casella (1999), and some practical guidance on the use of sampling methods in the context of machine learning is given in Bishop and Nabney (2008).
