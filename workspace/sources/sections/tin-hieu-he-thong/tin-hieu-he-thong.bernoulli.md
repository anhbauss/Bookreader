---
id: "tin-hieu-he-thong.bernoulli"
doc_id: "tin-hieu-he-thong"
title: "Bernoulli"
level: 2
heading_path: ["Appendix A. Data Sets", "Bernoulli"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.appendix-b-probability-distributions"
next_id: "tin-hieu-he-thong.beta"
block_ids: ["b7265", "b7266", "b7267", "b7268", "b7269", "b7270", "b7271", "b7272"]
---

## Bernoulli

This is the distribution for a single binary variable $x \ \in \ \{ 0 , 1 \}$ representing, for example, the result of flipping a coin. It is governed by a single continuous parameter $\mu \in [ 0 , 1 ]$ that represents the probability of $x = 1$

\mathrm{Bern} (x | \mu) = \mu^ {x} (1 - \mu) ^ {1 - x}\tag{B.1}

\mathbb {E} [ x ] = \mu\tag{B.2}

\operatorname{var} [ x ] = \mu (1 - \mu)\tag{B.3}

\operatorname{mode} [ x ] = \left\{ \begin{array}{l l} 1 & \text { if } \mu \geqslant 0. 5, \\ 0 & \text { otherwise } \end{array} \right.\tag{B.4}

\mathrm{H} [ x ] = - \mu \ln \mu - (1 - \mu) \ln (1 - \mu).\tag{B.5}

The Bernoulli is a special case of the binomial distribution for the case of a single observation. Its conjugate prior for $\mu$ is the beta distribution.
