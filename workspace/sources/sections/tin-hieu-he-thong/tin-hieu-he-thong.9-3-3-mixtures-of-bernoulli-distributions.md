---
id: "tin-hieu-he-thong.9-3-3-mixtures-of-bernoulli-distributions"
doc_id: "tin-hieu-he-thong"
title: "9.3.3 Mixtures of Bernoulli distributions"
level: 2
heading_path: ["Mixture Models and EM", "9.3.3 Mixtures of Bernoulli distributions"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.9-3-2-relation-to-k-means"
next_id: "tin-hieu-he-thong.9-3-4-em-for-bayesian-linear-regression"
block_ids: ["b4888", "b4889", "b4890", "b4891", "b4892", "b4893", "b4894", "b4895", "b4896", "b4897", "b4898", "b4899", "b4900", "b4901", "b4902", "b4903", "b4904", "b4905", "b4906", "b4907", "b4908", "b4909", "b4910", "b4911", "b4912", "b4913", "b4914", "b4915", "b4916", "b4917", "b4918", "b4919", "b4920", "b4921", "b4922", "b4923", "b4924", "b4925", "b4926", "b4927", "b4928", "b4929", "b4930", "b4931", "b4932", "b4933", "b4934", "b4935", "b4936"]
---

## 9.3.3 Mixtures of Bernoulli distributions

So far in this chapter, we have focussed on distributions over continuous variables described by mixtures of Gaussians. As a further example of mixture modelling, and to illustrate the EM algorithm in a different context, we now discuss mixtures of discrete binary variables described by Bernoulli distributions. This model is also known as latent class analysis (Lazarsfeld and Henry, 1968; McLachlan and Peel, 2000). As well as being of practical importance in its own right, our discussion of Bernoulli mixtures will also lay the foundation for a consideration of hidden Markov models over discrete variables.

Consider a set of D binary variables $x _ { i }$ , where $i = 1 , \ldots , D$ , each of which is governed by a Bernoulli distribution with parameter $\mu _ { i }$ , so that

p (\mathbf {x} | \boldsymbol {\mu}) = \prod_ {i = 1} ^ {D} \mu_ {i} ^ {x _ {i}} (1 - \mu_ {i}) ^ {(1 - x _ {i})}\tag{9.44}

where ${ \bf x } = ( x _ { 1 } , \dots , x _ { D } ) ^ { \mathrm { T } }$ and $\pmb { \mu } = ( \mu _ { 1 } , \ldots , \mu _ { D } ) ^ { \mathrm { T } }$ . We see that the individual variables $x _ { i }$ are independent, given $\pmb { \mu } .$ . The mean and covariance of this distribution are easily seen to be

\mathbb {E} [ \mathbf {x} ] = \boldsymbol {\mu}\tag{9.45}

\operatorname{cov} [ \mathbf {x} ] = \operatorname{diag} \{\mu_ {i} (1 - \mu_ {i}) \}.\tag{9.46}

Now let us consider a finite mixture of these distributions given by

p (\mathbf {x} | \boldsymbol {\mu}, \boldsymbol {\pi}) = \sum_ {k = 1} ^ {K} \pi_ {k} p (\mathbf {x} | \boldsymbol {\mu} _ {k})\tag{9.47}

where $\pmb { \mu } = \{ \pmb { \mu } _ { 1 } , \ldots , \pmb { \mu } _ { K } \} , \pmb { \pi } = \{ \pi _ { 1 } , \ldots , \pi _ { K } \}$ , and

p (\mathbf {x} | \boldsymbol {\mu} _ {k}) = \prod_ {i = 1} ^ {D} \mu_ {k i} ^ {x _ {i}} (1 - \mu_ {k i}) ^ {(1 - x _ {i})}.\tag{9.48}

Exercise 9.12

The mean and covariance of this mixture distribution are given by

\begin{array}{r c l} \mathbb {E} [ \mathbf {x} ] & = & \sum_ {k = 1} ^ {K} \pi_ {k} \boldsymbol {\mu} _ {k} \\ \operatorname{cov} [ \mathbf {x} ] & = & \sum_ {k = 1} ^ {K} \pi_ {k} \left\{\boldsymbol {\Sigma} _ {k} + \boldsymbol {\mu} _ {k} \boldsymbol {\mu} _ {k} ^ {\mathrm{T}} \right\} - \mathbb {E} [ \mathbf {x} ] \mathbb {E} [ \mathbf {x} ] ^ {\mathrm{T}} \end{array}\tag{9.49}

(9.50)

where Σ = diag $\{ \mu _ { k i } ( 1 - \mu _ { k i } ) \}$ . Because the covariance matrix $\mathrm { c o v } [ \mathbf { x } ]$ is no longer diagonal, the mixture distribution can capture correlations between the variables, unlike a single Bernoulli distribution.

If we are given a data set $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ then the log likelihood function for this model is given by

\ln p (\mathbf {X} | \boldsymbol {\mu}, \boldsymbol {\pi}) = \sum_ {n = 1} ^ {N} \ln \left\{\sum_ {k = 1} ^ {K} \pi_ {k} p \left(\mathbf {x} _ {n} \mid \boldsymbol {\mu} _ {k}\right) \right\}.\tag{9.51}

Again we see the appearance of the summation inside the logarithm, so that the maximum likelihood solution no longer has closed form.

We now derive the EM algorithm for maximizing the likelihood function for the mixture of Bernoulli distributions. To do this, we first introduce an explicit latent

Exercise 9.14

variable z associated with each instance of x. As in the case of the Gaussian mixture, $\mathbf { z } = ( z _ { 1 } , \dots , z _ { K } ) ^ { \mathrm { T } }$ is a binary K-dimensional variable having a single component equal to 1, with all other components equal to 0. We can then write the conditional distribution of x, given the latent variable, as

p (\mathbf {x} | \mathbf {z}, \boldsymbol {\mu}) = \prod_ {k = 1} ^ {K} p (\mathbf {x} | \boldsymbol {\mu} _ {k}) ^ {z _ {k}}\tag{9.52}

while the prior distribution for the latent variables is the same as for the mixture of Gaussians model, so that

p (\mathbf {z} | \boldsymbol {\pi}) = \prod_ {k = 1} ^ {K} \pi_ {k} ^ {z _ {k}}.\tag{9.53}

If we form the product of $p ( \mathbf { x } | \mathbf { z } , \mu )$ and $p ( \mathbf { z } | \boldsymbol { \pi } )$ and then marginalize over z, then we recover (9.47).

In order to derive the EM algorithm, we first write down the complete-data log likelihood function, which is given by

\begin{array}{l} \ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\mu}, \boldsymbol {\pi}) = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} z _ {n k} \left\{\ln \pi_ {k} \right. \\ \left. + \sum_ {i = 1} ^ {D} [ x _ {n i} \ln \mu_ {k i} + (1 - x _ {n i}) \ln (1 - \mu_ {k i}) ] \right\} \end{array}\tag{9.54}

