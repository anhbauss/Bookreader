---
id: "tin-hieu-he-thong.2-1-1-the-beta-distribution"
doc_id: "tin-hieu-he-thong"
title: "2.1.1 The beta distribution"
level: 2
heading_path: ["Probability Distributions", "2.1.1 The beta distribution"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.jacob-bernoulli-1654-1705"
next_id: "tin-hieu-he-thong.2-2-multinomial-variables"
block_ids: ["b782", "b783", "b784", "b785", "b786", "b787", "b788", "b789", "b790", "b791", "b792", "b793", "b794", "b795", "b796", "b797", "b798", "b799", "b800", "b801", "b802", "b803", "b804", "b805", "b806", "b807", "b808", "b809", "b810", "b811", "b812", "b813", "b814", "b815", "b816", "b817", "b818", "b819"]
---

## 2.1.1 The beta distribution

We have seen in (2.8) that the maximum likelihood setting for the parameter $\mu$ in the Bernoulli distribution, and hence in the binomial distribution, is given by the fraction of the observations in the data set having $x = 1$ . As we have already noted, this can give severely over-fitted results for small data sets. In order to develop a Bayesian treatment for this problem, we need to introduce a prior distribution $p ( \mu )$ over the parameter $\mu .$ Here we consider a form of prior distribution that has a simple interpretation as well as some useful analytical properties. To motivate this prior, we note that the likelihood function takes the form of the product of factors of the form $\mu ^ { x } ( 1 - \mu ) ^ { 1 - x }$ . If we choose a prior to be proportional to powers of $\mu$ and $( 1 - \mu )$ , then the posterior distribution, which is proportional to the product of the prior and the likelihood function, will have the same functional form as the prior. This property is called conjugacy and we will see several examples of it later in this chapter. We therefore choose a prior, called the beta distribution, given by

\operatorname{Beta} (\mu | a, b) = \frac {\Gamma (a + b)}{\Gamma (a) \Gamma (b)} \mu^ {a - 1} (1 - \mu) ^ {b - 1}\tag{2.13}

Exercise 2.5

where $\Gamma ( x )$ is the gamma function defined by (1.141), and the coefficient in (2.13) ensures that the beta distribution is normalized, so that

\int_ {0} ^ {1} \operatorname{Beta} (\mu | a, b) \mathrm{d} \mu = 1.\tag{2.14}

Exercise 2.6

The mean and variance of the beta distribution are given by

\mathbb {E} [ \mu ] = \frac {a}{a + b}\tag{2.15}

\operatorname{var} [ \mu ] = \frac {a b}{(a + b) ^ {2} (a + b + 1)}.\tag{2.16}

The parameters $a$ and $b$ are often called hyperparameters because they control the distribution of the parameter $\mu .$ Figure 2.2 shows plots of the beta distribution for various values of the hyperparameters.

The posterior distribution of $\mu$ is now obtained by multiplying the beta prior (2.13) by the binomial likelihood function (2.9) and normalizing. Keeping only the factors that depend on $\mu ,$ , we see that this posterior distribution has the form

p (\mu | m, l, a, b) \propto \mu^ {m + a - 1} (1 - \mu) ^ {l + b - 1}\tag{2.17}

![image](images/part-001--4c8a5439a3e7888bb44f36a9885166abc81daf5610251037dff4cf0070cecd49.jpg)

![image](images/part-001--c1cbd5a0cf1c24ea9d8a4e1f0466b27388794abd7a8955e4211af0cc2070098d.jpg)

![image](images/part-001--fe20412799fb050d21b0f565ae66cdcc10e689b0411d96736057ffdf0566379f.jpg)

![image](images/part-001--dc8c72d4f11b6145211bb793ec67bf4abf196b5c394c843a8ab92853a439d979.jpg)

Figure 2.2 Plots of the beta distribution Beta $\scriptstyle ( \mu | a , b )$ given by (2.13) as a function of $\mu$ for various values of the hyperparameters a and b.

where $l = N - m$ , and therefore corresponds to the number of ‘tails’ in the coin example. We see that (2.17) has the same functional dependence on $\mu$ as the prior distribution, reflecting the conjugacy properties of the prior with respect to the likelihood function. Indeed, it is simply another beta distribution, and its normalization coefficient can therefore be obtained by comparison with (2.13) to give

p (\mu | m, l, a, b) = \frac {\Gamma (m + a + l + b)}{\Gamma (m + a) \Gamma (l + b)} \mu^ {m + a - 1} (1 - \mu) ^ {l + b - 1}.\tag{2.18}

We see that the effect of observing a data set of $m$ observations of $x = 1$ and l observations of $x = 0$ has been to increase the value of $a$ by $m ,$ , and the value of b by l, in going from the prior distribution to the posterior distribution. This allows us to provide a simple interpretation of the hyperparameters $a$ and $b$ in the prior as an effective number of observations of $x = 1$ and $x = 0$ , respectively. Note that a and $b$ need not be integers. Furthermore, the posterior distribution can act as the prior if we subsequently observe additional data. To see this, we can imagine taking observations one at a time and after each observation updating the current posterior distribution by multiplying by the likelihood function for the new observation and then normalizing to obtain the new, revised posterior distribution. At each stage, the posterior is a beta distribution with some total number of (prior and actual) observed values for $x = 1$ and $x = 0$ given by the parameters a and b. Incorporation of an additional observation of $x = 1$ simply corresponds to incrementing the value of a by 1, whereas for an observation of $x = 0$ we increment b by 1. Figure 2.3 illustrates one step in this process.

![image](images/part-001--1daefc0dc1bcd485ccfbdf6222eaae37410cc495966bb266fd0724995ff6bbf2.jpg)

Figure 2.3 Illustration of one step of sequential Bayesian inference. The prior is given by a beta distribution with parameters $a = 2 , b = 2$ , and the likelihood function, given by (2.9) with $N = m = 1$ , corresponds to a single observation of $x = 1$ , so that the posterior is given by a beta distribution with parameters $a = 3 , b = 2$

We see that this sequential approach to learning arises naturally when we adopt a Bayesian viewpoint. It is independent of the choice of prior and of the likelihood function and depends only on the assumption of i.i.d. data. Sequential methods make use of observations one at a time, or in small batches, and then discard them before the next observations are used. They can be used, for example, in real-time learning scenarios where a steady stream of data is arriving, and predictions must be made before all of the data is seen. Because they do not require the whole data set to be stored or loaded into memory, sequential methods are also useful for large data sets. Maximum likelihood methods can also be cast into a sequential framework.

If our goal is to predict, as best we can, the outcome of the next trial, then we must evaluate the predictive distribution of x, given the observed data set $\mathcal { D }$ . From the sum and product rules of probability, this takes the form

p (x = 1 | \mathcal {D}) = \int_ {0} ^ {1} p (x = 1 | \mu) p (\mu | \mathcal {D}) \mathrm{d} \mu = \int_ {0} ^ {1} \mu p (\mu | \mathcal {D}) \mathrm{d} \mu = \mathbb {E} [ \mu | \mathcal {D} ].\tag{2.19}

Using the result (2.18) for the posterior distribution $p ( \mu | \mathcal { D } )$ , together with the result (2.15) for the mean of the beta distribution, we obtain

p (x = 1 | \mathcal {D}) = \frac {m + a}{m + a + l + b}\tag{2.20}

which has a simple interpretation as the total fraction of observations (both real observations and fictitious prior observations) that correspond to $x = 1$ . Note that in the limit of an infinitely large data set m, $l  \infty$ the result (2.20) reduces to the maximum likelihood result (2.8). As we shall see, it is a very general property that the Bayesian and maximum likelihood results will agree in the limit of an infinitely large data set. For a finite data set, the posterior mean for $\mu$ always lies between the prior mean and the maximum likelihood estimate for $\mu$ corresponding to the relative frequencies of events given by (2.7).

From Figure 2.2, we see that as the number of observations increases, so the posterior distribution becomes more sharply peaked. This can also be seen from the result (2.16) for the variance of the beta distribution, in which we see that the variance goes to zero for $a  \infty \mathrm { o r } b  \infty$ . In fact, we might wonder whether it is a general property of Bayesian learning that, as we observe more and more data, the uncertainty represented by the posterior distribution will steadily decrease.

To address this, we can take a frequentist view of Bayesian learning and show that, on average, such a property does indeed hold. Consider a general Bayesian inference problem for a parameter $\pmb \theta$ for which we have observed a data set $\mathcal { D } _ { : }$ described by the joint distribution $p ( \pmb \theta , \mathcal { D } )$ . The following result

\mathbb {E} _ {\boldsymbol {\theta}} [ \boldsymbol {\theta} ] = \mathbb {E} _ {\mathcal {D}} \left[ \mathbb {E} _ {\boldsymbol {\theta}} [ \boldsymbol {\theta} | \mathcal {D} ] \right]\tag{2.21}

where

\mathbb {E} _ {\boldsymbol {\theta}} [ \boldsymbol {\theta} ] \equiv \int p (\boldsymbol {\theta}) \boldsymbol {\theta} \mathrm{d} \boldsymbol {\theta}\tag{2.22}

\mathbb {E} _ {\mathcal {D}} [ \mathbb {E} _ {\boldsymbol {\theta}} [ \boldsymbol {\theta} | \mathcal {D} ] ] \equiv \int \left\{\int \boldsymbol {\theta} p (\boldsymbol {\theta} | \mathcal {D}) \mathrm{d} \boldsymbol {\theta} \right\} p (\mathcal {D}) \mathrm{d} \mathcal {D}\tag{2.23}

says that the posterior mean of $\theta ,$ averaged over the distribution generating the data, is equal to the prior mean of $\pmb { \theta } .$ . Similarly, we can show that

\operatorname{var} _ {\boldsymbol {\theta}} [ \boldsymbol {\theta} ] = \mathbb {E} _ {\mathcal {D}} \left[ \operatorname{var} _ {\boldsymbol {\theta}} [ \boldsymbol {\theta} | \mathcal {D} ] \right] + \operatorname{var} _ {\mathcal {D}} \left[ \mathbb {E} _ {\boldsymbol {\theta}} [ \boldsymbol {\theta} | \mathcal {D} ] \right].\tag{2.24}

The term on the left-hand side of (2.24) is the prior variance of $\pmb { \theta } .$ . On the righthand side, the first term is the average posterior variance of $\theta _ { ; }$ , and the second term measures the variance in the posterior mean of $\pmb \theta .$ . Because this variance is a positive quantity, this result shows that, on average, the posterior variance of $\pmb \theta$ is smaller than the prior variance. The reduction in variance is greater if the variance in the posterior mean is greater. Note, however, that this result only holds on average, and that for a particular observed data set it is possible for the posterior variance to be larger than the prior variance.
