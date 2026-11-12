---
id: "tin-hieu-he-thong.10-7-2-expectation-propagation-on-graphs"
doc_id: "tin-hieu-he-thong"
title: "10.7.2 Expectation propagation on graphs"
level: 2
heading_path: ["Approximate Inference", "10.7.2 Expectation propagation on graphs"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-7-1-example-the-clutter-problem"
next_id: "tin-hieu-he-thong.exercises-11"
block_ids: ["b5686", "b5687", "b5688", "b5689", "b5690", "b5691", "b5692", "b5693", "b5694", "b5695", "b5696", "b5697", "b5698", "b5699", "b5700", "b5701", "b5702", "b5703", "b5704", "b5705", "b5706", "b5707", "b5708", "b5709", "b5710", "b5711", "b5712", "b5713", "b5714", "b5715", "b5716", "b5717", "b5718", "b5719", "b5720", "b5721", "b5722", "b5723", "b5724", "b5725", "b5726", "b5727", "b5728"]
---

## 10.7.2 Expectation propagation on graphs

So far in our general discussion of EP, we have allowed the factors $f _ { i } ( \pmb \theta )$ in the distribution $p ( \pmb \theta )$ to be functions of all of the components of θ, and similarly for the approximating factors $\widetilde f ( \pmb \theta )$ in the approximating distribution $q ( \pmb \theta )$ . We now consider situations in which the factors depend only on subsets of the variables. Such restrictions can be conveniently expressed using the framework of probabilistic graphical models, as discussed in Chapter 8. Here we use a factor graph representation because this encompasses both directed and undirected graphs.

![image](images/part-003--f2d0ac4f3a5f0cb9e57d583d72b083f3bff9296041fef8b6dbf4a5469b13069a.jpg)

![image](images/part-003--da9a3c13caf889f046a444e4d82f830f881555dfc71be3234285ba8c2e94379d.jpg)

Figure 10.17 Comparison of expectation propagation, variational inference, and the Laplace approximation on the clutter problem. The left-hand plot shows the error in the predicted posterior mean versus the number of floating point operations, and the right-hand plot shows the corresponding results for the model evidence.

We shall focus on the case in which the approximating distribution is fully factorized, and we shall show that in this case expectation propagation reduces to loopy belief propagation (Minka, 2001a). To start with, we show this in the context of a simple example, and then we shall explore the general case.

First of all, recall from (10.17) that if we minimize the Kullback-Leibler divergence KL $( p \| q )$ with respect to a factorized distribution $q ,$ then the optimal solution for each factor is simply the corresponding marginal of $p .$

Now consider the factor graph shown on the left in Figure 10.18, which was introduced earlier in the context of the sum-product algorithm. The joint distribution is given by

p (\mathbf {x}) = f _ {a} (x _ {1}, x _ {2}) f _ {b} (x _ {2}, x _ {3}) f _ {c} (x _ {2}, x _ {4}).\tag{10.225}

We seek an approximation $q ( \mathbf { x } )$ that has the same factorization, so that

q (\mathbf {x}) \propto \widetilde {f} _ {a} (x _ {1}, x _ {2}) \widetilde {f} _ {b} (x _ {2}, x _ {3}) \widetilde {f} _ {c} (x _ {2}, x _ {4}).\tag{10.226}

Note that normalization constants have been omitted, and these can be re-instated at the end by local normalization, as is generally done in belief propagation. Now suppose we restrict attention to approximations in which the factors themselves factorize with respect to the individual variables so that

q (\mathbf {x}) \propto \widetilde {f} _ {a 1} (x _ {1}) \widetilde {f} _ {a 2} (x _ {2}) \widetilde {f} _ {b 2} (x _ {2}) \widetilde {f} _ {b 3} (x _ {3}) \widetilde {f} _ {c 2} (x _ {2}) \widetilde {f} _ {c 4} (x _ {4})\tag{10.227}

which corresponds to the factor graph shown on the right in Figure 10.18. Because the individual factors are factorized, the overall distribution $q ( \mathbf { x } )$ is itself fully factorized.

Now we apply the EP algorithm using the fully factorized approximation. Suppose that we have initialized all of the factors and that we choose to refine factor $\widetilde { f } _ { b } ( x _ { 2 } , x _ { 3 } ) = \widetilde { f } _ { b 2 } ( x _ { 2 } ) \widetilde { f } _ { b 3 } ( x _ { 3 } )$ . We first remove this factor from the approximating  distribution to give

![image](images/part-003--2f95516f719279751046c6e28592f07f4e06f8b76d00415fe88381c11a1c7730.jpg)

Figure 10.18 On the left is a simple factor graph from Figure 8.51 and reproduced here for convenience. On the right is the corresponding factorized approximation.

q ^ {\backslash b} (\mathbf {x}) = \widetilde {f} _ {a 1} (x _ {1}) \widetilde {f} _ {a 2} (x _ {2}) \widetilde {f} _ {c 2} (x _ {2}) \widetilde {f} _ {c 4} (x _ {4})\tag{10.228}

and we then multiply this by the exact factor $f _ { b } ( x _ { 2 } , x _ { 3 } )$ to give

\widehat {p} (\mathbf {x}) = q ^ {\backslash b} (\mathbf {x}) f _ {b} (x _ {2}, x _ {3}) = \widetilde {f} _ {a 1} (x _ {1}) \widetilde {f} _ {a 2} (x _ {2}) \widetilde {f} _ {c 2} (x _ {2}) \widetilde {f} _ {c 4} (x _ {4}) f _ {b} (x _ {2}, x _ {3}).\tag{10.229}

We now find $q ^ { \mathrm { n e w } } ( \mathbf { x } )$ by minimizing the Kullback-Leibler divergence $\operatorname { K L } ( \widehat { p } \| q ^ { \mathrm { n e w } } )$ The result, as noted above, is that $q ^ { \mathrm { n e w } } ( \mathbf { z } )$ comprises the product of factors, one for each variable $x _ { i }$ , in which each factor is given by the corresponding marginal of $\widehat { p } ( { \bf x } )$ . These four marginals are given by

\widehat {p} (x _ {1}) \propto \widetilde {f} _ {a 1} (x _ {1})\tag{10.230}

\widehat {p} (x _ {2}) \propto \widetilde {f} _ {a 2} (x _ {2}) \widetilde {f} _ {c 2} (x _ {2}) \sum_ {x _ {3}} f _ {b} (x _ {2}, x _ {3})\tag{10.231}

\widehat {p} (x _ {3}) \propto \sum_ {x _ {2}} \left\{f _ {b} (x _ {2}, x _ {3}) \widetilde {f} _ {a 2} (x _ {2}) \widetilde {f} _ {c 2} (x _ {2}) \right\}\tag{10.232}

\widehat {p} (x _ {4}) \propto \widetilde {f} _ {c 4} (x _ {4})\tag{10.233}

and $q ^ { \mathrm { n e w } } ( \mathbf { x } )$ is obtained by multiplying these marginals together. We see that the only factors in $q ( \mathbf { x } )$ that change when we update $\widetilde { f } _ { b } ( x _ { 2 } , x _ { 3 } )$ are those that involve the variables in $f _ { b }$ namely $x _ { 2 }$ and $x _ { 3 }$ . To obtain the refined factor $\widetilde { f } _ { b } ( x _ { 2 } , x _ { 3 } ) =$ $\widetilde { f } _ { b 2 } ( x _ { 2 } ) \widetilde { f } _ { b 3 } ( x _ { 3 } )$ we simply divide $q ^ { \mathrm { n e w } } ( \mathbf { x } )$ by $q ^ { \backslash b } ( { \mathbf { x } } )$ , which gives

\widetilde {f} _ {b 2} (x _ {2}) \propto \sum_ {x _ {3}} f _ {b} (x _ {2}, x _ {3})\tag{10.234}

\widetilde {f} _ {b 3} (x _ {3}) \propto \sum_ {x _ {2}} \left\{f _ {b} (x _ {2}, x _ {3}) \widetilde {f} _ {a 2} (x _ {2}) \widetilde {f} _ {c 2} (x _ {2}) \right\}.\tag{10.235}

These are precisely the messages obtained using belief propagation in which messages from variable nodes to factor nodes have been folded into the messages from factor nodes to variable nodes. In particular, $\widetilde { f } _ { b 2 } ( x _ { 2 } )$ corresponds to the message $\mu _ { f _ { b } \to x _ { 2 } } ( x _ { 2 } )$ sent by factor node $f _ { b }$ to variable node $x _ { 2 }$ and is given by (8.81). Similarly, if we substitute (8.78) into (8.79), we obtain (10.235) in which $\widetilde { f } _ { a 2 } ( x _ { 2 } )$ corresponds to $\mu _ { f _ { a } \to x _ { 2 } } ( x _ { 2 } )$ and $\widetilde { f } _ { c 2 } ( x _ { 2 } )$ corresponds to $\mu _ { f _ { c } \to x _ { 2 } } ( x _ { 2 } )$ , giving the message $\widetilde { f } _ { b 3 } ( x _ { 3 } )$ which corresponds to $\mu _ { f _ { b } \to x _ { 3 } } ( x _ { 3 } )$

This result differs slightly from standard belief propagation in that messages are passed in both directions at the same time. We can easily modify the EP procedure to give the standard form of the sum-product algorithm by updating just one of the factors at a time, for instance if we refine only $\widetilde { f } _ { b 3 } ( x _ { 3 } )$ , then $\widetilde { f } _ { b 2 } ( x _ { 2 } )$ is unchanged by definition, while the refined version of $\widetilde { f } _ { b 3 } ( x _ { 3 } )$ is again given by (10.235). If we are refining only one term at a time, then we can choose the order in which the refinements are done as we wish. In particular, for a tree-structured graph we can follow a two-pass update scheme, corresponding to the standard belief propagation schedule, which will result in exact inference of the variable and factor marginals. The initialization of the approximation factors in this case is unimportant.

Now let us consider a general factor graph corresponding to the distribution

p (\boldsymbol {\theta}) = \prod_ {i} f _ {i} (\boldsymbol {\theta} _ {i})\tag{10.236}

where $\theta _ { i }$ represents the subset of variables associated with factor $f _ { i }$ . We approximate this using a fully factorized distribution of the form

q (\boldsymbol {\theta}) \propto \prod_ {i} \prod_ {k} \widetilde {f} _ {i k} (\theta_ {k})\tag{10.237}

where $\theta _ { k }$ corresponds to an individual variable node. Suppose that we wish to refine the particular term $\widetilde { f } _ { j l } ( \theta _ { l } )$ keeping all other terms fixed. We first remove the term $\widetilde { f } _ { j } ( \pmb { \theta } _ { j } )$ from $q ( \pmb \theta )$ to give

q ^ {\backslash j} (\pmb {\theta}) \propto \prod_ {i \neq j} \prod_ {k} \widetilde {f} _ {i k} (\theta_ {k})\tag{10.238}

and then multiply by the exact factor $f _ { j } ( \pmb { \theta } _ { j } )$ . To determine the refined term $\widetilde { f } _ { j l } ( \theta _ { l } )$ we need only consider the functional dependence on $\theta _ { l }$ , and so we simply find the corresponding marginal of

q ^ {\backslash j} (\boldsymbol {\theta}) f _ {j} \left(\boldsymbol {\theta} _ {j}\right).\tag{10.239}

Up to a multiplicative constant, this involves taking the marginal of $f _ { j } ( \pmb { \theta } _ { j } )$ multiplied by any terms from $q ^ { \setminus j } ( \pmb \theta )$ that are functions of any of the variables in $\theta _ { j }$ . Terms that correspond to other factors $\widetilde { f } _ { i } ( \pmb \theta _ { i } )$ for $i \neq j$ will cancel between numerator and denominator when we subsequently divide by $q ^ { \setminus j } ( \pmb \theta )$ . We therefore obtain

\widetilde {f} _ {j l} (\theta_ {l}) \propto \sum_ {\theta_ {m \neq l} \in \boldsymbol {\theta} _ {j}} f _ {j} (\boldsymbol {\theta} _ {j}) \prod_ {k} \prod_ {m \neq l} \widetilde {f} _ {k m} (\theta_ {m}).\tag{10.240}

We recognize this as the sum-product rule in the form in which messages from variable nodes to factor nodes have been eliminated, as illustrated by the example shown in Figure 8.50. The quantity $\widetilde { f } _ { j m } ( \theta _ { m } )$ corresponds to the message $\mu _ { f _ { j } \to \theta _ { m } } ( \theta _ { m } )$ which factor node $j$ sends to variable node $m ,$ and the product over k in $( 1 0 . 2 4 0 )$ is over all factors that depend on the variables $\theta _ { m }$ that have variables (other than variable $\theta _ { l } )$ in common with factor $f _ { j } ( \pmb { \theta } _ { j } )$ . In other words, to compute the outgoing message from a factor node, we take the product of all the incoming messages from other factor nodes, multiply by the local factor, and then marginalize.

Thus, the sum-product algorithm arises as a special case of expectation propagation if we use an approximating distribution that is fully factorized. This suggests that more flexible approximating distributions, corresponding to partially disconnected graphs, could be used to achieve higher accuracy. Another generalization is to group factors $f _ { i } ( \pmb \theta _ { i } )$ together into sets and to refine all the factors in a set together at each iteration. Both of these approaches can lead to improvements in accuracy (Minka, 2001b). In general, the problem of choosing the best combination of grouping and disconnection is an open research issue.

We have seen that variational message passing and expectation propagation optimize two different forms of the Kullback-Leibler divergence. Minka (2005) has shown that a broad range of message passing algorithms can be derived from a common framework involving minimization of members of the alpha family of divergences, given by (10.19). These include variational message passing, loopy belief propagation, and expectation propagation, as well as a range of other algorithms, which we do not have space to discuss here, such as tree-reweighted message passing (Wainwright et al., 2005),fractional beliefpropagation (Wiegerinck and Heskes, 2003), and power EP (Minka, 2004).
