---
id: "tin-hieu-he-thong.traces-and-determinants"
doc_id: "tin-hieu-he-thong"
title: "Traces and Determinants"
level: 2
heading_path: ["Appendix A. Data Sets", "Traces and Determinants"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.basic-matrix-identities"
next_id: "tin-hieu-he-thong.matrix-derivatives"
block_ids: ["b7438", "b7439", "b7440", "b7441", "b7442", "b7443", "b7444", "b7445", "b7446", "b7447", "b7448", "b7449", "b7450", "b7451", "b7452", "b7453", "b7454", "b7455", "b7456"]
---

## Traces and Determinants

Trace and determinant apply to square matrices. The trace $\operatorname { T r } ( \mathbf { A } )$ of a matrix A is defined as the sum of the elements on the leading diagonal. By writing out the indices, we see that

\operatorname{Tr} (\mathbf {A B}) = \operatorname{Tr} (\mathbf {B A}).\tag{C.8}

By applying this formula multiple times to the product of three matrices, we see that

\operatorname{Tr} (\mathbf {A B C}) = \operatorname{Tr} (\mathbf {C A B}) = \operatorname{Tr} (\mathbf {B C A})\tag{C.9}

which is known as the cyclic property of the trace operator and which clearly extends to the product of any number of matrices. The determinant $| \mathbf { A } |$ of an $N \times N$ matrix A is defined by

| \mathbf {A} | = \sum (\pm 1) A _ {1 i _ {1}} A _ {2 i _ {2}} \dots A _ {N i _ {N}}\tag{C.10}

in which the sum is taken over all products consisting of precisely one element from each row and one element from each column, with a coefficient +1 or 1 according to whether the permutation $i _ { 1 } i _ { 2 } \dots i _ { N }$ is even or odd, respectively. Note that $| \mathbf { I } | = 1$ Thus, for a $2 \times 2$ matrix, the determinant takes the form

| \mathbf {A} | = \left| \begin{array}{l l} a _ {1 1} & a _ {1 2} \\ a _ {2 1} & a _ {2 2} \end{array} \right| = a _ {1 1} a _ {2 2} - a _ {1 2} a _ {2 1}.\tag{C.11}

The determinant of a product of two matrices is given by

| \mathbf {A B} | = | \mathbf {A} | | \mathbf {B} |\tag{C.12}

as can be shown from (C.10). Also, the determinant of an inverse matrix is given by

\left| \mathbf {A} ^ {- 1} \right| = \frac {1}{\left| \mathbf {A} \right|}\tag{C.13}

which can be shown by taking the determinant of (C.2) and applying (C.12).

If A and B are matrices of size $N \times M$ , then

\left| \mathbf {I} _ {N} + \mathbf {A B} ^ {\mathrm{T}} \right| = \left| \mathbf {I} _ {M} + \mathbf {A} ^ {\mathrm{T}} \mathbf {B} \right|.\tag{C.14}

A useful special case is

\left| \mathbf {I} _ {N} + \mathbf {a b} ^ {\mathrm{T}} \right| = 1 + \mathbf {a} ^ {\mathrm{T}} \mathbf {b}\tag{C.15}

where a and b are N-dimensional column vectors.
