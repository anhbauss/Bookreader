---
id: "tin-hieu-he-thong.11-5-2-hybrid-monte-carlo"
doc_id: "tin-hieu-he-thong"
title: "11.5.2 Hybrid Monte Carlo"
level: 2
heading_path: ["Sampling Methods", "11.5.2 Hybrid Monte Carlo"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.william-hamilton-1805-1865"
next_id: "tin-hieu-he-thong.11-6-estimating-the-partition-function"
block_ids: ["b6058", "b6059", "b6060", "b6061", "b6062", "b6063", "b6064", "b6065", "b6066", "b6067", "b6068", "b6069", "b6070", "b6071", "b6072", "b6073", "b6074", "b6075", "b6076", "b6077"]
---

## 11.5.2 Hybrid Monte Carlo

As we discussed in the previous section, for a nonzero step size $\epsilon ,$ the discretization of the leapfrog algorithm will introduce errors into the integration of the Hamiltonian dynamical equations. Hybrid Monte Carlo (Duane et al., 1987; Neal, 1996) combines Hamiltonian dynamics with the Metropolis algorithm and thereby removes any bias associated with the discretization.

Specifically, the algorithm uses a Markov chain consisting of alternate stochastic updates of the momentum variable r and Hamiltonian dynamical updates using the leapfrog algorithm. After each application of the leapfrog algorithm, the resulting candidate state is accepted or rejected according to the Metropolis criterion based on the value of the Hamiltonian $H$ . Thus if $( \mathbf { z } , \mathbf { r } )$ is the initial state and $\left( \mathbf { z } ^ { \star } , \mathbf { r } ^ { \star } \right)$ is the state after the leapfrog integration, then this candidate state is accepted with probability

\min \left(1, \exp \{H (\mathbf {z}, \mathbf {r}) - H (\mathbf {z} ^ {\star}, \mathbf {r} ^ {\star}) \}\right).\tag{11.67}

If the leapfrog integration were to simulate the Hamiltonian dynamics perfectly, then every such candidate step would automatically be accepted because the value of H would be unchanged. Due to numerical errors, the value of $H$ may sometimes decrease, and we would like the Metropolis criterion to remove any bias due to this effect and ensure that the resulting samples are indeed drawn from the required distribution. In order for this to be the case, we need to ensure that the update equations corresponding to the leapfrog integration satisfy detailed balance (11.40). This is easily achieved by modifying the leapfrog scheme as follows.

Before the start of each leapfrog integration sequence, we choose at random, with equal probability, whether to integrate forwards in time (using step size $\epsilon )$ or backwards in time (using step size ). We first note that the leapfrog integration scheme (11.64), (11.65), and (11.66) is time-reversible, so that integration for $L$ steps using step size $- \epsilon$ will exactly undo the effect of integration for $L$ steps using step size $\epsilon .$ Next we show that the leapfrog integration preserves phase-space volume exactly. This follows from the fact that each step in the leapfrog scheme updates either a $z _ { i }$ variable or an $r _ { i }$ variable by an amount that is a function only of the other variable. As shown in Figure 11.14, this has the effect of shearing a region of phase space while not altering its volume.

Finally, we use these results to show that detailed balance holds. Consider a small region $\mathcal { R }$ of phase space that, under a sequence of $L$ leapfrog iterations of step size $\epsilon ,$ maps to a region $\mathcal { R } ^ { \prime }$ . Using conservation of volume under the leapfrog iteration, we see that if $\mathcal { R }$ has volume $\delta \bar { V }$ then so too will $\mathcal { R } ^ { \prime }$ . If we choose an initial point from the distribution (11.63) and then update it using $L$ leapfrog interactions, the probability of the transition going from $\mathcal { R }$ to $\mathcal { R } ^ { \prime }$ is given by

\frac {1}{Z _ {H}} \exp (- H (\mathcal {R})) \delta V \frac {1}{2} \min \left\{1, \exp (- H (\mathcal {R}) + H (\mathcal {R} ^ {\prime})) \right\}.\tag{11.68}

where the factor of $1 / 2$ arises from the probability of choosing to integrate with a positive step size rather than a negative one. Similarly, the probability of starting in region $\mathcal { R } ^ { \prime }$ and integrating backwards in time to end up in region $\mathcal { R }$ is given by

![image](images/part-004--d4c1f688bc7e9c4de20a819d0672d7e65311268950f3f6f791c29e338b920986.jpg)

![image](images/part-004--39473787f5c529bdd85a8202c5861018d840c55aca6ec085fe66019dc007b388.jpg)

Figure 11.14 Each step of the leapfrog algorithm (11.64)–(11.66) modifies either a position variable $z _ { i }$ or a momentum variable $r _ { i }$ . Because the change to one variable is a function only of the other, any region in phase space will be sheared without change of volume.

\frac {1}{Z _ {H}} \exp (- H (\mathcal {R} ^ {\prime})) \delta V \frac {1}{2} \min \left\{1, \exp (- H (\mathcal {R} ^ {\prime}) + H (\mathcal {R})) \right\}.\tag{11.69}

Exercise 11.17

It is easily seen that the two probabilities (11.68) and (11.69) are equal, and hence detailed balance holds. Note that this proof ignores any overlap between the regions $\mathcal { R }$ and $\mathcal { R } ^ { \prime }$ but is easily generalized to allow for such overlap.

It is not difficult to construct examples for which the leapfrog algorithm returns to its starting position after a finite number of iterations. In such cases, the random replacement of the momentum values before each leapfrog integration will not be sufficient to ensure ergodicity because the position variables will never be updated. Such phenomena are easily avoided by choosing the magnitude of the step size at random from some small interval, before each leapfrog integration.

We can gain some insight into the behaviour of the hybrid Monte Carlo algorithm by considering its application to a multivariate Gaussian. For convenience, consider a Gaussian distribution $p ( \mathbf { z } )$ with independent components, for which the Hamiltonian is given by

H (\mathbf {z}, \mathbf {r}) = \frac {1}{2} \sum_ {i} \frac {1}{\sigma_ {i} ^ {2}} z _ {i} ^ {2} + \frac {1}{2} \sum_ {i} r _ {i} ^ {2}.\tag{11.70}

Our conclusions will be equally valid for a Gaussian distribution having correlated components because the hybrid Monte Carlo algorithm exhibits rotational isotropy. During the leapfrog integration, each pair of phase-space variables $z _ { i } , r _ { i }$ evolves independently. However, the acceptance or rejection of the candidate point is based on the value of $H _ { \cdot }$ , which depends on the values of all of the variables. Thus, a significant integration error in any one of the variables could lead to a high probability of rejection. In order that the discrete leapfrog integration be a reasonably good approximation to the true continuous-time dynamics, it is necessary for the leapfrog integration scale  to be smaller than the shortest length-scale over which the potential is varying significantly. This is governed by the smallest value of $\sigma _ { i }$ which we denote by $\sigma _ { \mathrm { m i n } }$ . Recall that the goal of the leapfrog integration in hybrid Monte Carlo is to move a substantial distance through phase space to a new state that is relatively independent of the initial state and still achieve a high probability of acceptance. In order to achieve this, the leapfrog integration must be continued for a number of iterations of order ${ \sigma _ { \operatorname* { m a x } } } / { \sigma _ { \operatorname* { m i n } } }$

By contrast, consider the behaviour of a simple Metropolis algorithm with an isotropic Gaussian proposal distribution of variance $s ^ { 2 }$ , considered earlier. In order to avoid high rejection rates, the value of s must be of order $\sigma _ { \mathrm { m i n } }$ . The exploration of state space then proceeds by a random walk and takes of order $( \sigma _ { \operatorname* { m a x } } / \sigma _ { \operatorname* { m i n } } ) ^ { 2 }$ steps to arrive at a roughly independent state.
