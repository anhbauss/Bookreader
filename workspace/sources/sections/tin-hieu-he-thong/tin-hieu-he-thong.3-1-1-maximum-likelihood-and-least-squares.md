---
id: "tin-hieu-he-thong.3-1-1-maximum-likelihood-and-least-squares"
doc_id: "tin-hieu-he-thong"
title: "3.1.1 Maximum likelihood and least squares"
level: 2
heading_path: ["3 Linear Models for Regression", "3.1.1 Maximum likelihood and least squares"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-1-linear-basis-function-models"
next_id: "tin-hieu-he-thong.3-1-2-geometry-of-least-squares"
block_ids: ["b1655", "b1656", "b1657", "b1658", "b1659", "b1660", "b1661", "b1662", "b1663", "b1664", "b1665", "b1666", "b1667", "b1668", "b1669", "b1670", "b1671", "b1672", "b1673", "b1674", "b1675", "b1676", "b1677", "b1678", "b1679", "b1680", "b1681", "b1682", "b1683", "b1684", "b1685", "b1686", "b1687", "b1688", "b1689", "b1690", "b1691", "b1692", "b1693"]
---

## 3.1.1 Maximum likelihood and least squares

In Chapter 1, we fitted polynomial functions to data sets by minimizing a sumof-squares error function. We also showed that this error function could be motivated as the maximum likelihood solution under an assumed Gaussian noise model. Let us return to this discussion and consider the least squares approach, and its relation to maximum likelihood, in more detail.

As before, we assume that the target variable t is given by a deterministic function $y ( \mathbf { x } , \mathbf { w } )$ with additive Gaussian noise so that

t = y (\mathbf {x}, \mathbf {w}) + \epsilon\tag{3.7}

where $\epsilon$ is a zero mean Gaussian random variable with precision (inverse variance) $\beta .$ Thus we can write

p (t | \mathbf {x}, \mathbf {w}, \beta) = \mathcal {N} (t | y (\mathbf {x}, \mathbf {w}), \beta^ {- 1}).\tag{3.8}

Recall that, if we assume a squared loss function, then the optimal prediction, for a new value of x, will be given by the conditional mean of the target variable. In the case of a Gaussian conditional distribution of the form (3.8), the conditional mean

will be simply

\mathbb {E} [ t | \mathbf {x} ] = \int t p (t | \mathbf {x}) \mathrm{d} t = y (\mathbf {x}, \mathbf {w}).\tag{3.9}

Note that the Gaussian noise assumption implies that the conditional distribution of t given x is unimodal, which may be inappropriate for some applications. An extension to mixtures of conditional Gaussian distributions, which permit multimodal conditional distributions, will be discussed in Section 14.5.1.

Now consider a data set of inputs $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ with corresponding target values $t _ { 1 } , \ldots , t _ { N }$ . We group the target variables $\left\{ t _ { n } \right\}$ into a column vector that we denote by t where the typeface is chosen to distinguish it from a single observation of a multivariate target, which would be denoted t. Making the assumption that these data points are drawn independently from the distribution (3.8), we obtain the following expression for the likelihood function, which is a function of the adjustable parameters w and $\beta ,$ in the form

p (\mathbf {t} | \mathbf {X}, \mathbf {w}, \beta) = \prod_ {n = 1} ^ {N} \mathcal {N} (t _ {n} | \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}), \beta^ {- 1})\tag{3.10}

where we have used (3.3). Note that in supervised learning problems such as regression (and classification), we are not seeking to model the distribution of the input variables. Thus x will always appear in the set of conditioning variables, and so from now on we will drop the explicit x from expressions such as $p ( \mathbf { t } | \mathbf { x } , \mathbf { w } , \beta )$ in order to keep the notation uncluttered. Taking the logarithm of the likelihood function, and making use of the standard form (1.46) for the univariate Gaussian, we have

\begin{array}{r c l} \ln p (\mathbf {t} | \mathbf {w}, \beta) & = & \sum_ {n = 1} ^ {N} \ln \mathcal {N} (t _ {n} | \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}), \beta^ {- 1}) \\ & = & \frac {N}{2} \ln \beta - \frac {N}{2} \ln (2 \pi) - \beta E _ {D} (\mathbf {w}) \end{array}\tag{3.11}

where the sum-of-squares error function is defined by

E _ {D} (\mathbf {w}) = \frac {1}{2} \sum_ {n = 1} ^ {N} \{t _ {n} - \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) \} ^ {2}.\tag{3.12}

Having written down the likelihood function, we can use maximum likelihood to determine w and $\beta .$ Consider first the maximization with respect to w. As observed already in Section 1.2.5, we see that maximization of the likelihood function under a conditional Gaussian noise distribution for a linear model is equivalent to minimizing a sum-of-squares error function given by $E _ { D } ( \mathbf { w } )$ . The gradient of the log likelihood function (3.11) takes the form

