---
id: "tin-hieu-he-thong.gaussian"
doc_id: "tin-hieu-he-thong"
title: "Gaussian"
level: 2
heading_path: ["Appendix A. Data Sets", "Gaussian"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.gamma"
next_id: "tin-hieu-he-thong.gaussian-gamma"
block_ids: ["b7321", "b7322", "b7323", "b7324", "b7325", "b7326", "b7327", "b7328", "b7329", "b7330", "b7331", "b7332", "b7333", "b7334", "b7335", "b7336", "b7337", "b7338", "b7339", "b7340", "b7341", "b7342", "b7343", "b7344", "b7345", "b7346", "b7347", "b7348", "b7349", "b7350", "b7351", "b7352", "b7353"]
---

## Gaussian

![image](images/part-004--ad47523940f39a3d8c5c689135d421927daee20144e734eb881f01d6b236f3ed.jpg)

The Gaussian is the most widely used distribution for continuous variables. It is also known as the normal distribution. In the case of a single variable $x \in ( - \infty , \infty )$ it is governed by two parameters, the mean $\mu \in ( - \infty , \infty )$ and the variance $\sigma ^ { 2 } > 0$

\mathcal {N} (x | \mu , \sigma^ {2}) = \frac {1}{(2 \pi \sigma^ {2}) ^ {1 / 2}} \exp \left\{- \frac {1}{2 \sigma^ {2}} (x - \mu) ^ {2} \right\}\tag{B.32}

\mathbb {E} [ x ] = \mu\tag{B.33}

\operatorname{var} [ x ] = \sigma^ {2}\tag{B.34}

\mathrm{mode} [ x ] = \mu\tag{B.35}

\mathrm{H} [ x ] = \frac {1}{2} \ln \sigma^ {2} + \frac {1}{2} (1 + \ln (2 \pi)).\tag{B.36}

The inverse of the variance $\tau = 1 / \sigma ^ { 2 }$ is called the precision, and the square root of the variance $\sigma$ is called the standard deviation. The conjugate prior for $\mu$ is the Gaussian, and the conjugate prior for $\tau$ is the gamma distribution. If both $\mu$ and $\tau$ are unknown, their joint conjugate prior is the Gaussian-gamma distribution.

For a D-dimensional vector x, the Gaussian is governed by a D-dimensional mean vector $\pmb { \mu }$ and a $D \times D$ covariance matrix $\pmb { \Sigma }$ that must be symmetric and

positive-definite.

\mathcal {N} (\mathbf {x} | \boldsymbol {\mu}, \boldsymbol {\Sigma}) = \frac {1}{(2 \pi) ^ {D / 2}} \frac {1}{| \boldsymbol {\Sigma} | ^ {1 / 2}} \exp \left\{- \frac {1}{2} (\mathbf {x} - \boldsymbol {\mu}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} - \boldsymbol {\mu}) \right\}\tag{B.37}

\mathbb {E} [ \mathbf {x} ] = \boldsymbol {\mu}\tag{B.38}

\operatorname{cov} [ \mathbf {x} ] = \boldsymbol {\Sigma}\tag{B.39}

\mathrm{mode} [ \mathbf {x} ] = \boldsymbol {\mu}\tag{B.40}

\mathrm{H} [ \mathbf {x} ] = \frac {1}{2} \ln | \boldsymbol {\Sigma} | + \frac {D}{2} (1 + \ln (2 \pi)).\tag{B.41}

The inverse of the covariance matrix $\pmb { \Lambda } = \pmb { \Sigma } ^ { - 1 }$ is the precision matrix, which is also symmetric and positive definite. Averages of random variables tend to a Gaussian, by the central limit theorem, and the sum of two Gaussian variables is again Gaussian. The Gaussian is the distribution that maximizes the entropy for a given variance (or covariance). Any linear transformation of a Gaussian random variable is again Gaussian. The marginal distribution of a multivariate Gaussian with respect to a subset of the variables is itself Gaussian, and similarly the conditional distribution is also Gaussian. The conjugate prior for $\pmb { \mu }$ is the Gaussian, the conjugate prior for Λ is the Wishart, and the conjugate prior for $( \mu , \Lambda )$ is the Gaussian-Wishart.

