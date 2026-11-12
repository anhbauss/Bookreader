---
id: "tin-hieu-he-thong.6-4-1-linear-regression-revisited"
doc_id: "tin-hieu-he-thong"
title: "6.4.1 Linear regression revisited"
level: 2
heading_path: ["Kernel Methods", "6.4.1 Linear regression revisited"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.6-4-gaussian-processes"
next_id: "tin-hieu-he-thong.6-4-2-gaussian-processes-for-regression"
block_ids: ["b3480", "b3481", "b3482", "b3483", "b3484", "b3485", "b3486", "b3487", "b3488", "b3489", "b3490", "b3491", "b3492", "b3493", "b3494", "b3495", "b3496", "b3497", "b3498", "b3499", "b3500", "b3501", "b3502", "b3503", "b3504"]
---

## 6.4.1 Linear regression revisited

In order to motivate the Gaussian process viewpoint, let us return to the linear regression example and re-derive the predictive distribution by working in terms of distributions over functions $y ( \mathbf { x } , \mathbf { w } )$ . This will provide a specific example of a Gaussian process.

Consider a model defined in terms of a linear combination of M fixed basis functions given by the elements of the vector $\phi ( \mathbf { x } )$ so that

y (\mathbf {x}) = \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x})\tag{6.49}

where x is the input vector and w is the M-dimensional weight vector. Now consider a prior distribution over w given by an isotropic Gaussian of the form

p (\mathbf {w}) = \mathcal {N} (\mathbf {w} | \mathbf {0}, \alpha^ {- 1} \mathbf {I})\tag{6.50}

governed by the hyperparameter α, which represents the precision (inverse variance) of the distribution. For any given value of w, the definition (6.49) defines a particular function of x. The probability distribution over w defined by (6.50) therefore induces a probability distribution over functions $y ( \mathbf x )$ . In practice, we wish to eval uate this function at specific values of x, for example at the training data points $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ . We are therefore interested in the joint distribution of the function values $y ( \mathbf { x } _ { 1 } ) , \ldots , y ( \mathbf { x } _ { N } )$ , which we denote by the vector y with elements $y _ { n } = y ( \mathbf { x } _ { n } )$ for $n = 1 , \ldots , N$ . From (6.49), this vector is given by

\mathbf {y} = \boldsymbol {\Phi} \mathbf {w}\tag{6.51}

where $\Phi$ is the design matrix with elements $\Phi _ { n k } = \phi _ { k } ( \mathbf { x } _ { n } )$ . We can find the probability distribution of y as follows. First of all we note that y is a linear combination of Gaussian distributed variables given by the elements of w and hence is itself Gaussian. We therefore need only to find its mean and covariance, which are given from (6.50) by

Exercise 2.31

{\mathbb {E} [ \mathbf {y} ]} = {\boldsymbol {\Phi} \mathbb {E} [ \mathbf {w} ] = \mathbf {0}}\tag{6.52}

\operatorname{cov} [ \mathbf {y} ] = \mathbb {E} \left[ \mathbf {y y} ^ {\mathrm{T}} \right] = \boldsymbol {\Phi} \mathbb {E} \left[ \mathbf {w w} ^ {\mathrm{T}} \right] \boldsymbol {\Phi} ^ {\mathrm{T}} = \frac {1}{\alpha} \boldsymbol {\Phi} \boldsymbol {\Phi} ^ {\mathrm{T}} = \mathbf {K}\tag{6.53}

where K is the Gram matrix with elements

K _ {n m} = k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) = \frac {1}{\alpha} \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {m})\tag{6.54}

and $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ is the kernel function.

This model provides us with a particular example of a Gaussian process. In general, a Gaussian process is defined as a probability distribution over functions $y ( \mathbf x )$ such that the set of values of $y ( \mathbf x )$ evaluated at an arbitrary set of points $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ jointly have a Gaussian distribution. In cases where the input vector x is two dimensional, this may also be known as a Gaussian random field. More generally, a stochastic process $y ( \mathbf x )$ is specified by giving the joint probability distribution for any finite set of values $y ( \mathbf { x } _ { 1 } ) , \ldots , y ( \mathbf { x } _ { N } )$ in a consistent manner.

A key point about Gaussian stochastic processes is that the joint distribution over N variables $y _ { 1 } , \ldots , y _ { N }$ is specified completely by the second-order statistics, namely the mean and the covariance. In most applications, we will not have any prior knowledge about the mean of $y ( \mathbf x )$ and so by symmetry we take it to be zero. This is equivalent to choosing the mean of the prior over weight values $p ( \mathbf { w } | \alpha )$ to be zero in the basis function viewpoint. The specification of the Gaussian process is then completed by giving the covariance of $y ( \mathbf x )$ evaluated at any two values of x, which is given by the kernel function

\mathbb {E} \left[ y (\mathbf {x} _ {n}) y (\mathbf {x} _ {m}) \right] = k (\mathbf {x} _ {n}, \mathbf {x} _ {m}).\tag{6.55}

For the specific case of a Gaussian process defined by the linear regression model (6.49) with a weight prior (6.50), the kernel function is given by (6.54).

We can also define the kernel function directly, rather than indirectly through a choice of basis function. Figure 6.4 shows samples of functions drawn from Gaussian processes for two different choices of kernel function. The first of these is a ‘Gaussian’ kernel of the form (6.23), and the second is the exponential kernel given by

k (x, x ^ {\prime}) = \exp (- \theta | x - x ^ {\prime} |)\tag{6.56}

which corresponds to the Ornstein-Uhlenbeck process originally introduced by Uhlenbeck and Ornstein (1930) to describe Brownian motion.

Figure 6.4 Samples from Gaussian processes for a ‘Gaussian’ kernel (left) and an exponential kernel (right).

![image](images/part-002--f1580c4eecf8708fa5294d5cb34d71b44fcf1c70e02f1455020216fbee83ba5a.jpg)

![image](images/part-002--fe366e648fbbeb8b1305624c2fdfacc58892c5ce4c90f2713714474691248af4.jpg)
