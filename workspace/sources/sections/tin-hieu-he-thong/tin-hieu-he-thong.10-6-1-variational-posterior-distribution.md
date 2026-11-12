---
id: "tin-hieu-he-thong.10-6-1-variational-posterior-distribution"
doc_id: "tin-hieu-he-thong"
title: "10.6.1 Variational posterior distribution"
level: 2
heading_path: ["Approximate Inference", "10.6.1 Variational posterior distribution"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-6-variational-logistic-regression"
next_id: "tin-hieu-he-thong.10-6-2-optimizing-the-variational-parameters"
block_ids: ["b5475", "b5476", "b5477", "b5478", "b5479", "b5480", "b5481", "b5482", "b5483", "b5484", "b5485", "b5486", "b5487", "b5488", "b5489", "b5490", "b5491", "b5492", "b5493", "b5494", "b5495", "b5496", "b5497", "b5498", "b5499", "b5500", "b5501", "b5502", "b5503", "b5504"]
---

## 10.6.1 Variational posterior distribution

Here we shall make use of a variational approximation based on the local bounds introduced in Section 10.5. This allows the likelihood function for logistic regression, which is governed by the logistic sigmoid, to be approximated by the exponential of a quadratic form. It is therefore again convenient to choose a conjugate Gaussian prior of the form (4.140). For the moment, we shall treat the hyperparameters $\mathbf { m } _ { 0 }$ and $\mathbf { S } _ { 0 }$ as fixed constants. In Section 10.6.3, we shall demonstrate how the variational formalism can be extended to the case where there are unknown hyperparameters whose values are to be inferred from the data.

In the variational framework, we seek to maximize a lower bound on the marginal likelihood. For the Bayesian logistic regression model, the marginal likelihood takes the form

p (\mathbf {t}) = \int p (\mathbf {t} | \mathbf {w}) p (\mathbf {w}) \mathrm{d} \mathbf {w} = \int \left[ \prod_ {n = 1} ^ {N} p (t _ {n} | \mathbf {w}) \right] p (\mathbf {w}) \mathrm{d} \mathbf {w}.\tag{10.147}

We first note that the conditional distribution for t can be written as

\begin{array}{r c l} p (t | \mathbf {w}) & = & \sigma (a) ^ {t} \left\{1 - \sigma (a) \right\} ^ {1 - t} \\ & = & \left(\frac {1}{1 + e ^ {- a}}\right) ^ {t} \left(1 - \frac {1}{1 + e ^ {- a}}\right) ^ {1 - t} \\ & = & e ^ {a t} \frac {e ^ {- a}}{1 + e ^ {- a}} = e ^ {a t} \sigma (- a) \end{array}\tag{10.148}

where $a = \mathbf { w } ^ { \mathrm { T } } \phi$ . In order to obtain a lower bound on $p ( \mathfrak { t } )$ , we make use of the variational lower bound on the logistic sigmoid function given by (10.144), which

we reproduce here for convenience

\sigma (z) \geqslant \sigma (\xi) \exp \left\{(z - \xi) / 2 - \lambda (\xi) (z ^ {2} - \xi^ {2}) \right\}\tag{10.149}

where

\lambda (\xi) = \frac {1}{2 \xi} \left[ \sigma (\xi) - \frac {1}{2} \right].\tag{10.150}

We can therefore write

p (t | \mathbf {w}) = e ^ {a t} \sigma (- a) \geqslant e ^ {a t} \sigma (\xi) \exp \left\{- (a + \xi) / 2 - \lambda (\xi) (a ^ {2} - \xi^ {2}) \right\}.\tag{10.151}

Note that because this bound is applied to each of the terms in the likelihood function separately, there is a variational parameter $\xi _ { n }$ corresponding to each training set observation $( \phi _ { n } , t _ { n } )$ . Using $a = \mathbf { w } ^ { \mathrm { T } } \phi$ , and multiplying by the prior distribution, we obtain the following bound on the joint distribution of t and w

p (\mathbf {t}, \mathbf {w}) = p (\mathbf {t} | \mathbf {w}) p (\mathbf {w}) \geqslant h (\mathbf {w}, \boldsymbol {\xi}) p (\mathbf {w})\tag{10.152}

where $\boldsymbol { \xi }$ denotes the set $\{ \xi _ { n } \}$ of variational parameters, and

\begin{array}{r c l} h (\mathbf {w}, \boldsymbol {\xi}) & = & \prod_ {n = 1} ^ {N} \sigma (\xi_ {n}) \exp \left\{\mathbf {w} ^ {\mathrm{T}} \phi_ {n} t _ {n} - (\mathbf {w} ^ {\mathrm{T}} \phi_ {n} + \xi_ {n}) / 2 \right. \\ & & \left. - \lambda (\xi_ {n}) ([ \mathbf {w} ^ {\mathrm{T}} \phi_ {n} ] ^ {2} - \xi_ {n} ^ {2}) \right\}. \end{array}\tag{10.153}

Evaluation of the exact posterior distribution would require normalization of the lefthand side of this inequality. Because this is intractable, we work instead with the right-hand side. Note that the function on the right-hand side cannot be interpreted as a probability density because it is not normalized. Once it is normalized to give a variational posterior distribution $q ( \mathbf { w } )$ , however, it no longer represents a bound.

Because the logarithm function is monotonically increasing, the inequality $A \geqslant$ $B$ implies ln $A \geqslant$ ln $B .$ . This gives a lower bound on the log of the joint distribution of t and w of the form

\begin{array}{c} \ln \left\{p (\mathbf {t} | \mathbf {w}) p (\mathbf {w}) \right\} \geqslant \ln p (\mathbf {w}) + \sum_ {n = 1} ^ {N} \left\{\ln \sigma (\xi_ {n}) + \mathbf {w} ^ {\mathrm{T}} \phi_ {n} t _ {n} \right. \\ \left. - (\mathbf {w} ^ {\mathrm{T}} \phi_ {n} + \xi_ {n}) / 2 - \lambda (\xi_ {n}) ([ \mathbf {w} ^ {\mathrm{T}} \phi_ {n} ] ^ {2} - \xi_ {n} ^ {2}) \right\}. \end{array}\tag{10.154}

Substituting for the prior $p ( \mathbf { w } )$ , the right-hand side of this inequality becomes, as a function of w

\begin{array}{c} {- \frac {1}{2} (\mathbf {w} - \mathbf {m} _ {0}) ^ {\mathrm{T}} \mathbf {S} _ {0} ^ {- 1} (\mathbf {w} - \mathbf {m} _ {0})} \\ {+ \sum_ {n = 1} ^ {N} \left\{\mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n} (t _ {n} - 1 / 2) - \lambda (\xi_ {n}) \mathbf {w} ^ {\mathrm{T}} (\boldsymbol {\phi} _ {n} \boldsymbol {\phi} _ {n} ^ {\mathrm{T}}) \mathbf {w} \right\} + \mathrm{const}.} \end{array}\tag{10.155}

