---
id: "tin-hieu-he-thong.2-3-1-conditional-gaussian-distributions"
doc_id: "tin-hieu-he-thong"
title: "2.3.1 Conditional Gaussian distributions"
level: 2
heading_path: ["Probability Distributions", "2.3.1 Conditional Gaussian distributions"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.carl-friedrich-gauss-1777-1855"
next_id: "tin-hieu-he-thong.2-3-2-marginal-gaussian-distributions"
block_ids: ["b952", "b953", "b954", "b955", "b956", "b957", "b958", "b959", "b960", "b961", "b962", "b963", "b964", "b965", "b966", "b967", "b968", "b969", "b970", "b971", "b972", "b973", "b974", "b975", "b976", "b977", "b978", "b979", "b980", "b981", "b982", "b983", "b984", "b985", "b986", "b987", "b988", "b989", "b990", "b991", "b992", "b993", "b994", "b995"]
---

## 2.3.1 Conditional Gaussian distributions

An important property of the multivariate Gaussian distribution is that if two sets of variables are jointly Gaussian, then the conditional distribution of one set conditioned on the other is again Gaussian. Similarly, the marginal distribution of either set is also Gaussian.

Consider first the case of conditional distributions. Suppose x is a D-dimensional vector with Gaussian distribution $\mathcal { N } ( { \bf x } | \mu , \Sigma )$ and that we partition x into two disjoint subsets $\mathbf { x } _ { a }$ and $\mathbf { x } _ { b }$ . Without loss of generality, we can take $\mathbf { x } _ { a }$ to form the first M components of x, with $\mathbf { x } _ { b }$ comprising the remaining $D - M$ components, so that

\mathbf {x} = \binom{\mathbf {x} _ {a}}{\mathbf {x} _ {b}}.\tag{2.65}

We also define corresponding partitions of the mean vector µ given by

\boldsymbol {\mu} = \binom{\boldsymbol {\mu} _ {a}}{\boldsymbol {\mu} _ {b}}\tag{2.66}

and of the covariance matrix Σ given by

\boldsymbol {\Sigma} = \left( \begin{array}{c c} \boldsymbol {\Sigma} _ {a a} & \boldsymbol {\Sigma} _ {a b} \\ \boldsymbol {\Sigma} _ {b a} & \boldsymbol {\Sigma} _ {b b} \end{array} \right).\tag{2.67}

Note that the symmetry $\pmb { \Sigma } ^ { \mathrm { T } } = \pmb { \Sigma }$ of the covariance matrix implies that $\Sigma _ { a a }$ and $\Sigma _ { b b }$ are symmetric, while $\dot { \Sigma } _ { b a } = \Sigma _ { a b } ^ { \mathrm { T } }$

In many situations, it will be convenient to work with the inverse of the covariance matrix

\boldsymbol {\Lambda} \equiv \boldsymbol {\Sigma} ^ {- 1}\tag{2.68}

which is known as the precision matrix. In fact, we shall see that some properties of Gaussian distributions are most naturally expressed in terms of the covariance, whereas others take a simpler form when viewed in terms of the precision. We therefore also introduce the partitioned form of the precision matrix

\boldsymbol {\Lambda} = \left( \begin{array}{c c} \boldsymbol {\Lambda} _ {a a} & \boldsymbol {\Lambda} _ {a b} \\ \boldsymbol {\Lambda} _ {b a} & \boldsymbol {\Lambda} _ {b b} \end{array} \right)\tag{2.69}

corresponding to the partitioning (2.65) of the vector x. Because the inverse of a symmetric matrix is also symmetric, we see that $\mathbf { \Delta } \Lambda _ { a a }$ and $\Lambda _ { b b }$ are symmetric, while $\dot { \mathbf { A } } _ { a b } ^ { \mathrm { T } } = \mathbf { A } _ { b a }$ . It should be stressed at this point that, for instance, $\pmb { \Lambda } _ { a a }$ is not simply given by the inverse of $\pmb { \Sigma } _ { a a }$ . In fact, we shall shortly examine the relation between the inverse of a partitioned matrix and the inverses of its partitions.

Let us begin by finding an expression for the conditional distribution $p ( \mathbf { x } _ { a } | \mathbf { x } _ { b } )$ From the product rule of probability, we see that this conditional distribution can be evaluated from the joint distribution $p ( \mathbf { x } ) = p ( \mathbf { x } _ { a } , \mathbf { x } _ { b } )$ simply by fixing $\mathbf { x } _ { b }$ to the observed value and normalizing the resulting expression to obtain a valid probability distribution over $\mathbf { x } _ { a }$ . Instead of performing this normalization explicitly, we can obtain the solution more efficiently by considering the quadratic form in the exponent of the Gaussian distribution given by (2.44) and then reinstating the normalization coefficient at the end of the calculation. If we make use of the partitioning (2.65), (2.66), and (2.69), we obtain

\begin{array}{r l} & {- \frac {1}{2} (\mathbf {x} - \pmb {\mu}) ^ {\mathrm{T}} \pmb {\Sigma} ^ {- 1} (\mathbf {x} - \pmb {\mu}) =} \\ & {- \frac {1}{2} (\mathbf {x} _ {a} - \pmb {\mu} _ {a}) ^ {\mathrm{T}} \pmb {\Lambda} _ {a a} (\mathbf {x} _ {a} - \pmb {\mu} _ {a}) - \frac {1}{2} (\mathbf {x} _ {a} - \pmb {\mu} _ {a}) ^ {\mathrm{T}} \pmb {\Lambda} _ {a b} (\mathbf {x} _ {b} - \pmb {\mu} _ {b})} \\ & {- \frac {1}{2} (\mathbf {x} _ {b} - \pmb {\mu} _ {b}) ^ {\mathrm{T}} \pmb {\Lambda} _ {b a} (\mathbf {x} _ {a} - \pmb {\mu} _ {a}) - \frac {1}{2} (\mathbf {x} _ {b} - \pmb {\mu} _ {b}) ^ {\mathrm{T}} \pmb {\Lambda} _ {b b} (\mathbf {x} _ {b} - \pmb {\mu} _ {b}).} \end{array}\tag{2.70}

We see that as a function of $\mathbf { x } _ { a }$ , this is again a quadratic form, and hence the corresponding conditional distribution $p ( \mathbf { x } _ { a } | \mathbf { x } _ { b } )$ will be Gaussian. Because this distribution is completely characterized by its mean and its covariance, our goal will be to identify expressions for the mean and covariance of $p ( \mathbf { x } _ { a } | \mathbf { x } _ { b } )$ by inspection of (2.70).

This is an example of a rather common operation associated with Gaussian distributions, sometimes called ‘completing the square’, in which we are given a quadratic form defining the exponent terms in a Gaussian distribution, and we need to determine the corresponding mean and covariance. Such problems can be solved straightforwardly by noting that the exponent in a general Gaussian distribution $\mathcal { N } ( { \bf x } | \mu , \Sigma )$ can be written

- \frac {1}{2} (\mathbf {x} - \boldsymbol {\mu}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} - \boldsymbol {\mu}) = - \frac {1}{2} \mathbf {x} ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} \mathbf {x} + \mathbf {x} ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} \boldsymbol {\mu} + \mathrm{const}\tag{2.71}

