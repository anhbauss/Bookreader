---
id: "tin-hieu-he-thong.josiah-willard-gibbs-1839-1903"
doc_id: "tin-hieu-he-thong"
title: "Josiah Willard Gibbs 1839\u20131903"
level: 2
heading_path: ["Sampling Methods", "Josiah Willard Gibbs 1839\u20131903"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.gibbs-sampling"
next_id: "tin-hieu-he-thong.11-4-slice-sampling"
block_ids: ["b5977", "b5978", "b5979", "b5980", "b5981", "b5982", "b5983", "b5984", "b5985", "b5986", "b5987", "b5988", "b5989", "b5990", "b5991", "b5992", "b5993", "b5994", "b5995", "b5996", "b5997", "b5998", "b5999", "b6000"]
---

## Josiah Willard Gibbs 1839–1903

Gibbs spent almost his entire life living in a house built by his father in New Haven, Connecticut. In 1863, Gibbs was granted the first PhD in engineering in the United States, and in 1871 he was appointed to

States at Yale, a post for which he received no salary because at the time he had no publications. He developed the field of vector analysis and made contributions to crystallography and planetary orbits. His most famous work, entitled On the Equilibrium of Het-, laid the foundations for the science of physical chemistry.

the first chair of mathematical physics in the United

To show that this procedure samples from the required distribution, we first of all note that the distribution $p ( \mathbf { z } )$ is an invariant of each of the Gibbs sampling steps individually and hence of the whole Markov chain. This follows from the fact that when we sample from $p ( z _ { i } | \{ \mathbf { z } _ { \backslash i } )$ , the marginal distribution $p ( \mathbf { z } _ { \backslash i } )$ is clearly invariant because the value of $\mathbf { z } _ { \backslash i }$ is unchanged. Also, each step by definition samples from the correct conditional distribution $p ( \boldsymbol { z } _ { i } | \mathbf { z } _ { \backslash i } )$ . Because these conditional and marginal distributions together specify the joint distribution, we see that the joint distribution is itself invariant.

The second requirement to be satisfied in order that the Gibbs sampling procedure samples from the correct distribution is that it be ergodic. A sufficient condition for ergodicity is that none of the conditional distributions be anywhere zero. If this is the case, then any point in z space can be reached from any other point in a finite number of steps involving one update of each of the component variables. If this requirement is not satisfied, so that some of the conditional distributions have zeros, then ergodicity, if it applies, must be proven explicitly.

The distribution of initial states must also be specified in order to complete the algorithm, although samples drawn after many iterations will effectively become independent of this distribution. Of course, successive samples from the Markov chain will be highly correlated, and so to obtain samples that are nearly independent it will be necessary to subsample the sequence.

We can obtain the Gibbs sampling procedure as a particular instance of the Metropolis-Hastings algorithm as follows. Consider a Metropolis-Hastings sampling step involving the variable $z _ { k }$ in which the remaining variables $\mathbf { z } _ { \backslash k }$ remain fixed, and for which the transition probability from z to $\mathbf { z } ^ { \star }$ is given by $q _ { k } ( \mathbf { \dot { z } } ^ { \star } \vert \mathbf { z } ) = p ( z _ { k } ^ { \star } \vert \mathbf { z } _ { \backslash k } )$ We note that $\mathbf { z } _ { \mathrm { backslash } k } ^ { \star } = \mathbf { z } _ { \mathrm { \backslash } k }$ because these components are unchanged by the sampling step. Also, $p ( \mathbf { z } ) = p ( z _ { k } | \mathbf { z } _ { \backslash k } ) p ( \mathbf { z } _ { \backslash k } )$ . Thus the factor that determines the acceptance probability in the Metropolis-Hastings (11.44) is given by

A (\mathbf {z} ^ {\star}, \mathbf {z}) = \frac {p (\mathbf {z} ^ {\star}) q _ {k} (\mathbf {z} | \mathbf {z} ^ {\star})}{p (\mathbf {z}) q _ {k} (\mathbf {z} ^ {\star} | \mathbf {z})} = \frac {p (z _ {k} ^ {\star} | \mathbf {z} _ {\backslash k} ^ {\star}) p (\mathbf {z} _ {\backslash k} ^ {\star}) p (z _ {k} | \mathbf {z} _ {\backslash k} ^ {\star})}{p (z _ {k} | \mathbf {z} _ {\backslash k}) p (\mathbf {z} _ {\backslash k}) p (z _ {k} ^ {\star} | \mathbf {z} _ {\backslash k})} = 1\tag{11.49}

where we have used $\mathbf { z } _ { \mathrm { ~ } k } ^ { \star } = \mathbf { z } _ { \backslash k }$ . Thus the Metropolis-Hastings steps are always accepted.

As with the Metropolis algorithm, we can gain some insight into the behaviour of Gibbs sampling by investigating its application to a Gaussian distribution. Consider a correlated Gaussian in two variables, as illustrated in Figure 11.11, having conditional distributions of width l and marginal distributions of width L. The typical step size is governed by the conditional distributions and will be of order l. Because the state evolves according to a random walk, the number of steps needed to obtain independent samples from the distribution will be of order $( L / \bar { l ) ^ { 2 } }$ . Of course if the Gaussian distribution were uncorrelated, then the Gibbs sampling procedure would be optimally efficient. For this simple problem, we could rotate the coordinate system in order to decorrelate the variables. However, in practical applications it will generally be infeasible to find such transformations.

One approach to reducing random walk behaviour in Gibbs sampling is called over-relaxation (Adler, 1981). In its original form, this applies to problems for which

Figure 11.11

Illustration of Gibbs sampling by alternate updates of two variables whose distribution is a correlated Gaussian. The step size is governed by the standard deviation of the conditional distribution (green curve), and is $O ( l )$ , leading to slow progress in the direction of elongation of the joint distribution (red ellipse). The number of steps needed to obtain an independent sample from the distribution is $\dot { \cal O } ( ( L / l ) ^ { 2 } )$ ).

![image](images/part-003--acbed698f58a05c63e5c1457e5c02a75bf173e39bd1882076c23582bd161d47b.jpg)

the conditional distributions are Gaussian, which represents a more general class of distributions than the multivariate Gaussian because, for example, the non-Gaussian distribution $p ( z , y ) \propto \exp ( - z ^ { 2 } y ^ { 2 } )$ has Gaussian conditional distributions. At each step of the Gibbs sampling algorithm, the conditional distribution for a particular component $z _ { i }$ has some mean $\mu _ { i }$ and some variance $\sigma _ { i } ^ { 2 }$ . In the over-relaxation framework, the value of $z _ { i }$ is replaced with

z _ {i} ^ {\prime} = \mu_ {i} + \alpha (z _ {i} - \mu_ {i}) + \sigma_ {i} (1 - \alpha_ {i} ^ {2}) ^ {1 / 2} \nu\tag{11.50}

where ν is a Gaussian random variable with zero mean and unit variance, and α is a parameter such that $- 1 < \alpha < 1$ . For $\alpha = 0$ , the method is equivalent to standard Gibbs sampling, and for $\alpha < 0$ the step is biased to the opposite side of the mean. This step leaves the desired distribution invariant because if $z _ { i }$ has mean $\mu _ { i }$ and variance $\sigma _ { i } ^ { \bar { 2 } }$ , then so too does $z _ { i } ^ { \prime } .$ . The effect of over-relaxation is to encourage directed motion through state space when the variables are highly correlated. The framework of ordered over-relaxation (Neal, 1999) generalizes this approach to non-Gaussian distributions.

The practical applicability of Gibbs sampling depends on the ease with which samples can be drawn from the conditional distributions $p ( \boldsymbol { z } _ { k } | \mathbf { z } _ { \backslash k } )$ . In the case of probability distributions specified using graphical models, the conditional distributions for individual nodes depend only on the variables in the corresponding Markov blankets, as illustrated in Figure 11.12. For directed graphs, a wide choice of conditional distributions for the individual nodes conditioned on their parents will lead to conditional distributions for Gibbs sampling that are log concave. The adaptive rejection sampling methods discussed in Section 11.1.3 therefore provide a framework for Monte Carlo sampling from directed graphs with broad applicability.

If the graph is constructed using distributions from the exponential family, and if the parent-child relationships preserve conjugacy, then the full conditional distributions arising in Gibbs sampling will have the same functional form as the original conditional distributions (conditioned on the parents) defining each node, and so standard sampling techniques can be employed. In general, the full conditional distributions will be of a complex form that does not permit the use of standard sampling algorithms. However, if these conditionals are log concave, then sampling can be done efficiently using adaptive rejection sampling (assuming the corresponding variable is a scalar).

Figure 11.12 The Gibbs sampling method requires samples to be drawn from the conditional distribution of a variable conditioned on the remaining variables. For graphical models, this conditional distribution is a function only of the states of the nodes in the Markov blanket. For an undirected graph this comprises the set of neighbours, as shown on the left, while for a directed graph the Markov blanket comprises the parents, the children, and the co-parents, as shown on the right.

![image](images/part-003--6b8c80cfb8a0a39f7a8b75952b26b40fdbd6cd5eec051d811eec42b0aaf10f4f.jpg)

If, at each stage of the Gibbs sampling algorithm, instead of drawing a sample from the corresponding conditional distribution, we make a point estimate of the variable given by the maximum of the conditional distribution, then we obtain the iterated conditional modes (ICM) algorithm discussed in Section 8.3.3. Thus ICM can be seen as a greedy approximation to Gibbs sampling.

Because the basic Gibbs sampling technique considers one variable at a time, there are strong dependencies between successive samples. At the opposite extreme, if we could draw samples directly from the joint distribution (an operation that we are supposing is intractable), then successive samples would be independent. We can hope to improve on the simple Gibbs sampler by adopting an intermediate strategy in which we sample successively from groups of variables rather than individual variables. This is achieved in the blocking Gibbs sampling algorithm by choosing blocks of variables, not necessarily disjoint, and then sampling jointly from the variables in each block in turn, conditioned on the remaining variables (Jensen et al., 1995).
