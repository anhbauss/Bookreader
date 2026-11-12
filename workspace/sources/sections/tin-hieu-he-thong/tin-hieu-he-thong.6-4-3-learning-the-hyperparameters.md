---
id: "tin-hieu-he-thong.6-4-3-learning-the-hyperparameters"
doc_id: "tin-hieu-he-thong"
title: "6.4.3 Learning the hyperparameters"
level: 2
heading_path: ["Kernel Methods", "6.4.3 Learning the hyperparameters"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.6-4-2-gaussian-processes-for-regression"
next_id: "tin-hieu-he-thong.6-4-4-automatic-relevance-determination"
block_ids: ["b3554", "b3555", "b3556", "b3557", "b3558", "b3559", "b3560", "b3561", "b3562", "b3563", "b3564", "b3565", "b3566"]
---

## 6.4.3 Learning the hyperparameters

The predictions of a Gaussian process model will depend, in part, on the choice of covariance function. In practice, rather than fixing the covariance function, we may prefer to use a parametric family of functions and then infer the parameter values from the data. These parameters govern such things as the length scale of the correlations and the precision of the noise and correspond to the hyperparameters in a standard parametric model.

Techniques for learning the hyperparameters are based on the evaluation of the likelihood function $p ( \mathbf { t } | \boldsymbol { \theta } )$ where $\pmb \theta$ denotes the hyperparameters of the Gaussian process model. The simplest approach is to make a point estimate of $\pmb \theta$ by maximizing the log likelihood function. Because $\pmb \theta$ represents a set of hyperparameters for the regression problem, this can be viewed as analogous to the type 2 maximum likelihood procedure for linear regression models. Maximization of the log likelihood can be done using efficient gradient-based optimization algorithms such as conjugate gradients (Fletcher, 1987; Nocedal and Wright, 1999; Bishop and Nabney, 2008).

The log likelihood function for a Gaussian process regression model is easily evaluated using the standard form for a multivariate Gaussian distribution, giving

\ln p (\mathbf {t} | \boldsymbol {\theta}) = - \frac {1}{2} \ln | \mathbf {C} _ {N} | - \frac {1}{2} \mathbf {t} ^ {\mathrm{T}} \mathbf {C} _ {N} ^ {- 1} \mathbf {t} - \frac {N}{2} \ln (2 \pi).\tag{6.69}

For nonlinear optimization, we also need the gradient of the log likelihood function with respect to the parameter vector $\theta .$ We shall assume that evaluation of the derivatives of ${ \bf C } _ { N }$ is straightforward, as would be the case for the covariance functions considered in this chapter. Making use of the result (C.21) for the derivative of ${ \bf C } _ { N } ^ { - 1 }$ , together with the result (C.22) for the derivative of ln $| { \bf C } _ { N } |$ , we obtain

\frac {\partial}{\partial \theta_ {i}} \ln p (\mathbf {t} | \boldsymbol {\theta}) = - \frac {1}{2} \operatorname{Tr} \left(\mathbf {C} _ {N} ^ {- 1} \frac {\partial \mathbf {C} _ {N}}{\partial \theta_ {i}}\right) + \frac {1}{2} \mathbf {t} ^ {\mathrm{T}} \mathbf {C} _ {N} ^ {- 1} \frac {\partial \mathbf {C} _ {N}}{\partial \theta_ {i}} \mathbf {C} _ {N} ^ {- 1} \mathbf {t}.\tag{6.70}

Because ln $p ( \mathbf { t } | \mathbf { \boldsymbol { \theta } } )$ will in general be a nonconvex function, it can have multiple maxima.

It is straightforward to introduce a prior over $\pmb \theta$ and to maximize the log posterior using gradient-based methods. In a fully Bayesian treatment, we need to evaluate marginals over $\pmb \theta$ weighted by the product of the prior $p ( \pmb \theta )$ and the likelihood function $p ( \mathbf { t } | \boldsymbol { \theta } )$ ). In general, however, exact marginalization will be intractable, and we must resort to approximations.

The Gaussian process regression model gives a predictive distribution whose mean and variance are functions of the input vector x. However, we have assumed that the contribution to the predictive variance arising from the additive noise, governed by the parameter $\beta ,$ is a constant. For some problems, known as heteroscedastic, the noise variance itself will also depend on x. To model this, we can extend the

Figure 6.9 Samples from the ARD prior for Gaussian processes, in which the kernel function is given by (6.71). The left plot corresponds to $\eta _ { 1 } = \eta _ { 2 } = 1$ , and the right plot corresponds to $\eta _ { 1 } = 1$ $\eta _ { 2 } = 0 . 0 1$

![image](images/part-002--3c2127f0bca1ddaa6f42205b02c073cc0cec63ce760b06289e648bd1d085012a.jpg)

Gaussian process framework by introducing a second Gaussian process to represent the dependence of $\beta$ on the input x (Goldberg et al., 1998). Because $\beta$ is a variance, and hence nonnegative, we use the Gaussian process to model ln $\beta ( \mathbf { x } )$
