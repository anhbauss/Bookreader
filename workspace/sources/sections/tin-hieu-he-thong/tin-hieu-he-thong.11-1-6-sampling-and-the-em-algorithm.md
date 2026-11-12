---
id: "tin-hieu-he-thong.11-1-6-sampling-and-the-em-algorithm"
doc_id: "tin-hieu-he-thong"
title: "11.1.6 Sampling and the EM algorithm"
level: 2
heading_path: ["Sampling Methods", "11.1.6 Sampling and the EM algorithm"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11-1-5-sampling-importance-resampling"
next_id: "tin-hieu-he-thong.ip-algorithm"
block_ids: ["b5898", "b5899", "b5900", "b5901", "b5902", "b5903", "b5904", "b5905", "b5906"]
---

## 11.1.6 Sampling and the EM algorithm

In addition to providing a mechanism for direct implementation of the Bayesian framework, Monte Carlo methods can also play a role in the frequentist paradigm, for example to find maximum likelihood solutions. In particular, sampling methods can be used to approximate the E step of the EM algorithm for models in which the E step cannot be performed analytically. Consider a model with hidden variables Z, visible (observed) variables $\mathbf { X } ,$ , and parameters $\pmb { \theta } .$ . The function that is optimized with respect to $\pmb \theta$ in the M step is the expected complete-data log likelihood, given by

Q (\pmb {\theta}, \pmb {\theta} ^ {\mathrm{old}}) = \int p (\mathbf {Z} | \mathbf {X}, \pmb {\theta} ^ {\mathrm{old}}) \ln p (\mathbf {Z}, \mathbf {X} | \pmb {\theta}) \mathrm{d} \mathbf {Z}.\tag{11.28}

We can use sampling methods to approximate this integral by a finite sum over samples $\{ \mathbf { Z } ^ { ( l ) } \}$ , which are drawn from the current estimate for the posterior distribution $p ( { \bf Z } | { \bf X } , \boldsymbol { \theta } ^ { \mathrm { o l d } } )$ , so that

Q (\boldsymbol {\theta}, \boldsymbol {\theta} ^ {\mathrm{old}}) \simeq \frac {1}{L} \sum_ {l = 1} ^ {L} \ln p (\mathbf {Z} ^ {(l)}, \mathbf {X} | \boldsymbol {\theta}).\tag{11.29}

The $Q$ function is then optimized in the usual way in the M step. This procedure is called the Monte Carlo EM algorithm.

It is straightforward to extend this to the problem of finding the mode of the posterior distribution over $\pmb \theta$ (the MAP estimate) when a prior distribution $p ( \pmb \theta )$ has been defined, simply by adding ln $p ( \pmb \theta )$ to the function $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ before performing the M step.

A particular instance of the Monte Carlo EM algorithm, called stochastic EM, arises if we consider a finite mixture model, and draw just one sample at each E step. Here the latent variable Z characterizes which of the K components of the mixture is responsible for generating each data point. In the E step, a sample of Z is taken from the posterior distribution $p ( { \bf Z } | { \bf X } , \boldsymbol { \theta } ^ { \mathrm { { \bar { o l d } } } } )$ where X is the data set. This effectively makes a hard assignment of each data point to one of the components in the mixture. In the M step, this sampled approximation to the posterior distribution is used to update the model parameters in the usual way.

Now suppose we move from a maximum likelihood approach to a full Bayesian treatment in which we wish to sample from the posterior distribution over the parameter vector θ. In principle, we would like to draw samples from the joint posterior $p ( \pmb { \theta } , \mathbf { Z } | \mathbf { X } )$ , but we shall suppose that this is computationally difficult. Suppose further that it is relatively straightforward to sample from the complete-data parameter posterior $p ( \pmb { \theta } | \mathbf { Z } , \mathbf { X } )$ . This inspires the data augmentation algorithm, which alternates between two steps known as the I-step (imputation step, analogous to an E step) and the P-step (posterior step, analogous to an M step).