where ‘const’ denotes terms which are independent of $\mathbf { x } .$ , and we have made use of the symmetry of Σ. Thus if we take our general quadratic form and express it in the form given by the right-hand side of (2.71), then we can immediately equate the matrix of coefficients entering the second order term in x to the inverse covariance matrix $\pmb { \Sigma } ^ { - 1 }$ and the coefficient of the linear term in x to $\pmb { \Sigma } ^ { - 1 } \pmb { \mu }$ , from which we can obtain $\pmb { \mu } .$ .

Now let us apply this procedure to the conditional Gaussian distribution $p ( \mathbf { x } _ { a } | \mathbf { x } _ { b } )$ for which the quadratic form in the exponent is given by (2.70). We will denote the mean and covariance of this distribution by $\mu _ { a \left| b \right. }$ and $\Sigma _ { a \left. b \right. }$ , respectively. Consider the functional dependence of (2.70) on $\mathbf { x } _ { a }$ in which $\mathbf { x } _ { b }$ is regarded as a constant. If we pick out all terms that are second order in $\mathbf { x } _ { a }$ , we have

- \frac {1}{2} \mathbf {x} _ {a} ^ {\mathrm{T}} \boldsymbol {\Lambda} _ {a a} \mathbf {x} _ {a}\tag{2.72}

from which we can immediately conclude that the covariance (inverse precision) of $p ( \mathbf { x } _ { a } | \mathbf { x } _ { b } )$ is given by

\pmb {\Sigma} _ {a | b} = \pmb {\Lambda} _ {a a} ^ {- 1}.\tag{2.73}

Now consider all of the terms in (2.70) that are linear in $\mathbf { x } _ { a }$

\mathbf {x} _ {a} ^ {\mathrm{T}} \left\{\boldsymbol {\Lambda} _ {a a} \pmb {\mu} _ {a} - \boldsymbol {\Lambda} _ {a b} (\mathbf {x} _ {b} - \pmb {\mu} _ {b}) \right\}\tag{2.74}

where we have used $\pmb { \Lambda } _ { b a } ^ { \mathrm { T } } = \pmb { \Lambda } _ { a b }$ . From our discussion of the general form (2.71), the coefficient of $\mathbf { x } _ { a }$ in this expression must equal $\Sigma _ { a | b } ^ { - 1 } \mu _ { a | b }$ and hence

