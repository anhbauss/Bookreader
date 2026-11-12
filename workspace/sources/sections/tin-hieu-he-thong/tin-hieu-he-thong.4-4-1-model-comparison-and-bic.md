---
id: "tin-hieu-he-thong.4-4-1-model-comparison-and-bic"
doc_id: "tin-hieu-he-thong"
title: "4.4.1 Model comparison and BIC"
level: 2
heading_path: ["4 Linear Models for Classification", "4.4.1 Model comparison and BIC"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-4-the-laplace-approximation"
next_id: "tin-hieu-he-thong.4-5-bayesian-logistic-regression"
block_ids: ["b2483", "b2484", "b2485", "b2486", "b2487", "b2488", "b2489", "b2490", "b2491", "b2492", "b2493", "b2494", "b2495", "b2496", "b2497", "b2498"]
---

## 4.4.1 Model comparison and BIC

As well as approximating the distribution $p ( \mathbf { z } )$ we can also obtain an approxi mation to the normalization constant Z. Using the approximation (4.133) we have

\begin{array}{r c l} Z & = & \int f (\mathbf {z}) \mathrm{d} \mathbf {z} \\ & \simeq & f (\mathbf {z} _ {0}) \int \exp \left\{- \frac {1}{2} (\mathbf {z} - \mathbf {z} _ {0}) ^ {\mathrm{T}} \mathbf {A} (\mathbf {z} - \mathbf {z} _ {0}) \right\} \mathrm{d} \mathbf {z} \\ & = & f (\mathbf {z} _ {0}) \frac {(2 \pi) ^ {M / 2}}{| \mathbf {A} | ^ {1 / 2}} \end{array}\tag{4.135}

where we have noted that the integrand is Gaussian and made use of the standard result (2.43) for a normalized Gaussian distribution. We can use the result (4.135) to obtain an approximation to the model evidence which, as discussed in Section 3.4, plays a central role in Bayesian model comparison.

Consider a data set $\mathcal { D }$ and a set of models $\{ \mathcal { M } _ { i } \}$ having parameters $\{ \pmb \theta _ { i } \}$ . For each model we define a likelihood function $p ( \mathcal { D } | \pmb { \theta } _ { i } , \mathcal { M } _ { i } )$ . If we introduce a prior $p ( \pmb \theta _ { i } | \mathcal { M } _ { i } )$ over the parameters, then we are interested in computing the model evidence $p ( \mathcal { D } | \mathcal { M } _ { i } )$ for the various models. From now on we omit the conditioning on $\mathcal { M } _ { i }$ to keep the notation uncluttered. From Bayes’ theorem the model evidence is given by

p (\mathcal {D}) = \int p (\mathcal {D} | \boldsymbol {\theta}) p (\boldsymbol {\theta}) \mathrm{d} \boldsymbol {\theta}.\tag{4.136}

Identifying $f ( \pmb \theta ) = p ( \mathcal { D } | \pmb \theta ) p ( \pmb \theta )$ and $Z = p ( { \mathcal { D } } )$ , and applying the result (4.135), we obtain

\ln p (\mathcal {D}) \simeq \ln p (\mathcal {D} | \boldsymbol {\theta} _ {\mathrm{MAP}}) + \underbrace {\ln p (\boldsymbol {\theta} _ {\mathrm{MAP}}) + \frac {M}{2} \ln (2 \pi) - \frac {1}{2} \ln | \mathbf {A} |}\tag{4.137}

)*Occam factor

where $\theta _ { \mathrm { M A P } }$ is the value of θ at the mode of the posterior distribution, and A is the Hessian matrix of second derivatives of the negative log posterior

\mathbf {A} = - \nabla \nabla \ln p (\mathcal {D} | \boldsymbol {\theta} _ {\mathrm{MAP}}) p (\boldsymbol {\theta} _ {\mathrm{MAP}}) = - \nabla \nabla \ln p (\boldsymbol {\theta} _ {\mathrm{MAP}} | \mathcal {D}).\tag{4.138}

The first term on the right hand side of (4.137) represents the log likelihood evaluated using the optimized parameters, while the remaining three terms comprise the ‘Occam factor’ which penalizes model complexity.

If we assume that the Gaussian prior distribution over parameters is broad, and that the Hessian has full rank, then we can approximate (4.137) very roughly using

\ln p (\mathcal {D}) \simeq \ln p (\mathcal {D} | \pmb {\theta} _ {\mathrm{MAP}}) - \frac {1}{2} M \ln N\tag{4.139}

where N is the number of data points, M is the number of parameters in θ and we have omitted additive constants. This is known as the Bayesian Information Criterion (BIC) or the Schwarz criterion (Schwarz, 1978). Note that, compared to AIC given by (1.73), this penalizes model complexity more heavily.

Complexity measures such as AIC and BIC have the virtue of being easy to evaluate, but can also give misleading results. In particular, the assumption that the Hessian matrix has full rank is often not valid since many of the parameters are not ‘well-determined’. We can use the result (4.137) to obtain a more accurate estimate of the model evidence starting from the Laplace approximation, as we illustrate in the context of neural networks in Section 5.7.
