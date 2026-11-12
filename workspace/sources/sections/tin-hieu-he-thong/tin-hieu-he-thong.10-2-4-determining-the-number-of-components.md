---
id: "tin-hieu-he-thong.10-2-4-determining-the-number-of-components"
doc_id: "tin-hieu-he-thong"
title: "10.2.4 Determining the number of components"
level: 2
heading_path: ["Approximate Inference", "10.2.4 Determining the number of components"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-2-3-predictive-density"
next_id: "tin-hieu-he-thong.10-2-5-induced-factorizations"
block_ids: ["b5298", "b5299", "b5300", "b5301", "b5302", "b5303", "b5304", "b5305", "b5306", "b5307"]
---

## 10.2.4 Determining the number of components

We have seen that the variational lower bound can be used to determine a posterior distribution over the number K of components in the mixture model. There is, however, one subtlety that needs to be addressed. For any given setting of the parameters in a Gaussian mixture model (except for specific degenerate settings), there will exist other parameter settings for which the density over the observed variables will be identical. These parameter values differ only through a re-labelling of the components. For instance, consider a mixture of two Gaussians and a single observed variable x, in which the parameters have the values $\pi _ { 1 } = a , \pi _ { 2 } = b , \mu _ { 1 } = c .$ $\mu _ { 2 } = d , \sigma _ { 1 } = e , \sigma _ { 2 } = f$ . Then the parameter values $\pi _ { 1 } = b , \pi _ { 2 } = a , \mu _ { 1 } = d .$ $\mu _ { 2 } = c , \sigma _ { 1 } = f , \sigma _ { 2 } = e .$ , in which the two components have been exchanged, will by symmetry give rise to the same value of $p ( x )$ . If we have a mixture model comprising K components, then each parameter setting will be a member of a family of K! equivalent settings.

In the context of maximum likelihood, this redundancy is irrelevant because the parameter optimization algorithm (for example EM) will, depending on the initialization of the parameters, find one specific solution, and the other equivalent solutions play no role. In a Bayesian setting, however, we marginalize over all possible

Plot of the variational lower bound versus the number K of components in the Gaussian mixture model, for the Old Faithful data, showing a distinct peak at $K =$ 2 components. For each value of $K$ , the model is trained from 100 different random starts, and the results shown as $" + "$ symbols plotted with small random horizontal perturbations so that they can be distinguished. Note that some solutions find suboptimal local maxima, but that this happens infrequently.

![image](images/part-003--ea8189a03580e064e36d9035e4df2fbe6ae270e7a4ff175d5bb742f45ced6356.jpg)

parameter values. We have seen in Figure 10.2 that if the true posterior distribution is multimodal, variational inference based on the minimization of KL $( q \| p )$ will tend to approximate the distribution in the neighbourhood of one of the modes and ignore the others. Again, because equivalent modes have equivalent predictive densities, this is of no concern provided we are considering a model having a specific number K of components. If, however, we wish to compare different values of K, then we need to take account of this multimodality. A simple approximate solution is to add a term ln K! onto the lower bound when used for model comparison and averaging.

Figure 10.7 shows a plot of the lower bound, including the multimodality factor, versus the number K of components for the Old Faithful data set. It is worth emphasizing once again that maximum likelihood would lead to values of the likelihood function that increase monotonically with K (assuming the singular solutions have been avoided, and discounting the effects of local maxima) and so cannot be used to determine an appropriate model complexity. By contrast, Bayesian inference automatically makes the trade-off between model complexity and fitting the data.

This approach to the determination of K requires that a range of models having different K values be trained and compared. An alternative approach to determining a suitable value for K is to treat the mixing coefficients π as parameters and make point estimates of their values by maximizing the lower bound (Corduneanu and Bishop, 2001) with respect to $\pi$ instead of maintaining a probability distribution over them as in the fully Bayesian approach. This leads to the re-estimation equation

\pi_ {k} = \frac {1}{N} \sum_ {n = 1} ^ {N} r _ {n k}\tag{10.83}

and this maximization is interleaved with the variational updates for the $q$ distribution over the remaining parameters. Components that provide insufficient contribution to explaining the data will have their mixing coefficients driven to zero during the optimization, and so they are effectively removed from the model through automatic relevance determination. This allows us to make a single training run in which we start with a relatively large initial value of K, and allow surplus components to be pruned out of the model. The origins of the sparsity when optimizing with respect to hyperparameters is discussed in detail in the context of the relevance vector machine.
