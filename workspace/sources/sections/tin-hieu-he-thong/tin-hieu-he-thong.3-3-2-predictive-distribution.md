---
id: "tin-hieu-he-thong.3-3-2-predictive-distribution"
doc_id: "tin-hieu-he-thong"
title: "3.3.2 Predictive distribution"
level: 2
heading_path: ["3 Linear Models for Regression", "3.3.2 Predictive distribution"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-3-1-parameter-distribution"
next_id: "tin-hieu-he-thong.3-3-3-equivalent-kernel"
block_ids: ["b1823", "b1824", "b1825", "b1826", "b1827", "b1828", "b1829", "b1830", "b1831", "b1832", "b1833", "b1834", "b1835", "b1836", "b1837", "b1838", "b1839", "b1840", "b1841", "b1842", "b1843", "b1844", "b1845", "b1846"]
---

## 3.3.2 Predictive distribution

In practice, we are not usually interested in the value of w itself but rather in making predictions of t for new values of x. This requires that we evaluate the predictive distribution defined by

p (t | \mathbf {t}, \alpha , \beta) = \int p (t | \mathbf {w}, \beta) p (\mathbf {w} | \mathbf {t}, \alpha , \beta) d \mathbf {w}\tag{3.57}

in which t is the vector of target values from the training set, and we have omitted the corresponding input vectors from the right-hand side of the conditioning statements to simplify the notation. The conditional distribution $p ( t | \mathbf { x } , \mathbf { w } , \beta )$ of the target variable is given by (3.8), and the posterior weight distribution is given by (3.49). We see that (3.57) involves the convolution of two Gaussian distributions, and so making use of the result (2.115) from Section 8.1.4, we see that the predictive distribution takes the form

p (t | \mathbf {x}, \mathbf {t}, \alpha , \beta) = \mathcal {N} (t | \mathbf {m} _ {N} ^ {\mathrm{T}} \phi (\mathbf {x}), \sigma_ {N} ^ {2} (\mathbf {x}))\tag{3.58}

where the variance $\sigma _ { N } ^ { 2 } ( \mathbf { x } )$ of the predictive distribution is given by

\sigma_ {N} ^ {2} (\mathbf {x}) = \frac {1}{\beta} + \phi (\mathbf {x}) ^ {\mathrm{T}} \mathbf {S} _ {N} \phi (\mathbf {x}).\tag{3.59}

The first term in (3.59) represents the noise on the data whereas the second term reflects the uncertainty associated with the parameters w. Because the noise process and the distribution of w are independent Gaussians, their variances are additive. Note that, as additional data points are observed, the posterior distribution becomes narrower. As a consequence it can be shown (Qazaz et al., 1997) that $\sigma _ { N + 1 } ^ { 2 } ( \mathbf { x } ) \leqslant$ $\sigma _ { N } ^ { 2 } ( \mathbf { x } )$ . In the limit $N \to \infty$ , the second term in (3.59) goes to zero, and the variance of the predictive distribution arises solely from the additive noise governed by the parameter $\beta .$

As an illustration of the predictive distribution for Bayesian linear regression models, let us return to the synthetic sinusoidal data set of Section 1.1. In Figure 3.8, we fit a model comprising a linear combination of Gaussian basis functions to data sets of various sizes and then look at the corresponding posterior distributions. Here the green curves correspond to the function sin $( 2 \pi x )$ from which the data points were generated (with the addition of Gaussian noise). Data sets of size $N = 1$ $N = 2 , N = 4$ , and $N = 2 5$ are shown in the four plots by the blue circles. For each plot, the red curve shows the mean of the corresponding Gaussian predictive distribution, and the red shaded region spans one standard deviation either side of the mean. Note that the predictive uncertainty depends on x and is smallest in the neighbourhood of the data points. Also note that the level of uncertainty decreases as more data points are observed.

![image](images/part-001--467c986e30284789ec5dad0287ae9fbb0f798ef4f990b5145ffa5f4f72a1a639.jpg)

![image](images/part-001--cd9de3f1b7a35ccb70cb08beba0cccbcffaf5939e3824acc2bab2f2acd6927b5.jpg)

![image](images/part-001--e83d927c64f978622284e9d36d287d7bce1b57c92ad9cebaebbc247ceca635ab.jpg)

![image](images/part-001--32cf14e44a64bc52330f573aaa4023b2e27fc9bba25f02e93163de0de57cd741.jpg)

Figure 3.8 Examples of the predictive distribution (3.58) for a model consisting of 9 Gaussian basis functions of the form (3.4) using the synthetic sinusoidal data set of Section 1.1. See the text for a detailed discussion.

The plots in Figure 3.8 only show the point-wise predictive variance as a function of x. In order to gain insight into the covariance between the predictions at different values of x, we can draw samples from the posterior distribution over w, and then plot the corresponding functions $y ( x , \mathbf { w } )$ , as shown in Figure 3.9.

![image](images/part-001--e67060a494a2679c5fdfc1d29184a4759339358aea9fc207d84d36f6450a4ce7.jpg)

![image](images/part-001--47bddf078822f29299b1349e763a804ea7bf9bf532392a2aab93b8bea7a4b5f4.jpg)

![image](images/part-001--6b5d00955672084f41e80de0ad218a5e79a042213e244d595891df76e42fe072.jpg)

![image](images/part-001--1e06d833a66b67d6ea2a22c8fc19c565b9435ede2f15ba20025695ee48e941b2.jpg)

Figure 3.9 Plots of the function $y ( x , \mathbf { w } )$ using samples from the posterior distributions over w corresponding to the plots in Figure 3.8.

If we used localized basis functions such as Gaussians, then in regions away from the basis function centres, the contribution from the second term in the predictive variance (3.59) will go to zero, leaving only the noise contribution $\beta ^ { - 1 }$ . Thus, the model becomes very confident in its predictions when extrapolating outside the region occupied by the basis functions, which is generally an undesirable behaviour. This problem can be avoided by adopting an alternative Bayesian approach to regression known as a Gaussian process.

Note that, if both w and $\beta$ are treated as unknown, then we can introduce a conjugate prior distribution $p ( \mathbf { w } , \beta )$ that, from the discussion in Section 2.3.6, will be given by a Gaussian-gamma distribution (Denison et al., 2002). In this case, the predictive distribution is a Student’s t-distribution.

Figure 3.10 The equivalent kernel $k ( x , x ^ { \prime } )$ for the Gaussian basis functions in Figure 3.1, shown as a plot of x versus $x ^ { \prime }$ , together with three slices through this matrix corresponding to three different values of x. The data set used to generate this kernel comprised 200 values of x equally spaced over the interval ( 1, 1).

![image](images/part-001--55db9bad3bf5378498b6e05470621460547f0e1ce7dc88bdb8373e0aedd688f2.jpg)
