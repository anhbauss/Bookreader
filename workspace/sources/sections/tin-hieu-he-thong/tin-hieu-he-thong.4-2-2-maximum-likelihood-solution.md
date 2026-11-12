---
id: "tin-hieu-he-thong.4-2-2-maximum-likelihood-solution"
doc_id: "tin-hieu-he-thong"
title: "4.2.2 Maximum likelihood solution"
level: 2
heading_path: ["4 Linear Models for Classification", "4.2.2 Maximum likelihood solution"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-2-1-continuous-inputs"
next_id: "tin-hieu-he-thong.4-2-3-discrete-features"
block_ids: ["b2290", "b2291", "b2292", "b2293", "b2294", "b2295", "b2296", "b2297", "b2298", "b2299", "b2300", "b2301", "b2302", "b2303", "b2304", "b2305", "b2306", "b2307", "b2308", "b2309", "b2310", "b2311", "b2312", "b2313", "b2314", "b2315", "b2316", "b2317"]
---

## 4.2.2 Maximum likelihood solution

Once we have specified a parametric functional form for the class-conditional densities $p ( \mathbf { x } | \mathcal { C } _ { k } )$ , we can then determine the values of the parameters, together with the prior class probabilities $p ( \mathcal { C } _ { k } )$ , using maximum likelihood. This requires a data set comprising observations of x along with their corresponding class labels.

Consider first the case of two classes, each having a Gaussian class-conditional density with a shared covariance matrix, and suppose we have a data set $\{ \mathbf { x } _ { n } , t _ { n } \}$ where $n = 1 , \ldots , N$ . Here $t _ { n } = 1$ denotes class $\mathcal { C } _ { 1 }$ and $t _ { n } = 0$ denotes class $\mathcal { C } _ { 2 }$ . We denote the prior class probability $p ( \mathcal { C } _ { 1 } ) = \pi$ , so that $p ( \mathcal { C } _ { 2 } ) = 1 - \pi$ . For a data point ${ \bf x } _ { n }$ from class $\mathcal { C } _ { 1 }$ , we have $t _ { n } = 1$ and hence

p (\mathbf {x} _ {n}, \mathcal {C} _ {1}) = p (\mathcal {C} _ {1}) p (\mathbf {x} _ {n} | \mathcal {C} _ {1}) = \pi \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {1}, \boldsymbol {\Sigma}).

Similarly for class $\mathcal { C } _ { 2 }$ , we have $t _ { n } = 0$ and hence

p (\mathbf {x} _ {n}, \mathcal {C} _ {2}) = p (\mathcal {C} _ {2}) p (\mathbf {x} _ {n} | \mathcal {C} _ {2}) = (1 - \pi) \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {2}, \boldsymbol {\Sigma}).

Thus the likelihood function is given by

p (\mathbf {t} | \pi , \boldsymbol {\mu} _ {1}, \boldsymbol {\mu} _ {2}, \boldsymbol {\Sigma}) = \prod_ {n = 1} ^ {N} \left[ \pi \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {1}, \boldsymbol {\Sigma}) \right] ^ {t _ {n}} \left[ (1 - \pi) \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {2}, \boldsymbol {\Sigma}) \right] ^ {1 - t _ {n}}\tag{4.71}

where $\mathbf { t } ~ = ~ ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ . As usual, it is convenient to maximize the log of the likelihood function. Consider first the maximization with respect to $\pi .$ . The terms in the log likelihood function that depend on $\pi$ are

\sum_ {n = 1} ^ {N} \left\{t _ {n} \ln \pi + (1 - t _ {n}) \ln (1 - \pi) \right\}.\tag{4.72}

Setting the derivative with respect to $\pi$ equal to zero and rearranging, we obtain

\pi = \frac {1}{N} \sum_ {n = 1} ^ {N} t _ {n} = \frac {N _ {1}}{N} = \frac {N _ {1}}{N _ {1} + N _ {2}}\tag{4.73}

