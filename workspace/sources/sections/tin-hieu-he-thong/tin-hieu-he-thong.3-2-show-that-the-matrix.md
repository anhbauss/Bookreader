---
id: "tin-hieu-he-thong.3-2-show-that-the-matrix"
doc_id: "tin-hieu-he-thong"
title: "3.2 (\f \f) Show that the matrix"
level: 2
heading_path: ["3 Linear Models for Regression", "3.2 (\f \f) Show that the matrix"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.exercises-4"
next_id: "tin-hieu-he-thong.4-linear-models-for-classification"
block_ids: ["b2001", "b2002", "b2003", "b2004", "b2005", "b2006", "b2007", "b2008", "b2009", "b2010", "b2011", "b2012", "b2013", "b2014", "b2015", "b2016", "b2017", "b2018", "b2019", "b2020", "b2021", "b2022", "b2023", "b2024", "b2025", "b2026", "b2027", "b2028", "b2029", "b2030", "b2031", "b2032", "b2033", "b2034", "b2035", "b2036", "b2037", "b2038", "b2039", "b2040", "b2041", "b2042", "b2043", "b2044", "b2045", "b2046", "b2047", "b2048", "b2049", "b2050", "b2051", "b2052", "b2053", "b2054"]
---

## 3.2 ( ) Show that the matrix

\boldsymbol {\Phi} \left(\boldsymbol {\Phi} ^ {T} \boldsymbol {\Phi}\right) ^ {- 1} \boldsymbol {\Phi} ^ {T}\tag{3.103}

takes any vector v and projects it onto the space spanned by the columns of Φ. Use this result to show that the least-squares solution (3.15) corresponds to an orthogonal projection of the vector t onto the manifold as shown in Figure 3.2.

3.3 () Consider a data set in which each data point $t _ { n }$ is associated with a weighting factor $r _ { n } > 0$ , so that the sum-of-squares error function becomes

E _ {D} (\mathbf {w}) = \frac {1}{2} \sum_ {n = 1} ^ {N} r _ {n} \left\{t _ {n} - \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) \right\} ^ {2}.\tag{3.104}

Find an expression for the solution $\mathbf { w } ^ { \star }$ that minimizes this error function. Give two alternative interpretations of the weighted sum-of-squares error function in terms of (i) data dependent noise variance and (ii) replicated data points.

3.4 () www Consider a linear model of the form

y (x, \mathbf {w}) = w _ {0} + \sum_ {i = 1} ^ {D} w _ {i} x _ {i}\tag{3.105}

together with a sum-of-squares error function of the form

E _ {D} (\mathbf {w}) = \frac {1}{2} \sum_ {n = 1} ^ {N} \left\{y (x _ {n}, \mathbf {w}) - t _ {n} \right\} ^ {2}.\tag{3.106}

Now suppose that Gaussian noise $\epsilon _ { i }$ with zero mean and variance $\sigma ^ { 2 }$ is added independently to each of the input variables $x _ { i }$ . By making use of $\mathbb { E } [ \epsilon _ { i } ] = 0$ and $\mathbb { E } [ \mathsf { \bar { \epsilon } } _ { i } \epsilon _ { j } ] = \mathsf { \bar { \delta } } _ { i j } \sigma ^ { 2 }$ , show that minimizing $E _ { D }$ averaged over the noise distribution is equivalent to minimizing the sum-of-squares error for noise-free input variables with the addition of a weight-decay regularization term, in which the bias parameter $w _ { 0 }$ is omitted from the regularizer.

3.5 () www Using the technique of Lagrange multipliers, discussed in Appendix E, show that minimization of the regularized error function (3.29) is equivalent to minimizing the unregularized sum-of-squares error (3.12) subject to the constraint (3.30). Discuss the relationship between the parameters η and λ.

3.6 () www Consider a linear basis function regression model for a multivariate target variable t having a Gaussian distribution of the form

p (\mathbf {t} | \mathbf {W}, \boldsymbol {\Sigma}) = \mathcal {N} (\mathbf {t} | \mathbf {y} (\mathbf {x}, \mathbf {W}), \boldsymbol {\Sigma})\tag{3.107}

where

\mathbf {y} (\mathbf {x}, \mathbf {W}) = \mathbf {W} ^ {\mathrm{T}} \boldsymbol {\phi} (\mathbf {x})\tag{3.108}

