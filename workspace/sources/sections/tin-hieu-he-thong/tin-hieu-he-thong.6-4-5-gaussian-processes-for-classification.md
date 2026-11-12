---
id: "tin-hieu-he-thong.6-4-5-gaussian-processes-for-classification"
doc_id: "tin-hieu-he-thong"
title: "6.4.5 Gaussian processes for classification"
level: 2
heading_path: ["Kernel Methods", "6.4.5 Gaussian processes for classification"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.6-4-4-automatic-relevance-determination"
next_id: "tin-hieu-he-thong.6-4-6-laplace-approximation"
block_ids: ["b3579", "b3580", "b3581", "b3582", "b3583", "b3584", "b3585", "b3586", "b3587", "b3588", "b3589", "b3590", "b3591", "b3592", "b3593", "b3594", "b3595", "b3596", "b3597"]
---

## 6.4.5 Gaussian processes for classification

In a probabilistic approach to classification, our goal is to model the posterior probabilities of the target variable for a new input vector, given a set of training data. These probabilities must lie in the interval (0, 1), whereas a Gaussian process model makes predictions that lie on the entire real axis. However, we can easily adapt Gaussian processes to classification problems by transforming the output of the Gaussian process using an appropriate nonlinear activation function.

Consider first the two-class problem with a target variable $t \in \{ 0 , 1 \}$ . If we define a Gaussian process over a function $a ( \mathbf { x } )$ and then transform the function using a logistic sigmoid $y = \sigma ( a )$ , given by (4.59), then we will obtain a non-Gaussian stochastic process over functions $y ( \mathbf x )$ where $y \in ( 0 , 1 )$ . This is illustrated for the case of a one-dimensional input space in Figure 6.11 in which the probability distribution over the target variable t is then given by the Bernoulli distribution

![image](images/part-002--23b4f19f131325f2675a3dd4af4ad8776aa5a07239c07ae4aa2cf70069bac875.jpg)

![image](images/part-002--40ad47ab9e983683e001aacc5160d6ef2a371d105dc2fa84a923820acaa1432f.jpg)

Figure 6.11 The left plot shows a sample from a Gaussian process prior over functions $a ( \mathbf { x } )$ , and the right plot shows the result of transforming this sample using a logistic sigmoid function.

p (t | a) = \sigma (a) ^ {t} (1 - \sigma (a)) ^ {1 - t}.\tag{6.73}

As usual, we denote the training set inputs by $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ with corresponding observed target variables $\mathbf { t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { \hat { T } } }$ . We also consider a single test point $\mathbf { x } _ { N + 1 }$ with target value $t _ { N + 1 }$ . Our goal is to determine the predictive distribution $p ( t _ { N + 1 } | \mathbf { t } )$ , where we have left the conditioning on the input variables implicit. To do this we introduce a Gaussian process prior over the vector $\mathbf { a } _ { N + 1 }$ , which has components $a ( \mathbf { x } _ { 1 } ) , \dots , a ( \mathbf { x } _ { N + 1 } )$ . This in turn defines a non-Gaussian process over $\mathbf { t } _ { N + 1 }$ and by conditioning on the training data $\mathbf { t } _ { N }$ we obtain the required predictive distribution. The Gaussian process prior for $\mathbf { a } _ { N + 1 }$ takes the form

p (\mathbf {a} _ {N + 1}) = \mathcal {N} (\mathbf {a} _ {N + 1} | \mathbf {0}, \mathbf {C} _ {N + 1}).\tag{6.74}

Unlike the regression case, the covariance matrix no longer includes a noise term because we assume that all of the training data points are correctly labelled. However, for numerical reasons it is convenient to introduce a noise-like term governed by a parameter ν that ensures that the covariance matrix is positive definite. Thus the covariance matrix ${ \bf C } _ { N + 1 }$ has elements given by

C (\mathbf {x} _ {n}, \mathbf {x} _ {m}) = k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) + \nu \delta_ {n m}\tag{6.75}

where $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } )$ is any positive semidefinite kernel function of the kind considered in Section 6.2, and the value of ν is typically fixed in advance. We shall assume that the kernel function $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ is governed by a vector θ of parameters, and we shall later discuss how θ may be learned from the training data.

For two-class problems, it is sufficient to predict $p ( t _ { N + 1 } = 1 | \mathbf { t } _ { N } )$ because the value of $p ( t _ { N + 1 } \ = \ 0 | \mathbf { t } _ { N } )$ is then given by $1 - p ( t _ { N + 1 } = 1 | \mathbf { t } _ { N } )$ . The required

predictive distribution is given by

p (t _ {N + 1} = 1 | \mathbf {t} _ {N}) = \int p (t _ {N + 1} = 1 | a _ {N + 1}) p (a _ {N + 1} | \mathbf {t} _ {N}) \mathrm{d} a _ {N + 1}\tag{6.76}

where $p ( t _ { N + 1 } = 1 | a _ { N + 1 } ) = \sigma ( a _ { N + 1 } )$

This integral is analytically intractable, and so may be approximated using sampling methods (Neal, 1997). Alternatively, we can consider techniques based on an analytical approximation. In Section 4.5.2, we derived the approximate formula (4.153) for the convolution of a logistic sigmoid with a Gaussian distribution. We can use this result to evaluate the integral in (6.76) provided we have a Gaussian approximation to the posterior distribution $p ( a _ { N + 1 } | \mathbf { t } _ { N } )$ . The usual justification for a Gaussian approximation to a posterior distribution is that the true posterior will tend to a Gaussian as the number of data points increases as a consequence of the central limit theorem. In the case of Gaussian processes, the number of variables grows with the number of data points, and so this argument does not apply directly. However, if we consider increasing the number of data points falling in a fixed region of x space, then the corresponding uncertainty in the function $a ( \mathbf { x } )$ will decrease, again leading asymptotically to a Gaussian (Williams and Barber, 1998).

Three different approaches to obtaining a Gaussian approximation have been considered. One technique is based on variational inference (Gibbs and MacKay, 2000) and makes use of the local variational bound (10.144) on the logistic sigmoid. This allows the product of sigmoid functions to be approximated by a product of Gaussians thereby allowing the marginalization over $\mathbf { a } _ { N }$ to be performed analytically. The approach also yields a lower bound on the likelihood function $p ( \mathbf { t } _ { N } | \boldsymbol { \theta } )$ The variational framework for Gaussian process classification can also be extended to multiclass $( K > 2 )$ problems by using a Gaussian approximation to the softmax function (Gibbs, 1997).

A second approach uses expectation propagation (Opper and Winther, 2000b; Minka, 2001b; Seeger, 2003). Because the true posterior distribution is unimodal, as we shall see shortly, the expectation propagation approach can give good results.
