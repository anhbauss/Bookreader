---
id: "tin-hieu-he-thong.6-4-6-laplace-approximation"
doc_id: "tin-hieu-he-thong"
title: "6.4.6 Laplace approximation"
level: 2
heading_path: ["Kernel Methods", "6.4.6 Laplace approximation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.6-4-5-gaussian-processes-for-classification"
next_id: "tin-hieu-he-thong.6-4-7-connection-to-neural-networks"
block_ids: ["b3598", "b3599", "b3600", "b3601", "b3602", "b3603", "b3604", "b3605", "b3606", "b3607", "b3608", "b3609", "b3610", "b3611", "b3612", "b3613", "b3614", "b3615", "b3616", "b3617", "b3618", "b3619", "b3620", "b3621", "b3622", "b3623", "b3624", "b3625", "b3626", "b3627", "b3628", "b3629", "b3630", "b3631", "b3632", "b3633", "b3634", "b3635", "b3636", "b3637", "b3638", "b3639", "b3640", "b3641", "b3642"]
---

## 6.4.6 Laplace approximation

The third approach to Gaussian process classification is based on the Laplace approximation, which we now consider in detail. In order to evaluate the predictive distribution (6.76), we seek a Gaussian approximation to the posterior distribution over $a _ { N + 1 }$ , which, using Bayes’ theorem, is given by

\begin{array}{l l l} p (a _ {N + 1} | \mathbf {t} _ {N}) & = & \int p (a _ {N + 1}, \mathbf {a} _ {N} | \mathbf {t} _ {N})   \mathrm{d} \mathbf {a} _ {N} \\ & = & \frac {1}{p (\mathbf {t} _ {N})} \int p (a _ {N + 1}, \mathbf {a} _ {N}) p (\mathbf {t} _ {N} | a _ {N + 1}, \mathbf {a} _ {N})   \mathrm{d} \mathbf {a} _ {N} \\ & = & \frac {1}{p (\mathbf {t} _ {N})} \int p (a _ {N + 1} | \mathbf {a} _ {N}) p (\mathbf {a} _ {N}) p (\mathbf {t} _ {N} | \mathbf {a} _ {N})   \mathrm{d} \mathbf {a} _ {N} \\ & = & \int p (a _ {N + 1} | \mathbf {a} _ {N}) p (\mathbf {a} _ {N} | \mathbf {t} _ {N})   \mathrm{d} \mathbf {a} _ {N} \end{array}\tag{6.77}

where we have used $p ( { \bf t } _ { N } | a _ { N + 1 } , { \bf a } _ { N } ) = p ( { \bf t } _ { N } | { \bf a } _ { N } )$ . The conditional distribution $p ( a _ { N + 1 } | \mathbf { a } _ { N } )$ is obtained by invoking the results (6.66) and (6.67) for Gaussian process regression, to give

p (a _ {N + 1} | \mathbf {a} _ {N}) = \mathcal {N} (a _ {N + 1} | \mathbf {k} ^ {\mathrm{T}} \mathbf {C} _ {N} ^ {- 1} \mathbf {a} _ {N}, c - \mathbf {k} ^ {\mathrm{T}} \mathbf {C} _ {N} ^ {- 1} \mathbf {k}).\tag{6.78}

We can therefore evaluate the integral in (6.77) by finding a Laplace approximation for the posterior distribution $p ( \mathbf { a } _ { N } | \mathbf { t } _ { N } )$ , and then using the standard result for the convolution of two Gaussian distributions.

The prior $p ( { \bf a } _ { N } )$ is given by a zero-mean Gaussian process with covariance matrix $\mathbf { C } _ { N }$ , and the data term (assuming independence of the data points) is given by

p (\mathbf {t} _ {N} | \mathbf {a} _ {N}) = \prod_ {n = 1} ^ {N} \sigma (a _ {n}) ^ {t _ {n}} (1 - \sigma (a _ {n})) ^ {1 - t _ {n}} = \prod_ {n = 1} ^ {N} e ^ {a _ {n} t _ {n}} \sigma (- a _ {n}).\tag{6.79}

We then obtain the Laplace approximation by Taylor expanding the logarithm of $p ( \mathbf { a } _ { N } | \mathbf { t } _ { N } )$ , which up to an additive normalization constant is given by the quantity

\begin{array}{r c l} \Psi (\mathbf {a} _ {N}) & = & \ln p (\mathbf {a} _ {N}) + \ln p (\mathbf {t} _ {N} | \mathbf {a} _ {N}) \\ & = & - \frac {1}{2} \mathbf {a} _ {N} ^ {\mathrm{T}} \mathbf {C} _ {N} ^ {- 1} \mathbf {a} _ {N} - \frac {N}{2} \ln (2 \pi) - \frac {1}{2} \ln | \mathbf {C} _ {N} | + \mathbf {t} _ {N} ^ {\mathrm{T}} \mathbf {a} _ {N} \\ & & - \sum_ {n = 1} ^ {N} \ln (1 + e ^ {a _ {n}}) + \text {const.} \end{array}\tag{6.80}

First we need to find the mode of the posterior distribution, and this requires that we evaluate the gradient of $\Psi ( { \bf a } _ { N } )$ , which is given by

\nabla \Psi (\mathbf {a} _ {N}) = \mathbf {t} _ {N} - \boldsymbol {\sigma} _ {N} - \mathbf {C} _ {N} ^ {- 1} \mathbf {a} _ {N}\tag{6.81}

where $\sigma _ { N }$ is a vector with elements $\sigma ( a _ { n } )$ . We cannot simply find the mode by setting this gradient to zero, because $\sigma _ { N }$ depends nonlinearly on $\mathbf { a } _ { N }$ , and so we resort to an iterative scheme based on the Newton-Raphson method, which gives rise to an iterative reweighted least squares (IRLS) algorithm. This requires the second derivatives of $\Psi ( { \bf a } _ { N } )$ , which we also require for the Laplace approximation anyway, and which are given by

\nabla \nabla \Psi (\mathbf {a} _ {N}) = - \mathbf {W} _ {N} - \mathbf {C} _ {N} ^ {- 1}\tag{6.82}

where ${ \bf W } _ { N }$ is a diagonal matrix with elements $\sigma ( a _ { n } ) ( 1 - \sigma ( a _ { n } ) )$ , and we have used the result (4.88) for the derivative of the logistic sigmoid function. Note that these diagonal elements lie in the range $( 0 , 1 / 4 )$ , and hence ${ \bf W } _ { N }$ is a positive definite matrix. Because ${ \bf C } _ { N }$ (and hence its inverse) is positive definite by construction, and because the sum of two positive definite matrices is also positive definite, we see that the Hessian matrix $\mathbf { A } = - \nabla \nabla \Psi ( \mathbf { a } _ { N } )$ is positive definite and so the posterior distribution $p ( \mathbf { a } _ { N } | \mathbf { t } _ { N } )$ is log convex and therefore has a single mode that is the global maximum. The posterior distribution is not Gaussian, however, because the Hessian is a function of a .

Using the Newton-Raphson formula (4.92), the iterative update equation for $\mathbf { a } _ { N }$ is given by

\mathbf {a} _ {N} ^ {\mathrm{new}} = \mathbf {C} _ {N} (\mathbf {I} + \mathbf {W} _ {N} \mathbf {C} _ {N}) ^ {- 1} \left\{\mathbf {t} _ {N} - \pmb {\sigma} _ {N} + \mathbf {W} _ {N} \mathbf {a} _ {N} \right\}.\tag{6.83}

These equations are iterated until they converge to the mode which we denote by $\mathbf { a } _ { N } ^ { \star }$ . At the mode, the gradient $\nabla \Psi ( { \mathbf a } _ { N } )$ will vanish, and hence $\mathbf { a } _ { N } ^ { \star }$ will satisfy

\mathbf {a} _ {N} ^ {\star} = \mathbf {C} _ {N} (\mathbf {t} _ {N} - \boldsymbol {\sigma} _ {N}).\tag{6.84}

Once we have found the mode $\mathbf { a } _ { N } ^ { \star }$ of the posterior, we can evaluate the Hessian matrix given by

\mathbf {H} = - \nabla \nabla \Psi (\mathbf {a} _ {N}) = \mathbf {W} _ {N} + \mathbf {C} _ {N} ^ {- 1}\tag{6.85}

where the elements of $\mathbf { W } _ { N }$ are evaluated using $\mathbf { a } _ { N } ^ { \star }$ . This defines our Gaussian approximation to the posterior distribution $p ( \mathbf { a } _ { N } | \mathbf { t } _ { N } )$ given by

q (\mathbf {a} _ {N}) = \mathcal {N} (\mathbf {a} _ {N} | \mathbf {a} _ {N} ^ {\star}, \mathbf {H} ^ {- 1}).\tag{6.86}

We can now combine this with (6.78) and hence evaluate the integral (6.77). Because this corresponds to a linear-Gaussian model, we can use the general result (2.115) to give

\mathbb {E} [ a _ {N + 1} | \mathbf {t} _ {N} ] = \mathbf {k} ^ {\mathrm{T}} (\mathbf {t} _ {N} - \boldsymbol {\sigma} _ {N})\tag{6.87}

\operatorname{var} [ a _ {N + 1} | \mathbf {t} _ {N} ] = c - \mathbf {k} ^ {\mathrm{T}} (\mathbf {W} _ {N} ^ {- 1} + \mathbf {C} _ {N}) ^ {- 1} \mathbf {k}.\tag{6.88}

Now that we have a Gaussian distribution for $p ( a _ { N + 1 } | \mathbf { t } _ { N } )$ , we can approximate the integral (6.76) using the result (4.153). As with the Bayesian logistic regression model of Section 4.5, if we are only interested in the decision boundary corresponding to $p ( t _ { N + 1 } | \mathbf { t } _ { N } ) = 0 . 5$ , then we need only consider the mean and we can ignore the effect of the variance.

We also need to determine the parameters $\pmb \theta$ of the covariance function. One approach is to maximize the likelihood function given by $p ( \mathbf { t } _ { N } | \pmb { \theta } )$ for which we need expressions for the log likelihood and its gradient. If desired, suitable regularization terms can also be added, leading to a penalized maximum likelihood solution. The likelihood function is defined by

p (\mathbf {t} _ {N} | \boldsymbol {\theta}) = \int p (\mathbf {t} _ {N} | \mathbf {a} _ {N}) p (\mathbf {a} _ {N} | \boldsymbol {\theta}) \mathrm{d} \mathbf {a} _ {N}.\tag{6.89}

This integral is analytically intractable, so again we make use of the Laplace approximation. Using the result (4.135), we obtain the following approximation for the log of the likelihood function

\ln p (\mathbf {t} _ {N} | \pmb {\theta}) = \Psi (\mathbf {a} _ {N} ^ {\star}) - \frac {1}{2} \ln | \mathbf {W} _ {N} + \mathbf {C} _ {N} ^ {- 1} | + \frac {N}{2} \ln (2 \pi)\tag{6.90}

where $\Psi ( { \bf a } _ { N } ^ { \star } ) = \ln p ( { \bf a } _ { N } ^ { \star } | \pmb { \theta } ) + \ln p ( { \bf t } _ { N } | { \bf a } _ { N } ^ { \star } )$ . We also need to evaluate the gradient of ln $p ( \mathbf { t } _ { N } | \pmb { \theta } )$ with respect to the parameter vector $\theta .$ Note that changes in $\pmb \theta$ will cause changes in $\mathbf { a } _ { N } ^ { \star }$ , leading to additional terms in the gradient. Thus, when we differentiate (6.90) with respect to $\theta ,$ we obtain two sets of terms, the first arising from the dependence of the covariance matrix $\mathbf { C } _ { N }$ on $\theta ,$ and the rest arising from dependence of $\mathbf { a } _ { N } ^ { \star }$ on $\pmb { \theta } .$

The terms arising from the explicit dependence on $\pmb \theta$ can be found by using (6.80) together with the results (C.21) and (C.22), and are given by

\begin{array}{r c l} \frac {\partial \ln p (\mathbf {t} _ {N} | \boldsymbol {\theta})}{\partial \theta_ {j}} & = & \frac {1}{2} \mathbf {a} _ {N} ^ {\star^ {\mathrm{T}}} \mathbf {C} _ {N} ^ {- 1} \frac {\partial \mathbf {C} _ {N}}{\partial \theta_ {j}} \mathbf {C} _ {N} ^ {- 1} \mathbf {a} _ {N} ^ {\star} \\ & & - \frac {1}{2} \mathrm{Tr} \left[ (\mathbf {I} + \mathbf {C} _ {N} \mathbf {W} _ {N}) ^ {- 1} \mathbf {W} _ {N} \frac {\partial \mathbf {C} _ {N}}{\partial \theta_ {j}} \right]. \end{array}\tag{6.91}

To compute the terms arising from the dependence of $\mathbf { a } _ { N } ^ { \star }$ on $\pmb \theta _ { : }$ , we note that the Laplace approximation has been constructed such that $\Psi ( { \bf a } _ { N } )$ has zero gradient at ${ \bf a } _ { N } = { \bf a } _ { N } ^ { \star }$ , and so $\Psi ( { \bf a } _ { N } ^ { \star } )$ gives no contribution to the gradient as a result of its dependence on $\mathbf { a } _ { N } ^ { \star }$ . This leaves the following contribution to the derivative with respect to a component $\theta _ { j }$ of $\pmb \theta$

\begin{array}{r l} & {- \frac {1}{2} \sum_ {n = 1} ^ {N} \frac {\partial \ln | \mathbf {W} _ {N} + \mathbf {C} _ {N} ^ {- 1} |}{\partial a _ {n} ^ {\star}} \frac {\partial a _ {n} ^ {\star}}{\partial \theta_ {j}}} \\ & {\qquad = - \frac {1}{2} \sum_ {n = 1} ^ {N} \left[ (\mathbf {I} + \mathbf {C} _ {N} \mathbf {W} _ {N}) ^ {- 1} \mathbf {C} _ {N} \right] _ {n n} \sigma_ {n} ^ {\star} (1 - \sigma_ {n} ^ {\star}) (1 - 2 \sigma_ {n} ^ {\star}) \frac {\partial a _ {n} ^ {\star}}{\partial \theta_ {j}}} \end{array}\tag{6.92}

where $\sigma _ { n } ^ { \star } ~ = ~ \sigma ( a _ { n } ^ { \star } )$ , and again we have used the result (C.22) together with the definition of ${ \bf W } _ { N }$ . We can evaluate the derivative of $a _ { N } ^ { \star }$ with respect to $\theta _ { j }$ by differentiating the relation (6.84) with respect to $\theta _ { j }$ to give

\frac {\partial a _ {n} ^ {\star}}{\partial \theta_ {j}} = \frac {\partial \mathbf {C} _ {N}}{\partial \theta_ {j}} (\mathbf {t} _ {N} - \boldsymbol {\sigma} _ {N}) - \mathbf {C} _ {N} \mathbf {W} _ {N} \frac {\partial a _ {n} ^ {\star}}{\partial \theta_ {j}}.\tag{6.93}

Rearranging then gives

\frac {\partial a _ {n} ^ {\star}}{\partial \theta_ {j}} = (\mathbf {I} + \mathbf {W} _ {N} \mathbf {C} _ {N}) ^ {- 1} \frac {\partial \mathbf {C} _ {N}}{\partial \theta_ {j}} (\mathbf {t} _ {N} - \boldsymbol {\sigma} _ {N}).\tag{6.94}

Combining (6.91), (6.92), and (6.94), we can evaluate the gradient of the log likelihood function, which can be used with standard nonlinear optimization algorithms in order to determine a value for $\pmb { \theta } .$

We can illustrate the application of the Laplace approximation for Gaussian processes using the synthetic two-class data set shown in Figure 6.12. Extension of the Laplace approximation to Gaussian processes involving $K > 2$ classes, using the softmax activation function, is straightforward (Williams and Barber, 1998).

![image](images/part-002--610c6daf5164f357a47bd7ba36f7af1238b9e818701c08030f4fd5aa5fed4b11.jpg)

![image](images/part-002--4dcae451fbb86728611e1bce52ac6bd7236b855630e8a928f8d1e0cf008da747.jpg)

Figure 6.12 Illustration of the use of a Gaussian process for classification, showing the data on the left together with the optimal decision boundary from the true distribution in green, and the decision boundary from the Gaussian process classifier in black. On the right is the predicted posterior probability for the blue and red classes together with the Gaussian process decision boundary.
