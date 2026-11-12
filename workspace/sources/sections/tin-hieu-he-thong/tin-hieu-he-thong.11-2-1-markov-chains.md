---
id: "tin-hieu-he-thong.11-2-1-markov-chains"
doc_id: "tin-hieu-he-thong"
title: "11.2.1 Markov chains"
level: 2
heading_path: ["Sampling Methods", "11.2.1 Markov chains"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11-2-markov-chain-monte-carlo"
next_id: "tin-hieu-he-thong.11-2-2-the-metropolis-hastings-algorithm"
block_ids: ["b5932", "b5933", "b5934", "b5935", "b5936", "b5937", "b5938", "b5939", "b5940", "b5941", "b5942", "b5943", "b5944", "b5945", "b5946", "b5947", "b5948", "b5949", "b5950", "b5951"]
---

## 11.2.1 Markov chains

Before discussing Markov chain Monte Carlo methods in more detail, it is useful to study some general properties of Markov chains in more detail. In particular, we ask under what circumstances will a Markov chain converge to the desired distribution. A first-order Markov chain is defined to be a series of random variables $\mathbf { z } ^ { ( 1 ) } , \ldots , \mathbf { z } ^ { ( M ) }$ such that the following conditional independence property holds for $m \in \{ 1 , \ldots , M - 1 \}$

p (\mathbf {z} ^ {(m + 1)} | \mathbf {z} ^ {(1)}, \dots , \mathbf {z} ^ {(m)}) = p (\mathbf {z} ^ {(m + 1)} | \mathbf {z} ^ {(m)}).\tag{11.37}

This of course can be represented as a directed graph in the form of a chain, an example of which is shown in Figure 8.38. We can then specify the Markov chain by giving the probability distribution for the initial variable $p ( \mathbf { z } ^ { ( 0 ) } )$ ) together with the conditional probabilities for subsequent variables in the form of transition probabilities $T _ { m } ( \mathbf { z } ^ { ( \hat { m } ) } , \mathbf { z } ^ { ( m + 1 ) } ) \equiv p ( \mathbf { z } ^ { ( m + 1 ) } | \mathbf { z } ^ { ( m ) } )$ . A Markov chain is called homogeneous if the transition probabilities are the same for all m.

The marginal probability for a particular variable can be expressed in terms of the marginal probability for the previous variable in the chain in the form

p (\mathbf {z} ^ {(m + 1)}) = \sum_ {\mathbf {z} ^ {(m)}} p (\mathbf {z} ^ {(m + 1)} | \mathbf {z} ^ {(m)}) p (\mathbf {z} ^ {(m)}).\tag{11.38}

A distribution is said to be invariant, or stationary, with respect to a Markov chain if each step in the chain leaves that distribution invariant. Thus, for a homogeneous Markov chain with transition probabilities $T ( \mathbf { z } ^ { \prime } , \mathbf { z } )$ , the distribution $p ^ { \star } ( \mathbf { z } )$ is invariant if

p ^ {\star} (\mathbf {z}) = \sum_ {\mathbf {z} ^ {\prime}} T (\mathbf {z} ^ {\prime}, \mathbf {z}) p ^ {\star} (\mathbf {z} ^ {\prime}).\tag{11.39}

Note that a given Markov chain may have more than one invariant distribution. For instance, if the transition probabilities are given by the identity transformation, then any distribution will be invariant.

A sufficient (but not necessary) condition for ensuring that the required distribution $p ( \mathbf { z } )$ is invariant is to choose the transition probabilities to satisfy the property of detailed balance, defined by

p ^ {\star} (\mathbf {z}) T (\mathbf {z}, \mathbf {z} ^ {\prime}) = p ^ {\star} (\mathbf {z} ^ {\prime}) T (\mathbf {z} ^ {\prime}, \mathbf {z})\tag{11.40}

for the particular distribution $p ^ { \star } ( \mathbf { z } )$ . It is easily seen that a transition probability that satisfies detailed balance with respect to a particular distribution will leave that distribution invariant, because

\sum_ {\mathbf {z} ^ {\prime}} p ^ {\star} (\mathbf {z} ^ {\prime}) T (\mathbf {z} ^ {\prime}, \mathbf {z}) = \sum_ {\mathbf {z} ^ {\prime}} p ^ {\star} (\mathbf {z}) T (\mathbf {z}, \mathbf {z} ^ {\prime}) = p ^ {\star} (\mathbf {z}) \sum_ {\mathbf {z} ^ {\prime}} p (\mathbf {z} ^ {\prime} | \mathbf {z}) = p ^ {\star} (\mathbf {z}).\tag{11.41}

A Markov chain that respects detailed balance is said to be reversible.

Our goal is to use Markov chains to sample from a given distribution. We can achieve this if we set up a Markov chain such that the desired distribution is invariant. However, we must also require that for $m \to \infty$ , the distribution $p ( \mathbf { z } ^ { ( m ) } )$ ) converges to the required invariant distribution $p ^ { \star } ( \mathbf { z } )$ , irrespective of the choice of initial distribution ${ \bf \bar { \rho } } _ { p } ( { \bf z } ^ { ( 0 ) } )$ . This property is called ergodicity, and the invariant distribution is then called the equilibrium distribution. Clearly, an ergodic Markov chain can have only one equilibrium distribution. It can be shown that a homogeneous Markov chain will be ergodic, subject only to weak restrictions on the invariant distribution and the transition probabilities (Neal, 1993).

In practice we often construct the transition probabilities from a set of ‘base transitions $B _ { 1 } , \ldots , B _ { K }$ . This can be achieved through a mixture distribution of the form

T (\mathbf {z} ^ {\prime}, \mathbf {z}) = \sum_ {k = 1} ^ {K} \alpha_ {k} B _ {k} (\mathbf {z} ^ {\prime}, \mathbf {z})\tag{11.42}

for some set of mixing coefficients $\alpha _ { 1 } , \ldots , \alpha _ { K }$ satisfying $\alpha _ { k } \geqslant 0$ and $\textstyle \sum _ { k } \alpha _ { k } = 1$ Alternatively, the base transitions may be combined through successive application, so that

T (\mathbf {z} ^ {\prime}, \mathbf {z}) = \sum_ {\mathbf {z} _ {1}} \dots \sum_ {\mathbf {z} _ {n - 1}} B _ {1} (\mathbf {z} ^ {\prime}, \mathbf {z} _ {1}) \dots B _ {K - 1} (\mathbf {z} _ {K - 2}, \mathbf {z} _ {K - 1}) B _ {K} (\mathbf {z} _ {K - 1}, \mathbf {z}).\tag{11.43}

If a distribution is invariant with respect to each of the base transitions, then obviously it will also be invariant with respect to either of the $T ( \mathbf { z } ^ { \prime } , \mathbf { z } )$ given by (11.42) or (11.43). For the case of the mixture (11.42), if each of the base transitions satisfies detailed balance, then the mixture transition $T$ will also satisfy detailed balance. This does not hold for the transition probability constructed using (11.43), although by symmetrizing the order of application of the base transitions, in the form $B _ { 1 } , B _ { 2 } , \ldots , B _ { K } , B _ { K } , \ldots , B _ { 2 } , B _ { 1 }$ , detailed balance can be restored. A common example of the use of composite transition probabilities is where each base transition changes only a subset of the variables.
