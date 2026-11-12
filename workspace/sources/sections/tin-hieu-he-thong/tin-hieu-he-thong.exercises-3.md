---
id: "tin-hieu-he-thong.exercises-3"
doc_id: "tin-hieu-he-thong"
title: "Exercises"
level: 2
heading_path: ["Probability Distributions", "Exercises"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-5-2-nearest-neighbour-methods"
next_id: "tin-hieu-he-thong.3-linear-models-for-regression"
block_ids: ["b1486", "b1487", "b1488", "b1489", "b1490", "b1491", "b1492", "b1493", "b1494", "b1495", "b1496", "b1497", "b1498", "b1499", "b1500", "b1501", "b1502", "b1503", "b1504", "b1505", "b1506", "b1507", "b1508", "b1509", "b1510", "b1511", "b1512", "b1513", "b1514", "b1515", "b1516", "b1517", "b1518", "b1519", "b1520", "b1521", "b1522", "b1523", "b1524", "b1525", "b1526", "b1527", "b1528", "b1529", "b1530", "b1531", "b1532", "b1533", "b1534", "b1535", "b1536", "b1537", "b1538", "b1539", "b1540", "b1541", "b1542", "b1543", "b1544", "b1545", "b1546", "b1547", "b1548", "b1549", "b1550", "b1551", "b1552", "b1553", "b1554", "b1555", "b1556", "b1557", "b1558", "b1559", "b1560", "b1561", "b1562", "b1563", "b1564", "b1565", "b1566", "b1567", "b1568", "b1569", "b1570", "b1571", "b1572", "b1573", "b1574", "b1575", "b1576", "b1577", "b1578", "b1579", "b1580", "b1581", "b1582", "b1583", "b1584", "b1585", "b1586", "b1587", "b1588", "b1589", "b1590", "b1591", "b1592", "b1593", "b1594", "b1595", "b1596", "b1597", "b1598", "b1599", "b1600", "b1601", "b1602", "b1603", "b1604", "b1605", "b1606", "b1607", "b1608", "b1609", "b1610", "b1611", "b1612", "b1613", "b1614", "b1615", "b1616", "b1617", "b1618", "b1619", "b1620", "b1621", "b1622", "b1623", "b1624"]
---

## Exercises

2.1 () www Verify that the Bernoulli distribution (2.2) satisfies the following properties

\sum_ {x = 0} ^ {1} p (x | \mu) = 1\tag{2.257}

\mathbb {E} [ x ] = \mu\tag{2.258}

\operatorname{var} [ x ] = \mu (1 - \mu).\tag{2.259}

Show that the entropy H[x] of a Bernoulli distributed random binary variable x is given by

\mathrm{H} [ x ] = - \mu \ln \mu - (1 - \mu) \ln (1 - \mu).\tag{2.260}

2.2 ( ) The form of the Bernoulli distribution given by (2.2) is not symmetric between the two values of x. In some situations, it will be more convenient to use an equivalent formulation for which $x \in \{ - 1 , 1 \}$ , in which case the distribution can be written

p (x | \mu) = \left(\frac {1 - \mu}{2}\right) ^ {(1 - x) / 2} \left(\frac {1 + \mu}{2}\right) ^ {(1 + x) / 2}\tag{2.261}

where $\mu \in [ - 1 , 1 ]$ . Show that the distribution (2.261) is normalized, and evaluate its mean, variance, and entropy.

2.3 ( ) www In this exercise, we prove that the binomial distribution (2.9) is normalized. First use the definition (2.10) of the number of combinations of m identical objects chosen from a total of N to show that

\binom {N} {m} + \binom {N} {m - 1} = \binom {N + 1} {m}.\tag{2.262}

Use this result to prove by induction the following result

(1 + x) ^ {N} = \sum_ {m = 0} ^ {N} {\binom {N} {m}} x ^ {m}\tag{2.263}

which is known as the binomial theorem, and which is valid for all real values of $x .$ Finally, show that the binomial distribution is normalized, so that

\sum_ {m = 0} ^ {N} \binom {N} {m} \mu^ {m} (1 - \mu) ^ {N - m} = 1\tag{2.264}

which can be done by first pulling out a factor $( 1 - \mu ) ^ { N }$ out of the summation and then making use of the binomial theorem.

2.4 ( ) Show that the mean of the binomial distribution is given by (2.11). To do this, differentiate both sides of the normalization condition (2.264) with respect to $\mu$ and then rearrange to obtain an expression for the mean of $n .$ . Similarly, by differentiating (2.264) twice with respect to $\mu$ and making use of the result (2.11) for the mean of the binomial distribution prove the result (2.12) for the variance of the binomial.

2.5 ( ) www In this exercise, we prove that the beta distribution, given by (2.13), is correctly normalized, so that (2.14) holds. This is equivalent to showing that

\int_ {0} ^ {1} \mu^ {a - 1} (1 - \mu) ^ {b - 1} \mathrm{d} \mu = \frac {\Gamma (a) \Gamma (b)}{\Gamma (a + b)}.\tag{2.265}

From the definition (1.141) of the gamma function, we have

\Gamma (a) \Gamma (b) = \int_ {0} ^ {\infty} \exp (- x) x ^ {a - 1} \mathrm{d} x \int_ {0} ^ {\infty} \exp (- y) y ^ {b - 1} \mathrm{d} y.\tag{2.266}

Use this expression to prove (2.265) as follows. First bring the integral over y inside the integrand of the integral over $x ,$ next make the change of variable $t = y + x$ where $x$ is fixed, then interchange the order of the $x$ and t integrations, and finally make the change of variable $x = t \mu$ where t is fixed.

2.6 () Make use of the result (2.265) to show that the mean, variance, and mode of the beta distribution (2.13) are given respectively by

\mathbb {E} [ \mu ] = \frac {a}{a + b}\tag{2.267}

\operatorname{var} [ \mu ] = \frac {a b}{(a + b) ^ {2} (a + b + 1)}\tag{2.268}

\mathrm{mode} [ \mu ] = \frac {a - 1}{a + b - 2}.\tag{2.269}

2.7 ( ) Consider a binomial random variable x given by (2.9), with prior distribution for µ given by the beta distribution (2.13), and suppose we have observed m occurrences of $x = 1$ and l occurrences of $x = 0$ . Show that the posterior mean value of x lies between the prior mean and the maximum likelihood estimate for $\mu .$ . To do this, show that the posterior mean can be written as λ times the prior mean plus $( 1 - \lambda )$ times the maximum likelihood estimate, where $0 \leqslant \lambda \leqslant 1$ . This illustrates the concept of the posterior distribution being a compromise between the prior distribution and the maximum likelihood solution.

2.8 () Consider two variables x and y with joint distribution $p ( x , y )$ . Prove the following two results

{\mathbb {E} [ x ]} = {\mathbb {E} _ {y} \left[ \mathbb {E} _ {x} [ x | y ] \right]}\tag{2.270}

\operatorname{var} [ x ] = \mathbb {E} _ {y} \left[ \operatorname{var} _ {x} [ x | y ] \right] + \operatorname{var} _ {y} \left[ \mathbb {E} _ {x} [ x | y ] \right].\tag{2.271}

Here $\mathbb { E } _ { x } [ x | y ]$ denotes the expectation of x under the conditional distribution $p ( x | y )$ ， with a similar notation for the conditional variance.

2.9 (  ) www . In this exercise, we prove the normalization of the Dirichlet distribution (2.38) using induction. We have already shown in Exercise 2.5 that the beta distribution, which is a special case of the Dirichlet for $M = 2$ , is normalized. We now assume that the Dirichlet distribution is normalized for $M - 1$ variables and prove that it is normalized for M variables. To do this, consider the Dirichlet distribution over M variables, and take account of the constraint $\textstyle \sum _ { k = 1 } ^ { M } \mu _ { k } = 1$ by eliminating $\mu _ { M }$ , so that the Dirichlet is written

p _ {M} (\mu_ {1}, \dots , \mu_ {M - 1}) = C _ {M} \prod_ {k = 1} ^ {M - 1} \mu_ {k} ^ {\alpha_ {k} - 1} \left(1 - \sum_ {j = 1} ^ {M - 1} \mu_ {j}\right) ^ {\alpha_ {M} - 1}\tag{2.272}

and our goal is to find an expression for $C _ { M }$ . To do this, integrate over $\mu _ { M - 1 }$ , taking care over the limits of integration, and then make a change of variable so that this integral has limits 0 and 1. By assuming the correct result for $C _ { M - 1 }$ and making use of (2.265), derive the expression for $C _ { M }$

( ) Using the property $\Gamma ( x + 1 ) = x \Gamma ( x )$ of the gamma function, derive the following results for the mean, variance, and covariance of the Dirichlet distribution given by (2.38)

\mathbb {E} [ \mu_ {j} ] = \frac {\alpha_ {j}}{\alpha_ {0}}\tag{2.273}

\mathrm{var} [ \mu_ {j} ] = \frac {\alpha_ {j} (\alpha_ {0} - \alpha_ {j})}{\alpha_ {0} ^ {2} (\alpha_ {0} + 1)}\tag{2.274}

\operatorname{cov} [ \mu_ {j} \mu_ {l} ] = - \frac {\alpha_ {j} \alpha_ {l}}{\alpha_ {0} ^ {2} (\alpha_ {0} + 1)}, \qquad j \neq l\tag{2.275}

where $\alpha _ { 0 }$ is defined by (2.39).

2.11 () www By expressing the expectation of ln $\mu _ { j }$ under the Dirichlet distribution (2.38) as a derivative with respect to $\alpha _ { j }$ , show that

\mathbb {E} [ \ln \mu_ {j} ] = \psi (\alpha_ {j}) - \psi (\alpha_ {0})\tag{2.276}

where $\alpha _ { 0 }$ is given by (2.39) and

\psi (a) \equiv \frac {d}{d a} \ln \Gamma (a)\tag{2.277}

is the digamma function.

2.12 () The uniform distribution for a continuous variable x is defined by

\mathrm{U} (x | a, b) = \frac {1}{b - a}, \qquad a \leqslant x \leqslant b.\tag{2.278}

Verify that this distribution is normalized, and find expressions for its mean and variance.

2.13 ( ) Evaluate the Kullback-Leibler divergence (1.113) between two Gaussians $p ( \mathbf { x } ) = \mathcal { N } ( \mathbf { x } | \boldsymbol { \mu } , \Sigma )$ and $q ( \mathbf { x } ) = \mathcal { N } ( \mathbf { x } | \mathbf { m } , \mathbf { L } )$

2.14 ( ) www This exercise demonstrates that the multivariate distribution with maximum entropy, for a given covariance, is a Gaussian. The entropy of a distribution $p ( \mathbf { x } )$ is given by

\mathrm{H} [ \mathbf {x} ] = - \int p (\mathbf {x}) \ln p (\mathbf {x}) \mathrm{d} \mathbf {x}.\tag{2.279}

We wish to maximize $\mathrm { H } [ \mathbf { x } ]$ over all distributions $p ( \mathbf { x } )$ subject to the constraints that $p ( \mathbf { x } )$ be normalized and that it have a specific mean and covariance, so that

\int p (\mathbf {x}) \mathrm{d} \mathbf {x} = 1\tag{2.280}

\int p (\mathbf {x}) \mathbf {x} \mathrm{d} \mathbf {x} = \pmb {\mu}\tag{2.281}

\int p (\mathbf {x}) (\mathbf {x} - \boldsymbol {\mu}) (\mathbf {x} - \boldsymbol {\mu}) ^ {\mathrm{T}} \mathrm{d} \mathbf {x} = \boldsymbol {\Sigma}.\tag{2.282}

By performing a variational maximization of (2.279) and using Lagrange multipliers to enforce the constraints (2.280), (2.281), and (2.282), show that the maximum likelihood distribution is given by the Gaussian (2.43).

2.15 ( ) Show that the entropy of the multivariate Gaussian $\mathcal { N } ( { \bf x } | \mu , \Sigma )$ is given by

\mathrm{H} [ \mathbf {x} ] = \frac {1}{2} \ln | \pmb {\Sigma} | + \frac {D}{2} (1 + \ln (2 \pi))\tag{2.283}

where $D$ is the dimensionality of $\mathbf { x } .$ .

2.16 (  ) www Consider two random variables $x _ { 1 }$ and $x _ { 2 }$ having Gaussian distributions with means $\mu _ { 1 } , \mu _ { 2 }$ and precisions $\tau _ { 1 } , \tau _ { 2 }$ respectively. Derive an expression for the differential entropy of the variable $x = x _ { 1 } + x _ { 2 }$ . To do this, first find the distribution of x by using the relation

p (x) = \int_ {- \infty} ^ {\infty} p (x | x _ {2}) p (x _ {2}) \mathrm{d} x _ {2}\tag{2.284}

and completing the square in the exponent. Then observe that this represents the convolution of two Gaussian distributions, which itself will be Gaussian, and finally make use of the result (1.110) for the entropy of the univariate Gaussian.

2.17 () www Consider the multivariate Gaussian distribution given by (2.43). By writing the precision matrix (inverse covariance matrix) $\pmb { \Sigma } ^ { - 1 }$ as the sum of a symmetric and an anti-symmetric matrix, show that the anti-symmetric term does not appear in the exponent of the Gaussian, and hence that the precision matrix may be taken to be symmetric without loss of generality. Because the inverse of a symmetric matrix is also symmetric (see Exercise 2.22), it follows that the covariance matrix may also be chosen to be symmetric without loss of generality.

2.18 (  ) Consider a real, symmetric matrix Σ whose eigenvalue equation is given by (2.45). By taking the complex conjugate of this equation and subtracting the original equation, and then forming the inner product with eigenvector ${ \bf { u } } _ { i } .$ , show that the eigenvalues $\lambda _ { i }$ are real. Similarly, use the symmetry property of Σ to show that two eigenvectors $\mathbf { u } _ { i }$ and $\mathbf { u } _ { j }$ will be orthogonal provided $\lambda _ { j } \neq \lambda _ { i }$ . Finally, show that without loss of generality, the set of eigenvectors can be chosen to be orthonormal, so that they satisfy (2.46), even if some of the eigenvalues are zero.

2.19 ( ) Show that a real, symmetric matrix Σ having the eigenvector equation (2.45) can be expressed as an expansion in the eigenvectors, with coefficients given by the eigenvalues, of the form (2.48). Similarly, show that the inverse matrix $\pmb { \Sigma } ^ { - 1 }$ has a representation of the form (2.49).

2.20 ( ) www A positive definite matrix Σ can be defined as one for which the quadratic form

\mathbf {a} ^ {\mathrm{T}} \boldsymbol {\Sigma} \mathbf {a}\tag{2.285}

is positive for any real value of the vector a. Show that a necessary and sufficient condition for Σ to be positive definite is that all of the eigenvalues $\lambda _ { i }$ of Σ, defined by (2.45), are positive.

2.21 () Show that a real, symmetric matrix of size $D \times D$ has $D ( D + 1 ) / 2$ independent parameters.

2.22 () www Show that the inverse of a symmetric matrix is itself symmetric.

2.23 ( ) By diagonalizing the coordinate system using the eigenvector expansion (2.45), show that the volume contained within the hyperellipsoid corresponding to a constant

Mahalanobis distance $\Delta$ is given by

V _ {D} | \pmb {\Sigma} | ^ {1 / 2} \Delta^ {D}\tag{2.286}

where $V _ { D }$ is the volume of the unit sphere in D dimensions, and the Mahalanobis distance is defined by (2.44).

2.24 ( ) www Prove the identity (2.76) by multiplying both sides by the matrix

\left( \begin{array}{c c} \mathbf {A} & \mathbf {B} \\ \mathbf {C} & \mathbf {D} \end{array} \right)\tag{2.287}

and making use of the definition (2.77).

2.25 ( ) In Sections 2.3.1 and 2.3.2, we considered the conditional and marginal distributions for a multivariate Gaussian. More generally, we can consider a partitioning of the components of x into three groups $\mathbf { x } _ { a } , \mathbf { x } _ { b }$ , and $\mathbf { x } _ { c }$ , with a corresponding partitioning of the mean vector $\pmb { \mu }$ and of the covariance matrix Σ in the form

\boldsymbol {\mu} = \left( \begin{array}{c} \boldsymbol {\mu} _ {a} \\ \boldsymbol {\mu} _ {b} \\ \boldsymbol {\mu} _ {c} \end{array} \right), \qquad \boldsymbol {\Sigma} = \left( \begin{array}{c c c} \boldsymbol {\Sigma} _ {a a} & \boldsymbol {\Sigma} _ {a b} & \boldsymbol {\Sigma} _ {a c} \\ \boldsymbol {\Sigma} _ {b a} & \boldsymbol {\Sigma} _ {b b} & \boldsymbol {\Sigma} _ {b c} \\ \boldsymbol {\Sigma} _ {c a} & \boldsymbol {\Sigma} _ {c b} & \boldsymbol {\Sigma} _ {c c} \end{array} \right).\tag{2.288}

By making use of the results of Section 2.3, find an expression for the conditional distribution $p ( \mathbf { x } _ { a } | \mathbf { x } _ { b } )$ in which $\mathbf { x } _ { c }$ has been marginalized out.

( ) A very useful result from linear algebra is the Woodbury matrix inversion formula given by

(\mathbf {A} + \mathbf {B C D}) ^ {- 1} = \mathbf {A} ^ {- 1} - \mathbf {A} ^ {- 1} \mathbf {B} (\mathbf {C} ^ {- 1} + \mathbf {D A} ^ {- 1} \mathbf {B}) ^ {- 1} \mathbf {D A} ^ {- 1}.\tag{2.289}

By multiplying both sides by (A + BCD) prove the correctness of this result.

2.27 () Let x and z be two independent random vectors, so that $p ( \mathbf { x } , \mathbf { z } ) = p ( \mathbf { x } ) p ( \mathbf { z } )$ Show that the mean of their sum $\mathbf { y } = \mathbf { x } + \mathbf { z }$ is given by the sum of the means of each of the variable separately. Similarly, show that the covariance matrix of y is given by the sum of the covariance matrices of x and z. Confirm that this result agrees with that of Exercise 1.10.

2.28 (  ) www Consider a joint distribution over the variable

\mathbf {z} = \binom{\mathbf {x}}{\mathbf {y}}\tag{2.290}

whose mean and covariance are given by (2.108) and (2.105) respectively. By making use of the results (2.92) and (2.93) show that the marginal distribution $p ( \mathbf { x } )$ is given (2.99). Similarly, by making use of the results (2.81) and (2.82) show that the conditional distribution $p ( \mathbf { y } \vert \mathbf { x } )$ is given by (2.100).

2.29 ( ) Using the partitioned matrix inversion formula (2.76), show that the inverse of the precision matrix (2.104) is given by the covariance matrix (2.105).

2.30 () By starting from (2.107) and making use of the result (2.105), verify the result (2.108).

2.31 ( ) Consider two multidimensional random vectors x and z having Gaussian distributions $p ( \mathbf { x } ) = \mathcal { N } ( \mathbf { x } | \pmb { \mu _ { \mathbf { x } } } , \pmb { \Sigma _ { \mathbf { x } } } )$ and $p ( \mathbf { z } ) = \mathcal { N } ( \mathbf { z } | \boldsymbol { \mu } _ { \mathbf { z } } , \Sigma _ { \mathbf { z } } )$ respectively, together with their sum ${ \bf y } = { \bf x } + { \bf z }$ . Use the results (2.109) and (2.110) to find an expression for the marginal distribution $p ( \mathbf { y } )$ by considering the linear-Gaussian model comprising the product of the marginal distribution $p ( \mathbf { x } )$ and the conditional distribution $p ( \mathbf { y } \vert \mathbf { x } )$

2.32 (  ) www This exercise and the next provide practice at manipulating the quadratic forms that arise in linear-Gaussian models, as well as giving an independent check of results derived in the main text. Consider a joint distribution $p ( \mathbf { x } , \mathbf { y } )$ defined by the marginal and conditional distributions given by (2.99) and (2.100). By examining the quadratic form in the exponent of the joint distribution, and using the technique of ‘completing the square’ discussed in Section 2.3, find expressions for the mean and covariance of the marginal distribution $p ( \mathbf { y } )$ in which the variable x has been integrated out. To do this, make use of the Woodbury matrix inversion formula (2.289). Verify that these results agree with (2.109) and (2.110) obtained using the results of Chapter 2.

2.33 (  ) Consider the same joint distribution as in Exercise 2.32, but now use the technique of completing the square to find expressions for the mean and covariance of the conditional distribution $p ( \mathbf { x } | \mathbf { y } )$ . Again, verify that these agree with the corresponding expressions (2.111) and (2.112).

2.34 ( ) www To find the maximum likelihood solution for the covariance matrix of a multivariate Gaussian, we need to maximize the log likelihood function (2.118) with respect to Σ, noting that the covariance matrix must be symmetric and positive definite. Here we proceed by ignoring these constraints and doing a straightforward maximization. Using the results (C.21), (C.26), and (C.28) from Appendix C, show that the covariance matrix Σ that maximizes the log likelihood function (2.118) is given by the sample covariance (2.122). We note that the final result is necessarily symmetric and positive definite (provided the sample covariance is nonsingular).

2.35 ( ) Use the result (2.59) to prove (2.62). Now, using the results (2.59), and (2.62), show that

\mathbb {E} [ \mathbf {x} _ {n} \mathbf {x} _ {m} ] = \pmb {\mu} \pmb {\mu} ^ {\mathrm{T}} + I _ {n m} \pmb {\Sigma}\tag{2.291}

where ${ \bf x } _ { n }$ denotes a data point sampled from a Gaussian distribution with mean $\pmb { \mu }$ and covariance Σ, and $I _ { n m }$ denotes the $( n , m )$ element of the identity matrix. Hence prove the result (2.124).

2.36 ( ) www Using an analogous procedure to that used to obtain (2.126), derive an expression for the sequential estimation of the variance of a univariate Gaussian distribution, by starting with the maximum likelihood expression

\sigma_ {\mathrm{ML}} ^ {2} = \frac {1}{N} \sum_ {n = 1} ^ {N} (x _ {n} - \mu) ^ {2}.\tag{2.292}

Verify that substituting the expression for a Gaussian distribution into the Robbins-Monro sequential estimation formula (2.135) gives a result of the same form, and hence obtain an expression for the corresponding coefficients $a _ { N }$

2.37 ( ) Using an analogous procedure to that used to obtain (2.126), derive an expression for the sequential estimation of the covariance of a multivariate Gaussian distribution, by starting with the maximum likelihood expression (2.122). Verify that substituting the expression for a Gaussian distribution into the Robbins-Monro sequential estimation formula (2.135) gives a result of the same form, and hence obtain an expression for the corresponding coefficients $a _ { N }$

2.38 () Use the technique of completing the square for the quadratic form in the exponent to derive the results (2.141) and (2.142).

2.39 ( ) Starting from the results (2.141) and (2.142) for the posterior distribution of the mean of a Gaussian random variable, dissect out the contributions from the first $N - 1$ data points and hence obtain expressions for the sequential update of $\mu _ { N }$ and $\sigma _ { N } ^ { 2 }$ . Now derive the same results starting from the posterior distribution $p ( \mu | x _ { 1 } , \ldots , x _ { N - 1 } ) = \mathcal { N } ( \mu | \mu _ { N - 1 } , \sigma _ { N - 1 } ^ { 2 } )$ and multiplying by the likelihood function $p ( x _ { N } | \mu ) = \mathcal { N } ( x _ { N } | \mu , \sigma ^ { 2 } )$ and then completing the square and normalizing to obtain the posterior distribution after N observations.

2.40 ( ) www Consider a D-dimensional Gaussian random variable x with distribution $\sqrt { ( \mathbf { x } | \mu , \Sigma ) }$ in which the covariance Σ is known and for which we wish to infer the mean µ from a set of observations $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ . Given a prior distribution $p ( \pmb { \mu } ) = \mathcal { N } ( \pmb { \mu } | \pmb { \mu } _ { 0 } , \pmb { \Sigma } _ { 0 } )$ , find the corresponding posterior distribution $p ( { \boldsymbol { \mu } } | \mathbf { X } )$

2.41 () Use the definition of the gamma function (1.141) to show that the gamma distribution (2.146) is normalized.

2.42 ( ) Evaluate the mean, variance, and mode of the gamma distribution (2.146).

2.43 () The following distribution

p (x | \sigma^ {2}, q) = \frac {q}{2 (2 \sigma^ {2}) ^ {1 / q} \Gamma (1 / q)} \exp \left(- \frac {| x | ^ {q}}{2 \sigma^ {2}}\right)\tag{2.293}

is a generalization of the univariate Gaussian distribution. Show that this distribution is normalized so that

\int_ {- \infty} ^ {\infty} p (x | \sigma^ {2}, q) \mathrm{d} x = 1\tag{2.294}

and that it reduces to the Gaussian when $q \ : = \ : 2$ . Consider a regression model in which the target variable is given by $t = y ( \mathbf { x } , \mathbf { w } ) + \epsilon$ and  is a random noise variable drawn from the distribution (2.293). Show that the log likelihood function over w and $\sigma ^ { 2 }$ , for an observed data set of input vectors $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ and corresponding target variables $\mathbf { t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { \hat { T } } }$ , is given by

\ln p (\mathbf {t} | \mathbf {X}, \mathbf {w}, \sigma^ {2}) = - \frac {1}{2 \sigma^ {2}} \sum_ {n = 1} ^ {N} | y (\mathbf {x} _ {n}, \mathbf {w}) - t _ {n} | ^ {q} - \frac {N}{q} \ln (2 \sigma^ {2}) + \mathrm{const}\tag{2.295}

where ‘const’ denotes terms independent of both w and $\sigma ^ { 2 }$ . Note that, as a function of w, this is the $L _ { q }$ error function considered in Section 1.5.5.

2.44 ( ) Consider a univariate Gaussian distribution $\mathcal { N } ( \boldsymbol { x } | \mu , \tau ^ { - 1 } )$ having conjugate Gaussian-gamma prior given by (2.154), and a data set $\mathbf { x } = \{ x _ { 1 } , \ldots , x _ { N } \}$ of i.i.d. observations. Show that the posterior distribution is also a Gaussian-gamma distribution of the same functional form as the prior, and write down expressions for the parameters of this posterior distribution.

2.45 () Verify that the Wishart distribution defined by (2.155) is indeed a conjugate prior for the precision matrix of a multivariate Gaussian.

2.46 () www Verify that evaluating the integral in (2.158) leads to the result (2.159).

2.47 () www Show that in the limit $\nu \to \infty$ , the t-distribution (2.159) becomes a Gaussian. Hint: ignore the normalization coefficient, and simply look at the dependence on x.

2.48 () By following analogous steps to those used to derive the univariate Student’s t-distribution (2.159), verify the result (2.162) for the multivariate form of the Student’s t-distribution, by marginalizing over the variable $\eta$ in (2.161). Using the definition (2.161), show by exchanging integration variables that the multivariate t-distribution is correctly normalized.

2.49 ( ) By using the definition (2.161) of the multivariate Student’s t-distribution as a convolution of a Gaussian with a gamma distribution, verify the properties (2.164), (2.165), and (2.166) for the multivariate t-distribution defined by (2.162).

2.50 () Show that in the limit $\nu \to \infty$ , the multivariate Student’s t-distribution (2.162) reduces to a Gaussian with mean $\pmb { \mu }$ and precision Λ.

2.51 () www The various trigonometric identities used in the discussion of periodic variables in this chapter can be proven easily from the relation

\exp (i A) = \cos A + i \sin A\tag{2.296}

in which i is the square root of minus one. By considering the identity

\exp (i A) \exp (- i A) = 1\tag{2.297}

prove the result (2.177). Similarly, using the identity

\cos (A - B) = \Re \exp \{i (A - B) \}\tag{2.298}

where  denotes the real part, prove (2.178). Finally, by using sin $( A - B ) =$ exp $\{ i ( A - B ) \}$ , where $\Im$ denotes the imaginary part, prove the result (2.183).

2.52 ( ) For large m, the von Mises distribution (2.179) becomes sharply peaked around the mode $\theta _ { 0 }$ . By defining $\xi = m ^ { 1 / 2 } ( \theta - \theta _ { 0 } )$ and making the Taylor expansion of the cosine function given by

\cos \alpha = 1 - \frac {\alpha^ {2}}{2} + O (\alpha^ {4})\tag{2.299}

show that as $m  \infty ,$ , the von Mises distribution tends to a Gaussian.

2.53 () Using the trigonometric identity (2.183), show that solution of (2.182) for $\theta _ { 0 }$ is given by (2.184).

2.54 () By computing first and second derivatives of the von Mises distribution (2.179), and using $I _ { 0 } ( m ) > 0$ for $m > 0$ , show that the maximum of the distribution occurs when $\theta = \theta _ { 0 }$ and that the minimum occurs when $\theta = \theta _ { 0 } + \pi \left( { \mathrm { m o d } } 2 \pi \right)$

2.55 () By making use of the result (2.168), together with (2.184) and the trigonometric identity (2.178), show that the maximum likelihood solution $m _ { \mathrm { M L } }$ for the concentration of the von Mises distribution satisfies $A ( m _ { \mathrm { M L } } ) = \overline { { r } }$ where $\overline { r }$ is the radius of the mean of the observations viewed as unit vectors in the two-dimensional Euclidean plane, as illustrated in Figure 2.17.

2.56 ( ) www Express the beta distribution (2.13), the gamma distribution (2.146), and the von Mises distribution (2.179) as members of the exponential family (2.194) and thereby identify their natural parameters.

2.57 () Verify that the multivariate Gaussian distribution can be cast in exponential family form (2.194) and derive expressions for η, $\mathbf { u } ( \mathbf { x } ) , h ( \mathbf { x } )$ and $g ( \pmb { \eta } )$ analogous to (2.220)–(2.223).

2.58 () The result (2.226) showed that the negative gradient of ln $g ( \pmb { \eta } )$ for the exponential family is given by the expectation of $\mathbf { u } ( \mathbf { x } )$ . By taking the second derivatives of (2.195), show that

- \nabla \nabla \ln g (\boldsymbol {\eta}) = \mathbb {E} [ \mathbf {u} (\mathbf {x}) \mathbf {u} (\mathbf {x}) ^ {\mathrm{T}} ] - \mathbb {E} [ \mathbf {u} (\mathbf {x}) ] \mathbb {E} [ \mathbf {u} (\mathbf {x}) ^ {\mathrm{T}} ] = \operatorname{cov} [ \mathbf {u} (\mathbf {x}) ].\tag{2.300}

2.59 () By changing variables using $y = x / \sigma$ , show that the density (2.236) will be correctly normalized, provided $f ( x )$ is correctly normalized.

2.60 ( ) www Consider a histogram-like density model in which the space x is divided into fixed regions for which the density $p ( \mathbf { x } )$ takes the constant value $h _ { i }$ over the $i ^ { \mathrm { t h } }$ region, and that the volume of region i is denoted $\Delta _ { i }$ . Suppose we have a set of N observations of x such that $n _ { i }$ of these observations fall in region i. Using a Lagrange multiplier to enforce the normalization constraint on the density, derive an expression for the maximum likelihood estimator for the $\{ h _ { i } \}$

2.61 () Show that the K-nearest-neighbour density model defines an improper distribution whose integral over all space is divergent.
