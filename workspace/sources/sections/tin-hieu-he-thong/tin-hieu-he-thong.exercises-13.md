---
id: "tin-hieu-he-thong.exercises-13"
doc_id: "tin-hieu-he-thong"
title: "Exercises"
level: 2
heading_path: ["Sampling Methods", "Exercises"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.12-4-3-modelling-nonlinear-manifolds"
next_id: "tin-hieu-he-thong.sequential-data"
block_ids: ["b6493", "b6494", "b6495", "b6496", "b6497", "b6498", "b6499", "b6500", "b6501", "b6502", "b6503", "b6504", "b6505", "b6506", "b6507", "b6508", "b6509", "b6510", "b6511", "b6512", "b6513", "b6514", "b6515", "b6516", "b6517", "b6518", "b6519", "b6520", "b6521", "b6522", "b6523", "b6524", "b6525", "b6526", "b6527"]
---

## Exercises

12.1 <sub>(* *)</sub> l I B In this exercise, we use proof by induction to show that the linear projection onto an M -dimensional subspace that maximizes the variance of the projected data is defined by the M eigenvectors of the data covariance matrix S, given by (12.3), corresponding to the M largest eigenvalues. In Section 12.1, this result was proven for the case of $M = 1$ . Now suppose the result holds for some general value of M and show that it consequently holds for dimensionality $M + 1$ . To do this, first set the derivative of the variance of the projected data with respect to a vector $\mathbf { u } _ { M + 1 }$ defining the new direction in data space equal to zero. This should be done subject to the constraints that $\mathbf { u } _ { M + 1 }$ be orthogonal to the existing vectors $\mathbf { u } _ { 1 } , \dots , \mathbf { u } _ { M }$ , and also that it be normalized to unit length. Use Lagrange multipliers to enforce these constraints. Then make use of the orthonormality properties of the vectors $\mathbf { u } _ { 1 } , \dots , \mathbf { u } _ { M }$ to show that the new vector $\mathbf { u } _ { M + 1 }$ is an eigenvector of S. Finally, show that the variance is maximized if the eigenvector is chosen to be the one corresponding to eigenvector $\lambda _ { M + 1 }$ where the eigenvalues have been ordered in decreasing value.

12.2 (**) Show that the minimum value of the PCA distortion measure J given by (12.15) with respect to the $\mathbf { u } _ { i } ,$ , subject to the orthonormality constraints (12.7), is obtained when the $\mathbf { u } _ { i }$ are eigenvectors of the data covariance matrix S. To do this, introduce a matrix H of Lagrange multipliers, one for each constraint, so that th modified distortion measure, in matrix notation reads

\widetilde {J} = \mathrm{Tr} \left\{\widehat {\mathbf {U}} ^ {\mathrm{T}} \mathbf {S} \widehat {\mathbf {U}} \right\} + \mathrm{Tr} \left\{\mathbf {H} (\mathbf {I} - \widehat {\mathbf {U}} ^ {\mathrm{T}} \widehat {\mathbf {U}}) \right\}\tag{12.93}

where $\widehat { \mathbf { U } }$ <sub>is a</sub> m~trix <sub>of</sub> dimensio $D \times ( D - M )$ whose columns are gi:::..en <sup>b~</sup> $\mathbf { u } _ { i }$ Now minimize $\widetilde { J }$ with respect to $\widehat { \bf U }$ and show that the s~ution satisfies $\widehat { \mathbf { S } } \widehat { \mathbf { U } } = \widehat { \mathbf { U } } \mathbf { H }$ Clearly, one possible solution is that the columns of $\widehat { \textbf { U } }$ are eigenvectors of S, in which case H is a diagonal matrix containing the corresponding eigenvalues. To obtain the general solution, show that H can be assumed to be a symmetr~ ma~ix, and by using its eigenvect£r expansion show that the general solution to $\mathbf { S \widehat { U } } = \widehat { \mathbf { U } } \mathbf { H }$ gives the same value for $\widetilde { J }$ as the specific solution in which the columns of $\widehat { \bf U }$ are the eigenvectors of S. Because these solutions are all equivalent, it is convenient to choose the eigenvector solution.

12.3 (*) Verify that the eigenvectors defined by (12.30) are normalized to unit length, assuming that the eigenvectors $\mathbf { v } _ { i }$ have unit length.

12.4 (*) Imm Suppose we replace the zero-mean, unit-covariance latent space distribution (12.31) in the probabilistic PCA model by a general Gaussian distribution of the form $\mathcal { N } ( \mathbf { z } | \mathbf { m } , \pmb { \Sigma } )$ . By redefining the parameters ofthe model, show that this leads to an identical model for the marginal distribution $p ( \mathbf { x } )$ over the observed variables for any valid choice of m and ~.

12.5 (* *) Let x be a D-dimensional random variable having a Gaussian distribution given by $\mathcal { N } ( \mathbf { x } | \boldsymbol { \mu } , \Sigma )$ , and consider the M-dimensional random variable given by $\mathbf { y } = \mathbf { A x } + \mathbf { b }$ where A is an $M \times D$ matrix. Show that y also has a Gaussian distribution, and find expressions for its mean and covariance. Discuss the form of this Gaussian distribution for $M < D$ , for $M = D$ , and for $M > D$

12.6 (*) Imm Draw a directed probabilistic graph for the probabilistic PCA model described in Section 12.2 in which the components of the observed variable x are shown explicitly as separate nodes. Hence verify that the probabilistic PCA model has the same independence structure as the naive Bayes model discussed in Section 8.2.2.

12.7 (* *) By making use of the results (2.270) and (2.271) for the mean and covariance of a general distribution, derive the result (12.35) for the marginal distribution $p ( \mathbf { x } )$ in the probabilistic PCA model.

12.8 (* *) Imm By making use of the result (2.116), show that the posterior distribution $p ( \mathbf { z } | \mathbf { x } )$ for the probabilistic PCA model is given by (12.42).

12.9 (*) Verify that maximizing the log likelihood (12.43) for the probabilistic PCA model with respect to the parameter $\pmb { \mu }$ gives the result $\pmb { \mu } _ { \mathrm { M L } } = \overline { { \mathbf { x } } }$ where x is the mean of the data vectors.

12.10 (**) By evaluating the second derivatives of the log likelihood function (12.43) for the probabilistic PCA model with respect to the parameter $\mu ,$ , show that the stationary point $\pmb { \mu } _ { \mathrm { M L } } = \overline { { \mathbf { x } } }$ represents the unique maximum.

12.11 <sub>(* *)</sub> Imm Show that in the limit $\sigma ^ { 2 } \to 0$ , the posterior mean for the probabilistic PCA model becomes an orthogonal projection onto the principal subspace, as in conventional PCA.

12.12 (* *) For $\sigma ^ { 2 } > 0$ show that the posterior mean in the probabilistic PCA model is shifted towards the origin relative to the orthogonal projection.

12.13 (* *) Show that the optimal reconstruction of a data point under probabilistic PCA, according to the least squares projection cost of conventional PCA, is given by

\widetilde {\mathbf {x}} = \mathbf {W} _ {\mathrm{ML}} (\mathbf {W} _ {\mathrm{ML}} ^ {\mathrm{T}} \mathbf {W} _ {\mathrm{ML}}) ^ {- 1} \mathbf {M} \mathbb {E} [ \mathbf {z} | \mathbf {x} ].\tag{12.94}

12.14 (*) The number of independent parameters in the covariance matrix for the probabilistic PCA model with an M -dimensional latent space and a D-dimensional data space is given by (12.51). Verify that in the case of $M = D - 1$ , the number of independent parameters is the same as in a general covariance Gaussian, whereas for $M = 0$ it is the same as for a Gaussian with an isotropic covariance.

12.15 (**) IIiI!I Derive the M-step equations (12.56) and (12.57) for the probabilistic PCA model by maximization of the expected complete-data log likelihood function given by (12.53).

12.16 (* * *) In Figure 12.11, we showed an application of probabilistic PCA to a data set in which some of the data values were missing at random. Derive the EM algorithm for maximizing the likelihood function for the probabilistic PCA model in this situation. Note that the $\left\{ { { \bf { z } } _ { n } } \right\}$ , as well as the missing data values that are components of the vectors $\left\{ { \bf x } _ { n } \right\}$ , are now latent variables. Show that in the special case in which all of the data values are observed, this reduces to the EM algorithm for probabilistic PCA derived in Section 12.2.2.

12.17 (**) IIiI!I Let W be a $D \times M$ matrix whose columns define a linear subspace of dimensionality M embedded within a data space of dimensionality D, and let $\mu$ be a D-dimensional vector. Given a data set $\left\{ { \bf x } _ { n } \right\}$ where $n = 1 , \ldots , N .$ , we can approximate the data points using a linear mapping from a set of M -dimensional vectors $\left\{ { { \bf { z } } _ { n } } \right\}$ , so that ${ \bf x } _ { n }$ is approximated by ${ \bf W } { \bf z } _ { n } + \pmb { \mu }$ . The associated sum-of squares reconstruction cost is given by

J = \sum_ {n = 1} ^ {N} \left\| \mathbf {x} _ {n} - \boldsymbol {\mu} - \mathbf {W} \mathbf {z} _ {n} \right\| ^ {2}.\tag{12.95}

First show that minimizing J with respect to $\mu$ leads to an analogous expression with $\mathbf { x } _ { n }$ and ${ \bf z } _ { n }$ replaced by zero-mean variables ${ \bf x } _ { n } - \overline { { \bf x } }$ and ${ \bf z } _ { n } - \overline { { { \bf z } } }$ , respectively, where x and Z denote sample means. Then show that minimizing J with respect to $\mathbf { z } _ { n }$ , where W is kept fixed, gives rise to the PCA Estep (12.58), and that minimizing $J$ with respect to W, where $\left\{ { { \bf { z } } _ { n } } \right\}$ is kept fixed, gives rise to the PCA M step (12.59).

12.18 (*) Derive an expression for the number of independent parameters in the factor analysis model described in Section 12.2.4.

12.19 (**) IIiI!I Show that the factor analysis model described in Section 12.2.4 is invariant under rotations of the latent space coordinates.

12.20 (**) By considering second derivatives, show that the only stationary point of the log likelihood function for the factor analysis model discussed in Section 12.2.4 with respect to the parameter J1 is given by the sample mean defined by (12.1). Furthermore, show that this stationary point is a maximum.

12.21 (**) Derive the formulae (12.66) and (12.67) for the E step of the EM algorithm for factor analysis. Note that from the result of Exercise 12.20, the parameter $\pmb { \mu }$ can be replaced by the sample mean x.

12.22 (* *) Write down an expression for the expected complete-data log likelihood function for the factor analysis model, and hence derive the corresponding M step equations (12.69) and (12.70).

12.23 (*) III!I Draw a directed probabilistic graphical model representing a discrete mixture of probabilistic PCA models in which each PCA model has its own values of W, JL, and $\sigma ^ { 2 }$ • Now draw a modified graph in which these parameter values are shared between the components of the mixture.

12.24 (***) We saw in Section 2.3.7 that Student's t-distribution can be viewed as an infinite mixture of Gaussians in which we marginalize with respect to a continuous latent variable. By exploiting this representation, formulate an EM algorithm for maximizing the log likelihood function for a multivariate Student's t-distribution given an observed set of data points, and derive the forms of the E and M step equations.

12.25 (**) III!I Consider a linear-Gaussian latent-variable model having a latent space distribution $\mathbf { \bar { \rho } } _ { p ( \mathbf { z } ) } = \mathcal { N } ( \mathbf { x } | \mathbf { 0 } , \mathbf { I } )$ and a conditional distribution for the observed variable $p ( \mathbf { x } | \mathbf { z } ) = \mathcal { N } ( \mathbf { x } | \mathbf { W } \mathbf { z } + \pmb { \mu } , \Phi )$ where <P is an arbitrary symmetric, positivedefinite noise covariance matrix. Now suppose that we make a nonsingular linear transformation of the data variables $\bf { x } \to \bf { A x }$ , where A is a $D \times D$ matrix. If $\mu _ { \mathrm { M L } } , \mathbf { W } _ { \mathrm { M L } }$ and $\Phi _ { \mathrm { M L } }$ represent the maximum likelihood solution corresponding to the original untransformed data, show that $\mathbf { A } \mu _ { \mathrm { M L } } , \mathbf { A W } _ { \mathrm { M L } }$ , and ${ \bf A } \Phi _ { \mathrm { M L } } { \bf A } ^ { \mathrm { \hat { T } } }$ will represent the corresponding maximum likelihood solution for the transformed data set. Finally, show that the form of the model is preserved in two cases: (i) A is a diagonal matrix and $\Phi$ is a diagonal matrix. This corresponds to the case of factor analysis. The transformed $\Phi$ remains diagonal, and hence factor analysis is covariant under component-wise re-scaling of the data variables; (ii) A is orthogonal and <P is proportional to the unit matrix so that $\bar { \Phi } = \sigma ^ { 2 } \mathbf { I }$ . This corresponds to probabilistic PCA. The transformed <P matrix remains proportional to the unit matrix, and hence probabilistic PCA is covariant under a rotation of the axes of data space, as is the case for conventional PCA.

12.26 (**) Show that any vector ${ \bf a } _ { i }$ that satisfies (12.80) will also satisfy (12.79). Also, show that for any solution of (12.80) having eigenvalue A, we can add any multiple of an eigenvector of K having zero eigenvalue, and obtain a solution to (12.79) that also has eigenvalue A. Finally, show that such modifications do not affect the principal-component projection given by (12.82).

12.27 (* *) Show that the conventional linear PCA algorithm is recovered as a special case of kernel PCA if we choose the linear kernel function given by $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime }$

