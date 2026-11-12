---
id: "tin-hieu-he-thong.5-7-2-hyperparameter-optimization"
doc_id: "tin-hieu-he-thong"
title: "5.7.2 Hyperparameter optimization"
level: 2
heading_path: ["Neural Networks", "5.7.2 Hyperparameter optimization"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-7-1-posterior-parameter-distribution"
next_id: "tin-hieu-he-thong.5-7-3-bayesian-neural-networks-for-classification"
block_ids: ["b3191", "b3192", "b3193", "b3194", "b3195", "b3196", "b3197", "b3198", "b3199", "b3200", "b3201", "b3202", "b3203", "b3204", "b3205", "b3206", "b3207", "b3208", "b3209", "b3210", "b3211", "b3212", "b3213"]
---

## 5.7.2 Hyperparameter optimization

So far, we have assumed that the hyperparameters α and $\beta$ are fixed and known. We can make use of the evidence framework, discussed in Section 3.5, together with the Gaussian approximation to the posterior obtained using the Laplace approximation, to obtain a practical procedure for choosing the values of such hyperparameters.

The marginal likelihood, or evidence, for the hyperparameters is obtained by integrating over the network weights

p (\mathcal {D} | \alpha , \beta) = \int p (\mathcal {D} | \mathbf {w}, \beta) p (\mathbf {w} | \alpha) \mathrm{d} \mathbf {w}.\tag{5.174}

Exercise 5.39

This is easily evaluated by making use of the Laplace approximation result (4.135). Taking logarithms then gives

\ln p (\mathcal {D} | \alpha , \beta) \simeq - E (\mathbf {w} _ {\mathrm{MAP}}) - \frac {1}{2} \ln | \mathbf {A} | + \frac {W}{2} \ln \alpha + \frac {N}{2} \ln \beta - \frac {N}{2} \ln (2 \pi)\tag{5.175}

where $W$ is the total number of parameters in w, and the regularized error function is defined by

E (\mathbf {w} _ {\mathrm{MAP}}) = \frac {\beta}{2} \sum_ {n = 1} ^ {N} \left\{y (\mathbf {x} _ {n}, \mathbf {w} _ {\mathrm{MAP}}) - t _ {n} \right\} ^ {2} + \frac {\alpha}{2} \mathbf {w} _ {\mathrm{MAP}} ^ {\mathrm{T}} \mathbf {w} _ {\mathrm{MAP}}.\tag{5.176}

We see that this takes the same form as the corresponding result (3.86) for the linear regression model.

In the evidence framework, we make point estimates for α and $\beta$ by maximizing ln $p ( \mathcal { D } | \alpha , \beta )$ . Consider first the maximization with respect to α, which can be done by analogy with the linear regression case discussed in Section 3.5.2. We first define the eigenvalue equation

\beta \mathbf {H} \mathbf {u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}\tag{5.177}

where H is the Hessian matrix comprising the second derivatives of the sum-ofsquares error function, evaluated at $\mathbf { w } = \mathbf { w } _ { \mathrm { M A P } }$ . By analogy with (3.92), we obtain

\alpha = \frac {\gamma}{\mathbf {w} _ {\mathrm{MAP}} ^ {\mathrm{T}} \mathbf {w} _ {\mathrm{MAP}}}\tag{5.178}

Section 3.5.3

where $\gamma$ represents the effective number of parameters and is defined by

\gamma = \sum_ {i = 1} ^ {W} \frac {\lambda_ {i}}{\alpha + \lambda_ {i}}.\tag{5.179}

Note that this result was exact for the linear regression case. For the nonlinear neural network, however, it ignores the fact that changes in $\alpha$ will cause changes in the Hessian H, which in turn will change the eigenvalues. We have therefore implicitly ignored terms involving the derivatives of $\lambda _ { i }$ with respect to $\alpha$

Similarly, from (3.95) we see that maximizing the evidence with respect to $\beta$ gives the re-estimation formula

\frac {1}{\beta} = \frac {1}{N - \gamma} \sum_ {n = 1} ^ {N} \left\{y (\mathbf {x} _ {n}, \mathbf {w} _ {\mathrm{MAP}}) - t _ {n} \right\} ^ {2}.\tag{5.180}

As with the linear model, we need to alternate between re-estimation of the hyperparameters $\alpha$ and $\beta$ and updating of the posterior distribution. The situation with a neural network model is more complex, however, due to the multimodality of the posterior distribution. As a consequence, the solution for ${ \bf w } _ { \mathrm { M A P } }$ found by maximizing the log posterior will depend on the initialization of w. Solutions that differ only as a consequence of the interchange and sign reversal symmetries in the hidden units are identical so far as predictions are concerned, and it is irrelevant which of the equivalent solutions is found. However, there may be inequivalent solutions as well, and these will generally yield different values for the optimized hyperparameters.

In order to compare different models, for example neural networks having different numbers of hidden units, we need to evaluate the model evidence $p ( \mathcal { D } )$ . This can be approximated by taking (5.175) and substituting the values of α and $\beta$ obtained from the iterative optimization of these hyperparameters. A more careful evaluation is obtained by marginalizing over α and $\beta ,$ again by making a Gaussian approximation (MacKay, 1992c; Bishop, 1995a). In either case, it is necessary to evaluate the determinant $| \mathbf { A } |$ of the Hessian matrix. This can be problematic in practice because the determinant, unlike the trace, is sensitive to the small eigenvalues that are often difficult to determine accurately.

The Laplace approximation is based on a local quadratic expansion around a mode of the posterior distribution over weights. We have seen in Section 5.1.1 that any given mode in a two-layer network is a member of a set of $M ! 2 ^ { M }$ equivalent modes that differ by interchange and sign-change symmetries, where M is the number of hidden units. When comparing networks having different numbers of hidden units, this can be taken into account by multiplying the evidence by a factor of $M ! 2 ^ { M }$
