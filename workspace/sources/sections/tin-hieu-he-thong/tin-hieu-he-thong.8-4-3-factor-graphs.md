---
id: "tin-hieu-he-thong.8-4-3-factor-graphs"
doc_id: "tin-hieu-he-thong"
title: "8.4.3 Factor graphs"
level: 2
heading_path: ["Graphical Models", "8.4.3 Factor graphs"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-4-2-trees"
next_id: "tin-hieu-he-thong.8-4-4-the-sum-product-algorithm"
block_ids: ["b4468", "b4469", "b4470", "b4471", "b4472", "b4473", "b4474", "b4475", "b4476", "b4477", "b4478", "b4479", "b4480", "b4481", "b4482", "b4483", "b4484", "b4485", "b4486", "b4487", "b4488", "b4489", "b4490", "b4491", "b4492", "b4493", "b4494", "b4495", "b4496", "b4497"]
---

## 8.4.3 Factor graphs

The sum-product algorithm that we derive in the next section is applicable to undirected and directed trees and to polytrees. It can be cast in a particularly simple and general form if we first introduce a new graphical construction called a factor graph (Frey, 1998; Kschischnang et al., 2001).

Both directed and undirected graphs allow a global function of several variables to be expressed as a product of factors over subsets of those variables. Factor graphs make this decomposition explicit by introducing additional nodes for the factors themselves in addition to the nodes representing the variables. They also allow us to be more explicit about the details of the factorization, as we shall see.

Let us write the joint distribution over a set of variables in the form of a product of factors

p (\mathbf {x}) = \prod_ {s} f _ {s} (\mathbf {x} _ {s})\tag{8.59}

where $\mathbf { x } _ { s }$ denotes a subset of the variables. For convenience, we shall denote the individual variables by $x _ { i } ,$ , however, as in earlier discussions, these can comprise groups of variables (such as vectors or matrices). Each factor $f _ { s }$ is a function of a corresponding set of variables $\mathbf { x } _ { s }$

Figure 8.40 Example of a factor graph, which corresponds to the factorization (8.60).

![image](images/part-003--afada583cdf7afcb0180a33bdebaa1fc20845d12ed0e6eee5979c0aab443f1bf.jpg)

Directed graphs, whose factorization is defined by (8.5), represent special cases of (8.59) in which the factors $f _ { s } ( \mathbf { x } _ { s } )$ are local conditional distributions. Similarly, undirected graphs, given by (8.39), are a special case in which the factors are potential functions over the maximal cliques (the normalizing coefficient $1 / Z$ can be viewed as a factor defined over the empty set of variables).

In a factor graph, there is a node (depicted as usual by a circle) for every variable in the distribution, as was the case for directed and undirected graphs. There are also additional nodes (depicted by small squares) for each factor $f _ { s } ( \mathbf { x } _ { s } )$ in the joint distribution. Finally, there are undirected links connecting each factor node to all of the variables nodes on which that factor depends. Consider, for example, a distribution that is expressed in terms of the factorization

p (\mathbf {x}) = f _ {a} (x _ {1}, x _ {2}) f _ {b} (x _ {1}, x _ {2}) f _ {c} (x _ {2}, x _ {3}) f _ {d} (x _ {3}).\tag{8.60}

This can be expressed by the factor graph shown in Figure 8.40. Note that there are two factors $f _ { a } ( x _ { 1 } , x _ { 2 } )$ and $f _ { b } ( x _ { 1 } , x _ { 2 } )$ that are defined over the same set of variables. In an undirected graph, the product of two such factors would simply be lumped together into the same clique potential. Similarly, $f _ { c } ( x _ { 2 } , x _ { 3 } )$ and $f _ { d } ( x _ { 3 } )$ could be combined into a single potential over $x _ { 2 }$ and $x _ { 3 }$ . The factor graph, however, keeps such factors explicit and so is able to convey more detailed information about the underlying factorization.

![image](images/part-003--7664a07ee11313a2ac98e7d6cf8ea79e15719d3c360b1cd71ad6446908880b22.jpg)

(a)

![image](images/part-003--82fcd81b1275cdf3f8958a4966d8c73f854e6072620edec61a87106a12057d85.jpg)

(b)

![image](images/part-003--75d5c6447f5cc82e3f38608fd70fa0694bcd5f86b798e1e469d91162aa93a633.jpg)

(c)

Figure 8.41 (a) An undirected graph with a single clique potential $\psi ( x _ { 1 } , x _ { 2 } , x _ { 3 } )$ . (b) A factor graph with factor $f ( x _ { 1 } , x _ { 2 } , x _ { 3 } ) = \psi ( x _ { 1 } , x _ { 2 } , x _ { 3 } )$ representing the same distribution as the undirected graph. (c) A different factor graph representing the same distribution, whose factors satisfy $f _ { a } ( x _ { 1 } , x _ { 2 } , x _ { 3 } ) f _ { b } ( x _ { 1 } , x _ { 2 } ) = \psi ( x _ { 1 } , x _ { 2 } , x _ { 3 } )$

![image](images/part-003--fde5e0c819a6ac51ad009064b1a99aabfe59b4300195f546e81ee5943a6a2a44.jpg)

Figure 8.42 (a) A directed graph with the factorization $p ( x _ { 1 } ) p ( x _ { 2 } ) p ( x _ { 3 } | x _ { 1 } , x _ { 2 } )$ . (b) A factor graph representing the same distribution as the directed graph, whose factor satisfies $f ( x _ { 1 } , x _ { 2 } , x _ { 3 } ) = p ( x _ { 1 } ) p ( x _ { 2 } ) p ( x _ { 3 } | x _ { 1 } , x _ { 2 } )$ . (c) A different factor graph representing the same distribution with factors $f _ { a } ( x _ { 1 } ) \ : = \ : p ( x _ { 1 } ) , \ : f _ { b } ( x _ { 2 } ) \ : = \ : p ( x _ { 2 } )$ and $f _ { c } ( x _ { 1 } , x _ { 2 } , x _ { 3 } ) = p ( x _ { 3 } | x _ { 1 } , x _ { 2 } )$

Factor graphs are said to be bipartite because they consist of two distinct kinds of nodes, and all links go between nodes of opposite type. In general, factor graphs can therefore always be drawn as two rows of nodes (variable nodes at the top and factor nodes at the bottom) with links between the rows, as shown in the example in Figure 8.40. In some situations, however, other ways of laying out the graph may be more intuitive, for example when the factor graph is derived from a directed or undirected graph, as we shall see.

If we are given a distribution that is expressed in terms of an undirected graph, then we can readily convert it to a factor graph. To do this, we create variable nodes corresponding to the nodes in the original undirected graph, and then create additional factor nodes corresponding to the maximal cliques $\mathbf { x } _ { s }$ . The factors $f _ { s } ( \mathbf { x } _ { s } )$ are then set equal to the clique potentials. Note that there may be several different factor graphs that correspond to the same undirected graph. These concepts are illustrated in Figure 8.41.

Similarly, to convert a directed graph to a factor graph, we simply create variable nodes in the factor graph corresponding to the nodes of the directed graph, and then create factor nodes corresponding to the conditional distributions, and then finally add the appropriate links. Again, there can be multiple factor graphs all of which correspond to the same directed graph. The conversion of a directed graph to a factor graph is illustrated in Figure 8.42.

We have already noted the importance of tree-structured graphs for performing efficient inference. If we take a directed or undirected tree and convert it into a factor graph, then the result will again be a tree (in other words, the factor graph will have no loops, and there will be one and only one path connecting any two nodes). In the case of a directed polytree, conversion to an undirected graph results in loops due to the moralization step, whereas conversion to a factor graph again results in a tree, as illustrated in Figure 8.43. In fact, local cycles in a directed graph due to links connecting parents of a node can be removed on conversion to a factor graph by defining the appropriate factor function, as shown in Figure 8.44.

We have seen that multiple different factor graphs can represent the same directed or undirected graph. This allows factor graphs to be more specific about the precise form of the factorization. Figure 8.45 shows an example of a fully connected undirected graph along with two different factor graphs. In (b), the joint distribution is given by a general form $p ( \mathbf { x } ) = f ( x _ { 1 } , x _ { 2 } , x _ { 3 } )$ , whereas in (c), it is given by the more specific factorization $p ( { \bf x } ) = f _ { a } ( x _ { 1 } , x _ { 2 } ) f _ { b } ( x _ { 1 } , x _ { 3 } ) f _ { c } ( x _ { 2 } , x _ { 3 } )$ . It should be emphasized that the factorization in (c) does not correspond to any conditional independence properties.

![image](images/part-003--0c9db7073d1afa097ba73f33c1abda37fe65bcd6b1c56a809ccd081ac1667e46.jpg)

![image](images/part-003--8dbbe2f69231f0114fd10566a38a15e7de97b0d94cc3107718d0299f6d71cb96.jpg)

![image](images/part-003--b08e4cbd2ee4d1d37ce86c69c5219e3c94df3267585662d030e985e92ca09687.jpg)

Figure 8.43 (a) A directed polytree. (b) The result of converting the polytree into an undirected graph showing the creation of loops. (c) The result of converting the polytree into a factor graph, which retains the tree structure.
