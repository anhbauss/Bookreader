---
id: "tin-hieu-he-thong.10-1-3-example-the-univariate-gaussian"
doc_id: "tin-hieu-he-thong"
title: "10.1.3 Example: The univariate Gaussian"
level: 2
heading_path: ["Approximate Inference", "10.1.3 Example: The univariate Gaussian"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-1-2-properties-of-factorized-approximations"
next_id: "tin-hieu-he-thong.10-1-4-model-comparison"
block_ids: ["b5135", "b5136", "b5137", "b5138", "b5139", "b5140", "b5141", "b5142", "b5143", "b5144", "b5145", "b5146", "b5147", "b5148", "b5149", "b5150", "b5151", "b5152", "b5153", "b5154", "b5155", "b5156", "b5157", "b5158", "b5159", "b5160", "b5161", "b5162", "b5163", "b5164", "b5165", "b5166", "b5167", "b5168", "b5169", "b5170"]
---

## 10.1.3 Example: The univariate Gaussian

We now illustrate the factorized variational approximation using a Gaussian distribution over a single variable x (MacKay, 2003). Our goal is to infer the posterior distribution for the mean $\mu$ and precision $\tau ,$ given a data set $\mathcal { D } = \{ x _ { 1 } , \ldots , x _ { N } \}$ of observed values of $x$ which are assumed to be drawn independently from the Gaussian. The likelihood function is given by

p (\mathcal {D} | \mu , \tau) = \left(\frac {\tau}{2 \pi}\right) ^ {N / 2} \exp \left\{- \frac {\tau}{2} \sum_ {n = 1} ^ {N} (x _ {n} - \mu) ^ {2} \right\}.\tag{10.21}

We now introduce conjugate prior distributions for $\mu$ and $\tau$ given by

p (\mu | \tau) = \mathcal {N} \left(\mu | \mu_ {0}, (\lambda_ {0} \tau) ^ {- 1}\right)\tag{10.22}

{p (\tau)} = {\mathrm{Gam} (\tau | a _ {0}, b _ {0})}\tag{10.23}

where Gam $( \tau | a _ { 0 } , b _ { 0 } )$ is the gamma distribution defined by (2.146). Together these distributions constitute a Gaussian-Gamma conjugate prior distribution.

For this simple problem the posterior distribution can be found exactly, and again takes the form of a Gaussian-gamma distribution. However, for tutorial purposes we will consider a factorized variational approximation to the posterior distribution given by

q (\mu , \tau) = q _ {\mu} (\mu) q _ {\tau} (\tau).\tag{10.24}

Note that the true posterior distribution does not factorize in this way. The optimum factors $q _ { \mu } ( \mu )$ and $q _ { \tau } ( \tau )$ can be obtained from the general result (10.9) as follows. For $q _ { \mu } ( \mu )$ we have

\begin{array}{r c l} \ln q _ {\mu} ^ {\star} (\mu) & = & \mathbb {E} _ {\tau} \left[ \ln p (\mathcal {D} | \mu , \tau) + \ln p (\mu | \tau) \right] + \text { const } \\ & = & - \frac {\mathbb {E} [ \tau ]}{2} \left\{\lambda_ {0} (\mu - \mu_ {0}) ^ {2} + \sum_ {n = 1} ^ {N} (x _ {n} - \mu) ^ {2} \right\} + \text { const }. \end{array}\tag{10.25}

Completing the square over $\mu$ we see that $q _ { \mu } ( \mu )$ is a Gaussian $\mathcal { N } \left( \mu \vert \mu _ { N } , \lambda _ { N } ^ { - 1 } \right)$ with mean and precision given by

\mu_ {N} = \frac {\lambda_ {0} \mu_ {0} + N \overline {{x}}}{\lambda_ {0} + N}\tag{10.26}

\lambda_ {N} = (\lambda_ {0} + N) \mathbb {E} [ \tau ].\tag{10.27}

Note that for $N  \infty$ this gives the maximum likelihood result in which $\mu _ { N } = \overline { { x } }$ and the precision is infinite.

Similarly, the optimal solution for the factor $q _ { \tau } ( \tau )$ is given by

\begin{array}{r c l} \ln q _ {\tau} ^ {\star} (\tau) & = & \mathbb {E} _ {\mu} \left[ \ln p (\mathcal {D} | \mu , \tau) + \ln p (\mu | \tau) \right] + \ln p (\tau) + \text { const } \\ & = & (a _ {0} - 1) \ln \tau - b _ {0} \tau + \frac {N}{2} \ln \tau \\ & & - \frac {\tau}{2} \mathbb {E} _ {\mu} \left[ \sum_ {n = 1} ^ {N} (x _ {n} - \mu) ^ {2} + \lambda_ {0} (\mu - \mu_ {0}) ^ {2} \right] + \text { const } \end{array}\tag{10.28}

and hence $q _ { \tau } ( \tau )$ is a gamma distribution ${ \mathrm { G a m } } ( \tau | a _ { N } , b _ { N } )$ with parameters

a _ {N} = a _ {0} + \frac {N}{2}\tag{10.29}

{b _ {N}} = {b _ {0} + \frac {1}{2} \mathbb {E} _ {\mu} \left[ \sum_ {n = 1} ^ {N} (x _ {n} - \mu) ^ {2} + \lambda_ {0} (\mu - \mu_ {0}) ^ {2} \right].}\tag{10.30}

Again this exhibits the expected behaviour when $N \to \infty$

It should be emphasized that we did not assume these specific functional forms for the optimal distributions $q _ { \mu } ( \mu )$ and $q _ { \tau } ( \tau )$ . They arose naturally from the structure of the likelihood function and the corresponding conjugate priors.

Thus we have expressions for the optimal distributions $q _ { \mu } ( \mu )$ and $q _ { \tau } ( \tau )$ each of which depends on moments evaluated with respect to the other distribution. One approach to finding a solution is therefore to make an initial guess for, say, the moment $\mathbb { E } [ \tau ]$ and use this to re-compute the distribution $q _ { \mu } ( \mu )$ . Given this revised distribution we can then extract the required moments $\mathbb { E } [ \mu ]$ and $\mathbb { E } [ \mu ^ { 2 } ]$ , and use these to recompute the distribution $q _ { \tau } ( \tau )$ , and so on. Since the space of hidden variables for this example is only two dimensional, we can illustrate the variational approximation to the posterior distribution by plotting contours of both the true posterior and the factorized approximation, as illustrated in Figure 10.4.

![image](images/part-003--b0baed0e03d86b94eab763bb25d81813f4d22776ce80c2226ec2935caf34e7d5.jpg)

![image](images/part-003--2c0f5805b78297ff5eb8df15b0b42a2903d1cc779edf8fef6a33e675fbe329f5.jpg)

![image](images/part-003--b8c9c2cdf9a1902bed4d8331e6b26b0c55e189a1ade4acd40701f519b50ab774.jpg)

![image](images/part-003--05d593b76c5e6872f8fd4b0a60ff8daa534d7c63e6667a860779be2053d9b256.jpg)

Figure 10.4 Illustration of variational inference for the mean $\mu$ and precision τ of a univariate Gaussian distribu tion. Contours of the true posterior distribution $p ( \mu , \tau | D )$ are shown in green. (a) Contours of the initial factorized approximation $q _ { \mu } ( \mu ) q _ { \tau } ( \tau )$ are shown in blue. (b) After re-estimating the factor $q _ { \mu } ( \mu )$ . (c) After re-estimating the factor $q _ { \tau } ( \tau )$ . (d) Contours of the optimal factorized approximation, to which the iterative scheme converges, are shown in red.

In general, we will need to use an iterative approach such as this in order to solve for the optimal factorized posterior distribution. For the very simple example we are considering here, however, we can find an explicit solution by solving the simultaneous equations for the optimal factors $q _ { \mu } ( \mu )$ and $q _ { \tau } ( \tau )$ . Before doing this, we can simplify these expressions by considering broad, noninformative priors in which $\mu _ { 0 } = a _ { 0 } = b _ { 0 } = \lambda _ { 0 } = 0$ . Although these parameter settings correspond to improper priors, we see that the posterior distribution is still well defined. Using the standard result $\mathbb { E } [ \tau ] = a _ { N } / b _ { N }$ for the mean of a gamma distribution, together with (10.29) and (10.30), we have

\frac {1}{\mathbb {E} [ \tau ]} = \mathbb {E} \left[ \frac {1}{N} \sum_ {n = 1} ^ {N} (x _ {n} - \mu) ^ {2} \right] = \overline {{x ^ {2}}} - 2 \overline {{x}} \mathbb {E} [ \mu ] + \mathbb {E} [ \mu^ {2} ].\tag{10.31}

Then, using (10.26) and (10.27), we obtain the first and second order moments of

$q _ { \mu } ( \mu )$ in the form

\mathbb {E} [ \mu ] = \overline {{x}}, \qquad \mathbb {E} [ \mu^ {2} ] = \overline {{x}} ^ {2} + \frac {1}{N \mathbb {E} [ \tau ]}.\tag{10.32}

We can now substitute these moments into (10.31) and then solve for $\mathbb { E } [ \tau ]$ to give

\begin{array}{r c l} \frac {1}{\mathbb {E} [ \tau ]} & = & \frac {1}{N - 1} (\overline {{x ^ {2}}} - \overline {{x}} ^ {2}) \\ & = & \frac {1}{N - 1} \sum_ {n = 1} ^ {N} (x _ {n} - \overline {{x}}) ^ {2}. \end{array}\tag{10.33}

We recognize the right-hand side as the familiar unbiased estimator for the variance of a univariate Gaussian distribution, and so we see that the use of a Bayesian approach has avoided the bias of the maximum likelihood solution.
