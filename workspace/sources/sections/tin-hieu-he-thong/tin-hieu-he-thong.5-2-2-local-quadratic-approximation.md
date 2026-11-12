---
id: "tin-hieu-he-thong.5-2-2-local-quadratic-approximation"
doc_id: "tin-hieu-he-thong"
title: "5.2.2 Local quadratic approximation"
level: 2
heading_path: ["Neural Networks", "5.2.2 Local quadratic approximation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-2-1-parameter-optimization"
next_id: "tin-hieu-he-thong.5-2-3-use-of-gradient-information"
block_ids: ["b2702", "b2703", "b2704", "b2705", "b2706", "b2707", "b2708", "b2709", "b2710", "b2711", "b2712", "b2713", "b2714", "b2715", "b2716", "b2717", "b2718", "b2719", "b2720", "b2721", "b2722", "b2723", "b2724", "b2725", "b2726", "b2727", "b2728", "b2729", "b2730", "b2731", "b2732", "b2733"]
---

## 5.2.2 Local quadratic approximation

Insight into the optimization problem, and into the various techniques for solving it, can be obtained by considering a local quadratic approximation to the error function.

Consider the Taylor expansion of $E ( \mathbf { w } )$ around some point $\widehat { \bf w }$ in weight space

E (\mathbf {w}) \simeq E (\widehat {\mathbf {w}}) + (\mathbf {w} - \widehat {\mathbf {w}}) ^ {\mathrm{T}} \mathbf {b} + \frac {1}{2} (\mathbf {w} - \widehat {\mathbf {w}}) ^ {\mathrm{T}} \mathbf {H} (\mathbf {w} - \widehat {\mathbf {w}})\tag{5.28}

where cubic and higher terms have been omitted. Here b is defined to be the gradient of E evaluated at $\widehat { \mathbf { w } }$

\mathbf {b} \equiv \left. \nabla E \right| _ {\mathbf {w} = \widehat {\mathbf {w}}}\tag{5.29}

and the Hessian matrix $\mathbf { H } = \nabla \nabla E$ has elements

(\mathbf {H}) _ {i j} \equiv \left. \frac {\partial E}{\partial w _ {i} \partial w _ {j}} \right| _ {\mathbf {w} = \widehat {\mathbf {w}}}.\tag{5.30}

From (5.28), the corresponding local approximation to the gradient is given by

\nabla E \simeq \mathbf {b} + \mathbf {H} (\mathbf {w} - \widehat {\mathbf {w}}).\tag{5.31}

For points w that are sufficiently close to $\widehat { \bf w }$ , these expressions will give reasonable approximations for the error and its gradient.

Consider the particular case of a local quadratic approximation around a point $\mathbf { w } ^ { \star }$ that is a minimum of the error function. In this case there is no linear term, because $\nabla E = 0$ at $\mathbf { w } ^ { \star }$ , and (5.28) becomes

E (\mathbf {w}) = E (\mathbf {w} ^ {\star}) + \frac {1}{2} (\mathbf {w} - \mathbf {w} ^ {\star}) ^ {\mathrm{T}} \mathbf {H} (\mathbf {w} - \mathbf {w} ^ {\star})\tag{5.32}

where the Hessian H is evaluated at $\mathbf { w } ^ { \star }$ . In order to interpret this geometrically, consider the eigenvalue equation for the Hessian matrix

\mathbf {H} \mathbf {u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}\tag{5.33}

where the eigenvectors $\mathbf { u } _ { i }$ form a complete orthonormal set (Appendix C) so that

\mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {u} _ {j} = \delta_ {i j}.\tag{5.34}

We now expand $\left( \mathbf { w } - \mathbf { w } ^ { \star } \right)$ as a linear combination of the eigenvectors in the form

\mathbf {w} - \mathbf {w} ^ {\star} = \sum_ {i} \alpha_ {i} \mathbf {u} _ {i}.\tag{5.35}

This can be regarded as a transformation of the coordinate system in which the origin is translated to the point $\mathbf { w } ^ { \star }$ , and the axes are rotated to align with the eigenvectors (through the orthogonal matrix whose columns are the $\mathbf { u } _ { i } )$ , and is discussed in more detail in Appendix C. Substituting (5.35) into (5.32), and using (5.33) and (5.34), allows the error function to be written in the form

E (\mathbf {w}) = E (\mathbf {w} ^ {\star}) + \frac {1}{2} \sum_ {i} \lambda_ {i} \alpha_ {i} ^ {2}.\tag{5.36}

A matrix H is said to be positive definite if, and only if,

\mathbf {v} ^ {\mathrm{T}} \mathbf {H} \mathbf {v} > 0 \quad \text {   for   all   } \mathbf {v}.\tag{5.37}

In the neighbourhood of a minimum $\mathbf { w } ^ { \star }$ , the error function can be approximated by a quadratic. Contours of constant error are then ellipses whose axes are aligned with the eigenvectors $\mathbf { u } _ { i }$ of the Hessian matrix, with lengths that are inversely proportional to the square roots of the corresponding eigenvectors $\lambda _ { i }$

![image](images/part-002--f240565430fbe22a5aa2eb16e5a6882ba0a275f5c1216b00a2867060d005c843.jpg)

Because the eigenvectors $\left\{ { { \bf { u } } _ { i } } \right\}$ form a complete set, an arbitrary vector v can be written in the form

\mathbf {v} = \sum_ {i} c _ {i} \mathbf {u} _ {i}.\tag{5.38}

From (5.33) and (5.34), we then have

\mathbf {v} ^ {\mathrm{T}} \mathbf {H} \mathbf {v} = \sum_ {i} c _ {i} ^ {2} \lambda_ {i}\tag{5.39}

and so H will be positive definite if, and only if, all of its eigenvalues are positive. In the new coordinate system, whose basis vectors are given by the eigenvectors $\{ \mathbf { u } _ { i } \}$ , the contours of constant $E$ are ellipses centred on the origin, as illustrated in Figure 5.6. For a one-dimensional weight space, a stationary point $w ^ { \star }$ will be a minimum if

\left. \frac {\partial^ {2} E}{\partial w ^ {2}} \right| _ {w ^ {\star}} > 0.\tag{5.40}

The corresponding result in D-dimensions is that the Hessian matrix, evaluated at $\mathbf { w } ^ { \star }$ , should be positive definite.
