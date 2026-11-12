---
id: "tin-hieu-he-thong.3-3-bayesian-linear-regression"
doc_id: "tin-hieu-he-thong"
title: "3.3. Bayesian Linear Regression"
level: 2
heading_path: ["3 Linear Models for Regression", "3.3. Bayesian Linear Regression"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.figure-3-6"
next_id: "tin-hieu-he-thong.3-3-1-parameter-distribution"
block_ids: ["b1786", "b1787", "b1788"]
---

## 3.3. Bayesian Linear Regression

In our discussion of maximum likelihood for setting the parameters of a linear regression model, we have seen that the effective model complexity, governed by the number of basis functions, needs to be controlled according to the size of the data set. Adding a regularization term to the log likelihood function means the effective model complexity can then be controlled by the value of the regularization coefficient, although the choice of the number and form of the basis functions is of course still important in determining the overall behaviour of the model.

This leaves the issue of deciding the appropriate model complexity for the particular problem, which cannot be decided simply by maximizing the likelihood function, because this always leads to excessively complex models and over-fitting. Independent hold-out data can be used to determine model complexity, as discussed in Section 1.3, but this can be both computationally expensive and wasteful of valu able data. We therefore turn to a Bayesian treatment of linear regression, which will avoid the over-fitting problem of maximum likelihood, and which will also lead to automatic methods of determining model complexity using the training data alone. Again, for simplicity we will focus on the case of a single target variable t. Extension to multiple target variables is straightforward and follows the discussion of Section 3.1.5.
