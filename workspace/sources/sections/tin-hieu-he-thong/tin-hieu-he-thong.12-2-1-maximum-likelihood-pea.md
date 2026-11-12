---
id: "tin-hieu-he-thong.12-2-1-maximum-likelihood-pea"
doc_id: "tin-hieu-he-thong"
title: "12.2.1 Maximum likelihood peA"
level: 2
heading_path: ["Sampling Methods", "12.2.1 Maximum likelihood peA"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.12-2-probabilistic-pea"
next_id: "tin-hieu-he-thong.12-2-2-em-algorithm-for-pea"
block_ids: ["b6278", "b6279", "b6280", "b6281", "b6282", "b6283", "b6284", "b6285", "b6286", "b6287", "b6288", "b6289", "b6290", "b6291", "b6292", "b6293", "b6294", "b6295", "b6296", "b6297", "b6298", "b6299", "b6300", "b6301", "b6302", "b6303", "b6304", "b6305", "b6306", "b6307", "b6308"]
---

## 12.2.1 Maximum likelihood peA

We next consider the determination of the model parameters using maximum likelihood. Given a data set ${ \bf X } = \{ { \bf x } _ { n } \}$ of observed data points, the probabilistic peA model can be expressed as a directed graph, as shown in Figure 12.10. The corresponding log likelihood function is given, from (12.35), by

\begin{array}{l} \ln p (\mathbf {X} | \boldsymbol {\mu}, \mathbf {W}, \sigma^ {2}) = \sum_ {n = 1} ^ {N} \ln p (\mathbf {x} _ {n} | \mathbf {W}, \boldsymbol {\mu}, \sigma^ {2}) \\ = - \frac {N D}{2} \ln (2 \pi) - \frac {N}{2} \ln | \mathbf {C} | - \frac {1}{2} \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \boldsymbol {\mu}) ^ {\mathrm{T}} \mathbf {C} ^ {- 1} (\mathbf {x} _ {n} - \boldsymbol {\mu}). \end{array}\tag{12.43}

Setting the derivative of the log likelihood with respect to $\mu$ equal to zero gives the expected result ${ \pmb \mu } = \overline { { \mathbf { x } } }$ where $\overline { { \mathbf { x } } }$ is the data mean defined by (12.1). Back-substituting we can then write the log likelihood function in the form

\ln p (\mathbf {X} | \mathbf {W}, \pmb {\mu}, \sigma^ {2}) = - \frac {N}{2} \left\{D \ln (2 \pi) + \ln | \mathbf {C} | + \mathrm{Tr} \left(\mathbf {C} ^ {- 1} \mathbf {S}\right) \right\}\tag{12.44}

where S is the data covariance matrix defined by (12.3). Because the log likelihood is a quadratic function of $\mu ,$ , this solution represents the unique maximum, as can be confirmed by computing second derivatives.

Maximization with respect to W and $\sigma ^ { 2 }$ is more complex but nonetheless has an exact closed-form solution. It was shown by Tipping and Bishop (1999b) that all of the stationary points of the log likelihood function can be written as

\mathbf {W} _ {\mathrm{ML}} = \mathbf {U} _ {M} (\mathbf {L} _ {M} - \sigma^ {2} \mathbf {I}) ^ {1 / 2} \mathbf {R}\tag{12.45}

where $\mathbf { U } _ { M }$ is a $D \times M$ matrix whose columns are given by any subset (of size M) of the eigenvectors of the data covariance matrix S, the $M \times M$ diagonal matrix $\mathbf { L } _ { M }$ has elements given by the corresponding eigenvalues $\lambda _ { i } .$ , and R is an arbitrar $M \times M$ orthogonal matrix.

Furthermore, Tipping and Bishop (1999b) showed that the maximum of the like lihood function is obtained when the M eigenvectors are chosen to be those whose eigenvalues are the M largest (all other solutions being saddle points). A similar re sult was conjectured independently by Roweis (1998), although no proof was given

Again, we shall assume that the eigenvectors have been arranged in order of decreasing values of the corresponding eigenvalues, so that the M principal eigenvectors are $\mathbf { u } _ { 1 } , \dots , \mathbf { u } _ { M }$ . In this case, the columns of W define the principal subspace of standard PCA. The corresponding maximum likelihood solution for $\sigma ^ { 2 }$ is then given by

\sigma_ {\mathrm{ML}} ^ {2} = \frac {1}{D - M} \sum_ {i = M + 1} ^ {D} \lambda_ {i}\tag{12.46}

