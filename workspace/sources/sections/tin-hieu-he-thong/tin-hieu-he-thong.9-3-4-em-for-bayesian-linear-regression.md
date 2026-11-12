---
id: "tin-hieu-he-thong.9-3-4-em-for-bayesian-linear-regression"
doc_id: "tin-hieu-he-thong"
title: "9.3.4 EM for Bayesian linear regression"
level: 2
heading_path: ["Mixture Models and EM", "9.3.4 EM for Bayesian linear regression"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.9-3-3-mixtures-of-bernoulli-distributions"
next_id: "tin-hieu-he-thong.9-4-the-em-algorithm-in-general"
block_ids: ["b4937", "b4938", "b4939", "b4940", "b4941", "b4942", "b4943", "b4944", "b4945", "b4946", "b4947", "b4948", "b4949", "b4950", "b4951", "b4952", "b4953", "b4954", "b4955", "b4956", "b4957"]
---

## 9.3.4 EM for Bayesian linear regression

As a third example of the application of EM, we return to the evidence approximation for Bayesian linear regression. In Section 3.5.2, we obtained the reestimation equations for the hyperparameters α and $\beta$ by evaluation of the evidence and then setting the derivatives of the resulting expression to zero. We now turn to an alternative approach for finding α and $\beta$ based on the EM algorithm. Recall that our goal is to maximize the evidence function $p ( \mathbf { t } | \alpha , \beta )$ given by (3.77) with respect to α and $\beta .$ Because the parameter vector w is marginalized out, we can regard it as a latent variable, and hence we can optimize this marginal likelihood function using EM. In the E step, we compute the posterior distribution of w given the current setting of the parameters α and $\beta$ and then use this to find the expected complete-data log likelihood. In the M step, we maximize this quantity with respect to α and β. We have already derived the posterior distribution of w because this is given by (3.49). The complete-data log likelihood function is then given by

\ln p (\mathbf {t}, \mathbf {w} | \alpha , \beta) = \ln p (\mathbf {t} | \mathbf {w}, \beta) + \ln p (\mathbf {w} | \alpha)\tag{9.61}

where the likelihood $p ( \mathbf { t } | \mathbf { w } , \beta )$ and the prior $p ( \mathbf { w } | \alpha )$ are given by (3.10) and (3.52), respectively, and $y ( \mathbf { x } , \mathbf { w } )$ is given by (3.3). Taking the expectation with respect to the posterior distribution of w then gives

\begin{array}{r c l} \mathbb {E} \left[ \ln p (\mathbf {t}, \mathbf {w} | \alpha , \beta) \right] & = & \frac {M}{2} \ln \left(\frac {\alpha}{2 \pi}\right) - \frac {\alpha}{2} \mathbb {E} \left[ \mathbf {w} ^ {\mathrm{T}} \mathbf {w} \right] + \frac {N}{2} \ln \left(\frac {\beta}{2 \pi}\right) \\ & & - \frac {\beta}{2} \sum_ {n = 1} ^ {N} \mathbb {E} \left[ (t _ {n} - \mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n}) ^ {2} \right]. \end{array}\tag{9.62}

Setting the derivatives with respect to α to zero, we obtain the M step re-estimation equation

\alpha = \frac {M}{\mathbb {E} \left[ \mathbf {w} ^ {\mathrm{T}} \mathbf {w} \right]} = \frac {M}{\mathbf {m} _ {N} ^ {\mathrm{T}} \mathbf {m} _ {N} + \operatorname{Tr} (\mathbf {S} _ {N})}.\tag{9.63}

An analogous result holds for $\beta .$

Note that this re-estimation equation takes a slightly different form from the corresponding result (3.92) derived by direct evaluation of the evidence function. However, they each involve computation and inversion (or eigen decomposition) of an $M \times M$ matrix and hence will have comparable computational cost per iteration.

These two approaches to determining $\alpha$ should of course converge to the same result (assuming they find the same local maximum of the evidence function). This can be verified by first noting that the quantity $\gamma$ is defined by

\gamma = M - \alpha \sum_ {i = 1} ^ {M} \frac {1}{\lambda_ {i} + \alpha} = M - \alpha \operatorname{Tr} (\mathbf {S} _ {N}).\tag{9.64}

At a stationary point of the evidence function, the re-estimation equation (3.92) will be self-consistently satisfied, and hence we can substitute for $\gamma$ to give

\alpha \mathbf {m} _ {N} ^ {\mathrm{T}} \mathbf {m} _ {N} = \gamma = M - \alpha \mathrm{Tr} (\mathbf {S} _ {N})\tag{9.65}

and solving for α we obtain (9.63), which is precisely the EM re-estimation equation.

As a final example, we consider a closely related model, namely the relevance vector machine for regression discussed in Section 7.2.1. There we used direct maximization of the marginal likelihood to derive re-estimation equations for the hyperparameters α and $\beta$ . Here we consider an alternative approach in which we view the weight vector w as a latent variable and apply the EM algorithm. The E step involves finding the posterior distribution over the weights, and this is given by (7.81). In the M step we maximize the expected complete-data log likelihood, which is defined by

\mathbb {E} _ {\mathbf {w}} \left[ \ln p (\mathbf {t} | \mathbf {X}, \mathbf {w}, \beta) p (\mathbf {w} | \boldsymbol {\alpha}) \right]\tag{9.66}

where the expectation is taken with respect to the posterior distribution computed using the ‘old’ parameter values. To compute the new parameter values we maximize with respect to α and $\beta$ to give

\alpha_ {i} ^ {\mathrm{new}} = \frac {1}{m _ {i} ^ {2} + \Sigma_ {i i}}\tag{9.67}

(\beta^ {\mathrm{new}}) ^ {- 1} = \frac {\| \mathbf {t} - \boldsymbol {\Phi} \mathbf {m} _ {N} \| ^ {2} + \beta^ {- 1} \sum_ {i} \gamma_ {i}}{N}\tag{9.68}

Exercise 9.23

These re-estimation equations are formally equivalent to those obtained by direct maxmization.
