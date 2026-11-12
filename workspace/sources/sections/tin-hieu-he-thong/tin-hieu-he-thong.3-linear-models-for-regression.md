---
id: "tin-hieu-he-thong.3-linear-models-for-regression"
doc_id: "tin-hieu-he-thong"
title: "3 Linear Models for Regression"
level: 1
heading_path: ["3 Linear Models for Regression"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.exercises-3"
next_id: "tin-hieu-he-thong.3-1-linear-basis-function-models"
block_ids: ["b1625", "b1626", "b1627", "b1628", "b1629"]
---

# 3 Linear Models for Regression

![image](images/part-001--846b1a14d1f205b4891a39f759b87027f33d66b5de27188c8ff4d428e34b98fa.jpg)

The focus so far in this book has been on unsupervised learning, including topics such as density estimation and data clustering. We turn now to a discussion of supervised learning, starting with regression. The goal of regression is to predict the value of one or more continuous target variables t given the value of a D-dimensional vector x of input variables. We have already encountered an example of a regression problem when we considered polynomial curve fitting in Chapter 1. The polynomial is a specific example of a broad class of functions called linear regression models, which share the property of being linear functions of the adjustable parameters, and which will form the focus of this chapter. The simplest form of linear regression models are also linear functions of the input variables. However, we can obtain a much more useful class of functions by taking linear combinations of a fixed set of nonlinear functions of the input variables, known as basis functions. Such models are linear functions of the parameters, which gives them simple analytical properties, and yet can be nonlinear with respect to the input variables.

Given a training data set comprising N observations $\left\{ \mathbf { x } _ { n } \right\}$ , where $n = 1 , \ldots , N .$ together with corresponding target values $\left\{ t _ { n } \right\}$ , the goal is to predict the value of t for a new value of x. In the simplest approach, this can be done by directly constructing an appropriate function $y ( \mathbf x )$ whose values for new inputs x constitute the predictions for the corresponding values of t. More generally, from a probabilistic perspective, we aim to model the predictive distribution $p ( t | \mathbf { x } )$ because this expresses our uncertainty about the value of t for each value of x. From this conditional distribution we can make predictions of t, for any new value of x, in such a way as to minimize the expected value of a suitably chosen loss function. As discussed in Section 1.5.5, a common choice of loss function for real-valued variables is the squared loss, for which the optimal solution is given by the conditional expectation of t.

Although linear models have significant limitations as practical techniques for pattern recognition, particularly for problems involving input spaces of high dimensionality, they have nice analytical properties and form the foundation for more sophisticated models to be discussed in later chapters.
