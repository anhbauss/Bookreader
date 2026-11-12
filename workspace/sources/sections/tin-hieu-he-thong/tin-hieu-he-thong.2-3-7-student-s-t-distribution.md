---
id: "tin-hieu-he-thong.2-3-7-student-s-t-distribution"
doc_id: "tin-hieu-he-thong"
title: "2.3.7 Student\u2019s t-distribution"
level: 2
heading_path: ["Probability Distributions", "2.3.7 Student\u2019s t-distribution"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-3-6-bayesian-inference-for-the-gaussian"
next_id: "tin-hieu-he-thong.2-3-8-periodic-variables"
block_ids: ["b1188", "b1189", "b1190", "b1191", "b1192", "b1193", "b1194", "b1195", "b1196", "b1197", "b1198", "b1199", "b1200", "b1201", "b1202", "b1203", "b1204", "b1205", "b1206", "b1207", "b1208", "b1209", "b1210", "b1211", "b1212", "b1213", "b1214", "b1215", "b1216", "b1217"]
---

## 2.3.7 Student’s t-distribution

Exercise 2.46

We have seen that the conjugate prior for the precision of a Gaussian is given by a gamma distribution. If we have a univariate Gaussian $\mathcal { N } ( \boldsymbol { x } | \mu , \tau ^ { - 1 } )$ together with a Gamma prior ${ \mathrm { G a m } } ( \tau | a , b )$ and we integrate out the precision, we obtain the marginal distribution of x in the form

Figure 2.15

Plot of Student’s t-distribution (2.159) for $\mu = 0$ and $\lambda = 1$ for various values of $\nu .$ The limit $\nu \to \infty$ corresponds to a Gaussian distribution with mean $\mu$ and precision λ.

![image](images/part-001--83bdbe46bdb2cc3a2a10551951691fa282657eab5b5e57628306de69b85d4b73.jpg)

\begin{array}{r c l} p (x | \mu , a, b) & = & \int_ {0} ^ {\infty} \mathcal {N} (x | \mu , \tau^ {- 1}) \mathrm{Gam} (\tau | a, b) \mathrm{d} \tau \\ & = & \int_ {0} ^ {\infty} \frac {b ^ {a} e ^ {(- b \tau)} \tau^ {a - 1}}{\Gamma (a)} \left(\frac {\tau}{2 \pi}\right) ^ {1 / 2} \exp \left\{- \frac {\tau}{2} (x - \mu) ^ {2} \right\} \mathrm{d} \tau \\ & = & \frac {b ^ {a}}{\Gamma (a)} \left(\frac {1}{2 \pi}\right) ^ {1 / 2} \left[ b + \frac {(x - \mu) ^ {2}}{2} \right] ^ {- a - 1 / 2} \Gamma (a + 1 / 2) \end{array} \tag {2}\tag{2.158}

where we have made the change of variable $z = \tau [ b + ( x - \mu ) ^ { 2 } / 2 ]$ . By convention we define new parameters given by $\nu = 2 a$ and $\lambda = a / b ,$ , in terms of which the distribution $p ( x | \mu , a , b )$ takes the form

\operatorname{St} (x | \mu , \lambda , \nu) = \frac {\Gamma (\nu / 2 + 1 / 2)}{\Gamma (\nu / 2)} \left(\frac {\lambda}{\pi \nu}\right) ^ {1 / 2} \left[ 1 + \frac {\lambda (x - \mu) ^ {2}}{\nu} \right] ^ {- \nu / 2 - 1 / 2}\tag{2.159}

which is known as Student’s t-distribution. The parameter $\lambda$ is sometimes called the precision of the t-distribution, even though it is not in general equal to the inverse of the variance. The parameter $\nu$ is called the degrees of freedom, and its effect is illustrated in Figure 2.15. For the particular case of $\nu = 1$ , the t-distribution reduces to the Cauchy distribution, while in the limit $\nu \to \infty$ the t-distribution $\operatorname { S t } ( x | \mu , \lambda , \nu )$ becomes a Gaussian $\mathcal { N } ( \boldsymbol { x } | \mu , \lambda ^ { - 1 } )$ with mean $\mu$ and precision λ.

From (2.158), we see that Student’s t-distribution is obtained by adding up an infinite number of Gaussian distributions having the same mean but different precisions. This can be interpreted as an infinite mixture of Gaussians (Gaussian mixtures will be discussed in detail in Section 2.3.9. The result is a distribution that in general has longer ‘tails’ than a Gaussian, as was seen in Figure 2.15. This gives the tdistribution an important property called robustness, which means that it is much less sensitive than the Gaussian to the presence of a few data points which are outliers. The robustness of the t-distribution is illustrated in Figure 2.16, which compares the maximum likelihood solutions for a Gaussian and a t-distribution. Note that the maximum likelihood solution for the t-distribution can be found using the expectationmaximization (EM) algorithm. Here we see that the effect of a small number of outliers is much less significant for the t-distribution than for the Gaussian. Outliers can arise in practical applications either because the process that generates the data corresponds to a distribution having a heavy tail or simply through mislabelled data. Robustness is also an important property for regression problems. Unsurprisingly, the least squares approach to regression does not exhibit robustness, because it corresponds to maximum likelihood under a (conditional) Gaussian distribution. By basing a regression model on a heavy-tailed distribution such as a t-distribution, we obtain a more robust model.

![image](images/part-001--472d1f97fc4365768b016d911133462594d3629c48b9d84e6f892429cac19a1a.jpg)

(a)

![image](images/part-001--6d0652cd26f68aa7150f4e5be9a3f3e66f7335c4c837820b7ee19f1e8c48f583.jpg)

(b)

Figure 2.16 Illustration of the robustness of Student’s t-distribution compared to a Gaussian. (a) Histogram distribution of 30 data points drawn from a Gaussian distribution, together with the maximum likelihood fit obtained from a t-distribution (red curve) and a Gaussian (green curve, largely hidden by the red curve). Because the t-distribution contains the Gaussian as a special case it gives almost the same solution as the Gaussian. (b) The same data set but with three additional outlying data points showing how the Gaussian (green curve) is strongly distorted by the outliers, whereas the t-distribution (red curve) is relatively unaffected.

If we go back to (2.158) and substitute the alternative parameters $\nu = 2 a , \lambda =$ $a / b .$ , and $\eta = \tau b / a$ , we see that the t-distribution can be written in the form

\operatorname{St} (x | \mu , \lambda , \nu) = \int_ {0} ^ {\infty} \mathcal {N} \left(x | \mu , (\eta \lambda) ^ {- 1}\right) \operatorname{Gam} (\eta | \nu / 2, \nu / 2) \mathrm{d} \eta .\tag{2.160}

We can then generalize this to a multivariate Gaussian $\mathcal { N } ( \mathbf { x } | \boldsymbol { \mu } , \mathbf { \Lambda } \mathbf { \Lambda } )$ to obtain the cor responding multivariate Student’s t-distribution in the form

\operatorname{St} (\mathbf {x} | \boldsymbol {\mu}, \boldsymbol {\Lambda}, \nu) = \int_ {0} ^ {\infty} \mathcal {N} (\mathbf {x} | \boldsymbol {\mu}, (\eta \boldsymbol {\Lambda}) ^ {- 1}) \operatorname{Gam} (\eta | \nu / 2, \nu / 2) \mathrm{d} \eta .\tag{2.161}

Using the same technique as for the univariate case, we can evaluate this integral to give

\operatorname{St} (\mathbf {x} | \boldsymbol {\mu}, \boldsymbol {\Lambda}, \nu) = \frac {\Gamma (D / 2 + \nu / 2)}{\Gamma (\nu / 2)} \frac {| \boldsymbol {\Lambda} | ^ {1 / 2}}{(\pi \nu) ^ {D / 2}} \left[ 1 + \frac {\Delta^ {2}}{\nu} \right] ^ {- D / 2 - \nu / 2}\tag{2.162}

where $D$ is the dimensionality of $\mathbf { x } ,$ and $\Delta ^ { 2 }$ is the squared Mahalanobis distance defined by

\Delta^ {2} = (\mathbf {x} - \boldsymbol {\mu}) ^ {\mathrm{T}} \boldsymbol {\Lambda} (\mathbf {x} - \boldsymbol {\mu}).\tag{2.163}

This is the multivariate form of Student’s t-distribution and satisfies the following properties

Exercise 2.49

\mathbb {E} [ \mathbf {x} ] = \boldsymbol {\mu}, \quad \text { if } \quad \nu > 1\tag{2.164}

\operatorname{cov} [ \mathbf {x} ] = \frac {\nu}{(\nu - 2)} \boldsymbol {\Lambda} ^ {- 1}, \quad \text { if } \quad \nu > 2\tag{2.165}

\mathrm{mode} [ \mathbf {x} ] = \boldsymbol {\mu}\tag{2.166}

with corresponding results for the univariate case.
