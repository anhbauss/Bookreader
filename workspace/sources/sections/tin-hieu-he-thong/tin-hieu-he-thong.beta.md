---
id: "tin-hieu-he-thong.beta"
doc_id: "tin-hieu-he-thong"
title: "Beta"
level: 2
heading_path: ["Appendix A. Data Sets", "Beta"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.bernoulli"
next_id: "tin-hieu-he-thong.binomial"
block_ids: ["b7273", "b7274", "b7275", "b7276", "b7277", "b7278", "b7279", "b7280"]
---

## Beta

![image](images/part-004--e1ba74523fa21fa720bf1952840bf17f046ee726809e1b4eee5ca196f303524b.jpg)

This is a distribution over a continuous variable $\mu \in [ 0 , 1 ]$ , which is often used to represent the probability for some binary event. It is governed by two parameters a and b that are constrained by $a > 0$ and $b > 0$ to ensure that the distribution can be normalized.

\operatorname{Beta} (\mu | a, b) = \frac {\Gamma (a + b)}{\Gamma (a) \Gamma (b)} \mu^ {a - 1} (1 - \mu) ^ {b - 1}\tag{B.6}

\mathbb {E} [ \mu ] = \frac {a}{a + b}\tag{B.7}

\operatorname{var} [ \mu ] = \frac {a b}{(a + b) ^ {2} (a + b + 1)}\tag{B.8}

\mathrm{mode} [ \mu ] = \frac {a - 1}{a + b - 2}.\tag{B.9}

The beta is the conjugate prior for the Bernoulli distribution, for which a and b can be interpreted as the effective prior number of observations of $x = 1$ and $x = 0$ respectively. Its density is finite if $a \geqslant 1$ and $b \geqslant 1$ , otherwise there is a singularity at $\mu = 0$ and/or $\mu = 1$ . For $a = b = 1$ , it reduces to a uniform distribution. The beta distribution is a special case of the K-state Dirichlet distribution for $K = 2$
