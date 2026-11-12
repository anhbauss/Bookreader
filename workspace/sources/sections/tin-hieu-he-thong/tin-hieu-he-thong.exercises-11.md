---
id: "tin-hieu-he-thong.exercises-11"
doc_id: "tin-hieu-he-thong"
title: "Exercises"
level: 2
heading_path: ["Approximate Inference", "Exercises"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-7-2-expectation-propagation-on-graphs"
next_id: "tin-hieu-he-thong.11"
block_ids: ["b5729", "b5730", "b5731", "b5732", "b5733", "b5734", "b5735", "b5736", "b5737", "b5738", "b5739", "b5740", "b5741", "b5742", "b5743", "b5744", "b5745", "b5746", "b5747", "b5748", "b5749", "b5750", "b5751", "b5752", "b5753", "b5754", "b5755", "b5756", "b5757", "b5758", "b5759", "b5760", "b5761", "b5762", "b5763", "b5764", "b5765", "b5766", "b5767", "b5768", "b5769", "b5770", "b5771", "b5772", "b5773", "b5774", "b5775", "b5776"]
---

## Exercises

10.1 () www Verify that the log marginal distribution of the observed data ln $p ( \mathbf { X } )$ can be decomposed into two terms in the form (10.2) where $\mathcal { L } ( q )$ is given by (10.3) and $\mathrm { K L } ( q \| p )$ is given by (10.4).

10.2 () Use the properties $\mathbb { E } [ z _ { 1 } ] = m _ { 1 }$ and $\mathbb { E } [ z _ { 2 } ] = m _ { 2 }$ to solve the simultaneous equations (10.13) and (10.15), and hence show that, provided the original distribution $p ( \mathbf { z } )$ is nonsingular, the unique solution for the means of the factors in the approximation distribution is given by $\mathbb { E } [ z _ { 1 } ] = \mu _ { 1 }$ and $\mathbb { E } [ z _ { 2 } ] = \mu _ { 2 }$

10.3 ( ) www Consider a factorized variational distribution $q ( \mathbf { Z } )$ of the form (10.5). By using the technique of Lagrange multipliers, verify that minimization of the Kullback-Leibler divergence $\mathrm { K L } ( p \Vert q )$ with respect to one of the factors $q _ { i } ( \mathbf { Z } _ { i } )$ keeping all other factors fixed, leads to the solution (10.17).

10.4 ( ) Suppose that $p ( \mathbf { x } )$ is some fixed distribution and that we wish to approximate it using a Gaussian distribution $q ( \mathbf { x } ) = \mathcal { N } ( \mathbf { x } | \boldsymbol { \mu } , \Sigma )$ . By writing down the form of the KL divergence $\mathrm { K L } ( p | | q )$ for a Gaussian $q ( \mathbf { x } )$ and then differentiating, show that minimization of $\mathrm { K L } ( p | | q )$ with respect to $\pmb { \mu }$ and $\pmb { \Sigma }$ leads to the result that $\pmb { \mu }$ is given by the expectation of x under $p ( \mathbf { x } )$ and that Σ is given by the covariance.

10.5 ( ) www Consider a model in which the set of all hidden stochastic variables, denoted collectively by $\mathbf { Z } ,$ comprises some latent variables z together with some model parameters $\pmb { \theta } .$ Suppose we use a variational distribution that factorizes between latent variables and parameters so that $q ( \mathbf { z } , \pmb { \theta } ) = q _ { \mathbf { z } } ( \mathbf { z } ) q _ { \pmb { \theta } } ( \pmb { \theta } )$ , in which the distribution $q _ { \pmb { \theta } } ( \pmb { \theta } )$ is approximated by a point estimate of the form ${ q } _ { \pmb { \theta } } ( \pmb { \theta } ) = \delta ( \pmb { \theta } - \pmb { \theta } _ { 0 } )$ where $\theta _ { 0 }$ is a vector of free parameters. Show that variational optimization of this factorized distribution is equivalent to an EM algorithm, in which the E step optimizes $q _ { \mathbf { z } } ( \mathbf { z } )$ and the M step maximizes the expected complete-data log posterior distribution of θ with respect to $\theta _ { 0 }$

10.6 ( ) The alpha family of divergences is defined by (10.19). Show that the Kullback-Leibler divergence $\mathrm { K L } ( p \Vert q )$ corresponds to $\alpha  1$ . This can be done by writing $p ^ { \epsilon } = \exp ( \epsilon \ln p ) = 1 + \epsilon \ln p + O ( \epsilon ^ { 2 } )$ and then taking $\epsilon  0$ . Similarly show that $\mathrm { K L } ( q \| p )$ corresponds to $\alpha  - 1$

10.7 ( ) Consider the problem of inferring the mean and precision of a univariate Gaussian using a factorized variational approximation, as considered in Section 10.1.3. Show that the factor $q _ { \mu } ( \mu )$ is a Gaussian of the form $\mathcal { N } ( \mu \vert \mu _ { N } , \lambda _ { N } ^ { - 1 } )$ with mean and precision given by (10.26) and (10.27), respectively. Similarly show that the factor $q _ { \tau } ( \tau )$ is a gamma distribution of the form ${ \mathrm { G a m } } ( \tau | a _ { N } , b _ { N } )$ with parameters given by (10.29) and (10.30).

10.8 () Consider the variational posterior distribution for the precision of a univariate Gaussian whose parameters are given by (10.29) and (10.30). By using the standard results for the mean and variance of the gamma distribution given by (B.27) and (B.28), show that if we let $N  \infty$ , this variational posterior distribution has a mean given by the inverse of the maximum likelihood estimator for the variance of the data, and a variance that goes to zero.

10.9 ( ) By making use of the standard result $\mathbb { E } [ \tau ] = a _ { N } / b _ { N }$ for the mean of a gamma distribution, together with (10.26), (10.27), (10.29), and (10.30), derive the result (10.33) for the reciprocal of the expected precision in the factorized variational treatment of a univariate Gaussian.

10.10 () www Derive the decomposition given by (10.34) that is used to find approximate posterior distributions over models using variational inference.

10.11 ( ) www By using a Lagrange multiplier to enforce the normalization constraint on the distribution $q ( m )$ , show that the maximum of the lower bound (10.35) is given by (10.36).

10.12 ( ) Starting from the joint distribution (10.41), and applying the general result (10.9), show that the optimal variational distribution $q ^ { \star } ( \mathbf { Z } )$ over the latent variables for the Bayesian mixture of Gaussians is given by (10.48) by verifying the steps given in the text.

10.13 ( ) www Starting from (10.54), derive the result (10.59) for the optimum variational posterior distribution over $\mu _ { k }$ and $\mathbf { \Lambda } _ { \Lambda _ { k } }$ in the Bayesian mixture of Gaussians, and hence verify the expressions for the parameters of this distribution given by (10.60)–(10.63).

10.14 ( ) Using the distribution (10.59), verify the result (10.64).

10.15 () Using the result (B.17), show that the expected value of the mixing coefficients in the variational mixture of Gaussians is given by (10.69).

10.16 ( ) www Verify the results (10.71) and (10.72) for the first two terms in the lower bound for the variational Gaussian mixture model given by (10.70).

10.17 (  ) Verify the results (10.73)–(10.77) for the remaining terms in the lower bound for the variational Gaussian mixture model given by (10.70).

10.18 (  ) In this exercise, we shall derive the variational re-estimation equations for the Gaussian mixture model by direct differentiation of the lower bound. To do this we assume that the variational distribution has the factorization defined by (10.42) and (10.55) with factors given by (10.48), (10.57), and (10.59). Substitute these into (10.70) and hence obtain the lower bound as a function of the parameters of the variational distribution. Then, by maximizing the bound with respect to these parameters, derive the re-estimation equations for the factors in the variational distribution, and show that these are the same as those obtained in Section 10.2.1.

10.19 ( ) Derive the result (10.81) for the predictive distribution in the variational treatment of the Bayesian mixture of Gaussians model.

10.20 ( ) www This exercise explores the variational Bayes solution for the mixture of Gaussians model when the size N of the data set is large and shows that it reduces (as we would expect) to the maximum likelihood solution based on EM derived in Chapter 9. Note that results from Appendix B may be used to help answer this exercise. First show that the posterior distribution $q ^ { \star } ( \Lambda _ { k } )$ of the precisions becomes sharply peaked around the maximum likelihood solution. Do the same for the posterior distribution of the means $q ^ { \star } ( \pmb { \mu } _ { k } | \pmb { \Lambda } _ { k } )$ . Next consider the posterior distribution $q ^ { \star } ( \pi )$ for the mixing coefficients and show that this too becomes sharply peaked around the maximum likelihood solution. Similarly, show that the responsibilities become equal to the corresponding maximum likelihood values for large N, by making use of the following asymptotic result for the digamma function for large x

\psi (x) = \ln x + O \left(1 / x\right).\tag{10.241}

Finally, by making use of (10.80), show that for large N, the predictive distribution becomes a mixture of Gaussians.

10.21 () Show that the number of equivalent parameter settings due to interchange symmetries in a mixture model with K components is K!.

10.22 ( ) We have seen that each mode of the posterior distribution in a Gaussian mixture model is a member of a family of K! equivalent modes. Suppose that the result of running the variational inference algorithm is an approximate posterior distribution $q$ that is localized in the neighbourhood of one of the modes. We can then approximate the full posterior distribution as a mixture of $K !$ such $q$ distributions, once centred on each mode and having equal mixing coefficients. Show that if we assume negligible overlap between the components of the $q$ mixture, the resulting lower bound differs from that for a single component $q$ distribution through the addition of an extra term ln $K !$

10.23 ( ) www Consider a variational Gaussian mixture model in which there is no prior distribution over mixing coefficients $\{ \pi _ { k } \}$ . Instead, the mixing coefficients are treated as parameters, whose values are to be found by maximizing the variational lower bound on the log marginal likelihood. Show that maximizing this lower bound with respect to the mixing coefficients, using a Lagrange multiplier to enforce the constraint that the mixing coefficients sum to one, leads to the re-estimation result (10.83). Note that there is no need to consider all of the terms in the lower bound but only the dependence of the bound on the $\{ \pi _ { k } \}$

10.24 ( ) www We have seen in Section 10.2 that the singularities arising in the maximum likelihood treatment of Gaussian mixture models do not arise in a Bayesian treatment. Discuss whether such singularities would arise if the Bayesian model were solved using maximum posterior (MAP) estimation.

10.25 ( ) The variational treatment of the Bayesian mixture of Gaussians, discussed in Section 10.2, made use of a factorized approximation (10.5) to the posterior distribution. As we saw in Figure 10.2, the factorized assumption causes the variance of the posterior distribution to be under-estimated for certain directions in parameter space. Discuss qualitatively the effect this will have on the variational approximation to the model evidence, and how this effect will vary with the number of components in the mixture. Hence explain whether the variational Gaussian mixture will tend to under-estimate or over-estimate the optimal number of components.

10.26 (  ) Extend the variational treatment of Bayesian linear regression to include a gamma hyperprior Gam $( \beta | c _ { 0 } , d _ { 0 } )$ over $\beta$ and solve variationally, by assuming a factorized variational distribution of the form $q ( \mathbf { w } ) q ( \alpha ) q ( \beta )$ . Derive the variational update equations for the three factors in the variational distribution and also obtain an expression for the lower bound and for the predictive distribution.

10.27 ( ) By making use of the formulae given in Appendix B show that the variational lower bound for the linear basis function regression model, defined by (10.107), can be written in the form (10.107) with the various terms defined by (10.108)–(10.112).

10.28 (  ) Rewrite the model for the Bayesian mixture of Gaussians, introduced in Section 10.2, as a conjugate model from the exponential family, as discussed in Section 10.4. Hence use the general results (10.115) and (10.119) to derive the specific results (10.48), (10.57), and (10.59).

10.29 () www Show that the function $f ( x ) = \ln ( x )$ is concave for $0 < x < \infty$ by computing its second derivative. Determine the form of the dual function $g ( \lambda )$ defined by (10.133), and verify that minimization of $\lambda x - g ( \lambda )$ with respect to λ according to (10.132) indeed recovers the function ln(x).

10.30 () By evaluating the second derivative, show that the log logistic function $f ( x ) =$ $- \ln ( 1 + e ^ { - x } )$ is concave. Derive the variational upper bound (10.137) directly by making a second order Taylor expansion of the log logistic function around a point $x = \xi$

10.31 ( ) By finding the second derivative with respect to x, show that the function $f ( x ) = { \dot { - } } \ln ( e ^ { x { \mathord { \left/ { \vphantom { \mathrm { 1 2 } } } \right. \kern - delimiterspace } 2 } } + e ^ { - x / 2 } )$ is a concave function of $x .$ Now consider the second derivatives with respect to the variable $x ^ { 2 }$ and hence show that it is a convex function of $x ^ { 2 }$ . Plot graphs of $f ( x )$ against x and against $x ^ { 2 }$ . Derive the lower bound (10.144) on the logistic sigmoid function directly by making a first order Taylor series expansion of the function $f ( x )$ in the variable $x ^ { \mathrm { 2 } }$ centred on the value $\xi ^ { 2 }$

10.32 ( ) www Consider the variational treatment of logistic regression with sequential learning in which data points are arriving one at a time and each must be processed and discarded before the next data point arrives. Show that a Gaussian approximation to the posterior distribution can be maintained through the use of the lower bound (10.151), in which the distribution is initialized using the prior, and as each data point is absorbed its corresponding variational parameter $\xi _ { n }$ is optimized.

10.33 () By differentiating the quantity $Q ( \xi , \xi ^ { \mathrm { o l d } } )$ defined by (10.161) with respect to the variational parameter $\xi _ { n }$ show that the update equation for $\xi _ { n }$ for the Bayesian logistic regression model is given by (10.163).

10.34 ( ) In this exercise we derive re-estimation equations for the variational parameters $\boldsymbol { \xi }$ in the Bayesian logistic regression model of Section 4.5 by direct maximization of the lower bound given by (10.164). To do this set the derivative of $\mathcal { L } ( \pmb { \xi } )$ with respect to $\xi _ { n }$ equal to zero, making use of the result (3.117) for the derivative of the log of a determinant, together with the expressions (10.157) and (10.158) which define the mean and covariance of the variational posterior distribution $q ( \mathbf { w } )$

10.35 ( ) Derive the result (10.164) for the lower bound $\mathcal { L } ( \pmb { \xi } )$ in the variational logistic regression model. This is most easily done by substituting the expressions for the Gaussian prior $q ( \mathbf { w } ) = \mathcal { N } ( \mathbf { w } | \mathbf { m } _ { 0 } , \mathbf { S } _ { 0 } )$ , together with the lower bound $h ( \mathbf { w } , \pmb { \xi } )$ on the likelihood function, into the integral (10.159) which defines $\mathcal { L } ( \pmb { \xi } )$ . Next gather together the terms which depend on w in the exponential and complete the square to give a Gaussian integral, which can then be evaluated by invoking the standard result for the normalization coefficient of a multivariate Gaussian. Finally take the logarithm to obtain (10.164).

10.36 ( ) Consider the ADF approximation scheme discussed in Section 10.7, and show that inclusion of the factor $f _ { j } ( \pmb \theta )$ leads to an update of the model evidence of the form

p _ {j} (\mathcal {D}) \simeq p _ {j - 1} (\mathcal {D}) Z _ {j}\tag{10.242}

where $Z _ { j }$ is the normalization constant defined by (10.197). By applying this result recursively, and initializing with $p _ { 0 } ( \mathcal { D } ) = 1$ , derive the result

p (\mathcal {D}) \simeq \prod_ {j} Z _ {j}.\tag{10.243}

10.37 () www Consider the expectation propagation algorithm from Section 10.7, and suppose that one of the factors $f _ { 0 } ( \pmb { \theta } )$ in the definition (10.188) has the same exponential family functional form as the approximating distribution $q ( \pmb \theta )$ . Show that if the factor $\widetilde { f } _ { 0 } ( \pmb { \theta } )$ is initialized to be $f _ { 0 } ( \pmb { \theta } )$ , then an EP update to refine $\widetilde { f } _ { 0 } ( \pmb { \theta } )$ leaves $\widetilde { f } _ { 0 } ( \pmb { \theta } )$  unchanged. This situation typically arises when one of the factors is the prior $p ( \pmb \theta )$ , and so we see that the prior factor can be incorporated once exactly and does not need to be refined.

10.38 (  ) In this exercise and the next, we shall verify the results (10.214)–(10.224) for the expectation propagation algorithm applied to the clutter problem. Begin by using the division formula (10.205) to derive the expressions (10.214) and (10.215) by completing the square inside the exponential to identify the mean and variance. Also, show that the normalization constant $Z _ { n }$ , defined by (10.206), is given for the clutter problem by (10.216). This can be done by making use of the general result (2.115).

10.39 (  ) Show that the mean and variance of $q ^ { \mathrm { n e w } } ( \pmb { \theta } )$ for EP applied to the clutter problem are given by (10.217) and (10.218). To do this, first prove the following results for the expectations of $\pmb \theta$ and $\boldsymbol { \theta \theta ^ { \mathrm { T } } }$ under $q ^ { \mathrm { n e w } } ( \pmb { \theta } )$

{\mathbb {E} [ \pmb {\theta} ]} = {\mathbf {m} ^ {\backslash n} + v ^ {\backslash n} \nabla_ {\mathbf {m} ^ {\backslash n}} \ln Z _ {n}}\tag{10.244}

\mathbb {E} [ \boldsymbol {\theta} ^ {\mathrm{T}} \boldsymbol {\theta} ] = 2 (v ^ {\backslash n}) ^ {2} \nabla_ {v ^ {\backslash n}} \ln Z _ {n} + 2 \mathbb {E} [ \boldsymbol {\theta} ] ^ {\mathrm{T}} \mathbf {m} ^ {\backslash n} - \| \mathbf {m} ^ {\backslash n} \| ^ {2}\tag{10.245}

and then make use of the result (10.216) for $Z _ { n }$ . Next, prove the results (10.220)– (10.222) by using (10.207) and completing the square in the exponential. Finally, use (10.208) to derive the result (10.223).
