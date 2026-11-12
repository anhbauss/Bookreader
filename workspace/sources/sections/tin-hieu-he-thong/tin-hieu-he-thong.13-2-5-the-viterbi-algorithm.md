---
id: "tin-hieu-he-thong.13-2-5-the-viterbi-algorithm"
doc_id: "tin-hieu-he-thong"
title: "13.2.5 The Viterbi algorithm"
level: 2
heading_path: ["Sequential Data", "13.2.5 The Viterbi algorithm"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.13-2-4-scaling-factors"
next_id: "tin-hieu-he-thong.13-2-6-extensions-of-the-hidden-markov-model"
block_ids: ["b6757", "b6758", "b6759", "b6760", "b6761", "b6762", "b6763", "b6764", "b6765", "b6766", "b6767", "b6768", "b6769", "b6770", "b6771", "b6772", "b6773", "b6774", "b6775"]
---

## 13.2.5 The Viterbi algorithm

In many applications of hidden Markov models, the latent variables have some meaningful interpretation, and so it is often of interest to find the most probable sequence of hidden states for a given observation sequence. For instance in speech recognition, we might wish to find the most probable phoneme sequence for a given series of acoustic observations. Because the graph for the hidden Markov model is a directed tree, this problem can be solved exactly using the max-sum algorithm. We recall from our discussion in Section 8.4.5 that the problem of finding the most probable sequence of latent states is not the same as that of finding the set of states that are individually the most probable. The latter problem can be solved by first running the forward-backward (sum-product) algorithm to find the latent variable marginals $\gamma ( \mathbf { z } _ { n } )$ and then maximizing each of these individually (Duda et al., 2001). However, the set of such states will not, in general, correspond to the most probable sequence of states. In fact, this set of states might even represent a sequence having zero probability, if it so happens that two successive states, which in isolation are individually the most probable, are such that the transition matrix element connecting them is zero.

In practice, we are usually interested in finding the most probable sequence of states, and this can be solved efficiently using the max-sum algorithm, which in the context of hidden Markov models is known as the Viterbi algorithm (Viterbi, 1967). Note that the max-sum algorithm works with log probabilities and so there is no need to use re-scaled variables as was done with the forward-backward algorithm. Figure 13.16 shows a fragment of the hidden Markov model expanded as lattice diagram. As we have already noted, the number of possible paths through the lattice grows exponentially with the length of the chain. The Viterbi algorithm searches this space of paths efficiently to find the most probable path with a computational cost that grows only linearly with the length of the chain.

As with the sum-product algorithm, we first represent the hidden Markov model as a factor graph, as shown in Figure 13.15. Again, we treat the variable node $\mathbf { z } _ { N }$ as the root, and pass messages to the root starting with the leaf nodes. Using the results (8.93) and (8.94), we see that the messages passed in the max-sum algorithm are given by

\mu_ {\mathbf {z} _ {n} \to f _ {n + 1}} (\mathbf {z} _ {n}) = \mu_ {f _ {n} \to \mathbf {z} _ {n}} (\mathbf {z} _ {n})\tag{13.66}

\mu_ {f _ {n + 1} \to {\bf z} _ {n + 1}} ({\bf z} _ {n + 1}) = \max _ {{\bf z} _ {n}} \left\{\ln f _ {n + 1} ({\bf z} _ {n}, {\bf z} _ {n + 1}) + \mu_ {{\bf z} _ {n} \to f _ {n + 1}} ({\bf z} _ {n}) \right\}\tag{13.67}

Figure 13.16 A fragment of the HMM lattice showing two possible paths. The Viterbi algorithm efficiently determines the most probable path from amongst the exponentially many possibilities. For any given path, the corresponding probability is given by the product of the elements of the transition matrix $A _ { j k }$ , corresponding to the probabilities $p ( \mathbf { z } _ { n + 1 } | \mathbf { z } _ { n } )$ for each segment of the path, along with the emission densities $p ( \mathbf { x } _ { n } | k )$ associated with each node on the path.

![image](images/part-004--117774143a79f88560fbe6265cd71fa302a637948845f02e9600551c9304cca7.jpg)

If we eliminate $\mu _ { \mathbf { z } _ { n }  f _ { n + 1 } } ( \mathbf { z } _ { n } )$ between these two equations, and make use of (13.46), we obtain a recursion for the $f  \mathbf { z }$ messages of the form

\omega (\mathbf {z} _ {n + 1}) = \ln p (\mathbf {x} _ {n + 1} | \mathbf {z} _ {n + 1}) + \max _ {\mathbf {z} _ {n}} \left\{\ln p (\mathbf {x} _ {+ 1} | \mathbf {z} _ {n}) + \omega (\mathbf {z} _ {n}) \right\}\tag{13.68}

where we have introduced the notation $\omega ( \mathbf { z } _ { n } ) \equiv \mu _ { f _ { n } \to \mathbf { z } _ { n } } ( \mathbf { z } _ { n } )$

From (8.95) and (8.96), these messages are initialized using

\omega (\mathbf {z} _ {1}) = \ln p (\mathbf {z} _ {1}) + \ln p (\mathbf {x} _ {1} | \mathbf {z} _ {1}).\tag{13.69}

where we have used (13.45). Note that to keep the notation uncluttered, we omit the dependence on the model parameters $\pmb \theta$ that are held fixed when finding the most probable sequence.

The Viterbi algorithm can also be derived directly from the definition (13.6) of the joint distribution by taking the logarithm and then exchanging maximizations and summations. It is easily seen that the quantities $\omega ( \mathbf { z } _ { n } )$ have the probabilistic interpretation

\omega (\mathbf {z} _ {n}) = \max _ {\mathbf {z} _ {1}, \ldots , \mathbf {z} _ {n - 1}} p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n}, \mathbf {z} _ {1}, \ldots , \mathbf {z} _ {n}).\tag{13.70}

