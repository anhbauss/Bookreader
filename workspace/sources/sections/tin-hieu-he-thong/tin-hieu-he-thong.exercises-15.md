---
id: "tin-hieu-he-thong.exercises-15"
doc_id: "tin-hieu-he-thong"
title: "Exercises"
level: 2
heading_path: ["Combining Models", "Exercises"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.14-5-3-mixtures-of-experts"
next_id: "tin-hieu-he-thong.appendix-a-data-sets"
block_ids: ["b7187", "b7188", "b7189", "b7190", "b7191", "b7192", "b7193", "b7194", "b7195", "b7196", "b7197", "b7198", "b7199", "b7200", "b7201", "b7202", "b7203", "b7204", "b7205", "b7206", "b7207", "b7208", "b7209", "b7210", "b7211", "b7212"]
---

## Exercises

14.1 ( ) www Consider a set models of the form $p ( \mathbf { t } | \mathbf { x } , \mathbf { z } _ { h } , \pmb { \theta } _ { h } , h )$ in which is the input vector, t is the target vector, h indexes the different models, $\mathbf { z } _ { h }$ is a latent variable for model $h ,$ and $\pmb { \theta } _ { h }$ is the set of parameters for model h. Suppose the models have prior probabilities $p ( h )$ and that we are given a training set $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ and $\bar { \mathbf { T } } = \left\{ \mathbf { t } _ { 1 } , \ldots , \mathbf { t } _ { N } \right\}$ Write down the formulae needed to evaluate the predictive distribution $p ( \mathbf { t } | \mathbf { x } , \mathbf { X } , \mathbf { T } )$ in which the latent variables and the model index are marginalized out. Use these formulae to highlight the difference between Bayesian averaging of different models and the use of latent variables within a single model.

14.2 () The expected sum-of-squares error $E _ { \mathrm { A V } }$ for a simple committee model can be defined by (14.10), and the expected error of the committee itself is given by (14.11). Assuming that the individual errors satisfy (14.12) and (14.13), derive the result (14.14).

14.3 () www By making use of Jensen’s inequality (1.115), for the special case of the convex function $f ( x ) ~ = ~ x ^ { 2 }$ , show that the average expected sum-of-squares error $E _ { \mathrm { A V } }$ of the members of a simple committee model, given by (14.10), and the expected error $E _ { \mathrm { C O M } }$ of the committee itself, given by (14.11), satisfy

E _ {\mathrm{COM}} \leqslant E _ {\mathrm{AV}}.\tag{14.54}

14.4 ( ) By making use of Jensen’s in equality (1.115), show that the result (14.54) derived in the previous exercise hods for any error function $E ( y )$ , not just sum-of squares, provided it is a convex function of $y .$

14.5 ( ) www Consider a committee in which we allow unequal weighting of the constituent models, so that

y _ {\mathrm{COM}} (\mathbf {x}) = \sum_ {m = 1} ^ {M} \alpha_ {m} y _ {m} (\mathbf {x}).\tag{14.55}

In order to ensure that the predictions $y _ { \mathrm { C O M } } ( \mathbf { x } )$ remain within sensible limits, sup pose that we require that they be bounded at each value of x by the minimum and maximum values given by any of the members of the committee, so that

y _ {\min} (\mathbf {x}) \leqslant y _ {\operatorname{COM}} (\mathbf {x}) \leqslant y _ {\max} (\mathbf {x}).\tag{14.56}

Show that a necessary and sufficient condition for this constraint is that the coefficients $\alpha _ { m }$ satisfy

\alpha_ {m} \geqslant 0, \quad \sum_ {m = 1} ^ {M} \alpha_ {m} = 1.\tag{14.57}

14.6 () www By differentiating the error function (14.23) with respect to $\alpha _ { m }$ , show that the parameters $\alpha _ { m }$ in the AdaBoost algorithm are updated using (14.17) in which $\epsilon _ { m }$ is defined by (14.16).

14.7 () By making a variational minimization of the expected exponential error function given by (14.27) with respect to all possible functions $y ( \mathbf x )$ , show that the minimizing function is given by (14.28).

14.8 () Show that the exponential error function (14.20), which is minimized by the AdaBoost algorithm, does not correspond to the log likelihood of any well-behaved probabilistic model. This can be done by showing that the corresponding conditional distribution $p ( t | \mathbf { x } )$ cannot be correctly normalized.

14.9 () www Show that the sequential minimization of the sum-of-squares error function for an additive model of the form (14.21) in the style of boosting simply involves fitting each new base classifier to the residual errors $t _ { n } - f _ { m - 1 } ( \mathbf { x } _ { n } )$ from the previous model.

14.10 () Verify that if we minimize the sum-of-squares error between a set of training values $\left\{ t _ { n } \right\}$ and a single predictive value t, then the optimal solution for t is given by the mean of the $\left\{ t _ { n } \right\}$

14.11 ( ) Consider a data set comprising 400 data points from class $\mathcal { C } _ { 1 }$ and 400 data points from class $\mathcal { C } _ { 2 }$ . Suppose that a tree model A splits these into (300, 100) at the first leaf node and (100, 300) at the second leaf node, where $( n , m )$ denotes that n points are assigned to $\mathcal { C } _ { 1 }$ and m points are assigned to $\mathcal { C } _ { 2 }$ . Similarly, suppose that a second tree model B splits them into (200, 400) and (200, 0). Evaluate the misclassification rates for the two trees and hence show that they are equal. Similarly, evaluate the cross-entropy (14.32) and Gini index (14.33) for the two trees and show that they are both lower for tree B than for tree A.

14.12 ( ) Extend the results of Section 14.5.1 for a mixture of linear regression models to the case of multiple target values described by a vector t. To do this, make use of the results of Section 3.1.5.

14.13 () www Verify that the complete-data log likelihood function for the mixture of linear regression models is given by (14.36).

14.14 () Use the technique of Lagrange multipliers (Appendix E) to show that the M-step re-estimation equation for the mixing coefficients in the mixture of linear regression models trained by maximum likelihood EM is given by (14.38).

14.15 () www We have already noted that if we use a squared loss function in a regression problem, the corresponding optimal prediction of the target variable for a new input vector is given by the conditional mean of the predictive distribution. Show that the conditional mean for the mixture of linear regression models discussed in Section 14.5.1 is given by a linear combination of the means of each component distribution. Note that if the conditional distribution of the target data is multimodal, the conditional mean can give poor predictions.

14.16 (  ) Extend the logistic regression mixture model of Section 14.5.2 to a mixture of softmax classifiers representing $C \geqslant 2$ classes. Write down the EM algorithm for determining the parameters of this model through maximum likelihood.

14.17 ( ) www Consider a mixture model for a conditional distribution $p ( t | \mathbf { x } )$ of the form

p (t | \mathbf {x}) = \sum_ {k = 1} ^ {K} \pi_ {k} \psi_ {k} (t | \mathbf {x})\tag{14.58}

in which each mixture component $\psi _ { k } ( t | \mathbf x )$ is itself a mixture model. Show that this two-level hierarchical mixture is equivalent to a conventional single-level mixture model. Now suppose that the mixing coefficients in both levels of such a hierarchical model are arbitrary functions of x. Again, show that this hierarchical model is again equivalent to a single-level model with x-dependent mixing coefficients. Finally, consider the case in which the mixing coefficients at both levels of the hierarchical mixture are constrained to be linear classification (logistic or softmax) models. Show that the hierarchical mixture cannot in general be represented by a single-level mixture having linear classification models for the mixing coefficients. Hint: to do this it is sufficient to construct a single counter-example, so consider a mixture of two components in which one of those components is itself a mixture of two components, with mixing coefficients given by linear-logistic models. Show that this cannot be represented by a single-level mixture of 3 components having mixing coefficients determined by a linear-softmax model.
