---
id: "tin-hieu-he-thong.8-4-1-inference-on-a-chain"
doc_id: "tin-hieu-he-thong"
title: "8.4.1 Inference on a chain"
level: 2
heading_path: ["Graphical Models", "8.4.1 Inference on a chain"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-4-inference-in-graphical-models"
next_id: "tin-hieu-he-thong.8-4-2-trees"
block_ids: ["b4417", "b4418", "b4419", "b4420", "b4421", "b4422", "b4423", "b4424", "b4425", "b4426", "b4427", "b4428", "b4429", "b4430", "b4431", "b4432", "b4433", "b4434", "b4435", "b4436", "b4437", "b4438", "b4439", "b4440", "b4441", "b4442", "b4443", "b4444", "b4445", "b4446", "b4447", "b4448", "b4449", "b4450", "b4451", "b4452", "b4453", "b4454", "b4455", "b4456"]
---

## 8.4.1 Inference on a chain

Now consider a more complex problem involving the chain of nodes of the form shown in Figure 8.32. This example will lay the foundation for a discussion of exact inference in more general graphs later in this section.

Specifically, we shall consider the undirected graph in Figure 8.32(b). We have already seen that the directed chain can be transformed into an equivalent undirected chain. Because the directed graph does not have any nodes with more than one parent, this does not require the addition of any extra links, and the directed and undirected versions of this graph express exactly the same set of conditional independence statements.

The joint distribution for this graph takes the form

p (\mathbf {x}) = \frac {1}{Z} \psi_ {1, 2} (x _ {1}, x _ {2}) \psi_ {2, 3} (x _ {2}, x _ {3}) \dots \psi_ {N - 1, N} (x _ {N - 1}, x _ {N}).\tag{8.49}

We shall consider the specific case in which the N nodes represent discrete variables each having K states, in which case each potential function $\psi _ { n - 1 , n } ( x _ { n - 1 } , x _ { n } )$ comprises an $K \times K$ table, and so the joint distribution has $( N - 1 ) K ^ { 2 }$ parameters.

Let us consider the inference problem of finding the marginal distribution $p ( x _ { n } )$ for a specific node $x _ { n }$ that is part way along the chain. Note that, for the moment, there are no observed nodes. By definition, the required marginal is obtained by summing the joint distribution over all variables except $x _ { n }$ , so that

p (x _ {n}) = \sum_ {x _ {1}} \dots \sum_ {x _ {n - 1}} \sum_ {x _ {n + 1}} \dots \sum_ {x _ {N}} p (\mathbf {x}).\tag{8.50}

In a naive implementation, we would first evaluate the joint distribution and then perform the summations explicitly. The joint distribution can be represented as a set of numbers, one for each possible value for . Because there are N variables each with K states, there are $\dot { K ^ { N } }$ values for x and so evaluation and storage of the joint distribution, as well as marginalization to obtain $p ( x _ { n } )$ , all involve storage and computation that scale exponentially with the length N of the chain.

We can, however, obtain a much more efficient algorithm by exploiting the conditional independence properties of the graphical model. If we substitute the factorized expression (8.49) for the joint distribution into (8.50), then we can rearrange the order of the summations and the multiplications to allow the required marginal to be evaluated much more efficiently. Consider for instance the summation over $x _ { N }$ . The potential $\psi _ { N - 1 , N } ( x _ { N - 1 } , x _ { N } )$ is the only one that depends on $x _ { N }$ , and so we can perform the summation

\sum_ {x _ {N}} \psi_ {N - 1, N} (x _ {N - 1}, x _ {N})\tag{8.51}

first to give a function of $x _ { N - 1 }$ . We can then use this to perform the summation over $x _ { N - 1 }$ , which will involve only this new function together with the potential $\psi _ { N - 2 , N - 1 } ( x _ { N - 2 } , x _ { N - 1 } )$ , because this is the only other place that $x _ { N - 1 }$ appears. Similarly, the summation over $x _ { 1 }$ involves only the potential $\psi _ { 1 , 2 } ( x _ { 1 } , x _ { 2 } )$ and so can be performed separately to give a function of $x _ { 2 }$ , and so on. Because each summation effectively removes a variable from the distribution, this can be viewed as the removal of a node from the graph.

If we group the potentials and summations together in this way, we can express

the desired marginal in the form

\begin{array}{l} p (x _ {n}) = \frac {1}{Z} \\ \underbrace {\left[ \sum_ {x _ {n - 1}} \psi_ {n - 1 , n} (x _ {n - 1} , x _ {n}) \cdots \left[ \sum_ {x _ {2}} \psi_ {2 , 3} (x _ {2} , x _ {3}) \left[ \sum_ {x _ {1}} \psi_ {1 , 2} (x _ {1} , x _ {2}) \right] \right] \cdots \right]} _ {\mu_ {\alpha} (x _ {n})} \\ \underbrace {\left[ \sum_ {x _ {n + 1}} \psi_ {n , n + 1} (x _ {n} , x _ {n + 1}) \cdots \left[ \sum_ {x _ {N}} \psi_ {N - 1 , N} (x _ {N - 1} , x _ {N}) \right] \cdots \right]} _ {\mu_ {\beta} (x _ {n})}. \end{array} \tag {8.5}\tag{8.52}

The reader is encouraged to study this re-ordering carefully as the underlying idea forms the basis for the later discussion of the general sum-product algorithm. Here the key concept that we are exploiting is that multiplication is distributive over addition, so that

a b + a c = a (b + c)\tag{8.53}

in which the left-hand side involves three arithmetic operations whereas the righthand side reduces this to two operations.

Let us work out the computational cost of evaluating the required marginal using this re-ordered expression. We have to perform $N - 1$ summations each of which is over $K$ states and each of which involves a function of two variables. For instance, the summation over $x _ { 1 }$ involves only the function $\psi _ { 1 , 2 } ( x _ { 1 } , x _ { 2 } )$ , which is a table of $K \times K$ numbers. We have to sum this table over $x _ { 1 }$ for each value of $x _ { 2 }$ and so this has $O ( K ^ { 2 } )$ cost. The resulting vector of K numbers is multiplied by the matrix of numbers $\psi _ { 2 , 3 } ( x _ { 2 } , x _ { 3 } )$ and so is again $O ( K ^ { 2 } )$ ). Because there are $N - 1$ summations and multiplications of this kind, the total cost of evaluating the marginal $p ( x _ { n } )$ is $O ( N K ^ { 2 } )$ . This is linear in the length of the chain, in contrast to the exponential cost of a naive approach. We have therefore been able to exploit the many conditional independence properties of this simple graph in order to obtain an efficient calculation. If the graph had been fully connected, there would have been no conditional independence properties, and we would have been forced to work directly with the full joint distribution.

