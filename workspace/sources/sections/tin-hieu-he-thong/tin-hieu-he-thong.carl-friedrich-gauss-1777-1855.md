---
id: "tin-hieu-he-thong.carl-friedrich-gauss-1777-1855"
doc_id: "tin-hieu-he-thong"
title: "Carl Friedrich Gauss 1777\u20131855"
level: 2
heading_path: ["Probability Distributions", "Carl Friedrich Gauss 1777\u20131855"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-3-the-gaussian-distribution"
next_id: "tin-hieu-he-thong.2-3-1-conditional-gaussian-distributions"
block_ids: ["b887", "b888", "b889", "b890", "b891", "b892", "b893", "b894", "b895", "b896", "b897", "b898", "b899", "b900", "b901", "b902", "b903", "b904", "b905", "b906", "b907", "b908", "b909", "b910", "b911", "b912", "b913", "b914", "b915", "b916", "b917", "b918", "b919", "b920", "b921", "b922", "b923", "b924", "b925", "b926", "b927", "b928", "b929", "b930", "b931", "b932", "b933", "b934", "b935", "b936", "b937", "b938", "b939", "b940", "b941", "b942", "b943", "b944", "b945", "b946", "b947", "b948", "b949", "b950", "b951"]
---

## Carl Friedrich Gauss 1777–1855

It is said that when Gauss went to elementary school at age 7, his teacher Buttner, trying to keep the¨ class occupied, asked the pupils to sum the integers from 1 to 100. To the teacher’s amazement, Gauss

arrived at the answer in a matter of moments by noting that the sum can be represented as 50 pairs (1 + 100, 2+99, etc.) each of which added to 101, giving the answer 5,050. It is now believed that the problem which was actually set was of the same form but somewhat harder in that the sequence had a larger starting value and a larger increment. Gauss was a German mathematician and scientist with a reputation for being a hard-working perfectionist. One of his many contributions was to show that least squares can be derived under the assumption of normally distributed errors. He also created an early formulation of non-Euclidean geometry (a self-consistent geometrical theory that violates the axioms of Euclid) but was reluctant to discuss it openly for fear that his reputation might suffer if it were seen that he believed in such a geometry. At one point, Gauss was asked to conduct a geodetic survey of the state of Hanover, which led to his formulation of the normal distribution, now also known as the Gaussian. After his death, a study of his diaries revealed that he had discovered several important mathematical results years or even decades before they were published by others.

functional dependence of the Gaussian on x is through the quadratic form

\Delta^ {2} = (\mathbf {x} - \boldsymbol {\mu}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} - \boldsymbol {\mu})\tag{2.44}

which appears in the exponent. The quantity $\Delta$ is called the Mahalanobis distance from $\pmb { \mu }$ to x and reduces to the Euclidean distance when Σ is the identity matrix. The Gaussian distribution will be constant on surfaces in x-space for which this quadratic form is constant.

First of all, we note that the matrix Σ can be taken to be symmetric, without loss of generality, because any antisymmetric component would disappear from the exponent. Now consider the eigenvector equation for the covariance matrix

\pmb {\Sigma} \mathbf {u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}\tag{2.45}

where $i = 1 , \ldots , D$ . Because Σ is a real, symmetric matrix its eigenvalues will be real, and its eigenvectors can be chosen to form an orthonormal set, so that

\mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {u} _ {j} = I _ {i j}\tag{2.46}

where $I _ { i j }$ is the $i , j$ element of the identity matrix and satisfies

