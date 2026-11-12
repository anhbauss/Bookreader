---
id: "tin-hieu-he-thong.gaussian-gamma"
doc_id: "tin-hieu-he-thong"
title: "Gaussian-Gamma"
level: 2
heading_path: ["Appendix A. Data Sets", "Gaussian-Gamma"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.gaussian"
next_id: "tin-hieu-he-thong.gaussian-wishart"
block_ids: ["b7354", "b7355", "b7356", "b7357"]
---

## Gaussian-Gamma

![image](images/part-004--eb4aaf85b2fb38f33031f1793b438e7908ae06a85c35d5740a3555e4870ca918.jpg)

This is the conjugate prior distribution for a univariate Gaussian $\mathcal { N } ( \boldsymbol { x } | \mu , \lambda ^ { - 1 } )$ in which the mean $\mu$ and the precision λ are both unknown and is also called the normal-gamma distribution. It comprises the product of a Gaussian distribution for $\mu ,$ whose precision is proportional to λ, and a gamma distribution over λ.

p (\mu , \lambda | \mu_ {0}, \beta , a, b) = \mathcal {N} \left(\mu | \mu_ {o}, (\beta \lambda) ^ {- 1}\right) \operatorname{Gam} (\lambda | a, b).\tag{B.52}
