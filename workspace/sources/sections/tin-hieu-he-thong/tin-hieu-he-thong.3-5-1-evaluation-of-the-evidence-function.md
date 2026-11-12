---
id: "tin-hieu-he-thong.3-5-1-evaluation-of-the-evidence-function"
doc_id: "tin-hieu-he-thong"
title: "3.5.1 Evaluation of the evidence function"
level: 2
heading_path: ["3 Linear Models for Regression", "3.5.1 Evaluation of the evidence function"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-5-the-evidence-approximation"
next_id: "tin-hieu-he-thong.3-5-2-maximizing-the-evidence-function"
block_ids: ["b1915", "b1916", "b1917", "b1918", "b1919", "b1920", "b1921", "b1922", "b1923", "b1924", "b1925", "b1926", "b1927", "b1928", "b1929", "b1930", "b1931", "b1932", "b1933", "b1934", "b1935", "b1936", "b1937", "b1938", "b1939", "b1940", "b1941"]
---

## 3.5.1 Evaluation of the evidence function

The marginal likelihood function $p ( \mathbf { t } | \alpha , \beta )$ is obtained by integrating over the weight parameters w, so that

p (\mathbf {t} | \alpha , \beta) = \int p (\mathbf {t} | \mathbf {w}, \beta) p (\mathbf {w} | \alpha) d \mathbf {w}.\tag{3.77}

One way to evaluate this integral is to make use once again of the result (2.115) for the conditional distribution in a linear-Gaussian model. Here we shall evaluate the integral instead by completing the square in the exponent and making use of the standard form for the normalization coefficient of a Gaussian.

From (3.11), (3.12), and (3.52), we can write the evidence function in the form

p (\mathbf {t} | \alpha , \beta) = \left(\frac {\beta}{2 \pi}\right) ^ {N / 2} \left(\frac {\alpha}{2 \pi}\right) ^ {M / 2} \int \exp \{- E (\mathbf {w}) \} d \mathbf {w}\tag{3.78}

where M is the dimensionality of w, and we have defined

\begin{array}{r c l} E (\mathbf {w}) & = & \beta E _ {D} (\mathbf {w}) + \alpha E _ {W} (\mathbf {w}) \\ & = & \frac {\beta}{2} \left\| \mathbf {t} - \boldsymbol {\Phi} \mathbf {w} \right\| ^ {2} + \frac {\alpha}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w}. \end{array}\tag{3.79}

We recognize (3.79) as being equal, up to a constant of proportionality, to the regularized sum-of-squares error function (3.27). We now complete the square over w giving

E (\mathbf {w}) = E (\mathbf {m} _ {N}) + \frac {1}{2} (\mathbf {w} - \mathbf {m} _ {N}) ^ {\mathrm{T}} \mathbf {A} (\mathbf {w} - \mathbf {m} _ {N})\tag{3.80}

where we have introduced

\mathbf {A} = \alpha \mathbf {I} + \beta \boldsymbol {\Phi} ^ {\mathrm{T}} \boldsymbol {\Phi}\tag{3.81}

together with

E (\mathbf {m} _ {N}) = \frac {\beta}{2} \left\| \mathbf {t} - \boldsymbol {\Phi} \mathbf {m} _ {N} \right\| ^ {2} + \frac {\alpha}{2} \mathbf {m} _ {N} ^ {\mathrm{T}} \mathbf {m} _ {N}.\tag{3.82}

Note that A corresponds to the matrix of second derivatives of the error function

\mathbf {A} = \nabla \nabla E (\mathbf {w})\tag{3.83}

and is known as the Hessian matrix. Here we have also defined $\mathbf { m } _ { N }$ given by

\mathbf {m} _ {N} = \beta \mathbf {A} ^ {- 1} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {t}.\tag{3.84}

Using (3.54), we see that ${ \bf A } = { \bf S } _ { N } ^ { - 1 }$ , and hence (3.84) is equivalent to the previous definition (3.53), and therefore represents the mean of the posterior distribution.

The integral over w can now be evaluated simply by appealing to the standard result for the normalization coefficient of a multivariate Gaussian, giving

\begin{array}{l l} \int \exp \left\{- E (\mathbf {w}) \right\}   \mathrm{d} \mathbf {w} \\ = & \exp \{- E (\mathbf {m} _ {N}) \} \int \exp \left\{- \frac {1}{2} (\mathbf {w} - \mathbf {m} _ {N}) ^ {\mathrm{T}} \mathbf {A} (\mathbf {w} - \mathbf {m} _ {N}) \right\}   \mathrm{d} \mathbf {w} \\ = & \exp \{- E (\mathbf {m} _ {N}) \} (2 \pi) ^ {M / 2} | \mathbf {A} | ^ {- 1 / 2}. \end{array}\tag{3.85}

Using (3.78) we can then write the log of the marginal likelihood in the form

\ln p (\mathbf {t} | \alpha , \beta) = \frac {M}{2} \ln \alpha + \frac {N}{2} \ln \beta - E (\mathbf {m} _ {N}) - \frac {1}{2} \ln | \mathbf {A} | - \frac {N}{2} \ln (2 \pi)\tag{3.86}

which is the required expression for the evidence function.

Returning to the polynomial regression problem, we can plot the model evidence against the order of the polynomial, as shown in Figure 3.14. Here we have assumed a prior of the form (1.65) with the parameter α fixed at $\alpha = 5 \times 1 0 ^ { - 3 }$ . The form of this plot is very instructive. Referring back to Figure 1.4, we see that the $M = 0$ polynomial has very poor fit to the data and consequently gives a relatively low value for the evidence. Going to the $M = 1$ polynomial greatly improves the data fit, and hence the evidence is significantly higher. However, in going to $M = 2$ , the data fit is improved only very marginally, due to the fact that the underlying sinusoidal function from which the data is generated is an odd function and so has no even terms in a polynomial expansion. Indeed, Figure 1.5 shows that the residual data error is reduced only slightly in going from $M = 1$ to $M = 2$ . Because this richer model suffers a greater complexity penalty, the evidence actually falls in going from $M = 1$ to $M = 2$ . When we go to $M = 3$ we obtain a significant further improvement in data fit, as seen in Figure 1.4, and so the evidence is increased again, giving the highest overall evidence for any of the polynomials. Further increases in the value of M produce only small improvements in the fit to the data but suffer increasing complexity penalty, leading overall to a decrease in the evidence values. Looking again at Figure 1.5, we see that the generalization error is roughly constant between $M = 3$ and $M = 8$ , and it would be difficult to choose between these models on the basis of this plot alone. The evidence values, however, show a clear preference for $M = 3$ , since this is the simplest model which gives a good explanation for the observed data.

Figure 3.14 Plot of the model evidence versus the order M, for the polynomial regression model, showing that the evidence favours the model with $M = 3$

![image](images/part-001--d1af7489503337d3e412c6425cbaa896ca6e5c8ff974ffbb3bc3dfec4d1342e3.jpg)
