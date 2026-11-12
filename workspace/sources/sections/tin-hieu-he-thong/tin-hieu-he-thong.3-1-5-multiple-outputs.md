---
id: "tin-hieu-he-thong.3-1-5-multiple-outputs"
doc_id: "tin-hieu-he-thong"
title: "3.1.5 Multiple outputs"
level: 2
heading_path: ["3 Linear Models for Regression", "3.1.5 Multiple outputs"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-1-4-regularized-least-squares"
next_id: "tin-hieu-he-thong.3-2-the-bias-variance-decomposition"
block_ids: ["b1728", "b1729", "b1730", "b1731", "b1732", "b1733", "b1734", "b1735", "b1736", "b1737", "b1738", "b1739", "b1740"]
---

## 3.1.5 Multiple outputs

So far, we have considered the case of a single target variable t. In some applications, we may wish to predict $K > 1$ target variables, which we denote collectively by the target vector t. This could be done by introducing a different set of basis functions for each component of t, leading to multiple, independent regression problems. However, a more interesting, and more common, approach is to use the same set of basis functions to model all of the components of the target vector so that

\mathbf {y} (\mathbf {x}, \mathbf {w}) = \mathbf {W} ^ {\mathrm{T}} \boldsymbol {\phi} (\mathbf {x})\tag{3.31}

where y is a K-dimensional column vector, W is an $M \times K$ matrix of parameters, and $\phi ( \mathbf { x } )$ is an M-dimensional column vector with elements $\phi _ { j } ( \mathbf { x } )$ , with $\phi _ { 0 } ( \mathbf { x } ) = 1$ as before. Suppose we take the conditional distribution of the target vector to be an isotropic Gaussian of the form

p (\mathbf {t} | \mathbf {x}, \mathbf {W}, \beta) = \mathcal {N} (\mathbf {t} | \mathbf {W} ^ {\mathrm{T}} \phi (\mathbf {x}), \beta^ {- 1} \mathbf {I}).\tag{3.32}

If we have a set of observations $\mathbf { t } _ { 1 } , \ldots , \mathbf { t } _ { N }$ , we can combine these into a matrix T of size $N \times K$ such that the $n ^ { \mathrm { t h } }$ row is given by $\mathbf { t } _ { n } ^ { \mathrm { T } } .$ . Similarly, we can combine the input vectors $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ into a matrix $\mathbf { X } .$ . The log likelihood function is then given by

\begin{array}{l l l} \ln p (\mathbf {T} | \mathbf {X}, \mathbf {W}, \beta) & = & \sum_ {n = 1} ^ {N} \ln \mathcal {N} (\mathbf {t} _ {n} | \mathbf {W} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}), \beta^ {- 1} \mathbf {I}) \\ & = & \frac {N K}{2} \ln \left(\frac {\beta}{2 \pi}\right) - \frac {\beta}{2} \sum_ {n = 1} ^ {N} \left\| \mathbf {t} _ {n} - \mathbf {W} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) \right\| ^ {2}. \end{array}\tag{3.33}

As before, we can maximize this function with respect to W, giving

\mathbf {W} _ {\mathrm{ML}} = \left(\boldsymbol {\Phi} ^ {\mathrm{T}} \boldsymbol {\Phi}\right) ^ {- 1} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {T}.\tag{3.34}

If we examine this result for each target variable $t _ { k }$ , we have

\mathbf {w} _ {k} = \left(\boldsymbol {\Phi} ^ {\mathrm{T}} \boldsymbol {\Phi}\right) ^ {- 1} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {t} _ {k} = \boldsymbol {\Phi} ^ {\dagger} \mathbf {t} _ {k}\tag{3.35}

where $\mathbf { t } _ { k }$ is an N-dimensional column vector with components $t _ { n k }$ for $n = 1 , \ldots N$ Thus the solution to the regression problem decouples between the different target variables, and we need only compute a single pseudo-inverse matrix $\Phi ^ { \dag }$ , which is shared by all of the vectors ${ \bf w } _ { k }$

The extension to general Gaussian noise distributions having arbitrary covariance matrices is straightforward. Again, this leads to a decoupling into K independent regression problems. This result is unsurprising because the parameters W define only the mean of the Gaussian noise distribution, and we know from Section 2.3.4 that the maximum likelihood solution for the mean of a multivariate Gaussian is independent of the covariance. From now on, we shall therefore consider a single target variable t for simplicity.
