---
id: "tin-hieu-he-thong.pierre-simon-laplace-1749-1827"
doc_id: "tin-hieu-he-thong"
title: "Pierre-Simon Laplace 1749\u20131827"
level: 2
heading_path: ["Introduction", "Pierre-Simon Laplace 1749\u20131827"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.1-2-4-the-gaussian-distribution"
next_id: "tin-hieu-he-thong.1-2-5-curve-fitting-re-visited"
block_ids: ["b314", "b315", "b316", "b317", "b318", "b319", "b320", "b321", "b322", "b323", "b324", "b325", "b326", "b327", "b328", "b329", "b330", "b331", "b332", "b333", "b334", "b335", "b336", "b337", "b338", "b339", "b340", "b341", "b342", "b343", "b344", "b345", "b346", "b347", "b348", "b349", "b350", "b351", "b352", "b353", "b354", "b355", "b356"]
---

## Pierre-Simon Laplace 1749–1827

It is said that Laplace was seriously lacking in modesty and at one point declared himself to be the best mathematician in France at the time, a claim that was arguably true. As well as being prolific in mathe-

matics, he also made numerous contributions to astronomy, including the nebular hypothesis by which the earth is thought to have formed from the condensation and cooling of a large rotating disk of gas and dust. In 1812 he published the first edition of Theorie<sup>´</sup> , in which Laplace states that “probability theory is nothing but common sense reduced to calculation”. This work included a discussion of the inverse probability calculation (later termed Bayes’ theorem by Poincare), which he used to solve´ problems in life expectancy, jurisprudence, planetary masses, triangulation, and error estimation.

Figure 1.13 Plot of the univariate Gaussian showing the mean $\mu$ and the standard deviation σ.

![image](images/part-001--4d97e10dd855bafb5bccabf591d1955d95791ec52d6fde2a2af3dbd14feb75e0.jpg)

\int_ {- \infty} ^ {\infty} \mathcal {N} (x | \mu , \sigma^ {2}) \mathrm{d} x = 1.\tag{1.48}

Thus (1.46) satisfies the two requirements for a valid probability density.

We can readily find expectations of functions of x under the Gaussian distribution. In particular, the average value of x is given by

\mathbb {E} [ x ] = \int_ {- \infty} ^ {\infty} \mathcal {N} (x | \mu , \sigma^ {2}) x \mathrm{d} x = \mu .\tag{1.49}

Because the parameter $\mu$ represents the average value of $x$ under the distribution, it is referred to as the mean. Similarly, for the second order moment

\mathbb {E} [ x ^ {2} ] = \int_ {- \infty} ^ {\infty} \mathcal {N} (x | \mu , \sigma^ {2}) x ^ {2} \mathrm{d} x = \mu^ {2} + \sigma^ {2}.\tag{1.50}

From (1.49) and (1.50), it follows that the variance of x is given by

\operatorname{var} [ x ] = \mathbb {E} [ x ^ {2} ] - \mathbb {E} [ x ] ^ {2} = \sigma^ {2}\tag{1.51}

and hence $\sigma ^ { 2 }$ is referred to as the variance parameter. The maximum of a distribution is known as its mode. For a Gaussian, the mode coincides with the mean.

We are also interested in the Gaussian distribution defined over a D-dimensional vector x of continuous variables, which is given by

\mathcal {N} (\mathbf {x} | \boldsymbol {\mu}, \boldsymbol {\Sigma}) = \frac {1}{(2 \pi) ^ {D / 2}} \frac {1}{| \boldsymbol {\Sigma} | ^ {1 / 2}} \exp \left\{- \frac {1}{2} (\mathbf {x} - \boldsymbol {\mu}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} - \boldsymbol {\mu}) \right\}\tag{1.52}

where the D-dimensional vector $\pmb { \mu }$ is called the mean, the $D \times D$ matrix Σ is called the covariance, and Σ denotes the determinant of Σ. We shall make use of the multivariate Gaussian distribution briefly in this chapter, although its properties will be studied in detail in Section 2.3.

Illustration of the likelihood function for a Gaussian distribution, shown by the red curve. Here the black points denote a data set of values $\dot { \{ x _ { n } \} }$ , and the likelihood function given by (1.53) corresponds to the product of the blue values. Maximizing the likelihood involves adjusting the mean and variance of the Gaussian so as to maximize this product.

![image](images/part-001--86c9676e76c7db217bd38f3fbc853e525560c5759517bb0f619e29abbefdd863.jpg)

Now suppose that we have a data set of observations ${ \bf x } = ( x _ { 1 } , \ldots , x _ { N } ) ^ { \mathrm { T } }$ , representing N observations of the scalar variable $x .$ . Note that we are using the typeface x to distinguish this from a single observation of the vector-valued variable $( x _ { 1 } , \ldots , x _ { D } ) ^ { \mathrm { T } }$ , which we denote by x. We shall suppose that the observations are drawn independently from a Gaussian distribution whose mean $\mu$ and variance $\sigma ^ { 2 }$ are unknown, and we would like to determine these parameters from the data set. Data points that are drawn independently from the same distribution are said to be independent and identically distributed, which is often abbreviated to i.i.d. We have seen that the joint probability of two independent events is given by the product of the marginal probabilities for each event separately. Because our data set x is i.i.d., we can therefore write the probability of the data set, given $\mu$ and $\sigma ^ { 2 }$ , in the form

p (\mathbf {x} | \mu , \sigma^ {2}) = \prod_ {n = 1} ^ {N} \mathcal {N} \left(x _ {n} | \mu , \sigma^ {2}\right).\tag{1.53}