This is a quadratic function of w, and so we can obtain the corresponding variational approximation to the posterior distribution by identifying the linear and quadratic terms in w, giving a Gaussian variational posterior of the form

q (\mathbf {w}) = \mathcal {N} (\mathbf {w} | \mathbf {m} _ {N}, \mathbf {S} _ {N})\tag{10.156}

where

\mathbf {m} _ {N} = \mathbf {S} _ {N} \left(\mathbf {S} _ {0} ^ {- 1} \mathbf {m} _ {0} + \sum_ {n = 1} ^ {N} (t _ {n} - 1 / 2) \phi_ {n}\right)\tag{10.157}

\mathbf {S} _ {N} ^ {- 1} = \mathbf {S} _ {0} ^ {- 1} + 2 \sum_ {n = 1} ^ {N} \lambda (\xi_ {n}) \phi_ {n} \phi_ {n} ^ {\mathrm{T}}.\tag{10.158}

As with the Laplace framework, we have again obtained a Gaussian approximation to the posterior distribution. However, the additional flexibility provided by the variational parameters $\{ \xi _ { n } \}$ leads to improved accuracy in the approximation (Jaakkola and Jordan, 2000).

Here we have considered a batch learning context in which all of the training data is available at once. However, Bayesian methods are intrinsically well suited to sequential learning in which the data points are processed one at a time and then discarded. The formulation of this variational approach for the sequential case is straightforward.

Note that the bound given by (10.149) applies only to the two-class problem and so this approach does not directly generalize to classification problems with $K > 2$ classes. An alternative bound for the multiclass case has been explored by Gibbs (1997).
