---
id: "tin-hieu-he-thong.10-6-2-optimizing-the-variational-parameters"
doc_id: "tin-hieu-he-thong"
title: "10.6.2 Optimizing the variational parameters"
level: 2
heading_path: ["Approximate Inference", "10.6.2 Optimizing the variational parameters"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-6-1-variational-posterior-distribution"
next_id: "tin-hieu-he-thong.10-6-3-inference-of-hyperparameters"
block_ids: ["b5505", "b5506", "b5507", "b5508", "b5509", "b5510", "b5511", "b5512", "b5513", "b5514", "b5515", "b5516", "b5517", "b5518", "b5519", "b5520", "b5521", "b5522", "b5523", "b5524", "b5525", "b5526", "b5527"]
---

## 10.6.2 Optimizing the variational parameters

We now have a normalized Gaussian approximation to the posterior distribution, which we shall use shortly to evaluate the predictive distribution for new data points. First, however, we need to determine the variational parameters $\{ \xi _ { n } \}$ by maximizing the lower bound on the marginal likelihood.

To do this, we substitute the inequality (10.152) back into the marginal likelihood to give

\ln p (\mathbf {t}) = \ln \int p (\mathbf {t} | \mathbf {w}) p (\mathbf {w}) \mathrm{d} \mathbf {w} \geqslant \ln \int h (\mathbf {w}, \boldsymbol {\xi}) p (\mathbf {w}) \mathrm{d} \mathbf {w} = \mathcal {L} (\boldsymbol {\xi}).\tag{10.159}

As with the optimization of the hyperparameter α in the linear regression model of Section 3.5, there are two approaches to determining the $\xi _ { n }$ . In the first approach, we recognize that the function $\mathcal { L } ( \pmb { \xi } )$ is defined by an integration over w and so we can view w as a latent variable and invoke the EM algorithm. In the second approach, we integrate over w analytically and then perform a direct maximization over $\boldsymbol { \xi }$ . Let us begin by considering the EM approach.

The EM algorithm starts by choosing some initial values for the parameters $\{ \xi _ { n } \}$ , which we denote collectively by $\dot { \xi } ^ { \mathrm { { o l d } } }$ . In the E step of the EM algorithm, we then use these parameter values to find the posterior distribution over w, which is given by (10.156). In the M step, we then maximize the expected complete-data log likelihood which is given by

Q (\pmb {\xi}, \pmb {\xi} ^ {\mathrm{old}}) = \mathbb {E} \left[ \ln h (\mathbf {w}, \pmb {\xi}) p (\mathbf {w}) \right]\tag{10.160}

where the expectation is taken with respect to the posterior distribution $q ( \mathbf { w } )$ evaluated using $\pmb { \xi } ^ { \mathrm { o l d } }$ . Noting that $p ( \mathbf { w } )$ does not depend on $\xi ,$ , and substituting for $h ( \mathbf { w } , \pmb { \xi } )$ we obtain

Q (\boldsymbol {\xi}, \boldsymbol {\xi} ^ {\text { old }}) = \sum_ {n = 1} ^ {N} \left\{\ln \sigma (\xi_ {n}) - \xi_ {n} / 2 - \lambda (\xi_ {n}) (\phi_ {n} ^ {\mathrm{T}} \mathbb {E} [ \mathbf {w w} ^ {\mathrm{T}} ] \phi_ {n} - \xi_ {n} ^ {2}) \right\} + \text { const }\tag{10.161}

where ‘const’ denotes terms that are independent of ${ \bf \dot { \xi } }$ . We now set the derivative with respect to $\xi _ { n }$ equal to zero. A few lines of algebra, making use of the definitions of $\sigma ( \boldsymbol { \xi } )$ and $\lambda ( \xi )$ , then gives

0 = \lambda^ {\prime} (\xi_ {n}) (\phi_ {n} ^ {\mathrm{T}} \mathbb {E} [ \mathbf {w w} ^ {\mathrm{T}} ] \phi_ {n} - \xi_ {n} ^ {2}).\tag{10.162}

We now note that $\lambda ^ { \prime } ( \xi )$ is a monotonic function of $\xi$ for $\xi \geqslant 0$ , and that we can restrict attention to nonnegative values of $\xi$ without loss of generality due to the symmetry of the bound around $\xi = 0$ . Thus $\lambda ^ { \prime } ( \xi ) \neq 0$ , and hence we obtain the following re-estimation equations

(\xi_ {n} ^ {\mathrm{new}}) ^ {2} = \phi_ {n} ^ {\mathrm{T}} \mathbb {E} [ \mathbf {w w} ^ {\mathrm{T}} ] \phi_ {n} = \phi_ {n} ^ {\mathrm{T}} (\mathbf {S} _ {N} + \mathbf {m} _ {N} \mathbf {m} _ {N} ^ {\mathrm{T}}) \phi_ {n}\tag{10.163}

where we have used (10.156).

Let us summarize the EM algorithm for finding the variational posterior distribution. We first initialize the variational parameters $\boldsymbol { \xi } ^ { \mathrm { { o l d } } }$ . In the E step, we evaluate the posterior distribution over w given by (10.156), in which the mean and covariance are defined by (10.157) and (10.158). In the M step, we then use this variational posterior to compute a new value for $\boldsymbol { \xi }$ given by (10.163). The E and M steps are repeated until a suitable convergence criterion is satisfied, which in practice typically requires only a few iterations.

An alternative approach to obtaining re-estimation equations for $\boldsymbol { \xi }$ is to note that in the integral over w in the definition (10.159) of the lower bound $\mathcal { L } ( \pmb { \xi } )$ , the integrand has a Gaussian-like form and so the integral can be evaluated analytically. Having evaluated the integral, we can then differentiate with respect to $\xi _ { n }$ . It turns out that this gives rise to exactly the same re-estimation equations as does the EM approach given by (10.163).

As we have emphasized already, in the application of variational methods it is useful to be able to evaluate the lower bound $\mathcal { L } ( \pmb { \xi } )$ given by (10.159). The integration over w can be performed analytically by noting that $p ( \mathbf { w } )$ is Gaussian and $h ( \mathbf { w } , \pmb { \xi } )$ is the exponential of a quadratic function of $\mathbf { w }$ . Thus, by completing the square and making use of the standard result for the normalization coefficient of a Gaussian distribution, we can obtain a closed form solution which takes the form

![image](images/part-003--5d518c2fa238d27ecb727477ace9529b4b5326cda2a68c5df1e8f408968a0de2.jpg)

![image](images/part-003--fc6e808395c68bdb581dcb9e7312ca36e25ae15dd1e9ce1e994e844febccdd52.jpg)

Figure 10.13 Illustration of the Bayesian approach to logistic regression for a simple linearly separable data set. The plot on the left shows the predictive distribution obtained using variational inference. We see that the decision boundary lies roughly mid way between the clusters of data points, and that the contours of the predictive distribution splay out away from the data reflecting the greater uncertainty in the classification of such regions. The plot on the right shows the decision boundaries corresponding to five samples of the parameter vector w drawn from the posterior distribution $p ( \mathbf { w } | \mathbf { t } )$

\begin{array}{r c l} \mathcal {L} (\pmb {\xi}) & = & \frac {1}{2} \ln \frac {| \mathbf {S} _ {N} |}{| \mathbf {S} _ {0} |} - \frac {1}{2} \mathbf {m} _ {N} ^ {\mathrm{T}} \mathbf {S} _ {N} ^ {- 1} \mathbf {m} _ {N} + \frac {1}{2} \mathbf {m} _ {0} ^ {\mathrm{T}} \mathbf {S} _ {0} ^ {- 1} \mathbf {m} _ {0} \\ & & + \sum_ {n = 1} ^ {N} \left\{\ln \sigma (\xi_ {n}) - \frac {1}{2} \xi_ {n} - \lambda (\xi_ {n}) \xi_ {n} ^ {2} \right\}. \end{array}\tag{10.164}

This variational framework can also be applied to situations in which the data is arriving sequentially (Jaakkola and Jordan, 2000). In this case we maintain a Gaussian posterior distribution over w, which is initialized using the prior $p ( \mathbf { w } )$ . As each data point arrives, the posterior is updated by making use of the bound (10.151) and then normalized to give an updated posterior distribution.

The predictive distribution is obtained by marginalizing over the posterior distribution, and takes the same form as for the Laplace approximation discussed in Section 4.5.2. Figure 10.13 shows the variational predictive distributions for a synthetic data set. This example provides interesting insights into the concept of ‘large margin’, which was discussed in Section 7.1 and which has qualitatively similar behaviour to the Bayesian solution.
