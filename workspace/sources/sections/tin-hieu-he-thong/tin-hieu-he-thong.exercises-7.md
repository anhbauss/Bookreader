---
id: "tin-hieu-he-thong.exercises-7"
doc_id: "tin-hieu-he-thong"
title: "Exercises"
level: 2
heading_path: ["Kernel Methods", "Exercises"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.6-4-7-connection-to-neural-networks"
next_id: "tin-hieu-he-thong.sparse-kernel-machines"
block_ids: ["b3648", "b3649", "b3650", "b3651", "b3652", "b3653", "b3654", "b3655", "b3656", "b3657", "b3658", "b3659", "b3660", "b3661", "b3662", "b3663", "b3664", "b3665", "b3666", "b3667", "b3668", "b3669", "b3670", "b3671", "b3672", "b3673", "b3674", "b3675", "b3676", "b3677", "b3678", "b3679", "b3680", "b3681", "b3682", "b3683", "b3684"]
---

## Exercises

6.1 ( ) www Consider the dual formulation of the least squares linear regression problem given in Section 6.1. Show that the solution for the components $a _ { n }$ of the vector a can be expressed as a linear combination of the elements of the vector $\phi (  { \mathbf { x } } _ { n } )$ . Denoting these coefficients by the vector w, show that the dual of the dual formulation is given by the original representation in terms of the parameter vector w.

6.2 ( ) In this exercise, we develop a dual formulation of the perceptron learning algorithm. Using the perceptron learning rule (4.55), show that the learned weight vector w can be written as a linear combination of the vectors $t _ { n } \phi ( \mathbf x _ { n } )$ where $t _ { n } \in$ $\{ - 1 , + 1 \}$ . Denote the coefficients of this linear combination by $\alpha _ { n }$ and derive a formulation of the perceptron learning algorithm, and the predictive function for the perceptron, in terms of the $\alpha _ { n }$ . Show that the feature vector $\phi ( \mathbf { x } )$ enters only in the form of the kernel function $k ( { \bf x } , { \bf x } ^ { \prime } ) = \phi ( { \bf x } ) ^ { \mathrm { T } } \phi ( { \bf x } ^ { \prime } )$

6.3 () The nearest-neighbour classifier (Section 2.5.2) assigns a new input vector x to the same class as that of the nearest input vector ${ \bf x } _ { n }$ from the training set, where in the simplest case, the distance is defined by the Euclidean metric $\| \mathbf { x } - \mathbf { x } _ { n } \| ^ { 2 }$ . By expressing this rule in terms of scalar products and then making use of kernel substitution, formulate the nearest-neighbour classifier for a general nonlinear kernel.

6.4 () In Appendix C, we give an example of a matrix that has positive elements but that has a negative eigenvalue and hence that is not positive definite. Find an example of the converse property, namely a $2 \times 2$ matrix with positive eigenvalues yet that has at least one negative element.

6.5 () www Verify the results (6.13) and (6.14) for constructing valid kernels.

6.6 () Verify the results (6.15) and (6.16) for constructing valid kernels.

6.7 () www Verify the results (6.17) and (6.18) for constructing valid kernels.

6.8 () Verify the results (6.19) and (6.20) for constructing valid kernels.

6.9 () Verify the results (6.21) and (6.22) for constructing valid kernels.

6.10 () Show that an excellent choice of kernel for learning a function $f ( \mathbf { x } )$ is given by $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = f ( \mathbf { x } ) f ( \mathbf { x } ^ { \prime } )$ by showing that a linear learning machine based on this kernel will always find a solution proportional to $f ( \mathbf { x } )$

6.11 () By making use of the expansion (6.25), and then expanding the middle factor as a power series, show that the Gaussian kernel (6.23) can be expressed as the inner product of an infinite-dimensional feature vector.

6.12 ( ) www Consider the space of all possible subsets A of a given fixed set D. Show that the kernel function (6.27) corresponds to an inner product in a feature space of dimensionality $2 ^ { | D | }$ defined by the mapping $\phi ( A )$ where A is a subset of D and the element $\phi _ { U } ( A )$ , indexed by the subset $\bar { U }$ , is given by

\phi_ {U} (A) = \left\{ \begin{array}{l l} 1, & \text { if } U \subseteq A; \\ 0, & \text { otherwise }. \end{array} \right.\tag{6.95}

Here $U \subseteq A$ denotes that U is either a subset of A or is equal to $A .$

6.13 () Show that the Fisher kernel, defined by (6.33), remains invariant if we make a nonlinear transformation of the parameter vector $\theta \to \psi ( \theta )$ , where the function $\psi ( \cdot )$ is invertible and differentiable.

6.14 () www Write down the form of the Fisher kernel, defined by (6.33), for the case of a distribution $p ( \mathbf { x } | \pmb { \mu } ) = \mathcal { N } ( \mathbf { x } | \pmb { \mu } , \mathbf { S } )$ that is Gaussian with mean $\pmb { \mu }$ and fixed covariance S.

6.15 () By considering the determinant of a $2 \times 2$ Gram matrix, show that a positivedefinite kernel function $k ( x , x ^ { \prime } )$ satisfies the Cauchy-Schwartz inequality

k (x _ {1}, x _ {2}) ^ {2} \leqslant k (x _ {1}, x _ {1}) k (x _ {2}, x _ {2}).\tag{6.96}

6.16 ( ) Consider a parametric model governed by the parameter vector w together with a data set of input values $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ and a nonlinear feature mapping $\phi ( \mathbf { x } )$ Suppose that the dependence of the error function on w takes the form

J (\mathbf {w}) = f (\mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {1}), \ldots , \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {N})) + g (\mathbf {w} ^ {\mathrm{T}} \mathbf {w})\tag{6.97}

