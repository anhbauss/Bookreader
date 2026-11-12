---
id: "tin-hieu-he-thong.9-2-1-maximum-likelihood"
doc_id: "tin-hieu-he-thong"
title: "9.2.1 Maximum likelihood"
level: 2
heading_path: ["Mixture Models and EM", "9.2.1 Maximum likelihood"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.9-2-mixtures-of-gaussians"
next_id: "tin-hieu-he-thong.9-2-2-em-for-gaussian-mixtures"
block_ids: ["b4773", "b4774", "b4775", "b4776", "b4777", "b4778", "b4779", "b4780", "b4781", "b4782", "b4783", "b4784", "b4785", "b4786", "b4787", "b4788", "b4789"]
---

## 9.2.1 Maximum likelihood

Suppose we have a data set of observations $\left\{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \right\}$ , and we wish to model this data using a mixture of Gaussians. We can represent this data set as an $N \times D$ matrix X in which the $n ^ { \mathrm { t h } }$ row is given by ${ \bf x } _ { n } ^ { \mathrm { T } }$ . Similarly, the corresponding latent variables will be denoted by an $N \times K$ matrix Z with rows ${ \bf z } _ { n } ^ { \mathrm { T } }$ . If we assume that the data points are drawn independently from the distribution, then we can express the Gaussian mixture model for this i.i.d. data set using the graphical representation shown in Figure 9.6. From (9.7) the log of the likelihood function is given by

![image](images/part-003--969a89938ba9ac45196dddc96694b7f9babfb815ed6230e7b353d5a05af44221.jpg)

![image](images/part-003--1ef6e9428d040574efa4c33a43b62af9d818d8c0a323e49b463976d5b9bc791f.jpg)

![image](images/part-003--6c624a1745e46a8625168afdade1d3681f3c7519945536df0ce267f031d912c2.jpg)

Figure 9.5 Example of 500 points drawn from the mixture of 3 Gaussians shown in Figure 2.23. (a) Samples from the joint distribution $p ( \mathbf { z } ) p ( \mathbf { x } | \mathbf { z } )$ in which the three states of z, corresponding to the three components of the mixture, are depicted in red, green, and blue, and (b) the corresponding samples from the marginal distribution $p ( \mathbf { x } )$ , which is obtained by simply ignoring the values of z and just plotting the x values. The data set in (a) is said to be complete, whereas that in (b) is incomplete. (c) The same samples in which the colours represent the value of the responsibilities $\gamma ( z _ { n k } )$ associated with data point $\mathbf { x } _ { n } ,$ obtained by plotting the corresponding point using proportions of red, blue, and green ink given by $\gamma ( z _ { n k } )$ for $k = 1$ , 2, 3, respectively

\ln p (\mathbf {X} | \boldsymbol {\pi}, \boldsymbol {\mu}, \boldsymbol {\Sigma}) = \sum_ {n = 1} ^ {N} \ln \left\{\sum_ {k = 1} ^ {K} \pi_ {k} \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Sigma} _ {k}) \right\}.\tag{9.14}

Before discussing how to maximize this function, it is worth emphasizing that there is a significant problem associated with the maximum likelihood framework applied to Gaussian mixture models, due to the presence of singularities. For simplicity, consider a Gaussian mixture whose components have covariance matrices given by $\boldsymbol { \Sigma } _ { k } = \sigma _ { k } ^ { 2 } \mathbf { I }$ , where I is the unit matrix, although the conclusions will hold for general covariance matrices. Suppose that one of the components of the mixture model, let us say the $j ^ { \mathrm { t h } }$ component, has its mean $\mu _ { j }$ exactly equal to one of the data points so that $\pmb { \mu } _ { j } = \mathbf { x } _ { n }$ for some value of n. This data point will then contribute a term in the likelihood function of the form

Figure 9.6 Graphical representation of a Gaussian mixture model for a set of N i.i.d. data points $\left\{ \mathbf { x } _ { n } \right\}$ , with corresponding latent points $\left\{ \mathbf { z } _ { n } \right\}$ , where $n = 1 , \ldots , N$

![image](images/part-003--9fa2aee5eacef67df44d4fc08f58aa53eb8647b063cfa4486c06e667d31ceffa.jpg)

Illustration of how singularities in the likelihood function arise with mixtures of Gaussians. This should be compared with the case of a single Gaussian shown in Figure 1.14 for which no singularities arise.

![image](images/part-003--a6aab490203f69cf1375561ab12ddbe67b5dba00609c23f92338526c5e9dc732.jpg)

\mathcal {N} (\mathbf {x} _ {n} | \mathbf {x} _ {n}, \sigma_ {j} ^ {2} \mathbf {I}) = \frac {1}{(2 \pi) ^ {1 / 2}} \frac {1}{\sigma_ {j}}.\tag{9.15}

If we consider the limit $\sigma _ { j } \ \to \ 0$ , then we see that this term goes to infinity and so the log likelihood function will also go to infinity. Thus the maximization of the log likelihood function is not a well posed problem because such singularities will always be present and will occur whenever one of the Gaussian components ‘collapses’ onto a specific data point. Recall that this problem did not arise in the case of a single Gaussian distribution. To understand the difference, note that if a single Gaussian collapses onto a data point it will contribute multiplicative factors to the likelihood function arising from the other data points and these factors will go to zero exponentially fast, giving an overall likelihood that goes to zero rather than infinity. However, once we have (at least) two components in the mixture, one of the components can have a finite variance and therefore assign finite probability to all of the data points while the other component can shrink onto one specific data point and thereby contribute an ever increasing additive value to the log likelihood. This is illustrated in Figure 9.7. These singularities provide another example of the severe over-fitting that can occur in a maximum likelihood approach. We shall see that this difficulty does not occur if we adopt a Bayesian approach. For the moment, however, we simply note that in applying maximum likelihood to Gaussian mixture models we must take steps to avoid finding such pathological solutions and instead seek local maxima of the likelihood function that are well behaved. We can hope to avoid the singularities by using suitable heuristics, for instance by detecting when a Gaussian component is collapsing and resetting its mean to a randomly chosen value while also resetting its covariance to some large value, and then continuing with the optimization.

A further issue in finding maximum likelihood solutions arises from the fact that for any given maximum likelihood solution, a K-component mixture will have a total of K! equivalent solutions corresponding to the K! ways of assigning K sets of parameters to K components. In other words, for any given (nondegenerate) point in the space of parameter values there will be a further $K ! - 1$ additional points all of which give rise to exactly the same distribution. This problem is known as identifiability (Casella and Berger, 2002) and is an important issue when we wish to interpret the parameter values discovered by a model. Identifiability will also arise when we discuss models having continuous latent variables in Chapter 12. However, for the purposes of finding a good density model, it is irrelevant because any of the equivalent solutions is as good as any other.

Maximizing the log likelihood function (9.14) for a Gaussian mixture model turns out to be a more complex problem than for the case of a single Gaussian. The difficulty arises from the presence of the summation over k that appears inside the logarithm in (9.14), so that the logarithm function no longer acts directly on the Gaussian. If we set the derivatives of the log likelihood to zero, we will no longer obtain a closed form solution, as we shall see shortly.

One approach is to apply gradient-based optimization techniques (Fletcher, 1987; Nocedal and Wright, 1999; Bishop and Nabney, 2008). Although gradient-based techniques are feasible, and indeed will play an important role when we discuss mixture density networks in Chapter 5, we now consider an alternative approach known as the EM algorithm which has broad applicability and which will lay the foundations for a discussion of variational inference techniques in Chapter 10.
