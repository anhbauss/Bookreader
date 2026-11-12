---
id: "tin-hieu-he-thong.7-2-3-rvm-for-classification"
doc_id: "tin-hieu-he-thong"
title: "7.2.3 RVM for classification"
level: 2
heading_path: ["Sparse Kernel Machines", "7.2.3 RVM for classification"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.sequential-sparse-bayesian-learning-algorithm"
next_id: "tin-hieu-he-thong.exercises-8"
block_ids: ["b3996", "b3997", "b3998", "b3999", "b4000", "b4001", "b4002", "b4003", "b4004", "b4005", "b4006", "b4007", "b4008", "b4009", "b4010", "b4011", "b4012", "b4013", "b4014", "b4015", "b4016", "b4017", "b4018", "b4019", "b4020", "b4021", "b4022", "b4023", "b4024", "b4025", "b4026", "b4027", "b4028", "b4029", "b4030", "b4031", "b4032", "b4033", "b4034", "b4035", "b4036", "b4037", "b4038"]
---

## 7.2.3 RVM for classification

We can extend the relevance vector machine framework to classification problems by applying the ARD prior over weights to a probabilistic linear classification model of the kind studied in Chapter 4. To start with, we consider two-class problems with a binary target variable $t \in \{ 0 , 1 \}$ . The model now takes the form of a linear combination of basis functions transformed by a logistic sigmoid function

y (\mathbf {x}, \mathbf {w}) = \sigma \left(\mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x})\right)\tag{7.108}

where $\sigma ( \cdot )$ is the logistic sigmoid function defined by (4.59). If we introduce a Gaussian prior over the weight vector w, then we obtain the model that has been considered already in Chapter 4. The difference here is that in the RVM, this model uses the ARD prior (7.80) in which there is a separate precision hyperparameter associated with each weight parameter.

In contrast to the regression model, we can no longer integrate analytically over the parameter vector w. Here we follow Tipping (2001) and use the Laplace approximation, which was applied to the closely related problem of Bayesian logistic regression in Section 4.5.1.

We begin by initializing the hyperparameter vector α. For this given value of α, we then build a Gaussian approximation to the posterior distribution and thereby obtain an approximation to the marginal likelihood. Maximization of this approximate marginal likelihood then leads to a re-estimated value for $_ { \alpha , \beta }$ and the process is repeated until convergence.

Let us consider the Laplace approximation for this model in more detail. For a fixed value of α, the mode of the posterior distribution over w is obtained by maximizing

\begin{array}{l} \ln p (\mathbf {w} | \mathbf {t}, \boldsymbol {\alpha}) = \ln \left\{p (\mathbf {t} | \mathbf {w}) p (\mathbf {w} | \boldsymbol {\alpha}) \right\} - \ln p (\mathbf {t} | \boldsymbol {\alpha}) \\ = \sum_ {n = 1} ^ {N} \left\{t _ {n} \ln y _ {n} + (1 - t _ {n}) \ln (1 - y _ {n}) \right\} - \frac {1}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {A} \mathbf {w} + \text { const } \end{array}\tag{7.109}

where $\mathbf { A } = \mathrm { d i a g } ( \alpha _ { i } )$ . This can be done using iterative reweighted least squares (IRLS) as discussed in Section 4.3.3. For this, we need the gradient vector and Hessian matrix of the log posterior distribution, which from (7.109) are given by

\nabla \ln p (\mathbf {w} | \mathbf {t}, \boldsymbol {\alpha}) = \boldsymbol {\Phi} ^ {\mathrm{T}} (\mathbf {t} - \mathbf {y}) - \mathbf {A w}\tag{7.110}

\nabla \nabla \ln p (\mathbf {w} | \mathbf {t}, \boldsymbol {\alpha}) = - \left(\boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {B} \boldsymbol {\Phi} + \mathbf {A}\right)\tag{7.111}

where B is an $N \times N$ diagonal matrix with elements $b _ { n } = y _ { n } ( 1 - y _ { n } )$ , the vector $\pmb { \ y } = ( y _ { 1 } , \dots , y _ { N } ) ^ { \mathrm { T } }$ , and $\Phi$ is the design matrix with elements $\Phi _ { n i } = \phi _ { i } ( \mathbf { x } _ { n } )$ . Here we have used the property (4.88) for the derivative of the logistic sigmoid function. At convergence of the IRLS algorithm, the negative Hessian represents the inverse covariance matrix for the Gaussian approximation to the posterior distribution.

The mode of the resulting approximation to the posterior distribution, corresponding to the mean of the Gaussian approximation, is obtained setting (7.110) to zero, giving the mean and covariance of the Laplace approximation in the form

\mathbf {w} ^ {\star} = \mathbf {A} ^ {- 1} \boldsymbol {\Phi} ^ {\mathrm{T}} (\mathbf {t} - \mathbf {y})\tag{7.112}

\boldsymbol {\Sigma} = \left(\boldsymbol {\Phi} ^ {T} \mathbf {B} \boldsymbol {\Phi} + \mathbf {A}\right) ^ {- 1}.\tag{7.113}

We can now use this Laplace approximation to evaluate the marginal likelihood. Using the general result (4.135) for an integral evaluated using the Laplace approxi-

mation, we have

