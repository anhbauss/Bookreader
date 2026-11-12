---
id: "tin-hieu-he-thong.4-5-2-predictive-distribution"
doc_id: "tin-hieu-he-thong"
title: "4.5.2 Predictive distribution"
level: 2
heading_path: ["4 Linear Models for Classification", "4.5.2 Predictive distribution"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-5-1-laplace-approximation"
next_id: "tin-hieu-he-thong.exercises-5"
block_ids: ["b2514", "b2515", "b2516", "b2517", "b2518", "b2519", "b2520", "b2521", "b2522", "b2523", "b2524", "b2525", "b2526", "b2527", "b2528", "b2529", "b2530", "b2531", "b2532", "b2533", "b2534", "b2535", "b2536", "b2537", "b2538", "b2539", "b2540"]
---

## 4.5.2 Predictive distribution

The predictive distribution for class $\mathcal { C } _ { 1 }$ , given a new feature vector $\phi ( \mathbf { x } )$ , is obtained by marginalizing with respect to the posterior distribution $p ( \mathbf { w } | \mathbf { t } )$ , which is itself approximated by a Gaussian distribution $q ( \mathbf { w } )$ so that

p (\mathcal {C} _ {1} | \boldsymbol {\phi}, \mathbf {t}) = \int p (\mathcal {C} _ {1} | \boldsymbol {\phi}, \mathbf {w}) p (\mathbf {w} | \mathbf {t}) d \mathbf {w} \simeq \int \sigma (\mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi}) q (\mathbf {w}) d \mathbf {w}\tag{4.145}

with the corresponding probability for class $\mathcal { C } _ { 2 }$ given by $p ( \mathcal { C } _ { 2 } | \phi , \mathbf { t } ) = 1 - p ( \mathcal { C } _ { 1 } | \phi , \mathbf { t } )$ To evaluate the predictive distribution, we first note that the function $\sigma ( \mathbf { w } ^ { \mathrm { T } } \phi )$ depends on w only through its projection onto $\phi$ . Denoting $a = \mathbf { w } ^ { \mathrm { T } } \phi$ , we have

\sigma (\mathbf {w} ^ {\mathrm{T}} \phi) = \int \delta (a - \mathbf {w} ^ {\mathrm{T}} \phi) \sigma (a) \mathrm{d} a\tag{4.146}

where $\delta ( \cdot )$ is the Dirac delta function. From this we obtain

\int \sigma (\mathbf {w} ^ {\mathrm{T}} \phi) q (\mathbf {w}) \mathrm{d} \mathbf {w} = \int \sigma (a) p (a) \mathrm{d} a\tag{4.147}

where

p (a) = \int \delta (a - \mathbf {w} ^ {\mathrm{T}} \phi) q (\mathbf {w}) \mathrm{d} \mathbf {w}.\tag{4.148}

We can evaluate $p ( a )$ by noting that the delta function imposes a linear constraint on w and so forms a marginal distribution from the joint distribution $q ( \mathbf { w } )$ by integrating out all directions orthogonal to $\phi .$ . Because $q ( \mathbf { w } )$ is Gaussian, we know from Section 2.3.2 that the marginal distribution will also be Gaussian. We can evaluate the mean and covariance of this distribution by taking moments, and interchanging the order of integration over a and w, so that

\mu_ {a} = \mathbb {E} [ a ] = \int p (a) a \mathrm{d} a = \int q (\mathbf {w}) \mathbf {w} ^ {\mathrm{T}} \phi \mathrm{d} \mathbf {w} = \mathbf {w} _ {\mathrm{MAP}} ^ {\mathrm{T}} \phi\tag{4.149}

where we have used the result (4.144) for the variational posterior distribution $q ( \mathbf { w } )$ Similarly

