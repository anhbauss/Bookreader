---
id: "tin-hieu-he-thong.8-4-2-trees"
doc_id: "tin-hieu-he-thong"
title: "8.4.2 Trees"
level: 2
heading_path: ["Graphical Models", "8.4.2 Trees"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-4-1-inference-on-a-chain"
next_id: "tin-hieu-he-thong.8-4-3-factor-graphs"
block_ids: ["b4457", "b4458", "b4459", "b4460", "b4461", "b4462", "b4463", "b4464", "b4465", "b4466", "b4467"]
---

## 8.4.2 Trees

We have seen that exact inference on a graph comprising a chain of nodes can be performed efficiently in time that is linear in the number of nodes, using an algorithm that can be interpreted in terms of messages passed along the chain. More generally, inference can be performed efficiently using local message passing on a broader class of graphs called trees. In particular, we shall shortly generalize the message passing formalism derived above for chains to give the sum-product algorithm, which provides an efficient framework for exact inference in tree-structured graphs.

Figure 8.39 Examples of treestructured graphs, showing (a) an undirected tree, (b) a directed tree, and (c) a directed polytree.

![image](images/part-003--35b4c65676696b40cb36aa85a76eeb39a26ff73440c4664f7b3be096068865c7.jpg)

(a)

![image](images/part-003--78767d695fadefe8fceb9cb9dfea1150e4e65d15592a51fcbef34e6ab893456b.jpg)

(b)

![image](images/part-003--677d3d587e74c6c1d945b0b6e7418f007c91e7ca585b6e7a4fdaaed7369bdd1b.jpg)

(c)

In the case of an undirected graph, a tree is defined as a graph in which there is one, and only one, path between any pair of nodes. Such graphs therefore do not have loops. In the case of directed graphs, a tree is defined such that there is a single node, called the root, which has no parents, and all other nodes have one parent. If we convert a directed tree into an undirected graph, we see that the moralization step will not add any links as all nodes have at most one parent, and as a consequence the corresponding moralized graph will be an undirected tree. Examples of undirected and directed trees are shown in Figure 8.39(a) and 8.39(b). Note that a distribution represented as a directed tree can easily be converted into one represented by an undirected tree, and vice versa.

If there are nodes in a directed graph that have more than one parent, but there is still only one path (ignoring the direction of the arrows) between any two nodes, then the graph is a called a polytree, as illustrated in Figure 8.39(c). Such a graph will have more than one node with the property of having no parents, and furthermore, the corresponding moralized undirected graph will have loops.
