---
id: "tin-hieu-he-thong.3-1-2-geometry-of-least-squares"
doc_id: "tin-hieu-he-thong"
title: "3.1.2 Geometry of least squares"
level: 2
heading_path: ["3 Linear Models for Regression", "3.1.2 Geometry of least squares"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-1-1-maximum-likelihood-and-least-squares"
next_id: "tin-hieu-he-thong.3-1-3-sequential-learning"
block_ids: ["b1694", "b1695", "b1696"]
---

## 3.1.2 Geometry of least squares

At this point, it is instructive to consider the geometrical interpretation of the least-squares solution. To do this we consider an N-dimensional space whose axes are given by the $t _ { n }$ , so that $\mathbf { t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ is a vector in this space. Each basis function $\phi _ { j } ( \mathbf { x } _ { n } )$ , evaluated at the N data points, can also be represented as a vector in the same space, denoted by $\varphi _ { j }$ , as illustrated in Figure 3.2. Note that $\varphi _ { j }$ corresponds to the $j ^ { \mathrm { t h } }$ column of $\Phi _ { \pmb { \imath } }$ , whereas $\phi (  { \mathbf { x } } _ { n } )$ corresponds to the $n ^ { \mathrm { t h } }$ row of $\Phi$ . If the number M of basis functions is smaller than the number N of data points, then the M vectors $\phi _ { j } (  { \mathbf { x } } _ { n } )$ will span a linear subspace $s$ of dimensionality M. We define y to be an N-dimensional vector whose $\bar { n } ^ { \mathrm { t h } }$ element is given by $y ( \mathbf { x } _ { n } , \mathbf { w } )$ , where $n = 1 , \ldots , N$ . Because y is an arbitrary linear combination of the vectors $\varphi _ { j }$ , it can live anywhere in the M-dimensional subspace. The sum-of-squares error (3.12) is then equal (up to a factor of $1 / 2 )$ to the squared Euclidean distance between y and t. Thus the least-squares solution for w corresponds to that choice of y that lies in subspace and that is closest to t. Intuitively, from Figure 3.2, we anticipate that this solution corresponds to the orthogonal projection of t onto the subspace ${ \mathcal { S } } .$ . This is indeed the case, as can easily be verified by noting that the solution for y is given by Φ $\mathbf { w } _ { \mathrm { M L } }$ , and then confirming that this takes the form of an orthogonal projection.

In practice, a direct solution of the normal equations can lead to numerical difficulties when $\Phi ^ { \mathrm { T } } \Phi$ is close to singular. In particular, when two or more of the basis vectors $\varphi _ { j }$ are co-linear, or nearly so, the resulting parameter values can have large magnitudes. Such near degeneracies will not be uncommon when dealing with real data sets. The resulting numerical difficulties can be addressed using the technique of singular value decomposition, or SVD (Press et al., 1992; Bishop and Nabney, 2008). Note that the addition of a regularization term ensures that the matrix is nonsingular, even in the presence of degeneracies.
