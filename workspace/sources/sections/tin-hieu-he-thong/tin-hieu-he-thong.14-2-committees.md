---
id: "tin-hieu-he-thong.14-2-committees"
doc_id: "tin-hieu-he-thong"
title: "14.2. Committees"
level: 2
heading_path: ["Combining Models", "14.2. Committees"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.14-1-bayesian-model-averaging"
next_id: "tin-hieu-he-thong.14-3-boosting"
block_ids: ["b7005", "b7006", "b7007", "b7008", "b7009", "b7010", "b7011", "b7012", "b7013", "b7014", "b7015", "b7016", "b7017", "b7018", "b7019", "b7020", "b7021", "b7022", "b7023"]
---

## 14.2. Committees

The simplest way to construct a committee is to average the predictions of a set of individual models. Such a procedure can be motivated from a frequentist perspective by considering the trade-off between bias and variance, which decomposes the error due to a model into the bias component that arises from differences between the model and the true function to be predicted, and the variance component that represents the sensitivity of the model to the individual data points. Recall from Figure 3.5 that when we trained multiple polynomials using the sinusoidal data, and then averaged the resulting functions, the contribution arising from the variance term tended to cancel, leading to improved predictions. When we averaged a set of low-bias models (corresponding to higher order polynomials), we obtained accurate predictions for the underlying sinusoidal function from which the data were generated.

In practice, of course, we have only a single data set, and so we have to find a way to introduce variability between the different models within the committee. One approach is to use bootstrap data sets, discussed in Section 1.2.3. Consider a regression problem in which we are trying to predict the value of a single continuous variable, and suppose we generate M bootstrap data sets and then use each to train a separate copy $y _ { m } ( \mathbf x )$ of a predictive model where $m = 1 , \ldots , M$ . The committee prediction is given by

y _ {\mathrm{COM}} (\mathbf {x}) = \frac {1}{M} \sum_ {m = 1} ^ {M} y _ {m} (\mathbf {x}).\tag{14.7}

This procedure is known as bootstrap aggregation or bagging (Breiman, 1996).

Suppose the true regression function that we are trying to predict is given by $h ( \mathbf { x } )$ , so that the output of each of the models can be written as the true value plus an error in the form

y _ {m} (\mathbf {x}) = h (\mathbf {x}) + \epsilon_ {m} (\mathbf {x}).\tag{14.8}

The average sum-of-squares error then takes the form

\mathbb {E} _ {\mathbf {x}} \left[ \left\{y _ {m} (\mathbf {x}) - h (\mathbf {x}) \right\} ^ {2} \right] = \mathbb {E} _ {\mathbf {x}} \left[ \epsilon_ {m} (\mathbf {x}) ^ {2} \right]\tag{14.9}

where $\mathbb { E } _ { \mathbf { x } } [ \cdot ]$ denotes a frequentist expectation with respect to the distribution of the input vector x. The average error made by the models acting individually is therefore

E _ {\mathrm{AV}} = \frac {1}{M} \sum_ {m = 1} ^ {M} \mathbb {E} _ {\mathbf {x}} \left[ \epsilon_ {m} (\mathbf {x}) ^ {2} \right].\tag{14.10}

Similarly, the expected error from the committee (14.7) is given by

\begin{array}{r c l} E _ {\mathrm{COM}} & = & \mathbb {E} _ {\mathbf {x}} \left[ \left\{\frac {1}{M} \sum_ {m = 1} ^ {M} y _ {m} (\mathbf {x}) - h (\mathbf {x}) \right\} ^ {2} \right] \\ & = & \mathbb {E} _ {\mathbf {x}} \left[ \left\{\frac {1}{M} \sum_ {m = 1} ^ {M} \epsilon_ {m} (\mathbf {x}) \right\} ^ {2} \right] \end{array}\tag{14.11}

If we assume that the errors have zero mean and are uncorrelated, so that

\mathbb {E} _ {\mathbf {x}} \left[ \epsilon_ {m} (\mathbf {x}) \right] = 0\tag{14.12}

\mathbb {E} _ {\mathbf {x}} \left[ \epsilon_ {m} (\mathbf {x}) \epsilon_ {l} (\mathbf {x}) \right] = 0, \qquad m \neq l\tag{14.13}

then we obtain

E _ {\mathrm{COM}} = \frac {1}{M} E _ {\mathrm{AV}}.\tag{14.14}

This apparently dramatic result suggests that the average error of a model can be reduced by a factor of M simply by averaging M versions of the model. Unfortunately, it depends on the key assumption that the errors due to the individual models are uncorrelated. In practice, the errors are typically highly correlated, and the reduction in overall error is generally small. It can, however, be shown that the expected committee error will not exceed the expected error of the constituent models, so that $E _ { \mathrm { C O M } } \leqslant E _ { \mathrm { A V } }$ . In order to achieve more significant improvements, we turn to a more sophisticated technique for building committees, known as boosting.
