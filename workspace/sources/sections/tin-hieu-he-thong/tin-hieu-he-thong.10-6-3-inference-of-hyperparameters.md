---
id: "tin-hieu-he-thong.10-6-3-inference-of-hyperparameters"
doc_id: "tin-hieu-he-thong"
title: "10.6.3 Inference of hyperparameters"
level: 2
heading_path: ["Approximate Inference", "10.6.3 Inference of hyperparameters"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-6-2-optimizing-the-variational-parameters"
next_id: "tin-hieu-he-thong.10-7-expectation-propagation"
block_ids: ["b5528", "b5529", "b5530", "b5531", "b5532", "b5533", "b5534", "b5535", "b5536", "b5537", "b5538", "b5539", "b5540", "b5541", "b5542", "b5543", "b5544", "b5545", "b5546", "b5547", "b5548", "b5549", "b5550", "b5551", "b5552", "b5553", "b5554", "b5555", "b5556", "b5557", "b5558", "b5559", "b5560", "b5561", "b5562", "b5563", "b5564", "b5565", "b5566", "b5567", "b5568", "b5569", "b5570", "b5571", "b5572", "b5573", "b5574"]
---

## 10.6.3 Inference of hyperparameters

So far, we have treated the hyperparameter α in the prior distribution as a known constant. We now extend the Bayesian logistic regression model to allow the value of this parameter to be inferred from the data set. This can be achieved by combining the global and local variational approximations into a single framework, so as to maintain a lower bound on the marginal likelihood at each stage. Such a combined approach was adopted by Bishop and Svensen (2003) in the context of a Bayesian ´ treatment of the hierarchical mixture of experts model.

Specifically, we consider once again a simple isotropic Gaussian prior distribution of the form

p (\mathbf {w} | \alpha) = \mathcal {N} (\mathbf {w} | \mathbf {0}, \alpha^ {- 1} \mathbf {I}).\tag{10.165}

Our analysis is readily extended to more general Gaussian priors, for instance if we wish to associate a different hyperparameter with different subsets of the parameters $w _ { j }$ . As usual, we consider a conjugate hyperprior over α given by a gamma distribution

p (\alpha) = \operatorname{Gam} (\alpha | a _ {0}, b _ {0})\tag{10.166}

governed by the constants $a _ { 0 }$ and $b _ { 0 }$ .

The marginal likelihood for this model now takes the form

p (\mathbf {t}) = \iint p (\mathbf {w}, \alpha , \mathbf {t}) d \mathbf {w} d \alpha\tag{10.167}

where the joint distribution is given by

p (\mathbf {w}, \alpha , \mathbf {t}) = p (\mathbf {t} | \mathbf {w}) p (\mathbf {w} | \alpha) p (\alpha).\tag{10.168}

We are now faced with an analytically intractable integration over w and $\alpha ,$ which we shall tackle by using both the local and global variational approaches in the same model

To begin with, we introduce a variational distribution $q ( \mathbf { w } , \alpha )$ , and then apply the decomposition (10.2), which in this instance takes the form

\ln p (\mathbf {t}) = \mathcal {L} (q) + \mathrm{KL} (q \| p)\tag{10.169}

where the lower bound $\mathcal { L } ( q )$ and the Kullback-Leibler divergence $\mathrm { K L } ( q \| p )$ are defined by

\mathcal {L} (q) = \iint q (\mathbf {w}, \alpha) \ln \left\{\frac {p (\mathbf {w} , \alpha , \mathbf {t})}{q (\mathbf {w} , \alpha)} \right\} d \mathbf {w} d \alpha\tag{10.170}

\mathrm{KL} (q \| p) = - \iint q (\mathbf {w}, \alpha) \ln \left\{\frac {p (\mathbf {w} , \alpha | \mathbf {t}))}{q (\mathbf {w} , \alpha)} \right\} \mathrm{d} \mathbf {w} \mathrm{d} \alpha .\tag{10.171}

At this point, the lower bound $\mathcal { L } ( q )$ is still intractable due to the form of the likelihood factor $p ( \mathbf { t } | \mathbf { w } )$ . We therefore apply the local variational bound to each of the logistic sigmoid factors as before. This allows us to use the inequality (10.152) and place a lower bound on $\mathcal { L } ( q )$ , which will therefore also be a lower bound on the log marginal likelihood

\begin{array}{r c l} \ln p (\mathbf {t}) & \geqslant & \mathcal {L} (q) \geqslant \widetilde {\mathcal {L}} (q, \boldsymbol {\xi}) \\ & = & \iint q (\mathbf {w}, \alpha) \ln \left\{\frac {h (\mathbf {w} , \boldsymbol {\xi}) p (\mathbf {w} | \alpha) p (\alpha)}{q (\mathbf {w} , \alpha)} \right\} \mathrm{d} \mathbf {w}   \mathrm{d} \alpha . \end{array}\tag{10.172}

Next we assume that the variational distribution factorizes between parameters and hyperparameters so that

q (\mathbf {w}, \alpha) = q (\mathbf {w}) q (\alpha).\tag{10.173}

With this factorization we can appeal to the general result (10.9) to find expressions for the optimal factors. Consider first the distribution $q ( \mathbf { w } )$ . Discarding terms that are independent of w, we have

