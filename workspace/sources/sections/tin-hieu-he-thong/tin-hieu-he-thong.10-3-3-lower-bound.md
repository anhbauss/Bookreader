---
id: "tin-hieu-he-thong.10-3-3-lower-bound"
doc_id: "tin-hieu-he-thong"
title: "10.3.3 Lower bound"
level: 2
heading_path: ["Approximate Inference", "10.3.3 Lower bound"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-3-2-predictive-distribution"
next_id: "tin-hieu-he-thong.10-4-exponential-family-distributions"
block_ids: ["b5365", "b5366", "b5367", "b5368", "b5369", "b5370", "b5371", "b5372", "b5373", "b5374", "b5375", "b5376", "b5377"]
---

## 10.3.3 Lower bound

Another quantity of importance is the lower bound  defined by

\begin{array}{r c l} \mathcal {L} (q) & = & \mathbb {E} [ \ln p (\mathbf {w}, \alpha , \mathbf {t}) ] - \mathbb {E} [ \ln q (\mathbf {w}, \alpha) ] \\ & = & \mathbb {E} _ {\mathbf {w}} [ \ln p (\mathbf {t} | \mathbf {w}) ] + \mathbb {E} _ {\mathbf {w}, \alpha} [ \ln p (\mathbf {w} | \alpha) ] + \mathbb {E} _ {\alpha} [ \ln p (\alpha) ] \\ & & - \mathbb {E} _ {\alpha} [ \ln q (\mathbf {w}) ] _ {\mathbf {w}} - \mathbb {E} [ \ln q (\alpha) ]. \end{array}\tag{10.107}

Exercise 10.27

Evaluation of the various terms is straightforward, making use of results obtained in previous chapters, and gives

\begin{array}{r l r} \mathbb {E} [ \ln p (\mathbf {t} | \mathbf {w}) ] _ {\mathbf {w}} & = & \frac {N}{2} \ln \left(\frac {\beta}{2 \pi}\right) - \frac {\beta}{2} \mathbf {t} ^ {\mathrm{T}} \mathbf {t} + \beta \mathbf {m} _ {N} ^ {\mathrm{T}} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {t} \\ & & - \frac {\beta}{2} \mathrm{Tr} \left[ \boldsymbol {\Phi} ^ {\mathrm{T}} \boldsymbol {\Phi} (\mathbf {m} _ {N} \mathbf {m} _ {N} ^ {\mathrm{T}} + \mathbf {S} _ {N}) \right] \end{array}\tag{10.108}

\begin{array}{r c l} \mathbb {E} [ \ln p (\mathbf {w} | \alpha) ] _ {\mathbf {w}, \alpha} & = & - \frac {M}{2} \ln (2 \pi) + \frac {M}{2} (\psi (a _ {N}) - \ln b _ {N}) \\ & & - \frac {a _ {N}}{2 b _ {N}} \left[ \mathbf {m} _ {N} ^ {\mathrm{T}} \mathbf {m} _ {N} + \operatorname{Tr} (\mathbf {S} _ {N}) \right] \end{array}\tag{10.109}

\begin{array}{r c l} \mathbb {E} [ \ln p (\alpha) ] _ {\alpha} & = & a _ {0} \ln b _ {0} + (a _ {0} - 1) [ \psi (a _ {N}) - \ln b _ {N} ] \\ & & - b _ {0} \frac {a _ {N}}{b _ {N}} - \ln \Gamma (a _ {N}) \end{array}\tag{10.110}

{- \mathbb {E} [ \ln q (\mathbf {w}) ] _ {\mathbf {w}}} = {\frac {1}{2} \ln | \mathbf {S} _ {N} | + \frac {M}{2} [ 1 + \ln (2 \pi) ]}\tag{10.111}

- \mathbb {E} [ \ln q (\alpha) ] _ {\alpha} = \ln \Gamma (a _ {N}) - (a _ {N} - 1) \psi (a _ {N}) - \ln b _ {N} + a _ {N}.\tag{10.112}

Figure 10.9 shows a plot of the lower bound $\mathcal { L } ( q )$ versus the degree of a polynomial model for a synthetic data set generated from a degree three polynomial. Here the prior parameters have been set to $a _ { 0 } = b _ { 0 } = 0 .$ , corresponding to the noninformative prior $p ( \alpha ) \propto 1 / \alpha$ , which is uniform over ln α as discussed in Section 2.3.6. As we saw in Section 10.1, the quantity $\mathcal { L }$ represents lower bound on the log marginal likelihood $p ( \mathbf { t } | M )$ for the model. If we assign equal prior probabilities $p ( M )$ to the different values of $M .$ , then we can interpret $\mathcal { L }$ as an approximation to the posterior model probability $p ( M | \mathbf { t } )$ . Thus the variational framework assigns the highest probability to the model with $M = 3$ . This should be contrasted with the maximum likelihood result, which assigns ever smaller residual error to models of increasing complexity until the residual error is driven to zero, causing maximum likelihood to favour severely over-fitted models.

Plot of the lower bound versus the order M of the polynomial, for a polynomial model, in which a set of 10 data points is generated from a polynomial with $M \ = \ 3$ sampled over the interval ( 5, 5) with additive Gaussian noise of variance 0.09. The value of the bound gives the log probability of the model, and we see that the value of the bound peaks at $M = 3$ , corresponding to the true model from which the data set was generated.

![image](images/part-003--9ffeb658e891477f9ab40bdb0be977d105589663b26aa85206f178bff1cdd4c4.jpg)