If we have a marginal Gaussian distribution for x and a conditional Gaussian distribution for y given x in the form

{p (\mathbf {x})} = {\mathcal {N} (\mathbf {x} | \boldsymbol {\mu}, \boldsymbol {\Lambda} ^ {- 1})}\tag{B.42}

p (\mathbf {y} | \mathbf {x}) = \mathcal {N} (\mathbf {y} | \mathbf {A x} + \mathbf {b}, \mathbf {L} ^ {- 1})\tag{B.43}

then the marginal distribution of $\mathbf { y } _ { \mathrm { : } }$ , and the conditional distribution of x given y, are given by

{p (\mathbf {y})} = {\mathcal {N} (\mathbf {y} | \mathbf {A} \boldsymbol {\mu} + \mathbf {b}, \mathbf {L} ^ {- 1} + \mathbf {A} \boldsymbol {\Lambda} ^ {- 1} \mathbf {A} ^ {\mathrm{T}})}\tag{B.44}

{p (\mathbf {x} | \mathbf {y})} = {\mathcal {N} (\mathbf {x} | \boldsymbol {\Sigma} \{\mathbf {A} ^ {\mathrm{T}} \mathbf {L} (\mathbf {y} - \mathbf {b}) + \boldsymbol {\Lambda} \boldsymbol {\mu} \}, \boldsymbol {\Sigma})}\tag{B.45}

where

\boldsymbol {\Sigma} = \left(\boldsymbol {\Lambda} + \mathbf {A} ^ {\mathrm{T}} \mathbf {L} \mathbf {A}\right) ^ {- 1}.\tag{B.46}

If we have a joint Gaussian distribution $\mathcal { N } ( { \bf x } | \mu , \Sigma )$ with $\pmb { \Lambda } \equiv \pmb { \Sigma } ^ { - 1 }$ and we define the following partitions

\mathbf {x} = \binom{\mathbf {x} _ {a}}{\mathbf {x} _ {b}}, \quad \boldsymbol {\mu} = \binom{\boldsymbol {\mu} _ {a}}{\boldsymbol {\mu} _ {b}}\tag{B.47}

\boldsymbol {\Sigma} = \left( \begin{array}{c c} \boldsymbol {\Sigma} _ {a a} & \boldsymbol {\Sigma} _ {a b} \\ \boldsymbol {\Sigma} _ {b a} & \boldsymbol {\Sigma} _ {b b} \end{array} \right), \quad \boldsymbol {\Lambda} = \left( \begin{array}{c c} \boldsymbol {\Lambda} _ {a a} & \boldsymbol {\Lambda} _ {a b} \\ \boldsymbol {\Lambda} _ {b a} & \boldsymbol {\Lambda} _ {b b} \end{array} \right)\tag{B.48}

then the conditional distribution $p ( \mathbf { x } _ { a } | \mathbf { x } _ { b } )$ is given by

{p (\mathbf {x} _ {a} | \mathbf {x} _ {b})} = {\mathcal {N} (\mathbf {x} | \boldsymbol {\mu} _ {a | b}, \boldsymbol {\Lambda} _ {a a} ^ {- 1})}\tag{B.49}

{\pmb {\mu} _ {a | b}} = {\pmb {\mu} _ {a} - \pmb {\Lambda} _ {a a} ^ {- 1} \pmb {\Lambda} _ {a b} (\mathbf {x} _ {b} - \pmb {\mu} _ {b})}\tag{B.50}

and the marginal distribution $p ( \mathbf { x } _ { a } )$ is given by

p (\mathbf {x} _ {a}) = \mathcal {N} (\mathbf {x} _ {a} | \boldsymbol {\mu} _ {a}, \boldsymbol {\Sigma} _ {a a}).\tag{B.51}