together with a training data set comprising input basis vectors $\phi (  { \mathbf { x } } _ { n } )$ and corresponding target vectors $\mathbf { t } _ { n }$ , with $n = 1 , \ldots , N$ . Show that the maximum likelihood solution ${ \bf W } _ { \mathrm { M L } }$ for the parameter matrix W has the property that each column is given by an expression of the form (3.15), which was the solution for an isotropic noise distribution. Note that this is independent of the covariance matrix Σ. Show that the maximum likelihood solution for Σ is given by

\pmb {\Sigma} = \frac {1}{N} \sum_ {n = 1} ^ {N} \left(\mathbf {t} _ {n} - \mathbf {W} _ {\mathrm{ML}} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n})\right) \left(\mathbf {t} _ {n} - \mathbf {W} _ {\mathrm{ML}} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n})\right) ^ {\mathrm{T}}.\tag{3.109}

3.7 () By using the technique of completing the square, verify the result (3.49) for the posterior distribution of the parameters w in the linear basis function model in which m<sub>N</sub> and $\mathbf { S } _ { N }$ are defined by (3.50) and (3.51) respectively.

3.8 ( ) www Consider the linear basis function model in Section 3.1, and suppose that we have already observed N data points, so that the posterior distribution over w is given by (3.49). This posterior can be regarded as the prior for the next observation. By considering an additional data point $\left( { \bf x } _ { N + 1 } , t _ { N + 1 } \right)$ , and by completing the square in the exponential, show that the resulting posterior distribution is again given by (3.49) but with $\mathbf { S } _ { N }$ replaced by $\mathbf { S } _ { N + 1 }$ and $\mathbf { m } _ { N }$ replaced by m $N { + 1 }$

3.9 ( ) Repeat the previous exercise but instead of completing the square by hand, make use of the general result for linear-Gaussian models given by (2.116).

3.10 ( ) www By making use of the result (2.115) to evaluate the integral in (3.57), verify that the predictive distribution for the Bayesian linear regression model is given by (3.58) in which the input-dependent variance is given by (3.59).

3.11 ( ) We have seen that, as the size of a data set increases, the uncertainty associated with the posterior distribution over model parameters decreases. Make use of the matrix identity (Appendix C)

\left(\mathbf {M} + \mathbf {v v} ^ {\mathrm{T}}\right) ^ {- 1} = \mathbf {M} ^ {- 1} - \frac {\left(\mathbf {M} ^ {- 1} \mathbf {v}\right) \left(\mathbf {v} ^ {\mathrm{T}} \mathbf {M} ^ {- 1}\right)}{1 + \mathbf {v} ^ {\mathrm{T}} \mathbf {M} ^ {- 1} \mathbf {v}}\tag{3.110}

to show that the uncertainty $\sigma _ { N } ^ { 2 } ( \mathbf { x } )$ associated with the linear regression function given by (3.59) satisfies

\sigma_ {N + 1} ^ {2} (\mathbf {x}) \leqslant \sigma_ {N} ^ {2} (\mathbf {x}).\tag{3.111}

3.12 ( ) We saw in Section 2.3.6 that the conjugate prior for a Gaussian distribution with unknown mean and unknown precision (inverse variance) is a normal-gamma distribution. This property also holds for the case of the conditional Gaussian distribution $p ( t | \mathbf { x } , \mathbf { w } , \beta )$ of the linear regression model. If we consider the likelihood function (3.10), then the conjugate prior for w and $\beta$ is given by

p (\mathbf {w}, \beta) = \mathcal {N} (\mathbf {w} | \mathbf {m} _ {0}, \beta^ {- 1} \mathbf {S} _ {0}) \mathrm{Gam} (\beta | a _ {0}, b _ {0}).\tag{3.112}

Show that the corresponding posterior distribution takes the same functional form, so that

p (\mathbf {w}, \beta | \mathbf {t}) = \mathcal {N} (\mathbf {w} | \mathbf {m} _ {N}, \beta^ {- 1} \mathbf {S} _ {N}) \mathrm{Gam} (\beta | a _ {N}, b _ {N})\tag{3.113}

and find expressions for the posterior parameters m ${ \bf \Phi } _ { N } , { \bf S } _ { N } , a _ { N }$ , and $b _ { N }$ .

3.13 ( ) Show that the predictive distribution $p ( t | \mathbf { x } , \mathbf { t } )$ for the model discussed in Exercise 3.12 is given by a Student’s t-distribution of the form

p (t | \mathbf {x}, \mathbf {t}) = \operatorname{St} (t | \mu , \lambda , \nu)\tag{3.114}

and obtain expressions for $\mu , \lambda$ and $\nu .$

