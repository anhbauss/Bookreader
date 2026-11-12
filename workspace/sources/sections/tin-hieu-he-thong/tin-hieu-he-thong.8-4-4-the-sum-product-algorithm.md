---
id: "tin-hieu-he-thong.8-4-4-the-sum-product-algorithm"
doc_id: "tin-hieu-he-thong"
title: "8.4.4 The sum-product algorithm"
level: 2
heading_path: ["Graphical Models", "8.4.4 The sum-product algorithm"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-4-3-factor-graphs"
next_id: "tin-hieu-he-thong.8-4-5-the-max-sum-algorithm"
block_ids: ["b4498", "b4499", "b4500", "b4501", "b4502", "b4503", "b4504", "b4505", "b4506", "b4507", "b4508", "b4509", "b4510", "b4511", "b4512", "b4513", "b4514", "b4515", "b4516", "b4517", "b4518", "b4519", "b4520", "b4521", "b4522", "b4523", "b4524", "b4525", "b4526", "b4527", "b4528", "b4529", "b4530", "b4531", "b4532", "b4533", "b4534", "b4535", "b4536", "b4537", "b4538", "b4539", "b4540", "b4541", "b4542", "b4543", "b4544", "b4545", "b4546", "b4547", "b4548", "b4549", "b4550", "b4551", "b4552", "b4553", "b4554", "b4555", "b4556", "b4557", "b4558", "b4559", "b4560", "b4561", "b4562", "b4563", "b4564", "b4565", "b4566", "b4567", "b4568", "b4569", "b4570", "b4571", "b4572", "b4573", "b4574", "b4575", "b4576", "b4577", "b4578", "b4579", "b4580", "b4581", "b4582", "b4583", "b4584", "b4585", "b4586", "b4587", "b4588", "b4589", "b4590", "b4591"]
---

## 8.4.4 The sum-product algorithm

We shall now make use of the factor graph framework to derive a powerful class of efficient, exact inference algorithms that are applicable to tree-structured graphs. Here we shall focus on the problem of evaluating local marginals over nodes or subsets of nodes, which will lead us to the sum-product algorithm. Later we shall modify the technique to allow the most probable state to be found, giving rise to the max-sum algorithm.

Also we shall suppose that all of the variables in the model are discrete, and so marginalization corresponds to performing sums. The framework, however, is equally applicable to linear-Gaussian models in which case marginalization involves integration, and we shall consider an example of this in detail when we discuss linear dynamical systems.

Figure 8.44

(a) A fragment of a directed graph having a local cycle. (b) Conversion to a fragment of a factor graph having a tree structure, in which $f ( x _ { 1 } , x _ { 2 } , x _ { 3 } ) =$ $p ( x _ { 1 } ) p ( x _ { 2 } | x _ { 1 } ) p ( x _ { 3 } | x _ { 1 } , x _ { 2 } )$

![image](images/part-003--4b9f586a3c4d4087ee4ad929adc339b18c8fb9eecb8499c8a879e364ec114bde.jpg)

(a)

![image](images/part-003--1f5f59fe368103648e7115a8dc9192b3b7528fb37fea33b198c74540a19e04a9.jpg)

(b)

![image](images/part-003--03273c091ead7e87a715665b9fc6bceec71c7b024c4a8fc15bf2734ae5ca2f49.jpg)

Figure 8.45 (a) A fully connected undirected graph. (b) and (c) Two factor graphs each of which corresponds to the undirected graph in (a).

There is an algorithm for exact inference on directed graphs without loops known as belief propagation (Pearl, 1988; Lauritzen and Spiegelhalter, 1988), and is equivalent to a special case of the sum-product algorithm. Here we shall consider only the sum-product algorithm because it is simpler to derive and to apply, as well as being more general.

We shall assume that the original graph is an undirected tree or a directed tree or polytree, so that the corresponding factor graph has a tree structure. We first convert the original graph into a factor graph so that we can deal with both directed and undirected models using the same framework. Our goal is to exploit the structure of the graph to achieve two things: (i) to obtain an efficient, exact inference algorithm for finding marginals; (ii) in situations where several marginals are required to allow computations to be shared efficiently.

We begin by considering the problem of finding the marginal $p ( x )$ for particular variable node x. For the moment, we shall suppose that all of the variables are hidden. Later we shall see how to modify the algorithm to incorporate evidence corresponding to observed variables. By definition, the marginal is obtained by summing the joint distribution over all variables except x so that

p (x) = \sum_ {\mathbf {x} \backslash x} p (\mathbf {x})\tag{8.61}

where ${ \textbf { x } } \backslash x$ denotes the set of variables in x with variable x omitted. The idea is to substitute for $p ( \mathbf { x } )$ using the factor graph expression (8.59) and then interchange summations and products in order to obtain an efficient algorithm. Consider the fragment of graph shown in Figure 8.46 in which we see that the tree structure of the graph allows us to partition the factors in the joint distribution into groups, with one group associated with each of the factor nodes that is a neighbour of the variable node x. We see that the joint distribution can be written as a product of the form

p (\mathbf {x}) = \prod_ {s \in \mathrm{ne} (x)} F _ {s} (x, X _ {s})\tag{8.62}

ne $( x )$ denotes the set of factor nodes that are neighbours of $x ,$ and $X _ { s }$ denotes the set of all variables in the subtree connected to the variable node x via the factor node

Figure 8.46 A fragment of a factor graph illustrating the evaluation of the marginal $p ( x )$

![image](images/part-003--d8924513877f05d7b9b3f8476da10d339a57c0434ba6bef7bc50fe5f73f914ef.jpg)

$f _ { s } ,$ and $F _ { s } ( x , X _ { s } )$ represents the product of all the factors in the group associated with factor $f _ { s }$

Substituting (8.62) into (8.61) and interchanging the sums and products, we obtain

\begin{array}{r c l} p (x) & = & \prod_ {s \in \mathrm{ne} (x)} \left[ \sum_ {X _ {s}} F _ {s} (x, X _ {s}) \right] \\ & = & \prod_ {s \in \mathrm{ne} (x)} \mu_ {f _ {s} \to x} (x). \end{array}\tag{8.63}

Here we have introduced a set of functions $\mu _ { f _ { s } \to x } ( x )$ , defined by

\mu_ {f _ {s} \rightarrow x} (x) \equiv \sum_ {X _ {s}} F _ {s} (x, X _ {s})\tag{8.64}

which can be viewed as messages from the factor nodes $f _ { s }$ to the variable node x. We see that the required marginal $p ( x )$ is given by the product of all the incoming messages arriving at node x.

In order to evaluate these messages, we again turn to Figure 8.46 and note that each factor $F _ { s } ( x , X _ { s } )$ is described by a factor (sub-)graph and so can itself be factorized. In particular, we can write

F _ {s} (x, X _ {s}) = f _ {s} (x, x _ {1}, \ldots , x _ {M}) G _ {1} \left(x _ {1}, X _ {s 1}\right) \ldots G _ {M} \left(x _ {M}, X _ {s M}\right)\tag{8.65}

where, for convenience, we have denoted the variables associated with factor $f _ { x } ,$ , in addition to x, by $x _ { 1 } , \ldots , x _ { M }$ . This factorization is illustrated in Figure 8.47. Note that the set of variables $\{ x , x _ { 1 } , \ldots , x _ { M } \}$ is the set of variables on which the factor $f _ { s }$ depends, and so it can also be denoted $\mathbf { x } _ { s }$ , using the notation of (8.59).

Substituting (8.65) into (8.64) we obtain

\begin{array}{r c l}\mu_ {f _ {s} \rightarrow x} (x)&=&\sum_ {x _ {1}} \dots \sum_ {x _ {M}} f _ {s} (x, x _ {1}, \dots , x _ {M}) \prod_ {m \in \mathrm{ne} (f _ {s}) \backslash x} \left[ \sum_ {X _ {x m}} G _ {m} (x _ {m}, X _ {s m}) \right]\\&=&\sum_ {x _ {1}} \dots \sum_ {x _ {M}} f _ {s} (x, x _ {1}, \dots , x _ {M}) \prod_ {m \in \mathrm{ne} (f _ {s}) \backslash x} \mu_ {x _ {m} \rightarrow f _ {s}} (x _ {m})\end{array}\tag {8.6}

Figure 8.47 Illustration of the factorization of the subgraph associated with factor node $f _ { s }$

![image](images/part-003--74e560390296edf2e7828b6a29fe6d0cc5fb558003752a477f433f83b7be975c.jpg)

where $\mathrm { n e } ( f _ { s } )$ denotes the set of variable nodes that are neighbours of the factor node $f _ { s } ,$ and ne $( f _ { s } ) \setminus x$ denotes the same set but with node x removed. Here we have defined the following messages from variable nodes to factor nodes

\mu_ {x _ {m} \to f _ {s}} (x _ {m}) \equiv \sum_ {X _ {s m}} G _ {m} (x _ {m}, X _ {s m}).\tag{8.67}

We have therefore introduced two distinct kinds of message, those that go from factor nodes to variable nodes denoted $\mu _ { f  x } ( x )$ , and those that go from variable nodes to factor nodes denoted $\mu _ { x  f } ( x )$ . In each case, we see that messages passed along a link are always a function of the variable associated with the variable node that link connects to.

The result (8.66) says that to evaluate the message sent by a factor node to a variable node along the link connecting them, take the product of the incoming messages along all other links coming into the factor node, multiply by the factor associated with that node, and then marginalize over all of the variables associated with the incoming messages. This is illustrated in Figure 8.47. It is important to note that a factor node can send a message to a variable node once it has received incoming messages from all other neighbouring variable nodes.

Finally, we derive an expression for evaluating the messages from variable nodes to factor nodes, again by making use of the (sub-)graph factorization. From Figure 8.48, we see that term $G _ { m } ( \bar { x } _ { m } , X _ { s m } )$ associated with node $x _ { m }$ is given by a product of terms $F _ { l } ( x _ { m } , X _ { m l } )$ each associated with one of the factor nodes $f _ { l }$ that is linked to node $x _ { m }$ (excluding node $f _ { s } )$ , so that

G _ {m} (x _ {m}, X _ {s m}) = \prod_ {l \in \mathrm{ne} (x _ {m}) \setminus f _ {s}} F _ {l} (x _ {m}, X _ {m l})\tag{8.68}

where the product is taken over all neighbours of node $x _ { m }$ except for node $f _ { s }$ . Note that each of the factors $F _ { l } ( x _ { m } , X _ { m l } )$ represents a subtree of the original graph of precisely the same kind as introduced in (8.62). Substituting (8.68) into (8.67), we

(a)

Figure 8.48 Illustration of the evaluation of the message sent by a variable node to an adjacent factor node.

![image](images/part-003--455c3f9f33dfc0c8a3b981d69e21328cc7426c7ddcd03bdf52d2f60d536e4db8.jpg)

then obtain

\begin{array}{r c l} \mu_ {x _ {m} \to f _ {s}} (x _ {m}) & = & \prod_ {l \in \mathrm{ne} (x _ {m}) \setminus f _ {s}} \left[ \sum_ {X _ {m l}} F _ {l} (x _ {m}, X _ {m l}) \right] \\ & = & \prod_ {l \in \mathrm{ne} (x _ {m}) \setminus f _ {s}} \mu_ {f _ {l} \to x _ {m}} (x _ {m}) \end{array}\tag{8.69}

where we have used the definition (8.64) of the messages passed from factor nodes to variable nodes. Thus to evaluate the message sent by a variable node to an adjacent factor node along the connecting link, we simply take the product of the incoming messages along all of the other links. Note that any variable node that has only two neighbours performs no computation but simply passes messages through unchanged. Also, we note that a variable node can send a message to a factor node once it has received incoming messages from all other neighbouring factor nodes.

Recall that our goal is to calculate the marginal for variable node x, and that this marginal is given by the product of incoming messages along all of the links arriving at that node. Each of these messages can be computed recursively in terms of other messages. In order to start this recursion, we can view the node x as the root of the tree and begin at the leaf nodes. From the definition (8.69), we see that if a leaf node is a variable node, then the message that it sends along its one and only link is given by

\mu_ {x \to f} (x) = 1\tag{8.70}

as illustrated in Figure 8.49(a). Similarly, if the leaf node is a factor node, we see from (8.66) that the message sent should take the form

\mu_ {f \to x} (x) = f (x)\tag{8.71}

The sum-product algorithm begins with messages sent by the leaf nodes, which depend on whether the leaf node is (a) a variable node, or (b) a factor node.

![image](images/part-003--8767478bdd7694f7cdcf98be526eaae142ad16358c66a07ca5a1fce2ed57cdc7.jpg)

![image](images/part-003--f3b846022bf952bf5bce0161cd1f9f5749e3c535098d0d6223f97275a782f87e.jpg)

as illustrated in Figure 8.49(b).

At this point, it is worth pausing to summarize the particular version of the sumproduct algorithm obtained so far for evaluating the marginal $p ( x )$ We start by viewing the variable node x as the root of the factor graph and initiating messages at the leaves of the graph using (8.70) and (8.71). The message passing steps (8.66) and (8.69) are then applied recursively until messages have been propagated along every link, and the root node has received messages from all of its neighbours. Each node can send a message towards the root once it has received messages from all of its other neighbours. Once the root node has received messages from all of its neighbours, the required marginal can be evaluated using (8.63). We shall illustrate this process shortly.

To see that each node will always receive enough messages to be able to send out a message, we can use a simple inductive argument as follows. Clearly, for a graph comprising a variable root node connected directly to several factor leaf nodes, the algorithm trivially involves sending messages of the form (8.71) directly from the leaves to the root. Now imagine building up a general graph by adding nodes one at a time, and suppose that for some particular graph we have a valid algorithm. When one more (variable or factor) node is added, it can be connected only by a single link because the overall graph must remain a tree, and so the new node will be a leaf node. It therefore sends a message to the node to which it is linked, which in turn will therefore receive all the messages it requires in order to send its own message towards the root, and so again we have a valid algorithm, thereby completing the proof.

Now suppose we wish to find the marginals for every variable node in the graph. This could be done by simply running the above algorithm afresh for each such node. However, this would be very wasteful as many of the required computations would be repeated. We can obtain a much more efficient procedure by ‘overlaying’ these multiple message passing algorithms to obtain the general sum-product algorithm as follows. Arbitrarily pick any (variable or factor) node and designate it as the root. Propagate messages from the leaves to the root as before. At this point, the root node will have received messages from all of its neighbours. It can therefore send out messages to all of its neighbours. These in turn will then have received messages from all of their neighbours and so can send out messages along the links going away from the root, and so on. In this way, messages are passed outwards from the root all the way to the leaves. By now, a message will have passed in both directions across every link in the graph, and every node will have received a message from all of its neighbours. Again a simple inductive argument can be used to verify the validity of this message passing protocol. Because every variable node will have received messages from all of its neighbours, we can readily calculate the marginal distribution for every variable in the graph. The number of messages that have to be computed is given by twice the number of links in the graph and so involves only twice the computation involved in finding a single marginal. By comparison, if we had run the sum-product algorithm separately for each node, the amount of computation would grow quadratically with the size of the graph. Note that this algorithm is in fact independent of which node was designated as the root,

The sum-product algorithm can be viewed purely in terms of messages sent out by factor nodes to other factor nodes. In this example, the outgoing message shown by the blue arrow is obtained by taking the product of all the incoming messages shown by green arrows, multiplying by the factor $f _ { s }$ , and marginalizing over the variables $x _ { 1 }$ and $x _ { 2 }$

![image](images/part-003--4c086c185deb3097dff23b11a6549c33496dac67d72588019a4bf778e1b88f81.jpg)

and indeed the notion of one node having a special status was introduced only as a convenient way to explain the message passing protocol.

Next suppose we wish to find the marginal distributions $p ( \mathbf { x } _ { s } )$ associated with the sets of variables belonging to each of the factors. By a similar argument to that used above, it is easy to see that the marginal associated with a factor is given by the product of messages arriving at the factor node and the local factor at that node

p (\mathbf {x} _ {s}) = f _ {s} (\mathbf {x} _ {s}) \prod_ {i \in \mathrm{ne} (f _ {s})} \mu_ {x _ {i} \to f _ {s}} (x _ {i})\tag{8.72}

in complete analogy with the marginals at the variable nodes. If the factors are parameterized functions and we wish to learn the values of the parameters using the EM algorithm, then these marginals are precisely the quantities we will need to calculate in the E step, as we shall see in detail when we discuss the hidden Markov model in Chapter 13.

The message sent by a variable node to a factor node, as we have seen, is simply the product of the incoming messages on other links. We can if we wish view the sum-product algorithm in a slightly different form by eliminating messages from variable nodes to factor nodes and simply considering messages that are sent out by factor nodes. This is most easily seen by considering the example in Figure 8.50.

So far, we have rather neglected the issue of normalization. If the factor graph was derived from a directed graph, then the joint distribution is already correctly normalized, and so the marginals obtained by the sum-product algorithm will similarly be normalized correctly. However, if we started from an undirected graph, then in general there will be an unknown normalization coefficient $1 / Z$ . As with the simple chain example of Figure 8.38, this is easily handled by working with an unnormalized version $\widetilde { p } ( \mathbf { x } )$ of the joint distribution, where $p ( \mathbf { x } ) = \widetilde { p } ( \mathbf { x } ) / Z$ . We first run the  sum-product algorithm to find the corresponding unnormalized marginals $\widetilde { p } ( \boldsymbol { x } _ { i } )$ . The coefficient $1 / Z$ is then easily obtained by normalizing any one of these marginals, and this is computationally efficient because the normalization is done over a single variable rather than over the entire set of variables as would be required to normalize $\widetilde { p } ( \mathbf { x } )$ directly.

At this point, it may be helpful to consider a simple example to illustrate the operation of the sum-product algorithm. Figure 8.51 shows a simple 4-node factor

Figure 8.51 A simple factor graph used to illustrate the sum-product algorithm.

![image](images/part-003--f61bc054fbfdd77d4eafcf8a12d5835a0cd4bfc11e3f4e3ba3260f793ab17e34.jpg)

graph whose unnormalized joint distribution is given by

\widetilde {p} (\mathbf {x}) = f _ {a} (x _ {1}, x _ {2}) f _ {b} (x _ {2}, x _ {3}) f _ {c} (x _ {2}, x _ {4}).\tag{8.73}

In order to apply the sum-product algorithm to this graph, let us designate node $x _ { 3 }$ as the root, in which case there are two leaf nodes $x _ { 1 }$ and $x _ { 4 }$ . Starting with the leaf nodes, we then have the following sequence of six messages

\mu_ {x _ {1} \to f _ {a}} (x _ {1}) = 1\tag{8.74}

\mu_ {f _ {a} \rightarrow x _ {2}} (x _ {2}) = \sum_ {x _ {1}} f _ {a} (x _ {1}, x _ {2})\tag{8.75}

\mu_ {x _ {4} \to f _ {c}} (x _ {4}) = 1\tag{8.76}

\mu_ {f _ {c} \to x _ {2}} (x _ {2}) = \sum_ {x _ {4}} f _ {c} (x _ {2}, x _ {4})\tag{8.77}

\mu_ {x _ {2} \to f _ {b}} (x _ {2}) = \mu_ {f _ {a} \to x _ {2}} (x _ {2}) \mu_ {f _ {c} \to x _ {2}} (x _ {2})\tag{8.78}

\mu_ {f _ {b} \to x _ {3}} (x _ {3}) = \sum_ {x _ {2}} f _ {b} (x _ {2}, x _ {3}) \mu_ {x _ {2} \to f _ {b}}.\tag{8.79}

The direction of flow of these messages is illustrated in Figure 8.52. Once this message propagation is complete, we can then propagate messages from the root node out to the leaf nodes, and these are given by

\mu_ {x _ {3} \to f _ {b}} (x _ {3}) = 1\tag{8.80}

\mu_ {f _ {b} \rightarrow x _ {2}} (x _ {2}) = \sum_ {x _ {3}} f _ {b} (x _ {2}, x _ {3})\tag{8.81}

\mu_ {x _ {2} \to f _ {a}} (x _ {2}) = \mu_ {f _ {b} \to x _ {2}} (x _ {2}) \mu_ {f _ {c} \to x _ {2}} (x _ {2})\tag{8.82}

\mu_ {f _ {a} \to x _ {1}} (x _ {1}) = \sum_ {x _ {2}} f _ {a} (x _ {1}, x _ {2}) \mu_ {x _ {2} \to f _ {a}} (x _ {2})\tag{8.83}

\mu_ {x _ {2} \to f _ {c}} (x _ {2}) = \mu_ {f _ {a} \to x _ {2}} (x _ {2}) \mu_ {f _ {b} \to x _ {2}} (x _ {2})\tag{8.84}

\mu_ {f _ {c} \to x _ {4}} (x _ {4}) = \sum f _ {c} (x _ {2}, x _ {4}) \mu_ {x _ {2} \to f _ {c}} (x _ {2}).\tag{8.85}

![image](images/part-003--b2e367c00e007bfce3006a38f1fdce44f797669343780ea78f123a7e84f84dbd.jpg)

Figure 8.52 Flow of messages for the sum-product algorithm applied to the example graph in Figure 8.51. (a) From the leaf nodes $x _ { 1 }$ and $x _ { 4 }$ towards the root node $x _ { 3 }$ . (b) From the root node towards the leaf nodes.

One message has now passed in each direction across each link, and we can now evaluate the marginals. As a simple check, let us verify that the marginal $p ( x _ { 2 } )$ is given by the correct expression. Using (8.63) and substituting for the messages using the above results, we have

\begin{array}{r c l} \widetilde {p} (x _ {2}) & = & \mu_ {f _ {a} \to x _ {2}} (x _ {2}) \mu_ {f _ {b} \to x _ {2}} (x _ {2}) \mu_ {f _ {c} \to x _ {2}} (x _ {2}) \\ & = & \left[ \sum_ {x _ {1}} f _ {a} (x _ {1}, x _ {2}) \right] \left[ \sum_ {x _ {3}} f _ {b} (x _ {2}, x _ {3}) \right] \left[ \sum_ {x _ {4}} f _ {c} (x _ {2}, x _ {4}) \right] \\ & = & \sum_ {x _ {1}} \sum_ {x _ {2}} \sum_ {x _ {4}} f _ {a} (x _ {1}, x _ {2}) f _ {b} (x _ {2}, x _ {3}) f _ {c} (x _ {2}, x _ {4}) \\ & = & \sum_ {x _ {1}} \sum_ {x _ {3}} \sum_ {x _ {4}} \widetilde {p} (\mathbf {x}) \end{array}\tag{8.86}

as required.

So far, we have assumed that all of the variables in the graph are hidden. In most practical applications, a subset of the variables will be observed, and we wish to calculate posterior distributions conditioned on these observations. Observed nodes are easily handled within the sum-product algorithm as follows. Suppose we partition x into hidden variables h and observed variables v, and that the observed value of v is denoted ${ \widehat { \mathbf { v } } } .$ . Then we simply multiply the joint distribution $p ( \mathbf { x } )$ by $\textstyle \prod _ { i } I ( v _ { i } , { \widehat { v } } _ { i } )$ where $I ( v , \widehat { v } ) = 1$ if $\boldsymbol { v } = \boldsymbol { \hat { \hat { v } } }$ and $I ( v , \widehat { v } ) = \mathrm { 0 }$ otherwise. This product corresponds to $p ( \mathbf { h } , \mathbf { v } = { \widehat { \mathbf { v } } } )$ and hence is an unnormalized version of $p ( \mathbf { h } | \mathbf { v } = { \widehat { \mathbf { v } } } )$ . By run- ning the sum-product algorithm, we can efficiently calculate the posterior marginals $p ( h _ { i } | \mathbf { v } = { \widehat { \mathbf { v } } } )$ up to a normalization coefficient whose value can be found efficiently using a local computation. Any summations over variables in v then collapse into a single term.

We have assumed throughout this section that we are dealing with discrete variables. However, there is nothing specific to discrete variables either in the graphical framework or in the probabilistic construction of the sum-product algorithm. For

Table 8.1 Example of a joint distribution over two binary variables for which the maximum of the joint distribution occurs for different variable values compared to the maxima of the two marginals.

<table><tr><td></td><td>x=0</td><td>x=1</td></tr><tr><td>y=0</td><td>0.3</td><td>0.4</td></tr><tr><td>y=1</td><td>0.3</td><td>0.0</td></tr></table>

continuous variables the summations are simply replaced by integrations. We shall give an example of the sum-product algorithm applied to a graph of linear-Gaussian variables when we consider linear dynamical systems.
