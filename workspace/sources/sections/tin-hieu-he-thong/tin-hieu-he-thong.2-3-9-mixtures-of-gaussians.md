---
id: "tin-hieu-he-thong.2-3-9-mixtures-of-gaussians"
doc_id: "tin-hieu-he-thong"
title: "2.3.9 Mixtures of Gaussians"
level: 2
heading_path: ["Probability Distributions", "2.3.9 Mixtures of Gaussians"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-3-8-periodic-variables"
next_id: "tin-hieu-he-thong.2-4-the-exponential-family"
block_ids: ["b1287", "b1288", "b1289", "b1290", "b1291", "b1292", "b1293", "b1294", "b1295", "b1296", "b1297", "b1298", "b1299", "b1300", "b1301", "b1302", "b1303", "b1304", "b1305", "b1306", "b1307", "b1308", "b1309", "b1310", "b1311", "b1312"]
---

## 2.3.9 Mixtures of Gaussians

While the Gaussian distribution has some important analytical properties, it suffers from significant limitations when it comes to modelling real data sets. Consider the example shown in Figure 2.21. This is known as the ‘Old Faithful’ data set, and comprises 272 measurements of the eruption of the Old Faithful geyser at Yellowstone National Park in the USA. Each measurement comprises the duration of the eruption in minutes (horizontal axis) and the time in minutes to the next eruption (vertical axis). We see that the data set forms two dominant clumps, and that a simple Gaussian distribution is unable to capture this structure, whereas a linear superposition of two Gaussians gives a better characterization of the data set.

Figure 2.22 Example of a Gaussian mixture distribution in one dimension showing three Gaussians (each scaled by a coefficient) in blue and their sum in red.

![image](images/part-001--e86e3ff91e6dce8078060084796468a445d03b5b4ab4ed85af17a76cf96ed910.jpg)

Such superpositions, formed by taking linear combinations of more basic distributions such as Gaussians, can be formulated as probabilistic models known as mixture distributions (McLachlan and Basford, 1988; McLachlan and Peel, 2000). In Figure 2.22 we see that a linear combination of Gaussians can give rise to very complex densities. By using a sufficient number of Gaussians, and by adjusting their means and covariances as well as the coefficients in the linear combination, almost any continuous density can be approximated to arbitrary accuracy.

We therefore consider a superposition of K Gaussian densities of the form

p (\mathbf {x}) = \sum_ {k = 1} ^ {K} \pi_ {k} \mathcal {N} (\mathbf {x} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Sigma} _ {k})\tag{2.188}

which is called a mixture of Gaussians. Each Gaussian density $\mathcal { N } ( { \bf x } | \mu _ { k } , \Sigma _ { k } )$ is called a component of the mixture and has its own mean $\mu _ { k }$ and covariance $\Sigma _ { k }$ Contour and surface plots for a Gaussian mixture having 3 components are shown in Figure 2.23.

In this section we shall consider Gaussian components to illustrate the framework of mixture models. More generally, mixture models can comprise linear combinations of other distributions. For instance, in Section 9.3.3 we shall consider mixtures of Bernoulli distributions as an example of a mixture model for discrete variables.

The parameters $\pi _ { k }$ in (2.188) are called mixing coefficients. If we integrate both sides of (2.188) with respect to x, and note that both $p ( \mathbf { x } )$ and the individual Gaussian components are normalized, we obtain

\sum_ {k = 1} ^ {K} \pi_ {k} = 1.\tag{2.189}

Also, the requirement that $p ( \mathbf { x } ) \geqslant 0$ , together with $\mathcal { N } ( { \bf x } | \pmb { \mu } _ { k } , \pmb { \Sigma } _ { k } ) \geqslant 0$ , implies $\pi _ { k } \geqslant 0$ for all k. Combining this with the condition (2.189) we obtain

0 \leqslant \pi_ {k} \leqslant 1.\tag{2.190}

![image](images/part-001--94fb6bfb54da5d22caf1e11e1ff4387297dc446db815da3193008874cbc74478.jpg)

![image](images/part-001--11cec7ae7e0efddf04c8a804e119c0d33b5c36066503467706853c003655e9b4.jpg)

![image](images/part-001--ba7e815f452c8f6c5192512edfb51952e7ce8624cb95da8858a52fdbc03d6b4b.jpg)

Figure 2.23 Illustration of a mixture of 3 Gaussians in a two-dimensional space. (a) Contours of constant density for each of the mixture components, in which the 3 components are denoted red, blue and green, and the values of the mixing coefficients are shown below each component. (b) Contours of the marginal probability density $p ( \mathbf { x } )$ of the mixture distribution. (c) A surface plot of the distribution $p ( \mathbf { x } )$

We therefore see that the mixing coefficients satisfy the requirements to be probabilities.

From the sum and product rules, the marginal density is given by

p (\mathbf {x}) = \sum_ {k = 1} ^ {K} p (k) p (\mathbf {x} | k)\tag{2.191}

which is equivalent to (2.188) in which we can view $\pi _ { k } = p ( k )$ as the prior prob ability of picking the $k ^ { \mathrm { t h } }$ component, and the density $\mathcal { N } ( { \bf x } | \mu _ { k } , \Sigma _ { k } ) = p ( { \bf x } | k )$ as the probability of x conditioned on k. As we shall see in later chapters, an important role is played by the posterior probabilities $p ( k | \mathbf { x } )$ , which are also known as responsibilities. From Bayes’ theorem these are given by

\begin{array}{r c l} \gamma_ {k} (\mathbf {x}) & \equiv & p (k | \mathbf {x}) \\ & = & \frac {p (k) p (\mathbf {x} | k)}{\sum_ {l} p (l) p (\mathbf {x} | l)} \\ & = & \frac {\pi_ {k} \mathcal {N} (\mathbf {x} | \boldsymbol {\mu} _ {k} , \boldsymbol {\Sigma} _ {k})}{\sum_ {l} \pi_ {l} \mathcal {N} (\mathbf {x} | \boldsymbol {\mu} _ {l} , \boldsymbol {\Sigma} _ {l})}. \end{array}\tag{2.192}

We shall discuss the probabilistic interpretation of the mixture distribution in greater detail in Chapter 9.

The form of the Gaussian mixture distribution is governed by the parameters $\pi _ { i }$ $\pmb { \mu }$ and Σ, where we have used the notation $\pi \equiv \{ \pi _ { 1 } , . . . , \pi _ { K } \} , \mu \equiv \{ \pmb { \mu } _ { 1 } , . . . , \pmb { \mu } _ { K } \}$ and $\pmb { \Sigma } \equiv \{ \pmb { \Sigma } _ { 1 } , \ldots \pmb { \Sigma } _ { K } \}$ . One way to set the values of these parameters is to use maximum likelihood. From (2.188) the log of the likelihood function is given by

\ln p (\mathbf {X} | \boldsymbol {\pi}, \boldsymbol {\mu}, \boldsymbol {\Sigma}) = \sum_ {n = 1} ^ {N} \ln \left\{\sum_ {k = 1} ^ {K} \pi_ {k} \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Sigma} _ {k}) \right\}\tag{2.193}

where $\mathbf { X } ~ = ~ \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ We immediately see that the situation is now much more complex than with a single Gaussian, due to the presence of the summation over k inside the logarithm. As a result, the maximum likelihood solution for the parameters no longer has a closed-form analytical solution. One approach to maximizing the likelihood function is to use iterative numerical optimization techniques (Fletcher, 1987; Nocedal and Wright, 1999; Bishop and Nabney, 2008). Alternatively we can employ a powerful framework called expectation maximization, which will be discussed at length in Chapter 9.