\begin{array}{r c l} \boldsymbol {\mu} _ {a | b} & = & \boldsymbol {\Sigma} _ {a | b} \left\{\boldsymbol {\Lambda} _ {a a} \boldsymbol {\mu} _ {a} - \boldsymbol {\Lambda} _ {a b} (\mathbf {x} _ {b} - \boldsymbol {\mu} _ {b}) \right\} \\ & = & \boldsymbol {\mu} _ {a} - \boldsymbol {\Lambda} _ {a a} ^ {- 1} \boldsymbol {\Lambda} _ {a b} (\mathbf {x} _ {b} - \boldsymbol {\mu} _ {b}) \end{array}\tag{2.75}

where we have made use of (2.73).

The results (2.73) and (2.75) are expressed in terms of the partitioned precision matrix of the original joint distribution $p ( \mathbf { x } _ { a } , \mathbf { x } _ { b } )$ . We can also express these results in terms of the corresponding partitioned covariance matrix. To do this, we make use of the following identity for the inverse of a partitioned matrix

Exercise 2.24

\left( \begin{array}{c c} \mathbf {A} & \mathbf {B} \\ \mathbf {C} & \mathbf {D} \end{array} \right) ^ {- 1} = \left( \begin{array}{c c} \mathbf {M} & - \mathbf {M B D} ^ {- 1} \\ - \mathbf {D} ^ {- 1} \mathbf {C M} & \mathbf {D} ^ {- 1} + \mathbf {D} ^ {- 1} \mathbf {C M B D} ^ {- 1} \end{array} \right)\tag{2.76}

where we have defined

\mathbf {M} = (\mathbf {A} - \mathbf {B D} ^ {- 1} \mathbf {C}) ^ {- 1}.\tag{2.77}

The quantity ${ { \bf { M } } ^ { - 1 } }$ is known as the Schur complement of the matrix on the left-hand side of (2.76) with respect to the submatrix D. Using the definition

\left( \begin{array}{c c} \boldsymbol {\Sigma} _ {a a} & \boldsymbol {\Sigma} _ {a b} \\ \boldsymbol {\Sigma} _ {b a} & \boldsymbol {\Sigma} _ {b b} \end{array} \right) ^ {- 1} = \left( \begin{array}{c c} \boldsymbol {\Lambda} _ {a a} & \boldsymbol {\Lambda} _ {a b} \\ \boldsymbol {\Lambda} _ {b a} & \boldsymbol {\Lambda} _ {b b} \end{array} \right)\tag{2.78}

and making use of (2.76), we have

{\boldsymbol {\Lambda} _ {a a}} = {\left(\boldsymbol {\Sigma} _ {a a} - \boldsymbol {\Sigma} _ {a b} \boldsymbol {\Sigma} _ {b b} ^ {- 1} \boldsymbol {\Sigma} _ {b a}\right) ^ {- 1}}\tag{2.79}

{\boldsymbol {\Lambda} _ {a b}} = {- \big (\boldsymbol {\Sigma} _ {a a} - \boldsymbol {\Sigma} _ {a b} \boldsymbol {\Sigma} _ {b b} ^ {- 1} \boldsymbol {\Sigma} _ {b a} \big) ^ {- 1} \boldsymbol {\Sigma} _ {a b} \boldsymbol {\Sigma} _ {b b} ^ {- 1}.}\tag{2.80}

From these we obtain the following expressions for the mean and covariance of the conditional distribution $p ( \mathbf { x } _ { a } | \mathbf { x } _ { b } )$

{\pmb {\mu} _ {a | b}} = {\pmb {\mu} _ {a} + \pmb {\Sigma} _ {a b} \pmb {\Sigma} _ {b b} ^ {- 1} (\mathbf {x} _ {b} - \pmb {\mu} _ {b})}\tag{2.81}

{\pmb \Sigma_ {a | b}} = {\pmb \Sigma_ {a a} - \pmb \Sigma_ {a b} \pmb \Sigma_ {b b} ^ {- 1} \pmb \Sigma_ {b a}.}\tag{2.82}

Section 8.1.4

Comparing (2.73) and (2.82), we see that the conditional distribution $p ( \mathbf { x } _ { a } | \mathbf { x } _ { b } )$ takes a simpler form when expressed in terms of the partitioned precision matrix than when it is expressed in terms of the partitioned covariance matrix. Note that the mean of the conditional distribution $p ( \mathbf { x } _ { a } | \mathbf { x } _ { b } )$ , given by (2.81), is a linear function of $\mathbf { x } _ { b }$ and that the covariance, given by (2.82), is independent of $\mathbf { x } _ { a }$ . This represents an example of a linear-Gaussian model.
