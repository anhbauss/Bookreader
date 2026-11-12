---
id: "tin-hieu-he-thong.1-2-6-bayesian-curve-fitting"
doc_id: "tin-hieu-he-thong"
title: "1.2.6 Bayesian curve fitting"
level: 2
heading_path: ["Introduction", "1.2.6 Bayesian curve fitting"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.1-2-5-curve-fitting-re-visited"
next_id: "tin-hieu-he-thong.1-3-model-selection"
block_ids: ["b381", "b382", "b383", "b384", "b385", "b386", "b387", "b388", "b389", "b390", "b391", "b392", "b393", "b394", "b395", "b396"]
---

## 1.2.6 Bayesian curve fitting

Although we have included a prior distribution $p ( \mathbf { w } | \alpha )$ , we are so far still making a point estimate of w and so this does not yet amount to a Bayesian treatment. In a fully Bayesian approach, we should consistently apply the sum and product rules of probability, which requires, as we shall see shortly, that we integrate over all values of w. Such marginalizations lie at the heart of Bayesian methods for pattern recognition.

In the curve fitting problem, we are given the training data x and t, along with a new test point $x ,$ and our goal is to predict the value of t. We therefore wish to evaluate the predictive distribution $p ( t | x , \mathbf { x } , \mathbf { t } )$ . Here we shall assume that the parameters α and $\beta$ are fixed and known in advance (in later chapters we shall discuss how such parameters can be inferred from data in a Bayesian setting).

A Bayesian treatment simply corresponds to a consistent application of the sum and product rules of probability, which allow the predictive distribution to be written in the form C

p (t | x, \mathbf {x}, \mathbf {t}) = \int p (t | x, \mathbf {w}) p (\mathbf {w} | \mathbf {x}, \mathbf {t}) d \mathbf {w}.\tag{1.68}

Here $p ( t | x , \mathbf { w } )$ is given by (1.60), and we have omitted the dependence on α and $\beta$ to simplify the notation. Here $p ( \mathbf { w } | \mathbf { x } , \mathbf { t } )$ is the posterior distribution over parameters, and can be found by normalizing the right-hand side of (1.66). We shall see in Section 3.3 that, for problems such as the curve-fitting example, this posterior distribution is a Gaussian and can be evaluated analytically. Similarly, the integration in (1.68) can also be performed analytically with the result that the predictive distribution is given by a Gaussian of the form

p (t | x, \mathbf {x}, \mathbf {t}) = \mathcal {N} \left(t | m (x), s ^ {2} (x)\right)\tag{1.69}

where the mean and variance are given by

m (x) = \beta \phi (x) ^ {\mathrm{T}} \mathbf {S} \sum_ {n = 1} ^ {N} \phi (x _ {n}) t _ {n}\tag{1.70}

s ^ {2} (x) = \beta^ {- 1} + \phi (x) ^ {\mathrm{T}} \mathbf {S} \phi (x).\tag{1.71}

Here the matrix S is given by

\mathbf {S} ^ {- 1} = \alpha \mathbf {I} + \beta \sum_ {n = 1} ^ {N} \boldsymbol {\phi} (x _ {n}) \boldsymbol {\phi} (x) ^ {\mathrm{T}}\tag{1.72}

where I is the unit matrix, and we have defined the vector $\phi ( x )$ with elements $\phi _ { i } ( x ) = x ^ { i }$ for $i = 0 , \ldots , M$

We see that the variance, as well as the mean, of the predictive distribution in (1.69) is dependent on x. The first term in (1.71) represents the uncertainty in the predicted value of t due to the noise on the target variables and was expressed already in the maximum likelihood predictive distribution (1.64) through $\beta _ { \mathrm { M L } } ^ { - \tilde { 1 } }$ . However, the second term arises from the uncertainty in the parameters w and is a consequence of the Bayesian treatment. The predictive distribution for the synthetic sinusoidal regression problem is illustrated in Figure 1.17.

The predictive distribution resulting from a Bayesian treatment of polynomial curve fitting using an $M = 9$ polynomial, with the fixed parameters $\alpha = 5 \times 1 0 ^ { - 3 }$ and $\beta =$ 11.1 (corresponding to the known noise variance), in which the red curve denotes the mean of the predictive distribution and the red region corresponds to 1 standard deviation around the mean.

![image](images/part-001--5f12f9003d6a6dd7de8d5bdb90c0b5002bc0af93ee03032a6c977906ba151fb5.jpg)