where ${ \bf X } = \{ { \bf x } _ { n } \}$ and ${ \bf Z } = \{ { \bf z } _ { n } \}$ . Next we take the expectation of the complete-data log likelihood with respect to the posterior distribution of the latent variables to give

\begin{array}{l} \mathbb {E} _ {\mathbf {Z}} [ \ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\mu}, \boldsymbol {\pi}) ] = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} \gamma (z _ {n k}) \left\{\ln \pi_ {k} \right. \\ \left. + \sum_ {i = 1} ^ {D} \left[ x _ {n i} \ln \mu_ {k i} + (1 - x _ {n i}) \ln (1 - \mu_ {k i}) \right] \right\} \end{array}\tag{9.55}

where $\gamma ( z _ { n k } ) = \mathbb { E } [ z _ { n k } ]$ is the posterior probability, or responsibility, of component k given data point ${ \bf x } _ { n }$ . In the E step, these responsibilities are evaluated using Bayes theorem, which takes the form

\begin{array}{l l l} \gamma (z _ {n k}) = \mathbb {E} [ z _ {n k} ] & = & \frac {\sum_ {z _ {n k}} z _ {n k} \left[ \pi_ {k} p (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {k}) \right] ^ {z _ {n k}}}{\sum_ {z _ {n j}} \left[ \pi_ {j} p (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {j}) \right] ^ {z _ {n j}}} \\ & = & \frac {\pi_ {k} p (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {k})}{\sum_ {j = 1} ^ {K} \pi_ {j} p (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {j})}. \end{array}\tag{9.56}

