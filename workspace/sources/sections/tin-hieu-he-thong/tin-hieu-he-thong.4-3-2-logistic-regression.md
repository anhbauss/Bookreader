---
id: "tin-hieu-he-thong.4-3-2-logistic-regression"
doc_id: "tin-hieu-he-thong"
title: "4.3.2 Logistic regression"
level: 2
heading_path: ["4 Linear Models for Classification", "4.3.2 Logistic regression"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-3-1-fixed-basis-functions"
next_id: "tin-hieu-he-thong.4-3-3-iterative-reweighted-least-squares"
block_ids: ["b2349", "b2350", "b2351", "b2352", "b2353", "b2354", "b2355", "b2356", "b2357", "b2358", "b2359", "b2360", "b2361", "b2362", "b2363", "b2364"]
---

## 4.3.2 Logistic regression

We begin our treatment of generalized linear models by considering the problem of two-class classification. In our discussion of generative approaches in Section 4.2, we saw that under rather general assumptions, the posterior probability of class $\mathcal { C } _ { 1 }$ can be written as a logistic sigmoid acting on a linear function of the feature vector $\phi$ so that

p (\mathcal {C} _ {1} | \phi) = y (\phi) = \sigma \left(\mathbf {w} ^ {\mathrm{T}} \phi\right)\tag{4.87}

with $p ( \mathcal { C } _ { 2 } | \phi ) = 1 - p ( \mathcal { C } _ { 1 } | \phi )$ . Here $\sigma ( \cdot )$ is the logistic sigmoid function defined by (4.59). In the terminology of statistics, this model is known as logistic regression, although it should be emphasized that this is a model for classification rather than regression.

For an M-dimensional feature space $\phi ,$ , this model has M adjustable parameters. By contrast, if we had fitted Gaussian class conditional densities using maximum likelihood, we would have used 2M parameters for the means and $M ( M + 1 ) / 2$ parameters for the (shared) covariance matrix. Together with the class prior $p ( \mathcal { C } _ { 1 } )$ , this gives a total of $M ( M + 5 ) / 2 + 1$ parameters, which grows quadratically with $M$ in contrast to the linear dependence on M of the number of parameters in logistic regression. For large values of $M$ , there is a clear advantage in working with the logistic regression model directly.

We now use maximum likelihood to determine the parameters of the logistic regression model. To do this, we shall make use of the derivative of the logistic sigmoid function, which can conveniently be expressed in terms of the sigmoid function itself

\frac {d \sigma}{d a} = \sigma (1 - \sigma).\tag{4.88}

For a data set $\{ \phi _ { n } , t _ { n } \}$ , where $t _ { n } ~ \in ~ \{ 0 , 1 \}$ and $\phi _ { n } ~ = ~ \phi ( \mathbf { x } _ { n } )$ , with $n =$ $1 , \ldots , N$ , the likelihood function can be written

p (\mathbf {t} | \mathbf {w}) = \prod_ {n = 1} ^ {N} y _ {n} ^ {t _ {n}} \left\{1 - y _ {n} \right\} ^ {1 - t _ {n}}\tag{4.89}

where ${ \mathbf t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ and $y _ { n } ~ = ~ p ( \mathcal { C } _ { 1 } | \phi _ { n } )$ . As usual, we can define an error function by taking the negative logarithm of the likelihood, which gives the crossentropy error function in the form

E (\mathbf {w}) = - \ln p (\mathbf {t} | \mathbf {w}) = - \sum_ {n = 1} ^ {N} \left\{t _ {n} \ln y _ {n} + (1 - t _ {n}) \ln (1 - y _ {n}) \right\}\tag{4.90}

where $y _ { n } = \sigma ( a _ { n } )$ and $a _ { n } = \mathbf { w } ^ { \mathrm { T } } \phi _ { n }$ . Taking the gradient of the error function with respect to w, we obtain

\nabla E (\mathbf {w}) = \sum_ {n = 1} ^ {N} (y _ {n} - t _ {n}) \phi_ {n}\tag{4.91}

where we have made use of (4.88). We see that the factor involving the derivative of the logistic sigmoid has cancelled, leading to a simplified form for the gradient of the log likelihood. In particular, the contribution to the gradient from data point n is given by the ‘error $y _ { n } - t _ { n }$ between the target value and the prediction of the model, times the basis function vector $\phi _ { n }$ . Furthermore, comparison with (3.13) shows that this takes precisely the same form as the gradient of the sum-of-squares error function for the linear regression model.

If desired, we could make use of the result (4.91) to give a sequential algorithm in which patterns are presented one at a time, in which each of the weight vectors is updated using (3.22) in which $\nabla E _ { n }$ is the $n ^ { \mathrm { t h } }$ term in (4.91).

It is worth noting that maximum likelihood can exhibit severe over-fitting for data sets that are linearly separable. This arises because the maximum likelihood solution occurs when the hyperplane corresponding to $\sigma = 0 . 5$ , equivalent to ${ \bf w } ^ { \mathrm { T } } \phi = { }$ 0, separates the two classes and the magnitude of w goes to infinity. In this case, the logistic sigmoid function becomes infinitely steep in feature space, corresponding to a Heaviside step function, so that every training point from each class k is assigned a posterior probability $p ( \mathcal { C } _ { k } | \mathbf { x } ) = 1$ . Furthermore, there is typically a continuum of such solutions because any separating hyperplane will give rise to the same posterior probabilities at the training data points, as will be seen later in Figure 10.13. Maximum likelihood provides no way to favour one such solution over another, and which solution is found in practice will depend on the choice of optimization algorithm and on the parameter initialization. Note that the problem will arise even if the number of data points is large compared with the number of parameters in the model, so long as the training data set is linearly separable. The singularity can be avoided by inclusion of a prior and finding a MAP solution for w, or equivalently by adding a regularization term to the error function.