I _ {i j} = \left\{ \begin{array}{l l} 1, & \text { if   } i = j \\ 0, & \text { otherwise. } \end{array} \right.\tag{2.47}

The covariance matrix $\pmb { \Sigma }$ can be expressed as an expansion in terms of its eigenvectors in the form

\pmb {\Sigma} = \sum_ {i = 1} ^ {D} \lambda_ {i} \mathbf {u} _ {i} \mathbf {u} _ {i} ^ {\mathrm{T}}\tag{2.48}

and similarly the inverse covariance matrix $\Sigma ^ { - 1 }$ can be expressed as

\boldsymbol {\Sigma} ^ {- 1} = \sum_ {i = 1} ^ {D} \frac {1}{\lambda_ {i}} \mathbf {u} _ {i} \mathbf {u} _ {i} ^ {\mathrm{T}}.\tag{2.49}

Substituting (2.49) into (2.44), the quadratic form becomes

\Delta^ {2} = \sum_ {i = 1} ^ {D} \frac {y _ {i} ^ {2}}{\lambda_ {i}}\tag{2.50}

where we have defined

y _ {i} = \mathbf {u} _ {i} ^ {\mathrm{T}} (\mathbf {x} - \boldsymbol {\mu}).\tag{2.51}

We can interpret $\{ y _ { i } \}$ as a new coordinate system defined by the orthonormal vectors $\mathbf { u } _ { i }$ that are shifted and rotated with respect to the original $x _ { i }$ coordinates. Forming the vector $\mathbf { y } = ( y _ { 1 } , \dots , y _ { D } ) ^ { \mathrm { T } }$ , we have

\mathbf {y} = \mathbf {U} (\mathbf {x} - \boldsymbol {\mu})\tag{2.52}

The red curve shows the elliptical surface of constant probability density for a Gaussian in a two-dimensional space $\bf { x } =$ $( x _ { 1 } , x _ { 2 } )$ on which the density is $\exp ( - 1 / 2 )$ of its value at $\mathrm { ~ \bf ~ x ~ } = \mathrm { ~ \bf ~ \mu ~ }$ The major axes of the ellipse are defined by the eigenvectors $\mathbf { u } _ { i }$ of the covariance matrix, with corresponding eigenvalues $\lambda _ { i }$

![image](images/part-001--473a3ca527dd44bf3a94da95d23a4e38eac6234286c8f5c4dea43f137b0cb05b.jpg)

where U is a matrix whose rows are given by ${ \bf u } _ { i } ^ { \mathrm { T } }$ . From (2.46) it follows that U is an orthogonal matrix, i.e., it satisfies $\bar { \mathbf { U } } \mathbf { U } ^ { \mathrm { T } } = \mathbf { I }$ , and hence also ${ \bf U } ^ { \mathrm { T } } { \bf U } = { \bf I }$ , where I is the identity matrix.

The quadratic form, and hence the Gaussian density, will be constant on surfaces for which (2.51) is constant. If all of the eigenvalues $\lambda _ { i }$ are positive, then these surfaces represent ellipsoids, with their centres at $\pmb { \mu }$ and their axes oriented along $\mathbf { u } _ { i }$ and with scaling factors in the directions of the axes given by $\lambda _ { i } ^ { 1 / 2 }$ , as illustrated in Figure 2.7.

For the Gaussian distribution to be well defined, it is necessary for all of the eigenvalues $\lambda _ { i }$ of the covariance matrix to be strictly positive, otherwise the distribution cannot be properly normalized. A matrix whose eigenvalues are strictly positive is said to be positive definite. In Chapter 12, we will encounter Gaussian distributions for which one or more of the eigenvalues are zero, in which case the distribution is singular and is confined to a subspace of lower dimensionality. If all of the eigenvalues are nonnegative, then the covariance matrix is said to be positive semidefinite.

Now consider the form of the Gaussian distribution in the new coordinate system defined by the $y _ { i }$ . In going from the x to the y coordinate system, we have a Jacobian matrix J with elements given by

J _ {i j} = \frac {\partial x _ {i}}{\partial y _ {j}} = U _ {j i}\tag{2.53}

where $U _ { j i }$ are the elements of the matrix $\mathbf { U } ^ { \mathrm { T } }$ . Using the orthonormality property of the matrix U, we see that the square of the determinant of the Jacobian matrix is

\left| \mathbf {J} \right| ^ {2} = \left| \mathbf {U} ^ {\mathrm{T}} \right| ^ {2} = \left| \mathbf {U} ^ {\mathrm{T}} \right| \left| \mathbf {U} \right| = \left| \mathbf {U} ^ {\mathrm{T}} \mathbf {U} \right| = \left| \mathbf {I} \right| = 1\tag{2.54}

and hence $| \mathbf { J } | = 1$ . Also, the determinant Σ of the covariance matrix can be written

as the product of its eigenvalues, and hence

| \boldsymbol {\Sigma} | ^ {1 / 2} = \prod_ {j = 1} ^ {D} \lambda_ {j} ^ {1 / 2}.\tag{2.55}

Thus in the $y _ { j }$ coordinate system, the Gaussian distribution takes the form

p (\mathbf {y}) = p (\mathbf {x}) | \mathbf {J} | = \prod_ {j = 1} ^ {D} \frac {1}{(2 \pi \lambda_ {j}) ^ {1 / 2}} \exp \left\{- \frac {y _ {j} ^ {2}}{2 \lambda_ {j}} \right\}\tag{2.56}

which is the product of D independent univariate Gaussian distributions. The eigenvectors therefore define a new set of shifted and rotated coordinates with respect to which the joint probability distribution factorizes into a product of independent distributions. The integral of the distribution in the y coordinate system is then

\int p (\mathbf {y}) \mathrm{d} \mathbf {y} = \prod_ {j = 1} ^ {D} \int_ {- \infty} ^ {\infty} \frac {1}{(2 \pi \lambda_ {j}) ^ {1 / 2}} \exp \left\{- \frac {y _ {j} ^ {2}}{2 \lambda_ {j}} \right\} \mathrm{d} y _ {j} = 1\tag{2.57}

where we have used the result (1.48) for the normalization of the univariate Gaussian. This confirms that the multivariate Gaussian (2.43) is indeed normalized.

We now look at the moments of the Gaussian distribution and thereby provide an interpretation of the parameters $\pmb { \mu }$ and $\Sigma$ . The expectation of x under the Gaussian distribution is given by

\begin{array}{r c l} \mathbb {E} [ \mathbf {x} ] & = & \frac {1}{(2 \pi) ^ {D / 2}} \frac {1}{| \pmb {\Sigma} | ^ {1 / 2}} \int \exp \left\{- \frac {1}{2} (\mathbf {x} - \pmb {\mu}) ^ {\mathrm{T}} \pmb {\Sigma} ^ {- 1} (\mathbf {x} - \pmb {\mu}) \right\} \mathbf {x} \mathrm{d} \mathbf {x} \\ & = & \frac {1}{(2 \pi) ^ {D / 2}} \frac {1}{| \pmb {\Sigma} | ^ {1 / 2}} \int \exp \left\{- \frac {1}{2} \mathbf {z} ^ {\mathrm{T}} \pmb {\Sigma} ^ {- 1} \mathbf {z} \right\} (\mathbf {z} + \pmb {\mu}) \mathrm{d} \mathbf {z} \end{array}\tag{2.58}

where we have changed variables using $\mathbf { z } = \mathbf { x } - \pmb { \mu }$ . We now note that the exponent is an even function of the components of z and, because the integrals over these are taken over the range $( - \infty , \infty )$ , the term in z in the factor $( \mathbf { z } + \pmb { \mu } )$ will vanish by symmetry. Thus

\mathbb {E} [ \mathbf {x} ] = \boldsymbol {\mu}\tag{2.59}

and so we refer to $\pmb { \mu }$ as the mean of the Gaussian distribution.

We now consider second order moments of the Gaussian. In the univariate case, we considered the second order moment given by $\mathbb { E } [ x ^ { 2 } ]$ . For the multivariate Gaussian, there are $D ^ { 2 }$ second order moments given by $\mathbb { E } [ x _ { i } x _ { j } ]$ , which we can group together to form the matrix $\mathbb { E } [ { \mathbf { x x } } ^ { \mathrm { T } } ]$ . This matrix can be written as

\begin{array}{l} \mathbb {E} [ \mathbf {x x} ^ {\mathrm{T}} ] = \frac {1}{(2 \pi) ^ {D / 2}} \frac {1}{| \boldsymbol {\Sigma} | ^ {1 / 2}} \int \exp \left\{- \frac {1}{2} (\mathbf {x} - \boldsymbol {\mu}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} - \boldsymbol {\mu}) \right\} \mathbf {x x} ^ {\mathrm{T}} \mathrm{d} \mathbf {x} \\ = \frac {1}{(2 \pi) ^ {D / 2}} \frac {1}{| \boldsymbol {\Sigma} | ^ {1 / 2}} \int \exp \left\{- \frac {1}{2} \mathbf {z} ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} \mathbf {z} \right\} (\mathbf {z} + \boldsymbol {\mu}) (\mathbf {z} + \boldsymbol {\mu}) ^ {\mathrm{T}} \mathrm{d} \mathbf {z} \end{array}