3.14 ( ) In this exercise, we explore in more detail the properties of the equivalent kernel defined by (3.62), where $\mathbf { S } _ { N }$ is defined by (3.54). Suppose that the basis functions $\phi _ { j } ( \mathbf { x } )$ are linearly independent and that the number $\bar { N }$ of data points is greater than the number $M$ of basis functions. Furthermore, let one of the basis functions be constant, say $\phi _ { 0 } ( \mathbf { x } ) = 1$ . By taking suitable linear combinations of these basis functions, we can construct a new basis set $\psi _ { j } ( \mathbf { x } )$ spanning the same space but that are orthonormal, so that

\sum_ {n = 1} ^ {N} \psi_ {j} (\mathbf {x} _ {n}) \psi_ {k} (\mathbf {x} _ {n}) = I _ {j k}\tag{3.115}

where $I _ { j k }$ is defined to be 1 i ${ \mathrm { : ~ } } j = k$ and 0 otherwise, and we take $\psi _ { 0 } ( \mathbf { x } ) = 1$ . Show that for $\alpha = 0$ , the equivalent kernel can be written as $k ( { \bf x } , { \bf x } ^ { \prime } ) = \ddot { \psi } ( { \bf x } ) ^ { \mathrm { T } } \psi ( { \bf x } ^ { \prime } )$ where $\psi = ( \psi _ { 1 } , \ldots , \bar { \psi } _ { M } ) ^ { \mathrm { T } }$ . Use this result to show that the kernel satisfies the summation constraint

\sum_ {n = 1} ^ {N} k (\mathbf {x}, \mathbf {x} _ {n}) = 1.\tag{3.116}

3.15 () www Consider a linear basis function model for regression in which the parameters $\alpha$ and $\beta$ are set using the evidence framework. Show that the function $E ( \mathbf { m } _ { N } )$ defined by (3.82) satisfies the relation $2 E ( { \bf m } _ { N } ) = N$

3.16 ( ) Derive the result (3.86) for the log evidence function $p ( \mathbf { t } | \alpha , \beta )$ of the linear regression model by making use of (2.115) to evaluate the integral (3.77) directly.

3.17 () Show that the evidence function for the Bayesian linear regression model can be written in the form (3.78) in which $E ( \mathbf { w } )$ is defined by (3.79).

3.18 ( ) www By completing the square over w, show that the error function (3.79) in Bayesian linear regression can be written in the form (3.80).

3.19 ( ) Show that the integration over w in the Bayesian linear regression model gives the result (3.85). Hence show that the log marginal likelihood is given by (3.86).

3.20 ( ) www Starting from (3.86) verify all of the steps needed to show that maximization of the log marginal likelihood function (3.86) with respect to α leads to the re-estimation equation (3.92).

3.21 ( ) An alternative way to derive the result (3.92) for the optimal value of α in the evidence framework is to make use of the identity

\frac {d}{d \alpha} \ln | \mathbf {A} | = \operatorname{Tr} \left(\mathbf {A} ^ {- 1} \frac {d}{d \alpha} \mathbf {A}\right).\tag{3.117}

Prove this identity by considering the eigenvalue expansion of a real, symmetric matrix A, and making use of the standard results for the determinant and trace of A expressed in terms of its eigenvalues (Appendix C). Then make use of (3.117) to derive (3.92) starting from (3.86).

3.22 ( ) Starting from (3.86) verify all of the steps needed to show that maximization of the log marginal likelihood function (3.86) with respect to $\beta$ leads to the re-estimation equation (3.95).

3.23 ( ) www Show that the marginal probability of the data, in other words the model evidence, for the model described in Exercise 3.12 is given by

p (\mathbf {t}) = \frac {1}{(2 \pi) ^ {N / 2}} \frac {b _ {0} ^ {a _ {0}}}{b _ {N} ^ {a _ {N}}} \frac {\Gamma (a _ {N})}{\Gamma (a _ {0})} \frac {| \mathbf {S} _ {N} | ^ {1 / 2}}{| \mathbf {S} _ {0} | ^ {1 / 2}}\tag{3.118}

by first marginalizing with respect to w and then with respect to $\beta .$

3.24 ( ) Repeat the previous exercise but now use Bayes’ theorem in the form

p (\mathbf {t}) = \frac {p (\mathbf {t} | \mathbf {w} , \beta) p (\mathbf {w} , \beta)}{p (\mathbf {w} , \beta | \mathbf {t})}\tag{3.119}

and then substitute for the prior and posterior distributions and the likelihood function in order to derive the result (3.118).
