---
id: "tin-hieu-he-thong.gaussian-wishart"
doc_id: "tin-hieu-he-thong"
title: "Gaussian-Wishart"
level: 2
heading_path: ["Appendix A. Data Sets", "Gaussian-Wishart"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.gaussian-gamma"
next_id: "tin-hieu-he-thong.multinomial"
block_ids: ["b7358", "b7359", "b7360", "b7361"]
---

## Gaussian-Wishart

This is the conjugate prior distribution for a multivariate Gaussian $\mathcal { N } ( \mathbf { x } | \boldsymbol { \mu } , \mathbf { \Lambda } \mathbf { \Lambda } )$ in which both the mean $\pmb { \mu }$ and the precision Λ are unknown, and is also called the normal-Wishart distribution. It comprises the product of a Gaussian distribution for $\mu ,$ whose precision is proportional to Λ, and a Wishart distribution over Λ.

p (\boldsymbol {\mu}, \boldsymbol {\Lambda} | \boldsymbol {\mu} _ {0}, \beta , \mathbf {W}, \nu) = \mathcal {N} \left(\boldsymbol {\mu} | \boldsymbol {\mu} _ {0}, (\beta \boldsymbol {\Lambda}) ^ {- 1}\right) \mathcal {W} (\boldsymbol {\Lambda} | \mathbf {W}, \nu).\tag{B.53}

For the particular case of a scalar x, this is equivalent to the Gaussian-gamma distribution.
