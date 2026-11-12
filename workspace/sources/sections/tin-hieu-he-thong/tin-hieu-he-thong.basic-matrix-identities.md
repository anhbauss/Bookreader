---
id: "tin-hieu-he-thong.basic-matrix-identities"
doc_id: "tin-hieu-he-thong"
title: "Basic Matrix Identities"
level: 2
heading_path: ["Appendix A. Data Sets", "Basic Matrix Identities"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.appendix-c-properties-of-matrices"
next_id: "tin-hieu-he-thong.traces-and-determinants"
block_ids: ["b7420", "b7421", "b7422", "b7423", "b7424", "b7425", "b7426", "b7427", "b7428", "b7429", "b7430", "b7431", "b7432", "b7433", "b7434", "b7435", "b7436", "b7437"]
---

## Basic Matrix Identities

A matrix A has elements $A _ { i j }$ where i indexes the rows, and j indexes the columns. We use ${ \mathbf { I } } _ { N }$ to denote the $N \times N$ identity matrix (also called the unit matrix), and where there is no ambiguity over dimensionality we simply use I. The transpose matrix ${ \bf A } ^ { \mathrm { T } }$ has elements $( \mathbf { A } ^ { \mathrm { T } } ) _ { i j } = A _ { j i }$ . From the definition of transpose, we have

(\mathbf {A B}) ^ {\mathrm{T}} = \mathbf {B} ^ {\mathrm{T}} \mathbf {A} ^ {\mathrm{T}}\tag{C.1}

which can be verified by writing out the indices. The inverse of A, denoted $\mathbf { A } ^ { - 1 }$ satisfies

\mathbf {A} \mathbf {A} ^ {- 1} = \mathbf {A} ^ {- 1} \mathbf {A} = \mathbf {I}.\tag{C.2}

Because $\mathbf { A } \mathbf { B } \mathbf { B } ^ { - 1 } \mathbf { A } ^ { - 1 } = \mathbf { I }$ , we have

(\mathbf {A B}) ^ {- 1} = \mathbf {B} ^ {- 1} \mathbf {A} ^ {- 1}.\tag{C.3}

Also we have

\left(\mathbf {A} ^ {\mathrm{T}}\right) ^ {- 1} = \left(\mathbf {A} ^ {- 1}\right) ^ {\mathrm{T}}\tag{C.4}

which is easily proven by taking the transpose of (C.2) and applying (C.1).

A useful identity involving matrix inverses is the following

(\mathbf {P} ^ {- 1} + \mathbf {B} ^ {\mathrm{T}} \mathbf {R} ^ {- 1} \mathbf {B}) ^ {- 1} \mathbf {B} ^ {\mathrm{T}} \mathbf {R} ^ {- 1} = \mathbf {P B} ^ {\mathrm{T}} (\mathbf {B P B} ^ {\mathrm{T}} + \mathbf {R}) ^ {- 1}.\tag{C.5}

which is easily verified by right multiplying both sides by $( \mathbf { B P B ^ { \mathrm { T } } + R } )$ . Suppose that P has dimensionality $N \times N$ while R has dimensionality $M \times M$ , so that B is $M \times N$ . Then if $M \ll N$ , it will be much cheaper to evaluate the right-hand side of (C.5) than the left-hand side. A special case that sometimes arises is

(\mathbf {I} + \mathbf {A B}) ^ {- 1} \mathbf {A} = \mathbf {A} (\mathbf {I} + \mathbf {B A}) ^ {- 1}.\tag{C.6}

Another useful identity involving inverses is the following:

(\mathbf {A} + \mathbf {B D} ^ {- 1} \mathbf {C}) ^ {- 1} = \mathbf {A} ^ {- 1} - \mathbf {A} ^ {- 1} \mathbf {B} (\mathbf {D} + \mathbf {C A} ^ {- 1} \mathbf {B}) ^ {- 1} \mathbf {C A} ^ {- 1}\tag{C.7}

which is known as the Woodbury identity and which can be verified by multiplying both sides by $\mathbf { \left( A + B D ^ { - 1 } C \right) }$ This is useful, for instance, when A is large and diagonal, and hence easy to invert, while B has many rows but few columns (and conversely for C) so that the right-hand side is much cheaper to evaluate than the left-hand side.

A set of vectors $\left\{ \mathbf { a } _ { 1 } , \ldots , \mathbf { a } _ { N } \right\}$ is said to be linearly independent if the relation $\begin{array} { r } { \sum _ { n } \alpha _ { n } \mathbf { a } _ { n } \ = \ 0 } \end{array}$ holds only if all $\alpha _ { n } \ = \ 0$ . This implies that none of the vectors can be expressed as a linear combination of the remainder. The rank of a matrix is the maximum number of linearly independent rows (or equivalently the maximum number of linearly independent columns).
