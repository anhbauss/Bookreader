---
id: "tin-hieu-he-thong.3-1-4-regularized-least-squares"
doc_id: "tin-hieu-he-thong"
title: "3.1.4 Regularized least squares"
level: 2
heading_path: ["3 Linear Models for Regression", "3.1.4 Regularized least squares"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-1-3-sequential-learning"
next_id: "tin-hieu-he-thong.3-1-5-multiple-outputs"
block_ids: ["b1704", "b1705", "b1706", "b1707", "b1708", "b1709", "b1710", "b1711", "b1712", "b1713", "b1714", "b1715", "b1716", "b1717", "b1718", "b1719", "b1720", "b1721", "b1722", "b1723", "b1724", "b1725", "b1726", "b1727"]
---

## 3.1.4 Regularized least squares

In Section 1.1, we introduced the idea of adding a regularization term to an error function in order to control over-fitting, so that the total error function to be minimized takes the form

E _ {D} (\mathbf {w}) + \lambda E _ {W} (\mathbf {w})\tag{3.24}

where $\lambda$ is the regularization coefficient that controls the relative importance of the data-dependent error $E _ { D } ( \mathbf { w } )$ and the regularization term $E _ { W } ( \mathbf { w } )$ . One of the simplest forms of regularizer is given by the sum-of-squares of the weight vector elements

E _ {W} (\mathbf {w}) = \frac {1}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w}.\tag{3.25}

If we also consider the sum-of-squares error function given by

E (\mathbf {w}) = \frac {1}{2} \sum_ {n = 1} ^ {N} \{t _ {n} - \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) \} ^ {2}\tag{3.26}

then the total error function becomes

\frac {1}{2} \sum_ {n = 1} ^ {N} \left\{t _ {n} - \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) \right\} ^ {2} + \frac {\lambda}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w}.\tag{3.27}

This particular choice of regularizer is known in the machine learning literature as weight decay because in sequential learning algorithms, it encourages weight values to decay towards zero, unless supported by the data. In statistics, it provides an example of a parameter shrinkage method because it shrinks parameter values towards zero. It has the advantage that the error function remains a quadratic function of w, and so its exact minimizer can be found in closed form. Specifically, setting the gradient of (3.27) with respect to w to zero, and solving for w as before, we obtain

![image](images/part-001--df1bc8e6e5dece095c3226dd2bf4437f688a581e7fbbc764f96fe3b3a6be6f1f.jpg)

Figure 3.3 Contours of the regularization term in (3.29) for various values of the parameter $q .$

\mathbf {w} = \left(\lambda \mathbf {I} + \boldsymbol {\Phi} ^ {\mathrm{T}} \boldsymbol {\Phi}\right) ^ {- 1} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {t}.\tag{3.28}

This represents a simple extension of the least-squares solution (3.15).

A more general regularizer is sometimes used, for which the regularized error takes the form

\frac {1}{2} \sum_ {n = 1} ^ {N} \{t _ {n} - \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) \} ^ {2} + \frac {\lambda}{2} \sum_ {j = 1} ^ {M} | w _ {j} | ^ {q}\tag{3.29}

where $q = 2$ corresponds to the quadratic regularizer (3.27). Figure 3.3 shows contours of the regularization function for different values of $q .$ .

The case of $q = 1$ is know as the lasso in the statistics literature (Tibshirani, 1996). It has the property that if λ is sufficiently large, some of the coefficients $w _ { j }$ are driven to zero, leading to a sparse model in which the corresponding basis functions play no role. To see this, we first note that minimizing (3.29) is equivalent to minimizing the unregularized sum-of-squares error (3.12) subject to the constraint

\sum_ {j = 1} ^ {M} | w _ {j} | ^ {q} \leqslant \eta\tag{3.30}

for an appropriate value of the parameter $\eta ,$ where the two approaches can be related using Lagrange multipliers. The origin of the sparsity can be seen from Figure 3.4, which shows that the minimum of the error function, subject to the constraint (3.30). As λ is increased, so an increasing number of parameters are driven to zero.

Regularization allows complex models to be trained on data sets of limited size without severe over-fitting, essentially by limiting the effective model complexity. However, the problem of determining the optimal model complexity is then shifted from one of finding the appropriate number of basis functions to one of determining a suitable value of the regularization coefficient λ. We shall return to the issue of model complexity later in this chapter.

Figure 3.4 Plot of the contours of the unregularized error function (blue) along with the constraint region (3.30) for the quadratic regularizer $q = 2$ on the left and the lasso regularizer $q \ = \ 1$ on the right, in which the optimum value for the parameter vector w is denoted by $\mathbf { w } ^ { \star }$ The lasso gives a sparse solution in which $w _ { 1 } ^ { \star } = 0$

![image](images/part-001--f9fbb8ebb2ab5d3847ac70d3eeecd26ea9feade332746bb92a0193a37218f96e.jpg)

For the remainder of this chapter we shall focus on the quadratic regularizer (3.27) both for its practical importance and its analytical tractability.
