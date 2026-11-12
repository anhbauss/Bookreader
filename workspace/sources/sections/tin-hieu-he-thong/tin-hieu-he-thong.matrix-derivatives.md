---
id: "tin-hieu-he-thong.matrix-derivatives"
doc_id: "tin-hieu-he-thong"
title: "Matrix Derivatives"
level: 2
heading_path: ["Appendix A. Data Sets", "Matrix Derivatives"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.traces-and-determinants"
next_id: "tin-hieu-he-thong.eigenvector-equation"
block_ids: ["b7457", "b7458", "b7459", "b7460", "b7461", "b7462", "b7463", "b7464", "b7465", "b7466", "b7467", "b7468", "b7469", "b7470", "b7471", "b7472", "b7473", "b7474", "b7475", "b7476", "b7477", "b7478", "b7479", "b7480", "b7481", "b7482"]
---

## Matrix Derivatives

Sometimes we need to consider derivatives of vectors and matrices with respect to scalars. The derivative of a vector a with respect to a scalar x is itself a vector whose components are given by

\left(\frac {\partial \mathbf {a}}{\partial x}\right) _ {i} = \frac {\partial a _ {i}}{\partial x}\tag{C.16}

with an analogous definition for the derivative of a matrix. Derivatives with respect to vectors and matrices can also be defined, for instance

\left(\frac {\partial x}{\partial \mathbf {a}}\right) _ {i} = \frac {\partial x}{\partial a _ {i}}\tag{C.17}

and similarly

\left(\frac {\partial \mathbf {a}}{\partial \mathbf {b}}\right) _ {i j} = \frac {\partial a _ {i}}{\partial b _ {j}}.\tag{C.18}

The following is easily proven by writing out the components

\frac {\partial}{\partial \mathbf {x}} \left(\mathbf {x} ^ {\mathrm{T}} \mathbf {a}\right) = \frac {\partial}{\partial \mathbf {x}} \left(\mathbf {a} ^ {\mathrm{T}} \mathbf {x}\right) = \mathbf {a}.\tag{C.19}

Similarly

\frac {\partial}{\partial \mathbf {x}} (\mathbf {A B}) = \frac {\partial \mathbf {A}}{\partial \mathbf {x}} \mathbf {B} + \mathbf {A} \frac {\partial \mathbf {B}}{\partial \mathbf {x}}.\tag{C.20}

The derivative of the inverse of a matrix can be expressed as

\frac {\partial}{\partial x} \left(\mathbf {A} ^ {- 1}\right) = - \mathbf {A} ^ {- 1} \frac {\partial \mathbf {A}}{\partial x} \mathbf {A} ^ {- 1}\tag{C.21}

as can be shown by differentiating the equation $\mathbf { A } ^ { - 1 } \mathbf { A } = \mathbf { I }$ using (C.20) and then right multiplying by ${ { \bf A } ^ { - 1 } }$ . Also

\frac {\partial}{\partial x} \ln | \mathbf {A} | = \operatorname{Tr} \left(\mathbf {A} ^ {- 1} \frac {\partial \mathbf {A}}{\partial x}\right)\tag{C.22}

which we shall prove later. If we choose x to be one of the elements of A, we have

\frac {\partial}{\partial A _ {i j}} \mathrm{Tr} (\mathbf {A B}) = B _ {j i}\tag{C.23}

as can be seen by writing out the matrices using index notation. We can write this result more compactly in the form

\frac {\partial}{\partial \mathbf {A}} \mathrm{Tr} (\mathbf {A B}) = \mathbf {B} ^ {\mathrm{T}}.\tag{C.24}

With this notation, we have the following properties

\frac {\partial}{\partial \mathbf {A}} \mathrm{Tr} \left(\mathbf {A} ^ {\mathrm{T}} \mathbf {B}\right) = \mathbf {B}\tag{C.25}

{\frac {\partial}{\partial \mathbf {A}} \mathrm{Tr} (\mathbf {A})} = {\mathbf {I}}\tag{C.26}

\frac {\partial}{\partial \mathbf {A}} \mathrm{Tr} (\mathbf {A B A} ^ {\mathrm{T}}) = \mathbf {A} (\mathbf {B} + \mathbf {B} ^ {\mathrm{T}})\tag{C.27}

which can again be proven by writing out the matrix indices. We also have

\frac {\partial}{\partial \mathbf {A}} \ln | \mathbf {A} | = (\mathbf {A} ^ {- 1}) ^ {\mathrm{T}}\tag{C.28}

which follows from (C.22) and (C.26).
