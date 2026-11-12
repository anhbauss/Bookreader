---
id: "tin-hieu-he-thong.multinomial"
doc_id: "tin-hieu-he-thong"
title: "Multinomial"
level: 2
heading_path: ["Appendix A. Data Sets", "Multinomial"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.gaussian-wishart"
next_id: "tin-hieu-he-thong.normal"
block_ids: ["b7362", "b7363", "b7364", "b7365", "b7366", "b7367", "b7368", "b7369", "b7370", "b7371", "b7372", "b7373", "b7374", "b7375", "b7376", "b7377"]
---

## Multinomial

If we generalize the Bernoulli distribution to an K-dimensional binary variable x with components $x _ { k } \in \{ 0 , 1 \}$ such that $\textstyle \sum _ { k } x _ { k } = 1$ , then we obtain the following discrete distribution

p (\mathbf {x}) = \prod_ {k = 1} ^ {K} \mu_ {k} ^ {x _ {k}}\tag{B.54}

\mathbb {E} [ x _ {k} ] = \mu_ {k}\tag{B.55}

\operatorname{var} [ x _ {k} ] = \mu_ {k} (1 - \mu_ {k})\tag{B.56}

{\mathrm{cov} [ x _ {j} x _ {k} ]} = {I _ {j k} \mu_ {k}}\tag{B.57}

\mathrm{H} [ \mathbf {x} ] = - \sum_ {k = 1} ^ {M} \mu_ {k} \ln \mu_ {k}\tag{B.58}

where $I _ { j k }$ is the $j , k$ element of the identity matrix. Because $p ( x _ { k } = 1 ) = \mu _ { k }$ , the parameters must satisfy $0 \leqslant \mu _ { k } \leqslant 1$ and $\textstyle \sum _ { k } \mu _ { k } = 1$

The multinomial distribution is a multivariate generalization of the binomial and gives the distribution over counts $m _ { k }$ for a K-state discrete variable to be in state k given a total number of observations N.

\text { Mult } (m _ {1}, m _ {2}, \ldots , m _ {K} | \boldsymbol {\mu}, N) = \binom{N}{m _ {1} m _ {2} \ldots m _ {M}} \prod_ {k = 1} ^ {M} \mu_ {k} ^ {m _ {k}}\tag{B.59}

\mathbb {E} [ m _ {k} ] = N \mu_ {k}\tag{B.60}

{\mathrm{var} [ m _ {k} ]} = {N \mu_ {k} (1 - \mu_ {k})}\tag{B.61}

\operatorname{cov} [ m _ {j} m _ {k} ] = - N \mu_ {j} \mu_ {k}\tag{B.62}

where $\pmb { \mu } = ( \mu _ { 1 } , \ldots , \mu _ { K } ) ^ { \mathrm { T } }$ , and the quantity

\binom {N} {m _ {1} m _ {2} \ldots m _ {K}} = \frac {N !}{m _ {1} ! \ldots m _ {K} !}\tag{B.63}

gives the number of ways of taking N identical objects and assigning $m _ { k }$ of them to bin k for $k = 1 , \ldots , K$ . The value of $\mu _ { k }$ gives the probability of the random variable taking state k, and so these parameters are subject to the constraints $0 \leqslant \mu _ { k } \leqslant 1$ and $\bar { \sum _ { k } \mu _ { k } } ~ = ~ 1$ . The conjugate prior distribution for the parameters $\{ \mu _ { k } \}$ is the Dirichlet.
