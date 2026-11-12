---
id: "tin-hieu-he-thong.6-3-radial-basis-function-networks"
doc_id: "tin-hieu-he-thong"
title: "6.3. Radial Basis Function Networks"
level: 2
heading_path: ["Kernel Methods", "6.3. Radial Basis Function Networks"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.techniques-for-constructing-new-kernels"
next_id: "tin-hieu-he-thong.6-3-1-nadaraya-watson-model"
block_ids: ["b3431", "b3432", "b3433", "b3434", "b3435", "b3436", "b3437", "b3438", "b3439", "b3440", "b3441", "b3442", "b3443", "b3444", "b3445", "b3446", "b3447", "b3448", "b3449", "b3450"]
---

## 6.3. Radial Basis Function Networks

In Chapter 3, we discussed regression models based on linear combinations of fixed basis functions, although we did not discuss in detail what form those basis functions might take. One choice that has been widely used is that of radial basis functions, which have the property that each basis function depends only on the radial distance (typically Euclidean) from a centre $\mu _ { j }$ , so that $\phi _ { j } ( \mathbf { x } ) = h ( \| \mathbf { x } - \pmb { \mu } _ { j } \| )$

Historically, radial basis functions were introduced for the purpose of exact function interpolation (Powell, 1987). Given a set of input vectors $\{ \mathbf { x } _ { 1 } , \hdots , \mathbf { x } _ { N } \}$ along with corresponding target values $\{ t _ { 1 } , \ldots , t _ { N } \}$ , the goal is to find a smooth function $f ( \mathbf { x } )$ that fits every target value exactly, so that $f ( \mathbf { x } _ { n } ) = t _ { n }$ for $n = 1 , \ldots , N$ . This is achieved by expressing $f ( \mathbf { x } )$ as a linear combination of radial basis functions, one centred on every data point

f (\mathbf {x}) = \sum_ {n = 1} ^ {N} w _ {n} h (\| \mathbf {x} - \mathbf {x} _ {n} \|).\tag{6.38}

The values of the coefficients $\{ w _ { n } \}$ are found by least squares, and because there are the same number of coefficients as there are constraints, the result is a function that fits every target value exactly. In pattern recognition applications, however, the target values are generally noisy, and exact interpolation is undesirable because this corresponds to an over-fitted solution.

Expansions in radial basis functions also arise from regularization theory (Poggio and Girosi, 1990; Bishop, 1995a). For a sum-of-squares error function with a regularizer defined in terms of a differential operator, the optimal solution is given by an expansion in the Green’s functions of the operator (which are analogous to the eigenvectors of a discrete matrix), again with one basis function centred on each data point. If the differential operator is isotropic then the Green’s functions depend only on the radial distance from the corresponding data point. Due to the presence of the regularizer, the solution no longer interpolates the training data exactly.

Another motivation for radial basis functions comes from a consideration of the interpolation problem when the input (rather than the target) variables are noisy (Webb, 1994; Bishop, 1995a). If the noise on the input variable x is described by a variable $\boldsymbol { \xi }$ having a distribution $\nu ( \pmb { \xi } )$ , then the sum-of-squares error function becomes

E = \frac {1}{2} \sum_ {n = 1} ^ {N} \int \left\{y (\mathbf {x} _ {n} + \pmb {\xi}) - t _ {n} \right\} ^ {2} \nu (\pmb {\xi}) \mathrm{d} \pmb {\xi}.\tag{6.39}

Using the calculus of variations, we can optimize with respect to the function $f ( \mathbf { x } )$ to give

y (\mathbf {x} _ {n}) = \sum_ {n = 1} ^ {N} t _ {n} h (\mathbf {x} - \mathbf {x} _ {n})\tag{6.40}

where the basis functions are given by

h (\mathbf {x} - \mathbf {x} _ {n}) = \frac {\nu (\mathbf {x} - \mathbf {x} _ {n})}{\sum_ {n = 1} ^ {N} \nu (\mathbf {x} - \mathbf {x} _ {n})}.\tag{6.41}

We see that there is one basis function centred on every data point. This is known as the Nadaraya-Watson model and will be derived again from a different perspective in Section 6.3.1. If the noise distribution $\nu ( \pmb { \xi } )$ is isotropic, so that it is a function only of ξ , then the basis functions will be radial.

Note that the basis functions (6.41) are normalized, so that $\begin{array} { r } { \sum _ { n } h ( \mathbf x - \mathbf x _ { n } ) = 1 } \end{array}$ for any value of x. The effect of such normalization is shown in Figure 6.2. Normalization is sometimes used in practice as it avoids having regions of input space where all of the basis functions take small values, which would necessarily lead to predictions in such regions that are either small or controlled purely by the bias parameter.

Another situation in which expansions in normalized radial basis functions arise is in the application of kernel density estimation to the problem of regression, as we shall discuss in Section 6.3.1.

Because there is one basis function associated with every data point, the corresponding model can be computationally costly to evaluate when making predictions for new data points. Models have therefore been proposed (Broomhead and Lowe, 1988; Moody and Darken, 1989; Poggio and Girosi, 1990), which retain the expansion in radial basis functions but where the number M of basis functions is smaller than the number N of data points. Typically, the number of basis functions, and the locations $\pmb { \mu } _ { i }$ of their centres, are determined based on the input data $\left\{ { \bf x } _ { n } \right\}$ alone. The basis functions are then kept fixed and the coefficients $\{ w _ { i } \}$ are determined by least squares by solving the usual set of linear equations, as discussed in Section 3.1.1.

![image](images/part-002--6332f41c129c4eb8aa3802f2caa656d8287f604d280ab560b141c4a582105a5a.jpg)

![image](images/part-002--65ae801c71169ff63e05d15be319c9cf2585dc028e9505be8eeb2d96c9af36a4.jpg)

Figure 6.2 Plot of a set of Gaussian basis functions on the left, together with the corresponding normalized basis functions on the right.

One of the simplest ways of choosing basis function centres is to use a randomly chosen subset of the data points. A more systematic approach is called orthogonal least squares (Chen et al., 1991). This is a sequential selection process in which at each step the next data point to be chosen as a basis function centre corresponds to the one that gives the greatest reduction in the sum-of-squares error. Values for the expansion coefficients are determined as part of the algorithm. Clustering algorithms such as K-means have also been used, which give a set of basis function centres that no longer coincide with training data points.
