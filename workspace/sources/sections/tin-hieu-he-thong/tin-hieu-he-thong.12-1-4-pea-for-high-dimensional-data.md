---
id: "tin-hieu-he-thong.12-1-4-pea-for-high-dimensional-data"
doc_id: "tin-hieu-he-thong"
title: "12.1.4 peA for high-dimensional data"
level: 2
heading_path: ["Sampling Methods", "12.1.4 peA for high-dimensional data"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.12-1-3-applications-of-pea"
next_id: "tin-hieu-he-thong.12-2-probabilistic-pea"
block_ids: ["b6217", "b6218", "b6219", "b6220", "b6221", "b6222", "b6223", "b6224", "b6225", "b6226", "b6227", "b6228", "b6229", "b6230"]
---


In some applications of principal component analysis, the number of data points is smaller than the dimensionality of the data space. For example, we might want to apply PCA to a data set of a few hundred images, each of which corresponds to a vector in a space of potentially several million dimensions (corresponding to the three colour values for each of the pixels in the image). Note that in a D-dimensional space a set of N points, where $N < D$, defines a linear subspace whose dimensionality is at most $N - 1$, and so there is little point in applying PCA for values of M that are greater than $N - 1$. Indeed, if we perform PCA we will find that at least $D - N + 1$ of the eigenvalues are zero, corresponding to eigenvectors along whose directions the data set has zero variance. Furthermore, typical algorithms for finding the eigenvectors of a $D \times D$ matrix have a computational cost that scales like $O ( D ^ { 3 } )$ and so for applications such as the image example, a direct application of PCA will be computationally infeasible.

We can resolve this problem as follows: First, let us define X to be the $( N \times D )$ dimensional centred data matrix, whose $n ^ { \mathrm { th } }$ row is given by $( { \bf x } _ { n } - { \overline { { \bf x } } } ) ^ { \mathrm { T } }$. The covariance matrix (12.3) can then be written as ${ \bf S } = N ^ { { - } 1 } { \bf X } ^ { \mathrm { T } } { \bf X }$, and the corresponding eigenvector equation becomes

\frac {1}{N} \mathbf {X} ^ {\mathrm{T}} \mathbf {X} \mathbf {u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}.\tag{12.26}

Now pre-multiply both sides by X to give

\frac {1}{N} \mathbf {X X ^ {\mathrm{T}}} (\mathbf {X u} _ {i}) = \lambda_ {i} (\mathbf {X u} _ {i}).\tag{12.27}

If we now define $\mathbf { v } _ { i } = \mathbf { X } \mathbf { u } _ { i }$, we obtain

\frac {1}{N} \mathbf {X X ^ {\mathrm{T}}} \mathbf {v} _ {i} = \lambda_ {i} \mathbf {v} _ {i}\tag{12.28}

which is an eigenvector equation for the $N \times N$ matrix $N ^ { - 1 } \mathbf { X } \mathbf { X } ^ { \mathrm { { T } } }$. We see that this has the same $N - 1$ eigenvalues as the original covariance matrix (which itself has an additional $D - N + 1$ eigenvalues of value zero). Thus we can solve the eigenvector problem in spaces of lower dimensionality with computational cost $O ( N ^ { 3 } )$ instead of $O ( D ^ { 3 } )$. In order to determine the eigenvectors, we multiply both sides of (12.28) by $\mathbf { X } ^ { \mathrm { { T } } }$ to give

\left(\frac {1}{N} \mathbf {X} ^ {\mathrm{T}} \mathbf {X}\right) (\mathbf {X} ^ {\mathrm{T}} \mathbf {v} _ {i}) = \lambda_ {i} (\mathbf {X} ^ {\mathrm{T}} \mathbf {v} _ {i})\tag{12.29}

from which we see that $\left( \mathbf { X } ^ { \mathrm { { T } } } \mathbf { v } _ { i } \right)$ is an eigenvector of S with eigenvalue $\lambda _ { i }$. Note, however, that these eigenvectors need not be normalized. To determine the appropriate normalization, we re-scale $\mathbf { u } _ { i } \propto \mathbf { X } ^ { \mathrm { { T } } } \mathbf { v } _ { i }$ by a constant such that $\left\| \mathbf { u } _ { i } \right\| = 1$, which, assuming $\mathbf { v } _ { i }$ has been normalized to unit length, gives

\mathbf {u} _ {i} = \frac {1}{(N \lambda_ {i}) ^ {1 / 2}} \mathbf {X} ^ {\mathrm{T}} \mathbf {v} _ {i}.\tag{12.30}

In summary, to apply this approach we first evaluate $\mathbf { X X ^ { \mathrm { { T } } } }$ and then find its eigenvectors and eigenvalues and then compute the eigenvectors in the original data space using (12.30).
