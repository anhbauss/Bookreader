---
id: "tin-hieu-he-thong.10-3-variational-linear-regression"
doc_id: "tin-hieu-he-thong"
title: "10.3. Variational Linear Regression"
level: 2
heading_path: ["Approximate Inference", "10.3. Variational Linear Regression"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-2-5-induced-factorizations"
next_id: "tin-hieu-he-thong.10-3-1-variational-distribution"
block_ids: ["b5319", "b5320", "b5321", "b5322", "b5323", "b5324", "b5325", "b5326", "b5327", "b5328"]
---

## 10.3. Variational Linear Regression

As a second illustration of variational inference, we return to the Bayesian linear regression model of Section 3.3. In the evidence framework, we approximated the integration over $\alpha$ and $\beta$ by making point estimates obtained by maximizing the log marginal likelihood. A fully Bayesian approach would integrate over the hyperparameters as well as over the parameters. Although exact integration is intractable, we can use variational methods to find a tractable approximation. In order to simplify the discussion, we shall suppose that the noise precision parameter $\beta$ is known, and is fixed to its true value, although the framework is easily extended to include the distribution over $\beta .$ For the linear regression model, the variational treatment will turn out to be equivalent to the evidence framework. Nevertheless, it provides a good exercise in the use of variational methods and will also lay the foundation for variational treatment of Bayesian logistic regression in Section 10.6.

Recall that the likelihood function for w, and the prior over w, are given by

p (\mathbf {t} | \mathbf {w}) = \prod_ {n = 1} ^ {N} \mathcal {N} (t _ {n} | \mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n}, \beta^ {- 1})\tag{10.87}

{p (\mathbf {w} | \alpha)} = {\mathcal {N} (\mathbf {w} | \mathbf {0}, \alpha^ {- 1} \mathbf {I})}\tag{10.88}

where $\phi _ { n } = \phi ( \mathbf { x } _ { n } )$ . We now introduce a prior distribution over α. From our discussion in Section 2.3.6, we know that the conjugate prior for the precision of a Gaussian is given by a gamma distribution, and so we choose

p (\alpha) = \operatorname{Gam} (\alpha | a _ {0}, b _ {0})\tag{10.89}

where $\mathrm { G a m } ( \cdot | \cdot , \cdot )$ is defined by (B.26). Thus the joint distribution of all the variables is given by

p (\mathbf {t}, \mathbf {w}, \alpha) = p (\mathbf {t} | \mathbf {w}) p (\mathbf {w} | \alpha) p (\alpha).\tag{10.90}

This can be represented as a directed graphical model as shown in Figure 10.8.
