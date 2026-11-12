---
id: "tin-hieu-he-thong.2-4-3-noninformative-priors"
doc_id: "tin-hieu-he-thong"
title: "2.4.3 Noninformative priors"
level: 2
heading_path: ["Probability Distributions", "2.4.3 Noninformative priors"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-4-2-conjugate-priors"
next_id: "tin-hieu-he-thong.2-5-nonparametric-methods"
block_ids: ["b1389", "b1390", "b1391", "b1392", "b1393", "b1394", "b1395", "b1396", "b1397", "b1398", "b1399", "b1400", "b1401", "b1402", "b1403", "b1404", "b1405", "b1406", "b1407", "b1408", "b1409", "b1410", "b1411", "b1412", "b1413", "b1414", "b1415"]
---

## 2.4.3 Noninformative priors

In some applications of probabilistic inference, we may have prior knowledge that can be conveniently expressed through the prior distribution. For example, if the prior assigns zero probability to some value of variable, then the posterior distribution will necessarily also assign zero probability to that value, irrespective of any subsequent observations of data. In many cases, however, we may have little idea of what form the distribution should take. We may then seek a form of prior distribution, called a noninformative prior, which is intended to have as little influence on the posterior distribution as possible (Jeffries, 1946; Box and Tao, 1973; Bernardo and Smith, 1994). This is sometimes referred to as ‘letting the data speak for themselves’.

If we have a distribution $p ( x | \lambda )$ governed by a parameter λ, we might be tempted to propose a prior distribution $p ( \lambda ) = \mathrm { c o n s t }$ as a suitable prior. If λ is a discrete variable with K states, this simply amounts to setting the prior probability of each state to $1 / K$ . In the case of continuous parameters, however, there are two potential difficulties with this approach. The first is that, if the domain of λ is unbounded, this prior distribution cannot be correctly normalized because the integral over λ diverges. Such priors are called improper. In practice, improper priors can often be used provided the corresponding posterior distribution is proper, i.e., that it can be correctly normalized. For instance, if we put a uniform prior distribution over the mean of a Gaussian, then the posterior distribution for the mean, once we have observed at least one data point, will be proper.

A second difficulty arises from the transformation behaviour of a probability density under a nonlinear change of variables, given by (1.27). If a function $h ( \lambda )$ is constant, and we change variables to $\lambda = \eta ^ { 2 }$ , then $\widehat { h } ( \eta ) = h ( \eta ^ { 2 } )$ will also be constant. However, if we choose the density $p _ { \lambda } ( \lambda )$ to be constant, then the density of $\eta$ will be given, from (1.27), by

p _ {\eta} (\eta) = p _ {\lambda} (\lambda) \left| \frac {\mathrm{d} \lambda}{\mathrm{d} \eta} \right| = p _ {\lambda} (\eta^ {2}) 2 \eta \propto \eta\tag{2.231}

and so the density over $\eta$ will not be constant. This issue does not arise when we use maximum likelihood, because the likelihood function $p ( x | \lambda )$ is a simple function of λ and so we are free to use any convenient parameterization. If, however, we are to choose a prior distribution that is constant, we must take care to use an appropriate representation for the parameters.

Here we consider two simple examples of noninformative priors (Berger, 1985). First of all, if a density takes the form

p (x | \mu) = f (x - \mu)\tag{2.232}

then the parameter $\mu$ is known as a location parameter. This family of densities exhibits translation invariance because if we shift x by a constant to give ${ \widehat { x } } = x + c ,$ then

p (\widehat {x} | \widehat {\mu}) = f (\widehat {x} - \widehat {\mu})\tag{2.233}

where we have defined ${ \widehat { \mu } } = \mu + c$   Thus the density takes the same form in the new variable as in the original one, and so the density is independent of the choice of origin. We would like to choose a prior distribution that reflects this translation invariance property, and so we choose a prior that assigns equal probability mass to an interval $A \leqslant \mu \leqslant B$ as to the shifted interval $A - c \leqslant \mu \leqslant B - c .$ . This implies

\int_ {A} ^ {B} p (\mu) \mathrm{d} \mu = \int_ {A - c} ^ {B - c} p (\mu) \mathrm{d} \mu = \int_ {A} ^ {B} p (\mu - c) \mathrm{d} \mu\tag{2.234}

and because this must hold for all choices of A and B, we have

p (\mu - c) = p (\mu)\tag{2.235}

which implies that $p ( \mu )$ is constant. An example of a location parameter would be the mean $\mu$ of a Gaussian distribution. As we have seen, the conjugate prior distribution for $\mu$ in this case is a Gaussian $p ( \mu | \mu _ { 0 } , \sigma _ { 0 } ^ { 2 } ) = \mathcal { N } ( \mu | \mu _ { 0 } , \sigma _ { 0 } ^ { 2 } )$ , and we obtain a noninformative prior by taking the limit $\sigma _ { 0 } ^ { 2 } \to \infty$ . Indeed, from (2.141) and (2.142) we see that this gives a posterior distribution over $\mu$ in which the contributions from the prior vanish.

As a second example, consider a density of the form

p (x | \sigma) = \frac {1}{\sigma} f \left(\frac {x}{\sigma}\right)\tag{2.236}

where $\sigma > 0$ . Note that this will be a normalized density provided $f ( x )$ is correctly normalized. The parameter $\sigma$ is known as a scale parameter, and the density exhibits scale invariance because if we scale x by a constant to give ${ \widehat { x } } = c x$ , then

p (\widehat {x} | \widehat {\sigma}) = \frac {1}{\widehat {\sigma}} f \binom{\widehat {x}}{\overline {{\widehat {\sigma}}}}\tag{2.237}

where we have defined $\widehat { \boldsymbol { \sigma } } = c \boldsymbol { \sigma }$ . This transformation corresponds to a change of scale, for example from meters to kilometers if x is a length, and we would like to choose a prior distribution that reflects this scale invariance. If we consider an interval $A \leqslant \sigma \leqslant B$ , and a scaled interval $A / c \leqslant \sigma \leqslant B / c$ , then the prior should assign equal probability mass to these two intervals. Thus we have

\int_ {A} ^ {B} p (\sigma) \mathrm{d} \sigma = \int_ {A / c} ^ {B / c} p (\sigma) \mathrm{d} \sigma = \int_ {A} ^ {B} p \left(\frac {1}{c} \sigma\right) \frac {1}{c} \mathrm{d} \sigma\tag{2.238}

and because this must hold for choices of A and B, we have

p (\sigma) = p \left(\frac {1}{c} \sigma\right) \frac {1}{c}\tag{2.239}

and hence $p ( \sigma ) \propto 1 / \sigma$ . Note that again this is an improper prior because the integral of the distribution over $0 \leqslant \sigma \leqslant \infty$ is divergent. It is sometimes also convenient to think of the prior distribution for a scale parameter in terms of the density of the log of the parameter. Using the transformation rule (1.27) for densities we see that $p ( \ln \sigma ) = \mathrm { c o n s t }$ . Thus, for this prior there is the same probability mass in the range $1 \leqslant \sigma \leqslant 1 0$ as in the range $1 0 \leqslant \sigma \leqslant 1 0 0$ and in $1 0 0 \leqslant \sigma \leqslant 1 0 0 0$

An example of a scale parameter would be the standard deviation $\sigma$ of a Gaussian distribution, after we have taken account of the location parameter $\mu ,$ , because

\mathcal {N} (x | \mu , \sigma^ {2}) \propto \sigma^ {- 1} \exp \left\{- (\widetilde {x} / \sigma) ^ {2} \right\}\tag{2.240}

where ${ \widetilde { x } } = x - \mu$ . As discussed earlier, it is often more convenient to work in terms of the precision $\lambda = 1 / \sigma ^ { 2 }$ rather than $\sigma$ itself. Using the transformation rule for densities, we see that a distribution $p ( \sigma ) \propto 1 / \sigma$ corresponds to a distribution over λ of the form $p ( \lambda ) \propto 1 / \lambda$ . We have seen that the conjugate prior for λ was the gamma distribution $\mathrm { G a m } ( \lambda | a _ { 0 } , b _ { 0 } )$ given by (2.146). The noninformative prior is obtained as the special case $a _ { 0 } = b _ { 0 } = 0$ . Again, if we examine the results (2.150) and (2.151) for the posterior distribution of λ, we see that for $a _ { 0 } = b _ { 0 } = 0$ , the posterior depends only on terms arising from the data and not from the prior.
