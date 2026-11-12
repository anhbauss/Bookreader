---
id: "tin-hieu-he-thong.12-1-2-minimum-error-formulation"
doc_id: "tin-hieu-he-thong"
title: "12.1.2 Minimum-error formulation"
level: 2
heading_path: ["Sampling Methods", "12.1.2 Minimum-error formulation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.12-1-1-mllximllm-variance-lormulation"
next_id: "tin-hieu-he-thong.12-1-3-applications-of-pea"
block_ids: ["b6150", "b6151", "b6152", "b6153", "b6154", "b6155", "b6156", "b6157", "b6158", "b6159", "b6160", "b6161", "b6162", "b6163", "b6164", "b6165", "b6166", "b6167", "b6168", "b6169", "b6170", "b6171", "b6172", "b6173", "b6174", "b6175", "b6176", "b6177", "b6178", "b6179"]
---

## 12.1.2 Minimum-error formulation

We now discuss an alternative formulation of peA based on projection error minimization. To do this, we introduce a complete orthonormal set ofD-dimensional basis vectors $\left\{ { \bf { u } } _ { i } \right\}$ where $i = 1 , \ldots , D$ that satisfy

\mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {u} _ {j} = \delta_ {i j}.\tag{12.7}

Because this basis is complete, each data point can be represented exactly by a linear combination of the basis vectors

\mathbf {x} _ {n} = \sum_ {i = 1} ^ {D} \alpha_ {n i} \mathbf {u} _ {i}\tag{12.8}

where the coefficients $\alpha _ { n i }$ will be different for different data points. This simply corresponds to a rotation of the coordinate system to a new system defined by the $\left\{ { \bf { u } } _ { i } \right\}$ , and the original D components $\{ x _ { n 1 } , \ldots , x _ { n D } \}$ are replaced by an equivalent set $\left\{ \alpha _ { n 1 } , \ldots , \alpha _ { n D } \right\}$ . Taking the inner product with $\mathbf { u } _ { j }$ , and making use of the orthonormality property, we obtain $\alpha _ { n j } = \mathbf { x } _ { n } ^ { \mathrm { T } } \mathbf { u } _ { j }$ , and so without loss of generality we can write

\mathbf {x} _ {n} = \sum_ {i = 1} ^ {D} \left(\mathbf {x} _ {n} ^ {\mathrm{T}} \mathbf {u} _ {i}\right) \mathbf {u} _ {i}.\tag{12.9}

Our goal, however, is to approximate this data point using a representation involving a restricted number $M < D$ of variables corresponding to a projection onto a lower-dimensional subspace. The M -dimensional linear subspace can be represented, without loss of generality, by the first M of the basis vectors, and so we approximate each data point ${ \bf x } _ { n }$ by

\widetilde {\mathbf {x}} _ {n} = \sum_ {i = 1} ^ {M} z _ {n i} \mathbf {u} _ {i} + \sum_ {i = M + 1} ^ {D} b _ {i} \mathbf {u} _ {i}\tag{12.10}

where the $\left\{ z _ { n i } \right\}$ depend on the particular data point, whereas the $\{ b _ { i } \}$ are constants that are the same for all data points. We are free to choose the $\left\{ { \bf { u } } _ { i } \right\}$ , the $\left\{ z _ { n i } \right\}$ , and the $\{ b _ { i } \}$ so as to minimize the distortion introduced by the reduction in dimensionality. As our distortion measure, we shall use the squared distance between the original data point ${ \bf x } _ { n }$ and its approximation $\widetilde { \mathbf { x } } _ { n }$ , averaged over the data set, so that our goal is to minimize

J = \frac {1}{N} \sum_ {n = 1} ^ {N} \left\| \mathbf {x} _ {n} - \widetilde {\mathbf {x}} _ {n} \right\| ^ {2}.\tag{12.11}

Consider first of all the minimization with respect to the quantities $\left\{ z _ { n i } \right\}$ . Substituting for $\widetilde { \mathbf { x } } _ { n }$ , setting the derivative with respect to $z _ { n j }$ to zero, and making use of the orthonormality conditions, we obtain

z _ {n j} = \mathbf {x} _ {n} ^ {\mathrm{T}} \mathbf {u} _ {j}\tag{12.12}

where $j = 1 , \dots , M$ . Similarly, setting the derivative of J with respect to $b _ { i }$ to zero, and again making use of the orthonormality relations, gives

b _ {j} = \overline {{\mathbf {x}}} ^ {\mathrm{T}} \mathbf {u} _ {j}\tag{12.13}

where $j = M { + } 1 , \ldots , D$ . If we substitute for $z _ { n i }$ and $b _ { i }$ , and make use of the general expansion (12.9), we obtain

\mathbf {x} _ {n} - \widetilde {\mathbf {x}} _ {n} = \sum_ {i = M + 1} ^ {D} \left\{\left(\mathbf {x} _ {n} - \overline {{\mathbf {x}}}\right) ^ {\mathrm{T}} \mathbf {u} _ {i} \right\} \mathbf {u} _ {i}\tag{12.14}

from which we see that the displacement vector from $\mathbf { x } _ { n }$ to $\widetilde { \mathbf { x } } _ { n }$ lies in the space orthogonal to the principal subspace, because it is a linear combination of $\left\{ { \bf { u } } _ { i } \right\}$ for $i = M + 1 , \dots , D $ , as illustrated in Figure 12.2. This is to be expected because the projected points $\widetilde { \mathbf { x } } _ { n }$ must lie within the principal subspace, but we can move them freely within that subspace, and so the minimum error is given by the orthogona projection.

We therefore obtain an expression for the distortion measure $J$ as a function purely of the $\{ \mathbf { u } _ { i } \}$ in the form

J = \frac {1}{N} \sum_ {n = 1} ^ {N} \sum_ {i = M + 1} ^ {D} \left(\mathbf {x} _ {n} ^ {\mathrm{T}} \mathbf {u} _ {i} - \overline {{\mathbf {x}}} ^ {\mathrm{T}} \mathbf {u} _ {i}\right) ^ {2} = \sum_ {i = M + 1} ^ {D} \mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {S u} _ {i}.\tag{12.15}

There remains the task of minimizing J with respect to the $\left\{ { \bf { u } } _ { i } \right\}$ }, which mus be a constrained minimization otherwise we will obtain the vacuous result $\mathbf { u } _ { i } = 0$ The constraints arise from the orthonormality conditions and, as we shall see, the solution will be expressed in terms of the eigenvector expansion of the covariance matrix. Before considering a formal solution, let us try to obtain some intuition abou the result by considering the case of a two-dimensional data spac $D = 2$ and a one dimensional principal subspace $M = 1$ 1. We have to choose a direction $\mathbf { u } _ { 2 }$ so as to minimize $J = \mathbf { u } _ { 2 } ^ { \mathrm { T } } \mathbf { S } \mathbf { u } _ { 2 }$ ' subject to the normalization constraint $\mathbf { u } _ { 2 } ^ { \mathrm { T } } \mathbf { u } _ { 2 } = 1$ . Using a Lagrange multiplier $\lambda _ { 2 }$ to enforce the constraint, we consider the minimization of

