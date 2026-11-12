---
id: "tin-hieu-he-thong.wishart"
doc_id: "tin-hieu-he-thong"
title: "Wishart"
level: 2
heading_path: ["Appendix A. Data Sets", "Wishart"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.von-mises"
next_id: "tin-hieu-he-thong.appendix-c-properties-of-matrices"
block_ids: ["b7409", "b7410", "b7411", "b7412", "b7413", "b7414", "b7415", "b7416", "b7417"]
---

## Wishart

The Wishart distribution is the conjugate prior for the precision matrix of a multivariate Gaussian.

\mathcal {W} (\boldsymbol {\Lambda} | \mathbf {W}, \nu) = B (\mathbf {W}, \nu) | \boldsymbol {\Lambda} | ^ {(\nu - D - 1) / 2} \exp \left(- \frac {1}{2} \operatorname{Tr} \left(\mathbf {W} ^ {- 1} \boldsymbol {\Lambda}\right)\right)\tag{B.78}

where

B (\mathbf {W}, \nu) \equiv | \mathbf {W} | ^ {- \nu / 2} \left(2 ^ {\nu D / 2} \pi^ {D (D - 1) / 4} \prod_ {i = 1} ^ {D} \Gamma \left(\frac {\nu + 1 - i}{2}\right)\right) ^ {- 1}\tag{B.79}

\mathbb {E} [ \boldsymbol {\Lambda} ] = \nu \mathbf {W}\tag{B.80}

\mathbb {E} \left[ \ln | \boldsymbol {\Lambda} | \right] = \sum_ {i = 1} ^ {D} \psi \left(\frac {\nu + 1 - i}{2}\right) + D \ln 2 + \ln | \mathbf {W} |\tag{B.81}

\mathrm{H} [ \boldsymbol {\Lambda} ] = - \ln B (\mathbf {W}, \nu) - \frac {(\nu - D - 1)}{2} \mathbb {E} \left[ \ln | \boldsymbol {\Lambda} | \right] + \frac {\nu D}{2}\tag{B.82}

where W is a $D \times D$ symmetric, positive definite matrix, and $\psi ( \cdot )$ is the digamma function defined by (B.25). The parameter ν is called the number of degrees of freedom of the distribution and is restricted to $\nu > D - 1$ to ensure that the Gamma function in the normalization factor is well-defined. In one dimension, the Wishart reduces to the gamma distribution ${ \mathrm { G a m } } ( \lambda | a , b )$ given by (B.26) with parameters $a = \nu / 2$ and $b = 1 / 2 W$
