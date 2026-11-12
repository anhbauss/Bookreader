---
id: "tin-hieu-he-thong.2-3-6-bayesian-inference-for-the-gaussian"
doc_id: "tin-hieu-he-thong"
title: "2.3.6 Bayesian inference for the Gaussian"
level: 2
heading_path: ["Probability Distributions", "2.3.6 Bayesian inference for the Gaussian"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-3-5-sequential-estimation"
next_id: "tin-hieu-he-thong.2-3-7-student-s-t-distribution"
block_ids: ["b1127", "b1128", "b1129", "b1130", "b1131", "b1132", "b1133", "b1134", "b1135", "b1136", "b1137", "b1138", "b1139", "b1140", "b1141", "b1142", "b1143", "b1144", "b1145", "b1146", "b1147", "b1148", "b1149", "b1150", "b1151", "b1152", "b1153", "b1154", "b1155", "b1156", "b1157", "b1158", "b1159", "b1160", "b1161", "b1162", "b1163", "b1164", "b1165", "b1166", "b1167", "b1168", "b1169", "b1170", "b1171", "b1172", "b1173", "b1174", "b1175", "b1176", "b1177", "b1178", "b1179", "b1180", "b1181", "b1182", "b1183", "b1184", "b1185", "b1186", "b1187"]
---

## 2.3.6 Bayesian inference for the Gaussian

The maximum likelihood framework gave point estimates for the parameters $\pmb { \mu }$ and Σ. Now we develop a Bayesian treatment by introducing prior distributions over these parameters. Let us begin with a simple example in which we consider a single Gaussian random variable $x .$ We shall suppose that the variance $\sigma ^ { 2 }$ is known, and we consider the task of inferring the mean $\mu$ given a set of $N$ observations $\mathbf { X } = \{ x _ { 1 } , \ldots , x _ { N } \}$ . The likelihood function, that is the probability of the observed data given $\mu ,$ viewed as a function of $\mu ,$ , is given by

p (\mathbf {X} | \mu) = \prod_ {n = 1} ^ {N} p (x _ {n} | \mu) = \frac {1}{(2 \pi \sigma^ {2}) ^ {N / 2}} \exp \left\{- \frac {1}{2 \sigma^ {2}} \sum_ {n = 1} ^ {N} (x _ {n} - \mu) ^ {2} \right\}.\tag{2.137}

Again we emphasize that the likelihood function $p ( \mathbf { X } | \mu )$ is not a probability distribution over $\mu$ and is not normalized.

We see that the likelihood function takes the form of the exponential of a quadratic form in $\mu .$ . Thus if we choose a prior $p ( \mu )$ given by a Gaussian, it will be a conjugate distribution for this likelihood function because the corresponding posterior will be a product of two exponentials of quadratic functions of $\mu$ and hence will also be Gaussian. We therefore take our prior distribution to be

p (\mu) = \mathcal {N} \left(\mu | \mu_ {0}, \sigma_ {0} ^ {2}\right)\tag{2.138}

and the posterior distribution is given by

p (\mu | \mathbf {X}) \propto p (\mathbf {X} | \mu) p (\mu).\tag{2.139}

Exercise 2.38

Simple manipulation involving completing the square in the exponent shows that the posterior distribution is given by

p (\mu | \mathbf {X}) = \mathcal {N} \left(\mu | \mu_ {N}, \sigma_ {N} ^ {2}\right)\tag{2.140}

where

\mu_ {N} = \frac {\sigma^ {2}}{N \sigma_ {0} ^ {2} + \sigma^ {2}} \mu_ {0} + \frac {N \sigma_ {0} ^ {2}}{N \sigma_ {0} ^ {2} + \sigma^ {2}} \mu_ {\mathrm{ML}}\tag{2.141}

{\frac {1}{\sigma_ {N} ^ {2}}} = {\frac {1}{\sigma_ {0} ^ {2}} + \frac {N}{\sigma^ {2}}}\tag{2.142}

in which $\mu _ { \mathrm { M L } }$ is the maximum likelihood solution for $\mu$ given by the sample mean

\mu_ {\mathrm{ML}} = \frac {1}{N} \sum_ {n = 1} ^ {N} x _ {n}.\tag{2.143}

It is worth spending a moment studying the form of the posterior mean and variance. First of all, we note that the mean of the posterior distribution given by (2.141) is a compromise between the prior mean $\mu _ { 0 }$ and the maximum likelihood solution $\mu _ { \mathrm { M L } }$ . If the number of observed data points $N = 0$ , then (2.141) reduces to the prior mean as expected. For $N  \infty$ , the posterior mean is given by the maximum likelihood solution. Similarly, consider the result (2.142) for the variance of the posterior distribution. We see that this is most naturally expressed in terms of the inverse variance, which is called the precision. Furthermore, the precisions are additive, so that the precision of the posterior is given by the precision of the prior plus one contribution of the data precision from each of the observed data points. As we increase the number of observed data points, the precision steadily increases, corresponding to a posterior distribution with steadily decreasing variance. With no observed data points, we have the prior variance, whereas if the number of data points $N  \infty$ , the variance $\sigma _ { N } ^ { 2 }$ goes to zero and the posterior distribution becomes infinitely peaked around the maximum likelihood solution. We therefore see that the maximum likelihood result of a point estimate for $\mu$ given by (2.143) is recovered precisely from the Bayesian formalism in the limit of an infinite number of observations. Note also that for finite N, if we take the limit $\sigma _ { 0 } ^ { 2 } \to \infty$ in which the prior has infinite variance then the posterior mean (2.141) reduces to the maximum likelihood result, while from (2.142) the posterior variance is given by $\sigma _ { N } ^ { 2 } = \sigma ^ { 2 } / N$

Illustration of Bayesian inference for the mean $\mu$ of a Gaussian distribution, in which the variance is assumed to be known. The curves show the prior distribution over $\mu$ (the curve labelled $N \ = \ 0 )$ which in this case is itself Gaussian, along with the posterior distribution given by (2.140) for increasing numbers N of data points. The data points are generated from a Gaussian of mean 0.8 and variance 0.1, and the prior is chosen to have mean 0. In both the prior and the likelihood function, the variance is set to the true value.

![image](images/part-001--67d0bcaac9746847318e8517f405d6aa5c8ffee9f9b10783ec98fa793a9f4444.jpg)

We illustrate our analysis of Bayesian inference for the mean of a Gaussian distribution in Figure 2.12. The generalization of this result to the case of a Ddimensional Gaussian random variable x with known covariance and unknown mean is straightforward.

We have already seen how the maximum likelihood expression for the mean of a Gaussian can be re-cast as a sequential update formula in which the mean after observing N data points was expressed in terms of the mean after observing $N - 1$ data points together with the contribution from data point $\mathbf { x } _ { N }$ . In fact, the Bayesian paradigm leads very naturally to a sequential view of the inference problem. To see this in the context of the inference of the mean of a Gaussian, we write the posterior distribution with the contribution from the final data point $\mathbf { x } _ { N }$ separated out so that

p (\boldsymbol {\mu} | D) \propto \left[ p (\boldsymbol {\mu}) \prod_ {n = 1} ^ {N - 1} p \left(\mathbf {x} _ {n} \mid \boldsymbol {\mu}\right) \right] p \left(\mathbf {x} _ {N} \mid \boldsymbol {\mu}\right).\tag{2.144}

The term in square brackets is (up to a normalization coefficient) just the posterior distribution after observing N 1 data points. We see that this can be viewed as a prior distribution, which is combined using Bayes’ theorem with the likelihood function associated with data point $\mathbf { x } _ { N }$ to arrive at the posterior distribution after observing N data points. This sequential view of Bayesian inference is very general and applies to any problem in which the observed data are assumed to be independent and identically distributed.

So far, we have assumed that the variance of the Gaussian distribution over the data is known and our goal is to infer the mean. Now let us suppose that the mean is known and we wish to infer the variance. Again, our calculations will be greatly simplified if we choose a conjugate form for the prior distribution. It turns out to be most convenient to work with the precision $\lambda \equiv \bar { 1 } / \sigma ^ { 2 }$ . The likelihood function for λ takes the form

p (\mathbf {X} | \lambda) = \prod_ {n = 1} ^ {N} \mathcal {N} (x _ {n} | \mu , \lambda^ {- 1}) \propto \lambda^ {N / 2} \exp \left\{- \frac {\lambda}{2} \sum_ {n = 1} ^ {N} (x _ {n} - \mu) ^ {2} \right\}.\tag{2.145}

![image](images/part-001--79bcb638ccdf45f0b6e03eb01ec4909a2d670cd4257758dcaab30f0c961d37e0.jpg)

![image](images/part-001--f28a19972da44572a290e30854db0591a05f9abdae4270aa30c84153e9eef0f0.jpg)

![image](images/part-001--a6c0c862bb083dbd99a47eb1367d52b154bd13bc39d95cecce0478fbb0515983.jpg)

Figure 2.13 Plot of the gamma distribution Gam $( \lambda | a , b )$ defined by (2.146) for various values of the parameters a and b.

The corresponding conjugate prior should therefore be proportional to the product of a power of λ and the exponential of a linear function of λ. This corresponds to the gamma distribution which is defined by

\operatorname{Gam} (\lambda | a, b) = \frac {1}{\Gamma (a)} b ^ {a} \lambda^ {a - 1} \exp (- b \lambda).\tag{2.146}

Exercise 2.41

Here $\Gamma ( a )$ is the gamma function that is defined by (1.141) and that ensures that (2.146) is correctly normalized. The gamma distribution has a finite integral if $a > 0$ and the distribution itself is finite if $a \geqslant 1$ . It is plotted, for various values of a and b, in Figure 2.13. The mean and variance of the gamma distribution are given by

Exercise 2.42

\mathbb {E} [ \lambda ] = \frac {a}{b}\tag{2.147}

\operatorname{var} [ \lambda ] = \frac {a}{b ^ {2}}.\tag{2.148}

Consider a prior distribution $\mathrm { G a m } ( \lambda | a _ { 0 } , b _ { 0 } )$ . If we multiply by the likelihood function (2.145), then we obtain a posterior distribution

p (\lambda | \mathbf {X}) \propto \lambda^ {a _ {0} - 1} \lambda^ {N / 2} \exp \left\{- b _ {0} \lambda - \frac {\lambda}{2} \sum_ {n = 1} ^ {N} (x _ {n} - \mu) ^ {2} \right\}\tag{2.149}

which we recognize as a gamma distribution of the form ${ \mathrm { G a m } } ( \lambda | a _ { N } , b _ { N } )$ where

a _ {N} = a _ {0} + \frac {N}{2}\tag{2.150}

{b _ {N}} = {b _ {0} + \frac {1}{2} \sum_ {n = 1} ^ {N} (x _ {n} - \mu) ^ {2} = b _ {0} + \frac {N}{2} \sigma_ {\mathrm{ML}} ^ {2}}\tag{2.151}

where $\sigma _ { \mathrm { M L } } ^ { 2 }$ is the maximum likelihood estimator of the variance. Note that in (2.149) there is no need to keep track of the normalization constants in the prior and the likelihood function because, if required, the correct coefficient can be found at the end using the normalized form (2.146) for the gamma distribution.

From (2.150), we see that the effect of observing N data points is to increase the value of the coefficient a by $N / 2$ . Thus we can interpret the parameter $a _ { 0 }$ in the prior in terms of $2 a _ { 0 }$ ‘effective’ prior observations. Similarly, from (2.151) we see that the N data points contribute ${ N \sigma _ { \mathrm { { M L } } } ^ { 2 } } / 2$ to the parameter $b ,$ where $\sigma _ { \mathrm { M L } } ^ { 2 }$ is the variance, and so we can interpret the parameter $b _ { 0 }$ in the prior as arising from the $2 a _ { 0 }$ ‘effective’ prior observations having variance $2 b _ { 0 } / ( 2 a _ { 0 } ) = b _ { 0 } / a _ { 0 }$ . Recall that we made an analogous interpretation for the Dirichlet prior. These distributions are examples of the exponential family, and we shall see that the interpretation of a conjugate prior in terms of effective fictitious data points is a general one for the exponential family of distributions.

Instead of working with the precision, we can consider the variance itself. The conjugate prior in this case is called the inverse gamma distribution, although we shall not discuss this further because we will find it more convenient to work with the precision.

Now suppose that both the mean and the precision are unknown. To find a conjugate prior, we consider the dependence of the likelihood function on $\mu$ and $\lambda$

\begin{array}{l} p (\mathbf {X} | \mu , \lambda) = \prod_ {n = 1} ^ {N} \left(\frac {\lambda}{2 \pi}\right) ^ {1 / 2} \exp \left\{- \frac {\lambda}{2} (x _ {n} - \mu) ^ {2} \right\} \\ \propto \left[ \lambda^ {1 / 2} \exp \left(- \frac {\lambda \mu^ {2}}{2}\right) \right] ^ {N} \exp \left\{\lambda \mu \sum_ {n = 1} ^ {N} x _ {n} - \frac {\lambda}{2} \sum_ {n = 1} ^ {N} x _ {n} ^ {2} \right\}. \end{array}\tag{2.152}

We now wish to identify a prior distribution $p ( \mu , \lambda )$ that has the same functiona dependence on $\mu$ and λ as the likelihood function and that should therefore take the form

\begin{array}{l} p (\mu , \lambda) \propto \left[ \lambda^ {1 / 2} \exp \left(- \frac {\lambda \mu^ {2}}{2}\right) \right] ^ {\beta} \exp \left\{c \lambda \mu - d \lambda \right\} \\ = \exp \left\{- \frac {\beta \lambda}{2} (\mu - c / \beta) ^ {2} \right\} \lambda^ {\beta / 2} \exp \left\{- \left(d - \frac {c ^ {2}}{2 \beta}\right) \lambda \right\} \end{array}\tag{2.153}

where $c , d ,$ , and $\beta$ are constants. Since we can always write $p ( \mu , \lambda ) = p ( \mu | \lambda ) p ( \lambda )$ we can find $p ( \mu | \lambda )$ and $p ( \lambda )$ by inspection. In particular, we see that $p ( \mu | \lambda )$ is a Gaussian whose precision is a linear function of λ and that $p ( \lambda )$ is a gamma distribution, so that the normalized prior takes the form

p (\mu , \lambda) = \mathcal {N} (\mu | \mu_ {0}, (\beta \lambda) ^ {- 1}) \mathrm{Gam} (\lambda | a, b)\tag{2.154}

where we have defined new constants given by $\mu _ { 0 } = c / \beta , a = 1 + \beta / 2 , b =$ $d - c ^ { 2 } / 2 \beta$ . The distribution (2.154) is called the normal-gamma or Gaussian-gamma distribution and is plotted in Figure 2.14. Note that this is not simply the product of an independent Gaussian prior over $\mu$ and a gamma prior over $\lambda ,$ , because the precision of $\mu$ is a linear function of λ. Even if we chose a prior in which $\mu$ and $\lambda$ were independent, the posterior distribution would exhibit a coupling between the precision of $\mu$ and the value of λ.

Figure 2.14 Contour plot of the normal-gamma distribution (2.154) for parameter values $\mu _ { 0 } = 0 , \beta = 2 , a = 5$ and $b = 6$

![image](images/part-001--1230df58ed417f7147882bcf205da9d8293567fe75c2b1f8209f98c8a54b8aac.jpg)

In the case of the multivariate Gaussian distribution $\mathcal { N } \left( { \bf x } | \mu , { \pmb { \Lambda } } ^ { - 1 } \right)$ for a $D _ { - }$ dimensional variable $\mathbf { x } ,$ the conjugate prior distribution for the mean $\mu ,$ assuming the precision is known, is again a Gaussian. For known mean and unknown precision matrix Λ, the conjugate prior is the Wishart distribution given by

Exercise 2.45

\mathcal {W} (\boldsymbol {\Lambda} | \mathbf {W}, \nu) = B | \boldsymbol {\Lambda} | ^ {(\nu - D - 1) / 2} \exp \left(- \frac {1}{2} \operatorname{Tr} \left(\mathbf {W} ^ {- 1} \boldsymbol {\Lambda}\right)\right)\tag{2.155}

where $\nu$ is called the number of degrees offreedom of the distribution, W is a $D \times D$ scale matrix, and $\operatorname { T r } ( \cdot )$ denotes the trace. The normalization constant $B$ is given by

B (\mathbf {W}, \nu) = | \mathbf {W} | ^ {- \nu / 2} \left(2 ^ {\nu D / 2} \pi^ {D (D - 1) / 4} \prod_ {i = 1} ^ {D} \Gamma \left(\frac {\nu + 1 - i}{2}\right)\right) ^ {- 1}.\tag{2.156}

Again, it is also possible to define a conjugate prior over the covariance matrix itself, rather than over the precision matrix, which leads to the inverse Wishart distribution, although we shall not discuss this further. If both the mean and the precision are unknown, then, following a similar line of reasoning to the univariate case, the conjugate prior is given by

p (\boldsymbol {\mu}, \boldsymbol {\Lambda} | \boldsymbol {\mu} _ {0}, \beta , \mathbf {W}, \nu) = \mathcal {N} (\boldsymbol {\mu} | \boldsymbol {\mu} _ {0}, (\beta \boldsymbol {\Lambda}) ^ {- 1}) \mathcal {W} (\boldsymbol {\Lambda} | \mathbf {W}, \nu)\tag{2.157}

which is known as the normal-Wishart or Gaussian-Wishart distribution.
