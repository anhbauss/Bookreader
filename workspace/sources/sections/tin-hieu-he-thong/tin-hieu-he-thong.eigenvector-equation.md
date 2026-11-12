---
id: "tin-hieu-he-thong.eigenvector-equation"
doc_id: "tin-hieu-he-thong"
title: "Eigenvector Equation"
level: 2
heading_path: ["Appendix A. Data Sets", "Eigenvector Equation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.matrix-derivatives"
next_id: "tin-hieu-he-thong.appendix-d-calculus-of-variations"
block_ids: ["b7483", "b7484", "b7485", "b7486", "b7487", "b7488", "b7489", "b7490", "b7491", "b7492", "b7493", "b7494", "b7495", "b7496", "b7497", "b7498", "b7499", "b7500", "b7501", "b7502", "b7503", "b7504", "b7505", "b7506", "b7507", "b7508", "b7509", "b7510", "b7511", "b7512", "b7513", "b7514", "b7515", "b7516", "b7517", "b7518", "b7519", "b7520", "b7521", "b7522", "b7523", "b7524", "b7525", "b7526", "b7527", "b7528", "b7529", "b7530", "b7531", "b7532"]
---

## Eigenvector Equation

For a square matrix A of size $M \times M$ , the eigenvector equation is defined by

\mathbf {A} \mathbf {u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}\tag{C.29}

for $i = 1 , \ldots , M$ , where $\mathbf { u } _ { i }$ is an eigenvector and $\lambda _ { i }$ is the corresponding eigenvalue. This can be viewed as a set of M simultaneous homogeneous linear equations, and the condition for a solution is that

| \mathbf {A} - \lambda_ {i} \mathbf {I} | = 0\tag{C.30}

which is known as the characteristic equation. Because this is a polynomial of order M in $\lambda _ { i } .$ , it must have M solutions (though these need not all be distinct). The rank of A is equal to the number of nonzero eigenvalues.

Of particular interest are symmetric matrices, which arise as covariance matrices, kernel matrices, and Hessians. Symmetric matrices have the property that $A _ { i j } = A _ { j i }$ , or equivalently $\mathbf { A } ^ { \mathrm { T } } = \mathbf { A }$ . The inverse of a symmetric matrix is also symmetric, as can be seen by taking the transpose of $\mathbf { A } ^ { - 1 } \dot { \mathbf { A } } = \mathbf { I }$ and using $\mathbf { A } \mathbf { A } ^ { - 1 } = \mathbf { I }$ together with the symmetry of I.

In general, the eigenvalues of a matrix are complex numbers, but for symmetric matrices the eigenvalues $\lambda _ { i }$ are real. This can be seen by first left multiplying (C.29) by $( \mathbf { u } _ { i } ^ { \star } ) ^ { \mathrm { T } }$ , where  denotes the complex conjugate, to give

\left(\mathbf {u} _ {i} ^ {\star}\right) ^ {\mathrm{T}} \mathbf {A u} _ {i} = \lambda_ {i} \left(\mathbf {u} _ {i} ^ {\star}\right) ^ {\mathrm{T}} \mathbf {u} _ {i}.\tag{C.31}

Next we take the complex conjugate of (C.29) and left multiply by ${ \mathbf { u } } _ { i } ^ { \mathrm { T } }$ to give

\mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {A} \mathbf {u} _ {i} ^ {\star} = \lambda_ {i} ^ {\star} \mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {u} _ {i} ^ {\star}.\tag{C.32}

where we have used $\mathbf { A } ^ { \star } = \mathbf { A }$ because we consider only real matrices A. Taking the transpose of the second of these equations, and using $\mathbf { A } ^ { \mathrm { T } } = \mathbf { A }$ , we see that the left-hand sides of the two equations are equal, and hence that $\lambda _ { i } ^ { \star } = \lambda _ { i }$ and so $\lambda _ { i }$ must be real.

The eigenvectors $\mathbf { u } _ { i }$ of a real symmetric matrix can be chosen to be orthonormal (i.e., orthogonal and of unit length) so that

\mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {u} _ {j} = I _ {i j}\tag{C.33}

where $I _ { i j }$ are the elements of the identity matrix I. To show this, we first left multiply (C.29) by $\mathbf { u } _ { j } ^ { \mathrm { T } }$ to give

\mathbf {u} _ {j} ^ {\mathrm{T}} \mathbf {A} \mathbf {u} _ {i} = \lambda_ {i} \mathbf {u} _ {j} ^ {\mathrm{T}} \mathbf {u} _ {i}\tag{C.34}

and hence, by exchange of indices, we have

\mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {A} \mathbf {u} _ {j} = \lambda_ {j} \mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {u} _ {j}.\tag{C.35}

We now take the transpose of the second equation and make use of the symmetry property $\mathbf { A } ^ { \mathrm { T } } = \mathbf { A }$ , and then subtract the two equations to give

\left(\lambda_ {i} - \lambda_ {j}\right) \mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {u} _ {j} = 0.\tag{C.36}

Hence, for $\lambda _ { i } \neq \lambda _ { j }$ , we have $\mathbf { u } _ { i } ^ { \mathrm { T } } \mathbf { u } _ { j } = 0$ , and hence $\mathbf { u } _ { i }$ and $\mathbf { u } _ { j }$ are orthogonal. If the two eigenvalues are equal, then any linear combination $\alpha \mathbf { u } _ { i } + \beta \mathbf { u } _ { j }$ is also an eigenvector with the same eigenvalue, so we can select one linear combination arbitrarily, and then choose the second to be orthogonal to the first (it can be shown that the degenerate eigenvectors are never linearly dependent). Hence the eigenvectors can be chosen to be orthogonal, and by normalizing can be set to unit length. Because there are M eigenvalues, the corresponding M orthogonal eigenvectors form a complete set and so any M-dimensional vector can be expressed as a linear combination of the eigenvectors.

We can take the eigenvectors $\mathbf { u } _ { i }$ to be the columns of an $M \times M$ matrix U, which from orthonormality satisfies

\mathbf {U} ^ {\mathrm{T}} \mathbf {U} = \mathbf {I}.\tag{C.37}

Such a matrix is said to be orthogonal. Interestingly, the rows of this matrix are also orthogonal, so that $\mathbf { U } \mathbf { U } ^ { \mathrm { T } } = \mathbf { I }$ . To show this, note that (C.37) implies $\begin{array} { r } { { \bf U } ^ { \mathrm { T } } { \bf U } { \bf U } ^ { - 1 } = \qquad } \end{array}$ $\mathbf { U } ^ { - 1 } = \mathbf { U } ^ { \mathrm { T } }$ and so $\mathbf { U U } ^ { - 1 } = \mathbf { U U } ^ { \mathrm { T } } = \mathbf { I } .$ . Using (C.12), it also follows that $| \mathbf { U } | = 1$ The eigenvector equation (C.29) can be expressed in terms of U in the form The eigenvector equation (C.29) can be expressed in terms of U in the form

\mathbf {A} \mathbf {U} = \mathbf {U} \boldsymbol {\Lambda}\tag{C.38}

where Λ is an $M \times M$ diagonal matrix whose diagonal elements are given by the eigenvalues $\lambda _ { i }$

If we consider a column vector x that is transformed by an orthogonal matrix U to give a new vector

\widetilde {\mathbf {x}} = \mathbf {U} \mathbf {x}\tag{C.39}

then the length of the vector is preserved because

\widetilde {\mathbf {x}} ^ {\mathrm{T}} \widetilde {\mathbf {x}} = \mathbf {x} ^ {\mathrm{T}} \mathbf {U} ^ {\mathrm{T}} \mathbf {U} \mathbf {x} = \mathbf {x} ^ {\mathrm{T}} \mathbf {x}\tag{C.40}

and similarly the angle between any two such vectors is preserved because

\widetilde {\mathbf {x}} ^ {\mathrm{T}} \widetilde {\mathbf {y}} = \mathbf {x} ^ {\mathrm{T}} \mathbf {U} ^ {\mathrm{T}} \mathbf {U} \mathbf {y} = \mathbf {x} ^ {\mathrm{T}} \mathbf {y}.\tag{C.41}

Thus, multiplication by U can be interpreted as a rigid rotation of the coordinate system.

From (C.38), it follows that

\mathbf {U} ^ {\mathrm{T}} \mathbf {A} \mathbf {U} = \boldsymbol {\Lambda}\tag{C.42}

and because Λ is a diagonal matrix, we say that the matrix A is diagonalized by the matrix U. If we left multiply by U and right multiply by $\mathbf { U } ^ { \mathrm { T } }$ , we obtain

\mathbf {A} = \mathbf {U} \boldsymbol {\Lambda} \mathbf {U} ^ {\mathrm{T}}\tag{C.43}

Taking the inverse of this equation, and using (C.3) together with $\mathbf { U } ^ { - 1 } = \mathbf { U } ^ { \mathrm { T } }$ , we have

\mathbf {A} ^ {- 1} = \mathbf {U} \boldsymbol {\Lambda} ^ {- 1} \mathbf {U} ^ {\mathrm{T}}.\tag{C.44}

These last two equations can also be written in the form

\mathbf {A} = \sum_ {i = 1} ^ {M} \lambda_ {i} \mathbf {u} _ {i} \mathbf {u} _ {i} ^ {\mathrm{T}}\tag{C.45}

\mathbf {A} ^ {- 1} = \sum_ {i = 1} ^ {M} \frac {1}{\lambda_ {i}} \mathbf {u} _ {i} \mathbf {u} _ {i} ^ {\mathrm{T}}.\tag{C.46}

If we take the determinant of (C.43), and use (C.12), we obtain

| \mathbf {A} | = \prod_ {i = 1} ^ {M} \lambda_ {i}.\tag{C.47}

Similarly, taking the trace of (C.43), and using the cyclic property (C.8) of the trace operator together with $\mathbf { U } ^ { \mathrm { T } } \mathbf { U } = \mathbf { I }$ , we have

\operatorname{Tr} (\mathbf {A}) = \sum_ {i = 1} ^ {M} \lambda_ {i}.\tag{C.48}

We leave it as an exercise for the reader to verify (C.22) by making use of the results (C.33), (C.45), (C.46), and (C.47).

A matrix A is said to be positive definite, denoted by $\mathbf A \succ 0$ , if $\mathbf { w } ^ { \mathrm { T } } \mathbf { A } \mathbf { w } > 0$ for all values of the vector w. Equivalently, a positive definite matrix has $\lambda _ { i } > 0$ for all of its eigenvalues (as can be seen by setting w to each of the eigenvectors in turn, and by noting that an arbitrary vector can be expanded as a linear combination of the eigenvectors). Note that positive definite is not the same as all the elements being positive. For example, the matrix

\left( \begin{array}{c c} 1 & 2 \\ 3 & 4 \end{array} \right)\tag{C.49}

has eigenvalues $\lambda _ { 1 } \simeq 5 . 3 7$ and $\lambda _ { 2 } \simeq - 0 . 3 7$ . A matrix is said to be positive semidefinite if $\mathbf { w } ^ { \mathrm { T } } \mathbf { A } \mathbf { w } \ \geqslant \ 0$ holds for all values of w, which is denoted $\textbf { A } \succeq 0$ , and is equivalent to $\lambda _ { i } \geqslant 0$
