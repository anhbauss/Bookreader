---
id: "tin-hieu-he-thong.10-2-2-variational-lower-bound"
doc_id: "tin-hieu-he-thong"
title: "10.2.2 Variational lower bound"
level: 2
heading_path: ["Approximate Inference", "10.2.2 Variational lower bound"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-2-1-variational-distribution"
next_id: "tin-hieu-he-thong.10-2-3-predictive-density"
block_ids: ["b5272", "b5273", "b5274", "b5275", "b5276", "b5277", "b5278", "b5279", "b5280", "b5281", "b5282", "b5283", "b5284", "b5285"]
---

## 10.2.2 Variational lower bound

We can also straightforwardly evaluate the lower bound (10.3) for this model. In practice, it is useful to be able to monitor the bound during the re-estimation in order to test for convergence. It can also provide a valuable check on both the mathematical expressions for the solutions and their software implementation, because at each step of the iterative re-estimation procedure the value of this bound should not decrease. We can take this a stage further to provide a deeper test of the correctness of both the mathematical derivation of the update equations and of their software implementation by using finite differences to check that each update does indeed give a (constrained) maximum of the bound (Svensen and Bishop, 2004). ´

For the variational mixture of Gaussians, the lower bound (10.3) is given by

\begin{array}{r c l} \mathcal {L} & = & \sum_ {\mathbf {Z}} \iiint q (\mathbf {Z}, \boldsymbol {\pi}, \boldsymbol {\mu}, \boldsymbol {\Lambda}) \ln \left\{\frac {p (\mathbf {X} , \mathbf {Z} , \boldsymbol {\pi} , \boldsymbol {\mu} , \boldsymbol {\Lambda})}{q (\mathbf {Z} , \boldsymbol {\pi} , \boldsymbol {\mu} , \boldsymbol {\Lambda})} \right\} \mathrm{d} \boldsymbol {\pi} \mathrm{d} \boldsymbol {\mu} \mathrm{d} \boldsymbol {\Lambda} \\ & = & \mathbb {E} [ \ln p (\mathbf {X}, \mathbf {Z}, \boldsymbol {\pi}, \boldsymbol {\mu}, \boldsymbol {\Lambda}) ] - \mathbb {E} [ \ln q (\mathbf {Z}, \boldsymbol {\pi}, \boldsymbol {\mu}, \boldsymbol {\Lambda}) ] \\ & = & \mathbb {E} [ \ln p (\mathbf {X} | \mathbf {Z}, \boldsymbol {\mu}, \boldsymbol {\Lambda}) ] + \mathbb {E} [ \ln p (\mathbf {Z} | \boldsymbol {\pi}) ] + \mathbb {E} [ \ln p (\boldsymbol {\pi}) ] + \mathbb {E} [ \ln p (\boldsymbol {\mu}, \boldsymbol {\Lambda}) ] \\ & & - \mathbb {E} [ \ln q (\mathbf {Z}) ] - \mathbb {E} [ \ln q (\boldsymbol {\pi}) ] - \mathbb {E} [ \ln q (\boldsymbol {\mu}, \boldsymbol {\Lambda}) ] \end{array} \tag {10}\tag{10.70}

where, to keep the notation uncluttered, we have omitted the  superscript on the $q$ distributions, along with the subscripts on the expectation operators because each expectation is taken with respect to all of the random variables in its argument. The various terms in the bound are easily evaluated to give the following results

\begin{array}{c} \mathbb {E} [ \ln p (\mathbf {X} | \mathbf {Z}, \boldsymbol {\mu}, \boldsymbol {\Lambda}) ] = \frac {1}{2} \sum_ {k = 1} ^ {K} N _ {k} \left\{\ln \widetilde {\Lambda} _ {k} - D \beta_ {k} ^ {- 1} - \nu_ {k} \mathrm{Tr} (\mathbf {S} _ {k} \mathbf {W} _ {k}) \right. \\ \left. - \nu_ {k} (\overline {{\mathbf {x}}} _ {k} - \mathbf {m} _ {k}) ^ {\mathrm{T}} \mathbf {W} _ {k} (\overline {{\mathbf {x}}} _ {k} - \mathbf {m} _ {k}) - D \ln (2 \pi) \right\} \end{array}\tag{10.71}

\mathbb {E} [ \ln p (\mathbf {Z} | \boldsymbol {\pi}) ] = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} r _ {n k} \ln \widetilde {\pi} _ {k}\tag{10.72}