\nabla \ln p (\mathbf {t} | \mathbf {w}, \beta) = \sum_ {n = 1} ^ {N} \left\{t _ {n} - \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) \right\} \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}}.\tag{3.13}

Setting this gradient to zero gives

0 = \sum_ {n = 1} ^ {N} t _ {n} \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} - \mathbf {w} ^ {\mathrm{T}} \left(\sum_ {n = 1} ^ {N} \phi (\mathbf {x} _ {n}) \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}}\right).\tag{3.14}

Solving for w we obtain

\mathbf {w} _ {\mathrm{ML}} = \left(\boldsymbol {\Phi} ^ {\mathrm{T}} \boldsymbol {\Phi}\right) ^ {- 1} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {t}\tag{3.15}

which are known as the normal equations for the least squares problem. Here Φ is an $N \times M$ matrix, called the design matrix, whose elements are given by $\Phi _ { n j } = \phi _ { j } ( \mathbf { x } _ { n } )$ so that

\boldsymbol {\Phi} = \left( \begin{array}{c c c c} \phi_ {0} (\mathbf {x} _ {1}) & \phi_ {1} (\mathbf {x} _ {1}) & \dots & \phi_ {M - 1} (\mathbf {x} _ {1}) \\ \phi_ {0} (\mathbf {x} _ {2}) & \phi_ {1} (\mathbf {x} _ {2}) & \dots & \phi_ {M - 1} (\mathbf {x} _ {2}) \\ \vdots & \vdots & \ddots & \vdots \\ \phi_ {0} (\mathbf {x} _ {N}) & \phi_ {1} (\mathbf {x} _ {N}) & \dots & \phi_ {M - 1} (\mathbf {x} _ {N}) \end{array} \right).\tag{3.16}

The quantity

\boldsymbol {\Phi} ^ {\dagger} \equiv \left(\boldsymbol {\Phi} ^ {T} \boldsymbol {\Phi}\right) ^ {- 1} \boldsymbol {\Phi} ^ {T}\tag{3.17}

is known as the Moore-Penrose pseudo-inverse of the matrix Φ (Rao and Mitra, 1971; Golub and Van Loan, 1996). It can be regarded as a generalization of the notion of matrix inverse to nonsquare matrices. Indeed, if Φ is square and invertible, then using the property $( \mathbf { A } \mathbf { B } ) ^ { - 1 } = \mathbf { B } ^ { - 1 } \mathbf { A } ^ { - 1 }$ we see that $\bar { \Phi } ^ { \dagger } \equiv \mathbf { \bar { \Phi } } ^ { - 1 }$

At this point, we can gain some insight into the role of the bias parameter $w _ { 0 }$ . If we make the bias parameter explicit, then the error function (3.12) becomes

E _ {D} (\mathbf {w}) = \frac {1}{2} \sum_ {n = 1} ^ {N} \{t _ {n} - w _ {0} - \sum_ {j = 1} ^ {M - 1} w _ {j} \phi_ {j} (\mathbf {x} _ {n}) \} ^ {2}.\tag{3.18}

Setting the derivative with respect to $w _ { 0 }$ equal to zero, and solving for $w _ { 0 }$ , we obtain

w _ {0} = \bar {t} - \sum_ {j = 1} ^ {M - 1} w _ {j} \overline {{\phi_ {j}}}\tag{3.19}

where we have defined

\bar {t} = \frac {1}{N} \sum_ {n = 1} ^ {N} t _ {n}, \quad \overline {{\phi_ {j}}} = \frac {1}{N} \sum_ {n = 1} ^ {N} \phi_ {j} (\mathbf {x} _ {n}).\tag{3.20}

Thus the bias $w _ { 0 }$ compensates for the difference between the averages (over the training set) of the target values and the weighted sum of the averages of the basis function values.

We can also maximize the log likelihood function (3.11) with respect to the noise precision parameter $\beta ,$ giving

\frac {1}{\beta_ {\mathrm{ML}}} = \frac {1}{N} \sum_ {n = 1} ^ {N} \{t _ {n} - \mathbf {w} _ {\mathrm{ML}} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) \} ^ {2}\tag{3.21}

Figure 3.2 Geometrical interpretation of the least-squares solution, in an N-dimensional space whose axes are the values of $t _ { 1 } , \ldots , t _ { N }$ . The least-squares regression function is obtained by finding the orthogonal projection of the data vector t onto the subspace spanned by the basis functions $\phi _ { j } ( \mathbf { x } )$ in which each basis function is viewed as a vector $\varphi _ { j }$ of length N with elements $\phi _ { j } ( \mathbf { x } _ { n } )$

![image](images/part-001--c560a27c8ad8ca975ba4ab6b869261460e61b159fb2a6014e1227e51902bc480.jpg)

and so we see that the inverse of the noise precision is given by the residual variance of the target values around the regression function.