where $N _ { 1 }$ denotes the total number of data points in class $\mathcal { C } _ { 1 }$ , and $N _ { 2 }$ denotes the total number of data points in class $\mathcal { C } _ { 2 }$ . Thus the maximum likelihood estimate for $\pi$ is simply the fraction of points in class $\mathcal { C } _ { 1 }$ as expected. This result is easily generalized to the multiclass case where again the maximum likelihood estimate of the prior probability associated with class $\mathcal { C } _ { k }$ is given by the fraction of the training set points assigned to that class.

Now consider the maximization with respect to $\pmb { \mu } _ { 1 }$ . Again we can pick out of the log likelihood function those terms that depend on $\pmb { \mu } _ { 1 }$ giving

\sum_ {n = 1} ^ {N} t _ {n} \ln \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {1}, \boldsymbol {\Sigma}) = - \frac {1}{2} \sum_ {n = 1} ^ {N} t _ {n} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {1}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {1}) + \text { const }.\tag{4.74}

Setting the derivative with respect to $\pmb { \mu } _ { 1 }$ to zero and rearranging, we obtain

\pmb {\mu} _ {1} = \frac {1}{N _ {1}} \sum_ {n = 1} ^ {N} t _ {n} \mathbf {x} _ {n}\tag{4.75}

which is simply the mean of all the input vectors ${ \bf x } _ { n }$ assigned to class $\mathcal { C } _ { 1 }$ . By a similar argument, the corresponding result for $\pmb { \mu } _ { 2 }$ is given by

\boldsymbol {\mu} _ {2} = \frac {1}{N _ {2}} \sum_ {n = 1} ^ {N} (1 - t _ {n}) \mathbf {x} _ {n}\tag{4.76}

which again is the mean of all the input vectors ${ \bf x } _ { n }$ assigned to class $\mathcal { C } _ { 2 }$ .

Finally, consider the maximum likelihood solution for the shared covariance matrix Σ. Picking out the terms in the log likelihood function that depend on $\Sigma .$ , we have

\begin{array}{l} - \frac {1}{2} \sum_ {n = 1} ^ {N} t _ {n} \ln | \boldsymbol {\Sigma} | - \frac {1}{2} \sum_ {n = 1} ^ {N} t _ {n} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {1}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {1}) \\ - \frac {1}{2} \sum_ {n = 1} ^ {N} (1 - t _ {n}) \ln | \boldsymbol {\Sigma} | - \frac {1}{2} \sum_ {n = 1} ^ {N} (1 - t _ {n}) (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {2}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {2}) \\ = - \frac {N}{2} \ln | \boldsymbol {\Sigma} | - \frac {N}{2} \operatorname{Tr} \left\{\boldsymbol {\Sigma} ^ {- 1} \mathbf {S} \right\} \end{array}\tag{4.77}

where we have defined

\mathbf {S} = \frac {N _ {1}}{N} \mathbf {S} _ {1} + \frac {N _ {2}}{N} \mathbf {S} _ {2}\tag{4.78}

{\bf S} _ {1} = \frac {1}{N _ {1}} \sum_ {n \in \mathcal {C} _ {1}} ({\bf x} _ {n} - {\boldsymbol {\mu}} _ {1}) ({\bf x} _ {n} - {\boldsymbol {\mu}} _ {1}) ^ {\mathrm{T}}\tag{4.79}

\mathbf {S} _ {2} = \frac {1}{N _ {2}} \sum_ {n \in \mathcal {C} _ {2}} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {2}) (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {2}) ^ {\mathrm{T}}.\tag{4.80}

Using the standard result for the maximum likelihood solution for a Gaussian distribution, we see that $\mathbf { \Delta } \Sigma = \mathbf { S }$ , which represents a weighted average of the covariance matrices associated with each of the two classes separately.

This result is easily extended to the $K$ class problem to obtain the corresponding maximum likelihood solutions for the parameters in which each class-conditional density is Gaussian with a shared covariance matrix. Note that the approach of fitting Gaussian distributions to the classes is not robust to outliers, because the maximum likelihood estimation of a Gaussian is not robust.