\mathbb {E} [ \ln p (\boldsymbol {\pi}) ] = \ln C (\boldsymbol {\alpha} _ {0}) + (\alpha_ {0} - 1) \sum_ {k = 1} ^ {K} \ln \widetilde {\pi} _ {k}\tag{10.73}

\begin{array}{l} \mathbb {E} [ \ln p (\boldsymbol {\mu}, \boldsymbol {\Lambda}) ] = \frac {1}{2} \sum_ {k = 1} ^ {K} \Bigg \{D \ln (\beta_ {0} / 2 \pi) + \ln \widetilde {\Lambda} _ {k} - \frac {D \beta_ {0}}{\beta_ {k}} \\ \qquad - \beta_ {0} \nu_ {k} (\mathbf {m} _ {k} - \mathbf {m} _ {0}) ^ {\mathrm{T}} \mathbf {W} _ {k} (\mathbf {m} _ {k} - \mathbf {m} _ {0}) \Bigg \} + K \ln B (\mathbf {W} _ {0}, \nu_ {0}) \\ \qquad + \frac {(\nu_ {0} - D - 1)}{2} \sum_ {k = 1} ^ {K} \ln \widetilde {\Lambda} _ {k} - \frac {1}{2} \sum_ {k = 1} ^ {K} \nu_ {k} \operatorname{Tr} (\mathbf {W} _ {0} ^ {- 1} \mathbf {W} _ {k}) \end{array}\tag{10.74}

\mathbb {E} [ \ln q (\mathbf {Z}) ] = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} r _ {n k} \ln r _ {n k}\tag{10.75}

\mathbb {E} [ \ln q (\boldsymbol {\pi}) ] = \sum_ {k = 1} ^ {K} \left(\alpha_ {k} - 1\right) \ln \widetilde {\pi} _ {k} + \ln C (\boldsymbol {\alpha})\tag{10.76}

\mathbb {E} [ \ln q (\pmb {\mu}, \pmb {\Lambda}) ] = \sum_ {k = 1} ^ {K} \left\{\frac {1}{2} \ln \widetilde {\Lambda} _ {k} + \frac {D}{2} \ln \left(\frac {\beta_ {k}}{2 \pi}\right) - \frac {D}{2} - \mathrm{H} [ q (\pmb {\Lambda} _ {k}) ] \right\}\tag{10.77}

where $D$ is the dimensionality of $\mathbf { x } , \mathrm { H } [ q ( \pmb { \Lambda } _ { k } ) ]$ is the entropy of the Wishart distribution given by (B.82), and the coefficients $C ( \alpha )$ and $B ( { \mathbf W } , \nu )$ are defined by (B.23) and (B.79), respectively. Note that the terms involving expectations of the logs of the $q$ distributions simply represent the negative entropies of those distributions. Some simplifications and combination of terms can be performed when these expressions are summed to give the lower bound. However, we have kept the expressions separate for ease of understanding.

Finally, it is worth noting that the lower bound provides an alternative approach for deriving the variational re-estimation equations obtained in Section 10.2.1. To do this we use the fact that, since the model has conjugate priors, the functional form of the factors in the variational posterior distribution is known, namely discrete for $\mathbf { Z } ,$ Dirichlet for $\pi ,$ , and Gaussian-Wishart for $( \mu _ { k } , \Lambda _ { k } )$ . By taking general parametric forms for these distributions we can derive the form of the lower bound as a function of the parameters of the distributions. Maximizing the bound with respect to these parameters then gives the required re-estimation equations.
