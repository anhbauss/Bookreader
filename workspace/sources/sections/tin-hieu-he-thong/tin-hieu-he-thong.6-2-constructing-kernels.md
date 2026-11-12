---
id: "tin-hieu-he-thong.6-2-constructing-kernels"
doc_id: "tin-hieu-he-thong"
title: "6.2. Constructing Kernels"
level: 2
heading_path: ["Kernel Methods", "6.2. Constructing Kernels"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.6-1-dual-representations"
next_id: "tin-hieu-he-thong.techniques-for-constructing-new-kernels"
block_ids: ["b3359", "b3360", "b3361", "b3362", "b3363", "b3364", "b3365", "b3366", "b3367", "b3368", "b3369", "b3370", "b3371", "b3372", "b3373", "b3374", "b3375", "b3376"]
---

## 6.2. Constructing Kernels

In order to exploit kernel substitution, we need to be able to construct valid kernel functions. One approach is to choose a feature space mapping $\phi ( \mathbf { x } )$ and then use this to find the corresponding kernel, as is illustrated in Figure 6.1. Here the kernel function is defined for a one-dimensional input space by

k (x, x ^ {\prime}) = \phi (x) ^ {\mathrm{T}} \phi (x ^ {\prime}) = \sum_ {i = 1} ^ {M} \phi_ {i} (x) \phi_ {i} (x ^ {\prime})\tag{6.10}

where $\phi _ { i } ( x )$ are the basis functions.

An alternative approach is to construct kernel functions directly. In this case, we must ensure that the function we choose is a valid kernel, in other words that it corresponds to a scalar product in some (perhaps infinite dimensional) feature space. As a simple example, consider a kernel function given by

k (\mathbf {x}, \mathbf {z}) = \left(\mathbf {x} ^ {\mathrm{T}} \mathbf {z}\right) ^ {2}.\tag{6.11}

![image](images/part-002--b059d0c8c797bee0c8932bfdef1082629afc417f0ba72bb426295489f4046942.jpg)

![image](images/part-002--a0120d0f416ba57cbe5f554f3171bca4b9ec03924711a53c889c35a033a10f76.jpg)

![image](images/part-002--355f11d420feba31aab1ee39030e2a5b3e8506b887869bce2b49d68a096640da.jpg)

![image](images/part-002--f8dc7e653c2292d613aff64796870344c87cf05c26840581a20996f6a270c4f5.jpg)

![image](images/part-002--b9046c62a0cef930e75af369aa6ceffacbc7f02b0dd1c5dcf55731c19d3a0787.jpg)

![image](images/part-002--0dea52f9fce94713860ea48bd33333927605635ab3f58db76edbc92c16b79315.jpg)

Figure 6.1 Illustration of the construction of kernel functions starting from a corresponding set of basis func tions. In each column the lower plot shows the kernel function $k ( x , x ^ { \prime } )$ defined by (6.10) plotted as a function of $x$ for $x ^ { \prime } = 0$ , while the upper plot shows the corresponding basis functions given by polynomials (left column), ‘Gaussians’ (centre column), and logistic sigmoids (right column).

If we take the particular case of a two-dimensional input space $\mathbf { x } = \left( x _ { 1 } , x _ { 2 } \right)$ we can expand out the terms and thereby identify the corresponding nonlinear feature mapping

\begin{array}{r c l} {k (\mathbf {x}, \mathbf {z})} & = & {\left(\mathbf {x} ^ {\mathrm{T}} \mathbf {z}\right) ^ {2} = (x _ {1} z _ {1} + x _ {2} z _ {2}) ^ {2}} \\ & = & {x _ {1} ^ {2} z _ {1} ^ {2} + 2 x _ {1} z _ {1} x _ {2} z _ {2} + x _ {2} ^ {2} z _ {2} ^ {2}} \\ & = & {(x _ {1} ^ {2}, \sqrt {2} x _ {1} x _ {2}, x _ {2} ^ {2}) (z _ {1} ^ {2}, \sqrt {2} z _ {1} z _ {2}, z _ {2} ^ {2}) ^ {\mathrm{T}}} \\ & = & {\phi (\mathbf {x}) ^ {\mathrm{T}} \phi (\mathbf {z}).} \end{array}\tag{6.12}

We see that the feature mapping takes the form $\phi ( \mathbf { x } ) \ = \ ( x _ { 1 } ^ { 2 } , \sqrt { 2 } x _ { 1 } x _ { 2 } , x _ { 2 } ^ { 2 } ) ^ { \mathrm { T } }$ and therefore comprises all possible second order terms, with a specific weighting between them.

More generally, however, we need a simple way to test whether a function constitutes a valid kernel without having to construct the function $\phi ( \mathbf { x } )$ explicitly. A necessary and sufficient condition for a function $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ to be a valid kernel (Shawe-Taylor and Cristianini, 2004) is that the Gram matrix K, whose elements are given by $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } )$ , should be positive semidefinite for all possible choices of the set $\left\{ \mathbf { x } _ { n } \right\}$ Note that a positive semidefinite matrix is not the same thing as a matrix whose elements are nonnegative.

One powerful technique for constructing new kernels is to build them out of simpler kernels as building blocks. This can be done using the following properties:
