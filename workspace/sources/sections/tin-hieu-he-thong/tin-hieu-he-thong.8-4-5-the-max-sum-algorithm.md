---
id: "tin-hieu-he-thong.8-4-5-the-max-sum-algorithm"
doc_id: "tin-hieu-he-thong"
title: "8.4.5 The max-sum algorithm"
level: 2
heading_path: ["Graphical Models", "8.4.5 The max-sum algorithm"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-4-4-the-sum-product-algorithm"
next_id: "tin-hieu-he-thong.8-4-6-exact-inference-in-general-graphs"
block_ids: ["b4592", "b4593", "b4594", "b4595", "b4596", "b4597", "b4598", "b4599", "b4600", "b4601", "b4602", "b4603", "b4604", "b4605", "b4606", "b4607", "b4608", "b4609", "b4610", "b4611", "b4612", "b4613", "b4614", "b4615", "b4616", "b4617", "b4618", "b4619", "b4620", "b4621", "b4622", "b4623", "b4624", "b4625", "b4626", "b4627", "b4628", "b4629", "b4630", "b4631", "b4632", "b4633", "b4634", "b4635", "b4636", "b4637", "b4638", "b4639", "b4640"]
---

## 8.4.5 The max-sum algorithm

The sum-product algorithm allows us to take a joint distribution $p ( \mathbf { x } )$ expressed as a factor graph and efficiently find marginals over the component variables. Two other common tasks are to find a setting of the variables that has the largest probability and to find the value of that probability. These can be addressed through a closely related algorithm called max-sum, which can be viewed as an application of dynamic programming in the context of graphical models (Cormen et al., 2001).

A simple approach to finding latent variable values having high probability would be to run the sum-product algorithm to obtain the marginals $p ( x _ { i } )$ for every variable, and then, for each marginal in turn, to find the value $x _ { i } ^ { \star }$ that maximizes that marginal. However, this would give the set of values that are individually the most probable. In practice, we typically wish to find the set of values that jointly have the largest probability, in other words the vector $\mathbf { x } ^ { \mathrm { { m a x } } }$ that maximizes the joint distribution, so that

\mathbf {x} ^ {\max} = \underset {\mathbf {x}} {\arg \max} p (\mathbf {x})\tag{8.87}

for which the corresponding value of the joint probability will be given by

p (\mathbf {x} ^ {\max}) = \max _ {\mathbf {x}} p (\mathbf {x}).\tag{8.88}

In general, $\mathbf { x } ^ { \mathrm { { m a x } } }$ is not the same as the set of $x _ { i } ^ { \star }$ values, as we can easily show using a simple example. Consider the joint distribution $p ( x , y )$ over two binary variables $x , y \in \{ 0 , 1 \}$ given in Table 8.1. The joint distribution is maximized by setting $x =$ 1 and $y = 0$ , corresponding the value 0.4. However, the marginal for $p ( x )$ , obtained by summing over both values of $y ,$ is given by $p ( x = 0 ) = 0 . 6$ and $p ( x = 1 ) = 0 . 4$ and similarly the marginal for $y$ is given by $p ( y = 0 ) = 0 . 7$ and $p ( y = 1 ) = 0 . 3$ and so the marginals are maximized by $x = 0$ and $y = 0$ , which corresponds to a value of 0.3 for the joint distribution. In fact, it is not difficult to construct examples for which the set of individually most probable values has probability zero under the joint distribution.

We therefore seek an efficient algorithm for finding the value of x that maximizes the joint distribution $p ( \mathbf { x } )$ and that will allow us to obtain the value of the joint distribution at its maximum. To address the second of these problems, we shall simply write out the max operator in terms of its components

\max _ {\mathbf {x}} p (\mathbf {x}) = \max _ {x _ {1}} \ldots \max _ {x _ {M}} p (\mathbf {x})\tag{8.89}

where M is the total number of variables, and then substitute for $p ( \mathbf { x } )$ using its expansion in terms of a product of factors. In deriving the sum-product algorithm, we made use of the distributive law (8.53) for multiplication. Here we make use of the analogous law for the max operator

\max (a b, a c) = a \max (b, c)\tag{8.90}

which holds if $a \geqslant 0$ (as will always be the case for the factors in a graphical model). This allows us to exchange products with maximizations.

Consider first the simple example of a chain of nodes described by (8.49). The evaluation of the probability maximum can be written as

\begin{array}{l} \underset {\mathbf {x}} {\max} p (\mathbf {x}) = \frac {1}{Z} \underset {x _ {1}} {\max} \dots \underset {x _ {N}} {\max} \left[ \psi_ {1, 2} (x _ {1}, x _ {2}) \dots \psi_ {N - 1, N} (x _ {N - 1}, x _ {N}) \right] \\ = \frac {1}{Z} \underset {x _ {1}} {\max} \left[ \psi_ {1, 2} (x _ {1}, x _ {2}) \left[ \dots \underset {x _ {N}} {\max} \psi_ {N - 1, N} (x _ {N - 1}, x _ {N}) \right] \right]. \end{array}

As with the calculation of marginals, we see that exchanging the max and product operators results in a much more efficient computation, and one that is easily interpreted in terms of messages passed from node $x _ { N }$ backwards along the chain to node $x _ { 1 }$

We can readily generalize this result to arbitrary tree-structured factor graphs by substituting the expression (8.59) for the factor graph expansion into (8.89) and again exchanging maximizations with products. The structure of this calculation is identical to that of the sum-product algorithm, and so we can simply translate those results into the present context. In particular, suppose that we designate a particular variable node as the ‘root’ of the graph. Then we start a set of messages propagating inwards from the leaves of the tree towards the root, with each node sending its message towards the root once it has received all incoming messages from its other neighbours. The final maximization is performed over the product of all messages arriving at the root node, and gives the maximum value for $p ( \mathbf { x } )$ . This could be called the max-product algorithm and is identical to the sum-product algorithm except that summations are replaced by maximizations. Note that at this stage, messages have been sent from leaves to the root, but not in the other direction.

In practice, products of many small probabilities can lead to numerical underflow problems, and so it is convenient to work with the logarithm of the joint distribution. The logarithm is a monotonic function, so that if $a > b$ then ln $a > \ln b ,$ and hence the max operator and the logarithm function can be interchanged, so that

\ln \left(\max _ {\mathbf {x}} p (\mathbf {x})\right) = \max _ {\mathbf {x}} \ln p (\mathbf {x}).\tag{8.91}

The distributive property is preserved because

\max (a + b, a + c) = a + \max (b, c).\tag{8.92}

Thus taking the logarithm simply has the effect of replacing the products in the max-product algorithm with sums, and so we obtain the max-sum algorithm. From the results (8.66) and (8.69) derived earlier for the sum-product algorithm, we can readily write down the max-sum algorithm in terms of message passing simply by replacing ‘sum’ with ‘max’ and replacing products with sums of logarithms to give

\mu_ {f \rightarrow x} (x) = \max _ {x _ {1}, \dots , x _ {M}} \left[ \ln f (x, x _ {1}, \dots , x _ {M}) + \sum_ {m \in \mathrm{ne} (f _ {s}) \backslash x} \mu_ {x _ {m} \rightarrow f} (x _ {m}) \right]\tag{8.93}

\mu_ {x \to f} (x) = \sum_ {l \in \mathrm{ne} (x) \setminus f} \mu_ {f _ {l} \to x} (x).\tag{8.94}

The initial messages sent by the leaf nodes are obtained by analogy with (8.70) and (8.71) and are given by

\mu_ {x \to f} (x) = 0\tag{8.95}

\mu_ {f \to x} (x) = \ln f (x)\tag{8.96}

while at the root node the maximum probability can then be computed, by analogy with (8.63), using

p ^ {\max} = \max _ {x} \left[ \sum_ {s \in \mathrm{ne} (x)} \mu_ {f _ {s} \to x} (x) \right].\tag{8.97}

So far, we have seen how to find the maximum of the joint distribution by propagating messages from the leaves to an arbitrarily chosen root node. The result will be the same irrespective of which node is chosen as the root. Now we turn to the second problem of finding the configuration of the variables for which the joint distribution attains this maximum value. So far, we have sent messages from the leaves to the root. The process of evaluating (8.97) will also give the value $x ^ { \mathrm { m a x } }$ for the most probable value of the root node variable, defined by

x ^ {\max} = \arg \max _ {x} \left[ \sum_ {s \in \mathrm{ne} (x)} \mu_ {f _ {s} \to x} (x) \right].\tag{8.98}

At this point, we might be tempted simply to continue with the message passing algorithm and send messages from the root back out to the leaves, using (8.93) and (8.94), then apply (8.98) to all of the remaining variable nodes. However, because we are now maximizing rather than summing, it is possible that there may be multiple configurations of x all of which give rise to the maximum value for $p ( \mathbf { x } )$ . In such cases, this strategy can fail because it is possible for the individual variable values obtained by maximizing the product of messages at each node to belong to different maximizing configurations, giving an overall configuration that no longer corresponds to a maximum.

The problem can be resolved by adopting a rather different kind of message passing from the root node to the leaves. To see how this works, let us return once again to the simple chain example of N variables $x _ { 1 } , \ldots , x _ { N }$ each having K states,

Figure 8.53 A lattice, or trellis, diagram showing explicitly the K possible states (one per row of the diagram) for each of the variables $x _ { n }$ in the chain model. In this illustration $K = 3$ The arrow shows the direction of message passing in the max-product algorithm. For every state k of each variable $x _ { n }$ (corresponding to column n of the diagram) the function $\phi ( x _ { n } )$ defines a unique state at the previous variable, indicated by the black lines. The two paths through the lattice correspond to configurations that give the global maximum of the joint probability distribution, and either of these can be found by tracing back along the black lines in the opposite direction to the arrow.

![image](images/part-003--5b320e53d0f84f93813f8b459fc4dcd9d9f2d7f7da3cd0daeda372c742e0e1d8.jpg)

corresponding to the graph shown in Figure 8.38. Suppose we take node $x _ { N }$ to be the root node. Then in the first phase, we propagate messages from the leaf node $x _ { 1 }$ to the root node using

\begin{array}{r c l} \mu_ {x _ {n} \to f _ {n, n + 1}} (x _ {n}) & = & \mu_ {f _ {n - 1, n} \to x _ {n}} (x _ {n}) \\ \mu_ {f _ {n - 1, n} \to x _ {n}} (x _ {n}) & = & \max _ {x _ {n - 1}} \left[ \ln f _ {n - 1, n} (x _ {n - 1}, x _ {n}) + \mu_ {x _ {n - 1} \to f n - 1, n} (x _ {n}) \right] \end{array}

which follow from applying (8.94) and (8.93) to this particular graph. The initial message sent from the leaf node is simply

\mu_ {x _ {1} \rightarrow f _ {1, 2}} (x _ {1}) = 0.\tag{8.99}

The most probable value for $x _ { N }$ is then given by

x _ {N} ^ {\max} = \underset {x _ {N}} {\arg \max} \left[ \mu_ {f _ {N - 1, N} \to x _ {N}} (x _ {N}) \right].\tag{8.100}

Now we need to determine the states of the previous variables that correspond to the same maximizing configuration. This can be done by keeping track of which values of the variables gave rise to the maximum state of each variable, in other words by storing quantities given by

\phi (x _ {n}) = \underset {x _ {n - 1}} {\arg \max} \left[ \ln f _ {n - 1, n} (x _ {n - 1}, x _ {n}) + \mu_ {x _ {n - 1} \to f n - 1, n} (x _ {n}) \right].\tag{8.101}

To understand better what is happening, it is helpful to represent the chain of variables in terms of a lattice or trellis diagram as shown in Figure 8.53. Note that this is not a probabilistic graphical model because the nodes represent individual states of variables, while each variable corresponds to a column of such states in the diagram. For each state of a given variable, there is a unique state of the previous variable that maximizes the probability (ties are broken either systematically or at random), corresponding to the function $\phi ( x _ { n } )$ given by (8.101), and this is indicated by the lines connecting the nodes. Once we know the most probable value of the final node $x _ { N }$ , we can then simply follow the link back to find the most probable state of node $x _ { N - 1 }$ and so on back to the initial node $x _ { 1 }$ . This corresponds to propagating a message back down the chain using

x _ {n - 1} ^ {\mathrm{max}} = \phi (x _ {n} ^ {\mathrm{max}})\tag{8.102}

and is known as back-tracking. Note that there could be several values of $x _ { n - 1 }$ all of which give the maximum value in (8.101). Provided we chose one of these values when we do the back-tracking, we are assured of a globally consistent maximizing configuration.

In Figure 8.53, we have indicated two paths, each of which we shall suppose corresponds to a global maximum of the joint probability distribution. If $k = 2$ and $k = 3$ each represent possible values of $x _ { N } ^ { \mathrm { m a x } }$ , then starting from either state and tracing back along the black lines, which corresponds to iterating (8.102), we obtain a valid global maximum configuration. Note that if we had run a forward pass of max-sum message passing followed by a backward pass and then applied (8.98) at each node separately, we could end up selecting some states from one path and some from the other path, giving an overall configuration that is not a global maximizer. We see that it is necessary instead to keep track of the maximizing states during the forward pass using the functions $\phi ( x _ { n } )$ and then use back-tracking to find a consistent solution.

The extension to a general tree-structured factor graph should now be clear. If a message is sent from a factor node $f$ to a variable node $x ,$ a maximization is performed over all other variable nodes $x _ { 1 } , \ldots , x _ { M }$ that are neighbours of that factor node, using (8.93). When we perform this maximization, we keep a record of which values of the variables $x _ { 1 } , \ldots , x _ { M }$ gave rise to the maximum. Then in the back-tracking step, having found $x ^ { \mathrm { m a x } }$ , we can then use these stored values to assign consistent maximizing states $x _ { 1 } ^ { \mathrm { m a x } } , \ldots , x _ { M } ^ { \mathrm { m a x } }$ . The max-sum algorithm, with back-tracking, gives an exact maximizing configuration for the variables provided the factor graph is a tree. An important application of this technique is for finding the most probable sequence of hidden states in a hidden Markov model, in which case it is known as the Viterbi algorithm.

As with the sum-product algorithm, the inclusion of evidence in the form of observed variables is straightforward. The observed variables are clamped to their observed values, and the maximization is performed over the remaining hidden variables. This can be shown formally by including identity functions for the observed variables into the factor functions, as we did for the sum-product algorithm.

It is interesting to compare max-sum with the iterated conditional modes (ICM) algorithm described on page 389. Each step in ICM is computationally simpler because the ‘messages’ that are passed from one node to the next comprise a single value consisting of the new state of the node for which the conditional distribution is maximized. The max-sum algorithm is more complex because the messages are functions of node variables x and hence comprise a set of K values for each possible state of x. Unlike max-sum, however, ICM is not guaranteed to find a global maximum even for tree-structured graphs.
