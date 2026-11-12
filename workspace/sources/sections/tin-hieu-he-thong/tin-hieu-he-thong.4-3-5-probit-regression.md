---
id: "tin-hieu-he-thong.4-3-5-probit-regression"
doc_id: "tin-hieu-he-thong"
title: "4.3.5 Probit regression"
level: 2
heading_path: ["4 Linear Models for Classification", "4.3.5 Probit regression"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-3-4-multiclass-logistic-regression"
next_id: "tin-hieu-he-thong.4-3-6-canonical-link-functions"
block_ids: ["b2412", "b2413", "b2414", "b2415", "b2416", "b2417", "b2418", "b2419", "b2420", "b2421", "b2422", "b2423", "b2424", "b2425", "b2426", "b2427", "b2428", "b2429", "b2430", "b2431", "b2432", "b2433", "b2434"]
---

## 4.3.5 Probit regression

We have seen that, for a broad range of class-conditional distributions, described by the exponential family, the resulting posterior class probabilities are given by a logistic (or softmax) transformation acting on a linear function of the feature variables. However, not all choices of class-conditional density give rise to such a simple form for the posterior probabilities (for instance, if the class-conditional densities are modelled using Gaussian mixtures). This suggests that it might be worth exploring other types of discriminative probabilistic model. For the purposes of this chapter, however, we shall return to the two-class case, and again remain within the framework of generalized linear models so that

p (t = 1 | a) = f (a)\tag{4.111}

where $a = \mathbf { w } ^ { \mathrm { T } } \phi$ , and $f ( \cdot )$ is the activation function.

One way to motivate an alternative choice for the link function is to consider a noisy threshold model, as follows. For each input $\phi _ { n }$ , we evaluate $a _ { n } = \mathbf { w } ^ { \mathrm { T } } \phi _ { n }$ and then we set the target value according to

\left\{ \begin{array}{l l} t _ {n} = 1 & \text { if } a _ {n} \geqslant \theta \\ t _ {n} = 0 & \text { otherwise. } \end{array} \right.\tag{4.112}

Figure 4.13 Schematic example of a probability density $p ( \theta )$ shown by the blue curve, given in this example by a mixture of two Gaussians, along with its cumulative distribution function $f ( a )$ , shown by the red curve. Note that the value of the blue curve at any point, such as that indicated by the vertical green line, corresponds to the slope of the red curve at the same point. Conversely, the value of the red curve at this point corresponds to the area under the blue curve indicated by the shaded green region. In the stochastic threshold model, the class label takes the value $t = 1$ if the value of $a = \mathbf { w } ^ { \mathrm { T } }$ φ exceeds a threshold, otherwise it takes the value $t = 0$ . This is equivalent to an activation function given by the cumulative distribution function $f ( a )$

![image](images/part-002--c5e477788ff6f2d77b0fcec384cb8708965cb5998497f5bfc410f4a42266979e.jpg)

If the value of $\theta$ is drawn from a probability density $p ( \theta )$ , then the corresponding activation function will be given by the cumulative distribution function

f (a) = \int_ {- \infty} ^ {a} p (\theta) \mathrm{d} \theta\tag{4.113}

as illustrated in Figure 4.13.

As a specific example, suppose that the density $p ( \theta )$ is given by a zero mean, unit variance Gaussian. The corresponding cumulative distribution function is given by

\Phi (a) = \int_ {- \infty} ^ {a} \mathcal {N} (\theta | 0, 1) \mathrm{d} \theta\tag{4.114}

which is known as the probit function. It has a sigmoidal shape and is compared with the logistic sigmoid function in Figure 4.9. Note that the use of a more general Gaussian distribution does not change the model because this is equivalent to a re-scaling of the linear coefficients w. Many numerical packages provide for the evaluation of a closely related function defined by

\operatorname{erf} (a) = \frac {2}{\sqrt {\pi}} \int_ {0} ^ {a} \exp (- \theta^ {2} / 2) \mathrm{d} \theta\tag{4.115}

and known as the erffunction or error function (not to be confused with the error function of a machine learning model). It is related to the probit function by

\Phi (a) = \frac {1}{2} \left\{1 + \frac {1}{\sqrt {2}} \mathrm{erf} (a) \right\}.\tag{4.116}

The generalized linear model based on a probit activation function is known as probit regression.

We can determine the parameters of this model using maximum likelihood, by a straightforward extension of the ideas discussed earlier. In practice, the results found using probit regression tend to be similar to those of logistic regression. We shall, however, find another use for the probit model when we discuss Bayesian treatments of logistic regression in Section 4.5.

One issue that can occur in practical applications is that of outliers, which can arise for instance through errors in measuring the input vector x or through mislabelling of the target value t. Because such points can lie a long way to the wrong side of the ideal decision boundary, they can seriously distort the classifier. Note that the logistic and probit regression models behave differently in this respect because the tails of the logistic sigmoid decay asymptotically like $\exp ( - x )$ for $x \to \infty$ , whereas for the probit activation function they decay like $\exp ( - x ^ { 2 } )$ , and so the probit model can be significantly more sensitive to outliers.

However, both the logistic and the probit models assume the data is correctly labelled. The effect of mislabelling is easily incorporated into a probabilistic model by introducing a probability  that the target value t has been flipped to the wrong value (Opper and Winther, 2000a), leading to a target value distribution for data point x of the form

\begin{array}{r c l} p (t | \mathbf {x}) & = & (1 - \epsilon) \sigma (\mathbf {x}) + \epsilon (1 - \sigma (\mathbf {x})) \\ & = & \epsilon + (1 - 2 \epsilon) \sigma (\mathbf {x}) \end{array}\tag{4.117}

where $\sigma ( \mathbf { x } )$ is the activation function with input vector x. Here  may be set in advance, or it may be treated as a hyperparameter whose value is inferred from the data.