12.28 (* *) III!I Use the transformation property (1.27) of a probability density under a change of variable to show that any density $p ( y )$ can be obtained from a fixed density $q ( x )$ that is everywhere nonzero by making a nonlinear change of variable $y = f ( x )$ in which $f ( x )$ is a monotonic function so that $0 \leqslant f ^ { \prime } ( x ) < \infty$ . Write down the differential equation satisfied by $f ( x )$ and draw a diagram illustrating the transformation of the density.

12.29 <sub>(**)</sub> Em Suppose that two variables $z _ { 1 }$ and $z _ { 2 }$ are independent so tha $p ( z _ { 1 } , z _ { 2 } ) =$ $p ( z _ { 1 } ) p ( z _ { 2 } )$ ' Show that the covariance matrix between these variables is diagonal. This shows that independence is a sufficient condition for two variables to be uncorrelated. Now consider two variables $y _ { 1 }$ and $y _ { 2 }$ in which $- 1 \leqslant y _ { 1 } \leqslant 1$ and $y _ { 2 } = y _ { 2 } ^ { 2 }$ . Write down the conditional distribution $p ( y _ { 2 } | y _ { 1 } )$ and observe that this is dependent on $y _ { 1 }$ showing that the two variables are not independent. Now show that the covariance matrix between these two variables is again diagonal. To do this, use the relation $p ( y _ { 1 } , y _ { 2 } ) \ : = \ : p ( y _ { 1 } ) p ( y _ { 2 } | y _ { 1 } )$ to show that the off-diagonal terms are zero. This counter-example shows that zero correlation is not a sufficient condition for independence.
