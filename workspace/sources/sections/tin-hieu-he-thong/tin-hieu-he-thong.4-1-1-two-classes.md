---
id: "tin-hieu-he-thong.4-1-1-two-classes"
doc_id: "tin-hieu-he-thong"
title: "4.1.1 Two classes"
level: 2
heading_path: ["4 Linear Models for Classification", "4.1.1 Two classes"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-1-discriminant-functions"
next_id: "tin-hieu-he-thong.4-1-2-multiple-classes"
block_ids: ["b2071", "b2072", "b2073", "b2074", "b2075", "b2076", "b2077", "b2078", "b2079", "b2080", "b2081", "b2082", "b2083", "b2084", "b2085", "b2086", "b2087"]
---

## 4.1.1 Two classes

The simplest representation of a linear discriminant function is obtained by taking a linear function of the input vector so that

y (\mathbf {x}) = \mathbf {w} ^ {\mathrm{T}} \mathbf {x} + w _ {0}\tag{4.4}

where w is called a weight vector, and $w _ { 0 }$ is a bias (not to be confused with bias in the statistical sense). The negative of the bias is sometimes called a threshold. An input vector x is assigned to class $\mathcal { C } _ { 1 }$ if $y ( \mathbf { x } ) \geqslant 0$ and to class $\mathcal { C } _ { 2 }$ otherwise. The corresponding decision boundary is therefore defined by the relation $y ( \mathbf { x } ) = 0$ , which corresponds to a $( D - 1 )$ -dimensional hyperplane within the D-dimensional input space. Consider two points $\mathbf { x } _ { \mathrm { A } }$ and $\mathbf { x _ { \mathrm { B } } }$ both of which lie on the decision surface. Because $y ( \mathbf { x } _ { \mathrm { A } } ) = y ( \mathbf { x } _ { \mathrm { B } } ) = 0$ , we have ${ \bf w } ^ { \mathrm { T } } ( { \bf x } _ { \mathrm { A } } - { \bf x } _ { \mathrm { B } } ) = 0$ and hence the vector w is orthogonal to every vector lying within the decision surface, and so w determines the orientation of the decision surface. Similarly, if x is a point on the decision surface, then $y ( \mathbf { x } ) = 0$ , and so the normal distance from the origin to the decision surface is given by

\frac {\mathbf {w} ^ {\mathrm{T}} \mathbf {x}}{\| \mathbf {w} \|} = - \frac {w _ {0}}{\| \mathbf {w} \|}.\tag{4.5}

We therefore see that the bias parameter $w _ { 0 }$ determines the location of the decision surface. These properties are illustrated for the case of $D = 2$ in Figure 4.1.

Furthermore, we note that the value of $y ( \mathbf x )$ gives a signed measure of the perpendicular distance r of the point x from the decision surface. To see this, consider

Figure 4.1 Illustration of the geometry of a linear discriminant function in two dimensions. The decision surface, shown in red, is perpendicular to $\mathbf { w } ,$ and its displacement from the origin is controlled by the bias parameter $w _ { 0 } .$ Also, the signed orthogonal distance of a general point x from the decision surface is given by $y ( \mathbf { x } ) / \| \mathbf { w } \|$

![image](images/part-002--1503b03e08c287d433ad5604f4bd35c289eefd7598dc4fabcb61a2d08c173517.jpg)

an arbitrary point x and let $\mathbf { x } _ { \perp }$ be its orthogonal projection onto the decision surface, so that W

\mathbf {x} = \mathbf {x} _ {\perp} + r \frac {\mathbf {w}}{\| \mathbf {w} \|}.\tag{4.6}

Multiplying both sides of this result by $\mathbf { w } ^ { \mathrm { T } }$ and adding $w _ { 0 }$ , and making use of $y ( \mathbf { x } ) =$ $\mathbf { w } ^ { \mathrm { T } } \mathbf { x } + w _ { 0 }$ and $y ( \mathbf { x } _ { \perp } ) = \mathbf { w } ^ { \mathrm { T } } \mathbf { x } _ { \perp } + w _ { 0 } = 0$ , we have

r = \frac {y (\mathbf {x})}{\| \mathbf {w} \|}.\tag{4.7}

This result is illustrated in Figure 4.1.

As with the linear regression models in Chapter 3, it is sometimes convenient to use a more compact notation in which we introduce an additional dummy ‘input value $x _ { 0 } = 1$ and then define $\widetilde { \mathbf { w } } = ( w _ { 0 } , \mathbf { w } )$ and $\widetilde { \mathbf { x } } = \left( x _ { 0 } , \mathbf { x } \right)$ so that

y (\mathbf {x}) = \widetilde {\mathbf {w}} ^ {\mathrm{T}} \widetilde {\mathbf {x}}.\tag{4.8}

In this case, the decision surfaces are D-dimensional hyperplanes passing through the origin of the $D + 1$ -dimensional expanded input space.