where $g ( \cdot )$ is a monotonically increasing function. By writing w in the form

\mathbf {w} = \sum_ {n = 1} ^ {N} \alpha_ {n} \phi (\mathbf {x} _ {n}) + \mathbf {w} _ {\perp}\tag{6.98}

show that the value of w that minimizes $J ( \mathbf { w } )$ takes the form of a linear combination of the basis functions $\phi (  { \mathbf { x } } _ { n } )$ for $n = 1 , \ldots , N$

6.17 ( ) www Consider the sum-of-squares error function (6.39) for data having noisy inputs, where $\nu ( \pmb { \xi } )$ is the distribution of the noise. Use the calculus of variations to minimize this error function with respect to the function $y ( \mathbf x )$ , and hence show that the optimal solution is given by an expansion of the form (6.40) in which the basis functions are given by (6.41).

6.18 () Consider a Nadaraya-Watson model with one input variable x and one target variable t having Gaussian components with isotropic covariances, so that the covariance matrix is given by $\sigma ^ { 2 } \mathbf { I }$ where I is the unit matrix. Write down expressions for the conditional density $p ( t | x )$ and for the conditional mean $\mathbb { E } [ t | x ]$ and variance $\mathrm { v a r } [ t | x ]$ , in terms of the kernel function $k ( x , x _ { n } )$

6.19 ( ) Another viewpoint on kernel regression comes from a consideration of regression problems in which the input variables as well as the target variables are corrupted with additive noise. Suppose each target value $t _ { n }$ is generated as usual by taking a function $y ( \mathbf { z } _ { n } )$ evaluated at a point $\mathbf { z } _ { n } .$ , and adding Gaussian noise. The value of $\mathbf { z } _ { n }$ is not directly observed, however, but only a noise corrupted version ${ \bf x } _ { n } = { \bf z } _ { n } + { \pmb { \xi } } _ { n }$ where the random variable $\boldsymbol { \xi }$ is governed by some distribution $g ( \xi )$ Consider a set of observations $\left\{ \mathbf { x } _ { n } , t _ { n } \right\}$ , where $n = 1 , \ldots , N$ , together with a corresponding sum-of-squares error function defined by averaging over the distribution of input noise to give

E = \frac {1}{2} \sum_ {n = 1} ^ {N} \int \left\{y (\mathbf {x} _ {n} - \pmb {\xi} _ {n}) - t _ {n} \right\} ^ {2} g (\pmb {\xi} _ {n}) \mathrm{d} \pmb {\xi} _ {n}.\tag{6.99}

By minimizing E with respect to the function $y ( \mathbf { z } )$ using the calculus of variations (Appendix D), show that optimal solution for $y ( \mathbf x )$ is given by a Nadaraya-Watson kernel regression solution of the form (6.45) with a kernel of the form (6.46).

6.20 ( ) www Verify the results (6.66) and (6.67).

6.21 ( ) www Consider a Gaussian process regression model in which the kernel function is defined in terms of a fixed set of nonlinear basis functions. Show that the predictive distribution is identical to the result (3.58) obtained in Section 3.3.2 for the Bayesian linear regression model. To do this, note that both models have Gaussian predictive distributions, and so it is only necessary to show that the conditional mean and variance are the same. For the mean, make use of the matrix identity (C.6), and for the variance, make use of the matrix identity (C.7).

6.22 ( ) Consider a regression problem with N training set input vectors $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ and L test set input vectors $\mathbf { x } _ { N + 1 } , \dots , \mathbf { x } _ { N + L }$ , and suppose we define a Gaussian process prior over functions $t ( \mathbf { x } )$ . Derive an expression for the joint predictive distribution for $t ( \mathbf { x } _ { N + 1 } ) , \ldots , t ( \mathbf { x } _ { N + L } )$ , given the values of $t ( \mathbf { x } _ { 1 } ) , \ldots , t ( \mathbf { x } _ { N } )$ . Show the marginal of this distribution for one of the test observations $t _ { j }$ where $N + 1 \leqslant j \leqslant$ $N + L$ is given by the usual Gaussian process regression result (6.66) and (6.67).

6.23 ( ) www Consider a Gaussian process regression model in which the target variable t has dimensionality D. Write down the conditional distribution of $\mathbf { t } _ { N + 1 }$ for a test input vector $\mathbf { x } _ { N + 1 }$ , given a training set of input vectors $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N + 1 }$ and corresponding target observations $\mathbf { t } _ { 1 } , \ldots , \mathbf { t } _ { N }$

6.24 () Show that a diagonal matrix W whose elements satisfy $0 < W _ { i i } < 1$ is positive definite. Show that the sum of two positive definite matrices is itself positive definite.

6.25 () www Using the Newton-Raphson formula (4.92), derive the iterative update formula (6.83) for finding the mode $\mathbf { a } _ { N } ^ { \star }$ of the posterior distribution in the Gaussian process classification model.

6.26 () Using the result (2.115), derive the expressions (6.87) and (6.88) for the mean and variance of the posterior distribution $p ( a _ { N + 1 } | \mathbf { t } _ { N } )$ in the Gaussian process classification model.

6.27 (  ) Derive the result (6.90) for the log likelihood function in the Laplace approximation framework for Gaussian process classification. Similarly, derive the results (6.91), (6.92), and (6.94) for the terms in the gradient of the log likelihood.
