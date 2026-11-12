---
id: "tin-hieu-he-thong.11-2-markov-chain-monte-carlo"
doc_id: "tin-hieu-he-thong"
title: "11.2. Markov Chain Monte Carlo"
level: 2
heading_path: ["Sampling Methods", "11.2. Markov Chain Monte Carlo"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.ip-algorithm"
next_id: "tin-hieu-he-thong.11-2-1-markov-chains"
block_ids: ["b5916", "b5917", "b5918", "b5919", "b5920", "b5921", "b5922", "b5923", "b5924", "b5925", "b5926", "b5927", "b5928", "b5929", "b5930", "b5931"]
---

## 11.2. Markov Chain Monte Carlo

In the previous section, we discussed the rejection sampling and importance sampling strategies for evaluating expectations of functions, and we saw that they suffer from severe limitations particularly in spaces of high dimensionality. We therefore turn in this section to a very general and powerful framework called Markov chain Monte Carlo (MCMC), which allows sampling from a large class of distributions, and which scales well with the dimensionality of the sample space. Markov chain Monte Carlo methods have their origins in physics (Metropolis and Ulam, 1949), and it was only towards the end of the 1980s that they started to have a significant impact in the field of statistics.

As with rejection and importance sampling, we again sample from a proposal distribution. This time, however, we maintain a record of the current state $\bar { \mathbf { z } } ^ { ( \tau ) }$ , and the proposal distribution $q ( \mathbf { z } | \mathbf { z } ^ { ( \tau ) } )$ ) depends on this current state, and so the sequence of samples ${ \bf z } ^ { ( 1 ) } , { \bf z } ^ { ( 2 ) } , . . .$ . forms a Markov chain. Again, if we write $p ( \mathbf { z } ) = \widetilde { p } ( \mathbf { \bar { z } } ) / Z _ { p }$ we will assume that $\widetilde { p } ( \mathbf { z } )$ can readily be evaluated for any given value of $\mathbf { z } ,$ , although the value of $Z _ { p }$ may be unknown. The proposal distribution itself is chosen to be sufficiently simple that it is straightforward to draw samples from it directly. At each cycle of the algorithm, we generate a candidate sample $\mathbf { z } ^ { \star }$ from the proposal distribution and then accept the sample according to an appropriate criterion.

In the basic Metropolis algorithm (Metropolis et al., 1953), we assume that the proposal distribution is symmetric, that is $q ( \mathbf { z } _ { A } | \mathbf { z } _ { B } ) = q ( \mathbf { z } _ { B } | \mathbf { z } _ { A } )$ for all values of $\mathbf { z } _ { A }$ and $\mathbf { z } _ { B }$ . The candidate sample is then accepted with probability

A (\mathbf {z} ^ {\star}, \mathbf {z} ^ {(\tau)}) = \min \left(1, \frac {\widetilde {p} (\mathbf {z} ^ {\star})}{\widetilde {p} (\mathbf {z} ^ {(\tau)})}\right).\tag{11.33}

This can be achieved by choosing a random number u with uniform distribution over the unit interval $( 0 , 1 )$ and then accepting the sample if $A ( \mathbf { z } ^ { \star } , \mathbf { z } ^ { ( \tau ) } ) > u$ . Note that if the step from $\mathbf { z } ^ { ( \tau ) }$ to $\mathbf { z } ^ { \star }$ causes an increase in the value of $p ( \mathbf { z } )$ , then the candidate point is certain to be kept.

If the candidate sample is accepted, then $\mathbf { z } ^ { ( \tau + 1 ) } = \mathbf { z } ^ { \star }$ , otherwise the candidate point $\mathbf { z } ^ { \star }$ is discarded, $\mathbf { z } ^ { ( \hat { \tau } + 1 ) }$ is set to $\mathbf { z } ^ { ( \tau ) }$ and another candidate sample is drawn from the distribution ${ \boldsymbol { q } } ( \mathbf { z } | \mathbf { z } ^ { ( \tau + 1 ) } )$ . This is in contrast to rejection sampling, where rejected samples are simply discarded. In the Metropolis algorithm when a candidate point is rejected, the previous sample is included instead in the final list of samples, leading to multiple copies of samples. Of course, in a practical implementation, only a single copy of each retained sample would be kept, along with an integer weighting factor recording how many times that state appears. As we shall see, as long as $q ( { \bf z } _ { A } | { \bf z } _ { B } )$ is positive for any values of $\mathbf { z } _ { A }$ and $\mathbf { z } _ { B }$ (this is a sufficient but not necessary condition), the distribution of $\mathbf { z } ^ { ( \tau ) }$ tends to $p ( \mathbf { z } )$ as $\tau \to \infty$ . It should be emphasized, however, that the sequence ${ \bf z } ^ { ( 1 ) } , { \bf z } ^ { ( 2 ) } , . . .$ . is not a set of independent samples from $p ( \mathbf { z } )$ because successive samples are highly correlated. If we wish to obtain independent samples, then we can discard most of the sequence and just retain every $\hat { M } ^ { \mathrm { t h } }$ sample. For M sufficiently large, the retained samples will for all practical purposes be independent. Figure 11.9 shows a simple illustrative example of sampling from a two-dimensional Gaussian distribution using the Metropolis algorithm in which the proposal distribution is an isotropic Gaussian.

Further insight into the nature of Markov chain Monte Carlo algorithms can be gleaned by looking at the properties of a specific example, namely a simple random

A simple illustration using Metropolis algorithm to sample from a Gaussian distribution whose one standard-deviation contour is shown by the ellipse. The proposal distribution is an isotropic Gaussian distribution whose standard deviation is 0.2. Steps that are accepted are shown as green lines, and rejected steps are shown in red. A total of 150 candidate samples are generated, of which 43 are rejected.

![image](images/part-003--be575be2ca005f2fb8de6d7f9c9eb903d8a7cdac70682b3735e5b55e1a462524.jpg)

walk. Consider a state space z consisting of the integers, with probabilities

p (z ^ {(\tau + 1)} = z ^ {(\tau)}) = 0. 5\tag{11.34}

p (z ^ {(\tau + 1)} = z ^ {(\tau)} + 1) = 0. 2 5\tag{11.35}

p (z ^ {(\tau + 1)} = z ^ {(\tau)} - 1) = 0. 2 5\tag{11.36}

Exercise 11.10

where $z ^ { ( \tau ) }$ denotes the state at step τ. If the initial state is $z ^ { ( 1 ) } = 0$ , then by symmetry the expected state at time $\tau$ will also be zero $\mathbb { E } [ z ^ { ( \tau ) } ] = 0$ , and similarly it is easily seen that E $\bar { \iota } [ ( z ^ { ( \tau ) } ) ^ { 2 } ] = \tau / 2$ . Thus after τ steps, the random walk has only travelled a distance that on average is proportional to the square root of $\tau$ . This square root dependence is typical of random walk behaviour and shows that random walks are very inefficient in exploring the state space. As we shall see, a central goal in designing Markov chain Monte Carlo methods is to avoid random walk behaviour.
