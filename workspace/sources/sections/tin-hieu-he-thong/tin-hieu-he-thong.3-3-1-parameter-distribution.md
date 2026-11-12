---
id: "tin-hieu-he-thong.3-3-1-parameter-distribution"
doc_id: "tin-hieu-he-thong"
title: "3.3.1 Parameter distribution"
level: 2
heading_path: ["3 Linear Models for Regression", "3.3.1 Parameter distribution"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-3-bayesian-linear-regression"
next_id: "tin-hieu-he-thong.3-3-2-predictive-distribution"
block_ids: ["b1789", "b1790", "b1791", "b1792", "b1793", "b1794", "b1795", "b1796", "b1797", "b1798", "b1799", "b1800", "b1801", "b1802", "b1803", "b1804", "b1805", "b1806", "b1807", "b1808", "b1809", "b1810", "b1811", "b1812", "b1813", "b1814", "b1815", "b1816", "b1817", "b1818", "b1819", "b1820", "b1821", "b1822"]
---

## 3.3.1 Parameter distribution

We begin our discussion of the Bayesian treatment of linear regression by introducing a prior probability distribution over the model parameters w. For the moment, we shall treat the noise precision parameter $\beta$ as a known constant. First note that the likelihood function $p ( \mathbf { t } | \mathbf { w } )$ defined by (3.10) is the exponential of a quadratic function of w. The corresponding conjugate prior is therefore given by a Gaussian distribution of the form

p (\mathbf {w}) = \mathcal {N} (\mathbf {w} | \mathbf {m} _ {0}, \mathbf {S} _ {0})\tag{3.48}

having mean $\mathbf { m } _ { 0 }$ and covariance $\mathbf { S } _ { 0 }$ .

Next we compute the posterior distribution, which is proportional to the product of the likelihood function and the prior. Due to the choice of a conjugate Gaussian prior distribution, the posterior will also be Gaussian. We can evaluate this distribution by the usual procedure of completing the square in the exponential, and then finding the normalization coefficient using the standard result for a normalized Gaussian. However, we have already done the necessary work in deriving the general result (2.116), which allows us to write down the posterior distribution directly in the form

p (\mathbf {w} | \mathbf {t}) = \mathcal {N} (\mathbf {w} | \mathbf {m} _ {N}, \mathbf {S} _ {N})\tag{3.49}

where

\mathbf {m} _ {N} = \mathbf {S} _ {N} \left(\mathbf {S} _ {0} ^ {- 1} \mathbf {m} _ {0} + \beta \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {t}\right)\tag{3.50}

{\bf S} _ {N} ^ {- 1} = {\bf S} _ {0} ^ {- 1} + \beta {\bf \Phi} ^ {\mathrm{T}} {\bf \Phi}.\tag{3.51}

Note that because the posterior distribution is Gaussian, its mode coincides with its mean. Thus the maximum posterior weight vector is simply given by ${ \bf w } _ { \mathrm { M A P } } = { \bf m } _ { N }$ If we consider an infinitely broad prior ${ \bf S } _ { 0 } = \alpha ^ { - 1 } { \bf I }$ with $\alpha  0 .$ , the mean m<sub>N</sub> of the posterior distribution reduces to the maximum likelihood value $\mathbf { w } _ { \mathrm { M L } }$ given by (3.15). Similarly, if $N = 0$ , then the posterior distribution reverts to the prior. Furthermore, if data points arrive sequentially, then the posterior distribution at any stage acts as the prior distribution for the subsequent data point, such that the new posterior distribution is again given by (3.49).

For the remainder of this chapter, we shall consider a particular form of Gaussian prior in order to simplify the treatment. Specifically, we consider a zero-mean isotropic Gaussian governed by a single precision parameter α so that

p (\mathbf {w} | \alpha) = \mathcal {N} (\mathbf {w} | \mathbf {0}, \alpha^ {- 1} \mathbf {I})\tag{3.52}

and the corresponding posterior distribution over w is then given by (3.49) with

{\bf m} _ {N} = \beta {\bf S} _ {N} {\bf \Phi} ^ {\mathrm{T}} {\bf t}\tag{3.53}

{\bf S} _ {N} ^ {- 1} = \alpha {\bf I} + \beta {\bf \Phi} ^ {\mathrm{T}} {\bf \Phi}.\tag{3.54}

The log of the posterior distribution is given by the sum of the log likelihood and the log of the prior and, as a function of w, takes the form

\ln p (\mathbf {w} | \mathbf {t}) = - \frac {\beta}{2} \sum_ {n = 1} ^ {N} \{t _ {n} - \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) \} ^ {2} - \frac {\alpha}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w} + \text { const }.\tag{3.55}

Maximization of this posterior distribution with respect to w is therefore equivalent to the minimization of the sum-of-squares error function with the addition of a quadratic regularization term, corresponding to (3.27) with $\lambda = \alpha / \beta$

