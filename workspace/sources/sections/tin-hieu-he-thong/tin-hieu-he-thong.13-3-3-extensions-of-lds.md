---
id: "tin-hieu-he-thong.13-3-3-extensions-of-lds"
doc_id: "tin-hieu-he-thong"
title: "13.3.3 Extensions of LDS"
level: 2
heading_path: ["Sequential Data", "13.3.3 Extensions of LDS"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.13-3-2-learning-in-lds"
next_id: "tin-hieu-he-thong.13-3-4-particle-filters"
block_ids: ["b6913", "b6914", "b6915", "b6916", "b6917"]
---

## 13.3.3 Extensions of LDS

As with the hidden Markov model, there is considerable interest in extending the basic linear dynamical system in order to increase its capabilities. Although the assumption of a linear-Gaussian model leads to efficient algorithms for inference and learning, it also implies that the marginal distribution of the observed variables is simply a Gaussian, which represents a significant limitation. One simple extension of the linear dynamical system is to use a Gaussian mixture as the initial distribution for $\mathbf { z } _ { 1 }$ . If this mixture has K components, then the forward recursion equations (13.85) will lead to a mixture of K Gaussians over each hidden variable $\mathbf { z } _ { n }$ , and so the model is again tractable.

For many applications, the Gaussian emission density is a poor approximation. If instead we try to use a mixture of K Gaussians as the emission density, then the posterior $\widehat { \alpha } ( \mathbf { z } _ { 1 } )$ will also be a mixture of K Gaussians. However, from (13.85) the posterior $\widehat { \alpha } ( \mathbf { z } _ { 2 } )$ will comprise a mixture of $K ^ { 2 }$ Gaussians, and so on, with $\widehat { \alpha } ( \mathbf { z } _ { n } )$ being given by a mixture of $K ^ { n }$ Gaussians. Thus the number of components grows exponentially with the length of the chain, and so this model is impractical.

More generally, introducing transition or emission models that depart from the linear-Gaussian (or other exponential family) model leads to an intractable inference problem. We can make deterministic approximations such as assumed density filtering or expectation propagation, or we can make use of sampling methods, as discussed in Section 13.3.4. One widely used approach is to make a Gaussian approximation by linearizing around the mean of the predicted distribution, which gives rise to the extended Kalmanfilter (Zarchan and Musoff, 2005).

As with hidden Markov models, we can develop interesting extensions of the basic linear dynamical system by expanding its graphical representation. For example, the switching state space model (Ghahramani and Hinton, 1998) can be viewed as a combination of the hidden Markov model with a set of linear dynamical systems. The model has multiple Markov chains of continuous linear-Gaussian latent variables, each of which is analogous to the latent chain of the linear dynamical system discussed earlier, together with a Markov chain of discrete variables of the form used in a hidden Markov model. The output at each time step is determined by stochastically choosing one of the continuous latent chains, using the state of the discrete latent variable as a switch, and then emitting an observation from the corresponding conditional output distribution. Exact inference in this model is intractable, but variational methods lead to an efficient inference scheme involving forward-backward recursions along each of the continuous and discrete Markov chains independently. Note that, if we consider multiple chains of discrete latent variables, and use one as the switch to select from the remainder, we obtain an analogous model having only discrete latent variables known as the switching hidden Markov model.
