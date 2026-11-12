---
id: "tin-hieu-he-thong.expectation-propagation"
doc_id: "tin-hieu-he-thong"
title: "Expectation Propagation"
level: 2
heading_path: ["Approximate Inference", "Expectation Propagation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-7-expectation-propagation"
next_id: "tin-hieu-he-thong.10-7-1-example-the-clutter-problem"
block_ids: ["b5624", "b5625", "b5626", "b5627", "b5628", "b5629", "b5630", "b5631", "b5632", "b5633", "b5634", "b5635", "b5636", "b5637", "b5638", "b5639", "b5640", "b5641", "b5642", "b5643", "b5644", "b5645", "b5646", "b5647", "b5648"]
---

## Expectation Propagation

We are given a joint distribution over observed data $\mathcal { D }$ and stochastic variables θ in the form of a product of factors

p (\mathcal {D}, \boldsymbol {\theta}) = \prod_ {i} f _ {i} (\boldsymbol {\theta})\tag{10.202}

and we wish to approximate the posterior distribution $p ( \pmb \theta | \mathcal { D } )$ by a distribution of the form 1

q (\pmb {\theta}) = \frac {1}{Z} \prod_ {i} \widetilde {f} _ {i} (\pmb {\theta}).\tag{10.203}

We also wish to approximate the model evidence $p ( \mathcal { D } )$

1. Initialize all of the approximating factors $\widetilde { f } _ { i } ( \pmb \theta )$

2. Initialize the posterior approximation by setting

q (\boldsymbol {\theta}) \propto \prod_ {i} \widetilde {f} _ {i} (\boldsymbol {\theta}).\tag{10.204}

3. Until convergence:

(a) Choose a factor $\widetilde { f } _ { j } ( \pmb { \theta } )$ to refine.

(b) Remove $\widetilde { f } _ { j } ( \pmb { \theta } )$ from the posterior by division

q ^ {\backslash j} (\boldsymbol {\theta}) = \frac {q (\boldsymbol {\theta})}{\widetilde {f} _ {j} (\boldsymbol {\theta})}.\tag{10.205}

(c) Evaluate the new posterior by setting the sufficient statistics (moments) of $q ^ { \mathrm { n e w } } ( \pmb { \theta } )$ equal to those of $q ^ { \setminus j } ( { \pmb \theta } ) { \overline { { f _ { j } } } } ( { \pmb \theta } )$ , including evaluation of the normalization constant

Z _ {j} = \int q ^ {\backslash j} (\boldsymbol {\theta}) f _ {j} (\boldsymbol {\theta}) \mathrm{d} \boldsymbol {\theta}.\tag{10.206}

(d) Evaluate and store the new factor

\widetilde {f} _ {j} (\boldsymbol {\theta}) = Z _ {j} \frac {q ^ {\mathrm{new}} (\boldsymbol {\theta})}{q ^ {\backslash j} (\boldsymbol {\theta})}.\tag{10.207}

4. Evaluate the approximation to the model evidence

p (\mathcal {D}) \simeq \int \prod_ {i} \widetilde {f} _ {i} (\boldsymbol {\theta}) \mathrm{d} \boldsymbol {\theta}.\tag{10.208}

A special case of EP, known as assumed density filtering (ADF) or moment matching (Maybeck, 1982; Lauritzen, 1992; Boyen and Koller, 1998; Opper and Winther, 1999), is obtained by initializing all of the approximating factors except the first to unity and then making one pass through the factors updating each of them once. Assumed density filtering can be appropriate for on-line learning in which data points are arriving in a sequence and we need to learn from each data point and then discard it before considering the next point. However, in a batch setting we have the opportunity to re-use the data points many times in order to achieve improved accuracy, and it is this idea that is exploited in expectation propagation. Furthermore, if we apply ADF to batch data, the results will have an undesirable dependence on the (arbitrary) order in which the data points are considered, which again EP can overcome.

One disadvantage of expectation propagation is that there is no guarantee that the iterations will converge. However, for approximations $q ( \pmb \theta )$ in the exponential family, if the iterations do converge, the resulting solution will be a stationary point of a particular energy function (Minka, 2001a), although each iteration of EP does not necessarily decrease the value of this energy function. This is in contrast to variational Bayes, which iteratively maximizes a lower bound on the log marginal likelihood, in which each iteration is guaranteed not to decrease the bound. It is possible to optimize the EP cost function directly, in which case it is guaranteed to converge, although the resulting algorithms can be slower and more complex to implement.

Another difference between variational Bayes and EP arises from the form of KL divergence that is minimized by the two algorithms, because the former minimizes $\operatorname { K L } ( q \| p )$ whereas the latter minimizes $\mathrm { K L } ( p \Vert q )$ . As we saw in Figure 10.3, for distributions $p ( \pmb \theta )$ which are multimodal, minimizing $\mathrm { K L } ( p | | q )$ can lead to poor approximations. In particular, if EP is applied to mixtures the results are not sensible because the approximation tries to capture all of the modes of the posterior distribution. Conversely, in logistic-type models, EP often out-performs both local variational methods and the Laplace approximation (Kuss and Rasmussen, 2006).

Figure 10.15

Illustration of the clutter problem for a data space dimensionality of $D = 1$ Training data points, denoted by the crosses, are drawn from a mixture of two Gaussians with components shown in red and green. The goal is to infer the mean of the green Gaussian from the observed data.

![image](images/part-003--ce06932e99b8206063210b7b216fc0f554b88ffbdef0b3a2552b727d37e5e375.jpg)