\begin{array}{r c l} p (\mathbf {t} | \boldsymbol {\alpha}) & = & \int p (\mathbf {t} | \mathbf {w}) p (\mathbf {w} | \boldsymbol {\alpha})   \mathrm{d} \mathbf {w} \\ & \simeq & p (\mathbf {t} | \mathbf {w} ^ {\star}) p (\mathbf {w} ^ {\star} | \boldsymbol {\alpha}) (2 \pi) ^ {M / 2} | \boldsymbol {\Sigma} | ^ {1 / 2}. \end{array}\tag{7.114}

If we substitute for $p ( \mathbf { t } | \mathbf { w } ^ { \star } )$ and $p ( \mathbf { w } ^ { \star } | \alpha )$ and then set the derivative of the marginal likelihood with respect to $\alpha _ { i }$ equal to zero, we obtain

- \frac {1}{2} (w _ {i} ^ {\star}) ^ {2} + \frac {1}{2 \alpha_ {i}} - \frac {1}{2} \Sigma_ {i i} = 0.\tag{7.115}

Defining $\gamma _ { i } = 1 - \alpha _ { i } \Sigma _ { i i }$ and rearranging then gives

\alpha_ {i} ^ {\mathrm{new}} = \frac {\gamma_ {i}}{(w _ {i} ^ {\star}) ^ {2}}\tag{7.116}

which is identical to the re-estimation formula (7.87) obtained for the regression RVM.

If we define

\widehat {\mathbf {t}} = \boldsymbol {\Phi} \mathbf {w} ^ {\star} + \mathbf {B} ^ {- 1} (\mathbf {t} - \mathbf {y})\tag{7.117}

we can write the approximate log marginal likelihood in the form

\ln p (\mathbf {t} | \boldsymbol {\alpha}, \beta) = - \frac {1}{2} \left\{N \ln (2 \pi) + \ln | \mathbf {C} | + (\widehat {\mathbf {t}}) ^ {\mathrm{T}} \mathbf {C} ^ {- 1} \widehat {\mathbf {t}} \right\}\tag{7.118}

where

\mathbf {C} = \mathbf {B} + \boldsymbol {\Phi} \mathbf {A} \boldsymbol {\Phi} ^ {\mathrm{T}}.\tag{7.119}

This takes the same form as (7.85) in the regression case, and so we can apply the same analysis of sparsity and obtain the same fast learning algorithm in which we fully optimize a single hyperparameter $\alpha _ { i }$ at each step.

Figure 7.12 shows the relevance vector machine applied to a synthetic classification data set. We see that the relevance vectors tend not to lie in the region of the decision boundary, in contrast to the support vector machine. This is consistent with our earlier discussion of sparsity in the RVM, because a basis function $\phi _ { i } ( \mathbf { x } )$ centred on a data point near the boundary will have a vector $\varphi _ { i }$ that is poorly aligned with the training data vector t.

One of the potential advantages of the relevance vector machine compared with the SVM is that it makes probabilistic predictions. For example, this allows the RVM to be used to help construct an emission density in a nonlinear extension of the linear dynamical system for tracking faces in video sequences (Williams et al., 2005).

So far, we have considered the RVM for binary classification problems. For $K > 2$ classes, we again make use of the probabilistic approach in Section 4.3.4 in which there are K linear models of the form

a _ {k} = \mathbf {w} _ {k} ^ {\mathrm{T}} \mathbf {x}\tag{7.120}

![image](images/part-002--99e4b84d1d51700445d38f1f24631433b4370c150602dc03003c896bc7b47742.jpg)

![image](images/part-002--4bce11f10dead0fe87ac6224e8eec06b0f2f5b4ed11088f4ec1ce7805eecb5b4.jpg)

Figure 7.12 Example of the relevance vector machine applied to a synthetic data set, in which the left-hand plot shows the decision boundary and the data points, with the relevance vectors indicated by circles. Comparison with the results shown in Figure 7.4 for the corresponding support vector machine shows that the RVM gives a much sparser model. The right-hand plot shows the posterior probability given by the RVM output in which the proportion of red (blue) ink indicates the probability of that point belonging to the red (blue) class.

which are combined using a softmax function to give outputs

y _ {k} (\mathbf {x}) = \frac {\exp (a _ {k})}{\sum_ {j} \exp (a _ {j})}.\tag{7.121}

The log likelihood function is then given by

\ln p (\mathbf {T} | \mathbf {w} _ {1}, \dots , \mathbf {w} _ {K}) = \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} y _ {n k} ^ {t _ {n k}}\tag{7.122}

where the target values $t _ { n k }$ have a 1-of-K coding for each data point n, and T is a matrix with elements $t _ { n k }$ . Again, the Laplace approximation can be used to optimize the hyperparameters (Tipping, 2001), in which the model and its Hessian are found using IRLS. This gives a more principled approach to multiclass classification than the pairwise method used in the support vector machine and also provides probabilistic predictions for new data points. The principal disadvantage is that the Hessian matrix has size $M K \times M K$ , where M is the number of active basis functions, which gives an additional factor of $K ^ { 3 }$ in the computational cost of training compared with the two-class RVM.

The principal disadvantage of the relevance vector machine is the relatively long training times compared with the SVM. This is offset, however, by the avoidance of cross-validation runs to set the model complexity parameters. Furthermore, because it yields sparser models, the computation time on test points, which is usually the more important consideration in practice, is typically much less.
