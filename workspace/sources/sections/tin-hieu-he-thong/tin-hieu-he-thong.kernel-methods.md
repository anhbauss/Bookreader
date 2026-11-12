---
id: "tin-hieu-he-thong.kernel-methods"
doc_id: "tin-hieu-he-thong"
title: "Kernel Methods"
level: 1
heading_path: ["Kernel Methods"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.6"
next_id: "tin-hieu-he-thong.6-1-dual-representations"
block_ids: ["b3328", "b3329", "b3330", "b3331", "b3332", "b3333", "b3334", "b3335", "b3336", "b3337", "b3338"]
---

# Kernel Methods

![image](images/part-002--0a5d4ac963b507ac1c6fa91c08bfb953859575186bae636783b0daa447fc8ddf.jpg)

In Chapters 3 and 4, we considered linear parametric models for regression and classification in which the form of the mapping y(x, w) from input x to output y is governed by a vector w of adaptive parameters. During the learning phase, a set of training data is used either to obtain a point estimate of the parameter vector or to determine a posterior distribution over this vector. The training data is then discarded, and predictions for new inputs are based purely on the learned parameter vector w. This approach is also used in nonlinear parametric models such as neural networks.

However, there is a class of pattern recognition techniques, in which the training data points, or a subset of them, are kept and used also during the prediction phase. For instance, the Parzen probability density model comprised a linear combination of ‘kernel’ functions each one centred on one of the training data points. Similarly, in Section 2.5.2 we introduced a simple technique for classification called nearest neighbours, which involved assigning to each new test vector the same label as the closest example from the training set. These are examples of memory-based methods that involve storing the entire training set in order to make predictions for future data points. They typically require a metric to be defined that measures the similarity of any two vectors in input space, and are generally fast to ‘train’ but slow at making predictions for test data points.

Many linear parametric models can be re-cast into an equivalent ‘dual representation’ in which the predictions are also based on linear combinations of a kernel function evaluated at the training data points. As we shall see, for models which are based on a fixed nonlinear feature space mapping $\phi ( \mathbf { x } )$ , the kernel function is given by the relation

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \phi (\mathbf {x}) ^ {\mathrm{T}} \phi (\mathbf {x} ^ {\prime}).\tag{6.1}

From this definition, we see that the kernel is a symmetric function of its arguments so that $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = k ( \mathbf { x } ^ { \prime } , \mathbf { x } )$ . The kernel concept was introduced into the field of pattern recognition by Aizerman et al. (1964) in the context of the method of potential functions, so-called because of an analogy with electrostatics. Although neglected for many years, it was re-introduced into machine learning in the context of largemargin classifiers by Boser et al. (1992) giving rise to the technique of support vector machines. Since then, there has been considerable interest in this topic, both in terms of theory and applications. One of the most significant developments has been the extension of kernels to handle symbolic objects, thereby greatly expanding the range of problems that can be addressed.

The simplest example of a kernel function is obtained by considering the identity mapping for the feature space in (6.1) so that $\phi ( \mathbf { x } ) = \mathbf { x }$ , in which case $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) =$ $\mathbf { x } ^ { \mathrm { { T } } } \mathbf { \hat { x } } ^ { \prime }$ . We shall refer to this as the linear kernel.

The concept of a kernel formulated as an inner product in a feature space allows us to build interesting extensions of many well-known algorithms by making use of the kernel trick, also known as kernel substitution. The general idea is that, if we have an algorithm formulated in such a way that the input vector x enters only in the form of scalar products, then we can replace that scalar product with some other choice of kernel. For instance, the technique of kernel substitution can be applied to principal component analysis in order to develop a nonlinear variant of PCA (Scholkopf¨ et al., 1998). Other examples of kernel substitution include nearest-neighbour classifiers and the kernel Fisher discriminant (Mika et al., 1999; Roth and Steinhage, 2000; Baudat and Anouar, 2000).

There are numerous forms of kernel functions in common use, and we shall encounter several examples in this chapter. Many have the property of being a function only of the difference between the arguments, so that $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = k ( \mathbf { x } - \mathbf { x } ^ { \prime } )$ , which are known as stationary kernels because they are invariant to translations in input space. A further specialization involves homogeneous kernels, also known as radial basis functions, which depend only on the magnitude of the distance (typically Euclidean) between the arguments so that $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = k ( \| \mathbf { x } - \mathbf { x } ^ { \prime } \| )$

For recent textbooks on kernel methods, see Scholkopf and Smola (2002), Her- ¨ brich (2002), and Shawe-Taylor and Cristianini (2004).