where again we have changed variables using ${ \bf z } = { \bf x } - \mu$ . Note that the cross-terms involving $\mu \mathbf { z } ^ { \mathrm { T } }$ and ${ \pmb { \mu } } ^ { \mathrm { T } } { \bf z }$ will again vanish by symmetry. The term $\mu \mu ^ { \mathrm { T } }$ is constant and can be taken outside the integral, which itself is unity because the Gaussian distribution is normalized. Consider the term involving ${ \bf z } { \bf z } ^ { \mathrm { \tiny \dag } }$ . Again, we can make use of the eigenvector expansion of the covariance matrix given by (2.45), together with the completeness of the set of eigenvectors, to write

\mathbf {z} = \sum_ {j = 1} ^ {D} y _ {j} \mathbf {u} _ {j}\tag{2.60}

where $y _ { j } = \mathbf { u } _ { j } ^ { \mathrm { T } } \mathbf { z } ,$ which gives

\begin{array}{l} \frac {1}{(2 \pi) ^ {D / 2}} \frac {1}{| \boldsymbol {\Sigma} | ^ {1 / 2}} \int \exp \left\{- \frac {1}{2} \mathbf {z} ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} \mathbf {z} \right\} \mathbf {z} \mathbf {z} ^ {\mathrm{T}}   \mathrm{d} \mathbf {z} \\ = \frac {1}{(2 \pi) ^ {D / 2}} \frac {1}{| \boldsymbol {\Sigma} | ^ {1 / 2}} \sum_ {i = 1} ^ {D} \sum_ {j = 1} ^ {D} \mathbf {u} _ {i} \mathbf {u} _ {j} ^ {\mathrm{T}} \int \exp \left\{- \sum_ {k = 1} ^ {D} \frac {y _ {k} ^ {2}}{2 \lambda_ {k}} \right\} y _ {i} y _ {j}   \mathrm{d} \mathbf {y} \\ = \sum_ {i = 1} ^ {D} \mathbf {u} _ {i} \mathbf {u} _ {i} ^ {\mathrm{T}} \lambda_ {i} = \boldsymbol {\Sigma} \end{array}\tag{2.61}

where we have made use of the eigenvector equation (2.45), together with the fact that the integral on the right-hand side of the middle line vanishes by symmetry unless $i = j$ , and in the final line we have made use of the results (1.50) and (2.55), together with (2.48). Thus we have

\mathbb {E} \left[ \mathbf {x x} ^ {\mathrm{T}} \right] = \boldsymbol {\mu} \boldsymbol {\mu} ^ {\mathrm{T}} + \boldsymbol {\Sigma}.\tag{2.62}

For single random variables, we subtracted the mean before taking second moments in order to define a variance. Similarly, in the multivariate case it is again convenient to subtract off the mean, giving rise to the covariance of a random vector x defined by

\operatorname{cov} [ \mathbf {x} ] = \mathbb {E} \left[ (\mathbf {x} - \mathbb {E} [ \mathbf {x} ]) (\mathbf {x} - \mathbb {E} [ \mathbf {x} ]) ^ {\mathrm{T}} \right].\tag{2.63}

For the specific case of a Gaussian distribution, we can make use of $\mathbb { E } [ \mathbf { x } ] = \mu$ together with the result (2.62), to give

\operatorname{cov} [ \mathbf {x} ] = \boldsymbol {\Sigma}.\tag{2.64}

Because the parameter matrix Σ governs the covariance of x under the Gaussian distribution, it is called the covariance matrix.

