---
id: "tin-hieu-he-thong.8-3-2-factorization-properties"
doc_id: "tin-hieu-he-thong"
title: "8.3.2 Factorization properties"
level: 2
heading_path: ["Graphical Models", "8.3.2 Factorization properties"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-3-1-conditional-independence-properties"
next_id: "tin-hieu-he-thong.8-3-3-illustration-image-de-noising"
block_ids: ["b4321", "b4322", "b4323", "b4324", "b4325", "b4326", "b4327", "b4328", "b4329", "b4330", "b4331", "b4332", "b4333", "b4334", "b4335", "b4336", "b4337", "b4338", "b4339", "b4340", "b4341", "b4342", "b4343", "b4344", "b4345", "b4346", "b4347"]
---

## 8.3.2 Factorization properties

We now seek a factorization rule for undirected graphs that will correspond to the above conditional independence test. Again, this will involve expressing the joint distribution $p ( \mathbf { x } )$ as a product of functions defined over sets of variables that are local to the graph. We therefore need to decide what is the appropriate notion of locality in this case.

Figure 8.28 For an undirected graph, the Markov blanket of a node $x _ { i }$ consists of the set of neighbouring nodes. It has the property that the conditional distribution of $x _ { i } ,$ , conditioned on all the remaining variables in the graph, is dependent only on the variables in the Markov blanket.

![image](images/part-003--fae0de263b51fd7fd19a5c69b3b55ac8bce1dccd19174bdf03c6f115b70e74af.jpg)

If we consider two nodes $x _ { i }$ and $x _ { j }$ that are not connected by a link, then these variables must be conditionally independent given all other nodes in the graph. This follows from the fact that there is no direct path between the two nodes, and all other paths pass through nodes that are observed, and hence those paths are blocked. This conditional independence property can be expressed as

p (x _ {i}, x _ {j} | \mathbf {x} _ {\backslash \{i, j \}}) = p (x _ {i} | \mathbf {x} _ {\backslash \{i, j \}}) p (x _ {j} | \mathbf {x} _ {\backslash \{i, j \}})\tag{8.38}

where $\mathbf { x } _  \langle \ i , j \} $ denotes the set x of all variables with $x _ { i }$ and $x _ { j }$ removed. The factorization of the joint distribution must therefore be such that $x _ { i }$ and $x _ { j }$ do not appear in the same factor in order for the conditional independence property to hold for all possible distributions belonging to the graph.

This leads us to consider a graphical concept called a clique, which is defined as a subset of the nodes in a graph such that there exists a link between all pairs of nodes in the subset. In other words, the set of nodes in a clique is fully connected. Furthermore, a maximal clique is a clique such that it is not possible to include any other nodes from the graph in the set without it ceasing to be a clique. These concepts are illustrated by the undirected graph over four variables shown in Figure 8.29. This graph has five cliques of two nodes given by $\{ x _ { 1 } , x _ { 2 } \} , \{ x _ { 2 } , x _ { 3 } \} , \{ x _ { 3 } , x _ { 4 } \} , \{ x _ { 4 } , x _ { 2 } \}$ and $\{ x _ { 1 } , x _ { 3 } \}$ , as well as two maximal cliques given by $\{ x _ { 1 } , x _ { 2 } , x _ { 3 } \}$ and $\{ x _ { 2 } , x _ { 3 } , x _ { 4 } \}$ The set $\{ x _ { 1 } , x _ { 2 } , x _ { 3 } , x _ { 4 } \}$ is not a clique because of the missing link from $x _ { 1 } ~ \mathrm { t o } ~ x _ { 4 }$

We can therefore define the factors in the decomposition of the joint distribution to be functions of the variables in the cliques. In fact, we can consider functions of the maximal cliques, without loss of generality, because other cliques must be subsets of maximal cliques. Thus, if $\{ x _ { 1 } , x _ { 2 } , x _ { 3 } \}$ is a maximal clique and we define an arbitrary function over this clique, then including another factor defined over a subset of these variables would be redundant.

Let us denote a clique by $C$ and the set of variables in that clique by $\mathbf { x } _ { C }$ . Then

Figure 8.29

A four-node undirected graph showing a clique (outlined in green) and a maximal clique (outlined in blue).

![image](images/part-003--063699e13f1afab5018463eb1a81813f8e777f126872bd9cc89420bb6e032064.jpg)

the joint distribution is written as a product of potential functions $\psi _ { C } ( \mathbf { x } _ { C } )$ over the maximal cliques of the graph

