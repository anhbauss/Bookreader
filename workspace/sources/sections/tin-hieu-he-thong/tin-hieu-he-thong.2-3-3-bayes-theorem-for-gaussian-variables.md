---
id: "tin-hieu-he-thong.2-3-3-bayes-theorem-for-gaussian-variables"
doc_id: "tin-hieu-he-thong"
title: "2.3.3 Bayes\u2019 theorem for Gaussian variables"
level: 2
heading_path: ["Probability Distributions", "2.3.3 Bayes\u2019 theorem for Gaussian variables"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-3-2-marginal-gaussian-distributions"
next_id: "tin-hieu-he-thong.marginal-and-conditional-gaussians"
block_ids: ["b1035", "b1036", "b1037", "b1038", "b1039", "b1040", "b1041", "b1042", "b1043", "b1044", "b1045", "b1046", "b1047", "b1048", "b1049", "b1050", "b1051", "b1052", "b1053", "b1054", "b1055", "b1056", "b1057", "b1058", "b1059", "b1060", "b1061", "b1062", "b1063", "b1064"]
---

## 2.3.3 Bayes’ theorem for Gaussian variables

In Sections 2.3.1 and 2.3.2, we considered a Gaussian $p ( \mathbf { x } )$ in which we partitioned the vector x into two subvectors $\mathbf { x } = \left( \mathbf { x } _ { a } , \mathbf { x } _ { b } \right)$ and then found expressions for the conditional distribution $p ( \mathbf { x } _ { a } | \mathbf { x } _ { b } )$ and the marginal distribution $p ( \mathbf { x } _ { a } )$ . We noted that the mean of the conditional distribution $p ( \mathbf { x } _ { a } | \mathbf { x } _ { b } )$ was a linear function of $\mathbf { x } _ { b }$ Here we shall suppose that we are given a Gaussian marginal distribution $p ( \mathbf { x } )$ and a Gaussian conditional distribution $p ( \mathbf { y } \vert \mathbf { x } )$ in which $p ( \mathbf { y } \vert \mathbf { x } )$ has a mean that is a linear function of x, and a covariance which is independent of x. This is an example of a linear Gaussian model (Roweis and Ghahramani, 1999), which we shall study in greater generality in Section 8.1.4. We wish to find the marginal distribution $p ( \mathbf { y } )$ and the conditional distribution $p ( \mathbf { x } | \mathbf { y } )$ . This is a problem that will arise frequently in subsequent chapters, and it will prove convenient to derive the general results here.

We shall take the marginal and conditional distributions to be

p (\mathbf {x}) = \mathcal {N} \left(\mathbf {x} | \boldsymbol {\mu}, \boldsymbol {\Lambda} ^ {- 1}\right)\tag{2.99}

p (\mathbf {y} | \mathbf {x}) = \mathcal {N} \left(\mathbf {y} | \mathbf {A x} + \mathbf {b}, \mathbf {L} ^ {- 1}\right)\tag{2.100}

where $\pmb { \mu }$ , A, and b are parameters governing the means, and Λ and L are precision matrices. If x has dimensionality M and y has dimensionality D, then the matrix A has size $D \times M$

First we find an expression for the joint distribution over x and $\mathbf { y } .$ To do this, we define

\mathbf {z} = \binom{\mathbf {x}}{\mathbf {y}}\tag{2.101}

and then consider the log of the joint distribution

\begin{array}{r c l} \ln p (\mathbf {z}) & = & \ln p (\mathbf {x}) + \ln p (\mathbf {y} | \mathbf {x}) \\ & = & - \frac {1}{2} (\mathbf {x} - \boldsymbol {\mu}) ^ {\mathrm{T}} \boldsymbol {\Lambda} (\mathbf {x} - \boldsymbol {\mu}) \\ & & - \frac {1}{2} (\mathbf {y} - \mathbf {A x} - \mathbf {b}) ^ {\mathrm{T}} \mathbf {L} (\mathbf {y} - \mathbf {A x} - \mathbf {b}) + \mathrm{const} \end{array}\tag{2.102}

where ‘const’ denotes terms independent of x and y. As before, we see that this is a quadratic function of the components of z, and hence $p ( \mathbf { z } )$ is Gaussian distribution. To find the precision of this Gaussian, we consider the second order terms in (2.102), which can be written as

\begin{array}{r l} & - \frac {1}{2} \mathbf {x} ^ {\mathrm{T}} (\boldsymbol {\Lambda} + \mathbf {A} ^ {\mathrm{T}} \mathbf {L A}) \mathbf {x} - \frac {1}{2} \mathbf {y} ^ {\mathrm{T}} \mathbf {L y} + \frac {1}{2} \mathbf {y} ^ {\mathrm{T}} \mathbf {L A x} + \frac {1}{2} \mathbf {x} ^ {\mathrm{T}} \mathbf {A} ^ {\mathrm{T}} \mathbf {L y} \\ & = - \frac {1}{2} \binom {\mathbf {x}} {\mathbf {y}} ^ {\mathrm{T}} \left( \begin{array}{c c} \boldsymbol {\Lambda} + \mathbf {A} ^ {\mathrm{T}} \mathbf {L A} & - \mathbf {A} ^ {\mathrm{T}} \mathbf {L} \\ - \mathbf {L A} & \mathbf {L} \end{array} \right) \binom {\mathbf {x}} {\mathbf {y}} = - \frac {1}{2} \mathbf {z} ^ {\mathrm{T}} \mathbf {R z} \end{array}\tag{2.103}

and so the Gaussian distribution over z has precision (inverse covariance) matrix given by

\mathbf {R} = \left( \begin{array}{c c} \mathbf {\Lambda} + \mathbf {A} ^ {\mathrm{T}} \mathbf {L} \mathbf {A} & - \mathbf {A} ^ {\mathrm{T}} \mathbf {L} \\ - \mathbf {L} \mathbf {A} & \mathbf {L} \end{array} \right).\tag{2.104}

The covariance matrix is found by taking the inverse of the precision, which can be done using the matrix inversion formula (2.76) to give

\operatorname{cov} [ \mathbf {z} ] = \mathbf {R} ^ {- 1} = \left( \begin{array}{c c} \boldsymbol {\Lambda} ^ {- 1} & \boldsymbol {\Lambda} ^ {- 1} \mathbf {A} ^ {\mathrm{T}} \\ \mathbf {A} \boldsymbol {\Lambda} ^ {- 1} & \mathbf {L} ^ {- 1} + \mathbf {A} \boldsymbol {\Lambda} ^ {- 1} \mathbf {A} ^ {\mathrm{T}} \end{array} \right).\tag{2.105}

Similarly, we can find the mean of the Gaussian distribution over z by identifying the linear terms in (2.102), which are given by

\mathbf {x} ^ {\mathrm{T}} \boldsymbol {\Lambda} \boldsymbol {\mu} - \mathbf {x} ^ {\mathrm{T}} \mathbf {A} ^ {\mathrm{T}} \mathbf {L} \mathbf {b} + \mathbf {y} ^ {\mathrm{T}} \mathbf {L} \mathbf {b} = \binom{\mathbf {x}}{\mathbf {y}} ^ {\mathrm{T}} \binom{\boldsymbol {\Lambda} \boldsymbol {\mu} - \mathbf {A} ^ {\mathrm{T}} \mathbf {L} \mathbf {b}}{\mathbf {L} \mathbf {b}}.\tag{2.106}

Using our earlier result (2.71) obtained by completing the square over the quadratic form of a multivariate Gaussian, we find that the mean of z is given by

\mathbb {E} [ \mathbf {z} ] = \mathbf {R} ^ {- 1} \binom{\boldsymbol {\Lambda} \boldsymbol {\mu} - \mathbf {A} ^ {\mathrm{T}} \mathbf {L b}}{\mathbf {L b}}.\tag{2.107}

Making use of (2.105), we then obtain

\mathbb {E} [ \mathbf {z} ] = \binom{\boldsymbol {\mu}}{\mathbf {A} \boldsymbol {\mu} + \mathbf {b}}.\tag{2.108}

Next we find an expression for the marginal distribution $p ( \mathbf { y } )$ in which we have marginalized over x. Recall that the marginal distribution over a subset of the components of a Gaussian random vector takes a particularly simple form when expressed in terms of the partitioned covariance matrix. Specifically, its mean and covariance are given by (2.92) and (2.93), respectively. Making use of (2.105) and (2.108) we see that the mean and covariance of the marginal distribution $p ( \mathbf { y } )$ are given by

\mathbb {E} [ \mathbf {y} ] = \mathbf {A} \boldsymbol {\mu} + \mathbf {b}\tag{2.109}

\operatorname{cov} [ \mathbf {y} ] = \mathbf {L} ^ {- 1} + \mathbf {A} \boldsymbol {\Lambda} ^ {- 1} \mathbf {A} ^ {\mathrm{T}}.\tag{2.110}

A special case of this result is when $\mathbf { A } = \mathbf { I } .$ , in which case it reduces to the convolution of two Gaussians, for which we see that the mean of the convolution is the sum of the mean of the two Gaussians, and the covariance of the convolution is the sum of their covariances.

Finally, we seek an expression for the conditional $p ( \mathbf { x } | \mathbf { y } )$ . Recall that the results for the conditional distribution are most easily expressed in terms of the partitioned precision matrix, using (2.73) and (2.75). Applying these results to (2.105) and (2.108) we see that the conditional distribution $p ( \mathbf { x } | \mathbf { y } )$ has mean and covariance given by

\mathbb {E} [ \mathbf {x} | \mathbf {y} ] = (\boldsymbol {\Lambda} + \mathbf {A} ^ {\mathrm{T}} \mathbf {L} \mathbf {A}) ^ {- 1} \left\{\mathbf {A} ^ {\mathrm{T}} \mathbf {L} (\mathbf {y} - \mathbf {b}) + \boldsymbol {\Lambda} \boldsymbol {\mu} \right\}\tag{2.111}

\operatorname{cov} [ \mathbf {x} | \mathbf {y} ] = (\boldsymbol {\Lambda} + \mathbf {A} ^ {\mathrm{T}} \mathbf {L} \mathbf {A}) ^ {- 1}.\tag{2.112}

The evaluation of this conditional can be seen as an example of Bayes’ theorem. We can interpret the distribution $p ( \mathbf { x } )$ as a prior distribution over x. If the variable $\mathbf { y }$ is observed, then the conditional distribution $p ( \mathbf { x } | \mathbf { y } )$ represents the corresponding posterior distribution over x. Having found the marginal and conditional distributions, we effectively expressed the joint distribution $p ( \mathbf { z } ) = p ( \mathbf { x } ) p ( \mathbf { y } | \mathbf { x } )$ in the form $p ( \mathbf { x } | \mathbf { y } ) p ( \mathbf { y } )$ . These results are summarized below.
