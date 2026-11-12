---
id: "tin-hieu-he-thong.11-6-estimating-the-partition-function"
doc_id: "tin-hieu-he-thong"
title: "11.6. Estimating the Partition Function"
level: 2
heading_path: ["Sampling Methods", "11.6. Estimating the Partition Function"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11-5-2-hybrid-monte-carlo"
next_id: "tin-hieu-he-thong.exercises-12"
block_ids: ["b6078", "b6079", "b6080", "b6081", "b6082", "b6083", "b6084", "b6085", "b6086", "b6087", "b6088", "b6089", "b6090", "b6091", "b6092", "b6093", "b6094"]
---

## 11.6. Estimating the Partition Function

As we have seen, most of the sampling algorithms considered in this chapter require only the functional form of the probability distribution up to a multiplicative constant. Thus if we write

p _ {E} (\mathbf {z}) = \frac {1}{Z _ {E}} \exp (- E (\mathbf {z}))\tag{11.71}

then the value of the normalization constant $Z _ { E }$ , also known as the partition function, is not needed in order to draw samples from $p ( \mathbf { z } )$ . However, knowledge of the value of $Z _ { E }$ can be useful for Bayesian model comparison since it represents the model evidence (i.e., the probability of the observed data given the model), and so it is of interest to consider how its value might be obtained. We assume that direct evaluation by summing, or integrating, the function $\exp ( - E ( \mathbf { z } ) )$ over the state space of z is intractable.

For model comparison, it is actually the ratio of the partition functions for two models that is required. Multiplication of this ratio by the ratio of prior probabilities gives the ratio of posterior probabilities, which can then be used for model selection or model averaging.

One way to estimate a ratio of partition functions is to use importance sampling from a distribution with energy function $G ( \mathbf { z } )$

\begin{array}{r c l} \frac {Z _ {E}}{Z _ {G}} & = & \frac {\sum_ {\mathbf {z}} \exp (- E (\mathbf {z}))}{\sum_ {\mathbf {z}} \exp (- G (\mathbf {z}))} \\ & = & \frac {\sum_ {\mathbf {z}} \exp (- E (\mathbf {z}) + G (\mathbf {z})) \exp (- G (\mathbf {z}))}{\sum_ {\mathbf {z}} \exp (- G (\mathbf {z}))} \\ & = & \mathbb {E} _ {G (\mathbf {z})} [ \exp (- E + G) ] \\ & \simeq & \sum_ {l} \exp (- E (\mathbf {z} ^ {(l)}) + G (\mathbf {z} ^ {(l)})) \end{array}\tag{11.72}

where $\{ \mathbf { z } ^ { ( l ) } \}$ are samples drawn from the distribution defined by $p _ { G } ( \mathbf { z } )$ . If the distribution $p _ { G }$ is one for which the partition function can be evaluated analytically, for example a Gaussian, then the absolute value of $Z _ { E }$ can be obtained.

This approach will only yield accurate results if the importance sampling distribution $p _ { G }$ is closely matched to the distribution $p _ { E }$ , so that the ratio $p _ { E } / p _ { G }$ does not have wide variations. In practice, suitable analytically specified importance sampling distributions cannot readily be found for the kinds of complex models considered in this book.

An alternative approach is therefore to use the samples obtained from a Markov chain to define the importance-sampling distribution. If the transition probability for the Markov chain is given by $T ( \mathbf { z } , \mathbf { z } ^ { \prime } )$ , and the sample set is given by $\mathbf { \hat { z } } ^ { ( 1 ) } , \ldots , \mathbf { \hat { z } } ^ { ( L ) }$ then the sampling distribution can be written as

\frac {1}{Z _ {G}} \exp (- G (\mathbf {z})) = \sum_ {l = 1} ^ {L} T (\mathbf {z} ^ {(l)}, \mathbf {z})\tag{11.73}

which can be used directly in (11.72).

Methods for estimating the ratio of two partition functions require for their success that the two corresponding distributions be reasonably closely matched. This is especially problematic if we wish to find the absolute value of the partition function for a complex distribution because it is only for relatively simple distributions that the partition function can be evaluated directly, and so attempting to estimate the ratio of partition functions directly is unlikely to be successful. This problem can be tackled using a technique known as chaining (Neal, 1993; Barber and Bishop, 1997), which involves introducing a succession of intermediate distributions $p _ { 2 } , \ldots , p _ { M - 1 }$ that interpolate between a simple distribution $p _ { 1 } ( \mathbf { z } )$ for which we can evaluate the normalization coefficient $Z _ { 1 }$ and the desired complex distribution $p _ { M } ( \mathbf { z } )$ . We then have

\frac {Z _ {M}}{Z _ {1}} = \frac {Z _ {2}}{Z _ {1}} \frac {Z _ {3}}{Z _ {2}} \dots \frac {Z _ {M}}{Z _ {M - 1}}\tag{11.74}

in which the intermediate ratios can be determined using Monte Carlo methods as discussed above. One way to construct such a sequence of intermediate systems is to use an energy function containing a continuous parameter $0 \leqslant \alpha \leqslant 1$ that interpolates between the two distributions

E _ {\alpha} (\mathbf {z}) = (1 - \alpha) E _ {1} (\mathbf {z}) + \alpha E _ {M} (\mathbf {z}).\tag{11.75}

If the intermediate ratios in (11.74) are to be found using Monte Carlo, it may be more efficient to use a single Markov chain run than to restart the Markov chain for each ratio. In this case, the Markov chain is run initially for the system $p _ { 1 }$ and then after some suitable number of steps moves on to the next distribution in the sequence. Note, however, that the system must remain close to the equilibrium distribution at each stage.
