---
id: "tin-hieu-he-thong.7-1-2-relation-to-logistic-regression"
doc_id: "tin-hieu-he-thong"
title: "7.1.2 Relation to logistic regression"
level: 2
heading_path: ["Sparse Kernel Machines", "7.1.2 Relation to logistic regression"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.7-1-1-overlapping-class-distributions"
next_id: "tin-hieu-he-thong.7-1-3-multiclass-svms"
block_ids: ["b3804", "b3805", "b3806", "b3807", "b3808", "b3809", "b3810", "b3811", "b3812", "b3813", "b3814", "b3815", "b3816", "b3817", "b3818", "b3819", "b3820", "b3821", "b3822"]
---

## 7.1.2 Relation to logistic regression

As with the separable case, we can re-cast the SVM for nonseparable distributions in terms of the minimization of a regularized error function. This will also allow us to highlight similarities, and differences, compared to the logistic regression model.

We have seen that for data points that are on the correct side of the margin boundary, and which therefore satisfy $y _ { n } t _ { n } \geqslant 1$ , we have $\xi _ { n } ~ = ~ 0$ , and for the

.5 Plot of the ‘hinge’ error function used in support vector machines, shown in blue, along with the error function for logistic regression, rescaled by a factor of $1 / \bar { \ln ( 2 ) }$ so that it passes through the point (0, 1), shown in red. Also shown are the misclassification error in black and the squared error in green.

![image](images/part-002--549bd5fe0295b776350b251c24505ae9ac6140666c6deaf02cb6a815b7f71a79.jpg)

remaining points we have $\xi _ { n } = 1 - y _ { n } t _ { n }$ . Thus the objective function (7.21) can be written (up to an overall multiplicative constant) in the form

\sum_ {n = 1} ^ {N} E _ {\mathrm{SV}} (y _ {n} t _ {n}) + \lambda \| \mathbf {w} \| ^ {2}\tag{7.44}

where $\lambda = ( 2 C ) ^ { - 1 }$ , and $E _ { \mathrm { S V } } ( \cdot )$ is the hinge error function defined by

E _ {\mathrm{SV}} (y _ {n} t _ {n}) = [ 1 - y _ {n} t _ {n} ] _ {+}\tag{7.45}

where [  ]<sub>+</sub> denotes the positive part. The hinge error function, so-called because of its shape, is plotted in Figure 7.5. It can be viewed as an approximation to the misclassification error, i.e., the error function that ideally we would like to minimize, which is also shown in Figure 7.5.

When we considered the logistic regression model in Section 4.3.2, we found it convenient to work with target variable $t \in \{ 0 , 1 \}$ . For comparison with the support vector machine, we first reformulate maximum likelihood logistic regression using the target variable $t \in \{ - 1 , 1 \}$ . To do this, we note that $p ( t = 1 | y ) = \sigma ( y )$ where $y ( \mathbf x )$ is given by (7.1), and $\sigma ( y )$ is the logistic sigmoid function defined by (4.59). It follows that $p ( t = - 1 | y ) = 1 - \sigma ( y ) = \sigma ( - y )$ , where we have used the properties of the logistic sigmoid function, and so we can write

p (t | y) = \sigma (y t).\tag{7.46}

From this we can construct an error function by taking the negative logarithm of the likelihood function that, with a quadratic regularizer, takes the form

Exercise 7.6

\sum_ {n = 1} ^ {N} E _ {\mathrm{LR}} (y _ {n} t _ {n}) + \lambda \| \mathbf {w} \| ^ {2}.\tag{7.47}

where

E _ {\mathrm{LR}} (y t) = \ln \left(1 + \exp (- y t)\right).\tag{7.48}

For comparison with other error functions, we can divide by ln(2) so that the error function passes through the point (0, 1). This rescaled error function is also plotted in Figure 7.5 and we see that it has a similar form to the support vector error function. The key difference is that the flat region in $E _ { \mathrm { S V } } ( y t )$ leads to sparse solutions.

Both the logistic error and the hinge loss can be viewed as continuous approximations to the misclassification error. Another continuous error function that has sometimes been used to solve classification problems is the squared error, which is again plotted in Figure 7.5. It has the property, however, of placing increasing emphasis on data points that are correctly classified but that are a long way from the decision boundary on the correct side. Such points will be strongly weighted at the expense of misclassified points, and so if the objective is to minimize the misclassification rate, then a monotonically decreasing error function would be a better choice.
