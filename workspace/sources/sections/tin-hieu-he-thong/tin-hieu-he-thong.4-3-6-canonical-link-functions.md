---
id: "tin-hieu-he-thong.4-3-6-canonical-link-functions"
doc_id: "tin-hieu-he-thong"
title: "4.3.6 Canonical link functions"
level: 2
heading_path: ["4 Linear Models for Classification", "4.3.6 Canonical link functions"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-3-5-probit-regression"
next_id: "tin-hieu-he-thong.4-4-the-laplace-approximation"
block_ids: ["b2435", "b2436", "b2437", "b2438", "b2439", "b2440", "b2441", "b2442", "b2443", "b2444", "b2445", "b2446", "b2447", "b2448", "b2449", "b2450", "b2451", "b2452", "b2453"]
---

## 4.3.6 Canonical link functions

For the linear regression model with a Gaussian noise distribution, the error function, corresponding to the negative log likelihood, is given by (3.12). If we take the derivative with respect to the parameter vector w of the contribution to the error function from a data point n, this takes the form of the ‘error’ $y _ { n } - t _ { n }$ times the feature vector $\phi _ { n }$ , where $y _ { n } = \mathbf { w } ^ { \mathrm { T } } \phi _ { n }$ . Similarly, for the combination of the logistic sigmoid activation function and the cross-entropy error function (4.90), and for the softmax activation function with the multiclass cross-entropy error function (4.108), we again obtain this same simple form. We now show that this is a general result of assuming a conditional distribution for the target variable from the exponential family, along with a corresponding choice for the activation function known as the canonical linkfunction.

We again make use of the restricted form (4.84) of exponential family distributions. Note that here we are applying the assumption of exponential family distribution to the target variable t, in contrast to Section 4.2.4 where we applied it to the input vector x. We therefore consider conditional distributions of the target variable of the form

p (t | \eta , s) = \frac {1}{s} h \left(\frac {t}{s}\right) g (\eta) \exp \left\{\frac {\eta t}{s} \right\}.\tag{4.118}

Using the same line of argument as led to the derivation of the result (2.226), we see that the conditional mean of t, which we denote by $y ,$ is given by

y \equiv \mathbb {E} [ t | \eta ] = - s \frac {d}{d \eta} \ln g (\eta).\tag{4.119}

Thus y and η must related, and we denote this relation through $\eta = \psi ( y )$

Following Nelder and Wedderburn (1972), we define a generalized linear model to be one for which $y$ is a nonlinear function of a linear combination of the input (or feature) variables so that

y = f (\mathbf {w} ^ {\mathrm{T}} \phi)\tag{4.120}

where $f ( \cdot )$ is known as the activationfunction in the machine learning literature, and $f ^ { - 1 } ( \cdot )$ is known as the linkfunction in statistics.

Now consider the log likelihood function for this model, which, as a function of η, is given by

\ln p (\mathbf {t} | \eta , s) = \sum_ {n = 1} ^ {N} \ln p (t _ {n} | \eta , s) = \sum_ {n = 1} ^ {N} \left\{\ln g (\eta_ {n}) + \frac {\eta_ {n} t _ {n}}{s} \right\} + \text { const }\tag{4.121}

where we are assuming that all observations share a common scale parameter (which corresponds to the noise variance for a Gaussian distribution for instance) and so s is independent of $n .$ . The derivative of the log likelihood with respect to the model parameters w is then given by

\begin{array}{r c l} \nabla_ {\mathbf {w}} \ln p (\mathbf {t} | \eta , s) & = & \sum_ {n = 1} ^ {N} \left\{\frac {d}{d \eta_ {n}} \ln g (\eta_ {n}) + \frac {t _ {n}}{s} \right\} \frac {d \eta_ {n}}{d y _ {n}} \frac {d y _ {n}}{d a _ {n}} \nabla a _ {n} \\ & = & \sum_ {n = 1} ^ {N} \frac {1}{s} \left\{t _ {n} - y _ {n} \right\} \psi^ {\prime} (y _ {n}) f ^ {\prime} (a _ {n}) \phi_ {n} \end{array}\tag{4.122}

where $a _ { n } = \mathbf { w } ^ { \mathrm { T } } \phi _ { n }$ , and we have used $y _ { n } = f ( a _ { n } )$ together with the result (4.119) for $\mathbb { E } [ t | \eta ]$ . We now see that there is a considerable simplification if we choose a particular form for the link function $f ^ { - 1 } ( y )$ given by

f ^ {- 1} (y) = \psi (y)\tag{4.123}

which gives $f ( \psi ( y ) ) = y$ and hence $f ^ { \prime } ( \psi ) \psi ^ { \prime } ( y ) = 1$ . Also, because $a = f ^ { - 1 } ( y )$ we have $a = \psi$ and hence $f ^ { \prime } ( a ) \psi ^ { \prime } ( y ) \stackrel { \cdot } { = } 1$ . In this case, the gradient of the error function reduces to

\nabla \ln E (\mathbf {w}) = \frac {1}{s} \sum_ {n = 1} ^ {N} \{y _ {n} - t _ {n} \} \phi_ {n}.\tag{4.124}

For the Gaussian $s = \beta ^ { - 1 }$ , whereas for the logistic model $s = 1$