\widetilde {J} = \mathbf {u} _ {2} ^ {\mathrm{T}} \mathbf {S u} _ {2} + \lambda_ {2} \left(1 - \mathbf {u} _ {2} ^ {\mathrm{T}} \mathbf {u} _ {2}\right).\tag{12.16}

Setting the derivative with respect to $\mathbf { u } _ { 2 }$ to zero, we obtain $\mathbf { S } \mathbf { u } _ { 2 } = \lambda _ { 2 } \mathbf { u } _ { 2 }$ so that $\mathbf { u } _ { 2 }$ is an eigenvector of S with eigenvalue $\lambda _ { 2 }$ . Thus any eigenvector will define a stationary point of the distortion measure. To find the value of J at the minimum, we back-substitute the solution for $\mathbf { u } _ { 2 }$ into the distortion measure to give $J = \lambda _ { 2 }$ . We therefore obtain the minimum value of J by choosing $\mathbf { u } _ { 2 }$ to be the eigenvector corresponding to the smaller of the two eigenvalues. Thus we should choose the principa subspace to be aligned with the eigenvector having the larger eigenvalue. This resul accords with our intuition that, in order to minimize the average squared projection distance, we should choose the principal component subspace to pass through the mean of the data points and to be aligned with the directions of maximum variance. For the case when the eigenvalues are equal, any choice of principal direction wil give rise to the same value of J.

The general solution to the minimization of J for arbitrary D and arbitrary $M <$ D is obtained by choosing the $\left\{ { { \bf { u } } _ { i } } \right\}$ to be eigenvectors of the covariance matrix given by

\mathbf {S u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}\tag{12.17}

where $i = 1 , \ldots , D$ , and as usual the eigenvectors $\left\{ { { \bf { u } } _ { i } } \right\}$ are chosen to be orthonormal. The corresponding value of the distortion measure is then given by

J = \sum_ {i = M + 1} ^ {D} \lambda_ {i}\tag{12.18}

which is simply the sum of the eigenvalues of those eigenvectors that are orthogonal to the principal subspace. We therefore obtain the minimum value of J by selecting these eigenvectors to be those having the $D - M$ smallest eigenvalues, and hence the eigenvectors defining the principal subspace are those corresponding to the M largest eigenvalues.

Although we have considered $M \ < \ D$ , the PCA analysis still holds if $M =$ $D ,$ in which case there is no dimensionality reduction but simply a rotation of the coordinate axes to align with principal components.

Finally, it is worth noting that there exists a closely related linear dimensionality reduction technique called canonical correlation analysis, or CCA (Hotelling, 1936; Bach and Jordan, 2002). Whereas PCA works with a single random variable, CCA considers two (or more) variables and tries to find a corresponding pair of linear subspaces that have high cross-correlation, so that each component within one of the subspaces is correlated with a single component from the other subspace. Its solution can be expressed in terms of a generalized eigenvector problem.
