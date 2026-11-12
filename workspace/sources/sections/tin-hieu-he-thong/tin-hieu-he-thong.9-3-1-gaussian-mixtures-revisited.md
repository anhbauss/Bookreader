---
id: "tin-hieu-he-thong.9-3-1-gaussian-mixtures-revisited"
doc_id: "tin-hieu-he-thong"
title: "9.3.1 Gaussian mixtures revisited"
level: 2
heading_path: ["Mixture Models and EM", "9.3.1 Gaussian mixtures revisited"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.the-general-em-algorithm"
next_id: "tin-hieu-he-thong.9-3-2-relation-to-k-means"
block_ids: ["b4857", "b4858", "b4859", "b4860", "b4861", "b4862", "b4863", "b4864", "b4865", "b4866", "b4867", "b4868", "b4869", "b4870", "b4871", "b4872", "b4873", "b4874", "b4875"]
---

## 9.3.1 Gaussian mixtures revisited

We now consider the application of this latent variable view of EM to the specific case of a Gaussian mixture model. Recall that our goal is to maximize the log likelihood function (9.14), which is computed using the observed data set X, and we saw that this was more difficult than for the case of a single Gaussian distribution due to the presence of the summation over k that occurs inside the logarithm. Suppose then that in addition to the observed data set X, we were also given the values of the corresponding discrete variables Z. Recall that Figure 9.5(a) shows a ‘complete’ data set (i.e., one that includes labels showing which component generated each data point) while Figure 9.5(b) shows the corresponding ‘incomplete’ data set. The graphical model for the complete data is shown in Figure 9.9.

Figure 9.9 This shows the same graph as in Figure 9.6 except that we now suppose that the discrete variables $\mathbf { z } _ { n }$ are observed, as well as the data variables ${ \bf x } _ { n }$

![image](images/part-003--48c86602b9eae618bb2b59dd5591b8fc2c09091b1adb6cee495d389f1d021c1b.jpg)

Now consider the problem of maximizing the likelihood for the complete data set X, Z . From (9.10) and (9.11), this likelihood function takes the form

p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\mu}, \boldsymbol {\Sigma}, \boldsymbol {\pi}) = \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} \pi_ {k} ^ {z _ {n k}} \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Sigma} _ {k}) ^ {z _ {n k}}\tag{9.35}

where $z _ { n k }$ denotes the $k ^ { \mathrm { t h } }$ component of $\mathbf { z } _ { n }$ . Taking the logarithm, we obtain

\ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\mu}, \boldsymbol {\Sigma}, \boldsymbol {\pi}) = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} z _ {n k} \left\{\ln \pi_ {k} + \ln \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Sigma} _ {k}) \right\}.\tag{9.36}

Comparison with the log likelihood function (9.14) for the incomplete data shows that the summation over k and the logarithm have been interchanged. The logarithm now acts directly on the Gaussian distribution, which itself is a member of the exponential family. Not surprisingly, this leads to a much simpler solution to the maximum likelihood problem, as we now show. Consider first the maximization with respect to the means and covariances. Because $\mathbf { z } _ { n }$ is a $K \cdot$ -dimensional vector with all elements equal to 0 except for a single element having the value 1, the complete-data log likelihood function is simply a sum of K independent contributions, one for each mixture component. Thus the maximization with respect to a mean or a covariance is exactly as for a single Gaussian, except that it involves only the subset of data points that are ‘assigned’ to that component. For the maximization with respect to the mixing coefficients, we note that these are coupled for different values of k by virtue of the summation constraint (9.9). Again, this can be enforced using a Lagrange multiplier as before, and leads to the result

\pi_ {k} = \frac {1}{N} \sum_ {n = 1} ^ {N} z _ {n k}\tag{9.37}

so that the mixing coefficients are equal to the fractions of data points assigned to the corresponding components.

Thus we see that the complete-data log likelihood function can be maximized trivially in closed form. In practice, however, we do not have values for the latent variables so, as discussed earlier, we consider the expectation, with respect to the posterior distribution of the latent variables, of the complete-data log likelihood.

Using (9.10) and (9.11) together with Bayes’ theorem, we see that this posterior distribution takes the form

p (\mathbf {Z} | \mathbf {X}, \boldsymbol {\mu}, \boldsymbol {\Sigma}, \boldsymbol {\pi}) \propto \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} [ \pi_ {k} \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Sigma} _ {k}) ] ^ {z _ {n k}}.\tag{9.38}

and hence factorizes over n so that under the posterior distribution the $\left\{ { { \bf { z } } _ { n } } \right\}$ are independent. This is easily verified by inspection of the directed graph in Figure 9.6 and making use of the d-separation criterion. The expected value of the indicator variable $z _ { n k }$ under this posterior distribution is then given by

\begin{array}{r c l} \mathbb {E} [ z _ {n k} ] & = & \frac {\sum_ {z _ {n k}} z _ {n k} \left[ \pi_ {k} \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {k} , \boldsymbol {\Sigma} _ {k}) \right] ^ {z _ {n k}}}{\sum_ {z _ {n j}} \left[ \pi_ {j} \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {j} , \boldsymbol {\Sigma} _ {j}) \right] ^ {z _ {n j}}} \\ & = & \frac {\pi_ {k} \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {k} , \boldsymbol {\Sigma} _ {k})}{\sum_ {j = 1} ^ {K} \pi_ {j} \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {j} , \boldsymbol {\Sigma} _ {j})} = \gamma (z _ {n k}) \end{array}\tag{9.39}

which is just the responsibility of component k for data point ${ \bf x } _ { n }$ . The expected value of the complete-data log likelihood function is therefore given by

\mathbb {E} _ {\mathbf {Z}} [ \ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\mu}, \boldsymbol {\Sigma}, \boldsymbol {\pi}) ] = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} \gamma (z _ {n k}) \left\{\ln \pi_ {k} + \ln \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Sigma} _ {k}) \right\}.\tag{9.40}

We can now proceed as follows. First we choose some initial values for the parameters $\mu ^ { \mathrm { o l d } } , \Sigma ^ { \mathrm { o l d } }$ and $\pi ^ { \mathrm { o l d } }$ , and use these to evaluate the responsibilities (the E step). We then keep the responsibilities fixed and maximize (9.40) with respect to $\mu _ { k } , \Sigma _ { k }$ and $\pi _ { k }$ (the M step). This leads to closed form solutions for $\mu ^ { \mathrm { n e w } } , \bar { \Sigma } ^ { \mathrm { n e w } }$ and $\pi ^ { \mathrm { n e w } }$ given by (9.17), (9.19), and (9.22) as before. This is precisely the EM algorithm for Gaussian mixtures as derived earlier. We shall gain more insight into the role of the expected complete-data log likelihood function when we give a proof of convergence of the EM algorithm in Section 9.4.
