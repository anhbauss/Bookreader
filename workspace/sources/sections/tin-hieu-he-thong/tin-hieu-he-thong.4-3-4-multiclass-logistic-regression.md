---
id: "tin-hieu-he-thong.4-3-4-multiclass-logistic-regression"
doc_id: "tin-hieu-he-thong"
title: "4.3.4 Multiclass logistic regression"
level: 2
heading_path: ["4 Linear Models for Classification", "4.3.4 Multiclass logistic regression"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-3-3-iterative-reweighted-least-squares"
next_id: "tin-hieu-he-thong.4-3-5-probit-regression"
block_ids: ["b2391", "b2392", "b2393", "b2394", "b2395", "b2396", "b2397", "b2398", "b2399", "b2400", "b2401", "b2402", "b2403", "b2404", "b2405", "b2406", "b2407", "b2408", "b2409", "b2410", "b2411"]
---

## 4.3.4 Multiclass logistic regression

In our discussion of generative models for multiclass classification, we have seen that for a large class of distributions, the posterior probabilities are given by a softmax transformation of linear functions of the feature variables, so that

p (\mathcal {C} _ {k} | \phi) = y _ {k} (\phi) = \frac {\exp (a _ {k})}{\sum_ {j} \exp (a _ {j})}\tag{4.104}

where the ‘activations’ $a _ { k }$ are given by

a _ {k} = \mathbf {w} _ {k} ^ {\mathrm{T}} \phi .\tag{4.105}

There we used maximum likelihood to determine separately the class-conditional densities and the class priors and then found the corresponding posterior probabilities using Bayes’ theorem, thereby implicitly determining the parameters $\left\{ \mathbf { w } _ { k } \right\}$ . Here we consider the use of maximum likelihood to determine the parameters $\left\{ \mathbf { w } _ { k } \right\}$ of this model directly. To do this, we will require the derivatives of $y _ { k }$ with respect to all of the activations $a _ { j }$ . These are given by

\frac {\partial y _ {k}}{\partial a _ {j}} = y _ {k} (I _ {k j} - y _ {j})\tag{4.106}

where $I _ { k j }$ are the elements of the identity matrix.

Next we write down the likelihood function. This is most easily done using the 1-of-K coding scheme in which the target vector $\mathbf { t } _ { n }$ for a feature vector $\phi _ { n }$ belonging to class $\mathcal { C } _ { k }$ is a binary vector with all elements zero except for element $k ,$ , which equals one. The likelihood function is then given by

p (\mathbf {T} | \mathbf {w} _ {1}, \dots , \mathbf {w} _ {K}) = \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} p (\mathcal {C} _ {k} | \phi_ {n}) ^ {t _ {n k}} = \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} y _ {n k} ^ {t _ {n k}}\tag{4.107}

where $y _ { n k } = y _ { k } ( \phi _ { n } )$ , and T is an $N \times K$ matrix of target variables with elements $t _ { n k }$ . Taking the negative logarithm then gives

E (\mathbf {w} _ {1}, \ldots , \mathbf {w} _ {K}) = - \ln p (\mathbf {T} | \mathbf {w} _ {1}, \ldots , \mathbf {w} _ {K}) = - \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} t _ {n k} \ln y _ {n k}\tag{4.108}

which is known as the cross-entropy error function for the multiclass classification problem.

We now take the gradient of the error function with respect to one of the parameter vectors ${ \bf w } _ { j }$ . Making use of the result (4.106) for the derivatives of the softmax function, we obtain

\nabla_ {\mathbf {w} _ {j}} E (\mathbf {w} _ {1}, \ldots , \mathbf {w} _ {K}) = \sum_ {n = 1} ^ {N} (y _ {n j} - t _ {n j}) \phi_ {n}\tag{4.109}

Exercise 4.20

where we have made use of $\textstyle \sum _ { k } t _ { n k } = 1$ . Once again, we see the same form arising for the gradient as was found for the sum-of-squares error function with the linear model and the cross-entropy error for the logistic regression model, namely the product of the error $( y _ { n j } - t _ { n j } )$ times the basis function $\phi _ { n }$ . Again, we could use this to formulate a sequential algorithm in which patterns are presented one at a time, in which each of the weight vectors is updated using (3.22).

We have seen that the derivative of the log likelihood function for a linear regression model with respect to the parameter vector w for a data point n took the form of the ‘error’ $y _ { n } - t _ { n }$ times the feature vector $\phi _ { n }$ . Similarly, for the combination of logistic sigmoid activation function and cross-entropy error function (4.90), and for the softmax activation function with the multiclass cross-entropy error function (4.108), we again obtain this same simple form. This is an example of a more general result, as we shall see in Section 4.3.6.

To find a batch algorithm, we again appeal to the Newton-Raphson update to obtain the corresponding IRLS algorithm for the multiclass problem. This requires evaluation of the Hessian matrix that comprises blocks of size $M \times M$ in which block $j ,$ k is given by

\nabla_ {\mathbf {w} _ {k}} \nabla_ {\mathbf {w} _ {j}} E (\mathbf {w} _ {1}, \ldots , \mathbf {w} _ {K}) = - \sum_ {n = 1} ^ {N} y _ {n k} (I _ {k j} - y _ {n j}) \phi_ {n} \phi_ {n} ^ {\mathrm{T}}.\tag{4.110}

As with the two-class problem, the Hessian matrix for the multiclass logistic regression model is positive definite and so the error function again has a unique minimum. Practical details of IRLS for the multiclass case can be found in Bishop and Nabney (2008).
