---
id: "tin-hieu-he-thong.4-4-the-laplace-approximation"
doc_id: "tin-hieu-he-thong"
title: "4.4. The Laplace Approximation"
level: 2
heading_path: ["4 Linear Models for Classification", "4.4. The Laplace Approximation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-3-6-canonical-link-functions"
next_id: "tin-hieu-he-thong.4-4-1-model-comparison-and-bic"
block_ids: ["b2454", "b2455", "b2456", "b2457", "b2458", "b2459", "b2460", "b2461", "b2462", "b2463", "b2464", "b2465", "b2466", "b2467", "b2468", "b2469", "b2470", "b2471", "b2472", "b2473", "b2474", "b2475", "b2476", "b2477", "b2478", "b2479", "b2480", "b2481", "b2482"]
---

## 4.4. The Laplace Approximation

In Section 4.5 we shall discuss the Bayesian treatment of logistic regression. As we shall see, this is more complex than the Bayesian treatment of linear regression models, discussed in Sections 3.3 and 3.5. In particular, we cannot integrate exactly over the parameter vector w since the posterior distribution is no longer Gaussian. It is therefore necessary to introduce some form of approximation. Later in the book we shall consider a range of techniques based on analytical approximations and numerical sampling.

Here we introduce a simple, but widely used, framework called the Laplace approximation, that aims to find a Gaussian approximation to a probability density defined over a set of continuous variables. Consider first the case of a single continuous variable z, and suppose the distribution $p ( z )$ is defined by

p (z) = \frac {1}{Z} f (z)\tag{4.125}

where $\begin{array} { r } { Z = \int f ( z ) \mathrm { d } z } \end{array}$ is the normalization coefficient. We shall suppose that the value of Z is unknown. In the Laplace method the goal is to find a Gaussian approximation $q ( z )$ which is centred on a mode of the distribution $p ( z )$ . The first step is to find a mode of $p ( z )$ , in other words a point $z _ { \mathrm { 0 } }$ such that $p ^ { \prime } ( z _ { 0 } ) = 0$ , or equivalently

\left. \frac {d f (z)}{d z} \right| _ {z = z _ {0}} = 0.\tag{4.126}

A Gaussian distribution has the property that its logarithm is a quadratic function of the variables. We therefore consider a Taylor expansion of ln $f ( z )$ centred on the mode $z _ { \mathrm { 0 } }$ so that

\ln f (z) \simeq \ln f (z _ {0}) - \frac {1}{2} A (z - z _ {0}) ^ {2}\tag{4.127}

where

A = - \left. \frac {d ^ {2}}{d z ^ {2}} \ln f (z) \right| _ {z = z _ {0}}.\tag{4.128}

Note that the first-order term in the Taylor expansion does not appear since $z _ { 0 }$ is a local maximum of the distribution. Taking the exponential we obtain

f (z) \simeq f (z _ {0}) \exp \left\{- \frac {A}{2} (z - z _ {0}) ^ {2} \right\}.\tag{4.129}

We can then obtain a normalized distribution $q ( z )$ by making use of the standard result for the normalization of a Gaussian, so that

q (z) = \left(\frac {A}{2 \pi}\right) ^ {1 / 2} \exp \left\{- \frac {A}{2} (z - z _ {0}) ^ {2} \right\}.\tag{4.130}

The Laplace approximation is illustrated in Figure 4.14. Note that the Gaussian approximation will only be well defined if its precision $A > 0$ , in other words the stationary point $z _ { 0 }$ must be a local maximum, so that the second derivative of $f ( z )$ at the point $z _ { 0 }$ is negative.

![image](images/part-002--f13419f591f1a675a13f488417d2103e3326edb90ba3293d972b9c82cc228c54.jpg)

![image](images/part-002--fede03da01ef26f37953c158fb04f83ea37ade1521ed082fd103f9922b470dbd.jpg)

Figure 4.14 Illustration of the Laplace approximation applied to the distribution $p ( z ) \propto \exp ( - z ^ { 2 } / 2 ) \sigma ( 2 0 z + 4 )$ where $\sigma ( z )$ is the logistic sigmoid function defined by $\sigma \dot { ( } z \dot { ) } = ( 1 + e ^ { - z } ) ^ { - 1 }$ . The left plot shows the normalized distribution $p ( z )$ in yellow, together with the Laplace approximation centred on the mode $z _ { \mathrm { 0 } }$ of $p ( z )$ in red. The right plot shows the negative logarithms of the corresponding curves.

We can extend the Laplace method to approximate a distribution $p ( \mathbf { z } ) = f ( \mathbf { z } ) / Z$ defined over an M-dimensional space z. At a stationary point $\mathbf { z } _ { 0 }$ the gradient $\nabla f ( \mathbf { z } )$ will vanish. Expanding around this stationary point we have

\ln f (\mathbf {z}) \simeq \ln f (\mathbf {z} _ {0}) - \frac {1}{2} (\mathbf {z} - \mathbf {z} _ {0}) ^ {\mathrm{T}} \mathbf {A} (\mathbf {z} - \mathbf {z} _ {0})\tag{4.131}

where the $M \times M$ Hessian matrix A is defined by

\mathbf {A} = - \left. \nabla \nabla \ln f (\mathbf {z}) \right| _ {\mathbf {z} = \mathbf {z} _ {0}}\tag{4.132}

and $\nabla$ is the gradient operator. Taking the exponential of both sides we obtain

f (\mathbf {z}) \simeq f (\mathbf {z} _ {0}) \exp \left\{- \frac {1}{2} (\mathbf {z} - \mathbf {z} _ {0}) ^ {\mathrm{T}} \mathbf {A} (\mathbf {z} - \mathbf {z} _ {0}) \right\}.\tag{4.133}

The distribution $q ( \mathbf { z } )$ is proportional to $f ( \mathbf { z } )$ and the appropriate normalization coefficient can be found by inspection, using the standard result (2.43) for a normalized multivariate Gaussian, giving

q (\mathbf {z}) = \frac {| \mathbf {A} | ^ {1 / 2}}{(2 \pi) ^ {M / 2}} \exp \left\{- \frac {1}{2} (\mathbf {z} - \mathbf {z} _ {0}) ^ {\mathrm{T}} \mathbf {A} (\mathbf {z} - \mathbf {z} _ {0}) \right\} = \mathcal {N} (\mathbf {z} | \mathbf {z} _ {0}, \mathbf {A} ^ {- 1})\tag{4.134}

where $| \mathbf { A } |$ denotes the determinant of A. This Gaussian distribution will be well defined provided its precision matrix, given by A, is positive definite, which implies that the stationary point $\mathbf { z } _ { 0 }$ must be a local maximum, not a minimum or a saddle point.

In order to apply the Laplace approximation we first need to find the mode $\mathbf { z } _ { 0 }$ and then evaluate the Hessian matrix at that mode. In practice a mode will typically be found by running some form of numerical optimization algorithm (Bishop and Nabney, 2008). Many of the distributions encountered in practice will be multimodal and so there will be different Laplace approximations according to which mode is being considered. Note that the normalization constant $Z$ of the true distribution does not need to be known in order to apply the Laplace method. As a result of the central limit theorem, the posterior distribution for a model is expected to become increasingly better approximated by a Gaussian as the number of observed data points is increased, and so we would expect the Laplace approximation to be most useful in situations where the number of data points is relatively large.

One major weakness of the Laplace approximation is that, since it is based on a Gaussian distribution, it is only directly applicable to real variables. In other cases it may be possible to apply the Laplace approximation to a transformation of the variable. For instance if $0 \leqslant \tau < \infty$ then we can consider a Laplace approximation of ln $\tau .$ . The most serious limitation of the Laplace framework, however, is that it is based purely on the aspects of the true distribution at a specific value of the variable, and so can fail to capture important global properties. In Chapter 10 we shall consider alternative approaches which adopt a more global perspective.
