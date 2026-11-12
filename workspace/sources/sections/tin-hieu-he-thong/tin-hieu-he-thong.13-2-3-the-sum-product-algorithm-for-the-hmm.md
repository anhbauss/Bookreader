---
id: "tin-hieu-he-thong.13-2-3-the-sum-product-algorithm-for-the-hmm"
doc_id: "tin-hieu-he-thong"
title: "13.2.3 The sum-product algorithm for the HMM"
level: 2
heading_path: ["Sequential Data", "13.2.3 The sum-product algorithm for the HMM"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.13-2-2-the-forward-backward-algorithm"
next_id: "tin-hieu-he-thong.13-2-4-scaling-factors"
block_ids: ["b6702", "b6703", "b6704", "b6705", "b6706", "b6707", "b6708", "b6709", "b6710", "b6711", "b6712", "b6713", "b6714", "b6715", "b6716", "b6717", "b6718", "b6719", "b6720", "b6721", "b6722", "b6723", "b6724", "b6725", "b6726", "b6727", "b6728"]
---

## 13.2.3 The sum-product algorithm for the HMM

The directed graph that represents the hidden Markov model, shown in Figure 13.5, is a tree and so we can solve the problem of finding local marginals for the hidden variables using the sum-product algorithm. Not surprisingly, this turns out to be equivalent to the forward-backward algorithm considered in the previous section, and so the sum-product algorithm therefore provides us with a simple way to derive the alpha-beta recursion formulae.

We begin by transforming the directed graph of Figure 13.5 into a factor graph, of which a representative fragment is shown in Figure 13.14. This form of the factor graph shows all variables, both latent and observed, explicitly. However, for the purpose of solving the inference problem, we shall always be conditioning on the variables $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ , and so we can simplify the factor graph by absorbing the emission probabilities into the transition probability factors. This leads to the simplified factor graph representation in Figure 13.15, in which the factors are given by

{h (\mathbf {z} _ {1})} = {p (\mathbf {z} _ {1}) p (\mathbf {x} _ {1} | \mathbf {z} _ {1})}\tag{13.45}

{f _ {n} (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n})} = {p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) p (\mathbf {x} _ {n} | \mathbf {z} _ {n}).}\tag{13.46}

Figure 13.15 A simplified form of factor graph to describe the hidden Markov model.

![image](images/part-004--76a73eb030e95cf7da48fb735bd6c6868405489832fc986700cab4783145c9d0.jpg)

To derive the alpha-beta algorithm, we denote the final hidden variable $\mathbf { z } _ { N }$ as the root node, and first pass messages from the leaf node h to the root. From the general results (8.66) and (8.69) for message propagation, we see that the messages which are propagated in the hidden Markov model take the form

\mu_ {\mathbf {z} _ {n - 1} \to f _ {n}} (\mathbf {z} _ {n - 1}) = \mu_ {f _ {n - 1} \to \mathbf {z} _ {n - 1}} (\mathbf {z} _ {n - 1})\tag{13.47}

\mu_ {f _ {n} \to \mathbf {z} _ {n}} (\mathbf {z} _ {n}) = \sum_ {\mathbf {z} _ {n - 1}} f _ {n} (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n}) \mu_ {\mathbf {z} _ {n - 1} \to f _ {n}} (\mathbf {z} _ {n - 1})\tag{13.48}

These equations represent the propagation of messages forward along the chain and are equivalent to the alpha recursions derived in the previous section, as we shall now show. Note that because the variable nodes $\mathbf { z } _ { n }$ have only two neighbours, they perform no computation.

We can eliminate $\mu _ { \mathbf { z } _ { n - 1 }  f _ { n } } ( \mathbf { z } _ { n - 1 } )$ from (13.48) using (13.47) to give a recursion for the $f  \mathbf { z }$ messages of the form

\mu_ {f _ {n} \to \mathbf {z} _ {n}} (\mathbf {z} _ {n}) = \sum_ {\mathbf {z} _ {n - 1}} f _ {n} (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n}) \mu_ {f _ {n - 1} \to \mathbf {z} _ {n - 1}} (\mathbf {z} _ {n - 1}).\tag{13.49}

If we now recall the definition (13.46), and if we define

\alpha (\mathbf {z} _ {n}) = \mu_ {f _ {n} \to \mathbf {z} _ {n}} (\mathbf {z} _ {n})\tag{13.50}

then we obtain the alpha recursion given by (13.36). We also need to verify that the quantities $\alpha ( { \mathbf z } _ { n } )$ are themselves equivalent to those defined previously. This is easily done by using the initial condition (8.71) and noting that $\alpha ( { \bf z } _ { 1 } )$ is given by $h ( \mathbf { z } _ { 1 } ) = p ( \mathbf { z } _ { 1 } ) p ( \mathbf { x } _ { 1 } | \mathbf { z } _ { 1 } )$ which is identical to (13.37). Because the initial α is the same, and because they are iteratively computed using the same equation, all subsequent α quantities must be the same.

Next we consider the messages that are propagated from the root node back to the leaf node. These take the form

\mu_ {f _ {n + 1} \rightarrow f _ {n}} (\mathbf {z} _ {n}) = \sum_ {\mathbf {z} _ {n + 1}} f _ {n + 1} (\mathbf {z} _ {n}, \mathbf {z} _ {n + 1}) \mu_ {f _ {n + 2} \rightarrow f _ {n + 1}} (\mathbf {z} _ {n + 1})\tag{13.51}

where, as before, we have eliminated the messages of the type $\mathrm { ~ \bf ~ z ~ } \to \mathrm { ~ \boldsymbol ~ f ~ }$ since the variable nodes perform no computation. Using the definition (13.46) to substitute for $f _ { n + 1 } ( \mathbf { z } _ { n } , \mathbf { z } _ { n + 1 } )$ , and defining

\beta (\mathbf {z} _ {n}) = \mu_ {f _ {n + 1} \rightarrow \mathbf {z} _ {n}} (\mathbf {z} _ {n})\tag{13.52}

we obtain the beta recursion given by (13.38). Again, we can verify that the beta variables themselves are equivalent by noting that (8.70) implies that the initial message send by the root variable node is $\mu _ { { \bf z } _ { N }  f _ { N } } ( { \bf z } _ { N } ) = 1$ , which is identical to the initialization of $\beta ( { \bf z } _ { N } )$ given in Section 13.2.2.

The sum-product algorithm also specifies how to evaluate the marginals once all the messages have been evaluated. In particular, the result (8.63) shows that the local marginal at the node $\mathbf { z } _ { n }$ is given by the product of the incoming messages. Because we have conditioned on the variables $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ , we are computing the joint distribution

p (\mathbf {z} _ {n}, \mathbf {X}) = \mu_ {f _ {n} \to \mathbf {z} _ {n}} (\mathbf {z} _ {n}) \mu_ {f _ {n + 1} \to \mathbf {z} _ {n}} (\mathbf {z} _ {n}) = \alpha (\mathbf {z} _ {n}) \beta (\mathbf {z} _ {n}).\tag{13.53}

Dividing both sides by $p ( \mathbf { X } )$ , we then obtain

\gamma (\mathbf {z} _ {n}) = \frac {p (\mathbf {z} _ {n} , \mathbf {X})}{p (\mathbf {X})} = \frac {\alpha (\mathbf {z} _ {n}) \beta (\mathbf {z} _ {n})}{p (\mathbf {X})}\tag{13.54}

Exercise 13.11

in agreement with (13.33). The result (13.43) can similarly be derived from (8.72).
