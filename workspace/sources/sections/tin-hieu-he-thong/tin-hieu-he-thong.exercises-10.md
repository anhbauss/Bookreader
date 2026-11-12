---
id: "tin-hieu-he-thong.exercises-10"
doc_id: "tin-hieu-he-thong"
title: "Exercises"
level: 2
heading_path: ["Mixture Models and EM", "Exercises"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.9-4-the-em-algorithm-in-general"
next_id: "tin-hieu-he-thong.approximate-inference"
block_ids: ["b5008", "b5009", "b5010", "b5011", "b5012", "b5013", "b5014", "b5015", "b5016", "b5017", "b5018", "b5019", "b5020", "b5021", "b5022", "b5023", "b5024", "b5025", "b5026", "b5027", "b5028", "b5029", "b5030", "b5031", "b5032", "b5033", "b5034", "b5035", "b5036", "b5037", "b5038", "b5039", "b5040", "b5041", "b5042", "b5043", "b5044", "b5045", "b5046"]
---

## Exercises

9.1 () www Consider the K-means algorithm discussed in Section 9.1. Show that as a consequence of there being a finite number of possible assignments for the set of discrete indicator variables $r _ { n k }$ , and that for each such assignment there is a unique optimum for the $\{ \mu _ { k } \}$ , the K-means algorithm must converge after a finite number of iterations.

9.2 () Apply the Robbins-Monro sequential estimation procedure described in Section 2.3.5 to the problem of finding the roots of the regression function given by the derivatives of J in (9.1) with respect to $\mu _ { k }$ . Show that this leads to a stochastic K-means algorithm in which, for each data point ${ \bf x } _ { n }$ , the nearest prototype $\pmb { \mu } _ { k }$ is updated using (9.5).

9.3 () www Consider a Gaussian mixture model in which the marginal distribution $p ( \mathbf { z } )$ for the latent variable is given by (9.10), and the conditional distribution $p ( \mathbf { x } | \mathbf { z } )$ for the observed variable is given by (9.11). Show that the marginal distribution $p ( \mathbf { x } )$ , obtained by summing $p ( \mathbf { z } ) p ( \mathbf { x } | \mathbf { z } )$ over all possible values of z, is a Gaussian mixture of the form (9.7).

9.4 () Suppose we wish to use the EM algorithm to maximize the posterior distribution over parameters $p ( \pmb \theta | \mathbf X )$ for a model containing latent variables, where X is the observed data set. Show that the E step remains the same as in the maximum likelihood case, whereas in the M step the quantity to be maximized is given by $\mathcal { Q } ( \pmb { \theta } , \pmb { \theta } ^ { \mathrm { o l d } } ) + \ln p ( \pmb { \theta } )$ where $\mathcal { Q } ( \theta , \theta ^ { \mathrm { o l d } } )$ is defined by (9.30).

9.5 () Consider the directed graph for a Gaussian mixture model shown in Figure 9.6. By making use of the d-separation criterion discussed in Section 8.2, show that the posterior distribution of the latent variables factorizes with respect to the different data points so that

p (\mathbf {Z} | \mathbf {X}, \boldsymbol {\mu}, \boldsymbol {\Sigma}, \boldsymbol {\pi}) = \prod_ {n = 1} ^ {N} p (\mathbf {z} _ {n} | \mathbf {x} _ {n}, \boldsymbol {\mu}, \boldsymbol {\Sigma}, \boldsymbol {\pi}).\tag{9.80}

9.6 ( ) Consider a special case of a Gaussian mixture model in which the covariance matrices $\Sigma _ { k }$ of the components are all constrained to have a common value Σ. Derive the EM equations for maximizing the likelihood function under such a model.

9.7 () www Verify that maximization of the complete-data log likelihood (9.36) for a Gaussian mixture model leads to the result that the means and covariances of each component are fitted independently to the corresponding group of data points, and the mixing coefficients are given by the fractions of points in each group.

9.8 () www Show that if we maximize (9.40) with respect to $\pmb { \mu } _ { k }$ while keeping the responsibilities $\gamma ( z _ { n k } )$ fixed, we obtain the closed form solution given by (9.17).

9.9 () Show that if we maximize (9.40) with respect to $\Sigma _ { k }$ and $\pi _ { k }$ while keeping the responsibilities $\gamma ( z _ { n k } )$ fixed, we obtain the closed form solutions given by (9.19) and (9.22).

9.10 ( ) Consider a density model given by a mixture distribution

p (\mathbf {x}) = \sum_ {k = 1} ^ {K} \pi_ {k} p (\mathbf {x} | k)\tag{9.81}

and suppose that we partition the vector x into two parts so that $\mathbf { x } ~ = ~ \left( \mathbf { x } _ { a } , \mathbf { x } _ { b } \right)$ Show that the conditional density $p ( \mathbf { x } _ { b } | \mathbf { x } _ { a } )$ is itself a mixture distribution and find expressions for the mixing coefficients and for the component densities.

9.11 () In Section 9.3.2, we obtained a relationship between K means and EM for Gaussian mixtures by considering a mixture model in which all components have covariance I. Show that in the limit $\epsilon  0$ , maximizing the expected completedata log likelihood for this model, given by (9.40), is equivalent to minimizing the distortion measure J for the K-means algorithm given by (9.1).

9.12 () www Consider a mixture distribution of the form

p (\mathbf {x}) = \sum_ {k = 1} ^ {K} \pi_ {k} p (\mathbf {x} | k)\tag{9.82}

where the elements of x could be discrete or continuous or a combination of these. Denote the mean and covariance of $p ( \mathbf { x } | k )$ by $\mu _ { k }$ and $\Sigma _ { k }$ , respectively. Show that the mean and covariance of the mixture distribution are given by (9.49) and (9.50).

9.13 ( ) Using the re-estimation equations for the EM algorithm, show that a mixture of Bernoulli distributions, with its parameters set to values corresponding to a maximum of the likelihood function, has the property that

\mathbb {E} [ \mathbf {x} ] = \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {x} _ {n} \equiv \overline {{\mathbf {x}}}.\tag{9.83}

Hence show that if the parameters of this model are initialized such that all components have the same mean $\boldsymbol { \mu _ { k } } = \boldsymbol { \widehat { \mu } }$ for $k = 1 , \ldots , K$ , then the EM algorithm will converge after one iteration, for any choice of the initial mixing coefficients, and that this solution has the property $\pmb { \mu } _ { k } = \overline { { \mathbf { x } } } .$ . Note that this represents a degenerate case of the mixture model in which all of the components are identical, and in practice we try to avoid such solutions by using an appropriate initialization.

9.14 () Consider the joint distribution of latent and observed variables for the Bernoulli distribution obtained by forming the product of $p ( \mathbf { x } | \mathbf { z } , \mu )$ given by (9.52) and $p ( \mathbf { z } | \boldsymbol { \pi } )$ given by (9.53). Show that if we marginalize this joint distribution with respect to z, then we obtain (9.47).

9.15 () www Show that if we maximize the expected complete-data log likelihood function (9.55) for a mixture of Bernoulli distributions with respect to $\pmb { \mu } _ { k }$ , we obtain the M step equation (9.59).

9.16 () Show that if we maximize the expected complete-data log likelihood function (9.55) for a mixture of Bernoulli distributions with respect to the mixing coefficients π<sub>k</sub>, using a Lagrange multiplier to enforce the summation constraint, we obtain the M step equation (9.60).

9.17 () www Show that as a consequence of the constraint $0 \leqslant p ( \mathbf x _ { n } | \pmb \mu _ { k } ) \leqslant 1$ for the discrete variable ${ \bf x } _ { n }$ , the incomplete-data log likelihood function for a mixture of Bernoulli distributions is bounded above, and hence that there are no singularities for which the likelihood goes to infinity.

9.18 ( ) Consider a Bernoulli mixture model as discussed in Section 9.3.3, together with a prior distribution $p ( \pmb { \mu } _ { k } | a _ { k } , b _ { k } )$ over each of the parameter vectors $\mu _ { k }$ given by the beta distribution (2.13), and a Dirichlet prior $p ( \pi \vert \alpha )$ given by (2.38). Derive the EM algorithm for maximizing the posterior probability $p ( { \boldsymbol { \mu } } , { \boldsymbol { \pi } } | \mathbf { X } )$

9.19 ( ) Consider a D-dimensional variable x each of whose components i is itself a multinomial variable of degree M so that x is a binary vector with components $x _ { i j }$ where $i = 1 , \ldots , D$ and $j = 1 , \dots , M$ , subject to the constraint that $\begin{array} { r } { \sum _ { j } x _ { i j } = 1 } \end{array}$ for all i. Suppose that the distribution of these variables is described by a mixture of the discrete multinomial distributions considered in Section 2.2 so that

p (\mathbf {x}) = \sum_ {k = 1} ^ {K} \pi_ {k} p (\mathbf {x} | \boldsymbol {\mu} _ {k})\tag{9.84}

where

p (\mathbf {x} | \boldsymbol {\mu} _ {k}) = \prod_ {i = 1} ^ {D} \prod_ {j = 1} ^ {M} \mu_ {k i j} ^ {x _ {i j}}.\tag{9.85}

The parameters $\mu _ { k i j }$ represent the probabilities $p ( x _ { i j } \ = \ 1 | \mu _ { k } )$ and must satisfy $0 \leqslant \mu _ { k i j } \leqslant 1$ together with the constraint $\textstyle \sum _ { j } \mu _ { k i j } = 1$ for all values of k and i. Given an observed data set $\left\{ \mathbf { x } _ { n } \right\}$ , where $n = 1 , \ldots , N$ , derive the E and M step equations of the EM algorithm for optimizing the mixing coefficients $\pi _ { k }$ and the component parameters $\mu _ { k i j }$ of this distribution by maximum likelihood.

9.20 () www Show that maximization of the expected complete-data log likelihood function (9.62) for the Bayesian linear regression model leads to the M step reestimation result (9.63) for α.

9.21 ( ) Using the evidence framework of Section 3.5, derive the M-step re-estimation equations for the parameter $\beta$ in the Bayesian linear regression model, analogous to the result (9.63) for α.

9.22 ( ) By maximization of the expected complete-data log likelihood defined by (9.66), derive the M step equations (9.67) and (9.68) for re-estimating the hyperparameters of the relevance vector machine for regression.

9.23 ( ) www In Section 7.2.1 we used direct maximization of the marginal likelihood to derive the re-estimation equations (7.87) and (7.88) for finding values of the hyperparameters α and $\beta$ for the regression RVM. Similarly, in Section 9.3.4 we used the EM algorithm to maximize the same marginal likelihood, giving the re-estimation equations (9.67) and (9.68). Show that these two sets of re-estimation equations are formally equivalent.

9.24 () Verify the relation (9.70) in which $\mathcal { L } ( q , \theta )$ and $\mathrm { K L } ( q \| p )$ are defined by (9.71) and (9.72), respectively.

9.25 () www Show that the lower bound $\mathcal { L } ( q , \theta )$ given by (9.71), with $q ( \mathbf { Z } ) \ =$ $p ( \mathbf { Z } | \mathbf { X } , \pmb { \theta } ^ { ( \mathrm { o l d } ) } )$ , has the same gradient with respect to $\pmb \theta$ as the log likelihood function ln $p ( \mathbf { X } | \pmb { \theta } )$ at the point $\pmb \theta = \pmb \theta ^ { ( \mathrm { o l d } ) }$

9.26 () www Consider the incremental form of the EM algorithm for a mixture of Gaussians, in which the responsibilities are recomputed only for a specific data point $\mathbf { x } _ { m }$ . Starting from the M-step formulae (9.17) and (9.18), derive the results (9.78) and (9.79) for updating the component means.

9.27 ( ) Derive M-step formulae for updating the covariance matrices and mixing coefficients in a Gaussian mixture model when the responsibilities are updated incrementally, analogous to the result (9.78) for updating the means.
