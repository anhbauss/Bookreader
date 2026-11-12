---
id: "tin-hieu-he-thong.exercises-5"
doc_id: "tin-hieu-he-thong"
title: "Exercises"
level: 2
heading_path: ["4 Linear Models for Classification", "Exercises"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-5-2-predictive-distribution"
next_id: "tin-hieu-he-thong.4-linear-models-for-classification-2"
block_ids: ["b2541", "b2542", "b2543", "b2544", "b2545", "b2546", "b2547", "b2548", "b2549", "b2550", "b2551", "b2552", "b2553", "b2554", "b2555", "b2556", "b2557", "b2558", "b2559", "b2560", "b2561", "b2562", "b2563", "b2564", "b2565", "b2566", "b2567", "b2568", "b2569", "b2570", "b2571", "b2572", "b2573", "b2574", "b2575", "b2576", "b2577", "b2578", "b2579", "b2580", "b2581", "b2582", "b2583", "b2584"]
---

## Exercises

4.1 ( ) Given a set of data points $\left\{ \mathbf { x } _ { n } \right\}$ , we can define the convex hull to be the set of all points x given by

\mathbf {x} = \sum_ {n} \alpha_ {n} \mathbf {x} _ {n}\tag{4.156}

where $\alpha _ { n } \geqslant 0$ and $\textstyle \sum _ { n } \alpha _ { n } = 1$ . Consider a second set of points $\left\{ \mathbf { y } _ { n } \right\}$ together with their corresponding convex hull. By definition, the two sets of points will be linearly separable if there exists a vector w and a scalar $w _ { 0 }$ such that $ { \hat { \mathbf { w } } } ^ { \mathrm { T } } \mathbf { x } _ { n } + w _ { 0 } > 0$ for all ${ \bf x } _ { n }$ , and $\widehat { \mathbf { w } } ^ { \mathrm { T } } \mathbf { y } _ { n } + w _ { 0 } < 0$ for all ${ \bf y } _ { n }$ . Show that if their convex hulls intersect, the two sets of points cannot be linearly separable, and conversely that if they are linearly separable, their convex hulls do not intersect.

4.2 ( ) www Consider the minimization of a sum-of-squares error function (4.15), and suppose that all of the target vectors in the training set satisfy a linear constraint

\mathbf {a} ^ {\mathrm{T}} \mathbf {t} _ {n} + b = 0\tag{4.157}

where $\mathbf { t } _ { n }$ corresponds to the $n ^ { \mathrm { t h } }$ row of the matrix T in (4.15). Show that as a consequence of this constraint, the elements of the model prediction $\mathbf { y } ( \mathbf { x } )$ given by the least-squares solution (4.17) also satisfy this constraint, so that

\mathbf {a} ^ {\mathrm{T}} \mathbf {y} (\mathbf {x}) + b = 0.\tag{4.158}

To do so, assume that one of the basis functions $\phi _ { 0 } ( \mathbf { x } ) = 1$ so that the corresponding parameter $w _ { 0 }$ plays the role of a bias.

4.3 ( ) Extend the result of Exercise 4.2 to show that if multiple linear constraints are satisfied simultaneously by the target vectors, then the same constraints will also be satisfied by the least-squares prediction of a linear model.

4.4 () www Show that maximization of the class separation criterion given by (4.23) with respect to w, using a Lagrange multiplier to enforce the constraint $\mathbf { w } ^ { \mathrm { T } } \mathbf { w } = 1$ leads to the result that $\mathbf { w } \propto \left( \mathbf { m } _ { 2 } - \mathbf { m } _ { 1 } \right)$

4.5 () By making use of (4.20), (4.23), and (4.24), show that the Fisher criterion (4.25) can be written in the form (4.26).

4.6 () Using the definitions of the between-class and within-class covariance matrices given by (4.27) and (4.28), respectively, together with (4.34) and (4.36) and the choice of target values described in Section 4.1.5, show that the expression (4.33) that minimizes the sum-of-squares error function can be written in the form (4.37).

4.7 () www Show that the logistic sigmoid function (4.59) satisfies the property σ $\cdot ( - { \overline { { a ) = 1 } } } - \sigma ( a )$ and that its inverse is given by $\sigma ^ { - 1 } ( y ) = \ln { \{ y / ( 1 - y ) \} }$

4.8 () Using (4.57) and (4.58), derive the result (4.65) for the posterior class probability in the two-class generative model with Gaussian densities, and verify the results (4.66) and (4.67) for the parameters w and $w _ { 0 }$

4.9 () www Consider a generative classification model for K classes defined by prior class probabilities $p ( \mathcal { C } _ { k } ) = \pi _ { k }$ and general class-conditional densities $p ( \phi | { \mathcal C } _ { k } )$ where φ is the input feature vector. Suppose we are given a training data set $\{ \phi _ { n } , \mathbf { t } _ { n } \}$ where $n = 1 , \ldots , N$ , and $\mathbf { t } _ { n }$ is a binary target vector of length K that uses the 1-of-K coding scheme, so that it has components $t _ { n j } = I _ { j k }$ if pattern n is from class $\mathcal { C } _ { k }$ Assuming that the data points are drawn independently from this model, show that the maximum-likelihood solution for the prior probabilities is given by

\pi_ {k} = \frac {N _ {k}}{N}\tag{4.159}

where $N _ { k }$ is the number of data points assigned to class $\mathcal { C } _ { k }$

4.10 ( ) Consider the classification model of Exercise 4.9 and now suppose that the class-conditional densities are given by Gaussian distributions with a shared covariance matrix, so that

p (\phi | \mathcal {C} _ {k}) = \mathcal {N} (\phi | \boldsymbol {\mu} _ {k}, \boldsymbol {\Sigma}).\tag{4.160}

Show that the maximum likelihood solution for the mean of the Gaussian distribution for class $\mathcal { C } _ { k }$ is given by

\pmb {\mu} _ {k} = \frac {1}{N _ {k}} \sum_ {n = 1} ^ {N} t _ {n k} \phi_ {n}\tag{4.161}

which represents the mean of those feature vectors assigned to class $\mathcal { C } _ { k }$ . Similarly, show that the maximum likelihood solution for the shared covariance matrix is given by

\pmb {\Sigma} = \sum_ {k = 1} ^ {K} \frac {N _ {k}}{N} \mathbf {S} _ {k}\tag{4.162}

where

\mathbf {S} _ {k} = \frac {1}{N _ {k}} \sum_ {n = 1} ^ {N} t _ {n k} (\boldsymbol {\phi} _ {n} - \boldsymbol {\mu} _ {k}) (\boldsymbol {\phi} _ {n} - \boldsymbol {\mu} _ {k}) ^ {\mathrm{T}}.\tag{4.163}

Thus Σ is given by a weighted average of the covariances of the data associated with each class, in which the weighting coefficients are given by the prior probabilities of the classes.

4.11 ( ) Consider a classification problem with K classes for which the feature vector $\phi$ has M components each of which can take L discrete states. Let the values of the components be represented by a $1 { - } 0 \mathrm { f - } L$ binary coding scheme. Further suppose that, conditioned on the class $\mathcal { C } _ { k }$ , the M components of $\phi$ are independent, so that the class-conditional density factorizes with respect to the feature vector components. Show that the quantities $a _ { k }$ given by (4.63), which appear in the argument to the softmax function describing the posterior class probabilities, are linear functions of the components of $\phi .$ Note that this represents an example of the naive Bayes model which is discussed in Section 8.2.2.

4.12 () www Verify the relation (4.88) for the derivative of the logistic sigmoid function defined by (4.59).

4.13 () www By making use of the result (4.88) for the derivative of the logistic sigmoid, show that the derivative of the error function (4.90) for the logistic regression model is given by (4.91).

4.14 () Show that for a linearly separable data set, the maximum likelihood solution for the logistic regression model is obtained by finding a vector w whose decision boundary $\mathbf { \bar { w } } ^ { \mathrm { T } } \phi ( \mathbf { x } ) = 0$ separates the classes and then taking the magnitude of w to infinity.

4.15 ( ) Show that the Hessian matrix H for the logistic regression model, given by (4.97), is positive definite. Here R is a diagonal matrix with elements $y _ { n } ( 1 - y _ { n } )$ and $y _ { n }$ is the output of the logistic regression model for input vector ${ \bf x } _ { n }$ . Hence show that the error function is a concave function of w and that it has a unique minimum.

4.16 () Consider a binary classification problem in which each observation ${ \bf x } _ { n }$ is known to belong to one of two classes, corresponding to $t = 0$ and $t = 1$ , and suppose that the procedure for collecting training data is imperfect, so that training points are sometimes mislabelled. For every data point ${ \bf x } _ { n }$ , instead of having a value t for the class label, we have instead a value $\pi _ { n }$ representing the probability that $t _ { n } = 1$ Given a probabilistic model $p ( t = 1 | \phi )$ , write down the log likelihood function appropriate to such a data set.

4.17 () www Show that the derivatives of the softmax activation function (4.104), where the $a _ { k }$ are defined by (4.105), are given by (4.106).

4.18 () Using the result (4.91) for the derivatives of the softmax activation function, show that the gradients of the cross-entropy error (4.108) are given by (4.109).

4.19 () www Write down expressions for the gradient of the log likelihood, as well as the corresponding Hessian matrix, for the probit regression model defined in Section 4.3.5. These are the quantities that would be required to train such a model using IRLS.

4.20 ( ) Show that the Hessian matrix for the multiclass logistic regression problem, defined by (4.110), is positive semidefinite. Note that the full Hessian matrix for this problem is of size $M K \times M K$ , where M is the number of parameters and K is the number of classes. To prove the positive semidefinite property, consider the product $\mathbf { u } ^ { \mathrm { T } } \mathbf { H } \mathbf { u }$ where u is an arbitrary vector of length MK, and then apply Jensen’s inequality.

4.21 () Show that the probit function (4.114) and the erf function (4.115) are related by (4.116).

4.22 () Using the result (4.135), derive the expression (4.137) for the log model evidence under the Laplace approximation.

4.23 ( ) www In this exercise, we derive the BIC result (4.139) starting from the Laplace approximation to the model evidence given by (4.137). Show that if the prior over parameters is Gaussian of the form $p ( \pmb \theta ) = \mathcal { N } ( \pmb \theta | \mathbf { m } , \mathbf { V } _ { 0 } )$ , the log model evidence under the Laplace approximation takes the form

\ln p (\mathcal {D}) \simeq \ln p (\mathcal {D} | \boldsymbol {\theta} _ {\mathrm{MAP}}) - \frac {1}{2} (\boldsymbol {\theta} _ {\mathrm{MAP}} - \mathbf {m}) ^ {\mathrm{T}} \mathbf {V} _ {0} ^ {- 1} (\boldsymbol {\theta} _ {\mathrm{MAP}} - \mathbf {m}) - \frac {1}{2} \ln | \mathbf {H} | + \text {const}

where H is the matrix of second derivatives of the log likelihood ln $p ( \mathcal { D } | \mathbf { \theta } )$ evaluated at $\theta _ { \mathrm { M A P } }$ . Now assume that the prior is broad so that $\mathbf { V } _ { 0 } ^ { - 1 }$ is small and the second term on the right-hand side above can be neglected. Furthermore, consider the case of independent, identically distributed data so that H is the sum of terms one for each data point. Show that the log model evidence can then be written approximately in the form of the BIC expression (4.139).

4.24 ( ) Use the results from Section 2.3.2 to derive the result (4.151) for the marginalization of the logistic regression model with respect to a Gaussian posterior distribution over the parameters w.

4.25 ( ) Suppose we wish to approximate the logistic sigmoid $\sigma ( a )$ defined by (4.59) by a scaled probit function $\Phi ( \lambda a )$ , where $\Phi ( a )$ is defined by (4.114). Show that if λ is chosen so that the derivatives of the two functions are equal at $a = 0$ , then $\lambda ^ { 2 } = \pi / 8$
