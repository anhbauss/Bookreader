---
id: "tin-hieu-he-thong.5-7-1-posterior-parameter-distribution"
doc_id: "tin-hieu-he-thong"
title: "5.7.1 Posterior parameter distribution"
level: 2
heading_path: ["Neural Networks", "5.7.1 Posterior parameter distribution"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-7-bayesian-neural-networks"
next_id: "tin-hieu-he-thong.5-7-2-hyperparameter-optimization"
block_ids: ["b3159", "b3160", "b3161", "b3162", "b3163", "b3164", "b3165", "b3166", "b3167", "b3168", "b3169", "b3170", "b3171", "b3172", "b3173", "b3174", "b3175", "b3176", "b3177", "b3178", "b3179", "b3180", "b3181", "b3182", "b3183", "b3184", "b3185", "b3186", "b3187", "b3188", "b3189", "b3190"]
---

## 5.7.1 Posterior parameter distribution

Consider the problem of predicting a single continuous target variable t from a vector x of inputs (the extension to multiple targets is straightforward). We shall suppose that the conditional distribution $p ( t | \mathbf { x } )$ is Gaussian, with an x-dependent mean given by the output of a neural network model $y ( \mathbf { x } , \mathbf { w } )$ , and with precision (inverse variance) $\beta$

p (t | \mathbf {x}, \mathbf {w}, \beta) = \mathcal {N} (t | y (\mathbf {x}, \mathbf {w}), \beta^ {- 1}).\tag{5.161}

Similarly, we shall choose a prior distribution over the weights w that is Gaussian of the form

p (\mathbf {w} | \alpha) = \mathcal {N} (\mathbf {w} | \mathbf {0}, \alpha^ {- 1} \mathbf {I}).\tag{5.162}

For an i.i.d. data set of N observations $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ , with a corresponding set of target values $\mathcal { D } = \{ t _ { 1 } , \ldots , t _ { N } \}$ , the likelihood function is given by

p (\mathcal {D} | \mathbf {w}, \beta) = \prod_ {n = 1} ^ {N} \mathcal {N} (t _ {n} | y (\mathbf {x} _ {n}, \mathbf {w}), \beta^ {- 1})\tag{5.163}

and so the resulting posterior distribution is then

p (\mathbf {w} | \mathcal {D}, \alpha , \beta) \propto p (\mathbf {w} | \alpha) p (\mathcal {D} | \mathbf {w}, \beta).\tag{5.164}

which, as a consequence of the nonlinear dependence of $y ( \mathbf { x } , \mathbf { w } )$ on w, will be non-Gaussian.

We can find a Gaussian approximation to the posterior distribution by using the Laplace approximation. To do this, we must first find a (local) maximum of the posterior, and this must be done using iterative numerical optimization. As usual, it is convenient to maximize the logarithm of the posterior, which can be written in the

form

\ln p (\mathbf {w} | \mathcal {D}) = - \frac {\alpha}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w} - \frac {\beta}{2} \sum_ {n = 1} ^ {N} \left\{y (\mathbf {x} _ {n}, \mathbf {w}) - t _ {n} \right\} ^ {2} + \mathrm{const}\tag{5.165}

which corresponds to a regularized sum-of-squares error function. Assuming for the moment that $\alpha$ and $\beta$ are fixed, we can find a maximum of the posterior, which we denote ${ \bf w } _ { \mathrm { M A P } }$ , by standard nonlinear optimization algorithms such as conjugate gradients, using error backpropagation to evaluate the required derivatives.

Having found a mode ${ \bf w } _ { \mathrm { M A P } }$ , we can then build a local Gaussian approximation by evaluating the matrix of second derivatives of the negative log posterior distribution. From (5.165), this is given by

\mathbf {A} = - \nabla \nabla \ln p (\mathbf {w} | \mathcal {D}, \alpha , \beta) = \alpha \mathbf {I} + \beta \mathbf {H}\tag{5.166}

where H is the Hessian matrix comprising the second derivatives of the sum-ofsquares error function with respect to the components of w. Algorithms for computing and approximating the Hessian were discussed in Section 5.4. The corresponding Gaussian approximation to the posterior is then given from (4.134) by

q (\mathbf {w} | \mathcal {D}) = \mathcal {N} (\mathbf {w} | \mathbf {w} _ {\mathrm{MAP}}, \mathbf {A} ^ {- 1}).\tag{5.167}

Similarly, the predictive distribution is obtained by marginalizing with respect to this posterior distribution

p (t | \mathbf {x}, \mathcal {D}) = \int p (t | \mathbf {x}, \mathbf {w}) q (\mathbf {w} | \mathcal {D}) \mathrm{d} \mathbf {w}.\tag{5.168}

However, even with the Gaussian approximation to the posterior, this integration is still analytically intractable due to the nonlinearity of the network function $y ( \mathbf { x } , \mathbf { w } )$ as a function of $\mathbf { w }$ . To make progress, we now assume that the posterior distribution has small variance compared with the characteristic scales of w over which $y ( \mathbf { x } , \mathbf { w } )$ is varying. This allows us to make a Taylor series expansion of the network function around ${ \bf w } _ { \mathrm { M A P } }$ and retain only the linear terms

y (\mathbf {x}, \mathbf {w}) \simeq y (\mathbf {x}, \mathbf {w} _ {\mathrm{MAP}}) + \mathbf {g} ^ {\mathbf {T}} (\mathbf {w} - \mathbf {w} _ {\mathrm{MAP}})\tag{5.169}

where we have defined

\mathbf {g} = \left. \nabla_ {\mathbf {w}} y (\mathbf {x}, \mathbf {w}) \right| _ {\mathbf {w} = \mathbf {w} _ {\mathrm{MAP}}}.\tag{5.170}

With this approximation, we now have a linear-Gaussian model with a Gaussian distribution for $p ( \mathbf { w } )$ and a Gaussian for $p ( t | \mathbf { w } )$ whose mean is a linear function of w of the form

p (t | \mathbf {x}, \mathbf {w}, \beta) \simeq \mathcal {N} \left(t | y (\mathbf {x}, \mathbf {w} _ {\mathrm{MAP}}) + \mathbf {g} ^ {\mathbf {T}} (\mathbf {w} - \mathbf {w} _ {\mathrm{MAP}}), \beta^ {- 1}\right).\tag{5.171}

Exercise 5.38

We can therefore make use of the general result (2.115) for the marginal $p ( t )$ to give

p (t | \mathbf {x}, \mathcal {D}, \alpha , \beta) = \mathcal {N} \left(t | y (\mathbf {x}, \mathbf {w} _ {\mathrm{MAP}}), \sigma^ {2} (\mathbf {x})\right)\tag{5.172}

where the input-dependent variance is given by

\sigma^ {2} (\mathbf {x}) = \beta^ {- 1} + \mathbf {g} ^ {\mathrm{T}} \mathbf {A} ^ {- 1} \mathbf {g}.\tag{5.173}

We see that the predictive distribution $p ( t | \mathbf { x } , \mathcal { D } )$ is a Gaussian whose mean is given by the network function $y ( \mathbf { x } , \mathbf { w } _ { \mathrm { M A P } } )$ with the parameter set to their MAP value. The variance has two terms, the first of which arises from the intrinsic noise on the target variable, whereas the second is an x-dependent term that expresses the uncertainty in the interpolant due to the uncertainty in the model parameters w. This should be compared with the corresponding predictive distribution for the linear regression model, given by (3.58) and (3.59).
