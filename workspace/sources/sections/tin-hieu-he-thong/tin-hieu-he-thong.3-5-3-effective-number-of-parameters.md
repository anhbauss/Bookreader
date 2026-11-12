---
id: "tin-hieu-he-thong.3-5-3-effective-number-of-parameters"
doc_id: "tin-hieu-he-thong"
title: "3.5.3 Effective number of parameters"
level: 2
heading_path: ["3 Linear Models for Regression", "3.5.3 Effective number of parameters"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-5-2-maximizing-the-evidence-function"
next_id: "tin-hieu-he-thong.3-6-limitations-of-fixed-basis-functions"
block_ids: ["b1968", "b1969", "b1970", "b1971", "b1972", "b1973", "b1974", "b1975", "b1976", "b1977", "b1978", "b1979", "b1980", "b1981", "b1982", "b1983", "b1984", "b1985", "b1986", "b1987"]
---

## 3.5.3 Effective number of parameters

The result (3.92) has an elegant interpretation (MacKay, 1992a), which provides insight into the Bayesian solution for $\alpha$ . To see this, consider the contours of the likelihood function and the prior as illustrated in Figure 3.15. Here we have implicitly transformed to a rotated set of axes in parameter space aligned with the eigenvectors $\mathbf { u } _ { i }$ defined in (3.87). Contours of the likelihood function are then axis-aligned ellipses. The eigenvalues $\lambda _ { i }$ measure the curvature of the likelihood function, and so in Figure 3.15 the eigenvalue $\lambda _ { 1 }$ is small compared with $\lambda _ { 2 }$ (because a smaller curvature corresponds to a greater elongation of the contours of the likelihood function). Because $\ddot { \beta } \Phi ^ { \mathrm { T } } \Phi$ is a positive definite matrix, it will have positive eigenvalues, and so the ratio $\lambda _ { i } / ( \lambda _ { i } + \alpha )$ will lie between 0 and 1. Consequently, the quantity γ defined by (3.91) will lie in the range $0 \leqslant \gamma \leqslant M$ . For directions in which $\lambda _ { i } \gg \alpha$ the corresponding parameter $w _ { i }$ will be close to its maximum likelihood value, and the ratio $\lambda _ { i } / ( \lambda _ { i } + \alpha )$ will be close to 1. Such parameters are called well determined because their values are tightly constrained by the data. Conversely, for directions in which $\lambda _ { i } \ll \alpha$ , the corresponding parameters $w _ { i }$ will be close to zero, as will the ratios $\lambda _ { i } / ( \lambda _ { i } + \alpha )$ . These are directions in which the likelihood function is relatively insensitive to the parameter value and so the parameter has been set to a small value by the prior. The quantity $\gamma$ defined by (3.91) therefore measures the effective total number of well determined parameters.

We can obtain some insight into the result (3.95) for re-estimating $\beta$ by comparing it with the corresponding maximum likelihood result given by (3.21). Both of these formulae express the variance (the inverse precision) as an average of the squared differences between the targets and the model predictions. However, they differ in that the number of data points N in the denominator of the maximum likelihood result is replaced by $N - \gamma$ in the Bayesian result. We recall from (1.56) that the maximum likelihood estimate of the variance for a Gaussian distribution over a

single variable x is given by

\sigma_ {\mathrm{ML}} ^ {2} = \frac {1}{N} \sum_ {n = 1} ^ {N} (x _ {n} - \mu_ {\mathrm{ML}}) ^ {2}\tag{3.96}

and that this estimate is biased because the maximum likelihood solution $\mu _ { \mathrm { M L } }$ for the mean has fitted some of the noise on the data. In effect, this has used up one degree of freedom in the model. The corresponding unbiased estimate is given by (1.59) and takes the form

\sigma_ {\mathrm{MAP}} ^ {2} = \frac {1}{N - 1} \sum_ {n = 1} ^ {N} (x _ {n} - \mu_ {\mathrm{ML}}) ^ {2}.\tag{3.97}

We shall see in Section 10.1.3 that this result can be obtained from a Bayesian treatment in which we marginalize over the unknown mean. The factor of $N - 1$ in the denominator of the Bayesian result takes account of the fact that one degree of freedom has been used in fitting the mean and removes the bias of maximum likelihood. Now consider the corresponding results for the linear regression model. The mean of the target distribution is now given by the function $\mathbf { w } ^ { \mathrm { \scriptscriptstyle T } } \phi ( \mathbf { x } )$ , which contains M parameters. However, not all of these parameters are tuned to the data. The effective number of parameters that are determined by the data is $\gamma _ { \mathrm { : } }$ , with the remaining $M - \gamma$ parameters set to small values by the prior. This is reflected in the Bayesian result for the variance that has a factor $N - \gamma$ in the denominator, thereby correcting for the bias of the maximum likelihood result.

We can illustrate the evidence framework for setting hyperparameters using the sinusoidal synthetic data set from Section 1.1, together with the Gaussian basis function model comprising 9 basis functions, so that the total number of parameters in the model is given by $M = 1 0$ including the bias. Here, for simplicity of illustration, we have set $\beta$ to its true value of 11.1 and then used the evidence framework to determine α, as shown in Figure 3.16.

We can also see how the parameter α controls the magnitude of the parameters $\{ w _ { i } \}$ , by plotting the individual parameters versus the effective number $\gamma$ of parameters, as shown in Figure 3.17.

If we consider the limit $N \gg M$ in which the number of data points is large in relation to the number of parameters, then from (3.87) all of the parameters will be well determined by the data because $\Phi ^ { \mathrm { T } } \Phi$ involves an implicit sum over data points, and so the eigenvalues $\lambda _ { i }$ increase with the size of the data set. In this case, $\gamma = M$ and the re-estimation equations for α and $\beta$ become

\alpha = \frac {M}{2 E _ {W} (\mathbf {m} _ {N})}\tag{3.98}

\beta = \frac {N}{2 E _ {D} (\mathbf {m} _ {N})}\tag{3.99}

where $E _ { W }$ and $E _ { D }$ are defined by (3.25) and (3.26), respectively. These results can be used as an easy-to-compute approximation to the full evidence re-estimation formulae, because they do not require evaluation of the eigenvalue spectrum of the Hessian.

![image](images/part-001--6e16a3fa8435859aeb26daad99484c9cd9f01d59f4d75cb034835281802e8855.jpg)

![image](images/part-001--5aafc4860184cd75541293829f93a815d3b36c309b1ad324b5ef9692fab56921.jpg)

ln α

Figure 3.16 The left plot shows $\gamma$ (red curve) and 2α $E _ { W } ( { \bf m } _ { N } )$ (blue curve) versus ln $\alpha$ for the sinusoidal synthetic data set. It is the intersection of these two curves that defines the optimum value for $\alpha$ given by the evidence procedure. The right plot shows the corresponding graph of log evidence ln $p ( \mathbf { t } | \alpha , \beta )$ versus ln $\alpha$ (red curve) showing that the peak coincides with the crossing point of the curves in the left plot. Also shown is the test set error (blue curve) showing that the evidence maximum occurs close to the point of best generalization.

Figure 3.17 Plot of the 10 parameters $w _ { i }$ from the Gaussian basis function model versus the effective number of parameters $\gamma ,$ in which the hyperparameter α is varied in the range $0 \leqslant \alpha \leqslant \infty$ causing $\gamma$ to vary in the range $0 \leqslant \gamma \leqslant \bar { M }$

![image](images/part-001--ba527950efe1e692a67146967df813c476ef0919ada0634de007aeab767039c5.jpg)
