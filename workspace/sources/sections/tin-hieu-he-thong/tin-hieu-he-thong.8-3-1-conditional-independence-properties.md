---
id: "tin-hieu-he-thong.8-3-1-conditional-independence-properties"
doc_id: "tin-hieu-he-thong"
title: "8.3.1 Conditional independence properties"
level: 2
heading_path: ["Graphical Models", "8.3.1 Conditional independence properties"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-3-markov-random-fields"
next_id: "tin-hieu-he-thong.8-3-2-factorization-properties"
block_ids: ["b4311", "b4312", "b4313", "b4314", "b4315", "b4316", "b4317", "b4318", "b4319", "b4320"]
---

## 8.3.1 Conditional independence properties

In the case of directed graphs, we saw that it was possible to test whether a particular conditional independence property holds by applying a graphical test called d-separation. This involved testing whether or not the paths connecting two sets of nodes were ‘blocked’. The definition of blocked, however, was somewhat subtle due to the presence of paths having head-to-head nodes. We might ask whether it is possible to define an alternative graphical semantics for probability distributions such that conditional independence is determined by simple graph separation. This is indeed the case and corresponds to undirected graphical models. By removing the

An example of an undirected graph in which every path from any node in set A to any node in set B passes through at least one node in set C. Consequently the conditional independence property A B C holds for any probability distribution described by this graph.

![image](images/part-003--cbda658247a26ff9a9525e09d92dd46524d1193b4c09c2b3d3baafc119397389.jpg)

directionality from the links of the graph, the asymmetry between parent and child nodes is removed, and so the subtleties associated with head-to-head nodes no longer arise.

Suppose that in an undirected graph we identify three sets of nodes, denoted A, $B ,$ and $C ,$ , and that we consider the conditional independence property

A \perp \perp B \mid C.\tag{8.37}

To test whether this property is satisfied by a probability distribution defined by a graph we consider all possible paths that connect nodes in set A to nodes in set B. If all such paths pass through one or more nodes in set C, then all such paths are ‘blocked’ and so the conditional independence property holds. However, if there is at least one such path that is not blocked, then the property does not necessarily hold, or more precisely there will exist at least some distributions corresponding to the graph that do not satisfy this conditional independence relation. This is illustrated with an example in Figure 8.27. Note that this is exactly the same as the d-separation criterion except that there is no ‘explaining away’ phenomenon. Testing for conditional independence in undirected graphs is therefore simpler than in directed graphs.

An alternative way to view the conditional independence test is to imagine removing all nodes in set C from the graph together with any links that connect to those nodes. We then ask if there exists a path that connects any node in A to any node in B. If there are no such paths, then the conditional independence property must hold.

The Markov blanket for an undirected graph takes a particularly simple form, because a node will be conditionally independent of all other nodes conditioned only on the neighbouring nodes, as illustrated in Figure 8.28.