\begin{array}{r c l} \sigma_ {a} ^ {2} & = & \operatorname{var} [ a ] = \int p (a) \left\{a ^ {2} - \mathbb {E} [ a ] ^ {2} \right\} \mathrm{d} a \\ & = & \int q (\mathbf {w}) \left\{(\mathbf {w} ^ {\mathrm{T}} \phi) ^ {2} - (\mathbf {m} _ {N} ^ {\mathrm{T}} \phi) ^ {2} \right\} \mathrm{d} \mathbf {w} = \phi^ {\mathrm{T}} \mathbf {S} _ {N} \phi . \end{array}\tag{4.150}

Note that the distribution of a takes the same form as the predictive distribution (3.58) for the linear regression model, with the noise variance set to zero. Thus our variational approximation to the predictive distribution becomes

p (\mathcal {C} _ {1} | \mathbf {t}) = \int \sigma (a) p (a) \mathrm{d} a = \int \sigma (a) \mathcal {N} (a | \mu_ {a}, \sigma_ {a} ^ {2}) \mathrm{d} a.\tag{4.151}

This result can also be derived directly by making use of the results for the marginal of a Gaussian distribution given in Section 2.3.2.

The integral over a represents the convolution of a Gaussian with a logistic sigmoid, and cannot be evaluated analytically. We can, however, obtain a good approximation (Spiegelhalter and Lauritzen, 1990; MacKay, 1992b; Barber and Bishop, 1998a) by making use of the close similarity between the logistic sigmoid function $\sigma ( a )$ defined by (4.59) and the probit function $\Phi ( a )$ defined by (4.114). In order to obtain the best approximation to the logistic function we need to re-scale the horizontal axis, so that we approximate $\sigma ( a )$ by $\Phi ( \lambda a )$ . We can find a suitable value of λ by requiring that the two functions have the same slope at the origin, which gives $\lambda ^ { 2 } = \pi / 8$ The similarity of the logistic sigmoid and the probit function, for this choice of λ, is illustrated in Figure 4.9.

The advantage of using a probit function is that its convolution with a Gaussian can be expressed analytically in terms of another probit function. Specifically we can show that

\int \Phi (\lambda a) \mathcal {N} (a | \mu , \sigma^ {2}) \mathrm{d} a = \Phi \left(\frac {\mu}{(\lambda^ {- 2} + \sigma^ {2}) ^ {1 / 2}}\right).\tag{4.152}

We now apply the approximation $\sigma ( a ) \simeq \Phi ( \lambda a )$ to the probit functions appearing on both sides of this equation, leading to the following approximation for the convolution of a logistic sigmoid with a Gaussian

\int \sigma (a) \mathcal {N} (a | \mu , \sigma^ {2}) \mathrm{d} a \simeq \sigma (\kappa (\sigma^ {2}) \mu)\tag{4.153}

where we have defined

\kappa (\sigma^ {2}) = (1 + \pi \sigma^ {2} / 8) ^ {- 1 / 2}.\tag{4.154}

Applying this result to (4.151) we obtain the approximate predictive distribution in the form

p (\mathcal {C} _ {1} | \boldsymbol {\phi}, \mathbf {t}) = \sigma \left(\kappa (\sigma_ {a} ^ {2}) \mu_ {a}\right)\tag{4.155}

where $\mu _ { a }$ and $\sigma _ { a } ^ { 2 }$ are defined by (4.149) and (4.150), respectively, and $\kappa ( \sigma _ { a } ^ { 2 } )$ is defined by (4.154).

Note that the decision boundary corresponding to $p ( \mathcal { C } _ { 1 } | \phi , \mathbf { t } ) = 0 . 5$ is given by $\mu _ { a } = 0$ , which is the same as the decision boundary obtained by using the MAP value for w. Thus if the decision criterion is based on minimizing misclassification rate, with equal prior probabilities, then the marginalization over w has no effect. However, for more complex decision criteria it will play an important role. Marginalization of the logistic sigmoid model under a Gaussian approximation to the posterior distribution will be illustrated in the context of variational inference in Figure 10.13.
