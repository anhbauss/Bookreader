---
id: "tin-hieu-he-thong.gamma"
doc_id: "tin-hieu-he-thong"
title: "Gamma"
level: 2
heading_path: ["Appendix A. Data Sets", "Gamma"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.dirichlet"
next_id: "tin-hieu-he-thong.gaussian"
block_ids: ["b7311", "b7312", "b7313", "b7314", "b7315", "b7316", "b7317", "b7318", "b7319", "b7320"]
---

## Gamma

![image](images/part-004--7c2b7b470a10fb4e1143398814466dd361610557db18ba57692cbabece513e7d.jpg)

The Gamma is a probability distribution over a positive random variable $\tau > 0$ governed by parameters a and $b$ that are subject to the constraints $a > 0$ and $b > 0$ to ensure that the distribution can be normalized.

\operatorname{Gam} (\tau | a, b) = \frac {1}{\Gamma (a)} b ^ {a} \tau^ {a - 1} e ^ {- b \tau}\tag{B.26}

\mathbb {E} [ \tau ] = \frac {a}{b}\tag{B.27}

\operatorname{var} [ \tau ] = \frac {a}{b ^ {2}}\tag{B.28}

\operatorname{mode} [ \tau ] = \frac {a - 1}{b} \quad \text { for } \alpha \geqslant 1\tag{B.29}

\mathbb {E} [ \ln \tau ] = \psi (a) - \ln b\tag{B.30}

\mathrm{H} [ \tau ] = \ln \Gamma (a) - (a - 1) \psi (a) - \ln b + a\tag{B.31}

where $\psi ( \cdot )$ is the digamma function defined by (B.25). The gamma distribution is the conjugate prior for the precision (inverse variance) of a univariate Gaussian. For $a \geqslant 1$ the density is everywhere finite, and the special case of $a = 1$ is known as the exponential distribution.
