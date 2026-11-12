---
id: "tin-hieu-he-thong.11-2-2-the-metropolis-hastings-algorithm"
doc_id: "tin-hieu-he-thong"
title: "11.2.2 The Metropolis-Hastings algorithm"
level: 2
heading_path: ["Sampling Methods", "11.2.2 The Metropolis-Hastings algorithm"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11-2-1-markov-chains"
next_id: "tin-hieu-he-thong.11-3-gibbs-sampling"
block_ids: ["b5952", "b5953", "b5954", "b5955", "b5956", "b5957", "b5958", "b5959", "b5960", "b5961", "b5962"]
---

## 11.2.2 The Metropolis-Hastings algorithm

Earlier we introduced the basic Metropolis algorithm, without actually demonstrating that it samples from the required distribution. Before giving a proof, we first discuss a generalization, known as the Metropolis-Hastings algorithm (Hastings, 1970), to the case where the proposal distribution is no longer a symmetric function of its arguments. In particular at step τ of the algorithm, in which the current state is $\mathbf { z } ^ { ( \tau ) }$ , we draw a sample $\mathbf { z } ^ { \star }$ from the distribution $q _ { k } ( \mathbf { z } | \mathbf { z } ^ { ( \tau ) } )$ and then accept it with probability $A _ { k } ( { \bf z } ^ { \star } , { \bf z } _ { \tau } )$ where

A _ {k} (\mathbf {z} ^ {\star}, \mathbf {z} ^ {(\tau)}) = \min \left(1, \frac {\widetilde {p} (\mathbf {z} ^ {\star}) q _ {k} (\mathbf {z} ^ {(\tau)} | \mathbf {z} ^ {\star})}{\widetilde {p} (\mathbf {z} ^ {(\tau)}) q _ {k} (\mathbf {z} ^ {\star} | \mathbf {z} ^ {(\tau)})}\right).\tag{11.44}

Here k labels the members of the set of possible transitions being considered. Again, the evaluation of the acceptance criterion does not require knowledge of the normalizing constant $Z _ { p }$ in the probability distribution $p ( \mathbf { z } ) \bar { \mathbf { \rho } } = \widetilde { p } ( \mathbf { z } ) / Z _ { p }$ . For a symmetric proposal distribution the Metropolis-Hastings criterion (11.44) reduces to the standard Metropolis criterion given by (11.33).

We can show that $p ( \mathbf { z } )$ is an invariant distribution of the Markov chain defined by the Metropolis-Hastings algorithm by showing that detailed balance, defined by (11.40), is satisfied. Using (11.44) we have

\begin{array}{r c l} p (\mathbf {z}) q _ {k} (\mathbf {z} | \mathbf {z} ^ {\prime}) A _ {k} (\mathbf {z} ^ {\prime}, \mathbf {z}) & = & \min (p (\mathbf {z}) q _ {k} (\mathbf {z} | \mathbf {z} ^ {\prime}), p (\mathbf {z} ^ {\prime}) q _ {k} (\mathbf {z} ^ {\prime} | \mathbf {z})) \\ & = & \min (p (\mathbf {z} ^ {\prime}) q _ {k} (\mathbf {z} ^ {\prime} | \mathbf {z}), p (\mathbf {z}) q _ {k} (\mathbf {z} | \mathbf {z} ^ {\prime})) \\ & = & p (\mathbf {z} ^ {\prime}) q _ {k} (\mathbf {z} ^ {\prime} | \mathbf {z}) A _ {k} (\mathbf {z}, \mathbf {z} ^ {\prime}) \end{array}\tag{11.45}

as required.

The specific choice of proposal distribution can have a marked effect on the performance of the algorithm. For continuous state spaces, a common choice is a Gaussian centred on the current state, leading to an important trade-off in determining the variance parameter of this distribution. If the variance is small, then the

Schematic illustration of the use of an isotropic Gaussian proposal distribution (blue circle) to sample from a correlated multivariate Gaussian distribution (red ellipse) having very different standard deviations in different directions, using the Metropolis-Hastings algorithm. In order to keep the rejection rate low, the scale $\rho$ of the proposal distribution should be on the order of the smallest standard deviation $\sigma _ { \mathrm { m i n } }$ , which leads to random walk behaviour in which the number of steps separating states that are approximately independent is of order $( \sigma _ { \mathrm { m a x } } / \sigma _ { \mathrm { m i n } } ) ^ { 2 }$ where $\sigma _ { \mathrm { m a x } }$ is the largest standard deviation.

![image](images/part-003--c1eaa05d311b422976d9e44c28e95584c6881305cbe60a4c0bebed8bd4bb3c35.jpg)

proportion of accepted transitions will be high, but progress through the state space takes the form of a slow random walk leading to long correlation times. However, if the variance parameter is large, then the rejection rate will be high because, in the kind of complex problems we are considering, many of the proposed steps will be to states for which the probability $p ( \mathbf { z } )$ is low. Consider a multivariate distribution $p ( \mathbf { z } )$ having strong correlations between the components of $\mathbf { z } ,$ as illustrated in Figure 11.10. The scale $\rho$ of the proposal distribution should be as large as possible without incurring high rejection rates. This suggests that $\rho$ should be of the same order as the smallest length scale $\sigma _ { \mathrm { m i n } }$ . The system then explores the distribution along the more extended direction by means of a random walk, and so the number of steps to arrive at a state that is more or less independent of the original state is of order $( \sigma _ { \operatorname* { m a x } } / \sigma _ { \operatorname* { m i n } } ) ^ { 2 }$ . In fact in two dimensions, the increase in rejection rate as $\rho$ increases is offset by the larger steps sizes of those transitions that are accepted, and more generally for a multivariate Gaussian the number of steps required to obtain independent samples scales like $( \sigma _ { \mathrm { m a x } } / \sigma _ { 2 } ) ^ { 2 }$ where $\sigma _ { 2 }$ is the second-smallest standard deviation (Neal, 1993). These details aside, it remains the case that if the length scales over which the distributions vary are very different in different directions, then the Metropolis Hastings algorithm can have very slow convergence.
