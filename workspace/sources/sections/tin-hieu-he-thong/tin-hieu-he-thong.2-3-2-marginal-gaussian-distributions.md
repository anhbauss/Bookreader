---
id: "tin-hieu-he-thong.2-3-2-marginal-gaussian-distributions"
doc_id: "tin-hieu-he-thong"
title: "2.3.2 Marginal Gaussian distributions"
level: 2
heading_path: ["Probability Distributions", "2.3.2 Marginal Gaussian distributions"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-3-1-conditional-gaussian-distributions"
next_id: "tin-hieu-he-thong.2-3-3-bayes-theorem-for-gaussian-variables"
block_ids: ["b996", "b997", "b998", "b999", "b1000", "b1001", "b1002", "b1003", "b1004", "b1005", "b1006", "b1007", "b1008", "b1009", "b1010", "b1011", "b1012", "b1013", "b1014", "b1015", "b1016", "b1017", "b1018", "b1019", "b1020", "b1021", "b1022", "b1023", "b1024", "b1025", "b1026", "b1027", "b1028", "b1029", "b1030", "b1031", "b1032", "b1033", "b1034"]
---

## 2.3.2 Marginal Gaussian distributions

We have seen that if a joint distribution $p ( \mathbf { x } _ { a } , \mathbf { x } _ { b } )$ is Gaussian, then the conditional distribution $p ( \mathbf { x } _ { a } | \mathbf { x } _ { b } )$ will again be Gaussian. Now we turn to a discussion of the marginal distribution given by

p (\mathbf {x} _ {a}) = \int p (\mathbf {x} _ {a}, \mathbf {x} _ {b}) \mathrm{d} \mathbf {x} _ {b}\tag{2.83}

which, as we shall see, is also Gaussian. Once again, our strategy for evaluating this distribution efficiently will be to focus on the quadratic form in the exponent of the joint distribution and thereby to identify the mean and covariance of the marginal distribution $p ( \mathbf { x } _ { a } )$

The quadratic form for the joint distribution can be expressed, using the partitioned precision matrix, in the form (2.70). Because our goal is to integrate out $\mathbf { x } _ { b }$ , this is most easily achieved by first considering the terms involving $\mathbf { x } _ { b }$ and then completing the square in order to facilitate integration. Picking out just those terms that involve $\mathbf { x } _ { b }$ , we have

- \frac {1}{2} \mathbf {x} _ {b} ^ {\mathrm{T}} \boldsymbol {\Lambda} _ {b b} \mathbf {x} _ {b} + \mathbf {x} _ {b} ^ {T} \mathbf {m} = - \frac {1}{2} (\mathbf {x} _ {b} - \boldsymbol {\Lambda} _ {b b} ^ {- 1} \mathbf {m}) ^ {\mathrm{T}} \boldsymbol {\Lambda} _ {b b} (\mathbf {x} _ {b} - \boldsymbol {\Lambda} _ {b b} ^ {- 1} \mathbf {m}) + \frac {1}{2} \mathbf {m} ^ {\mathrm{T}} \boldsymbol {\Lambda} _ {b b} ^ {- 1} \mathbf {m}\tag{2.84}

where we have defined

\mathbf {m} = \boldsymbol {\Lambda} _ {b b} \boldsymbol {\mu} _ {b} - \boldsymbol {\Lambda} _ {b a} (\mathbf {x} _ {a} - \boldsymbol {\mu} _ {a}).\tag{2.85}

We see that the dependence on $\mathbf { x } _ { b }$ has been cast into the standard quadratic form of a Gaussian distribution corresponding to the first term on the right-hand side of (2.84), plus a term that does not depend on $\mathbf { x } _ { b }$ (but that does depend on $\mathbf { x } _ { a } )$ . Thus, when we take the exponential of this quadratic form, we see that the integration over $\mathbf { x } _ { b }$ required by (2.83) will take the form

\int \exp \left\{- \frac {1}{2} (\mathbf {x} _ {b} - \boldsymbol {\Lambda} _ {b b} ^ {- 1} \mathbf {m}) ^ {\mathrm{T}} \boldsymbol {\Lambda} _ {b b} (\mathbf {x} _ {b} - \boldsymbol {\Lambda} _ {b b} ^ {- 1} \mathbf {m}) \right\} \mathrm{d} \mathbf {x} _ {b}.\tag{2.86}

This integration is easily performed by noting that it is the integral over an unnormalized Gaussian, and so the result will be the reciprocal of the normalization coefficient. We know from the form of the normalized Gaussian given by (2.43), that this coefficient is independent of the mean and depends only on the determinant of the covariance matrix. Thus, by completing the square with respect to $\mathbf { x } _ { b } .$ , we can integrate out $\mathbf { x } _ { b }$ and the only term remaining from the contributions on the left-hand side of (2.84) that depends on $\mathbf { x } _ { a }$ is the last term on the right-hand side of (2.84) in which m is given by (2.85). Combining this term with the remaining terms from

(2.70) that depend on $\mathbf { x } _ { a }$ , we obtain

\begin{array}{r l} & {\frac {1}{2} \left[ \boldsymbol {\Lambda} _ {b b} \pmb {\mu} _ {b} - \pmb {\Lambda} _ {b a} (\mathbf {x} _ {a} - \pmb {\mu} _ {a}) \right] ^ {\mathrm{T}} \pmb {\Lambda} _ {b b} ^ {- 1} \left[ \pmb {\Lambda} _ {b b} \pmb {\mu} _ {b} - \pmb {\Lambda} _ {b a} (\mathbf {x} _ {a} - \pmb {\mu} _ {a}) \right]} \\ & {- \frac {1}{2} \mathbf {x} _ {a} ^ {\mathrm{T}} \pmb {\Lambda} _ {a a} \mathbf {x} _ {a} + \mathbf {x} _ {a} ^ {\mathrm{T}} (\pmb {\Lambda} _ {a a} \pmb {\mu} _ {a} + \pmb {\Lambda} _ {a b} \pmb {\mu} _ {b}) + \mathrm{const}} \\ {=} & {- \frac {1}{2} \mathbf {x} _ {a} ^ {\mathrm{T}} (\pmb {\Lambda} _ {a a} - \pmb {\Lambda} _ {a b} \pmb {\Lambda} _ {b b} ^ {- 1} \pmb {\Lambda} _ {b a}) \mathbf {x} _ {a}} \\ & {+ \mathbf {x} _ {a} ^ {\mathrm{T}} (\pmb {\Lambda} _ {a a} - \pmb {\Lambda} _ {a b} \pmb {\Lambda} _ {b b} ^ {- 1} \pmb {\Lambda} _ {b a}) ^ {- 1} \pmb {\mu} _ {a} + \mathrm{const}} \end{array}\tag{2.87}

where ‘const’ denotes quantities independent of $\mathbf { x } _ { a }$ . Again, by comparison with (2.71), we see that the covariance of the marginal distribution of $p ( \mathbf { x } _ { a } )$ is given by

\pmb {\Sigma} _ {a} = \left(\pmb {\Lambda} _ {a a} - \pmb {\Lambda} _ {a b} \pmb {\Lambda} _ {b b} ^ {- 1} \pmb {\Lambda} _ {b a}\right) ^ {- 1}.\tag{2.88}

Similarly, the mean is given by

\pmb {\Sigma} _ {a} (\pmb {\Lambda} _ {a a} - \pmb {\Lambda} _ {a b} \pmb {\Lambda} _ {b b} ^ {- 1} \pmb {\Lambda} _ {b a}) \pmb {\mu} _ {a} = \pmb {\mu} _ {a}\tag{2.89}

where we have used (2.88). The covariance in (2.88) is expressed in terms of the partitioned precision matrix given by (2.69). We can rewrite this in terms of the corresponding partitioning of the covariance matrix given by (2.67), as we did for the conditional distribution. These partitioned matrices are related by

\left( \begin{array}{c c} \boldsymbol {\Lambda} _ {a a} & \boldsymbol {\Lambda} _ {a b} \\ \boldsymbol {\Lambda} _ {b a} & \boldsymbol {\Lambda} _ {b b} \end{array} \right) ^ {- 1} = \left( \begin{array}{c c} \boldsymbol {\Sigma} _ {a a} & \boldsymbol {\Sigma} _ {a b} \\ \boldsymbol {\Sigma} _ {b a} & \boldsymbol {\Sigma} _ {b b} \end{array} \right)\tag{2.90}

Making use of (2.76), we then have

\left(\boldsymbol {\Lambda} _ {a a} - \boldsymbol {\Lambda} _ {a b} \boldsymbol {\Lambda} _ {b b} ^ {- 1} \boldsymbol {\Lambda} _ {b a}\right) ^ {- 1} = \boldsymbol {\Sigma} _ {a a}.\tag{2.91}

Thus we obtain the intuitively satisfying result that the marginal distribution $p ( \mathbf { x } _ { a } )$ has mean and covariance given by

\mathbb {E} [ \mathbf {x} _ {a} ] = \boldsymbol {\mu} _ {a}\tag{2.92}

{\mathrm{COV} [ \mathbf {x} _ {a} ]} = {\boldsymbol {\Sigma} _ {a a}.}\tag{2.93}

We see that for a marginal distribution, the mean and covariance are most simply expressed in terms of the partitioned covariance matrix, in contrast to the conditional distribution for which the partitioned precision matrix gives rise to simpler expressions.

Our results for the marginal and conditional distributions of a partitioned Gaussian are summarized below.

Partitioned Gaussians

Given a joint Gaussian distribution $\mathcal { N } ( { \bf x } | \mu , \Sigma )$ with $\pmb { \Lambda } \equiv \pmb { \Sigma } ^ { - 1 }$ and

\mathbf {x} = \binom{\mathbf {x} _ {a}}{\mathbf {x} _ {b}}, \quad \boldsymbol {\mu} = \binom{\boldsymbol {\mu} _ {a}}{\boldsymbol {\mu} _ {b}}\tag{2.94}

![image](images/part-001--e8e1808be3e76f971a2c35cd1500ab9f2aacf8f8349dbbef5a5bbd9135e2410d.jpg)

![image](images/part-001--5256dabe1417e18755d5258b5728966f13333d49a7967e4e9f3474b19591bb88.jpg)

Figure 2.9 The plot on the left shows the contours of a Gaussian distribution $p ( x _ { a } , x _ { b } )$ over two variables, and the plot on the right shows the marginal distribution $p ( x _ { a } )$ (blue curve) and the conditional distribution $p ( x _ { a } | x _ { b } )$ for $x _ { b } = 0 . 7$ (red curve).

\boldsymbol {\Sigma} = \left( \begin{array}{c c} \boldsymbol {\Sigma} _ {a a} & \boldsymbol {\Sigma} _ {a b} \\ \boldsymbol {\Sigma} _ {b a} & \boldsymbol {\Sigma} _ {b b} \end{array} \right), \quad \boldsymbol {\Lambda} = \left( \begin{array}{c c} \boldsymbol {\Lambda} _ {a a} & \boldsymbol {\Lambda} _ {a b} \\ \boldsymbol {\Lambda} _ {b a} & \boldsymbol {\Lambda} _ {b b} \end{array} \right).\tag{2.95}

Conditional distribution:

{p (\mathbf {x} _ {a} | \mathbf {x} _ {b})} = {\mathcal {N} (\mathbf {x} | \pmb {\mu} _ {a | b}, \pmb {\Lambda} _ {a a} ^ {- 1})}\tag{2.96}

{\pmb {\mu} _ {a | b}} = {\pmb {\mu} _ {a} - \pmb {\Lambda} _ {a a} ^ {- 1} \pmb {\Lambda} _ {a b} (\mathbf {x} _ {b} - \pmb {\mu} _ {b}).}\tag{2.97}

Marginal distribution:

p (\mathbf {x} _ {a}) = \mathcal {N} (\mathbf {x} _ {a} | \boldsymbol {\mu} _ {a}, \boldsymbol {\Sigma} _ {a a}).\tag{2.98}

We illustrate the idea of conditional and marginal distributions associated with a multivariate Gaussian using an example involving two variables in Figure 2.9.
