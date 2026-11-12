---
id: "tin-hieu-he-thong.8-1-bayesian-networks"
doc_id: "tin-hieu-he-thong"
title: "8.1. Bayesian Networks"
level: 2
heading_path: ["Graphical Models", "8.1. Bayesian Networks"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.graphical-models"
next_id: "tin-hieu-he-thong.8-1-1-example-polynomial-regression"
block_ids: ["b4071", "b4072", "b4073", "b4074", "b4075", "b4076", "b4077", "b4078", "b4079", "b4080", "b4081", "b4082", "b4083", "b4084", "b4085", "b4086", "b4087", "b4088", "b4089", "b4090", "b4091", "b4092", "b4093", "b4094"]
---

## 8.1. Bayesian Networks

In order to motivate the use of directed graphs to describe probability distributions, consider first an arbitrary joint distribution $\textstyle p ( a , b , c )$ over three variables a, b, and c. Note that at this stage, we do not need to specify anything further about these variables, such as whether they are discrete or continuous. Indeed, one of the powerful aspects of graphical models is that a specific graph can make probabilistic statements for a broad class of distributions. By application of the product rule of probability (1.11), we can write the joint distribution in the form

p (a, b, c) = p (c | a, b) p (a, b).\tag{8.1}

A second application of the product rule, this time to the second term on the righthand side of (8.1), gives

p (a, b, c) = p (c | a, b) p (b | a) p (a).\tag{8.2}

Note that this decomposition holds for any choice of the joint distribution. We now represent the right-hand side of (8.2) in terms of a simple graphical model as follows. First we introduce a node for each of the random variables a, b, and c and associate each node with the corresponding conditional distribution on the right-hand side of

Figure 8.1 A directed graphical model representing the joint probability distribution over three variables $a , b ,$ and $^ { c , }$ corresponding to the decomposition on the right-hand side of (8.2).

![image](images/part-002--e486a13028be7fba5fb25648b36a81ce409aaa3770edd2b5d70fc3500fb9eec8.jpg)

(8.2). Then, for each conditional distribution we add directed links (arrows) to the graph from the nodes corresponding to the variables on which the distribution is conditioned. Thus for the factor $p ( c | a , b )$ , there will be links from nodes $a$ and $b$ to node $c ,$ whereas for the factor $p ( a )$ there will be no incoming links. The result is the graph shown in Figure 8.1. If there is a link going from a node $a$ to a node $b ,$ , then we say that node a is the parent of node $b ,$ and we say that node $b$ is the child of node $a .$ Note that we shall not make any formal distinction between a node and the variable to which it corresponds but will simply use the same symbol to refer to both.

An interesting point to note about (8.2) is that the left-hand side is symmetrical with respect to the three variables $a , b ,$ and $c ,$ whereas the right-hand side is not. Indeed, in making the decomposition in (8.2), we have implicitly chosen a particular ordering, namely $a , b , c ,$ , and had we chosen a different ordering we would have obtained a different decomposition and hence a different graphical representation. We shall return to this point later.

For the moment let us extend the example of Figure 8.1 by considering the joint distribution over $K$ variables given by $p ( x _ { 1 } , \ldots , x _ { K } )$ . By repeated application of the product rule of probability, this joint distribution can be written as a product of conditional distributions, one for each of the variables

p (x _ {1}, \dots , x _ {K}) = p (x _ {K} | x _ {1}, \dots , x _ {K - 1}) \dots p (x _ {2} | x _ {1}) p (x _ {1}).\tag{8.3}

For a given choice of $K$ , we can again represent this as a directed graph having K nodes, one for each conditional distribution on the right-hand side of (8.3), with each node having incoming links from all lower numbered nodes. We say that this graph isfully connected because there is a link between every pair of nodes.

So far, we have worked with completely general joint distributions, so that the decompositions, and their representations as fully connected graphs, will be applicable to any choice of distribution. As we shall see shortly, it is the absence of links in the graph that conveys interesting information about the properties of the class of distributions that the graph represents. Consider the graph shown in Figure 8.2. This is not a fully connected graph because, for instance, there is no link from $x _ { 1 }$ to $x _ { 2 }$ or from $x _ { 3 }$ to $x _ { 7 }$

We shall now go from this graph to the corresponding representation of the joint probability distribution written in terms of the product of a set of conditional distributions, one for each node in the graph. Each such conditional distribution will be conditioned only on the parents of the corresponding node in the graph. For instance, $x _ { 5 }$ will be conditioned on $x _ { 1 }$ and $x _ { 3 }$ . The joint distribution of all $7$ variables

Figure 8.2 Example of a directed acyclic graph describing the joint distribution over variables $x _ { 1 } , \ldots , x _ { 7 }$ . The corresponding decomposition of the joint distribution is given by (8.4).

![image](images/part-002--7402050c85d83049446d78dc34d14cc8848732fde3ea4412ef6762b578393728.jpg)

is therefore given by

p (x _ {1}) p (x _ {2}) p (x _ {3}) p (x _ {4} | x _ {1}, x _ {2}, x _ {3}) p (x _ {5} | x _ {1}, x _ {3}) p (x _ {6} | x _ {4}) p (x _ {7} | x _ {4}, x _ {5}).\tag{8.4}

The reader should take a moment to study carefully the correspondence between (8.4) and Figure 8.2.

We can now state in general terms the relationship between a given directed graph and the corresponding distribution over the variables. The joint distribution defined by a graph is given by the product, over all of the nodes of the graph, of a conditional distribution for each node conditioned on the variables corresponding to the parents of that node in the graph. Thus, for a graph with K nodes, the joint distribution is given by

p (\mathbf {x}) = \prod_ {k = 1} ^ {K} p (x _ {k} | \mathrm{pa} _ {k})\tag{8.5}

where $\mathrm { p a } _ { k }$ denotes the set of parents of $x _ { k }$ , and $\textbf { x } = ~ \{ x _ { 1 } , . . . , x _ { K } \}$ This key equation expresses thefactorization properties of the joint distribution for a directed graphical model. Although we have considered each node to correspond to a single variable, we can equally well associate sets of variables and vector-valued variables with the nodes of a graph. It is easy to show that the representation on the righthand side of (8.5) is always correctly normalized provided the individual conditional distributions are normalized.

The directed graphs that we are considering are subject to an important restriction namely that there must be no directed cycles, in other words there are no closed paths within the graph such that we can move from node to node along links following the direction of the arrows and end up back at the starting node. Such graphs are also called directed acyclic graphs, or DAGs. This is equivalent to the statement that there exists an ordering of the nodes such that there are no links that go from any node to any lower numbered node.
