---
id: "tin-hieu-he-thong.6-4-gaussian-processes"
doc_id: "tin-hieu-he-thong"
title: "6.4. Gaussian Processes"
level: 2
heading_path: ["Kernel Methods", "6.4. Gaussian Processes"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.6-3-1-nadaraya-watson-model"
next_id: "tin-hieu-he-thong.6-4-1-linear-regression-revisited"
block_ids: ["b3475", "b3476", "b3477", "b3478", "b3479"]
---

## 6.4. Gaussian Processes

In Section 6.1, we introduced kernels by applying the concept of duality to a nonprobabilistic model for regression. Here we extend the role of kernels to probabilistic discriminative models, leading to the framework of Gaussian processes. We shall thereby see how kernels arise naturally in a Bayesian setting.

In Chapter 3, we considered linear regression models of the form $y ( \mathbf { x } , \mathbf { w } ) =$ $\mathbf { w } ^ { \mathrm { T } } \phi ( \mathbf { x } )$ in which w is a vector of parameters and $\phi ( \mathbf { x } )$ is a vector of fixed nonlinear basis functions that depend on the input vector x. We showed that a prior distribution over w induced a corresponding prior distribution over functions $y ( \mathbf { x } , \mathbf { w } )$ . Given a training data set, we then evaluated the posterior distribution over w and thereby obtained the corresponding posterior distribution over regression functions, which in turn (with the addition of noise) implies a predictive distribution $p ( t | \mathbf { x } )$ for new input vectors x.

In the Gaussian process viewpoint, we dispense with the parametric model and instead define a prior probability distribution over functions directly. At first sight, it might seem difficult to work with a distribution over the uncountably infinite space of functions. However, as we shall see, for a finite training set we only need to consider the values of the function at the discrete set of input values ${ \bf x } _ { n }$ corresponding to the training set and test set data points, and so in practice we can work in a finite space.

Models equivalent to Gaussian processes have been widely studied in many different fields. For instance, in the geostatistics literature Gaussian process regression is known as kriging (Cressie, 1993). Similarly, ARMA (autoregressive moving average) models, Kalman filters, and radial basis function networks can all be viewed as forms of Gaussian process models. Reviews of Gaussian processes from a machine learning perspective can be found in MacKay (1998), Williams (1999), and MacKay (2003), and a comparison of Gaussian process models with alternative approaches is given in Rasmussen (1996). See also Rasmussen and Williams (2006) for a recent textbook on Gaussian processes.