When viewed as a function of $\mu$ and $\sigma ^ { 2 }$ , this is the likelihood function for the Gaus sian and is interpreted diagrammatically in Figure 1.14.

One common criterion for determining the parameters in a probability distribution using an observed data set is to find the parameter values that maximize the likelihood function. This might seem like a strange criterion because, from our foregoing discussion of probability theory, it would seem more natural to maximize the probability of the parameters given the data, not the probability of the data given the parameters. In fact, these two criteria are related, as we shall discuss in the context of curve fitting.

For the moment, however, we shall determine values for the unknown parameters $\mu$ and $\sigma ^ { 2 }$ in the Gaussian by maximizing the likelihood function (1.53). In practice, it is more convenient to maximize the log of the likelihood function. Because the logarithm is a monotonically increasing function of its argument, maximization of the log of a function is equivalent to maximization of the function itself. Taking the log not only simplifies the subsequent mathematical analysis, but it also helps numerically because the product of a large number of small probabilities can easily underflow the numerical precision of the computer, and this is resolved by computing instead the sum of the log probabilities. From (1.46) and (1.53), the log likelihood

function can be written in the form

\ln p \left(\mathbf {x} | \mu , \sigma^ {2}\right) = - \frac {1}{2 \sigma^ {2}} \sum_ {n = 1} ^ {N} (x _ {n} - \mu) ^ {2} - \frac {N}{2} \ln \sigma^ {2} - \frac {N}{2} \ln (2 \pi).\tag{1.54}

Exercise 1.11

Maximizing (1.54) with respect to $\mu ,$ we obtain the maximum likelihood solution given by

\mu_ {\mathrm{ML}} = \frac {1}{N} \sum_ {n = 1} ^ {N} x _ {n}\tag{1.55}

which is the sample mean, i.e., the mean of the observed values $\{ x _ { n } \}$ . Similarly, maximizing (1.54) with respect to $\sigma ^ { 2 }$ , we obtain the maximum likelihood solution for the variance in the form

\sigma_ {\mathrm{ML}} ^ {2} = \frac {1}{N} \sum_ {n = 1} ^ {N} (x _ {n} - \mu_ {\mathrm{ML}}) ^ {2}\tag{1.56}

which is the sample variance measured with respect to the sample mean $\mu _ { \mathrm { M L } }$ . Note that we are performing a joint maximization of (1.54) with respect to $\mu$ and $\sigma ^ { 2 }$ , but in the case of the Gaussian distribution the solution for $\mu$ decouples from that for $\sigma ^ { 2 }$ so that we can first evaluate (1.55) and then subsequently use this result to evaluate (1.56).

Later in this chapter, and also in subsequent chapters, we shall highlight the significant limitations of the maximum likelihood approach. Here we give an indication of the problem in the context of our solutions for the maximum likelihood parameter settings for the univariate Gaussian distribution. In particular, we shall show that the maximum likelihood approach systematically underestimates the variance of the distribution. This is an example of a phenomenon called bias and is related to the problem of over-fitting encountered in the context of polynomial curve fitting. We first note that the maximum likelihood solutions $\mu _ { \mathrm { M L } }$ and $\lvert \sigma _ { \mathrm { M L } } ^ { 2 }$ are functions of the data set values $x _ { 1 } , \ldots , x _ { N }$ . Consider the expectations of these quantities with respect to the data set values, which themselves come from a Gaussian distribution with parameters $\mu$ and $\sigma ^ { 2 }$ . It is straightforward to show that

Exercise 1.12

\mathbb {E} [ \mu_ {\mathrm{ML}} ] = \mu\tag{1.57}

\mathbb {E} [ \sigma_ {\mathrm{ML}} ^ {2} ] = \left(\frac {N - 1}{N}\right) \sigma^ {2}\tag{1.58}

so that on average the maximum likelihood estimate will obtain the correct mean but will underestimate the true variance by a factor $( N - 1 ) / N$ . The intuition behind this result is given by Figure 1.15.

From (1.58) it follows that the following estimate for the variance parameter is unbiased

\widetilde {\sigma} ^ {2} = \frac {N}{N - 1} \sigma_ {\mathrm{ML}} ^ {2} = \frac {1}{N - 1} \sum_ {n = 1} ^ {N} (x _ {n} - \mu_ {\mathrm{ML}}) ^ {2}.\tag{1.59}

Illustration of how bias arises in using maximum likelihood to determine the variance of a Gaussian. The green curve shows the true Gaussian distribution from which data is generated, and the three red curves show the Gaussian distributions obtained by fitting to three data sets, each consisting of two data points shown in blue, using the maximum likelihood results (1.55) and (1.56). Averaged across the three data sets, the mean is correct, but the variance is systematically under-estimated because it is measured relative to the sample mean and not relative to the true mean.

![image](images/part-001--6547dd59e4fe6f8a7b1d535f2aa2f4e973d0b0d34643501484311c018b432298.jpg)

In Section 10.1.3, we shall see how this result arises automatically when we adopt a Bayesian approach.

Note that the bias of the maximum likelihood solution becomes less significant as the number N of data points increases, and in the limit $N  \infty$ the maximum likelihood solution for the variance equals the true variance of the distribution that generated the data. In practice, for anything other than small N, this bias will not prove to be a serious problem. However, throughout this book we shall be interested in more complex models with many parameters, for which the bias problems associated with maximum likelihood will be much more severe. In fact, as we shall see, the issue of bias in maximum likelihood lies at the root of the over-fitting problem that we encountered earlier in the context of polynomial curve fitting.