Once we have completed the final maximization over $\mathbf { z } _ { N }$ , we will obtain the value of the joint distribution $p ( \mathbf { X } , \mathbf { Z } )$ corresponding to the most probable path. We also wish to find the sequence of latent variable values that corresponds to this path. To do this, we simply make use of the back-tracking procedure discussed in Section 8.4.5. Specifically, we note that the maximization over $\mathbf { z } _ { n }$ must be performed for each of the K possible values of $\mathbf { z } _ { n + 1 }$ . Suppose we keep a record of the values of $\mathbf { z } _ { n }$ that correspond to the maxima for each value of the $K$ values of $\mathbf { z } _ { n + 1 }$ . Let us denote this function by $\psi ( k _ { n } )$ where $k \in \{ 1 , \ldots , K \}$ . Once we have passed messages to the end of the chain and found the most probable state of $\mathbf { z } _ { N }$ , we can then use this function to backtrack along the chain by applying it recursively

k _ {n} ^ {\mathrm{max}} = \psi (k _ {n + 1} ^ {\mathrm{max}}).\tag{13.71}

Intuitively, we can understand the Viterbi algorithm as follows. Naively, we could consider explicitly all of the exponentially many paths through the lattice, evaluate the probability for each, and then select the path having the highest probability. However, we notice that we can make a dramatic saving in computational cost as follows. Suppose that for each path we evaluate its probability by summing up products of transition and emission probabilities as we work our way forward along each path through the lattice. Consider a particular time step n and a particular state k at that time step. There will be many possible paths converging on the corresponding node in the lattice diagram. However, we need only retain that particular path that so far has the highest probability. Because there are $K$ states at time step n, we need to keep track of $K$ such paths. At time step $n + 1$ , there will be $K ^ { 2 }$ possible paths to consider, comprising $K$ possible paths leading out of each of the $K$ current states, but again we need only retain K of these corresponding to the best path for each state at time $n { + 1 }$ . When we reach the final time step N we will discover which state corresponds to the overall most probable path. Because there is a unique path coming into that state we can trace the path back to step $N - 1$ to see what state it occupied at that time, and so on back through the lattice to the state $n = 1$
