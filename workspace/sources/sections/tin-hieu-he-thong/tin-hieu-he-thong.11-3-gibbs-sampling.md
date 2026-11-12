---
id: "tin-hieu-he-thong.11-3-gibbs-sampling"
doc_id: "tin-hieu-he-thong"
title: "11.3. Gibbs Sampling"
level: 2
heading_path: ["Sampling Methods", "11.3. Gibbs Sampling"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11-2-2-the-metropolis-hastings-algorithm"
next_id: "tin-hieu-he-thong.gibbs-sampling"
block_ids: ["b5963", "b5964", "b5965", "b5966", "b5967", "b5968", "b5969", "b5970", "b5971", "b5972"]
---

## 11.3. Gibbs Sampling

Gibbs sampling (Geman and Geman, 1984) is a simple and widely applicable Markov chain Monte Carlo algorithm and can be seen as a special case of the Metropolis-Hastings algorithm.

Consider the distribution $p ( \mathbf { z } ) = p ( z _ { 1 } , \dots , z _ { M } )$ from which we wish to sample, and suppose that we have chosen some initial state for the Markov chain. Each step of the Gibbs sampling procedure involves replacing the value of one of the variables by a value drawn from the distribution of that variable conditioned on the values of the remaining variables. Thus we replace $z _ { i }$ by a value drawn from the distribution $p ( \boldsymbol { z } _ { i } | \mathbf { z } _ { \backslash i } )$ , where $z _ { i }$ denotes the $i ^ { \mathrm { t h } }$ component of $\mathbf { z } ,$ and $\mathbf { z } _ { \backslash i }$ denotes $z _ { 1 } , \dots , z _ { M }$ but with $z _ { i }$ omitted. This procedure is repeated either by cycling through the variables in some particular order or by choosing the variable to be updated at each step at random from some distribution.

For example, suppose we have a distribution $p ( z _ { 1 } , z _ { 2 } , z _ { 3 } )$ over three variables, and at step $\tau$ of the algorithm we have selected values $z _ { 1 } ^ { ( \tau ) } , \dot { z } _ { 2 } ^ { ( \tau ) }$ and $z _ { 3 } ^ { ( \tau ) }$ . We first replace $z _ { 1 } ^ { ( \tau ) }$ by a new value $z _ { 1 } ^ { ( \tau + 1 ) }$ obtained by sampling from the conditional distribution

p (z _ {1} | z _ {2} ^ {(\tau)}, z _ {3} ^ {(\tau)}).\tag{11.46}

Next we replace $z _ { 2 } ^ { ( \tau ) }$ by a value $z _ { 2 } ^ { ( \tau + 1 ) }$ obtained by sampling from the conditiona distribution

p (z _ {2} | z _ {1} ^ {(\tau + 1)}, z _ {3} ^ {(\tau)})\tag{11.47}

so that the new value for $z _ { 1 }$ is used straight away in subsequent sampling steps. Then we update $z _ { 3 }$ with a sample $z _ { 3 } ^ { ( \tau + 1 ) }$ drawn from

p (z _ {3} | z _ {1} ^ {(\tau + 1)}, z _ {2} ^ {(\tau + 1)})\tag{11.48}

and so on, cycling through the three variables in turn.
