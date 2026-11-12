---
id: "tin-hieu-he-thong.binomial"
doc_id: "tin-hieu-he-thong"
title: "Binomial"
level: 2
heading_path: ["Appendix A. Data Sets", "Binomial"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.beta"
next_id: "tin-hieu-he-thong.dirichlet"
block_ids: ["b7281", "b7282", "b7283", "b7284", "b7285", "b7286", "b7287", "b7288", "b7289", "b7290"]
---

## Binomial

![image](images/part-004--286dcb35f9b09f91bffb0a3d13b0225478bae8b4f05741e0185eac0b30aec4cb.jpg)

The binomial distribution gives the probability of observing m occurrences of $x = 1$ in a set of N samples from a Bernoulli distribution, where the probability of observing $x = 1$ is $\mu \in [ 0 , 1 ]$

\operatorname{Bin} (m | N, \mu) = \binom {N} {m} \mu^ {m} (1 - \mu) ^ {N - m}\tag{B.10}

\mathbb {E} [ m ] = N \mu\tag{B.11}

\operatorname{var} [ m ] = N \mu (1 - \mu)\tag{B.12}

\mathrm{mode} [ m ] = \lfloor (N + 1) \mu \rfloor\tag{B.13}

where $\left\lfloor ( N + 1 ) \mu \right\rfloor$ denotes the largest integer that is less than or equal to $( N + 1 ) \mu .$ and the quantity

\binom {N} {m} = \frac {N !}{m ! (N - m) !}\tag{B.14}

denotes the number of ways of choosing m objects out of a total of N identical objects. Here $m !$ , pronounced ‘factorial $m ^ { \prime }$ , denotes the product $m \times ( m - 1 ) \times$ $\ldots , \times 2 \times 1$ . The particular case of the binomial distribution for $N = 1$ is known as the Bernoulli distribution, and for large N the binomial distribution is approximately Gaussian. The conjugate prior for $\mu$ is the beta distribution.
