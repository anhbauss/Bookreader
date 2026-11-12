---
id: "tin-hieu-he-thong.student-s-t"
doc_id: "tin-hieu-he-thong"
title: "Student\u2019s t"
level: 2
heading_path: ["Appendix A. Data Sets", "Student\u2019s t"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.normal"
next_id: "tin-hieu-he-thong.uniform"
block_ids: ["b7380", "b7381", "b7382", "b7383", "b7384", "b7385", "b7386", "b7387", "b7388", "b7389", "b7390", "b7391", "b7392", "b7393", "b7394", "b7395"]
---

## Student’s t

![image](images/part-004--d60dae4a01137910e7aac9dd5c519903fddaf99bc7bbffcf4980754b8da4a495.jpg)

This distribution was published by William Gosset in 1908, but his employer, Guiness Breweries, required him to publish under a pseudonym, so he chose ‘Student’. In the univariate form, Student’s t-distribution is obtained by placing a conjugate gamma prior over the precision of a univariate Gaussian distribution and then integrating out the precision variable. It can therefore be viewed as an infinite mixture of Gaussians having the same mean but different variances.

\operatorname{St} (x | \mu , \lambda , \nu) = \frac {\Gamma (\nu / 2 + 1 / 2)}{\Gamma (\nu / 2)} \left(\frac {\lambda}{\pi \nu}\right) ^ {1 / 2} \left[ 1 + \frac {\lambda (x - \mu) ^ {2}}{\nu} \right] ^ {- \nu / 2 - 1 / 2}\tag{B.64}

\mathbb {E} [ x ] = \mu \quad \mathrm{for} \nu > 1\tag{B.65}

\operatorname{var} [ x ] = \frac {1}{\lambda} \frac {\nu}{\nu - 2} \quad \mathrm{for} \nu > 2\tag{B.66}

\mathrm{mode} [ x ] = \mu .\tag{B.67}

Here $\nu > 0$ is called the number of degrees of freedom of the distribution. The particular case of $\nu = 1$ is called the Cauchy distribution.

For a D-dimensional variable x, Student’s t-distribution corresponds to marginalizing the precision matrix of a multivariate Gaussian with respect to a conjugate Wishart prior and takes the form

\operatorname{St} (\mathbf {x} | \boldsymbol {\mu}, \boldsymbol {\Lambda}, \nu) = \frac {\Gamma (\nu / 2 + D / 2)}{\Gamma (\nu / 2)} \frac {| \boldsymbol {\Lambda} | ^ {1 / 2}}{(\nu \pi) ^ {D / 2}} \left[ 1 + \frac {\Delta^ {2}}{\nu} \right] ^ {- \nu / 2 - D / 2}\tag{B.68}

\mathbb {E} [ \mathbf {x} ] = \boldsymbol {\mu} \quad \mathrm{for} \nu > 1\tag{B.69}

\operatorname{cov} [ \mathbf {x} ] = \frac {\nu}{\nu - 2} \boldsymbol {\Lambda} ^ {- 1} \quad \text { for } \nu > 2\tag{B.70}

\mathrm{mode} [ \mathbf {x} ] = \boldsymbol {\mu}\tag{B.71}

where $\Delta ^ { 2 }$ is the squared Mahalanobis distance defined by

\Delta^ {2} = (\mathbf {x} - \boldsymbol {\mu}) ^ {\mathrm{T}} \boldsymbol {\Lambda} (\mathbf {x} - \boldsymbol {\mu}).\tag{B.72}

In the limit $\nu \to \infty$ , the t-distribution reduces to a Gaussian with mean $\mu$ and precision Λ. Student’s t-distribution provides a generalization of the Gaussian whose maximum likelihood parameter values are robust to outliers.