Although the Gaussian distribution (2.43) is widely used as a density model, it suffers from some significant limitations. Consider the number of free parameters in the distribution. A general symmetric covariance matrix Σ will have $\bar { D } ( D + 1 ) / 2$ independent parameters, and there are another D independent parameters in µ, giving $\bar { D } ( D + 3 ) / 2$ parameters in total. For large D, the total number of parameters

Figure 2.8 Contours of constant probability density for a Gaussian distribution in two dimensions in which the covariance matrix is (a) of general form, (b) diagonal, in which the elliptical contours are aligned with the coordinate axes, and (c) proportional to the identity matrix, in which the contours are concentric circles.

![image](images/part-001--c7af733a5fcfd3a0bc332426213e5cc1b709879b039ee43de3f8fd70940b1715.jpg)

(a)

![image](images/part-001--714456f4ef998e29f0614a1a12f4d94e9997a6cf8a6eabd392e5d7c1cab463ab.jpg)

![image](images/part-001--4b64bd564d78fb1e34bd0350fc1f067b213ea71e75e153fe99bd18ddb13c9ea5.jpg)

therefore grows quadratically with D, and the computational task of manipulating and inverting large matrices can become prohibitive. One way to address this problem is to use restricted forms of the covariance matrix. If we consider covariance matrices that are diagonal, so that $\Sigma = \mathrm { d i a g } ( \sigma _ { i } ^ { 2 } )$ , we then have a total of 2D independent parameters in the density model. The corresponding contours of constant density are given by axis-aligned ellipsoids. We could further restrict the covariance matrix to be proportional to the identity matrix, $\boldsymbol { \Sigma } = \sigma ^ { 2 } \boldsymbol { \mathbf { I } } ,$ , known as an isotropic covariance, giving $D + 1$ independent parameters in the model and spherical surfaces of constant density. The three possibilities of general, diagonal, and isotropic covariance matrices are illustrated in Figure 2.8. Unfortunately, whereas such approaches limit the number of degrees of freedom in the distribution and make inversion of the covariance matrix a much faster operation, they also greatly restrict the form of the probability density and limit its ability to capture interesting correlations in the data.

A further limitation of the Gaussian distribution is that it is intrinsically uni modal (i.e., has a single maximum) and so is unable to provide a good approximation to multimodal distributions. Thus the Gaussian distribution can be both too flexible, in the sense of having too many parameters, while also being too limited in the range of distributions that it can adequately represent. We will see later that the introduction of latent variables, also called hidden variables or unobserved variables, allows both of these problems to be addressed. In particular, a rich family of multimodal distributions is obtained by introducing discrete latent variables leading to mixtures of Gaussians, as discussed in Section 2.3.9. Similarly, the introduction of continuous latent variables, as described in Chapter 12, leads to models in which the number of free parameters can be controlled independently of the dimensionality D of the data space while still allowing the model to capture the dominant correlations in the data set. Indeed, these two approaches can be combined and further extended to derive a very rich set of hierarchical models that can be adapted to a broad range of practical applications. For instance, the Gaussian version of the Markov random field, which is widely used as a probabilistic model of images, is a Gaussian distribution over the joint space of pixel intensities but rendered tractable through the imposition of considerable structure reflecting the spatial organization of the pixels. Similarly, the linear dynamical system, used to model time series data for applications such as tracking, is also a joint Gaussian distribution over a potentially large number of observed and latent variables and again is tractable due to the structure imposed on the distribution. A powerful framework for expressing the form and properties of such complex distributions is that of probabilistic graphical models, which will form the subject of Chapter 8.
