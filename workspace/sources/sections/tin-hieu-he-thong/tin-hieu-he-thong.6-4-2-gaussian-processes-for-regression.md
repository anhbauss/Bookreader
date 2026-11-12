---
id: "tin-hieu-he-thong.6-4-2-gaussian-processes-for-regression"
doc_id: "tin-hieu-he-thong"
title: "6.4.2 Gaussian processes for regression"
level: 2
heading_path: ["Kernel Methods", "6.4.2 Gaussian processes for regression"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.6-4-1-linear-regression-revisited"
next_id: "tin-hieu-he-thong.6-4-3-learning-the-hyperparameters"
block_ids: ["b3505", "b3506", "b3507", "b3508", "b3509", "b3510", "b3511", "b3512", "b3513", "b3514", "b3515", "b3516", "b3517", "b3518", "b3519", "b3520", "b3521", "b3522", "b3523", "b3524", "b3525", "b3526", "b3527", "b3528", "b3529", "b3530", "b3531", "b3532", "b3533", "b3534", "b3535", "b3536", "b3537", "b3538", "b3539", "b3540", "b3541", "b3542", "b3543", "b3544", "b3545", "b3546", "b3547", "b3548", "b3549", "b3550", "b3551", "b3552", "b3553"]
---

## 6.4.2 Gaussian processes for regression

In order to apply Gaussian process models to the problem of regression, we need to take account of the noise on the observed target values, which are given by

t _ {n} = y _ {n} + \epsilon_ {n}\tag{6.57}

where $y _ { n } = y ( \mathbf { x } _ { n } )$ , and $\epsilon _ { n }$ is a random noise variable whose value is chosen independently for each observation n. Here we shall consider noise processes that have a Gaussian distribution, so that

p (t _ {n} | y _ {n}) = \mathcal {N} (t _ {n} | y _ {n}, \beta^ {- 1})\tag{6.58}

where $\beta$ is a hyperparameter representing the precision of the noise. Because the noise is independent for each data point, the joint distribution of the target values $\mathbf { t } = ( t _ { 1 } , \ldots , { \bar { t } } _ { N } ) ^ { \mathrm { T } }$ conditioned on the values of $\pmb { \ y } = ( y _ { 1 } , \dots , y _ { N } ) ^ { \mathrm { T } }$ is given by an isotropic Gaussian of the form

p (\mathbf {t} | \mathbf {y}) = \mathcal {N} (\mathbf {t} | \mathbf {y}, \beta^ {- 1} \mathbf {I} _ {N})\tag{6.59}

where ${ \mathbf { I } } _ { N }$ denotes the $N \times N$ unit matrix. From the definition of a Gaussian process, the marginal distribution $p ( \pmb { \mathsf { y } } )$ is given by a Gaussian whose mean is zero and whose covariance is defined by a Gram matrix K so that

p (\mathbf {y}) = \mathcal {N} (\mathbf {y} | \mathbf {0}, \mathbf {K}).\tag{6.60}

The kernel function that determines K is typically chosen to express the property that, for points ${ \bf x } _ { n }$ and $\mathbf { x } _ { m }$ that are similar, the corresponding values $y ( \mathbf { x } _ { n } )$ and $y ( \mathbf { x } _ { m } )$ will be more strongly correlated than for dissimilar points. Here the notion of similarity will depend on the application.

In order to find the marginal distribution $p ( \mathbf { t } )$ , conditioned on the input values $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ , we need to integrate over y. This can be done by making use of the results from Section 2.3.3 for the linear-Gaussian model. Using (2.115), we see that the marginal distribution of t is given by

p (\mathbf {t}) = \int p (\mathbf {t} | \mathbf {y}) p (\mathbf {y}) \mathrm{d} \mathbf {y} = \mathcal {N} (\mathbf {t} | \mathbf {0}, \mathbf {C})\tag{6.61}

where the covariance matrix C has elements

C (\mathbf {x} _ {n}, \mathbf {x} _ {m}) = k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) + \beta^ {- 1} \delta_ {n m}.\tag{6.62}

This result reflects the fact that the two Gaussian sources of randomness, namely that associated with $y ( \mathbf x )$ and that associated with , are independent and so their covariances simply add.

One widely used kernel function for Gaussian process regression is given by the exponential of a quadratic form, with the addition of constant and linear terms to give

k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) = \theta_ {0} \exp \left\{- \frac {\theta_ {1}}{2} \| \mathbf {x} _ {n} - \mathbf {x} _ {m} \| ^ {2} \right\} + \theta_ {2} + \theta_ {3} \mathbf {x} _ {n} ^ {\mathrm{T}} \mathbf {x} _ {m}.\tag{6.63}