so that $\sigma _ { \mathrm { M L } } ^ { 2 }$ is the average variance associated with the discarded dimensions.

Because R is orthogonal, it can be interpreted as a rotation matrix in the $M \times M$ latent space. If we substitute the solution for W into the expression for C, and make use of the orthogonality property $\mathbf { R R } ^ { \mathrm { T } } = \mathbf { I }$ , we see that C is independent of R. This simply says that the predictive density is unchanged by rotations in the latent space as discussed earlier. For the particular case of $\mathbf { R } = \mathbf { I }$ , we see that the columns of W are the principal component eigenvectors scaled by the variance parameters $\lambda _ { i } - \sigma ^ { 2 }$ . The interpretation of these scaling factors is clear once we recognize that for a convolution of independent Gaussian distributions (in this case the latent space distribution and the noise model) the variances are additive. Thus the variance $\lambda _ { i }$ in the direction of an eigenvector $\mathbf { u } _ { i }$ is composed of the sum of a contribution $\lambda _ { i } -$ $\sigma ^ { 2 }$ from the projection of the unit-variance latent space distribution into data space through the corresponding column of W, plus an isotropic contribution of variance $\sigma ^ { 2 }$ which is added in all directions by the noise model.

It is worth taking a moment to study the form of the covariance matrix given by (12.36). Consider the variance of the predictive distribution along some direction specified by the unit vector v, where $\mathbf { v } ^ { \mathrm { T } } \mathbf { v } = 1$ , which is given by $\mathbf { v } ^ { \mathrm { T } } \mathbf { C } \mathbf { v }$ First suppose that v is orthogonal to the principal subspace, in other words it is given by some linear combination of the discarded eigenvectors. Then ${ \bf { v } } ^ { \mathrm { { T } } } { \bf { U } } = { \bf { 0 } }$ and hence $\mathbf { v } ^ { \mathrm { { T } } } \mathbf { C } \mathbf { v } = \sigma ^ { 2 }$ Thus the model predicts a noise variance orthogonal to the principal subspace, which, from (12.46), is just the average of the discarded eigenvalues. Now suppose that $\mathbf { v } = \mathbf { u } _ { i }$ where $\mathbf { u } _ { i }$ is one of the retained eigenvectors defining the principal subspace. Then ${ \bf v } ^ { \mathrm { T } } { \bf C } { \bf v } = ( \lambda _ { i } - \sigma ^ { 2 } ) + \sigma ^ { 2 } = \lambda _ { i }$ . In other words, this model correctly captures the variance of the data along the principal axes, and approximates the variance in all remaining directions with a single average value $\sigma ^ { 2 }$

One way to construct the maximum likelihood density model would simply be to find the eigenvectors and eigenvalues of the data covariance matrix and then to evaluate Wand $\sigma ^ { 2 }$ using the results given above. In this case, we would choose $\mathbf { R } = \mathbf { I }$ for convenience. However, if the maximum likelihood solution is found by numerical optimization of the likelihood function, for instance using an algorithm such as conjugate gradients (Fletcher, 1987; Nocedal and Wright, 1999; Bishop and Nabney, 2008) or through the EM algorithm, then the resulting value of R is essentially arbitrary. This implies that the columns of W need not be orthogonal. I an orthogonal basis is required, the matrix W can be post-processed appropriately (Golub and Van Loan, 1996). Alternatively, the EM algorithm can be modified in such a way as to yield orthonormal principal directions, sorted in descending order of the corresponding eigenvalues, directly (Ahn and Oh, 2003).

The rotational invariance in latent space represents a form of statistical nonidentifiability, analogous to that encountered for mixture models in the case of discrete latent variables. Here there is a continuum of parameters all of which lead to the same predictive density, in contrast to the discrete nonidentifiability associated with component re-labelling in the mixture setting.

If we consider the case of $M = D$ , so that there is no reduction of dimensionality, then $\mathbf { U } _ { M } = \mathbf { U }$ and $\mathbf { L } _ { M } = \mathbf { L }$ . Making use of the orthogonality properties $\mathbf { U } \dot { \mathbf { U } } ^ { \mathbf { T } } = \mathbf { I }$ and $\mathbf { R R } ^ { \mathbf { T } } = \mathbf { I }$ , we see that the covariance C of the marginal distribution for x becomes

