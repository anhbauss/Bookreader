---
id: "tin-hieu-he-thong.3-5-the-evidence-approximation"
doc_id: "tin-hieu-he-thong"
title: "3.5. The Evidence Approximation"
level: 2
heading_path: ["3 Linear Models for Regression", "3.5. The Evidence Approximation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-4-bayesian-model-comparison"
next_id: "tin-hieu-he-thong.3-5-1-evaluation-of-the-evidence-function"
block_ids: ["b1904", "b1905", "b1906", "b1907", "b1908", "b1909", "b1910", "b1911", "b1912", "b1913", "b1914"]
---

## 3.5. The Evidence Approximation

In a fully Bayesian treatment of the linear basis function model, we would introduce prior distributions over the hyperparameters α and $\beta$ and make predictions by marginalizing with respect to these hyperparameters as well as with respect to the parameters w. However, although we can integrate analytically over either w or over the hyperparameters, the complete marginalization over all of these variables is analytically intractable. Here we discuss an approximation in which we set the hyperparameters to specific values determined by maximizing the marginal likelihood function obtained by first integrating over the parameters w. This framework is known in the statistics literature as empirical Bayes (Bernardo and Smith, 1994; Gelman et al., 2004), or type $^ 2$ maximum likelihood (Berger, 1985), or generalized maximum likelihood (Wahba, 1975), and in the machine learning literature is also called the evidence approximation (Gull, 1989; MacKay, 1992a).

If we introduce hyperpriors over α and $\beta _ { : }$ , the predictive distribution is obtained by marginalizing over w, α and $\beta$ so that

p (t | \mathbf {t}) = \iiint p (t | \mathbf {w}, \beta) p (\mathbf {w} | \mathbf {t}, \alpha , \beta) p (\alpha , \beta | \mathbf {t}) d \mathbf {w} d \alpha d \beta\tag{3.74}

where $p ( t | \mathbf { w } , \beta )$ is given by (3.8) and $p ( \mathbf { w } | \mathbf { t } , \alpha , \beta )$ is given by (3.49) with ${ \bf m } _ { N }$ and $\mathbf { S } _ { N }$ defined by (3.53) and (3.54) respectively. Here we have omitted the dependence on the input variable x to keep the notation uncluttered. If the posterior distribution $p ( \alpha , \beta | \mathbf { t } )$ is sharply peaked around values α and ${ \widehat { \boldsymbol { \beta } } } .$ then the predictive distribution is  obtained simply by marginalizing over w in which α and $\beta$ are fixed to the values $\widehat { \alpha }$ and ${ \widehat { \boldsymbol { \beta } } } ,$ , so that

p (t | \mathbf {t}) \simeq p (t | \mathbf {t}, \widehat {\alpha}, \widehat {\beta}) = \int p (t | \mathbf {w}, \widehat {\beta}) p (\mathbf {w} | \mathbf {t}, \widehat {\alpha}, \widehat {\beta}) d \mathbf {w}.\tag{3.75}

From Bayes’ theorem, the posterior distribution for α and $\beta$ is given by

p (\alpha , \beta | \mathbf {t}) \propto p (\mathbf {t} | \alpha , \beta) p (\alpha , \beta).\tag{3.76}

If the prior is relatively flat, then in the evidence framework the values of $\widehat { \alpha }$ and $\widehat { \beta }$ are obtained by maximizing the marginal likelihood function $p ( \mathbf { t } | \alpha , \beta )$ . We shall proceed by evaluating the marginal likelihood for the linear basis function model and then finding its maxima. This will allow us to determine values for these hyperparameters from the training data alone, without recourse to cross-validation. Recall that the ratio $\alpha / \beta$ is analogous to a regularization parameter.

As an aside it is worth noting that, if we define conjugate (Gamma) prior distributions over $\alpha$ and $\beta ,$ then the marginalization over these hyperparameters in (3.74) can be performed analytically to give a Student’s t-distribution over w (see Section 2.3.7). Although the resulting integral over w is no longer analytically tractable, it might be thought that approximating this integral, for example using the Laplace approximation discussed (Section 4.4) which is based on a local Gaussian approximation centred on the mode of the posterior distribution, might provide a practical alternative to the evidence framework (Buntine and Weigend, 1991). However, the integrand as a function of w typically has a strongly skewed mode so that the Laplace approximation fails to capture the bulk of the probability mass, leading to poorer results than those obtained by maximizing the evidence (MacKay, 1999).

Returning to the evidence framework, we note that there are two approaches that we can take to the maximization of the log evidence. We can evaluate the evidence function analytically and then set its derivative equal to zero to obtain re-estimation equations for $\alpha$ and $\beta _ { : }$ which we shall do in Section 3.5.2. Alternatively we use a technique called the expectation maximization (EM) algorithm, which will be discussed in Section 9.3.4 where we shall also show that these two approaches converge to the same solution.
