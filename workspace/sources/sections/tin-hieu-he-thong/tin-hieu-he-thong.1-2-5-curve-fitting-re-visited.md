---
id: "tin-hieu-he-thong.1-2-5-curve-fitting-re-visited"
doc_id: "tin-hieu-he-thong"
title: "1.2.5 Curve fitting re-visited"
level: 2
heading_path: ["Introduction", "1.2.5 Curve fitting re-visited"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.pierre-simon-laplace-1749-1827"
next_id: "tin-hieu-he-thong.1-2-6-bayesian-curve-fitting"
block_ids: ["b357", "b358", "b359", "b360", "b361", "b362", "b363", "b364", "b365", "b366", "b367", "b368", "b369", "b370", "b371", "b372", "b373", "b374", "b375", "b376", "b377", "b378", "b379", "b380"]
---

## 1.2.5 Curve fitting re-visited

We have seen how the problem of polynomial curve fitting can be expressed in terms of error minimization. Here we return to the curve fitting example and view it from a probabilistic perspective, thereby gaining some insights into error functions and regularization, as well as taking us towards a full Bayesian treatment.

The goal in the curve fitting problem is to be able to make predictions for the target variable t given some new value of the input variable x on the basis of a set of training data comprising N input values $\mathbf { x } = ( x _ { 1 } , \hdots , x _ { N } ) ^ { \mathrm { T } }$ and their corresponding target values $\mathbf { t } = \widehat { \mathbf { \Omega } } ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ . We can express our uncertainty over the value of the target variable using a probability distribution. For this purpose, we shall assume that, given the value of x, the corresponding value of t has a Gaussian distribution with a mean equal to the value $y ( x , \mathbf { w } )$ of the polynomial curve given by (1.1). Thus we have

p (t | x, \mathbf {w}, \beta) = \mathcal {N} \left(t | y (x, \mathbf {w}), \beta^ {- 1}\right)\tag{1.60}

where, for consistency with the notation in later chapters, we have defined a precision parameter $\beta$ corresponding to the inverse variance of the distribution. This is illustrated schematically in Figure 1.16.

Figure 1.16 Schematic illustration of a Gaussian conditional distribution for t given x given by (1.60), in which the mean is given by the polynomial function $y ( x , \mathbf { w } )$ , and the precision is given by the parameter $\beta ,$ which is related to the variance by $\beta ^ { - 1 } = \sigma ^ { 2 }$

![image](images/part-001--cdcd50ad150a67ee39fd088cac86127ec7d53bf5a6c2d73a3fc523ee623bac0f.jpg)

We now use the training data $\{ { \pmb x } , { \pmb t } \}$ to determine the values of the unknown parameters w and $\beta$ by maximum likelihood. If the data are assumed to be drawn independently from the distribution (1.60), then the likelihood function is given by

p (\mathbf {t} | \mathbf {x}, \mathbf {w}, \beta) = \prod_ {n = 1} ^ {N} \mathcal {N} \left(t _ {n} | y (x _ {n}, \mathbf {w}), \beta^ {- 1}\right).\tag{1.61}

As we did in the case of the simple Gaussian distribution earlier, it is convenient to maximize the logarithm of the likelihood function. Substituting for the form of the Gaussian distribution, given by (1.46), we obtain the log likelihood function in the form

\ln p (\mathbf {t} | \mathbf {x}, \mathbf {w}, \beta) = - \frac {\beta}{2} \sum_ {n = 1} ^ {N} \left\{y (x _ {n}, \mathbf {w}) - t _ {n} \right\} ^ {2} + \frac {N}{2} \ln \beta - \frac {N}{2} \ln (2 \pi).\tag{1.62}

Consider first the determination of the maximum likelihood solution for the polynomial coefficients, which will be denoted by $\mathbf { w } _ { \mathrm { M L } }$ . These are determined by maximizing (1.62) with respect to w. For this purpose, we can omit the last two terms on the right-hand side of (1.62) because they do not depend on w. Also, we note that scaling the log likelihood by a positive constant coefficient does not alter the location of the maximum with respect to w, and so we can replace the coefficient $\beta / 2$ with $1 / 2$ . Finally, instead of maximizing the log likelihood, we can equivalently minimize the negative log likelihood. We therefore see that maximizing likelihood is equivalent, so far as determining w is concerned, to minimizing the sum-of-squares errorfunction defined by (1.2). Thus the sum-of-squares error function has arisen as a consequence of maximizing likelihood under the assumption of a Gaussian noise distribution.

We can also use maximum likelihood to determine the precision parameter $\beta$ of the Gaussian conditional distribution. Maximizing (1.62) with respect to $\beta$ gives

\frac {1}{\beta_ {\mathrm{ML}}} = \frac {1}{N} \sum_ {n = 1} ^ {N} \left\{y (x _ {n}, \mathbf {w} _ {\mathrm{ML}}) - t _ {n} \right\} ^ {2}.\tag{1.63}

Again we can first determine the parameter vector ${ \bf w } _ { \mathrm { M L } }$ governing the mean and sub sequently use this to find the precision $\beta _ { \mathrm { M I } }$ as was the case for the simple Gaussian distribution.

Having determined the parameters w and $\beta ,$ we can now make predictions for new values of x. Because we now have a probabilistic model, these are expressed in terms of the predictive distribution that gives the probability distribution over t, rather than simply a point estimate, and is obtained by substituting the maximum likelihood parameters into (1.60) to give

p (t | x, \mathbf {w} _ {\mathrm{ML}}, \beta_ {\mathrm{ML}}) = \mathcal {N} \left(t | y (x, \mathbf {w} _ {\mathrm{ML}}), \beta_ {\mathrm{ML}} ^ {- 1}\right).\tag{1.64}

Now let us take a step towards a more Bayesian approach and introduce a prior distribution over the polynomial coefficients w. For simplicity, let us consider a Gaussian distribution of the form

p (\mathbf {w} | \alpha) = \mathcal {N} (\mathbf {w} | \mathbf {0}, \alpha^ {- 1} \mathbf {I}) = \left(\frac {\alpha}{2 \pi}\right) ^ {(M + 1) / 2} \exp \left\{- \frac {\alpha}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w} \right\}\tag{1.65}

where $\alpha$ is the precision of the distribution, and M+1 is the total number of elements in the vector w for an $M ^ { \mathrm { t h } }$ order polynomial. Variables such as α, which control the distribution of model parameters, are called hyperparameters. Using Bayes theorem, the posterior distribution for w is proportional to the product of the prior distribution and the likelihood function

p (\mathbf {w} | \mathbf {x}, \mathbf {t}, \alpha , \beta) \propto p (\mathbf {t} | \mathbf {x}, \mathbf {w}, \beta) p (\mathbf {w} | \alpha).\tag{1.66}

We can now determine w by finding the most probable value of w given the data, in other words by maximizing the posterior distribution. This technique is called maximum posterior, or simply MAP. Taking the negative logarithm of (1.66) and combining with (1.62) and (1.65), we find that the maximum of the posterior is given by the minimum of

\frac {\beta}{2} \sum_ {n = 1} ^ {N} \{y (x _ {n}, \mathbf {w}) - t _ {n} \} ^ {2} + \frac {\alpha}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w}.\tag{1.67}

Thus we see that maximizing the posterior distribution is equivalent to minimizing the regularized sum-of-squares error function encountered earlier in the form (1.4), with a regularization parameter given by $\lambda = \alpha / \beta$
