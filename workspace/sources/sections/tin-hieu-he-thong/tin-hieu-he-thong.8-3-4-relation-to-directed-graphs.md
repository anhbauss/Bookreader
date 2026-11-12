---
id: "tin-hieu-he-thong.8-3-4-relation-to-directed-graphs"
doc_id: "tin-hieu-he-thong"
title: "8.3.4 Relation to directed graphs"
level: 2
heading_path: ["Graphical Models", "8.3.4 Relation to directed graphs"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-3-3-illustration-image-de-noising"
next_id: "tin-hieu-he-thong.8-4-inference-in-graphical-models"
block_ids: ["b4372", "b4373", "b4374", "b4375", "b4376", "b4377", "b4378", "b4379", "b4380", "b4381", "b4382", "b4383", "b4384", "b4385", "b4386", "b4387", "b4388", "b4389", "b4390", "b4391", "b4392", "b4393", "b4394", "b4395", "b4396", "b4397", "b4398", "b4399", "b4400", "b4401"]
---

## 8.3.4 Relation to directed graphs

We have introduced two graphical frameworks for representing probability distributions, corresponding to directed and undirected graphs, and it is instructive to discuss the relation between these. Consider first the problem of taking a model that is specified using a directed graph and trying to convert it to an undirected graph. In some cases this is straightforward, as in the simple example in Figure 8.32. Here the joint distribution for the directed graph is given as a product of conditionals in the form

p (\mathbf {x}) = p (x _ {1}) p (x _ {2} | x _ {1}) p (x _ {3} | x _ {2}) \dots p (x _ {N} | x _ {N - 1}).\tag{8.44}

Now let us convert this to an undirected graph representation, as shown in Figure 8.32. In the undirected graph, the maximal cliques are simply the pairs of neighbouring nodes, and so from (8.39) we wish to write the joint distribution in the form

p (\mathbf {x}) = \frac {1}{Z} \psi_ {1, 2} (x _ {1}, x _ {2}) \psi_ {2, 3} (x _ {2}, x _ {3}) \dots \psi_ {N - 1, N} (x _ {N - 1}, x _ {N}).\tag{8.45}

Figure 8.33 Example of a simple directed graph (a) and the corresponding moral graph (b).

![image](images/part-003--8f4b0f1a0906dd3e22a5e313a8b671f1c0ca0851db27be432146f7116f41eed5.jpg)

This is easily done by identifying

\begin{array}{r c l} \psi_ {1, 2} (x _ {1}, x _ {2}) & = & p (x _ {1}) p (x _ {2} | x _ {1}) \\ \psi_ {2, 3} (x _ {2}, x _ {3}) & = & p (x _ {3} | x _ {2}) \\ & \vdots \\ \psi_ {N - 1, N} (x _ {N - 1}, x _ {N}) & = & p (x _ {N} | x _ {N - 1}) \end{array}

where we have absorbed the marginal $p ( x _ { 1 } )$ for the first node into the first potential function. Note that in this case, the partition function $Z = 1$

Let us consider how to generalize this construction, so that we can convert any distribution specified by a factorization over a directed graph into one specified by a factorization over an undirected graph. This can be achieved if the clique potentials of the undirected graph are given by the conditional distributions of the directed graph. In order for this to be valid, we must ensure that the set of variables that appears in each of the conditional distributions is a member of at least one clique of the undirected graph. For nodes on the directed graph having just one parent, this is achieved simply by replacing the directed link with an undirected link. However, for nodes in the directed graph having more than one parent, this is not sufficient. These are nodes that have ‘head-to-head’ paths encountered in our discussion of conditional independence. Consider a simple directed graph over 4 nodes shown in Figure 8.33. The joint distribution for the directed graph takes the form

p (\mathbf {x}) = p (x _ {1}) p (x _ {2}) p (x _ {3}) p (x _ {4} | x _ {1}, x _ {2}, x _ {3}).\tag{8.46}

We see that the factor $p ( x _ { 4 } | x _ { 1 } , x _ { 2 } , x _ { 3 } )$ involves the four variables $x _ { 1 } , x _ { 2 } , x _ { 3 }$ , and $x _ { 4 } .$ , and so these must all belong to a single clique if this conditional distribution is to be absorbed into a clique potential. To ensure this, we add extra links between all pairs of parents of the node $x _ { 4 }$ . Anachronistically, this process of ‘marrying the parents’ has become known as moralization, and the resulting undirected graph, after dropping the arrows, is called the moral graph. It is important to observe that the moral graph in this example is fully connected and so exhibits no conditiona independence properties, in contrast to the original directed graph.

Thus in general to convert a directed graph into an undirected graph, we first add additional undirected links between all pairs of parents for each node in the graph and then drop the arrows on the original links to give the moral graph. Then we initialize all of the clique potentials of the moral graph to 1. We then take each conditional distribution factor in the original directed graph and multiply it into one of the clique potentials. There will always exist at least one maximal clique that contains all of the variables in the factor as a result of the moralization step. Note that in all cases the partition function is given by Z = 1.

The process of converting a directed graph into an undirected graph plays an important role in exact inference techniques such as the junction tree algorithm. Converting from an undirected to a directed representation is much less common and in general presents problems due to the normalization constraints.

We saw that in going from a directed to an undirected representation we had to discard some conditional independence properties from the graph. Of course, we could always trivially convert any distribution over a directed graph into one over an undirected graph by simply using a fully connected undirected graph. This would, however, discard all conditional independence properties and so would be vacuous. The process of moralization adds the fewest extra links and so retains the maximum number of independence properties.

We have seen that the procedure for determining the conditional independence properties is different between directed and undirected graphs. It turns out that the two types of graph can express different conditional independence properties, and it is worth exploring this issue in more detail. To do so, we return to the view of a specific (directed or undirected) graph as a filter, so that the set of all possible distributions over the given variables could be reduced to a subset that respects the conditional independencies implied by the graph. A graph is said to be a D map (for ‘dependency map’) of a distribution if every conditional independence statement satisfied by the distribution is reflected in the graph. Thus a completely disconnected graph (no links) will be a trivial D map for any distribution.

Alternatively, we can consider a specific distribution and ask which graphs have the appropriate conditional independence properties. If every conditional independence statement implied by a graph is satisfied by a specific distribution, then the graph is said to be an I map (for ‘independence map’) of that distribution. Clearly a fully connected graph will be a trivial I map for any distribution.

If it is the case that every conditional independence property of the distribution is reflected in the graph, and vice versa, then the graph is said to be a perfect map for

Venn diagram illustrating the set of all distributions P over a given set of variables, together with the set of distributions D that can be represented as a perfect map using a directed graph, and the set U that can be represented as a perfect map using an undirected graph.

![image](images/part-003--1a3fb693f2a3906f1eae46451bd2f27fd923aa356a13bf5f948ee29ea8187cc6.jpg)

Figure 8.35 A directed graph whose conditional independence properties cannot be expressed using an undirected graph over the same three variables.

![image](images/part-003--954ca23e019c9a1c714d6b0cb8ef6cabbb8334f73b3edc772d284714ddd59e1d.jpg)

that distribution. A perfect map is therefore both an I map and a D map.

Consider the set of distributions such that for each distribution there exists a directed graph that is a perfect map. This set is distinct from the set of distributions such that for each distribution there exists an undirected graph that is a perfect map. In addition there are distributions for which neither directed nor undirected graphs offer a perfect map. This is illustrated as a Venn diagram in Figure 8.34.

Figure 8.35 shows an example of a directed graph that is a perfect map for a distribution satisfying the conditional independence properties ${ \hat { A } } \perp \perp B \mid \emptyset$ and A B  C. There is no corresponding undirected graph over the same three variables that is a perfect map.

Conversely, consider the undirected graph over four variables shown in Figure 8.36. This graph exhibits the properties $A \mathbin { \downarrow } \chi \ B \ | \ \emptyset , C \mathbin { \downarrow } \bot \ D \ | \ A \cup B$ and $A \bot \bot B \mid C \cup D$ . There is no directed graph over four variables that implies the same set of conditional independence properties.

The graphical framework can be extended in a consistent way to graphs that include both directed and undirected links. These are called chain graphs (Lauritzen and Wermuth, 1989; Frydenberg, 1990), and contain the directed and undirected graphs considered so far as special cases. Although such graphs can represent a broader class of distributions than either directed or undirected alone, there remain distributions for which even a chain graph cannot provide a perfect map. Chain graphs are not discussed further in this book.

An undirected graph whose conditional independence properties cannot be expressed in terms of a directed graph over the same variables.

![image](images/part-003--e9ecbcb3d8b9d0abd0ad31603a1ef58cd60aadf0f31cc9eee019573460e7632b.jpg)
