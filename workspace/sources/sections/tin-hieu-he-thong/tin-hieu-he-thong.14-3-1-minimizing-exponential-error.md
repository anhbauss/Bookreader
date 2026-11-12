---
id: "tin-hieu-he-thong.14-3-1-minimizing-exponential-error"
doc_id: "tin-hieu-he-thong"
title: "14.3.1 Minimizing exponential error"
level: 2
heading_path: ["Combining Models", "14.3.1 Minimizing exponential error"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.adaboost"
next_id: "tin-hieu-he-thong.14-3-2-error-functions-for-boosting"
block_ids: ["b7045", "b7046", "b7047", "b7048", "b7049", "b7050", "b7051", "b7052", "b7053", "b7054", "b7055", "b7056", "b7057", "b7058", "b7059", "b7060", "b7061", "b7062", "b7063", "b7064", "b7065", "b7066", "b7067", "b7068", "b7069", "b7070", "b7071", "b7072"]
---

## 14.3.1 Minimizing exponential error

Boosting was originally motivated using statistical learning theory, leading to upper bounds on the generalization error. However, these bounds turn out to be too loose to have practical value, and the actual performance of boosting is much better than the bounds alone would suggest. Friedman et al. (2000) gave a different and very simple interpretation of boosting in terms of the sequential minimization of an exponential error function.

Consider the exponential error function defined by

E = \sum_ {n = 1} ^ {N} \exp \left\{- t _ {n} f _ {m} (\mathbf {x} _ {n}) \right\}\tag{14.20}

where $f _ { m } ( \mathbf { x } )$ is a classifier defined in terms of a linear combination of base classifiers $y _ { l } ( \mathbf x )$ of the form

f _ {m} (\mathbf {x}) = \frac {1}{2} \sum_ {l = 1} ^ {m} \alpha_ {l} y _ {l} (\mathbf {x})\tag{14.21}

and $t _ { n } \in \{ - 1 , 1 \}$ are the training set target values. Our goal is to minimize E with respect to both the weighting coefficients $\alpha _ { l }$ and the parameters of the base classifiers $y _ { l } ( \mathbf x )$

![image](images/part-004--8869c20dc65cadc421e9b788a6ecb6226ef84a855b94c951309d2a62d049edf0.jpg)

![image](images/part-004--3166519348b51f4abfd83469702e7c7b488a50ec1bf303546f64ea6fcb1e2122.jpg)

![image](images/part-004--153682546ac68754d4362573f7422f66ad58c0222a414b39afe7d13c777caa68.jpg)

![image](images/part-004--ab85375379b5c911f10b9b1fcaa89eff8327eaeb0e2f4f461e5ed6f82b565f4a.jpg)

![image](images/part-004--c0d8e8a9fd395b3f62954f8eebb10989a5e4a7418fd06046f1ac6aaf9dcc50a4.jpg)

![image](images/part-004--6f9cf76f5de73dcfcdb7f42ef963fbc8bcd1b16d6e54b16c24ea8c2f21807dec.jpg)

Figure 14.2 Illustration of boosting in which the base learners consist of simple thresholds applied to one or other of the axes. Each figure shows the number m of base learners trained so far, along with the decision boundary of the most recent base learner (dashed black line) and the combined decision boundary of the ensemble (solid green line). Each data point is depicted by a circle whose radius indicates the weight assigned to that data point when training the most recently added base learner. Thus, for instance, we see that points that are misclassified by the $m = 1$ base learner are given greater weight when training the $m = 2$ base learner.

Instead of doing a global error function minimization, however, we shall suppose that the base classifiers $y _ { 1 } ( \mathbf x ) , \dots , y _ { m - 1 } ( \mathbf x )$ are fixed, as are their coefficients $\alpha _ { 1 } , \ldots , \alpha _ { m - 1 }$ , and so we are minimizing only with respect to $\alpha _ { m }$ and $y _ { m } ( \mathbf { x } )$ . Separating off the contribution from base classifier $y _ { m } ( \mathbf x )$ , we can then write the error function in the form

\begin{array}{r c l} {E} & {=} & { \sum_ {n = 1} ^ {N} \exp \left\{- t _ {n} f _ {m - 1} (\mathbf {x} _ {n}) - \frac {1}{2} t _ {n} \alpha_ {m} y _ {m} (\mathbf {x} _ {n}) \right\}} \\ & {=} & { \sum_ {n = 1} ^ {N} w _ {n} ^ {(m)} \exp \left\{- \frac {1}{2} t _ {n} \alpha_ {m} y _ {m} (\mathbf {x} _ {n}) \right\}} \end{array}\tag{14.22}

where the coefficients $w _ { n } ^ { ( m ) } = \exp \{ - t _ { n } f _ { m - 1 } ( { \bf x } _ { n } ) \}$ can be viewed as constants because we are optimizing only $\alpha _ { m }$ and $y _ { m } ( \mathbf x )$ . If we denote by $\mathcal { T } _ { m }$ the set of data points that are correctly classified by $y _ { m } ( \mathbf { x } )$ , and if we denote the remaining misclassified points by $\mathcal { M } _ { m }$ , then we can in turn rewrite the error function in the

form

\begin{array}{r c l} E & = & e ^ {- \alpha_ {m} / 2} \sum_ {n \in \mathcal {T} _ {m}} w _ {n} ^ {(m)} + e ^ {\alpha_ {m} / 2} \sum_ {n \in \mathcal {M} _ {m}} w _ {n} ^ {(m)} \\ & = & (e ^ {\alpha_ {m} / 2} - e ^ {- \alpha_ {m} / 2}) \sum_ {n = 1} ^ {N} w _ {n} ^ {(m)} I (y _ {m} (\mathbf {x} _ {n}) \neq t _ {n}) + e ^ {- \alpha_ {m} / 2} \sum_ {n = 1} ^ {N} w _ {n} ^ {(m)}. \end{array}\tag{14.23}

When we minimize this with respect to $y _ { m } ( \mathbf { x } )$ , we see that the second term is constant, and so this is equivalent to minimizing (14.15) because the overall multiplicative factor in front of the summation does not affect the location of the minimum. Similarly, minimizing with respect to $\alpha _ { m }$ , we obtain (14.17) in which $\epsilon _ { m }$ is defined by (14.16).

From (14.22) we see that, having found $\alpha _ { m }$ and $y _ { m } ( \mathbf x )$ , the weights on the data points are updated using

w _ {n} ^ {(m + 1)} = w _ {n} ^ {(m)} \exp \left\{- \frac {1}{2} t _ {n} \alpha_ {m} y _ {m} (\mathbf {x} _ {n}) \right\}.\tag{14.24}

Making use of the fact that

t _ {n} y _ {m} (\mathbf {x} _ {n}) = 1 - 2 I (y _ {m} (\mathbf {x} _ {n}) \neq t _ {n})\tag{14.25}

we see that the weights $w _ { n } ^ { ( m ) }$ are updated at the next iteration using

w _ {n} ^ {(m + 1)} = w _ {n} ^ {(m)} \exp (- \alpha_ {m} / 2) \exp \left\{\alpha_ {m} I (y _ {m} (\mathbf {x} _ {n}) \neq t _ {n}) \right\}.\tag{14.26}

Because the term $\exp ( - \alpha _ { m } / 2 )$ is independent of $n _ { \colon }$ we see that it weights all data points by the same factor and so can be discarded. Thus we obtain (14.18).

Finally, once all the base classifiers are trained, new data points are classified by evaluating the sign of the combined function defined according to (14.21). Because the factor of $1 / 2$ does not affect the sign it can be omitted, giving (14.19).