\begin{array}{r c l} \ln q (\mathbf {w}) & = & \mathbb {E} _ {\alpha} \left[ \ln \left\{h (\mathbf {w}, \pmb {\xi}) p (\mathbf {w} | \alpha) p (\alpha) \right\} \right] + \mathrm{const} \\ & = & \ln h (\mathbf {w}, \pmb {\xi}) + \mathbb {E} _ {\alpha} \left[ \ln p (\mathbf {w} | \alpha) \right] + \mathrm{const}. \end{array}

We now substitute for ln $h ( \mathbf { w } , \pmb { \xi } )$ using (10.153), and for ln $p ( \mathbf { w } | \alpha )$ using (10.165), giving

\ln q (\mathbf {w}) = - \frac {\mathbb {E} [ \alpha ]}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w} + \sum_ {n = 1} ^ {N} \left\{(t _ {n} - 1 / 2) \mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n} - \lambda (\xi_ {n}) \mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n} \boldsymbol {\phi} _ {n} ^ {\mathrm{T}} \mathbf {w} \right\} + \mathrm{const.}

We see that this is a quadratic function of w and so the solution for $q ( \mathbf { w } )$ will be Gaussian. Completing the square in the usual way, we obtain

q (\mathbf {w}) = \mathcal {N} (\mathbf {w} | \boldsymbol {\mu} _ {N}, \boldsymbol {\Sigma} _ {N})\tag{10.174}

where we have defined

\boldsymbol {\Sigma} _ {N} ^ {- 1} \boldsymbol {\mu} _ {N} = \sum_ {n = 1} ^ {N} (t _ {n} - 1 / 2) \phi_ {n}\tag{10.175}

\boldsymbol {\Sigma} _ {N} ^ {- 1} = \mathbb {E} [ \alpha ] \mathbf {I} + 2 \sum_ {n = 1} ^ {N} \lambda (\xi_ {n}) \boldsymbol {\phi} _ {n} \boldsymbol {\phi} _ {n} ^ {\mathrm{T}}.\tag{10.176}

Similarly, the optimal solution for the factor $q ( \alpha )$ is obtained from

\ln q (\alpha) = \mathbb {E} _ {\mathbf {w}} \left[ \ln p (\mathbf {w} | \alpha) \right] + \ln p (\alpha) + \mathrm{const.}

Substituting for ln $p ( \mathbf { w } | \alpha )$ using (10.165), and for ln $p ( \alpha )$ using (10.166), we obtain

\ln q (\alpha) = \frac {M}{2} \ln \alpha - \frac {\alpha}{2} \mathbb {E} \left[ \mathbf {w} ^ {\mathrm{T}} \mathbf {w} \right] + (a _ {0} - 1) \ln \alpha - b _ {0} \alpha + \mathrm{const}.

We recognize this as the log of a gamma distribution, and so we obtain

q (\alpha) = \operatorname{Gam} (\alpha | a _ {N}, b _ {N}) = \frac {1}{\Gamma (a _ {0})} a _ {0} ^ {b _ {0}} \alpha^ {a _ {0} - 1} e ^ {- b _ {0} \alpha}\tag{10.177}

where

a _ {N} = a _ {0} + \frac {M}{2}\tag{10.178}

{b _ {N}} = {b _ {0} + \frac {1}{2} \mathbb {E} _ {\mathbf {w}} \left[ \mathbf {w} ^ {\mathrm{T}} \mathbf {w} \right].}\tag{10.179}

We also need to optimize the variational parameters $\xi _ { n }$ , and this is also done by maximizing the lower bound $\widetilde { \mathcal { L } } ( q , \xi )$ . Omitting terms that are independent of $\xi ,$ and integrating over α, we have

\widetilde {\mathcal {L}} (q, \pmb {\xi}) = \int q (\mathbf {w}) \ln h (\mathbf {w}, \pmb {\xi}) \mathrm{d} \mathbf {w} + \mathrm{const}.\tag{10.180}

Note that this has precisely the same form as (10.159), and so we can again appeal to our earlier result (10.163), which can be obtained by direct optimization of the marginal likelihood function, leading to re-estimation equations of the form

(\xi_ {n} ^ {\mathrm{new}}) ^ {2} = \phi_ {n} ^ {\mathrm{T}} (\pmb {\Sigma} _ {N} + \pmb {\mu} _ {N} \pmb {\mu} _ {N} ^ {\mathrm{T}}) \phi_ {n}.\tag{10.181}

We have obtained re-estimation equations for the three quantities $q ( \mathbf { w } ) , q ( \alpha )$ and $\xi ,$ , and so after making suitable initializations, we can cycle through these quantities, updating each in turn. The required moments are given by

Appendix B

\mathbb {E} [ \alpha ] = \frac {a _ {N}}{b _ {N}}\tag{10.182}

{\mathbb {E} \left[ \mathbf {w} ^ {\mathrm{T}} \mathbf {w} \right]} = {\boldsymbol {\Sigma} _ {N} + \boldsymbol {\mu} _ {N} ^ {\mathrm{T}} \boldsymbol {\mu} _ {N}.}\tag{10.183}