We can illustrate Bayesian learning in a linear basis function model, as well as the sequential update of a posterior distribution, using a simple example involving straight-line fitting. Consider a single input variable x, a single target variable t and a linear model of the form $y ( x , \mathbf { w } ) = w _ { 0 } + w _ { 1 } x$ . Because this has just two adap tive parameters, we can plot the prior and posterior distributions directly in parameter space. We generate synthetic data from the function $f ( x , \mathbf { a } ) = a _ { 0 } + a _ { 1 } x$ with parameter values $a _ { 0 } = - 0 . 3$ and $a _ { 1 } = 0 . 5$ by first choosing values of $x _ { n }$ from the uniform distribution $\mathrm { U } ( x | - 1 , 1 )$ , then evaluating $f ( x _ { n } , \mathbf { a } )$ , and finally adding Gaussian noise with standard deviation of 0.2 to obtain the target values $t _ { n }$ . Our goal is to recover the values of $a _ { 0 }$ and $a _ { 1 }$ from such data, and we will explore the dependence on the size of the data set. We assume here that the noise variance is known and hence we set the precision parameter to its true value $\beta = ( 1 / 0 . 2 ) ^ { 2 } = 2 5$ . Similarly, we fix the parameter α to 2.0. We shall shortly discuss strategies for determining α and $\beta$ from the training data. Figure 3.7 shows the results of Bayesian learning in this model as the size of the data set is increased and demonstrates the sequential nature of Bayesian learning in which the current posterior distribution forms the prior when a new data point is observed. It is worth taking time to study this figure in detail as it illustrates several important aspects of Bayesian inference. The first row of this figure corresponds to the situation before any data points are observed and shows a plot of the prior distribution in w space together with six samples of the function $y ( x , \mathbf { w } )$ in which the values of w are drawn from the prior. In the second row, we see the situation after observing a single data point. The location $( x , t )$ of the data point is shown by a blue circle in the right-hand column. In the left-hand column is a plot of the likelihood function $p ( t | x , \mathbf { w } )$ for this data point as a function of w. Note that the likelihood function provides a soft constraint that the line must pass close to the data point, where close is determined by the noise precision $\beta .$ . For comparison, the true parameter values $a _ { 0 } = - 0 . 3$ and $a _ { 1 } = 0 . 5$ used to generate the data set are shown by a white cross in the plots in the left column of Figure 3.7. When we multiply this likelihood function by the prior from the top row, and normalize, we obtain the posterior distribution shown in the middle plot on the second row. Sam ples of the regression function $y ( x , \mathbf { w } )$ obtained by drawing samples of w from this posterior distribution are shown in the right-hand plot. Note that these sample lines all pass close to the data point. The third row of this figure shows the effect of ob serving a second data point, again shown by a blue circle in the plot in the right-hand column. The corresponding likelihood function for this second data point alone is shown in the left plot. When we multiply this likelihood function by the posterior distribution from the second row, we obtain the posterior distribution shown in the middle plot of the third row. Note that this is exactly the same posterior distribution as would be obtained by combining the original prior with the likelihood function for the two data points. This posterior has now been influenced by two data points, and because two points are sufficient to define a line this already gives a relatively compact posterior distribution. Samples from this posterior distribution give rise to the functions shown in red in the third column, and we see that these functions pass close to both of the data points. The fourth row shows the effect of observing a total of 20 data points. The left-hand plot shows the likelihood function for the $2 0 ^ { \mathrm { { t h } } }$ data point alone, and the middle plot shows the resulting posterior distribution that has now absorbed information from all 20 observations. Note how the posterior is much sharper than in the third row. In the limit of an infinite number of data points, the posterior distribution would become a delta function centred on the true parameter values, shown by the white cross.

![image](images/part-001--7c1b737d1df482d1ca1a26ae2df1102b80639e957cc3e71eeb6cfb57fec4cac3.jpg)

![image](images/part-001--218b9f51e0d37649b726e5f91efd80c1b423c004deb242567163877be2117848.jpg)

![image](images/part-001--67903024e7ce93c07005cd30ea21355172933a1c8d84bbc2e7306a55f7d3b96b.jpg)

![image](images/part-001--1dfbc5eff53afbbd38fc482019a0201c0ecbcf20160823e8593433821ef29dfd.jpg)

![image](images/part-001--d1c4fd90db9e03b72daaaa1733a9d4e7ce78b5cd761b58a5527dca9a4dc0a76e.jpg)

![image](images/part-001--50531945cc0b766cb32b8346aefd5acf1e5039880f5b0383bd7a7574ef8c312f.jpg)

![image](images/part-001--a879c5fbaa9869bf1004c69fc35df53eb28fca02ff2a904900e9a0e962e0f2f0.jpg)

![image](images/part-001--04bda6376a8c759cb0c694fe49b79b4acfd4e2eac79c827b6c082fb4f25edae5.jpg)

![image](images/part-001--c34ae46f9b147eeb1546a0352307b050c8c96896cfec10e491891935d3c9124b.jpg)

![image](images/part-001--96fa3688f3f8965367b53ac7340ee6a98495a6ab2a3828fb5d77bf708c863c86.jpg)

![image](images/part-001--fe5aa5def0f03a0a042667222f933f377b480cd926ae150e76c27148deed39f2.jpg)

Figure 3.7 Illustration of sequential Bayesian learning for a simple linear model of the form $y ( x , \mathbf { w } ) =$ $w _ { 0 } + w _ { 1 } x .$ A detailed description of this figure is given in the text.

Other forms of prior over the parameters can be considered. For instance, we can generalize the Gaussian prior to give

p (\mathbf {w} | \alpha) = \left[ \frac {q}{2} \left(\frac {\alpha}{2}\right) ^ {1 / q} \frac {1}{\Gamma (1 / q)} \right] ^ {M} \exp \left(- \frac {\alpha}{2} \sum_ {j = 1} ^ {M} | w _ {j} | ^ {q}\right)\tag{3.56}

in which $q = 2$ corresponds to the Gaussian distribution, and only in this case is the prior conjugate to the likelihood function (3.10). Finding the maximum of the posterior distribution over w corresponds to minimization of the regularized error function (3.29). In the case of the Gaussian prior, the mode of the posterior distribution was equal to the mean, although this will no longer hold if $q \neq 2$
