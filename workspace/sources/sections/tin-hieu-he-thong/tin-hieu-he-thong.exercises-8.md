---
id: "tin-hieu-he-thong.exercises-8"
doc_id: "tin-hieu-he-thong"
title: "Exercises"
level: 2
heading_path: ["Sparse Kernel Machines", "Exercises"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.7-2-3-rvm-for-classification"
next_id: "tin-hieu-he-thong.8"
block_ids: ["b4039", "b4040", "b4041", "b4042", "b4043", "b4044", "b4045", "b4046", "b4047", "b4048", "b4049", "b4050", "b4051", "b4052", "b4053", "b4054", "b4055", "b4056", "b4057", "b4058", "b4059", "b4060", "b4061", "b4062", "b4063"]
---

## Exercises

7.1 ( ) www Suppose we have a data set of input vectors $\left\{ { \bf x } _ { n } \right\}$ with corresponding target values $t _ { n } ~ \in ~ \{ - 1 , 1 \}$ , and suppose that we model the density of input vectors within each class separately using a Parzen kernel density estimator (see Section 2.5.1) with a kernel $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ . Write down the minimum misclassification-rate decision rule assuming the two classes have equal prior probability. Show also that, if the kernel is chosen to be $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime }$ , then the classification rule reduces to simply assigning a new input vector to the class having the closest mean. Finally, show that, if the kernel takes the form $k ( { \bf x } , { \bf x } ^ { \prime } ) = \phi ( { \bf x } ) ^ { \top } \phi ( { \bf x } ^ { \prime } )$ , that the classification is based on the closest mean in the feature space $\phi ( \mathbf { x } )$

7.2 () Show that, if the 1 on the right-hand side of the constraint (7.5) is replaced by some arbitrary constant $\gamma > 0$ , the solution for the maximum margin hyperplane is unchanged.

7.3 ( ) Show that, irrespective of the dimensionality of the data space, a data set consisting of just two data points, one from each class, is sufficient to determine the location of the maximum-margin hyperplane.

7.4 ( ) www Show that the value $\rho$ of the margin for the maximum-margin hyperplane is given by

{\frac {1}{\rho^ {2}}} = \sum_ {n = 1} ^ {N} a _ {n}\tag{7.123}

where $\left\{ a _ { n } \right\}$ are given by maximizing (7.10) subject to the constraints (7.11) and (7.12).

7.5 ( ) Show that the values of $\rho$ and $\{ a _ { n } \}$ in the previous exercise also satisfy

\frac {1}{\rho^ {2}} = 2 \widetilde {L} (\mathbf {a})\tag{7.124}

where $\widetilde L ( \mathbf { a } )$ is defined by (7.10). Similarly, show that

\frac {1}{\rho^ {2}} = \left\| \mathbf {w} \right\| ^ {2}.\tag{7.125}

7.6 () Consider the logistic regression model with a target variable $t \in \{ - 1 , 1 \}$ . If we define $p ( t = 1 | y ) = \sigma ( y )$ where $y ( \mathbf x )$ is given by (7.1), show that the negative log likelihood, with the addition of a quadratic regularization term, takes the form (7.47).

7.7 () Consider the Lagrangian (7.56) for the regression support vector machine. By setting the derivatives of the Lagrangian with respect to w, b, $\xi _ { n }$ , and $\widehat { \xi } _ { n }$ to zero and then back substituting to eliminate the corresponding variables, show that the dual Lagrangian is given by (7.61).

7.8 () www For the regression support vector machine considered in Section 7.1.4, show that all training data points for which $\xi _ { n } > 0$ will have $a _ { n } = C$ , and similarly all points for which $\widehat { \xi } _ { n } > 0$ will have $\widehat { a } _ { n } = C$

7.9 () Verify the results (7.82) and (7.83) for the mean and covariance of the posterior distribution over weights in the regression RVM.

7.10 ( ) www Derive the result (7.85) for the marginal likelihood function in the regression RVM, by performing the Gaussian integral over w in (7.84) using the technique of completing the square in the exponential.

7.11 ( ) Repeat the above exercise, but this time make use of the general result (2.115).

7.12 ( ) www Show that direct maximization of the log marginal likelihood (7.85) for the regression relevance vector machine leads to the re-estimation equations (7.87) and (7.88) where $\gamma _ { i }$ is defined by (7.89).

7.13 ( ) In the evidence framework for RVM regression, we obtained the re-estimation formulae (7.87) and (7.88) by maximizing the marginal likelihood given by (7.85). Extend this approach by inclusion of hyperpriors given by gamma distributions of the form (B.26) and obtain the corresponding re-estimation formulae for α and $\beta$ by maximizing the corresponding posterior probability $p ( \mathbf { t } , \alpha , \beta | \mathbf { X } )$ with respect to α and $\beta .$ .

7.14 ( ) Derive the result (7.90) for the predictive distribution in the relevance vector machine for regression. Show that the predictive variance is given by (7.91).

7.15 ( ) www Using the results (7.94) and (7.95), show that the marginal likelihood (7.85) can be written in the form (7.96), where $\lambda ( \alpha _ { n } )$ is defined by (7.97) and the sparsity and quality factors are defined by (7.98) and (7.99), respectively.

7.16 () By taking the second derivative of the log marginal likelihood (7.97) for the regression RVM with respect to the hyperparameter $\alpha _ { i } ,$ show that the stationary point given by (7.101) is a maximum of the marginal likelihood.

7.17 ( ) Using (7.83) and (7.86), together with the matrix identity (C.7), show that the quantities $S _ { n }$ and $Q _ { n }$ defined by (7.102) and (7.103) can be written in the form (7.106) and (7.107).

7.18 () www Show that the gradient vector and Hessian matrix of the log posterior distribution (7.109) for the classification relevance vector machine are given by (7.110) and (7.111).

7.19 ( ) Verify that maximization of the approximate log marginal likelihood function (7.114) for the classification relevance vector machine leads to the result (7.116) for re-estimation of the hyperparameters.