Note that the term involving $\theta _ { 3 }$ corresponds to a parametric model that is a linear function of the input variables. Samples from this prior are plotted for various values of the parameters $\theta _ { 0 } , \ldots , \theta _ { 3 }$ in Figure 6.5, and Figure 6.6 shows a set of points sampled from the joint distribution (6.60) along with the corresponding values defined by (6.61).

So far, we have used the Gaussian process viewpoint to build a model of the joint distribution over sets of data points. Our goal in regression, however, is to make predictions of the target variables for new inputs, given a set of training data. Let us suppose that $\mathbf t _ { N } = ( \bar { t } _ { 1 } , \dots , t _ { N } ) ^ { \mathrm T }$ , corresponding to input values $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ comprise the observed training set, and our goal is to predict the target variable $t _ { N + 1 }$ for a new input vector $\mathbf { x } _ { N + 1 }$ . This requires that we evaluate the predictive distribution $p ( t _ { N + 1 } | \mathbf { t } _ { N } )$ . Note that this distribution is conditioned also on the variables $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ and $\mathbf { x } _ { N + 1 }$ . However, to keep the notation simple we will not show these conditioning variables explicitly.

To find the conditional distribution $p ( t _ { N + 1 } | \mathbf { t } )$ , we begin by writing down the joint distribution $p ( \mathbf { t } _ { N + 1 } )$ , where $\mathbf { t } _ { N + 1 }$ denotes the vector $( t _ { 1 } , \ldots , t _ { N } , t _ { N + 1 } ) ^ { \mathrm { T } }$ . We then apply the results from Section 2.3.1 to obtain the required conditional distribution, as illustrated in Figure 6.7.

From (6.61), the joint distribution over $t _ { 1 } , \ldots , t _ { N + 1 }$ will be given by

p (\mathbf {t} _ {N + 1}) = \mathcal {N} (\mathbf {t} _ {N + 1} | \mathbf {0}, \mathbf {C} _ {N + 1})\tag{6.64}

where ${ \bf C } _ { N + 1 }$ is an $( N + 1 ) \times ( N + 1 )$ covariance matrix with elements given by (6.62). Because this joint distribution is Gaussian, we can apply the results from Section 2.3.1 to find the conditional Gaussian distribution. To do this, we partition the covariance matrix as follows

\mathbf {C} _ {N + 1} = \left( \begin{array}{c c} \mathbf {C} _ {N} & \mathbf {k} \\ \mathbf {k} ^ {\mathrm{T}} & c \end{array} \right)\tag{6.65}

where $\mathbf { C } _ { N }$ is the $N \times N$ covariance matrix with elements given by (6.62) for $n , m =$ $1 , \ldots , N$ , the vector k has elements $k ( \mathbf { x } _ { n } , \mathbf { x } _ { N + 1 } )$ for $n = 1 , \ldots , N$ , and the scalar $c = k ( \mathbf { x } _ { N + 1 } , \mathbf { x } _ { N + 1 } ) + \beta ^ { - 1 }$ . Using the results (2.81) and (2.82), we see that the conditional distribution $p ( t _ { N + 1 } | \mathbf { t } )$ is a Gaussian distribution with mean and covariance given by

![image](images/part-002--b5ef3fe223a3c7f0a9ea56131adf62b6194e880f9a982e51cfe9c0b6ec7282e9.jpg)

Figure 6.5 Samples from a Gaussian process prior defined by the covariance function (6.63). The title above each plot denotes $( \theta _ { 0 } , \theta _ { 1 } , \theta _ { 2 } , \theta _ { 3 } )$

{m (\mathbf {x} _ {N + 1})} = {\mathbf {k} ^ {\mathrm{T}} \mathbf {C} _ {N} ^ {- 1} \mathbf {t}}\tag{6.66}

\sigma^ {2} (\mathbf {x} _ {N + 1}) = c - \mathbf {k} ^ {\mathrm{T}} \mathbf {C} _ {N} ^ {- 1} \mathbf {k}.\tag{6.67}

These are the key results that define Gaussian process regression. Because the vector k is a function of the test point input value $\mathbf { x } _ { N + 1 }$ , we see that the predictive distribution is a Gaussian whose mean and variance both depend on $\mathbf { x } _ { N + 1 }$ . An example of Gaussian process regression is shown in Figure 6.8.

The only restriction on the kernel function is that the covariance matrix given by (6.62) must be positive definite. If $\lambda _ { i }$ is an eigenvalue of $\mathbf { K } ,$ , then the corresponding eigenvalue of C will be $\lambda _ { i } + \beta ^ { - 1 }$ . It is therefore sufficient that the kernel matrix $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } )$ be positive semidefinite for any pair of points ${ \bf x } _ { n }$ and $\mathbf { x } _ { m }$ , so that $\lambda _ { i } \geqslant 0$ because any eigenvalue $\lambda _ { i }$ that is zero will still give rise to a positive eigenvalue for C because $\beta > 0$ . This is the same restriction on the kernel function discussed earlier, and so we can again exploit all of the techniques in Section 6.2 to construct