\mathbf {C} = \mathbf {U} (\mathbf {L} - \sigma^ {2} \mathbf {I}) ^ {1 / 2} \mathbf {R R} ^ {\mathrm{T}} (\mathbf {L} - \sigma^ {2} \mathbf {I}) ^ {1 / 2} \mathbf {U} ^ {\mathrm{T}} + \sigma^ {2} \mathbf {I} = \mathbf {U L U} ^ {\mathrm{T}} = \mathbf {S}\tag{12.47}

and so we obtain the standard maximum likelihood solution for an unconstrained Gaussian distribution in which the covariance matrix is given by the sample covariance.

Conventional PCA is generally formulated as a projection of points from the Ddimensional data space onto an M -dimensional linear subspace. Probabilistic PCA, however, is most naturally expressed as a mapping from the latent space into the data space via (12.33). For applications such as visualization and data compression, we can reverse this mapping using Bayes' theorem. Any point x in data space can then be summarized by its posterior mean and covariance in latent space. From (12.42) the mean is given by

\mathbb {E} [ \mathbf {z} | \mathbf {x} ] = \mathbf {M} ^ {- 1} \mathbf {W} _ {\mathrm{ML}} ^ {\mathrm{T}} (\mathbf {x} - \overline {{\mathbf {x}}})\tag{12.48}

where M is given by (12.41). This projects to a point in data space given by

\mathbf {W} \mathbb {E} [ \mathbf {z} | \mathbf {x} ] + \boldsymbol {\mu}.\tag{12.49}

Note that this takes the same form as the equations for regularized linear regression and is a consequence of maximizing the likelihood function for a linear Gaussian model. Similarly, the posterior covariance is given from (12.42) by $\sigma ^ { 2 } \mathbf { M } ^ { - 1 }$ and is independent of x.

If we take the limit $\sigma ^ { 2 } \to 0 .$ , then the posterior mean reduces to

(\mathbf {W} _ {\mathrm{ML}} ^ {\mathrm{T}} \mathbf {W} _ {\mathrm{ML}}) ^ {- 1} \mathbf {W} _ {\mathrm{ML}} ^ {\mathrm{T}} (\mathbf {x} - \overline {{\mathbf {x}}})\tag{12.50}

which represents an orthogonal projection of the data point onto the latent space, and so we recover the standard PCA model. The posterior covariance in this limit is zero, however, and the density becomes singular. For $\sigma ^ { 2 } > 0 ,$ , the latent projection is shifted towards the origin, relative to the orthogonal projection.

Finally, we note that an important role for the probabilistic PCA model is in defining a multivariate Gaussian distribution in which the number of degrees of freedom, in other words the number of independent parameters, can be controlled whilst still allowing the model to capture the dominant correlations in the data. Recall that a general Gaussian distribution has $D ( D + 1 ) / 2$ independent parameters in its covariance matrix (plus another D parameters in its mean). Thus the number o parameters scales quadratically with D and can become excessive in spaces of high dimensionality. If we restrict the covariance matrix to be diagonal, then it has only D independent parameters, and so the number of parameters now grows linearly with dimensionality. However, it now treats the variables as if they were independent and hence can no longer express any correlations between them. Probabilistic PeA pro vides an elegant compromise in which the M most significant correlations can be captured while still ensuring that the total number of parameters grows only linearly with D. We can see this by evaluating the number of degrees of freedom in the PPCA model as follows. The covariance matrix C depends on the parameters W, which has size $D \times M$ , and $\sigma ^ { 2 }$ , giving a total parameter count of $D M + 1$ . However, we have seen that there is some redundancy in this parameterization associated with rotations of the coordinate system in the latent space. The orthogonal matrix R that expresses these rotations has size $M \times M$ . In the first column of this matrix there are $M - 1$ independent parameters, because the column vector must be normalized to unit length. In the second column there are $M - 2$ independent parameters, because the column must be normalized and also must be orthogonal to the previous column, and so on. Summing this arithmetic series, we see that R has a total o $M ( M - 1 ) / 2$ independent parameters. Thus the number of degrees of freedom in the covariance matrix C is given by

D M + 1 - M (M - 1) / 2.\tag{12.51}

The number of independent parameters in this model therefore only grows linearly with $D ,$ for fixed M. If we take $M = D - 1$ 1, then we recover the standard result for a full covariance Gaussian. In this case, the variance along $D - 1$ linearly independent directions is controlled by the columns of W, and the variance along the remaining direction is given by $\sigma ^ { 2 }$ . If $M = 0$ , the model is equivalent to the isotropic covariance case.