p (\mathbf {x}) = \frac {1}{Z} \prod_ {C} \psi_ {C} (\mathbf {x} _ {C}).\tag{8.39}

Here the quantity $Z ,$ sometimes called the partitionfunction, is a normalization constant and is given by

Z = \sum_ {\mathbf {x}} \prod_ {C} \psi_ {C} (\mathbf {x} _ {C})\tag{8.40}

which ensures that the distribution $p ( \mathbf { x } )$ given by (8.39) is correctly normalized. By considering only potential functions which satisfy $\psi _ { C } ( \mathbf { x } _ { C } ) \geqslant 0$ we ensure that $p ( \mathbf { x } ) \geqslant 0$ . In (8.40) we have assumed that x comprises discrete variables, but the framework is equally applicable to continuous variables, or a combination of the two, in which the summation is replaced by the appropriate combination of summation and integration.

Note that we do not restrict the choice of potential functions to those that have a specific probabilistic interpretation as marginal or conditional distributions. This is in contrast to directed graphs in which each factor represents the conditional distribution of the corresponding variable, conditioned on the state of its parents. However, in special cases, for instance where the undirected graph is constructed by starting with a directed graph, the potential functions may indeed have such an interpretation, as we shall see shortly.

One consequence of the generality of the potential functions $\psi _ { C } ( \mathbf { x } _ { C } )$ is that their product will in general not be correctly normalized. We therefore have to introduce an explicit normalization factor given by (8.40). Recall that for directed graphs, the joint distribution was automatically normalized as a consequence of the normalization of each of the conditional distributions in the factorization.

The presence of this normalization constant is one of the major limitations of undirected graphs. If we have a model with M discrete nodes each having K states, then the evaluation of the normalization term involves summing over $K ^ { M }$ states and so (in the worst case) is exponential in the size of the model. The partition function is needed for parameter learning because it will be a function of any parameters that govern the potential functions $\psi _ { C } ( \mathbf { x } _ { C } )$ . However, for evaluation of local conditional distributions, the partition function is not needed because a conditional is the ratio of two marginals, and the partition function cancels between numerator and denominator when evaluating this ratio. Similarly, for evaluating local marginal probabilities we can work with the unnormalized joint distribution and then normalize the marginals explicitly at the end. Provided the marginals only involves a small number of variables, the evaluation of their normalization coefficient will be feasible.

So far, we have discussed the notion of conditional independence based on simple graph separation and we have proposed a factorization of the joint distribution that is intended to correspond to this conditional independence structure. However, we have not made any formal connection between conditional independence and factorization for undirected graphs. To do so we need to restrict attention to potential functions $\psi _ { C } ( \mathbf { x } _ { C } )$ that are strictly positive (i.e., never zero or negative for any choice of $\mathbf { x } _ { C } )$ . Given this restriction, we can make a precise relationship between factorization and conditional independence.

To do this we again return to the concept of a graphical model as a filter, corresponding to Figure 8.25. Consider the set of all possible distributions defined over a fixed set of variables corresponding to the nodes of a particular undirected graph. We can define to be the set of such distributions that are consistent with the set of conditional independence statements that can be read from the graph using graph separation. Similarly, we can define $\mathcal { U F }$ to be the set of such distributions that can be expressed as a factorization of the form (8.39) with respect to the maximal cliques of the graph. The Hammersley-Clifford theorem (Clifford, 1990) states that the sets and $\mathcal { U F }$ are identical.

Because we are restricted to potential functions which are strictly positive it is convenient to express them as exponentials, so that

\psi_ {C} (\mathbf {x} _ {C}) = \exp \left\{- E (\mathbf {x} _ {C}) \right\}\tag{8.41}

where $E ( \mathbf { x } _ { C } )$ is called an energy function, and the exponential representation is called the Boltzmann distribution. The joint distribution is defined as the product of potentials, and so the total energy is obtained by adding the energies of each of the maximal cliques.

In contrast to the factors in the joint distribution for a directed graph, the potentials in an undirected graph do not have a specific probabilistic interpretation. Although this gives greater flexibility in choosing the potential functions, because there is no normalization constraint, it does raise the question of how to motivate a choice of potential function for a particular application. This can be done by viewing the potential function as expressing which configurations of the local variables are preferred to others. Global configurations that have a relatively high probability are those that find a good balance in satisfying the (possibly conflicting) influences of the clique potentials. We turn now to a specific example to illustrate the use of undirected graphs.