We now give a powerful interpretation of this calculation in terms of the passing of local messages around on the graph. From (8.52) we see that the expression for the marginal $p ( x _ { n } )$ decomposes into the product of two factors times the normalization constant

p (x _ {n}) = \frac {1}{Z} \mu_ {\alpha} (x _ {n}) \mu_ {\beta} (x _ {n}).\tag{8.54}

We shall interpret $\mu _ { \alpha } ( x _ { n } )$ as a message passed forwards along the chain from node $x _ { n - 1 }$ to node $x _ { n }$ . Similarly, $\mu _ { \beta } ( x _ { n } )$ can be viewed as a message passed backwards along the chain to node $x _ { n }$ from node $x _ { n + 1 }$ . Note that each of the messages comprises a set of K values, one for each choice of $x _ { n }$ , and so the product of two messages should be interpreted as the point-wise multiplication of the elements of the two messages to give another set of K values.

Figure 8.38 The marginal distribution $p ( x _ { n } )$ for a node $x _ { n }$ along the chain is obtained by multiplying the two messages $\mu _ { \alpha } ( x _ { n } )$ and $\mu _ { \beta } ( x _ { n } )$ , and then normalizing. These messages can themselves be evaluated recursively by passing messages from both ends of the chain towards node $x _ { n }$

![image](images/part-003--b51ebb20aaf16a8378a43bd1a9ac952ea9e7ba2235a78c83aa5b13a228e909bf.jpg)

The message $\mu _ { \alpha } ( x _ { n } )$ can be evaluated recursively because

\begin{array}{r c l} \mu_ {\alpha} (x _ {n}) & = & \sum_ {x _ {n - 1}} \psi_ {n - 1, n} (x _ {n - 1}, x _ {n}) \left[ \sum_ {x _ {n - 2}} \dots \right] \\ & = & \sum_ {x _ {n - 1}} \psi_ {n - 1, n} (x _ {n - 1}, x _ {n}) \mu_ {\alpha} (x _ {n - 1}). \end{array}\tag{8.55}

We therefore first evaluate

\mu_ {\alpha} (x _ {2}) = \sum_ {x _ {1}} \psi_ {1, 2} (x _ {1}, x _ {2})\tag{8.56}

