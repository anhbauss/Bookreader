---
id: "tin-hieu-he-thong.3-3-3-equivalent-kernel"
doc_id: "tin-hieu-he-thong"
title: "3.3.3 Equivalent kernel"
level: 2
heading_path: ["3 Linear Models for Regression", "3.3.3 Equivalent kernel"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-3-2-predictive-distribution"
next_id: "tin-hieu-he-thong.3-4-bayesian-model-comparison"
block_ids: ["b1847", "b1848", "b1849", "b1850", "b1851", "b1852", "b1853", "b1854", "b1855", "b1856", "b1857", "b1858", "b1859", "b1860", "b1861", "b1862", "b1863", "b1864", "b1865", "b1866", "b1867", "b1868", "b1869", "b1870"]
---

## 3.3.3 Equivalent kernel

Chapter 6

The posterior mean solution (3.53) for the linear basis function model has an interesting interpretation that will set the stage for kernel methods, including Gaussian processes. If we substitute (3.53) into the expression (3.3), we see that the predictive mean can be written in the form

y (\mathbf {x}, \mathbf {m} _ {N}) = \mathbf {m} _ {N} ^ {\mathrm{T}} \boldsymbol {\phi} (\mathbf {x}) = \beta \boldsymbol {\phi} (\mathbf {x}) ^ {\mathrm{T}} \mathbf {S} _ {N} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {t} = \sum_ {n = 1} ^ {N} \beta \boldsymbol {\phi} (\mathbf {x}) ^ {\mathrm{T}} \mathbf {S} _ {N} \boldsymbol {\phi} (\mathbf {x} _ {n}) t _ {n}\tag{3.60}

where $\mathbf { S } _ { N }$ is defined by (3.51). Thus the mean of the predictive distribution at a point x is given by a linear combination of the training set target variables $t _ { n }$ , so that we can write

y (\mathbf {x}, \mathbf {m} _ {N}) = \sum_ {n = 1} ^ {N} k (\mathbf {x}, \mathbf {x} _ {n}) t _ {n}\tag{3.61}

where the function

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \beta \phi (\mathbf {x}) ^ {\mathrm{T}} \mathbf {S} _ {N} \phi (\mathbf {x} ^ {\prime})\tag{3.62}

is known as the smoother matrix or the equivalent kernel. Regression functions, such as this, which make predictions by taking linear combinations of the training set target values are known as linear smoothers. Note that the equivalent kernel depends on the input values ${ \bf x } _ { n }$ from the data set because these appear in the definition of $\mathbf { S } _ { N }$ . The equivalent kernel is illustrated for the case of Gaussian basis functions in Figure 3.10 in which the kernel functions $k ( x , x ^ { \prime } )$ have been plotted as a function of $x ^ { \prime }$ for three different values of x. We see that they are localized around $x ,$ and so the mean of the predictive distribution at x, given by $y ( x , \mathbf { m } _ { N } )$ , is obtained by forming a weighted combination of the target values in which data points close to x are given higher weight than points further removed from x. Intuitively, it seems reasonable that we should weight local evidence more strongly than distant evidence. Note that this localization property holds not only for the localized Gaussian basis functions but also for the nonlocal polynomial and sigmoidal basis functions, as illustrated in Figure 3.11.

Figure 3.11 Examples of equivalent kernels $k ( x , x ^ { \prime } )$ for $ { \boldsymbol { { x } } } \quad = \quad 0$ plotted as a function of $x ^ { \prime } { \mathrm { , } }$ corresponding (left) to the polynomial basis functions and (right) to the sigmoidal basis functions shown in Figure 3.1. Note that these are localized functions of $x ^ { \prime }$ even though the corresponding basis functions are nonlocal.

![image](images/part-001--2804814fcfd2038429ba169c7c9f1834bd003e6771f47d020d78a2e555199ba6.jpg)

![image](images/part-001--78f935affd5e9e946c6ebe305f8ca908e519b1428f648e62af62f715ce25cd16.jpg)

Further insight into the role of the equivalent kernel can be obtained by consid ering the covariance between $y ( \mathbf x )$ and $y ( \mathbf { x } ^ { \prime } )$ , which is given by

\begin{array}{r c l} \operatorname{cov} [ y (\mathbf {x}), y (\mathbf {x} ^ {\prime}) ] & = & \operatorname{cov} [ \phi (\mathbf {x}) ^ {\mathrm{T}} \mathbf {w}, \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} ^ {\prime}) ] \\ & = & \phi (\mathbf {x}) ^ {\mathrm{T}} \mathbf {S} _ {N} \phi (\mathbf {x} ^ {\prime}) = \beta^ {- 1} k (\mathbf {x}, \mathbf {x} ^ {\prime}) \end{array}\tag{3.63}

where we have made use of (3.49) and (3.62). From the form of the equivalent kernel, we see that the predictive mean at nearby points will be highly correlated, whereas for more distant pairs of points the correlation will be smaller.

The predictive distribution shown in Figure 3.8 allows us to visualize the pointwise uncertainty in the predictions, governed by (3.59). However, by drawing samples from the posterior distribution over w, and plotting the corresponding model functions $y ( \mathbf { x } , \mathbf { w } )$ as in Figure 3.9, we are visualizing the joint uncertainty in the posterior distribution between the $y$ values at two (or more) x values, as governed by the equivalent kernel.

The formulation of linear regression in terms of a kernel function suggests an alternative approach to regression as follows. Instead of introducing a set of basis functions, which implicitly determines an equivalent kernel, we can instead define a localized kernel directly and use this to make predictions for new input vectors x, given the observed training set. This leads to a practical framework for regression (and classification) called Gaussian processes, which will be discussed in detail in Section 6.4.

We have seen that the effective kernel defines the weights by which the training set target values are combined in order to make a prediction at a new value of x, and it can be shown that these weights sum to one, in other words

\sum_ {n = 1} ^ {N} k (\mathbf {x}, \mathbf {x} _ {n}) = 1\tag{3.64}

Exercise 3.14

for all values of $\mathbf { x } .$ . This intuitively pleasing result can easily be proven informally by noting that the summation is equivalent to considering the predictive mean $\widehat { y } ( \mathbf x )$ for a set of target data in which $t _ { n } = 1$ for all n. Provided the basis functions are linearly independent, that there are more data points than basis functions, and that one of the basis functions is constant (corresponding to the bias parameter), then it is clear that we can fit the training data exactly and hence that the predictive mean will be simply $\widehat { y } ( \mathbf { x } ) = 1$ , from which we obtain (3.64). Note that the kernel function can be negative as well as positive, so although it satisfies a summation constraint, the corresponding predictions are not necessarily convex combinations of the training set target variables.

Finally, we note that the equivalent kernel (3.62) satisfies an important property shared by kernel functions in general, namely that it can be expressed in the form an inner product with respect to a vector $\psi ( \mathbf { x } )$ of nonlinear functions, so that

k (\mathbf {x}, \mathbf {z}) = \boldsymbol {\psi} (\mathbf {x}) ^ {\mathrm{T}} \boldsymbol {\psi} (\mathbf {z})\tag{3.65}

where $\psi ( \mathbf { x } ) = \beta ^ { 1 / 2 } \mathbf { S } _ { N } ^ { 1 / 2 } \phi ( \mathbf { x } )$