Illustration of the sampling of data points $\left\{ t _ { n } \right\}$ from a Gaussian process. The blue curve shows a sample function from the Gaussian process prior over functions, and the red points show the values of $y _ { n }$ obtained by evaluating the function at a set of input values $\{ x _ { n } \}$ The corresponding values of $\{ \boldsymbol { { \acute { t } } } _ { n } \}$ , shown in green, are obtained by adding independent Gaussian noise to each of the $\{ y _ { n } \}$

![image](images/part-002--3fad71a741977fe883138a580de2c230d0405bc651248bc4fe887be20c04c8b6.jpg)

suitable kernels.

Note that the mean (6.66) of the predictive distribution can be written, as a function of $\mathbf { x } _ { N + 1 }$ , in the form

m (\mathbf {x} _ {N + 1}) = \sum_ {n = 1} ^ {N} a _ {n} k (\mathbf {x} _ {n}, \mathbf {x} _ {N + 1})\tag{6.68}

where $a _ { n }$ is the $n ^ { \mathrm { t h } }$ component of $\mathbf { C } _ { N } ^ { - 1 } \mathbf { t } .$ . Thus, if the kernel function $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } )$ depends only on the distance $\| \mathbf { x } _ { n } - \mathbf { x } _ { m } \|$ , then we obtain an expansion in radial basis functions.

The results (6.66) and (6.67) define the predictive distribution for Gaussian process regression with an arbitrary kernel function $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } )$ . In the particular case in which the kernel function $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ is defined in terms of a finite set of basis functions, we can derive the results obtained previously in Section 3.3.2 for linear regression starting from the Gaussian process viewpoint.

For such models, we can therefore obtain the predictive distribution either by taking a parameter space viewpoint and using the linear regression result or by taking a function space viewpoint and using the Gaussian process result.

The central computational operation in using Gaussian processes will involve the inversion of a matrix of size $\bar { N } \times N$ , for which standard methods require $O ( N ^ { 3 } )$ computations. By contrast, in the basis function model we have to invert a matrix $\mathbf { S } _ { N }$ of size $M \times M$ , which has $O ( M ^ { 3 } )$ computational complexity. Note that for both viewpoints, the matrix inversion must be performed once for the given training set. For each new test point, both methods require a vector-matrix multiply, which has cost $O ( N ^ { 2 } )$ in the Gaussian process case and $O ( M ^ { 2 } )$ for the linear basis function model. If the number M of basis functions is smaller than the number $N$ of data points, it will be computationally more efficient to work in the basis function

Exercise 6.23

Illustration of the mechanism of Gaussian process regression for the case of one training point and one test point, in which the red ellipses show contours of the joint distribution $p ( t _ { 1 } , t _ { 2 } )$ Here $t _ { 1 }$ is the training data point, and conditioning on the value of $t _ { 1 } ,$ , corresponding to the vertical blue line, we obtain $p ( t _ { 2 } | t _ { 1 } )$ shown as a function of $t _ { 2 }$ by the green curve.

![image](images/part-002--0cf2ea9823148eedca48dcd43f70fc0897796d3eb3a3c86064d50728a0e3506e.jpg)

framework. However, an advantage of a Gaussian processes viewpoint is that we can consider covariance functions that can only be expressed in terms of an infinite number of basis functions.

For large training data sets, however, the direct application of Gaussian process methods can become infeasible, and so a range of approximation schemes have been developed that have better scaling with training set size than the exact approach (Gibbs, 1997; Tresp, 2001; Smola and Bartlett, 2001; Williams and Seeger, 2001; Csato and Opper, 2002; Seeger´ et $a l .$ , 2003). Practical issues in the application of Gaussian processes are discussed in Bishop and Nabney (2008).

We have introduced Gaussian process regression for the case of a single target variable. The extension of this formalism to multiple target variables, known as co-kriging (Cressie, 1993), is straightforward. Various other extensions of Gaus-

Illustration of Gaussian process regression applied to the sinusoidal data set in Figure A.6 in which the three right-most data points have been omitted. The green curve shows the sinusoidal function from which the data points, shown in blue, are obtained by sampling and addition of Gaussian noise. The red line shows the mean of the Gaussian process predictive distribution, and the shaded region corresponds to plus and minus two standard deviations. Notice how the uncertainty increases in the region to the right of the data points.

![image](images/part-002--c39ac2df28d3136dfca53704f1d68ec9d9d56f07d96ea858da1d5b38dc990b6e.jpg)

sian process regression have also been considered, for purposes such as modelling the distribution over low-dimensional manifolds for unsupervised learning (Bishop et al., 1998a) and the solution of stochastic differential equations (Graepel, 2003).
