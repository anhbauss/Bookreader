---
id: "tin-hieu-he-thong.2-3-5-sequential-estimation"
doc_id: "tin-hieu-he-thong"
title: "2.3.5 Sequential estimation"
level: 2
heading_path: ["Probability Distributions", "2.3.5 Sequential estimation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-3-4-maximum-likelihood-for-the-gaussian"
next_id: "tin-hieu-he-thong.2-3-6-bayesian-inference-for-the-gaussian"
block_ids: ["b1093", "b1094", "b1095", "b1096", "b1097", "b1098", "b1099", "b1100", "b1101", "b1102", "b1103", "b1104", "b1105", "b1106", "b1107", "b1108", "b1109", "b1110", "b1111", "b1112", "b1113", "b1114", "b1115", "b1116", "b1117", "b1118", "b1119", "b1120", "b1121", "b1122", "b1123", "b1124", "b1125", "b1126"]
---

## 2.3.5 Sequential estimation

Our discussion of the maximum likelihood solution for the parameters of a Gaussian distribution provides a convenient opportunity to give a more general discussion of the topic of sequential estimation for maximum likelihood. Sequential methods allow data points to be processed one at a time and then discarded and are important for on-line applications, and also where large data sets are involved so that batch processing of all data points at once is infeasible.

Consider the result (2.121) for the maximum likelihood estimator of the mean $\pmb { \mu } _ { \mathrm { M L } }$ , which we will denote by $\mu _ { \mathrm { M L } } ^ { ( N ) }$ when it is based on N observations. If we

Figure 2.10

A schematic illustration of two correlated random variables z and $\theta ,$ together with the regression function $f ( \theta )$ given by the conditional expectation $\mathbb { E } [ z | \theta ]$ The Robbins-Monro algorithm provides a general sequential procedure for finding the root $\theta ^ { \star }$ of such functions.

![image](images/part-001--b0d3041e54f9c5dbec3be4fec269c575291f8d5cccd0961bba1cf1d353c44eea.jpg)

dissect out the contribution from the final data point $\mathbf { x } _ { N }$ , we obtain

\begin{array}{r c l} \boldsymbol {\mu} _ {\mathrm{ML}} ^ {(N)} & = & \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {x} _ {n} \\ & = & \frac {1}{N} \mathbf {x} _ {N} + \frac {1}{N} \sum_ {n = 1} ^ {N - 1} \mathbf {x} _ {n} \\ & = & \frac {1}{N} \mathbf {x} _ {N} + \frac {N - 1}{N} \boldsymbol {\mu} _ {\mathrm{ML}} ^ {(N - 1)} \\ & = & \boldsymbol {\mu} _ {\mathrm{ML}} ^ {(N - 1)} + \frac {1}{N} (\mathbf {x} _ {N} - \boldsymbol {\mu} _ {\mathrm{ML}} ^ {(N - 1)}). \end{array}\tag{2.126}

This result has a nice interpretation, as follows. After observing $N - 1$ data points we have estimated $\pmb { \mu }$ by $\mu _ { \mathrm { M L } } ^ { ( N - 1 ) }$ . We now observe data point $\mathbf { x } _ { N }$ , and we obtain our revised estimate $\mu _ { \mathrm { M L } } ^ { ( N ) }$ by moving the old estimate a small amount, proportional to $1 / N$ , in the direction of the ‘error signal $( { \bf x } _ { N } - \pmb { \mu } _ { \mathrm { M L } } ^ { ( N - 1 ) } ,$ ). Note that, as $N$ increases, so the contribution from successive data points gets smaller.

The result (2.126) will clearly give the same answer as the batch result (2.121) because the two formulae are equivalent. However, we will not always be able to derive a sequential algorithm by this route, and so we seek a more general formulation of sequential learning, which leads us to the Robbins-Monro algorithm. Consider a pair of random variables $\theta$ and $z$ governed by a joint distribution $p ( z , \theta )$ . The conditional expectation of z given $\theta$ defines a deterministic function $f ( \theta )$ that is given by

f (\theta) \equiv \mathbb {E} [ z | \theta ] = \int z p (z | \theta) \mathrm{d} z\tag{2.127}

and is illustrated schematically in Figure 2.10. Functions defined in this way are called regression functions.

Our goal is to find the root $\theta ^ { \star }$ at which $f ( \theta ^ { \star } ) = 0$ . If we had a large data set of observations of $z$ and $\theta _ { ; }$ , then we could model the regression function directly and then obtain an estimate of its root. Suppose, however, that we observe values of $z$ one at a time and we wish to find a corresponding sequential estimation scheme for $\theta ^ { \star }$ . The following general procedure for solving such problems was given by

Robbins and Monro (1951). We shall assume that the conditional variance of $z$ is finite so that

\mathbb {E} \left[ (z - f) ^ {2} \mid \theta \right] <   \infty\tag{2.128}

and we shall also, without loss of generality, consider the case where $f ( \theta ) > 0$ for $\theta > \theta ^ { \star }$ and $f ( \theta ) < 0$ for $\theta < \theta ^ { \star }$ , as is the case in Figure 2.10. The Robbins-Monro procedure then defines a sequence of successive estimates of the root $\theta ^ { \star }$ given by

\theta^ {(N)} = \theta^ {(N - 1)} + a _ {N - 1} z (\theta^ {(N - 1)})\tag{2.129}

where $z ( \theta ^ { ( N ) } )$ is an observed value of z when $\theta$ takes the value $\theta ^ { ( N ) }$ . The coefficients $\{ a _ { N } \}$ represent a sequence of positive numbers that satisfy the conditions

\lim _ {N \to \infty} a _ {N} = 0\tag{2.130}

\sum_ {N = 1} ^ {\infty} a _ {N} = \infty\tag{2.131}

\sum_ {N = 1} ^ {\infty} a _ {N} ^ {2} <   \infty .\tag{2.132}

It can then be shown (Robbins and Monro, 1951; Fukunaga, 1990) that the sequence of estimates given by (2.129) does indeed converge to the root with probability one. Note that the first condition (2.130) ensures that the successive corrections decrease in magnitude so that the process can converge to a limiting value. The second condition (2.131) is required to ensure that the algorithm does not converge short of the root, and the third condition (2.132) is needed to ensure that the accumulated noise has finite variance and hence does not spoil convergence.

Now let us consider how a general maximum likelihood problem can be solved sequentially using the Robbins-Monro algorithm. By definition, the maximum likelihood solution $\theta _ { \mathrm { M L } }$ is a stationary point of the log likelihood function and hence satisfies

\frac {\partial}{\partial \theta} \left\{\frac {1}{N} \sum_ {n = 1} ^ {N} \ln p (\mathbf {x} _ {n} | \theta) \right\} \Bigg | _ {\theta_ {\mathrm{ML}}} = 0.\tag{2.133}

Exchanging the derivative and the summation, and taking the limit $N \to \infty$ we have

\lim _ {N \to \infty} \frac {1}{N} \sum_ {n = 1} ^ {N} \frac {\partial}{\partial \theta} \ln p (x _ {n} | \theta) = \mathbb {E} _ {x} \left[ \frac {\partial}{\partial \theta} \ln p (x | \theta) \right]\tag{2.134}

and so we see that finding the maximum likelihood solution corresponds to finding the root of a regression function. We can therefore apply the Robbins-Monro procedure, which now takes the form

\theta^ {(N)} = \theta^ {(N - 1)} + a _ {N - 1} \frac {\partial}{\partial \theta^ {(N - 1)}} \ln p (x _ {N} | \theta^ {(N - 1)}).\tag{2.135}

Figure 2.11

In the case of a Gaussian distribution, with $\theta$ corresponding to the mean $\mu ,$ the regression function illustrated in Figure 2.10 takes the form of a straight line, as shown in red. In this case, the random variable z corresponds to the derivative of the log likelihood function and is given by $( x - \mu _ { \mathrm { M L } } ) \bar { / } \sigma ^ { 2 }$ , and its expectation that defines the regression function is a straight line given by $( \mu - \bar { \mu } _ { \mathrm { M L } } ) / \sigma ^ { 2 }$ . The root of the regression function corresponds to the maximum likelihood estimator $\mu _ { \mathrm { M L } }$

![image](images/part-001--69f18701ca6966418bf402d653169e74d1f6dc2bcaa8bdf27420fa9188bb4cab.jpg)

As a specific example, we consider once again the sequential estimation of the mean of a Gaussian distribution, in which case the parameter $\theta ^ { ( N ) }$ is the estimate $\mu _ { \mathrm { M L } } ^ { ( N ) }$ of the mean of the Gaussian, and the random variable $z$ is given by

z = \frac {\partial}{\partial \mu_ {\mathrm{ML}}} \ln p (x | \mu_ {\mathrm{ML}}, \sigma^ {2}) = \frac {1}{\sigma^ {2}} (x - \mu_ {\mathrm{ML}}).\tag{2.136}

Thus the distribution of $z$ is Gaussian with mean $\mu - \mu _ { \mathrm { M L } }$ , as illustrated in Figure 2.11. Substituting (2.136) into (2.135), we obtain the univariate form of (2.126), provided we choose the coefficients $a _ { N }$ to have the form $a _ { N } = \sigma ^ { 2 } / N$ . Note that although we have focussed on the case of a single variable, the same technique, together with the same restrictions (2.130)–(2.132) on the coefficients $a _ { N }$ , apply equally to the multivariate case (Blum, 1965).
