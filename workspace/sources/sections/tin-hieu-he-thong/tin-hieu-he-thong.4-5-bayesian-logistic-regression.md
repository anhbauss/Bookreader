---
id: "tin-hieu-he-thong.4-5-bayesian-logistic-regression"
doc_id: "tin-hieu-he-thong"
title: "4.5. Bayesian Logistic Regression"
level: 2
heading_path: ["4 Linear Models for Classification", "4.5. Bayesian Logistic Regression"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-4-1-model-comparison-and-bic"
next_id: "tin-hieu-he-thong.4-5-1-laplace-approximation"
block_ids: ["b2499", "b2500"]
---

## 4.5. Bayesian Logistic Regression

We now turn to a Bayesian treatment of logistic regression. Exact Bayesian inference for logistic regression is intractable. In particular, evaluation of the posterior distribution would require normalization of the product of a prior distribution and a likelihood function that itself comprises a product of logistic sigmoid functions, one for every data point. Evaluation of the predictive distribution is similarly intractable. Here we consider the application of the Laplace approximation to the problem of Bayesian logistic regression (Spiegelhalter and Lauritzen, 1990; MacKay, 1992b).
