---
id: "tin-hieu-he-thong.14-5-3-mixtures-of-experts"
doc_id: "tin-hieu-he-thong"
title: "14.5.3 Mixtures of experts"
level: 2
heading_path: ["Combining Models", "14.5.3 Mixtures of experts"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.14-5-2-mixtures-of-logistic-models"
next_id: "tin-hieu-he-thong.exercises-15"
block_ids: ["b7178", "b7179", "b7180", "b7181", "b7182", "b7183", "b7184", "b7185", "b7186"]
---

## 14.5.3 Mixtures of experts

In Section 14.5.1, we considered a mixture of linear regression models, and in Section 14.5.2 we discussed the analogous mixture of linear classifiers. Although these simple mixtures extend the flexibility of linear models to include more complex (e.g., multimodal) predictive distributions, they are still very limited. We can further increase the capability of such models by allowing the mixing coefficients themselves to be functions of the input variable, so that

p (\mathbf {t} | \mathbf {x}) = \sum_ {k = 1} ^ {K} \pi_ {k} (\mathbf {x}) p _ {k} (\mathbf {t} | \mathbf {x}).\tag{14.53}

This is known as a mixture of experts model (Jacobs et al., 1991) in which the mixing coefficients $\pi _ { k } ( { \bf x } )$ are known as gating functions and the individual component densities $p _ { k } ( \mathbf t | \mathbf x )$ are called experts. The notion behind the terminology is that different components can model the distribution in different regions of input space (they are ‘experts’ at making predictions in their own regions), and the gating functions determine which components are dominant in which region.

![image](images/part-004--1df7b65618d905c64c5b7eaa055851e4c88d60a3935e401ad93480a67584af79.jpg)

Figure 14.10 Illustration of a mixture of logistic regression models. The left plot shows data points drawn from two classes denoted red and blue, in which the background colour (which varies from pure red to pure blue) denotes the true probability of the class label. The centre plot shows the result of fitting a single logistic regression model using maximum likelihood, in which the background colour denotes the corresponding probability of the class label. Because the colour is a near-uniform purple, we see that the model assigns a probability of around 0.5 to each of the classes over most of input space. The right plot shows the result of fitting a mixture of two logistic regression models, which now gives much higher probability to the correct labels for many of the points in the blue class.

The gating functions $\pi _ { k } ( { \bf x } )$ must satisfy the usual constraints for mixing coefficients, namely $0 \leqslant \pi _ { k } ( \mathbf { x } ) \leqslant 1$ and $\begin{array} { r } { \sum _ { k } \pi _ { k } ( { \bf x } ) = 1 } \end{array}$ . They can therefore be represented, for example, by linear softmax models of the form (4.104) and (4.105). If the experts are also linear (regression or classification) models, then the whole model can be fitted efficiently using the EM algorithm, with iterative reweighted least squares being employed in the M step (Jordan and Jacobs, 1994).

Such a model still has significant limitations due to the use of linear models for the gating and expert functions. A much more flexible model is obtained by using a multilevel gating function to give the hierarchical mixture of experts, or HME model (Jordan and Jacobs, 1994). To understand the structure of this model, imagine a mixture distribution in which each component in the mixture is itself a mixture distribution. For simple unconditional mixtures, this hierarchical mixture is trivially equivalent to a single flat mixture distribution. However, when the mixing coefficients are input dependent, this hierarchical model becomes nontrivial. The HME model can also be viewed as a probabilistic version of decision trees discussed in Section 14.4 and can again be trained efficiently by maximum likelihood using an EM algorithm with IRLS in the M step. A Bayesian treatment of the HME has been given by Bishop and Svensen (2003) based on variational inference.´

We shall not discuss the HME in detail here. However, it is worth pointing out the close connection with the mixture density network discussed in Section 5.6. The principal advantage of the mixtures of experts model is that it can be optimized by EM in which the M step for each mixture component and gating model involves a convex optimization (although the overall optimization is nonconvex). By contrast, the advantage of the mixture density network approach is that the component densities and the mixing coefficients share the hidden units of the neural network. Furthermore, in the mixture density network, the splits of the input space are further relaxed compared to the hierarchical mixture of experts in that they are not only soft, and not constrained to be axis aligned, but they can also be nonlinear.
