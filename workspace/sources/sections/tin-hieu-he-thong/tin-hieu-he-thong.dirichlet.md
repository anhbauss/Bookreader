---
id: "tin-hieu-he-thong.dirichlet"
doc_id: "tin-hieu-he-thong"
title: "Dirichlet"
level: 2
heading_path: ["Appendix A. Data Sets", "Dirichlet"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.binomial"
next_id: "tin-hieu-he-thong.gamma"
block_ids: ["b7291", "b7292", "b7293", "b7294", "b7295", "b7296", "b7297", "b7298", "b7299", "b7300", "b7301", "b7302", "b7303", "b7304", "b7305", "b7306", "b7307", "b7308", "b7309", "b7310"]
---

## Dirichlet

![image](images/part-004--481f702dd71d0629bb2ed26997c35ee77d9745f097d654dae95589a34e134dde.jpg)

The Dirichlet is a multivariate distribution over K random variables $0 \leqslant \mu _ { k } \leqslant 1$ where $k = 1 , \ldots , K$ , subject to the constraints

0 \leqslant \mu_ {k} \leqslant 1, \quad \sum_ {k = 1} ^ {K} \mu_ {k} = 1.\tag{B.15}

Denoting $\pmb { \mu } = ( \mu _ { 1 } , \ldots , \mu _ { K } ) ^ { \mathrm { T } }$ and $\mathbf { \alpha } \propto ( \alpha _ { 1 } , \ldots , \alpha _ { K } ) ^ { \mathrm { T } }$ , we have

\operatorname{Dir} (\boldsymbol {\mu} | \boldsymbol {\alpha}) = C (\boldsymbol {\alpha}) \prod_ {k = 1} ^ {K} \mu_ {k} ^ {\alpha_ {k} - 1}\tag{B.16}

\mathbb {E} [ \mu_ {k} ] = \frac {\alpha_ {k}}{\widehat {\alpha}}\tag{B.17}

\operatorname{var} [ \mu_ {k} ] = \frac {\alpha_ {k} (\widehat {\alpha} - \alpha_ {k})}{\widehat {\alpha} ^ {2} (\widehat {\alpha} + 1)}\tag{B.18}

\operatorname{cov} [ \mu_ {j} \mu_ {k} ] = - \frac {\alpha_ {j} \alpha_ {k}}{\widehat {\alpha} ^ {2} (\widehat {\alpha} + 1)}\tag{B.19}

\mathrm{mode} [ \mu_ {k} ] = \frac {\alpha_ {k} - 1}{\widehat {\alpha} - K}\tag{B.20}

\mathbb {E} [ \ln \mu_ {k} ] = \psi (\alpha_ {k}) - \psi (\widehat {\alpha})\tag{B.21}

\mathrm{H} [ \boldsymbol {\mu} ] = - \sum_ {k = 1} ^ {K} (\alpha_ {k} - 1) \left\{\psi (\alpha_ {k}) - \psi (\widehat {\alpha}) \right\} - \ln C (\boldsymbol {\alpha})\tag{B.22}

where

C (\boldsymbol {\alpha}) = \frac {\Gamma (\widehat {\alpha})}{\Gamma (\alpha_ {1}) \cdots \Gamma (\alpha_ {K})}\tag{B.23}

and

\widehat {\alpha} = \sum_ {k = 1} ^ {K} \alpha_ {k}.\tag{B.24}

Here

\psi (a) \equiv \frac {d}{d a} \ln \Gamma (a)\tag{B.25}

is known as the digamma function (Abramowitz and Stegun, 1965). The parameters $\alpha _ { k }$ are subject to the constraint $\alpha _ { k } > 0$ in order to ensure that the distribution can be normalized.

The Dirichlet forms the conjugate prior for the multinomial distribution and represents a generalization of the beta distribution. In this case, the parameters $\alpha _ { k }$ can be interpreted as effective numbers of observations of the corresponding values of the K-dimensional binary observation vector x. As with the beta distribution, the Dirichlet has finite density everywhere provided $\alpha _ { k } \geqslant 1$ for all k.