If we consider the sum over n in (9.55), we see that the responsibilities enter only through two terms, which can be written as

N _ {k} = \sum_ {n = 1} ^ {N} \gamma (z _ {n k})\tag{9.57}

{\overline {{\mathbf {x}}} _ {k}} = {\frac {1}{N _ {k}} \sum_ {n = 1} ^ {N} \gamma (z _ {n k}) \mathbf {x} _ {n}}\tag{9.58}

where $N _ { k }$ is the effective number of data points associated with component k. In the M step, we maximize the expected complete-data log likelihood with respect to the parameters $\pmb { \mu } _ { k }$ and $\pi .$ . If we set the derivative of (9.55) with respect to $\pmb { \mu } _ { k }$ equal to zero and rearrange the terms, we obtain

\pmb {\mu} _ {k} = \overline {{\mathbf {x}}} _ {k}.\tag{9.59}

We see that this sets the mean of component k equal to a weighted mean of the data, with weighting coefficients given by the responsibilities that component k takes for data points. For the maximization with respect to $\pi _ { k } .$ , we need to introduce a Lagrange multiplier to enforce the constraint $\dot { \sum _ { k } } \pi _ { k } = 1$ . Following analogous steps to those used for the mixture of Gaussians, we then obtain

\pi_ {k} = \frac {N _ {k}}{N}\tag{9.60}

which represents the intuitively reasonable result that the mixing coefficient for component k is given by the effective fraction of points in the data set explained by that component.

Note that in contrast to the mixture of Gaussians, there are no singularities in which the likelihood function goes to infinity. This can be seen by noting that the likelihood function is bounded above because $0 \leqslant p ( \mathbf x _ { n } | \pmb \mu _ { k } ) \leqslant 1$ There exist singularities at which the likelihood function goes to zero, but these will not be found by EM provided it is not initialized to a pathological starting point, because the EM algorithm always increases the value of the likelihood function, until a local maximum is found. We illustrate the Bernoulli mixture model in Figure 9.10 by using it to model handwritten digits. Here the digit images have been turned into binary vectors by setting all elements whose values exceed 0.5 to 1 and setting the remaining elements to 0. We now fit a data set of N = 600 such digits, comprising the digits ‘2’, ‘3’, and $\cdot _ { 4 } ,$ , with a mixture of K = 3 Bernoulli distributions by running 10 iterations of the EM algorithm. The mixing coefficients were initialized to $\pi _ { k } = 1 / K$ , and the parameters $\mu _ { k j }$ were set to random values chosen uniformly in the range (0.25, 0.75) and then normalized to satisfy the constraint that $\textstyle \sum _ { j } \mu _ { k j } = 1$ We see that a mixture of 3 Bernoulli distributions is able to find the three clusters in the data set corresponding to the different digits.

The conjugate prior for the parameters of a Bernoulli distribution is given by the beta distribution, and we have seen that a beta prior is equivalent to introducing

![image](images/part-003--82ada15c9a5b99e91ba12deef072106ffadfcc36aa2dcc540e5e3987f0e903fa.jpg)

Figure 9.10 Illustration of the Bernoulli mixture model in which the top row shows examples from the digits data set after converting the pixel values from grey scale to binary using a threshold of 0.5. On the bottom row the first three images show the parameters $\mu _ { k i }$ for each of the three components in the mixture model. As a comparison, we also fit the same data set using a single multivariate Bernoulli distribution, again using maximum likelihood. This amounts to simply averaging the counts in each pixel and is shown by the right-most image on the bottom row.

Section 2.1.1

Exercise 9.18

additional effective observations of $\mathbf { x } .$ We can similarly introduce priors into the Bernoulli mixture model, and use EM to maximize the posterior probability distributions.

Exercise 9.19

It is straightforward to extend the analysis of Bernoulli mixtures to the case of multinomial binary variables having $M > 2$ states by making use of the discrete distribution (2.26). Again, we can introduce Dirichlet priors over the model parameters if desired.
