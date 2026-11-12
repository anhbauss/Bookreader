---
id: "tin-hieu-he-thong.4-5-1-laplace-approximation"
doc_id: "tin-hieu-he-thong"
title: "4.5.1 Laplace approximation"
level: 2
heading_path: ["4 Linear Models for Classification", "4.5.1 Laplace approximation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-5-bayesian-logistic-regression"
next_id: "tin-hieu-he-thong.4-5-2-predictive-distribution"
block_ids: ["b2501", "b2502", "b2503", "b2504", "b2505", "b2506", "b2507", "b2508", "b2509", "b2510", "b2511", "b2512", "b2513"]
---

## 4.5.1 Laplace approximation

Recall from Section 4.4 that the Laplace approximation is obtained by finding the mode of the posterior distribution and then fitting a Gaussian centred at that mode. This requires evaluation of the second derivatives of the log posterior, which is equivalent to finding the Hessian matrix.

Because we seek a Gaussian representation for the posterior distribution, it is natural to begin with a Gaussian prior, which we write in the general form

p (\mathbf {w}) = \mathcal {N} (\mathbf {w} | \mathbf {m} _ {0}, \mathbf {S} _ {0})\tag{4.140}

where $\mathbf { m } _ { 0 }$ and $\mathbf { S } _ { 0 }$ are fixed hyperparameters. The posterior distribution over w is given by

p (\mathbf {w} | \mathbf {t}) \propto p (\mathbf {w}) p (\mathbf {t} | \mathbf {w})\tag{4.141}

where $\mathbf { t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ . Taking the log of both sides, and substituting for the prior distribution using (4.140), and for the likelihood function using (4.89), we obtain

\begin{array}{r c l} \ln p (\mathbf {w} | \mathbf {t}) & = & - \frac {1}{2} (\mathbf {w} - \mathbf {m} _ {0}) ^ {\mathrm{T}} \mathbf {S} _ {0} ^ {- 1} (\mathbf {w} - \mathbf {m} _ {0}) \\ & & + \sum_ {n = 1} ^ {N} \left\{t _ {n} \ln y _ {n} + (1 - t _ {n}) \ln (1 - y _ {n}) \right\} + \text {const} \end{array}\tag{4.142}

where $y _ { n } = \sigma ( \mathbf { w } ^ { \mathrm { T } } \phi _ { n } )$ . To obtain a Gaussian approximation to the posterior distribution, we first maximize the posterior distribution to give the MAP (maximum posterior) solution ${ \bf w } _ { \mathrm { M A P } }$ , which defines the mean of the Gaussian. The covariance is then given by the inverse of the matrix of second derivatives of the negative log likelihood, which takes the form

\mathbf {S} _ {N} = - \nabla \nabla \ln p (\mathbf {w} | \mathbf {t}) = \mathbf {S} _ {0} ^ {- 1} + \sum_ {n = 1} ^ {N} y _ {n} (1 - y _ {n}) \boldsymbol {\phi} _ {n} \boldsymbol {\phi} _ {n} ^ {\mathrm{T}}.\tag{4.143}

The Gaussian approximation to the posterior distribution therefore takes the form

q (\mathbf {w}) = \mathcal {N} (\mathbf {w} | \mathbf {w} _ {\mathrm{MAP}}, \mathbf {S} _ {N}).\tag{4.144}

Having obtained a Gaussian approximation to the posterior distribution, there remains the task of marginalizing with respect to this distribution in order to make predictions.
