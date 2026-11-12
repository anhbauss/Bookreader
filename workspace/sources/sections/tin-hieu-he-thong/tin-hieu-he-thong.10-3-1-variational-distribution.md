---
id: "tin-hieu-he-thong.10-3-1-variational-distribution"
doc_id: "tin-hieu-he-thong"
title: "10.3.1 Variational distribution"
level: 2
heading_path: ["Approximate Inference", "10.3.1 Variational distribution"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-3-variational-linear-regression"
next_id: "tin-hieu-he-thong.10-3-2-predictive-distribution"
block_ids: ["b5329", "b5330", "b5331", "b5332", "b5333", "b5334", "b5335", "b5336", "b5337", "b5338", "b5339", "b5340", "b5341", "b5342", "b5343", "b5344", "b5345", "b5346", "b5347", "b5348", "b5349", "b5350", "b5351", "b5352", "b5353", "b5354", "b5355", "b5356", "b5357", "b5358"]
---

## 10.3.1 Variational distribution

Our first goal is to find an approximation to the posterior distribution $p ( \mathbf { w } , \alpha \vert \mathbf { t } )$ To do this, we employ the variational framework of Section 10.1, with a variational

Figure 10.8 Probabilistic graphical model representing the joint distribution (10.90) for the Bayesian linear regression model.

![image](images/part-003--2ef586d449c7a500759983725786420c8745cfd31f0184c73314f0b62b4a3f97.jpg)

posterior distribution given by the factorized expression

q (\mathbf {w}, \alpha) = q (\mathbf {w}) q (\alpha).\tag{10.91}

We can find re-estimation equations for the factors in this distribution by making use of the general result (10.9). Recall that for each factor, we take the log of the joint distribution over all variables and then average with respect to those variables not in that factor. Consider first the distribution over α. Keeping only terms that have a functional dependence on α, we have

\begin{array}{r l} & {\ln q ^ {\star} (\alpha) = \ln p (\alpha) + \mathbb {E} _ {\mathbf {w}} [ \ln p (\mathbf {w} | \alpha) ] + \mathrm{const}} \\ & {\quad = (a _ {0} - 1) \ln \alpha - b _ {0} \alpha + \frac {M}{2} \ln \alpha - \frac {\alpha}{2} \mathbb {E} [ \mathbf {w} ^ {\mathrm{T}} \mathbf {w} ] + \mathrm{const}.} \end{array}\tag{10.92}

We recognize this as the log of a gamma distribution, and so identifying the coefficients of α and ln α we obtain

q ^ {\star} (\alpha) = \operatorname{Gam} (\alpha | a _ {N}, b _ {N})\tag{10.93}

where

a _ {N} = a _ {0} + \frac {M}{2}\tag{10.94}

{b _ {N}} = {b _ {0} + \frac {1}{2} \mathbb {E} [ \mathbf {w} ^ {\mathrm{T}} \mathbf {w} ].}\tag{10.95}

Similarly, we can find the variational re-estimation equation for the posterior distribution over w. Again, using the general result (10.9), and keeping only those terms that have a functional dependence on w, we have

\ln q ^ {\star} (\mathbf {w}) = \ln p (\mathbf {t} | \mathbf {w}) + \mathbb {E} _ {\alpha} [ \ln p (\mathbf {w} | \alpha) ] + \mathrm{const}\tag{10.96}

{ = } { - \frac { \beta } { 2 } \sum _ { n = 1 } ^ { N } \{ \mathbf { w } ^ { \mathrm{T} } \boldsymbol { \phi } _ { n } - t _ { n } \} ^ { 2 } - \frac { 1 } { 2 } \mathbb { E } [ \alpha ] \mathbf { w } ^ { \mathrm{T} } \mathbf { w } + \mathrm{const} }\tag{10.97}

{ = } { - \frac { 1 } { 2 } \mathbf { w } ^ { \mathrm{T} } \left( \mathbb { E } [ \alpha ] \mathbf { I } + \beta \pmb { \Phi } ^ { \mathrm{T} } \pmb { \Phi } \right) \mathbf { w } + \beta \mathbf { w } ^ { \mathrm{T} } \pmb { \Phi } ^ { \mathrm{T} } \mathbf { t } + \mathrm{const.} }\tag{10.98}

Because this is a quadratic form, the distribution $q ^ { \star } ( \mathbf { w } )$ is Gaussian, and so we can complete the square in the usual way to identify the mean and covariance, giving

q ^ {\star} (\mathbf {w}) = \mathcal {N} (\mathbf {w} | \mathbf {m} _ {N}, \mathbf {S} _ {N})\tag{10.99}

where

{\bf m} _ {N} = \beta {\bf S} _ {N} {\bf \Phi} ^ {\mathrm{T}} {\bf t}\tag{10.100}

\mathbf {S} _ {N} = \left(\mathbb {E} [ \alpha ] \mathbf {I} + \beta \boldsymbol {\Phi} ^ {\mathrm{T}} \boldsymbol {\Phi}\right) ^ {- 1}.\tag{10.101}

Note the close similarity to the posterior distribution (3.52) obtained when α was treated as a fixed parameter. The difference is that here α is replaced by its expectation $\mathbb { E } [ \alpha ]$ under the variational distribution. Indeed, we have chosen to use the same notation for the covariance matrix $\mathbf { S } _ { N }$ in both cases.

Using the standard results (B.27), (B.38), and (B.39), we can obtain the required moments as follows

\mathbb {E} [ \alpha ] = a _ {N} / b _ {N}\tag{10.102}

{\mathbb {E} [ \mathbf {w w} ^ {\mathrm{T}} ]} = {\mathbf {m} _ {N} \mathbf {m} _ {N} ^ {\mathrm{T}} + \mathbf {S} _ {N}.}\tag{10.103}

The evaluation of the variational posterior distribution begins by initializing the parameters of one of the distributions $q ( \mathbf { w } )$ or $q ( \alpha )$ , and then alternately re-estimates these factors in turn until a suitable convergence criterion is satisfied (usually specified in terms of the lower bound to be discussed shortly).

It is instructive to relate the variational solution to that found using the evidence framework in Section 3.5. To do this consider the case $a _ { 0 } = b _ { 0 } = 0$ , corresponding to the limit of an infinitely broad prior over α. The mean of the variational posterior distribution $q ( \alpha )$ is then given by

\mathbb {E} [ \alpha ] = \frac {a _ {N}}{b _ {N}} = \frac {M / 2}{\mathbb {E} [ \mathbf {w} ^ {\mathrm{T}} \mathbf {w} ] / 2} = \frac {M}{\mathbf {m} _ {N} ^ {\mathrm{T}} \mathbf {m} _ {N} + \operatorname{Tr} (\mathbf {S} _ {N})}.\tag{10.104}

Comparison with (9.63) shows that in the case of this particularly simple model, the variational approach gives precisely the same expression as that obtained by maximizing the evidence function using EM except that the point estimate for α is replaced by its expected value. Because the distribution $q ( \mathbf { w } )$ depends on $q ( \alpha )$ only through the expectation $\mathbb { E } [ \alpha ]$ , we see that the two approaches will give identical results for the case of an infinitely broad prior.