and then apply (8.55) repeatedly until we reach the desired node. Note carefully the structure of the message passing equation. The outgoing message $\mu _ { \alpha } ( x _ { n } )$ in (8.55) is obtained by multiplying the incoming message $\mu _ { \alpha } ( x _ { n - 1 } )$ by the local potential involving the node variable and the outgoing variable and then summing over the node variable.

Similarly, the message $\mu _ { \beta } ( x _ { n } )$ can be evaluated recursively by starting with node $x _ { N }$ and using

\begin{array}{r c l} \mu_ {\beta} (x _ {n}) & = & \sum_ {x _ {n + 1}} \psi_ {n + 1, n} (x _ {n + 1}, x _ {n}) \left[ \sum_ {x _ {n + 2}} \dots \right] \\ & = & \sum_ {x _ {n + 1}} \psi_ {n + 1, n} (x _ {n + 1}, x _ {n}) \mu_ {\beta} (x _ {n + 1}). \end{array}\tag{8.57}

This recursive message passing is illustrated in Figure 8.38. The normalization constant $Z$ is easily evaluated by summing the right-hand side of (8.54) over all states of $x _ { n }$ , an operation that requires only $O ( K )$ computation.

Graphs of the form shown in Figure 8.38 are called Markov chains, and the corresponding message passing equations represent an example of the Chapman-Kolmogorov equations for Markov processes (Papoulis, 1984).

Now suppose we wish to evaluate the marginals $p ( x _ { n } )$ for every node $n \in$ $\{ 1 , \ldots , N \}$ in the chain. Simply applying the above procedure separately for each node will have computational cost that is $O ( N ^ { 2 } M ^ { 2 } )$ . However, such an approach would be very wasteful of computation. For instance, to find $p ( x _ { 1 } )$ we need to propagate a message $\mu _ { \beta } ( \cdot )$ from node $x _ { N }$ back to node $x _ { 2 }$ . Similarly, to evaluate $p ( x _ { 2 } )$ we need to propagate a messages $\mu _ { \beta } ( \cdot )$ from node $x _ { N }$ back to node $x _ { 3 }$ . This will involve much duplicated computation because most of the messages will be identical in the two cases.

Suppose instead we first launch a message $\mu _ { \beta } ( x _ { N - 1 } )$ starting from node $x _ { N }$ and propagate corresponding messages all the way back to node $x _ { 1 }$ , and suppose we similarly launch a message $\mu _ { \alpha } ( x _ { 2 } )$ starting from node $x _ { 1 }$ and propagate the corresponding messages all the way forward to node $x _ { N }$ . Provided we store all of the intermediate messages along the way, then any node can evaluate its marginal simply by applying (8.54). The computational cost is only twice that for finding the marginal of a single node, rather than N times as much. Observe that a message has passed once in each direction across each link in the graph. Note also that the normalization constant $Z$ need be evaluated only once, using any convenient node.

If some of the nodes in the graph are observed, then the corresponding variables are simply clamped to their observed values and there is no summation. To see this, note that the effect of clamping a variable $x _ { n }$ to an observed value ${ \widehat { x } } _ { n }$ can be expressed by multiplying the joint distribution by (one or more copies of) an additional function $I ( x _ { n } , { \widehat x } _ { n } )$ , which takes the value 1 when $x _ { n } = { \widehat { x } } _ { n }$ and the value 0 otherwise. One such function can then be absorbed into each of the potentials that contain $x _ { n }$ . Summations over $x _ { n }$ then contain only one term in which $x _ { n } = { \widehat { x } } _ { n }$

Now suppose we wish to calculate the joint distribution $p ( x _ { n - 1 } , x _ { n } )$ for two neighbouring nodes on the chain. This is similar to the evaluation of the marginal for a single node, except that there are now two variables that are not summed out. A few moments thought will show that the required joint distribution can be written in the form

p (x _ {n - 1}, x _ {n}) = \frac {1}{Z} \mu_ {\alpha} (x _ {n - 1}) \psi_ {n - 1, n} (x _ {n - 1}, x _ {n}) \mu_ {\beta} (x _ {n}).\tag{8.58}

Thus we can obtain the joint distributions over all of the sets of variables in each of the potentials directly once we have completed the message passing required to obtain the marginals.

This is a useful result because in practice we may wish to use parametric forms for the clique potentials, or equivalently for the conditional distributions if we started from a directed graph. In order to learn the parameters of these potentials in situations where not all of the variables are observed, we can employ the EM algorithm, and it turns out that the local joint distributions of the cliques, conditioned on any observed data, is precisely what is needed in the E step. We shall consider some examples of this in detail in Chapter 13.
