---
id: "tin-hieu-he-thong.13-2-4-scaling-factors"
doc_id: "tin-hieu-he-thong"
title: "13.2.4 Scaling factors"
level: 2
heading_path: ["Sequential Data", "13.2.4 Scaling factors"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.13-2-3-the-sum-product-algorithm-for-the-hmm"
next_id: "tin-hieu-he-thong.13-2-5-the-viterbi-algorithm"
block_ids: ["b6729", "b6730", "b6731", "b6732", "b6733", "b6734", "b6735", "b6736", "b6737", "b6738", "b6739", "b6740", "b6741", "b6742", "b6743", "b6744", "b6745", "b6746", "b6747", "b6748", "b6749", "b6750", "b6751", "b6752", "b6753", "b6754", "b6755", "b6756"]
---

## 13.2.4 Scaling factors

There is an important issue that must be addressed before we can make use of the forward backward algorithm in practice. From the recursion relation (13.36), we note that at each step the new value $\alpha ( { \mathbf z } _ { n } )$ is obtained from the previous value $\alpha ( { \bf z } _ { n - 1 } )$ by multiplying by quantities $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } )$ and $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ . Because these probabilities are often significantly less than unity, as we work our way forward along the chain, the values of $\alpha ( { \mathbf z } _ { n } )$ can go to zero exponentially quickly. For moderate lengths of chain (say 100 or so), the calculation of the $\alpha ( { \mathbf z } _ { n } )$ will soon exceed the dynamic range of the computer, even if double precision floating point is used.

In the case of i.i.d. data, we implicitly circumvented this problem with the evaluation of likelihood functions by taking logarithms. Unfortunately, this will not help here because we are forming sums of products of small numbers (we are in fact implicitly summing over all possible paths through the lattice diagram of Figure 13.7). We therefore work with re-scaled versions of $\alpha ( { \mathbf z } _ { n } )$ and $\beta ( { \bf z } _ { n } )$ whose values remain of order unity. As we shall see, the corresponding scaling factors cancel out when we use these re-scaled quantities in the EM algorithm.

In (13.34), we defined $\alpha ( { \mathbf z } _ { n } ) = p ( { \mathbf x } _ { 1 } , \ldots , { \mathbf x } _ { n } , { \mathbf z } _ { n } )$ representing the joint distribution of all the observations up to ${ \bf x } _ { n }$ and the latent variable $\mathbf { z } _ { n }$ . Now we define a normalized version of α given by

\widehat {\alpha} (\mathbf {z} _ {n}) = p (\mathbf {z} _ {n} | \mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n}) = \frac {\alpha (\mathbf {z} _ {n})}{p (\mathbf {x} _ {1} , \ldots , \mathbf {x} _ {n})}\tag{13.55}

which we expect to be well behaved numerically because it is a probability distribution over K variables for any value of $n$ . In order to relate the scaled and original alpha variables, we introduce scaling factors defined by conditional distributions over the observed variables

c _ {n} = p \left(\mathbf {x} _ {n} \mid \mathbf {x} _ {1}, \dots , \mathbf {x} _ {n - 1}\right).\tag{13.56}

From the product rule, we then have

p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n}) = \prod_ {m = 1} ^ {n} c _ {m}\tag{13.57}

and so

\alpha (\mathbf {z} _ {n}) = p (\mathbf {z} _ {n} | \mathbf {x} _ {1}, \dots , \mathbf {x} _ {n}) p (\mathbf {x} _ {1}, \dots , \mathbf {x} _ {n}) = \left(\prod_ {m = 1} ^ {n} c _ {m}\right) \widehat {\alpha} (\mathbf {z} _ {n}).\tag{13.58}

We can then turn the recursion equation (13.36) for α into one for $\widehat { \alpha }$ given by

c _ {n} \widehat {\alpha} (\mathbf {z} _ {n}) = p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) \sum_ {\mathbf {z} _ {n - 1}} \widehat {\alpha} (\mathbf {z} _ {n - 1}) p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}).\tag{13.59}

Note that at each stage of the forward message passing phase, used to evaluate $\widehat { \alpha } ( \mathbf { z } _ { n } )$ we have to evaluate and store $c _ { n }$ , which is easily done because it is the coefficient that normalizes the right-hand side of (13.59) to give $\widehat { \alpha } ( \mathbf { z } _ { n } )$

We can similarly define re-scaled variables ${ \widehat { \beta } } ( \mathbf { z } _ { n } )$ using

\beta (\mathbf {z} _ {n}) = \left(\prod_ {m = n + 1} ^ {N} c _ {m}\right) \widehat {\beta} (\mathbf {z} _ {n})\tag{13.60}

which will again remain within machine precision because, from (13.35), the quantities $\widehat { \beta } ( \mathbf { z } _ { n } )$ are simply the ratio of two conditional probabilities

\widehat {\beta} (\mathbf {z} _ {n}) = \frac {p (\mathbf {x} _ {n + 1} , \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n})}{p (\mathbf {x} _ {n + 1} , \ldots , \mathbf {x} _ {N} | \mathbf {x} _ {1} , \ldots , \mathbf {x} _ {n})}.\tag{13.61}

The recursion result (13.38) for $\beta$ then gives the following recursion for the re-scaled variables

c _ {n + 1} \widehat {\beta} (\mathbf {z} _ {n}) = \sum_ {\mathbf {z} _ {n + 1}} \widehat {\beta} (\mathbf {z} _ {n + 1}) p (\mathbf {x} _ {n + 1} | \mathbf {z} _ {n + 1}) p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}).\tag{13.62}

In applying this recursion relation, we make use of the scaling factors $c _ { n }$ that were previously computed in the α phase.

From (13.57), we see that the likelihood function can be found using

p (\mathbf {X}) = \prod_ {n = 1} ^ {N} c _ {n}.\tag{13.63}

Exercise 13.15

Similarly, using (13.33) and (13.43), together with (13.63), we see that the required marginals are given by

\gamma (\mathbf {z} _ {n}) = \widehat {\alpha} (\mathbf {z} _ {n}) \widehat {\beta} (\mathbf {z} _ {n})\tag{13.64}

\xi (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n}) = c _ {n} \widehat {\alpha} (\mathbf {z} _ {n - 1}) p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {z} _ {- 1}) \widehat {\beta} (\mathbf {z} _ {n}).\tag{13.65}

Finally, we note that there is an alternative formulation of the forward-backward algorithm (Jordan, 2007) in which the backward pass is defined by a recursion based the quantities $\gamma ( \mathbf { z } _ { n } ) = { \widehat { \alpha } } ( \mathbf { z } _ { n } ) { \widehat { \beta } } ( \mathbf { z } _ { n } )$ instead of using ${ \widehat { \boldsymbol { \beta } } } ( \mathbf { z } _ { n } )$ . This $\alpha - \gamma$ recursion  requires that the forward pass be completed first so that all the quantities $\widehat { \alpha } ( \mathbf { z } _ { n } )$ are available for the backward pass, whereas the forward and backward passes of the $\alpha { - } \beta$ algorithm can be done independently. Although these two algorithms have comparable computational cost, the $\alpha { - } \beta$ version is the most commonly encountered one in the case of hidden Markov models, whereas for linear dynamical systems a recursion analogous to the $\alpha - \gamma$ form is more usual.
