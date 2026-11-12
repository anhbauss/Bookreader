---
id: "tin-hieu-he-thong.5-5-4-tangent-propagation"
doc_id: "tin-hieu-he-thong"
title: "5.5.4 Tangent propagation"
level: 2
heading_path: ["Neural Networks", "5.5.4 Tangent propagation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-5-3-invariances"
next_id: "tin-hieu-he-thong.5-5-5-training-with-transformed-data"
block_ids: ["b3007", "b3008", "b3009", "b3010", "b3011", "b3012", "b3013", "b3014", "b3015", "b3016", "b3017", "b3018", "b3019", "b3020", "b3021", "b3022", "b3023", "b3024", "b3025", "b3026", "b3027", "b3028"]
---

## 5.5.4 Tangent propagation

We can use regularization to encourage models to be invariant to transformations of the input through the technique of tangent propagation (Simard et al., 1992). Consider the effect of a transformation on a particular input vector ${ \bf x } _ { n }$ . Provided the transformation is continuous (such as translation or rotation, but not mirror reflection for instance), then the transformed pattern will sweep out a manifold within the D-dimensional input space. This is illustrated in Figure 5.15, for the case of $D =$ 2 for simplicity. Suppose the transformation is governed by a single parameter ξ (which might be rotation angle for instance). Then the subspace swept out by ${ \bf x } _ { n }$

Illustration of a two-dimensional input space showing the effect of a continuous transformation on a particular input vector ${ \bf x } _ { n }$ . A onedimensional transformation, parameterized by the continuous variable ξ, applied to ${ \bf x } _ { n }$ causes it to sweep out a one-dimensional manifold . Locally, the effect of the transformation can be approximated by the tangent vector $\tau _ { n }$

![image](images/part-002--a7f9ded40dc6f682aa1dfe1d28ce963d17056a7177a8980820a8b54cd3dbf902.jpg)

will be one-dimensional, and will be parameterized by $\xi .$ . Let the vector that results from acting on ${ \bf x } _ { n }$ by this transformation be denoted by $\mathbf { s } ( \mathbf { x } _ { n } , \xi )$ , which is defined so that $\mathbf { s } ( \mathbf { x } , 0 ) = \mathbf { x }$ . Then the tangent to the curve $\mathcal { M }$ is given by the directional derivative ${ \boldsymbol { \tau } } = \partial \mathbf { s } / \partial \xi$ , and the tangent vector at the point ${ \bf x } _ { n }$ is given by

\pmb {\tau} _ {n} = \left. \frac {\partial \mathbf {s} (\mathbf {x} _ {n} , \xi)}{\partial \xi} \right| _ {\xi = 0}.\tag{5.125}

Under a transformation of the input vector, the network output vector will, in general, change. The derivative of output k with respect to $\xi$ is given by

\left. \frac {\partial y _ {k}}{\partial \xi} \right| _ {\xi = 0} = \sum_ {i = 1} ^ {D} \frac {\partial y _ {k}}{\partial x _ {i}} \frac {\partial x _ {i}}{\partial \xi} \Bigg | _ {\xi = 0} = \sum_ {i = 1} ^ {D} J _ {k i} \tau_ {i}\tag{5.126}

where $J _ { k i }$ is the $( k , i )$ element of the Jacobian matrix J, as discussed in Section 5.3.4. The result (5.126) can be used to modify the standard error function, so as to encourage local invariance in the neighbourhood of the data points, by the addition to the original error function $E$ of a regularization function $\Omega$ to give a total error function of the form

\widetilde {E} = E + \lambda \Omega\tag{5.127}

where $\lambda$ is a regularization coefficient and

\Omega = \frac {1}{2} \sum_ {n} \sum_ {k} \left(\left. \frac {\partial y _ {n k}}{\partial \xi} \right| _ {\xi = 0}\right) ^ {2} = \frac {1}{2} \sum_ {n} \sum_ {k} \left(\sum_ {i = 1} ^ {D} J _ {n k i} \tau_ {n i}\right) ^ {2}.\tag{5.128}

The regularization function will be zero when the network mapping function is invariant under the transformation in the neighbourhood of each pattern vector, and the value of the parameter λ determines the balance between fitting the training data and learning the invariance property.

In a practical implementation, the tangent vector $\tau _ { n }$ can be approximated using finite differences, by subtracting the original vector ${ \bf x } _ { n }$ from the corresponding vector after transformation using a small value of $\xi ,$ and then dividing by $\xi .$ . This is illustrated in Figure 5.16.

The regularization function depends on the network weights through the Jacobian J. A backpropagation formalism for computing the derivatives of the regularizer with respect to the network weights is easily obtained by extension of the techniques introduced in Section 5.3.

If the transformation is governed by $L$ parameters (e.g., $L = 3$ for the case of translations combined with in-plane rotations in a two-dimensional image), then the manifold  will have dimensionality L, and the corresponding regularizer is given by the sum of terms of the form (5.128), one for each transformation. If several transformations are considered at the same time, and the network mapping is made invariant to each separately, then it will be (locally) invariant to combinations of the transformations (Simard et al., 1992).

Figure 5.16 Illustration showing (a) the original image x of a handwritten digit, (b) the tangent vector $\tau$ corresponding to an infinitesimal clockwise rotation, (c) the result of adding a small contribution from the tangent vector to the original image giving ${ \bf x } + \epsilon \tau$ with $\epsilon = 1 5$ degrees, and (d) the true image rotated for comparison.

![image](images/part-002--1e03f98f5954084e1f0438dd7da27f11cc0c6d76f5e790f802f758eac07e3e8e.jpg)

![image](images/part-002--e77537d09f1b3d94e3c3cd9474f4c381431698544728bcca5172226fcd0a3e09.jpg)

![image](images/part-002--6c3708e23af6d5e306447fcc6007c7f9efd8f67c482d33adf5585d904e6d2887.jpg)

![image](images/part-002--87b2632a842167d917f0fb47fe4d4bb4fb8c1bba9a9762f0fbbfbf7270a1d29b.jpg)

A related technique, called tangent distance, can be used to build invariance properties into distance-based methods such as nearest-neighbour classifiers (Simard et al., 1993).
