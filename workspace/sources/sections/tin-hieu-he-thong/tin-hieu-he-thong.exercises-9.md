---
id: "tin-hieu-he-thong.exercises-9"
doc_id: "tin-hieu-he-thong"
title: "Exercises"
level: 2
heading_path: ["Graphical Models", "Exercises"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-4-8-learning-the-graph-structure"
next_id: "tin-hieu-he-thong.mixture-models-and-em"
block_ids: ["b4659", "b4660", "b4661", "b4662", "b4663", "b4664", "b4665", "b4666", "b4667", "b4668", "b4669", "b4670", "b4671", "b4672", "b4673", "b4674", "b4675", "b4676", "b4677", "b4678", "b4679", "b4680", "b4681", "b4682", "b4683", "b4684", "b4685", "b4686", "b4687", "b4688", "b4689", "b4690", "b4691", "b4692", "b4693", "b4694", "b4695", "b4696", "b4697"]
---

## Exercises

8.1 () www By marginalizing out the variables in order, show that the representation (8.5) for the joint distribution of a directed graph is correctly normalized, provided each of the conditional distributions is normalized.

8.2 () www Show that the property of there being no directed cycles in a directed graph follows from the statement that there exists an ordered numbering of the nodes such that for each node there are no links going to a lower-numbered node.

Table 8.2 The joint distribution over three binary variables.

<table><tr><td>a</td><td>b</td><td>c</td><td>p(a,b,c)</td></tr><tr><td>0</td><td>0</td><td>0</td><td>0.192</td></tr><tr><td>0</td><td>0</td><td>1</td><td>0.144</td></tr><tr><td>0</td><td>1</td><td>0</td><td>0.048</td></tr><tr><td>0</td><td>1</td><td>1</td><td>0.216</td></tr><tr><td>1</td><td>0</td><td>0</td><td>0.192</td></tr><tr><td>1</td><td>0</td><td>1</td><td>0.064</td></tr><tr><td>1</td><td>1</td><td>0</td><td>0.048</td></tr><tr><td>1</td><td>1</td><td>1</td><td>0.096</td></tr></table>

8.3 ( ) Consider three binary variables $a , b , c \in \{ 0 , 1 \}$ having the joint distribution given in Table 8.2. Show by direct evaluation that this distribution has the property that a and b are marginally dependent, so that $p ( a , b ) \neq p ( a ) p ( b )$ , but that they become independent when conditioned on $c ,$ so that $p ( a , b | c ) \ : = \ : p ( a | c ) p ( b | c )$ for both $c = 0$ and $c = 1$

8.4 ( ) Evaluate the distributions $p ( a ) , p ( b | c )$ , and $p ( c | a )$ corresponding to the joint distribution given in Table 8.2. Hence show by direct evaluation that $p ( a , b , c ) =$ $p ( a ) p ( c | a ) p ( b | c )$ . Draw the corresponding directed graph.

8.5 () www Draw a directed probabilistic graphical model corresponding to the relevance vector machine described by (7.79) and (7.80).

8.6 () For the model shown in Figure 8.13, we have seen that the number of parameters required to specify the conditional distribution $p ( y | x _ { 1 } , \dots , x _ { M } )$ , where $x _ { i } \in \{ 0 , 1 \}$ , could be reduced from $2 ^ { M }$ to $M + 1$ by making use of the logistic sigmoid representation (8.10). An alternative representation (Pearl, 1988) is given by

p (y = 1 \mid x _ {1}, \dots , x _ {M}) = 1 - (1 - \mu_ {0}) \prod_ {i = 1} ^ {M} (1 - \mu_ {i}) ^ {x _ {i}}\tag{8.104}

where the parameters $\mu _ { i }$ represent the probabilities $p ( x _ { i } = 1 )$ , and $\mu _ { 0 }$ is an additional parameters satisfying $0 \leqslant \mu _ { 0 } \leqslant 1$ . The conditional distribution $_ { ( 8 . 1 0 4 ) }$ is known as the noisy-OR. Show that this can be interpreted as a ‘soft’ (probabilistic) form of the logical OR function (i.e., the function that gives $y = 1$ whenever at least one of the $x _ { i } = 1 )$ . Discuss the interpretation of $\mu _ { 0 }$

8.7 ( ) Using the recursion relations (8.15) and (8.16), show that the mean and covariance of the joint distribution for the graph shown in Figure 8.14 are given by (8.17) and (8.18), respectively.

8.8 () www Show that $a \perp \perp b , c \parallel$ d implies $a \perp \perp b \mid d .$

8.9 () www Using the d-separation criterion, show that the conditional distribution for a node x in a directed graph, conditioned on all of the nodes in the Markov blanket, is independent of the remaining variables in the graph.

Figure 8.54 Example of a graphical model used to explore the conditional independence properties of the head-to-head path $a { - } c { - } b$ when a descendant of $^ { c , }$ namely the node $d ,$ is observed.

![image](images/part-003--1bf32998f7437c021861b596a8d178f94e48b85ffc2b985e5bb80a8f31992776.jpg)

8.10 () Consider the directed graph shown in Figure 8.54 in which none of the variables is observed. Show that $a \perp \perp b \mid \emptyset$ . Suppose we now observe the variable d. Show that in general $a \not \perp b \mid d .$

8.11 ( ) Consider the example of the car fuel system shown in Figure 8.21, and suppose that instead of observing the state of the fuel gauge G directly, the gauge is seen by the driver D who reports to us the reading on the gauge. This report is either that the gauge shows full $D = 1$ or that it shows empty $D = 0$ . Our driver is a bit unreliable, as expressed through the following probabilities

p (D = 1 | G = 1) = 0. 9\tag{8.105}

p (D = 0 | G = 0) = 0. 9.\tag{8.106}

Suppose that the driver tells us that the fuel gauge shows empty, in other words that we observe $D = 0$ . Evaluate the probability that the tank is empty given only this observation. Similarly, evaluate the corresponding probability given also the observation that the battery is flat, and note that this second probability is lower. Discuss the intuition behind this result, and relate the result to Figure 8.54.

8.12 () www Show that there are $2 ^ { M ( M - 1 ) / 2 }$ distinct undirected graphs over a set of M distinct random variables. Draw the 8 possibilities for the case of $M = 3$

8.13 () Consider the use of iterated conditional modes (ICM) to minimize the energy function given by (8.42). Write down an expression for the difference in the values of the energy associated with the two states of a particular variable $x _ { j }$ , with all other variables held fixed, and show that it depends only on quantities that are local to $x _ { j }$ in the graph.

8.14 () Consider a particular case of the energy function given by (8.42) in which the coefficients $\beta = h = 0$ . Show that the most probable configuration of the latent variables is given by $x _ { i } = y _ { i }$ for all i.

8.15 ( ) www Show that the joint distribution $p ( x _ { n - 1 } , x _ { n } )$ for two neighbouring nodes in the graph shown in Figure 8.38 is given by an expression of the form (8.58).

8.16 ( ) Consider the inference problem of evaluating $p ( \mathbf { x } _ { n } | \mathbf { x } _ { N } )$ for the graph shown in Figure 8.38, for all nodes $n \in \{ 1 , \ldots , N - 1 \}$ . Show that the message passing algorithm discussed in Section 8.4.1 can be used to solve this efficiently, and discuss which messages are modified and in what way.

8.17 ( ) Consider a graph of the form shown in Figure 8.38 having $N = 5$ nodes, in which nodes $x _ { 3 }$ and $x _ { 5 }$ are observed. Use d-separation to show that $x _ { 2 } \perp \perp x _ { 5 } \mid x _ { 3 }$ Show that if the message passing algorithm of Section 8.4.1 is applied to the evaluation of $p ( x _ { 2 } | x _ { 3 } , x _ { 5 } )$ , the result will be independent of the value of $x _ { 5 }$

8.18 ( ) www Show that a distribution represented by a directed tree can trivially be written as an equivalent distribution over the corresponding undirected tree. Also show that a distribution expressed as an undirected tree can, by suitable normalization of the clique potentials, be written as a directed tree. Calculate the number of distinct directed trees that can be constructed from a given undirected tree.

8.19 ( ) Apply the sum-product algorithm derived in Section 8.4.4 to the chain-ofnodes model discussed in Section 8.4.1 and show that the results (8.54), (8.55), and (8.57) are recovered as a special case.

8.20 () www Consider the message passing protocol for the sum-product algorithm on a tree-structured factor graph in which messages are first propagated from the leaves to an arbitrarily chosen root node and then from the root node out to the leaves. Use proof by induction to show that the messages can be passed in such an order that at every step, each node that must send a message has received all of the incoming messages necessary to construct its outgoing messages.

8.21 ( ) www Show that the marginal distributions $p ( \mathbf { x } _ { s } )$ over the sets of variables $\mathbf { x } _ { s }$ associated with each of the factors $f _ { x } ( \mathbf { x } _ { s } )$ in a factor graph can be found by first running the sum-product message passing algorithm and then evaluating the required marginals using (8.72).

8.22 () Consider a tree-structured factor graph, in which a given subset of the variable nodes form a connected subgraph (i.e., any variable node of the subset is connected to at least one of the other variable nodes via a single factor node). Show how the sum-product algorithm can be used to compute the marginal distribution over that subset.

8.23 ( ) www In Section 8.4.4, we showed that the marginal distribution $p ( x _ { i } )$ for a variable node $x _ { i }$ in a factor graph is given by the product of the messages arriving at this node from neighbouring factor nodes in the form (8.63). Show that the marginal $p ( x _ { i } )$ can also be written as the product of the incoming message along any one of the links with the outgoing message along the same link.

8.24 ( ) Show that the marginal distribution for the variables $\mathbf { x } _ { s }$ in a factor $f _ { s } ( \mathbf { x } _ { s } )$ in a tree-structured factor graph, after running the sum-product message passing algorithm, can be written as the product of the message arriving at the factor node along all its links, times the local factor $f ( \mathbf { x } _ { s } )$ , in the form (8.72).

8.25 $( \star \star )$ In (8.86), we verified that the sum-product algorithm run on the graph in Figure 8.51 with node $x _ { 3 }$ designated as the root node gives the correct marginal for $x _ { 2 }$ . Show that the correct marginals are obtained also for $x _ { 1 }$ and $x _ { 3 }$ . Similarly, show that the use of the result (8.72) after running the sum-product algorithm on this graph gives the correct joint distribution for $x _ { 1 } , x _ { 2 }$

8.26 () Consider a tree-structured factor graph over discrete variables, and suppose we wish to evaluate the joint distribution $p ( x _ { a } , x _ { b } )$ associated with two variables $x _ { a }$ and $x _ { b }$ that do not belong to a common factor. Define a procedure for using the sumproduct algorithm to evaluate this joint distribution in which one of the variables is successively clamped to each of its allowed values.

8.27 ( ) Consider two discrete variables x and y each having three possible states, for example $x , y \in \{ 0 , 1 , 2 \}$ . Construct a joint distribution $p ( x , y )$ over these variables having the property that the value $\widehat { x }$ that maximizes the marginal $p ( x )$ , along with the value $\widehat { y }$ that maximizes the marginal $p ( y )$ , together have probability zero under the joint distribution, so that $p ( \widehat { x } , \widehat { y } ) = 0$

8.28 ( ) www The concept of a pending message in the sum-product algorithm for a factor graph was defined in Section 8.4.7. Show that if the graph has one or more cycles, there will always be at least one pending message irrespective of how long the algorithm runs.

8.29 ( ) www Show that if the sum-product algorithm is run on a factor graph with a tree structure (no loops), then after a finite number of messages have been sent, there will be no pending messages.
