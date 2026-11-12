---
id: "tin-hieu-he-thong.14-3-2-error-functions-for-boosting"
doc_id: "tin-hieu-he-thong"
title: "14.3.2 Error functions for boosting"
level: 2
heading_path: ["Combining Models", "14.3.2 Error functions for boosting"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.14-3-1-minimizing-exponential-error"
next_id: "tin-hieu-he-thong.14-4-tree-based-models"
block_ids: ["b7073", "b7074", "b7075", "b7076", "b7077", "b7078", "b7079", "b7080", "b7081", "b7082", "b7083", "b7084"]
---

## 14.3.2 Error functions for boosting

The exponential error function that is minimized by the AdaBoost algorithm differs from those considered in previous chapters. To gain some insight into the nature of the exponential error function, we first consider the expected error given by

\mathbb {E} _ {\mathbf {x}, t} \left[ \exp \{- t y (\mathbf {x}) \} \right] = \sum_ {t} \int \exp \{- t y (\mathbf {x}) \} p (t | \mathbf {x}) p (\mathbf {x}) \mathrm{d} \mathbf {x}.\tag{14.27}

If we perform a variational minimization with respect to all possible functions $y ( \mathbf x )$ we obtain

y (\mathbf {x}) = \frac {1}{2} \ln \left\{\frac {p (t = 1 | \mathbf {x})}{p (t = - 1 | \mathbf {x})} \right\}\tag{14.28}

Plot of the exponential (green) and rescaled cross-entropy (red) error functions along with the hinge error (blue) used in support vector machines, and the misclassification error (black). Note that for large negative values of $\begin{array} { r } { z = \begin{array} { r } { t y ( \mathbf { x } ) } \end{array} } \end{array}$ , the cross-entropy gives a linearly increasing penalty, whereas the exponential loss gives an exponentially increasing penalty.

![image](images/part-004--622fe81cc444e6ec3dc7a66c1c0bb1da641dbe5b8d33e481b1133fa6ef677dd5.jpg)

which is half the log-odds. Thus the AdaBoost algorithm is seeking the best approximation to the log odds ratio, within the space of functions represented by the linear combination of base classifiers, subject to the constrained minimization resulting from the sequential optimization strategy. This result motivates the use of the sign function in (14.19) to arrive at the final classification decision.

We have already seen that the minimizer $y ( \mathbf x )$ of the cross-entropy error (4.90) for two-class classification is given by the posterior class probability. In the case of a target variable $t \in \{ - 1 , 1 \}$ , we have seen that the error function is given by ln $( 1 + \exp ( - y t ) )$ . This is compared with the exponential error function in Figure 14.3, where we have divided the cross-entropy error by a constant factor ln(2) so that it passes through the point (0, 1) for ease of comparison. We see that both can be seen as continuous approximations to the ideal misclassification error function. An advantage of the exponential error is that its sequential minimization leads to the simple AdaBoost scheme. One drawback, however, is that it penalizes large negative values of $t y ( \mathbf { x } )$ much more strongly than cross-entropy. In particular, we see that for large negative values of $t y$ , the cross-entropy grows linearly with $| t y |$ whereas the exponential error function grows exponentially with $| t y |$ . Thus the exponential error function will be much less robust to outliers or misclassified data points. Another important difference between cross-entropy and the exponential error function is that the latter cannot be interpreted as the log likelihood function of any well-defined probabilistic model. Furthermore, the exponential error does not generalize to classification problems having $K > 2$ classes, again in contrast to the cross-entropy for a probabilistic model, which is easily generalized to give (4.108).

The interpretation of boosting as the sequential optimization of an additive model under an exponential error (Friedman et al., 2000) opens the door to a wide range of boosting-like algorithms, including multiclass extensions, by altering the choice of error function. It also motivates the extension to regression problems (Friedman, 2001). If we consider a sum-of-squares error function for regression, then sequential minimization of an additive model of the form (14.21) simply involves fitting each new base classifier to the residual errors $t _ { n } - f _ { m - 1 } ( \mathbf { x } _ { n } )$ from the previous model. As we have noted, however, the sum-of-squares error is not robust to outliers, and this can be addressed by basing the boosting algorithm on the absolute deviation $\left| y - t \right|$ instead. These two error functions are compared in Figure 14.4.

Figure 14.4 Comparison of the squared error (green) with the absolute error (red) showing how the latter places much less emphasis on large errors and hence is more robust to outliers and mislabelled data points.

![image](images/part-004--1d2297ca1ce1905bf52da03ed4aafb65ce2809e431d320136f370cb4c4e96174.jpg)
