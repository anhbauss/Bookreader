---
id: "tin-hieu-he-thong.2-3-4-maximum-likelihood-for-the-gaussian"
doc_id: "tin-hieu-he-thong"
title: "2.3.4 Maximum likelihood for the Gaussian"
level: 2
heading_path: ["Probability Distributions", "2.3.4 Maximum likelihood for the Gaussian"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.marginal-and-conditional-gaussians"
next_id: "tin-hieu-he-thong.2-3-5-sequential-estimation"
block_ids: ["b1074", "b1075", "b1076", "b1077", "b1078", "b1079", "b1080", "b1081", "b1082", "b1083", "b1084", "b1085", "b1086", "b1087", "b1088", "b1089", "b1090", "b1091", "b1092"]
---

## 2.3.4 Maximum likelihood for the Gaussian

Given a data set $\mathbf { X } = ( \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } ) ^ { \mathrm { T } }$ in which the observations $\left\{ \mathbf { x } _ { n } \right\}$ are assumed to be drawn independently from a multivariate Gaussian distribution, we can estimate the parameters of the distribution by maximum likelihood. The log likelihood function is given by

\ln p (\mathbf {X} | \boldsymbol {\mu}, \boldsymbol {\Sigma}) = - \frac {N D}{2} \ln (2 \pi) - \frac {N}{2} \ln | \boldsymbol {\Sigma} | - \frac {1}{2} \sum_ {n = 1} ^ {N} \left(\mathbf {x} _ {n} - \boldsymbol {\mu}\right) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} \left(\mathbf {x} _ {n} - \boldsymbol {\mu}\right).\tag{2.118}

By simple rearrangement, we see that the likelihood function depends on the data set only through the two quantities

\sum_ {n = 1} ^ {N} \mathbf {x} _ {n}, \qquad \qquad \sum_ {n = 1} ^ {N} \mathbf {x} _ {n} \mathbf {x} _ {n} ^ {\mathrm{T}}.\tag{2.119}

Appendix C

These are known as the sufficient statistics for the Gaussian distribution. Using (C.19), the derivative of the log likelihood with respect to $\pmb { \mu }$ is given by

\frac {\partial}{\partial \boldsymbol {\mu}} \ln p (\mathbf {X} | \boldsymbol {\mu}, \boldsymbol {\Sigma}) = \sum_ {n = 1} ^ {N} \boldsymbol {\Sigma} ^ {- 1} \left(\mathbf {x} _ {n} - \boldsymbol {\mu}\right)\tag{2.120}

and setting this derivative to zero, we obtain the solution for the maximum likelihood estimate of the mean given by

\pmb {\mu} _ {\mathrm{ML}} = \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {x} _ {n}\tag{2.121}

which is the mean of the observed set of data points. The maximization of (2.118) with respect to Σ is rather more involved. The simplest approach is to ignore the symmetry constraint and show that the resulting solution is symmetric as required. Alternative derivations of this result, which impose the symmetry and positive definiteness constraints explicitly, can be found in Magnus and Neudecker (1999). The result is as expected and takes the form

\pmb {\Sigma} _ {\mathrm{ML}} = \frac {1}{N} \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \pmb {\mu} _ {\mathrm{ML}}) (\mathbf {x} _ {n} - \pmb {\mu} _ {\mathrm{ML}}) ^ {\mathrm{T}}\tag{2.122}

which involves $\pmb { \mu } _ { \mathrm { M L } }$ because this is the result of a joint maximization with respect to $\pmb { \mu }$ and $\Sigma .$ . Note that the solution (2.121) for $\pmb { \mu } _ { \mathrm { M L } }$ does not depend on $\pmb { \Sigma } _ { \mathrm { M L } }$ , and so we can first evaluate $\pmb { \mu } _ { \mathrm { M L } }$ and then use this to evaluate $\pmb { \Sigma } _ { \mathrm { M I } }$ 1

If we evaluate the expectations of the maximum likelihood solutions under the true distribution, we obtain the following results

\mathbb {E} [ \pmb {\mu} _ {\mathrm{ML}} ] = \pmb {\mu}\tag{2.123}

\mathbb {E} [ \pmb {\Sigma} _ {\mathrm{ML}} ] = \frac {N - 1}{N} \pmb {\Sigma}.\tag{2.124}

We see that the expectation of the maximum likelihood estimate for the mean is equal to the true mean. However, the maximum likelihood estimate for the covariance has an expectation that is less than the true value, and hence it is biased. We can correct this bias by defining a different estimator $\widetilde { \pmb { \Sigma } }$ given by

\widetilde {\boldsymbol {\Sigma}} = \frac {1}{N - 1} \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {\mathrm{ML}}) (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {\mathrm{ML}}) ^ {\mathrm{T}}.\tag{2.125}

Clearly from (2.122) and (2.124), the expectation of $\widetilde { \pmb { \Sigma } }$ is equal to Σ.
